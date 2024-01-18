---
sidebar_position: 9
title: Kong API Gateway
---

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

SSL
---

### Nginx Config

hashicorp-aws assumes the following for all of its management app deployment:

**Business logic and SSL/HTTP are separate concerns and must be decoupled from each other**

That being said, hashicorp-aws deploys Kong completely without SSL and spins up a Nginx rever proxy to handle the
HTTPS redirecting to Kong's pure HTTP app. Therefore:

1. hashicorp-aws uses a [customized fork of docker-kong](https://github.com/QubitPi/docker-kong) to
  [fully separate the
   app and SSL](https://github.com/QubitPi/docker-kong/pull/1),
   and therefore
2. the Nginx config needs multiple [servers](https://www.nginx.com/resources/wiki/start/topics/examples/server_blocks/)
   to ensure all HTTPS ports are mapped to their corresponding HTTP ports as shown in the config snippet below:

   :::tip

   All relevant HTTP and HTTPS ports are listed in
   [Kong's documentation here](https://qubitpi.github.io/docs.konghq.com/gateway/latest/production/networking/default-ports/). In general, our Nginx should **listen on an HTTPS port
   and `proxy_pass` to an HTTP port. For example, the 8444 is `proxy_pass`ed to 8001, both of which are listed as the
   "Admin API" ports in the doc.

   One special case is HTTP port 8002, which is the Kong manager UI port. hashicorp-aws assigns user specified domain
   to each deployed Kong. Hitting the domain will simply open up a user-friendly UI by this configuration.

   :::

   ```nginx configuration

   ...

   server {
       root /var/www/html;

       index index.html index.htm index.nginx-debian.html;
       server_name my.kongdomain.com;

       location / {
           proxy_pass http://localhost:8002;
       }

       listen [::]:443 ssl ipv6only=on;
       listen 443 ssl;
       ssl_certificate /etc/ssl/certs/server.crt;
       ssl_certificate_key /etc/ssl/private/server.key;
   }

   server {
       root /var/www/html;

       index index.html index.htm index.nginx-debian.html;
       server_name my.kongdomain.com;

       location / {
           proxy_pass http://localhost:8001;
       }

       listen [::]:8444 ssl ipv6only=on;
       listen 8444 ssl;
       ssl_certificate /etc/ssl/certs/server.crt;
       ssl_certificate_key /etc/ssl/private/server.key;
   }

   ...

   ```
