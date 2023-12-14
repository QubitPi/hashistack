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

cp ../images/aws-ws.build.pkr.hcl .
cp ../images/aws-ws.variables.pkr.hcl .
packer init .
packer validate -var "skip_create_ami=true" .
packer build -var "skip_create_ami=true" .

# cleanup
rm aws-ws.build.pkr.hcl
rm aws-ws.variables.pkr.hcl
