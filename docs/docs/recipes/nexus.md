---
sidebar_position: 8
---

aergia::nexus
=============

Deploys Nexus 3 Repository Manager OSS Using Docker

Recipe Details
--------------

### Create Docker Volume

Since docker volumes are persistent, a volume can be created specifically for persisting data. This is the recommended
because it can be used for backup later as well.

```bash
docker volume create --name nexus-data
```

### Start Nexus 3 Container

Withe volume created, `aergia::nexus` pulls the Nexus 3 image and run the container using:

```bash
docker run -d -p 8081:8081 --name nexus -v nexus-data:/nexus-data sonatype/nexus3
```

Recipe Verification
-------------------
