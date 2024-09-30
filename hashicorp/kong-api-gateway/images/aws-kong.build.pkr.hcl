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
  default   = "amazon-ebs.kong"
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

variable "kong_api_gateway_domain" {
  type      = string
  sensitive = true
}

build {
  name = "install-kong"
  sources = [
    "source.${var.build_source}"
  ]

  provisioner "hashistack-kong-api-gateway-provisioner" {
    homeDir              = "${var.image_home_dir}"
    sslCertBase64        = "${var.ssl_cert_base64}"
    sslCertKeyBase64     = "${var.ssl_cert_key_base64}"
    kongApiGatewayDomain = "${var.kong_api_gateway_domain}"
  }
}
