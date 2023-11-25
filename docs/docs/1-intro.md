---
sidebar_position: 1
title: Introduction
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

Platform teams are now widespread, standardizing organizational approaches to the cloud. But as platforms expand, we 
often struggle to reach the desired levels of scale. Adoption slows as subject matter experts (SMEs) get burdened with 
support requests. Governance teams become a bottleneck on the path to production, slowing the release cycle.

Highly cloud mature organizations don't suffer like this. They recognize that different concerns are at play when 
operating at scale and adapt their processes to deliver at a faster pace. The role that HashiCorp plays in this should 
not be underestimated. By codifying and standardizing an organization's infrastructure and compliance rules, developers
can be free to do what they want to: add business value by writing code.

[hashicorp-aws] helps an organization mature quickly, become a high performer, and scale its platform. This 
introduction discusses how [hashicorp-aws] enables enterprises to make the best use of HashiCorp
[Packer][HashiCrop Packer] and [Terraform][HashiCrop Terraform].

Guiding Principles
------------------

Left to grow organically, cloud platforms can end up wild and hard to use. But rigidly enforcing standards can lead to a
platform that doesn't meet customer needs, ultimately encouraging [shadow IT](https://en.wikipedia.org/wiki/Shadow_IT).
Instead, platform teams in organizations with high cloud maturity typically adopt a set of guiding principles - like the
ones laid out below - that strike a balance between the two extremes. Principles like these help to shape the culture of
a cloud platform, influencing its developers to help it meet the needs of both the organization and its customers
(application teams).

### Standardization

Two anti-patterns often arise as organizations increase the use of their platform and start to scale: first module
proliferation, then mega-modules.

Module proliferation happens when developers discover
[the benefits of Terraform modules](https://developer.hashicorp.com/terraform/tutorials/modules/module) and start
creating them. Without centralized coordination, the path of least resistance is often to create a new module instead of
trying to reuse one that doesn't quite fit requirements. The sprawl of similar-looking modules can become difficult to
use and a maintenance headache.

In an attempt to fix this sprawl, mega-modules arise as platform teams consolidate overlapping modules hoping to reduce
proliferation and encourage code reuse. These bloated mega-modules aim to cover every possible use case but often become
overly brittle and complex.

To address these problems, cloud mature organizations apply the
[Pareto Principle](https://en.wikipedia.org/wiki/Pareto_principle) to module design. Use case analysis shows that the
vast majority of modules need just a handful of inputs to meet most customer requirements. Focusing on this "easy 80%"
of use cases results in neat, concise modules that are simple to understand and use. It also causes modules to become
more opinionated, which guides developers into a standard pattern, bringing consistency around how infrastructure is
used in the organization.

Gradually, more than just code can be shared. Best practices start to emerge. Runbooks and documentation are made
consistent. Golden paths are created.

### Golden Paths

Famously, Spotify addressed its scale problems with
[golden paths](https://engineering.atspotify.com/2020/08/how-we-use-golden-paths-to-solve-fragmentation-in-our-software-ecosystem/).
Cloud mature organizations find they can do the same with their Terraform modules to scale out and increase delivery
velocity. Following the golden path model, Terraform modules should be easily discoverable (typically via an
[internal module registry](https://developer.hashicorp.com/terraform/registry/private)), with a clear journey through
the module, high-quality user instructions, and an obvious way to find support.

Modules like these provide an easy route for developers wanting to use them and encourage developers to reuse code
rather than reinvent the wheel. As always, some edge cases won’t be able to use a module without making the interface
too complex. But that’s OK. Developers should be free to leave the golden path and follow their own route when
necessary. It’s worth checking back every so often, though, to make sure the golden path modules still cater to the
majority of use cases.

### Developer Experience

Application teams inside an organization are a captive audience, but that is no excuse to ignore the developer
experience. Modules that are easy to understand help to lower the learning curve for new users. They help developers to
help themselves, easing the support burden on SMEs. They bring more joy, satisfaction, and engagement both for those
using a module, and those maintaining it.

[The Technology Acceptance Model (TAM)](https://open.ncl.ac.uk/theories/1/technology-acceptance-model/) suggests that
adoption is predicted on how much people see something as **being useful** and **easy to use**. Standardization and
golden paths address both these factors and make adoption of a module more likely. But there is much more that can be
done to make modules easy to use. For example:

- The API of a Terraform module should help developers use it correctly, through variable validation and sensible
  default values for variables.
- Terraform repositories should have a consistent folder and file structure.
- Terraform code comments
  [should clearly explain](https://blog.codinghorror.com/code-tells-you-how-comments-tell-you-why/) why a decision has
  been taken, when the code itself is unclear.
- Proper
  [bounds checking and error checking](https://developer.hashicorp.com/terraform/language/expressions/custom-conditions)
  will help catch common input mistakes.
- Storing user-facing documentation and code samples in the module repository makes it easier to remember to update
  them.

A relentless focus is needed to maintain good experience and make sure that every change to a module considers how its
users will be affected.

### Product Management

Standardization, golden paths, and a great developer experience won’t just happen overnight. Constant planning,
coordination, and oversight are needed to reach true scale. In other words, each Terraform module needs to be a
component of a comprehensive
[infrastructure product](https://www.thoughtworks.com/insights/articles/infrastructure-as-product), with an assigned
product owner. This person takes accountability for a module’s interface, its roadmap, and its maintenance. To form a
cohesive product offering, cloud mature organizations also place
[policy as code](https://docs.hashicorp.com/sentinel/concepts/policy-as-code), documentation, examples, and developer
advocacy under the accountability of the product owner.

Common Advanced Patterns
------------------------

Everything described so far will help an organization through its crawl, walk, run journey with a cloud platform. But
for some organizations, that isn’t enough. They want to fly. These advanced patterns use Terraform modules to scale by
removing even more toil and manual process from a delivery pipeline. They enable application teams to quickly deploy
infrastructure that complies with organizational policies, follows best practices, and doesn’t require a steep learning
curve or specialist knowledge.

### Cohesive Modules

Cohesion means that related parts of a code base are kept in a single place. When thinking about infrastructure as a 
product, this means that all concerns making a 'unit' of infrastructure should live in the same Terraform module.

### Compliant Modules

Shifting left doesn’t just apply to security or application testing. Mature organizations accelerate application
delivery by shifting compliance left in this manner as well. Lengthy governance processes can be simplified by writing
compliance policies as code, instead of repeating them manually for every deployment. Slow release cycles can be
accelerated — even in highly regulated industries — if compliance can be guaranteed during the development phase.

### Architecture Blueprints

Some highly cloud mature organizations go further still. If Terraform modules serve as the LEGO blocks that build
applications, then architecture blueprints are the instruction manual that defines how to link them together. As common
architectural patterns emerge, they can be codified into a standalone infrastructure product that binds multiple blocks
together into a complete solution. A module of modules.

So long as these patterns remain standardized across the organization, they can supercharge application delivery. A
product owner can ensure the pattern meets the organization’s governance, risk, and compliance requirements, and
application teams can simply consume the pattern and fast-track into production.

Common Blockers
---------------

While these advanced patterns may sound idealistic and aspirational, they really do work in practice and many
organizations are already benefiting. In cases where those benefits are slow to appear, technology is rarely the
barrier — process is. Here are some frequently raised reasons organizations fail to mature their processes using these
approaches, and ways to overcome the blocker:

### The Platform Team is Too Busy

Platform teams are often small and have many competing priorities. They can be so busy that there is no time to mature
their use of modules. But, like
[sharpening the axe](https://www.clairenewton.co.za/my-articles/the-wood-cutter-stories.html#h4-have-you-sharpened-your-axe),
taking time out to improve the platform can pay dividends later on. It’s hard to improve a platform when the team is
always in fire-fighting mode. Technical debt has to be paid down.

### No One Wants to Use Our Common Modules

The Roman poet Juvenal said:
"[Give them bread and circuses and they will never revolt.](https://en.wikipedia.org/wiki/Bread_and_circuses)" A good
product owner is essential to make sure that a common Terraform module is both useful and easy to use. Give developers
what they want, make it easy for them to use, and they will have no reason to resort to shadow IT.

### There is Too Much Maintenance

Keeping modules evergreen, useful, and easy to use is not effortless. But maintaining one module is much easier than
maintaining several. Cloud mature organizations recognize that Terraform code is being maintained in many different
places, and that centralizing the effort makes more sense.

Good product owners encourage contributions from their community, using the
[inner source model](https://en.wikipedia.org/wiki/Inner_source) to distribute the burden
of maintenance. Automation tools like [Dependabot](https://github.com/dependabot) help take the burden out of finding
and applying version updates.

### Developers Can't Be Trusted

Low-maturity organizations struggle when application teams are not trusted to make changes directly in production
without oversight and a separate team is needed to approve and deploy the changes.

Automation helps drive organizations toward high maturity. Since infrastructure is written in Terraform, the subject
matter experts and governance teams codify their rules and inject them into the deployment pipeline. If a block of
Terraform doesn't meet compliance requirements, it won't get deployed. Developers are trusted to make changes because
automated checks prove that the changes are OK: [Trust, but verify](https://en.wikipedia.org/wiki/Trust,_but_verify).

How to Get Started
------------------

The end goal is attractive: developer self-service, at scale, in a safe, compliant environment. But getting there takes
time and resources. Careful planning can help you deliver business value more quickly.

To prioritize, it’s important to understand how the platform will be used. Should a developer (with sufficient
guardrails) be able to deploy straight into production? Or should some kind of manual quality gate always exist? Are
governance teams able and willing to work with the platform team to codify compliance checks?

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

[Platform teams are now widespread](https://www.hashicorp.com/state-of-the-cloud#92percent-of-organizations-are-adopting,-standardizing,-or-scaling-platform-teams),
standardizing organizational approaches to the cloud. But as platforms expand, they often struggle to reach the desired
levels of scale. Adoption slows as subject matter experts (SMEs) get burdened with support requests. Governance teams
become a bottleneck on the path to production, slowing the release cycle.

Highly cloud mature organizations don’t suffer like this. They recognize that different concerns are at play when
operating at scale and adapt their processes to deliver at a faster pace. The role that
[HashiCorp Terraform](https://www.terraform.io) plays in this should not be underestimated. By codifying and
standardizing an organization’s infrastructure and compliance rules, developers can be free to do what they want to: add
business value by writing code.

What does that mean in practice? How can an organization mature quickly, become a high performer, and scale its
platform? This blog post looks at some of the patterns and techniques that we see in high-maturity organizations and
provides ideas on how enterprises can make the best use of Terraform.

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
