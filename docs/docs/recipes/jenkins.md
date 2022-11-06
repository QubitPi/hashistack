---
sidebar_position: 5
---

aergia::jenkins
===============

Deploys a fully functional [Jenkins server](https://jenkins.io/) **container**
[available on Docker Hub](https://hub.docker.com/r/jenkins/jenkins).

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
- "jenkins_home" [docker volume](https://qubitpi.github.io/docker-docs/storage/volumes/) on the host machine. Docker
  volumes retain their content even when the container is stopped, started, or deleted.

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
