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

variable "ssl_cert_file_path" {
  type =  string
  sensitive = true
}

variable "ssl_cert_key_file_path" {
  type =  string
  sensitive = true
}

build {
  name = "install-kong"
  sources = [
    "source.${var.build_source}"
  ]

  # Load SSL Certificates into AMI image
  provisioner "file" {
    source = "${var.ssl_cert_file_path}"
    destination = "${var.image_home_dir}/server.crt"
  }
  provisioner "file" {
    source = "${var.ssl_cert_key_file_path}"
    destination = "${var.image_home_dir}/server.key"
  }

  # Load Nginx config file into AMI image
  provisioner "file" {
    source = "./nginx-ssl.conf"
    destination = "${var.image_home_dir}/nginx-ssl.conf"
  }

  provisioner "shell" {
    script = "../scripts/aws-kong-pkr-setup.sh"
    environment_vars = [
      "HOME_DIR=${var.image_home_dir}"
    ]
  }
}
