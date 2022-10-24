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
#!/bin/bash

: <<'END'
Install Docker from the official Docker repository.

Executing the Docker Command Without Sudo (Optional):

By default, the docker command can only be run by the root user or by a user in the docker group, which is automatically
created during Docker's installation process. We cannot run the docker command without prefixing it with "sudo"
or without being in the docker group. If we want to avoid typing "sudo" whenever we run the docker command, add our
username to the docker group:

    sudo usermod -aG docker ${USER}

To apply the new group membership, log out of the server and back in, or type the following:

    su - ${USER}

Confirm that your user is now added to the docker group by typing:

    groups

The usage of this script, run

    install-on-ubuntu.sh

END

sudo apt update

# install a few prerequisite packages which let apt use packages over HTTPS
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

# add the GPG key for the official Docker repository to your system
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Add the Docker repository to APT sources
yes '' | sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

# Make sure we are about to install from the Docker repo instead of the default Ubuntu repo:
apt-cache policy docker-ce

# install Docker
sudo apt install docker-ce -y

# check docker daemon is running:
sudo systemctl status docker
