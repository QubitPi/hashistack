---
sidebar_position: 8
title: Screwdriver CD
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

Auxiliary Steps
---------------

### Install JDK 17 & Maven

```yaml
jobs:
  main:
    requires: [~pr, ~commit]
    image: buildpack-deps:22.04-scm
    steps:
      - setup-jdk: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/QubitPi/hashicorp-aws/master/auxiliary/scripts/setup-jdk-ubuntu.sh)"
      - install-maven: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/QubitPi/hashicorp-aws/master/auxiliary/scripts/install-maven-ubuntu.sh)"
      - test: mvn clean verify
      - install: mvn clean install
```

### Install HashiCorp Packer & Terraform CLI

```yaml
jobs:
  main:
    requires: [~pr, ~commit]
    image: buildpack-deps:22.04-scm
    steps:
      - install-packer: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/QubitPi/hashicorp-aws/master/auxiliary/scripts/install-hashicorp-packer-ubuntu.sh)"
      - install-terraform: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/QubitPi/hashicorp-aws/master/auxiliary/scripts/install-hashicorp-terraform-ubuntu.sh)"
```

