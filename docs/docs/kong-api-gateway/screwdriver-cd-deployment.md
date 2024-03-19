---
sidebar_position: 2
title: Deployment via Screwdriver CD
description: Deploying Kong API Gateway via Screwdriver CD Template
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

Kong API Gateway Release Definition Template
============================================

hashicorp-aws offer a [Screwdriver CD template] that deploys an [immutable][Immutable Infrastructure] instance of
[Kong API Gateway] to AWS. It uses the [screwdriver-template-main npm package] to assist with template validation,
publishing, and tagging. This template tags the latest versions with the `latest` tag.

![Error loading kong-ports-diagram.png](img/kong-ports-diagram.png)

How to Use This Template
------------------------

:::warning

Before preceding, please note that it is assumed
[the template](https://github.com/QubitPi/hashicorp-aws/tree/master/adaptors/screwdriver-cd/templates/kong-api-gateway-sd-template.yaml)
has already been installed in Screwdriver. If not, please see documentation on
[publishing a template in Screwdriver]

The designated [screwdriver.yaml](https://github.com/QubitPi/hashicorp-aws/tree/master/screwdriver.yaml) file used to
validate and publish the template is located at the root of hashicorp-aws project

:::

[Create a Screwdriver pipeline that uses this template][Screwdriver - create pipeline from template] with the
`screwdriver.yaml` file of

```yaml
---
jobs:
  main:
    requires: [~pr, ~commit]
    template: QubitPi/kong-api-gateway-release-definition-template@latest
```

The following [Screwdriver CD Secrets] needs to be defined before running the pipeline:

- [`AWS_ACCESS_KEY_ID`](../setup#aws)
- [`AWS_SECRET_ACCESS_KEY`](../setup#aws)
- `SSL_CERTIFICATE` - the content of SSL certificate file serving HTTPS-enabled DNS name of the EC2 hosting our Kong
  API Gateway instance. This is the same as the `SSL_CERTIFICATE` from the [general SSL setup of hashicorp-aws]
- `SSL_CERTIFICATE_KEY` - the content of SSL certificate key file serving HTTPS-enabled DNS name of the EC2 hosting our
  API Gateway instance. This is the same as the `SSL_CERTIFICATE_KEY` from the [general SSL setup of hashicorp-aws]

To run the pipeline, fill in the AWS-related **parameters** first

![Error kong-api-gateway-release-definition-template-parameters.png](img/kong-api-gateway-release-definition-template-parameters.png)

Then hit "**Submit**" to start deploying.

[general SSL setup of hashicorp-aws]: https://qubitpi.github.io/hashicorp-aws/docs/setup#ssl

[Immutable Infrastructure]: https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure

[Kong API Gateway]: https://qubitpi.github.io/docs.konghq.com/

[publishing a template in Screwdriver]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates#publishing-a-template

[screwdriver-template-main npm package]: https://github.com/QubitPi/screwdriver-cd-template-main
[Screwdriver - create pipeline from template]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates#using-a-template
[Screwdriver CD Secrets]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/configuration/secrets
[Screwdriver CD template]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates
