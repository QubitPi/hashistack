"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[8471],{6183:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>s,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var t=i(3860),a=i(5639);i(6298),i(79);const r={sidebar_position:1,title:"General Deployment"},s="Deploying Jersey-Jetty Based Webservice",l={id:"webservice/index",title:"General Deployment",description:"Deploying Jersey-Jetty Based Webservice",source:"@site/docs/webservice/index.mdx",sourceDirName:"webservice",slug:"/webservice/",permalink:"/docs/webservice/",draft:!1,unlisted:!1,editUrl:"https://github.com/QubitPi/hashistack/tree/master/docs/docs/webservice/index.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"General Deployment"},sidebar:"tutorialSidebar",previous:{title:"Webservice",permalink:"/docs/category/webservice"},next:{title:"Deployment via GitHub Actions",permalink:"/docs/webservice/github-actions"}},o={},c=[{value:"Getting hashicorp-aws Source Code",id:"getting-hashicorp-aws-source-code",level:2},{value:"Defining Packer Variables",id:"defining-packer-variables",level:2},{value:"Building AMI Image",id:"building-ami-image",level:3},{value:"Defining Terraform Variables",id:"defining-terraform-variables",level:3},{value:"Deploying to EC2",id:"deploying-to-ec2",level:3},{value:"Deployment via Screwdriver CD",id:"deployment-via-screwdriver-cd",level:2},{value:"Deployment via GitHub Actions",id:"deployment-via-github-actions",level:2},{value:"Deployment via HACP",id:"deployment-via-hacp",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"AWS",id:"aws",level:3},{value:"The Webservice was Running Properly Right After Deployment, but NOT After a While with &quot;503 Service Unavailable&quot;",id:"the-webservice-was-running-properly-right-after-deployment-but-not-after-a-while-with-503-service-unavailable",level:4}];function h(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"deploying-jersey-jetty-based-webservice",children:"Deploying Jersey-Jetty Based Webservice"}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Yes, hashicorp-aws DOES NOT support Spring, ",(0,t.jsx)(n.strong,{children:"never ever"})]}),"\n",(0,t.jsxs)(n.li,{children:["EBS volumes during build time will ",(0,t.jsx)(n.a,{href:"https://packer.qubitpi.org/packer/integrations/hashicorp/amazon/latest/components/builder/ebs#:~:text=Optional%3A-,delete_on_termination,-(bool)%20%2D%20Indicates%20whether",children:"automatically be removed"})]}),"\n"]})}),"\n",(0,t.jsxs)(n.p,{children:["We take an opinionated webservice deployment, which goes without SSL, because\n",(0,t.jsx)(n.a,{href:"https://dev.to/behalf/authentication-authorization-in-microservices-architecture-part-i-2cn0#global-authentication-api-gateway-and-authorization-per-service",children:"backend API should site behind a proxy or gateway"}),".\nIn addition, webservice executables are assumed to be in WAR format and is ready before preceding in this section\n(neither Packer nor Terraform environment packages up source code to WAR for the sake of simplicity)"]}),"\n",(0,t.jsx)(n.h2,{id:"getting-hashicorp-aws-source-code",children:"Getting hashicorp-aws Source Code"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"git clone https://github.com/QubitPi/hashicorp-aws.git\n"})}),"\n",(0,t.jsxs)(n.p,{children:["From this point on, we assume the ",(0,t.jsx)(n.em,{children:"current directory"})," is the directory containing the checked-out ",(0,t.jsx)(n.code,{children:"hashicorp-aws"})," folder"]}),"\n",(0,t.jsx)(n.h2,{id:"defining-packer-variables",children:"Defining Packer Variables"}),"\n",(0,t.jsxs)(n.p,{children:["Create a ",(0,t.jsx)(n.a,{href:"https://packer.qubitpi.org/packer/guides/hcl/variables#from-a-file",children:"HashiCorp Packer variable values file"}),' named "aws-ws.auto.pkrvars.hcl" under\n',(0,t.jsx)(n.strong,{children:"hashicorp-aws/hashicorp/webservice/images/aws"})," directory, depending on the deployment mode, with the following contents:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-hcl",metastring:"title=hashicorp-aws/hashicorp/webservice/images/aws/aws-aws.auto.pkrvars.hcl",children:'ami_region    = "my-aws-region"\nami_name      = "my-webservice"\ninstance_type = "<one of t2.micro/t2.small/t2.medium/t2.large/t2.xlarge/t2.2xlarge>"\nwar_source    = "my-webservice-1.0.war"\nfilebeat_path = "filebeat.yml"\n'})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"ami_region"})," is the ",(0,t.jsx)(n.a,{href:"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Availability",children:"region"})," where webservice ",(0,t.jsx)(n.a,{href:"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html",children:"AMI"})," will be published to. The published image\nwill be ",(0,t.jsx)(n.em,{children:"private"})]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"ami_name"})," is the name of the resulting AMI that will appear when managing AMIs in the AWS console or via APIs. This\ncan be the same across builds, because hashicorp-aws will deregister the old AMI with the same name and replace it\nwith the current built one"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"instance_type"})," is the ",(0,t.jsx)(n.a,{href:"https://aws.amazon.com/ec2/instance-types/",children:"EC2 instance type"})," to use while building the AMI, such as t2.small."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"war_source"})," is the absolute path or the path relative to ",(0,t.jsx)(n.code,{children:"hashicorp-aws/hashicorp/webservice/images/basic"})," of\nthe webservice WAR file we are going to deploy"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"filebeat_path"})," is the absolute path or the path relative to\n",(0,t.jsx)(n.code,{children:"hashicorp-aws/hashicorp/webservice/images/aws"})," of the filebeat config file if the webservice is sending logs\nto ELK"]}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsx)(n.p,{children:"It is very important to connect webservice to an external logging & auditing service like ELK, because once\nwebservice is deployed as an immutable infrastructure, it is completely sealed in a sense that no one can SSH into\nit. This means logs or other metrics are not available unless they are send to an external logging & auditing\nservice such as ELK. Our HACP offers out-of-the box deployment of ELK and allow the webservice to automatically\nconnect to it to send logs and metrics, which gives us a lot better experience on working with webservice logging\n& auditing."})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"building-ami-image",children:"Building AMI Image"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"cd hashicorp-aws\n\ncp hashicorp/common/images/aws/aws-builder.pkr.hcl hashicorp/webservice/images/aws\ncp hashicorp/common/images/aws/aws-packer.pkr.hcl hashicorp/webservice/images/aws\n\ncd hashicorp/webservice/images/aws\npacker init .\npacker validate .\npacker build .\n"})}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsxs)(n.p,{children:["EBS volumes during build time will ",(0,t.jsx)(n.a,{href:"https://packer.qubitpi.org/packer/integrations/hashicorp/amazon/latest/components/builder/ebs#:~:text=Optional%3A-,delete_on_termination,-(bool)%20%2D%20Indicates%20whether",children:"automatically be removed"})]})}),"\n",(0,t.jsx)(n.p,{children:"This will take a while and to save time, we can leave it here and proceed immediately to the next step."}),"\n",(0,t.jsx)(n.h3,{id:"defining-terraform-variables",children:"Defining Terraform Variables"}),"\n",(0,t.jsxs)(n.p,{children:["Create a ",(0,t.jsx)(n.a,{href:"https://terraform.qubitpi.org/terraform/language/values/variables#variable-definitions-tfvars-files",children:"HashiCorp Terraform variable values file"}),' named "aws-ws.auto.tfvars" under one of the subdirectory of\n',(0,t.jsx)(n.strong,{children:"hashicorp-aws/hashicorp/webservice/instances/aws"}),", depending on the deployment mode, with the following contents:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-hcl",metastring:"title=hashicorp-aws/hashicorp/webservice/instances/aws/aws-ws.auto.tfvars",children:'aws_ec2_region = "my-aws-region"\nami_name          = "my-webservice"\ninstance_type     = "<one of t2.micro/t2.small/t2.medium/t2.large/t2.xlarge/t2.2xlarge>"\nec2_instance_name = "My Webservice"\nsecurity_groups   = ["My Webservice"]\n'})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aws_ec2_region"})," is the ",(0,t.jsx)(n.a,{href:"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Availability",children:"EC2 runtime region"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"ami_name"})," is the name of the published AMI; ",(0,t.jsxs)(n.strong,{children:["it must be the same as the ",(0,t.jsx)(n.code,{children:"ami_name"})," in\n",(0,t.jsx)(n.a,{href:"#defining-packer-variables",children:"Packer variable file"})]})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"instance_type"})," is the ",(0,t.jsx)(n.a,{href:"https://aws.amazon.com/ec2/instance-types/",children:"AWS EC2 instance type"})," used for deployed infrastructure"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"ec2_instance_name"})," is the deployed EC2 name as appeared in the instance list of AWS console; it can be arbitrary"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"security_groups"})," is the list of ",(0,t.jsx)(n.a,{href:"https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",children:"AWS Security Group"})," ",(0,t.jsx)(n.em,{children:"names"})," to associate with (yes, not ID, but name...)"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"deploying-to-ec2",children:"Deploying to EC2"}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsxs)(n.p,{children:["Depending on the ",(0,t.jsx)(n.a,{href:"#defining-packer-variables",children:"AMI"})," and ",(0,t.jsx)(n.a,{href:"#defining-terraform-variables",children:"EC2"})," configs, ",(0,t.jsx)(n.strong,{children:"please be aware AWS credit charges shall incur after the following\ncommands execute"})]})}),"\n",(0,t.jsxs)(n.p,{children:["When ",(0,t.jsx)(n.a,{href:"#building-ami-image",children:"AMI image finishes building"}),", we can go ahead to deploy that image as an EC2 instance:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"cd ../../instances/aws\n\ncp ../../../common/instances/aws/aws-ec2.tf .\ncp ../../../common/instances/aws/aws-terraform.tf .\n\nterraform init\nterraform validate\nterraform apply -auto-approve\n"})}),"\n",(0,t.jsx)(n.h2,{id:"deployment-via-screwdriver-cd",children:"Deployment via Screwdriver CD"}),"\n",(0,t.jsxs)(n.p,{children:["hashicorp-aws supports deployment using ",(0,t.jsx)(n.a,{href:"screwdriver-cd-deployment",children:"Screwdriver CD"}),". Please check it out. ",(0,t.jsx)("img",{src:"https://github.com/QubitPi/QubitPi/blob/master/img/8%E5%A5%BD.gif?raw=true",height:"40px"})]}),"\n",(0,t.jsx)(n.h2,{id:"deployment-via-github-actions",children:"Deployment via GitHub Actions"}),"\n",(0,t.jsxs)(n.p,{children:["hashicorp-aws also supports deployment using ",(0,t.jsx)(n.a,{href:"github-actions",children:"GitHub Actions"})]}),"\n",(0,t.jsx)(n.h2,{id:"deployment-via-hacp",children:"Deployment via HACP"}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsx)(n.p,{children:"Please try our HACP platform to deploy a Webservice instance. It gives us one-click experience that helps us stand up\na webservice in a minute."})}),"\n",(0,t.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,t.jsx)(n.h3,{id:"aws",children:"AWS"}),"\n",(0,t.jsx)(n.h4,{id:"the-webservice-was-running-properly-right-after-deployment-but-not-after-a-while-with-503-service-unavailable",children:'The Webservice was Running Properly Right After Deployment, but NOT After a While with "503 Service Unavailable"'}),"\n",(0,t.jsxs)(n.p,{children:["This could be the resource starvation on EC2 instance. Please try using a bigger EC2 sizes. For example, bumping\n",(0,t.jsx)(n.em,{children:"t2.micro"})," to ",(0,t.jsx)(n.em,{children:"t2.medium"}),". hashicorp-aws currently supports ",(0,t.jsx)(n.strong,{children:"t2.x"})," sizes, i.e. one of the following sizes can be\nselected:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"t2.micro"}),"\n",(0,t.jsx)(n.li,{children:"t2.small"}),"\n",(0,t.jsx)(n.li,{children:"t2.medium"}),"\n",(0,t.jsx)(n.li,{children:"t2.large"}),"\n",(0,t.jsx)(n.li,{children:"t2.xlarge"}),"\n",(0,t.jsx)(n.li,{children:"t2.2xlarge"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["To modify the size, set the value of ",(0,t.jsx)(n.code,{children:"instance_type"})," in both ",(0,t.jsx)(n.em,{children:"aws-ws.pkrvars.hcl"})," and ",(0,t.jsx)(n.em,{children:"aws-ws.tfvars"}),". For\nexample:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-hcl",children:'instance_type       = "t2.medium"\n'})})]})}function d(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},79:(e,n,i)=>{i.d(n,{Z:()=>s});i(1733);var t=i(8490);const a={tabItem:"tabItem_udD9"};var r=i(3860);function s(e){let{children:n,hidden:i,className:s}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,t.Z)(a.tabItem,s),hidden:i,children:n})}},6298:(e,n,i)=>{i.d(n,{Z:()=>j});var t=i(1733),a=i(8490),r=i(2533),s=i(850),l=i(2504),o=i(312),c=i(4274),h=i(9109);function d(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:n,children:i}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:i,attributes:t,default:a}}=e;return{value:n,label:i,attributes:t,default:a}}))}(i);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,i])}function p(e){let{value:n,tabValues:i}=e;return i.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:i}=e;const a=(0,s.k6)(),r=function(e){let{queryString:n=!1,groupId:i}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!i)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return i??null}({queryString:n,groupId:i});return[(0,o._X)(r),(0,t.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(a.location.search);n.set(r,e),a.replace({...a.location,search:n.toString()})}),[r,a])]}function b(e){const{defaultValue:n,queryString:i=!1,groupId:a}=e,r=u(e),[s,o]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:i}=e;if(0===i.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:i}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${i.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=i.find((e=>e.default))??i[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:r}))),[c,d]=m({queryString:i,groupId:a}),[b,g]=function(e){let{groupId:n}=e;const i=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,r]=(0,h.Nk)(i);return[a,(0,t.useCallback)((e=>{i&&r.set(e)}),[i,r])]}({groupId:a}),v=(()=>{const e=c??b;return p({value:e,tabValues:r})?e:null})();(0,l.Z)((()=>{v&&o(v)}),[v]);return{selectedValue:s,selectValue:(0,t.useCallback)((e=>{if(!p({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),g(e)}),[d,g,r]),tabValues:r}}var g=i(5179);const v={tabList:"tabList_hqI3",tabItem:"tabItem_fHFm"};var f=i(3860);function w(e){let{className:n,block:i,selectedValue:t,selectValue:s,tabValues:l}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,r.o5)(),h=e=>{const n=e.currentTarget,i=o.indexOf(n),a=l[i].value;a!==t&&(c(n),s(a))},d=e=>{let n=null;switch(e.key){case"Enter":h(e);break;case"ArrowRight":{const i=o.indexOf(e.currentTarget)+1;n=o[i]??o[0];break}case"ArrowLeft":{const i=o.indexOf(e.currentTarget)-1;n=o[i]??o[o.length-1];break}}n?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":i},n),children:l.map((e=>{let{value:n,label:i,attributes:r}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>o.push(e),onKeyDown:d,onClick:h,...r,className:(0,a.Z)("tabs__item",v.tabItem,r?.className,{"tabs__item--active":t===n}),children:i??n},n)}))})}function x(e){let{lazy:n,children:i,selectedValue:a}=e;const r=(Array.isArray(i)?i:[i]).filter(Boolean);if(n){const e=r.find((e=>e.props.value===a));return e?(0,t.cloneElement)(e,{className:"margin-top--md"}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:r.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==a})))})}function y(e){const n=b(e);return(0,f.jsxs)("div",{className:(0,a.Z)("tabs-container",v.tabList),children:[(0,f.jsx)(w,{...e,...n}),(0,f.jsx)(x,{...e,...n})]})}function j(e){const n=(0,g.Z)();return(0,f.jsx)(y,{...e,children:d(e.children)},String(n))}},5639:(e,n,i)=>{i.d(n,{Z:()=>l,a:()=>s});var t=i(1733);const a={},r=t.createContext(a);function s(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);