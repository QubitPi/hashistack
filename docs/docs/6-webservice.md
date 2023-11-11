---
sidebar_position: 6
title: Jersey-Jetty Based Webservice
---

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

[deploy.sh]: https://github.com/QubitPi/hashicorp-aws/blob/master/hashicorp/webservice/deploy.sh
