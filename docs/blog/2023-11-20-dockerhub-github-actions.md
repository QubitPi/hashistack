---
slug: dockerhub-github-actions
title: Build and Push Docker Images through GitHub Action
authors: [jiaqi]
tags: [Docker]
---

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

On every push to GitHub, [GitHub Action](https://github.com/marketplace/actions/build-and-push-docker-images) can
auto-trigger the docker image build and push to [Docker Hub](https://hub.docker.com). We will be able to see that each
push results in a usable image, which enhances the quality of a docker image a lot.

<!--truncate-->

Generate Docker Hub Access Token
--------------------------------

Before we start, ensure you can access [Docker Hub](https://hub.docker.com/) from any workflows you create. To do this:

1. Add your Docker ID as a secret to GitHub. Navigate to your GitHub repository and click **Settings** > **Secrets** >
   **New secret**.
2. Create a new secret with the name DOCKERHUB_USERNAME and your Docker ID as value.
3. Create a new Personal Access Token (PAT). To create a new token, go to
   [Docker Hub Settings](https://hub.docker.com/settings/security) and then click **New Access Token**.

Define CI Workflow on GitHub
----------------------------

`git checkout` the branch that contains the docker image definition, i.e. Dockerfile, and add a new YAML file to the
following path

```bash
<github-repo>/.github/workflows/<workflow-name>.yml
```

The YAML file should contain the following workflow definition:

> 📋 Change the `<branch-name>` and `<docker-image-name>` below accordingly.

```yaml
# Builds and pushes XXX image to Docker Hub

name: ci

on:
  push:
    branches:
      - '<branch-name>'

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      -
        name: Checkout
        uses: actions/checkout@v3
      -
        name: Set up QEMU
        uses: docker/setup-qemu-action@v2
      -
        name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      -
        name: Login to DockerHub
        uses: docker/login-action@v2
        with:
          {% raw %}
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
          {% endraw %}
      -
        name: Build and push
        uses: docker/build-push-action@v3
        with:
          context: .
          push: true
          {% raw %}
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/<docker-image-name>:latest
          {% endraw %}
```

Push the YAML file onto GitHub. Every push to that branch afterwards will trigger the image build and push.

Build Status Badge
------------------

To generate real-time badge on image build status, we could use an
[approach](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge)
that GitHub supports out-of-the-box.
