#!/bin/bash
set -x

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

sudo apt update && sudo apt upgrade -y
sudo apt install software-properties-common -y

wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg
sudo apt-get install apt-transport-https
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list
sudo apt-get update

# Install Elasticsearch
sudo apt-get install elasticsearch

sudo sed -i 's/#network.host: 192.168.0.1/network.host: 0.0.0.0/g' /etc/elasticsearch/elasticsearch.yml
sudo sed -i 's/http.host: 0.0.0.0/http.host: 127.0.0.1/g' /etc/elasticsearch/elasticsearch.yml
sudo sed -i 's/#transport.host: 0.0.0.0/transport.host: 0.0.0.0/g' /etc/elasticsearch/elasticsearch.yml

sudo /bin/systemctl daemon-reload
sudo /bin/systemctl enable elasticsearch.service
sudo systemctl start elasticsearch.service

yes | sudo /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic

# Install Kibana
sudo apt-get install kibana

sudo sed -i 's/#server.host: "localhost"/server.host: "0.0.0.0"/g' /etc/kibana/kibana.yml

sudo /bin/systemctl daemon-reload
sudo /bin/systemctl enable kibana.service
sudo systemctl start kibana.service

# Install Logstash
sudo rm /etc/apt/sources.list.d/elastic-8.x.list
sudo rm /usr/share/keyrings/elasticsearch-keyring.gpg
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --batch --yes --dearmor -o /usr/share/keyrings/elastic-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/elastic-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-8.x.list
sudo apt-get update && sudo apt-get install logstash

# Configure SSL
sudo apt install -y nginx
sudo mv ${HOME_DIR}/nginx-ssl.conf /etc/nginx/sites-enabled/default
sudo mv ${HOME_DIR}/server.crt /etc/ssl/certs/server.crt
sudo mv ${HOME_DIR}/server.key /etc/ssl/private/server.key
