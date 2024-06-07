---
sidebar_position: 1
title: General Deployment
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

General Deployments
-------------------

:::info

Please complete the following two prerequisite setups before preceding

1. [general setup](../setup#setup) (without [SSL setup](../setup#optional-setup-ssl))
2. [DNS setup][docker-mailserver DNS setup]

:::

### Defining Packer Variables

Create a [HashiCorp Packer variable values file] named **aws-docker-mailserver.pkrvars.hcl** under
**[hashicorp-aws/hashicorp/docker-mailserver/images]** with the following contents:

```hcl title="hashicorp-aws/hashicorp/docker-mailserver/images/aws-docker-mailserver.auto.pkrvars.hcl"
ami_region          = "us-east-1"
ami_name            = "my-docker-mailserver-ami"
ssl_cert_source     = "/path/to/ssl.crt"
ssl_cert_key_source = "/path/to/ssl.key"
base_domain         = "mycompany.com"
```

- `ami_region` is the [region][AWS regions] where docker-mailserver [AMI][AWS AMI] will be published to. The published
  image will be _private_
- `ami_name` is the published [AMI][AWS AMI] name; it can be arbitrary
- `ssl_cert_source` is the absolute path or the path relative to [hashicorp-aws/hashicorp/docker-mailserver/images] of
  the [SSL certificate file](../setup#optional-setup-ssl) for the domain serving the docker-mailserver EC2 instance
- `ssl_cert_key_source` is the absolute path or the path relative to
  [hashicorp-aws/hashicorp/docker-mailserver/images] of the [SSL certificate key file](../setup#optional-setup-ssl) for
  the domain serving the docker-mailserver EC2 instance

  :::info

  hashicorp-aws [supports SSL][docker-mailserver SSL setup] with the
  [Bring Your Own Certificates][docker-mailserver SSL setup - Let's Encrypt] (certbot) option

  :::

- `base_domain` is the base domain name of the MX record. For example, if base domain is 'mycompany.com', the generated
  MX record will be 'mail.mycompany.com'

- (Optional) `instance_type`: is the [AWS EC2 instance type] building this image. hashicorp-aws uses "t2.micro" as
  default value if this value is unspecified

### Defining Terraform Variables

Create a [HashiCorp Terraform variable values file] named **aws-docker-mailserver.tfvars** under
**[hashicorp-aws/hashicorp/docker-mailserver/instances]** with the following contents:

```hcl title="hashicorp-aws/hashicorp/docker-mailserver/instances/aws-docker-mailserver.auto.tfvars"
aws_ec2_region    = "us-east-1"
ami_name             = "my-docker-mailserver-ami"
instance_name        = "My docker-mailserver instance"
key_pair_name        = "My SSH keypair name"
security_groups      = ["My docker-mailserver Security Group"]
base_domain          = "mycompany.com"
route_53_zone_id     = "9DQXLTNSN7ZX9P8V2KZII"
first_email          = "jack@mycompany.com"
first_email_password = "sdfeo9uig&^&rf8u"
```

- `aws_ec2_region` is the [EC2 runtime region][AWS regions] where docker-mailserver EC2 instance will be deployed
  into
- `ami_name` is the name of the published AMI; **it must be the same as the `ami_name` in
  [Packer variable file](#defining-packer-variables)**
- `instance_name` is the deployed EC2 name as appeared in the instance list of AWS console; it can be arbitrary
- `key_pair_name` is the name of
  [AWS EC2 key pair] bound to this docker-mailserver instance. We can use this key pair to later ssh into the instance
  for admin management purposes
- `security_groups` is the list of [AWS Security Group] _names_ to associate with (yes, not ID, but name...)

  :::tip

  The security group must open all the ports mentioned [docker-mailserver's documentation][docker-mailserver ports]

  :::

- `base_domain` is the base domain name of the MX record. For example, if base domain is 'mycompany.com', the generated
  MX record will be 'mail.mycompany.com'

  :::note

  hashicorp-aws will bind a _private_ IP address to this domain because
  [AWS security groups works for private IP only for DNS resolving](https://serverfault.com/a/967483).

  :::

- `route_53_zone_id` is the AWS Route 53 hosted Zone ID that hosts the domain "mail.mycompany.com"

  :::tip

  To find the zone ID in AWS Route 53, we can:

  1. Sign in to the AWS Management Console
  2. Open the Route 53 console at https://console.aws.amazon.com/route53/
  3. Select Hosted zones in the navigation pane
  4. Find the requested ID in the top level Hosted Zones summary in the Route 53 section

  :::

- `first_email` is the email used for mail server startup.
- `first_email_password` is the password of the email for mail server startup

  :::tip

  On first start, we will need to add at least one email account. The provided first email will be used for that and
  can be used for sending/receiving emails immediately after deployment

  :::

- (Optional) `instance_type`: is the [AWS EC2 instance type] running the EC2 instance. hashicorp-aws uses "t2.micro" as
  default value if this value is unspecified

### Building AMI Image

```console
cd hashicorp-aws/hashicorp/docker-mailserver/images
packer init .
packer validate -var "skip_create_ami=true" .
packer build -var "skip_create_ami=false" .
```

### Deploying to EC2

:::caution

Depending on the [AMI](#defining-packer-variables) and [EC2](#defining-terraform-variables) configs, **please be aware
AWS credit charges shall incur after the following commands execute**

:::

```console
cd ../instances/
terraform init
terraform validate
terraform apply -auto-approve
```

Deployment via Screwdriver CD
-----------------------------

hashicorp-aws supports deployment using [Screwdriver CD](screwdriver-cd-deployment). Please check it out. <img src="https://github.com/QubitPi/QubitPi/blob/master/img/8%E5%A5%BD.gif?raw=true" height="40px"/>

Deployment via HACP
-------------------

:::tip

Please try our HACP platform to deploy a docker-mailserver instance. It gives us one-click experience that helps us
stand up docker-mailserver in a minute.

:::

FAQ
---

### How to Add New Email Accounts or Update Email Password

Use [setup.sh][docker-mailserver setup.sh]

```console
./setup.sh email add <email> <password>
./setup.sh email update <email> <password>
./setup.sh email del <email>
./setup.sh email list
```

Troubleshooting
---------------

### Emails Not Sent to External Emails

_While sending emails to external emails such as a working gmail, it does not go through, usually complaining of
**connection timed out**. An example error log looks like the following_.

```console
Sep 26 02:47:21 mail postfix/qmgr[1329]: 8167B7F0B1: from=<iam@zp4rker.com>, size=2190, nrcpt=1 (queue active)
Sep 26 02:47:21 mail amavis[1223]: (01223-02) Passed CLEAN {RelayedOpenRelay}, [110.141.179.150]:60565 [110.141.179.150] <iam@zp4rker.com> -> <iamzp4rker@gmail.com>, Queue-ID: E27927F0C0, Message-ID: <2b0b8cff-b4e5-4f01-b778-9b5d7d76f988@spark>, mail_id: dGghh_AqJFO4, Hits: -0.201, size: 1959, queued_as: 8167B7F0B1, 1501 ms
Sep 26 02:47:21 mail postfix/smtp-amavis/smtp[2330]: E27927F0C0: to=<iamzp4rker@gmail.com>, relay=127.0.0.1[127.0.0.1]:10024, delay=1.6, delays=0.12/0.01/0/1.5, dsn=2.0.0, status=sent (250 2.0.0 from MTA(smtp:[127.0.0.1]:10025): 250 2.0.0 Ok: queued as 8167B7F0B1)
Sep 26 02:47:21 mail postfix/qmgr[1329]: E27927F0C0: removed
Sep 26 02:47:22 mail postfix/smtp[2339]: connect to gmail-smtp-in.l.google.com[2404:6800:4003:c0f::1a]:25: Cannot assign requested address
Sep 26 02:47:43 mail postfix/smtp[2307]: connect to gmail-smtp-in.l.google.com[142.251.10.27]:25: Connection timed out
Sep 26 02:47:43 mail postfix/smtp[2307]: connect to gmail-smtp-in.l.google.com[2404:6800:4003:c0f::1b]:25: Cannot assign requested address
Sep 26 02:47:43 mail postfix/smtp[2307]: connect to alt1.gmail-smtp-in.l.google.com[2607:f8b0:400e:c00::1a]:25: Cannot assign requested address
Sep 26 02:47:51 mail dovecot: imap(iam@zp4rker.com)<2220><QibNiYvpkexujbOW>: Connection closed (EXPUNGE finished 31.220 secs ago) in=836 out=6270 deleted=1 expunged=1 trashed=0 hdr_count=3 hdr_bytes=64 body_count=0 body_bytes=0
Sep 26 02:47:51 mail dovecot: imap(iam@zp4rker.com)<2219><FRTNiYvpkOxujbOW>: Connection closed (UID SEARCH finished 31.145 secs ago) in=4407 out=14821 deleted=0 expunged=0 trashed=0 hdr_count=8 hdr_bytes=264 body_count=0 body_bytes=0
Sep 26 02:47:52 mail postfix/smtp[2339]: connect to gmail-smtp-in.l.google.com[142.251.10.26]:25: Connection timed out
Sep 26 02:48:13 mail postfix/smtp[2307]: connect to alt1.gmail-smtp-in.l.google.com[173.194.202.27]:25: Connection timed out
Sep 26 02:48:18 mail postfix/smtpd-amavis/smtpd[1579]: timeout after END-OF-MESSAGE from localhost[127.0.0.1]
Sep 26 02:48:18 mail postfix/smtpd-amavis/smtpd[1579]: disconnect from localhost[127.0.0.1] ehlo=1 mail=1 rcpt=1 data=1 commands=4
Sep 26 02:48:22 mail postfix/smtp[2339]: connect to alt1.gmail-smtp-in.l.google.com[173.194.202.27]:25: Connection timed out
Sep 26 02:48:22 mail postfix/smtp[2339]: connect to alt1.gmail-smtp-in.l.google.com[2607:f8b0:400e:c00::1b]:25: Cannot assign requested address
Sep 26 02:48:22 mail postfix/smtp[2339]: connect to alt2.gmail-smtp-in.l.google.com[2607:f8b0:4023:c0b::1a]:25: Cannot assign requested address
Sep 26 02:48:22 mail postfix/smtp[2339]: 8167B7F0B1: to=<iamzp4rker@gmail.com>, relay=none, delay=61, delays=0.01/0.01/61/0, dsn=4.4.1, status=deferred (connect to alt2.gmail-smtp-in.l.google.com[2607:f8b0:4023:c0b::1a]:25: Cannot assign requested address)
Sep 26 02:48:25 mail postfix/postscreen[2537]: CONNECT from [170.187.162.6]:61000 to [172.25.0.2]:25
Sep 26 02:48:31 mail postfix/postscreen[2537]: PASS NEW [170.187.162.6]:61000
Sep 26 02:48:31 mail postfix/smtpd[2554]: connect from cloud-scanner-a68296bf.internet-research-project.net[170.187.162.6]
Sep 26 02:48:32 mail postfix/smtpd[2554]: lost connection after AUTH from cloud-scanner-a68296bf.internet-research-project.net[170.187.162.6]
Sep 26 02:48:32 mail postfix/smtpd[2554]: disconnect from cloud-scanner-a68296bf.internet-research-project.net[170.187.162.6] auth=0/1 commands=0/1
Sep 26 02:48:43 mail postfix/smtp[2307]: connect to alt2.gmail-smtp-in.l.google.com[142.250.141.26]:25: Connection timed out
Sep 26 02:48:43 mail postfix/smtp[2307]: B00297F0A3: to=<iamzp4rker@gmail.com>, relay=none, delay=623, delays=532/0.01/91/0, dsn=4.4.1, status=deferred (connect to alt2.gmail-smtp-in.l.google.com[142.250.141.26]:25: Connection timed out)
Sep 26 02:48:50 mail dovecot: imap-login: Login: user=<iam@zp4rker.com>, method=PLAIN, rip=110.141.179.150, lip=172.25.0.2, mpid=2618, TLS, session=<NIhEkYvpo+xujbOW>
Sep 26 02:48:50 mail dovecot: imap-login: Login: user=<iam@zp4rker.com>, method=PLAIN, rip=110.141.179.150, lip=172.25.0.2, mpid=2619, TLS, session=<Ur9EkYvpouxujbOW>
```

This is a connection issue. The server is not able to establish outgoing connections on port tcp/25. This might be just
a missing firewall rule, or the
[cloud provider blocks port 25, which is the case on AWS](https://repost.aws/knowledge-center/ec2-port-25-throttle).
You can manually test the connection with `nc alt1.gmail-smtp-in.l.google.com 25` on our server to verify that.

In the case of AWS, we will need to sign in to our AWS account, and then open the
[Request to remove email sending limitations form](https://aws-portal.amazon.com/gp/aws/html-forms-controller/contactus/ec2-email-limit-rdns-request).

[AWS AMI]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[AWS EC2 instance type]: https://aws.amazon.com/ec2/instance-types/
[AWS EC2 key pair]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html
[AWS regions]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Availability
[AWS Security Group]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html

[docker-mailserver DNS setup]: https://qubitpi.github.io/docker-mailserver/edge/usage/#minimal-dns-setup
[docker-mailserver ports]: https://qubitpi.github.io/docker-mailserver/edge/config/security/understanding-the-ports/#overview-of-email-ports
[docker-mailserver setup.sh]: https://qubitpi.github.io/docker-mailserver/edge/config/setup.sh/
[docker-mailserver SSL setup]: https://qubitpi.github.io/docker-mailserver/edge/config/security/ssl/
[docker-mailserver SSL setup - Let's Encrypt]: https://docker-mailserver.github.io/docker-mailserver/latest/config/security/ssl/#lets-encrypt-recommended

[hashicorp-aws/hashicorp/docker-mailserver/images]: https://github.com/QubitPi/hashicorp-aws/tree/master/hashicorp/docker-mailserver/images
[hashicorp-aws/hashicorp/docker-mailserver/instances]: https://github.com/QubitPi/hashicorp-aws/tree/master/hashicorp/docker-mailserver/instances
[HashiCorp Packer variable values file]: https://qubitpi.github.io/hashicorp-packer/packer/guides/hcl/variables#from-a-file
[HashiCorp Terraform variable values file]: https://qubitpi.github.io/hashicorp-terraform/terraform/language/values/variables#variable-definitions-tfvars-files
