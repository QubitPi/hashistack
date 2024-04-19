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

variable "build_source" {
  type =  string
  sensitive = false
  default = "amazon-ebs.machine-learning"
}

variable "image_home_dir" {
  type =  string
  sensitive = true
  default = "/home/ubuntu"
}

variable "ml_models_path" {
  type =  string
  sensitive = true
}

build {
  name = "install-machine-learning"
  sources = [
    "source.${var.build_source}"
  ]

  # Load ML Model
  provisioner "file" {
    source = "${var.ml_models_path}"
    destination = "${var.image_home_dir}/ml-models"
  }

  provisioner "shell" {
    scripts = [
      "../../scripts/mlflow-docker/aws-ml-pkr-setup.sh"
    ]
  }
}
