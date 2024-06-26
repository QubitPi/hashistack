---
sidebar_position: 2
title: Deployment via GitHub Actions
description: Deploying Jersey-Jetty Based Webservice via GitHub Actions
---

GitHub Actions for Jersey Webservice Deployments
================================================

Jersey webservice deployment on AWS through HashiCorp is an opinionated [GitHub Action] that

1. packages webservice WAR file into and registers [AMI image][AWS AMI] on AWS, then
2. deploys an [EC2 instance][AWS EC2] of that AMI onto AWS

How to Use
----------

```yaml
---
name: My CI/CD

jobs:
  hashicorp:
    name: Generated Webservice WAR in GitHub Action, and Publish Template AMI Image and Deploy it to EC2 through HashiCorp
    runs-on: ubuntu-latest
    steps:
      - name: Deployment
        uses: QubitPi/jersey-webservice-deployment@master
        with:
          template: basic
          ssl: false

          aws-ws-pkrvars-hcl: ${{ secrets.AWS_WS_PKRVARS_HCL }}
          aws-ws-tfvars: ${{ secrets.AWS_WS_TFVARS }}

          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
```

The following inputs are required:

- `template`: the template to use, i.e. one of the
  [branches of jersey-webservcie-template](https://github.com/QubitPi/jersey-webservice-template/branches). Can be one
  of the following

  - [basic](https://qubitpi.github.io/jersey-webservice-template/docs/intro)
  - [jpa](https://qubitpi.github.io/jersey-webservice-template/docs/crud/)

- `ssl`: whether or not to server webservice API in SSL/HTTPS

The following GitHub Secrets needs to be defined:

- `AWS_WS_PKRVARS_HCL`: A [HashiCorp Packer variable values file] with the variable values presented
  [here](https://qubitpi.github.io/hashicorp-aws/docs/webservice#defining-packer-variables)
- `AWS_WS_TFVARS` - A [HashiCorp Terraform variable values file] with the variable values presented
  [here](https://qubitpi.github.io/hashicorp-aws/docs/webservice#defining-terraform-variables)

- AWS credentials

  1. [`aws-access-key-id`](../setup#aws)
  2. [`aws-secret-access-key`](../setup#aws)
  3. `aws-region`: one of the standard [AWS regions] name

  Note that the 3 credentials above is actually the same things as used by [configure-aws-credentials]

### Jersey Webservice Template (JPA through Elide)

If deployed webservice is [JWT JPA](https://qubitpi.github.io/jersey-webservice-template/docs/crud/) the following
inputs are also required

- **model-package-jar-group-id** is the Maven group ID of JAR containing data models, e.g. "com.myorg"
- **model-package-jar-artifact-id** is the Maven artifact ID of JAR containing data models, e.g. "my-data-models"
- **model-package-jar-version** is the version of JAR containing data models, e.g. "3.1.7"
- **models-path** is the relative path to the data models repo, usually prefixed by "../". e.g. "../jpa-models"

For example:

```yaml
---
name: My CI/CD

jobs:
  hashicorp:
    name: Generated Webservice WAR in GitHub Action, and Publish Template AMI Image and Deploy it to EC2 through HashiCorp
    runs-on: ubuntu-latest
    steps:
      - name: Deployment
        uses: QubitPi/jersey-webservice-deployment@master
        with:
          template: basic
          ssl: false

          aws-ws-pkrvars-hcl: ${{ secrets.AWS_WS_PKRVARS_HCL }}
          aws-ws-tfvars: ${{ secrets.AWS_WS_TFVARS }}

          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

          model-package-jar-group-id: com.myorg
          model-package-jar-artifact-id: my-data-models
          model-package-jar-version: 1.0.0
          models-path: ../my-data-models
```

[AWS AMI]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[AWS EC2]: https://aws.amazon.com/ec2/
[AWS regions]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html

[configure-aws-credentials]: https://github.com/aws-actions/configure-aws-credentials

[GitHub Action]: https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions
