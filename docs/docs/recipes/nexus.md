[//]: # (Copyright Jiaqi Liu)

[//]: # (Licensed under the Apache License, Version 2.0 &#40;the "License"&#41;;)
[//]: # (you may not use this file except in compliance with the License.)
[//]: # (You may obtain a copy of the License at)

[//]: # (    http://www.apache.org/licenses/LICENSE-2.0)

[//]: # (Unless required by applicable law or agreed to in writing, software)
[//]: # (distributed under the License is distributed on an "AS IS" BASIS,)
[//]: # (WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.)
[//]: # (See the License for the specific language governing permissions and)
[//]: # (limitations under the License.)

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
