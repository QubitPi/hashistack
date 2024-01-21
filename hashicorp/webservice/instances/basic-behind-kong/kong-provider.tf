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
  description = "A standard Kong service name"
}

variable "ws_private_ip" {
  type = string
  description = "The IP (private) part of the URL param in creating the Kong service. For example the ws_private_ip for service url 'http://10.65.7.22:5000/users' is '10.65.7.22'"
}

variable "ws_port" {
  type = string
  description = "The port part of the URL param in creating the Kong service. For example the ws_port for service url 'http://10.65.7.22:5000/users' is '5000'"
}

variable "ws_api_path" {
  type = string
  description = "The root-path part of the URL param in creating the Kong service. For example the ws_port for service url 'http://10.65.7.22:5000/users' is '/users'"
}

variable "route_name" {
  type = string
  description = "A standard Kong route name"
}

variable "route_paths" {
  type = list(string)
  description = "The standard 'paths' param in creating a Kong route"
}

provider "kong" {
  kong_admin_uri = var.kong_admin_uri
}

resource "kong_service" "service" {
  name        = var.kong_admin_uri
  protocol    = "http"
  host        = aws_instance.aws-ws.private_ip
  port        = var.ws_port
  path        = var.ws_api_path
}

resource "kong_route" "route" {
  name            = var.route_name
  protocols       = [ "http", "https" ]
  paths           = var.route_paths
  service_id       = kong_service.service.id
}
