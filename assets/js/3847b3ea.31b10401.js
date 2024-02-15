"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[3012],{7017:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>a});var s=i(7624),t=i(2172);const r={sidebar_position:2,title:"Setup"},l=void 0,o={id:"setup",title:"Setup",description:"[//]: # (Copyright Jiaqi Liu)",source:"@site/docs/setup.md",sourceDirName:".",slug:"/setup",permalink:"/hashicorp-aws/docs/setup",draft:!1,unlisted:!1,editUrl:"https://github.com/QubitPi/hashicorp-aws/tree/master/docs/docs/setup.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Setup"},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/hashicorp-aws/docs/intro"},next:{title:"Machine Learning Model in REST API",permalink:"/hashicorp-aws/docs/machine-learning"}},c={},a=[{value:"Setup",id:"setup",level:2},{value:"Installing HashiCorp Packer &amp; Terraform",id:"installing-hashicorp-packer--terraform",level:3},{value:"Getting HashiCorp Deployment Tool",id:"getting-hashicorp-deployment-tool",level:3},{value:"AWS",id:"aws",level:3},{value:"SSL",id:"ssl",level:3},{value:"Installing Free SSL Certificates with Certbot running on Nginx",id:"installing-free-ssl-certificates-with-certbot-running-on-nginx",level:4},{value:"Installing Certbot on Ubuntu",id:"installing-certbot-on-ubuntu",level:5},{value:"Creating SSL Certificate with Certbot",id:"creating-ssl-certificate-with-certbot",level:5},{value:"Configuring Reverse Proxy on Nginx",id:"configuring-reverse-proxy-on-nginx",level:5},{value:"Deployment via Screwdriver CD",id:"deployment-via-screwdriver-cd",level:2},{value:"Deployment via Screwdriver CD Running Locally",id:"deployment-via-screwdriver-cd-running-locally",level:2}];function d(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",h5:"h5",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.M)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["[hashicorp-aws] can be used for both and ",(0,s.jsx)(n.strong,{children:"automatic GitHub Action based"})," and ",(0,s.jsx)(n.strong,{children:"Screwdriver CD based"})," deployments."]}),"\n",(0,s.jsx)(n.h2,{id:"setup",children:"Setup"}),"\n",(0,s.jsx)(n.h3,{id:"installing-hashicorp-packer--terraform",children:"Installing HashiCorp Packer & Terraform"}),"\n",(0,s.jsx)(n.p,{children:"Deployment using Packer & Terraform requires command line tools which can be installed by following the instructions\nin the links below:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://qubitpi.github.io/hashicorp-packer/packer/install",children:"Installing Packer"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://qubitpi.github.io/hashicorp-terraform/terraform/install",children:"Installing Terraform"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"getting-hashicorp-deployment-tool",children:"Getting HashiCorp Deployment Tool"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"git clone https://github.com/QubitPi/hashicorp-aws.git\n"})}),"\n",(0,s.jsx)(n.h3,{id:"aws",children:"AWS"}),"\n",(0,s.jsx)(n.p,{children:"The following environment variables need to be defined:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html",children:"AWS_ACCESS_KEY_ID"})})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html",children:"AWS_SECRET_ACCESS_KEY"})})}),"\n"]}),"\n",(0,s.jsxs)(n.admonition,{type:"info",children:[(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.em,{children:"IAM user"})," associated with the credentials above must have the following ",(0,s.jsx)(n.a,{href:"https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_access-management.html",children:"AWS permissions policies"}),":"]}),(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"IAMFullAccess"}),"\n",(0,s.jsx)(n.li,{children:"AmazonEC2FullAccess"}),"\n",(0,s.jsx)(n.li,{children:"AmazonRoute53FullAccess"}),"\n"]})]}),"\n",(0,s.jsx)(n.h3,{id:"ssl",children:"SSL"}),"\n",(0,s.jsx)(n.p,{children:"The following files need to be ready:"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"SSL_CERTIFICATE"})," - the content of a SSL certificate file"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"SSL_CERTIFICATE_KEY"})," - the content of a SSL certificate key file"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"NGINX_CONFIG_FILE"})," - the content of Nginx config file serving as the reverse proxy for SSL/HTTPS"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsx)(n.p,{children:"All 3 credentials, including how to obtain their values, are discussed below"})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"Why do we need the credentials listed above for SSL?"})," Let's image the following common scenario:"]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["I purchased a domain from ",(0,s.jsx)(n.a,{href:"https://domains.google/",children:"Google Domain"})," called ",(0,s.jsx)(n.strong,{children:"my-domain.com"})]}),"\n",(0,s.jsxs)(n.li,{children:["I developed a web app that will be exposed at ",(0,s.jsx)(n.strong,{children:"my-app.my-domain.com"})]}),"\n",(0,s.jsxs)(n.li,{children:["I will deploy my app to ",(0,s.jsx)(n.a,{href:"https://aws.amazon.com/ec2/",children:"AWS EC2"})," using HashiCorp AWS"]}),"\n",(0,s.jsxs)(n.li,{children:["When my app is up and running, I need to automatically enable secure SSL communication so that my app can be visited\nat ",(0,s.jsx)(n.code,{children:"https://my-app.my-domain.com"})]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["By default, hashicorp-aws exposes all EC2 instances under a domain using\n",(0,s.jsx)(n.a,{href:"https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record.html",children:"aws_route53_record"}),", because it allows us to dynamically bind EC2 IP to its\nhosted domain so that each time when a new EC2 instance is instantiated, that instance will register its IP to\n",(0,s.jsx)(n.code,{children:"my-domain.com"})," on Route 53."]}),"\n",(0,s.jsxs)(n.admonition,{title:"What if my domain is on Google Domain, not on Route 53?",type:"tip",children:[(0,s.jsx)(n.p,{children:"In this case, we can simply connect Google Domain to AWS Route 53 in the following steps"}),(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Create a Hosted Zone in AWS Route 53:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Login into AWS Management Console and head towards Route 53"}),"\n",(0,s.jsxs)(n.li,{children:["In Route 53 -> Click ",(0,s.jsx)(n.strong,{children:"Hosted zones"})," -> Click ",(0,s.jsx)(n.strong,{children:"Create Hosted Zone"})]}),"\n",(0,s.jsxs)(n.li,{children:["Fill in ",(0,s.jsx)(n.strong,{children:"Domain Name"})," and select ",(0,s.jsx)(n.strong,{children:"Type"})," as ",(0,s.jsx)(n.strong,{children:"Public Hosted Zone"})," and click create"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Update Google Domain to use custom ",(0,s.jsx)(n.a,{href:"https://www.domain.com/help/article/what-is-a-nameserver",children:"name servers"})]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Log into ",(0,s.jsx)(n.a,{href:"https://domains.google/",children:"Google Domain"})," account and click on ",(0,s.jsx)(n.strong,{children:"My domains"})]}),"\n",(0,s.jsxs)(n.li,{children:["Click on ",(0,s.jsx)(n.strong,{children:"DNS"})]}),"\n",(0,s.jsxs)(n.li,{children:["At the top of the page, select ",(0,s.jsx)(n.strong,{children:"Custom name servers"})]}),"\n",(0,s.jsxs)(n.li,{children:['Copy and paste all four Name Server (NS) from the Route 53 Record Sets panel (Under "Hosted zone details") and\nclick ',(0,s.jsx)(n.strong,{children:"save"})]}),"\n"]}),"\n"]}),"\n"]})]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:"The Route 53, in order to promote the best security practices, requires all EC2 instances behind its domain to be\naccessible at HTTPS"}),". This requires us or hashicorp-aws to install SSL certificates on each deployed EC2 instance, which\nis why ",(0,s.jsx)(n.code,{children:"SSL_CERTIFICATE"})," and ",(0,s.jsx)(n.code,{children:"SSL_CERTIFICATE_KEY"})," come into play."]}),"\n",(0,s.jsxs)(n.p,{children:["In order to simply, or better saying promoting best single-responsibility of any cloud application, deployment,\n",(0,s.jsx)(n.em,{children:"hashicorp-aws assumes application should handle business logics only and not SSL themselves"}),". It therefore let\napplication run under regular and simple HTTP protocol and uses\n",(0,s.jsx)(n.a,{href:"https://www.nginx.com/resources/glossary/reverse-proxy-server/",children:"Nginx reverse proxy"})," to re-route all HTTPS to HTTP on\nthat application. This is the reason ",(0,s.jsx)(n.code,{children:"NGINX_CONFIG_FILE"})," above will be needed."]}),"\n",(0,s.jsx)(n.p,{children:"To summarize, we have 3 credentials we need to setup:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"SSL certificate file"})," We will refer to the contents of this file as ",(0,s.jsx)(n.strong,{children:"SSL_CERTIFICATE"})," from now on"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"SSL certificate key file"})," We will refer to the contents of this file as ",(0,s.jsx)(n.strong,{children:"SSL_CERTIFICATE_KEY"})," from now on"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Nginx Reverse Proxy Config file"})," We will refer to the contents of this file as ",(0,s.jsx)(n.strong,{children:"NGINX_CONFIG_FILE"})," from now on"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["If you are not very familiar with HTTPS/SSL, don't worry, the\n",(0,s.jsx)(n.a,{href:"#installing-free-ssl-certificates-with-certbot-running-on-nginx",children:"next section"})," offers a step-by-step guide to help you\nget the 3 credentials above ready in a minute!"]}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.p,{children:["If you have your preferred approach or already have the 3 files above ready, please kip the\n",(0,s.jsx)(n.a,{href:"#installing-free-ssl-certificates-with-certbot-running-on-nginx",children:"next section"})]})}),"\n",(0,s.jsx)(n.h4,{id:"installing-free-ssl-certificates-with-certbot-running-on-nginx",children:"Installing Free SSL Certificates with Certbot running on Nginx"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://qubitpi.github.io/letsencrypt-website/",children:"Let's Encrypt"})," provides free SSL certificates for our websites to use secure connections. ",(0,s.jsx)(n.a,{href:"https://certbot.eff.org/",children:"Certbot"})," is free open\nsource software that allows us to easily create Let's Encrypt SSLs on our Linux server, such as Ubuntu VM."]}),"\n",(0,s.jsx)(n.h5,{id:"installing-certbot-on-ubuntu",children:"Installing Certbot on Ubuntu"}),"\n",(0,s.jsxs)(n.p,{children:["We will install Certbot on Ubuntu with ",(0,s.jsx)(n.em,{children:"snapd"})," using the following steps:"]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Install ",(0,s.jsx)(n.em,{children:"snapd"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"sudo apt-get update\nsudo apt install snapd\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Ensure the latest snapd version has been installed:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"sudo snap install core; sudo snap refresh core\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Install Certbot with snapd:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"sudo snap install --classic certbot\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Create a symlink to ensure Certbot runs:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"sudo ln -s /snap/bin/certbot /usr/bin/certbot\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://stackoverflow.com/a/64571090/14312712",children:"Install Nginx"}),", assuming we use Nginx-based Certbot"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"sudo apt install python3-certbot-nginx -y\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h5,{id:"creating-ssl-certificate-with-certbot",children:"Creating SSL Certificate with Certbot"}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsx)(n.p,{children:"HTTP:80 must be open on the server"})}),"\n",(0,s.jsxs)(n.p,{children:["After ",(0,s.jsx)(n.a,{href:"#installing-certbot-on-ubuntu",children:"Certbot has been installed"}),', run Certbot to create SSL certificates and modify\nNginx configuration file to automatically redirect HTTP requests to HTTPS. Or, add "certonly" to create the SSL\ncertificates without modifying system files:']}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"sudo certbot --nginx\n"})}),"\n",(0,s.jsx)(n.h5,{id:"configuring-reverse-proxy-on-nginx",children:"Configuring Reverse Proxy on Nginx"}),"\n",(0,s.jsxs)(n.p,{children:["After certificates have been deployed and Nginx has been configured properly for SSL by Certbot, it's time to configure\nrouting to direct HTTPS to local HTTP by modifying ",(0,s.jsx)(n.strong,{children:"/etc/nginx/sites-enabled/default"})," file."]}),"\n",(0,s.jsx)(n.p,{children:"Locate the section of"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-text",children:"server {\n    ...\n\n    listen [::]:443 ssl ipv6only=on;\n    listen 443 ssl;\n    ssl_certificate /etc/ssl/certs/server.crt;\n    ssl_certificate_key /etc/ssl/private/server.key;\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Add the proxy routing rule in the ",(0,s.jsx)(n.code,{children:"server"})," block above"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-text",children:"    location / {\n        proxy_pass http://localhost:8080;\n    }\n"})}),"\n",(0,s.jsx)(n.p,{children:"In this example, we have a webservice running at port 8080. Essentially this will redirect all HTTPS request to this\nlocal port, effectively enabling HTTPS on the webservice"}),"\n",(0,s.jsxs)(n.admonition,{type:"info",children:[(0,s.jsx)(n.p,{children:"The complete Nginx config file, in the end, will look something like:"}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-text",children:"server {\n    listen 80 default_server;\n    listen [::]:80 default_server;\n\n    root /var/www/html;\n\n    index index.html index.htm index.nginx-debian.html;\n\n    server_name _;\n\n    location / {\n        try_files $uri $uri/ =404;\n    }\n}\n\nserver {\n    root /var/www/html;\n\n    index index.html index.htm index.nginx-debian.html;\n    server_name ws-domain.com;\n\n    location / {\n        proxy_pass http://localhost:8080;\n    }\n\n    listen [::]:443 ssl ipv6only=on;\n    listen 443 ssl;\n    ssl_certificate /etc/ssl/certs/server.crt;\n    ssl_certificate_key /etc/ssl/private/server.key;\n}\nserver {\n    if ($host = ws-domain.com) {\n        return 301 https://$host$request_uri;\n    }\n\n    listen 80 ;\n    listen [::]:80 ;\n    server_name ws-domain.com;\n    return 404;\n}\n"})}),(0,s.jsxs)(n.p,{children:["In the config above, Nginx assumes the certificate file and its key file are located at ",(0,s.jsx)(n.strong,{children:"/etc/ssl/certs/server.crt"}),"\nand ",(0,s.jsx)(n.strong,{children:"/etc/ssl/private/server.key"})]})]}),"\n",(0,s.jsxs)(n.admonition,{type:"tip",children:[(0,s.jsx)(n.p,{children:"To update Nginx configuration after modifying the config file, simply run (on Ubuntu):"}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"sudo nginx -t\nsudo nginx -s reload\n"})}),(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"nginx -t"})," performs config file validation and, if successful, shall print something similar to"]}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"nginx: the configuration file ... syntax is ok\nnginx: configuration file ... test is successful\n"})}),(0,s.jsxs)(n.p,{children:["If config update doesn't seem to take errect while we were still seeing the ",(0,s.jsx)(n.code,{children:"ok"})," message above, try restarting the Nginx\nwith ",(0,s.jsx)(n.code,{children:"sudo /etc/init.d/nginx restart"})," and double check Nginx log:"]}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"sudo cat /var/log/nginx/error.log\n"})})]}),"\n",(0,s.jsx)(n.h2,{id:"deployment-via-screwdriver-cd",children:"Deployment via Screwdriver CD"}),"\n",(0,s.jsx)(n.h2,{id:"deployment-via-screwdriver-cd-running-locally",children:"Deployment via Screwdriver CD Running Locally"}),"\n",(0,s.jsxs)(n.p,{children:["Please walk through ",(0,s.jsx)(n.a,{href:"https://github.com/QubitPi/screwdriver-cd-in-a-box?tab=readme-ov-file#quickstart",children:'"Quickstart"'})," to\nstand up a local Screwdriver CD. If you have any questions, please pin us in\n",(0,s.jsx)(n.a,{href:"https://discord.com/widget?id=1060753787125514332",children:(0,s.jsx)(n.img,{src:"https://img.shields.io/discord/1060753787125514332?color=5865F2&logo=discord&logoColor=ffffff&style=for-the-badge",alt:"Discord"})})]})]})}function h(e={}){const{wrapper:n}={...(0,t.M)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},2172:(e,n,i)=>{i.d(n,{I:()=>o,M:()=>l});var s=i(1504);const t={},r=s.createContext(t);function l(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);