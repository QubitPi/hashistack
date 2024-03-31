---
sidebar_position: 1
title: General Deployment
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

General Deployments
-------------------

:::info

Please complete the following two prerequisite setups before preceding

1. [general setup](../setup#setup) (without [SSL setup](../setup#optional-setup-ssl))
2. [DNS setup][docker-mailserver DNS setup]

### Defining Packer Variables

Create a [HashiCorp Packer variable values file] named **aws-docker-mailserver.pkrvars.hcl** under
**[hashicorp-aws/hashicorp/docker-mailserver/images]** with the following contents:

```hcl title="hashicorp-aws/hashicorp/docker-mailserver/images/aws-docker-mailserver.auto.pkrvars.hcl"
ami_region          = "us-east-1"
ami_name            = "my-docker-mailserver-ami"
ssl_cert_source     = "/path/to/ssl.crt"
ssl_cert_key_source = "/path/to/ssl.key"
base_domain         = "mycompany.com"
```

- `ami_region` is the [region][AWS regions] where docker-mailserver [AMI][AWS AMI] will be published to. The published
  image will be _private_
- `ami_name` is the published [AMI][AWS AMI] name; it can be arbitrary
- `ssl_cert_source` is the absolute path or the path relative to [hashicorp-aws/hashicorp/docker-mailserver/images] of
  the [SSL certificate file](../setup#optional-setup-ssl) for the domain serving the docker-mailserver EC2 instance
- `ssl_cert_key_source`  is the absolute path or the path relative to
  [hashicorp-aws/hashicorp/docker-mailserver/images] of the [SSL certificate key file](../setup#optional-setup-ssl) for
  the domain serving the docker-mailserver EC2 instance

  :::info

  hashicorp-aws [supports SSL][docker-mailserver SSL setup] with the
  [Bring Your Own Certificates][docker-mailserver SSL setup - Bring Your Own Certificates] option

  :::

- `base_domain` is the base domain name of the MX record. For example, if base domain is 'mycompany.com', the generated
  MX record will be 'mail.mycompany.com'

- (Optional) `instance_type`: is the [AWS EC2 instance type] building this image. hashicorp-aws uses "t2.micro" as
  default value if this value is unspecified

### Defining Terraform Variables

Create a [HashiCorp Terraform variable values file] named **aws-docker-mailserver.tfvars** under
**[hashicorp-aws/hashicorp/docker-mailserver/instances]**with the following contents:

```hcl title="hashicorp-aws/hashicorp/docker-mailserver/instances/aws-docker-mailserver.auto.tfvars"
aws_deploy_region    = "us-east-1"
ami_name             = "my-docker-mailserver-ami"
instance_name        = "My docker-mailserver instance"
key_pair_name        = "My SSH keypair name"
security_groups      = ["My docker-mailserver Security Group"]
base_domain          = "mycompany.com"
route_53_zone_id     = "9DQXLTNSN7ZX9P8V2KZII"
first_email          = "jack@mycompany.com"
first_email_password = "sdfeo9uig&^&rf8u"
```

- `aws_deploy_region` is the [EC2 runtime region][AWS regions] where docker-mailserver EC2 instance will be deployed
  into
- `ami_name` is the name of the published AMI; **it must be the same as the `ami_name` in
  [Packer variable file](#defining-packer-variables)**
- `instance_name` is the deployed EC2 name as appeared in the instance list of AWS console; it can be arbitrary
- `key_pair_name` is the name of
  [AWS EC2 key pair] bound to this docker-mailserver instance. We can use this key pair to later ssh into the instance
  for admin management purposes
- `security_groups` is the list of [AWS Security Group] _names_ to associate with (yes, not ID, but name...)

  :::tip

  The security group must open all the ports mentioned [docker-mailserver's documentation][docker-mailserver ports]

  :::

- `base_domain` is the base domain name of the MX record. For example, if base domain is 'mycompany.com', the generated
  MX record will be 'mail.mycompany.com'

  :::note

  hashicorp-aws will bind a _private_ IP address to this domain because
  [AWS security groups works for private IP only for DNS resolving](https://serverfault.com/a/967483).

  :::

- `route_53_zone_id` is the AWS Route 53 hosted Zone ID that hosts the domain "mail.mycompany.com"

  :::tip

  To find the zone ID in AWS Route 53, we can:

  1. Sign in to the AWS Management Console
  2. Open the Route 53 console at https://console.aws.amazon.com/route53/
  3. Select Hosted zones in the navigation pane
  4. Find the requested ID in the top level Hosted Zones summary in the Route 53 section

  :::

- `first_email` is the email used for mail server startup.
- `first_email_password` is the password of the email for mail server startup

  :::tip

  On first start, we will need to add at least one email account. The provided first email will be used for that and
  can be used for sending/receiving emails immediately after deployment

  :::

- (Optional) `instance_type`: is the [AWS EC2 instance type] running the EC2 instance. hashicorp-aws uses "t2.micro" as
  default value if this value is unspecified

### Building AMI Image

```console
cd hashicorp-aws/hashicorp/docker-mailserver/images
packer init .
packer validate -var "skip_create_ami=true" .
packer build -var "skip_create_ami=false" .
```

### Deploying to EC2

:::caution

Depending on the [AMI](#defining-packer-variables) and [EC2](#defining-terraform-variables) configs, **please be aware
AWS credit charges shall incur after the following commands execute**

:::

```console
cd ../instances/
terraform init
terraform validate
terraform apply -auto-approve
```

Deployment via Screwdriver CD
-----------------------------

hashicorp-aws supports deployment using [Screwdriver CD](screwdriver-cd-deployment). Please check it out. <img src="https://github.com/QubitPi/QubitPi/blob/master/img/8%E5%A5%BD.gif?raw=true" height="40px"/>

Deployment via HACP
-------------------

:::tip

Please try our HACP platform to deploy a docker-mailserver instance. It gives us one-click experience that helps us
stand up docker-mailserver in a minute.

:::

[AWS AMI]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[AWS EC2 instance type]: https://aws.amazon.com/ec2/instance-types/
[AWS EC2 key pair]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html
[AWS regions]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Availability
[AWS Security Group]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html

[docker-mailserver DNS setup]: https://qubitpi.github.io/docker-mailserver/edge/usage/#minimal-dns-setup
[docker-mailserver ports]: https://qubitpi.github.io/docker-mailserver/edge/config/security/understanding-the-ports/#overview-of-email-ports
[docker-mailserver SSL setup]: https://qubitpi.github.io/docker-mailserver/edge/config/security/ssl/
[docker-mailserver SSL setup - Bring Your Own Certificates]: https://qubitpi.github.io/docker-mailserver/edge/config/security/ssl/#bring-your-own-certificates

[hashicorp-aws/hashicorp/docker-mailserver/images]: https://github.com/QubitPi/hashicorp-aws/tree/master/hashicorp/docker-mailserver/images
[hashicorp-aws/hashicorp/docker-mailserver/instances]: https://github.com/QubitPi/hashicorp-aws/tree/master/hashicorp/docker-mailserver/instances
[HashiCorp Packer variable values file]: https://qubitpi.github.io/hashicorp-packer/packer/guides/hcl/variables#from-a-file
[HashiCorp Terraform variable values file]: https://qubitpi.github.io/hashicorp-terraform/terraform/language/values/variables#variable-definitions-tfvars-files
