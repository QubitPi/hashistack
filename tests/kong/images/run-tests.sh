#!/bin/bash
set -x
set -e

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

mkdir ../scripts
cp ../../../hashicorp/kong/scripts/* ../scripts

cp ../../../hashicorp/kong/images/aws-kong.build.pkr.hcl .
cp ../../../hashicorp/kong/images/aws-kong.variables.pkr.hcl .

packer init .
packer validate -var "dockerhub_token=$DOCKERHUB_TOKEN" .
packer build -var "dockerhub_token=$DOCKERHUB_TOKEN" .

# cleanup
rm -r ../scripts
rm aws-kong.build.pkr.hcl
rm aws-kong.variables.pkr.hcl
