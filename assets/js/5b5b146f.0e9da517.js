"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[4874],{3801:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>l,frontMatter:()=>n,metadata:()=>a,toc:()=>c});var s=r(3860),i=r(5639);const n={sidebar_position:2,title:"Deployment via Screwdriver CD",description:"Deploying Sonatype Nexus Repository via Screwdriver CD Template"},o="Sonatype Nexus Repository Release Definition Template",a={id:"sonatype-nexus-repository/screwdriver-cd-deployment",title:"Deployment via Screwdriver CD",description:"Deploying Sonatype Nexus Repository via Screwdriver CD Template",source:"@site/docs/sonatype-nexus-repository/screwdriver-cd-deployment.md",sourceDirName:"sonatype-nexus-repository",slug:"/sonatype-nexus-repository/screwdriver-cd-deployment",permalink:"/docs/sonatype-nexus-repository/screwdriver-cd-deployment",draft:!1,unlisted:!1,editUrl:"https://github.com/QubitPi/hashicorp-aws/tree/master/docs/docs/sonatype-nexus-repository/screwdriver-cd-deployment.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Deployment via Screwdriver CD",description:"Deploying Sonatype Nexus Repository via Screwdriver CD Template"},sidebar:"tutorialSidebar",previous:{title:"General Deployment",permalink:"/docs/sonatype-nexus-repository/"},next:{title:"General Troubleshooting",permalink:"/docs/troubleshooting"}},p={},c=[{value:"How to Use This Template",id:"how-to-use-this-template",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"sonatype-nexus-repository-release-definition-template",children:"Sonatype Nexus Repository Release Definition Template"}),"\n",(0,s.jsxs)(t.p,{children:["hashicorp-aws offer a ",(0,s.jsx)(t.a,{href:"https://screwdriver-docs.qubitpi.org/user-guide/templates/job-templates",children:"Screwdriver template"})," that deploys an\n",(0,s.jsx)(t.a,{href:"https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure",children:"immutable"})," instance of ",(0,s.jsx)(t.a,{href:"https://github.com/QubitPi/docker-nexus3",children:"Sonatype Nexus Repository"})," to AWS. It uses the\n",(0,s.jsx)(t.a,{href:"https://github.com/QubitPi/screwdriver-cd-template-main",children:"screwdriver-template-main npm package"})," to assist with template validation, publishing, and tagging. This template tags\nthe latest versions with the ",(0,s.jsx)(t.code,{children:"latest"})," tag."]}),"\n",(0,s.jsx)(t.h2,{id:"how-to-use-this-template",children:"How to Use This Template"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"../adaptors/screwdriver-cd#1-creating-a-screwdriver-pipeline",children:"Create a Screwdriver pipeline"})," with the ",(0,s.jsx)(t.strong,{children:"Repo Url"}),"\nbeing ",(0,s.jsx)(t.code,{children:"https://github.com/QubitPi/docker-nexus3"})]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Error loading create-sd-pipeline.png",src:r(5519).Z+"",width:"2560",height:"710"})}),"\n",(0,s.jsxs)(t.p,{children:["In addition, the following ",(0,s.jsx)(t.a,{href:"https://screwdriver-docs.qubitpi.org/user-guide/configuration/secrets",children:"Screwdriver Secrets"})," needs to be defined before running the pipeline:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"../setup#aws",children:(0,s.jsx)(t.code,{children:"AWS_ACCESS_KEY_ID"})})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"../setup#aws",children:(0,s.jsx)(t.code,{children:"AWS_SECRET_ACCESS_KEY"})})}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["To run the pipeline, fill in the AWS-related ",(0,s.jsx)(t.strong,{children:"parameters"})," first"]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Error sonatype-nexus-repository-release-definition-template-parameters.png",src:r(7295).Z+"",width:"1143",height:"892"})}),"\n",(0,s.jsxs)(t.p,{children:['Then hit "',(0,s.jsx)(t.strong,{children:"Submit"}),'" to start deploying.']})]})}function l(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},5519:(e,t,r)=>{r.d(t,{Z:()=>s});const s=r.p+"assets/images/create-sd-pipeline-d126f0d345b5d58574bf91248d2de967.png"},7295:(e,t,r)=>{r.d(t,{Z:()=>s});const s=r.p+"assets/images/sonatype-nexus-repository-release-definition-template-parameters-56641bba63f050b15ae3bd16f91c0cf5.png"},5639:(e,t,r)=>{r.d(t,{Z:()=>a,a:()=>o});var s=r(1733);const i={},n=s.createContext(i);function o(e){const t=s.useContext(n);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(n.Provider,{value:t},e.children)}}}]);