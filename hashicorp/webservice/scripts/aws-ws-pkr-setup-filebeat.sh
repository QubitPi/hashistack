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

# Filebeat
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.9.2-amd64.deb
sudo dpkg -i filebeat-8.9.2-amd64.deb
sudo mv ${HOME_DIR}/filebeat.yml /etc/filebeat/filebeat.yml
sudo chown root /etc/filebeat/filebeat.yml
