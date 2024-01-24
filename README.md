General Continuous Delivery/Deployment onto AWS through HashiCorp
=================================================================

<div align="center">
    <img src="docs/static/img/logo.svg" width="20%" />

[![GitHub Workflow Status][GitHub Workflow Status badge]][GitHub Workflow Status URL]
![GitHub Last Commit]
[![HashiCorp Packer Badge][HashiCorp Packer badge]][HashiCorp Packer URL]
[![HashiCorp Terraform Badge][HashiCorp Terraform badge]][HashiCorp Terraform URL]
[![Screwdriver CD badge][Screwdriver CD badge]][Screwdriver CD url]
[![Discord]](https://discord.com/widget?id=1060753787125514332)
[![Apache License][Apache License Badge]][Apache License url]

</div>

Immutable Infrastructure as Code via GitHub Action
--------------------------------------------------

[Application Deployment on AWS through HashiCorp][hashicorp-aws] is an opinionated CI/CD [GitHub Action] that

1. packages application into and registers [AMI image][AWS AMI] on AWS, then
2. deploys an [EC2 instance][AWS EC2] of that AMI onto AWS

![Error loading hashicorp-aws.png](https://github.com/QubitPi/QubitPi/blob/master/img/hashicorp-aws/hashicorp-aws.png?raw=true)

How to Use HashiCrop AWS
------------------------

### Step 1 - Setting up HashiCrop Packer & Terraform Template Files

HashiCorp AWS action follows [HashiCrop's best practice][HashiCorp Tutorial] by expecting a directory called
**hashicorp** located at the root of the repository. It's structure looks like this:

```bash
.
└── my-app-repository/
    ├── hashicorp/
    │   ├── images/
    │   │   └── aws-my-app.pkr.hcl
    │   ├── instances/
    │   │   └── aws-my-app.tf
    ├── src
    └── ...
```

- The **aws-my-app.pkr.hcl** is the standard [HashiCorp Packer Template][HashiCorp Packer Template] file
- The **aws-my-app.tf** is the standard [HashiCorp Terraform Config File][HashiCorp Terraform Config File]

### Step 2 - Defining Action File

Under regular `.github/workflows` directory, create a `.yml` file with a preferred name with the following example
contents:

```yaml
---
name: My App CI/CD

"on":
  pull_request:
  push:
    branches:
      - master

jobs:
  hashicorp:
    name: Publish AMI Image and Deploy it to EC2 through HashiCorp
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      ...

      - name: Publish my-app AMI image and deploy it to EC2 through HashiCorp
        uses: QubitPi/hashicorp-aws@master
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
```

Note that the following [GitHub Action Secrets][GitHub Action - How to set up] needs to be setup

- [**AWS_ACCESS_KEY_ID**](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html)
- [**AWS_SECRET_ACCESS_KEY**](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html)
- [**AWS_REGION**](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html)

Documentation
-------------

More information about [hashicorp-aws] can be found at our [documentation][hashicorp-aws].

License
-------

The use and distribution terms for [hashicorp-aws] are covered by the [Apache License, Version 2.0].

<div align="center">
    <a href="https://opensource.org/licenses">
        <img align="center" width="50%" alt="License Illustration" src="https://github.com/QubitPi/QubitPi/blob/master/img/apache-2.png?raw=true">
    </a>
</div>

[Apache License, Version 2.0]: http://www.apache.org/licenses/LICENSE-2.0.html
[Apache License Badge]: https://img.shields.io/badge/Apache%202.0-F25910.svg?style=for-the-badge&logo=Apache&logoColor=white
[Apache License url]: https://www.apache.org/licenses/LICENSE-2.0

[AWS AMI]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[AWS EC2]: https://aws.amazon.com/ec2/

[Discord]: https://img.shields.io/discord/1060753787125514332?color=5865F2&logo=discord&logoColor=ffffff&style=for-the-badge

[GitHub Action]: https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions
[GitHub Action - How to set up]: https://docs.github.com/en/actions/security-guides/encrypted-secrets
[GitHub Last Commit]: https://img.shields.io/github/last-commit/QubitPi/hashicorp-aws/master?logo=github&style=for-the-badge
[GitHub Workflow Status badge]: https://img.shields.io/github/actions/workflow/status/QubitPi/hashicorp-aws/ci-cd.yml?branch=master&logo=github&style=for-the-badge
[GitHub Workflow Status URL]: https://github.com/QubitPi/hashicorp-aws/actions/workflows/ci-cd.yml

[hashicorp-aws]: https://qubitpi.github.io/hashicorp-aws/
[HashiCorp Packer badge]: https://img.shields.io/badge/Packer-02A8EF?style=for-the-badge&logo=Packer&logoColor=white
[HashiCorp Packer URL]: https://qubitpi.github.io/hashicorp-packer/packer/docs
[HashiCorp Packer Template]: https://developer.hashicorp.com/packer/tutorials/aws-get-started/aws-get-started-build-image#write-packer-template
[HashiCorp Terraform badge]: https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white
[HashiCorp Terraform URL]: https://qubitpi.github.io/hashicorp-terraform/terraform/docs
[HashiCorp Terraform Config File]: https://developer.hashicorp.com/terraform/tutorials/aws-get-started/aws-build#write-configuration
[HashiCorp Tutorial]: https://developer.hashicorp.com/terraform/tutorials/provision/packer

[Screwdriver CD badge]: https://img.shields.io/badge/Screwdriver%20CD-1475BB?style=for-the-badge&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiANCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I2ZmZmZmZjsiIGQ9Ik01MDQuNzgzLDc3LjA5MWgtMC4wMDZIMzAzLjQ5NGMtMi4wMzYsMC0zLjk3NywwLjg1OS01LjM0NSwyLjM2Ng0KCWMtMS4zNjgsMS41MDgtMi4wMzgsMy41Mi0xLjg0Miw1LjU0OWwzLjkyNSw0MC42OTNjMC4zNDMsMy41NTIsMy4yMjgsNi4zMiw2Ljc5Miw2LjUxNmw0Mi4wNSwyLjMxNGwtODAuNzM2LDExMi4wMjNMMTgwLjI5Myw3MS4xNDINCglsNjMuNTYzLTIuNDNjMy44NDQtMC4xNDYsNi44OTYtMy4yNzYsNi45NDUtNy4xMjFsMC40NjQtMzYuMzkyYzAuMDIyLTEuOTMyLTAuNzI2LTMuNzkyLTIuMDgyLTUuMTY2DQoJYy0xLjM1Ni0xLjM3Mi0zLjIwNi0yLjE0Ny01LjEzNy0yLjE0N0g3LjIyYy0zLjk4OSwwLTcuMjIsMy4yMzEtNy4yMiw3LjIyMXY0MC41NThjMCwzLjk0NywzLjE3LDcuMTYzLDcuMTE1LDcuMjJsNjYuOTE3LDAuOTY0DQoJbDEyNy4yNTcsMjI0LjQ4OGwtMC41NjgsMTQwLjIwNWwtODguNDgsMy42MzFjLTMuODE3LDAuMTU1LTYuODUsMy4yNTktNi45MjMsNy4wNzdsLTAuNzE2LDM3LjUwNg0KCWMtMC4wMzcsMS45MzksMC43MDksMy44MSwyLjA2OSw1LjE5NmMxLjM1NiwxLjM4MywzLjIxMiwyLjE2MSw1LjE1MSwyLjE2MWgyNzYuNzYyYzEuOTgxLDAsMy44NzUtMC44MTMsNS4yMzktMi4yNDkNCgljMS4zNjMtMS40MzUsMi4wNzgtMy4zNjgsMS45NzQtNS4zNDZsLTEuOTMzLTM3LjEzMmMtMC4xOTItMy42OTItMy4xNC02LjY0MS02LjgzNS02LjgzNGwtNzYuMTI0LTMuOTkybC0xMS4wODItMTM2LjU3DQoJTDQzNi40NzksMTM3LjMzbDU1LjY0LTIuNTNjMy4wNjMtMC4xNDIsNS43MDQtMi4yMDIsNi41ODctNS4xMzlsMTIuOTA5LTQzLjAxOGMwLjI0OC0wLjcyOSwwLjM4NS0xLjUxNiwwLjM4NS0yLjMzMg0KCUM1MTIsODAuMzI1LDUwOC43NzIsNzcuMDkxLDUwNC43ODMsNzcuMDkxeiIvPg0KPC9zdmc+
[Screwdriver CD url]: https://qubitpi.github.io/screwdriver-cd-homepage/
