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

variable "build_source" {
  type =  string
  sensitive = false
  default = "amazon-ebs.kong"
}

variable "image_home_dir" {
  type =  string
  sensitive = true
  default = "/home/ubuntu"
}

variable "dockerhub_token" {
  type =  string
  sensitive = true
}

packer {
  required_plugins {
    docker = {
      version = ">= 0.0.7"
      source = "github.com/hashicorp/docker"
    }
  }
}

source "docker" "ubuntu" {
  image  = "jack20191124/hashicorp-aws-kong-test:latest"
  commit = true
}
