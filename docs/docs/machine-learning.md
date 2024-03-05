---
sidebar_position: 3
title: Machine Learning Model in REST API
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

### General Deployment

### Generating Machine Learning Models

hashicorp-aws will deploy an instance
[running Machine Learning Model NOT Managed by MLflow as REST API in Docker Container][MLflow - Running Machine Learning Model NOT Managed by MLflow as REST API in Docker Container]
and [expose that API to public][MLflow - Serving the Model in Docker Container via REST API].

Please follow
[this dedicated guide][MLflow - Running Machine Learning Model NOT Managed by MLflow as REST API in Docker Container]
to generate the Machine Learning model in a directory ready for use next. We will call this directory
**/abs/path/to/mlflow_models/** from now on

:::info[After model is generated...]

- If the container runs multiple models at different ports, please make sure to add a **PORT** file containing a port
  number only in each sub-dir of `/abs/path/to/mlflow_models/` with one sub-dir holding one model
- If we need custom module imports in a model, add module.py and a `__init__.py` file to the sub-dir of that model under
  `/abs/path/to/mlflow_models/`

:::

### AWS Credentials

The following environment variables need to be defined:

- [AWS_ACCESS_KEY_ID](setup#aws)
- [AWS_SECRET_ACCESS_KEY](setup#aws)

### Installing HashiCorp Packer & Terraform

We will go through deployment using Packer & Terraform command line tools which can be installed by following the
instructions below:

- [Installing Packer][HashiCorp Packer - Install]
- [Installing Terraform][HashiCorp Terraform - Install]

### Getting HashiCorp Deployment Tool

```console
git clone https://github.com/QubitPi/hashicorp-aws.git
```

### Defining Packer Variables

Create a [HashiCorp Packer variable values file] named **aws-mlflow-docker.pkrvars.hcl** under
**[hashicorp-aws/hashicorp/machine-learning/images/mlflow-docker]** directory with the following contents

```hcl title=hashicorp-aws/hashicorp/machine-learning/images/mlflow-docker
ami_region     = "my-aws-region"
ami_name       = "my-mlflow-models"
instance_type  = "<one of t2.micro/t2.small/t2.medium/t2.large/t2.xlarge/t2.2xlarge>"
ml_models_path = "/abs/path/to/mlflow_models/"
```

- `ami_region` is the [image region][AWS regions] where ML models [AMI][AWS AMI] will be published to. The published
  image will be _private_
- `ami_name` is the published AMI name; it can be arbitrary
- `instance_type` is the recommended [AWS EC2 instance type] running this image
- `ml_models_path` is the directory we made ready [previously](#generating-machine-learning-models)

### Defining Terraform Variables

Create a [HashiCorp Terraform variable values file] named **aws-mlflow-docker.tfvars** under
**[hashicorp-aws/hashicorp/machine-learning/instances/mlflow-docker]** directory with the following contents:

```hcl title="hashicorp-aws/hashicorp/machine-learning/instances/mlflow-docker/aws-mlflow-docker.tfvars"
aws_deploy_region   = "my-aws-region"
ami_name            = "my-mlflow-models"
instance_type       = "<one of t2.micro/t2.small/t2.medium/t2.large/t2.xlarge/t2.2xlarge>"
ec2_instance_name   = "My MLflow models"
ec2_security_groups = ["myKeyPairName"]
```

- `aws_deploy_region` is the [EC2 runtime region][AWS regions]
- `ami_name` is the name of the published AMI; **it must be the same as the `ami_name` in
  [Packer variable file](#defining-packer-variables)**
- `instance_type` is the chosen [AWS EC2 instance type] at runtime
- `ec2_instance_name` is the deployed EC2 name as appeared in the instance list of AWS console; it can be arbitrary
- `ec2_security_groups` is the [AWS Security Group] _name_ (yes, not ID, but name...)

### Building AMI Image

```bash
cd hashicorp-aws/hashicorp/machine-learning/images/mlflow-docker
packer init .
packer validate -var "skip_create_ami=true" .
packer build -var "skip_create_ami=false" .
```

:::note

The packer simply builds a non-model specific AMI

:::

### Deploying to EC2

:::caution

Depending on the [AMI](#defining-packer-variables) and [EC2](#defining-terraform-variables) configs, **please be aware
AWS credit charges shall incur after the following commands execute**

:::

```bash
cd ../instances/mlflow-docker
terraform init
terraform validate
terraform apply -auto-approve
```

Deployment via Screwdriver CD
-----------------------------

hashicorp-aws also support deployment using [Screwdriver CD] with this
[Machine Learning model release definition template]

Deployment via HACP
-------------------

:::tip

Please try our HACP platform to deploy a Machine Learning API instance. It gives us one-click experience that helps us
stand up the API in a minute.

:::

[AWS AMI]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[AWS EC2 instance type]: https://aws.amazon.com/ec2/instance-types/
[AWS regions]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Availability
[AWS Security Group]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html

[hashicorp-aws/hashicorp/machine-learning/images/mlflow-docker]: https://github.com/QubitPi/hashicorp-aws/tree/master/hashicorp/machine-learning/images/mlflow-docker
[hashicorp-aws/hashicorp/machine-learning/instances/mlflow-docker]: https://github.com/QubitPi/hashicorp-aws/tree/master/hashicorp/machine-learning/instances/mlflow-docker
[HashiCorp Packer - Install]: https://qubitpi.github.io/hashicorp-packer/packer/install
[HashiCorp Packer variable values file]: https://qubitpi.github.io/hashicorp-packer/packer/guides/hcl/variables#from-a-file
[HashiCorp Terraform - Install]: https://qubitpi.github.io/hashicorp-terraform/terraform/install
[HashiCorp Terraform variable values file]: https://qubitpi.github.io/hashicorp-terraform/terraform/language/values/variables#variable-definitions-tfvars-files

[Machine Learning model release definition template]: https://github.com/QubitPi/machine-learning-model-release-definition-templates
[MLflow - Running Machine Learning Model NOT Managed by MLflow as REST API in Docker Container]: https://qubitpi.github.io/mlflow/getting-started/quickstart-2/index.html#running-machine-learning-model-not-managed-by-mlflow-as-rest-api-in-docker-container
[MLflow - Serving the Model in Docker Container via REST API]: https://qubitpi.github.io/mlflow/getting-started/quickstart-2/index.html#serving-the-model-in-docker-container-via-rest-api

[Screwdriver CD]: https://qubitpi.github.io/screwdriver-cd-homepage/
