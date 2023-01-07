"use strict";(self.webpackChunkaergia=self.webpackChunkaergia||[]).push([[5731],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>m});var a=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,a,o=function(e,t){if(null==e)return{};var r,a,o={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=a.createContext({}),s=function(e){var t=a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=s(e.components);return a.createElement(c.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var r=e.components,o=e.mdxType,n=e.originalType,c=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),d=s(r),k=o,m=d["".concat(c,".").concat(k)]||d[k]||u[k]||n;return r?a.createElement(m,i(i({ref:t},l),{},{components:r})):a.createElement(m,i({ref:t},l))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var n=r.length,i=new Array(n);i[0]=k;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p[d]="string"==typeof e?e:o,i[1]=p;for(var s=2;s<n;s++)i[s]=r[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}k.displayName="MDXCreateElement"},5457:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>n,metadata:()=>p,toc:()=>s});var a=r(7462),o=(r(7294),r(3905));const n={sidebar_position:2},i="aergia::docker_compose",p={unversionedId:"recipes/docker-compose",id:"recipes/docker-compose",title:"aergia::docker_compose",description:"With the Docker Engine and Docker CLI already installed, installs the Docker Compose plugin on Ubuntu",source:"@site/docs/recipes/docker-compose.md",sourceDirName:"recipes",slug:"/recipes/docker-compose",permalink:"/aergia/docs/recipes/docker-compose",draft:!1,editUrl:"https://github.com/QubitPi/aergia/tree/gh-pages/docs/recipes/docker-compose.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"aergia::docker",permalink:"/aergia/docs/recipes/docker"},next:{title:"aergia::certbot",permalink:"/aergia/docs/recipes/certbot"}},c={},s=[{value:"Recipe Details",id:"recipe-details",level:2},{value:"Step 1 - Set Up the Repository",id:"step-1---set-up-the-repository",level:3},{value:"Step 2 - Update the Package Index, and Install the Latest Version of Docker Compose",id:"step-2---update-the-package-index-and-install-the-latest-version-of-docker-compose",level:3},{value:"Recipe Verification",id:"recipe-verification",level:2}],l={toc:s};function d(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,a.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"aergiadocker_compose"},"aergia::docker_compose"),(0,o.kt)("p",null,"With the ",(0,o.kt)("a",{parentName:"p",href:"#docker"},"Docker Engine and Docker CLI")," already installed, installs the ",(0,o.kt)("strong",{parentName:"p"},"Docker Compose")," plugin on ",(0,o.kt)("strong",{parentName:"p"},"Ubuntu"),"\nOS using Docker's repository"),(0,o.kt)("h2",{id:"recipe-details"},"Recipe Details"),(0,o.kt)("h3",{id:"step-1---set-up-the-repository"},"Step 1 - Set Up the Repository"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Update the ",(0,o.kt)("em",{parentName:"p"},"apt")," package index and install packages to allow ",(0,o.kt)("em",{parentName:"p"},"apt")," to use a repository over HTTPS:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt-get update\nsudo apt-get install ca-certificates curl gnupg lsb-release\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Add Docker's official GPG key:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"sudo mkdir -p /etc/apt/keyrings\ncurl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Set up the repository:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'echo \\\n"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \\\nhttps://download.docker.com/linux/ubuntu \\\n$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null\n')))),(0,o.kt)("h3",{id:"step-2---update-the-package-index-and-install-the-latest-version-of-docker-compose"},"Step 2 - Update the Package Index, and Install the Latest Version of Docker Compose"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt-get update\nsudo apt-get install docker-compose-plugin\n")),(0,o.kt)("h2",{id:"recipe-verification"},"Recipe Verification"),(0,o.kt)("p",null,"Verify that Docker Compose is installed correctly by checking the version."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker compose version\nDocker Compose version vN.N.N\n")),(0,o.kt)("p",null,"Where ",(0,o.kt)("inlineCode",{parentName:"p"},"vN.N.N")," is placeholder text standing in for the latest version."))}d.isMDXComponent=!0}}]);