import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Neo4j APOC扩展过程学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/graph/neo4j/apoc.md","filePath":"data/database/nosql/graph/neo4j/apoc.md"}'),p={name:"data/database/nosql/graph/neo4j/apoc.md"};function h(l,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="neo4j-apoc扩展过程学习笔记" tabindex="-1">Neo4j APOC扩展过程学习笔记 <a class="header-anchor" href="#neo4j-apoc扩展过程学习笔记" aria-label="Permalink to &quot;Neo4j APOC扩展过程学习笔记&quot;">​</a></h1><h2 id="一、apoc概述与安装" tabindex="-1">一、APOC概述与安装 <a class="header-anchor" href="#一、apoc概述与安装" aria-label="Permalink to &quot;一、APOC概述与安装&quot;">​</a></h2><h3 id="_1-1-apoc是什么" tabindex="-1">1.1 APOC是什么 <a class="header-anchor" href="#_1-1-apoc是什么" aria-label="Permalink to &quot;1.1 APOC是什么&quot;">​</a></h3><h4 id="_1-1-1-apoc核心定义" tabindex="-1">1.1.1 APOC核心定义 <a class="header-anchor" href="#_1-1-1-apoc核心定义" aria-label="Permalink to &quot;1.1.1 APOC核心定义&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│              APOC扩展库全解析                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 名称: Awesome Procedures On Cypher          │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 性质: Neo4j官方支持的扩展库                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 功能: 450+个存储过程和函数                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 版本: 与Neo4j版本紧密对应                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 许可证: Apache 2.0                          │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────┘</span></span></code></pre></div><p><strong>APOC的价值定位</strong>：</p><ul><li><strong>填补Cypher空白</strong>：提供Cypher缺少的高级功能</li><li><strong>生产力工具</strong>：简化复杂的数据操作任务</li><li><strong>生态系统桥梁</strong>：连接Neo4j与其他系统和数据格式</li><li><strong>运维增强</strong>：提供数据库管理和监控工具</li></ul><h4 id="_1-1-2-apoc功能分类" tabindex="-1">1.1.2 APOC功能分类 <a class="header-anchor" href="#_1-1-2-apoc功能分类" aria-label="Permalink to &quot;1.1.2 APOC功能分类&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[APOC核心功能] --&gt; B[数据导入导出]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[图算法与操作]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[数据转换与增强]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[系统集成]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; F[元数据与监控]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; G[文本与空间处理]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[JSON/XML/CSV]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[关系型数据库]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[Elasticsearch/Kafka]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[路径查找]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[社区检测]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[中心性度量]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[日期处理]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[文本处理]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[数据类型转换]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[文件系统操作]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E2[HTTP调用]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E3[UDF函数]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; F1[模式信息]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; F2[查询分析]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; F3[性能监控]</span></span></code></pre></div><h3 id="_1-2-安装与配置" tabindex="-1">1.2 安装与配置 <a class="header-anchor" href="#_1-2-安装与配置" aria-label="Permalink to &quot;1.2 安装与配置&quot;">​</a></h3><h4 id="_1-2-1-不同环境下的安装" tabindex="-1">1.2.1 不同环境下的安装 <a class="header-anchor" href="#_1-2-1-不同环境下的安装" aria-label="Permalink to &quot;1.2.1 不同环境下的安装&quot;">​</a></h4><p><strong>Neo4j Desktop安装</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 打开Neo4j Desktop</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 选择数据库实例</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 点击&quot;Plugins&quot;标签</span></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 找到APOC点击&quot;Install&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 重启数据库实例</span></span></code></pre></div><p><strong>手动安装（服务器版）</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 下载对应版本的APOC JAR文件</span></span>
<span class="line"><span class="__shiki_21nrsd"># Neo4j 5.x: apoc-5.x.x.x-all.jar</span></span>
<span class="line"><span class="__shiki_21nrsd"># 下载地址: https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 将JAR文件复制到plugins目录</span></span>
<span class="line"><span class="__shiki_1t8gfj">cp</span><span class="__shiki_mdbnqw"> apoc-5.8.0.4-all.jar</span><span class="__shiki_mdbnqw"> /var/lib/neo4j/plugins/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 修改neo4j.conf配置文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">vim</span><span class="__shiki_mdbnqw"> /etc/neo4j/neo4j.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 添加配置:</span></span>
<span class="line"><span class="__shiki_1t8gfj">dbms.security.procedures.unrestricted</span><span class="__shiki_mdbnqw">=apoc.*</span></span>
<span class="line"><span class="__shiki_1t8gfj">dbms.security.procedures.allowlist</span><span class="__shiki_mdbnqw">=apoc.*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 重启Neo4j服务</span></span>
<span class="line"><span class="__shiki_1t8gfj">systemctl</span><span class="__shiki_mdbnqw"> restart</span><span class="__shiki_mdbnqw"> neo4j</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 验证安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">:sysinfo</span><span class="__shiki_21nrsd">  # 在Neo4j Browser中执行</span></span></code></pre></div><p><strong>Docker部署</strong>：</p><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Dockerfile示例</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> neo4j:5.12-enterprise</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 下载APOC</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> APOC_VERSION=5.12.0</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> wget -O /var/lib/neo4j/plugins/apoc-\${APOC_VERSION}-core.jar \\</span></span>
<span class="line"><span class="__shiki_140thh">    https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/download/\${APOC_VERSION}/apoc-\${APOC_VERSION}-core.jar</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置APOC</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> echo </span><span class="__shiki_mdbnqw">&#39;dbms.security.procedures.unrestricted=apoc.*&#39;</span><span class="__shiki_140thh"> &gt;&gt; /etc/neo4j/neo4j.conf</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> echo </span><span class="__shiki_mdbnqw">&#39;apoc.import.file.enabled=true&#39;</span><span class="__shiki_140thh"> &gt;&gt; /etc/neo4j/neo4j.conf</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> echo </span><span class="__shiki_mdbnqw">&#39;apoc.export.file.enabled=true&#39;</span><span class="__shiki_140thh"> &gt;&gt; /etc/neo4j/neo4j.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或者使用docker-compose</span></span>
<span class="line"><span class="__shiki_140thh">version: </span><span class="__shiki_mdbnqw">&#39;3&#39;</span></span>
<span class="line"><span class="__shiki_140thh">services:</span></span>
<span class="line"><span class="__shiki_140thh">  neo4j:</span></span>
<span class="line"><span class="__shiki_140thh">    image: neo4j:5.12-enterprise</span></span>
<span class="line"><span class="__shiki_140thh">    ports:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;7474:7474&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;7687:7687&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    volumes:</span></span>
<span class="line"><span class="__shiki_140thh">      - ./plugins:/plugins</span></span>
<span class="line"><span class="__shiki_140thh">      - ./conf:/conf</span></span>
<span class="line"><span class="__shiki_140thh">      - ./data:/data</span></span>
<span class="line"><span class="__shiki_140thh">      - ./import:/import</span></span>
<span class="line"><span class="__shiki_140thh">    environment:</span></span>
<span class="line"><span class="__shiki_140thh">      - NEO4J_AUTH=neo4j/password</span></span>
<span class="line"><span class="__shiki_140thh">      - NEO4J_PLUGINS=[</span><span class="__shiki_mdbnqw">&quot;apoc&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      - NEO4J_dbms_security_procedures_unrestricted=apoc.*</span></span>
<span class="line"><span class="__shiki_140thh">      - NEO4J_apoc_import_file_enabled=true</span></span></code></pre></div><h4 id="_1-2-2-安全配置" tabindex="-1">1.2.2 安全配置 <a class="header-anchor" href="#_1-2-2-安全配置" aria-label="Permalink to &quot;1.2.2 安全配置&quot;">​</a></h4><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># neo4j.conf中的关键安全设置</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 允许APOC所有过程（开发环境）</span></span>
<span class="line"><span class="__shiki_1itgoe">dbms.security.procedures.unrestricted</span><span class="__shiki_140thh">=apoc.*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 允许特定APOC过程（生产环境推荐）</span></span>
<span class="line"><span class="__shiki_1itgoe">dbms.security.procedures.unrestricted</span><span class="__shiki_140thh">=apoc.load.*,apoc.export.*,apoc.meta.*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 文件系统访问控制</span></span>
<span class="line"><span class="__shiki_21nrsd"># 允许从指定目录读取文件</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.import.file.use_neo4j_config</span><span class="__shiki_140thh">=true</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.import.file.allow_read_from_filesystem</span><span class="__shiki_140thh">=/path/to/allowed/dir</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 限制敏感操作</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.uuid.enabled</span><span class="__shiki_140thh">=false  </span><span class="__shiki_21nrsd"># 禁用UUID生成</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.trigger.enabled</span><span class="__shiki_140thh">=false  </span><span class="__shiki_21nrsd"># 禁用触发器</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 资源限制</span></span>
<span class="line"><span class="__shiki_140thh">apoc.jdbc.&lt;key&gt;.</span><span class="__shiki_1itgoe">pool.size</span><span class="__shiki_140thh">=10  </span><span class="__shiki_21nrsd"># 连接池大小限制</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.import.file.max_bytes</span><span class="__shiki_140thh">=104857600  </span><span class="__shiki_21nrsd"># 100MB文件大小限制</span></span></code></pre></div><h4 id="_1-2-3-版本兼容性检查" tabindex="-1">1.2.3 版本兼容性检查 <a class="header-anchor" href="#_1-2-3-版本兼容性检查" aria-label="Permalink to &quot;1.2.3 版本兼容性检查&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 检查APOC版本和兼容性</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.version() </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> apocVersion,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.cypher.runFirstColumn(</span><span class="__shiki_mdbnqw">&quot;RETURN 1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{}</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> cypherSupported,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.help(</span><span class="__shiki_mdbnqw">&#39;apoc&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> proceduresCount;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 验证关键功能可用性</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.help(</span><span class="__shiki_mdbnqw">&#39;config&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> name, text</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> name CONTAINS </span><span class="__shiki_mdbnqw">&#39;file&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> name, </span><span class="__shiki_dzsirb">left</span><span class="__shiki_140thh">(text, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> description;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 列出所有已启用的APOC过程</span></span>
<span class="line"><span class="__shiki_140thh">SHOW PROCEDURES</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> name STARTS </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_mdbnqw"> &#39;apoc&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> name, signature, description</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> name, signature</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> name;</span></span></code></pre></div><h2 id="二、数据导入与导出" tabindex="-1">二、数据导入与导出 <a class="header-anchor" href="#二、数据导入与导出" aria-label="Permalink to &quot;二、数据导入与导出&quot;">​</a></h2><h3 id="_2-1-从文件系统导入" tabindex="-1">2.1 从文件系统导入 <a class="header-anchor" href="#_2-1-从文件系统导入" aria-label="Permalink to &quot;2.1 从文件系统导入&quot;">​</a></h3><h4 id="_2-1-1-json数据导入" tabindex="-1">2.1.1 JSON数据导入 <a class="header-anchor" href="#_2-1-1-json数据导入" aria-label="Permalink to &quot;2.1.1 JSON数据导入&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 基础JSON导入</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.json(</span><span class="__shiki_mdbnqw">&quot;file:///data/users.json&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (u:User </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> value.id</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> value.name</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  email</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> value.email</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  metadata</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> value.meta</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 复杂嵌套JSON处理</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.json(</span><span class="__shiki_mdbnqw">&quot;file:///data/orders.json&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> value.orders </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> order</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (o:Order </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  orderId</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> order.id</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  total</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> order.total</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  items</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> order.items</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> o, order</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> order.items </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> item</span></span>
<span class="line"><span class="__shiki_1itgoe">MERGE</span><span class="__shiki_140thh"> (p:Product </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> item.productId</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (o)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[:</span><span class="__shiki_1t8gfj">CONTAINS</span><span class="__shiki_1itgoe"> {</span></span>
<span class="line"><span class="__shiki_140thh">  quantity</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> item.quantity</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  price</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> item.price</span></span>
<span class="line"><span class="__shiki_1itgoe">}]</span><span class="__shiki_dzsirb">-&gt;</span><span class="__shiki_140thh">(p);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> JSON数组批量导入</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.jsonArray(</span><span class="__shiki_mdbnqw">&quot;file:///data/array_data.json&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 带转换的JSON导入</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.json(</span><span class="__shiki_mdbnqw">&quot;file:///data/temp.json&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  mapping</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    date</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {type</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;date&quot;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> format</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;yyyy-MM-dd&quot;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    price: </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">type</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;float&quot;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    active: </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">type</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;boolean&quot;</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> value;</span></span></code></pre></div><h4 id="_2-1-2-csv数据导入" tabindex="-1">2.1.2 CSV数据导入 <a class="header-anchor" href="#_2-1-2-csv数据导入" aria-label="Permalink to &quot;2.1.2 CSV数据导入&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 基础CSV导入</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.csv(</span><span class="__shiki_mdbnqw">&quot;file:///data/employees.csv&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  header</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  ignore</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;skip_this_column&#39;</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  mapping</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    age</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {type</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;int&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    salary: </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">type</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;float&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    hire_date: </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">type</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;date&#39;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> format</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;yyyy-MM-dd&#39;</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> lineNo, map</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (e:Employee)</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> e </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> map;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 大CSV文件分批处理</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.periodic.iterate(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;CALL apoc.load.csv(&quot;file:///large_data.csv&quot;, {header:true}) YIELD map RETURN map&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;CREATE (n:Record) SET n = map&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">batchSize</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> parallel</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> CSV关系创建</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.csv(</span><span class="__shiki_mdbnqw">&quot;file:///relationships.csv&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">header</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb">true</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> map</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (a </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> map.from_id</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (b </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> map.to_id</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (a)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj">RELATES</span><span class="__shiki_1itgoe"> {</span><span class="__shiki_140thh">type</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> map.relation_type</span><span class="__shiki_1itgoe">}]</span><span class="__shiki_dzsirb">-&gt;</span><span class="__shiki_140thh">(b);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 动态CSV处理</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.csv(</span><span class="__shiki_mdbnqw">&quot;file:///dynamic.csv&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  header</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  sep</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;|&#39;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh"> 自定义分隔符</span></span>
<span class="line"><span class="__shiki_140thh">  quoteChar</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;&quot;&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  arraySep</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;,&#39;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh"> 数组分隔符</span></span>
<span class="line"><span class="__shiki_140thh">  nullValues</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;NULL&#39;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_mdbnqw"> &#39;N/A&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> list, map</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> keys(map), list;</span></span></code></pre></div><h4 id="_2-1-3-xml数据导入" tabindex="-1">2.1.3 XML数据导入 <a class="header-anchor" href="#_2-1-3-xml数据导入" aria-label="Permalink to &quot;2.1.3 XML数据导入&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> XML文件导入</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.xml(</span><span class="__shiki_mdbnqw">&quot;file:///data/catalog.xml&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> value._children </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> product</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> product._type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;product&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (p:Product </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> product.id</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> product.name._text</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  category</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> product.category._text</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  price</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> toFloat</span><span class="__shiki_140thh">(product.price._text)</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 复杂XML结构处理</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.xml(</span><span class="__shiki_mdbnqw">&quot;file:///orders.xml&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  filter</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;/orders/order&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  callback</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    order</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;/orders/order&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    items</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;/orders/order/items/item&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> value.order </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> order, value.items </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> items</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (o:Order </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> order.id</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> o, items</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> items </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> item</span></span>
<span class="line"><span class="__shiki_1itgoe">MERGE</span><span class="__shiki_140thh"> (p:Product </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> item.productId</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (o)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[:</span><span class="__shiki_1t8gfj">CONTAINS</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-&gt;</span><span class="__shiki_140thh">(p);</span></span></code></pre></div><h3 id="_2-2-从外部系统导入" tabindex="-1">2.2 从外部系统导入 <a class="header-anchor" href="#_2-2-从外部系统导入" aria-label="Permalink to &quot;2.2 从外部系统导入&quot;">​</a></h3><h4 id="_2-2-1-关系数据库导入" tabindex="-1">2.2.1 关系数据库导入 <a class="header-anchor" href="#_2-2-1-关系数据库导入" aria-label="Permalink to &quot;2.2.1 关系数据库导入&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> JDBC连接配置（首先设置连接）</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 在neo4j.conf中配置：</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> apoc.jdbc.mysql.connection.url</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">jdbc:mysql:</span><span class="__shiki_21nrsd">//localhost:3306/mydb</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> apoc.jdbc.mysql.connection.user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">root</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> apoc.jdbc.mysql.connection.password</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">secret</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 从MySQL导入</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.jdbc(</span><span class="__shiki_mdbnqw">&#39;mysql&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;SELECT * FROM users&#39;</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> row</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (u:User </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> row.id</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  username</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> row.username</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  email</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> row.email</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 带参数的JDBC查询</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.jdbcParams(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;mysql&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;SELECT * FROM orders WHERE status = ? AND date &gt; ?&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_mdbnqw">&#39;SHIPPED&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;2023-01-01&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> row</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 批量关系导入</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.jdbc(</span><span class="__shiki_mdbnqw">&#39;mysql&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;SELECT * FROM friendships&#39;</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> row</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (a:User </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> row.user_id</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (b:User </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> row.friend_id</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (a)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[:</span><span class="__shiki_1t8gfj">FRIEND</span><span class="__shiki_1itgoe"> {</span></span>
<span class="line"><span class="__shiki_140thh">  since</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> row.created_at</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  closeness</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> row.score</span></span>
<span class="line"><span class="__shiki_1itgoe">}]</span><span class="__shiki_dzsirb">-&gt;</span><span class="__shiki_140thh">(b);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 增量数据同步</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.jdbc(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;mysql&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;SELECT * FROM logs WHERE updated_at &gt; ?&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  [apoc.date.format(</span><span class="__shiki_dzsirb">timestamp</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 86400000</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;s&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;yyyy-MM-dd HH:mm:ss&#39;</span><span class="__shiki_140thh">)]</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> row</span></span>
<span class="line"><span class="__shiki_1itgoe">MERGE</span><span class="__shiki_140thh"> (l:Log </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> row.id</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">ON CREATE</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> l </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> row</span></span>
<span class="line"><span class="__shiki_1itgoe">ON MATCH</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> l </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> row;</span></span></code></pre></div><h4 id="_2-2-2-elasticsearch集成" tabindex="-1">2.2.2 Elasticsearch集成 <a class="header-anchor" href="#_2-2-2-elasticsearch集成" aria-label="Permalink to &quot;2.2.2 Elasticsearch集成&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> ES数据导入</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.es.query(</span><span class="__shiki_mdbnqw">&#39;localhost:9200&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;products&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;product&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;{&quot;query&quot;: {&quot;match_all&quot;: {}}, &quot;size&quot;: 1000}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> value.hits.hits </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> hits</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> hits </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> hit</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (p:Product)</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> hit._source, p.esId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> hit._id;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 双向同步示例</span></span>
<span class="line"><span class="__shiki_21nrsd">// 1. 从Neo4j推送到ES</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Product)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.updated </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> timestamp</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 3600000</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.es.post(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;localhost:9200&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;products/_doc/&#39;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> p.id,</span></span>
<span class="line"><span class="__shiki_dzsirb">  null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  apoc.convert.toJson(properties(p))</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 从ES拉取更新</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.es.get(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;localhost:9200&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;products/_search&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;{&quot;query&quot;: {&quot;range&quot;: {&quot;timestamp&quot;: {&quot;gte&quot;: &quot;now-1h&quot;}}}}&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> value.hits.hits </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> hits</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> hits </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> hit</span></span>
<span class="line"><span class="__shiki_1itgoe">MERGE</span><span class="__shiki_140thh"> (p:Product </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> hit._id</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> hit._source;</span></span></code></pre></div><h3 id="_2-3-数据导出" tabindex="-1">2.3 数据导出 <a class="header-anchor" href="#_2-3-数据导出" aria-label="Permalink to &quot;2.3 数据导出&quot;">​</a></h3><h4 id="_2-3-1-导出到文件" tabindex="-1">2.3.1 导出到文件 <a class="header-anchor" href="#_2-3-1-导出到文件" aria-label="Permalink to &quot;2.3.1 导出到文件&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 导出JSON</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.export.json.</span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;file:///export/all.json&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  useTypes</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  stream</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  format</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;json&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 导出特定查询结果</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.export.json.query(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;MATCH (p:Person)-[r]-&gt;(m) RETURN p, r, m&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;file:///export/persons.json&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {}</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 导出CSV</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.export.csv.</span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;file:///export/all.csv&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  quotes</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;ifNeeded&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  delimiter</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;,&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  useTypes</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  bulkImport</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 带批处理的导出</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.export.csv.query(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;MATCH (p:Person) RETURN p.name as name, p.age as age&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;file:///export/people.csv&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span></span>
<span class="line"><span class="__shiki_140thh">    batchSize</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    separateHeader</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 导出Cypher语句（用于备份）</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.export.cypher.</span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;file:///export/backup.cypher&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  format</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;cypher-shell&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  useOptimizations</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {type</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;UNWIND_BATCH&quot;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> unwindBatchSize</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 导出子图</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> path </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (p:Person </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;Alice&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[:</span><span class="__shiki_1t8gfj">KNOWS</span><span class="__shiki_dzsirb">*1..3</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-&gt;</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_dzsirb"> collect</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">nodes</span><span class="__shiki_140thh">(path)) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> collect</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">relationships</span><span class="__shiki_140thh">(path)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> graph</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.export.json.data(graph, [], </span><span class="__shiki_mdbnqw">&#39;file:///export/subgraph.json&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> file, source, format, nodes, relationships, properties, time</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> file, nodes, time;</span></span></code></pre></div><h4 id="_2-3-2-导出到其他系统" tabindex="-1">2.3.2 导出到其他系统 <a class="header-anchor" href="#_2-3-2-导出到其他系统" aria-label="Permalink to &quot;2.3.2 导出到其他系统&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 导出到Elasticsearch</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Product)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.updated </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> timestamp</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 86400000</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.es.post(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;localhost:9200&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;products/_doc/&#39;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> p.id,</span></span>
<span class="line"><span class="__shiki_dzsirb">  null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  apoc.convert.toJson(properties(p))</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> documentsIndexed;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 导出到Kafka</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.export.kafka(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;MATCH (t:Transaction) WHERE t.amount &gt; 10000 RETURN t&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;suspicious-transactions&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;bootstrap.servers&#39;</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;kafka1:9092,kafka2:9092&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;key.serializer&#39;</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;org.apache.kafka.common.serialization.StringSerializer&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;value.serializer&#39;</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;org.apache.kafka.common.serialization.StringSerializer&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 导出到关系数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (u:User)</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.jdbcUpdate(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;mysql&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;INSERT INTO users_archive (id, name, email) VALUES (?, ?, ?) </span></span>
<span class="line"><span class="__shiki_mdbnqw">   ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email)&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  [u.id, u.name, u.email]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> row</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">);</span></span></code></pre></div><h2 id="三、图算法与操作" tabindex="-1">三、图算法与操作 <a class="header-anchor" href="#三、图算法与操作" aria-label="Permalink to &quot;三、图算法与操作&quot;">​</a></h2><h3 id="_3-1-路径与遍历算法" tabindex="-1">3.1 路径与遍历算法 <a class="header-anchor" href="#_3-1-路径与遍历算法" aria-label="Permalink to &quot;3.1 路径与遍历算法&quot;">​</a></h3><h4 id="_3-1-1-最短路径算法" tabindex="-1">3.1.1 最短路径算法 <a class="header-anchor" href="#_3-1-1-最短路径算法" aria-label="Permalink to &quot;3.1.1 最短路径算法&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> Dijkstra算法（加权最短路径）</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">start</span><span class="__shiki_140thh">:City </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;Berlin&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">), (</span><span class="__shiki_1itgoe">end</span><span class="__shiki_140thh">:City </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;Rome&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.algo.dijkstra(</span><span class="__shiki_1itgoe">start</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">end</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;ROAD&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;distance&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> path, weight</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> [node </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> nodes</span><span class="__shiki_140thh">(path) | node.name] </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> route, </span></span>
<span class="line"><span class="__shiki_dzsirb">       round</span><span class="__shiki_140thh">(weight, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> totalDistance;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> A</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">算法（带启发式）</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">start</span><span class="__shiki_140thh">:Location </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">x</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> y</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">), (</span><span class="__shiki_1itgoe">end</span><span class="__shiki_140thh">:Location </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">x</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> y</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.algo.aStar(</span></span>
<span class="line"><span class="__shiki_1itgoe">  start</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">  end</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;CONNECTED_TO&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;cost&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;x&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;y&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> path, weight</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> length</span><span class="__shiki_140thh">(path) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> hops, weight;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 所有最短路径</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (a:Person </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;Alice&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">), (b:Person </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;Bob&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.algo.allSimplePaths(a, b, </span><span class="__shiki_mdbnqw">&#39;KNOWS&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> path</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> path, </span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">(path) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> distance</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> distance;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 带约束的最短路径</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">start</span><span class="__shiki_140thh">:Warehouse), (</span><span class="__shiki_1itgoe">end</span><span class="__shiki_140thh">:Store)</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.algo.dijkstra(</span></span>
<span class="line"><span class="__shiki_1itgoe">  start</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">  end</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;DELIVERY_ROUTE&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;estimatedTime&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;OUTGOING&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> path, weight</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> all</span><span class="__shiki_140thh">(node </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> nodes</span><span class="__shiki_140thh">(path) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> node.operatingHours </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;24/7&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> path, weight;</span></span></code></pre></div><h4 id="_3-1-2-扩展遍历" tabindex="-1">3.1.2 扩展遍历 <a class="header-anchor" href="#_3-1-2-扩展遍历" aria-label="Permalink to &quot;3.1.2 扩展遍历&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 广度优先遍历</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (root:Person </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;CEO&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.path.spanningTree(root, </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  relationshipFilter</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;MANAGES&gt;&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  minLevel</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  maxLevel</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  bfs</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  limit</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> path</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> last</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">nodes</span><span class="__shiki_140thh">(path)).name </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> employee, </span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">(path) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> depth</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> depth;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 深度优先遍历</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">start</span><span class="__shiki_140thh">:Category </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;Electronics&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.path.subgraphNodes(</span><span class="__shiki_1itgoe">start</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  relationshipFilter</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;SUBCATEGORY_OF&gt;|BELONGS_TO&gt;&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  labelFilter</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;+Category|+Product&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  uniqueness</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;NODE_PATH&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  maxLevel</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.name, </span><span class="__shiki_dzsirb">labels</span><span class="__shiki_140thh">(node);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 条件遍历</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;Alice&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.path.expandConfig(p, </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  relationshipFilter</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;KNOWS&gt;|WORKS_WITH&gt;&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  minLevel</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  maxLevel</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  terminatorNodes</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> [(p2</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh">Person) WHERE p2.department </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;HR&#39;</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  uniqueness</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;NODE_GLOBAL&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> path</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> [node </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> nodes</span><span class="__shiki_140thh">(path) | node.name] </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> visited;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 子图提取</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (center:Person </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;123&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.path.subgraphAll(center, </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  relationshipFilter</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;KNOWS|FRIEND|COLLEAGUE&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  maxLevel</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> nodes, relationships</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> size(nodes) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> nodeCount, size(relationships) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> relationshipCount;</span></span></code></pre></div><h3 id="_3-2-中心性算法" tabindex="-1">3.2 中心性算法 <a class="header-anchor" href="#_3-2-中心性算法" aria-label="Permalink to &quot;3.2 中心性算法&quot;">​</a></h3><h4 id="_3-2-1-pagerank算法" tabindex="-1">3.2.1 PageRank算法 <a class="header-anchor" href="#_3-2-1-pagerank算法" aria-label="Permalink to &quot;3.2.1 PageRank算法&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 基本PageRank</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.algo.pageRank([</span><span class="__shiki_mdbnqw">&#39;Person&#39;</span><span class="__shiki_140thh">], [</span><span class="__shiki_mdbnqw">&#39;FOLLOWS&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.name, score</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 带阻尼因子的PageRank</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.algo.pageRankWithConfig([</span><span class="__shiki_mdbnqw">&#39;User&#39;</span><span class="__shiki_140thh">], [</span><span class="__shiki_mdbnqw">&#39;FOLLOWS&#39;</span><span class="__shiki_140thh">], </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  dampingFactor</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 0.85</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  iterations</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  write</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  writeProperty</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;pagerank&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> nodes, iterations, writeProperty</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> nodes, iterations;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 个性化PageRank</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (target:User </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">username</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;influencer&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.algo.pageRank([target], [</span><span class="__shiki_mdbnqw">&#39;FOLLOWS&#39;</span><span class="__shiki_140thh">], </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">iterations</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> node </span><span class="__shiki_1itgoe">&lt;&gt;</span><span class="__shiki_140thh"> target</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.username, score</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_3-2-2-中介中心性" tabindex="-1">3.2.2 中介中心性 <a class="header-anchor" href="#_3-2-2-中介中心性" aria-label="Permalink to &quot;3.2.2 中介中心性&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> Betweenness Centrality</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.algo.betweenness([</span><span class="__shiki_mdbnqw">&#39;Person&#39;</span><span class="__shiki_140thh">], [</span><span class="__shiki_mdbnqw">&#39;KNOWS&#39;</span><span class="__shiki_140thh">], </span><span class="__shiki_mdbnqw">&#39;BOTH&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.name, score</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 接近中心性 (Closeness Centrality)</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.algo.closeness([</span><span class="__shiki_mdbnqw">&#39;Person&#39;</span><span class="__shiki_140thh">], [</span><span class="__shiki_mdbnqw">&#39;KNOWS&#39;</span><span class="__shiki_140thh">], </span><span class="__shiki_mdbnqw">&#39;BOTH&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.name, score</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 度中心性 (快速计算)</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> p.name, </span></span>
<span class="line"><span class="__shiki_140thh">       size((p)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[:</span><span class="__shiki_1t8gfj">KNOWS</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-</span><span class="__shiki_140thh">()) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> degreeCentrality</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> degreeCentrality </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_3-3-社区检测" tabindex="-1">3.3 社区检测 <a class="header-anchor" href="#_3-3-社区检测" aria-label="Permalink to &quot;3.3 社区检测&quot;">​</a></h3><h4 id="_3-3-1-louvain算法" tabindex="-1">3.3.1 Louvain算法 <a class="header-anchor" href="#_3-3-1-louvain算法" aria-label="Permalink to &quot;3.3.1 Louvain算法&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> Louvain社区检测</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.algo.community(</span><span class="__shiki_dzsirb">25</span><span class="__shiki_140thh">, [</span><span class="__shiki_mdbnqw">&#39;User&#39;</span><span class="__shiki_140thh">], </span><span class="__shiki_mdbnqw">&#39;FOLLOWS&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;BOTH&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, community</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> community, </span></span>
<span class="line"><span class="__shiki_dzsirb">       count</span><span class="__shiki_140thh">(node) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> size, </span></span>
<span class="line"><span class="__shiki_dzsirb">       collect</span><span class="__shiki_140thh">(node.username) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> members</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> size </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 带权重的社区检测</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.algo.community(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">, [</span><span class="__shiki_mdbnqw">&#39;Person&#39;</span><span class="__shiki_140thh">], </span><span class="__shiki_mdbnqw">&#39;INTERACTS&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;BOTH&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;weight&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, community</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> community, </span><span class="__shiki_dzsirb">collect</span><span class="__shiki_140thh">(node) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> members</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> size(members) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> community, </span></span>
<span class="line"><span class="__shiki_140thh">       size(members) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> communitySize,</span></span>
<span class="line"><span class="__shiki_140thh">       [n </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> members | n.name][</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">..</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> sampleMembers;</span></span></code></pre></div><h4 id="_3-3-2-标签传播" tabindex="-1">3.3.2 标签传播 <a class="header-anchor" href="#_3-3-2-标签传播" aria-label="Permalink to &quot;3.3.2 标签传播&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 标签传播算法</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.algo.labelPropagation([</span><span class="__shiki_mdbnqw">&#39;User&#39;</span><span class="__shiki_140thh">], [</span><span class="__shiki_mdbnqw">&#39;FOLLOWS&#39;</span><span class="__shiki_140thh">], </span><span class="__shiki_mdbnqw">&#39;BOTH&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;weight&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, label</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> label, </span><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(node) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> clusterSize</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> clusterSize </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 带初始标签的传播</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (u:User)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> u.interests </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> u.__lpa </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> reduce</span><span class="__shiki_140thh">(s </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">, interest </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> u.interests | s </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> interest);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.algo.labelPropagation([</span><span class="__shiki_mdbnqw">&#39;User&#39;</span><span class="__shiki_140thh">], [</span><span class="__shiki_mdbnqw">&#39;FOLLOWS&#39;</span><span class="__shiki_140thh">], </span><span class="__shiki_mdbnqw">&#39;BOTH&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;BOTH&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, label</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> node.community </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> label;</span></span></code></pre></div><h3 id="_3-4-相似性算法" tabindex="-1">3.4 相似性算法 <a class="header-anchor" href="#_3-4-相似性算法" aria-label="Permalink to &quot;3.4 相似性算法&quot;">​</a></h3><h4 id="_3-4-1-jaccard相似度" tabindex="-1">3.4.1 Jaccard相似度 <a class="header-anchor" href="#_3-4-1-jaccard相似度" aria-label="Permalink to &quot;3.4.1 Jaccard相似度&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> Jaccard相似度计算</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p1:Person </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;Alice&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">), (p2:Person </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;Bob&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> p1, p2,</span></span>
<span class="line"><span class="__shiki_140thh">     [(p1)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[:</span><span class="__shiki_1t8gfj">LIKES</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-&gt;</span><span class="__shiki_140thh">(m:Movie) | m] </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> movies1,</span></span>
<span class="line"><span class="__shiki_140thh">     [(p2)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[:</span><span class="__shiki_1t8gfj">LIKES</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-&gt;</span><span class="__shiki_140thh">(m:Movie) | m] </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> movies2</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.algo.jaccardSimilarity(movies1, movies2) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> similarity;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 批量相似度计算</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_dzsirb"> collect</span><span class="__shiki_140thh">(p) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> people</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> people </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> p1</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> people </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> p2</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> p1, p2</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> id</span><span class="__shiki_140thh">(p1) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> id</span><span class="__shiki_140thh">(p2)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> p1, p2,</span></span>
<span class="line"><span class="__shiki_140thh">     [(p1)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[:</span><span class="__shiki_1t8gfj">HAS_SKILL</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-&gt;</span><span class="__shiki_140thh">(s) | s] </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> skills1,</span></span>
<span class="line"><span class="__shiki_140thh">     [(p2)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[:</span><span class="__shiki_1t8gfj">HAS_SKILL</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-&gt;</span><span class="__shiki_140thh">(s) | s] </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> skills2</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> size(skills1) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> size(skills2) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> p1.name, p2.name, </span></span>
<span class="line"><span class="__shiki_140thh">       apoc.algo.jaccardSimilarity(skills1, skills2) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> similarity</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> similarity </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_3-4-2-余弦相似度" tabindex="-1">3.4.2 余弦相似度 <a class="header-anchor" href="#_3-4-2-余弦相似度" aria-label="Permalink to &quot;3.4.2 余弦相似度&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 向量相似度计算</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (d1:Document), (d2:Document)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> d1.vector </span><span class="__shiki_1itgoe">IS NOT NULL</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> d2.vector </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> d1.title, d2.title,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.algo.cosineSimilarity(d1.vector, d2.vector) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> similarity</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> similarity </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 基于共同邻居的相似度</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (a:User)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[:</span><span class="__shiki_1t8gfj">FRIEND</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-</span><span class="__shiki_140thh">(common)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[:</span><span class="__shiki_1t8gfj">FRIEND</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-</span><span class="__shiki_140thh">(b:User)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">&lt;&gt;</span><span class="__shiki_140thh"> b</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> a, b, </span><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(common) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> commonFriends</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> a.name, b.name, commonFriends</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> commonFriends </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="四、数据转换与增强" tabindex="-1">四、数据转换与增强 <a class="header-anchor" href="#四、数据转换与增强" aria-label="Permalink to &quot;四、数据转换与增强&quot;">​</a></h2><h3 id="_4-1-数据类型转换" tabindex="-1">4.1 数据类型转换 <a class="header-anchor" href="#_4-1-数据类型转换" aria-label="Permalink to &quot;4.1 数据类型转换&quot;">​</a></h3><h4 id="_4-1-1-json-map转换" tabindex="-1">4.1.1 JSON/Map转换 <a class="header-anchor" href="#_4-1-1-json-map转换" aria-label="Permalink to &quot;4.1.1 JSON/Map转换&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 对象转JSON</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> p.name, </span></span>
<span class="line"><span class="__shiki_140thh">       apoc.convert.toJson(p) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> json,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.convert.toJson(properties(p)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> propsJson;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> JSON解析</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_mdbnqw"> &#39;{&quot;name&quot;: &quot;Alice&quot;, &quot;age&quot;: 30, &quot;active&quot;: true}&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> json</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.convert.fromJsonMap(json) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> map,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.convert.fromJsonList(</span><span class="__shiki_mdbnqw">&#39;[1,2,3]&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> list;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> Map</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">List操作</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.map.setKey(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">a</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;b&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> newMap,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.map.</span><span class="__shiki_1itgoe">merge</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">a</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">b</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> c</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> merged,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.map.removeKey(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">a</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> b</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;a&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> removed;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 提取子对象</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_1itgoe"> {</span><span class="__shiki_140thh">user</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;Alice&#39;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> address</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {city</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;NYC&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">}} </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> data</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.convert.toTree([data]) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> tree,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.data.path(data, </span><span class="__shiki_mdbnqw">&#39;.user.address.city&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> city;</span></span></code></pre></div><h4 id="_4-1-2-数据类型转换" tabindex="-1">4.1.2 数据类型转换 <a class="header-anchor" href="#_4-1-2-数据类型转换" aria-label="Permalink to &quot;4.1.2 数据类型转换&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 基础类型转换</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.convert.toString(</span><span class="__shiki_dzsirb">123</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> str,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.convert.toInteger(</span><span class="__shiki_mdbnqw">&#39;456&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> int,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.convert.</span><span class="__shiki_dzsirb">toFloat</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;3.14&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> float,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.convert.toBoolean(</span><span class="__shiki_mdbnqw">&#39;true&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> bool;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 日期时间转换</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.date.parse(</span><span class="__shiki_mdbnqw">&#39;2023-12-25&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;s&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;yyyy-MM-dd&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> timestamp,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.date.format(</span><span class="__shiki_dzsirb">timestamp</span><span class="__shiki_140thh">(), </span><span class="__shiki_mdbnqw">&#39;ms&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;yyyy-MM-dd HH:mm:ss&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> formatted,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.date.toISO8601(</span><span class="__shiki_dzsirb">timestamp</span><span class="__shiki_140thh">()) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> iso8601;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> Hex</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">Binary转换</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.convert.toHex(</span><span class="__shiki_mdbnqw">&#39;Hello&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> hex,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.convert.fromHex(</span><span class="__shiki_mdbnqw">&#39;48656c6c6f&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> text,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.convert.toBase64(</span><span class="__shiki_mdbnqw">&#39;Neo4j&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> base64;</span></span></code></pre></div><h3 id="_4-2-文本处理" tabindex="-1">4.2 文本处理 <a class="header-anchor" href="#_4-2-文本处理" aria-label="Permalink to &quot;4.2 文本处理&quot;">​</a></h3><h4 id="_4-2-1-字符串操作" tabindex="-1">4.2.1 字符串操作 <a class="header-anchor" href="#_4-2-1-字符串操作" aria-label="Permalink to &quot;4.2.1 字符串操作&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 文本清洗</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.text.clean(</span><span class="__shiki_mdbnqw">&#39;  Hello  World!  &#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> cleaned,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.text.</span><span class="__shiki_dzsirb">replace</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;hello world&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;world&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Neo4j&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> replaced,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.text.join([</span><span class="__shiki_mdbnqw">&#39;Hello&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;World&#39;</span><span class="__shiki_140thh">], </span><span class="__shiki_mdbnqw">&#39; &#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> joined;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 正则表达式</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.text.regexGroups(</span><span class="__shiki_mdbnqw">&#39;Price: $123.45&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">$(</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">d+</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">d+)&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> matches,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.text.replaceAll(</span><span class="__shiki_mdbnqw">&#39;a1b2c3&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;[0-9]&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> lettersOnly;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 音形码（语音相似）</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.text.phonetic(</span><span class="__shiki_mdbnqw">&#39;Smith&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> phonetic,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.text.doubleMetaphone(</span><span class="__shiki_mdbnqw">&#39;Smith&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> metaphone;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 相似度计算</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.text.hammingDistance(</span><span class="__shiki_mdbnqw">&#39;abc&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;abd&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> hamming,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.text.levenshteinSimilarity(</span><span class="__shiki_mdbnqw">&#39;kitten&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;sitting&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> levenshtein,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.text.jaroWinklerDistance(</span><span class="__shiki_mdbnqw">&#39;MARTHA&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;MARHTA&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> jaroWinkler;</span></span></code></pre></div><h4 id="_4-2-2-nlp功能" tabindex="-1">4.2.2 NLP功能 <a class="header-anchor" href="#_4-2-2-nlp功能" aria-label="Permalink to &quot;4.2.2 NLP功能&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 分词和标准化</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.text.</span><span class="__shiki_dzsirb">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;apple,banana,cherry&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> split,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.text.slug(</span><span class="__shiki_mdbnqw">&#39;Hello World!&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> slug,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.text.camelCase(</span><span class="__shiki_mdbnqw">&#39;hello_world&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> camelCase,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.text.capitalize(</span><span class="__shiki_mdbnqw">&#39;hello world&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> capitalized;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 停用词移除</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.text.removeStopWords(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;this is a sample text with some stop words&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;en&#39;</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> cleanedText;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 关键词提取</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_mdbnqw"> &#39;Neo4j is a graph database management system&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> text</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.nlp.google.keywords(text, </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  apiKey</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;YOUR_API_KEY&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> keywords;</span></span></code></pre></div><h3 id="_4-3-空间数据处理" tabindex="-1">4.3 空间数据处理 <a class="header-anchor" href="#_4-3-空间数据处理" aria-label="Permalink to &quot;4.3 空间数据处理&quot;">​</a></h3><h4 id="_4-3-1-地理坐标处理" tabindex="-1">4.3.1 地理坐标处理 <a class="header-anchor" href="#_4-3-1-地理坐标处理" aria-label="Permalink to &quot;4.3.1 地理坐标处理&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 创建和操作点</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> point(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">latitude</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 40.7128</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> longitude</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">74.0060</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> nyc,</span></span>
<span class="line"><span class="__shiki_140thh">       point(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">x</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> y</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> crs</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;cartesian&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> cartesian,</span></span>
<span class="line"><span class="__shiki_140thh">       point(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">latitude</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 40.7128</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> longitude</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">74.0060</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> height</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> nyc3d;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 距离计算</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> point(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">latitude</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 40.7128</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> longitude</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">74.0060</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> nyc,</span></span>
<span class="line"><span class="__shiki_140thh">     point(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">latitude</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 51.5074</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> longitude</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">0.1278</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> london</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.spatial.distance(nyc, london) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> distanceKm,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.spatial.distance(nyc, london, </span><span class="__shiki_mdbnqw">&#39;km&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> distanceKmExplicit;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 地理围栏</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> point(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">latitude</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 40.7128</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> longitude</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">74.0060</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> center</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.spatial.withinDistance(</span></span>
<span class="line"><span class="__shiki_140thh">  center, </span></span>
<span class="line"><span class="__shiki_140thh">  point(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">latitude</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 40.7589</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> longitude</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">73.9851</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">  10</span><span class="__shiki_140thh">,  </span><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 公里</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;km&#39;</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> withinRange;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 空间索引支持</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (l:Location)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> apoc.spatial.withinDistance(</span></span>
<span class="line"><span class="__shiki_140thh">  l.coordinates, </span></span>
<span class="line"><span class="__shiki_140thh">  point(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">latitude</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 40.7128</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> longitude</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">74.0060</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">  50</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;km&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> l.name, l.coordinates;</span></span></code></pre></div><h2 id="五、系统集成与监控" tabindex="-1">五、系统集成与监控 <a class="header-anchor" href="#五、系统集成与监控" aria-label="Permalink to &quot;五、系统集成与监控&quot;">​</a></h2><h3 id="_5-1-外部系统集成" tabindex="-1">5.1 外部系统集成 <a class="header-anchor" href="#_5-1-外部系统集成" aria-label="Permalink to &quot;5.1 外部系统集成&quot;">​</a></h3><h4 id="_5-1-1-http-rest-api集成" tabindex="-1">5.1.1 HTTP/REST API集成 <a class="header-anchor" href="#_5-1-1-http-rest-api集成" aria-label="Permalink to &quot;5.1.1 HTTP/REST API集成&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> GET请求</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.jsonParams(</span><span class="__shiki_mdbnqw">&#39;https://api.example.com/data&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{}</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> value;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> POST请求</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.jsonParams(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;https://api.example.com/submit&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">method</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;POST&#39;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> headers</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;application/json&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">  apoc.convert.toJson(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;Alice&#39;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> age</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> value;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 带认证的请求</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.jsonParams(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;https://api.example.com/secure&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span></span>
<span class="line"><span class="__shiki_140thh">    method</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;GET&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    headers</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;Authorization&#39;</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;Bearer &#39;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> $token</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;Accept&#39;</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;application/json&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_dzsirb">  null</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> value;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 批量API调用</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> page</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.jsonParams(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;https://api.example.com/items?page=&#39;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> page,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {}</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">null</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> value.items </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> item</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> item.id, item.name;</span></span></code></pre></div><h4 id="_5-1-2-消息队列集成" tabindex="-1">5.1.2 消息队列集成 <a class="header-anchor" href="#_5-1-2-消息队列集成" aria-label="Permalink to &quot;5.1.2 消息队列集成&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 发送到Kafka</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.kafka(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;kafka:9092&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;my-topic&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  apoc.convert.toJson(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">event</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;user_login&#39;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> userId</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 123</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;key.serializer&#39;</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;org.apache.kafka.common.serialization.StringSerializer&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;value.serializer&#39;</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;org.apache.kafka.common.serialization.StringSerializer&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 从Kafka消费（需要额外配置）</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 通常作为独立进程运行，通过触发器或定期任务调用</span></span></code></pre></div><h3 id="_5-2-数据库监控与元数据" tabindex="-1">5.2 数据库监控与元数据 <a class="header-anchor" href="#_5-2-数据库监控与元数据" aria-label="Permalink to &quot;5.2 数据库监控与元数据&quot;">​</a></h3><h4 id="_5-2-1-元数据查询" tabindex="-1">5.2.1 元数据查询 <a class="header-anchor" href="#_5-2-1-元数据查询" aria-label="Permalink to &quot;5.2.1 元数据查询&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看数据库模式</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.meta.graph()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> nodes, relationships</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> nodes, relationships;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 详细模式分析</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.meta.schema()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> value;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 节点和关系统计</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.meta.stats()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> labelCount, propertyCount, relTypeCount, labels, relTypes</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> labelCount, propertyCount, relTypeCount;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 数据采样和分析</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.meta.data()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> label, property, count, unique, type, sample</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> label, property, count, type, sample</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> label, property;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 子图模式分析</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[:</span><span class="__shiki_1t8gfj">WORKS_AT</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-&gt;</span><span class="__shiki_140thh">(c:Company)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_dzsirb"> collect</span><span class="__shiki_140thh">(p) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> collect</span><span class="__shiki_140thh">(c) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> subgraph</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.meta.subGraph(subgraph)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> nodes, relationships</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> nodes, relationships;</span></span></code></pre></div><h4 id="_5-2-2-性能监控" tabindex="-1">5.2.2 性能监控 <a class="header-anchor" href="#_5-2-2-性能监控" aria-label="Permalink to &quot;5.2.2 性能监控&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查询性能监控</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.monitor.kernel()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> pageCache, fileDescriptors, storeSize, transactionStartTime</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> pageCache, storeSize;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 锁监控</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.monitor.locks()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> resourceType, resourceId, transactionId, mode, waitTime</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> resourceType, </span><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> lockCount</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> lockCount </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 事务监控</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.monitor.tx()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> rolledBackTx, peakTx, totalTx, lastTxId, openTx</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> rolledBackTx, peakTx, openTx;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查询分析</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.monitor.query()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> queryId, query, parameters, username, metaData, startTime, elapsedTime</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> elapsedTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_dzsirb">  --</span><span class="__shiki_140thh"> 超过1秒的查询</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> queryId, </span><span class="__shiki_dzsirb">left</span><span class="__shiki_140thh">(query, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> shortQuery, elapsedTime</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> elapsedTime </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_5-3-触发器与事件处理" tabindex="-1">5.3 触发器与事件处理 <a class="header-anchor" href="#_5-3-触发器与事件处理" aria-label="Permalink to &quot;5.3 触发器与事件处理&quot;">​</a></h3><h4 id="_5-3-1-触发器创建" tabindex="-1">5.3.1 触发器创建 <a class="header-anchor" href="#_5-3-1-触发器创建" aria-label="Permalink to &quot;5.3.1 触发器创建&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 创建节点触发器</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.trigger.add(</span><span class="__shiki_mdbnqw">&#39;timestampOnCreate&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;UNWIND apoc.trigger.nodesByLabel($assignedLabels, &quot;Person&quot;) AS n</span></span>
<span class="line"><span class="__shiki_mdbnqw">   SET n.createdAt = timestamp(), n.updatedAt = timestamp()&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">phase</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;after&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 创建关系触发器</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.trigger.add(</span><span class="__shiki_mdbnqw">&#39;relationshipCounter&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;UNWIND $createdRelationships AS r</span></span>
<span class="line"><span class="__shiki_mdbnqw">   MATCH (a) WHERE id(a) = id(startNode(r))</span></span>
<span class="line"><span class="__shiki_mdbnqw">   SET a.relationshipCount = coalesce(a.relationshipCount, 0) + 1&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">phase</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;after&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 属性变更触发器</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.trigger.add(</span><span class="__shiki_mdbnqw">&#39;updateTimestamp&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;UNWIND apoc.trigger.propertiesByKey($assignedNodeProperties, &quot;name&quot;) AS prop</span></span>
<span class="line"><span class="__shiki_mdbnqw">   WITH prop.node AS n</span></span>
<span class="line"><span class="__shiki_mdbnqw">   SET n.updatedAt = timestamp(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">       n.updateCount = coalesce(n.updateCount, 0) + 1&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">phase</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;after&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 删除触发器</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.trigger.add(</span><span class="__shiki_mdbnqw">&#39;archiveOnDelete&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;UNWIND $deletedNodes AS n</span></span>
<span class="line"><span class="__shiki_mdbnqw">   CREATE (a:ArchivedNode)</span></span>
<span class="line"><span class="__shiki_mdbnqw">   SET a = n, a.deletedAt = timestamp(), a.originalId = id(n)&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">phase</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;before&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_5-3-2-触发器管理" tabindex="-1">5.3.2 触发器管理 <a class="header-anchor" href="#_5-3-2-触发器管理" aria-label="Permalink to &quot;5.3.2 触发器管理&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 列出所有触发器</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.trigger.list()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> name, query, selector, installed, paused</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> name, </span><span class="__shiki_dzsirb">left</span><span class="__shiki_140thh">(query, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> queryPreview, installed, paused;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 暂停触发器</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.trigger.pause(</span><span class="__shiki_mdbnqw">&#39;timestampOnCreate&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 恢复触发器</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.trigger.resume(</span><span class="__shiki_mdbnqw">&#39;timestampOnCreate&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 移除触发器</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.trigger.</span><span class="__shiki_1itgoe">remove</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;timestampOnCreate&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 触发器状态检查</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.trigger.show(</span><span class="__shiki_mdbnqw">&#39;timestampOnCreate&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> name, query, selector, installed, paused</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> name, installed, paused;</span></span></code></pre></div><h2 id="六、实用工具与最佳实践" tabindex="-1">六、实用工具与最佳实践 <a class="header-anchor" href="#六、实用工具与最佳实践" aria-label="Permalink to &quot;六、实用工具与最佳实践&quot;">​</a></h2><h3 id="_6-1-批处理与并行处理" tabindex="-1">6.1 批处理与并行处理 <a class="header-anchor" href="#_6-1-批处理与并行处理" aria-label="Permalink to &quot;6.1 批处理与并行处理&quot;">​</a></h3><h4 id="_6-1-1-周期性迭代" tabindex="-1">6.1.1 周期性迭代 <a class="header-anchor" href="#_6-1-1-周期性迭代" aria-label="Permalink to &quot;6.1.1 周期性迭代&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 基础批处理</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.periodic.iterate(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;MATCH (p:Person) WHERE p.processed = false RETURN p&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;SET p.processed = true, p.batchId = $batchId&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span></span>
<span class="line"><span class="__shiki_140thh">    batchSize</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    parallel</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    params</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {batchId</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> timestamp</span><span class="__shiki_140thh">()</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> batches, total, timeTaken, committedOperations</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> batches, total, timeTaken;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 并行批处理</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.periodic.iterate(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;MATCH (u:User) RETURN u&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;MATCH (u)-[:FRIEND]-&gt;(f)</span></span>
<span class="line"><span class="__shiki_mdbnqw">   SET u.friendCount = size(collect(f))&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span></span>
<span class="line"><span class="__shiki_140thh">    batchSize</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    parallel</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    concurrency</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    retries</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 条件批处理</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.periodic.commit(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;MATCH (p:Person) WHERE p.processed = false</span></span>
<span class="line"><span class="__shiki_mdbnqw">   WITH p LIMIT $limit</span></span>
<span class="line"><span class="__shiki_mdbnqw">   SET p.processed = true</span></span>
<span class="line"><span class="__shiki_mdbnqw">   RETURN count(p)&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">limit</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 链式批处理</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.periodic.iterate(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;MATCH (o:Order) WHERE o.status = &quot;pending&quot; RETURN o&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;MATCH (o)-[:CONTAINS]-&gt;(i:Item)</span></span>
<span class="line"><span class="__shiki_mdbnqw">   SET o.total = reduce(sum = 0, item IN collect(i) | sum + item.price)&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">batchSize</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> batches, total, timeTaken</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.periodic.iterate(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;MATCH (o:Order) WHERE o.total &gt; 1000 RETURN o&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;SET o.priority = &quot;high&quot;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">batchSize</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> batches, total, timeTaken;</span></span></code></pre></div><h4 id="_6-1-2-提交控制" tabindex="-1">6.1.2 提交控制 <a class="header-anchor" href="#_6-1-2-提交控制" aria-label="Permalink to &quot;6.1.2 提交控制&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 手动事务控制</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.periodic.commit(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;MATCH (n:Unprocessed) </span></span>
<span class="line"><span class="__shiki_mdbnqw">   WITH n LIMIT $limit</span></span>
<span class="line"><span class="__shiki_mdbnqw">   DELETE n</span></span>
<span class="line"><span class="__shiki_mdbnqw">   RETURN count(*)&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">limit</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 带错误处理的批处理</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.periodic.iterate(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;MATCH (d:Data) RETURN d&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;SET d.value = d.value * 2&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span></span>
<span class="line"><span class="__shiki_140thh">    batchSize</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    failedParams</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    failedBatches</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> batches, total, errorMessages, failedBatches, failedParams</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> batches, total, size(errorMessages) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> errors, failedBatches;</span></span></code></pre></div><h3 id="_6-2-uuid与标识管理" tabindex="-1">6.2 UUID与标识管理 <a class="header-anchor" href="#_6-2-uuid与标识管理" aria-label="Permalink to &quot;6.2 UUID与标识管理&quot;">​</a></h3><h4 id="_6-2-1-uuid生成与管理" tabindex="-1">6.2.1 UUID生成与管理 <a class="header-anchor" href="#_6-2-1-uuid生成与管理" aria-label="Permalink to &quot;6.2.1 UUID生成与管理&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 生成UUID</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.</span><span class="__shiki_1itgoe">create</span><span class="__shiki_140thh">.uuid() </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> uuid,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.</span><span class="__shiki_1itgoe">create</span><span class="__shiki_140thh">.uuidBase64() </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> uuidBase64,</span></span>
<span class="line"><span class="__shiki_140thh">       apoc.</span><span class="__shiki_1itgoe">create</span><span class="__shiki_140thh">.uuidBase64URL() </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> uuidBase64URL;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 为节点添加UUID</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.uuid </span><span class="__shiki_1itgoe">IS NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.</span><span class="__shiki_1itgoe">create</span><span class="__shiki_140thh">.setUuid(p, </span><span class="__shiki_mdbnqw">&#39;uuid&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(node);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> UUID约束触发器</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.trigger.add(</span><span class="__shiki_mdbnqw">&#39;uuidOnCreate&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;UNWIND apoc.trigger.nodesByLabel($assignedLabels, &quot;Person&quot;) AS n</span></span>
<span class="line"><span class="__shiki_mdbnqw">   SET n.uuid = apoc.create.uuid()&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">phase</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;before&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查找重复UUID</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (n)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> n.uuid </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> n.uuid </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> uuid, </span><span class="__shiki_dzsirb">collect</span><span class="__shiki_140thh">(n) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> nodes</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> size(nodes) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> uuid, [n </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> nodes | </span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">(n)] </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> nodeIds;</span></span></code></pre></div><h4 id="_6-2-2-自定义id管理" tabindex="-1">6.2.2 自定义ID管理 <a class="header-anchor" href="#_6-2-2-自定义id管理" aria-label="Permalink to &quot;6.2.2 自定义ID管理&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 生成序列ID</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.sequence.add(</span><span class="__shiki_mdbnqw">&#39;user_id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> name, current;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 获取下一个序列值</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.sequence.next(</span><span class="__shiki_mdbnqw">&#39;user_id&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> value;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 重置序列</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.sequence.reset(</span><span class="__shiki_mdbnqw">&#39;user_id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 删除序列</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.sequence.drop(</span><span class="__shiki_mdbnqw">&#39;user_id&#39;</span><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_6-3-数据质量与验证" tabindex="-1">6.3 数据质量与验证 <a class="header-anchor" href="#_6-3-数据质量与验证" aria-label="Permalink to &quot;6.3 数据质量与验证&quot;">​</a></h3><h4 id="_6-3-1-数据验证" tabindex="-1">6.3.1 数据验证 <a class="header-anchor" href="#_6-3-1-数据验证" aria-label="Permalink to &quot;6.3.1 数据验证&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 模式验证</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.schema.assert(</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">User</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_mdbnqw"> &#39;email&#39;</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> Product</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;sku&#39;</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">User</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> key, label, keys, unique, action</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> label, keys, action;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 数据验证规则</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">  count</span><span class="__shiki_140thh">(p) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total,</span></span>
<span class="line"><span class="__shiki_dzsirb">  count</span><span class="__shiki_140thh">(p.email) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> withEmail,</span></span>
<span class="line"><span class="__shiki_dzsirb">  sum</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> p.email </span><span class="__shiki_1itgoe">=~</span><span class="__shiki_mdbnqw"> &#39;^[^@]+@[^@]+</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">.[^@]+$&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> END</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> validEmail,</span></span>
<span class="line"><span class="__shiki_dzsirb">  sum</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> p.age </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> p.age </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 150</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> END</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> validAge;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 异常检测</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (t:Transaction)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> t.amount </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100000</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_140thh"> t.amount </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> t.flag </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;suspicious&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> t.id, t.amount, t.flag;</span></span></code></pre></div><h4 id="_6-3-2-数据清理" tabindex="-1">6.3.2 数据清理 <a class="header-anchor" href="#_6-3-2-数据清理" aria-label="Permalink to &quot;6.3.2 数据清理&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 标准化文本</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.name </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> p.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> apoc.text.capitalize(</span><span class="__shiki_dzsirb">trim</span><span class="__shiki_140thh">(p.name));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 统一格式</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.phone </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> p.phone </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> apoc.text.</span><span class="__shiki_dzsirb">replace</span><span class="__shiki_140thh">(p.phone, </span><span class="__shiki_mdbnqw">&#39;[^0-9]&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 去重处理</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> p.email </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> email, </span><span class="__shiki_dzsirb">collect</span><span class="__shiki_140thh">(p) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> persons</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> size(persons) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> persons[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> keep, persons[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">..] </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> duplicates</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> duplicates </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> dup</span></span>
<span class="line"><span class="__shiki_1itgoe">DELETE</span><span class="__shiki_140thh"> dup</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(keep) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> kept, </span><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(duplicates) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> deleted;</span></span></code></pre></div><h2 id="七、安全与生产实践" tabindex="-1">七、安全与生产实践 <a class="header-anchor" href="#七、安全与生产实践" aria-label="Permalink to &quot;七、安全与生产实践&quot;">​</a></h2><h3 id="_7-1-安全配置" tabindex="-1">7.1 安全配置 <a class="header-anchor" href="#_7-1-安全配置" aria-label="Permalink to &quot;7.1 安全配置&quot;">​</a></h3><h4 id="_7-1-1-权限控制" tabindex="-1">7.1.1 权限控制 <a class="header-anchor" href="#_7-1-1-权限控制" aria-label="Permalink to &quot;7.1.1 权限控制&quot;">​</a></h4><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># neo4j.conf 安全配置示例</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 限制过程访问</span></span>
<span class="line"><span class="__shiki_1itgoe">dbms.security.procedures.unrestricted</span><span class="__shiki_140thh">=apoc.meta.*,apoc.cypher.*</span></span>
<span class="line"><span class="__shiki_1itgoe">dbms.security.procedures.whitelist</span><span class="__shiki_140thh">=apoc.load.json,apoc.export.csv</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 文件系统访问控制</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.import.file.enabled</span><span class="__shiki_140thh">=true</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.import.file.use_neo4j_config</span><span class="__shiki_140thh">=true</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.import.file.allow_read_from_filesystem</span><span class="__shiki_140thh">=/import,/data</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 网络访问限制</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.http.timeout.connect</span><span class="__shiki_140thh">=10000</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.http.timeout.read</span><span class="__shiki_140thh">=30000</span></span>
<span class="line"><span class="__shiki_140thh">apoc.jdbc.&lt;key&gt;.</span><span class="__shiki_1itgoe">enabled</span><span class="__shiki_140thh">=false  </span><span class="__shiki_21nrsd"># 默认禁用JDBC</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 资源限制</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.trigger.enabled</span><span class="__shiki_140thh">=false  </span><span class="__shiki_21nrsd"># 生产环境谨慎启用</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.uuid.enabled.auto</span><span class="__shiki_140thh">=false  </span><span class="__shiki_21nrsd"># 禁用自动UUID</span></span></code></pre></div><h4 id="_7-1-2-审计日志" tabindex="-1">7.1.2 审计日志 <a class="header-anchor" href="#_7-1-2-审计日志" aria-label="Permalink to &quot;7.1.2 审计日志&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 审计触发器</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.trigger.add(</span><span class="__shiki_mdbnqw">&#39;auditTrail&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;UNWIND $createdNodes AS n</span></span>
<span class="line"><span class="__shiki_mdbnqw">   CREATE (a:AuditLog {</span></span>
<span class="line"><span class="__shiki_mdbnqw">     event: &quot;CREATE_NODE&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">     label: labels(n)[0],</span></span>
<span class="line"><span class="__shiki_mdbnqw">     properties: properties(n),</span></span>
<span class="line"><span class="__shiki_mdbnqw">     timestamp: timestamp(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">     user: $user</span></span>
<span class="line"><span class="__shiki_mdbnqw">   })&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">phase</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;after&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 敏感操作监控</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (log:AuditLog)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> log.event </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;DELETE&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;MODIFY&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> log.timestamp </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> timestamp</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 3600000</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> log.event, </span><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> count</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_7-2-性能优化" tabindex="-1">7.2 性能优化 <a class="header-anchor" href="#_7-2-性能优化" aria-label="Permalink to &quot;7.2 性能优化&quot;">​</a></h3><h4 id="_7-2-1-批量操作优化" tabindex="-1">7.2.1 批量操作优化 <a class="header-anchor" href="#_7-2-1-批量操作优化" aria-label="Permalink to &quot;7.2.1 批量操作优化&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 使用UNWIND优化批量创建</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> ids</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> ids </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> id</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (n:Test </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> id</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 批量关系创建优化</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_dzsirb"> collect</span><span class="__shiki_140thh">(p) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> people</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> people </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> p1</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> people </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> p2</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> p1, p2</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> id</span><span class="__shiki_140thh">(p1) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> id</span><span class="__shiki_140thh">(p2) </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_dzsirb"> rand</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.1</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (p1)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[:</span><span class="__shiki_1t8gfj">KNOWS</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-&gt;</span><span class="__shiki_140thh">(p2)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 内存优化批处理</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.periodic.iterate(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;MATCH (p:Person) RETURN p&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;MATCH (p)-[:FRIEND]-&gt;(f)</span></span>
<span class="line"><span class="__shiki_mdbnqw">   WITH p, count(f) AS friendCount</span></span>
<span class="line"><span class="__shiki_mdbnqw">   SET p.friendCount = friendCount&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span></span>
<span class="line"><span class="__shiki_140thh">    batchSize</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    parallel</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    concurrency</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_7-2-2-查询优化" tabindex="-1">7.2.2 查询优化 <a class="header-anchor" href="#_7-2-2-查询优化" aria-label="Permalink to &quot;7.2.2 查询优化&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 使用APOC优化复杂查询</span></span>
<span class="line"><span class="__shiki_140thh">PROFILE</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.cypher.run(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  MATCH (p:Person)-[:FRIEND*2]-&gt;(fof)</span></span>
<span class="line"><span class="__shiki_mdbnqw">  WHERE p.name = &quot;Alice&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  RETURN fof.name, count(*) as pathCount</span></span>
<span class="line"><span class="__shiki_mdbnqw">  ORDER BY pathCount DESC&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {}</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> value;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 缓存常用结果</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.periodic.commit(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  MATCH (p:Person)</span></span>
<span class="line"><span class="__shiki_mdbnqw">  WHERE p.score IS NULL</span></span>
<span class="line"><span class="__shiki_mdbnqw">  WITH p LIMIT 1000</span></span>
<span class="line"><span class="__shiki_mdbnqw">  SET p.score = apoc.algo.pageRank([p])[0].score</span></span>
<span class="line"><span class="__shiki_mdbnqw">  RETURN count(*)&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {}</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_7-3-监控与告警" tabindex="-1">7.3 监控与告警 <a class="header-anchor" href="#_7-3-监控与告警" aria-label="Permalink to &quot;7.3 监控与告警&quot;">​</a></h3><h4 id="_7-3-1-健康检查" tabindex="-1">7.3.1 健康检查 <a class="header-anchor" href="#_7-3-1-健康检查" aria-label="Permalink to &quot;7.3.1 健康检查&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 系统健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.monitor.kernel()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> pageCache, fileDescriptors, storeSize</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">  pageCache.hits </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100.0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> (pageCache.hits </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> pageCache.fails) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> cacheHitRate,</span></span>
<span class="line"><span class="__shiki_140thh">  fileDescriptors,</span></span>
<span class="line"><span class="__shiki_140thh">  storeSize;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 自定义健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (n)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(n) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> nodeCount</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.monitor.tx() </span><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> totalTx</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">  nodeCount,</span></span>
<span class="line"><span class="__shiki_140thh">  totalTx,</span></span>
<span class="line"><span class="__shiki_1itgoe">  CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHEN</span><span class="__shiki_140thh"> nodeCount </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000000</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;WARNING: Large dataset&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ELSE</span><span class="__shiki_mdbnqw"> &#39;OK&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> status;</span></span></code></pre></div><h4 id="_7-3-2-告警集成" tabindex="-1">7.3.2 告警集成 <a class="header-anchor" href="#_7-3-2-告警集成" aria-label="Permalink to &quot;7.3.2 告警集成&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 异常检测告警</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (t:Transaction)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> t.amount </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10000</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> t.timestamp </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> timestamp</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 3600000</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> suspiciousCount</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> suspiciousCount </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.load.jsonParams(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;https://alert-api.example.com/notify&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">method</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;POST&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  apoc.convert.toJson(</span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">    alert</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;High value transactions&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    count</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> suspiciousCount</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    timestamp</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> timestamp</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_mdbnqw"> &#39;Alert sent&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> result;</span></span></code></pre></div><h2 id="八、故障排除与调试" tabindex="-1">八、故障排除与调试 <a class="header-anchor" href="#八、故障排除与调试" aria-label="Permalink to &quot;八、故障排除与调试&quot;">​</a></h2><h3 id="_8-1-常见问题解决" tabindex="-1">8.1 常见问题解决 <a class="header-anchor" href="#_8-1-常见问题解决" aria-label="Permalink to &quot;8.1 常见问题解决&quot;">​</a></h3><h4 id="_8-1-1-过程调用失败" tabindex="-1">8.1.1 过程调用失败 <a class="header-anchor" href="#_8-1-1-过程调用失败" aria-label="Permalink to &quot;8.1.1 过程调用失败&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 检查APOC是否加载</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> apoc.version() </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> version;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看可用过程</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.help(</span><span class="__shiki_mdbnqw">&#39;apoc&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> name, text</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> name CONTAINS $searchTerm</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> name, </span><span class="__shiki_dzsirb">left</span><span class="__shiki_140thh">(text, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> description;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 调试过程调用</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.cypher.doIt(</span><span class="__shiki_mdbnqw">&#39;RETURN 1 AS test&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> value;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看错误详情</span></span>
<span class="line"><span class="__shiki_140thh">TRY</span></span>
<span class="line"><span class="__shiki_1itgoe">  CALL</span><span class="__shiki_140thh"> apoc.load.json(</span><span class="__shiki_mdbnqw">&#39;file:///invalid.json&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">  YIELD</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">  RETURN</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_140thh">CATCH</span></span>
<span class="line"><span class="__shiki_1itgoe">  RETURN</span><span class="__shiki_140thh"> apoc.convert.toJson($error) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> errorDetails;</span></span></code></pre></div><h4 id="_8-1-2-性能问题诊断" tabindex="-1">8.1.2 性能问题诊断 <a class="header-anchor" href="#_8-1-2-性能问题诊断" aria-label="Permalink to &quot;8.1.2 性能问题诊断&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 慢查询分析</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.monitor.query()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> queryId, query, elapsedTime</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> elapsedTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5000</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> queryId, </span><span class="__shiki_dzsirb">left</span><span class="__shiki_140thh">(query, </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> queryPreview, elapsedTime</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> elapsedTime </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 内存使用分析</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.monitor.kernel()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> pageCache, fileDescriptors, storeSize</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">  pageCache,</span></span>
<span class="line"><span class="__shiki_140thh">  fileDescriptors,</span></span>
<span class="line"><span class="__shiki_140thh">  storeSize.total </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> storeSizeMB;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 锁争用检测</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.monitor.locks()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> resourceType, resourceId, waitTime</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> waitTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> resourceType, </span><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> lockCount, </span><span class="__shiki_dzsirb">max</span><span class="__shiki_140thh">(waitTime) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> maxWait</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> lockCount </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_8-2-日志与调试" tabindex="-1">8.2 日志与调试 <a class="header-anchor" href="#_8-2-日志与调试" aria-label="Permalink to &quot;8.2 日志与调试&quot;">​</a></h3><h4 id="_8-2-1-日志记录" tabindex="-1">8.2.1 日志记录 <a class="header-anchor" href="#_8-2-1-日志记录" aria-label="Permalink to &quot;8.2.1 日志记录&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 自定义日志记录</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.log.info(</span><span class="__shiki_mdbnqw">&#39;Batch processing started&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">batchId</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 123</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> count</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 调试日志</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.log.debug(</span><span class="__shiki_mdbnqw">&#39;Processing user&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">userId</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 456</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> step</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;enrichment&#39;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 错误日志</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.log.error(</span><span class="__shiki_mdbnqw">&#39;Failed to process transaction&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">txId</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 789</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> error</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> $error</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 结构化日志</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.log.warn(</span><span class="__shiki_mdbnqw">&#39;Suspicious activity detected&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  event</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;high_value_transfer&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  amount</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 50000</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  userId</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 123</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  timestamp</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> timestamp</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_8-2-2-调试工具" tabindex="-1">8.2.2 调试工具 <a class="header-anchor" href="#_8-2-2-调试工具" aria-label="Permalink to &quot;8.2.2 调试工具&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 执行计划分析</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.explain(</span><span class="__shiki_mdbnqw">&#39;MATCH (p:Person)-[:FRIEND]-&gt;(f) RETURN p, count(f)&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查询性能测试</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.warmup.run(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> totalPages, totalTime, performance</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> totalPages, totalTime;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 数据采样调试</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.debug.validateNode(p)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, valid, errors</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.name, valid, errors;</span></span></code></pre></div><hr><h2 id="附录-apoc速查手册" tabindex="-1">附录：APOC速查手册 <a class="header-anchor" href="#附录-apoc速查手册" aria-label="Permalink to &quot;附录：APOC速查手册&quot;">​</a></h2><h3 id="常用过程分类表" tabindex="-1">常用过程分类表 <a class="header-anchor" href="#常用过程分类表" aria-label="Permalink to &quot;常用过程分类表&quot;">​</a></h3><table tabindex="0"><thead><tr><th>类别</th><th>常用过程</th><th>用途说明</th></tr></thead><tbody><tr><td><strong>数据导入</strong></td><td><code>apoc.load.json</code>, <code>apoc.load.csv</code>, <code>apoc.load.xml</code></td><td>从文件导入数据</td></tr><tr><td><strong>数据导出</strong></td><td><code>apoc.export.json</code>, <code>apoc.export.csv</code>, <code>apoc.export.cypher</code></td><td>导出数据到文件</td></tr><tr><td><strong>图算法</strong></td><td><code>apoc.algo.dijkstra</code>, <code>apoc.algo.pageRank</code>, <code>apoc.algo.community</code></td><td>图分析与算法</td></tr><tr><td><strong>文本处理</strong></td><td><code>apoc.text.clean</code>, <code>apoc.text.replace</code>, <code>apoc.text.split</code></td><td>文本清洗与处理</td></tr><tr><td><strong>日期时间</strong></td><td><code>apoc.date.parse</code>, <code>apoc.date.format</code>, <code>apoc.date.add</code></td><td>日期时间操作</td></tr><tr><td><strong>类型转换</strong></td><td><code>apoc.convert.toJson</code>, <code>apoc.convert.fromJsonMap</code>, <code>apoc.convert.toString</code></td><td>数据类型转换</td></tr><tr><td><strong>批量处理</strong></td><td><code>apoc.periodic.iterate</code>, <code>apoc.periodic.commit</code></td><td>批量数据操作</td></tr><tr><td><strong>元数据</strong></td><td><code>apoc.meta.graph</code>, <code>apoc.meta.schema</code>, <code>apoc.meta.stats</code></td><td>数据库元信息</td></tr><tr><td><strong>监控</strong></td><td><code>apoc.monitor.kernel</code>, <code>apoc.monitor.query</code>, <code>apoc.monitor.tx</code></td><td>系统监控</td></tr></tbody></table><h3 id="生产环境配置推荐" tabindex="-1">生产环境配置推荐 <a class="header-anchor" href="#生产环境配置推荐" aria-label="Permalink to &quot;生产环境配置推荐&quot;">​</a></h3><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># neo4j.conf 最佳实践配置</span></span>
<span class="line"><span class="__shiki_21nrsd"># APOC安全配置</span></span>
<span class="line"><span class="__shiki_1itgoe">dbms.security.procedures.unrestricted</span><span class="__shiki_140thh">=apoc.meta.*,apoc.cypher.*</span></span>
<span class="line"><span class="__shiki_1itgoe">dbms.security.procedures.whitelist</span><span class="__shiki_140thh">=apoc.load.json,apoc.export.csv</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 文件系统限制</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.import.file.enabled</span><span class="__shiki_140thh">=true</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.import.file.use_neo4j_config</span><span class="__shiki_140thh">=true</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.import.file.allow_read_from_filesystem</span><span class="__shiki_140thh">=/data/import</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 资源限制</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.trigger.enabled</span><span class="__shiki_140thh">=false  </span><span class="__shiki_21nrsd"># 生产环境谨慎使用</span></span>
<span class="line"><span class="__shiki_140thh">apoc.jdbc.&lt;key&gt;.</span><span class="__shiki_1itgoe">pool.size</span><span class="__shiki_140thh">=5  </span><span class="__shiki_21nrsd"># 连接池限制</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 性能优化</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.import.file.buffer.size</span><span class="__shiki_140thh">=1048576  </span><span class="__shiki_21nrsd"># 1MB缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">apoc.export.file.batch.size</span><span class="__shiki_140thh">=10000  </span><span class="__shiki_21nrsd"># 批量大小</span></span></code></pre></div><h3 id="版本兼容性矩阵" tabindex="-1">版本兼容性矩阵 <a class="header-anchor" href="#版本兼容性矩阵" aria-label="Permalink to &quot;版本兼容性矩阵&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Neo4j版本</th><th>推荐APOC版本</th><th>重要特性</th></tr></thead><tbody><tr><td>5.x</td><td>apoc-5.x.x.x</td><td>完整支持所有5.x特性</td></tr><tr><td>4.4</td><td>apoc-4.4.x.x</td><td>稳定版本支持</td></tr><tr><td>4.3</td><td>apoc-4.3.x.x</td><td>基础功能支持</td></tr><tr><td>4.2及以下</td><td>对应版本APOC</td><td>有限支持，建议升级</td></tr></tbody></table><hr><h2 id="学习资源与下一步" tabindex="-1">学习资源与下一步 <a class="header-anchor" href="#学习资源与下一步" aria-label="Permalink to &quot;学习资源与下一步&quot;">​</a></h2><h3 id="官方资源" tabindex="-1">官方资源 <a class="header-anchor" href="#官方资源" aria-label="Permalink to &quot;官方资源&quot;">​</a></h3><ol><li><a href="https://neo4j.com/docs/apoc/current/" target="_blank" rel="noreferrer">APOC完整文档</a></li><li><a href="https://github.com/neo4j-contrib/neo4j-apoc-procedures" target="_blank" rel="noreferrer">APOC GitHub仓库</a></li><li><a href="https://neo4j.com/labs/apoc/" target="_blank" rel="noreferrer">APOC用户指南</a></li></ol><h3 id="实践建议" tabindex="-1">实践建议 <a class="header-anchor" href="#实践建议" aria-label="Permalink to &quot;实践建议&quot;">​</a></h3><ol><li><strong>从简单开始</strong>：先掌握<code>apoc.load.json</code>和<code>apoc.export.json</code></li><li><strong>理解安全影响</strong>：在生产环境谨慎配置APOC权限</li><li><strong>性能测试</strong>：对复杂操作进行性能测试和优化</li><li><strong>版本管理</strong>：保持APOC与Neo4j版本同步</li></ol><h3 id="进阶方向" tabindex="-1">进阶方向 <a class="header-anchor" href="#进阶方向" aria-label="Permalink to &quot;进阶方向&quot;">​</a></h3><ol><li>学习APOC源码，理解过程实现原理</li><li>开发自定义APOC扩展过程</li><li>集成APOC到CI/CD流程</li><li>构建基于APOC的数据管道</li></ol><hr><p><em>APOC扩展库是Neo4j生态系统中的瑞士军刀，提供了450多个存储过程和函数，极大地扩展了Cypher的能力边界。掌握APOC不仅能提高开发效率，还能解决许多复杂的数据处理挑战。在生产环境中使用时，务必注意安全配置和性能影响，充分利用APOC的强大功能同时确保系统的稳定和安全。</em></p>`,151)])])}const r=a(p,[["render",h]]);export{d as __pageData,r as default};
