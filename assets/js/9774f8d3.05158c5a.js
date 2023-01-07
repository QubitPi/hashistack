"use strict";(self.webpackChunkaergia=self.webpackChunkaergia||[]).push([[7431],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),u=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(n),m=r,d=c["".concat(l,".").concat(m)]||c[m]||h[m]||o;return n?a.createElement(d,i(i({ref:t},p),{},{components:n})):a.createElement(d,i({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:r,i[1]=s;for(var u=2;u<o;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5240:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var a=n(7462),r=(n(7294),n(3905));const o={slug:"continuous-delivery",title:"Continuous Delivery",authors:["jiaqi"],tags:["CI"]},i=void 0,s={permalink:"/aergia/blog/continuous-delivery",editUrl:"https://github.com/QubitPi/aergia/tree/gh-pages/blog/2022-08-31-continuous-delivery/index.md",source:"@site/blog/2022-08-31-continuous-delivery/index.md",title:"Continuous Delivery",description:"Continuous Delivery is the ability to get changes of all types - including new features, configuration changes, bug",date:"2022-08-31T00:00:00.000Z",formattedDate:"August 31, 2022",tags:[{label:"CI",permalink:"/aergia/blog/tags/ci"}],readingTime:5.565,hasTruncateMarker:!0,authors:[{name:"Jiaqi Liu",title:"Maintainer of Aergia",url:"https://github.com/QubitPi",imageURL:"https://avatars.githubusercontent.com/u/16126939?v=4",key:"jiaqi"}],frontMatter:{slug:"continuous-delivery",title:"Continuous Delivery",authors:["jiaqi"],tags:["CI"]},prevItem:{title:"Nexus 3 Repository Manager OSS",permalink:"/aergia/blog/nexus"},nextItem:{title:"Docker cAdvisor",permalink:"/aergia/blog/docker-c-advisor"}},l={authorsImageUrls:[void 0]},u=[{value:"Implementing Continuous Delivery",id:"implementing-continuous-delivery",level:2},{value:"Patterns",id:"patterns",level:3}],p={toc:u};function c(e){let{components:t,...o}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Continuous Delivery is the ability to get changes of all types - including new features, configuration changes, bug\nfixes and experiments - into production, or into the hands of users, ",(0,r.kt)("em",{parentName:"p"},"safely")," and ",(0,r.kt)("em",{parentName:"p"},"quickly")," in a ",(0,r.kt)("em",{parentName:"p"},"sustainable")," way."),(0,r.kt)("p",null,"The goal of continuous delivery is to make deployments - whether of a large-scale distributed system, a complex\nproduction environment, an embedded system, or an app - predictable, routine affairs that can be performed on demand."),(0,r.kt)("p",null,"The practices at the heart of continuous delivery help us achieve several important benefits:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Low risk releases"),". The primary goal of continuous delivery is to make software deployments painless, low-risk\nevents that can be performed at any time, on demand. By applying ",(0,r.kt)("a",{parentName:"p",href:"#patterns"},"patterns")," such as ",(0,r.kt)("strong",{parentName:"p"},"blue-green\ndeployments")," it is relatively straightforward to achieve zero-downtime deployments that are undetectable to users."),(0,r.kt)("admonition",{parentName:"li",title:"blue-green deployment",type:"info"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("img",{alt:"Error loading blue-green-deployments.png ",src:n(2512).Z,width:"953",height:"607"})),(0,r.kt)("p",{parentName:"admonition"},"One of the challenges with automating deployment is the cut-over itself, taking software from the final stage of\ntesting to live production. We usually need to do this quickly in order to minimize downtime. The blue-green\ndeployment approach does this by ensuring we have ",(0,r.kt)("strong",{parentName:"p"},"two production environments"),", as identical as possible. At any\ntime one of them, let's say blue for the example, is live. As we prepare a new release of our software we do our\nfinal stage of testing in the green environment. Once the software is working in the green environment, we switch the\nrouter so that all incoming requests go to the green environment - the blue one is now idle."),(0,r.kt)("p",{parentName:"admonition"},"Blue-green deployment also gives us a rapid way to rollback - if anything goes wrong we switch the router back to\nour blue environment. There's still the issue of dealing with missed transactions while the green environment was\nlive, but depending on our design we may be able to feed transactions to both environments in such a way as to keep\nthe blue environment as a backup when the green is live. Or we may be able to put the application in read-only mode\nbefore cut-over, run it for a while in read-only mode, and then switch it to read-write mode. That may be enough to\nflush out many outstanding issues."),(0,r.kt)("p",{parentName:"admonition"},"The two environments need to be different but as identical as possible. In some situations they can be different\npieces of hardware, or they can be different virtual machines running on the same (or different) hardware. They can\nalso be a single operating environment partitioned into separate zones with separate IP addresses for the two slices."),(0,r.kt)("p",{parentName:"admonition"},"Once we've put our green environment live and we're happy with its stability, we then use the blue environment as\nour ",(0,r.kt)("strong",{parentName:"p"},"staging environment")," for the final testing step for our next deployment. When we are ready for our next\nrelease, we switch from green to blue in the same way that we did from blue to green earlier. That way both green and\nblue environments are regularly cycling between live, previous version (for rollback) and staging the next version."),(0,r.kt)("p",{parentName:"admonition"},"An advantage of this approach is that it's the same basic mechanism as we need to get a hot-standby working. Hence\nthis allows us to test our disaster-recovery procedure on every release."),(0,r.kt)("p",{parentName:"admonition"},"The fundamental idea is to have two easily switchable environments to switch between, there are plenty of ways to vary\nthe details. One project did the switch by bouncing the web server rather than working on the router. Another\nvariation would be to use the same database, making the blue-green switches for web and domain layers."),(0,r.kt)("p",{parentName:"admonition"},"Databases can often be a challenge with this technique, particularly when we need to change the schema to support a\nnew version of the software. The trick is to ",(0,r.kt)("strong",{parentName:"p"},"separate the deployment of schema changes from application upgrades"),".\nSo first apply a database refactoring to change the schema to support both the new and old version of the application,\ndeploy that, check everything is working fine so we have a rollback point, then deploy the new version of the\napplication. (And when the upgrade has bedded down remove the database support for the old version.)"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Faster time to market"),". It's common for the integration and test/fix phase of the traditional phased software\ndelivery lifecycle to consume weeks to even months. When teams work together to automate the build and deployment,\nenvironment provisioning, and regression testing process, developers can incorporate integration and regression\ntesting into their daily work and completely remove these phases. We also avoid the large amount of re-work that\nplague the phased approach.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Higher quality and Better products"),". When developers have automated tools that discover regressions within minutes,\nteams are freed to ",(0,r.kt)("strong",{parentName:"p"},"focus their effort on user research and higher level testing activities")," such as exploratory\ntesting, usability testing, and performance and security testing. By building a deployment pipeline, these activities\ncan be performed continuously throughout the delivery process, ensuring quality is built into products and services\nfrom the beginning. Continuous delivery makes it economic to work in small batches. This means we can get feedback\nfrom users throughout the delivery lifecycle based on working software.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Lower costs"),". Any successful software product or service will evolve significantly over the course of its lifetime.\nBy investing in build, test, deployment and environment automation, we substantially reduce the cost of making and\ndelivering incremental changes to software by ",(0,r.kt)("strong",{parentName:"p"},"eliminating many of the fixed costs")," associated with the release\nprocess.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Happier teams"),". Continuous Delivery makes releases less painful and reduces team burnout. Furthermore, when we\nrelease more frequently, software delivery teams can engage more actively with users, learn which ideas work and which\ndon't, and see first-hand then outcomes of the work they have done. By removing low-value painful activities\naccociated with software delivery, we can fodus on what we care about most - continuous delighting our users."))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},'Continuous delivery is about continuous, daily improvement - the constant discipline of pursuing higher performance by\nfollowing the heuristic "if it hurts, do it more often, and bring the pain forward."')),(0,r.kt)("h2",{id:"implementing-continuous-delivery"},"Implementing Continuous Delivery"),(0,r.kt)("h3",{id:"patterns"},"Patterns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://www.atlassian.com/continuous-delivery"},"TODO")))}c.isMDXComponent=!0},2512:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/blue-green-deployments-5a0c344650154229cb4af876bd9f7f4a.png"}}]);