# Copyright 2024 Paion Data
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

variable "init_script" {
  value = "aws-ws-tf-init-ssl.sh"
  description = "The webservice startup script upon EC2 is up and running"
}

variable "route_53_zone_id" {
  type = string
  description = "Hosted zone ID on Route 53"
  sensitive = true
}

variable "ws_domain" {
  type = string
  description = "Domain name that Nexus Graph queries against"
  sensitive = true
}

resource "aws_route53_record" "aws-ws" {
  zone_id         = var.route_53_zone_id
  name            = var.ws_domain
  type            = "A"
  ttl             = 300
  records         = [aws_instance.aws-ws.private_ip]
  allow_overwrite = true
}
