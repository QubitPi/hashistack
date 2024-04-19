# Copyright Paion Data
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

variable "aws_deploy_region" {
  type = string
  description = "The EC2 region"
}

variable "ami_name" {
  type = string
  description = "AMI image name to deploy"
}

variable "instance_name" {
  type = string
  description = "EC2 instance name hosting the deployed ELK"
  sensitive = true
}

variable "key_pair_name" {
  type = string
  description = "AWS SSH key pair name used to generate Kibana enrollment token and verification code"
  sensitive = true
}

# https://github.com/hashicorp/packer/issues/11354
# https://qubitpi.github.io/hashicorp-terraform/terraform/language/expressions/types#list
variable "security_groups" {
  type = list(string)
  description = "EC2 Security Groups"
}

variable "route_53_zone_id" {
  type = string
  description = "Hosted zone ID on Route 53"
  sensitive = true
}

variable "elk_domain" {
  type = string
  description = "Domian name of ELK instance, such as myelk.mycompany.com"
  sensitive = true
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.42.0"
    }
  }
  required_version = ">= 0.14.5"
}

provider "aws" {
  region = var.aws_deploy_region
}

data "aws_ami" "latest-elk" {
  most_recent = true
  owners = ["899075777617"]

  filter {
    name   = "name"
    values = ["${var.ami_name}"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "elk" {
  ami = "${data.aws_ami.latest-elk.id}"
  instance_type = "t2.large"

  root_block_device {
    volume_size = 60
  }

  tags = {
    Name = var.instance_name
  }

  key_name = var.key_pair_name
  security_groups = var.security_groups
}

resource "aws_route53_record" "elk" {
  zone_id         = var.route_53_zone_id
  name            = var.elk_domain
  type            = "A"
  ttl             = 300
  records         = [aws_instance.elk.private_ip]
  allow_overwrite = true
}
