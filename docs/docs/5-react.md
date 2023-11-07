---
sidebar_position: 5
title: React App
---

:::tip

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

- **REACT_DIR**: The local absolute path to the React project repo

  :::caution
  
  Should the React App be built with [.env file], this file MUST exist at `$REACT_DIR/.env` at this moment. This .env
  file is essentially the same one mentioned in the `HC_CONFIG_DIR` part below

  :::

- **HC_DIR**: The local absolute path to the [hashicorp-aws] directory
- **HC_CONFIG_DIR**: The local absolute path to a directory containing the following deployment files:

    - SSL cert file located (`/abs/path/to/hashicorp-aws-config-dir/server.crt`)
    - SSL cert key file (`/abs/path/to/hashicorp-aws-config-dir/server.key`)
    - Nginx config file (`/abs/path/to/hashicorp-aws-config-dir/nginx.conf`)
    - .env file (`/abs/path/to/hashicorp-aws-config-dir/.env`)
    - A [HashiCorp Packer variable file][HashiCorp Packer variable file] named **aws-react.pkrvars.hcl** with the following
      variable values (`/abs/path/to/hashicorp-aws-config-dir/aws-react.pkrvars.hcl`):

      ```hcl
      aws_image_region                 = "my-aws-region"
      ami_name                         = "my-react-app"
      instance_type                    = "<one of t2.micro/t2.small/t2.medium/t2.large/t2.xlarge/t2.2xlarge>"
      react_dist_path                  = "../../../../dist"
      aws_react_ssl_cert_file_path     = "../../../../hashicorp-aws-config-dir/server.crt"
      aws_react_ssl_cert_key_file_path = "../../../../hashicorp-aws-config-dir/server.key"
      aws_react_nginx_config_file_path = "../../../../hashicorp-aws-config-dir/nginx.conf"
      aws_react_dot_env_file_path      = "../../../../hashicorp-aws-config-dir/filebeat.yml"
      ```

    - A [HashiCorp Terraform variable file][HashiCorp Terraform variable file] named **aws-react.tfvars** with the 
      following variable values (`/abs/path/to/hashicorp-aws-config-dir/aws-react.tfvars`):

      ```hcl
      aws_deploy_region   = "my-aws-region"
      route_53_zone_id    = "9DQXLTNSN7ZX9P8V2KZII"
      ami_name            = "my-react-app"
      instance_type       = "<one of t2.micro/t2.small/t2.medium/t2.large/t2.xlarge/t2.2xlarge>"
      ec2_instance_name   = "My React App"
      ec2_security_groups = ["My React App"]
      react_domain        = "myreactapp.mycompany.com"
      ```

Then we can execute the **[deploy.sh]** to manually deploy any React Apps

GitHub Action Automatic Deployment
----------------------------------

### General Template in Downstream Repo

```yaml
env:
  NODE_VERSION: 16
  
jobs:
  hashicorp:
    name: Generated React dist in GitHub Action, publish its AMI and deploy the AMI to EC2 through HashiCorp
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Set node version to ${{ env.NODE_VERSION }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
      - name: Checkout HashiCorp deployment tool
        run: git clone https://github.com/QubitPi/hashicorp-aws.git ../hashicorp-aws
      - name: Load hashicorp-aws-config-dir and put it in the same directory as hashicorp-aws
        run: ...
      - name: Load Packer variable file
        run: cp ../hashicorp-aws-config-dir/aws-react.pkrvars.hcl ../hashicorp-aws/hashicorp/react/images/aws-react.auto.pkrvars.hcl
      - name: Load Terraform variable file
        run: cp ../hashicorp-aws-config-dir/aws-react.tfvars ../hashicorp-aws/hashicorp/react/instances/aws-react.auto.tfvars       
      - name: Generate dist
        run: cp ../hashicorp-aws-config-dir/.env . && yarn && yarn build
      - name: Move dist to a location for HashiCorp deployment to pickup
        run: mv dist ../
      - name: QubitPi/hashicorp-aws
        uses: QubitPi/hashicorp-aws@master
        with:
          hashicorp-dir: ../hashicorp-aws/hashicorp/react
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
```

[AWS_ACCESS_KEY_ID]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html
[AWS permissions policies]: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_access-management.html
[AWS_SECRET_ACCESS_KEY]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html

[deploy.sh]: https://github.com/QubitPi/hashicorp-aws/blob/master/hashicorp/react/deploy.sh

[hashicorp-aws]: https://qubitpi.github.io/hashicorp-aws/
[HashiCorp Packer variable file]: https://qubitpi.github.io/hashicorp-packer/packer/guides/hcl/variables#from-a-file
[HashiCorp Terraform variable file]: https://qubitpi.github.io/hashicorp-terraform/terraform/language/values/variables#variable-definitions-tfvars-files

[.env file]: https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env
