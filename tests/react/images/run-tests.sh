#!/bin/bash
set -x
set -e

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

mkdir ../scripts
cp ../../../hashicorp/react/scripts/* ../scripts

cp ../../../hashicorp/react/images/aws-react.build.pkr.hcl .
cp ../../../hashicorp/react/images/aws-react.variables.pkr.hcl .

packer init .
packer validate -var "skip_create_ami=true" .
packer build -var "skip_create_ami=true" .

# cleanup
rm -r ../scripts
rm aws-react.build.pkr.hcl
rm aws-react.variables.pkr.hcl
