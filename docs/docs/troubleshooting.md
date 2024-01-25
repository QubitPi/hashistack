---
sidebar_position: 8
title: General Troubleshooting
---

Troubleshooting
===============

This section discusses the common issue that can happen during all types of deployments.

HashiCorp
---------

### I Would Like to SSH into EC2 for Debugging Purposes

Fully adapting
[immutable infrastructure](https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure),
hashicorp-aws "seals" EC2 instances once it's created; that means not even admin or anyone else can jump into that
server vis SSH. _It's completely immutable_

:::tip

It is very important to connect our deployed infrastructure to an external logging & auditing service like ELK, because
once being deployed as an immutable infrastructure, the EC2 is completely sealed in a sense that no one can SSH into it.
This means logs or other metrics are not available unless they are send to an external logging & auditing service such as
ELK. Our HACP offers out-of-the box deployment of ELK and allow the deployment in EC2 to automatically connect to it to
send logs and metrics, which gives us a lot better experience on working with webservice logging & auditing.

:::

Another somewhat more time-consuming approach is to manually create an EC2 from pushed AMI image, specifying key pair
and run each app's corresponding Terraform init script after SSH into it.

### Value () for parameter groupId is invalid. The value cannot be empty

```console
aws_instance.***: Creating...
╷
│ Error: creating EC2 Instance: InvalidParameterValue: Value () for parameter groupId is invalid. The value cannot be empty
│ status code: 400, request id: ***
│ ...
```

This could happen when hashicorp-aws is using Terraform to launch EC2 instance. One possibility is the security group of
the instance is not found or hasn't been created yet.

Deployment via GitHub Actions
-----------------------------

Deployment via Screwdriver CD
-----------------------------

Please visit [Screwdriver troubleshooting] for issues about using Screwdriver CD.

[Screwdriver troubleshooting]: https://qubitpi.github.io/screwdriver-cd-guide/user-guide/troubleshooting
