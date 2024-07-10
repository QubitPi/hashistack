"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[662],{656:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var i=n(3860),t=n(5639);const r={sidebar_position:2,title:"Deployment via GitHub Actions",description:"Deploying Jersey-Jetty Based Webservice via GitHub Actions"},a="GitHub Actions for Jersey Webservice Deployments",c={id:"webservice/github-actions",title:"Deployment via GitHub Actions",description:"Deploying Jersey-Jetty Based Webservice via GitHub Actions",source:"@site/docs/webservice/github-actions.md",sourceDirName:"webservice",slug:"/webservice/github-actions",permalink:"/docs/webservice/github-actions",draft:!1,unlisted:!1,editUrl:"https://github.com/QubitPi/hashicorp-aws/tree/master/docs/docs/webservice/github-actions.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Deployment via GitHub Actions",description:"Deploying Jersey-Jetty Based Webservice via GitHub Actions"},sidebar:"tutorialSidebar",previous:{title:"General Deployment",permalink:"/docs/webservice/"},next:{title:"Deployment via Screwdriver CD",permalink:"/docs/webservice/screwdriver-cd-deployment"}},o={},l=[{value:"How to Use",id:"how-to-use",level:2},{value:"Jersey Webservice Template (JPA through Elide)",id:"jersey-webservice-template-jpa-through-elide",level:3}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.h1,{id:"github-actions-for-jersey-webservice-deployments",children:"GitHub Actions for Jersey Webservice Deployments"}),"\n",(0,i.jsxs)(s.p,{children:["Jersey webservice deployment on AWS through HashiCorp is an opinionated ",(0,i.jsx)(s.a,{href:"https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions",children:"GitHub Action"})," that"]}),"\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsxs)(s.li,{children:["packages webservice WAR file into and registers ",(0,i.jsx)(s.a,{href:"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html",children:"AMI image"})," on AWS, then"]}),"\n",(0,i.jsxs)(s.li,{children:["deploys an ",(0,i.jsx)(s.a,{href:"https://aws.amazon.com/ec2/",children:"EC2 instance"})," of that AMI onto AWS"]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"how-to-use",children:"How to Use"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",children:"---\nname: My CI/CD\n\njobs:\n  hashicorp:\n    name: Generated Webservice WAR in GitHub Action, and Publish Template AMI Image and Deploy it to EC2 through HashiCorp\n    runs-on: ubuntu-latest\n    steps:\n      - name: Deployment\n        uses: QubitPi/jersey-webservice-deployment@master\n        with:\n          template: basic\n          ssl: false\n\n          aws-ws-pkrvars-hcl: ${{ secrets.AWS_WS_PKRVARS_HCL }}\n          aws-ws-tfvars: ${{ secrets.AWS_WS_TFVARS }}\n\n          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}\n          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}\n          aws-region: ${{ secrets.AWS_REGION }}\n"})}),"\n",(0,i.jsx)(s.p,{children:"The following inputs are required:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"template"}),": the template to use, i.e. one of the\n",(0,i.jsx)(s.a,{href:"https://github.com/QubitPi/jersey-webservice-template/branches",children:"branches of jersey-webservcie-template"}),". Can be one\nof the following"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://qubitpi.github.io/jersey-webservice-template/docs/intro",children:"basic"})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://qubitpi.github.io/jersey-webservice-template/docs/crud/",children:"jpa"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"ssl"}),": whether or not to server webservice API in SSL/HTTPS"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"The following GitHub Secrets needs to be defined:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"AWS_WS_PKRVARS_HCL"}),": A [HashiCorp Packer variable values file] with the variable values presented\n",(0,i.jsx)(s.a,{href:"https://qubitpi.github.io/hashicorp-aws/docs/webservice#defining-packer-variables",children:"here"})]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"AWS_WS_TFVARS"})," - A [HashiCorp Terraform variable values file] with the variable values presented\n",(0,i.jsx)(s.a,{href:"https://qubitpi.github.io/hashicorp-aws/docs/webservice#defining-terraform-variables",children:"here"})]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"AWS credentials"}),"\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"../setup#aws",children:(0,i.jsx)(s.code,{children:"aws-access-key-id"})})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"../setup#aws",children:(0,i.jsx)(s.code,{children:"aws-secret-access-key"})})}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"aws-region"}),": one of the standard ",(0,i.jsx)(s.a,{href:"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html",children:"AWS regions"})," name"]}),"\n"]}),"\n",(0,i.jsxs)(s.p,{children:["Note that the 3 credentials above is actually the same things as used by ",(0,i.jsx)(s.a,{href:"https://github.com/aws-actions/configure-aws-credentials",children:"configure-aws-credentials"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"jersey-webservice-template-jpa-through-elide",children:"Jersey Webservice Template (JPA through Elide)"}),"\n",(0,i.jsxs)(s.p,{children:["If deployed webservice is ",(0,i.jsx)(s.a,{href:"https://qubitpi.github.io/jersey-webservice-template/docs/crud/",children:"JWT JPA"})," the following\ninputs are also required"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"model-package-jar-group-id"}),' is the Maven group ID of JAR containing data models, e.g. "com.myorg"']}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"model-package-jar-artifact-id"}),' is the Maven artifact ID of JAR containing data models, e.g. "my-data-models"']}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"model-package-jar-version"}),' is the version of JAR containing data models, e.g. "3.1.7"']}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"models-path"}),' is the relative path to the data models repo, usually prefixed by "../". e.g. "../jpa-models"']}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"For example:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",children:"---\nname: My CI/CD\n\njobs:\n  hashicorp:\n    name: Generated Webservice WAR in GitHub Action, and Publish Template AMI Image and Deploy it to EC2 through HashiCorp\n    runs-on: ubuntu-latest\n    steps:\n      - name: Deployment\n        uses: QubitPi/jersey-webservice-deployment@master\n        with:\n          template: basic\n          ssl: false\n\n          aws-ws-pkrvars-hcl: ${{ secrets.AWS_WS_PKRVARS_HCL }}\n          aws-ws-tfvars: ${{ secrets.AWS_WS_TFVARS }}\n\n          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}\n          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}\n          aws-region: ${{ secrets.AWS_REGION }}\n\n          model-package-jar-group-id: com.myorg\n          model-package-jar-artifact-id: my-data-models\n          model-package-jar-version: 1.0.0\n          models-path: ../my-data-models\n"})})]})}function h(e={}){const{wrapper:s}={...(0,t.a)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},5639:(e,s,n)=>{n.d(s,{Z:()=>c,a:()=>a});var i=n(1733);const t={},r=i.createContext(t);function a(e){const s=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(r.Provider,{value:s},e.children)}}}]);