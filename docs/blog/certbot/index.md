---
slug: certbot
title: SSL through Certbot
authors: [jiaqi]
date: 2023-09-16
tags: [SSL, HTTPS, Security]
---

Installing Free SSL Certificates with Certbot running on Nginx
--------------------------------------------------------------

[Let's Encrypt](https://qubitpi.github.io/letsencrypt-website/) provides free SSL certificates for our websites to use 
secure connections. [Certbot](https://certbot.eff.org/) is free open source software that allows us to easily create 
Let's Encrypt SSLs on our Linux server, such as Ubuntu VM.

### Installing Certbot on Ubuntu

We will install Certbot on Ubuntu with _snapd_ using the following steps:

1. Install _snapd_:

   ```bash
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

5. [Install Nginx](https://stackoverflow.com/a/64571090/14312712), since `aergia::certbot` uses Nginx-based Certbot:

   ```bash
   sudo apt install python3-certbot-nginx -y
   ```

### Creating SSL Certificate with Certbot

:::caution

HTTP:80 must be open on the server

:::

After [Certbot has been installed](#install-certbot), `aergia::certbot` runs Certbot to create SSL certificates and
modify Nginx configuration file to automatically redirect HTTP requests to HTTPS. Or, add "certonly" to create the SSL
certificates without modifying system files:

```bash
sudo certbot --nginx
```

### Configuring Reverse Proxy on Nginx

After certificates have been deployed and Nginx has been configured properly for SSL by Certbot, it's time to configure
routing to direct HTTPS to local HTTP by modifying **/etc/nginx/sites-enabled/default** file.

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

:::
