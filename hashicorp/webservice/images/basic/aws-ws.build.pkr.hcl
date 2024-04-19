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
  type      = string
  sensitive = false
  default   = "amazon-ebs.ws"
}

variable "image_home_dir" {
  type      = string
  sensitive = true
  default   = "/home/ubuntu"
}

variable "ws_war_path" {
  type      = string
  sensitive = true
}

variable "ws_filebeat_config_file_path" {
  type      = string
  sensitive = true
}

build {
  name = "install-ws"
  sources = [
    "source.${var.build_source}"
  ]

  # Load Filebeat config into AMI image
  provisioner "file" {
    source      = "${var.ws_filebeat_config_file_path}"
    destination = "${var.image_home_dir}/filebeat.yml"
  }

  # Load WS WAR file into AMI image
  provisioner "file" {
    source      = "${var.ws_war_path}"
    destination = "${var.image_home_dir}/ROOT.war"
  }

  provisioner "shell" {
    scripts = [
      "../../scripts/aws-ws-pkr-base-ami-update.sh",
      "../../scripts/aws-ws-pkr-setup-jdk-17.sh",
      "../../scripts/aws-ws-pkr-setup-jdk-17-jetty.sh",
      "../../scripts/aws-ws-pkr-setup-filebeat.sh"
    ]
    environment_vars = [
      "HOME_DIR=${var.image_home_dir}"
    ]
  }
}
