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
This script manually deploys a Webservice by
1. packaging Webservice WAR,
2. copying the WAR to remote server,
3. replacing existing Webservice WAR with the new WAR, and
4. restarting the Webservice to pick up the new WAR

This could be used to test/debug either the dev version of Webservice

TO USE THIS SCRIPT, SEVERAL ENVIRONMENT VARIABLES NEEDS TO BE DEFINED IN ~/.bashrc (or equivalent) LIKE THE FOLLOWING:

# Webservice
export DEV_BOX=<hostname of remote server>
export WEBSERVICE_REPO_PATH=<path to the top level of the Webservice repo>
export WAR_FILENAME=<filename of the WAR file - e.g. ***-SNAPSHOT.war>
export REMOTE_WEBSERVICE_PATH=<path to the ROOT.war on remote server>
alias restart_webservice='<command to restart Webservice app - e.g. restart jetty>'

YOU ALSO NEED TO DEFINE THE FOLLOWING IN REMOTE SERVER:

export WAR_FILENAME=<filename of the WAR file - e.g. ***-SNAPSHOT.war>
export REMOTE_WEBSERVICE_PATH=<path to the ROOT.war on remote server>
alias restart_webservice='<command to restart Webservice app - e.g. restart jetty>'
END

set -e # abort script if any command fails

echo "Server:          $DEV_BOX"
echo "Source Code:     $WEBSERVICE_REPO_PATH"
echo "WAR:             $WAR_FILENAME"
echo "Remote location: $REMOTE_WEBSERVICE_PATH"

SCRIPT_DIR=$(pwd)

cd $WEBSERVICE_REPO_PATH
mvn clean package
cd target
scp $WAR_FILENAME $DEV_BOX:
cd $SCRIPT_DIR
ssh $DEV_BOX "bash -s" < deploy.sh
ssh -t $DEV_BOX /bin/bash -ic 'restart_webservice'

: <<'END'
-i : Make the shell is interactive so that it can run bash aliases
-c : Commands are read from the first non-option argument command_string. If there are arguments after the
command_string, they are assigned to the positional parameters, starting with $0.
END