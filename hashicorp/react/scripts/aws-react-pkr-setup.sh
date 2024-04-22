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

sudo apt update && sudo apt upgrade -y
sudo apt install software-properties-common -y

# Install Node 16
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Install npm & yarn
sudo npm install -g yarn

# Install serve for http server running app
sudo npm install -g serve

# Install Nginx and load SSL config
sudo apt install -y nginx
sudo mv ${HOME_DIR}/aws-react-nginx.conf /etc/nginx/sites-enabled/default
sudo mv ${HOME_DIR}/aws-react.crt /etc/ssl/certs/server.crt
sudo mv ${HOME_DIR}/aws-react.key /etc/ssl/private/server.key
