---
sidebar_position: 2
title: Deployment via Screwdriver CD
description: Deploying ELK via Screwdriver CD Template
---

ELK Release Definition Template
===============================

hashicorp-aws offer a [Screwdriver template][Screwdriver CD template] that deploys
[immutable][Immutable Infrastructure] instances of ELK to AWS. It uses the [screwdriver-template-main npm package] to
assist with template validation, publishing, and tagging. The template tags the latest versions with the `latest` tag.

![Error loading elk-deployment-diagram.png](./img/elk-deployment-diagram.png)

How to Use This Template
------------------------

### Using the Template

[Create a Screwdriver pipeline that uses this template][Screwdriver CD - creating pipeline from template] with the
`screwdriver.yaml` file of

```yaml
---
jobs:
  main:
    requires: [~pr, ~commit]
    template: QubitPi/elk-release-definition-template@latest
```

The following [Screwdriver Secrets][Screwdriver CD Secrets] needs to be defined before running the pipeline:

- [`AWS_ACCESS_KEY_ID`](../setup#aws)
- [`AWS_SECRET_ACCESS_KEY`](../setup#aws)
- `SSL_CERTIFICATE` - the content of SSL certificate file serving HTTPS-enabled DNS name of the EC2 hosting our ELK
  instance. This is the same as the `SSL_CERTIFICATE` from the
  [general SSL setup of hashicorp-aws](../setup#optional-setup-ssl)
- `SSL_CERTIFICATE_KEY` - the content of SSL certificate key file serving HTTPS-enabled DNS name of the EC2 hosting our
  ELK instance. This is the same as the `SSL_CERTIFICATE_KEY` from the
  [general SSL setup of hashicorp-aws](../setup#optional-setup-ssl)

To run the pipeline, fill in the AWS-related **parameters** first

![Error loading elk-release-definition-template-parameters.png](./img/elk-release-definition-template-parameters.png)

Then hit "**Submit**" to start deploying.

:::warning

Once the pipeline deploys ELK, we must remember to do the
[post setup in EC2 instance](index#post-setup-in-ec2-instance).

The password for user 'elastic' can be found _packer-build_ step logs. Here is an example:

![Error loading elastic-password-from-log.png](img/elastic-password-from-log.png)

:::

[Immutable Infrastructure]: https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure

[publishing a template in Screwdriver]: https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates#publishing-a-template

[screwdriver.yaml]: https://github.com/QubitPi/hashicorp-aws/tree/master/screwdriver.yaml
[Screwdriver CD - creating a pipeline]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/quickstart#create-a-new-pipeline
[Screwdriver CD - creating pipeline from template]: https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates#using-a-template
[Screwdriver CD - finding templates]: https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates#finding-templates
[Screwdriver CD - finding commands]: https://screwdriver-docs.qubitpi.org/user-guide/commands#finding-commands
[Screwdriver CD Secrets]: https://screwdriver-docs.qubitpi.org/user-guide/configuration/secrets
[Screwdriver CD template]: https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates
[screwdriver-template-main npm package]: https://github.com/QubitPi/screwdriver-cd-template-main
