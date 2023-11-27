"use strict";(self.webpackChunkhashicorp_aws=self.webpackChunkhashicorp_aws||[]).push([[2101],{1407:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var o=a(5893),n=a(1151);const i={slug:"yahoo-object-storage",title:"Yahoo Cloud Object Store - Object Storage at Exabyte Scale",authors:["jiaqi"],tags:["Object Storage"]},s=void 0,r={permalink:"/hashicorp-aws/blog/yahoo-object-storage",editUrl:"https://github.com/QubitPi/hashicorp-aws/tree/master/docs/blog/2022-05-12-yahoo-object-storage/index.md",source:"@site/blog/2022-05-12-yahoo-object-storage/index.md",title:"Yahoo Cloud Object Store - Object Storage at Exabyte Scale",description:"[//]: # (Copyright Jiaqi Liu)",date:"2022-05-12T00:00:00.000Z",formattedDate:"May 12, 2022",tags:[{label:"Object Storage",permalink:"/hashicorp-aws/blog/tags/object-storage"}],readingTime:6.82,hasTruncateMarker:!0,authors:[{name:"Jiaqi Liu",title:"Maintainer of hashicorp-aws",url:"https://github.com/QubitPi",imageURL:"https://avatars.githubusercontent.com/u/16126939?v=4",key:"jiaqi"}],frontMatter:{slug:"yahoo-object-storage",title:"Yahoo Cloud Object Store - Object Storage at Exabyte Scale",authors:["jiaqi"],tags:["Object Storage"]},unlisted:!1,prevItem:{title:"Setting Up Coverage Analysis through SonarCloud in Maven Project",permalink:"/hashicorp-aws/blog/sonar-cloud-code-coverage"},nextItem:{title:"Add Custom ASCII Banner Logo to SSH Login Screen",permalink:"/hashicorp-aws/blog/ssh-ascii-banner"}},l={authorsImageUrls:[void 0]},c=[{value:"Object Storage Landscape at Yahoo",id:"object-storage-landscape-at-yahoo",level:2},{value:"Why Software Defined Storage",id:"why-software-defined-storage",level:2},{value:"Under the Hood",id:"under-the-hood",level:2},{value:"Latency Optimizations",id:"latency-optimizations",level:2},{value:"Future Development",id:"future-development",level:2}];function d(e){const t={em:"em",h2:"h2",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,n.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.p,{children:"Yahoo stores more than 250 Billion objects and half an exabyte of perpetually durable user content such as photos,\nvideos, email, and blog posts. Object storage at Yahoo is growing at 20-25% annually. The growth is primarily driven by\nmobile, images, video, and user growth. Yahoo is betting on software defined storage to scale storage cost effectively\nalong with the durability and latency guarantees."}),"\n",(0,o.jsx)(t.h2,{id:"object-storage-landscape-at-yahoo",children:"Object Storage Landscape at Yahoo"}),"\n",(0,o.jsxs)(t.p,{children:['What is "object storage"? Images and photos in Flickr, Videos, and documents, spreadsheets, and presentations exchanged\nas Mail attachments are classic examples of "objects". The typical quality of this class of data is\n"',(0,o.jsx)(t.strong,{children:"write-once-read-many"}),'". Traditionally, Yahoo has used storage appliances for object storage. As Yahoo is\nincreasingly becoming the guide for digital information to our users, object storage need in Yahoo is growing rapidly.\nAdditionally, application characteristics differ in access patterns, durability and latency needs, and cost targets. To\nsupport growth cost effectively and meet the varying application needs, object storage in Yahoo requires different\ntradeoffs. ',(0,o.jsx)(t.strong,{children:"We need the flexibility offered by software defined storage to deliver these tradeoffs"}),"."]}),"\n",(0,o.jsx)(t.h2,{id:"why-software-defined-storage",children:"Why Software Defined Storage"}),"\n",(0,o.jsx)(t.p,{children:"Key benefits of software defined storage are:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:"Cost-performance tradeoff"}),": Allows applications to choose performance and cost tradeoffs with different hardware\nand durability configurations using the same software stack."]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:"Flexible interfaces"}),": Ability to choose industry standard API, embed client libraries in applications, or even use\nproprietary API where required. Industry standard APIs allow seamless migration of applications from public to Yahoo\nprivate cloud."]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:"Different storage abstractions"}),": Leverage the same storage software stack across Object, Block, and File\nabstractions, thus reducing R&D and operational costs."]}),"\n"]}),"\n",(0,o.jsx)(t.p,{children:"Cloud Object Store (COS) is Yahoo's commodity hardware based software defined storage solution. In partnership with\nFlickr Yahoo has completed a multi-petabyte initial deployment of COS. Yahoo plans COS as a multi-tenant hosted service\nand to grow COS by ten-fold to support Flickr, Yahoo Mail and Tumblr. That is 100s of petabytes of storage to be\nsupported on COS."}),"\n",(0,o.jsx)(t.h2,{id:"under-the-hood",children:"Under the Hood"}),"\n",(0,o.jsxs)(t.p,{children:["COS is deployed using ",(0,o.jsx)(t.strong,{children:"Ceph"})," storage technology. Yahoo evaluated open-source solutions such as Swift and Ceph, as well\nas commercial solutions and chose Ceph because it enables consolidation of storage tiers for Object, Block, and File\nwith inherent architectural support. Also, being an open-source product, Ceph provides the flexibility needed to\ncustomize for Yahoo needs."]}),"\n",(0,o.jsxs)(t.p,{children:["COS deployment consists of modular Ceph clusters with ",(0,o.jsx)(t.em,{children:"each Ceph cluster treated as a pod"}),". Multiple such Ceph clusters\ndeployed simultaneously form a COS ",(0,o.jsx)(t.strong,{children:"supercluster"})," as shown in figure below. Objects are uniformly distributed across\nall the clusters in a supercluster. A ",(0,o.jsx)(t.em,{children:"proprietary hashing mechanism"})," is used to distribute objects. The hashing\nalgorithm is implemented in a client library embedded in the applications."]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"Error loading cepu-cluster.png",src:a(1433).Z+"",width:"500",height:"386"})}),"\n",(0,o.jsx)(t.p,{children:"Since each cluster consists of tens of commodity servers and hundreds of disks, it is highly likely that components will\nfail frequently. High disk and network activity occurs during recovery due to rebalancing of objects, which in turn\nincreases object read latency during this phase. Capping the size of each cluster allows Yahoo to limit the resource\nusage during recovery phases in order to adhere to latency SLAs."}),"\n",(0,o.jsx)(t.p,{children:"Yahoo users expect their images, videos and mail attachments to be perpetually stored, and made available\ninstantaneously from anywhere around the world. This requires high data \u201cdurability\u201d guarantees. Durability is typically\nachieved in storage systems either via redundancy or encoding. Redundancy can be provided through extra copies of data\nor replicas. On the other hand, encoding can be provided via traditional mechanisms like simple parity, or more\nsophisticated mechanisms like erasure coding. Erasure coding breaks down an object into fragments and stores them across\nmultiple disks with a few redundant pieces to tolerate multiple failures."}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:"The usable capacity of each cluster depends on the durability technique used. We currently employ erasure coding with\neach object broken down into eight data and three coding fragments. This mechanism, called 8/3 erasure coding, can\ntolerate up to three simultaneous server and/or disk failures with about 30% storage overhead for durability. This is\nmuch lower than the 200% overhead in case of replication"}),"."]}),"\n",(0,o.jsx)(t.p,{children:"The two durability techniques offer different price points and latency characteristics. Replication offers lower latency\nbut a higher cost, whereas erasure coding reduces cost (sometimes by up to 50%)  at a slightly higher latency. We can\nalso deploy different storage media such as SSD, HDD and Shingled Magnetic Recording (SMR) drives to enable different\nservice levels depending on the application."}),"\n",(0,o.jsx)(t.p,{children:"Technically, it is possible to scale a COS supercluster by adding storage needs to increase the capacity of the\ncomponent clusters. However, this will lead to rebalancing of data within the component clusters, thereby creating\nprolonged disk and network activity and impact latency SLA. To scale COS, our preferred approach is to add COS\nsuperclusters as needed similar to adding storage farms. This approach is consistent with our current appliance-based\nstorage solution that applications are already familiar with."}),"\n",(0,o.jsx)(t.h2,{id:"latency-optimizations",children:"Latency Optimizations"}),"\n",(0,o.jsx)(t.p,{children:"COS is in the serving path for many Yahoo applications and has to guarantee latency SLAs to ensure consistent high\nquality of user experience. We have implemented over 40 optimizations in Ceph to realize 50% improvement on average, and\n70% improvement in 99.99% latency. The figure below depicts the latency chart before and after the optimizations under\nnormal operations. The latencies in this chart are measured across objects of different sizes in the Flickr workload."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"Error loading ceph-optimization-at-yahoo.png",src:a(1602).Z+"",width:"496",height:"326"})}),"\n",(0,o.jsx)(t.p,{children:"Some of the major optimizations are:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:"Redundant parallel reads with erasure coding"}),": Currently, we have deployed 8/3 erasure coding scheme for\ndurability. Increasing the parallel reads to 11 chunks, instead of the default 8 employed in Ceph, and reconstructing\nthe object upon first 8 retrievals provided significant improvement in long tail read latency. This reduced average\nlatency by approximately 40%."]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:"Recovery Throttling"}),": Upon disk and node failures, Ceph automatically initiates recovery to maintain high\ndurability of objects. During recovery, storage nodes are busy leading to high read/write latency. We implemented\ntunable recovery throttle rate to mitigate this impact. This reduce average latency during recovery by approximately\n60%."]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:"Bucket Sharding"}),": Amazon S3 API specification requires objects to be bucketized. Ceph implements bucket as an\nobject hosted on a single storage node. At our scale, the storage node that hosts the bucket becomes a hotspot, which\nwe mitigated by implementing sharded buckets that are spread across multiple nodes."]}),"\n"]}),"\n",(0,o.jsx)(t.h2,{id:"future-development",children:"Future Development"}),"\n",(0,o.jsx)(t.p,{children:"So far, Yahoo has tuned COS to a large Yahoo use-case, namely Flickr. However, other Yahoo use cases require object\nstorage with different workload patterns and different tradeoffs. To make COS a widely used platform at Yahoo, several\nenhancements in near to mid-term are"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:"Scale"}),": Yahoo has already deployed an initial multi-petabyte solution planned to grow this 10-fold or more to\naccommodate other use cases  such as Mail, Video, Tumblr etc. along with Flickr growth."]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:"Geo Replication for Business Continuity"}),": Currently, geo replication is carried out at the application level. Ceph\nsupports Geo-replication. However, Yahoo has not tested this capability for the scale and latency that Yahoo needs and\nplanned to scale and deploy geo-replication in COS."]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:"Optimize latency for small objects"}),": Many use-cases such as serving thumbnails and serving during image search have\nsmall objects of the order of a few kilobytes. COS needs to be tunned for these use-cases."]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:"Lifecycle management"}),": One of the big advantages of Software Defined Storage is the hardware, software choices for\ncost and performance tradeoffs. Automatic classification of objects into hot, warm, and cold objects will allow us to\ntake advantage of that flexibility and provide differentiated services."]}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,n.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},1602:(e,t,a)=>{a.d(t,{Z:()=>o});const o=a.p+"assets/images/ceph-optimization-at-yahoo-fe7d2d83ae8dd190d3e1e76646ec28d7.png"},1433:(e,t,a)=>{a.d(t,{Z:()=>o});const o=a.p+"assets/images/cepu-cluster-fcfd50857bbaae5d37b99e8429b76cd2.png"},1151:(e,t,a)=>{a.d(t,{Z:()=>r,a:()=>s});var o=a(7294);const n={},i=o.createContext(n);function s(e){const t=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),o.createElement(i.Provider,{value:t},e.children)}}}]);