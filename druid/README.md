Druid Cluster Management
========================

Developing and debugging a distributed system, such as Druid, often requires developers to manually `ssh` into each
cluster node and repeat some operations, such as

* modifying config files
* restart each node
* making backup files
* etc...

It significantly reduces developers' productivity and efficiency by wasting hours on repeating these tasks on a cluster
with lots of nodes.

This sub-project aims to solve the problem above for Druid developers, who could script up a set of operations only once
and finish executing them all in few seconds on

* [the enture cluster](./apply-to-all-cluster-nodes/apply-to-all-cluster-nodes.sh), or
* [brokers only](./apply-to-all-brokers/apply-to-all-brokers.sh), or
* [coordinators only](./apply-to-all-coordinators/apply-to-all-coordinators.sh), or
* [historicals only](./apply-to-all-historicals/apply-to-all-historicals.sh)
* [Restart Druid cluster](./restart-druid-cluster/restart-cluster.sh)
