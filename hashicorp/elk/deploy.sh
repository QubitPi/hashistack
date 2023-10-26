#!/bin/bash
set -x
set -e

source ~/.bashrc
export HC_DIR=$ELK_HC_DIR
export HC_CONFIG_DIR=$ELK_HC_CONFIG_DIR
export AWS_ACCESS_KEY_ID=$ELK_AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$ELK_AWS_SECRET_ACCESS_KEY

cd "$HC_DIR"/images
packer init .
packer validate \
  --var-file="$HC_CONFIG_DIR"/aws-elk.pkrvars.hcl \
  -var "skip_create_ami=true" \
  .
packer build \
  --var-file="$HC_CONFIG_DIR"/aws-elk.pkrvars.hcl \
  -var "skip_create_ami=false" \
  .

cd "$HC_DIR"/instances
terraform init
terraform validate
terraform apply -auto-approve -auto-approve --var-file="$HC_CONFIG_DIR"/aws-elk.tfvars

# cleanup
rm -rf "$HC_DIR"/instances/.terraform
rm -rf "$HC_DIR"/instances/.terraform.lock.hcl
rm -rf "$HC_DIR"/instances/terraform.tfstate

unset HC_DIR
unset HC_CONFIG_DIR
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY
