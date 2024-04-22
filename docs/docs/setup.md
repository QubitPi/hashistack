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

[HashiCorp Packer - Install]: https://developer.hashicorp.com/packer/install
[HashiCorp Terraform - Install]: https://developer.hashicorp.com/terraform/install
