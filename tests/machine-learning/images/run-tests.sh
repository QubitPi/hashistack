#!/bin/bash
set -x
set -e

# Copyright 2024 Paion Data. All rights reserved.
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

export TEST_DIR="${PWD}"
declare -a images=("mlflow-docker") # "mlflow-docker" must be the last element; see 'if [[ "$image" == "mlflow-docker" ]]' block below

for image in "${images[@]}"
do
    export PACKER_IMAGE_DIR="${PWD}/../../../hashicorp/machine-learning/images/${image}"
    export SCRIPT_DIR="${PWD}/../../../hashicorp/machine-learning/scripts/${image}"

    cp -r models \
        ${image}/aws-ml.packer.pkr.hcl \
        ${image}/aws-ml.source.pkr.hcl \
        ${image}/aws-ml.auto.pkrvars.hcl \
        $PACKER_IMAGE_DIR

    if [[ "$image" == "mlflow-docker" ]]
    then
        # https://stackoverflow.com/a/50396798
        # without "--ignore-installed" pip install fails
        sed -i -e 's/pip install/pip install --ignore-installed/g' $SCRIPT_DIR/aws-ml-pkr-setup.sh
    fi

    cd $PACKER_IMAGE_DIR
    packer init .
    packer validate .
    packer build .

    cd $TEST_DIR
done
