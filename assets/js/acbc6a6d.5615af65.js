"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[6932],{7408:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>c});var o=i(7624),t=i(2172);const a={slug:"github-matrix",title:"Using a GitHub Action Matrix to Define Variations for Each Job",authors:["jiaqi"],tags:["CI/CD","GitHub"]},s=void 0,r={permalink:"/hashicorp-aws/blog/github-matrix",editUrl:"https://github.com/QubitPi/hashicorp-aws/tree/master/docs/blog/2023-11-24-github-matrix.md",source:"@site/blog/2023-11-24-github-matrix.md",title:"Using a GitHub Action Matrix to Define Variations for Each Job",description:"[//]: # (Copyright Jiaqi Liu)",date:"2023-11-24T00:00:00.000Z",formattedDate:"November 24, 2023",tags:[{label:"CI/CD",permalink:"/hashicorp-aws/blog/tags/ci-cd"},{label:"GitHub",permalink:"/hashicorp-aws/blog/tags/git-hub"}],readingTime:8.33,hasTruncateMarker:!0,authors:[{name:"Jiaqi Liu",title:"Maintainer of hashicorp-aws",url:"https://github.com/QubitPi",imageURL:"https://avatars.githubusercontent.com/u/16126939?v=4",key:"jiaqi"}],frontMatter:{slug:"github-matrix",title:"Using a GitHub Action Matrix to Define Variations for Each Job",authors:["jiaqi"],tags:["CI/CD","GitHub"]},unlisted:!1,prevItem:{title:"Sending GitHub Action Results to Slack Channel",permalink:"/hashicorp-aws/blog/github-slack-notification"},nextItem:{title:"Using OpenSSL to encrypt messages and files on Linux",permalink:"/hashicorp-aws/blog/openssl-encrypt"}},l={authorsImageUrls:[void 0]},c=[{value:"Using a Matrix Strategy",id:"using-a-matrix-strategy",level:2},{value:"Example: Using a Single-Dimension Matrix",id:"example-using-a-single-dimension-matrix",level:2},{value:"Example: Using a Multi-dimension Matrix",id:"example-using-a-multi-dimension-matrix",level:2},{value:"Example: Using Contexts to Create Matrices",id:"example-using-contexts-to-create-matrices",level:2},{value:"Expanding or adding matrix configurations",id:"expanding-or-adding-matrix-configurations",level:2},{value:"Excluding Matrix Configurations",id:"excluding-matrix-configurations",level:2},{value:"Handling Failures",id:"handling-failures",level:2},{value:"Configuring the Maximum Number of Concurrent Jobs",id:"configuring-the-maximum-number-of-concurrent-jobs",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.M)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"A matrix strategy lets you use variables in a single job definition to automatically create multiple job runs that are\nbased on the combinations of the variables. For example, you can use a matrix strategy to test your code in multiple\nversions of a language or on multiple operating systems."}),"\n",(0,o.jsx)(n.h2,{id:"using-a-matrix-strategy",children:"Using a Matrix Strategy"}),"\n",(0,o.jsxs)(n.p,{children:["Use ",(0,o.jsx)(n.code,{children:"jobs.<job_id>.strategy.matrix"})," to define a matrix of different job configurations. Within your matrix, define one\nor more variables followed by an array of values. For example, the following matrix has a variable called ",(0,o.jsx)(n.code,{children:"version"})," with\nthe value ",(0,o.jsx)(n.code,{children:"[10, 12, 14]"})," and a variable called os with the value ",(0,o.jsx)(n.code,{children:"[ubuntu-latest, windows-latest]"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"jobs:\n  example_matrix:\n    strategy:\n      matrix:\n        version: [10, 12, 14]\n        os: [ubuntu-latest, windows-latest]\n"})}),"\n",(0,o.jsxs)(n.p,{children:["A job will run for each possible combination of the variables. In this example, the workflow will run six jobs, one for\neach combination of the ",(0,o.jsx)(n.code,{children:"os"})," and ",(0,o.jsx)(n.code,{children:"version"})," variables."]}),"\n",(0,o.jsxs)(n.p,{children:["By default, GitHub will maximize the number of jobs run in parallel depending on runner availability. The ",(0,o.jsx)(n.strong,{children:"order of the\nvariables in the matrix determines the order in which the jobs are created"}),". The first variable you define will be the\nfirst job that is created in your workflow run. For example, the above matrix will create the jobs in the following\norder:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"{version: 10, os: ubuntu-latest}"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"{version: 10, os: windows-latest}"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"{version: 12, os: ubuntu-latest}"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"{version: 12, os: windows-latest}"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"{version: 14, os: ubuntu-latest}"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"{version: 14, os: windows-latest}"})}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["A matrix will generate a maximum of ",(0,o.jsx)(n.strong,{children:"256"})," jobs per workflow run. This limit applies to both GitHub-hosted and\nself-hosted runners."]}),"\n",(0,o.jsxs)(n.p,{children:["The variables that you define become properties in the matrix context, and you can reference the property in other areas\nof your workflow file. In this example, you can use ",(0,o.jsx)(n.code,{children:"matrix.version"})," and ",(0,o.jsx)(n.code,{children:"matrix.os"}),' to access the current value of\nversion and os that the job is using. For more information, see "',(0,o.jsx)(n.a,{href:"https://docs.github.com/en/actions/learn-github-actions/contexts",children:"Contexts"}),'."']}),"\n",(0,o.jsx)(n.h2,{id:"example-using-a-single-dimension-matrix",children:"Example: Using a Single-Dimension Matrix"}),"\n",(0,o.jsx)(n.p,{children:"You can specify a single variable to create a single-dimension matrix."}),"\n",(0,o.jsxs)(n.p,{children:["For example, the following workflow defines the variable version with the values ",(0,o.jsx)(n.code,{children:"[10, 12, 14]"}),". The workflow will run\nthree jobs, one for each value in the variable. Each job will access the version value through the ",(0,o.jsx)(n.code,{children:"matrix.version"}),"\ncontext and pass the value as ",(0,o.jsx)(n.code,{children:"node-version"})," to the actions/setup-node action."]}),"\n",(0,o.jsx)(n.h2,{id:"example-using-a-multi-dimension-matrix",children:"Example: Using a Multi-dimension Matrix"}),"\n",(0,o.jsx)(n.p,{children:"You can specify multiple variables to create a multi-dimensional matrix. A job will run for each possible combination of\nthe variables."}),"\n",(0,o.jsx)(n.p,{children:"For example, the following workflow specifies two variables:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Two operating systems specified in the ",(0,o.jsx)(n.code,{children:"os"})," variable"]}),"\n",(0,o.jsxs)(n.li,{children:["Three Node.js versions specified in the ",(0,o.jsx)(n.code,{children:"version"})," variable"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["The workflow will run six jobs, one for each combination of the ",(0,o.jsx)(n.code,{children:"os"})," and ",(0,o.jsx)(n.code,{children:"version"})," variables. Each job will set the\n",(0,o.jsx)(n.code,{children:"runs-on"})," value to the current ",(0,o.jsx)(n.code,{children:"os"})," value and will pass the current version value to the ",(0,o.jsx)(n.code,{children:"actions/setup-node"})," action."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"jobs:\n  example_matrix:\n    strategy:\n      matrix:\n        os: [ubuntu-22.04, ubuntu-20.04]\n        version: [10, 12, 14]\n    runs-on: ${{ matrix.os }}\n    steps:\n      - uses: actions/setup-node@v3\n        with:\n          node-version: ${{ matrix.version }}\n"})}),"\n",(0,o.jsx)(n.h2,{id:"example-using-contexts-to-create-matrices",children:"Example: Using Contexts to Create Matrices"}),"\n",(0,o.jsxs)(n.p,{children:['You can use contexts to create matrices. For more information about contexts, see "',(0,o.jsx)(n.a,{href:"https://docs.github.com/en/actions/learn-github-actions/contexts",children:"Contexts"}),'."']}),"\n",(0,o.jsxs)(n.p,{children:["For example, the following workflow triggers on the ",(0,o.jsx)(n.code,{children:"repository_dispatch"})," event and uses information from the event\npayload to build the matrix. When a repository dispatch event is created with a payload like the one below, the matrix\n",(0,o.jsx)(n.code,{children:"version"})," variable will have a value of ",(0,o.jsx)(n.code,{children:"[12, 14, 16]"}),". For more information about the ",(0,o.jsx)(n.code,{children:"repository_dispatch"}),' trigger,\nsee "',(0,o.jsx)(n.a,{href:"https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#repository_dispatch",children:"Events that trigger workflows"}),'."']}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-json",children:'{\n    "event_type": "test",\n    "client_payload": {\n        "versions": [12, 14, 16]\n    }\n}\n'})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"on:\n  repository_dispatch:\n    types:\n      - test\n\njobs:\n  example_matrix:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        version: ${{ github.event.client_payload.versions }}\n    steps:\n      - uses: actions/setup-node@v3\n        with:\n          node-version: ${{ matrix.version }}\n"})}),"\n",(0,o.jsx)(n.h2,{id:"expanding-or-adding-matrix-configurations",children:"Expanding or adding matrix configurations"}),"\n",(0,o.jsxs)(n.p,{children:["Use ",(0,o.jsx)(n.code,{children:"jobs.<job_id>.strategy.matrix.include"})," to expand existing matrix configurations or to add new configurations. The\nvalue of include is a list of objects."]}),"\n",(0,o.jsxs)(n.p,{children:["For each object in the ",(0,o.jsx)(n.code,{children:"include"})," list, the key",":value"," pairs in the object will be added to each of the matrix\ncombinations if none of the key",":value"," pairs overwrite any of the original matrix values. If the object cannot be added\nto any of the matrix combinations, a new matrix combination will be created instead. Note that the original matrix\nvalues will not be overwritten, but added matrix values can be overwritten."]}),"\n",(0,o.jsx)(n.p,{children:"For example, this matrix:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"strategy:\n  matrix:\n    fruit: [apple, pear]\n    animal: [cat, dog]\n    include:\n      - color: green\n      - color: pink\n        animal: cat\n      - fruit: apple\n        shape: circle\n      - fruit: banana\n      - fruit: banana\n        animal: cat\n"})}),"\n",(0,o.jsx)(n.p,{children:"will result in six jobs with the following matrix combinations:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"{fruit: apple, animal: cat, color: pink, shape: circle}"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"{fruit: apple, animal: dog, color: green, shape: circle}"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"{fruit: pear, animal: cat, color: pink}"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"{fruit: pear, animal: dog, color: green}"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"{fruit: banana}"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"{fruit: banana, animal: cat}"})}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"following this logic:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"{color: green}"})," is added to all of the original matrix combinations because it can be added without overwriting any\npart of the original combinations."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"{color: pink, animal: cat}"})," adds ",(0,o.jsx)(n.code,{children:"color:pink"})," only to the original matrix combinations that include ",(0,o.jsx)(n.code,{children:"animal: cat"}),".\nThis overwrites the color: green that was added by the previous include entry."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"{fruit: apple, shape: circle}"})," adds shape: circle only to the original matrix combinations that include\n",(0,o.jsx)(n.code,{children:"fruit: apple"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"{fruit: banana}"})," cannot be added to any original matrix combination without overwriting a value, so it is added as an\nadditional matrix combination."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"{fruit: banana, animal: cat}"})," cannot be added to any original matrix combination without overwriting a value, so it\nis added as an additional matrix combination. It does not add to the ",(0,o.jsx)(n.code,{children:"{fruit: banana}"})," matrix combination because that\ncombination was not one of the original matrix combinations."]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:'This looks like kinda "what\'re we doing here???". But let us just look at the following examples which make it more\nclear.'}),"\n",(0,o.jsxs)(n.p,{children:["The following workflow will run six jobs, one for each combination of ",(0,o.jsx)(n.code,{children:"os"})," and node. When the job for the os value of\n",(0,o.jsx)(n.code,{children:"windows-latest"})," and node value of ",(0,o.jsx)(n.code,{children:"16"})," runs, an additional variable called ",(0,o.jsx)(n.code,{children:"npm"})," with the value of ",(0,o.jsx)(n.code,{children:"6"})," will be included\nin the job."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"jobs:\n  example_matrix:\n    strategy:\n      matrix:\n        os: [windows-latest, ubuntu-latest]\n        node: [12, 14, 16]\n        include:\n          - os: windows-latest\n            node: 16\n            npm: 6\n    runs-on: ${{ matrix.os }}\n    steps:\n      - uses: actions/setup-node@v3\n        with:\n          node-version: ${{ matrix.node }}\n      - if: ${{ matrix.npm }}\n        run: npm install -g npm@${{ matrix.npm }}\n      - run: npm --version\n"})}),"\n",(0,o.jsxs)(n.p,{children:["This matrix will run 10 jobs, one for each combination of ",(0,o.jsx)(n.code,{children:"os"})," and ",(0,o.jsx)(n.code,{children:"version"})," in the matrix, plus a job for the ",(0,o.jsx)(n.code,{children:"os"}),"\nvalue of ",(0,o.jsx)(n.code,{children:"windows-latest"})," and version value of ",(0,o.jsx)(n.code,{children:"17"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"jobs:\n  example_matrix:\n    strategy:\n      matrix:\n        os: [macos-latest, windows-latest, ubuntu-latest]\n        version: [12, 14, 16]\n        include:\n          - os: windows-latest\n            version: 17\n"})}),"\n",(0,o.jsxs)(n.p,{children:["If you don't specify any matrix variables, all configurations under ",(0,o.jsx)(n.code,{children:"include"})," will run. For example, the following\nworkflow would run two jobs, one for each ",(0,o.jsx)(n.code,{children:"include"})," entry. This lets you take advantage of the matrix strategy without\nhaving a fully populated matrix."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:'jobs:\n  includes_only:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        include:\n          - site: "production"\n            datacenter: "site-a"\n          - site: "staging"\n            datacenter: "site-b"\n'})}),"\n",(0,o.jsx)(n.h2,{id:"excluding-matrix-configurations",children:"Excluding Matrix Configurations"}),"\n",(0,o.jsxs)(n.p,{children:["To remove specific configurations defined in the matrix, use ",(0,o.jsx)(n.code,{children:"jobs.<job_id>.strategy.matrix.exclude"}),". An excluded\nconfiguration only has to be a partial match for it to be excluded. For example, the following workflow will run nine\njobs: one job for each of the 12 configurations, minus the one excluded job that matches\n",(0,o.jsx)(n.code,{children:"{os: macos-latest, version: 12, environment: production}"}),", and the two excluded jobs that match\n",(0,o.jsx)(n.code,{children:"{os: windows-latest, version: 16}"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"strategy:\n  matrix:\n    os: [macos-latest, windows-latest]\n    version: [12, 14, 16]\n    environment: [staging, production]\n    exclude:\n      - os: macos-latest\n        version: 12\n        environment: production\n      - os: windows-latest\n        version: 16\nruns-on: ${{ matrix.os }}\n"})}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["Note: All ",(0,o.jsx)(n.code,{children:"include"})," combinations are processed after ",(0,o.jsx)(n.code,{children:"exclude"}),". This allows you to use ",(0,o.jsx)(n.code,{children:"include"})," to add back\ncombinations that were previously excluded."]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"handling-failures",children:"Handling Failures"}),"\n",(0,o.jsxs)(n.p,{children:["You can control how job failures are handled with ",(0,o.jsx)(n.code,{children:"jobs.<job_id>.strategy.fail-fast"})," and\n",(0,o.jsx)(n.code,{children:"jobs.<job_id>.continue-on-error"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"jobs.<job_id>.strategy.fail-fast"})," applies to the entire matrix. If ",(0,o.jsx)(n.code,{children:"jobs.<job_id>.strategy.fail-fast"})," is set to ",(0,o.jsx)(n.code,{children:"true"}),",\nGitHub will cancel all in-progress and queued jobs in the matrix if any job in the matrix fails. This property defaults\nto ",(0,o.jsx)(n.code,{children:"true"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"jobs.<job_id>.continue-on-error"})," applies to a single job. If ",(0,o.jsx)(n.code,{children:"jobs.<job_id>.continue-on-error"})," is ",(0,o.jsx)(n.code,{children:"true"}),", other jobs in\nthe matrix will continue running even if the job with ",(0,o.jsx)(n.code,{children:"jobs.<job_id>.continue-on-error: true"})," fails."]}),"\n",(0,o.jsxs)(n.p,{children:["You can use ",(0,o.jsx)(n.code,{children:"jobs.<job_id>.strategy.fail-fast"})," and ",(0,o.jsx)(n.code,{children:"jobs.<job_id>.continue-on-error"})," together. For example, the\nfollowing workflow will start four jobs. For each job, continue-on-error is determined by the value of\n",(0,o.jsx)(n.code,{children:"matrix.experimental"}),". If any of the jobs with ",(0,o.jsx)(n.code,{children:"continue-on-error: false"})," fail, all jobs that are in progress or queued\nwill be cancelled. If the job with ",(0,o.jsx)(n.code,{children:"continue-on-error: true"})," fails, the other jobs will not be affected."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"jobs:\n  test:\n    runs-on: ubuntu-latest\n    continue-on-error: ${{ matrix.experimental }}\n    strategy:\n      fail-fast: true\n      matrix:\n        version: [6, 7, 8]\n        experimental: [false]\n        include:\n          - version: 9\n            experimental: true\n"})}),"\n",(0,o.jsx)(n.h2,{id:"configuring-the-maximum-number-of-concurrent-jobs",children:"Configuring the Maximum Number of Concurrent Jobs"}),"\n",(0,o.jsxs)(n.p,{children:["By default, GitHub will maximize the number of jobs run in parallel depending on runner availability. To set the maximum\nnumber of jobs that can run simultaneously when using a ",(0,o.jsx)(n.code,{children:"matrix"})," job strategy, use\n",(0,o.jsx)(n.code,{children:"jobs.<job_id>.strategy.max-parallel"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"For example, the following workflow will run a maximum of two jobs at a time, even if there are runners available to run\nall six jobs at once."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"jobs:\n  example_matrix:\n    strategy:\n      max-parallel: 2\n      matrix:\n        version: [10, 12, 14]\n        os: [ubuntu-latest, windows-latest]\n"})})]})}function h(e={}){const{wrapper:n}={...(0,t.M)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},2172:(e,n,i)=>{i.d(n,{I:()=>r,M:()=>s});var o=i(1504);const t={},a=o.createContext(t);function s(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),o.createElement(a.Provider,{value:n},e.children)}}}]);