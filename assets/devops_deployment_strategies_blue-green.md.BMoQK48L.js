import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"蓝绿部署实现：详细完整的学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/strategies/blue-green.md","filePath":"devops/deployment/strategies/blue-green.md"}'),p={name:"devops/deployment/strategies/blue-green.md"};function l(h,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="蓝绿部署实现-详细完整的学习笔记" tabindex="-1">蓝绿部署实现：详细完整的学习笔记 <a class="header-anchor" href="#蓝绿部署实现-详细完整的学习笔记" aria-label="Permalink to &quot;蓝绿部署实现：详细完整的学习笔记&quot;">​</a></h1><h2 id="一、蓝绿部署基础概念" tabindex="-1">一、蓝绿部署基础概念 <a class="header-anchor" href="#一、蓝绿部署基础概念" aria-label="Permalink to &quot;一、蓝绿部署基础概念&quot;">​</a></h2><h3 id="_1-1-核心定义" tabindex="-1">1.1 核心定义 <a class="header-anchor" href="#_1-1-核心定义" aria-label="Permalink to &quot;1.1 核心定义&quot;">​</a></h3><p><strong>蓝绿部署</strong>（Blue-Green Deployment）是一种软件发布策略，通过维护两个完全相同的生产环境（一个称为&quot;蓝&quot;环境，一个称为&quot;绿&quot;环境）来实现零停机部署和快速回滚。</p><h3 id="_1-2-核心原则" tabindex="-1">1.2 核心原则 <a class="header-anchor" href="#_1-2-核心原则" aria-label="Permalink to &quot;1.2 核心原则&quot;">​</a></h3><ul><li><strong>两个相同环境</strong>：蓝环境和绿环境在基础设施、配置和依赖方面完全相同</li><li><strong>只有一个活跃环境</strong>：在任何给定时间，只有一个环境（蓝或绿）接收生产流量</li><li><strong>原子性切换</strong>：流量切换是即时的、原子的操作</li><li><strong>快速回滚</strong>：回滚只需将流量切回之前的环境</li></ul><h2 id="二、蓝绿部署工作流程" tabindex="-1">二、蓝绿部署工作流程 <a class="header-anchor" href="#二、蓝绿部署工作流程" aria-label="Permalink to &quot;二、蓝绿部署工作流程&quot;">​</a></h2><h3 id="_2-1-标准流程示意图" tabindex="-1">2.1 标准流程示意图 <a class="header-anchor" href="#_2-1-标准流程示意图" aria-label="Permalink to &quot;2.1 标准流程示意图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">初始状态：</span></span>
<span class="line"><span class="__shiki_wvjl67">    蓝环境（生产流量） → 处理100%用户请求</span></span>
<span class="line"><span class="__shiki_wvjl67">    绿环境（空闲状态） → 准备新版本</span></span>
<span class="line"><span class="__shiki_wvjl67">    </span></span>
<span class="line"><span class="__shiki_wvjl67">步骤：</span></span>
<span class="line"><span class="__shiki_wvjl67">1. 在绿环境部署新版本</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 运行测试验证</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 将负载均衡器指向绿环境</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 绿环境成为新的生产环境</span></span>
<span class="line"><span class="__shiki_wvjl67">5. 蓝环境变为空闲（可用于下次部署）</span></span></code></pre></div><h3 id="_2-2-详细步骤分解" tabindex="-1">2.2 详细步骤分解 <a class="header-anchor" href="#_2-2-详细步骤分解" aria-label="Permalink to &quot;2.2 详细步骤分解&quot;">​</a></h3><h4 id="阶段一-准备阶段" tabindex="-1">阶段一：准备阶段 <a class="header-anchor" href="#阶段一-准备阶段" aria-label="Permalink to &quot;阶段一：准备阶段&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 环境准备检查清单</span></span>
<span class="line"><span class="__shiki_140thh">- [ ] </span><span class="__shiki_mdbnqw">验证蓝绿环境基础设施一致性</span></span>
<span class="line"><span class="__shiki_140thh">- [ ] </span><span class="__shiki_mdbnqw">确保数据库schema兼容（前向兼容）</span></span>
<span class="line"><span class="__shiki_140thh">- [ ] </span><span class="__shiki_mdbnqw">配置管理工具同步配置</span></span>
<span class="line"><span class="__shiki_140thh">- [ ] </span><span class="__shiki_mdbnqw">验证监控和告警系统</span></span>
<span class="line"><span class="__shiki_140thh">- [ ] </span><span class="__shiki_mdbnqw">准备回滚计划文档</span></span></code></pre></div><h4 id="阶段二-部署到空闲环境" tabindex="-1">阶段二：部署到空闲环境 <a class="header-anchor" href="#阶段二-部署到空闲环境" aria-label="Permalink to &quot;阶段二：部署到空闲环境&quot;">​</a></h4><ol><li><strong>代码部署</strong>：将新版本部署到当前空闲环境（绿环境）</li><li><strong>数据迁移</strong>：执行必要的数据库迁移（需保证向后兼容）</li><li><strong>服务预热</strong>：启动服务并进行健康检查</li><li><strong>内部测试</strong>：通过内部端点进行功能验证</li></ol><h4 id="阶段三-验证阶段" tabindex="-1">阶段三：验证阶段 <a class="header-anchor" href="#阶段三-验证阶段" aria-label="Permalink to &quot;阶段三：验证阶段&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 示例：自动化验证脚本</span></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 健康检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> http://green-environment/health</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 功能冒烟测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">run_smoke_tests</span><span class="__shiki_dzsirb"> --environment</span><span class="__shiki_mdbnqw"> green</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 性能基准测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">run_performance_tests</span><span class="__shiki_dzsirb"> --environment</span><span class="__shiki_mdbnqw"> green</span><span class="__shiki_dzsirb"> --baseline</span><span class="__shiki_mdbnqw"> blue</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 集成测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">run_integration_tests</span><span class="__shiki_dzsirb"> --environment</span><span class="__shiki_mdbnqw"> green</span></span></code></pre></div><h4 id="阶段四-切换阶段" tabindex="-1">阶段四：切换阶段 <a class="header-anchor" href="#阶段四-切换阶段" aria-label="Permalink to &quot;阶段四：切换阶段&quot;">​</a></h4><ol><li><strong>流量切换</strong>：更新负载均衡配置，将流量指向新环境</li><li><strong>会话处理</strong>：确保用户会话不受影响（如有状态应用）</li><li><strong>监控观察</strong>：密切监控新环境的关键指标</li></ol><h4 id="阶段五-清理阶段" tabindex="-1">阶段五：清理阶段 <a class="header-anchor" href="#阶段五-清理阶段" aria-label="Permalink to &quot;阶段五：清理阶段&quot;">​</a></h4><ol><li><strong>旧环境清理</strong>：停止蓝环境的服务</li><li><strong>资源回收</strong>：可选择保留旧环境一段时间以便快速回滚</li><li><strong>更新状态</strong>：更新部署状态文档</li></ol><h2 id="三、技术实现细节" tabindex="-1">三、技术实现细节 <a class="header-anchor" href="#三、技术实现细节" aria-label="Permalink to &quot;三、技术实现细节&quot;">​</a></h2><h3 id="_3-1-基础设施要求" tabindex="-1">3.1 基础设施要求 <a class="header-anchor" href="#_3-1-基础设施要求" aria-label="Permalink to &quot;3.1 基础设施要求&quot;">​</a></h3><h4 id="网络架构设计" tabindex="-1">网络架构设计 <a class="header-anchor" href="#网络架构设计" aria-label="Permalink to &quot;网络架构设计&quot;">​</a></h4><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Nginx负载均衡配置示例</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> blue </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> blue-app-01:8080;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> blue-app-02:8080;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> green </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> green-app-01:8080;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> green-app-02:8080;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 切换逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">app.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 通过变量控制流量流向</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($blue_green </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;blue&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://blue;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($blue_green </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;green&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://green;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="基础设施即代码-iac-配置" tabindex="-1">基础设施即代码（IaC）配置 <a class="header-anchor" href="#基础设施即代码-iac-配置" aria-label="Permalink to &quot;基础设施即代码（IaC）配置&quot;">​</a></h4><div class="language-terraform vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">terraform</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Terraform模块化蓝绿环境</span></span>
<span class="line"><span class="__shiki_1t8gfj">module</span><span class="__shiki_dzsirb"> &quot;blue_environment&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  source</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;./modules/app-environment&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  environment_name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;blue&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  instance_count</span><span class="__shiki_1itgoe">  =</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_140thh">  version_tag</span><span class="__shiki_1itgoe">     =</span><span class="__shiki_140thh"> var</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">blue_version</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">module</span><span class="__shiki_dzsirb"> &quot;green_environment&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  source</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;./modules/app-environment&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  environment_name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;green&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  instance_count</span><span class="__shiki_1itgoe">  =</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_140thh">  version_tag</span><span class="__shiki_1itgoe">     =</span><span class="__shiki_140thh"> var</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">green_version</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 负载均衡器配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">resource</span><span class="__shiki_dzsirb"> &quot;aws_lb&quot;</span><span class="__shiki_dzsirb"> &quot;main&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  name</span><span class="__shiki_1itgoe">               =</span><span class="__shiki_mdbnqw"> &quot;blue-green-alb&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  internal</span><span class="__shiki_1itgoe">           =</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">  load_balancer_type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;application&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  enable_deletion_protection</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 目标组</span></span>
<span class="line"><span class="__shiki_1t8gfj">resource</span><span class="__shiki_dzsirb"> &quot;aws_lb_target_group&quot;</span><span class="__shiki_dzsirb"> &quot;blue&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  name</span><span class="__shiki_1itgoe">     =</span><span class="__shiki_mdbnqw"> &quot;blue-tg&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  port</span><span class="__shiki_1itgoe">     =</span><span class="__shiki_dzsirb"> 8080</span></span>
<span class="line"><span class="__shiki_140thh">  protocol</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;HTTP&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  vpc_id</span><span class="__shiki_1itgoe">   =</span><span class="__shiki_140thh"> var</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">vpc_id</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">resource</span><span class="__shiki_dzsirb"> &quot;aws_lb_target_group&quot;</span><span class="__shiki_dzsirb"> &quot;green&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  name</span><span class="__shiki_1itgoe">     =</span><span class="__shiki_mdbnqw"> &quot;green-tg&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  port</span><span class="__shiki_1itgoe">     =</span><span class="__shiki_dzsirb"> 8080</span></span>
<span class="line"><span class="__shiki_140thh">  protocol</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;HTTP&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  vpc_id</span><span class="__shiki_1itgoe">   =</span><span class="__shiki_140thh"> var</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">vpc_id</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-数据库策略" tabindex="-1">3.2 数据库策略 <a class="header-anchor" href="#_3-2-数据库策略" aria-label="Permalink to &quot;3.2 数据库策略&quot;">​</a></h3><h4 id="数据库迁移管理" tabindex="-1">数据库迁移管理 <a class="header-anchor" href="#数据库迁移管理" aria-label="Permalink to &quot;数据库迁移管理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 前向兼容的数据库迁移示例</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 添加新列（不影响现有代码）</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> users </span><span class="__shiki_1itgoe">ADD</span><span class="__shiki_140thh"> COLUMN </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> new_preferences JSONB </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_mdbnqw"> &#39;{}&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建新表（旧代码可继续使用旧表）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> new_orders (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> REFERENCES</span><span class="__shiki_140thh"> users(id),</span></span>
<span class="line"><span class="__shiki_140thh">    amount </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 数据双写（蓝绿切换期间）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 应用程序同时在blue_orders和green_orders写入</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 切换完成后停止写入旧表</span></span></code></pre></div><h4 id="数据库连接策略" tabindex="-1">数据库连接策略 <a class="header-anchor" href="#数据库连接策略" aria-label="Permalink to &quot;数据库连接策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 数据库配置分离</span></span>
<span class="line"><span class="__shiki_17hn0y">blue_database</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db-blue.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app_production</span></span>
<span class="line"><span class="__shiki_17hn0y">  read_replicas</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">db-blue-ro1.example.com</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">db-blue-ro2.example.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">green_database</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db-green.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app_production</span></span>
<span class="line"><span class="__shiki_17hn0y">  read_replicas</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">db-green-ro1.example.com</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">db-green-ro2.example.com</span></span></code></pre></div><h3 id="_3-3-服务部署实现" tabindex="-1">3.3 服务部署实现 <a class="header-anchor" href="#_3-3-服务部署实现" aria-label="Permalink to &quot;3.3 服务部署实现&quot;">​</a></h3><h4 id="docker-kubernetes实现" tabindex="-1">Docker/Kubernetes实现 <a class="header-anchor" href="#docker-kubernetes实现" aria-label="Permalink to &quot;Docker/Kubernetes实现&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Kubernetes蓝绿部署配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-blue</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">    version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">blue</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">blue</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">        version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">blue</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:blue-version</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-green</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">    version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">green</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">green</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">        version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">green</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:green-version</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># Service配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-service</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 通过修改选择器切换版本</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">    version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">blue</span><span class="__shiki_21nrsd">  # 切换时改为&quot;green&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">    targetPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span></code></pre></div><h4 id="自动化切换脚本" tabindex="-1">自动化切换脚本 <a class="header-anchor" href="#自动化切换脚本" aria-label="Permalink to &quot;自动化切换脚本&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/usr/bin/env python3</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">蓝绿部署切换脚本</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> requests</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> sys</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> typing </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Dict, List</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BlueGreenDeployment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, config: Dict):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.blue_endpoint </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> config[</span><span class="__shiki_mdbnqw">&#39;blue_endpoint&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.green_endpoint </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> config[</span><span class="__shiki_mdbnqw">&#39;green_endpoint&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.lb_api_url </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> config[</span><span class="__shiki_mdbnqw">&#39;lb_api_url&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.switch_timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> config.get(</span><span class="__shiki_mdbnqw">&#39;switch_timeout&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> health_check</span><span class="__shiki_140thh">(self, endpoint: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">) -&gt; </span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;检查服务健康状态&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> requests.get(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">endpoint</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/health&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> response.status_code </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 200</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_140thh"> requests.RequestException:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> smoke_test</span><span class="__shiki_140thh">(self, endpoint: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">) -&gt; </span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;执行冒烟测试&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        test_cases </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_1itgoe">            f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">endpoint</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/api/v1/users&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">            f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">endpoint</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/api/v1/products&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">            f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">endpoint</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/api/v1/orders&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> test_url </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> test_cases:</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> requests.get(test_url, </span><span class="__shiki_1jdh33">timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> response.status_code </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">                    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;测试失败: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">test_url</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_1itgoe">            except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_dzsirb">                print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;测试异常: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">test_url</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">, 错误: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> switch_traffic</span><span class="__shiki_140thh">(self, target: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">) -&gt; </span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;切换流量到指定环境&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        payload </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;target_environment&quot;</span><span class="__shiki_140thh">: target,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;switch_type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;immediate&quot;</span><span class="__shiki_21nrsd">  # 或 &quot;gradual&quot; 用于金丝雀发布</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> requests.post(</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.lb_api_url,</span></span>
<span class="line"><span class="__shiki_1jdh33">                json</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">payload,</span></span>
<span class="line"><span class="__shiki_1jdh33">                timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> response.status_code </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 200</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;切换失败: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> monitor_metrics</span><span class="__shiki_140thh">(self, endpoint: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, duration: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">) -&gt; </span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;监控切换后的指标&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        start_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh"> time.time() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start_time </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> duration:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查错误率</span></span>
<span class="line"><span class="__shiki_140thh">            error_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_error_rate(endpoint)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> error_rate </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.05</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 错误率超过5%</span></span>
<span class="line"><span class="__shiki_dzsirb">                print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;错误率过高: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">error_rate</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查延迟</span></span>
<span class="line"><span class="__shiki_140thh">            latency </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_p95_latency(endpoint)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> latency </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># P95延迟超过1秒</span></span>
<span class="line"><span class="__shiki_dzsirb">                print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;延迟过高: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">latency</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">ms&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            time.sleep(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> deploy</span><span class="__shiki_140thh">(self, new_version: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;执行蓝绿部署&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;开始蓝绿部署，新版本: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">new_version</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 1. 确定当前生产环境</span></span>
<span class="line"><span class="__shiki_140thh">        current </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_current_production()</span></span>
<span class="line"><span class="__shiki_140thh">        target </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;green&quot;</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> current </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;blue&quot;</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_mdbnqw"> &quot;blue&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;当前环境: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">current</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">, 目标环境: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">target</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 2. 部署新版本到目标环境</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.deploy_to_environment(target, new_version):</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;部署失败，终止流程&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            sys.exit(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 3. 健康检查</span></span>
<span class="line"><span class="__shiki_140thh">        target_endpoint </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.green_endpoint </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> target </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;green&quot;</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.blue_endpoint</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.health_check(target_endpoint):</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;健康检查失败&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            sys.exit(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 4. 冒烟测试</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.smoke_test(target_endpoint):</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;冒烟测试失败&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            sys.exit(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 5. 切换流量</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;开始切换流量到 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">target</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 环境&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.switch_traffic(target):</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;流量切换失败，执行回滚&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.rollback(current)</span></span>
<span class="line"><span class="__shiki_140thh">            sys.exit(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 6. 监控观察</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;流量切换成功，开始监控观察期&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.monitor_metrics(target_endpoint):</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;监控发现问题，执行回滚&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.rollback(current)</span></span>
<span class="line"><span class="__shiki_140thh">            sys.exit(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;蓝绿部署成功完成！&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> rollback</span><span class="__shiki_140thh">(self, previous_env: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;回滚到上一个环境&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;执行回滚到 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">previous_env</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 环境&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.switch_traffic(previous_env):</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;回滚成功&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;回滚失败，需要人工干预&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> __name__</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &quot;__main__&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;blue_endpoint&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://blue.example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;green_endpoint&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://green.example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;lb_api_url&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://loadbalancer.example.com/api/v1/switch&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;switch_timeout&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    deployer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> BlueGreenDeployment(config)</span></span>
<span class="line"><span class="__shiki_140thh">    deployer.deploy(</span><span class="__shiki_mdbnqw">&quot;v2.1.0&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="四、关键考虑因素" tabindex="-1">四、关键考虑因素 <a class="header-anchor" href="#四、关键考虑因素" aria-label="Permalink to &quot;四、关键考虑因素&quot;">​</a></h2><h3 id="_4-1-数据库管理策略" tabindex="-1">4.1 数据库管理策略 <a class="header-anchor" href="#_4-1-数据库管理策略" aria-label="Permalink to &quot;4.1 数据库管理策略&quot;">​</a></h3><table tabindex="0"><thead><tr><th>策略</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>共享数据库</td><td>简单，无数据同步问题</td><td>无法回滚数据库更改</td><td>数据库schema兼容的场景</td></tr><tr><td>数据库复制</td><td>完全隔离环境</td><td>数据同步延迟，复杂性高</td><td>对数据隔离要求高的场景</td></tr><tr><td>数据库代理</td><td>灵活，支持读写分离</td><td>引入单点故障</td><td>需要读写分离的大型应用</td></tr></tbody></table><h3 id="_4-2-会话管理" tabindex="-1">4.2 会话管理 <a class="header-anchor" href="#_4-2-会话管理" aria-label="Permalink to &quot;4.2 会话管理&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 分布式会话管理示例（Spring Boot）</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EnableRedisHttpSession</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> SessionConfig</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> CookieSerializer </span><span class="__shiki_1t8gfj">cookieSerializer</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        DefaultCookieSerializer serializer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DefaultCookieSerializer</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 设置会话cookie路径为根路径，避免环境切换失效</span></span>
<span class="line"><span class="__shiki_140thh">        serializer.</span><span class="__shiki_1t8gfj">setCookiePath</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 禁用cookie域名绑定，支持跨子域</span></span>
<span class="line"><span class="__shiki_140thh">        serializer.</span><span class="__shiki_1t8gfj">setUseDefaultCookieDomain</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> serializer;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> RedisConnectionFactory </span><span class="__shiki_1t8gfj">connectionFactory</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使用集中式Redis存储会话</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> LettuceConnectionFactory</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;redis-cluster.example.com&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">6379</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-配置管理" tabindex="-1">4.3 配置管理 <a class="header-anchor" href="#_4-3-配置管理" aria-label="Permalink to &quot;4.3 配置管理&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 环境特定的配置文件</span></span>
<span class="line"><span class="__shiki_21nrsd"># blue-environment.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">app</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">blue</span></span>
<span class="line"><span class="__shiki_17hn0y">  endpoints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    database</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db-blue.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">    cache</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cache-blue.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  features</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    new_checkout</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">  # 蓝环境禁用新功能</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd"># green-environment.yaml  </span></span>
<span class="line"><span class="__shiki_17hn0y">app</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">green</span></span>
<span class="line"><span class="__shiki_17hn0y">  endpoints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    database</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db-green.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">    cache</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cache-green.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  features</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    new_checkout</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  # 绿环境启用新功能</span></span></code></pre></div><h2 id="五、最佳实践" tabindex="-1">五、最佳实践 <a class="header-anchor" href="#五、最佳实践" aria-label="Permalink to &quot;五、最佳实践&quot;">​</a></h2><h3 id="_5-1-自动化部署流水线" tabindex="-1">5.1 自动化部署流水线 <a class="header-anchor" href="#_5-1-自动化部署流水线" aria-label="Permalink to &quot;5.1 自动化部署流水线&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Jenkins Pipeline 示例</span></span>
<span class="line"><span class="__shiki_140thh">pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">    agent any</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    parameters {</span></span>
<span class="line"><span class="__shiki_140thh">        choice(</span></span>
<span class="line"><span class="__shiki_dzsirb">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;ENVIRONMENT&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            choices</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;blue&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;green&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_dzsirb">            description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;目标部署环境&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        string(</span></span>
<span class="line"><span class="__shiki_dzsirb">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;VERSION&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            defaultValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;部署版本号&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    stages {</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;代码检出&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                checkout scm</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;构建&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                sh </span><span class="__shiki_mdbnqw">&#39;mvn clean package -DskipTests&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;部署到目标环境&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 部署到指定环境</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&quot;ansible-playbook deploy.yml -e target_env=\${params.ENVIRONMENT} -e app_version=\${params.VERSION}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;验证&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 运行自动化测试</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&quot;./scripts/validate-deployment.sh \${params.ENVIRONMENT}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;切换流量&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 执行流量切换</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&quot;./scripts/switch-traffic.sh \${params.ENVIRONMENT}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 等待并监控</span></span>
<span class="line"><span class="__shiki_140thh">                    sleep </span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">unit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;MINUTES&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&quot;./scripts/monitor-metrics.sh&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;清理旧环境&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 清理另一个环境</span></span>
<span class="line"><span class="__shiki_1itgoe">                    def</span><span class="__shiki_140thh"> oldEnv </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">ENVIRONMENT</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &#39;blue&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_mdbnqw"> &#39;green&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;blue&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&quot;ansible-playbook cleanup.yml -e target_env=\${oldEnv}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    post {</span></span>
<span class="line"><span class="__shiki_140thh">        success {</span></span>
<span class="line"><span class="__shiki_140thh">            emailext(</span></span>
<span class="line"><span class="__shiki_dzsirb">                subject</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;蓝绿部署成功: \${params.VERSION}&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                body</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;版本 \${params.VERSION} 已成功部署到 \${params.ENVIRONMENT} 环境&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                to</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;team@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        failure {</span></span>
<span class="line"><span class="__shiki_140thh">            script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 自动回滚</span></span>
<span class="line"><span class="__shiki_1itgoe">                def</span><span class="__shiki_140thh"> oldEnv </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">ENVIRONMENT</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &#39;blue&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_mdbnqw"> &#39;green&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;blue&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                sh </span><span class="__shiki_mdbnqw">&quot;./scripts/switch-traffic.sh \${oldEnv}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            emailext(</span></span>
<span class="line"><span class="__shiki_dzsirb">                subject</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;蓝绿部署失败: \${params.VERSION}&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                body</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;版本 \${params.VERSION} 部署失败，已自动回滚&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                to</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;team@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-监控和告警配置" tabindex="-1">5.2 监控和告警配置 <a class="header-anchor" href="#_5-2-监控和告警配置" aria-label="Permalink to &quot;5.2 监控和告警配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus监控规则</span></span>
<span class="line"><span class="__shiki_17hn0y">groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">blue-green-deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 错误率监控</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HighErrorRateAfterDeployment</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          rate(http_requests_total{status=~&quot;5..&quot;, environment=&quot;green&quot;}[5m]) </span></span>
<span class="line"><span class="__shiki_mdbnqw">          / rate(http_requests_total{environment=&quot;green&quot;}[5m]) &gt; 0.05</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_17hn0y">        annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;绿环境错误率超过5%&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;蓝绿部署后绿环境错误率 {{ $value }}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 响应时间监控</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HighLatencyAfterSwitch</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          histogram_quantile(0.95, </span></span>
<span class="line"><span class="__shiki_mdbnqw">            rate(http_request_duration_seconds_bucket{environment=&quot;green&quot;}[5m])</span></span>
<span class="line"><span class="__shiki_mdbnqw">          ) &gt; 1</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">        annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;绿环境P95延迟超过1秒&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;切换后延迟异常增高&quot;</span></span></code></pre></div><h3 id="_5-3-回滚策略" tabindex="-1">5.3 回滚策略 <a class="header-anchor" href="#_5-3-回滚策略" aria-label="Permalink to &quot;5.3 回滚策略&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 自动化回滚脚本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置</span></span>
<span class="line"><span class="__shiki_140thh">CURRENT_ENV</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">get_current_environment</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">PREVIOUS_ENV</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">get_previous_environment</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">ROLLBACK_VERSION</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">get_previous_version</span><span class="__shiki_140thh"> $PREVIOUS_ENV)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;当前环境: </span><span class="__shiki_140thh">$CURRENT_ENV</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;回滚目标环境: </span><span class="__shiki_140thh">$PREVIOUS_ENV</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;回滚版本: </span><span class="__shiki_140thh">$ROLLBACK_VERSION</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 验证回滚环境健康状态</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj"> health_check</span><span class="__shiki_140thh"> $PREVIOUS_ENV; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;回滚环境不健康，尝试重新部署上一版本&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    deploy_version</span><span class="__shiki_140thh"> $PREVIOUS_ENV $ROLLBACK_VERSION</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj"> health_check</span><span class="__shiki_140thh"> $PREVIOUS_ENV; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;回滚环境部署失败，需要人工干预&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 执行流量切换</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;切换流量到 </span><span class="__shiki_140thh">$PREVIOUS_ENV</span><span class="__shiki_mdbnqw"> 环境&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> switch_traffic</span><span class="__shiki_140thh"> $PREVIOUS_ENV; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;流量切换成功&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">else</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;流量切换失败&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 验证回滚后服务状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> smoke_test</span><span class="__shiki_140thh"> $PREVIOUS_ENV; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;回滚验证成功&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 4. 清理失败的环境</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;清理 </span><span class="__shiki_140thh">$CURRENT_ENV</span><span class="__shiki_mdbnqw"> 环境&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    cleanup_environment</span><span class="__shiki_140thh"> $CURRENT_ENV</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 5. 发送通知</span></span>
<span class="line"><span class="__shiki_1t8gfj">    send_notification</span><span class="__shiki_mdbnqw"> &quot;回滚成功&quot;</span><span class="__shiki_mdbnqw"> &quot;已从 </span><span class="__shiki_140thh">$CURRENT_ENV</span><span class="__shiki_mdbnqw"> 回滚到 </span><span class="__shiki_140thh">$PREVIOUS_ENV</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">else</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;回滚验证失败，需要人工干预&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    send_notification</span><span class="__shiki_mdbnqw"> &quot;回滚失败&quot;</span><span class="__shiki_mdbnqw"> &quot;需要人工干预&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span></code></pre></div><h2 id="六、高级模式" tabindex="-1">六、高级模式 <a class="header-anchor" href="#六、高级模式" aria-label="Permalink to &quot;六、高级模式&quot;">​</a></h2><h3 id="_6-1-金丝雀发布结合" tabindex="-1">6.1 金丝雀发布结合 <a class="header-anchor" href="#_6-1-金丝雀发布结合" aria-label="Permalink to &quot;6.1 金丝雀发布结合&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 渐进式流量切换</span></span>
<span class="line"><span class="__shiki_17hn0y">traffic_switch_strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">canary</span></span>
<span class="line"><span class="__shiki_17hn0y">  stages</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">duration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">      percentage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10%</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">duration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10m</span></span>
<span class="line"><span class="__shiki_17hn0y">      percentage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">50%</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">duration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">15m</span></span>
<span class="line"><span class="__shiki_17hn0y">      percentage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100%</span></span>
<span class="line"><span class="__shiki_17hn0y">  conditions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">metric</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">error_rate</span></span>
<span class="line"><span class="__shiki_17hn0y">      threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.01</span></span>
<span class="line"><span class="__shiki_17hn0y">      operation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lt</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">metric</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">p95_latency</span></span>
<span class="line"><span class="__shiki_17hn0y">      threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">500</span></span>
<span class="line"><span class="__shiki_17hn0y">      operation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lt</span></span></code></pre></div><h3 id="_6-2-影子流量" tabindex="-1">6.2 影子流量 <a class="header-anchor" href="#_6-2-影子流量" aria-label="Permalink to &quot;6.2 影子流量&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 影子流量实现示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> handle_request</span><span class="__shiki_140thh">(request):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 处理实际请求</span></span>
<span class="line"><span class="__shiki_140thh">    response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> process_request(request)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 异步发送影子流量到新环境</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> should_send_shadow_traffic():</span></span>
<span class="line"><span class="__shiki_140thh">        shadow_request </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> create_shadow_request(request)</span></span>
<span class="line"><span class="__shiki_140thh">        send_to_shadow_environment(shadow_request)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> response</span></span></code></pre></div><h2 id="七、常见问题与解决方案" tabindex="-1">七、常见问题与解决方案 <a class="header-anchor" href="#七、常见问题与解决方案" aria-label="Permalink to &quot;七、常见问题与解决方案&quot;">​</a></h2><h3 id="_7-1-数据库迁移问题" tabindex="-1">7.1 数据库迁移问题 <a class="header-anchor" href="#_7-1-数据库迁移问题" aria-label="Permalink to &quot;7.1 数据库迁移问题&quot;">​</a></h3><p><strong>问题</strong>：数据库schema变更不兼容旧版本 <strong>解决方案</strong>：</p><ol><li>使用扩展-收缩模式（Expand-Contract Pattern）</li><li>保持向后兼容至少两个版本</li><li>使用功能开关控制新字段的使用</li></ol><h3 id="_7-2-会话保持问题" tabindex="-1">7.2 会话保持问题 <a class="header-anchor" href="#_7-2-会话保持问题" aria-label="Permalink to &quot;7.2 会话保持问题&quot;">​</a></h3><p><strong>问题</strong>：用户会话在环境切换时丢失 <strong>解决方案</strong>：</p><ol><li>使用集中式会话存储（Redis等）</li><li>实现无状态服务</li><li>在cookie中编码环境信息</li></ol><h3 id="_7-3-配置管理问题" tabindex="-1">7.3 配置管理问题 <a class="header-anchor" href="#_7-3-配置管理问题" aria-label="Permalink to &quot;7.3 配置管理问题&quot;">​</a></h3><p><strong>问题</strong>：环境特定配置导致部署失败 <strong>解决方案</strong>：</p><ol><li>使用配置管理工具（Consul、etcd）</li><li>环境配置外部化</li><li>配置版本控制</li></ol><h2 id="八、工具链推荐" tabindex="-1">八、工具链推荐 <a class="header-anchor" href="#八、工具链推荐" aria-label="Permalink to &quot;八、工具链推荐&quot;">​</a></h2><table tabindex="0"><thead><tr><th>工具类型</th><th>推荐工具</th><th>用途</th></tr></thead><tbody><tr><td>编排工具</td><td>Kubernetes, Docker Swarm</td><td>容器编排</td></tr><tr><td>配置管理</td><td>Ansible, Terraform</td><td>基础设施配置</td></tr><tr><td>负载均衡</td><td>Nginx, HAProxy, AWS ALB</td><td>流量路由</td></tr><tr><td>监控</td><td>Prometheus, Grafana, New Relic</td><td>监控和告警</td></tr><tr><td>部署工具</td><td>Spinnaker, ArgoCD, Jenkins</td><td>持续部署</td></tr><tr><td>数据库迁移</td><td>Flyway, Liquibase</td><td>数据库版本管理</td></tr></tbody></table><h2 id="九、总结" tabindex="-1">九、总结 <a class="header-anchor" href="#九、总结" aria-label="Permalink to &quot;九、总结&quot;">​</a></h2><p>蓝绿部署是一种强大的部署策略，通过维护两个相同的环境实现零停机部署和快速回滚。成功实施需要：</p><ol><li><strong>基础设施自动化</strong>：环境创建、配置、销毁全部自动化</li><li><strong>数据管理策略</strong>：妥善处理数据库迁移和数据一致性</li><li><strong>完善的监控</strong>：实时监控关键指标，快速发现问题</li><li><strong>自动化流程</strong>：部署、验证、切换、回滚全部自动化</li><li><strong>团队协作</strong>：开发、运维、测试团队紧密协作</li></ol><p>通过遵循最佳实践并选择合适的工具链，蓝绿部署可以显著提高部署频率，降低发布风险，是现代化DevOps实践的重要组成部分。</p>`,71)])])}const d=a(p,[["render",l]]);export{r as __pageData,d as default};
