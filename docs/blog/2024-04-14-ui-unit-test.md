---
slug: ui-unit-test
title: UI Unit Test
authors: [jiaqi]
tags: [CI/CD, GitHub, Frontend]
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

The UI unit test action runs unit tests and assumes the **yarn** package manager and requires a `test` script to be
defined in projects `package.json` file. For example, the following uses [Jest] as the unit test runner:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

To use this action, import it in the following way:

```yaml
name: CI/CD

"on":
  pull_request:
  push:
    branches:
      - master

env:
  NODE_VERSION: 18

jobs:
  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: QubitPi/hashicorp-aws/.github/workflows/ui-unit-test.yml@master
        with:
          node-version: ${{ env.NODE_VERSION }}
```

:::tip

The example above uses Node version 18, which is specified in `NODE_VERSION`
[environment variable](https://docs.github.com/en/actions/learn-github-actions/variables#defining-environment-variables-for-a-single-workflow)

:::

[Jest]: https://jestjs.io/
