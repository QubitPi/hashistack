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

[//]: # (TODO)
[//]: # (Please try our paid HACP platform to deploy a ELK and send app logs to it for debugging purposes)

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

### "git clone" step fails

```bash
error: xxxx bytes of body are still expected
fetch-pack: unexpected disconnect while reading sideband packet
fatal: early EOF
fatal: fetch-pack: invalid index-pack output
```

This can happen in Screwdriver CD Docker Compose running locally. It might be the network issue. The network is too
slow. Either diagnose network connection or, simply, re-run the Screwdriver pipeline couple more times.

More information can be found in
[this thread](https://stackoverflow.com/questions/66366582/github-unexpected-disconnect-while-reading-sideband-packet)
