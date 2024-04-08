---
slug: yml-and-md-style-checks
title: Performing Style Check on YAML & Markdown Files and Link Check
authors: [jiaqi]
tags: [CI/CD, GitHub]
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

<!--truncate-->

Inspired by [Sous Chefs](https://github.com/sous-chefs/.github/blob/main/.github/workflows/lint-unit.yml), this
[reusable workflow](https://docs.github.com/en/actions/using-workflows/reusing-workflows) performs the following code
style checks:

1. [YAML file style check](https://github.com/actionshub/yamllint)
2. [Markdown file style check](https://github.com/actionshub/markdownlint)
3. [Broken link check](https://github.com/lycheeverse/lychee-action)

Example Usage:

```yaml
name: CI/CD

"on":
  pull_request:
  push:
    branches:
      - master

jobs:
  mk-yml-style-check:
    uses: QubitPi/hashicorp-aws/.github/workflows/yml-md-style-and-link-checks.yml@master
```

:::tip

The configurations of the composing actions can be configured regularly by following their respective documentations

:::
