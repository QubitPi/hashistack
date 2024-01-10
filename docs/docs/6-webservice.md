---
sidebar_position: 6
title: Jersey-Jetty Based Webservice
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

:::tip

- Yes, we DO NOT support Spring, never ever
- EBS volumes during build time will [automatically be removed][HashiCorp Packer delete_on_termination]

:::

Setup
-----

The following credentials and config files need to be ready:

### HashiCorp

- A [HashiCorp Packer variable file] with the following variable values (We will refer to the contents of this file as
  **AWS_WS_PKRVARS_HCL** from now on)

  ```hcl
  aws_image_region                 = "my-aws-region"
  ami_name                         = "my-webservice"
  instance_type                    = "<one of t2.micro/t2.small/t2.medium/t2.large/t2.xlarge/t2.2xlarge>"
  ws_war_path                      = "my-webservice-1.0-SNAPSHOT.war"
  aws_ws_ssl_cert_file_path        = "server.crt"
  aws_ws_ssl_cert_key_file_path    = "server.key"
  aws_ws_nginx_config_file_path    = "nginx.conf"
  aws_ws_filebeat_config_file_path = "filebeat.yml"
  ```

- A [HashiCorp Terraform variable file] with the following variable values (We will refer to the contents of this file as
  **AWS_WS_TFVARS** from now on)

  ```hcl
  aws_deploy_region   = "my-aws-region"
  ami_name            = "my-webservice"
  instance_type       = "<one of t2.micro/t2.small/t2.medium/t2.large/t2.xlarge/t2.2xlarge>"
  ec2_instance_name   = "My Webservice"
  ec2_security_groups = ["My Webservice"]
  route_53_zone_id    = "9DQXLTNSN7ZX9P8V2KZII"
  ws_domain           = "mywebservice.mycompany.com"
  sentry_dsn          = "can be empty if sentry.io is not needed"
  ```

  :::warning

  Although the `ws_domain` is a public identity, [hashicorp-aws] will bind a **private IP** address to this domain,
  because webservice tend to be deployed in a virtual private network and AWS also requires
  [EC2 instances of different Security Groups to communicate through private IP](https://serverfault.com/a/967483)

  :::

Deployment via GitHub Actions
-----------------------------

```yaml
jobs:
  hashicorp:
    name: Generated Webservice WAR in GitHub Action, and Publish Template AMI Image and Deploy it to EC2 through HashiCorp
    needs: tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Deployment environment setup
        uses: QubitPi/hashicorp-aws/hashicorp/webservice/auxiliary/github/actions/cd-setup@master
        with:
          aws-ws-pkrvars-hcl: ${{ secrets.AWS_WS_PKRVARS_HCL }}
          ssl-certificate: ${{ secrets.SSL_CERTIFICATE }}
          ssl-certificate-key: ${{ secrets.SSL_CERTIFICATE_KEY }}
          nginx-config-file: ${{ secrets.NGINX_CONFIG_FILE }}
          aws-ws-tfvars: ${{ secrets.AWS_WS_TFVARS }}
      - name: Generate webservice WAR file
        run: mvn -B clean package
      - name: Move WAR file to a location for HashiCorp deployment to pickup
        run: mv target/astraios-1.0-SNAPSHOT.war ../hashicorp-aws/hashicorp/webservice/images/
      - name: QubitPi/hashicorp-aws
        uses: QubitPi/hashicorp-aws@master
        with:
          hashicorp-dir: ../hashicorp-aws/hashicorp/webservice
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
```

The `cd-setup` step above takes an optional input parameter `filebeat-config-file` which is the Filebeat config file

### Jersey Webservice Template (JPA through Elide)

If deployed webservice is [JWT JPA](https://qubitpi.github.io/jersey-webservice-template/docs/elide/intro) the following
actions can also be used:

#### Installing Data Models

:::info

- **model-package-jar-group-id** is the Maven group ID of JAR containing data models, e.g. "com.myorg"
- **model-package-jar-artifact-id** is the Maven artifact ID of JAR containing data models, e.g. "my-data-models"
- **model-package-jar-version** is the version of JAR containing data models, e.g. "3.1.7"
- **models-path** is the relative path to the data models repo, usually prefixed by "../". e.g. "../jpa-models"

:::

```yaml
---
name: My CI/CD

jobs:
  my-job:
    name: My job name
    runs-on: ubuntu-latest
    steps:
      - uses: QubitPi/hashicorp-aws/hashicorp/webservice/auxiliary/github/actions/jersey-webservice-template/jpa-elide/install-data-models@master
        with:
          model-package-jar-group-id: com.myorg
          model-package-jar-artifact-id: my-data-models
          model-package-jar-version: 1.0.0
          models-path: ../my-data-models
```

#### Docker Compose

:::info

Required parameters:

- **webservice-repo-clone-url** is the git clone URL of the GitHub repo generated by [jersey-webservice-template]
- **model-package** is the
  [fully qualified name of the package containing all JPA models](https://github.com/QubitPi/jersey-webservice-template-jpa-data-model/blob/master/src/main/java/com/qubitpi/ws/jersey/template/models/Book.java#L16)

Optional parameters:

- **oauth-enabled** flags whether or not to enable [OAuthFilter] container request filter. Default is `false`

:::

```yaml
---
name: My CI/CD

jobs:
  my-job:
    name: My job name
    runs-on: ubuntu-latest
    steps:
      - uses: QubitPi/hashicorp-aws/hashicorp/webservice/auxiliary/github/actions/jersey-webservice-template/jpa-elide/docker-compose@master
        with:
          webservice-repo-clone-url: https://github.com/QubitPi/jersey-webservice-template.git
          model-package: ${{ secrets.MODEL_PACKAGE_NAME }}
```

Deployment via Screwdriver CD
-----------------------------

Troubleshooting
---------------

### AWS

#### The Webservice was Running Properly Right After Deployment, but NOT After a While with "503 Service Unavailable"

This could be the resource starvation on EC2 instance. Please try using a bigger EC2 sizes. For example, bumping
_t2.micro_ to _t2.medium_. [hashicorp-aws] currently supports **t2.x** sizes, i.e. one of the following sizes can be
selected:

- t2.micro
- t2.small
- t2.medium
- t2.large
- t2.xlarge
- t2.2xlarge

To modify the size, set the value of `instance_type` in both _aws-ws.pkrvars.hcl_ and _aws-ws.tfvars_. For
example:

```hcl
instance_type       = "t2.medium"
```

[hashicorp-aws]: https://qubitpi.github.io/hashicorp-aws/
[HashiCorp Packer delete_on_termination]: https://qubitpi.github.io/hashicorp-packer/packer/integrations/hashicorp/amazon/latest/components/builder/ebs#:~:text=Optional%3A-,delete_on_termination,-(bool)%20%2D%20Indicates%20whether
[HashiCorp Packer variable file]: https://qubitpi.github.io/hashicorp-packer/packer/guides/hcl/variables#from-a-file
[HashiCorp Terraform variable file]: https://qubitpi.github.io/hashicorp-terraform/terraform/language/values/variables#variable-definitions-tfvars-files

[jersey-webservice-template]: https://qubitpi.github.io/jersey-webservice-template/

[OAuthFilter]: https://qubitpi.github.io/jersey-webservice-template/apidocs/com/qubitpi/ws/jersey/template/web/filters/OAuthFilter.html
