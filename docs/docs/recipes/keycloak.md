---
sidebar_position: 9
---

aergia::keycloak
================

Deploys Keycloak on Docker

Recipe Details
--------------

### Create Docker Volume

```bash
docker volume create --name keycloak-data
```

### Start Keycloak Container

Withe volume created, `aergia::keycloak` pulls the Keycloak image and run the container using:

```bash
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:20.0.1 start-dev

docker run -d -p 8081:8081 --name nexus -v nexus-data:/nexus-data sonatype/nexus3
```

Recipe Verification
-------------------
