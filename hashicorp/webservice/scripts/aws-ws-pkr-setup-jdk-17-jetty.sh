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

# Install and configure Jetty (for JDK 17) container
JETTY_VERSION=11.0.15
wget https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-home/$JETTY_VERSION/jetty-home-$JETTY_VERSION.tar.gz
tar -xzvf jetty-home-$JETTY_VERSION.tar.gz
rm jetty-home-$JETTY_VERSION.tar.gz
export JETTY_HOME=${HOME_DIR}/jetty-home-$JETTY_VERSION
mkdir jetty-base
cd jetty-base
java -jar $JETTY_HOME/start.jar --add-module=annotations,server,http,deploy,servlet,webapp,resources,jsp
mv ${HOME_DIR}/ROOT.war webapps/ROOT.war
cd ../
