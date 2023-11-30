"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[6682],{817:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var n=t(5893),o=t(1151);const i={slug:"deploying-vs-releasing",title:"Deploying v.s. Releasing",authors:["joseph-mathenge","jiaqi"],tags:["Continuous Delivery"]},r=void 0,a={permalink:"/hashicorp-aws/blog/deploying-vs-releasing",editUrl:"https://github.com/QubitPi/hashicorp-aws/tree/master/docs/blog/2022-08-29-deply-vs-release/index.md",source:"@site/blog/2022-08-29-deply-vs-release/index.md",title:"Deploying v.s. Releasing",description:"[//]: # (Copyright Jiaqi Liu)",date:"2022-08-29T00:00:00.000Z",formattedDate:"August 29, 2022",tags:[{label:"Continuous Delivery",permalink:"/hashicorp-aws/blog/tags/continuous-delivery"}],readingTime:1.825,hasTruncateMarker:!0,authors:[{name:"Joseph Mathenge",url:"https://www.bmc.com/blogs/software-deployment-vs-release/",imageURL:"https://yt3.ggpht.com/ytc/AL5GRJX2ITW5UDZgTqodcXst-XYmK3-6UZfrAl0fq4tfYw=s68-c-k-c0x00ffffff-no-rj",key:"joseph-mathenge"},{name:"Jiaqi Liu",title:"Maintainer of hashicorp-aws",url:"https://github.com/QubitPi",imageURL:"https://avatars.githubusercontent.com/u/16126939?v=4",key:"jiaqi"}],frontMatter:{slug:"deploying-vs-releasing",title:"Deploying v.s. Releasing",authors:["joseph-mathenge","jiaqi"],tags:["Continuous Delivery"]},unlisted:!1,prevItem:{title:"Continuous Delivery",permalink:"/hashicorp-aws/blog/continuous-delivery"},nextItem:{title:"Docker cAdvisor",permalink:"/hashicorp-aws/blog/docker-c-advisor"}},l={authorsImageUrls:[void 0,void 0]},c=[{value:"What is Deployment",id:"what-is-deployment",level:2},{value:"What is Software Release",id:"what-is-software-release",level:2}];function h(e){const s={a:"a",em:"em",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.p,{children:"The key distinction between deployment and release is the business rationale. Deployment doesn't necessarily mean users\nhave access to features. Some companies will release at the same time as deployment to production is taking place."}),"\n",(0,n.jsx)(s.p,{children:"Others will choose to wait, thereby having the new features in production but not availed to users until the business\ndecides."}),"\n",(0,n.jsx)(s.h2,{id:"what-is-deployment",children:"What is Deployment"}),"\n",(0,n.jsxs)(s.p,{children:["Deployment involves moving software from one controlled environment to another. ",(0,n.jsx)(s.strong,{children:"An environment is a subset of IT\ninfrastructure used for a particular purpose"}),". The most common environments are:"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Development"}),". Commonly referred to as ",(0,n.jsx)(s.em,{children:"dev"}),", this is where developers build the code."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Integration"}),". Here, the new code is combined and validated that it works with existing code."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Test"}),". This is where both functional and non-functional tests are conducted on the merged code to confirm it meets\norganization and customer requirements."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Staging"}),". This environment is used to test the software using real data to validate it is ready for use."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"Production"}),". Commonly referred to as prod, this is where the software is made available to users."]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"what-is-software-release",children:"What is Software Release"}),"\n",(0,n.jsxs)(s.p,{children:["A release is ",(0,n.jsx)(s.strong,{children:"a collection of one or more new or changed services or service components deployed into the live\nenvironment as a result of one or more changes"})]}),"\n",(0,n.jsxs)(s.p,{children:["In other words, a release makes services and features available to users. More often than not,\n",(0,n.jsx)(s.a,{href:"https://www.bmc.com/blogs/devops-release-management/",children:"release management"})," is more of a business responsibility than a\ntechnical responsibility. This is because the decisions on scheduling releases can be tied to business strategy from a\nrevenue or portfolio management perspective."]})]})}function d(e={}){const{wrapper:s}={...(0,o.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},1151:(e,s,t)=>{t.d(s,{Z:()=>a,a:()=>r});var n=t(7294);const o={},i=n.createContext(o);function r(e){const s=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),n.createElement(i.Provider,{value:s},e.children)}}}]);