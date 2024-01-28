HashiCorp AWS
=============

<div align="center">
    <img src="docs/static/img/logo.svg" width="20%" />

[![GitHub Workflow Status][GitHub Workflow Status badge]][GitHub Workflow Status URL]
![GitHub Last Commit]
[![HashiCorp Packer Badge][HashiCorp Packer badge]][HashiCorp Packer URL]
[![HashiCorp Terraform Badge][HashiCorp Terraform badge]][HashiCorp Terraform URL]
[![Screwdriver CD badge][Screwdriver CD badge]][Screwdriver CD url]
[![Discord]](https://discord.com/widget?id=1060753787125514332)
[![Apache License][Apache License badge]][Apache License URL]

</div>

What is hashicorp-aws
---------------------

[hashicorp-aws] is a technology-agnostic framework for general Continuous Delivery/Deployment onto AWS through HashiCorp

The goal of [hashicorp-aws] is to **empower _individual_ to agnostically deploy and manage applications through the
practice of immutable infrastructure**.

![Error loading hashicorp-aws.png](./docs/docs/img/hashicorp-aws.png)

How the Amazing Story Began
---------------------------

I was researching deploying k8s (an idea which I abandoned later because I believed any production-quality application should not be deployed onto k8s) online and Google came up a concept I was never heard of:
[k8s through AMI](https://github.com/awslabs/amazon-eks-ami). It was this GitHub repo that open up a whole new world to
my career: HashiCorp, AWS AMI, and
[Immutable Infrastructure](https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure)

The notion of immutable infrastructure as advanced by HashiCorp grabbed my deep interests so intensively that kept
myself learning and that incubated the most important open source project of my life - [hashicorp-aws]. It condensed my
passion for the best practice of software infrastructure used myself and my company.

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
[Apache License badge]: https://img.shields.io/badge/Apache%202.0-F25910.svg?style=for-the-badge&logo=Apache&logoColor=white
[Apache License URL]: https://www.apache.org/licenses/LICENSE-2.0

[Discord]: https://img.shields.io/discord/1060753787125514332?color=5865F2&logo=discord&logoColor=ffffff&style=for-the-badge

[GitHub Last Commit]: https://img.shields.io/github/last-commit/QubitPi/hashicorp-aws/master?logo=github&style=for-the-badge
[GitHub Workflow Status badge]: https://img.shields.io/github/actions/workflow/status/QubitPi/hashicorp-aws/ci-cd.yml?branch=master&logo=github&style=for-the-badge
[GitHub Workflow Status URL]: https://github.com/QubitPi/hashicorp-aws/actions/workflows/ci-cd.yml

[hashicorp-aws]: https://qubitpi.github.io/hashicorp-aws/
[HashiCorp Packer badge]: https://img.shields.io/badge/Packer-02A8EF?style=for-the-badge&logo=Packer&logoColor=white
[HashiCorp Packer URL]: https://qubitpi.github.io/hashicorp-packer/packer/docs
[HashiCorp Terraform badge]: https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white
[HashiCorp Terraform URL]: https://qubitpi.github.io/hashicorp-terraform/terraform/docs
