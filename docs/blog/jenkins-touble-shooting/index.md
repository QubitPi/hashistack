---
slug: jenkins-troubleshooting
title: Jenkins Troubleshooting
authors: [jiaqi]
tags: [Jenkins]
date: 2022-10-30
---

<!--truncate-->

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
