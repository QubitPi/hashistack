"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[9565],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>c});var a=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=a.createContext({}),u=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},p=function(e){var n=u(e.components);return a.createElement(s.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(t),c=i,h=d["".concat(s,".").concat(c)]||d[c]||m[c]||o;return t?a.createElement(h,r(r({ref:n},p),{},{components:t})):a.createElement(h,r({ref:n},p))}));function c(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,r=new Array(o);r[0]=d;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var u=2;u<o;u++)r[u]=t[u];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},1378:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>r,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var a=t(7462),i=(t(7294),t(3905));const o={slug:"github-matrix",title:"Using a GitHub Action Matrix to Define Variations for Each Job",authors:["jiaqi"],date:new Date("2023-11-24T00:00:00.000Z"),tags:["CI/CD","GitHub"]},r=void 0,l={permalink:"/hashicorp-aws/blog/github-matrix",editUrl:"https://github.com/QubitPi/hashicorp-aws/tree/gh-pages/blog/2023-11-24-github-matrix.md",source:"@site/blog/2023-11-24-github-matrix.md",title:"Using a GitHub Action Matrix to Define Variations for Each Job",description:"A matrix strategy lets you use variables in a single job definition to automatically create multiple job runs that are",date:"2023-11-24T00:00:00.000Z",formattedDate:"November 24, 2023",tags:[{label:"CI/CD",permalink:"/hashicorp-aws/blog/tags/ci-cd"},{label:"GitHub",permalink:"/hashicorp-aws/blog/tags/git-hub"}],readingTime:7.815,hasTruncateMarker:!1,authors:[{name:"Jiaqi Liu",title:"Maintainer of hashicorp-aws",url:"https://github.com/QubitPi",imageURL:"https://avatars.githubusercontent.com/u/16126939?v=4",key:"jiaqi"}],frontMatter:{slug:"github-matrix",title:"Using a GitHub Action Matrix to Define Variations for Each Job",authors:["jiaqi"],date:"2023-11-24T00:00:00.000Z",tags:["CI/CD","GitHub"]},nextItem:{title:"Using OpenSSL to encrypt messages and files on Linux",permalink:"/hashicorp-aws/blog/openssl-encrypt"}},s={authorsImageUrls:[void 0]},u=[{value:"Using a Matrix Strategy",id:"using-a-matrix-strategy",level:2},{value:"Example: Using a Single-Dimension Matrix",id:"example-using-a-single-dimension-matrix",level:2},{value:"Example: Using a Multi-dimension Matrix",id:"example-using-a-multi-dimension-matrix",level:2},{value:"Example: Using Contexts to Create Matrices",id:"example-using-contexts-to-create-matrices",level:2},{value:"Expanding or adding matrix configurations",id:"expanding-or-adding-matrix-configurations",level:2},{value:"Excluding Matrix Configurations",id:"excluding-matrix-configurations",level:2},{value:"Handling Failures",id:"handling-failures",level:2},{value:"Configuring the Maximum Number of Concurrent Jobs",id:"configuring-the-maximum-number-of-concurrent-jobs",level:2}],p={toc:u};function m(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,a.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"A matrix strategy lets you use variables in a single job definition to automatically create multiple job runs that are\nbased on the combinations of the variables. For example, you can use a matrix strategy to test your code in multiple\nversions of a language or on multiple operating systems."),(0,i.kt)("h2",{id:"using-a-matrix-strategy"},"Using a Matrix Strategy"),(0,i.kt)("p",null,"Use ",(0,i.kt)("inlineCode",{parentName:"p"},"jobs.<job_id>.strategy.matrix")," to define a matrix of different job configurations. Within your matrix, define one\nor more variables followed by an array of values. For example, the following matrix has a variable called ",(0,i.kt)("inlineCode",{parentName:"p"},"version")," with\nthe value ",(0,i.kt)("inlineCode",{parentName:"p"},"[10, 12, 14]")," and a variable called os with the value ",(0,i.kt)("inlineCode",{parentName:"p"},"[ubuntu-latest, windows-latest]"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"jobs:\n  example_matrix:\n    strategy:\n      matrix:\n        version: [10, 12, 14]\n        os: [ubuntu-latest, windows-latest]\n")),(0,i.kt)("p",null,"A job will run for each possible combination of the variables. In this example, the workflow will run six jobs, one for\neach combination of the ",(0,i.kt)("inlineCode",{parentName:"p"},"os")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"version")," variables."),(0,i.kt)("p",null,"By default, GitHub will maximize the number of jobs run in parallel depending on runner availability. The ",(0,i.kt)("strong",{parentName:"p"},"order of the\nvariables in the matrix determines the order in which the jobs are created"),". The first variable you define will be the\nfirst job that is created in your workflow run. For example, the above matrix will create the jobs in the following\norder:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{version: 10, os: ubuntu-latest}")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{version: 10, os: windows-latest}")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{version: 12, os: ubuntu-latest}")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{version: 12, os: windows-latest}")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{version: 14, os: ubuntu-latest}")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{version: 14, os: windows-latest}"))),(0,i.kt)("p",null,"A matrix will generate a maximum of ",(0,i.kt)("strong",{parentName:"p"},"256")," jobs per workflow run. This limit applies to both GitHub-hosted and\nself-hosted runners."),(0,i.kt)("p",null,"The variables that you define become properties in the matrix context, and you can reference the property in other areas\nof your workflow file. In this example, you can use ",(0,i.kt)("inlineCode",{parentName:"p"},"matrix.version")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"matrix.os"),' to access the current value of\nversion and os that the job is using. For more information, see "',(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/actions/learn-github-actions/contexts"},"Contexts"),'."'),(0,i.kt)("h2",{id:"example-using-a-single-dimension-matrix"},"Example: Using a Single-Dimension Matrix"),(0,i.kt)("p",null,"You can specify a single variable to create a single-dimension matrix."),(0,i.kt)("p",null,"For example, the following workflow defines the variable version with the values ",(0,i.kt)("inlineCode",{parentName:"p"},"[10, 12, 14]"),". The workflow will run\nthree jobs, one for each value in the variable. Each job will access the version value through the ",(0,i.kt)("inlineCode",{parentName:"p"},"matrix.version"),"\ncontext and pass the value as ",(0,i.kt)("inlineCode",{parentName:"p"},"node-version")," to the actions/setup-node action."),(0,i.kt)("h2",{id:"example-using-a-multi-dimension-matrix"},"Example: Using a Multi-dimension Matrix"),(0,i.kt)("p",null,"You can specify multiple variables to create a multi-dimensional matrix. A job will run for each possible combination of\nthe variables."),(0,i.kt)("p",null,"For example, the following workflow specifies two variables:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Two operating systems specified in the ",(0,i.kt)("inlineCode",{parentName:"li"},"os")," variable"),(0,i.kt)("li",{parentName:"ul"},"Three Node.js versions specified in the ",(0,i.kt)("inlineCode",{parentName:"li"},"version")," variable")),(0,i.kt)("p",null,"The workflow will run six jobs, one for each combination of the ",(0,i.kt)("inlineCode",{parentName:"p"},"os")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"version")," variables. Each job will set the\n",(0,i.kt)("inlineCode",{parentName:"p"},"runs-on")," value to the current ",(0,i.kt)("inlineCode",{parentName:"p"},"os")," value and will pass the current version value to the ",(0,i.kt)("inlineCode",{parentName:"p"},"actions/setup-node")," action."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"jobs:\n  example_matrix:\n    strategy:\n      matrix:\n        os: [ubuntu-22.04, ubuntu-20.04]\n        version: [10, 12, 14]\n    runs-on: ${{ matrix.os }}\n    steps:\n      - uses: actions/setup-node@v3\n        with:\n          node-version: ${{ matrix.version }}\n")),(0,i.kt)("h2",{id:"example-using-contexts-to-create-matrices"},"Example: Using Contexts to Create Matrices"),(0,i.kt)("p",null,'You can use contexts to create matrices. For more information about contexts, see "',(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/actions/learn-github-actions/contexts"},"Contexts"),'."'),(0,i.kt)("p",null,"For example, the following workflow triggers on the ",(0,i.kt)("inlineCode",{parentName:"p"},"repository_dispatch")," event and uses information from the event\npayload to build the matrix. When a repository dispatch event is created with a payload like the one below, the matrix\n",(0,i.kt)("inlineCode",{parentName:"p"},"version")," variable will have a value of ",(0,i.kt)("inlineCode",{parentName:"p"},"[12, 14, 16]"),". For more information about the ",(0,i.kt)("inlineCode",{parentName:"p"},"repository_dispatch"),' trigger,\nsee "',(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#repository_dispatch"},"Events that trigger workflows"),'."'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "event_type": "test",\n    "client_payload": {\n        "versions": [12, 14, 16]\n    }\n}\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"on:\n  repository_dispatch:\n    types:\n      - test\n \njobs:\n  example_matrix:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        version: ${{ github.event.client_payload.versions }}\n    steps:\n      - uses: actions/setup-node@v3\n        with:\n          node-version: ${{ matrix.version }}\n")),(0,i.kt)("h2",{id:"expanding-or-adding-matrix-configurations"},"Expanding or adding matrix configurations"),(0,i.kt)("p",null,"Use ",(0,i.kt)("inlineCode",{parentName:"p"},"jobs.<job_id>.strategy.matrix.include")," to expand existing matrix configurations or to add new configurations. The\nvalue of include is a list of objects."),(0,i.kt)("p",null,"For each object in the ",(0,i.kt)("inlineCode",{parentName:"p"},"include")," list, the key:value pairs in the object will be added to each of the matrix\ncombinations if none of the key:value pairs overwrite any of the original matrix values. If the object cannot be added\nto any of the matrix combinations, a new matrix combination will be created instead. Note that the original matrix\nvalues will not be overwritten, but added matrix values can be overwritten."),(0,i.kt)("p",null,"For example, this matrix:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"strategy:\n  matrix:\n    fruit: [apple, pear]\n    animal: [cat, dog]\n    include:\n      - color: green\n      - color: pink\n        animal: cat\n      - fruit: apple\n        shape: circle\n      - fruit: banana\n      - fruit: banana\n        animal: cat\n")),(0,i.kt)("p",null,"will result in six jobs with the following matrix combinations:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{fruit: apple, animal: cat, color: pink, shape: circle}")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{fruit: apple, animal: dog, color: green, shape: circle}")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{fruit: pear, animal: cat, color: pink}")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{fruit: pear, animal: dog, color: green}")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{fruit: banana}")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{fruit: banana, animal: cat}"))),(0,i.kt)("p",null,"following this logic:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{color: green}")," is added to all of the original matrix combinations because it can be added without overwriting any\npart of the original combinations."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{color: pink, animal: cat}")," adds ",(0,i.kt)("inlineCode",{parentName:"li"},"color:pink")," only to the original matrix combinations that include ",(0,i.kt)("inlineCode",{parentName:"li"},"animal: cat"),".\nThis overwrites the color: green that was added by the previous include entry."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{fruit: apple, shape: circle}")," adds shape: circle only to the original matrix combinations that include\n",(0,i.kt)("inlineCode",{parentName:"li"},"fruit: apple"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{fruit: banana}")," cannot be added to any original matrix combination without overwriting a value, so it is added as an\nadditional matrix combination."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"{fruit: banana, animal: cat}")," cannot be added to any original matrix combination without overwriting a value, so it\nis added as an additional matrix combination. It does not add to the ",(0,i.kt)("inlineCode",{parentName:"li"},"{fruit: banana}")," matrix combination because that\ncombination was not one of the original matrix combinations.")),(0,i.kt)("p",null,'This looks like kinda "what\'re we doing here???". But let us just look at the following examples which make it more\nclear.'),(0,i.kt)("p",null,"The following workflow will run six jobs, one for each combination of ",(0,i.kt)("inlineCode",{parentName:"p"},"os")," and node. When the job for the os value of\n",(0,i.kt)("inlineCode",{parentName:"p"},"windows-latest")," and node value of ",(0,i.kt)("inlineCode",{parentName:"p"},"16")," runs, an additional variable called ",(0,i.kt)("inlineCode",{parentName:"p"},"npm")," with the value of ",(0,i.kt)("inlineCode",{parentName:"p"},"6")," will be included\nin the job."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"jobs:\n  example_matrix:\n    strategy:\n      matrix:\n        os: [windows-latest, ubuntu-latest]\n        node: [12, 14, 16]\n        include:\n          - os: windows-latest\n            node: 16\n            npm: 6\n    runs-on: ${{ matrix.os }}\n    steps:\n      - uses: actions/setup-node@v3\n        with:\n          node-version: ${{ matrix.node }}\n      - if: ${{ matrix.npm }}\n        run: npm install -g npm@${{ matrix.npm }}\n      - run: npm --version\n")),(0,i.kt)("p",null,"This matrix will run 10 jobs, one for each combination of ",(0,i.kt)("inlineCode",{parentName:"p"},"os")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"version")," in the matrix, plus a job for the ",(0,i.kt)("inlineCode",{parentName:"p"},"os"),"\nvalue of ",(0,i.kt)("inlineCode",{parentName:"p"},"windows-latest")," and version value of ",(0,i.kt)("inlineCode",{parentName:"p"},"17"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"jobs:\n  example_matrix:\n    strategy:\n      matrix:\n        os: [macos-latest, windows-latest, ubuntu-latest]\n        version: [12, 14, 16]\n        include:\n          - os: windows-latest\n            version: 17\n")),(0,i.kt)("p",null,"If you don't specify any matrix variables, all configurations under ",(0,i.kt)("inlineCode",{parentName:"p"},"include")," will run. For example, the following\nworkflow would run two jobs, one for each ",(0,i.kt)("inlineCode",{parentName:"p"},"include")," entry. This lets you take advantage of the matrix strategy without\nhaving a fully populated matrix."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'jobs:\n  includes_only:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        include:\n          - site: "production"\n            datacenter: "site-a"\n          - site: "staging"\n            datacenter: "site-b"\n')),(0,i.kt)("h2",{id:"excluding-matrix-configurations"},"Excluding Matrix Configurations"),(0,i.kt)("p",null,"To remove specific configurations defined in the matrix, use ",(0,i.kt)("inlineCode",{parentName:"p"},"jobs.<job_id>.strategy.matrix.exclude"),". An excluded\nconfiguration only has to be a partial match for it to be excluded. For example, the following workflow will run nine\njobs: one job for each of the 12 configurations, minus the one excluded job that matches\n",(0,i.kt)("inlineCode",{parentName:"p"},"{os: macos-latest, version: 12, environment: production}"),", and the two excluded jobs that match\n",(0,i.kt)("inlineCode",{parentName:"p"},"{os: windows-latest, version: 16}"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"strategy:\n  matrix:\n    os: [macos-latest, windows-latest]\n    version: [12, 14, 16]\n    environment: [staging, production]\n    exclude:\n      - os: macos-latest\n        version: 12\n        environment: production\n      - os: windows-latest\n        version: 16\nruns-on: ${{ matrix.os }}\n")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Note: All ",(0,i.kt)("inlineCode",{parentName:"p"},"include")," combinations are processed after ",(0,i.kt)("inlineCode",{parentName:"p"},"exclude"),". This allows you to use ",(0,i.kt)("inlineCode",{parentName:"p"},"include")," to add back\ncombinations that were previously excluded.")),(0,i.kt)("h2",{id:"handling-failures"},"Handling Failures"),(0,i.kt)("p",null,"You can control how job failures are handled with ",(0,i.kt)("inlineCode",{parentName:"p"},"jobs.<job_id>.strategy.fail-fast")," and\n",(0,i.kt)("inlineCode",{parentName:"p"},"jobs.<job_id>.continue-on-error"),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"jobs.<job_id>.strategy.fail-fast")," applies to the entire matrix. If ",(0,i.kt)("inlineCode",{parentName:"p"},"jobs.<job_id>.strategy.fail-fast")," is set to ",(0,i.kt)("inlineCode",{parentName:"p"},"true"),",\nGitHub will cancel all in-progress and queued jobs in the matrix if any job in the matrix fails. This property defaults\nto ",(0,i.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"jobs.<job_id>.continue-on-error")," applies to a single job. If ",(0,i.kt)("inlineCode",{parentName:"p"},"jobs.<job_id>.continue-on-error")," is ",(0,i.kt)("inlineCode",{parentName:"p"},"true"),", other jobs in\nthe matrix will continue running even if the job with ",(0,i.kt)("inlineCode",{parentName:"p"},"jobs.<job_id>.continue-on-error: true")," fails."),(0,i.kt)("p",null,"You can use ",(0,i.kt)("inlineCode",{parentName:"p"},"jobs.<job_id>.strategy.fail-fast")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"jobs.<job_id>.continue-on-error")," together. For example, the\nfollowing workflow will start four jobs. For each job, continue-on-error is determined by the value of\n",(0,i.kt)("inlineCode",{parentName:"p"},"matrix.experimental"),". If any of the jobs with ",(0,i.kt)("inlineCode",{parentName:"p"},"continue-on-error: false")," fail, all jobs that are in progress or queued\nwill be cancelled. If the job with ",(0,i.kt)("inlineCode",{parentName:"p"},"continue-on-error: true")," fails, the other jobs will not be affected."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"jobs:\n  test:\n    runs-on: ubuntu-latest\n    continue-on-error: ${{ matrix.experimental }}\n    strategy:\n      fail-fast: true\n      matrix:\n        version: [6, 7, 8]\n        experimental: [false]\n        include:\n          - version: 9\n            experimental: true\n")),(0,i.kt)("h2",{id:"configuring-the-maximum-number-of-concurrent-jobs"},"Configuring the Maximum Number of Concurrent Jobs"),(0,i.kt)("p",null,"By default, GitHub will maximize the number of jobs run in parallel depending on runner availability. To set the maximum\nnumber of jobs that can run simultaneously when using a ",(0,i.kt)("inlineCode",{parentName:"p"},"matrix")," job strategy, use\n",(0,i.kt)("inlineCode",{parentName:"p"},"jobs.<job_id>.strategy.max-parallel"),"."),(0,i.kt)("p",null,"For example, the following workflow will run a maximum of two jobs at a time, even if there are runners available to run\nall six jobs at once."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"jobs:\n  example_matrix:\n    strategy:\n      max-parallel: 2\n      matrix:\n        version: [10, 12, 14]\n        os: [ubuntu-latest, windows-latest]\n")))}m.isMDXComponent=!0}}]);