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

variable "kong_admin_uri" {
  type = string
  description = "Admin API URL with port which listen for calls service/route creations over HTTPS."
}

variable "service_name" {
  type = string
  description = ""
}

variable "ws_host" {
  type = string
  description = ""
}

variable "ws_port" {
  type = string
  description = ""
}

variable "ws_api_path" {
  type = string
  description = ""
}

provider "kong" {
  kong_admin_uri = var.kong_admin_uri
}

resource "kong_service" "service" {
  name        = var.kong_admin_uri
  protocol    = "http"
  host        = var.ws_host
  port        = var.ws_port
  path        = var.ws_api_path
}

variable "route_name" {
  type = string
  description = ""
}

variable "route_paths" {
  type = list(string)
  description = ""
}

resource "kong_route" "route" {
  name            = var.route_name
  protocols       = [ "http", "https" ]
  paths           = var.route_paths
  service_id       = kong_service.service.id
}
