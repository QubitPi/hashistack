---
sidebar_position: 2
---

aergia::docker_compose
======================

With the [Docker Engine and Docker CLI](#docker) already installed, installs the **Docker Compose** plugin on **Ubuntu**
OS using Docker's repository

[//]: # (Copyright Jiaqi Liu)

[//]: # (Licensed under the Apache License, Version 2.0 &#40;the "License"&#41;;)
[//]: # (you may not use this file except in compliance with the License.)
[//]: # (You may obtain a copy of the License at)

[//]: # (    http://www.apache.org/licenses/LICENSE-2.0)

[//]: # (Unless required by applicable law or agreed to in writing, software)
[//]: # (distributed under the License is distributed on an "AS IS" BASIS,)
[//]: # (WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.)
[//]: # (See the License for the specific language governing permissions and)
[//]: # (limitations under the License.)

Recipe Details
--------------

### Step 1 - Set Up the Repository

1. Update the _apt_ package index and install packages to allow _apt_ to use a repository over HTTPS:

   ```bash
   sudo apt-get update
   sudo apt-get install ca-certificates curl gnupg lsb-release
   ```

2. Add Docker's official GPG key:

   ```bash
   sudo mkdir -p /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   ```

3. Set up the repository:

   ```bash
   echo \
   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
   https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

### Step 2 - Update the Package Index, and Install the Latest Version of Docker Compose

```bash
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

Recipe Verification
-------------------

Verify that Docker Compose is installed correctly by checking the version.

```bash
$ docker compose version
Docker Compose version vN.N.N
```

Where `vN.N.N` is placeholder text standing in for the latest version.
