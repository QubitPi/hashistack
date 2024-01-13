---
sidebar_position: 8
title: General Troubleshooting
---

Troubleshooting
===============

This section discusses the common issue that can happen during all types of deployments.

Deployment via GitHub Actions
-----------------------------

Deployment via Screwdriver CD
-----------------------------

### "git clone" step fails

```bash
error: xxxx bytes of body are still expected
fetch-pack: unexpected disconnect while reading sideband packet
fatal: early EOF
fatal: fetch-pack: invalid index-pack output
```

This can happen in Screwdriver CD Docker Compose running locally. It might be the network issue. The network is too
slow. Either diagnose network connection or, simply, re-run the Screwdriver pipeline couple more times.

More information can be found in
[this thread](https://stackoverflow.com/questions/66366582/github-unexpected-disconnect-while-reading-sideband-packet)
