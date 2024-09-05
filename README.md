HashiStack
==========

<div align="center">

[![GitHub Workflow Status][GitHub Workflow Status Badge]][GitHub Workflow Status URL]
![GitHub Last Commit]
[![HashiCorp Packer Badge][HashiCorp Packer Badge]][HashiCorp Packer URL]
[![HashiCorp Terraform Badge][HashiCorp Terraform Badge]][HashiCorp Terraform URL]
[![Screwdriver pipeline badge][Screwdriver pipeline badge]][Screwdriver pipeline URL]
[![Discord]](https://discord.com/widget?id=1060753787125514332)
[![Apache License][Apache License Badge]][Apache License URL]

</div>

HashiStack is a __private cloud operating system that manages IT infrastructure through the practice of immutable
infrastructure__. Specifically, it

1. deploys [OpenStack] as its cloud provider, and
2. adopts an opinionated [Immutable Infrastructure] approach via HashiCorp Packer & Terraform

> [!NOTE]
>
> If one is interested in non-OpenStack cloud provider as an alternative, please check out
> [immutable-infrastructure.com] which is a fork of this project that targets Amazon AWS <img src="https://github.com/QubitPi/QubitPi/blob/master/img/8%E5%A5%BD.gif?raw=true" height="40px"/>

A Story behind HashiStack
------------------------

My graduate school was, to a large extend, filled with a strong interest in Virtualization Technologies during a time
when the famous OpenStack was just released not long ago. The notion of _having our own private cloud_ at the dawn of
Cloud Computing dominance as well as the enormous opportunities to learn this complicated system of OpenStack just
fascinated me deeply.

Few years after I was researching deploying k8s (an idea which I abandoned later because I believed any
production-quality application should not be deployed onto k8s) online and Google came up a concept I was never heard
of: [k8s through AMI](https://github.com/awslabs/amazon-eks-ami). It was this GitHub repo that introduced me the concept of Immutable Infrastructure. Coming
from a backend engineer background, I strongly resonates with the benefits of the Immutable Infrastructure and, most of
all, believe it acts as a key that bridges OpenStack to people's life. The _HashiStack_ was then initiated for __giving
each individual total control of every aspect of their technology lives__.

Documentation
-------------

HashiStack is under its active development and its state-of-the-art documentation can be found at [hashistack.org](https://hashistack.org/)

License
-------

The use and distribution terms for [HashiStack]() are covered by the [Apache License, Version 2.0].

<div align="center">
    <a href="https://opensource.org/licenses">
        <img align="center" width="50%" alt="License Illustration" src="https://github.com/QubitPi/QubitPi/blob/master/img/apache-2.png?raw=true">
    </a>
</div>

[Apache License, Version 2.0]: http://www.apache.org/licenses/LICENSE-2.0.html
[Apache License Badge]: https://img.shields.io/badge/Apache%202.0-F25910.svg?style=for-the-badge&logo=Apache&logoColor=white
[Apache License URL]: https://www.apache.org/licenses/LICENSE-2.0

[Discord]: https://img.shields.io/discord/1060753787125514332?color=5865F2&logo=discord&logoColor=ffffff&style=for-the-badge

[GitHub Last Commit]: https://img.shields.io/github/last-commit/QubitPi/hashistack/master?logo=github&style=for-the-badge
[GitHub Workflow Status Badge]: https://img.shields.io/github/actions/workflow/status/QubitPi/hashistack/ci-cd.yml?branch=master&logo=github&style=for-the-badge
[GitHub Workflow Status URL]: https://github.com/QubitPi/hashistack/actions/workflows/ci-cd.yml

[hashistack]: https://hashistack.com/
[HashiCorp Packer Badge]: https://img.shields.io/badge/Packer-02A8EF?style=for-the-badge&logo=Packer&logoColor=white
[HashiCorp Packer URL]: https://packer.qubitpi.org/packer/docs
[HashiCorp Terraform Badge]: https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white
[HashiCorp Terraform URL]: https://terraform.qubitpi.org/terraform/docs

[Screwdriver pipeline URL]: https://ci-cd.hashistack.com
[Screwdriver pipeline badge]: https://img.shields.io/badge/Screwdriver%20Pipeline-1475BB?style=for-the-badge&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiANCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I2ZmZmZmZjsiIGQ9Ik01MDQuNzgzLDc3LjA5MWgtMC4wMDZIMzAzLjQ5NGMtMi4wMzYsMC0zLjk3NywwLjg1OS01LjM0NSwyLjM2Ng0KCWMtMS4zNjgsMS41MDgtMi4wMzgsMy41Mi0xLjg0Miw1LjU0OWwzLjkyNSw0MC42OTNjMC4zNDMsMy41NTIsMy4yMjgsNi4zMiw2Ljc5Miw2LjUxNmw0Mi4wNSwyLjMxNGwtODAuNzM2LDExMi4wMjNMMTgwLjI5Myw3MS4xNDINCglsNjMuNTYzLTIuNDNjMy44NDQtMC4xNDYsNi44OTYtMy4yNzYsNi45NDUtNy4xMjFsMC40NjQtMzYuMzkyYzAuMDIyLTEuOTMyLTAuNzI2LTMuNzkyLTIuMDgyLTUuMTY2DQoJYy0xLjM1Ni0xLjM3Mi0zLjIwNi0yLjE0Ny01LjEzNy0yLjE0N0g3LjIyYy0zLjk4OSwwLTcuMjIsMy4yMzEtNy4yMiw3LjIyMXY0MC41NThjMCwzLjk0NywzLjE3LDcuMTYzLDcuMTE1LDcuMjJsNjYuOTE3LDAuOTY0DQoJbDEyNy4yNTcsMjI0LjQ4OGwtMC41NjgsMTQwLjIwNWwtODguNDgsMy42MzFjLTMuODE3LDAuMTU1LTYuODUsMy4yNTktNi45MjMsNy4wNzdsLTAuNzE2LDM3LjUwNg0KCWMtMC4wMzcsMS45MzksMC43MDksMy44MSwyLjA2OSw1LjE5NmMxLjM1NiwxLjM4MywzLjIxMiwyLjE2MSw1LjE1MSwyLjE2MWgyNzYuNzYyYzEuOTgxLDAsMy44NzUtMC44MTMsNS4yMzktMi4yNDkNCgljMS4zNjMtMS40MzUsMi4wNzgtMy4zNjgsMS45NzQtNS4zNDZsLTEuOTMzLTM3LjEzMmMtMC4xOTItMy42OTItMy4xNC02LjY0MS02LjgzNS02LjgzNGwtNzYuMTI0LTMuOTkybC0xMS4wODItMTM2LjU3DQoJTDQzNi40NzksMTM3LjMzbDU1LjY0LTIuNTNjMy4wNjMtMC4xNDIsNS43MDQtMi4yMDIsNi41ODctNS4xMzlsMTIuOTA5LTQzLjAxOGMwLjI0OC0wLjcyOSwwLjM4NS0xLjUxNiwwLjM4NS0yLjMzMg0KCUM1MTIsODAuMzI1LDUwOC43NzIsNzcuMDkxLDUwNC43ODMsNzcuMDkxeiIvPg0KPC9zdmc+

[immutable-infrastructure.com]: https://immutable-infrastructure.com/
[Immutable Infrastructure]: https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure
[OpenStack]: https://www.openstack.org/software/
