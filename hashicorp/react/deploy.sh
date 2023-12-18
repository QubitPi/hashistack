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



### This section logic goes to GitHub Action CI/CD

# Build dist
cd $REACT_DIR
yarn && yarn build

cd $HC_DIR/images
cp $HC_PACKER_VAR_FILE aws-react.auto.pkrvars.hcl
packer init .
packer validate -var "skip_create_ami=true" .
packer build -var "skip_create_ami=false" .

cd $HC_DIR/instances
cp $HC_TF_VAR_FILE aws-react.auto.tfvars
terraform init
terraform validate
terraform apply -auto-approve

# cleanup
rm $HC_DIR/images/aws-react.auto.pkrvars.hcl
rm $HC_DIR/instances/aws-react.auto.tfvars
rm -r $REACT_DIR/../../dist
rm -rf $HC_DIR/instances/.terraform
rm -rf $HC_DIR/instances/.terraform.lock.hcl
rm -rf $HC_DIR/instances/terraform.tfstate
rm -rf $HC_DIR/instances/terraform.tfstate.backup
rm -rf $HC_DIR/instances/.terraform.tfstate.lock.info
