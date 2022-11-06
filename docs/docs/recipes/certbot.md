---
sidebar_position: 3
---

aergia::certbot
===============

Free SSL Certificates with Certbot running on Nginx.

:::caution

HTTP:80 must be open before running this recipe.

:::

[Let's Encrypt](https://letsencrypt.org/) provides free SSL certificates for our websites to use secure connections.
[Certbot](https://certbot.eff.org/) is free open source software that allows us to easily create Let's Encrypt SSLs on
our Linux server.

Recipe Details
--------------

### Install Certbot

`aergia::certbot` installs Certbot on Ubuntu with _snapd_ using the following steps:

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

### Create an SSL Certificate with Certbot

After [Certbot has been installed](#install-certbot), `aergia::certbot` runs Certbot to create SSL certificates and
modify Nginx configuration file to automatically redirect HTTP requests to HTTPS. Or, add "certonly" to create the SSL
certificates without modifying system files:

```bash
sudo certbot --nginx
```
