---
slug: ui-code-style
title: UI Code Style
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

In Frontend dev realm, there are lots of code style checker. Assembling all of them together takes efforts and pains.
This action runs the following two code style checker specifically for frontend dev:

1. [Prettier]
2. [ESLint]

This action assume [ESLint], [typescript-eslint], and [Prettier] have been installed, which can be done with:

```bash
yarn add --dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript
yarn add --dev --exact prettier
```

Here is an example usage of the action:

```yaml
name: CI/CD

"on":
  pull_request:
  push:
    branches:
      - master

  code-style:
    name: React & TS Code Style Check
    uses: QubitPi/hashicorp-aws/.github/workflows/ui-code-style.yml@master
    with:
      node-version: 18
```

:::tip

In the example above, the node 18 is used in the CI/CDed project.

:::

The configurations of Prettier and ESLint can be done regularly by following their respective documentations. For
example, the [.prettierrc.json](https://qubitpi.github.io/prettier/docs/en/configuration) and
[.prettierignore](https://qubitpi.github.io/prettier/docs/en/ignore.html) can be placed at the project root with the
following contents:

```json title=".prettierrc.json"
{
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 120
}
```

```ignore title=".prettierignore"
*.md
*.mdx
build
coverage
node_modules
```

:::tip

We can fix it by formatting all files at the root of project with:

```bash
yarn prettier . --write
```

:::

Initial ESLint configuration template can be generated with

```bash
yarn run eslint --init # https://dev.to/maithanhdanh/configuration-for-eslint-b47
```

:::info[Prettier & ESLint Conflict]

Linters usually contain not only code quality rules, but also stylistic rules. Most stylistic rules are unnecessary
when using Prettier, but worse - they might conflict with Prettier! Use Prettier for code formatting concerns, and
linters for code-quality concerns, as outlined in
[Prettier vs. Linters](https://qubitpi.github.io/prettier/docs/en/comparison).

Luckily it's easy to turn off rules that conflict or are unnecessary with Prettier, by using these pre-made configs:

- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

```bash
yarn add --dev eslint-config-prettier
```

:::

[ESLint]: https://eslint.org/

[Prettier]: https://prettier.io/

[typescript-eslint]: https://typescript-eslint.io/
