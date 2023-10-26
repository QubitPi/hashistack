---
sidebar_position: 2
title: How to Enable SSL Automatically Through HashiCorp AWS
---

Let's image the following scenario:

1. I purchased a domain from [Google Domain][Google Domain] called **my-domain.com**
2. I developed a web app that will be exposed at **my-app.my-domain.com**
3. I will deploy my app to [AWS EC2][AWS EC2] using HashiCorp AWS
4. When my app is up and running, I need to automatically enable secure SSL communication so that my app can be visited
   at `https://my-app.my-domain.com`

Assuming that **HashiCorp AWS, or Immutable Infrastructure in general, is not responsible for SSL certificates lifecycle
management**, we can read the certificate from [GitHub Secrets][GitHub Action - How to set up] and load it into
[AWS AMI] in the following steps

Step 1 - Store SSL Certificate in [GitHub Secrets][GitHub Action - How to set up]
---------------------------------------------------------------------------------

As a prerequisite, please [have both the certificate and certificate key files][Certbot SSL] ready. Next we will have
the following [GitHub Action Secrets][GitHub Action - How to set up] set up:

- **SSL_CERTIFICATE**: The content of the certificate file
- **SSL_CERTIFICATE_KEY**: The content of the certificate key file

Step 2 - Load Certificate into HashiCorp Context through [GitHub Action]
------------------------------------------------------------------------

Right before the HashiCorp AWS step, we will put the following "Load SSL Certificates" step:

```yaml
  ...

  steps:
    ...

    - name: Load SSL Certificates
      run: |
        echo '${{ secrets.SSL_CERTIFICATE }}' > server.crt
        echo '${{ secrets.SSL_CERTIFICATE_KEY }}' > server.key
      working-directory: hashicorp/images

    - name: Publish my-app AMI image and deploy it to EC2 through HashiCorp
      uses: QubitPi/hashicorp-aws@master
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ${{ secrets.AWS_REGION }}
```

Step 3 - Define Nginx Reverse Proxy Config File
-----------------------------------------------

Note that in the following config, Nginx assumes the certificate file and its key file are located at
**/etc/ssl/certs/server.crt** and **/etc/ssl/private/server.key**, respectively. In addition, please modify
`my-app.my-domain.com` and port `5000` in it accordingly:

```ini
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }
}

server {
    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;
    server_name my-app.my-domain.com;

    location / {
        proxy_pass http://localhost:5000;
    }

    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/ssl/certs/server.crt;
    ssl_certificate_key /etc/ssl/private/server.key;
}

server {
    if ($host = my-app.my-domain.com) {
        return 301 https://$host$request_uri;
    }

    listen 80 ;
    listen [::]:80 ;
    server_name my-app.my-domain.com;
    return 404;
}
```

Step 3 - Loading Certificates and Nginx Config Files into AMI Image
-------------------------------------------------------------------

In the [build block][HashiCorp Packer Build Block] of our **images/aws-my-app.pkr.hcl** file, we add 3 provisioners to
load the certificate, certificate key, and the Nginx reverse proxy config file into AMI.

> Note that Packer's file provisioner do not have root user privilege to put our files directly to the desired
> locations. We will put them instead to a temporary location and have the shell provisioner to move them second time
> to the final locations in the
> [next step](#step-4---moving-certificates-and-nginx-config-files-to-the-proper-locations-in-ami)

```hcl
build {
  ...

  # Load SSL Certificates into AMI image
  provisioner "file" {
    source = "./server.crt"
    destination = "/home/ubuntu/server.crt"
  }
  provisioner "file" {
    source = "./server.key"
    destination = "/home/ubuntu/server.key"
  }

  # Load Nginx config file into AMI image
  provisioner "file" {
    source = "./nginx-ssl.conf"
    destination = "/home/ubuntu/nginx-ssl.conf"
  }

  ...
}
```

Step 4 - Moving Certificates and Nginx Config Files to the Proper Locations in AMI
----------------------------------------------------------------------------------

- We will post-configure AMI image using [Shell Provisioner][HashiCorp Packer Shell Provisioner]. This is achieved by
  placing a **script.sh** file under the `scripts` directory
In **scripts/aws-my-app.pkr-setup.sh** file, we add the following server configuration script:

```bash
# Install Nginx and load SSL config
sudo apt install -y nginx
sudo mv /home/ubuntu/nginx-ssl.conf /etc/nginx/sites-enabled/default
sudo mv /home/ubuntu/server.crt /etc/ssl/certs/server.crt
sudo mv /home/ubuntu/server.key /etc/ssl/private/server.key
```

Step 5 - Registering DNS Record for the EC2 Instance
----------------------------------------------------

We will expose our EC2 under that domain using [aws_route53_record][HashiCorp Terraform aws_route53_record], which 
allows us to dynamically bind EC2 IP to its hosted domain so that each time when a new EC2 instance is instantiated, 
that instance will register its IP to `my-domain.com` on Route 53.

In our **instances/aws-my-app.tf** file, we will add the following

```terraform
resource "aws_route53_record" "my-app-my-domain-com" {
  zone_id         = "SDFE94DF94FJGI4FKHYEG12E"
  name            = "my-app.my-domain.com"
  type            = "A"
  ttl             = 300
  records         = [aws_instance.my-app.public_ip]
  allow_overwrite = true
}
```

:::tip

Please change the `zone_id` value accordinly

:::

:::caution

Make sure this resource is declared after the [aws_instance][HashiCorp Terraform aws_instance], because IP is available 
only after the EC2 instance has been provisioned; The IAM user associated with the **AWS_ACCESS_KEY_ID** & 
**AWS_SECRET_ACCESS_KEY** should also have sufficient permission to interact with Route 53

In addition, the option
[**allow_overwrite**](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record#allow_overwrite)
deletes existing DNS record with name "my-app.my-domain.com"

:::

:::tip What if my domain is on Google Domain, not on Route 53?

In this case, we can simply connect Google Domain to AWS Route 53 in the following steps

1. Create a Hosted Zone in AWS Route 53:

   - Login into AWS Management Console and head towards Route 53
   - In Route 53 -> Click **Hosted zones** -> Click **Create Hosted Zone**
   - Fill in **Domain Name** and select **Type** as **Public Hosted Zone** and click create

2. Update Google Domain to use custom [name servers](https://www.domain.com/help/article/what-is-a-nameserver)

   - Log into [Google Domain][Google Domain] account and click on **My domains**
   - Click on **DNS**
   - At the top of the page, select **Custom name servers**
   - Copy and paste all four Name Server (NS) from the Route 53 Record Sets panel (Under "Hosted zone details") and
     click **save**

:::

[AWS AMI]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[AWS EC2]: https://aws.amazon.com/ec2/

[Certbot SSL]: https://qubitpi.github.io/hashicorp-aws/blog/certbot

[GitHub Action]: https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions
[GitHub Action - How to set up]: https://docs.github.com/en/actions/security-guides/encrypted-secrets
[Google Domain]: https://domains.google/

[HashiCorp Packer Build Block]: https://qubitpi.github.io/hashicorp-packer/packer/docs/templates/hcl_templates/blocks/build
[HashiCorp Packer Shell Provisioner]: https://qubitpi.github.io/hashicorp-packer/packer/docs/provisioners/shell
[HashiCorp Terraform aws_instance]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance
[HashiCorp Terraform aws_route53_record]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record.html
