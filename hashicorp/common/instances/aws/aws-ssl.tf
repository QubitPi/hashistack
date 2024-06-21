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

variable "route_53_zone_id" {
  type        = string
  description = "Hosted zone ID on Route 53"
  sensitive   = true
}

variable "domain" {
  type        = string
  description = "Domain name"
  sensitive   = true
}

resource "aws_route53_record" "ec2" {
  zone_id         = var.route_53_zone_id
  name            = var.domain
  type            = "A"
  ttl             = 300
  records         = [aws_instance.ec2.public_ip]
  allow_overwrite = true
}
