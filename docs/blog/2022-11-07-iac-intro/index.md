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

---
slug: iac-intro
title: Introduction to Infrastructure as Code (IaC)
authors: [jiaqi]
tags: [Infrastructure as Code, IaC]
---

:::tip [Wikipedia](https://en.wikipedia.org/wiki/Infrastructure_as_code):

**Infrastructure as code** (**IaC**) is the process of managing and provisioning computer data centers through
machine-readable definition files, rather than physical hardware configuration or interactive configuration tools. The
IT infrastructure managed by this process comprises both physical equipment, such as bare-metal servers, as well as
virtual machines, and configuration resources. The definitions may be in a version control system. The code in the
definition files may use either scripts or declarative definitions, rather than maintaining the code through manual
processes, but IaC more often employs declarative approaches.

:::

<!--truncate-->

The Need for Automation
-----------------------

Automation is the act of building a process that will operate without human intervention. It means automating the
configuration and management of cloud-based or on-premises computing infrastructure.

### What is Infrastructure

When we speak of infrastructure, we are referring to the **physical and/or virtual machines that run businesses**. For
example, a major retailer may require a large number of web servers, load balancers, and database servers to run their
retail websites.

These machines may be located in an on-premises data center, or very often, as virtual machines in "the cloud" such as
Amazon Web Services (AWS), Microsoft Azure, or Google Cloud Platform (GCP).

:::note

Virtual machines run on actual physical hardware and typically a number of virtual machines can run on a single physical
machine.

:::

![Error loading chef-infrstrucure2.png](./chef-infrstrucure2.png)

**One thing all these virtual or real machines require is server management. Management such as installing and updating
software, initial configuration, applying security measures, and periodic server content changes. Such management can be
labor-intensive and tedious without automation.**

### What is Automation

As mentioned above, automation is the act of building a process that will operate without human intervention. But what
does this mean in reality?

It's about creating a system that will take care of repetitive tasks, with consistency and reliability.  It is NOT about
replacing human operators, but instead freeing their time to work on more complex problems that require intelligent
insight, rather than simple rules.

In addition, the use of automation, and the promise of consistency and reliability helps provide trust in systems, which
in turn allows for greater innovation across the company.

### Infrastructure Automation

Infrastructure Automation refers to ensuring every system is configured correctly and consistently in any cloud, VM,
and/or physical infrastructure, in an automated fashion.
