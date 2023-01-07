---
sidebar_position: 1
---

aergia::docker
==============

Installs the **Docker Community Edition** (CE) on **Ubuntu**.

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

:::info

`aergia::docker` gives a Chef node not just the Docker service (daemon) but also the `docker` command line utility, or
the Docker client.

:::

[Docker](https://www.docker.com/) is an application that simplifies the process of managing application processes in
containers. Containers let us run our applications in **resource-isolated** processes. They are similar to virtual
machines, but containers are more portable, more resource-friendly, and more dependent on the host operating system.

Recipe Details
--------------

The Docker installation package available in the official Ubuntu repository may not be the latest version. To ensure we
get the latest version, `aergia::docker` installs Docker from the official Docker repository. To do that, this recipe

1. adds a new package source
2. adds the GPG key from Docker to ensure the downloads are valid, and then
3. installs the package.

The recipe effectively executes the following steps in order:

1. Updates a Chef node's existing list of packages:

   ```bash
   sudo apt update
   ```

2. Installs a the following prerequisite packages which let `apt` use packages over HTTPS:

   ```bash
   sudo apt install apt-transport-https ca-certificates curl software-properties-common
   ```

3. Adds the GPG key for the official Docker repository to the Chef node:

   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   ```

4. Adds the Docker repository to APT sources (This will also update our package database with the Docker packages from
   the newly added repo.):

   ```bash
   sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
   ```

   :::info

   `aergia::docker` uses [apt_repository Resource](https://docs.chef.io/resources/apt_repository/) to complete steps 3
   and 4.

   :::

   :::tip

   To verify, after the recipe run, that we have installed from the Docker repo instead of the default Ubuntu repo, we
   can type

   ```bash
   apt-cache policy docker-ce
   ```

   We'll see output like this, although the version number for Docker may be different:

   ```bash
   docker-ce:
     Installed: (none)
     Candidate: 5:19.03.9~3-0~ubuntu-focal
     Version table:
        5:19.03.9~3-0~ubuntu-focal 500
           500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
   ```

   Notice that in this case `docker-ce` is not installed, but the candidate for installation is from the Docker
   repository for Ubuntu (`focal`).
   :::

5. Installs Docker:

   ```bash
   sudo apt install docker-ce
   ```

Recipe Verification
-------------------

With `aergia::docker` included and run, Docker should now be installed on Chef node; the daemon is started, and the
process is also enabled to start on boot. Check that it's running with

```bash
sudo systemctl status docker
```

The output should be similar to the following, showing that the service is active and running:

```bash
Output
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2020-05-19 17:00:41 UTC; 17s ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 24321 (dockerd)
      Tasks: 8
     Memory: 46.4M
     CGroup: /system.slice/docker.service
             └─24321 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```

Executing the Docker Command Without Sudo (No Included in Recipe)
-----------------------------------------------------------------

By default, the docker command can only be run by the root user or by a user in the docker group, which is automatically
created during Docker's installation process. We cannot run the docker command without prefixing it with "sudo"
or without being in the docker group. If we want to avoid typing "sudo" whenever we run the docker command, add our
username to the docker group:

```bash
sudo usermod -aG docker ${USER}
```

To apply the new group membership, **log out of the server and back in**, or type the following:

```bash
su - ${USER}
```

We will be prompted to enter our user's password to continue.

Confirm that we user is now added to the docker group by typing:

```bash
groups
```

```bash
Output
sammy sudo docker
```

If we need to add a user to the docker group that we are not logged in as, declare that username explicitly using:

```bash
sudo usermod -aG docker username
```

For example, to enable for both root and jenkins user:

```bash
sudo usermod -aG docker ${USER}
sudo usermod -aG docker jenkins
```

:::caution

If there are any Jenkins agents running, we should reconnect agent as well for the last command to take effect for the
agent

:::
