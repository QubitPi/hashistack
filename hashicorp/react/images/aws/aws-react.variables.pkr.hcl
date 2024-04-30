# Copyright 2024 Paion Data. All rights reserved.
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

variable "build_source" {
  type =  string
  sensitive = false
  default = "amazon-ebs.react-app"
}

variable "ami_region" {
  type =  string
  sensitive = true
}

variable "ami_name" {
  type =  string
  sensitive = true
}

variable "image_home_dir" {
  type =  string
  sensitive = true
  default = "/home/ubuntu"
}

variable "instance_type" {
  type    = string
  description = "EC2 instance types defined in https://aws.amazon.com/ec2/instance-types/"

  validation {
    condition     = contains(["t2.micro", "t2.small", "t2.medium", "t2.large", "t2.xlarge", "t2.2xlarge"], var.instance_type)
    error_message = "Allowed values for input_parameter are those specified for T2 ONLY."
  }
}

variable "react_dist_path" {
  type =  string
  sensitive = true
}

variable "aws_react_ssl_cert_file_path" {
  type =  string
  sensitive = true
}

variable "aws_react_ssl_cert_key_file_path" {
  type =  string
  sensitive = true
}

variable "aws_react_nginx_config_file_path" {
  type =  string
  sensitive = true
}

variable "skip_create_ami" {
  type =  bool
  sensitive = true
}
