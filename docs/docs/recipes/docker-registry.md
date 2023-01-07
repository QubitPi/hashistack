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

---
sidebar_position: 4
---

aergia::docker_registry
=======================

Deploys a Docker Registry

:::caution Prerequisites

<!-- markdown-link-check-disable -->

- `aergia::docker_registry` requires a [Docker installation](docker)  on a Chef node, because a registry is an instance
  of the `registry` image, and runs within Docker.
- `aergia::docker_registry` recipe will not work unless a working Nginx reverse proxy is setup.

<!-- markdown-link-check-enable -->

:::

The Registry is a stateless, highly scalable server side application that stores and lets us distribute Docker images.
The Registry is [open-source](https://github.com/distribution/distribution)

:::info Difference Between Docker Hub and Docker Registry

**Docker Hub** It is the **public** repository provided by the Docker itself for pushing and pulling the Images. Docker
Hub is for public use and the default repository, anyone can fetch and pull the Images using the "docker pull" command.

**Registry** is the feature provided by the Docker to create our own **private** repository for storing the Images.
Other systems on the network can access the repository using the valid credentials. Registry provides security as only
the limited users within the organiztion will have access of the same.

:::

We should use the Registry if we want to:

- tightly control where our images are being stored
- fully own our images distribution pipeline
- integrate image storage and distribution tightly into our in-house development workflow

Running our own Registry is a great solution to integrate with and complement your CI/CD system. In a typical workflow,
a commit to our source revision control system would trigger a build on our CI system, which would then push a new image
to our Registry if the build is successful. A notification from the Registry would then trigger a deployment on a
staging environment, or notify other systems that a new image is available.

It's also an essential component if we want to quickly deploy a new image over a large cluster of machines.

Finally, it's the best way to distribute images inside an isolated network.

Recipe Details
--------------

### Start a Registry

`aergia::docker_registry` runs the Registry inside Docker container and mapps the Registry's port 5000 to port 5001 on
host machine:

```bash
docker run -d -p 5001:5000 --restart=always --name registry registry:2
```

### Modify Nginx Reverse Proxy

- Suppose domain name is `my-domain.com`
- SSL certificate is at `/absolute/path/to/certificate.pem`
- SSL certificate key is at `/absolute/path/to/key.pem`

Provided with the Nginx SSL config path, `aergia::docker_registry` modifies the config file by appending the following
server context for Docker Registry:

```conf
server {
    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;
    server_name my-domain.com;

    location / {
        proxy_pass http://localhost:5001;
    }

    listen [::]:5000 ssl ipv6only=on;
    listen 5000 ssl;
    ssl_certificate /absolute/path/to/certificate.pem;
    ssl_certificate_key /absolute/path/to/key.pem;
}
```

### Reload Nginx Config

Recipe Verification
-------------------

Pull (or build) some image from the hub

```bash
docker pull ubuntu
```

Tag the image so that it points to our registry

```bash
docker image tag ubuntu my-domain.com:5000/myfirstimage
```

:::tip Image Naming

Image names as used in typical docker commands reflect their origin:

- `docker pull ubuntu` instructs docker to pull an image named `ubuntu` from the _official Docker Hub_. This is simply a
  shortcut for the longer `docker pull docker.io/library/ubuntu` command
- `docker pull myregistrydomain:port/foo/bar` instructs docker to contact the registry located at
  _myregistrydomain:port_ to find the image `foo/bar`

People interested to find out more about the various Docker commands dealing with images can visit the
[official Docker engine documentation](https://docs.docker.com/engine/reference/commandline/cli/).

:::

Push it

```bash
docker push my-domain.com:5000/myfirstimage
```

Pull it back

```bash
docker pull my-domain.com:5000/myfirstimage
```

About Docker Registry
---------------------

A registry is a storage and content delivery system, holding named Docker images, available in different tagged
versions. Users interact with a registry by using docker push and pull commands. Users interact with a registry by using
docker push and pull commands. For example

```bash
docker pull registry-1.docker.io/distribution/registry:2.1.
```

Storage itself is delegated to drivers. The default storage driver is the local posix filesystem, which is suitable for
development or small deployments. Additional cloud-based storage drivers like S3, Microsoft Azure, and OpenStack Swift
are also supported. People looking into using other storage backends may do so by writing their own driver implementing
the [Storage API](https://docs.docker.com/registry/storage-drivers/).

Since securing access to your hosted images is paramount, the Registry natively supports TLS and basic authentication.

The Registry GitHub repository includes additional information about advanced authentication and authorization methods.
Only very large or public deployments are expected to extend the Registry in this way.

Finally, the Registry ships with a robust [notification system](https://docs.docker.com/registry/notifications/),
calling webhooks in response to activity, and both extensive logging and reporting, mostly useful for large
installations that want to collect metrics.
