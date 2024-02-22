---
sidebar_position: 9
title: Kong API Gateway
---

[//]: # (Copyright Jiaqi Liu)

[//]: # (Licensed under the Apache License, Version 2.0 &#40;the "License"&#41;;)
[//]: # (you may not use this file except in compliance with the License.)
[//]: # (You may obtain a copy of the License at)

[//]: # (    http://www.apache.org/licenses/LICENSE-2.0)

[//]: # (Unless required by applicable law or agreed to in writing, software)
[//]: # (distributed under the License is distributed on an "AS IS" BASIS,)
[//]: # (WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.)
[//]: # (See the License for the specific language governing permissions and)
[//]: # (limitations under the License.)

Deploying Kong API Gateway
==========================

hashicorp-aws deploys [Kong API Gateway] in the following way:

- Deploys [Kong API Gateway] in **HTTP** mode
- Deploys a reverse proxy Nginx in front of the [Kong API Gateway] in the same EC2 to redirect all HTTPS request to
  gateway's
  [corresponding](https://qubitpi.github.io/docs.konghq.com/gateway/latest/production/networking/default-ports/) HTTP
  ports

The diagram below illustrates the resulting deployment

![Error loading kong-deployment-diagram.png](img/kong-deployment-diagram.png)

Setup
-----

### SSL

First, please follow the [general setup guide](setup#setup) with some Nginx config modifications
[discussed in the next section](#nginx-config)

### Nginx Config

hashicorp-aws assumes the following for all of its management app deployment:

**Business logic and SSL/HTTP are separate concerns and must be decoupled from each other**

That being said, hashicorp-aws deploys Kong completely without SSL and spins up a Nginx rever proxy to handle the
HTTPS redirections to Kong's HTTP ports. Therefore:

1. hashicorp-aws uses a [customized fork of docker-kong](https://github.com/QubitPi/docker-kong) to
  [fully separate the
   app and SSL](https://github.com/QubitPi/docker-kong/pull/1),
   and, therefore,
2. the Nginx config needs multiple [servers](https://www.nginx.com/resources/wiki/start/topics/examples/server_blocks/)
   to ensure all HTTPS ports are mapped to their corresponding HTTP ports as shown in the config snippet below:

   :::tip

   All relevant HTTP and HTTPS ports are listed in
   [Kong's documentation here](https://qubitpi.github.io/docs.konghq.com/gateway/latest/production/networking/default-ports/). In general, our Nginx should **listen on an HTTPS port
   and `proxy_pass` to an HTTP port. For example, ports 8443 and 8444 are `proxy_pass`ed to 8000 and 8001, respectively,
   both of which are listed in the doc.

   One special case is HTTP port 8002, which is the Kong manager UI port. hashicorp-aws assigns user specified domain
   to each deployed Kong. Hitting the domain will simply open up a user-friendly UI by this configuration.

   :::

Here is an example that modifies the [general Nginx config](setup#configuring-reverse-proxy-on-nginx):

```text

...

server {
    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;
    server_name my.kongdomain.com;

    location / {
        proxy_pass http://localhost:8002;
    }

    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/ssl/certs/server.crt;
    ssl_certificate_key /etc/ssl/private/server.key;
}

server {
    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;
    server_name my.kongdomain.com;

    location / {
        proxy_pass http://localhost:8000;
    }

    listen [::]:8443 ssl ipv6only=on;
    listen 8443 ssl;
    ssl_certificate /etc/ssl/certs/server.crt;
    ssl_certificate_key /etc/ssl/private/server.key;
}
server {
    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;
    server_name my.kongdomain.com;

    location / {
        proxy_pass http://localhost:8001;
    }

    listen [::]:8444 ssl ipv6only=on;
    listen 8444 ssl;
    ssl_certificate /etc/ssl/certs/server.crt;
    ssl_certificate_key /etc/ssl/private/server.key;
}

...

```

Note how we changed the HTTPS' default port forwarding and added two extra server blocks for other Kong's ports.

General Deployment
------------------

### AWS Credentials

The following environment variables need to be defined:

- [AWS_ACCESS_KEY_ID](setup#aws)
- [AWS_SECRET_ACCESS_KEY](setup#aws)

### Installing HashiCorp Packer & Terraform

We will go through deployment using Packer & Terraform command line tools which can be installed by following the
instructions below:

- [Installing Packer][HashiCorp Packer - Install]
- [Installing Terraform][HashiCorp Terraform - Install]

### Getting HashiCorp Deployment Tool

```console
git clone https://github.com/QubitPi/hashicorp-aws.git
```

### Defining Packer Variables

Create a [HashiCorp Packer variable values file] named **aws-kong.auto.pkrvars.hcl** under
**[hashicorp-aws/hashicorp/kong/images]** directory with the following contents:

```hcl title=hashicorp-aws/hashicorp/kong/images/aws-kong.auto.pkrvars.hcl
aws_image_region                 = "us-east-1"
ami_name                         = "my-kong-ami"
instance_type                    = "t2.small"
aws_kong_ssl_cert_file_path      = "/path/to/ssl.crt"
aws_kong_ssl_cert_key_file_path  = "/path/to/ssl.key"
aws_kong_nginx_config_file_path  = "/path/to/nginx.conf"
```

- `aws_image_region` is the [image region][AWS regions] of [AWS AMI]
- `ami_name` is the published AMI name; it can be arbitrary
- `instance_type` is the recommended [AWS EC2 instance type] running this image
- `aws_kong_ssl_cert_file_path` is the absolute path or the path relative to `hashicorp-aws/hashicorp/kong/images` of
  the [SSL certificate file](setup#ssl) for the Kong API Gateway domain
- `aws_kong_ssl_cert_key_file_path`  is the absolute path or the path relative to `hashicorp-aws/hashicorp/kong/images` of the [SSL certificate key file](setup#ssl) for the Kong API Gateway domain
- `aws_kong_nginx_config_file_path` is the absolute path or the path relative to `hashicorp-aws/hashicorp/kong/images`
  of the [Nginx config file](#nginx-config)

### Defining Terraform Variables

Create a [HashiCorp Terraform variable values file] named **aws-kong.auto.tfvars** under
**[hashicorp-aws/hashicorp/kong/instances]** directory with the following contents:

```hcl title=hashicorp-aws/hashicorp/kong/instances/aws-kong.auto.tfvars
aws_deploy_region   = "us-east-1"
ami_name            = "my-kong-ami"
instance_type       = "t2.small"
ec2_instance_name   = "My Kong API Gateway"
ec2_security_groups = ["My Kong API Gateway Security Group"]
route_53_zone_id    = "MBS8YLKZML18VV2E8M8OK"
gateway_domain      = "gateway.mycompany.com"
```

- `aws_deploy_region` is the [EC2 runtime region][AWS regions]
- `ami_name` is the name of the published AMI; **it must be the same as the `ami_name` in
  [Packer variable file](#defining-packer-variables)**
- `instance_type` is the chosen [AWS EC2 instance type] at runtime
- `ec2_instance_name` is the deployed EC2 name as appeared in the instance list of AWS console; it can be arbitrary
- `ec2_security_groups` is the [AWS Security Group] _name_ (yes, not ID, but name...)
- `gateway_domain` is the SSL-enabled domain that will serve [Kong manager UI]

  :::warning

  Although the `gateway_domain` is a public identity, hashicorp-aws will bind a **private IP** address to this domain

  :::

- `route_53_zone_id` is the AWS Route 53 hosted Zone ID that hosts the domain `gateway.mycompany.com`

  :::tip

  To find the zone ID in AWS Route 53, we can:

  1. Sign in to the AWS Management Console
  2. Open the Route 53 console at https://console.aws.amazon.com/route53/
  3. Select Hosted zones in the navigation pane
  4. Find the requested ID in the top level Hosted Zones summary in the Route 53 section

  :::

### Building AMI Image

```bash
cd hashicorp-aws/hashicorp/kong/images
packer init .
packer validate -var "skip_create_ami=true" .
packer build -var "skip_create_ami=false" .
```

### Deploying to EC2

:::caution

Depending on the [AMI](#defining-packer-variables) and [EC2](#defining-terraform-variables) configs, **please be aware
AWS credit charges shall incur after the following commands execute**

:::

```bash
cd ../instances
terraform init
terraform validate
terraform apply -auto-approve
```

Deployment via Screwdriver CD
-----------------------------

hashicorp-aws also support deployment using [Screwdriver CD] with this [Kong API Gateway Release Definition Template]

Deployment via HACP
-------------------

:::tip

Please try our HACP platform to deploy a Kong instance. It gives us one-click experience that helps us stand up an API
gateway in a minute.

:::

Troubleshooting
---------------

### Security Group Isn't Working as Expected in AWS

This could happen when we are accessing the deployed gateway from a public IP address, such as our personal computer.

Complying with the best security practice, hashicorp-aws binds _private_ EC2 IP to a Route 53 domain. Since it is a
common practice to limit the API gateway access by assigning gateway instance with
[inbound rules](https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html). hashicorp-aws also manages
to disable all HTTP request to the gateway. Therefore, any public visit to our deployed gateway instance has to go
through the gateway domain.

But since the domain is bound by a private IP, accessing the gateway through the domain from public IP source will hit
the private IP, which would always fail _independent_ of security group configs

:::info

The reason we bind _private_ IP to domain is that
[when gateway is used for inter security-group communication, it works
over private addressing. If we use the public IP address the firewall rule will not recognise the source security group](https://stackoverflow.com/a/24242211).
This is particularly important when the gateway is serving API to downstream services such as frontend APP.

:::

_The solution_? To access the gateway manually from our machine, for instance, we should address the instance using the
Public DNS record - this will actually be pointed at the private IP address when we hit the DNS name.

For example, if our instance has public IP `203.0.113.185` and private IP `10.1.234.12`, we are given a public DNS name
like `ec2-203-0-113-185.eu-west-1.compute.amazonaws.com`, which will resolve to `203.0.113.185` if queried externally,
or `10.1.234.12` if queried internally. This will enable our security groups to work as intended. See
[this thread](https://stackoverflow.com/a/24242211) for more details.

[AWS AMI]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[AWS EC2 instance type]: https://aws.amazon.com/ec2/instance-types/
[AWS regions]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Availability
[AWS Security Group]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html

[hashicorp-aws/hashicorp/kong/images]: https://github.com/QubitPi/hashicorp-aws/tree/master/hashicorp/kong/images
[hashicorp-aws/hashicorp/kong/instances]: https://github.com/QubitPi/hashicorp-aws/tree/master/hashicorp/kong/instances
[HashiCorp Packer - Install]: https://qubitpi.github.io/hashicorp-packer/packer/install
[HashiCorp Packer variable values file]: https://qubitpi.github.io/hashicorp-packer/packer/guides/hcl/variables#from-a-file
[HashiCorp Terraform - Install]: https://qubitpi.github.io/hashicorp-terraform/terraform/install
[HashiCorp Terraform variable values file]: https://qubitpi.github.io/hashicorp-terraform/terraform/language/values/variables#variable-definitions-tfvars-files

[Kong API Gateway]: https://qubitpi.github.io/docs.konghq.com/gateway/latest/
[Kong API Gateway Release Definition Template]: https://github.com/QubitPi/kong-api-gateway-release-definition-template
[Kong manager UI]: https://qubitpi.github.io/docs.konghq.com/gateway/latest/kong-manager/

[Screwdriver CD]: https://qubitpi.github.io/screwdriver-cd-homepage/
