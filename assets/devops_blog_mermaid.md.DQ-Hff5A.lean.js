import{_ as p,r as t,o as c,c as d,a as _,f as i,w as l,b as s,d as a}from"./app.DkoUFz-u.js";const f=JSON.parse('{"title":"🧊 终极 Mermaid 图表大全","description":"","frontmatter":{},"headers":[],"relativePath":"devops/blog/mermaid.md","filePath":"devops/blog/mermaid.md"}'),k={name:"devops/blog/mermaid.md"};function r(o,n,m,g,u,b){const h=t("PluginTabsTab"),e=t("PluginTabs");return c(),d("div",null,[n[25]||(n[25]=_("",2)),i(e,null,{default:l(()=>[i(h,{label:"mermaid"}),i(h,{label:"源码"},{default:l(()=>[...n[0]||(n[0]=[s("div",{class:"language-md vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"md"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"print")])])])],-1)])]),_:1})]),_:1}),n[26]||(n[26]=s("h2",{id:"一、基础图表语法",tabindex:"-1"},[a("📈 一、基础图表语法 "),s("a",{class:"header-anchor",href:"#一、基础图表语法","aria-label":'Permalink to ":chart_with_upwards_trend: 一、基础图表语法"'},"​")],-1)),n[27]||(n[27]=s("h3",{id:"_1-流程图-flowchart",tabindex:"-1"},[a("1. 流程图 (Flowchart) "),s("a",{class:"header-anchor",href:"#_1-流程图-flowchart","aria-label":'Permalink to "1. 流程图 (Flowchart)"'},"​")],-1)),i(e,null,{default:l(()=>[i(h,{label:"流程图"},{default:l(()=>[...n[1]||(n[1]=[s("div",{class:"language-mermaid vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"mermaid"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"graph LR")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    A[开始] --> B{条件判断}")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    B -->|是| C[执行操作1]")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    B -->|否| D[执行操作2]")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    C --> E[结束]")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    D --> E")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    style A fill:#9f9,stroke:#333")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    style E fill:#f96,stroke:#333")])])])],-1)])]),_:1}),i(h,{label:"源码"},{default:l(()=>[...n[2]||(n[2]=[s("div",{class:"language-md vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"md"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```mermaid")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"graph LR")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    A[开始] --> B{条件判断}")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    B -->|是| C[执行操作1]")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    B -->|否| D[执行操作2]")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    C --> E[结束]")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    D --> E")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    style A fill:#9f9,stroke:#333")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    style E fill:#f96,stroke:#333")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```")])])])],-1)])]),_:1})]),_:1}),i(e,null,{default:l(()=>[i(h,{label:"流程图"},{default:l(()=>[...n[3]||(n[3]=[s("div",{class:"language-mermaid vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"mermaid"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"graph TD")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    A[方形] --> B(圆角)")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    A --> C{菱形}")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    B --> D((圆形))")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    C -->|是| E>非对称]")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    C -->|否| F{{六边形}}")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    %% 样式控制")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    classDef default fill:#f9f,stroke:#333;")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    class A,B,C special;")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    classDef special fill:#6f9,stroke-width:2px;")])])])],-1)])]),_:1}),i(h,{label:"源码"},{default:l(()=>[...n[4]||(n[4]=[s("div",{class:"language-md vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"md"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```mermaid")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"graph TD")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    A[方形] --> B(圆角)")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    A --> C{菱形}")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    B --> D((圆形))")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    C -->|是| E>非对称]")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    C -->|否| F{{六边形}}")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    %% 样式控制")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    classDef default fill:#f9f,stroke:#333;")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    class A,B,C special;")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    classDef special fill:#6f9,stroke-width:2px;")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```")])])])],-1)])]),_:1})]),_:1}),n[28]||(n[28]=s("h3",{id:"_2-序列图-sequence-diagram",tabindex:"-1"},[a("2. 序列图 (Sequence Diagram) "),s("a",{class:"header-anchor",href:"#_2-序列图-sequence-diagram","aria-label":'Permalink to "2. 序列图 (Sequence Diagram)"'},"​")],-1)),i(e,null,{default:l(()=>[i(h,{label:"序列图"},{default:l(()=>[...n[5]||(n[5]=[s("div",{class:"language-mermaid vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"mermaid"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"sequenceDiagram")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'  participant "用户"')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'  participant "前端"')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'  participant "后端"')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"  ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'  "用户" ->> "前端": 点击登录')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'  "前端" ->> "后端": POST /login')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"  alt 验证成功")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'      "后端" ->> "前端": 200 OK')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'      "前端" ->> "用户": 显示主页')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"  else 验证失败")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'      "后端" ->> "前端": 401 Unauthorized')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'      "前端" ->> "用户": 错误提示')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"  end")])])])],-1)])]),_:1}),i(h,{label:"源码"},{default:l(()=>[...n[6]||(n[6]=[s("div",{class:"language-md vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"md"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```mermaid")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"sequenceDiagram")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'  participant "用户"')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'  participant "前端"')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'  participant "后端"')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"  ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'  "用户" ->> "前端": 点击登录')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'  "前端" ->> "后端": POST /login')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"  alt 验证成功")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'      "后端" ->> "前端": 200 OK')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'      "前端" ->> "用户": 显示主页')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"  else 验证失败")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'      "后端" ->> "前端": 401 Unauthorized')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'      "前端" ->> "用户": 错误提示')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"  end")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```")])])])],-1)])]),_:1})]),_:1}),n[29]||(n[29]=s("h3",{id:"_3-类图-class-diagram",tabindex:"-1"},[a("3. 类图 (Class Diagram) "),s("a",{class:"header-anchor",href:"#_3-类图-class-diagram","aria-label":'Permalink to "3. 类图 (Class Diagram)"'},"​")],-1)),i(e,null,{default:l(()=>[i(h,{label:"类图"},{default:l(()=>[...n[7]||(n[7]=[s("div",{class:"language-mermaid vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"mermaid"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"classDiagram")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    class 汽车 {")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        +String 品牌")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        +int 里程")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        +void 启动()")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        +void 停止()")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    }")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    class 电动车 {")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        +int 电池容量")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        +void 充电()")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    }")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    汽车 <|-- 电动车 : 继承")])])])],-1)])]),_:1}),i(h,{label:"源码"},{default:l(()=>[...n[8]||(n[8]=[s("div",{class:"language-md vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"md"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```mermaid")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"classDiagram")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    class 汽车 {")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        +String 品牌")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        +int 里程")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        +void 启动()")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        +void 停止()")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    }")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    class 电动车 {")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        +int 电池容量")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        +void 充电()")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    }")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    汽车 <|-- 电动车 : 继承")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```")])])])],-1)])]),_:1})]),_:1}),n[30]||(n[30]=s("h2",{id:"二、高级图表类型",tabindex:"-1"},[a("📉 二、高级图表类型 "),s("a",{class:"header-anchor",href:"#二、高级图表类型","aria-label":'Permalink to ":chart_with_downwards_trend: 二、高级图表类型"'},"​")],-1)),n[31]||(n[31]=s("h3",{id:"_1-甘特图-gantt-chart",tabindex:"-1"},[a("1. 甘特图 (Gantt Chart) "),s("a",{class:"header-anchor",href:"#_1-甘特图-gantt-chart","aria-label":'Permalink to "1. 甘特图 (Gantt Chart)"'},"​")],-1)),i(e,null,{default:l(()=>[i(h,{label:"甘特图"},{default:l(()=>[...n[9]||(n[9]=[s("div",{class:"language-mermaid vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"mermaid"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"gantt")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    title 项目计划")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    dateFormat  YYYY-MM-DD")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    section 设计")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    需求分析     :a1, 2023-10-01, 15d")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    原型设计     :after a1, 10d")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    section 开发")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    前端开发     :2023-10-20, 20d")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    后端开发     :2023-11-01, 25d")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    section 测试")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    单元测试     :crit, 2023-11-15, 10d")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    集成测试     :2023-11-25, 15d")])])])],-1)])]),_:1}),i(h,{label:"源码"},{default:l(()=>[...n[10]||(n[10]=[s("div",{class:"language-md vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"md"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```mermaid")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"gantt")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    title 项目计划")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    dateFormat  YYYY-MM-DD")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    section 设计")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    需求分析     :a1, 2023-10-01, 15d")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    原型设计     :after a1, 10d")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    section 开发")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    前端开发     :2023-10-20, 20d")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    后端开发     :2023-11-01, 25d")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    section 测试")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    单元测试     :crit, 2023-11-15, 10d")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    集成测试     :2023-11-25, 15d")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```")])])])],-1)])]),_:1})]),_:1}),n[32]||(n[32]=s("h3",{id:"_2-状态图-state-diagram",tabindex:"-1"},[a("2. 状态图 (State Diagram) "),s("a",{class:"header-anchor",href:"#_2-状态图-state-diagram","aria-label":'Permalink to "2. 状态图 (State Diagram)"'},"​")],-1)),i(e,null,{default:l(()=>[i(h,{label:"状态图"},{default:l(()=>[...n[11]||(n[11]=[s("div",{class:"language-mermaid vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"mermaid"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"stateDiagram-v2")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    [*] --> 待机")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    待机 --> 运行中： 启动命令")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    运行中 --> 暂停： 暂停按钮")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    暂停 --> 运行中： 继续按钮")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    运行中 --> 完成： 任务结束")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    完成 --> [*]")])])])],-1)])]),_:1}),i(h,{label:"源码"},{default:l(()=>[...n[12]||(n[12]=[s("div",{class:"language-md vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"md"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```mermaid")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"stateDiagram-v2")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    [*] --> 待机")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    待机 --> 运行中： 启动命令")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    运行中 --> 暂停： 暂停按钮")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    暂停 --> 运行中： 继续按钮")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    运行中 --> 完成： 任务结束")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    完成 --> [*]")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```")])])])],-1)])]),_:1})]),_:1}),n[33]||(n[33]=s("h3",{id:"_3-c4-架构图",tabindex:"-1"},[a("3. C4 架构图 "),s("a",{class:"header-anchor",href:"#_3-c4-架构图","aria-label":'Permalink to "3. C4 架构图"'},"​")],-1)),i(e,null,{default:l(()=>[i(h,{label:"C4 架构图"},{default:l(()=>[...n[13]||(n[13]=[s("div",{class:"language-mermaid vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"mermaid"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"C4Context")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    title 系统容器图")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'    Person(用户, "普通用户")')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'    System_Boundary(c1, "电商系统") {')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'        Container(web, "Web应用", "React")')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'        Container(api, "API服务", "Node.js")')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'        Container(db, "数据库", "PostgreSQL")')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    }")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'    Rel(用户, web, "使用")')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'    Rel(web, api, "API调用")')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'    Rel(api, db, "读写数据")')])])])],-1)])]),_:1}),i(h,{label:"源码"},{default:l(()=>[...n[14]||(n[14]=[s("div",{class:"language-md vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"md"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```mermaid")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"C4Context")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    title 系统容器图")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'    Person(用户, "普通用户")')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'    System_Boundary(c1, "电商系统") {')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'        Container(web, "Web应用", "React")')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'        Container(api, "API服务", "Node.js")')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'        Container(db, "数据库", "PostgreSQL")')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    }")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'    Rel(用户, web, "使用")')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'    Rel(web, api, "API调用")')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},'    Rel(api, db, "读写数据")')]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```")])])])],-1)])]),_:1})]),_:1}),n[34]||(n[34]=s("h2",{id:"三、专业领域图表",tabindex:"-1"},[a("📊 三、专业领域图表 "),s("a",{class:"header-anchor",href:"#三、专业领域图表","aria-label":'Permalink to ":bar_chart: 三、专业领域图表"'},"​")],-1)),n[35]||(n[35]=s("h3",{id:"_1-实体关系图-er-diagram",tabindex:"-1"},[a("1. 实体关系图 (ER Diagram) "),s("a",{class:"header-anchor",href:"#_1-实体关系图-er-diagram","aria-label":'Permalink to "1. 实体关系图 (ER Diagram)"'},"​")],-1)),i(e,null,{default:l(()=>[i(h,{label:"实体关系图"},{default:l(()=>[...n[15]||(n[15]=[s("div",{class:"language-mermaid vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"mermaid"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"erDiagram")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    CUSTOMER ||--o{ ORDER : places")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ORDER ||--|{ LINE-ITEM : contains")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    PRODUCT ||--|{ LINE-ITEM : includes")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    CUSTOMER {")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        string name")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        string email")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    }")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    PRODUCT {")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        string sku")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        decimal price")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    }")])])])],-1)])]),_:1}),i(h,{label:"源码"},{default:l(()=>[...n[16]||(n[16]=[s("div",{class:"language-md vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"md"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```mermaid")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"erDiagram")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    CUSTOMER ||--o{ ORDER : places")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ORDER ||--|{ LINE-ITEM : contains")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    PRODUCT ||--|{ LINE-ITEM : includes")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    CUSTOMER {")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        string name")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        string email")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    }")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    PRODUCT {")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        string sku")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        decimal price")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    }")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```")])])])],-1)])]),_:1})]),_:1}),n[36]||(n[36]=s("h3",{id:"_2-用户旅程图-user-journey",tabindex:"-1"},[a("2. 用户旅程图 (User Journey) "),s("a",{class:"header-anchor",href:"#_2-用户旅程图-user-journey","aria-label":'Permalink to "2. 用户旅程图 (User Journey)"'},"​")],-1)),i(e,null,{default:l(()=>[i(h,{label:"用户旅程图"},{default:l(()=>[...n[17]||(n[17]=[s("div",{class:"language-mermaid vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"mermaid"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"journey")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    title 购物流程")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    section 浏览商品")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      搜索商品: 5: 用户")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      查看详情: 3: 用户")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    section 下单支付")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      添加购物车: 4: 用户")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      支付订单: 2: 系统")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    section 收货评价")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      确认收货: 3: 用户")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      商品评价: 1: 用户")])])])],-1)])]),_:1}),i(h,{label:"源码"},{default:l(()=>[...n[18]||(n[18]=[s("div",{class:"language-md vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"md"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```mermaid")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"journey")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    title 购物流程")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    section 浏览商品")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      搜索商品: 5: 用户")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      查看详情: 3: 用户")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    section 下单支付")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      添加购物车: 4: 用户")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      支付订单: 2: 系统")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    section 收货评价")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      确认收货: 3: 用户")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      商品评价: 1: 用户")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```")])])])],-1)])]),_:1})]),_:1}),n[37]||(n[37]=s("h3",{id:"_3-思维导图-mindmap",tabindex:"-1"},[a("3. 思维导图 (Mindmap) "),s("a",{class:"header-anchor",href:"#_3-思维导图-mindmap","aria-label":'Permalink to "3. 思维导图 (Mindmap)"'},"​")],-1)),i(e,null,{default:l(()=>[i(h,{label:"思维导图"},{default:l(()=>[...n[19]||(n[19]=[s("div",{class:"language-mermaid vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"mermaid"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"mindmap")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"  root((编程语言))")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    编译型")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      C")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      C++")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      Go")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    解释型")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      Python")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      JavaScript")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      Ruby")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    混合型")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      Java")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      C#")])])])],-1)])]),_:1}),i(h,{label:"源码"},{default:l(()=>[...n[20]||(n[20]=[s("div",{class:"language-md vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"md"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```mermaid")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"mindmap")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"  root((编程语言))")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    编译型")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      C")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      C++")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      Go")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    解释型")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      Python")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      JavaScript")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      Ruby")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    混合型")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      Java")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      C#")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```")])])])],-1)])]),_:1})]),_:1}),n[38]||(n[38]=s("h2",{id:"四、高级技巧",tabindex:"-1"},[a("🗄️ 四、高级技巧 "),s("a",{class:"header-anchor",href:"#四、高级技巧","aria-label":'Permalink to ":file_cabinet: 四、高级技巧"'},"​")],-1)),n[39]||(n[39]=s("h3",{id:"_1-主题定制",tabindex:"-1"},[a("1. 主题定制 "),s("a",{class:"header-anchor",href:"#_1-主题定制","aria-label":'Permalink to "1. 主题定制"'},"​")],-1)),i(e,null,{default:l(()=>[i(h,{label:"mermaid"},{default:l(()=>[...n[21]||(n[21]=[s("div",{class:"language-mermaid vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"mermaid"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"%%{")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"  init: {")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    'theme': 'forest',")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    'themeVariables': {")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      'primaryColor': '#ff0000',")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      'edgeLabelBackground': '#fff'")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    }")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"  }")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"}%%")]),a(`
`),s("span",{class:"line"}),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"graph LR")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"A[开始] --> B[结束]")])])])],-1)])]),_:1}),i(h,{label:"源码"},{default:l(()=>[...n[22]||(n[22]=[s("div",{class:"language-md vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"md"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"%% 在文档开头全局配置")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```mermaid")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"%%{")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"  init: {")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    'theme': 'forest',")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    'themeVariables': {")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      'primaryColor': '#ff0000',")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"      'edgeLabelBackground': '#fff'")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    }")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"  }")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"}%%")]),a(`
`),s("span",{class:"line"}),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"graph TD")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"A[开始] --> B[结束]")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```")])])])],-1)])]),_:1})]),_:1}),n[40]||(n[40]=_("",3)),i(e,null,{default:l(()=>[i(h,{label:"图表组合"},{default:l(()=>[...n[23]||(n[23]=[s("div",{class:"language-mermaid vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"mermaid"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"flowchart TB")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    subgraph 前端")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        A[React] --> B[Redux]")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    end")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    subgraph 后端")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        C[Node.js] --> D[MongoDB]")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    end")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    前端 -->|API调用| 后端")])])])],-1)])]),_:1}),i(h,{label:"源码"},{default:l(()=>[...n[24]||(n[24]=[s("div",{class:"language-md vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"md"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```mermaid")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"flowchart TB")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    subgraph 前端")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        A[React] --> B[Redux]")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    end")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    subgraph 后端")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"        C[Node.js] --> D[MongoDB]")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    end")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    ")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"    前端 -->|API调用| 后端")]),a(`
`),s("span",{class:"line"},[s("span",{class:"__shiki_140thh"},"```")])])])],-1)])]),_:1})]),_:1}),n[41]||(n[41]=_("",13))])}const C=p(k,[["render",r]]);export{f as __pageData,C as default};
