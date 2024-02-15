"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[4796],{7216:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>r,default:()=>d,frontMatter:()=>t,metadata:()=>l,toc:()=>c});var i=s(7624),a=s(2172);const t={sidebar_position:4,title:"Elastic Stack (ELK)"},r=void 0,l={id:"elk",title:"Elastic Stack (ELK)",description:"[//]: # (Copyright Jiaqi Liu)",source:"@site/docs/elk.md",sourceDirName:".",slug:"/elk",permalink:"/hashicorp-aws/docs/elk",draft:!1,unlisted:!1,editUrl:"https://github.com/QubitPi/hashicorp-aws/tree/master/docs/docs/elk.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"Elastic Stack (ELK)"},sidebar:"tutorialSidebar",previous:{title:"Machine Learning Model in REST API",permalink:"/hashicorp-aws/docs/machine-learning"},next:{title:"React App",permalink:"/hashicorp-aws/docs/react"}},o={},c=[{value:"Getting ELK Deployer",id:"getting-elk-deployer",level:2},{value:"Configuring Deployment",id:"configuring-deployment",level:2},{value:"Authenticating to AWS",id:"authenticating-to-aws",level:3},{value:"Defining Config Directory",id:"defining-config-directory",level:3},{value:"Preparing for SSL",id:"preparing-for-ssl",level:4},{value:"Nginx",id:"nginx",level:5},{value:"Defining Packer Variables",id:"defining-packer-variables",level:4},{value:"Defining Terraform Variables",id:"defining-terraform-variables",level:4},{value:"Defining Config Directory Path",id:"defining-config-directory-path",level:4},{value:"Running Script",id:"running-script",level:2},{value:"Post Setup in EC2 Instance",id:"post-setup-in-ec2-instance",level:3},{value:"Logstash",id:"logstash",level:4}];function h(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.M)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["Operations and SRE teams can use ",(0,i.jsx)(n.a,{href:"https://qubitpi.github.io/hashicorp-aws/",children:"hashicorp-aws"})," to safely manage ELK deployment using infrastructure as code\nmethodology, which allows us to peer-reviewed infrastructure changes in an automated and controlled fashion."]}),"\n",(0,i.jsx)(n.admonition,{title:"What is the ELK Stack?",type:"info",children:(0,i.jsxs)(n.p,{children:["The ELK stack is an acronym used to describe a stack that comprises three popular projects: ",(0,i.jsx)(n.a,{href:"https://qubitpi.github.io/elasticsearch/",children:"Elasticsearch"}),",\n",(0,i.jsx)(n.a,{href:"https://qubitpi.github.io/logstash/",children:"Logstash"}),", and ",(0,i.jsx)(n.a,{href:"https://qubitpi.github.io/kibana/",children:"Kibana"}),". Often referred to as Elasticsearch, the ELK stack gives us the ability to aggregate logs from\nall our systems and applications, analyze these logs, and create visualizations for application and infrastructure\nmonitoring, faster troubleshooting, security analytics, and more."]})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsxs)(n.strong,{children:["Assuming ELK is a ",(0,i.jsx)(n.em,{children:"non-frequently deployed"})," tech asset, ",(0,i.jsx)(n.a,{href:"https://qubitpi.github.io/hashicorp-aws/",children:"hashicorp-aws"})," makes it a semi-automated deployment"]}),"."]}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://qubitpi.github.io/hashicorp-aws/",children:"hashicorp-aws"})," deploys ELK as a ",(0,i.jsx)(n.a,{href:"https://aws.amazon.com/ec2/instance-types/t2/",children:"t2.large"})," instance. This is because all\nElasticsearch, Kibana, and Logstash are contained in it, which can cause\n",(0,i.jsx)(n.a,{href:"https://stackoverflow.com/a/50022217",children:"performance issue"})," in small instance. ",(0,i.jsx)(n.em,{children:"t2.large"}),", by experiment, is the smallest\nsize that supports smooth runtime. For that, ",(0,i.jsx)(n.strong,{children:"please be aware AWS credit charges shall incur afterward"})]})}),"\n",(0,i.jsx)(n.h2,{id:"getting-elk-deployer",children:"Getting ELK Deployer"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/QubitPi/hashicorp-aws.git\ncd hashicorp/elk\n"})}),"\n",(0,i.jsx)(n.h2,{id:"configuring-deployment",children:"Configuring Deployment"}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["People may jump directly to the end of ",(0,i.jsx)(n.a,{href:"#configuring-deployment",children:"this section"})," to see what the final config looks like"]})}),"\n",(0,i.jsx)(n.h3,{id:"authenticating-to-aws",children:"Authenticating to AWS"}),"\n",(0,i.jsx)(n.p,{children:"Before we can build the AMI, we need to provide our AWS credentials to Packer and Terraform. These credentials have\npermissions to create, modify, and delete AMI images and EC2 instances."}),"\n",(0,i.jsx)(n.p,{children:"To allow HashiCorp to access our IAM user credentials, set our AWS access key ID and secret key as environment\nvariables:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'AWS_ACCESS_KEY_ID="<YOUR_AWS_ACCESS_KEY_ID>"\nAWS_SECRET_ACCESS_KEY="<YOUR_AWS_SECRET_ACCESS_KEY>"\n'})}),"\n",(0,i.jsxs)(n.admonition,{type:"info",children:[(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.em,{children:"IAM user"})," associated with the credentials above must have the following ",(0,i.jsx)(n.a,{href:"https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_access-management.html",children:"AWS permissions policies"}),":"]}),(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"IAMFullAccess"}),"\n",(0,i.jsx)(n.li,{children:"AmazonEC2FullAccess"}),"\n",(0,i.jsx)(n.li,{children:"AmazonRoute53FullAccess"}),"\n"]})]}),"\n",(0,i.jsx)(n.h3,{id:"defining-config-directory",children:"Defining Config Directory"}),"\n",(0,i.jsx)(n.h4,{id:"preparing-for-ssl",children:"Preparing for SSL"}),"\n",(0,i.jsxs)(n.p,{children:["Please ",(0,i.jsx)(n.a,{href:"2-setup#ssl",children:"obtain SSL certificate and key"})," and put them in 2 files. Let's call them ",(0,i.jsx)(n.strong,{children:"server.crt"}),"\n(certificate) and ",(0,i.jsx)(n.strong,{children:"server.key"})," (certificate key)"]}),"\n",(0,i.jsx)(n.h5,{id:"nginx",children:"Nginx"}),"\n",(0,i.jsxs)(n.p,{children:["We will have a Nginx reverse proxy to serve HTTPS and have a config file called ",(0,i.jsx)(n.strong,{children:"nginx-ssl.conf"}),":"]}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["Replace ",(0,i.jsx)(n.code,{children:"my-domain.com"})," with the domain backed by the ",(0,i.jsx)(n.a,{href:"#preparing-for-ssl",children:"SSL"})," accordingly below"]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"server {\n    listen 80 default_server;\n    listen [::]:80 default_server;\n\n    root /var/www/html;\n\n    index index.html index.htm index.nginx-debian.html;\n\n    server_name _;\n\n    location / {\n        try_files $uri $uri/ =404;\n    }\n}\n\nserver {\n    root /var/www/html;\n\n    index index.html index.htm index.nginx-debian.html;\n    server_name my-domain.com;\n\n    location / {\n        proxy_pass http://localhost:5601;\n    }\n\n    listen [::]:443 ssl ipv6only=on;\n    listen 443 ssl;\n    ssl_certificate /etc/ssl/certs/server.crt;\n    ssl_certificate_key /etc/ssl/private/server.key;\n}\n\nserver {\n    if ($host = my-domain.com) {\n        return 301 https://$host$request_uri;\n    }\n\n    listen 80 ;\n    listen [::]:80 ;\n    server_name my-domain.com;\n    return 404;\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"defining-packer-variables",children:"Defining Packer Variables"}),"\n",(0,i.jsxs)(n.p,{children:["Create a file named ",(0,i.jsx)(n.strong,{children:"aws-elk.pkrvars.hcl"})," with the following contents:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-hcl",children:'aws_image_region           = "us-east-2"\nssl_cert_file_path         = "/absolute/path/to/server.crt"\nssl_cert_key_file_path     = "/absolute/path/to/server.key"\nssl_nginx_config_file_path = "/absolute/path/to/nginx-ssl.conf"\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"aws_image_region"})," is the region where ELK AMI will be published to. The published image will be ",(0,i.jsx)(n.em,{children:"private"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"ssl_cert_file_path"})," and ",(0,i.jsx)(n.strong,{children:"ssl_cert_key_file_path"})," above are the local absolute paths to SSL certificate file and\nSSL certificate key, respectively. They can be ",(0,i.jsx)(n.a,{href:"2-setup#ssl",children:"obtained via Certbot"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"ssl_nginx_config_file_path"})," is the local absolute path to the Nginx config file (see ",(0,i.jsx)(n.strong,{children:"an example"})," below) that\nconsumes the SSL certificate above and enables HTTPS."]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"defining-terraform-variables",children:"Defining Terraform Variables"}),"\n",(0,i.jsxs)(n.p,{children:["Create a file named ",(0,i.jsx)(n.strong,{children:"aws-elk.tfvars"})," with the following contents:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-hcl",children:'aws_deploy_region = "us-east-2"\nzone_id = "<AWS Route 53 Zone ID>"\nelk_doman = "myelk.mycompany.com"\nkey_pair_name = "<AWS keypair name for SSH>"\ninstance_name = "<AWS EC2 displayed instance name>"\nsecurity_group = "<AWS Security Group for the EC2 instance>"\n'})}),"\n",(0,i.jsx)(n.h4,{id:"defining-config-directory-path",children:"Defining Config Directory Path"}),"\n",(0,i.jsxs)(n.p,{children:["Put the ",(0,i.jsx)(n.em,{children:"aws-elk.pkrvars.hcl"})," and ",(0,i.jsx)(n.em,{children:"aws-elk.tfvars"})," in a directory. We will call it ",(0,i.jsx)(n.strong,{children:"ELK_HC_CONFIG_DIR"})," (along with\nour source code dir ",(0,i.jsx)(n.strong,{children:"ELK_HC_CONFIG_DIR"}),"):"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"ELK_HC_DIR=...\nELK_HC_CONFIG_DIR=/absolute/path/to/hashicorp/elk\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:["Make sure ",(0,i.jsx)(n.code,{children:"*_DIR"}),' path does not end with "/", for example, instead of ',(0,i.jsx)(n.code,{children:"ELK_HC_DIR=/home/ubuntu/config/"}),", we should use\n",(0,i.jsx)(n.code,{children:"ELK_HC_DIR=/home/ubuntu/config"})]})}),"\n",(0,i.jsx)(n.p,{children:"At the end of the day, the following environment variable (with example values) needs to be defined:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'export HC_DIR=/home/ubuntu/hashicorp-aws/hashicorp/elk\nexport HC_CONFIG_DIR=/home/ubuntu/hashicorp-aws/hashicorp/elk/config-files/\nexport AWS_ACCESS_KEY_ID="LOA8TQ2ZOSKFRLFSHDWC"\nexport AWS_SECRET_ACCESS_KEY="F9Wt082IXjW426QGRdvrsowFhHARt85YlJ2WURri"\n'})}),"\n",(0,i.jsx)(n.h2,{id:"running-script",children:"Running Script"}),"\n",(0,i.jsx)(n.p,{children:"After running"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"./deploy.sh\n"})}),"\n",(0,i.jsxs)(n.p,{children:["record the ",(0,i.jsxs)(n.strong,{children:["Elasticsearch password (for ",(0,i.jsx)(n.em,{children:"elastic"})," user)"]})," at command line prompt. For example"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"==> install-elk.amazon-ebs.elk: + sudo /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic\n==> install-elk.amazon-ebs.elk: + yes\n    install-elk.amazon-ebs.elk: This tool will reset the password of the [elastic] user to an autogenerated value.\n    install-elk.amazon-ebs.elk: The password will be printed in the console.\n    install-elk.amazon-ebs.elk:\n    install-elk.amazon-ebs.elk:\n    install-elk.amazon-ebs.elk: Password for the [elastic] user successfully reset.\n    install-elk.amazon-ebs.elk: New value: dsrg34IKHU787iud=dio\n"})}),"\n",(0,i.jsxs)(n.p,{children:["In this case, the password is ",(0,i.jsx)(n.strong,{children:"dsrg34IKHU787iud=dio"})," which is shown in the last line of the output above."]}),"\n",(0,i.jsx)(n.h3,{id:"post-setup-in-ec2-instance",children:"Post Setup in EC2 Instance"}),"\n",(0,i.jsx)(n.p,{children:"As we've mentioned in the beginning, this is a semi-deployment and we still need to SSH into the box to manually\ngenerate Kibana token & verification code. This will make the automated deploymentl logic simple and easy to maintain"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'sudo /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token --scope kibana --url "https://localhost:9200"\nsudo /usr/share/kibana/bin/kibana-verification-code\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Now we can visit ",(0,i.jsx)(n.code,{children:"https://myelk.mycompany.com"})," to enter the token and verification code to access our ELK instance."]}),"\n",(0,i.jsx)(n.h4,{id:"logstash",children:"Logstash"}),"\n",(0,i.jsx)(n.p,{children:"Logstash, at this moment, supports redirecting log lines from Filebeat to Elasticsearch and, similar to the\ntoken and verification above, needs to be setup manually."}),"\n",(0,i.jsxs)(n.p,{children:["Create a file named ",(0,i.jsx)(n.strong,{children:"logstash-filebeat.conf"})," in the default location chosen by Logstash:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"sudo nano /usr/share/logstash/logstash-filebeat.conf\n"})}),"\n",(0,i.jsx)(n.p,{children:"Copy and paste the following contents into the file"}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:["Replace the ",(0,i.jsx)(n.code,{children:"<password for user 'elastic'>"})," accordingly. If the user is ",(0,i.jsx)(n.em,{children:"elastic"}),", which is the case here, the password\nhas been generated during the ",(0,i.jsx)(n.a,{href:"#building-ami-image",children:"AMI image building phase"})]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:'input {\n    beats {\n        port => "5044"\n    }\n}\n\noutput {\n    elasticsearch {\n        hosts => [ "https://localhost:9200" ]\n\n        ssl_certificate_verification => false\n\n        user => "elastic"\n\n        password => "<password for user \'elastic\'>"\n    }\n}\n'})}),"\n",(0,i.jsx)(n.p,{children:"Start Logstash with:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"sudo /usr/share/logstash/bin/logstash -f logstash-filebeat.conf --config.reload.automatic\n"})}),"\n",(0,i.jsx)(n.p,{children:"or with nohup at background:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"nohup sudo /usr/share/logstash/bin/logstash -f logstash-filebeat.conf --config.reload.automatic &\n"})})]})}function d(e={}){const{wrapper:n}={...(0,a.M)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},2172:(e,n,s)=>{s.d(n,{I:()=>l,M:()=>r});var i=s(1504);const a={},t=i.createContext(a);function r(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);