---
sidebar_position: 2
title: Deployment via Screwdriver CD
description: Deploying Docker Mailserver via Screwdriver CD Template
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

Docker Mailserver Release Definition Template
=============================================

hashicorp-aws offer a [Screwdriver template][Screwdriver CD template] that deploys an
[immutable][Immutable Infrastructure] instance of [Docker Mailserver] to AWS. It uses the
[screwdriver-template-main npm package] to assist with template validation, publishing, and tagging. This template tags
the latest versions with the `latest` tag.

:::caution

hashicorp-aws deploys Docker Mailserver as a [t2.micro](https://aws.amazon.com/ec2/instance-types/t2/) instance by
default

:::

How to Use This Template
------------------------

### Installing Template in Screwdriver

The template needs to be installed first in Screwdriver running instance. Installation has two parts:

1. [the template](https://github.com/QubitPi/hashicorp-aws/tree/master/adaptors/screwdriver-cd/templates/docker-mailserver-sd-template.yaml)
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

[Create a Screwdriver pipeline that uses this template][Screwdriver CD - creating pipeline from template] with the
`screwdriver.yaml` file of

```yaml
---
jobs:
  main:
    requires: [~pr, ~commit]
    template: QubitPi/docker-mailserver-release-definition-template@latest
```

The following [Screwdriver Secrets][Screwdriver CD Secrets] needs to be defined before running the pipeline:

- [`AWS_ACCESS_KEY_ID`](../setup#aws)
- [`AWS_SECRET_ACCESS_KEY`](../setup#aws)
- `SSL_CERTIFICATE` - the content of SSL certificate file serving HTTPS-enabled DNS name of the EC2 hosting our Docker
  Mailserver instance. This is the same as the `SSL_CERTIFICATE` from the
  [general SSL setup of hashicorp-aws](../setup#optional-setup-ssl)
- `SSL_CERTIFICATE_KEY` - the content of SSL certificate key file serving HTTPS-enabled DNS name of the EC2 hosting our
  Docker Mailserver instance. This is the same as the `SSL_CERTIFICATE_KEY` from the
  [general SSL setup of hashicorp-aws](../setup#optional-setup-ssl)

To run the pipeline, fill in the AWS-related **parameters** first

![Error loading sd-template-parameters.png](./img/sd-template-parameters.png)

Then hit "**Submit**" to start deploying.

[Immutable Infrastructure]: https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure

[Docker Mailserver]: https://qubitpi.github.io/docker-mailserver/edge/

[publishing a template in Screwdriver]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates/job-templates#publishing-a-template

[screwdriver.yaml]: https://github.com/QubitPi/hashicorp-aws/tree/master/screwdriver.yaml
[Screwdriver CD - commands]: https://github.com/QubitPi/screwdriver-cd-commands
[Screwdriver CD - creating a pipeline]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/quickstart#create-a-new-pipeline
[Screwdriver CD - creating pipeline from template]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates/job-templates#using-a-template
[Screwdriver CD - finding templates]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates/job-templates#finding-templates
[Screwdriver CD - finding commands]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/commands#finding-commands
[Screwdriver CD Secrets]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/configuration/secrets
[Screwdriver CD template]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates/job-templates
[screwdriver-template-main npm package]: https://github.com/QubitPi/screwdriver-cd-template-main
