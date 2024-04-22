---
sidebar_position: 2
title: Setup
---

[//]: # (Copyright 2024 Paion Data)

[//]: # (Licensed under the Apache License, Version 2.0 &#40;the "License"&#41;;)
[//]: # (you may not use this file except in compliance with the License.)
[//]: # (You may obtain a copy of the License at)

[//]: # (    http://www.apache.org/licenses/LICENSE-2.0)

[//]: # (Unless required by applicable law or agreed to in writing, software)
[//]: # (distributed under the License is distributed on an "AS IS" BASIS,)
[//]: # (WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.)
[//]: # (See the License for the specific language governing permissions and)
[//]: # (limitations under the License.)

Setup
-----

### Installing HashiCorp Packer & Terraform

Deployment using Packer & Terraform requires command line tools which can be installed by following the instructions
in the links below:

- [Installing Packer][HashiCorp Packer - Install]
- [Installing Terraform][HashiCorp Terraform - Install]

### Getting IIaaS Deployment Tool

```console
git clone https://github.com/paion-data/immutable-infrastructure-as-a-service.git
```

### Alicloud

The following environment variables need to be defined:

- **ALICLOUD_ACCESS_KEY**
- **ALICLOUD_SECRET_KEY**

The two variables are Alicloud credentials required by Alicloud
[Packer integration](https://developer.hashicorp.com/packer/integrations/hashicorp/alicloud/latest/components/builder/alicloud-ecs)
and [Terraform integration](https://registry.terraform.io/providers/aliyun/alicloud/latest/docs#environment-variables)

:::info

The [RAM user](https://www.alibabacloud.com/product/ram) associated with the credentials above must have the required
premission to manage the ECS on Alicloud

:::

### SSL

Coming soon...

#### Troubleshooting

##### domain's nameservers may be malfunctioning

Suppose we are obtaining the certificate for a domain called `app.my-domain.com`. If executing `sudo certbot` gives the
following error:

```console
Certbot failed to authenticate some domains (authenticator: nginx). The Certificate Authority reported these problems:
Domain: app.my-domain.com Type: dns Detail: DNS problem: SERVFAIL looking up A for app.my-domain.com - the domain's
nameservers may be malfunctioning; DNS problem: SERVFAIL looking up AAAA for app.my-domain.com - the domain's
nameservers may be malfunctioning
```

There could be multiple reasons for the error above. Please check in the following orders

1. Please make sure ports 80 and 443 are open for in-coming traffics from all sources *at the time of domain
   verification*
2. Please double-check that the public IP address of the machine running the command `sudo certbot` matches the DNS
   record for the target domain. For example, if the public IP of this machine is `120.45.67.11`, then there must exist
   a type-A record on the domain DNS registar for `app.my-domain.com` with it's resolving IP of `120.45.67.11`
3. (**If the domain has recently been transfered to another registar by user**) It is possible that DNS resolving is
   still employing the old [DNS name servers] which makes themselves unaccessible for some reasons. This, for example,
   happens when we have requested a domain transfer from Google Domain to Alicloud Cloud DNS Domain registar. We will
   need to update the DNS name servers then

##### DNSSEC: DNSKEY Missing

```console
Certbot failed to authenticate some domains (authenticator: nginx). The Certificate Authority reported these problems:
Domain: app.my-domain.com Type: dns Detail: DNS problem: looking up A for app.my-domain.com: DNSSEC: DNSKEY Missing; DNS
problem: looking up AAAA for app.my-domain.com: DNSSEC: DNSKEY Missing
```

The error message "DNSKEY Missing" means that a domain has not passed DNSSEC validation. Here are some things we can
do:

- Contact the domain's registrar: Confirm that the DS record matches the authoritative DNS provider's specifications.
- Disable DNSSEC: Turn off DNSSEC on the registrar.
- Issue new certificates: Renew the certificates to reset the clock and give yourself 90 days to fix the issue.
- Reenable DNSSEC: After renewing the certificates, reenable DNSSEC and test cert renewals.
- Ensure the customer managed key is enabled: Make sure that the customer managed key that your KSK is based on is
  enabled and has the correct permissions.
- Create DNSSEC keys from the correct device: Ensure that you are trying to create DNSSEC keys from the correct device
  with a database key variable designation of 0.
- Ensure device certificates have unique names: If the device certificates have the same common name, renew them with
  unique names and re-exchange them via the "gtm_add <IP>" script.
- Remove the DS record: If you don't want to have the zone signed, remove the DS record.
- Set the DS records for the subdomain: Use the values after clicking on the (i) near the main subdomain

[DNS name servers]: https://www.domain.com/help/article/what-is-a-nameserver

[HashiCorp Packer - Install]: https://developer.hashicorp.com/packer/install
[HashiCorp Terraform - Install]: https://developer.hashicorp.com/terraform/install
