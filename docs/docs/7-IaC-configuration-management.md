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

Traditional configuration management includes Chef or Puppet. They assume mutable infrastructure.

With the adoption of Immutable infrastructure, we initially store and manage our configuration directly in GitHub
Secrets. This has the disadvantage of not being able to see after creation.

Then we moved to a centralized runbook. This exposed a great security risk

So this brought us to the ultimate way of thinking about configuration management in Immutable infrastructure

![](./img/github-secret.png)

1. We still need GitHub Secrets because that's the most secure way
2. We would separate config management in a separate repo

The thing that bridges the two above, is our github-secret action.
