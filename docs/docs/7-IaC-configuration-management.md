---
sidebar_position: 7
title: Configuration Management for Immutable Infrastructure
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

Being a strong proponent of Immutable Infrastructure, [hashicorp-aws] is constantly pushing the limits of its ability
in various use cases, one of which is the _Configuration Management_

Traditional configuration management includes Chef, Puppet, and Ansible. They all assume mutable infrastructure being
present. For example, Chef has a major component responsible for jumping into a VM, checking if config has been mutated
before apply any operations.

With the adoption of Immutable infrastructure, we initially stored and managed our configuration, such as SSL
certificate or AWS SECRET ACCESS KEY directly in GitHub Secrets. This has the disadvantage of not being able to see
their values after creation, making it very hard to manage.

Then we moved to a centralized runbook, where everything can easily be seen and modified by authorized team members.
This exposed a great security risk

So this brought us to the ultimate way of thinking about configuration management in Immutable infrastructure

![](./img/github-secret.png)

1. We still need GitHub Secrets because that's the most secure way
2. We would separate config management in a separate repo

The thing that bridges the two above, is our github-secret action.

[hashicorp-aws]: https://qubitpi.github.io/hashicorp-aws/
