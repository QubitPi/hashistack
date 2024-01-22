---
sidebar_position: 3
title: MLflow Model through REST API
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

Deploying Machine Learning Models to Production as REST API
===========================================================

MLflow
------

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

- **HC_DIR**: The local absolute path to the [hashicorp-aws] directory
- **HC_CONFIG_DIR**: The local absolute path to a directory containing the following deployment files:

    - A [HashiCorp Packer variable file][HashiCorp Packer variable file] named **aws-mlflow-docker.pkrvars.hcl** with the
      following variable values (`/abs/path/to/hashicorp-aws-config-dir/aws-mlflow-docker.pkrvars.hcl`):

      ```hcl
      aws_image_region = "my-aws-region"
      ami_name         = "my-mlflow-models"
      instance_type                    = "<one of t2.micro/t2.small/t2.medium/t2.large/t2.xlarge/t2.2xlarge>"
      ml_models_path   = "/abs/path/to/mlflow_models/"
      ```

    - A [HashiCorp Terraform variable file][HashiCorp Terraform variable file] named **aws-mlflow-docker.tfvars** with the
      following variable values (`/abs/path/to/hashicorp-aws-config-dir/aws-mlflow-docker.tfvars`):

      ```hcl
      aws_deploy_region   = "my-aws-region"
      ami_name            = "my-mlflow-models"
      instance_type       = "<one of t2.micro/t2.small/t2.medium/t2.large/t2.xlarge/t2.2xlarge>"
      ec2_instance_name   = "My MLflow models"
      key_name            = "myKeyPairName"
      ec2_security_groups = ["myKeyPairName"]
      ```

Then we can execute the **[deploy.sh]** to manually deploy any MLflow models

:::info

- The packer simply builds a non-model specific AMI
- If the container runs multiple models at different ports, make sure to add a **PORT** file containg a port number only
  in each sub-dir of `/abs/path/to/mlflow_models/`
- If we need custom module imports in model, add module.py and a `__init__.py` file to the sub-dir of
  `/abs/path/to/mlflow_models/my-model`

:::

[AWS_ACCESS_KEY_ID]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html
[AWS permissions policies]: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_access-management.html
[AWS_SECRET_ACCESS_KEY]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html

[hashicorp-aws]: https://qubitpi.github.io/hashicorp-aws/
[HashiCorp Packer variable file]: https://qubitpi.github.io/hashicorp-packer/packer/guides/hcl/variables#from-a-file
[HashiCorp Terraform variable file]: https://qubitpi.github.io/hashicorp-terraform/terraform/language/values/variables#variable-definitions-tfvars-files

[deploy.sh]: https://github.com/QubitPi/hashicorp-aws/blob/master/hashicorp/mlflow/deploy.sh
