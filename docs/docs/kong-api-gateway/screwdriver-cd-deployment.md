---
sidebar_position: 2
title: Deployment via Screwdriver CD
description: Deploying Kong API Gateway via Screwdriver CD Template
---

Kong API Gateway Release Definition Template
============================================

hashicorp-aws offer a [Screwdriver template][Screwdriver CD template] that deploys an
[immutable][Immutable Infrastructure] instance of [Kong API Gateway] to AWS. It uses the
[screwdriver-template-main npm package] to assist with template validation, publishing, and tagging. This template tags
the latest versions with the `latest` tag.

![Error loading kong-ports-diagram.png](img/kong-ports-diagram.png)

How to Use This Template
------------------------

### Installing Template in Screwdriver

The template needs to be installed first in Screwdriver running instance. Installation has two parts:

1. [the template](https://github.com/QubitPi/hashicorp-aws/tree/master/adaptors/screwdriver-cd/templates/kong-api-gateway-sd-template.yaml)
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
    template: QubitPi/kong-api-gateway-release-definition-template@latest
```

The following [Screwdriver Secrets][Screwdriver CD Secrets] needs to be defined before running the pipeline:

- [`AWS_ACCESS_KEY_ID`](../setup#aws)
- [`AWS_SECRET_ACCESS_KEY`](../setup#aws)
- `SSL_CERTIFICATE` - the content of SSL certificate file serving HTTPS-enabled DNS name of the EC2 hosting our Kong
  API Gateway instance. This is the same as the `SSL_CERTIFICATE` from the
  [general SSL setup of hashicorp-aws](../setup#optional-setup-ssl)
- `SSL_CERTIFICATE_KEY` - the content of SSL certificate key file serving HTTPS-enabled DNS name of the EC2 hosting our
  API Gateway instance. This is the same as the `SSL_CERTIFICATE_KEY` from the
  [general SSL setup of hashicorp-aws](../setup#optional-setup-ssl)

To run the pipeline, fill in the AWS-related **parameters** first

![Error kong-api-gateway-release-definition-template-parameters.png](img/kong-api-gateway-release-definition-template-parameters.png)

Then hit "**Submit**" to start deploying.

[Immutable Infrastructure]: https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure

[Kong API Gateway]: https://qubitpi.github.io/docs.konghq.com/

[publishing a template in Screwdriver]: https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates#publishing-a-template

[screwdriver.yaml]: https://github.com/QubitPi/hashicorp-aws/tree/master/screwdriver.yaml
[Screwdriver CD - commands]: https://github.com/QubitPi/hashicorp-aws/tree/master/adaptors/screwdriver-cd/commands
[Screwdriver CD - creating a pipeline]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/quickstart#create-a-new-pipeline
[Screwdriver CD - creating pipeline from template]: https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates#using-a-template
[Screwdriver CD - finding templates]: https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates#finding-templates
[Screwdriver CD - finding commands]: https://screwdriver-docs.qubitpi.org/user-guide/commands#finding-commands
[Screwdriver CD Secrets]: https://screwdriver-docs.qubitpi.org/user-guide/configuration/secrets
[Screwdriver CD template]: https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates
[screwdriver-template-main npm package]: https://github.com/QubitPi/screwdriver-cd-template-main
