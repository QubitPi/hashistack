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
FROM ubuntu:latest

LABEL maintainer="Jiaqi (Jack) Liu"
LABEL maintainer-email="jack20191124@proton.me"

# Ubuntu updates
RUN apt-get update
RUN apt-get upgrade -y
RUN apt update
RUN apt upgrade -y

# Auxiliary packages
RUN apt-get install wget -y
RUN apt-get install emacs -y

# Install ChefDK
RUN wget https://packages.chef.io/files/stable/chef-workstation/21.10.640/ubuntu/20.04/chef-workstation_21.10.640-1_amd64.deb
RUN dpkg -i chef-workstation_21.10.640-1_amd64.deb

# Load aergia cookbook into image
RUN mkdir -p /cookbooks/aergia/recipes
COPY recipes ./cookbooks/aergia/recipes
