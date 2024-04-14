---
slug: yml-and-md-style-checks
title: Performing Style Check on YAML & Markdown Files and Link Check
authors: [jiaqi]
tags: [CI/CD, GitHub, Code Style]
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

Inspired by [Sous Chefs](https://github.com/sous-chefs/.github/blob/main/.github/workflows/lint-unit.yml), hashicorp-aws
offers a [reusable workflow](https://docs.github.com/en/actions/using-workflows/reusing-workflows) that performs the
following code style checks:

1. [YAML file style check]
2. [Markdown file style check]
3. [Broken link check]

Example Usage:

```yaml
name: CI/CD

"on":
  pull_request:
  push:
    branches:
      - master

jobs:
  yml-md-style-and-link-checks:
    uses: QubitPi/hashicorp-aws/.github/workflows/yml-md-style-and-link-checks.yml@master
```

:::tip

The configurations of the composing checks can be configured regularly by following their respective GitHub Actions
documentations. The following sections discusses the configuration by example.

:::

Configuring YAML File Style Check
---------------------------------

Create a file named **.yamllint** at the root of the project with the following example content

```yaml title=".yamllint"
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
---
extends: default
rules:
  line-length:
    max: 256
    level: warning
  document-start: disable
  braces:
    forbid: false
    min-spaces-inside: 0
    max-spaces-inside: 1
    min-spaces-inside-empty: -1
    max-spaces-inside-empty: -1
```

:::tip

More configuration options can be found at [yamllint documentation](https://yamllint.readthedocs.io/en/stable/)

:::

Configuring Markdown File Style Check
-------------------------------------

The markdown file style check is splitted into 2 config files:

1. regular configuration file
2. rule configuration file

### Regular Configuration File

Create a file named **.mdlrc** at the root of the project with the following content:

```yaml title=".mdlrc"
rules "~MD002", "~MD005", "~MD007", "~MD013", "~MD041", "~MD029", "~MD033"
style "#{File.dirname(__FILE__)}/markdownlint.rb"
```
