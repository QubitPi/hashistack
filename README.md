[![License Badge](https://img.shields.io/badge/License-Apache%202.0-orange.svg?style=for-the-badge) ](https://www.apache.org/licenses/LICENSE-2.0)

Aergia
------

Enthusiastic about photography, I sometimes used shell commands to manipulate some of my photos using some
[ImageMagick](https://imagemagick.org/script/index.php). However, I found some repetitive tasks were not efficiently
done, which led to the idea of project [Aergia](https://en.wikipedia.org/wiki/Aergia), which turned multiple ImageMagick
commands into a single shell script in order to quickly complete a task.

Later on, I found it useful to expand the scope of Aergia beyond image processing, such as Docker operations and
software testings. Aergia, therefore, evolves to a collection of shell scripts that automates general tasks. I hope you
find them useful as well.

The following sections talk about what kind of scripts are available and how to install them

- [Installing Certbot on Ubuntu](./install-certbot.sh)
- [Install Node.js with NPM](./install-nodejs.sh)

### ImageMagick

- [White-padding image to make it square](./imagemagick/add-white-padding.sh)
- [Convert an image to a favicon](./imagemagick/convert-to-favicon.sh)

### CI/CD

- [Install Jenkins with SSL Support](./cicd/install-jenkins.sh)

### Docker

- [Remove all local containers](./docker/docker-clean-containers.sh)
- [Remove all local containers and images](./docker/docker-clean.sh)
- [Install Docker Daemon on Ubuntu](./docker/install-on-ubuntu.sh)

### Python

- Install Python
  * [3.10 (Ubuntu)](./python/install-python-310-ubuntu.sh)

### Druid

- [Druid Cluster Management](./druid)

### Yahoo Fili

- [Use a locally-build Fili-Snapshot](./fili/use-local-fili.sh)

### Webservice

- [Manually deploy a WAR to Jetty Servleet container](./webservice/manually-deploy-webservice.sh)

### How to Use/Install Scripts

#### Mac

At this moment all scripts could be [automatically installed](./install-all-scripts.sh) on Mac:

    cd aergia
    ./install-all-scripts.sh jack
    
where `jack` will be changed to the name of your user that have permission to execute all scripts. In this case, for
example, all scripts will have `jack` as the owner and can be executed normally:

    ls -l add-white-padding.sh 
    -rw-rw-r--. 1 jack admin 0 Feb 26 07:08 add-white-padding.sh 
    
Note that without specifying owner, [install script](./install-all-scripts.sh) may install the scripts to be executable
by `root`

    ls -l add-white-padding.sh 
    -rw-rw-r--. 1 root admin 0 Feb 26 07:08 add-white-padding.sh
    
In this case, user would not be able to run the script. This is why we would ask you to provide the system user name
as the argument to the [install script](./install-all-scripts.sh)

#### Other Systems

Users shall be able to manually put each shell scripts anywhere and execute them in anyway they would like from there.


License
-------

The use and distribution terms for [Aergia](https://github.com/QubitPi/aergia) are covered by the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).

<div align="center">
    <a href="https://opensource.org/licenses">
        <img align="center" width="50%" alt="License Illustration" src="https://github.com/QubitPi/QubitPi/blob/master/img/apache-2.png?raw=true">
    </a>
</div>
