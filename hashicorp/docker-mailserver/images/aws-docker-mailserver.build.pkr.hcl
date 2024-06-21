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
  type      = string
  sensitive = false
  default   = "amazon-ebs.docker-mailserver"
}

variable "image_home_dir" {
  type      = string
  sensitive = true
  default   = "/home/ubuntu"
}

variable "ssl_cert_base64" {
  type      = string
  sensitive = true
}

variable "ssl_cert_key_base64" {
  type      = string
  sensitive = true
}

variable "base_domain" {
  type        = string
  description = "The base domain name for the MX record. For example, if base domain is 'mycompany.com', the generated MX record will be 'mail.mycompany.com'"
  sensitive   = true
}

build {
  name = "install-docker-mailserver"
  sources = [
    "source.${var.build_source}"
  ]

  provisioner "hashicorp-aws-docker-mailserver-provisioner" {
    homeDir          = "${var.image_home_dir}"
    baseDomain       = "${var.base_domain}"
    sslCertBase64    = "${var.ssl_cert_base64}"
    sslCertKeyBase64 = "${var.ssl_cert_key_base64}"
  }
}
