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

variable "aws_ec2_region" {
  type        = string
  description = "The EC2 region injected through inversion of control"
}

variable "ami_name" {
  type        = string
  description = "AMI image name to deploy"
}

variable "instance_type" {
  type        = string
  description = "EC2 instance types defined in https://aws.amazon.com/ec2/instance-types/"

  validation {
    condition     = contains(["t2.micro", "t2.small", "t2.medium", "t2.large", "t2.xlarge", "t2.2xlarge"], var.instance_type)
    error_message = "Allowed values for input_parameter are those specified for T2 ONLY."
  }

  default = "t2.micro"
}

variable "instance_name" {
  type        = string
  description = "EC2 instance name"
}

variable "key_pair_name" {
  type        = string
  description = "The name of AWS SSH key pair, which is used to SSH into the box for amin purposes"
  sensitive   = true
}

# https://github.com/hashicorp/packer/issues/11354
# https://terraform.qubitpi.org/terraform/language/expressions/types#list
variable "security_groups" {
  type        = list(string)
  description = "EC2 Security Groups"
}

variable "route_53_zone_id" {
  type        = string
  description = "Hosted zone ID on Route 53"
  sensitive   = true
}

variable "base_domain" {
  type        = string
  description = "The base domain name for the MX record. For example, if base domain is 'mycompany.com', the generated MX record will be 'mail.mycompany.com'"
  sensitive   = true
}

variable "first_email" {
  type        = string
  description = "The email used for mail server startup"
  sensitive   = true
}

variable "first_email_password" {
  type        = string
  description = "The password of the email for mail server startup"
  sensitive   = true
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
  region = var.aws_ec2_region
}

data "template_file" "aws-docker-mailserver-init" {
  template = file("../scripts/aws-docker-mailserver-tf-init.sh")
  vars = {
    USER                 = "ubuntu"
    FIRST_EMAIL          = var.first_email
    FIRST_EMAIL_PASSWORD = var.first_email_password
  }
}

data "aws_ami" "latest-docker-mailserver" {
  most_recent = true
  owners      = ["899075777617"]

  filter {
    name   = "name"
    values = [var.ami_name]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "aws-docker-mailserver" {
  ami           = data.aws_ami.latest-docker-mailserver.id
  instance_type = var.instance_type
  tags = {
    Name = var.instance_name
  }

  key_name = var.key_pair_name

  security_groups = var.security_groups

  user_data = data.template_file.aws-docker-mailserver-init.rendered
}

resource "aws_route53_record" "aws-docker-mailserver" {
  zone_id         = var.route_53_zone_id
  name            = format("mail.%s", var.base_domain)
  type            = "A"
  ttl             = 300
  records         = [aws_instance.aws-docker-mailserver.private_ip]
  allow_overwrite = true
}
