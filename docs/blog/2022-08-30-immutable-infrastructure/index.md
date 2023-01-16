---
slug: immutable-infrastructure
title: What Is Immutable Infrastructure
authors: [hazel, jiaqi]
tags: [Continuous Delivery]
---

In a traditional mutable server infrastructure, servers are continually updated and modified in place. Engineers and
administrators working with this kind of infrastructure can SSH into their servers, upgrade or downgrade packages
manually, tweak configuration files on a server-by-server basis, and deploy new code directly onto existing servers. In
other words, these servers are mutable; they can be changed after they’re created. Infrastructure comprised of mutable
servers can itself be called mutable, traditional, or (disparagingly) artisanal.

An immutable infrastructure is another infrastructure paradigm in which servers are never modified after they're
deployed. If something needs to be updated, fixed, or modified in any way, new servers built from a common image with
the appropriate changes are provisioned to replace the old ones. After they’re validated, they’re put into use and the
old ones are decommissioned.

The benefits of an immutable infrastructure include more consistency and reliability in your infrastructure and a
simpler, more predictable deployment process. It mitigates or entirely prevents issues that are common in mutable
infrastructures, like configuration drift and [snowflake servers](https://martinfowler.com/bliki/SnowflakeServer.html).
However, using it efficiently often includes comprehensive deployment automation, fast server provisioning in a cloud
computing environment, and solutions for handling stateful or ephemeral data like logs.

<!--truncate-->

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

Differences Between Mutable and Immutable Infrastructure
--------------------------------------------------------

The most fundamental difference between mutable and immutable infrastructure is in their central policy: the components
of the former are designed to be changed after deployment; the components of the latter are designed to remain unchanged
and ultimately be replaced.

Conceptually speaking, the two kinds of infrastructure vary greatly in their approach to how servers should be treated
(e.g. created, maintained, updated, destroyed). This is commonly illustrated with a "pets versus cattle" analogy.

:::info Pets v.s. Cattle

The servers in traditional mutable infrastructures were irreplaceable, unique systems that had to be kept running at all
times. In this way, they were like **pets**: one of a kind, inimitable, and tended to by hand. Losing one could be
devastating. The servers in immutable infrastructures, on the other hand, are disposable and easy to replicate or scale
with automated tools. In this way, they're like **cattle**: one of many in a herd where no individual is unique or
indispensable.

To quote [Randy Bias](http://cloudscaling.com/blog/cloud-computing/the-history-of-pets-vs-cattle/), who first applied
the pets vs. cattle analogy to cloud computing:

> In the old way of doing things, we treat our servers like pets, for example Bob the mail server. If Bob goes down,
> it's all hands on deck. The CEO can’t get his email and it’s the end of the world. In the new way, servers are
> numbered, like cattle in a herd. For example, www001 to www100. When one server goes down, it's taken out back, shot,
> and replaced on the line.

Another similar way of illustrating the implications of the difference between how servers are treated is with the
concepts of snowflake servers and phoenix servers.

[**Snowflake servers**](https://martinfowler.com/bliki/SnowflakeServer.html) are similar to pets. They are servers that
are managed by hand, frequently updated and tweaked in place, leading to a unique environment.
[**Phoenix servers**](https://martinfowler.com/bliki/PhoenixServer.html) are similar to cattle. They are servers that
are always built from scratch and are easy to recreate (or "rise from the ashes") through automated procedures.

:::

Practically speaking, mutable infrastructure is a much older infrastructure paradigm that predates the core
technologies, like virtualization and [cloud computing](#embracing-the-cloud), that make immutable infrastructures
possible and practical. Knowing this history helps contextualize the conceptual differences between the two and the
implications of using one or the other in modern day infrastructure.

Embracing the Cloud
--------------------

Before virtualization and cloud computing became possible and widely available, server infrastructure was centered
around physical servers. These physical servers were expensive and time-consuming to create; the initial setup could
take days or weeks because of how long it took to order new hardware, configure the machine, and then install it in a
[colo](https://en.wikipedia.org/wiki/Colocation_centre) or similar location.

Mutable infrastructure has its origins here. Because the cost of replacing a server was so high, it was most practical
to keep using the servers you had running for as long as possible with as little downtime as possible. This meant there
were a lot of in place changes for regular deployments and updates, but also for ad-hoc fixes, tweaks, and patches when
something went wrong. The consequence of frequent manual changes is that servers can become hard to replicate, making
each one a unique and fragile component of the overall infrastructure.

The advent of virtualization and on-demand/cloud computing represented a turning point in server architecture. Virtual
servers were less expensive, even at scale, and they could be created and destroyed in minutes instead of days or weeks.
This made new deployment workflows and server management techniques possible for the first time, like using
configuration management or cloud APIs to provision new servers quickly, programmatically, and automatically. The speed
and low cost of creating new virtual servers is what makes the immutability principle practical.

Traditional mutable infrastructures originally developed when the use of physical servers dictated what was possible in
their management, and continued to develop as technology improved over time. The paradigm of modifying servers after
deployment is still common in modern day infrastructure. In contrast, immutable infrastructures were designed from the
start to rely on virtualization-based technologies for fast provisioning of architecture components, like cloud
computing's virtual servers.

Advantages of Immutable Infrastructure
--------------------------------------

To understand the advantages of immutable infrastructures, it’s necessary to contextualize the disadvantages of mutable
infrastructures.

Servers in mutable infrastructures can suffer from configuration drift, which is when undocumented, impromptu changes
cause servers' configurations to become increasingly divergent from each other and from the reviewed, approved, and
originally-deployed configuration. These increasingly snowflake-like servers are hard to reproduce and replace, making
things like scaling and recovering from issues difficult. Even replicating issues to debug them becomes challenging
because of the difficulty of creating a staging environment that matches the production environment.

With this in mind, the primary benefits of using an immutable infrastructure are deployment simplicity, reliability, and
consistency, all of which ultimately minimize or eliminate many common pain points and failure points.

### Known-Good Server State and Fewer Deployment Failures

All deployments in an immutable infrastructure are executed by provisioning new servers based on a validated and
version-controlled image. As a result, these deployments don’t depend on the previous state of a server, and
consequently can't fail - or only partially complete - because of it.

When new servers are provisioned, they can be tested before being put into use. In addition, deployments become
[atomic](https://en.wikipedia.org/wiki/Linearizability): either they complete successfully or nothing changes.

This makes deploying much more reliable and also ensures that the state of every server in the infrastructure is always
<!-- markdown-link-check-disable -->
known. Additionally, this process makes it easy to implement a [blue-green deployment](continuous-delivery) or
<!-- markdown-link-check-enable -->
[rolling releases](https://en.wikipedia.org/wiki/Rolling_release), meaning no downtime.

### No configuration Drift or Snowflake Servers

All configuration changes in an immutable infrastructure are implemented by checking an updated image into version
control with documentation and using an automated, unified deployment process to deploy replacement servers with that
image. Shell access to the servers is sometimes completely restricted.

This prevents complicated or hard-to-reproduce setups by eliminating the risk of snowflake servers and configuration
drift. This also prevents situations where someone needs to modify a poorly-understood production server, which runs a
high risk of error and causing downtime or unintended behavior.

### Consistent Staging Environments and Easy Horizontal Scaling

Because all servers use the same creation process, there are no deployment edge cases. This prevents messy or
inconsistent staging environments by making it trivial to duplicate the production environment, and also simplifies
horizontal scaling by seamlessly allowing you to add more identical servers to your infrastructure.

### Simple Rollback and Recovery Processes

Using version control to keep image history also helps with handling production issues. The same process that is used to
deploy new images can also be used to roll back to older versions, adding additional resilience and reducing recovery
time when handling downtime.

Implementing Immutable Infrastructure
-------------------------------------

Immutable infrastructure comes with some requirements and nuance in its implementation details, especially compared to
traditional mutable infrastructures.

It is technically possible to implement an immutable infrastructure independent of any automation, tooling, or software
design principles by simply adhering to the key principle of immutability. However, the components below (roughly in
priority order) are strongly recommended for practicality at scale:

- **Dedication from engineering and operations teams** to collaborate and commit to the approach. For all the simplicity
  of the end product, there are a lot of moving parts in an immutable infrastructure, and no one person will know all of
  it. Additionally, some aspects of working within this infrastructure can be new or outside of people’s comfort zones,
  like debugging or doing one-off tasks without shell access.
- **Servers in a cloud computing environment**, or another virtualized environment. The key here is to have isolated
  instances with fast provisioning from custom images, as well as automated management for creation and destruction via
  an API or similar.
- **Full automation of the entire deployment pipeline**, ideally including post-creation image validation. Setting up
  this automation adds significantly to the upfront cost of implementing this infrastructure, but it is a one-time cost
  which amortizes out quickly.
- **A [service-oriented architecture](https://en.wikipedia.org/wiki/Service-oriented_architecture)**, separating our
  infrastructure into modular, logically discrete units that communicate over a network.
- **A [stateless](https://en.wikipedia.org/wiki/Service_statelessness_principle), volatile application layer** which
  includes our immutable servers. Anything here can get destroyed and rebuilt quickly at any time (volatile) without any
  loss of data (stateless).
- **A persistent data layer** that includes:

  * **Centralized logging** with additional details about a server's deployment, like image identification via a version
    or Git commit SHA. Because servers are disposable (and frequently disposed of) in this infrastructure, storing logs
    and metrics externally allows debugging _even when shell access is restricted_ or after a server has been destroyed.
  * **External data stores** for databases and any other stateful or ephemeral data. We will never rely on local storage
    when the servers are volatile, so we need to store that data elsewhere.

There are many different ways to implement each of these components. CI/CD tools can be a good place to start for
deployment pipeline automation; [Netflix's Chaos Monkey](https://github.com/Netflix/chaosmonkey), which randomly kills
servers in your production environment, is a real trial by fire for your final setup.
