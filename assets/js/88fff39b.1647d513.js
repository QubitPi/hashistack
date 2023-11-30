"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[1314],{4114:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>r,metadata:()=>s,toc:()=>u});var i=n(5893),a=n(1151);const r={sidebar_position:7,title:"Configuration Management for Immutable Infrastructure"},o=void 0,s={id:"IaC-configuration-management",title:"Configuration Management for Immutable Infrastructure",description:"[//]: # (Copyright Jiaqi Liu)",source:"@site/docs/7-IaC-configuration-management.md",sourceDirName:".",slug:"/IaC-configuration-management",permalink:"/hashicorp-aws/docs/IaC-configuration-management",draft:!1,unlisted:!1,editUrl:"https://github.com/QubitPi/hashicorp-aws/tree/master/docs/docs/7-IaC-configuration-management.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,title:"Configuration Management for Immutable Infrastructure"},sidebar:"tutorialSidebar",previous:{title:"Jersey-Jetty Based Webservice",permalink:"/hashicorp-aws/docs/webservice"}},c={},u=[];function d(e){const t={img:"img",li:"li",ol:"ol",p:"p",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"Traditional configuration management includes Chef or Puppet. They assume mutable infrastructure."}),"\n",(0,i.jsx)(t.p,{children:"With the adoption of Immutable infrastructure, we initially store and manage our configuration directly in GitHub\nSecrets. This has the disadvantage of not being able to see after creation."}),"\n",(0,i.jsx)(t.p,{children:"Then we moved to a centralized runbook. This exposed a great security risk"}),"\n",(0,i.jsx)(t.p,{children:"So this brought us to the ultimate way of thinking about configuration management in Immutable infrastructure"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{src:n(8210).Z+"",width:"1322",height:"662"})}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsx)(t.li,{children:"We still need GitHub Secrets because that's the most secure way"}),"\n",(0,i.jsx)(t.li,{children:"We would separate config management in a separate repo"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"The thing that bridges the two above, is our github-secret action."})]})}function m(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8210:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/github-secret-8df7f31de85271fd5bf4418718da1fae.png"},1151:(e,t,n)=>{n.d(t,{Z:()=>s,a:()=>o});var i=n(7294);const a={},r=i.createContext(a);function o(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);