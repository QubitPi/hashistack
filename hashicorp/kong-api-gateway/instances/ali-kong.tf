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

variable "image_id" {
  type        = string
  description = "ECS image ID"
}

variable "vswitch_id" {
  type        = string
  description = "value of vswitch_id"
}

variable "instance_type" {
  type        = string
  description = "EC2 instance types defined in https://www.alibabacloud.com/help/doc-detail/25378.htm"
}

variable "instance_name" {
  type = string
}

variable "security_groups" {
  type        = list(string)
  description = "ECS Security Groups"
}

data "template_file" "kong-init" {
  template = file("../scripts/ali-kong-tf-init.sh")
}

resource "alicloud_instance" "instance" {
  # charging rules see in https://help.aliyun.com/zh/ecs/product-overview/overview-51
  internet_charge_type = "PayByBandwidth"

  # network
  vswitch_id = var.vswitch_id

  # instance and image
  # instance type define in https://help.aliyun.com/zh/ecs/user-guide/overview-of-instance-families#enterprise-x86
  instance_type = var.instance_type
  image_id      = var.image_id
  instance_name = var.instance_name

  # disk
  system_disk_category = "cloud_essd_entry"

  # Bandwidth and safety group
  internet_max_bandwidth_out = 1
  security_groups            = var.security_groups

  # Management settings
  tags = {
    Name = "${var.instance_name}"
  }
  user_data = data.template_file.kong-init.rendered
}

terraform {
  required_providers {
    alicloud = {
      source  = "aliyun/alicloud"
      version = "1.220.1"
    }
    template = {
      source  = "hashicorp/template"
      version = "2.2.0"
    }
  }
}

provider "alicloud" {}
