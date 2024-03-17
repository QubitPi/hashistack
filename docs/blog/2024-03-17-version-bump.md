---
slug: version-bump
title: Bump Semantic Version Using hashicorp-aws
authors: [jiaqi]
tags: [CI/CD]
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

hashicorp-aws offers a convenient versioning management approach for releasing software on GitHub.

<!--truncate-->

1. Manually create the first tag:

   ```shell
   git tag -a v0.0.1 -m "v0.0.1"
   git push origin v0.0.1
   ```

2. Create a pull request that adds the following job to GitHub Action

```yaml
"on":
  pull_request:
  push:
    branches:
      - master

jobs:
  push-release-tag:
    if: github.ref == 'refs/heads/master'
    uses: QubitPi/hashicorp-aws/.github/workflows/version-bump.yml@master
    with:
      user: QubitPi
      email: jack20220723@gmail.com
```

3. When the pull request is merged, the version bump action will automatically create and push a new version tag of
   `MAJOR`.`MINOR`.(`PATCH` + 1)

:::tip

Bumping the `MAJOR` or `MINOR` version still needs to be done manually using `git tag -a vx.x.x -m "vx.x.x"` command
given the assumption that agile software development will change patch version most frequently and almost always

:::
