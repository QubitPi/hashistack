"use strict";(self.webpackChunkaergia=self.webpackChunkaergia||[]).push([[2767],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=u(n),d=a,g=m["".concat(l,".").concat(d)]||m[d]||p[d]||o;return n?r.createElement(g,i(i({ref:t},c),{},{components:n})):r.createElement(g,i({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8199:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var r=n(7462),a=(n(7294),n(3905));const o={slug:"deploying-vs-releasing",title:"Deploying v.s. Releasing",authors:["joseph-mathenge","jiaqi"],tags:["Continuous Delivery"],date:new Date("2022-08-29T00:00:00.000Z")},i=void 0,s={permalink:"/aergia/blog/deploying-vs-releasing",editUrl:"https://github.com/QubitPi/aergia/tree/gh-pages/blog/deply-vs-release/index.md",source:"@site/blog/deply-vs-release/index.md",title:"Deploying v.s. Releasing",description:"The key distinction between deployment and release is the business rationale. Deployment doesn't necessarily mean users",date:"2022-08-29T00:00:00.000Z",formattedDate:"August 29, 2022",tags:[{label:"Continuous Delivery",permalink:"/aergia/blog/tags/continuous-delivery"}],readingTime:1.825,hasTruncateMarker:!0,authors:[{name:"Joseph Mathenge",url:"https://www.bmc.com/blogs/software-deployment-vs-release/",imageURL:"https://yt3.ggpht.com/ytc/AL5GRJX2ITW5UDZgTqodcXst-XYmK3-6UZfrAl0fq4tfYw=s68-c-k-c0x00ffffff-no-rj",key:"joseph-mathenge"},{name:"Jiaqi Liu",title:"Maintainer of Aergia",url:"https://github.com/QubitPi",imageURL:"https://avatars.githubusercontent.com/u/16126939?v=4",key:"jiaqi"}],frontMatter:{slug:"deploying-vs-releasing",title:"Deploying v.s. Releasing",authors:["joseph-mathenge","jiaqi"],tags:["Continuous Delivery"],date:"2022-08-29T00:00:00.000Z"},prevItem:{title:"What Is Immutable Infrastructure",permalink:"/aergia/blog/immutable-infrastructure"},nextItem:{title:"Docker cAdvisor",permalink:"/aergia/blog/docker-c-advisor"}},l={authorsImageUrls:[void 0,void 0]},u=[{value:"What is Deployment",id:"what-is-deployment",level:2},{value:"What is Software Release",id:"what-is-software-release",level:2}],c={toc:u};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The key distinction between deployment and release is the business rationale. Deployment doesn't necessarily mean users\nhave access to features. Some companies will release at the same time as deployment to production is taking place."),(0,a.kt)("p",null,"Others will choose to wait, thereby having the new features in production but not availed to users until the business\ndecides."),(0,a.kt)("h2",{id:"what-is-deployment"},"What is Deployment"),(0,a.kt)("p",null,"Deployment involves moving software from one controlled environment to another. ",(0,a.kt)("strong",{parentName:"p"},"An environment is a subset of IT\ninfrastructure used for a particular purpose"),". The most common environments are:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Development"),". Commonly referred to as ",(0,a.kt)("em",{parentName:"li"},"dev"),", this is where developers build the code."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Integration"),". Here, the new code is combined and validated that it works with existing code."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Test"),". This is where both functional and non-functional tests are conducted on the merged code to confirm it meets\norganization and customer requirements."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Staging"),". This environment is used to test the software using real data to validate it is ready for use."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Production"),". Commonly referred to as prod, this is where the software is made available to users.")),(0,a.kt)("h2",{id:"what-is-software-release"},"What is Software Release"),(0,a.kt)("p",null,"A release is ",(0,a.kt)("strong",{parentName:"p"},"a collection of one or more new or changed services or service components deployed into the live\nenvironment as a result of one or more changes")),(0,a.kt)("p",null,"In other words, a release makes services and features available to users. More often than not,\n",(0,a.kt)("a",{parentName:"p",href:"https://www.bmc.com/blogs/devops-release-management/"},"release management")," is more of a business responsibility than a\ntechnical responsibility. This is because the decisions on scheduling releases can be tied to business strategy from a\nrevenue or portfolio management perspective."))}p.isMDXComponent=!0}}]);