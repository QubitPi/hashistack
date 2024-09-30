---
sidebar_position: 2
title: Screwdriver CD
---

Screwdriver CD
==============

:::info

It is assumed a functioning Screwdriver CD instance is ready. If not, please follow our
 [dedicated guide on deploying a Screwdriver instance in production](https://screwdriver-docs.qubitpi.org/cluster-management/docker-compose#running-docker-compose-in-aws-ec2-production-deployment)

:::

Installing Templates and Commands
---------------------------------

hashistack integrates with Screwdriver CD using [templates][Screwdriver CD templates] and
[commands][Screwdriver CD commands]

The template and the commands can be automatically installed using the regular [screwdriver.yaml] config file by
following the steps below:

### 1. Creating a Screwdriver Pipeline

Create a Screwdriver pipeline with the repository link being `https://github.com/QubitPi/hashistack.git`:

![Error loading create-pipeline-1.png](./img/create-pipeline-1.png)
![Error loading create-pipeline-2.png](./img/create-pipeline-2.png)

### 2. Running the Pipeline

Trigger a pipeline run, which will install the templates and commands automatically. Wait the pipeline to finish
running. The installed template and commands can be found in [Templates page][Screwdriver CD - finding templates] and
[Commands page][Screwdriver CD - finding commands], respectively

[screwdriver.yaml]: https://github.com/QubitPi/hashistack/tree/master/screwdriver.yaml
[Screwdriver CD commands]: https://github.com/QubitPi/hashistack/tree/master/adaptors/screwdriver-cd/commands
[Screwdriver CD templates]: https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates
[Screwdriver CD - finding templates]: https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates#finding-templates
[Screwdriver CD - finding commands]: https://screwdriver-docs.qubitpi.org/user-guide/commands#finding-commands
