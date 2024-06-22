---
slug: deploying-vs-releasing
title: Deploying v.s. Releasing
authors: [joseph-mathenge, jiaqi]
tags: [Continuous Delivery]
---

The key distinction between deployment and release is the business rationale. Deployment doesn't necessarily mean users
have access to features. Some companies will release at the same time as deployment to production is taking place.

Others will choose to wait, thereby having the new features in production but not availed to users until the business
decides.

<!--truncate-->

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
