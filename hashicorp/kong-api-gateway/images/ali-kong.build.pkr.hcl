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
  default   = "alicloud-ecs.kong-gateway"
}

variable "image_home_dir" {
  type      = string
  sensitive = true
  default   = "/root"
}

variable "ssl_cert_source" {
  type      = string
  sensitive = true
  default   = ""
}

variable "ssl_cert_key_source" {
  type      = string
  sensitive = true
  default   = ""
}

variable "kong_api_gateway_domain" {
  type      = string
  sensitive = true
  default   = ""
}

build {
  name = "install-kong"
  sources = [
    "source.${var.build_source}"
  ]

  provisioner "hashicorp-aws-kong-api-gateway-provisioner" {
    homeDir              = "${var.image_home_dir}"
    sslCertSource        = "${var.ssl_cert_source}"
    sslCertKeySource     = "${var.ssl_cert_key_source}"
    kongApiGatewayDomain = "${var.kong_api_gateway_domain}"
  }
}
