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
This scripts iterates over all coordinator nodes, then runs another user-provided script which specifies commands in
those nodes.

This script is useful when user wants to, for example, make a backup copy of Druid config file of each coordinator or
append extra configs manually to each coordinator.

To use this script, a environment variable needs to be defined in ~/.bashrc (or equivalent):

export COORDINATORS=/path/to/file/containing/coordinator-host-names

where coordinator-host-names are files with one coordinator host name per line. For example, it could be a file with any
file extensions with the following contents:

coordinator1.company.com
coordinator2.company.com
...

Note that each node is applied asynchronously.

To run this script:

./apply-to-all-coordinators.sh /path/to/the/command-script.sh
END

set -e # abort script if any command fails

# print config files that are picked up by this script
echo "Coordinator hosts:      $COORDINATORS"

# Read in coordinator hosts
coordinators=()
while IFS= read line; do
    if [ ! -z "$line" ]; then
        # non-empty line
        coordinators+=("$line")
    fi
done <"$COORDINATORS"

# Execute user-specified commands in all coordinators
for i in "${!coordinators[@]}"; do
    echo "=============================================================="
    echo "Applying changes in ${coordinators[$i]} ($((i + 1))/${#coordinators[@]})"
    echo "=============================================================="

    ssh ${coordinators[$i]} "bash -s" < $1 &
done
wait
