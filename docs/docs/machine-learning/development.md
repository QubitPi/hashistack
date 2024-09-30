---
sidebar_position: 3
title: Development
---

Development
===========

The following guide is intended to help developers who maintain or want to make changes to the hashistack's Machine
Learning deployment module

MLflow Docker
-------------

The general flow of ML REST via MLflow is a general image will be built, then it's container spins up by mounting the
model path and serving that model through a [Gunicorn server](https://gunicorn.org/).

If the image build phase fails, we should look at its build logic by manually generataing its Dockerfile via

```console
mlflow models generate-dockerfile
```

If it's a container runtime error, we should still generate the Dockerfile and look at its ENTRYPOINT for the command
that gives us the error. For example, the version 2.14.0 of mlflow has this ENTRYPOINT definition in its generated
Dockerfile:

```dockerfile
$ mlflow models generate-dockerfile
$ cat mlflow-dockerfile/Dockerfile

ENTRYPOINT ["python", "-c", "from mlflow.models import container as C; C._install_pyfunc_deps('/opt/ml/model', install_mlflow=False, enable_mlserver=False, env_manager='virtualenv'); C._serve('virtualenv')"]
```

Essentially the container starts services with a
[MLflow object called container](https://github.com/mlflow/mlflow/blob/master/mlflow/models/container/__init__.py). From
there we can get more info on what code was executed and errored.
