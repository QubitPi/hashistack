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

Aergia
======

![Last Commit] [![License Badge]](https://www.apache.org/licenses/LICENSE-2.0)

[Aergia] is a tool that implements [Infrastructure-as-Code] through [CHEF cookbook]. It helps developers and
organizations to rapidly prepare application **running environment** (on both bare-metal servers and virtual machines)
through various [CHEF recipes].

As a strong supporter of [Infrastructure-as-Code], I choose [CHEF](https://qubitpi.github.io/chef-web-docs/) to
implement this concept, because my early career at Yahoo gave me great opportunities to see how CHEF was used as
a critical CI/CD component at Yahoo's tech infrastructure. I learned that CHEF was a great tool and I would like to
continue that journey with CHEF in my own projects.

Note that although CHEF supports much more, [Aergia] automates **application environment setup ONLY** and does NOT
automate any application deployment. For example, [Aergia] offers the ability to
[install Docker Daemon](./recipes/docker.rb); but it does NOT support anything related to deploying a React app Docker
container onto that server using Dockerfile.

Documentation
-------------

[![Documentation Deployment Workflow Status]](https://github.com/QubitPi/aergia/actions/workflows/doc-deploy.yml)

More information about Aergia can be found at our [documentation](https://qubitpi.github.io/aergia/).

Community [![Discord]](https://discord.com/widget?id=1060753787125514332)
-------------------------------------------------------------------------

The Aergia community generally hangs out [on Discord](https://discord.com/widget?id=1060753787125514332), so please drop
by if you have any questions, comments, concerns, wishes, hopes, dreams, wants, needs, yearnings, musings, or idle
curiosities about Aergia. We love meeting new people and talking with them about how they can best use Aergia to solve
their IaC problems. We know there are gaps in Aergia, and definitely lots of new, powerful capabilities to add, so
hearing about what's working and what could be better will help drive the direction of Aergia.

If you have other thoughts, or are running into trouble and are not able to get help from the community on Discord,
please [open an issue](https://github.com/QubitPi/aergia/issues) describing your problem or idea.

Usage
-----

1. **Install ChefDK**. The installation steps below works for Ubuntu OS.

   ```bash
   apt-get update
   apt-get install wget
   wget https://packages.chef.io/files/stable/chef-workstation/21.10.640/ubuntu/20.04/chef-workstation_21.10.640-1_amd64.deb
   sudo dpkg -i chef-workstation_21.10.640-1_amd64.deb
   ```

   Other [supported platforms] include MacOS, Windows, Red Hat Enterprise Linux / CentOS, Debian, and Amazon Linux.

2. **Run Aergia recipes in chef local mode**

   > We are running Chef client in [local mode](https://docs.chef.io/ctl_chef_client/#run-in-local-mode)
   >
   > Local mode is a way to run the Chef Client against a chef-repo on a local machine as if it were running against a
   > Chef Server. Local mode relies on chef-zero, which acts as a lightweight instance of the Chef Server. chef-zero
   > reads and writes to the `chef_repo_path`, which allows all commands that normally work against the Chef Server to
   > be used against the local chef-repo.
   >
   > Basically local mode needs to know where to find all cookbooks, roles, environments, data bags, etc, and it will
   > look for them under a directory `/cookbooks`. That explains the `mkdir cookbooks` below
   >
   > References:
   >
   > - [Why can't chef resolve my cookbooks?]
   > - [Developing recipes with local mode]

   ```bash
   sudo mkdir /cookbooks
   cd /cookbooks
   git clone https://github.com/QubitPi/aergia.git
   sudo chef-client -z -o 'recipe[aergia::docker]'
   ```

   The last command above runs [Docker recipe](https://qubitpi.github.io/aergia/docs/recipes/docker), which installs
   Docker Daemon on the invoking host.
   [There are much more recipes to try out](https://qubitpi.github.io/aergia/docs/category/recipes). Simply replace
   `docker` in the last command with other recipe names.

   > **Why not publishing Aergia to [Supermarket](https://supermarket.chef.io/)?**
   >
   > - My experience with [Supermarket](https://supermarket.chef.io/) gives me no confidence on expecting anything good
   >   from it. It's hard to use, has no good documentation, and it's buggy while not free
   > - [Supermarket](https://supermarket.chef.io/) promises way more than [Aergia] needs. It's like when you only need
   >   a medium coffee but realize you can only get it through a combo including a double-sized burger, fries, and 12
   >   chicken nuggets.

Quick Start Using Docker
------------------------

[![Docker]](https://hub.docker.com/r/jack20191124/aergia)
[![Docker Release Workflow Status]](https://github.com/QubitPi/aergia/actions/workflows/dockerhub-release.yml)

Want to try [Aergia] but not having a playground server yet? Not worry, we offer this Docker image which allows you to
quickly play with [Aergia] in just few copy-and-paste commands:

### Step 1 - Getting Image

#### Docker Hub

You can pull the image from [my docker hub](https://hub.docker.com/r/jack20191124/aergia/):

```bash
docker pull jack20191124/aergia
```

#### GitHub

You could also build the image from [source](https://github.com/QubitPi/aergia):

```bash
git clone https://github.com/QubitPi/aergia.git
cd aergia
docker build -t jack20191124/aergia .
```

### Step 2 - Starting a Container using Pseudo-TTY

Pseudo-TTYs are used to run commands inside a container. To start a pseudo-TTY session with the container, we can use
the `-t` flag. The container will not exit until the session ends. If we want to interact with the container, we can
couple this with the `-i` flag. This will allow us to run commands in the container using our terminal. Here's an
example of the command:

```bash
docker run --name aergia -it jack20191124/aergia
```

Executing the command above will spin up the container and takes us directly into the container shell

### Step 3 - Run a Recipe

The [`chef_repo_path`](https://docs.chef.io/ctl_chef_client/#run-in-local-mode) is **~/cookbooks** inside container:

```bash
root@df3r670rf23r:/# cd ~
root@df3r670rf23r:~# ls
cookbooks
```

There has already been a cookbook named "aergia":

```bash
root@df3r670rf23r:~/cookbooks# ls
aergia
```

Run a recipe using

```bash
cd /cookbooks
chef-client -z -o 'recipe[aergia::docker]'
```

The last command above [installs Docker Engine](https://qubitpi.github.io/aergia/docs/recipes/docker)

```bash
root@3tg4df12f33dsf3:/# chef-client -z -o 'recipe[aergia::docker]'
WARN: No config file found or specified on command line. Using command line options instead.
+---------------------------------------------+
            Chef License Acceptance

Before you can continue, 2 product licenses
must be accepted. View the license at
https://www.chef.io/end-user-license-agreement/

Licenses that need accepting:
  * Chef Infra Client
  * Chef InSpec

Do you accept the 2 product licenses (yes/no)?

> yes

Persisting 2 product licenses...
✔ 2 product licenses persisted.

+---------------------------------------------+
Chef Infra Client, version 17.6.18
Patents: https://www.chef.io/patents
Infra Phase starting

...

Resolving cookbooks for run list: ["aergia::docker"]
Synchronizing cookbooks:
  - aergia (0.0.0)
Installing cookbook gem dependencies:
Compiling cookbooks...
Loading Chef InSpec profile files:
Loading Chef InSpec input files:
Loading Chef InSpec waiver files:
Converging 7 resources
Recipe: aergia::docker
  * apt_update[update] action periodic
    * directory[/var/lib/apt/periodic] action create (up to date)

...

Running handlers:
Running handlers complete
Infra Phase complete, 15/23 resources updated in 02 minutes 03 seconds
```

Local Testing
-------------

```bash
cd aergia/
kitchen test
```

If all tests pass, we should be able to see the following output:

```bash
Test Summary: 1 successful, 0 failures, 0 skipped
       Finished verifying <docker-ubuntu-2004> (0m2.73s).
-----> Destroying <docker-ubuntu-2004>...
       ==> default: Forcing shutdown of VM...
       ==> default: Destroying VM and associated drives...
       Vagrant instance <docker-ubuntu-2004> destroyed.
       Finished destroying <docker-ubuntu-2004> (0m4.04s).
       Finished testing <docker-ubuntu-2004> (3m29.31s).
```

License
-------

The use and distribution terms for [Aergia](https://qubitpi.github.io/aergia/) are covered by the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).

![](https://github.com/QubitPi/QubitPi/blob/master/img/apache-2.png?raw=true)

[Aergia]: https://github.com/QubitPi/aergia
[CHEF recipes]: https://qubitpi.github.io/chef-web-docs/recipes/
[Chef cookbook]: https://qubitpi.github.io/chef-web-docs/cookbooks/
[Infrastructure-as-Code]: https://qubitpi.github.io/aergia/blog/iac-intro
[supported platforms]: https://qubitpi.github.io/chef-web-docs/workstation/install_workstation/
[Last Commit]: https://img.shields.io/github/last-commit/QubitPi/aergia/master?logo=github&style=for-the-badge
[License Badge]: https://img.shields.io/badge/Apache%202.0-F25910.svg?style=for-the-badge&logo=Apache&logoColor=white
[Docker]: https://img.shields.io/badge/Docker%20Image-309DEE?style=for-the-badge&logo=docker&logoColor=white
[Docker Release Workflow Status]: https://img.shields.io/github/actions/workflow/status/QubitPi/aergia/dockerhub-release.yml?branch=master&ogo=github&style=for-the-badge
[Documentation Deployment Workflow Status]: https://img.shields.io/github/actions/workflow/status/QubitPi/aergia/doc-deploy.yml?branch=master&ogo=github&style=for-the-badge
[Why can't chef resolve my cookbooks?]: https://stackoverflow.com/a/26395418/14312712
[Developing recipes with local mode]: https://subscription.packtpub.com/book/networking-and-servers/9781785287947/1/ch01lvl1sec21/developing-recipes-with-local-mode
[Discord]: https://img.shields.io/discord/1060753787125514332?color=5865F2&logo=discord&logoColor=ffffff&style=for-the-badge
