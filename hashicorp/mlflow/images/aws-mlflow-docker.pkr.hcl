# Copyright Jiaqi Liu
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

variable "aws_image_region" {
  type =  string
  sensitive = true
}

variable "ami_name" {
  type =  string
  sensitive = true
}

variable "ml_models_path" {
  type =  string
  sensitive = true
}

variable "skip_create_ami" {
  type =  bool
  sensitive = true
}

packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "mlflow-docker" {
  ami_name = "${var.ami_name}"
  force_deregister = "true"
  force_delete_snapshot = "true"
  skip_create_ami = "${var.skip_create_ami}"

  instance_type = "t2.large"
  launch_block_device_mappings {
    device_name = "/dev/sda1"
    volume_size = 60
    volume_type = "gp2"
    delete_on_termination = true
  }

  region = "${var.aws_image_region}"
  source_ami_filter {
    filters = {
      name = "ubuntu/images/*ubuntu-*-22.04-amd64-server-*"
      root-device-type = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners = ["099720109477"]
  }
  ssh_username = "ubuntu"
}

build {
  name = "install-mlflow-docker"
  sources = [
    "source.amazon-ebs.mlflow-docker"
  ]

  # Load ML Model
  provisioner "file" {
    source = "${var.ml_models_path}"
    destination = "/home/ubuntu/ml-models"
  }

  provisioner "shell" {
    scripts = [
      "../scripts/aws-mlflow-docker-pkr-setup.sh"
    ]
  }
}
