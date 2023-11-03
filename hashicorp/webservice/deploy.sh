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

# Build WAR
cp $HC_CONFIG_DIR/*.properties $WS_DIR/src/main/resources/
cd $WS_DIR
mvn clean package
rm -rf ../../WAR/
mkdir ../../WAR/
mv target/*.war ../../WAR

cd $HC_DIR/images
cp $HC_CONFIG_DIR/aws-ws.pkrvars.hcl aws-ws.auto.pkrvars.hcl
packer init .
packer validate -var "skip_create_ami=true" .
packer build -var "skip_create_ami=false" .

cd $HC_DIR/instances
cp $HC_CONFIG_DIR/aws-ws.tfvars aws-ws.auto.tfvars
terraform init
terraform validate
terraform apply -auto-approve

# cleanup
rm $HC_DIR/images/aws-ws.auto.pkrvars.hcl
rm $HC_DIR/instances/aws-ws.auto.tfvars
rm -r $WS_DIR/../../WAR
rm $WS_DIR/src/main/resources/*.properties
rm -rf $HC_DIR/instances/.terraform
rm -rf $HC_DIR/instances/.terraform.lock.hcl
rm -rf $HC_DIR/instances/terraform.tfstate
rm -rf $HC_DIR/instances/terraform.tfstate.backup
rm -rf $HC_DIR/instances/.terraform.tfstate.lock.info
