Application Deployment on AWS through HashiCorp
===============================================

<div align="center">
    <img src="docs/static/img/logo.svg" width="20%" />

[![GitHub Workflow Status][GitHub Workflow Status]](https://github.com/QubitPi/hashicorp-aws/actions/workflows/ci-cd.yml)
![Last Commit]
![HashiCorp Packer Badge][HashiCorp Packer Badge]
![HashiCorp Terraform Badge][HashiCorp Terraform Badge]
[![Discord]](https://discord.com/widget?id=1060753787125514332)
[![License Badge][License Badge]](https://www.apache.org/licenses/LICENSE-2.0)
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

[AWS AMI]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[AWS EC2]: https://aws.amazon.com/ec2/

[Discord]: https://img.shields.io/discord/1060753787125514332?color=5865F2&logo=discord&logoColor=ffffff&style=for-the-badge

[GitHub Action]: https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions
[GitHub Action - How to set up]: https://docs.github.com/en/actions/security-guides/encrypted-secrets
[GitHub Workflow Status]: https://img.shields.io/github/actions/workflow/status/QubitPi/hashicorp-aws/ci-cd.yml?branch=master&logo=github&style=for-the-badge

[hashicorp-aws]: https://qubitpi.github.io/hashicorp-aws/
[HashiCorp Packer Badge]: https://img.shields.io/badge/Packer-02A8EF?style=for-the-badge&logo=Packer&logoColor=white
[HashiCorp Packer Template]: https://developer.hashicorp.com/packer/tutorials/aws-get-started/aws-get-started-build-image#write-packer-template
[HashiCorp Terraform Badge]: https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white
[HashiCorp Terraform Config File]: https://developer.hashicorp.com/terraform/tutorials/aws-get-started/aws-build#write-configuration
[HashiCorp Tutorial]: https://developer.hashicorp.com/terraform/tutorials/provision/packer

[Last Commit]: https://img.shields.io/github/last-commit/QubitPi/hashicorp-aws/master?logo=github&style=for-the-badge
[License Badge]: https://img.shields.io/badge/Apache%202.0-F25910.svg?style=for-the-badge&logo=Apache&logoColor=white
