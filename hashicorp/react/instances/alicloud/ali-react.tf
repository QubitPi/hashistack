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

variable "ali_image_name" {
  type        = string
  description = "The name of the image"
}

variable "image_home_dir" {
  type        = string
  description = "The home directory of the image"
}

# TODO: instance_type is dependent on the region
variable "instance_type" {
  type        = string
  description = "ECS instance types defined in https://www.alibabacloud.com/help/doc-detail/25378.htm"
}

variable "instance_name" {
  type = string
}

variable "security_group_names" {
  type        = list(string)
  description = "ECS security group names"
}

variable "internet_charge_type" {
  type        = string
  description = "The charge type of the instance"
  default = "PayByBandwidth"
  
  validation {
    condition = contains(["PayByBandwidth", "PayByTraffic"], var.internet_charge_type)
    error_message = "Invalid internet charge type"
  }
}

variable "system_disk_category" {
  type = string
  description = "System disk category"

  validation {
    condition = contains(["ephemeral_ssd", "cloud_efficiency", "cloud_ssd", "cloud_essd", "cloud_essd_entry", "cloud", "cloud_auto"], var.system_disk_category)
    error_message = "Invalid system disk category"
  }
}

variable "internet_max_bandwidth_out" {
  type = number
  description = "The maximum outbound bandwidth of the instance"
  default = 1
}

data "alicloud_security_groups" "react-groups" {
  name_regex  = join("|", var.security_group_names)
}

data "template_file" "react-init" {
  template = file("../scripts/react-tf-init.sh")
  vars = {
    home_dir = var.image_home_dir
  }
}

data "alicloud_images" "react-images" {
  image_name = var.ali_image_name
  owners     = "self"
}

resource "alicloud_instance" "react-instance" {
  # charging rules see in https://help.aliyun.com/zh/ecs/product-overview/overview-51
  internet_charge_type = var.internet_charge_type

  # network
  # vswitch_id = "${data.alicloud_vswitches.default.vswitches.0.id}"

  # instance and image
  # instance type define in https://help.aliyun.com/zh/ecs/user-guide/overview-of-instance-families#enterprise-x86
  instance_type = var.instance_type
  image_id      = data.alicloud_images.react-images.images[0].id
  instance_name = var.instance_name

  # disk
  system_disk_category = var.system_disk_category

  # Bandwidth and safety group
  internet_max_bandwidth_out = var.internet_max_bandwidth_out
  security_groups            = data.alicloud_security_groups.react-groups.ids

  # Management settings
  tags = {
    Name = var.instance_name
  }
  user_data = data.template_file.react-init.rendered
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

  required_version = ">= 1.2.0"
}

provider "alicloud" {}