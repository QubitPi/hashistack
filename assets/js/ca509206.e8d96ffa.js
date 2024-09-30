"use strict";(self.webpackChunkhashistack=self.webpackChunkhashistack||[]).push([[5600],{7852:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var n=i(3860),a=i(9162);const r={sidebar_position:2,title:"Deployment via Screwdriver CD",description:"Deploying Kong API Gateway via Screwdriver CD Template"},s="Kong API Gateway Release Definition Template",l={id:"kong-api-gateway/screwdriver-cd-deployment",title:"Deployment via Screwdriver CD",description:"Deploying Kong API Gateway via Screwdriver CD Template",source:"@site/docs/kong-api-gateway/screwdriver-cd-deployment.md",sourceDirName:"kong-api-gateway",slug:"/kong-api-gateway/screwdriver-cd-deployment",permalink:"/docs/kong-api-gateway/screwdriver-cd-deployment",draft:!1,unlisted:!1,editUrl:"https://github.com/QubitPi/hashistack/tree/master/docs/docs/kong-api-gateway/screwdriver-cd-deployment.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Deployment via Screwdriver CD",description:"Deploying Kong API Gateway via Screwdriver CD Template"},sidebar:"tutorialSidebar",previous:{title:"General Deployment",permalink:"/docs/kong-api-gateway/"},next:{title:"ELK",permalink:"/docs/category/elk"}},o={},d=[{value:"How to Use This Template",id:"how-to-use-this-template",level:2},{value:"Installing the Template",id:"installing-the-template",level:3},{value:"Creating Pipeline from Template",id:"creating-pipeline-from-template",level:3},{value:"Configuring Pipeline",id:"configuring-pipeline",level:3},{value:"Running Pipeline",id:"running-pipeline",level:3}];function c(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"kong-api-gateway-release-definition-template",children:"Kong API Gateway Release Definition Template"}),"\n",(0,n.jsxs)(t.p,{children:["hashistack offer a ",(0,n.jsx)(t.a,{href:"https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates",children:"Screwdriver template"})," that deploys an\n",(0,n.jsx)(t.a,{href:"https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure",children:"immutable"})," instance of ",(0,n.jsx)(t.a,{href:"https://qubitpi.github.io/docs.konghq.com/",children:"Kong API Gateway"})," to AWS. It uses the\n",(0,n.jsx)(t.a,{href:"https://github.com/QubitPi/screwdriver-cd-template-main",children:"screwdriver-template-main npm package"})," to assist with template validation, publishing, and tagging. This template tags\nthe latest versions with the ",(0,n.jsx)(t.code,{children:"latest"})," tag."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"Error loading kong-ports-diagram.png",src:i(5572).Z+"",width:"1662",height:"1064"})}),"\n",(0,n.jsx)(t.h2,{id:"how-to-use-this-template",children:"How to Use This Template"}),"\n",(0,n.jsx)(t.p,{children:"Please follow the sections below to get started using this template"}),"\n",(0,n.jsx)(t.h3,{id:"installing-the-template",children:"Installing the Template"}),"\n",(0,n.jsxs)(t.p,{children:["Please follow the ",(0,n.jsx)(t.a,{href:"../adaptors/screwdriver-cd#installing-templates-and-commands",children:"instructions"})," here and make sure, once\ndone, we are able to see the two following template shown in the templates page:"]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.strong,{children:"kong-api-gateway-release-definition-template"})}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"Error loading templates-installed.png",src:i(2159).Z+"",width:"2560",height:"447"})}),"\n",(0,n.jsx)(t.h3,{id:"creating-pipeline-from-template",children:"Creating Pipeline from Template"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"../adaptors/screwdriver-cd#1-creating-a-screwdriver-pipeline",children:"Create a Screwdriver pipeline"})," with the URL of a GitHub\nrepo that contains a ",(0,n.jsx)(t.code,{children:"screwdriver.yaml"})," file with the following content"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-yaml",children:"---\njobs:\n  main:\n    requires: [~pr, ~commit]\n    template: QubitPi/kong-api-gateway-release-definition-template@latest\n"})}),"\n",(0,n.jsx)(t.h3,{id:"configuring-pipeline",children:"Configuring Pipeline"}),"\n",(0,n.jsxs)(t.p,{children:["The following ",(0,n.jsx)(t.a,{href:"https://screwdriver-docs.qubitpi.org/user-guide/configuration/secrets",children:"Screwdriver Secrets"})," needs to be defined before running the pipeline:"]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"../setup#aws",children:"AWS_ACCESS_KEY_ID"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"../setup#aws",children:"AWS_SECRET_ACCESS_KEY"})}),"\n",(0,n.jsx)(t.li,{children:"SSL_CERT_BASE_64: A base64 encoded string of the content of SSL certificate file for the SSL-enabled domain for the\nKong Gateway"}),"\n",(0,n.jsx)(t.li,{children:"SSL_CERT_KEY_BASE_64: A base64 encoded string of the content of SSL certificate key file for the SSL-enabled domain\nKong Gateway"}),"\n"]}),"\n",(0,n.jsx)(t.h3,{id:"running-pipeline",children:"Running Pipeline"}),"\n",(0,n.jsxs)(t.p,{children:["To run the pipeline, fill in the AWS-related ",(0,n.jsx)(t.strong,{children:"parameters"})," first"]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"Error kong-api-gateway-release-definition-template-parameters.png",src:i(5680).Z+"",width:"834",height:"1419"})}),"\n",(0,n.jsxs)(t.p,{children:['Then hit "',(0,n.jsx)(t.strong,{children:"Submit"}),'" to start deploying.']})]})}function p(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},5680:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/kong-api-gateway-release-definition-template-parameters-b592a814383129cf13098b8ea981351c.png"},5572:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/kong-ports-diagram-94dd812152799d6acdc342b76be0588a.png"},2159:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/templates-installed-d7dcae836eac01e0f713967994ac45f1.png"},9162:(e,t,i)=>{i.d(t,{Z:()=>l,a:()=>s});var n=i(1733);const a={},r=n.createContext(a);function s(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);