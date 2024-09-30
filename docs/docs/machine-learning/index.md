---
sidebar_position: 1
title: General Deployment
---

Deploying Machine Learning Models to Production as REST API
===========================================================

MLflow
------

### General Deployment

### Generating Machine Learning Models

hashistack deploys an instance
[running Machine Learning Model NOT Managed by MLflow as REST API in Docker Container][MLflow - Running Machine Learning Model NOT Managed by MLflow as REST API in Docker Container]
and [exposes that API to public][MLflow - Serving the Model in Docker Container via REST API].

Please follow
[this dedicated guide][MLflow - Running Machine Learning Model NOT Managed by MLflow as REST API in Docker Container]
to generate the Machine Learning model in a directory ready for use next. We will call this directory
__/abs/path/to/mlflow_models/__ from now on

:::tip[Support custom module import]

Suppose our ML model depends on a custom module called `my_module`:

```python
from my_module import my_function

class MyModel(mlflow.pyfunc.PythonModel):
    ...
```

How do we make `my_module` available at runtime? It's very easy. Simply put the custom module under
`/abs/path/to/mlflow_models/` and import that module as is. hashistack will bind `/abs/path/to/mlflow_models/`
to [`PYTHONPATH`] at runtime so that `my_module` will be available as long as both `MyModel` and `my_module` are under
`/abs/path/to/mlflow_models/` directory.

:::

After model is generated, add a **PORT** file containing a port number only. For eample,

```text title="PORT"
8080
```

:::info[After model is generated...]

- If the container runs multiple models at different ports, please make sure to add a **PORT** file containing a port
  number only to each sub-dir of `/abs/path/to/mlflow_models/` with one sub-dir holding one model
- If we need custom module imports in a model, add module.py and a `__init__.py` file to the sub-dir of that model under
  `/abs/path/to/mlflow_models/`

:::

### AWS Credentials

The following environment variables need to be defined:

- [AWS_ACCESS_KEY_ID](../setup#aws)
- [AWS_SECRET_ACCESS_KEY](../setup#aws)

### Installing HashiCorp Packer & Terraform

We will go through deployment using Packer & Terraform command line tools which can be installed by following the
instructions below:

- [Installing Packer][HashiCorp Packer - Install]
- [Installing Terraform][HashiCorp Terraform - Install]

### Getting HashiCorp Deployment Tool

```console
git clone https://github.com/QubitPi/hashistack.git
```

### Defining Packer Variables

Create a [HashiCorp Packer variable values file] named **aws-mlflow-docker.pkrvars.hcl** under
**[hashistack/hashicorp/machine-learning/images/mlflow-docker]** directory with the following contents

```hcl title=hashistack/hashicorp/machine-learning/images/mlflow-docker
ami_region     = "my-aws-region"
ami_name       = "my-mlflow-models"
instance_type  = "<one of t2.micro/t2.small/t2.medium/t2.large/t2.xlarge/t2.2xlarge>"
ml_models_path = "/abs/path/to/mlflow_models/"
```

- `ami_region` is the [image region][AWS regions] where ML models [AMI][AWS AMI] will be published to. The published
  image will be _private_
- `ami_name` is the name of the resulting AMI that will appear when managing AMIs in the AWS console or via APIs. This
  can be the same across builds, because hashistack will deregister the old AMI with the same name and replace it
  with the current built one
- `instance_type` is the recommended [AWS EC2 instance type] running this image
- `ml_models_path` is the directory we made ready [previously](#generating-machine-learning-models)

  :::caution

  [The path must not end with a `/`](https://packer.qubitpi.org/packer/docs/provisioners/file#directory-uploads). For
  example, it's OK with `ml_models_path = "/home/ubuntu/mymodel"`, but `ml_models_path = "/home/ubuntu/mymodel/"` is not

  :::

### Defining Terraform Variables

Create a [HashiCorp Terraform variable values file] named **aws-mlflow-docker.tfvars** under
**[hashistack/hashicorp/machine-learning/instances/mlflow-docker]** directory with the following contents:

```hcl title="hashistack/hashicorp/machine-learning/instances/mlflow-docker/aws-mlflow-docker.tfvars"
aws_ec2_region    = "my-aws-region"
ami_name          = "my-mlflow-models"
instance_type     = "<one of t2.micro/t2.small/t2.medium/t2.large/t2.xlarge/t2.2xlarge>"
ec2_instance_name = "My MLflow models"
security_groups   = ["myKeyPairName"]
```

- `aws_ec2_region` is the [EC2 runtime region][AWS regions]
- `ami_name` is the name of the published AMI; **it must be the same as the `ami_name` in
  [Packer variable file](#defining-packer-variables)**
- `instance_type` is the [AWS EC2 instance type] used for deployed infrastructure
- `ec2_instance_name` is the deployed EC2 name as appeared in the instance list of AWS console; it can be arbitrary
- `security_groups` is the list of [AWS Security Group] _names_ to associate with (yes, not ID, but name...)

### Building AMI Image

```bash
cd hashistack/hashicorp/machine-learning/images/mlflow-docker
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

Troubleshooting
---------------

### Model REST Container Fails to Start

```console
WARNING mlflow.utils.virtualenv: Encountered unexpected error while creating /root/.mlflow/envs/mlflow-8aab4f34fgrg33aa5987gyub0037333d3e4a818bc5e
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/usr/local/lib/python3.8/dist-packages/mlflow/models/container/__init__.py", line 92, in _install_pyfunc_deps
    activate_cmd = _install_model_dependencies_to_env(model_path, env_manager) if model_path else []
  File "/usr/local/lib/python3.8/dist-packages/mlflow/models/container/__init__.py", line 167, in _install_model_dependencies_to_env
    env_activate_cmd = _get_or_create_virtualenv(model_path)
  File "/usr/local/lib/python3.8/dist-packages/mlflow/utils/virtualenv.py", line 379, in _get_or_create_virtualenv
    activate_cmd = _create_virtualenv(
  File "/usr/local/lib/python3.8/dist-packages/mlflow/utils/virtualenv.py", line 289, in _create_virtualenv
    _exec_cmd(cmd, capture_output=capture_output, cwd=tmpdir, extra_env=extra_env)
  File "/usr/local/lib/python3.8/dist-packages/mlflow/utils/process.py", line 120, in _exec_cmd
    raise ShellCommandException.from_completed_process(comp_process)
mlflow.utils.process.ShellCommandException: Non-zero exit code: -9
Command: ['bash', '-c', 'source /root/.mlflow/envs/mlflow-8aab4f34fgrg33aa5987gyub0037333d3e4a818bc5e/bin/activate && python -m pip install --quiet -r requirements.afergr030a0aedfe32e4a0a6f2e57.txt']
```

__The container requires at least 4 GB of memory. Please make sure the EC2 instance has enough memory__

Deployment via Screwdriver CD
-----------------------------

hashistack supports deployment using [Screwdriver CD](screwdriver-cd-deployment). Please check it out.

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

[hashistack/hashicorp/machine-learning/images/mlflow-docker]: https://github.com/QubitPi/hashistack/tree/master/hashicorp/machine-learning/images/mlflow-docker
[hashistack/hashicorp/machine-learning/instances/mlflow-docker]: https://github.com/QubitPi/hashistack/tree/master/hashicorp/machine-learning/instances/mlflow-docker
[HashiCorp Packer - Install]: https://packer.qubitpi.org/packer/install
[HashiCorp Packer variable values file]: https://packer.qubitpi.org/packer/guides/hcl/variables#from-a-file
[HashiCorp Terraform - Install]: https://terraform.qubitpi.org/terraform/install
[HashiCorp Terraform variable values file]: https://terraform.qubitpi.org/terraform/language/values/variables#variable-definitions-tfvars-files

[Machine Learning model release definition template]: https://github.com/QubitPi/machine-learning-model-release-definition-templates
[MLflow - Running Machine Learning Model NOT Managed by MLflow as REST API in Docker Container]: https://qubitpi.github.io/mlflow/getting-started/quickstart-2/index.html#running-machine-learning-model-not-managed-by-mlflow-as-rest-api-in-docker-container
[MLflow - Serving the Model in Docker Container via REST API]: https://qubitpi.github.io/mlflow/getting-started/quickstart-2/index.html#serving-the-model-in-docker-container-via-rest-api

[`PYTHONPATH`]: https://qubitpi.github.io/cpython/using/cmdline.html#envvar-PYTHONPATH

[Screwdriver CD]: https://qubitpi.github.io/screwdriver-cd-homepage/
