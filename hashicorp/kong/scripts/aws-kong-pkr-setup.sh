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

sudo apt update && sudo apt upgrade -y
sudo apt install software-properties-common -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Download Kong
git clone https://github.com/QubitPi/docker-kong.git

# Install Nginx and load SSL config
sudo apt install -y nginx
sudo mv ${HOME_DIR}/nginx-ssl.conf /etc/nginx/sites-enabled/default
sudo mv ${HOME_DIR}/server.crt /etc/ssl/certs/server.crt
sudo mv ${HOME_DIR}/server.key /etc/ssl/private/server.key
