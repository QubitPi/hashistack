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
declare -a images=("basic" "ssl")

for image in "${images[@]}"
do
    export PACKER_IMAGE_DIR="${PWD}/../../../hashicorp/webservice/images/${image}"
    export SCRIPT_DIR="${PWD}/../../../hashicorp/webservice/scripts"

    cp -r * $PACKER_IMAGE_DIR

    cd $PACKER_IMAGE_DIR
    packer init .
    packer validate .
    packer build .

    cd $TEST_DIR
done
