---
slug: jenkins-troubleshooting
title: Jenkins Troubleshooting
authors: [jiaqi]
tags: [Jenkins]
---

<!--truncate-->

### Docker Permission Error When Trigger by Jenkins

When a job **Build Steps** contains Shell Execution which includes some Docker command, it might fail with

```bash
+ docker build ...
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post "...":
dial unix /var/run/docker.sock: connect: permission denied
```

The user "jenkins" needs to be added to the group docker:

```bash
sudo usermod -a -G docker jenkins
```

Then restart Jenkins. (and reboot server if not working)

### Echo Off in Jenkins Console Output

By default, Jenkins launches Execute Shell script with `set -x`. This causes all commands to be echoed. We can type
`set +x` before any command to temporary override that behavior. Of course you will need `set -x` to start showing them
again.

You can override this behaviour for the whole script by putting the following at the top of the build step:

```bash
#!/bin/bash +x
```
