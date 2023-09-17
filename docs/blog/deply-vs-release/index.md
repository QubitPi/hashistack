---
slug: deploying-vs-releasing
title: Deploying v.s. Releasing
authors: [joseph-mathenge, jiaqi]
tags: [Continuous Delivery]
date: 2022-08-29
---

The key distinction between deployment and release is the business rationale. Deployment doesn't necessarily mean users
have access to features. Some companies will release at the same time as deployment to production is taking place.

Others will choose to wait, thereby having the new features in production but not availed to users until the business
decides.

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

What is Deployment
------------------

Deployment involves moving software from one controlled environment to another. **An environment is a subset of IT
infrastructure used for a particular purpose**. The most common environments are:

- **Development**. Commonly referred to as _dev_, this is where developers build the code.
- **Integration**. Here, the new code is combined and validated that it works with existing code.
- **Test**. This is where both functional and non-functional tests are conducted on the merged code to confirm it meets
  organization and customer requirements.
- **Staging**. This environment is used to test the software using real data to validate it is ready for use.
- **Production**. Commonly referred to as prod, this is where the software is made available to users.

What is Software Release
------------------------

A release is **a collection of one or more new or changed services or service components deployed into the live
environment as a result of one or more changes**

In other words, a release makes services and features available to users. More often than not,
[release management](https://www.bmc.com/blogs/devops-release-management/) is more of a business responsibility than a
technical responsibility. This is because the decisions on scheduling releases can be tied to business strategy from a
revenue or portfolio management perspective.
