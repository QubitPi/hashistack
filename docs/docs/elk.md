---
sidebar_position: 3
title: Elastic Stack (ELK)
---

Operations and SRE teams can use [hashicorp-aws] to safely manage ELK deployment using infrastructure as code 
methodology, which allows us to peer-reviewed infrastructure changes in an automated and controlled fashion.

:::info What is the ELK Stack?

The ELK stack is an acronym used to describe a stack that comprises three popular projects: [Elasticsearch],
[Logstash], and [Kibana]. Often referred to as Elasticsearch, the ELK stack gives us the ability to aggregate logs from 
all our systems and applications, analyze these logs, and create visualizations for application and infrastructure 
monitoring, faster troubleshooting, security analytics, and more.

:::

**Assuming ELK is a _non-frequently deployed_ tech asset, [hashicorp-aws] makes it a semi-automated deployment**.

:::caution

[hashicorp-aws] deploys ELK as a [t2.large](https://aws.amazon.com/ec2/instance-types/t2/) instance. This is because all
Elasticsearch, Kibana, and Logstash are contained in it, which can cause
[performance issue](https://stackoverflow.com/a/50022217) in small instance. _t2.large_, by experiment, is the smallest
size that supports smooth runtime. For that, **please be aware AWS credit charges shall incur afterward**

:::

Getting ELK Deployer
--------------------

```bash
git clone https://github.com/QubitPi/hashicorp-aws.git
cd hashicorp/elk
```

Configuring Deployment
----------------------

:::tip

People may jump directly to the end of [this section](#configuring-deployment) to see what the final config looks like

:::

### Authenticating to AWS

Before we can build the AMI, we need to provide our AWS credentials to Packer and Terraform. These credentials have 
permissions to create, modify, and delete AMI images and EC2 instances.

To allow HashiCorp to access our IAM user credentials, set our AWS access key ID and secret key as environment 
variables:

```bash
AWS_ACCESS_KEY_ID="<YOUR_AWS_ACCESS_KEY_ID>"
AWS_SECRET_ACCESS_KEY="<YOUR_AWS_SECRET_ACCESS_KEY>"
```

:::info

The _IAM user_ associated with the credentials above must have the following [AWS permissions policies]:

- IAMFullAccess
- AmazonEC2FullAccess
- AmazonRoute53FullAccess

:::

### Defining Config Directory

#### Preparing for SSL

Please [obtain SSL certificate and key][Certbot SSL] and put them in 2 files. Let's call them **server.crt** 
(certificate) and **server.key** (certificate key)

##### Nginx

We will have a Nginx reverse proxy to serve HTTPS and have a config file called **nginx-ssl.conf**:

:::tip

Replace `my-domain.com` with the domain backed by the [SSL](#preparing-for-ssl) accordingly below

:::

```text
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
    server_name my-domain.com;

    location / {
        proxy_pass http://localhost:5601;
    }

    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/ssl/certs/server.crt;
    ssl_certificate_key /etc/ssl/private/server.key;
}

server {
    if ($host = my-domain.com) {
        return 301 https://$host$request_uri;
    }

    listen 80 ;
    listen [::]:80 ;
    server_name my-domain.com;
    return 404;
}
```

#### Defining Packer Variables

Create a file named **aws-elk.pkrvars.hcl** with the following contents:

```hcl
aws_image_region           = "us-east-2"
ssl_cert_file_path         = "/absolute/path/to/server.crt"
ssl_cert_key_file_path     = "/absolute/path/to/server.key"
ssl_nginx_config_file_path = "/absolute/path/to/nginx-ssl.conf"
```

- **aws_image_region** is the region where ELK AMI will be published to. The published image will be _private_
- **ssl_cert_file_path** and **ssl_cert_key_file_path** above are the local absolute paths to SSL certificate file and
  SSL certificate key, respectively. They can be [obtained via Certbot](https://qubitpi.github.io/hashicorp-aws/blog/certbot)
- **ssl_nginx_config_file_path** is the local absolute path to the Nginx config file (see **an example** below) that
  consumes the SSL certificate above and enables HTTPS.

#### Defining Terraform Variables

Create a file named **aws-elk.tfvars** with the following contents:

```hcl
aws_deploy_region = "us-east-2"
zone_id = "<AWS Route 53 Zone ID>"
elk_doman = "myelk.mycompany.com"
key_pair_name = "<AWS keypair name for SSH>"
instance_name = "<AWS EC2 displayed instance name>"
security_group = "<AWS Security Group for the EC2 instance>"
```

#### Defining Config Directory Path

Put the _aws-elk.pkrvars.hcl_ and _aws-elk.tfvars_ in a directory. We will call it **ELK_HC_CONFIG_DIR** (along with 
our source code dir **ELK_HC_CONFIG_DIR**):

```bash
ELK_HC_DIR=...
ELK_HC_CONFIG_DIR=/absolute/path/to/hashicorp/elk
```

:::caution

Make sure `*_DIR` path does not end with "/", for example, instead of `ELK_HC_DIR=/home/ubuntu/config/`, we should use
`ELK_HC_DIR=/home/ubuntu/config`

:::

At the end of the day, the following environment variable (with example values) needs to be defined:

```bash
export HC_DIR=/home/ubuntu/hashicorp-aws/hashicorp/elk
export HC_CONFIG_DIR=/home/ubuntu/hashicorp-aws/hashicorp/elk/config-files/
export AWS_ACCESS_KEY_ID="LOA8TQ2ZOSKFRLFSHDWC"
export AWS_SECRET_ACCESS_KEY="F9Wt082IXjW426QGRdvrsowFhHARt85YlJ2WURri"
```

Running Script
--------------

After running

```bash
./deploy.sh
```

record the **Elasticsearch password (for _elastic_ user)** at command line prompt. For example

```shell
==> install-elk.amazon-ebs.elk: + sudo /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
==> install-elk.amazon-ebs.elk: + yes
    install-elk.amazon-ebs.elk: This tool will reset the password of the [elastic] user to an autogenerated value.
    install-elk.amazon-ebs.elk: The password will be printed in the console.
    install-elk.amazon-ebs.elk:
    install-elk.amazon-ebs.elk:
    install-elk.amazon-ebs.elk: Password for the [elastic] user successfully reset.
    install-elk.amazon-ebs.elk: New value: dsrg34IKHU787iud=dio
```

In this case, the password is **dsrg34IKHU787iud=dio** which is shown in the last line of the output above.

### Post Setup in EC2 Instance

As we've mentioned in the beginning, this is a semi-deployment and we still need to SSH into the box to manually
generate Kibana token & verification code. This will make the automated deploymentl logic simple and easy to maintain

```bash
sudo /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token --scope kibana --url "https://localhost:9200"
sudo /usr/share/kibana/bin/kibana-verification-code
```

Now we can visit `https://myelk.mycompany.com` to enter the token and verification code to access our ELK instance.

#### Logstash

Logstash, at this moment, supports redirecting log lines from Filebeat to Elasticsearch and, similar to the
token and verification above, needs to be setup manually.

Create a file named **logstash-filebeat.conf** in the default location chosen by Logstash:

```bash
sudo nano /usr/share/logstash/logstash-filebeat.conf
```

Copy and paste the following contents into the file

:::info

Replace the `<password for user 'elastic'>` accordingly. If the user is _elastic_, which is the case here, the password
has been generated during the [AMI image building phase](#building-ami-image)

:::

```text
input {
    beats {
        port => "5044"
    }
}

output {
    elasticsearch {
        hosts => [ "https://localhost:9200" ]

        ssl_certificate_verification => false

        user => "elastic"

        password => "<password for user 'elastic'>"
    }
}
```

Start Logstash with:

```bash
sudo /usr/share/logstash/bin/logstash -f logstash-filebeat.conf --config.reload.automatic
```

or with nohup at background:

```bash
nohup sudo /usr/share/logstash/bin/logstash -f logstash-filebeat.conf --config.reload.automatic &
```

[AWS permissions policies]: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_access-management.html

[Certbot SSL]: https://qubitpi.github.io/hashicorp-aws/blog/certbot

[hashicorp-aws]: https://qubitpi.github.io/hashicorp-aws/

[Elasticsearch]: https://qubitpi.github.io/elasticsearch/
[Kibana]: https://qubitpi.github.io/kibana/
[Logstash]: https://qubitpi.github.io/logstash/
