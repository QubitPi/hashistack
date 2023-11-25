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

Manual Deployment
-----------------

The following script variables need to be defined:

- [**AWS_ACCESS_KEY_ID**][AWS_ACCESS_KEY_ID] & [**AWS_SECRET_ACCESS_KEY**][AWS_SECRET_ACCESS_KEY]

  :::info

  The _IAM user_ associated with the credentials above must have the following [AWS permissions policies]:

  - IAMFullAccess
  - AmazonEC2FullAccess
  - AmazonRoute53FullAccess

  :::

- **WS_DIR**: The local absolute path to the webservice repo
- **HC_DIR**: The local absolute path to the [hashicorp-aws] directory
- **HC_CONFIG_DIR**: The local absolute path to a directory containing the following deployment files:

  - SSL cert file located (`/abs/path/to/hashicorp-aws-config-dir/server.crt`)
  - SSL cert key file (`/abs/path/to/hashicorp-aws-config-dir/server.key`)
  - Nginx config file (`/abs/path/to/hashicorp-aws-config-dir/nginx.conf`)
  - ELK Filebeat config file (`/abs/path/to/hashicorp-aws-config-dir/filebeat.yml`)
  - Any webservice **.properties** files (`/abs/path/to/hashicorp-aws-config-dir`)
  - A [HashiCorp Packer variable file][HashiCorp Packer variable file] named **aws-ws.pkrvars.hcl** with the following
    variable values (`/abs/path/to/hashicorp-aws-config-dir/aws-ws.pkrvars.hcl`):

    ```hcl
    aws_image_region                 = "my-aws-region"
    ami_name                         = "my-webservice"
    instance_type                    = "<one of t2.micro/t2.small/t2.medium/t2.large/t2.xlarge/t2.2xlarge>"
    ws_war_path                      = "../../../../WAR/my-webservice-1.0-SNAPSHOT.war"
    aws_ws_ssl_cert_file_path        = "../../../../hashicorp-aws-config-dir/server.crt"
    aws_ws_ssl_cert_key_file_path    = "../../../../hashicorp-aws-config-dir/server.key"
    aws_ws_nginx_config_file_path    = "../../../../hashicorp-aws-config-dir/nginx.conf"
    aws_ws_filebeat_config_file_path = "../../../../hashicorp-aws-config-dir/filebeat.yml"
    ```

  - A [HashiCorp Terraform variable file][HashiCorp Terraform variable file] named **aws-ws.tfvars** with the following
    variable values (`/abs/path/to/hashicorp-aws-config-dir/aws-ws.tfvars`):

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

    :::info

    Although the `ws_domain` is a public identity, [hashicorp-aws] will bind a **private IP** address to this domain,
    because webservice tend to be deployed in a virtual private network and AWS also requires
    [EC2 instances of different Security Groups to communicate through private IP](https://serverfault.com/a/967483)

    :::

Then we can execute the **[deploy.sh]** to manually deploy any Jersey-Jetty based webservice.

GitHub Action Automatic Deployment
----------------------------------

### General Template in Downstream Repo

:::info

- Java 17 is assumed in the example below
- Assuming ws dir is called **my-webservice**
- ~/.m2/settings.xml is working on CI/CD server

:::

```yaml
jobs:
  hashicorp:
    name: Generated WS WAR in GitHub Action, publish its AMI and deploy the AMI to EC2 through HashiCorp
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'adopt'
      - name: Checkout HashiCorp deployment tool
        run: git clone https://github.com/QubitPi/hashicorp-aws.git ../hashicorp-aws
      - name: Load hashicorp-aws-config-dir and put it in the same directory as hashicorp-aws
        run: ...
      - name: Load Packer variable file
        run: cp ../hashicorp-aws-config-dir/aws-ws.pkrvars.hcl ../hashicorp-aws/hashicorp/webservice/images/aws-ws.auto.pkrvars.hcl
      - name: Load Terraform variable file
        run: cp ../hashicorp-aws-config-dir/aws-ws.tfvars ../hashicorp-aws/hashicorp/webservice/instances/aws-ws.auto.tfvars
      - name: Generate webservice WAR file
        run: mvn -B clean package
      - name: Move WAR file to a location for HashiCorp deployment to pickup
        run: |
          mkdir ../WAR
          mv target/my-webservice-1.0-SNAPSHOT.war ../WAR
      - name: QubitPi/hashicorp-aws
        uses: QubitPi/hashicorp-aws@master
        with:
          hashicorp-dir: ../hashicorp-aws/hashicorp/webservice
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
```

### Auxiliary Actions

#### JDK 17 Setup

```yaml
---
name: My CI/CD

jobs:
  my-job:
    name: My job name
    runs-on: ubuntu-latest
    steps:
      - uses: QubitPi/hashicorp-aws/auxiliary/github/actions/jdk-setup@master
```

#### Jersey Webservice Template (JPA through Elide)

##### Installing Data Models

:::info

- **model-package-jar-group-id** is the Maven group ID of JAR containing data models, e.g. "com.myorg"
- **model-package-jar-artifact-id** is the Maven artifact ID of JAR containing data models, e.g. "my-data-models"
- **model-package-jar-version** is the version of JAR containing data models, e.g. "3.1.7"
- **model-repo-org** is the data models repo owner, e.g. paion-data. This can be eigher a GitHub user account name or
  a GitHub organization name
- **models-repo-name** is the data models repo name, e.g. my-data-models
- **models-repo-token** is the GitHub Fine-grained token with at least "Read access to code and metadata" repository
  permissions to the data models repo

:::

```yaml
---
name: My CI/CD

jobs:
  my-job:
    name: My job name
    runs-on: ubuntu-latest
    steps:
      - uses: QubitPi/hashicorp-aws/auxiliary/github/actions/jersey-webservice-template/jpa-elide/install-data-models@master
        with:
          model-package-jar-group-id: com.myorg
          model-package-jar-artifact-id: my-data-models
          model-package-jar-version: 1.0.0
          model-repo-org: myorg
          models-repo-name: my-data-models
          models-repo-token: ${{ secrets.ASTRAIOS_DATA_MODELS_REPO_TOKEN }}
```

##### Docker Compose

:::info

- **webservice-repo-clone-url** is the git clone URL of the GitHub repo generated by [jersey-webservice-template]
- **model-package** is the
  [fully qualified name of the package containing all JPA models](https://github.com/QubitPi/jersey-webservice-template-jpa-data-model/blob/master/src/main/java/com/qubitpi/ws/jersey/template/models/Book.java#L16)

:::

```yaml
---
name: My CI/CD

jobs:
  my-job:
    name: My job name
    runs-on: ubuntu-latest
    steps:
      - uses: QubitPi/hashicorp-aws/auxiliary/github/actions/jersey-webservice-template/jpa-elide/docker-compose@master
        with:
          webservice-repo-clone-url: https://github.com/QubitPi/jersey-webservice-template.git
          model-package: ${{ secrets.MODEL_PACKAGE_NAME }}
```

Troubleshooting
---------------

### The Webservice was Running Properly Right After Deployment, but NOT After a While with "503 Service Unavailable"

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

[AWS_ACCESS_KEY_ID]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html
[AWS permissions policies]: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_access-management.html
[AWS_SECRET_ACCESS_KEY]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html

[hashicorp-aws]: https://qubitpi.github.io/hashicorp-aws/
[HashiCorp Packer delete_on_termination]: https://qubitpi.github.io/hashicorp-packer/packer/integrations/hashicorp/amazon/latest/components/builder/ebs#:~:text=Optional%3A-,delete_on_termination,-(bool)%20%2D%20Indicates%20whether
[HashiCorp Packer variable file]: https://qubitpi.github.io/hashicorp-packer/packer/guides/hcl/variables#from-a-file
[HashiCorp Terraform variable file]: https://qubitpi.github.io/hashicorp-terraform/terraform/language/values/variables#variable-definitions-tfvars-files

[jersey-webservice-template]: https://qubitpi.github.io/jersey-webservice-template/

[deploy.sh]: https://github.com/QubitPi/hashicorp-aws/blob/master/hashicorp/webservice/deploy.sh
