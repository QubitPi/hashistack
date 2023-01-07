---
slug: continuous-delivery
title: Continuous Delivery
authors: [jiaqi]
tags: [CI]
---

Continuous Delivery is the ability to get changes of all types - including new features, configuration changes, bug
fixes and experiments - into production, or into the hands of users, _safely_ and _quickly_ in a _sustainable_ way.

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

The goal of continuous delivery is to make deployments - whether of a large-scale distributed system, a complex
production environment, an embedded system, or an app - predictable, routine affairs that can be performed on demand.

The practices at the heart of continuous delivery help us achieve several important benefits:

- **Low risk releases**. The primary goal of continuous delivery is to make software deployments painless, low-risk
  events that can be performed at any time, on demand. By applying [patterns](#patterns) such as **blue-green
  deployments** it is relatively straightforward to achieve zero-downtime deployments that are undetectable to users.

  :::info blue-green deployment

  ![Error loading blue-green-deployments.png ](./blue-green-deployments.png)

  One of the challenges with automating deployment is the cut-over itself, taking software from the final stage of
  testing to live production. We usually need to do this quickly in order to minimize downtime. The blue-green
  deployment approach does this by ensuring we have **two production environments**, as identical as possible. At any
  time one of them, let's say blue for the example, is live. As we prepare a new release of our software we do our
  final stage of testing in the green environment. Once the software is working in the green environment, we switch the
  router so that all incoming requests go to the green environment - the blue one is now idle.

  Blue-green deployment also gives us a rapid way to rollback - if anything goes wrong we switch the router back to
  our blue environment. There's still the issue of dealing with missed transactions while the green environment was
  live, but depending on our design we may be able to feed transactions to both environments in such a way as to keep
  the blue environment as a backup when the green is live. Or we may be able to put the application in read-only mode
  before cut-over, run it for a while in read-only mode, and then switch it to read-write mode. That may be enough to
  flush out many outstanding issues.

  The two environments need to be different but as identical as possible. In some situations they can be different
  pieces of hardware, or they can be different virtual machines running on the same (or different) hardware. They can
  also be a single operating environment partitioned into separate zones with separate IP addresses for the two slices.

  Once we've put our green environment live and we're happy with its stability, we then use the blue environment as
  our **staging environment** for the final testing step for our next deployment. When we are ready for our next
  release, we switch from green to blue in the same way that we did from blue to green earlier. That way both green and
  blue environments are regularly cycling between live, previous version (for rollback) and staging the next version.

  An advantage of this approach is that it's the same basic mechanism as we need to get a hot-standby working. Hence
  this allows us to test our disaster-recovery procedure on every release.

  The fundamental idea is to have two easily switchable environments to switch between, there are plenty of ways to vary
  the details. One project did the switch by bouncing the web server rather than working on the router. Another
  variation would be to use the same database, making the blue-green switches for web and domain layers.

  Databases can often be a challenge with this technique, particularly when we need to change the schema to support a
  new version of the software. The trick is to **separate the deployment of schema changes from application upgrades**.
  So first apply a database refactoring to change the schema to support both the new and old version of the application,
  deploy that, check everything is working fine so we have a rollback point, then deploy the new version of the
  application. (And when the upgrade has bedded down remove the database support for the old version.)
  :::

- **Faster time to market**. It's common for the integration and test/fix phase of the traditional phased software
  delivery lifecycle to consume weeks to even months. When teams work together to automate the build and deployment,
  environment provisioning, and regression testing process, developers can incorporate integration and regression
  testing into their daily work and completely remove these phases. We also avoid the large amount of re-work that
  plague the phased approach.
- **Higher quality and Better products**. When developers have automated tools that discover regressions within minutes,
  teams are freed to **focus their effort on user research and higher level testing activities** such as exploratory
  testing, usability testing, and performance and security testing. By building a deployment pipeline, these activities
  can be performed continuously throughout the delivery process, ensuring quality is built into products and services
  from the beginning. Continuous delivery makes it economic to work in small batches. This means we can get feedback
  from users throughout the delivery lifecycle based on working software.
- **Lower costs**. Any successful software product or service will evolve significantly over the course of its lifetime.
  By investing in build, test, deployment and environment automation, we substantially reduce the cost of making and
  delivering incremental changes to software by **eliminating many of the fixed costs** associated with the release
  process.
- **Happier teams**. Continuous Delivery makes releases less painful and reduces team burnout. Furthermore, when we
  release more frequently, software delivery teams can engage more actively with users, learn which ideas work and which
  don't, and see first-hand then outcomes of the work they have done. By removing low-value painful activities
  accociated with software delivery, we can fodus on what we care about most - continuous delighting our users.

**Continuous delivery is about continuous, daily improvement - the constant discipline of pursuing higher performance by
following the heuristic "if it hurts, do it more often, and bring the pain forward."**

Implementing Continuous Delivery
--------------------------------

### Patterns

[TODO](https://www.atlassian.com/continuous-delivery)
