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
   and `proxy_pass` to an HTTP port. For example, ports 8443 and 8444 are `proxy_pass`ed to 8000 and 8001, respectively,
   both of which are listed in the doc.

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
           proxy_pass http://localhost:8000;
       }

       listen [::]:8443 ssl ipv6only=on;
       listen 8443 ssl;
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

Troubleshooting
---------------

### Security Group Isn't Working as Expected in AWS

This could happen when we are accessing the deployed gateway from a public IP address, such as our personal computer.

Complying with the best security practice, hashicorp-aws binds _private_ EC2 IP to a Route 53 domain. Since it is a
common practice to limit the API gateway access by assigning gateway instance with
[inbound rules](https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html). hashicorp-aws also manages
to disable all HTTP request to the gateway. Therefore, any public visit to our deployed gateway instance has to go
through the gateway domain.

But since the domain is bound by a private IP, accessing the gateway through the domain from public IP source will hit
the private IP, which would always fail _independent_ of security group configs

:::info

The reason we bind _private_ IP to domain is that
[when gateway is used for inter security-group communication, it works
over private addressing. If we use the public IP address the firewall rule will not recognise the source security group](https://stackoverflow.com/a/24242211).
This is particularly important when the gateway is serving API to downstream services such as frontend APP.

:::

_The solution_? To access the gateway manually from our machine, for instance, we should address the instance using the
Public DNS record - this will actually be pointed at the private IP address when we hit the DNS name.

For example, if our instance has public IP `203.0.113.185` and private IP `10.1.234.12`, we are given a public DNS name
like `ec2-203-0-113-185.eu-west-1.compute.amazonaws.com`, which will resolve to `203.0.113.185` if queried externally,
or `10.1.234.12` if queried internally. This will enable our security groups to work as intended. See
[this thread](https://stackoverflow.com/a/24242211) for more details.
