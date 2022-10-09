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
Install all scripts on Mac by copying all scripts to "/usr/local/bin/"

$1 = owner who will execute the script. This shall not be "root", which will prevent auto-completion
END

set -e # abort script if any command fails

# install script
sudo cp ./docker/docker-clean.sh /usr/local/bin/docker-clean.sh
# make the script executable by owner of the system
sudo chown $1 /usr/local/bin/docker-clean.sh

sudo cp ./docker/docker-clean-containers.sh /usr/local/bin/docker-clean-containers.sh
sudo chown $1 /usr/local/bin/docker-clean-containers.sh



sudo cp ./druid/apply-to-all-brokers/apply-to-all-brokers.sh /usr/local/bin/apply-to-all-brokers.sh
sudo chown $1 /usr/local/bin/apply-to-all-brokers.sh

sudo cp ./druid/apply-to-all-cluster-nodes/apply-to-all-cluster-nodes.sh /usr/local/bin/apply-to-all-cluster-nodes.sh
sudo chown $1 /usr/local/bin/apply-to-all-cluster-nodes.sh

sudo cp ./druid/apply-to-all-coordinators/apply-to-all-coordinators.sh /usr/local/bin/apply-to-all-coordinators.sh
sudo chown $1 /usr/local/bin/apply-to-all-coordinators.sh

sudo cp ./druid/apply-to-all-historicals/apply-to-all-historicals.sh /usr/local/bin/apply-to-all-historicals.sh
sudo chown $1 /usr/local/bin/apply-to-all-historicals.sh

sudo cp ./druid/cluster-install/distribute.sh /usr/local/bin/distribute.sh
sudo chown $1 /usr/local/bin/distribute.sh

sudo cp ./druid/restart-druid-cluster/restart-cluster.sh /usr/local/bin/restart-cluster.sh
sudo chown $1 /usr/local/bin/restart-cluster.sh



sudo cp ./fili/use-local-fili.sh /usr/local/bin/use-local-fili.sh
sudo chown $1 /usr/local/bin/use-local-fili.sh



sudo cp ./imagemagick/convert-to-favicon.sh /usr/local/bin/convert-to-favicon.sh
sudo chown $1 /usr/local/bin/convert-to-favicon.sh

sudo cp ./imagemagick/add-white-padding.sh /usr/local/bin/add-white-padding.sh
sudo chown $1 /usr/local/bin/add-white-padding.sh



sudo cp ./webservice/manually-deploy-webservice.sh /usr/local/bin/manually-deploy-webservice.sh
sudo chown $1 /usr/local/bin/manually-deploy-webservice.sh
