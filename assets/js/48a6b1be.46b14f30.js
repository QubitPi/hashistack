"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[8903],{1909:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>l,contentTitle:()=>r,default:()=>m,frontMatter:()=>t,metadata:()=>o,toc:()=>c});var n=s(3860),a=s(5639);const t={sidebar_position:1,title:"General Deployment"},r=void 0,o={id:"docker-mailserver/index",title:"General Deployment",description:"General Deployments",source:"@site/docs/docker-mailserver/index.md",sourceDirName:"docker-mailserver",slug:"/docker-mailserver/",permalink:"/docs/docker-mailserver/",draft:!1,unlisted:!1,editUrl:"https://github.com/QubitPi/hashicorp-aws/tree/master/docs/docs/docker-mailserver/index.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"General Deployment"},sidebar:"tutorialSidebar",previous:{title:"Docker Mailserver",permalink:"/docs/category/docker-mailserver"},next:{title:"Deployment via Screwdriver CD",permalink:"/docs/docker-mailserver/screwdriver-cd-deployment"}},l={},c=[{value:"General Deployments",id:"general-deployments",level:2},{value:"Defining Packer Variables",id:"defining-packer-variables",level:3},{value:"Defining Terraform Variables",id:"defining-terraform-variables",level:3},{value:"Building AMI Image",id:"building-ami-image",level:3},{value:"Deploying to EC2",id:"deploying-to-ec2",level:3},{value:"Deployment via Screwdriver CD",id:"deployment-via-screwdriver-cd",level:2},{value:"Deployment via HACP",id:"deployment-via-hacp",level:2},{value:"FAQ",id:"faq",level:2},{value:"How to Add New Email Accounts or Update Email Password",id:"how-to-add-new-email-accounts-or-update-email-password",level:3},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Emails Not Sent to External Emails",id:"emails-not-sent-to-external-emails",level:3}];function d(e){const i={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.h2,{id:"general-deployments",children:"General Deployments"}),"\n",(0,n.jsxs)(i.admonition,{type:"info",children:[(0,n.jsx)(i.p,{children:"Please complete the following two prerequisite setups before preceding"}),(0,n.jsxs)(i.ol,{children:["\n",(0,n.jsxs)(i.li,{children:[(0,n.jsx)(i.a,{href:"../setup#setup",children:"general setup"})," (without ",(0,n.jsx)(i.a,{href:"../setup#optional-setup-ssl",children:"SSL setup"}),")"]}),"\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"https://qubitpi.github.io/docker-mailserver/edge/usage/#minimal-dns-setup",children:"DNS setup"})}),"\n"]})]}),"\n",(0,n.jsx)(i.h3,{id:"defining-packer-variables",children:"Defining Packer Variables"}),"\n",(0,n.jsxs)(i.p,{children:["Create a ",(0,n.jsx)(i.a,{href:"https://packer.qubitpi.org/packer/guides/hcl/variables#from-a-file",children:"HashiCorp Packer variable values file"})," named ",(0,n.jsx)(i.strong,{children:"aws-docker-mailserver.pkrvars.hcl"})," under\n",(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.a,{href:"https://github.com/QubitPi/hashicorp-aws/tree/master/hashicorp/docker-mailserver/images",children:"hashicorp-aws/hashicorp/docker-mailserver/images"})})," with the following contents:"]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-hcl",metastring:'title="hashicorp-aws/hashicorp/docker-mailserver/images/aws-docker-mailserver.auto.pkrvars.hcl"',children:'ami_region          = "us-east-1"\nami_name            = "my-docker-mailserver-ami"\nbase_domain         = "mycompany.com"\nssl_cert_base64     = "YXNkZnNnaHRkeWhyZXJ3ZGZydGV3ZHNmZ3RoeTY0cmV3ZGZyZWd0cmV3d2ZyZw=="\nssl_cert_key_base64 = "MzI0NXRnZjk4dmJoIGNsO2VbNDM1MHRdzszNDM1b2l0cmo="\n'})}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"ami_region"})," is the ",(0,n.jsx)(i.a,{href:"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Availability",children:"region"})," where docker-mailserver ",(0,n.jsx)(i.a,{href:"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html",children:"AMI"})," will be published to. The published\nimage will be ",(0,n.jsx)(i.em,{children:"private"})]}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"ami_name"})," is the published ",(0,n.jsx)(i.a,{href:"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html",children:"AMI"})," name; it can be arbitrary"]}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"base_domain"})," is the base domain name of the MX record. For example, if base domain is 'mycompany.com', the generated\nMX record will be 'mail.mycompany.com'"]}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"ssl_cert_base64"})," is a ",(0,n.jsx)(i.strong,{children:"base64 encoded"})," string of the content of ",(0,n.jsx)(i.a,{href:"../setup#optional-setup-ssl",children:"SSL certificate file"}),"\nfor the MX record domain, i.e. 'mail.mycompany.com' given the ",(0,n.jsx)(i.code,{children:"base_domain"})," is 'mycompany.com'"]}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"ssl_cert_key_base64"})," is a ",(0,n.jsx)(i.strong,{children:"base64 encoded"})," string of the content of\n",(0,n.jsx)(i.a,{href:"../setup#optional-setup-ssl",children:"SSL certificate key file"})," for the MX record domain, i.e. 'mail.mycompany.com' given the\n",(0,n.jsx)(i.code,{children:"base_domain"})," is 'mycompany.com'"]}),"\n",(0,n.jsx)(i.admonition,{type:"info",children:(0,n.jsxs)(i.p,{children:["hashicorp-aws ",(0,n.jsx)(i.a,{href:"https://qubitpi.github.io/docker-mailserver/edge/config/security/ssl/",children:"supports SSL"})," with the\n",(0,n.jsx)(i.a,{href:"https://docker-mailserver.github.io/docker-mailserver/latest/config/security/ssl/#lets-encrypt-recommended",children:"Bring Your Own Certificates"})," (certbot) option"]})}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:["(Optional) ",(0,n.jsx)(i.code,{children:"instance_type"}),": is the ",(0,n.jsx)(i.a,{href:"https://aws.amazon.com/ec2/instance-types/",children:"AWS EC2 instance type"}),' building this image. hashicorp-aws uses "t2.micro" as\ndefault value if this value is unspecified']}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(i.h3,{id:"defining-terraform-variables",children:"Defining Terraform Variables"}),"\n",(0,n.jsxs)(i.p,{children:["Create a ",(0,n.jsx)(i.a,{href:"https://terraform.qubitpi.org/terraform/language/values/variables#variable-definitions-tfvars-files",children:"HashiCorp Terraform variable values file"})," named ",(0,n.jsx)(i.strong,{children:"aws-docker-mailserver.tfvars"})," under\n",(0,n.jsx)(i.strong,{children:(0,n.jsx)(i.a,{href:"https://github.com/QubitPi/hashicorp-aws/tree/master/hashicorp/docker-mailserver/instances",children:"hashicorp-aws/hashicorp/docker-mailserver/instances"})})," with the following contents:"]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-hcl",metastring:'title="hashicorp-aws/hashicorp/docker-mailserver/instances/aws-docker-mailserver.auto.tfvars"',children:'aws_ec2_region       = "us-east-1"\nami_name             = "my-docker-mailserver-ami"\ninstance_name        = "My docker-mailserver instance"\nkey_pair_name        = "My SSH keypair name"\nsecurity_groups      = ["My docker-mailserver Security Group"]\nbase_domain          = "mycompany.com"\nroute_53_zone_id     = "9DQXLTNSN7ZX9P8V2KZII"\nfirst_email          = "jack@mycompany.com"\nfirst_email_password = "sdfeo9uig&^&rf8u"\n'})}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"aws_ec2_region"})," is the ",(0,n.jsx)(i.a,{href:"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Availability",children:"EC2 runtime region"})," where docker-mailserver EC2 instance will be deployed\ninto"]}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"ami_name"})," is the name of the published AMI; ",(0,n.jsxs)(i.strong,{children:["it must be the same as the ",(0,n.jsx)(i.code,{children:"ami_name"})," in\n",(0,n.jsx)(i.a,{href:"#defining-packer-variables",children:"Packer variable file"})]})]}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"instance_name"})," is the deployed EC2 name as appeared in the instance list of AWS console; it can be arbitrary"]}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"key_pair_name"})," is the name of\n",(0,n.jsx)(i.a,{href:"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html",children:"AWS EC2 key pair"})," bound to this docker-mailserver instance. We can use this key pair to later ssh into the instance\nfor admin management purposes"]}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"security_groups"})," is the list of ",(0,n.jsx)(i.a,{href:"https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",children:"AWS Security Group"})," ",(0,n.jsx)(i.em,{children:"names"})," to associate with (yes, not ID, but name...)"]}),"\n",(0,n.jsx)(i.admonition,{type:"tip",children:(0,n.jsxs)(i.p,{children:["The security group must open all the ports mentioned ",(0,n.jsx)(i.a,{href:"https://qubitpi.github.io/docker-mailserver/edge/config/security/understanding-the-ports/#overview-of-email-ports",children:"docker-mailserver's documentation"})]})}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"base_domain"})," is the base domain name of the MX record. For example, if base domain is 'mycompany.com', the generated\nMX record will be 'mail.mycompany.com'"]}),"\n",(0,n.jsx)(i.admonition,{type:"note",children:(0,n.jsxs)(i.p,{children:["hashicorp-aws will bind a ",(0,n.jsx)(i.em,{children:"private"})," IP address to this domain because\n",(0,n.jsx)(i.a,{href:"https://serverfault.com/a/967483",children:"AWS security groups works for private IP only for DNS resolving"}),"."]})}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"route_53_zone_id"}),' is the AWS Route 53 hosted Zone ID that hosts the domain "mail.mycompany.com"']}),"\n",(0,n.jsxs)(i.admonition,{type:"tip",children:[(0,n.jsx)(i.p,{children:"To find the zone ID in AWS Route 53, we can:"}),(0,n.jsxs)(i.ol,{children:["\n",(0,n.jsx)(i.li,{children:"Sign in to the AWS Management Console"}),"\n",(0,n.jsxs)(i.li,{children:["Open the Route 53 console at ",(0,n.jsx)(i.a,{href:"https://console.aws.amazon.com/route53/",children:"https://console.aws.amazon.com/route53/"})]}),"\n",(0,n.jsx)(i.li,{children:"Select Hosted zones in the navigation pane"}),"\n",(0,n.jsx)(i.li,{children:"Find the requested ID in the top level Hosted Zones summary in the Route 53 section"}),"\n"]})]}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"first_email"})," is the email used for mail server startup."]}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:"first_email_password"})," is the password of the email for mail server startup"]}),"\n",(0,n.jsx)(i.admonition,{type:"tip",children:(0,n.jsx)(i.p,{children:"On first start, we will need to add at least one email account. The provided first email will be used for that and\ncan be used for sending/receiving emails immediately after deployment"})}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:["\n",(0,n.jsxs)(i.p,{children:["(Optional) ",(0,n.jsx)(i.code,{children:"instance_type"}),": is the ",(0,n.jsx)(i.a,{href:"https://aws.amazon.com/ec2/instance-types/",children:"AWS EC2 instance type"}),' running the EC2 instance. hashicorp-aws uses "t2.micro" as\ndefault value if this value is unspecified']}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(i.h3,{id:"building-ami-image",children:"Building AMI Image"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-console",children:'cd hashicorp-aws/hashicorp/docker-mailserver/images\npacker init .\npacker validate -var "skip_create_ami=true" .\npacker build -var "skip_create_ami=false" .\n'})}),"\n",(0,n.jsx)(i.h3,{id:"deploying-to-ec2",children:"Deploying to EC2"}),"\n",(0,n.jsx)(i.admonition,{type:"caution",children:(0,n.jsxs)(i.p,{children:["Depending on the ",(0,n.jsx)(i.a,{href:"#defining-packer-variables",children:"AMI"})," and ",(0,n.jsx)(i.a,{href:"#defining-terraform-variables",children:"EC2"})," configs, ",(0,n.jsx)(i.strong,{children:"please be aware\nAWS credit charges shall incur after the following commands execute"})]})}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-console",children:"cd ../instances/\nterraform init\nterraform validate\nterraform apply -auto-approve\n"})}),"\n",(0,n.jsx)(i.h2,{id:"deployment-via-screwdriver-cd",children:"Deployment via Screwdriver CD"}),"\n",(0,n.jsxs)(i.p,{children:["hashicorp-aws supports deployment using ",(0,n.jsx)(i.a,{href:"screwdriver-cd-deployment",children:"Screwdriver CD"}),". Please check it out. ",(0,n.jsx)("img",{src:"https://github.com/QubitPi/QubitPi/blob/master/img/8%E5%A5%BD.gif?raw=true",height:"40px"})]}),"\n",(0,n.jsx)(i.h2,{id:"deployment-via-hacp",children:"Deployment via HACP"}),"\n",(0,n.jsx)(i.admonition,{type:"tip",children:(0,n.jsx)(i.p,{children:"Please try our HACP platform to deploy a docker-mailserver instance. It gives us one-click experience that helps us\nstand up docker-mailserver in a minute."})}),"\n",(0,n.jsx)(i.h2,{id:"faq",children:"FAQ"}),"\n",(0,n.jsx)(i.h3,{id:"how-to-add-new-email-accounts-or-update-email-password",children:"How to Add New Email Accounts or Update Email Password"}),"\n",(0,n.jsxs)(i.p,{children:["Use ",(0,n.jsx)(i.a,{href:"https://qubitpi.github.io/docker-mailserver/edge/config/setup.sh/",children:"setup.sh"})]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-console",children:"./setup.sh email add <email> <password>\n./setup.sh email update <email> <password>\n./setup.sh email del <email>\n./setup.sh email list\n"})}),"\n",(0,n.jsx)(i.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,n.jsx)(i.h3,{id:"emails-not-sent-to-external-emails",children:"Emails Not Sent to External Emails"}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsxs)(i.em,{children:["While sending emails to external emails such as a working gmail, it does not go through, usually complaining of\n",(0,n.jsx)(i.strong,{children:"connection timed out"}),". An example error log looks like the following"]}),"."]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-console",children:"Sep 26 02:47:21 mail postfix/qmgr[1329]: 8167B7F0B1: from=<iam@zp4rker.com>, size=2190, nrcpt=1 (queue active)\nSep 26 02:47:21 mail amavis[1223]: (01223-02) Passed CLEAN {RelayedOpenRelay}, [110.141.179.150]:60565 [110.141.179.150] <iam@zp4rker.com> -> <iamzp4rker@gmail.com>, Queue-ID: E27927F0C0, Message-ID: <2b0b8cff-b4e5-4f01-b778-9b5d7d76f988@spark>, mail_id: dGghh_AqJFO4, Hits: -0.201, size: 1959, queued_as: 8167B7F0B1, 1501 ms\nSep 26 02:47:21 mail postfix/smtp-amavis/smtp[2330]: E27927F0C0: to=<iamzp4rker@gmail.com>, relay=127.0.0.1[127.0.0.1]:10024, delay=1.6, delays=0.12/0.01/0/1.5, dsn=2.0.0, status=sent (250 2.0.0 from MTA(smtp:[127.0.0.1]:10025): 250 2.0.0 Ok: queued as 8167B7F0B1)\nSep 26 02:47:21 mail postfix/qmgr[1329]: E27927F0C0: removed\nSep 26 02:47:22 mail postfix/smtp[2339]: connect to gmail-smtp-in.l.google.com[2404:6800:4003:c0f::1a]:25: Cannot assign requested address\nSep 26 02:47:43 mail postfix/smtp[2307]: connect to gmail-smtp-in.l.google.com[142.251.10.27]:25: Connection timed out\nSep 26 02:47:43 mail postfix/smtp[2307]: connect to gmail-smtp-in.l.google.com[2404:6800:4003:c0f::1b]:25: Cannot assign requested address\nSep 26 02:47:43 mail postfix/smtp[2307]: connect to alt1.gmail-smtp-in.l.google.com[2607:f8b0:400e:c00::1a]:25: Cannot assign requested address\nSep 26 02:47:51 mail dovecot: imap(iam@zp4rker.com)<2220><QibNiYvpkexujbOW>: Connection closed (EXPUNGE finished 31.220 secs ago) in=836 out=6270 deleted=1 expunged=1 trashed=0 hdr_count=3 hdr_bytes=64 body_count=0 body_bytes=0\nSep 26 02:47:51 mail dovecot: imap(iam@zp4rker.com)<2219><FRTNiYvpkOxujbOW>: Connection closed (UID SEARCH finished 31.145 secs ago) in=4407 out=14821 deleted=0 expunged=0 trashed=0 hdr_count=8 hdr_bytes=264 body_count=0 body_bytes=0\nSep 26 02:47:52 mail postfix/smtp[2339]: connect to gmail-smtp-in.l.google.com[142.251.10.26]:25: Connection timed out\nSep 26 02:48:13 mail postfix/smtp[2307]: connect to alt1.gmail-smtp-in.l.google.com[173.194.202.27]:25: Connection timed out\nSep 26 02:48:18 mail postfix/smtpd-amavis/smtpd[1579]: timeout after END-OF-MESSAGE from localhost[127.0.0.1]\nSep 26 02:48:18 mail postfix/smtpd-amavis/smtpd[1579]: disconnect from localhost[127.0.0.1] ehlo=1 mail=1 rcpt=1 data=1 commands=4\nSep 26 02:48:22 mail postfix/smtp[2339]: connect to alt1.gmail-smtp-in.l.google.com[173.194.202.27]:25: Connection timed out\nSep 26 02:48:22 mail postfix/smtp[2339]: connect to alt1.gmail-smtp-in.l.google.com[2607:f8b0:400e:c00::1b]:25: Cannot assign requested address\nSep 26 02:48:22 mail postfix/smtp[2339]: connect to alt2.gmail-smtp-in.l.google.com[2607:f8b0:4023:c0b::1a]:25: Cannot assign requested address\nSep 26 02:48:22 mail postfix/smtp[2339]: 8167B7F0B1: to=<iamzp4rker@gmail.com>, relay=none, delay=61, delays=0.01/0.01/61/0, dsn=4.4.1, status=deferred (connect to alt2.gmail-smtp-in.l.google.com[2607:f8b0:4023:c0b::1a]:25: Cannot assign requested address)\nSep 26 02:48:25 mail postfix/postscreen[2537]: CONNECT from [170.187.162.6]:61000 to [172.25.0.2]:25\nSep 26 02:48:31 mail postfix/postscreen[2537]: PASS NEW [170.187.162.6]:61000\nSep 26 02:48:31 mail postfix/smtpd[2554]: connect from cloud-scanner-a68296bf.internet-research-project.net[170.187.162.6]\nSep 26 02:48:32 mail postfix/smtpd[2554]: lost connection after AUTH from cloud-scanner-a68296bf.internet-research-project.net[170.187.162.6]\nSep 26 02:48:32 mail postfix/smtpd[2554]: disconnect from cloud-scanner-a68296bf.internet-research-project.net[170.187.162.6] auth=0/1 commands=0/1\nSep 26 02:48:43 mail postfix/smtp[2307]: connect to alt2.gmail-smtp-in.l.google.com[142.250.141.26]:25: Connection timed out\nSep 26 02:48:43 mail postfix/smtp[2307]: B00297F0A3: to=<iamzp4rker@gmail.com>, relay=none, delay=623, delays=532/0.01/91/0, dsn=4.4.1, status=deferred (connect to alt2.gmail-smtp-in.l.google.com[142.250.141.26]:25: Connection timed out)\nSep 26 02:48:50 mail dovecot: imap-login: Login: user=<iam@zp4rker.com>, method=PLAIN, rip=110.141.179.150, lip=172.25.0.2, mpid=2618, TLS, session=<NIhEkYvpo+xujbOW>\nSep 26 02:48:50 mail dovecot: imap-login: Login: user=<iam@zp4rker.com>, method=PLAIN, rip=110.141.179.150, lip=172.25.0.2, mpid=2619, TLS, session=<Ur9EkYvpouxujbOW>\n"})}),"\n",(0,n.jsxs)(i.p,{children:["This is a connection issue. The server is not able to establish outgoing connections on port tcp/25. This might be just\na missing firewall rule, or the\n",(0,n.jsx)(i.a,{href:"https://repost.aws/knowledge-center/ec2-port-25-throttle",children:"cloud provider blocks port 25, which is the case on AWS"}),".\nYou can manually test the connection with ",(0,n.jsx)(i.code,{children:"nc alt1.gmail-smtp-in.l.google.com 25"})," on our server to verify that."]}),"\n",(0,n.jsxs)(i.p,{children:["In the case of AWS, we will need to sign in to our AWS account, and then open the\n",(0,n.jsx)(i.a,{href:"https://aws-portal.amazon.com/gp/aws/html-forms-controller/contactus/ec2-email-limit-rdns-request",children:"Request to remove email sending limitations form"}),"."]})]})}function m(e={}){const{wrapper:i}={...(0,a.a)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},5639:(e,i,s)=>{s.d(i,{Z:()=>o,a:()=>r});var n=s(1733);const a={},t=n.createContext(a);function r(e){const i=n.useContext(t);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),n.createElement(t.Provider,{value:i},e.children)}}}]);