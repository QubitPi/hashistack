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

variable "aws_deploy_region" {
  type = string
  description = "The EC2 region injected through inversion of control"
}

variable "ami_name" {
  type = string
  description = "AMI image name to deploy"
}

variable "instance_type" {
  type    = string
  description = "EC2 instance types defined in https://aws.amazon.com/ec2/instance-types/"

  validation {
    condition     = contains(["t2.micro", "t2.small", "t2.medium", "t2.large", "t2.xlarge", "t2.2xlarge"], var.instance_type)
    error_message = "Allowed values for input_parameter are those specified for T2 ONLY."
  }
}

variable "instance_name" {
  type = string
  description = "EC2 instance name"
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

variable "kong_api_gateway_domain" {
  type = string
  description = "Domain name that gateway client queries against"
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

data "template_file" "aws-kong-init" {
  template = file("../scripts/aws-kong-tf-init.sh")
}

data "aws_ami" "latest-kong" {
  most_recent = true
  owners = ["899075777617"]

  filter {
    name   = "name"
    values = [var.ami_name]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "aws-kong" {
  ami = data.aws_ami.latest-kong.id
  instance_type = var.instance_type
  tags = {
    Name = var.instance_name
  }

  security_groups = var.security_groups

  user_data = data.template_file.aws-kong-init.rendered
}

resource "aws_route53_record" "aws-kong" {
  zone_id         = var.route_53_zone_id
  name            = var.kong_api_gateway_domain
  type            = "A"
  ttl             = 300
  records         = [aws_instance.aws-kong.private_ip]
  allow_overwrite = true
}
