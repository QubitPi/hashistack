---
sidebar_position: 1
title: General Deployment
description: Deploying Kong API Gateway via Native HashiCorp Commands
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

Deploying Kong API Gateway
==========================

IIaaS deploys [Kong API Gateway] in the following way:

- Deploys [Kong API Gateway] in **HTTP** mode
- Deploys a reverse proxy Nginx in front of the [Kong API Gateway] in the same EC2 to redirect all HTTPS request to
  gateway's [corresponding][Kong gateway - various ports] HTTP ports

The diagrams below illustrates the resulting deployment

![Error loading kong-deployment-diagram.png](img/kong-deployment-diagram.png)

General Deployments
-------------------

:::info

Please complete the [general setup](../setup#setup) before proceeding.

:::

::::tip[Supporting HTTPS Protocol]

IIaaS uses a [customized fork of docker-kong](https://github.com/paion-data/docker-kong) to
[fully separate the app and SSL](https://github.com/QubitPi/docker-kong/pull/1), and, therefore, the Nginx config needs
multiple [servers](https://www.nginx.com/resources/wiki/start/topics/examples/server_blocks/)
to ensure all HTTPS ports are mapped to their corresponding HTTP ports as shown in the config snippet below:

:::note

All relevant HTTP and HTTPS ports are listed in [Kong's documentation here][Kong gateway - various ports]. In general,
our Nginx should **listen on an HTTPS port and `proxy_pass` to an HTTP port. For example, ports 8443 and 8444 are
`proxy_pass`ed to 8000 and 8001, respectively, both of which are listed in the doc.

One special case is HTTP port 8000, which is the redirect port. iiaas maps the standard SSL 443 port to 8000 so that any
downstream (such as UI web app) simply needs to hit the domain without specifying port number and have its request be
reidrected to upstream services (such as database webservice)

![Error loading kong-ports-diagram.png](img/kong-ports-diagram.png)

:::

::::

### Defining Packer Variables

Create a [HashiCorp Packer variable values file] named **ali-kong.auto.pkrvars.hcl** under
**[immutable-infrastructure-as-a-service/hashicorp/kong-api-gateway/images]** directory with the following contents:

```hcl title="immutable-infrastructure-as-a-service/hashicorp/kong-api-gateway/images/aws-kong.auto.pkrvars.hcl"
ali_image_name          = "my-kong-ecs"
instance_type           = "my-kong-ami"
region                  = "cn-shenzhen"
ssl_cert_source         = "/path/to/ssl.crt"
ssl_cert_key_source     = "/path/to/ssl.key"
kong_api_gateway_domain = "gateway.mycompany.com"
```

- `ali_image_name` is the [Alicloud ECS] image name, which can be either English or Chinese characters. It can begin
  with an uppercase/lowercase letter or a Chinese character, and may contain numbers, `_` or `-`, but cannot begin with
  `http://` or `https://`
- `instance_type` is the [type of the machine][Alicloud ECS instance type] for building the ECS image.
- `region` is the [Alicloud region ID][Alicloud region] which hosts the ECS instance that is used to build the image.
- `ssl_cert_source` is the absolute path or the path relative to
  [immutable-infrastructure-as-a-service/hashicorp/kong-api-gateway/images] of the [SSL certificate file](../setup#ssl)
  for the Kong API Gateway domain
- `ssl_cert_key_source` is the absolute path or the path relative to
  [immutable-infrastructure-as-a-service/hashicorp/kong-api-gateway/images] of the
  [SSL certificate key file](../setup#ssl) for the Kong API Gateway domain
- `kong_api_gateway_domain` is the SSL-enabled domain that will serve the
  [various ports of Kong gateway][Kong gateway - various ports]
-
### Defining Terraform Variables

Create a [HashiCorp Terraform variable values file] named **ali-kong.auto.tfvars** under
**[immutable-infrastructure-as-a-service/hashicorp/kong-api-gateway/instances]** directory with the following contents:

```hcl title="immutable-infrastructure-as-a-service/hashicorp/kong-api-gateway/instances/ali-kong.auto.tfvars"
image_id        =
vswitch_id      =
instance_type   =
instance_name   =
security_groups =
```

### Building AMI Image

```bash
cd immutable-infrastructure-as-a-service/hashicorp/kong-api-gateway/images
packer init .
packer validate -var "skip_create_ami=true" .
packer build -var "skip_create_ami=false" .
```

### Deploying to EC2

```bash
cd ../instances
terraform init
terraform validate
terraform apply -auto-approve
```

Deployment via Screwdriver CD
-----------------------------

IIaaS supports deployment using [Screwdriver CD](screwdriver-cd-deployment). Please check it out.

Deployment via IICP
-------------------

:::tip

Please try our IICP platform to deploy a Kong instance. It gives us one-click experience that helps us stand up an API
gateway in a minute.

:::

[Alicloud ECS]: https://www.alibabacloud.com/product/ecs
[Alicloud ECS instance type]: https://www.alibabacloud.com/help/doc-detail/25378.htm
[Alicloud region]: https://www.alibabacloud.com/help/en/cloud-migration-guide-for-beginners/latest/regions-and-zones

[HashiCorp Terraform variable values file]: https://developer.hashicorp.com/terraform/language/values/variables#variable-definitions-tfvars-files

[immutable-infrastructure-as-a-service/hashicorp/kong-api-gateway/images]: https://github.com/paion-data/immutable-infrastructure-as-a-service/tree/master/hashicorp/kong-api-gateway/images
[immutable-infrastructure-as-a-service/hashicorp/kong-api-gateway/instances]: https://github.com/paion-data/immutable-infrastructure-as-a-service/tree/master/hashicorp/kong-api-gateway/instances

[Kong API Gateway]: https://github.com/paion-data/docker-kong
[Kong gateway - various ports]: https://docs.konghq.com/gateway/latest/production/networking/default-ports/
