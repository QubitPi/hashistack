---
sidebar_position: 2
title: Deployment via Screwdriver CD
description: Deploying Jersey-Jetty Based Webservice via Screwdriver CD Template
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

Jersey Webservice Release Definition Templates
==============================================

hashicorp-aws set of [Screwdriver CD template]s that deploys [immutable][Immutable Infrastructure] instances of
instantiated [Jersey Webservice Template]s to AWS. It uses the [screwdriver-template-main npm package] to assist with
template validation, publishing, and tagging.

This release definition contains the following templates, _each corresponding to a branch in
[Jersey Webservice Template] GitHub repo_:

- [Deploying the `master` branch without SSL/HTTPS or any other addons](https://github.com/QubitPi/hashicorp-aws/tree/master/adaptors/screwdriver-cd/templates/jersey-webservice-template-basic-sd-template.yaml)
- [Deploying the `jpa-elide` branch without SSL/HTTPS or any other addons](https://github.com/QubitPi/hashicorp-aws/tree/master/adaptors/screwdriver-cd/templates/jersey-webservice-template-jpa-sd-template.yaml)

All templates tag the latest versions with the `latest` tag.

How to Use Templates
--------------------

:::warning

Before preceding, please note that it is assumed the templates above have already been installed in Screwdriver. If
not, please see documentation on [publishing a template in Screwdriver]

The designated [screwdriver.yaml](https://github.com/QubitPi/hashicorp-aws/tree/master/screwdriver.yaml) file used to
validate and publish the template is located at the root of hashicorp-aws project

:::

[Create a Screwdriver pipeline that uses one of the templates][Screwdriver - create pipeline from template] with the
`screwdriver.yaml` file. Taking
[JPA webservice template](https://github.com/QubitPi/hashicorp-aws/tree/master/adaptors/screwdriver-cd/templates/jersey-webservice-template-jpa-sd-template.yaml)
as an example:

```yaml
---
jobs:
  main:
    requires: [~pr, ~commit]
    template: QubitPi/jersey-webservice-release-definition-jpa@latest
    secrets:
      - AWS_ACCESS_KEY_ID
      - AWS_SECRET_ACCESS_KEY
```

The following [Screwdriver CD Secrets] needs to be defined before running the pipeline:

- [`AWS_ACCESS_KEY_ID`](https://qubitpi.github.io/hashicorp-aws/docs/setup#aws)
- [`AWS_SECRET_ACCESS_KEY`](https://qubitpi.github.io/hashicorp-aws/docs/setup#aws)

To run the pipeline, fill in the **parameters** first:

![Error loading jersey-webservice-release-definition-templates-parameters.png](img/jersey-webservice-release-definition-templates-parameters.png)

Then hit "**Submit**" to start deploying.

[Immutable Infrastructure]: https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure

[Jersey Webservice Template]: https://qubitpi.github.io/jersey-webservice-template/

[publishing a template in Screwdriver]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates#publishing-a-template

[Screwdriver - create pipeline from template]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates#using-a-template
[screwdriver-template-main npm package]: https://github.com/QubitPi/screwdriver-cd-template-main
[Screwdriver CD template]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/templates
