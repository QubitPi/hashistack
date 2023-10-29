"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[69],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),p=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return o.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(n),d=r,f=m["".concat(l,".").concat(d)]||m[d]||u[d]||a;return n?o.createElement(f,i(i({ref:t},c),{},{components:n})):o.createElement(f,i({ref:t},c))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var p=2;p<a;p++)i[p]=n[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3427:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var o=n(7462),r=(n(7294),n(3905));const a={slug:"nexus",title:"Nexus 3 Repository Manager OSS",authors:["jiaqi"],tags:["Nexus"],date:new Date("2022-09-30T00:00:00.000Z")},i=void 0,s={permalink:"/hashicorp-aws/blog/nexus",editUrl:"https://github.com/QubitPi/hashicorp-aws/tree/gh-pages/blog/nexus/index.md",source:"@site/blog/nexus/index.md",title:"Nexus 3 Repository Manager OSS",description:"The proliferation of different repository formats and tools accessing them as well as the emergence of more publicly",date:"2022-09-30T00:00:00.000Z",formattedDate:"September 30, 2022",tags:[{label:"Nexus",permalink:"/hashicorp-aws/blog/tags/nexus"}],readingTime:44.865,hasTruncateMarker:!0,authors:[{name:"Jiaqi Liu",title:"Maintainer of hashicorp-aws",url:"https://github.com/QubitPi",imageURL:"https://avatars.githubusercontent.com/u/16126939?v=4",key:"jiaqi"}],frontMatter:{slug:"nexus",title:"Nexus 3 Repository Manager OSS",authors:["jiaqi"],tags:["Nexus"],date:"2022-09-30T00:00:00.000Z"},prevItem:{title:"Deploying Jenkins to AWS",permalink:"/hashicorp-aws/blog/jenkins-on-aws"},nextItem:{title:"Continuous Delivery",permalink:"/hashicorp-aws/blog/continuous-delivery"}},l={authorsImageUrls:[void 0]},p=[],c={toc:p};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The proliferation of different repository formats and tools accessing them as well as the emergence of more publicly\navailable repositories has triggered the need to manage access and usage of these repositories and the components they\ncontain"),(0,r.kt)("p",null,"Hosting our private repositories for internal components has proven to be a very efficient methodology to exchange\ncomponents during all phases of the software development lifecycle. It is considered a best practice at this stage."),(0,r.kt)("p",null,"The task of managing all the repositories a development teams interact with can be supported by the use of a dedicated\nserver application - a ",(0,r.kt)("strong",{parentName:"p"},"repository manager"),". To put it simply, a repository manager provides two core features:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"the ability of proxying a remote repository and cache components saving both bandwidth and time required to\nretrieve a software component from a remote repository repeatedly")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"the ability of hosting a repository providing an organization with a deployment target for internal software\ncomponents"))),(0,r.kt)("p",null,"Just as Source Code Management (SCM) tools are designed to manage source code, repository managers have been designed to\nmanage and trace external dependencies and components generated by internal build."),(0,r.kt)("p",null,"Repository managers are an essential part of any enterprise or open-source software development effort and they enable\ngreater collaboration between developers and wider distribution of software by facilitating the exchange and usage of\nbinary components."),(0,r.kt)("p",null,"When we install a repository manager, we are bringing the power of a repository like the Central Repository into our\norganization. We can use it to proxy the Central Repositories and other repositories, and host our own repositories for\ninternal and external use."),(0,r.kt)("p",null,"In addition to the two aforementioned core features, a repository manager can support the following use cases"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"allows us to manage binary software components through the software development lifecycle"),(0,r.kt)("li",{parentName:"ul"},"search and catalogue software components"),(0,r.kt)("li",{parentName:"ul"},"control component releases with rules and add automated notifications"),(0,r.kt)("li",{parentName:"ul"},"integrate with external security systems, such as LDAP"),(0,r.kt)("li",{parentName:"ul"},"manage component metadata"),(0,r.kt)("li",{parentName:"ul"},"control access to components and repositories"),(0,r.kt)("li",{parentName:"ul"},"display component dependencies"),(0,r.kt)("li",{parentName:"ul"},"brose component archive contents")),(0,r.kt)("p",null,"Using a repository manager provides a number of benefits, including"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"improved software build performance due to faster component download off the local repository manager"),(0,r.kt)("li",{parentName:"ul"},"reduced bandwidth usage due to component caching"),(0,r.kt)("li",{parentName:"ul"},"higher predictability and scalability due to limited dependency on external repositories"),(0,r.kt)("li",{parentName:"ul"},"increased understanding of component usage due to centralized storage of all used components"),(0,r.kt)("li",{parentName:"ul"},"simplified developer configuration due to central access configuration to remote repositories and components on the\nrepository manager"),(0,r.kt)("li",{parentName:"ul"},"unified method to provide components to consumer reducing complexity overheads"),(0,r.kt)("li",{parentName:"ul"},"improved collaboration due to the simplified exchange of binary components")))}u.isMDXComponent=!0}}]);