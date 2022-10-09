#!/bin/bash

# ================================ script description ================================
: <<'END'
1. Send Druid extension package to each Druid cluster server
2. Install the package on each of the server

To use this script, several environment variables need to be defined in ~/.bashrc (or equivalent):

export INSTALL_SINGLE_DRUID_NODE_SCRIPT=/Users/jiaqiliu/Desktop/temp/uad/install-single-server.sh
export RESTART_SINGLE_DRUID_NODE_SCRIPT=/Users/jiaqiliu/Desktop/temp/uad/restart-single-server.sh

The install-single-server is a script contains all the commands that installs the extension package in a *single* Druid
node.

Finally, a separate script called "restart-single-server.sh" needs to be defined.
The script contains all the commands that restarts a *single* Druid node. For example

#!/bin/bash

your_command_to_restart_Druid_process

To run this script:

./distribute /path/to/the/extension/package

where you can use realpath command to get the absolute path of /path/to/the/extension/package

Note that the extension package will be deleted in the end
END
# ====================================================================================

set -e # abort script if any command fails

echo "Historical hosts:  $HISTORICALS"
echo "Coordinator hosts: $COORDINATORS"
echo "Broker hosts:      $BROKERS"

# Read in druid hosts
historicals=()
while IFS= read line; do
    if [ ! -z "$line" ]; then
        # non-empty line
        historicals+=("$line")
    fi
done <"$HISTORICALS"

coordinators=()
while IFS= read line; do
    if [ ! -z "$line" ]; then
        # non-empty line
        coordinators+=("$line")
    fi
done <"$COORDINATORS"

brokers=()
while IFS= read line; do
    if [ ! -z "$line" ]; then
        # non-empty line
        brokers+=("$line")
    fi
done <"$BROKERS"

hosts=("${historicals[@]}" "${coordinators[@]}" "${brokers[@]}")

# Copy module to host
for i in "${!hosts[@]}"; do
    echo "===================================================="
    echo "Copying new module to ${hosts[$i]} ($i/${#hosts[@]})"
    echo "===================================================="

    scp $1 ${hosts[$i]}: &
done
wait

# Install module on host
for i in "${!hosts[@]}"; do
    echo "========================================================"
    echo "Installing new module for ${hosts[$i]} ($i/${#hosts[@]})"
    echo "========================================================"

    ssh ${hosts[$i]} "bash -s" < "$INSTALL_SINGLE_DRUID_NODE_SCRIPT" $1 &
done
wait

# Restart Druid on historicals
for i in "${!historicals[@]}"; do
    echo "====================================================="
    echo "Restarting ${historicals[$i]} ($i/${#historicals[@]})"
    echo "====================================================="

    ssh ${historicals[$i]} "bash -s" < "$RESTART_SINGLE_DRUID_NODE_SCRIPT" &
done
wait

# Restart Druid on coordinators
for i in "${!coordinators[@]}"; do
    echo "======================================================="
    echo "Restarting ${coordinators[$i]} ($i/${#coordinators[@]})"
    echo "======================================================="

    ssh ${coordinators[$i]} "bash -s" < "$RESTART_SINGLE_DRUID_NODE_SCRIPT" &
done
wait

# Restart Druid on brokers
for i in "${!brokers[@]}"; do
    echo "============================================="
    echo "Restarting ${brokers[$i]} ($i/${#brokers[@]})"
    echo "============================================="

    ssh ${brokers[$i]} "bash -s" < "$RESTART_SINGLE_DRUID_NODE_SCRIPT" &
done
wait

rm $1
