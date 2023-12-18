#!/bin/bash
set -x
set -e

# Copyright 2023 Jiaqi Liu. All rights reserved.

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
