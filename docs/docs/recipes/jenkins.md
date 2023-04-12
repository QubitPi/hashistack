---
sidebar_position: 5
---

aergia::jenkins
===============

Deploys a fully functional [Jenkins server](https://jenkins.io/) **container**
[available on Docker Hub](https://hub.docker.com/r/jenkins/jenkins).

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

Recipe Details
--------------

```bash
docker volume create --name jenkins-data
docker run -d --name=jenkins -p 8080:8080 -p 50000:50000 --restart=on-failure -v jenkins-data:/var/jenkins_home jenkins/jenkins:lts-jdk11
```

- The `-d` commands runs the container in
  [detached mode](https://docs.docker.com/language/nodejs/run-containers/#run-in-detached-mode)
- The `$JENKINS_HOME` inside container will be **/var/jenkins_home**:

  ```bash
  $ docker exec -it jenkins bash
  jenkins@3ae9fd9220:/$ ls /var/jenkins_home
  config.xml              jobs            secret.key              userContent
  copy_reference_file.log          nodeMonitors.xml  secret.key.not-so-secret  users
  hudson.model.UpdateCenter.xml      nodes            secrets              war
  jenkins.telemetry.Correlator.xml  plugins        updates
  ```

- Since all Jenkins data lives in there, including plugins and configuration, in `/var/jenkins_home`, we will also want
  to make that an explicit volume so we can manage it and attach to another container for upgrades. So we create a
- "jenkins_home" docker volume on the host machine. Docker volumes retain their content even when the container is
  stopped, started, or deleted.

Recipe Verification
-------------------

:::tip

<!-- markdown-link-check-disable -->
Later on, since Jenkins is running inside [container](jenkins), if we would like to enter Jenkins container, we would
use this  command
<!-- markdown-link-check-enable -->

```bash
docker exec -u 0 -it <jenkins-container-name> bash
```

<!-- markdown-link-check-disable -->
where `<jenkins-container-name>` is the name of the container that runs Jenkins. If Jenkins has been installed using
[our recipe](jenkins), the command above is
<!-- markdown-link-check-enable -->

```bash
docker exec -u 0 -it jenkins bash
```

instead of regular

```bash
docker exec -it jenkins bash
```

:::
