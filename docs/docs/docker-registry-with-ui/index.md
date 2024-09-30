---
sidebar_position: 1
title: General Deployment
---

Quick Start (Manual Deployment without hashistack)
-----------------------------------------------------

This section is to give you a taste of what's behind the scene of hashistack deployment. Let's make some directories
first:

```console
mkdir my-directory
cd my-directory

mkdir nginx
mkdir registry-config
```

### Obtain SSL Certificates

Follow the [SSL setup](../setup#optional-setup-ssl) to obtain the __fullchain.pem__ and __privkey.pem__ files and place
them under the `my-directory/nginx` directory.

### Set Up Nginx Config

Place the following Nginx config file under `my-directory/nginx` directory:

```text title="my-directory/nginx/nginx.conf"
server {
  listen              443 ssl;
  ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers         HIGH:!aNULL:!MD5;
  ssl_certificate     /etc/nginx/certs/fullchain.pem;
  ssl_certificate_key /etc/nginx/certs/privkey.pem;
  root /usr/share/nginx/html;

  # disable any limits to avoid HTTP 413 for large image uploads
  client_max_body_size 0;

  location /v2 {
      # Do not allow connections from docker 1.5 and earlier
      # docker pre-1.6.0 did not properly set the user agent on ping, catch "Go *" user agents
      if ($http_user_agent ~ "^(docker\/1\.(3|4|5(.[0-9]-dev))|Go ).*$" ) {
          return 404;
      }
      proxy_pass http://registry:5000;
  }
}

server {
  listen 80;
  location /  {
    # Force HTTPS
    return 301 https://$host$request_uri;
  }
}
```

### Configuring Authentication (For Both UI Login & `docker push`)

Place the following Registry authentication config file named __credentials.yml__ under `my-directory/registry-config`
directory:

```yaml title="my-directory/registry-config/credentials.yml"
version: 0.1
log:
  fields:
    service: registry
storage:
  delete:
    enabled: true
  cache:
    blobdescriptor: inmemory
  filesystem:
    rootdirectory: /var/lib/registry
http:
  addr: :5000
  headers:
    X-Content-Type-Options: [nosniff]
    Access-Control-Allow-Origin: ['http://localhost']
    Access-Control-Allow-Methods: ['HEAD', 'GET', 'OPTIONS', 'DELETE']
    Access-Control-Allow-Headers: ['Authorization', 'Accept']
    Access-Control-Max-Age: [1728000]
    Access-Control-Allow-Credentials: [true]
    Access-Control-Expose-Headers: ['Docker-Content-Digest']
auth:
  htpasswd:
    realm: basic-realm
    path: /etc/docker/registry/htpasswd
```

Then generate hashied password using bcrypt

:::tip

[bcrypt](https://en.wikipedia.org/wiki/Bcrypt) is a password-hashing function designed by Niels Provos and David
Mazières, based on the Blowfish cipher and presented at
[USENIX in 1999](https://www.usenix.org/legacy/events/usenix99/provos/provos.pdf). Besides incorporating a
[salt](https://en.wikipedia.org/wiki/Salt_(cryptography)) to protect against rainbow
[table attacks](https://en.wikipedia.org/wiki/Rainbow_table), bcrypt is an adaptive function: over time, the iteration
count can be increased to make it slower, so it remains resistant to
[brute-force search](https://en.wikipedia.org/wiki/Brute-force_search) attacks even with increasing computation power.

:::

For Docker Registry, one can
[generate a password file](https://distribution.qubitpi.org/about/deploying/#native-basic-auth) with:

```console
cd my-directory/registry-config
docker run --entrypoint htpasswd httpd:2 -Bbn my-user my-passwd > htpasswd
```

where

- `my-user` is the user for logging into the registry UI
- `my-passwd` is the user's password for logging into the registry UI

The command above will geneate a file called __htpasswd__, which should be placed under `my-directory/registry-config`
directory as well

### docker-compose file

We wire up everything together with a final __docker-compose.yml__ file, which should be put under `my-directory/`

```yaml title="my-directory/docker-compose.yml"
version: '2.0'
services:
  registry:
    image: registry:2.7
    ports:
      - 5000:5000
    volumes:
      - ./registry-data:/var/lib/registry
      - ./registry-config/credentials.yml:/etc/docker/registry/config.yml
      - ./registry-config/htpasswd:/etc/docker/registry/htpasswd
    networks:
      - registry-ui-net

  ui:
    image: joxit/docker-registry-ui:latest
    ports:
      - 80:80
      - 443:443
    environment:
      - DELETE_IMAGES=true
      - REGISTRY_SECURED=true
      - REGISTRY_TITLE=My Private Docker Registry
      - NGINX_PROXY_PASS_URL=http://registry:5000
      - SINGLE_REGISTRY=true
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      - ./nginx/fullchain.pem:/etc/nginx/certs/fullchain.pem
      - ./nginx/privkey.pem:/etc/nginx/certs/privkey.pem
    depends_on:
      - registry
    networks:
      - registry-ui-net

networks:
  registry-ui-net:
```

:::tip

This docker compose is a combination of [Docker Registry Standalone (with credentials)](https://github.com/QubitPi/docker-registry-ui/tree/main/examples/ui-as-standalone)
and [HTTPS supports](https://github.com/Joxit/docker-registry-ui/tree/main/examples/issue-20)

:::

At the end of the day, our directory structure should look like the following

```text
my-directory/
├── nginx/
│   ├── nginx.conf
│   ├── fullchain.pem
│   └── privkey.pem
├── registry-config/
│   ├── credentials.yml
│   └── htpasswd
└── docker-compose.yml
```

Make sure we are under `my-directory/` now; then we can start our Registry with

```console
docker compose up -d
```

If everything sets up correctly, we should be able to view our Registry UI at `https://registry.mycompany.com`:

![Error loading ui.png](./img/ui.png)

Note that we are supposed to login first with a Username of `my-user` and Password of `my-passwd`

FAQ
---

### How to Authenticate `docker push`?

It is very likely that our CI/CD pipeline will routinely publish Docker images to our just-deploy private registry,
which requires authentication. The CI/CD pipeline can essentially perform the following option to authenticate itself:

```console
docker login -u=my-user -p=my-passwd https://registry.mycompany.com:5000
```

where

- `my-user` is the user for logging into the registry UI
- `my-passwd` is the user's password for logging into the registry UI
- `registry.mycompany.com` is the domain of the registry service
