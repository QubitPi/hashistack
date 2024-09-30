---
sidebar_position: 2
title: Deployment via Screwdriver CD
description: Deploying React App via Screwdriver CD Template
---

:::note

- We take an opinionated React app deployment, which goes with SSL required, because it is a security standard to put
  all user-facing resources behind HTTPS/SSL
- All `dist` executables are assumed to be generated in Screwdriver executor runtime (not in Packer or Terraform
  environment)
- The template assumes [Yarn 2](https://yarnpkg.com/migration/guide) is used as package manager

:::

React App Release Definition Template
=====================================

hashistack offers a [Screwdriver template][Screwdriver CD template] that deploys an
[immutable][Immutable Infrastructure] instance of React-based frontend App to AWS. It uses the
[screwdriver-template-main npm package] to assist with template validation, publishing, and tagging. This template tags
the latest versions with the `latest` tag.

How to Use This Template
------------------------

Please follow the sections below to get started using this template

### Installing the Template

Please follow the [instructions](../adaptors/screwdriver-cd#installing-templates-and-commands) here and make sure, once
done, we are able to see the two following template shown in the templates page:

- __react-app-release-definition-template__

![Error loading templates-installed.png](./img/templates-installed.png)

### Creating Pipeline from Template

[Create a Screwdriver pipeline](../adaptors/screwdriver-cd#1-creating-a-screwdriver-pipeline) with the URL of a GitHub
repo that contains a `screwdriver.yaml` file with the following content

```yaml
---
jobs:
  main:
    requires: [~pr, ~commit]
    template: QubitPi/react-app-release-definition-template@latest
```

### Configuring Pipeline

The following [Screwdriver Secrets][Screwdriver CD Secrets] needs to be defined before running the pipeline:

- [AWS_ACCESS_KEY_ID](../setup#aws)
- [AWS_SECRET_ACCESS_KEY](../setup#aws)
- SSL_CERT_BASE_64: A base64 encoded string of the content of SSL certificate file for the SSL-enabled domain for the
  React APP
- SSL_CERT_KEY_BASE_64: A base64 encoded string of the content of SSL certificate key file for the SSL-enabled domain
  React APP

### Running Pipeline

To run the pipeline, fill in the AWS-related **parameters** first

![Error sonatype-nexus-repository-release-definition-template-parameters.png](img/react-app-release-definition-template-parameters.png)

Then hit "**Submit**" to start deploying.

[Immutable Infrastructure]: https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure

[Screwdriver CD Secrets]: https://screwdriver-docs.qubitpi.org/user-guide/configuration/secrets
[Screwdriver CD template]: https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates
[screwdriver-template-main npm package]: https://github.com/QubitPi/screwdriver-cd-template-main
