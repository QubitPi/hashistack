---
sidebar_position: 1
title: hashicorp-aws Documentation
---

Introduction
------------

### Traditional Software Development

![Error loading traditional.png](https://github.com/QubitPi/QubitPi/blob/master/img/hashicorp-aws/traditional.png?raw=true)

I learned, from years of work experience, that thriving as a Software Engineer with their internal and external
engagement demands requires high levels of _interpersonal sophistication_. It is no doubt then that the **single
hardest task in teamwork is _efficient communication_**. This gets exacerbated in a software development cycle in which
a developer has to distribute their communication efforts among **3** parties, which makes mis-communication frequent

### How Big Techs Improve It

![Error loading yahoo.png](https://github.com/QubitPi/QubitPi/blob/master/img/hashicorp-aws/yahoo.png?raw=true)

By the time I joined Yahoo at 2016, the company had already made a
[big move by removing all of its QA teams COMPLETELY][Yahoo removed QA]. Software developers were required to write
automated tests by themselves using open source test frameworks, such as Groovy Spock, Jest, and Cypress. The software
testing was then fully automated through [Yahoo's own CI platform][Screwdriver], which is developed on top of
Jenkins originally.

This brought a big software quality improvements but in terms of communication
quality, at least from my experience, was still not optimal. I've had such experience when I finshed implementing a
system but waited for extra couple of weeks before DevOps Engineer set up a dedicated server for deployment. This
virtually got mis-translated to my boss as "A software developer had his work delayed for couple weeks".

### Software Development Tomorrow (What _HashiCorp AWS_ Does)

![Error loading new.png](https://github.com/QubitPi/QubitPi/blob/master/img/hashicorp-aws/new.png?raw=true)

The reason we still have DevOps staff is resource isolation using the ubiquitous Docker, which borns out of the
traditional on-premise technology, is _manual_. With on-demand cloud, resource isolations are assumed NOT managed. We
instead _manage business logics_ with efficiency ([Packer][HashiCrop Packer]) and immutability
([Terraform][HashiCrop Terraform]). **With HashiCorp + OpenStack Cloud, business no longer needs ~~Docker + k8s~~**. 
Teams and developers as well, with almost no overhead, are able to eliminate human DevOps<br/><br/>This is the picture 
from which I'm turning into reality in my team. Giving our developer fully **automated** control over infrastructure 
brings the following benefits to the team:

- **Our developers learn more cutting-edge industry skills compared to their peers which makes our developers more
  valuable along their career path**
- **Taking hardware constraint into account causes a paradigm shift in how our engineers thought about problems, which
  makes our developers better skilled and our software better in terms of quality**
- **Eventually reduces the labor costs of company**

Community [![Discord]](https://discord.com/widget?id=1060753787125514332)
-------------------------------------------------------------------------

The hashicorp-aws community generally hangs out [on Discord](https://discord.com/widget?id=1060753787125514332), so
please drop by if you have any questions, comments, concerns, wishes, hopes, dreams, wants, needs, yearnings, musings,
or idle curiosities about hashicorp-aws. We love meeting new people and talking with them about how they can best use
hashicorp-aws to solve their IaC problems. We know there are gaps in hashicorp-aws, and definitely lots of new, powerful
capabilities to add, so hearing about what's working and what could be better will help drive the direction of
hashicorp-aws.

If you have other thoughts, or are running into trouble and are not able to get help from the community on Discord,
please [open an issue](https://github.com/QubitPi/hashicorp-aws/issues) describing your problem or idea.

[Discord]: https://img.shields.io/discord/1060753787125514332?color=5865F2&logo=discord&logoColor=ffffff&style=for-the-badge

[hashicorp-aws] does exactly that.

[hashicorp-aws]: https://qubitpi.github.io/hashicorp-aws/
[HashiCrop Packer]: https://qubitpi.github.io/hashicorp-packer/packer/docs
[HashiCrop Terraform]: https://qubitpi.github.io/hashicorp-terraform/terraform/docs

[Screwdriver]: https://screwdriver.cd/

[Yahoo removed QA]: https://spectrum.ieee.org/yahoos-engineers-move-to-coding-without-a-net
