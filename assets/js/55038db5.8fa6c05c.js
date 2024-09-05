"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[5073],{6915:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>r,toc:()=>u});var s=n(3860),a=n(5639);const i={slug:"jdk-setup",title:"Setting up JDK in GitHub Actions",authors:["jiaqi"],tags:["CI/CD","GitHub","Backend","Java"]},o=void 0,r={permalink:"/blog/jdk-setup",editUrl:"https://github.com/QubitPi/hashistack/tree/master/docs/blog/2024-04-14-jdk-setup.md",source:"@site/blog/2024-04-14-jdk-setup.md",title:"Setting up JDK in GitHub Actions",description:"Installing JDK 17",date:"2024-04-14T00:00:00.000Z",formattedDate:"April 14, 2024",tags:[{label:"CI/CD",permalink:"/blog/tags/ci-cd"},{label:"GitHub",permalink:"/blog/tags/git-hub"},{label:"Backend",permalink:"/blog/tags/backend"},{label:"Java",permalink:"/blog/tags/java"}],readingTime:.335,hasTruncateMarker:!1,authors:[{name:"Jiaqi Liu",title:"Maintainer of hashicorp-aws",url:"https://github.com/QubitPi",imageURL:"https://avatars.githubusercontent.com/u/16126939?v=4",key:"jiaqi"}],frontMatter:{slug:"jdk-setup",title:"Setting up JDK in GitHub Actions",authors:["jiaqi"],tags:["CI/CD","GitHub","Backend","Java"]},unlisted:!1,prevItem:{title:"Cypress E2E Tests",permalink:"/blog/cypress-e2e"},nextItem:{title:"NPM Release action",permalink:"/blog/npm-release"}},l={authorsImageUrls:[void 0]},u=[{value:"Installing JDK 17",id:"installing-jdk-17",level:2}];function c(t){const e={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,a.a)(),...t.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h2,{id:"installing-jdk-17",children:"Installing JDK 17"}),"\n",(0,s.jsxs)(e.p,{children:["The standard ",(0,s.jsx)(e.a,{href:"https://github.com/actions/setup-java",children:"actions/setup-java"})," requires us to specify JDK distributions other\nthan JDK version. Looking up JDK distributions wastes user's time and gives opportunities to error."]}),"\n",(0,s.jsx)(e.p,{children:"We offer a no-config action that installs JDK 17 by default. The usage is as follows:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",children:'name: CI/CD\n\n"on":\n  pull_request:\n  push:\n    branches:\n      - master\n\njobs:\n  tests:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Set up JDK\n        uses: QubitPi/hashicorp-aws/.github/actions/jdk-setup@master\n'})})]})}function p(t={}){const{wrapper:e}={...(0,a.a)(),...t.components};return e?(0,s.jsx)(e,{...t,children:(0,s.jsx)(c,{...t})}):c(t)}},5639:(t,e,n)=>{n.d(e,{Z:()=>r,a:()=>o});var s=n(1733);const a={},i=s.createContext(a);function o(t){const e=s.useContext(i);return s.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function r(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(a):t.components||a:o(t.components),s.createElement(i.Provider,{value:e},t.children)}}}]);