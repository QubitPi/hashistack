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

terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

resource "docker_image" "kong-image" {
  name         = "jack20191124/hashicorp-aws-kong-tf-test:latest"
  keep_locally = false
}

resource "docker_config" "kong-init" {
  name = "Init script"
  data = base64encode(templatefile("${path.cwd}/aws-kong-tf-init.sh", {}))
}

resource "docker_container" "kong-container" {
  image = docker_image.kong-image.image_id
  name  = "Kong container"
  ports {
    internal = 8001
    external = 8001
  }
}
