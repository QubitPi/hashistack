#!/bin/bash
set -x
set -e

# Copyright Jiaqi Liu
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

touch /home/ubuntu/aws-mlflow-docker-tf-init.log
export TF_INIT_LOG=/home/ubuntu/aws-mlflow-docker-tf-init.log
echo "aws-base-tf-init started executing..."                                         >>$TF_INIT_LOG 2>&1

for ML_MODEL_PATH in /home/ubuntu/ml-models/*; do
  PUBLIC_PORT=$( cat $ML_MODEL_PATH/PORT )                                           >>$TF_INIT_LOG 2>&1
  echo "Running container serving model under $ML_MODEL_PATH with port $PUBLIC_PORT" >>$TF_INIT_LOG 2>&1

  sudo docker run --detach --rm \
    --memory=4000m \
    -p $PUBLIC_PORT:8080 \
    -v $ML_MODEL_PATH:/opt/ml/model \
    -e PYTHONPATH="/opt/ml/model:$PYTHONPATH" \
    -e GUNICORN_CMD_ARGS="--timeout 600 -k gevent --workers=1" \
    "mlflow-model-container"                                                         >>$TF_INIT_LOG 2>&1

  echo "Model container started"                                                     >>$TF_INIT_LOG 2>&1
done

echo "aws-base-tf-init finished executing"                                           >>$TF_INIT_LOG 2>&1
