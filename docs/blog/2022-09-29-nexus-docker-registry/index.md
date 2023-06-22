---
slug: nexus-docker-registry
title: Nexus 3 - Setting Up Docker Registry
authors: [jiaqi]
tags: [Nexus, Docker]
---

Docker containers and their usage have revolutionized the way applications and the underlying operating system are
packaged and deployed to development, testing and production systems. The creation of the
[Open Container Initiative](https://opencontainers.org/), and the involvement of a large number of stakeholders,
guarantees that the ecosystem of tools around the lightweight containers and their usage will continue to flourish.
[Docker Hub](https://hub.docker.com/) is the original registry for Docker container images and it is being joined by
more and more other publicly available registries such as the
[Google Container Registry](https://cloud.google.com/container-registry/) and others.

Nexus Repository Manager OSS support Docker registries as the Docker repository format for **hosted** and **proxy**
repositories. We can expose these repositories to the client-side tools directly or as a
[repository group](#repository-group), which is a repository that merges and exposes the contents of multiple
repositories in one convenient URL. This allows us to reduce time and bandwidth usage for accessing Docker images in a
registry as well as share our images within our organization in a hosted repository. Users can then launch containers
based on those images, resulting in a completely private Docker registry with all the features available in the
repository manager.

<!--truncate-->

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

Docker Port Scalability
-----------------------

The Docker client has strict requirements about how it can retrieve content from a repository (i.e., a registry). These
requirements mainly center around the path at which it expects everything to be hosted.

While it is possible to tell the Docker client to use a chosen host from which to retrieve (or to which to upload)
images, it is not possible to tell it to use an arbitrary base path where images are stored in a registry.

To further explain, the Docker client is given a registry to contact by specifying only the hostname + port. It's also
given a specific path to an image in that registry. So, for example, it would be given
`example:443/some/custom/image` to specify an image. We are not able to specify a registry application path.

Nexus Repository exposes its Docker registries with a repository path of `/repository/<repo_name>/` and, by default, and
application context path of `/`.

So, a full Docker image in the repository "docker-hosted" might be accessible at full URL
"example:443/nexus3/repository/docker-hosted/some/custom/image", which can be broken down as follows:

- **example.com** = host name
- **443** = port
- /nexus3 = application context path
- /repository/docker-hosted = base registry path
- **/some/custom/image** = specific image path in the registry

There is no way to give the Docker client the application context path or base registry path. Docker needs the registry
exposed at the root of the host + port that it is accessing.

This is important because Nexus Repository uses request paths to separate content between different repositories. There
are a few potential ways to overcome this Docker limitation:

1. Using a [reverse proxy](https://en.wikipedia.org/wiki/Reverse_proxy)
2. Using [port connectors](#ssl-and-repository-connector-configuration)

SSL and Repository Connector Configuration
------------------------------------------

Docker relies on secure connections using SSL to connect to the repositories. We are therefore required to expose the
repository manager to our client tools via HTTPS. This can be configured via an external proxy server, which can also be
used to [scale your repositories](#scaling-repositories), or directly with the repository manager.

The recommended minimal configuration requires one port for a Docker repository group used for read access to all
repositories and one port for each hosted Docker repository that will receive push events from your users. The
Repository Connectors configuration, displayed in Figure: “Repository Connector Configuration", is available in the
configuration for proxy and hosted Docker repositories as well as Docker repository groups.

Scaling Repositories
--------------------
