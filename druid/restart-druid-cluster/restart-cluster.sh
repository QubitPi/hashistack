#!/bin/bash

: <<'END'
This scripts restarts a druid cluster, including all broker nodes, coordinator nodes, and historical nodes.

This script is useful when there are lots of nodes in the cluster and restarting each one of them manually would be very
time consuming.

To use this script, several environment variables need to be defined in ~/.bashrc (or equivalent):

export HISTORICALS=/path/to/file/containing/historical-host-names
export COORDINATORS=/path/to/file/containing/coordinator-host-names
export BROKERS=/path/to/file/containing/broker-host-names

export RESTART_SINGLE_DRUID_NODE_SCRIPT=/path/to/restart-single-server.sh

where ***-host-names are files with one host name per line. For example,
"/path/to/file/containing/historical-host-names" could be a file with any file extensions with the following contents:

historical1.company.com
historical2.company.com
...

Note that each node is applied asynchronously.

Finally, a separate script called "restart-single-server.sh" needs to be defined.
The script contains all the commands that restarts a *single* Druid node. For example

#!/bin/bash

your_command_to_restart_Druid_process

To run this script:

./restart-cluster.sh
END

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
