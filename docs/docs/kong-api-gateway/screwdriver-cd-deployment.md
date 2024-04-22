---
sidebar_position: 2
title: Deployment via Screwdriver CD
description: Deploying Kong API Gateway via Screwdriver CD Template
---

[//]: # (Copyright 2024 Paion Data)

[//]: # (Licensed under the Apache License, Version 2.0 &#40;the "License"&#41;;)
[//]: # (you may not use this file except in compliance with the License.)
[//]: # (You may obtain a copy of the License at)

[//]: # (    http://www.apache.org/licenses/LICENSE-2.0)

[//]: # (Unless required by applicable law or agreed to in writing, software)
[//]: # (distributed under the License is distributed on an "AS IS" BASIS,)
[//]: # (WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.)
[//]: # (See the License for the specific language governing permissions and)
[//]: # (limitations under the License.)

Kong API Gateway Release Definition Template
============================================

IIaaS offer a [Screwdriver template][Screwdriver CD template] that deploys an [immutable][Immutable Infrastructure]
instance of [Kong API Gateway] to AWS. It uses the [screwdriver-template-main npm package] to assist with template
validation, publishing, and tagging. This template tags the latest versions with the `latest` tag.

![Error loading kong-ports-diagram.png](img/kong-ports-diagram.png)

How to Use This Template
------------------------

### Installing Template in Screwdriver

The template needs to be installed first in Screwdriver running instance. Installation has two parts:

1. [the template](https://github.com/paion-data/immutable-infrastructure-as-a-service/tree/master/adaptors/screwdriver-cd/templates/kong-api-gateway-sd-template.yaml)
2. Some [pre-defined Screwdriver commands][Screwdriver CD - commands] that this template uses

The template and the commands can be automatically installed using the regular [screwdriver.yaml] config file by
following the steps below:

1. [Create a Screwdriver pipeline][Screwdriver CD - creating a pipeline] with the repository link being
   `https://github.com/paion-data/immutable-infrastructure-as-a-service.git`
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
    template: paion-data/kong-api-gateway-release-definition-template@latest
```

The following [Screwdriver Secrets][Screwdriver CD Secrets] needs to be defined before running the pipeline:

- [`ALICLOUD_ACCESS_KEY`](../setup#alicloud)
- [`ALICLOUD_SECRET_KEY`](../setup#alicloud)
- `SSL_CERTIFICATE` - the content of SSL certificate file serving HTTPS-enabled DNS name of the EC2 hosting our Kong
  API Gateway instance. This is the same as the `SSL_CERTIFICATE` from the
  [general SSL setup of hashicorp-aws](../setup#ssl)
- `SSL_CERTIFICATE_KEY` - the content of SSL certificate key file serving HTTPS-enabled DNS name of the EC2 hosting our
  API Gateway instance. This is the same as the `SSL_CERTIFICATE_KEY` from the
  [general SSL setup of hashicorp-aws](../setup#ssl)

To run the pipeline, fill in the AWS-related **parameters** first

![Error kong-api-gateway-release-definition-template-parameters.png](img/kong-api-gateway-release-definition-template-parameters.png)

Then hit "**Submit**" to start deploying.

[Immutable Infrastructure]: https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure

[Kong API Gateway]: https://docs.konghq.com/

[publishing a template in Screwdriver]: https://paion-data.github.io/screwdriver-cd-guide/user-guide/templates/job-templates#writing-a-screwdriver-yaml-for-your-template-repo

[screwdriver.yaml]: https://github.com/paion-data/immutable-infrastructure-as-a-service/tree/master/screwdriver.yaml
[Screwdriver CD - commands]: https://github.com/paion-data/immutable-infrastructure-as-a-service/tree/master/adaptors/screwdriver-cd/commands
[Screwdriver CD - creating pipeline from template]: https://paion-data.github.io/screwdriver-cd-guide/user-guide/templates/job-templates#using-a-template
[Screwdriver CD - finding templates]: https://paion-data.github.io/screwdriver-cd-guide/user-guide/templates/job-templates#finding-templates
[Screwdriver CD - finding commands]: https://paion-data.github.io/screwdriver-cd-guide/user-guide/commands#finding-commands
[Screwdriver CD Secrets]: https://paion-data.github.io/screwdriver-cd-guide/user-guide/configuration/secrets
[Screwdriver CD template]: https://paion-data.github.io/screwdriver-cd-guide/user-guide/templates/job-templates
[screwdriver-template-main npm package]: https://github.com/screwdriver-cd/template-main
