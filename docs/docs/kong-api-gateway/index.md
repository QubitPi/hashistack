---
sidebar_position: 1
title: General Deployment
---

Deploying Kong API Gateway
==========================

hashistack deploys [Kong API Gateway] in the following way:

- Deploys [Kong API Gateway] in **HTTP** mode
- Deploys a reverse proxy Nginx in front of the [Kong API Gateway] in the same EC2 to redirect all HTTPS request to
  gateway's [corresponding][Kong gateway - various ports] HTTP ports

The diagrams below illustrates the resulting deployment

![Error loading kong-deployment-diagram.png](img/kong-deployment-diagram.png)

General Deployments
-------------------

:::info

Please complete the [general setup](../setup#setup) before proceeding.

:::

::::tip[Supporting HTTPS Protocol]

hashistack uses a [customized fork of docker-kong](https://github.com/QubitPi/docker-kong) to
[fully separate the app and SSL](https://github.com/QubitPi/docker-kong/pull/1), and, therefore, the Nginx config needs
multiple [servers](https://www.nginx.com/resources/wiki/start/topics/examples/server_blocks/)
to ensure all HTTPS ports are mapped to their corresponding HTTP ports as shown in the config snippet below:

:::note

All relevant HTTP and HTTPS ports are listed in [Kong's documentation here][Kong gateway - various ports]. In general,
our Nginx should **listen on an HTTPS port and `proxy_pass` to an HTTP port. For example, ports 8443 and 8444 are
`proxy_pass`ed to 8000 and 8001, respectively, both of which are listed in the doc.

One special case is HTTP port 8000, which is the redirect port. hashistack maps the standard SSL 443 port to 8000 so
that any downstream (such as UI web app) simply needs to hit the domain without specifying port number and have its
request be reidrected to upstream services (such as database webservice)

![Error loading kong-ports-diagram.png](img/kong-ports-diagram.png)

:::

::::

### Defining Packer Variables

Create a [HashiCorp Packer variable values file] named **aws-kong.auto.pkrvars.hcl** under
**[hashistack/hashicorp/kong-api-gateway/images]** directory with the following contents:

```hcl title="hashistack/hashicorp/kong-api-gateway/images/aws-kong.auto.pkrvars.hcl"
ami_region              = "us-east-1"
ami_name                = "my-kong-ami"
instance_type           = "t2.small"
kong_api_gateway_domain = "gateway.mycompany.com"
ssl_cert_base64         = "YXNkZnNnaHRkeWhyZXJ3ZGZydGV3ZHNmZ3RoeTY0cmV3ZGZyZWd0cmV3d2ZyZw=="
ssl_cert_key_base64     = "MzI0NXRnZjk4dmJoIGNsO2VbNDM1MHRdzszNDM1b2l0cmo="
```

- `ami_region` is the [image region][AWS regions] where Kong API Gateway [AMI][AWS AMI] will be published to. The
  published image will be _private_
- `ami_name` is the name of the resulting AMI that will appear when managing AMIs in the AWS console or via APIs. This
  can be the same across builds, because hashistack will deregister the old AMI with the same name and replace it
  with the current built one
- `instance_type` The [AWS EC2 instance type] to use while _building_ the AMI
- `kong_api_gateway_domain` is the SSL-enabled domain that will serve the
  [various ports of Kong gateway][Kong gateway - various ports]
- `ssl_cert_base64` is a __base64 encoded__ string of the content of
  [SSL certificate file](../setup#optional-setup-ssl) for the SSL-enabled domain, i.e. 'mygateway.mycompany.com' given
  the `kong_api_gateway_domain` is 'mygateway.mycompany.com'
- `ssl_cert_key_base64` is a __base64 encoded__ string of the content of
  [SSL certificate file](../setup#optional-setup-ssl) for the SSL-enabled domain, i.e. 'mygateway.mycompany.com' given
  the kong-api-gateway-domain is 'mygateway.mycompany.com'

### Defining Terraform Variables

Create a [HashiCorp Terraform variable values file] named **aws-kong.auto.tfvars** under
**[hashistack/hashicorp/kong-api-gateway/instances]** directory with the following contents:

```hcl title="hashistack/hashicorp/kong-api-gateway/instances/aws-kong.auto.tfvars"
aws_ec2_region       = "us-east-1"
ami_name                = "my-kong-ami"
instance_type           = "t2.small"
instance_name           = "My Kong API Gateway"
security_groups         = ["My Kong API Gateway Security Group"]
kong_api_gateway_domain = "gateway.mycompany.com"
route_53_zone_id        = "MBS8YLKZML18VV2E8M8OK"
```

- `aws_ec2_region` is the [EC2 runtime region][AWS regions] where Kong will be deployed into
- `ami_name` is the name of the published AMI; **it must be the same as the `ami_name` in
  [Packer variable file](#defining-packer-variables)**
- `instance_type` is the [AWS EC2 instance type] used for deployed infrastructure
- `instance_name` is the deployed EC2 name as appeared in the instance list of AWS console; it can be arbitrary
- `security_groups` is the list of [AWS Security Group] _names_ to associate with (yes, not ID, but name...)

  :::info

  The following [Kong ports][Kong gateway - various ports] need to be open by configuring the inbound rules of the
  included security groups:

  - 80
  - 443
  - 8444
  - 8445

  :::

- `kong_api_gateway_domain` is the SSL-enabled domain that will serve [Kong manager UI]

  :::warning

  hashistack will bind a _private_ IP address to this domain for the following reasons:

  - [AWS security groups works for private IP only for DNS resolving](https://serverfault.com/a/967483). Services
    interacting with Kong gateway can use this domain.
  - In the case of internal access, for example administrators visiting Kong Manager for config purposes, people can
    still use `https://public-dns:port`

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
cd hashistack

cp hashicorp/common/images/aws/aws-builder.pkr.hcl hashicorp/kong-api-gateway/images/aws
cp hashicorp/common/images/aws/aws-packer.pkr.hcl hashicorp/kong-api-gateway/images/aws

cd hashicorp/kong-api-gateway/images/aws
packer init .
packer validate .
packer build .
```

:::note

EBS volumes during build time will [automatically be removed][HashiCorp Packer delete_on_termination]

:::

This will take a while and to save time, we can leave it here and proceed immediately to the next step.

### Deploying to EC2

:::caution

Depending on the [AMI](#defining-packer-variables) and [EC2](#defining-terraform-variables) configs, **please be aware
AWS credit charges shall incur after the following commands execute**

:::

```bash
cd ../../instances/aws

cp ../../../common/instances/aws/aws-ec2.tf .
cp ../../../common/instances/aws/aws-ssl.tf .
cp ../../../common/instances/aws/aws-terraform.tf .

terraform init
terraform validate
terraform apply -auto-approve
```

Deployment via Screwdriver CD
-----------------------------

hashistack supports deployment using [Screwdriver CD](screwdriver-cd-deployment). Please check it out.

Deployment via HACP
-------------------

:::tip

Please try our HACP platform to deploy a Kong instance. It gives us one-click experience that helps us stand up an API
gateway in a minute.

:::

[AWS AMI]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[AWS EC2 instance type]: https://aws.amazon.com/ec2/instance-types/
[AWS regions]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Availability
[AWS Security Group]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html

[hashistack/hashicorp/kong-api-gateway/images]: https://github.com/QubitPi/hashistack/tree/master/hashicorp/kong-api-gateway/images
[hashistack/hashicorp/kong-api-gateway/instances]: https://github.com/QubitPi/hashistack/tree/master/hashicorp/kong-api-gateway/instances
[HashiCorp Packer - Install]: https://packer.qubitpi.org/packer/install
[HashiCorp Packer variable values file]: https://packer.qubitpi.org/packer/guides/hcl/variables#from-a-file
[HashiCorp Terraform - Install]: https://terraform.qubitpi.org/terraform/install
[HashiCorp Terraform variable values file]: https://terraform.qubitpi.org/terraform/language/values/variables#variable-definitions-tfvars-files

[Kong API Gateway]: https://qubitpi.github.io/docs.konghq.com/gateway/latest/
[Kong manager UI]: https://qubitpi.github.io/docs.konghq.com/gateway/latest/kong-manager/
[Kong gateway - various ports]: https://qubitpi.github.io/docs.konghq.com/gateway/latest/production/networking/default-ports/

[Screwdriver CD]: https://qubitpi.github.io/screwdriver-cd-homepage/
