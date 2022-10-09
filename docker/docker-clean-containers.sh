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
#!/bin/bash

: <<'END'
Removes all Docker containers in localhost

To install this script, place it under OS executable path. For example, On mac put this under "/usr/local/bin/"

The usage of this script, run

    docker-clean-containers.sh

END

docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
