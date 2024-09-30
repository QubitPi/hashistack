---
sidebar_position: 9
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
hashistack "seals" EC2 instances once it's created; that means not even admin or anyone else can jump into that
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

This could happen when hashistack is using Terraform to launch EC2 instance. One possibility is the security group of
the instance is not found or hasn't been created yet.

AWS
---

### Security Group Isn't Working as Expected in AWS

:::info

We take [Kong API Gateway](kong-api-gateway/index) as an example in the discussion below.

:::

This could happen when we are accessing the deployed gateway from a public IP address, such as our personal computer.

Complying with the best security practice, hashistack binds _private_ EC2 IP to a Route 53 domain. Since it is a
common practice to limit the API gateway access by assigning gateway instance with
[inbound rules](https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html). hashistack also manages
to disable all HTTP request to the gateway. Therefore, any public visit to our deployed gateway instance has to go
through the gateway domain.

But since the domain is bound by a private IP, accessing the gateway through the domain from public IP source will hit
the private IP, which would always fail _independent_ of security group configs

:::info

The reason we bind _private_ IP to domain is that
[when gateway is used for inter security-group communication, it works
over private addressing. If we use the public IP address the firewall rule will not recognise the source security group](https://stackoverflow.com/a/24242211).
This is particularly important when the gateway is serving API to downstream services such as frontend APP.

:::

_The solution_? To access the gateway manually from our machine, for instance, we should address the instance using the
Public DNS record - this will actually be pointed at the private IP address when we hit the DNS name.

For example, if our instance has public IP `203.0.113.185` and private IP `10.1.234.12`, we are given a public DNS name
like `ec2-203-0-113-185.eu-west-1.compute.amazonaws.com`, which will resolve to `203.0.113.185` if queried externally,
or `10.1.234.12` if queried internally. This will enable our security groups to work as intended. See
[this thread](https://stackoverflow.com/a/24242211) for more details.

Screwdriver CD
--------------

**Q**: I updated template (such as a template parameter name) but it was not taking effect in the pipeline that uses
this template.

**A**: This is because the pipeline is still referencing the old template definition. Note that when template is
republished, it doesn't automatically refresh the pipeline that uses this template. There are 2 approaches for solving
this problem:

1. Simply delete and recreate the pipeline to pick up the updated template definition
2. Re-sync pipeline by navigating to **Options** tab of the pipeline UI and then click sync button next to the
   **Pipeline** in **Sync** section (shown below). _Lastly_, refresh the pipeline **Builds** page.

   ![Error loading resync-pipeline.png](img/resync-pipeline.png)
