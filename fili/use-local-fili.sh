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
#!/usr/bin/env bash

: <<'END'
Overwrite local Fili(https://github.com/yahoo/fili) package with a local version, so that all its applications will
pickup and deploy with the testing version. This could be used to test/debug either the Fili itself or applications
backed by Fili.

TO USE THIS SCRIPT, SEVERAL ENVIRONMENT VARIABLES NEEDS TO BE DEFINED IN ~/.bashrc (or equivalent) LIKE THE FOLLOWING:

export M2_PATH=~/.m2/repository

# Fili
export RUN_PACKAGING=false # true if package needs to be compiled before each overwrite or false if, maybe, the package has already been compiled before
export RUN_FILI_TEST=false # true if all complete test needs to run before each overwrite
export FILI_DEV_VERSION=0.9 # Fili dev version found in Fili parent POM
export FILI_SOURCE_PATH=<path to local fili source code> # Location of fili codebase directory
export FILI_M2_PATH=$M2_PATH/com/yahoo/fili
END

set -e # abort script if any command fails

echo "Run packaging:    $RUN_PACKAGING"
echo "Run test:         $RUN_FILI_TEST"
echo "Fili dev version: $FILI_DEV_VERSION"
echo "Fili source path: $FILI_SOURCE_PATH"
echo "M2 path:          $M2_PATH"
echo "Fili M2 path:     $FILI_M2_PATH"

cd $FILI_SOURCE_PATH
# Test package if needed
if [ $RUN_FILI_TEST = true ]; then
    mvn clean verify
fi
# Build package if needed
if [ $RUN_PACKAGING = true ]; then
    mvn clean package -DskipTests=true
fi

# Copy dev version package to M2
for module_path in $FILI_M2_PATH/*; do
    MODULE_NAME=$(basename $module_path)

    # fili-parent-pom is neither JAR nor WAR. Do nothing on this module
    if [[ $MODULE_NAME =~ "fili-parent-pom" ]]; then
        continue
    fi

    MODULE=$FILI_SOURCE_PATH/$MODULE_NAME/target/$MODULE_NAME-$FILI_DEV_VERSION-SNAPSHOT

    # fili-generic-example and fili-wikipedia-example are WAR modules. The rest are JAR modules
    if [ $MODULE_NAME = *"fili-generic-example"* ] || [ $MODULE_NAME = *"fili-wikipedia-example"* ]; then
        MODULE_PATH="$MODULE.war"
    else
        MODULE_PATH="$MODULE.jar"
    fi

    # Overwrite all versions of all modules under m2
    for version in $module_path/*/; do
        cp $MODULE_PATH $version$MODULE_NAME-$(basename $version).jar
    done
done
