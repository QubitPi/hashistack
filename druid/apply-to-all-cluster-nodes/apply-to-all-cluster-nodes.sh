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
This scripts iterates over all broker nodes, coordinator nodes, and historical nodes, then runs another user-provided
script which specifies commands in those nodes.

This script is useful when user wants to, for example, make a backup copy of Druid config file of each node or append
extra configs manually to each node.

To use this script, several environment variables need to be defined in ~/.bashrc (or equivalent):

export HISTORICALS=/path/to/file/containing/historical-host-names
export COORDINATORS=/path/to/file/containing/coordinator-host-names
export BROKERS=/path/to/file/containing/broker-host-names

where ***-host-names are files with one host name per line. For example,
"/path/to/file/containing/historical-host-names" could be a file with any file extensions with the following contents:

historical1.company.com
historical2.company.com
...

Note that each node is applied asynchronously.

To run this script:

./apply-to-all-cluster-nodes.sh /path/to/the/command-script.sh

User has access to the hostname using "$1" inside "/path/to/the/command-script.sh"
END

set -e # abort script if any command fails

# print config files that are picked up by this script
echo "Historical hosts:  $HISTORICALS"
echo "Coordinator hosts: $COORDINATORS"
echo "Broker hosts:      $BROKERS"

# Read in historical hosts
historicals=()
while IFS= read line; do
    if [ ! -z "$line" ]; then
        # non-empty line
        historicals+=("$line")
    fi
done <"$HISTORICALS"

# Read in coordinator hosts
coordinators=()
while IFS= read line; do
    if [ ! -z "$line" ]; then
        # non-empty line
        coordinators+=("$line")
    fi
done <"$COORDINATORS"

# Read in broker hosts
brokers=()
while IFS= read line; do
    if [ ! -z "$line" ]; then
        # non-empty line
        brokers+=("$line")
    fi
done <"$BROKERS"

# Combine all hosts
hosts=("${historicals[@]}" "${coordinators[@]}" "${brokers[@]}")

# Execute user-specified commands in all hosts
for i in "${!hosts[@]}"; do
    echo "=========================================================="
    echo "Applying changes in ${hosts[$i]} ($((i + 1))/${#hosts[@]})"
    echo "=========================================================="

    ssh ${hosts[$i]} "bash -s" < $1 ${hosts[$i]} &
done
wait
