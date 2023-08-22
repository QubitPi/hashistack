---
sidebar_position: 2
---

[//]: # ([![GitHub Market Place Badge][GitHub Market Place Badge]]&#40;https://github.com/marketplace/actions/hashicorp-aws&#41;)

HashiCorp AWS - Immutable Infrastructure as Code via GitHub Action
------------------------------------------------------------------

[HashiCorp AWS][HashiCorp AWS] is an opinionated CI/CD [GitHub Action][What is GitHub Action] that

1. packages an application into an [AMI image][AWS AMI] and registers it onto AWS, then
2. deploys an [EC2 instance][AWS EC2] of that AMI

![Error loading hashicorp-aws.png](https://github.com/QubitPi/QubitPi/blob/master/img/hashicorp-aws/hashicorp-aws.png?raw=true)

How to Use HashiCrop AWS
------------------------

### Step 1 - Setting up HashiCrop Packer & Terraform Template Files

HashiCorp AWS action follows [HashiCrop's best practice][HashiCorp Tutorial] by expecting a directory called
**hashicorp** located at the root of the repository. It's structure looks like this:

```bash
.
└── my-app-repository/
    ├── hashicorp/
    │   ├── images/
    │   │   ├── aws-my-app.pkr.hcl
    │   │   └── variables.pkr.hcl
    │   ├── instances/
    │   │   └── main.tf
    │   └── scripts/
    │       └── script.sh
    ├── src
    └── ...
```

> Diagram generated from [tree.nathanfriend.io](https://tree.nathanfriend.io/)

- The **aws-my-app.pkr.hcl** is the standard [HashiCorp Packer Template][HashiCorp Packer Template] file. For example
- The **variables.pkr.hcl**  is the standard [Packer Variable][HashiCorp Packer Variables] definitions

    - Place make sure to place the following variable declaration block in _variables.pkr.hcl_ this is an
      [inversion of control][inversion of control] variable required by [HashiCorp AWS][HashiCorp AWS]. The value of this
      variable will be set to the _AWS_REGION_ which will be talked about later

      ```hcl
      variable "aws_image_region" {
        type =  string
        sensitive = true
      }
      ```

      Packer template file can [use this variable][HashiCorp Packer Variables] however needed

- The **main.tf** is the standard [HashiCorp Terraform Config File][HashiCorp Terraform Config File]

    - Similar to _variables.pkr.hcl_, please put a variable called **aws_deploy_region** _at the top_ of this file:

      ```terraform
      variable "aws_deploy_region" {
        type = string
        description = "The EC2 region"
      }
      ```

      The value of this variable will be set to the _AWS_REGION_ which will be talked about later. Terraform config file
      can [use this variable][HashiCorp Terraform Variables] however needed

- HashiCorp AWS configures AMI image using
  [Shell Provisioner][HashiCorp Packer Shell Provisioner]. This is achieved by placing a **script.sh** file under
  the `scripts` directory
- A complete working example can be found [here][QubitPi/mlflow hashicorp config files]

### Step 2 - Defining Action File

Under regular `.github/workflows` directory, create a `.yml` file with a preferred name with the following
example contents:

```yaml
---
name: My App IaC Definition (HashiCorp)

"on":
  pull_request:
  push:
    branches:
      - master

jobs:
  hashicorp:
    name: Publish my-app AMI Image and Deploy It to EC2 through HashiCorp
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: hashicorp
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Publish my-app AMI image and deploy it to EC2 through HashiCorp
        uses: QubitPi/hashicorp-aws@master
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
```

In the example above:

- Each pull request (and every new commits to that PR) validates HashiCorp Packer & Terraform files as tests
- Each `master` branch commit run the tests above and, if successful, publish the image to AWS AMI registry and then
  deploy the images to EC2 instances automatically
- Old AMI image with the same name will be deregistered. HashiCorp AWS Action takes the opinionated view that
  _deployment should always consume the latest AMI_
- The following [GitHub Action Secrets][How to set up GitHub Action Secrets] needs to be setup

    - [**AWS_ACCESS_KEY_ID**](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html)
    - [**AWS_SECRET_ACCESS_KEY**](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html)
    - [**AWS_REGION**](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html)

- The Security Group of the EC2 instance, however, still needs to be manually configured. This is planned to be
  automated in the near future.
- A complete working example can be found [here][Qubitpi/mlflow github action file]

### FAQ

#### How do I define custom environment variables for "Packer template files"/"Terraform config files"/"script.sh file"

Let's say our Packer [shell provisioner][HashiCorp Packer Shell Provisioner] script (i.e. _script.sh_ file) needs to
interact with some 3rd party API with a _username_ and _token_. Knowing that it's a bad practice to hard-code token
publicly in the script, we can use pass our username/token into HashiCorp context through GitHub Action using the 2
following [GitHub Secrets][How to set up GitHub Action Secrets]

- `${{ secrets.AUTH_USERNAME }}`
- `${{ secrets.AUTH_TOKEN }}`

##### Declare Packer Variables

After the two secrets above have been created, we will initiate a new **my-app.auto.pkrvars.hcl** file under
_hashicorp/images_ with the following contents:

```hcl
AUTH_USERNAME = "AUTH_USERNAME_INJECTED_BY_CI_CD"
AUTH_TOKEN = "AUTH_TOKEN_INJECTED_BY_CI_CD"
```

> We can replace
>
> - `AUTH_USERNAME_INJECTED_BY_CI_CD`
> - `AUTH_TOKEN_INJECTED_BY_CI_CD`
>
> with anything else. These two values will be used as a placeholder for dynamic replacement by the 2 secret values

Add the following variable declarations in the aforementioned **variables.pkr.hcl** file:

```hcl
variable "AUTH_USERNAME" {
  type    = string
  sensitive = true
}

variable "AUTH_TOKEN" {
  type    = string
  sensitive = true
}
```

##### Load Environment Variables into GitHub Action Context

Add an extra step "Load custom environment variables into Packer variable file" shown below by injecting the two
aforementioned GitHub secrets:

> Make sure to replace **AUTH_USERNAME_INJECTED_BY_CI_CD** and **AUTH_TOKEN_INJECTED_BY_CI_CD** if needed

```yaml
    ...

    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Load custom environment variables into Packer variable file
        working-directory: hashicorp/images
        run: |
          sed -i -e 's/AUTH_USERNAME_INJECTED_BY_CI_CD/${{ secrets.AUTH_USERNAME }}/g' my-app.auto.pkrvars.hcl
          sed -i -e 's/AUTH_TOKEN_INJECTED_BY_CI_CD/${{ secrets.AUTH_TOKEN }}/g' my-app.auto.pkrvars.hcl
        
      - name: Publish my-app AMI image and deploy it to EC2 through HashiCorp
        uses: QubitPi/hashicorp-aws@master
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
```

##### Passing the Environment Variable

In the packer template file **aws-my-app.pkr.hcl**, our environment variable will be available as

- **${var.AUTH_USERNAME}**, and
- **${var.AUTH_TOKEN}**

and can be passed into **script.sh** file using [shell provisioner][HashiCorp Packer Shell Provisioner]:

```hcl
  provisioner "shell" {
    environment_vars = [
      "AUTH_USERNAME=${var.AUTH_USERNAME}",
      "AUTH_TOKEN=${var.AUTH_TOKEN}"
    ]
    script = "../scripts/setup.sh"
  }
```

The variables are reference in the _script.sh_ by

- `$AUTH_USERNAME`
- `$AUTH_TOKEN`

#### How to Enable SSL Automatically Through [HashiCorp AWS][HashiCorp AWS]

Let's image the following scenario:

1. I purchased a domain from [Google Domain][Google Domain] called **my-domain.com**
2. I developed a web app that will be exposed at **my-app.my-domain.com**
3. I will deploy my app to [AWS EC2][AWS EC2] using [HashiCorp AWS][HashiCorp AWS]
4. Right after EC2 is up, I need to automatically enable secure SSL communication so that my app can be visited at
   `https://my-app.my-domain.com`

Assuming that **[HashiCorp AWS][HashiCorp AWS], or Immutable Infrastructure in general, is not responsible for SSL
certificates lifecycle management**, we can read the certificate from [GitHub Action][What is GitHub Action] and
load it into EC2 instance in the following way:

##### Step 1 - Store SSL Certificate in [GitHub Secrets][How to set up GitHub Action Secrets]

Assuming we have
[obtained both the certificate and certificate key][obtaining SSL certificate manually through Certbot], we have the
following [GitHub Action Secrets][How to set up GitHub Action Secrets] set up first

- **SSL_CERTIFICATE**: The content of the certificate file
- **SSL_CERTIFICATE_KEY**: The content of the certificate key file

##### Step 2 - Load Certificate into HashiCorp Context through [GitHub Action][What is GitHub Action]

Right before the [HashiCorp AWS][HashiCorp AWS] step, we will put the following "Load SSL Certificates" step:

```yaml
  ...

  steps:
    ...

    - name: Load SSL Certificates
      working-directory: hashicorp/images
      run: |
        echo '${{ secrets.SSL_CERTIFICATE }}' > server.crt
        echo '${{ secrets.SSL_CERTIFICATE_KEY }}' > server.key

    - name: Publish my-app AMI image and deploy it to EC2 through HashiCorp
      uses: QubitPi/hashicorp-aws@master
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ${{ secrets.AWS_REGION }}
```

##### Step 3 - Define Nginx Reverse Proxy Config File

Note that in the following config, Nginx assumes the certificate file and its key file are located at
**/etc/ssl/certs/server.crt** and **/etc/ssl/private/server.key**, respectively. In addition, please modify
`my-app.my-domain.com` in it accordingly:

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

##### Step 3 - Loading Certificates and Nginx Config Files into AMI Image

In the [build block][HashiCorp Packer Build Block] of our **images/aws-my-app.pkr.hcl** file, we add 3 provisioners to
load the certificate, certificate key, and the Nginx reverse proxy config file into AMI.

> Note that Packer's file provisioner do not have root user privilege to put our files directly to the desired
> locations. We will put them instead to a temporary location and have the shell provisioner to move them second time
> to the destinated locations in the
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

##### Step 4 - Moving Certificates and Nginx Config Files to the Proper Locations in AMI

In **scripts/setup.sh** file, we add the following server configuration script:

```bash
# Install Nginx and load SSL config
sudo apt install -y nginx
sudo mv /home/ubuntu/nginx-ssl.conf /etc/nginx/sites-enabled/default
sudo mv /home/ubuntu/server.crt /etc/ssl/certs/server.crt
sudo mv /home/ubuntu/server.key /etc/ssl/private/server.key
```

##### Step 5 - Registering DNS Record for the EC2 Instance

The [certificate we provided][obtaining SSL certificate manually through Certbot] works only for one certain domain,
i.e. _my-app.my-domain.com_ in our case. We need to expose our EC2 under that domain.
[aws_route53_record][HashiCorp Terraform aws_route53_record] allows us to dynamically bind EC2 IP to its hosted domain
so that each time when a new EC2 instance is instantiated, that instance will register its IP to `my-domain.com` on
Route 53.

In our **instances/main.tf** file, we will add the following

> Make sure this resource is after the _aws_instance_, because IP is available only after the EC2 instance has been
> provisioned; The IAM user associated with the _AWS_ACCESS_KEY_ID_ & _AWS_SECRET_ACCESS_KEY_ should also have
> sufficient permission to interact with Route 53
>
> In addition, the option
> [**allow_overwrite**](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record#allow_overwrite)
> deletes existing DNS record with name "my-app.my-domain.com"

```terraform
resource "aws_route53_record" "my-app-my-domain-com" {
  zone_id         = "SDFE943RBVIN3O202YEG12E"
  name            = "my-app.my-domain.com"
  type            = "A"
  ttl             = 300
  records         = [aws_instance.my-app.public_ip]
  allow_overwrite = true
}
```

> **What if my domain is on Google Domain, not on Route 53?**
>
> In this case, we can simply connect Google Domain to AWS Route 53 in the following steps
>
> 1. Create a Hosted Zone in AWS Route 53:
>
>    - Login into AWS Management Console and head towards Route 53
>    - In Route 53 -> Click **Hosted zones** -> Click **Create Hosted Zone**
>    - Fill in **Domain Name** and select **Type** as **Public Hosted Zone** and click create
>
> 2. Update Google Domain to use custom [name servers](https://www.domain.com/help/article/what-is-a-nameserver)
>
>    - Log into [Google Domain][Google Domain] account and click on **My domains**
>    - Click on **DNS**
>    - At the top of the page, select **Custom name servers**
>    - Copy and paste all four Name Server (NS) from the Route 53 Record Sets panel (Under "Hosted zone details") and
>      click **save**

[AWS AMI]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[AWS EC2]: https://aws.amazon.com/ec2/

[GitHub Market Place Badge]: https://img.shields.io/badge/Github%20Marketplace-1E883D.svg?style=for-the-badge&logo=Github&logoColor=white
[Google Domain]: https://domains.google/

[//]: # ([HashiCorp AWS]: https://github.com/marketplace/actions/hashicorp-aws)
[HashiCorp Tutorial]: https://developer.hashicorp.com/terraform/tutorials/provision/packer
[HashiCorp Packer Build Block]: https://qubitpi.github.io/hashicorp-packer/packer/docs/templates/hcl_templates/blocks/build
[HashiCorp Packer Shell Provisioner]: https://qubitpi.github.io/hashicorp-packer/packer/docs/provisioners/shell
[HashiCorp Packer Template]: https://developer.hashicorp.com/packer/tutorials/aws-get-started/aws-get-started-build-image#write-packer-template
[HashiCorp Packer Variables]: https://qubitpi.github.io/hashicorp-packer/packer/guides/hcl/variables
[HashiCorp Terraform aws_route53_record]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record.html
[HashiCorp Terraform Config File]: https://developer.hashicorp.com/terraform/tutorials/aws-get-started/aws-build#write-configuration
[HashiCorp Terraform Variables]: https://qubitpi.github.io/hashicorp-terraform/terraform/language/values/variables
[How to set up GitHub Action Secrets]: https://docs.github.com/en/actions/security-guides/encrypted-secrets

[inversion of control]: https://en.wikipedia.org/wiki/Inversion_of_control

[License Badge]: https://img.shields.io/badge/Apache%202.0-F25910.svg?style=for-the-badge&logo=Apache&logoColor=white

[obtaining SSL certificate manually through Certbot]: https://qubitpi.github.io/aergia/blog/jenkins-on-aws#applying-for-a-certificate-using-certbot

[QubitPi/mlflow hashicorp config files]: https://github.com/QubitPi/mlflow/tree/master/hashicorp
[Qubitpi/mlflow github action file]: https://github.com/QubitPi/mlflow/blob/master/.github/workflows/hashicorp.yml

[What is GitHub Action]: https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions
