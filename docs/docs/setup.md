---
sidebar_position: 2
title: Setup
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

Setup
-----

### Installing HashiCorp Packer & Terraform

Deployment using Packer & Terraform requires command line tools which can be installed by following the instructions
in the links below:

- [Installing Packer][HashiCorp Packer - Install]
- [Installing Terraform][HashiCorp Terraform - Install]

### Getting HashiCorp Deployment Tool

```console
git clone https://github.com/QubitPi/hashicorp-aws.git
```

### AWS

The following environment variables need to be defined:

- **[AWS_ACCESS_KEY_ID]**
- **[AWS_SECRET_ACCESS_KEY]**

:::info

The _IAM user_ associated with the credentials above must have the following [AWS permissions policies]:

- IAMFullAccess
- AmazonEC2FullAccess
- AmazonRoute53FullAccess

:::

(Optional Setup) SSL
--------------------

:::info hashicorp-aws assumes the following for all of its managed deployments:

Business logic and SSL/HTTP are separate concerns and must be decoupled from each other

:::

That being said, hashicorp-aws deploys application completely without SSL and spins up a Nginx reverse proxy to handle
the HTTPS redirections to aplication's HTTP ports. Therefore, if the deployed application is publicly-facing and
requires HTTPS support, then the following files need to be ready:

- __A SSL certificate file__
- __A SSL certificate key file__
- __A Nginx config file serving as the reverse proxy for SSL/HTTPS__

The contents of both SSL certificate file and SSL certificate key file need to be __base64 encoded__ with the following
commands

```console
openssl enc -base64 -in cert.pem -out cert.base64
openssl enc -base64 -in key.pem -out key.base64
```

where `cert.pem` and `key.pem` are the SSL certificate file and SSL certificate key file, respectively. Please keep
`cert.base64` and `key.base64` files which will be referenced and used later

:::tip

All 3 credentials, including how to obtain their values, are discussed below

:::

_Why do we need the credentials listed above for SSL?_ Let's image the following common scenario:

1. I purchased a domain from [Google Domain][Google Domain] called **my-domain.com**
2. I developed a web app that will be exposed at **my-app.my-domain.com**
3. I will deploy my app to [AWS EC2][AWS EC2] using hashicorp-aws
4. When my app is up and running, I need to automatically enable secure SSL communication so that my app can be visited
   at `https://my-app.my-domain.com`

By default, hashicorp-aws exposes all EC2 instances under a domain using
[aws_route53_record][HashiCorp Terraform aws_route53_record], because it allows us to dynamically bind EC2 IP to its
hosted domain so that each time when a new EC2 instance is instantiated, that instance will register its IP to
`my-domain.com` on Route 53.

:::tip What if my domain is on Google Domain, not on Route 53?

In this case, we can simply connect Google Domain to AWS Route 53 in the following steps

1. Create a Hosted Zone in AWS Route 53:

   - Login into AWS Management Console and head towards Route 53
   - In Route 53 -> Click **Hosted zones** -> Click **Create Hosted Zone**
   - Fill in **Domain Name** and select **Type** as **Public Hosted Zone** and click create

2. Update Google Domain to use custom [name servers](https://www.domain.com/help/article/what-is-a-nameserver)

   - Log into [Google Domain][Google Domain] account and click on **My domains**
   - Click on **DNS**
   - At the top of the page, select **Custom name servers**
   - Copy and paste all four Name Server (NS) from the Route 53 Record Sets panel (Under "Hosted zone details") and
     click **save**

:::

_The Route 53, in order to promote the best security practices, requires all EC2 instances behind its domain to be
accessible at HTTPS_. This requires us or hashicorp-aws to install SSL certificates on each deployed EC2 instance, which
is why SSL certificate file and SSL certificate key file come into play.

In order to simply, or better saying promoting best single-responsibility of any cloud application, deployment,
_hashicorp-aws assumes application should handle business logics only and not SSL themselves_. It therefore let
application run under regular and simple HTTP protocol and uses
[Nginx reverse proxy](https://www.nginx.com/resources/glossary/reverse-proxy-server/) to re-route all HTTPS to HTTP on
that application. This is the reason Nginx config file above will be needed.

If you are still not very clear about HTTPS/SSL, don't worry, the
[next section](#installing-free-ssl-certificates-with-certbot-running-on-nginx) offers a step-by-step guide to help you
get the 3 files ready in a minute!

:::tip

If you have your preferred approach or already have the 3 files above ready, please skip the
[next section](#installing-free-ssl-certificates-with-certbot-running-on-nginx)

:::

### Installing Free SSL Certificates with Certbot running on Nginx

[Let's Encrypt] provides free SSL certificates for our websites to use secure connections. [Certbot] is free open
source software that allows us to easily create Let's Encrypt SSLs on our Linux server, such as Ubuntu VM.

#### Installing Certbot on Ubuntu

We will install Certbot on Ubuntu with _snapd_ using the following steps:

1. Install _snapd_:

   ```bash
   sudo apt-get update
   sudo apt install snapd
   ```

2. Ensure the latest snapd version has been installed:

   ```bash
   sudo snap install core; sudo snap refresh core
   ```

3. Install Certbot with snapd:

   ```bash
   sudo snap install --classic certbot
   ```

4. Create a symlink to ensure Certbot runs:

   ```bash
   sudo ln -s /snap/bin/certbot /usr/bin/certbot
   ```

5. [Install Nginx](https://stackoverflow.com/a/64571090/14312712), assuming we use Nginx-based Certbot

   ```bash
   sudo apt install python3-certbot-nginx -y
   ```

#### Creating SSL Certificate with Certbot

:::caution

HTTP:80 must be open on the server

:::

After [Certbot has been installed](#installing-certbot-on-ubuntu), run Certbot to create SSL certificates and modify
Nginx configuration file to automatically redirect HTTP requests to HTTPS. Or, add "certonly" to create the SSL
certificates without modifying system files:

```bash
sudo certbot --nginx
```

:::info

The locations of the SSL certificate and SSL certificate key file will be printed out in terminal for us to pick up
afterwards

:::

:::tip[DNSKEY Missing]

If the `sudo certbot --nginx` results in the following error

```console
Certbot failed to authenticate some domains (authenticator: nginx). The Certificate Authority reported these problems:
Domain: mydomain.com
Type:   dns
Detail: DNS problem: looking up A for mydomain.com: DNSSEC: DNSKEY Missing; DNS problem: looking up AAAA for gateway.theresa-api.com: DNSSEC: DNSKEY Missing
```

Simply delete the DNSSEC record on the DNS provider side (given one has access)

:::

#### Configuring Reverse Proxy on Nginx

After certificates have been deployed and Nginx has been configured properly for SSL by Certbot, it's time to configure
routing to direct HTTPS to local HTTP by modifying **/etc/nginx/sites-enabled/default** file.

:::note

The details below posts a general approach for reverse-proxying SSL. It is by no means a config file for any deployments
in productions. _Please refer to each deployment category documentation for their respective Nginx configs_.

:::

Locate the section of

```text
server {
    ...

    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/ssl/certs/server.crt;
    ssl_certificate_key /etc/ssl/private/server.key;
}
```

Add the proxy routing rule in the `server` block above

```text
    location / {
        proxy_pass http://localhost:8080;
    }
```

In this example, we have a webservice running at port 8080. Essentially this will redirect all HTTPS request to this
local port, effectively enabling HTTPS on the webservice

:::info

The complete Nginx config file, in the end, will look something like:

```text
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }
}

server {
    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;
    server_name ws-domain.com;

    location / {
        proxy_pass http://localhost:8080;
    }

    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/ssl/certs/server.crt;
    ssl_certificate_key /etc/ssl/private/server.key;
}
server {
    if ($host = ws-domain.com) {
        return 301 https://$host$request_uri;
    }

    listen 80 ;
    listen [::]:80 ;
    server_name ws-domain.com;
    return 404;
}
```

In the config above, Nginx assumes the certificate file and its key file are located at **/etc/ssl/certs/server.crt**
and **/etc/ssl/private/server.key**

:::

:::tip

To update Nginx configuration after modifying the config file, simply run (on Ubuntu):

```console
sudo nginx -t
sudo nginx -s reload
```

:::tip[Nginx Invalid PID number]

If `sudo nginx -s reload` gives the following error

```console
$ sudo nginx -s reload
nginx: [error] invalid PID number "" in "/run/nginx.pid"
```

[This means we don't have a running Nginx process to send a signal to](https://stackoverflow.com/a/7647458). Just start
the Nginx after `sudo nginx -t` with

```console
sudo service nginx start
```

:::

The `nginx -t` performs config file validation and, if successful, shall print something similar to

```console
nginx: the configuration file ... syntax is ok
nginx: configuration file ... test is successful
```

If config update doesn't seem to take effect while we were still seeing the `ok` message above, try restarting the Nginx
with `sudo /etc/init.d/nginx restart` and double check Nginx log:

```console
sudo cat /var/log/nginx/error.log
```

:::

Deployment via Screwdriver CD
-----------------------------

[//]: # (:::tip)

[//]: # ()
[//]: # (Please try our HACP platform to deploy a Screwdriver CD instance. It gives us one-click experience that helps us stand )

[//]: # (up an CI/CD infrastructure in a minute.)

[//]: # ()
[//]: # (:::)

Deployment via Screwdriver CD Running Locally
---------------------------------------------

Please walk through ["Quickstart"](https://github.com/QubitPi/screwdriver-cd-in-a-box?tab=readme-ov-file#quickstart) to
stand up a local Screwdriver CD. If you have any questions, please pin us in
[![Discord]](https://discord.com/widget?id=1060753787125514332)

[AWS AMI]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[AWS EC2]: https://aws.amazon.com/ec2/
[AWS_ACCESS_KEY_ID]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html
[AWS permissions policies]: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_access-management.html
[AWS_SECRET_ACCESS_KEY]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html

[Certbot]: https://certbot.eff.org/

[Discord]: https://img.shields.io/discord/1060753787125514332?color=5865F2&logo=discord&logoColor=ffffff&style=for-the-badge

[Google Domain]: https://domains.google/

[HashiCorp Packer - Install]: https://qubitpi.github.io/hashicorp-packer/packer/install
[HashiCorp Terraform aws_route53_record]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record.html
[HashiCorp Terraform - Install]: https://qubitpi.github.io/hashicorp-terraform/terraform/install

[Let's Encrypt]: https://qubitpi.github.io/letsencrypt-website/
