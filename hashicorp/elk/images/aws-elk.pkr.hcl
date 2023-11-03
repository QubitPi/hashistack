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

variable "ssl_cert_file_path" {
  type      = string
  sensitive = true
}

variable "ssl_cert_key_file_path" {
  type      = string
  sensitive = true
}

variable "ssl_nginx_config_file_path" {
  type      = string
  sensitive = true
}

variable "aws_image_region" {
  type      = string
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

source "amazon-ebs" "elk" {
  ami_name              = "elk"
  force_deregister      = "true"
  force_delete_snapshot = "true"
  skip_create_ami = "${var.skip_create_ami}"

  instance_type = "t2.large"
  region        = "${var.aws_image_region}"
  source_ami_filter {
    filters = {
      name                = "ubuntu/images/*ubuntu-*-22.04-amd64-server-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["099720109477"]
  }
  ssh_username = "ubuntu"
}

build {
  name = "install-elk"
  sources = [
    "source.amazon-ebs.elk"
  ]

  # Load SSL Certificates into AMI image
  provisioner "file" {
    source      = "${var.ssl_cert_file_path}"
    destination = "/home/ubuntu/server.crt"
  }
  provisioner "file" {
    source      = "${var.ssl_cert_key_file_path}"
    destination = "/home/ubuntu/server.key"
  }

  # Load Nginx config file into AMI image
  provisioner "file" {
    source      = "${var.ssl_nginx_config_file_path}"
    destination = "/home/ubuntu/nginx-ssl.conf"
  }

  provisioner "shell" {
    script = "../scripts/aws-elk-pkr-setup.sh"
  }
}
