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

build {
  name = "push-test-docker-image"
  sources = [
    "source.${var.build_source}"
  ]

  provisioner "shell" {
    script = "../scripts/aws-kong-pkr-setup.sh"
    environment_vars = [
      "HOME_DIR=${var.image_home_dir}"
    ]
  }

  post-processors {
    post-processor "docker-tag" {
      repository =  "jack20191124/hashicorp-aws-kong-tf-test"
      tag = ["latest"]
    }
    post-processor "docker-push" {
      login = true
      login_username = "jack20191124"
      login_password = "${var.dockerhub_token}"
    }
  }
}
