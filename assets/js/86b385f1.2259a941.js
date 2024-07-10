"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[8493],{30:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>n,metadata:()=>l,toc:()=>d});var s=i(3860),r=i(5639);const n={sidebar_position:2,title:"Deployment via Screwdriver CD",description:"Deploying ELK via Screwdriver CD Template"},a="ELK Release Definition Template",l={id:"elk/screwdriver-cd-deployment",title:"Deployment via Screwdriver CD",description:"Deploying ELK via Screwdriver CD Template",source:"@site/docs/elk/screwdriver-cd-deployment.md",sourceDirName:"elk",slug:"/elk/screwdriver-cd-deployment",permalink:"/docs/elk/screwdriver-cd-deployment",draft:!1,unlisted:!1,editUrl:"https://github.com/QubitPi/hashicorp-aws/tree/master/docs/docs/elk/screwdriver-cd-deployment.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Deployment via Screwdriver CD",description:"Deploying ELK via Screwdriver CD Template"},sidebar:"tutorialSidebar",previous:{title:"General Deployment",permalink:"/docs/elk/"},next:{title:"Docker Mailserver",permalink:"/docs/category/docker-mailserver"}},c={},d=[{value:"How to Use This Template",id:"how-to-use-this-template",level:2},{value:"Installing Template in Screwdriver",id:"installing-template-in-screwdriver",level:3},{value:"Using the Template",id:"using-the-template",level:3}];function o(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"elk-release-definition-template",children:"ELK Release Definition Template"}),"\n",(0,s.jsxs)(t.p,{children:["hashicorp-aws offer a ",(0,s.jsx)(t.a,{href:"https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates",children:"Screwdriver template"})," that deploys\n",(0,s.jsx)(t.a,{href:"https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure",children:"immutable"})," instances of ELK to AWS. It uses the ",(0,s.jsx)(t.a,{href:"https://github.com/QubitPi/screwdriver-cd-template-main",children:"screwdriver-template-main npm package"})," to\nassist with template validation, publishing, and tagging. The template tags the latest versions with the ",(0,s.jsx)(t.code,{children:"latest"})," tag."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Error loading elk-deployment-diagram.png",src:i(5014).Z+"",width:"1404",height:"994"})}),"\n",(0,s.jsx)(t.h2,{id:"how-to-use-this-template",children:"How to Use This Template"}),"\n",(0,s.jsx)(t.h3,{id:"installing-template-in-screwdriver",children:"Installing Template in Screwdriver"}),"\n",(0,s.jsx)(t.p,{children:"The template needs to be installed first in Screwdriver running instance. Installation has two parts:"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://github.com/QubitPi/hashicorp-aws/tree/master/adaptors/screwdriver-cd/templates/elk-sd-template.yaml",children:"the template"})}),"\n",(0,s.jsxs)(t.li,{children:["Some ",(0,s.jsx)(t.a,{href:"https://github.com/QubitPi/screwdriver-cd-commands",children:"pre-defined Screwdriver commands"})," that this template uses"]}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["The template and the commands can be automatically installed using the regular ",(0,s.jsx)(t.a,{href:"https://github.com/QubitPi/hashicorp-aws/tree/master/screwdriver.yaml",children:"screwdriver.yaml"})," config file by\nfollowing the steps below:"]}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.a,{href:"https://qubitpi.github.io/screwdriver-cd-guide/user-guide/quickstart#create-a-new-pipeline",children:"Create a Screwdriver pipeline"})," with the repository link being\n",(0,s.jsx)(t.code,{children:"https://github.com/QubitPi/hashicorp-aws.git"})]}),"\n",(0,s.jsx)(t.li,{children:"Trigger a pipeline run, which will install the templates and commands automatically. Wait the pipeline to finish\nrunning."}),"\n",(0,s.jsxs)(t.li,{children:["The installed template and commands can be found in ",(0,s.jsx)(t.a,{href:"https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates#finding-templates",children:"Templates page"})," and\n",(0,s.jsx)(t.a,{href:"https://screwdriver-docs.qubitpi.org/user-guide/commands#finding-commands",children:"Commands page"}),", respectively"]}),"\n"]}),"\n",(0,s.jsx)(t.h3,{id:"using-the-template",children:"Using the Template"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates#using-a-template",children:"Create a Screwdriver pipeline that uses this template"})," with the\n",(0,s.jsx)(t.code,{children:"screwdriver.yaml"})," file of"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-yaml",children:"---\njobs:\n  main:\n    requires: [~pr, ~commit]\n    template: QubitPi/elk-release-definition-template@latest\n"})}),"\n",(0,s.jsxs)(t.p,{children:["The following ",(0,s.jsx)(t.a,{href:"https://screwdriver-docs.qubitpi.org/user-guide/configuration/secrets",children:"Screwdriver Secrets"})," needs to be defined before running the pipeline:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"../setup#aws",children:(0,s.jsx)(t.code,{children:"AWS_ACCESS_KEY_ID"})})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"../setup#aws",children:(0,s.jsx)(t.code,{children:"AWS_SECRET_ACCESS_KEY"})})}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"SSL_CERTIFICATE"})," - the content of SSL certificate file serving HTTPS-enabled DNS name of the EC2 hosting our ELK\ninstance. This is the same as the ",(0,s.jsx)(t.code,{children:"SSL_CERTIFICATE"})," from the\n",(0,s.jsx)(t.a,{href:"../setup#optional-setup-ssl",children:"general SSL setup of hashicorp-aws"})]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"SSL_CERTIFICATE_KEY"})," - the content of SSL certificate key file serving HTTPS-enabled DNS name of the EC2 hosting our\nELK instance. This is the same as the ",(0,s.jsx)(t.code,{children:"SSL_CERTIFICATE_KEY"})," from the\n",(0,s.jsx)(t.a,{href:"../setup#optional-setup-ssl",children:"general SSL setup of hashicorp-aws"})]}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["To run the pipeline, fill in the AWS-related ",(0,s.jsx)(t.strong,{children:"parameters"})," first"]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Error loading elk-release-definition-template-parameters.png",src:i(2731).Z+"",width:"835",height:"1385"})}),"\n",(0,s.jsxs)(t.p,{children:['Then hit "',(0,s.jsx)(t.strong,{children:"Submit"}),'" to start deploying.']}),"\n",(0,s.jsxs)(t.admonition,{type:"warning",children:[(0,s.jsxs)(t.p,{children:["Once the pipeline deploys ELK, we must remember to do the\n",(0,s.jsx)(t.a,{href:"index#post-setup-in-ec2-instance",children:"post setup in EC2 instance"}),"."]}),(0,s.jsxs)(t.p,{children:["The password for user 'elastic' can be found ",(0,s.jsx)(t.em,{children:"packer-build"})," step logs. Here is an example:"]}),(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Error loading elastic-password-from-log.png",src:i(4907).Z+"",width:"3584",height:"1925"})})]})]})}function h(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},4907:(e,t,i)=>{i.d(t,{Z:()=>s});const s=i.p+"assets/images/elastic-password-from-log-63b8b57e4befaf2ec8e27ce008c89806.png"},5014:(e,t,i)=>{i.d(t,{Z:()=>s});const s=i.p+"assets/images/elk-deployment-diagram-c6144ad9e3b78ea9e9a1b6ec8d3d3108.png"},2731:(e,t,i)=>{i.d(t,{Z:()=>s});const s=i.p+"assets/images/elk-release-definition-template-parameters-f6a1cc4c839a0a80f130ab12d0fd0a3c.png"},5639:(e,t,i)=>{i.d(t,{Z:()=>l,a:()=>a});var s=i(1733);const r={},n=s.createContext(r);function a(e){const t=s.useContext(n);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),s.createElement(n.Provider,{value:t},e.children)}}}]);