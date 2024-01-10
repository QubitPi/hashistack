---
sidebar_position: 8
title: Auxiliary Tools
---

GitHub Tools
------------

### Auto Version

```bash
git tag -a 0.0.1 -m "Version 0.0.1"
```

NPM example:

```yaml
---
name: CI/CD

"on":
  pull_request:
  push:
    branches:
      - master

env:
  USER: QubitPi
  EMAIL: jack20220723@gmail.com

jobs:
  release:
    name: Publish NPM Packages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 # this is needed for feching tags for "tag-for-release.bash" below
      - name: Set node version to 18
        uses: actions/setup-node@v3
        with:
          node-version: 18
          registry-url: "https://registry.npmjs.org"
      - name: Download auto-version bump scripts
        run: |
          git clone https://github.com/QubitPi/hashicorp-aws.git ../hashicorp-aws
          cp ../hashicorp-aws/auxiliary/github/tag-for-release.bash .github/
          cp ../hashicorp-aws/auxiliary/github/upversion.py .github/
      - name: Tag for release
        run: |
          git config --global user.name '$USER'
          git config --global user.email '$EMAIL'
          .github/tag-for-release.bash
      - name: Set release version
        run: |
          VERSION=$(git describe)
          npm version $VERSION
      - name: Publish to NPM Packages
        run: |
          npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"
          npm publish --access public
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```
