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

variable "ssl_cert_base64" {
  type      = string
  sensitive = true
}

variable "ssl_cert_key_base64" {
  type      = string
  sensitive = true
}

variable "react_app_domain" {
  type      = string
  sensitive = true
}

variable "dist_source" {
  type      = string
  sensitive = true
}


build {
  sources = [
    "source.amazon-ebs.hashistack"
  ]

  provisioner "hashistack-react-provisioner" {
    distSource       = "./dist"
    homeDir          = "/home/ubuntu"
    sslCertBase64    = "${var.ssl_cert_base64}"
    sslCertKeyBase64 = "${var.ssl_cert_key_base64}"
    appDomain        = "${var.react_app_domain}"
  }
}
