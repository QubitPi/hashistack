"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[7918],{6678:(e,t,n)=>{n.d(t,{Z:()=>b});n(1733);var a=n(8490),s=n(8738),i=n(7450),l=n(598),o=n(4401),r=n(3437),c=n(1746),d=n(3860);function u(e){return(0,d.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,d.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}const m={breadcrumbHomeIcon:"breadcrumbHomeIcon_jJhg"};function h(){const e=(0,c.Z)("/");return(0,d.jsx)("li",{className:"breadcrumbs__item",children:(0,d.jsx)(o.Z,{"aria-label":(0,r.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,d.jsx)(u,{className:m.breadcrumbHomeIcon})})})}const v={breadcrumbsContainer:"breadcrumbsContainer_KpM8"};function x(e){let{children:t,href:n,isLast:a}=e;const s="breadcrumbs__link";return a?(0,d.jsx)("span",{className:s,itemProp:"name",children:t}):n?(0,d.jsx)(o.Z,{className:s,href:n,itemProp:"item",children:(0,d.jsx)("span",{itemProp:"name",children:t})}):(0,d.jsx)("span",{className:s,children:t})}function p(e){let{children:t,active:n,index:s,addMicrodata:i}=e;return(0,d.jsxs)("li",{...i&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},className:(0,a.Z)("breadcrumbs__item",{"breadcrumbs__item--active":n}),children:[t,(0,d.jsx)("meta",{itemProp:"position",content:String(s+1)})]})}function b(){const e=(0,i.s1)(),t=(0,l.Ns)();return e?(0,d.jsx)("nav",{className:(0,a.Z)(s.k.docs.docBreadcrumbs,v.breadcrumbsContainer),"aria-label":(0,r.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,d.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,d.jsx)(h,{}),e.map(((t,n)=>{const a=n===e.length-1,s="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,d.jsx)(p,{active:a,index:n,addMicrodata:!!s,children:(0,d.jsx)(x,{href:s,isLast:a,children:t.label})},n)}))]})}):null}},1457:(e,t,n)=>{n.r(t),n.d(t,{default:()=>q});var a=n(1733),s=n(9013),i=n(898),l=n(3860);const o=a.createContext(null);function r(e){let{children:t,content:n}=e;const s=function(e){return(0,a.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(n);return(0,l.jsx)(o.Provider,{value:s,children:t})}function c(){const e=(0,a.useContext)(o);if(null===e)throw new i.i6("DocProvider");return e}function d(){const{metadata:e,frontMatter:t,assets:n}=c();return(0,l.jsx)(s.d,{title:e.title,description:e.description,keywords:t.keywords,image:n.image??t.image})}var u=n(8490),m=n(5864),h=n(4097);function v(){const{metadata:e}=c();return(0,l.jsx)(h.Z,{previous:e.previous,next:e.next})}var x=n(4685),p=n(3392),b=n(8738),g=n(3437);function f(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n}=e;return(0,l.jsx)(g.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,l.jsx)("b",{children:(0,l.jsx)("time",{dateTime:new Date(1e3*t).toISOString(),children:n})})},children:" on {date}"})}function j(e){let{lastUpdatedBy:t}=e;return(0,l.jsx)(g.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,l.jsx)("b",{children:t})},children:" by {user}"})}function L(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n,lastUpdatedBy:a}=e;return(0,l.jsxs)("span",{className:b.k.common.lastUpdated,children:[(0,l.jsx)(g.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&n?(0,l.jsx)(f,{lastUpdatedAt:t,formattedLastUpdatedAt:n}):"",byUser:a?(0,l.jsx)(j,{lastUpdatedBy:a}):""},children:"Last updated{atDate}{byUser}"}),!1]})}var N=n(268),Z=n(1297);const C={lastUpdated:"lastUpdated_SSTK"};function _(e){return(0,l.jsx)("div",{className:(0,u.Z)(b.k.docs.docFooterTagsRow,"row margin-bottom--sm"),children:(0,l.jsx)("div",{className:"col",children:(0,l.jsx)(Z.Z,{...e})})})}function k(e){let{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:a,formattedLastUpdatedAt:s}=e;return(0,l.jsxs)("div",{className:(0,u.Z)(b.k.docs.docFooterEditMetaRow,"row"),children:[(0,l.jsx)("div",{className:"col",children:t&&(0,l.jsx)(N.Z,{editUrl:t})}),(0,l.jsx)("div",{className:(0,u.Z)("col",C.lastUpdated),children:(n||a)&&(0,l.jsx)(L,{lastUpdatedAt:n,formattedLastUpdatedAt:s,lastUpdatedBy:a})})]})}function T(){const{metadata:e}=c(),{editUrl:t,lastUpdatedAt:n,formattedLastUpdatedAt:a,lastUpdatedBy:s,tags:i}=e,o=i.length>0,r=!!(t||n||s);return o||r?(0,l.jsxs)("footer",{className:(0,u.Z)(b.k.docs.docFooter,"docusaurus-mt-lg"),children:[o&&(0,l.jsx)(_,{tags:i}),r&&(0,l.jsx)(k,{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:s,formattedLastUpdatedAt:a})]}):null}var H=n(849),U=n(3835);const y={tocCollapsibleButton:"tocCollapsibleButton_xlmc",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_vOyj"};function w(e){let{collapsed:t,...n}=e;return(0,l.jsx)("button",{type:"button",...n,className:(0,u.Z)("clean-btn",y.tocCollapsibleButton,!t&&y.tocCollapsibleButtonExpanded,n.className),children:(0,l.jsx)(g.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})})}const A={tocCollapsible:"tocCollapsible_zbDV",tocCollapsibleContent:"tocCollapsibleContent_plGC",tocCollapsibleExpanded:"tocCollapsibleExpanded_yP_5"};function M(e){let{toc:t,className:n,minHeadingLevel:a,maxHeadingLevel:s}=e;const{collapsed:i,toggleCollapsed:o}=(0,H.u)({initialState:!0});return(0,l.jsxs)("div",{className:(0,u.Z)(A.tocCollapsible,!i&&A.tocCollapsibleExpanded,n),children:[(0,l.jsx)(w,{collapsed:i,onClick:o}),(0,l.jsx)(H.z,{lazy:!0,className:A.tocCollapsibleContent,collapsed:i,children:(0,l.jsx)(U.Z,{toc:t,minHeadingLevel:a,maxHeadingLevel:s})})]})}const I={tocMobile:"tocMobile_XQcg"};function B(){const{toc:e,frontMatter:t}=c();return(0,l.jsx)(M,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,u.Z)(b.k.docs.docTocMobile,I.tocMobile)})}var E=n(657);function S(){const{toc:e,frontMatter:t}=c();return(0,l.jsx)(E.Z,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:b.k.docs.docTocDesktop})}var O=n(3866),V=n(6971);function P(e){let{children:t}=e;const n=function(){const{metadata:e,frontMatter:t,contentTitle:n}=c();return t.hide_title||void 0!==n?null:e.title}();return(0,l.jsxs)("div",{className:(0,u.Z)(b.k.docs.docMarkdown,"markdown"),children:[n&&(0,l.jsx)("header",{children:(0,l.jsx)(O.Z,{as:"h1",children:n})}),(0,l.jsx)(V.Z,{children:t})]})}var R=n(6678),D=n(1995);const z={docItemContainer:"docItemContainer_VsQ1",docItemCol:"docItemCol_fFz1"};function F(e){let{children:t}=e;const n=function(){const{frontMatter:e,toc:t}=c(),n=(0,m.i)(),a=e.hide_table_of_contents,s=!a&&t.length>0;return{hidden:a,mobile:s?(0,l.jsx)(B,{}):void 0,desktop:!s||"desktop"!==n&&"ssr"!==n?void 0:(0,l.jsx)(S,{})}}(),{metadata:{unlisted:a}}=c();return(0,l.jsxs)("div",{className:"row",children:[(0,l.jsxs)("div",{className:(0,u.Z)("col",!n.hidden&&z.docItemCol),children:[a&&(0,l.jsx)(D.Z,{}),(0,l.jsx)(x.Z,{}),(0,l.jsxs)("div",{className:z.docItemContainer,children:[(0,l.jsxs)("article",{children:[(0,l.jsx)(R.Z,{}),(0,l.jsx)(p.Z,{}),n.mobile,(0,l.jsx)(P,{children:t}),(0,l.jsx)(T,{})]}),(0,l.jsx)(v,{})]})]}),n.desktop&&(0,l.jsx)("div",{className:"col col--3",children:n.desktop})]})}function q(e){const t=`docs-doc-id-${e.content.metadata.id}`,n=e.content;return(0,l.jsx)(r,{content:e.content,children:(0,l.jsxs)(s.FG,{className:t,children:[(0,l.jsx)(d,{}),(0,l.jsx)(F,{children:(0,l.jsx)(n,{})})]})})}},4097:(e,t,n)=>{n.d(t,{Z:()=>l});n(1733);var a=n(3437),s=n(4398),i=n(3860);function l(e){const{previous:t,next:n}=e;return(0,i.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,a.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,i.jsx)(s.Z,{...t,subLabel:(0,i.jsx)(a.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),n&&(0,i.jsx)(s.Z,{...n,subLabel:(0,i.jsx)(a.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}},3392:(e,t,n)=>{n.d(t,{Z:()=>r});n(1733);var a=n(8490),s=n(3437),i=n(8738),l=n(8248),o=n(3860);function r(e){let{className:t}=e;const n=(0,l.E)();return n.badge?(0,o.jsx)("span",{className:(0,a.Z)(t,i.k.docs.docVersionBadge,"badge badge--secondary"),children:(0,o.jsx)(s.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label},children:"Version: {versionLabel}"})}):null}},4685:(e,t,n)=>{n.d(t,{Z:()=>p});n(1733);var a=n(8490),s=n(14),i=n(4401),l=n(3437),o=n(6046),r=n(8738),c=n(9917),d=n(8248),u=n(3860);const m={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,u.jsx)(l.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,u.jsx)("b",{children:n.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,u.jsx)(l.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,u.jsx)("b",{children:n.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function h(e){const t=m[e.versionMetadata.banner];return(0,u.jsx)(t,{...e})}function v(e){let{versionLabel:t,to:n,onClick:a}=e;return(0,u.jsx)(l.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,u.jsx)("b",{children:(0,u.jsx)(i.Z,{to:n,onClick:a,children:(0,u.jsx)(l.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function x(e){let{className:t,versionMetadata:n}=e;const{siteConfig:{title:i}}=(0,s.Z)(),{pluginId:l}=(0,o.gA)({failfast:!0}),{savePreferredVersionName:d}=(0,c.J)(l),{latestDocSuggestion:m,latestVersionSuggestion:x}=(0,o.Jo)(l),p=m??(b=x).docs.find((e=>e.id===b.mainDocId));var b;return(0,u.jsxs)("div",{className:(0,a.Z)(t,r.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,u.jsx)("div",{children:(0,u.jsx)(h,{siteTitle:i,versionMetadata:n})}),(0,u.jsx)("div",{className:"margin-top--md",children:(0,u.jsx)(v,{versionLabel:x.label,to:p.path,onClick:()=>d(x.name)})})]})}function p(e){let{className:t}=e;const n=(0,d.E)();return n.banner?(0,u.jsx)(x,{className:t,versionMetadata:n}):null}},268:(e,t,n)=>{n.d(t,{Z:()=>d});n(1733);var a=n(3437),s=n(8738),i=n(4401),l=n(8490);const o={iconEdit:"iconEdit_e7Z8"};var r=n(3860);function c(e){let{className:t,...n}=e;return(0,r.jsx)("svg",{fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,l.Z)(o.iconEdit,t),"aria-hidden":"true",...n,children:(0,r.jsx)("g",{children:(0,r.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})})}function d(e){let{editUrl:t}=e;return(0,r.jsxs)(i.Z,{to:t,className:s.k.common.editThisPage,children:[(0,r.jsx)(c,{}),(0,r.jsx)(a.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}},4398:(e,t,n)=>{n.d(t,{Z:()=>l});n(1733);var a=n(8490),s=n(4401),i=n(3860);function l(e){const{permalink:t,title:n,subLabel:l,isNext:o}=e;return(0,i.jsxs)(s.Z,{className:(0,a.Z)("pagination-nav__link",o?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[l&&(0,i.jsx)("div",{className:"pagination-nav__sublabel",children:l}),(0,i.jsx)("div",{className:"pagination-nav__label",children:n})]})}},657:(e,t,n)=>{n.d(t,{Z:()=>c});n(1733);var a=n(8490),s=n(3835);const i={tableOfContents:"tableOfContents_dgZx",docItemContainer:"docItemContainer_kbjL"};var l=n(3860);const o="table-of-contents__link toc-highlight",r="table-of-contents__link--active";function c(e){let{className:t,...n}=e;return(0,l.jsx)("div",{className:(0,a.Z)(i.tableOfContents,"thin-scrollbar",t),children:(0,l.jsx)(s.Z,{...n,linkClassName:o,linkActiveClassName:r})})}},3835:(e,t,n)=>{n.d(t,{Z:()=>x});var a=n(1733),s=n(3467);function i(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const a=n.slice(2,e.level);e.parentIndex=Math.max(...a),n[e.level]=t}));const a=[];return t.forEach((e=>{const{parentIndex:n,...s}=e;n>=0?t[n].children.push(s):a.push(s)})),a}function l(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return t.flatMap((e=>{const t=l({toc:e.children,minHeadingLevel:n,maxHeadingLevel:a});return function(e){return e.level>=n&&e.level<=a}(e)?[{...e,children:t}]:t}))}function o(e){const t=e.getBoundingClientRect();return t.top===t.bottom?o(e.parentNode):t}function r(e,t){let{anchorTopOffset:n}=t;const a=e.find((e=>o(e).top>=n));if(a){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(o(a))?a:e[e.indexOf(a)-1]??null}return e[e.length-1]??null}function c(){const e=(0,a.useRef)(0),{navbar:{hideOnScroll:t}}=(0,s.L)();return(0,a.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function d(e){const t=(0,a.useRef)(void 0),n=c();(0,a.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:a,linkActiveClassName:s,minHeadingLevel:i,maxHeadingLevel:l}=e;function o(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(a),o=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const a=[];for(let s=t;s<=n;s+=1)a.push(`h${s}.anchor`);return Array.from(document.querySelectorAll(a.join()))}({minHeadingLevel:i,maxHeadingLevel:l}),c=r(o,{anchorTopOffset:n.current}),d=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(s),e.classList.add(s),t.current=e):e.classList.remove(s)}(e,e===d)}))}return document.addEventListener("scroll",o),document.addEventListener("resize",o),o(),()=>{document.removeEventListener("scroll",o),document.removeEventListener("resize",o)}}),[e,n])}var u=n(4401),m=n(3860);function h(e){let{toc:t,className:n,linkClassName:a,isChild:s}=e;return t.length?(0,m.jsx)("ul",{className:s?void 0:n,children:t.map((e=>(0,m.jsxs)("li",{children:[(0,m.jsx)(u.Z,{to:`#${e.id}`,className:a??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,m.jsx)(h,{isChild:!0,toc:e.children,className:n,linkClassName:a})]},e.id)))}):null}const v=a.memo(h);function x(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:o="table-of-contents__link",linkActiveClassName:r,minHeadingLevel:c,maxHeadingLevel:u,...h}=e;const x=(0,s.L)(),p=c??x.tableOfContents.minHeadingLevel,b=u??x.tableOfContents.maxHeadingLevel,g=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:s}=e;return(0,a.useMemo)((()=>l({toc:i(t),minHeadingLevel:n,maxHeadingLevel:s})),[t,n,s])}({toc:t,minHeadingLevel:p,maxHeadingLevel:b});return d((0,a.useMemo)((()=>{if(o&&r)return{linkClassName:o,linkActiveClassName:r,minHeadingLevel:p,maxHeadingLevel:b}}),[o,r,p,b])),(0,m.jsx)(v,{toc:g,className:n,linkClassName:o,...h})}},2563:(e,t,n)=>{n.d(t,{Z:()=>o});n(1733);var a=n(8490),s=n(4401);const i={tag:"tag_schK",tagRegular:"tagRegular_TuNl",tagWithCount:"tagWithCount_vm3H"};var l=n(3860);function o(e){let{permalink:t,label:n,count:o}=e;return(0,l.jsxs)(s.Z,{href:t,className:(0,a.Z)(i.tag,o?i.tagWithCount:i.tagRegular),children:[n,o&&(0,l.jsx)("span",{children:o})]})}},1297:(e,t,n)=>{n.d(t,{Z:()=>r});n(1733);var a=n(8490),s=n(3437),i=n(2563);const l={tags:"tags_IH5Z",tag:"tag_otd8"};var o=n(3860);function r(e){let{tags:t}=e;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("b",{children:(0,o.jsx)(s.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,o.jsx)("ul",{className:(0,a.Z)(l.tags,"padding--none","margin-left--sm"),children:t.map((e=>{let{label:t,permalink:n}=e;return(0,o.jsx)("li",{className:l.tag,children:(0,o.jsx)(i.Z,{label:t,permalink:n})},n)}))})]})}},1995:(e,t,n)=>{n.d(t,{Z:()=>h});n(1733);var a=n(8490),s=n(3437),i=n(5294),l=n(3860);function o(){return(0,l.jsx)(s.Z,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function r(){return(0,l.jsx)(s.Z,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function c(){return(0,l.jsx)(i.Z,{children:(0,l.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}var d=n(8738),u=n(1866);function m(e){let{className:t}=e;return(0,l.jsx)(u.Z,{type:"caution",title:(0,l.jsx)(o,{}),className:(0,a.Z)(t,d.k.common.unlistedBanner),children:(0,l.jsx)(r,{})})}function h(e){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c,{}),(0,l.jsx)(m,{...e})]})}}}]);