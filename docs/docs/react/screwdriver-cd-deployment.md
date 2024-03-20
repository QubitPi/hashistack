---
sidebar_position: 2
title: Deployment via Screwdriver CD
description: Deploying React App via Screwdriver CD Template
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

React App Release Definition Template
=====================================

hashicorp-aws offers a [Screwdriver template][Screwdriver CD template] that deploys an
[immutable][Immutable Infrastructure] instance of React-based frontend App to AWS. It uses the
[screwdriver-template-main npm package] to assist with template validation, publishing, and tagging. This template tags
the latest versions with the `latest` tag.

How to Use This Template
------------------------

### Installing Template in Screwdriver

The template needs to be installed first in Screwdriver running instance. Installation has two parts:

1. [the template](https://github.com/QubitPi/hashicorp-aws/tree/master/adaptors/screwdriver-cd/templates/react-app-sd-template.yaml)
2. Some [pre-defined Screwdriver commands][Screwdriver CD - commands] that this template uses

The template and the commands can be automatically installed using the regular [screwdriver.yaml] config file by
following the steps below:

1. [Create a Screwdriver pipeline][Screwdriver CD - creating a pipeline] with the repository link being
   `https://github.com/QubitPi/hashicorp-aws.git`
2. Trigger a pipeline run, which will install the templates and commands automatically. Wait the pipeline to finish
   running.
3. The installed template and commands can be found in [Templates page][Screwdriver CD - finding templates] and
   [Commands page][Screwdriver CD - finding commands], respectively

### Using the Template

:::warning

Before preceding, please note that it is assumed
[the template](https://github.com/QubitPi/hashicorp-aws/tree/master/adaptors/screwdriver-cd/templates/react-app-sd-template.yaml)
has already been installed in Screwdriver. If not, please see documentation on [publishing a template in Screwdriver]

The designated [screwdriver.yaml](https://github.com/QubitPi/hashicorp-aws/tree/master/screwdriver.yaml) file used to
validate and publish the template is located at the root of hashicorp-aws project

:::

[Create a Screwdriver pipeline that uses this template](https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates#using-a-template). Here is an example:

```yaml
---
jobs:
  main:
    requires: [~pr, ~commit]
    template: QubitPi/react-app-release-definition-template@latest
    secrets:
      - AWS_REACT_PKRVARS_HCL
      - SSL_CERTIFICATE
      - SSL_CERTIFICATE_KEY
      - NGINX_CONFIG_FILE
      - AWS_REACT_TFVARS
      - DOT_ENV_FILE
      - AWS_ACCESS_KEY_ID
      - AWS_SECRET_ACCESS_KEY
```

The following [Screwdriver Secrets][Screwdriver CD Secrets] needs to be defined before running this template:

- [**AWS_ACCESS_KEY_ID**](../setup#aws)
- [**AWS_SECRET_ACCESS_KEY**](../setup#aws)

- [**SSL_CERTIFICATE**](../setup#ssl)
- [**SSL_CERTIFICATE_KEY**](../setup#ssl)
- [**NGINX_CONFIG_FILE**](../setup#ssl)

- **AWS_REACT_PKRVARS_HCL** - A [HashiCorp Packer variable values file] with the following variable values:

  ```hcl
  aws_image_region                 = "us-east-2"
  ami_name                         = "my-react-app-ami"
  instance_type                    = "t2.small"
  aws_react_ssl_cert_file_path     = "ssl.crt"
  aws_react_ssl_cert_key_file_path = "ssl.key"
  aws_react_nginx_config_file_path = "nginx.conf"
  react_dist_path = "dist"
  ```

    - `aws_image_region` is the [image region][AWS regions] of [AWS AMI]
    - `ami_name` is the published AMI name; it can be arbitrary
    - `instance_type` is the recommended [AWS EC2 instance type] running this image
    - Please keep the values of `react_dist_path`, `aws_react_ssl_cert_file_path`, `aws_react_ssl_cert_key_file_path`, and
      `aws_react_nginx_config_file_path` as they are. They are used by [template](../hashicorp-aws/adaptors/screwdriver-cd/templates/sd-template.yaml) so that SSL
      configs are picked up from the right locations

- **AWS_REACT_TFVARS** - A [HashiCorp Terraform variable values file] with the following variable values:

  ```hcl
  aws_deploy_region   = "us-east-2"
  ami_name            = "my-react-app-ami"
  instance_type       = "t2.small"
  ec2_instance_name   = "My React App"
  ec2_security_groups = ["My React App Security Group"]
  route_53_zone_id    = "MBS8YLKZML18VV2E8M8OK"
  react_domain        = "myapp.mycompany.com"
  ```

    - `aws_deploy_region` is the [EC2 runtime region][AWS regions]
    - `ami_name` is the name of the published AMI; **it must be the same as the `ami_name` in AWS_REACT_PKRVARS_HCL**
    - `instance_type` is the chosen [AWS EC2 instance type] at runtime
    - `ec2_instance_name` is the deployed EC2 name as appeared in the instance list of AWS console; it can be arbitrary
    - `ec2_security_groups` is the [AWS Security Group] _name_ (yes, not ID, but name...)
    - `react_domain` is the SSL-enabled domain that will serve the React App
    - `route_53_zone_id` is the AWS Route 53 hosted Zone ID that hosts the domain `myapp.mycompany.com`

> [!TIP]
> To find the zone ID in AWS Route 53, we can:
>
> 1. Sign in to the AWS Management Console
> 2. Open the Route 53 console at https://console.aws.amazon.com/route53/
> 3. Select Hosted zones in the navigation pane
> 4. Find the requested ID in the top level Hosted Zones summary in the Route 53 section

[AWS AMI]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[AWS EC2 instance type]: https://aws.amazon.com/ec2/instance-types/
[AWS regions]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Availability
[AWS Security Group]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html

[HashiCorp Packer variable values file]: https://qubitpi.github.io/hashicorp-packer/packer/guides/hcl/variables#from-a-file
[HashiCorp Terraform variable values file]: https://qubitpi.github.io/hashicorp-terraform/terraform/language/values/variables#variable-definitions-tfvars-files

[Immutable Infrastructure]: https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure

[publishing a template in Screwdriver]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates/job-templates#publishing-a-template

[screwdriver.yaml]: https://github.com/QubitPi/hashicorp-aws/tree/master/screwdriver.yaml
[Screwdriver CD - commands]: https://github.com/QubitPi/screwdriver-cd-commands
[Screwdriver CD - creating a pipeline]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/quickstart#create-a-new-pipeline
[Screwdriver CD - creating pipeline from template]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates#using-a-template
[Screwdriver CD - finding templates]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates/job-templates#finding-templates
[Screwdriver CD - finding commands]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/commands#finding-commands
[Screwdriver CD Secrets]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/configuration/secrets
[Screwdriver CD template]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates
[screwdriver-template-main npm package]: https://github.com/QubitPi/screwdriver-cd-template-main
