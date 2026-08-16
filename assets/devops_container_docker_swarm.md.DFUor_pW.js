import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Docker Swarm集群管理详解 - 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/docker/swarm.md","filePath":"devops/container/docker/swarm.md"}'),_={name:"devops/container/docker/swarm.md"};function l(c,s,h,e,k,d){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="docker-swarm集群管理详解-完整学习笔记" tabindex="-1">Docker Swarm集群管理详解 - 完整学习笔记 <a class="header-anchor" href="#docker-swarm集群管理详解-完整学习笔记" aria-label="Permalink to &quot;Docker Swarm集群管理详解 - 完整学习笔记&quot;">​</a></h1><h2 id="一、swarm模式核心概念" tabindex="-1">一、Swarm模式核心概念 <a class="header-anchor" href="#一、swarm模式核心概念" aria-label="Permalink to &quot;一、Swarm模式核心概念&quot;">​</a></h2><h3 id="_1-1-什么是docker-swarm" tabindex="-1">1.1 什么是Docker Swarm <a class="header-anchor" href="#_1-1-什么是docker-swarm" aria-label="Permalink to &quot;1.1 什么是Docker Swarm&quot;">​</a></h3><p>Docker Swarm是Docker官方提供的容器编排工具，它将多个Docker主机集群化为一个虚拟的Docker引擎，提供容器的部署、扩展和管理功能。</p><h3 id="_1-2-swarm架构概览" tabindex="-1">1.2 Swarm架构概览 <a class="header-anchor" href="#_1-2-swarm架构概览" aria-label="Permalink to &quot;1.2 Swarm架构概览&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                Docker Swarm Cluster                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                                                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌──────────────────┐    ┌──────────────────┐     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │   Manager Node   │    │   Worker Node    │     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  ┌────────────┐  │    │  ┌────────────┐  │     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │   RAFT     │  │    │  │  Tasks     │  │     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │ Consensus  │◄─┼────┼──┤  (Containers)│  │     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  └────────────┘  │    │  └────────────┘  │     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  ┌────────────┐  │    │                  │     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │  Scheduler │  │    │                  │     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  └────────────┘  │    │                  │     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  ┌────────────┐  │    └──────────────────┘     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │ Discovery  │  │                             │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │ Service    │  │    ┌──────────────────┐     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  └────────────┘  │    │   Worker Node    │     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └────────┬─────────┘    │  ┌────────────┐  │     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│           │               │  │  Tasks     │  │     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌───────▼───────┐       │  │  (Containers)│  │     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │   Overlay     ├───────┼──►└────────────┘  │     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │   Network     │       └──────────────────┘     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └───────────────┘                                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_1-3-核心组件" tabindex="-1">1.3 核心组件 <a class="header-anchor" href="#_1-3-核心组件" aria-label="Permalink to &quot;1.3 核心组件&quot;">​</a></h3><table tabindex="0"><thead><tr><th>组件</th><th>说明</th></tr></thead><tbody><tr><td><strong>节点（Node）</strong></td><td>集群中的Docker主机，分为管理节点和工作节点</td></tr><tr><td><strong>服务（Service）</strong></td><td>定义要执行的容器任务，包括镜像、副本数、网络等</td></tr><tr><td><strong>任务（Task）</strong></td><td>服务的实例，对应一个运行的容器</td></tr><tr><td><strong>堆栈（Stack）</strong></td><td>一组相关服务的集合，通常通过docker-compose.yml定义</td></tr><tr><td><strong>覆盖网络（Overlay）</strong></td><td>跨节点容器通信的网络</td></tr><tr><td><strong>路由网格（Routing Mesh）</strong></td><td>将服务端口暴露给集群外部</td></tr></tbody></table><h3 id="_1-4-swarm-vs-kubernetes-vs-nomad" tabindex="-1">1.4 Swarm vs Kubernetes vs Nomad <a class="header-anchor" href="#_1-4-swarm-vs-kubernetes-vs-nomad" aria-label="Permalink to &quot;1.4 Swarm vs Kubernetes vs Nomad&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>Docker Swarm</th><th>Kubernetes</th><th>HashiCorp Nomad</th></tr></thead><tbody><tr><td>学习曲线</td><td>简单</td><td>复杂</td><td>中等</td></tr><tr><td>安装配置</td><td>简单</td><td>复杂</td><td>中等</td></tr><tr><td>资源占用</td><td>低</td><td>高</td><td>低</td></tr><tr><td>功能特性</td><td>基础</td><td>丰富</td><td>基础</td></tr><tr><td>社区生态</td><td>中等</td><td>庞大</td><td>小</td></tr><tr><td>适用场景</td><td>中小规模、快速部署</td><td>大规模、企业级</td><td>多云、混合环境</td></tr></tbody></table><h2 id="二、swarm集群部署与管理" tabindex="-1">二、Swarm集群部署与管理 <a class="header-anchor" href="#二、swarm集群部署与管理" aria-label="Permalink to &quot;二、Swarm集群部署与管理&quot;">​</a></h2><h3 id="_2-1-初始化swarm集群" tabindex="-1">2.1 初始化Swarm集群 <a class="header-anchor" href="#_2-1-初始化swarm集群" aria-label="Permalink to &quot;2.1 初始化Swarm集群&quot;">​</a></h3><h4 id="单管理节点集群" tabindex="-1">单管理节点集群： <a class="header-anchor" href="#单管理节点集群" aria-label="Permalink to &quot;单管理节点集群：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 初始化Swarm集群（主管理节点）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> swarm</span><span class="__shiki_mdbnqw"> init</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --advertise-addr</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">MANAGER_I</span><span class="__shiki_140thh">P</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --listen-addr</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">MANAGER_I</span><span class="__shiki_140thh">P</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw">:2377</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 示例：</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> swarm</span><span class="__shiki_mdbnqw"> init</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --advertise-addr</span><span class="__shiki_dzsirb"> 192.168.1.100</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --listen-addr</span><span class="__shiki_mdbnqw"> 192.168.1.100:2377</span></span></code></pre></div><h4 id="多管理节点集群-高可用" tabindex="-1">多管理节点集群（高可用）： <a class="header-anchor" href="#多管理节点集群-高可用" aria-label="Permalink to &quot;多管理节点集群（高可用）：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 节点1：初始化为主管理节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> swarm</span><span class="__shiki_mdbnqw"> init</span><span class="__shiki_dzsirb"> --advertise-addr</span><span class="__shiki_dzsirb"> 192.168.1.101</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 节点2：作为管理节点加入</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> swarm</span><span class="__shiki_mdbnqw"> join-token</span><span class="__shiki_mdbnqw"> manager</span><span class="__shiki_21nrsd">  # 在主管理节点执行，获取token</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> swarm</span><span class="__shiki_mdbnqw"> join</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --token</span><span class="__shiki_mdbnqw"> SWMTKN-1-xxx</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --advertise-addr</span><span class="__shiki_dzsirb"> 192.168.1.102</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  192.168.1.101:2377</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 节点3：作为工作节点加入</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> swarm</span><span class="__shiki_mdbnqw"> join-token</span><span class="__shiki_mdbnqw"> worker</span><span class="__shiki_21nrsd">  # 获取worker token</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> swarm</span><span class="__shiki_mdbnqw"> join</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --token</span><span class="__shiki_mdbnqw"> SWMTKN-1-yyy</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --advertise-addr</span><span class="__shiki_dzsirb"> 192.168.1.103</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  192.168.1.101:2377</span></span></code></pre></div><h3 id="_2-2-集群管理命令" tabindex="-1">2.2 集群管理命令 <a class="header-anchor" href="#_2-2-集群管理命令" aria-label="Permalink to &quot;2.2 集群管理命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看集群信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> info</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> ls</span><span class="__shiki_21nrsd">  # 列出所有节点</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看节点详情</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">NODE_I</span><span class="__shiki_140thh">D</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 提升工作节点为管理节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> promote</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">WORKER_NODE_I</span><span class="__shiki_140thh">D</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 降级管理节点为工作节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> demote</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">MANAGER_NODE_I</span><span class="__shiki_140thh">D</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 移除节点</span></span>
<span class="line"><span class="__shiki_21nrsd"># 首先在要移除的节点上执行：</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> swarm</span><span class="__shiki_mdbnqw"> leave</span><span class="__shiki_dzsirb"> --force</span></span>
<span class="line"><span class="__shiki_21nrsd"># 然后在管理节点上清理：</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> rm</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">NODE_I</span><span class="__shiki_140thh">D</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 更新节点标签（可用于调度约束）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --label-add</span><span class="__shiki_mdbnqw"> region=east</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --label-add</span><span class="__shiki_mdbnqw"> disk=ssd</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1itgoe">  &lt;</span><span class="__shiki_mdbnqw">NODE_I</span><span class="__shiki_140thh">D</span><span class="__shiki_1itgoe">&gt;</span></span></code></pre></div><h3 id="_2-3-集群备份与恢复" tabindex="-1">2.3 集群备份与恢复 <a class="header-anchor" href="#_2-3-集群备份与恢复" aria-label="Permalink to &quot;2.3 集群备份与恢复&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 备份Swarm集群状态</span></span>
<span class="line"><span class="__shiki_21nrsd"># 在管理节点上执行：</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> swarm</span><span class="__shiki_mdbnqw"> init</span><span class="__shiki_dzsirb"> --force-new-cluster</span><span class="__shiki_21nrsd">  # 如果当前节点是唯一的管理节点</span></span>
<span class="line"><span class="__shiki_21nrsd"># 或者使用etcd备份（如果使用外部存储）:</span></span>
<span class="line"><span class="__shiki_1t8gfj">tar</span><span class="__shiki_dzsirb"> -czf</span><span class="__shiki_mdbnqw"> swarm-backup-</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d</span><span class="__shiki_140thh">)</span><span class="__shiki_mdbnqw">.tar.gz</span><span class="__shiki_mdbnqw"> /var/lib/docker/swarm/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 恢复Swarm集群</span></span>
<span class="line"><span class="__shiki_21nrsd"># 方法1：从备份恢复</span></span>
<span class="line"><span class="__shiki_1t8gfj">tar</span><span class="__shiki_dzsirb"> -xzf</span><span class="__shiki_mdbnqw"> swarm-backup-YYYYMMDD.tar.gz</span><span class="__shiki_dzsirb"> -C</span><span class="__shiki_mdbnqw"> /</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法2：重新初始化并加入</span></span>
<span class="line"><span class="__shiki_21nrsd"># 如果所有管理节点都丢失了，需要重新初始化</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> swarm</span><span class="__shiki_mdbnqw"> init</span><span class="__shiki_dzsirb"> --force-new-cluster</span></span>
<span class="line"><span class="__shiki_21nrsd"># 然后其他节点重新加入</span></span></code></pre></div><h2 id="三、服务管理与部署" tabindex="-1">三、服务管理与部署 <a class="header-anchor" href="#三、服务管理与部署" aria-label="Permalink to &quot;三、服务管理与部署&quot;">​</a></h2><h3 id="_3-1-服务创建与管理" tabindex="-1">3.1 服务创建与管理 <a class="header-anchor" href="#_3-1-服务创建与管理" aria-label="Permalink to &quot;3.1 服务创建与管理&quot;">​</a></h3><h4 id="基本服务创建" tabindex="-1">基本服务创建： <a class="header-anchor" href="#基本服务创建" aria-label="Permalink to &quot;基本服务创建：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建服务</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> web</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --replicas</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --publish</span><span class="__shiki_mdbnqw"> published=80,target=</span><span class="__shiki_dzsirb">80</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --mount</span><span class="__shiki_mdbnqw"> type=bind,src=/var/www/html,target=/usr/share/nginx/html</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --limit-cpu</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --limit-memory</span><span class="__shiki_mdbnqw"> 100M</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --restart-condition</span><span class="__shiki_mdbnqw"> any</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看服务</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> ls</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_mdbnqw"> web</span><span class="__shiki_21nrsd">  # 查看服务任务</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_mdbnqw"> web</span><span class="__shiki_21nrsd">  # 查看服务日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> web</span><span class="__shiki_dzsirb"> --tail</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_21nrsd">  # 实时日志</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 扩缩容</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> scale</span><span class="__shiki_mdbnqw"> web=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_21nrsd">  # 扩展到5个副本</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> --replicas</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_mdbnqw"> web</span><span class="__shiki_21nrsd">  # 更新副本数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 删除服务</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> rm</span><span class="__shiki_mdbnqw"> web</span></span></code></pre></div><h4 id="高级服务配置" tabindex="-1">高级服务配置： <a class="header-anchor" href="#高级服务配置" aria-label="Permalink to &quot;高级服务配置：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建服务时指定约束</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> database</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --replicas</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --constraint</span><span class="__shiki_mdbnqw"> &#39;node.role==manager&#39;</span><span class="__shiki_21nrsd">  # 只在管理节点运行</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --constraint</span><span class="__shiki_mdbnqw"> &#39;node.labels.storage==ssd&#39;</span><span class="__shiki_21nrsd">  # 节点标签约束</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --placement-pref</span><span class="__shiki_mdbnqw"> &#39;spread=node.labels.zone&#39;</span><span class="__shiki_21nrsd">  # 分散部署</span></span>
<span class="line"><span class="__shiki_1t8gfj">  postgres:13</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 健康检查配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> api</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --health-cmd</span><span class="__shiki_mdbnqw"> &quot;curl -f http://localhost:8080/health || exit 1&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --health-interval</span><span class="__shiki_mdbnqw"> 30s</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --health-timeout</span><span class="__shiki_mdbnqw"> 10s</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --health-retries</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --health-start-period</span><span class="__shiki_mdbnqw"> 60s</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  myapi:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 更新策略</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> app</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --update-parallelism</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">         # 同时更新2个副本</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --update-delay</span><span class="__shiki_mdbnqw"> 10s</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">             # 更新间隔10秒</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --update-monitor</span><span class="__shiki_mdbnqw"> 30s</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">           # 监控30秒确认更新成功</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --update-failure-action</span><span class="__shiki_mdbnqw"> rollback</span><span class="__shiki_dzsirb"> \\#</span><span class="__shiki_mdbnqw"> 失败时回滚</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --update-max-failure-ratio</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd"> # 30%失败则停止更新</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --rollback-parallelism</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --rollback-delay</span><span class="__shiki_mdbnqw"> 5s</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  myapp:latest</span></span></code></pre></div><h3 id="_3-2-服务更新与回滚" tabindex="-1">3.2 服务更新与回滚 <a class="header-anchor" href="#_3-2-服务更新与回滚" aria-label="Permalink to &quot;3.2 服务更新与回滚&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 滚动更新服务</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --image</span><span class="__shiki_mdbnqw"> myapp:2.0</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --update-parallelism</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --update-delay</span><span class="__shiki_mdbnqw"> 10s</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --update-order</span><span class="__shiki_mdbnqw"> start-first</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd"> # 先启动新容器，再停止旧容器</span></span>
<span class="line"><span class="__shiki_1t8gfj">  app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 添加环境变量</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --env-add</span><span class="__shiki_mdbnqw"> NODE_ENV=production</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --env-add</span><span class="__shiki_mdbnqw"> LOG_LEVEL=info</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 更新端口映射</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --publish-rm</span><span class="__shiki_dzsirb"> 80</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd"> # 移除旧端口映射</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --publish-add</span><span class="__shiki_mdbnqw"> published=8080,target=</span><span class="__shiki_dzsirb">80</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 更新资源限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --limit-cpu</span><span class="__shiki_dzsirb"> 1.0</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --limit-memory</span><span class="__shiki_mdbnqw"> 512M</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --reserve-cpu</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --reserve-memory</span><span class="__shiki_mdbnqw"> 256M</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 强制更新（即使没有变更）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> --force</span><span class="__shiki_mdbnqw"> app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 回滚到上一版本</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> --rollback</span><span class="__shiki_mdbnqw"> app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看更新历史</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> --no-trunc</span><span class="__shiki_mdbnqw"> app</span></span></code></pre></div><h3 id="_3-3-全局服务与副本服务" tabindex="-1">3.3 全局服务与副本服务 <a class="header-anchor" href="#_3-3-全局服务与副本服务" aria-label="Permalink to &quot;3.3 全局服务与副本服务&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 副本服务（默认）- 在指定节点上运行指定数量的副本</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> web-replica</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --mode</span><span class="__shiki_mdbnqw"> replicated</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --replicas</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 全局服务 - 在集群所有节点上各运行一个副本</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> monitor-agent</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --mode</span><span class="__shiki_mdbnqw"> global</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --mount</span><span class="__shiki_mdbnqw"> type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  prom/node-exporter</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 将副本服务转换为全局服务</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> --mode</span><span class="__shiki_mdbnqw"> global</span><span class="__shiki_mdbnqw"> app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 将全局服务转换为副本服务</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> --mode</span><span class="__shiki_mdbnqw"> replicated</span><span class="__shiki_dzsirb"> --replicas</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_mdbnqw"> app</span></span></code></pre></div><h2 id="四、swarm网络详解" tabindex="-1">四、Swarm网络详解 <a class="header-anchor" href="#四、swarm网络详解" aria-label="Permalink to &quot;四、Swarm网络详解&quot;">​</a></h2><h3 id="_4-1-网络类型与配置" tabindex="-1">4.1 网络类型与配置 <a class="header-anchor" href="#_4-1-网络类型与配置" aria-label="Permalink to &quot;4.1 网络类型与配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> ls</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_mdbnqw"> ingress</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建overlay网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --driver</span><span class="__shiki_mdbnqw"> overlay</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --subnet</span><span class="__shiki_mdbnqw"> 10.0.0.0/24</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --gateway</span><span class="__shiki_dzsirb"> 10.0.0.1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --attachable</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">       # 允许非Swarm服务连接</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --opt</span><span class="__shiki_mdbnqw"> encrypted</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">    # 加密网络流量</span></span>
<span class="line"><span class="__shiki_1t8gfj">  my-overlay-network</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建内部网络（不暴露到外部）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --driver</span><span class="__shiki_mdbnqw"> overlay</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --internal</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  internal-network</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 服务连接到网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> web</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> my-overlay-network</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> ingress</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd"> # 可以连接多个网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 更新服务的网络配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network-add</span><span class="__shiki_mdbnqw"> backend-network</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network-rm</span><span class="__shiki_mdbnqw"> my-overlay-network</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  web</span></span></code></pre></div><h3 id="_4-2-路由网格-routing-mesh" tabindex="-1">4.2 路由网格（Routing Mesh） <a class="header-anchor" href="#_4-2-路由网格-routing-mesh" aria-label="Permalink to &quot;4.2 路由网格（Routing Mesh）&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用路由网格的服务（默认）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> web</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --publish</span><span class="__shiki_mdbnqw"> published=80,target=</span><span class="__shiki_dzsirb">80</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --publish</span><span class="__shiki_mdbnqw"> published=443,target=</span><span class="__shiki_dzsirb">443</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 禁用路由网格（直接模式）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> api</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --publish</span><span class="__shiki_mdbnqw"> published=8080,target=80,mode=host</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  myapi:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看路由网格规则</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_mdbnqw"> nat</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> DOCKER</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 路由网格流量路径：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 外部请求 -&gt; 任意节点IP:端口 -&gt; iptables DNAT -&gt; 容器IP:端口</span></span></code></pre></div><h3 id="_4-3-dns与服务发现" tabindex="-1">4.3 DNS与服务发现 <a class="header-anchor" href="#_4-3-dns与服务发现" aria-label="Permalink to &quot;4.3 DNS与服务发现&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 服务间通过服务名通信（自动DNS解析）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 创建后端服务</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> database</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> app-network</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  postgres:13</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建前端服务（可以通过&quot;database&quot;主机名访问）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> frontend</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> app-network</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --env</span><span class="__shiki_mdbnqw"> DB_HOST=database</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  myapp:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看DNS解析</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">container_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> nslookup</span><span class="__shiki_mdbnqw"> database</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">container_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> cat</span><span class="__shiki_mdbnqw"> /etc/resolv.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义DNS配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> app</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --dns</span><span class="__shiki_dzsirb"> 8.8.8.8</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --dns</span><span class="__shiki_dzsirb"> 1.1.1.1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --dns-search</span><span class="__shiki_mdbnqw"> example.com</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --dns-opt</span><span class="__shiki_mdbnqw"> timeout:2</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  myapp:latest</span></span></code></pre></div><h2 id="五、存储与配置管理" tabindex="-1">五、存储与配置管理 <a class="header-anchor" href="#五、存储与配置管理" aria-label="Permalink to &quot;五、存储与配置管理&quot;">​</a></h2><h3 id="_5-1-数据卷管理" tabindex="-1">5.1 数据卷管理 <a class="header-anchor" href="#_5-1-数据卷管理" aria-label="Permalink to &quot;5.1 数据卷管理&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建卷</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> volume</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --driver</span><span class="__shiki_mdbnqw"> local</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --opt</span><span class="__shiki_mdbnqw"> type=nfs</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --opt</span><span class="__shiki_mdbnqw"> device=:/nfs/data</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --opt</span><span class="__shiki_mdbnqw"> o=addr=192.168.1.200,rw</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  app-data</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 服务使用卷</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> database</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --mount</span><span class="__shiki_mdbnqw"> type=volume,src=app-data,dst=/var/lib/postgresql/data</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --mount</span><span class="__shiki_mdbnqw"> type=bind,src=/host/path,dst=/container/path</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --mount</span><span class="__shiki_mdbnqw"> type=tmpfs,dst=/tmp</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  postgres:13</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 更新服务的存储配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --mount-add</span><span class="__shiki_mdbnqw"> type=volume,src=backup-data,dst=/backups</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  database</span></span></code></pre></div><h3 id="_5-2-配置管理-configs" tabindex="-1">5.2 配置管理（Configs） <a class="header-anchor" href="#_5-2-配置管理-configs" aria-label="Permalink to &quot;5.2 配置管理（Configs）&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建配置</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;database_url: postgres://user:pass@db:5432/app&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> database.yml</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> app-database-config</span><span class="__shiki_mdbnqw"> database.yml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> ls</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_mdbnqw"> app-database-config</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 服务使用配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> app</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --config</span><span class="__shiki_mdbnqw"> source=app-database-config,target=/app/config/database.yml</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --config</span><span class="__shiki_mdbnqw"> source=app-nginx-config,target=/etc/nginx/nginx.conf</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  myapp:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 更新配置（创建新版本）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> app-database-config-v2</span><span class="__shiki_mdbnqw"> database-v2.yml</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --config-rm</span><span class="__shiki_mdbnqw"> app-database-config</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --config-add</span><span class="__shiki_mdbnqw"> source=app-database-config-v2,target=/app/config/database.yml</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 删除配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> rm</span><span class="__shiki_mdbnqw"> app-database-config</span></span></code></pre></div><h3 id="_5-3-秘密管理-secrets" tabindex="-1">5.3 秘密管理（Secrets） <a class="header-anchor" href="#_5-3-秘密管理-secrets" aria-label="Permalink to &quot;5.3 秘密管理（Secrets）&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建秘密（通过文件）</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;mysecretpassword&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> db_password.txt</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> db_password</span><span class="__shiki_mdbnqw"> db_password.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或者通过标准输入创建</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;mysecretpassword&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> docker</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> db_password</span><span class="__shiki_mdbnqw"> -</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看秘密</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> ls</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_mdbnqw"> db_password</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 服务使用秘密</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> database</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --secret</span><span class="__shiki_mdbnqw"> source=db_password,target=db_password</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --secret</span><span class="__shiki_mdbnqw"> source=ssl_cert,target=/run/secrets/ssl_cert</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  postgres:13</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在容器中访问秘密</span></span>
<span class="line"><span class="__shiki_21nrsd"># 秘密文件位于：/run/secrets/&lt;secret_name&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd"># 例如：cat /run/secrets/db_password</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 更新秘密（需要创建新版本）</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;newpassword&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> docker</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> db_password_v2</span><span class="__shiki_mdbnqw"> -</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --secret-rm</span><span class="__shiki_mdbnqw"> db_password</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --secret-add</span><span class="__shiki_mdbnqw"> source=db_password_v2,target=db_password</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  database</span></span></code></pre></div><h2 id="六、堆栈-stack-部署" tabindex="-1">六、堆栈（Stack）部署 <a class="header-anchor" href="#六、堆栈-stack-部署" aria-label="Permalink to &quot;六、堆栈（Stack）部署&quot;">​</a></h2><h3 id="_6-1-docker-compose与swarm集成" tabindex="-1">6.1 Docker Compose与Swarm集成 <a class="header-anchor" href="#_6-1-docker-compose与swarm集成" aria-label="Permalink to &quot;6.1 Docker Compose与Swarm集成&quot;">​</a></h3><h4 id="docker-compose-yml示例" tabindex="-1">docker-compose.yml示例： <a class="header-anchor" href="#docker-compose-yml示例" aria-label="Permalink to &quot;docker-compose.yml示例：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定义网络</span></span>
<span class="line"><span class="__shiki_17hn0y">networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  frontend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">overlay</span></span>
<span class="line"><span class="__shiki_17hn0y">    attachable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    ipam</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">subnet</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10.10.0.0/24</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_17hn0y">  backend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">overlay</span></span>
<span class="line"><span class="__shiki_17hn0y">    internal</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    ipam</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">subnet</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10.20.0.0/24</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定义卷</span></span>
<span class="line"><span class="__shiki_17hn0y">volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  db-data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">local</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver_opts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nfs</span></span>
<span class="line"><span class="__shiki_17hn0y">      o</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">addr=192.168.1.200,rw</span></span>
<span class="line"><span class="__shiki_17hn0y">      device</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;:/nfs/db-data&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定义配置</span></span>
<span class="line"><span class="__shiki_17hn0y">configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  nginx_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./nginx/nginx.conf</span></span>
<span class="line"><span class="__shiki_17hn0y">    external</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  app_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./config/app.yml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定义秘密</span></span>
<span class="line"><span class="__shiki_17hn0y">secrets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  db_password</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./secrets/db_password.txt</span></span>
<span class="line"><span class="__shiki_17hn0y">  ssl_cert</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    external</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定义服务</span></span>
<span class="line"><span class="__shiki_17hn0y">services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 负载均衡器</span></span>
<span class="line"><span class="__shiki_17hn0y">  traefik</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">traefik:v2.10</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">replicated</span></span>
<span class="line"><span class="__shiki_17hn0y">      replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">      placement</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        constraints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">node.role==manager</span></span>
<span class="line"><span class="__shiki_17hn0y">      update_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        parallelism</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">        delay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10s</span></span>
<span class="line"><span class="__shiki_17hn0y">        order</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">start-first</span></span>
<span class="line"><span class="__shiki_17hn0y">      restart_policy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        condition</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">on-failure</span></span>
<span class="line"><span class="__shiki_17hn0y">        delay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5s</span></span>
<span class="line"><span class="__shiki_17hn0y">        max_attempts</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;0.5&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">256M</span></span>
<span class="line"><span class="__shiki_17hn0y">        reservations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;0.25&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">128M</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;80:80&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;443:443&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;8080:8080&quot;</span><span class="__shiki_21nrsd">  # Traefik dashboard</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/var/run/docker.sock:/var/run/docker.sock:ro</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">traefik-data:/etc/traefik</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">    configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">traefik_config</span></span>
<span class="line"><span class="__shiki_17hn0y">        target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/traefik/traefik.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">    secrets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">ssl_cert</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # Web应用</span></span>
<span class="line"><span class="__shiki_17hn0y">  webapp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">      update_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        parallelism</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">        delay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10s</span></span>
<span class="line"><span class="__shiki_17hn0y">      rollback_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        parallelism</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">        delay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5s</span></span>
<span class="line"><span class="__shiki_17hn0y">      placement</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        constraints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">node.labels.env==production</span></span>
<span class="line"><span class="__shiki_17hn0y">        preferences</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">spread</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node.labels.zone</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">NODE_ENV=production</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">DB_HOST=database</span></span>
<span class="line"><span class="__shiki_17hn0y">    depends_on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">database</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">backend</span></span>
<span class="line"><span class="__shiki_17hn0y">    configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app_config</span></span>
<span class="line"><span class="__shiki_17hn0y">        target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/app/config.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">    secrets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">db_password</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # 数据库</span></span>
<span class="line"><span class="__shiki_17hn0y">  database</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgres:14</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">replicated</span></span>
<span class="line"><span class="__shiki_17hn0y">      replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">      placement</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        constraints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">node.labels.storage==ssd</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      POSTGRES_DB</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">      POSTGRES_USER</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">admin</span></span>
<span class="line"><span class="__shiki_17hn0y">      POSTGRES_PASSWORD_FILE</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/run/secrets/db_password</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">db-data:/var/lib/postgresql/data</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">backend</span></span>
<span class="line"><span class="__shiki_17hn0y">    secrets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">db_password</span></span>
<span class="line"><span class="__shiki_17hn0y">    healthcheck</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      test</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;CMD-SHELL&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;pg_isready -U admin&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_17hn0y">      timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10s</span></span>
<span class="line"><span class="__shiki_17hn0y">      retries</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">      start_period</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">40s</span></span></code></pre></div><h3 id="_6-2-堆栈部署命令" tabindex="-1">6.2 堆栈部署命令 <a class="header-anchor" href="#_6-2-堆栈部署命令" aria-label="Permalink to &quot;6.2 堆栈部署命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 部署堆栈</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stack</span><span class="__shiki_mdbnqw"> deploy</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --with-registry-auth</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd"> # 使用仓库认证</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --prune</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">              # 删除不再在compose文件中定义的服务</span></span>
<span class="line"><span class="__shiki_1t8gfj">  -c</span><span class="__shiki_mdbnqw"> docker-compose.yml</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  myapp-stack</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看堆栈</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stack</span><span class="__shiki_mdbnqw"> ls</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stack</span><span class="__shiki_mdbnqw"> services</span><span class="__shiki_mdbnqw"> myapp-stack</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stack</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_mdbnqw"> myapp-stack</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看服务日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_mdbnqw"> myapp-stack_webapp</span><span class="__shiki_dzsirb"> -f</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 更新堆栈</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stack</span><span class="__shiki_mdbnqw"> deploy</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> docker-compose-v2.yml</span><span class="__shiki_mdbnqw"> myapp-stack</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 移除堆栈</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stack</span><span class="__shiki_mdbnqw"> rm</span><span class="__shiki_mdbnqw"> myapp-stack</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看堆栈配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stack</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> myapp-stack</span><span class="__shiki_21nrsd">  # 需要docker-compose 3.8+</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在Swarm模式下使用环境变量文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stack</span><span class="__shiki_mdbnqw"> deploy</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --compose-file</span><span class="__shiki_mdbnqw"> docker-compose.yml</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --env-file</span><span class="__shiki_mdbnqw"> .env.production</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  myapp-stack</span></span></code></pre></div><h2 id="七、监控与日志管理" tabindex="-1">七、监控与日志管理 <a class="header-anchor" href="#七、监控与日志管理" aria-label="Permalink to &quot;七、监控与日志管理&quot;">​</a></h2><h3 id="_7-1-内置监控命令" tabindex="-1">7.1 内置监控命令 <a class="header-anchor" href="#_7-1-内置监控命令" aria-label="Permalink to &quot;7.1 内置监控命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看服务状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> --no-trunc</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">service_nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看服务日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --tail</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --follow</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --timestamps</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1itgoe">  &lt;</span><span class="__shiki_mdbnqw">service_nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看节点资源使用</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> --no-trunc</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node_nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stats</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 查看所有容器资源使用</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看集群事件</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> events</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --since</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --until</span><span class="__shiki_mdbnqw"> &#39;2024-01-31&#39;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --filter</span><span class="__shiki_mdbnqw"> &#39;type=service&#39;</span></span></code></pre></div><h3 id="_7-2-集成监控方案" tabindex="-1">7.2 集成监控方案 <a class="header-anchor" href="#_7-2-集成监控方案" aria-label="Permalink to &quot;7.2 集成监控方案&quot;">​</a></h3><h4 id="prometheus监控配置" tabindex="-1">Prometheus监控配置： <a class="header-anchor" href="#prometheus监控配置" aria-label="Permalink to &quot;Prometheus监控配置：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># docker-compose.monitoring.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  prometheus</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prom/prometheus:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      placement</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        constraints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">node.role==manager</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">prometheus-data:/prometheus</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">    configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prometheus_config</span></span>
<span class="line"><span class="__shiki_17hn0y">        target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/prometheus/prometheus.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;9090:9090&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  node-exporter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prom/node-exporter:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">global</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/proc:/host/proc:ro</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/sys:/host/sys:ro</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/:/rootfs:ro</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;--path.procfs=/host/proc&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;--path.sysfs=/host/sys&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  grafana</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">grafana/grafana:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      placement</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        constraints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">node.role==manager</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">grafana-data:/var/lib/grafana</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">GF_SECURITY_ADMIN_PASSWORD=admin</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;3000:3000&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  monitoring</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">overlay</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  prometheus-data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  grafana-data</span><span class="__shiki_140thh">:</span></span></code></pre></div><h3 id="_7-3-日志聚合" tabindex="-1">7.3 日志聚合 <a class="header-anchor" href="#_7-3-日志聚合" aria-label="Permalink to &quot;7.3 日志聚合&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用ELK堆栈</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stack</span><span class="__shiki_mdbnqw"> deploy</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> docker-compose.elk.yml</span><span class="__shiki_mdbnqw"> logging</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置服务的日志驱动</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> app</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --log-driver</span><span class="__shiki_mdbnqw"> json-file</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --log-opt</span><span class="__shiki_mdbnqw"> max-size=10m</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --log-opt</span><span class="__shiki_mdbnqw"> max-file=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --log-opt</span><span class="__shiki_mdbnqw"> labels=production</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --log-opt</span><span class="__shiki_mdbnqw"> env=ENV</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  myapp:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 支持的日志驱动：</span></span>
<span class="line"><span class="__shiki_21nrsd"># json-file（默认）, syslog, journald, gelf, fluentd, awslogs, splunk, etwlogs, gcplogs, logentries</span></span></code></pre></div><h2 id="八、安全最佳实践" tabindex="-1">八、安全最佳实践 <a class="header-anchor" href="#八、安全最佳实践" aria-label="Permalink to &quot;八、安全最佳实践&quot;">​</a></h2><h3 id="_8-1-集群安全加固" tabindex="-1">8.1 集群安全加固 <a class="header-anchor" href="#_8-1-集群安全加固" aria-label="Permalink to &quot;8.1 集群安全加固&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用TLS加密集群通信</span></span>
<span class="line"><span class="__shiki_21nrsd"># 初始化时自动配置TLS</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> swarm</span><span class="__shiki_mdbnqw"> init</span><span class="__shiki_dzsirb"> --advertise-addr</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">I</span><span class="__shiki_140thh">P</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证TLS配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> info</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -A5</span><span class="__shiki_mdbnqw"> &quot;Swarm&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 限制管理节点访问</span></span>
<span class="line"><span class="__shiki_21nrsd"># 只允许特定的IP访问管理端口（2377）</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_mdbnqw"> INPUT</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> tcp</span><span class="__shiki_dzsirb"> --dport</span><span class="__shiki_dzsirb"> 2377</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> 192.168.1.0/24</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> ACCEPT</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_mdbnqw"> INPUT</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> tcp</span><span class="__shiki_dzsirb"> --dport</span><span class="__shiki_dzsirb"> 2377</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> DROP</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 定期轮换加入令牌</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> swarm</span><span class="__shiki_mdbnqw"> join-token</span><span class="__shiki_dzsirb"> --rotate</span><span class="__shiki_mdbnqw"> worker</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> swarm</span><span class="__shiki_mdbnqw"> join-token</span><span class="__shiki_dzsirb"> --rotate</span><span class="__shiki_mdbnqw"> manager</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 使用秘密管理敏感信息</span></span>
<span class="line"><span class="__shiki_21nrsd"># 不要使用环境变量传递密码</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;secretpassword&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> docker</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> db_password</span><span class="__shiki_mdbnqw"> -</span></span></code></pre></div><h3 id="_8-2-服务安全配置" tabindex="-1">8.2 服务安全配置 <a class="header-anchor" href="#_8-2-服务安全配置" aria-label="Permalink to &quot;8.2 服务安全配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># docker-compose.yml安全配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  app</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 使用非root用户</span></span>
<span class="line"><span class="__shiki_17hn0y">      user</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1000:1000&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 安全上下文</span></span>
<span class="line"><span class="__shiki_17hn0y">      sysctls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">net.core.somaxconn=1024</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 资源限制防止DoS</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;1.0&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">512M</span></span>
<span class="line"><span class="__shiki_17hn0y">          pids</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_21nrsd">  # 限制进程数</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 重启策略</span></span>
<span class="line"><span class="__shiki_17hn0y">      restart_policy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        condition</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">on-failure</span></span>
<span class="line"><span class="__shiki_17hn0y">        max_attempts</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 更新策略</span></span>
<span class="line"><span class="__shiki_17hn0y">      update_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        failure_action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rollback</span></span>
<span class="line"><span class="__shiki_17hn0y">        monitor</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 只读根文件系统</span></span>
<span class="line"><span class="__shiki_17hn0y">    read_only</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 临时文件系统</span></span>
<span class="line"><span class="__shiki_17hn0y">    tmpfs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/tmp</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/run</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全选项</span></span>
<span class="line"><span class="__shiki_17hn0y">    security_opt</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">no-new-privileges:true</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">seccomp:unconfined</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 能力控制</span></span>
<span class="line"><span class="__shiki_17hn0y">    cap_drop</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">ALL</span></span>
<span class="line"><span class="__shiki_17hn0y">    cap_add</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">NET_BIND_SERVICE</span><span class="__shiki_21nrsd">  # 仅允许绑定低端口</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 特权模式（通常应禁用）</span></span>
<span class="line"><span class="__shiki_17hn0y">    privileged</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span></code></pre></div><h2 id="九、故障排查与维护" tabindex="-1">九、故障排查与维护 <a class="header-anchor" href="#九、故障排查与维护" aria-label="Permalink to &quot;九、故障排查与维护&quot;">​</a></h2><h3 id="_9-1-常见问题排查" tabindex="-1">9.1 常见问题排查 <a class="header-anchor" href="#_9-1-常见问题排查" aria-label="Permalink to &quot;9.1 常见问题排查&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 服务无法启动</span></span>
<span class="line"><span class="__shiki_21nrsd"># 检查服务状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> --no-trunc</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">service_nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看失败任务的日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">service_nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> --no-task-ids</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查节点状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> ls</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> Status</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 网络问题</span></span>
<span class="line"><span class="__shiki_21nrsd"># 检查网络配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">network_nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 测试容器间连通性</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">container_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> ping</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">target_servic</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看路由网格</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_mdbnqw"> nat</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> DOCKER</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 存储问题</span></span>
<span class="line"><span class="__shiki_21nrsd"># 检查卷状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> volume</span><span class="__shiki_mdbnqw"> ls</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> volume</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">volume_nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看挂载点</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">container_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> df</span><span class="__shiki_dzsirb"> -h</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 调度问题</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查看调度约束</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">service_nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -A10</span><span class="__shiki_mdbnqw"> Constraints</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查节点标签</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -A5</span><span class="__shiki_mdbnqw"> Labels</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 集群健康检查</span></span>
<span class="line"><span class="__shiki_21nrsd"># 检查RAFT共识</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> ls</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_mdbnqw"> &quot;table {{.Hostname}}\\t{{.Status}}\\t{{.Availability}}&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证管理节点数（奇数个）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> ls</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &quot;Leader\\|Reachable&quot;</span></span></code></pre></div><h3 id="_9-2-集群维护操作" tabindex="-1">9.2 集群维护操作 <a class="header-anchor" href="#_9-2-集群维护操作" aria-label="Permalink to &quot;9.2 集群维护操作&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 节点维护模式</span></span>
<span class="line"><span class="__shiki_21nrsd"># 将节点设置为drain模式（不调度新任务）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> --availability</span><span class="__shiki_mdbnqw"> drain</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 恢复节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> --availability</span><span class="__shiki_mdbnqw"> active</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 暂停/恢复节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> --availability</span><span class="__shiki_mdbnqw"> pause</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> --availability</span><span class="__shiki_mdbnqw"> active</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 强制移除故障节点</span></span>
<span class="line"><span class="__shiki_21nrsd"># 如果节点无法响应</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> rm</span><span class="__shiki_dzsirb"> --force</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 清理集群资源</span></span>
<span class="line"><span class="__shiki_21nrsd"># 清理未使用的资源</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> system</span><span class="__shiki_mdbnqw"> prune</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_dzsirb"> --volumes</span><span class="__shiki_dzsirb"> --filter</span><span class="__shiki_mdbnqw"> &quot;until=24h&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 清理未使用的配置和秘密</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> prune</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> prune</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 集群升级</span></span>
<span class="line"><span class="__shiki_21nrsd"># 逐节点升级Docker引擎</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1) 将节点设置为drain</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2) 升级Docker</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3) 重启Docker服务</span></span>
<span class="line"><span class="__shiki_21nrsd"># 4) 将节点恢复为active</span></span></code></pre></div><h3 id="_9-3-备份与恢复脚本" tabindex="-1">9.3 备份与恢复脚本 <a class="header-anchor" href="#_9-3-备份与恢复脚本" aria-label="Permalink to &quot;9.3 备份与恢复脚本&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># swarm-backup.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">BACKUP_DIR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/backup/swarm&quot;</span></span>
<span class="line"><span class="__shiki_140thh">TIMESTAMP</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d_%H%M%S</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">BACKUP_FILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;\${</span><span class="__shiki_140thh">BACKUP_DIR</span><span class="__shiki_mdbnqw">}/swarm_backup_\${</span><span class="__shiki_140thh">TIMESTAMP</span><span class="__shiki_mdbnqw">}.tar.gz&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 确保目录存在</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh"> \${BACKUP_DIR}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;开始备份Swarm集群...&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 备份Swarm配置</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;备份Swarm配置...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> ls</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1itgoe"> while</span><span class="__shiki_dzsirb"> read</span><span class="__shiki_mdbnqw"> NODE_ID</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">    NODE_NAME</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_140thh"> \${NODE_ID} </span><span class="__shiki_dzsirb">--format</span><span class="__shiki_mdbnqw"> &#39;{{.Description.Hostname}}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> docker</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_140thh"> \${NODE_ID} </span><span class="__shiki_dzsirb">--format</span><span class="__shiki_mdbnqw"> &#39;{{.ManagerStatus.Reachability}}&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> &quot;reachable&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;备份管理节点: \${</span><span class="__shiki_140thh">NODE_NAME</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 备份Raft状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">        ssh</span><span class="__shiki_140thh"> \${NODE_NAME} </span><span class="__shiki_mdbnqw">&quot;tar -czf /tmp/swarm-state.tar.gz /var/lib/docker/swarm/&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        scp</span><span class="__shiki_140thh"> \${NODE_NAME}</span><span class="__shiki_mdbnqw">:/tmp/swarm-state.tar.gz</span><span class="__shiki_140thh"> \${BACKUP_DIR}</span><span class="__shiki_mdbnqw">/swarm-state-</span><span class="__shiki_140thh">\${NODE_NAME}</span><span class="__shiki_mdbnqw">.tar.gz</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 备份服务定义</span></span>
<span class="line"><span class="__shiki_1t8gfj">        docker</span><span class="__shiki_mdbnqw"> stack</span><span class="__shiki_mdbnqw"> ls</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_mdbnqw"> &#39;{{.Name}}&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1itgoe"> while</span><span class="__shiki_dzsirb"> read</span><span class="__shiki_mdbnqw"> STACK</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1t8gfj">            docker</span><span class="__shiki_mdbnqw"> stack</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_140thh"> \${STACK} </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> \${BACKUP_DIR}</span><span class="__shiki_mdbnqw">/stack-</span><span class="__shiki_140thh">\${STACK}</span><span class="__shiki_mdbnqw">.yml</span></span>
<span class="line"><span class="__shiki_1itgoe">        done</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 备份配置和秘密</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;备份配置和秘密...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> ls</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1itgoe"> while</span><span class="__shiki_dzsirb"> read</span><span class="__shiki_mdbnqw"> CONFIG_ID</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">    CONFIG_NAME</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_140thh"> \${CONFIG_ID} </span><span class="__shiki_dzsirb">--format</span><span class="__shiki_mdbnqw"> &#39;{{.Spec.Name}}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    docker</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_140thh"> \${CONFIG_ID} </span><span class="__shiki_dzsirb">--format</span><span class="__shiki_mdbnqw"> &#39;{{.Spec.Data}}&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> base64</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> \${BACKUP_DIR}</span><span class="__shiki_mdbnqw">/config-</span><span class="__shiki_140thh">\${CONFIG_NAME}</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> ls</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1itgoe"> while</span><span class="__shiki_dzsirb"> read</span><span class="__shiki_mdbnqw"> SECRET_ID</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">    SECRET_NAME</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_140thh"> \${SECRET_ID} </span><span class="__shiki_dzsirb">--format</span><span class="__shiki_mdbnqw"> &#39;{{.Spec.Name}}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    docker</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_140thh"> \${SECRET_ID} </span><span class="__shiki_dzsirb">--format</span><span class="__shiki_mdbnqw"> &#39;{{.Spec.Data}}&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> base64</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> \${BACKUP_DIR}</span><span class="__shiki_mdbnqw">/secret-</span><span class="__shiki_140thh">\${SECRET_NAME}</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 创建完整备份包</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;创建备份包...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">tar</span><span class="__shiki_dzsirb"> -czf</span><span class="__shiki_140thh"> \${BACKUP_FILE} </span><span class="__shiki_dzsirb">-C</span><span class="__shiki_140thh"> \${BACKUP_DIR} </span><span class="__shiki_mdbnqw">.</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 清理临时文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">rm</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_140thh"> \${BACKUP_DIR}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">*</span><span class="__shiki_mdbnqw">.yml</span><span class="__shiki_140thh"> \${BACKUP_DIR}</span><span class="__shiki_mdbnqw">/config-</span><span class="__shiki_dzsirb">*</span><span class="__shiki_140thh"> \${BACKUP_DIR}</span><span class="__shiki_mdbnqw">/secret-</span><span class="__shiki_dzsirb">*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;备份完成: \${</span><span class="__shiki_140thh">BACKUP_FILE</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;SHA256: $(</span><span class="__shiki_1t8gfj">sha256sum</span><span class="__shiki_mdbnqw"> \${</span><span class="__shiki_140thh">BACKUP_FILE</span><span class="__shiki_mdbnqw">})&quot;</span></span></code></pre></div><h2 id="十、最佳实践总结" tabindex="-1">十、最佳实践总结 <a class="header-anchor" href="#十、最佳实践总结" aria-label="Permalink to &quot;十、最佳实践总结&quot;">​</a></h2><h3 id="_10-1-swarm集群设计原则" tabindex="-1">10.1 Swarm集群设计原则 <a class="header-anchor" href="#_10-1-swarm集群设计原则" aria-label="Permalink to &quot;10.1 Swarm集群设计原则&quot;">​</a></h3><table tabindex="0"><thead><tr><th>原则</th><th>说明</th><th>实施方法</th></tr></thead><tbody><tr><td>奇数管理节点</td><td>保证RAFT共识</td><td>3、5、7个管理节点</td></tr><tr><td>标签化调度</td><td>精细化控制部署位置</td><td>为节点添加region、zone、storage等标签</td></tr><tr><td>分散部署</td><td>提高可用性</td><td>使用placement-pref分散部署</td></tr><tr><td>资源限制</td><td>防止资源耗尽</td><td>为服务设置CPU、内存限制</td></tr><tr><td>滚动更新</td><td>零停机部署</td><td>配置合理的update-parallelism和delay</td></tr><tr><td>健康检查</td><td>自动故障恢复</td><td>为所有服务配置健康检查</td></tr></tbody></table><h3 id="_10-2-生产环境检查清单" tabindex="-1">10.2 生产环境检查清单 <a class="header-anchor" href="#_10-2-生产环境检查清单" aria-label="Permalink to &quot;10.2 生产环境检查清单&quot;">​</a></h3><ul><li><p>[ ] <strong>集群架构</strong></p><ul><li>[ ] 3个或以上管理节点</li><li>[ ] 管理节点和工作节点分离</li><li>[ ] 跨可用区/机架部署</li></ul></li><li><p>[ ] <strong>网络配置</strong></p><ul><li>[ ] Overlay网络加密启用</li><li>[ ] 网络分段合理（前端/后端/数据）</li><li>[ ] 防火墙规则配置正确</li></ul></li><li><p>[ ] <strong>存储管理</strong></p><ul><li>[ ] 数据卷使用持久化存储</li><li>[ ] 敏感信息使用secrets管理</li><li>[ ] 配置文件使用configs管理</li></ul></li><li><p>[ ] <strong>安全配置</strong></p><ul><li>[ ] 集群通信TLS加密</li><li>[ ] 定期轮换加入令牌</li><li>[ ] 服务使用非root用户运行</li></ul></li><li><p>[ ] <strong>监控告警</strong></p><ul><li>[ ] 集群监控部署</li><li>[ ] 日志聚合配置</li><li>[ ] 关键指标告警设置</li></ul></li><li><p>[ ] <strong>备份策略</strong></p><ul><li>[ ] 集群状态定期备份</li><li>[ ] 数据卷备份策略</li><li>[ ] 恢复流程测试</li></ul></li></ul><h3 id="_10-3-性能优化建议" tabindex="-1">10.3 性能优化建议 <a class="header-anchor" href="#_10-3-性能优化建议" aria-label="Permalink to &quot;10.3 性能优化建议&quot;">​</a></h3><ol><li><p><strong>网络性能</strong>：</p><ul><li>使用host模式部署网络敏感型应用</li><li>调整MTU大小匹配底层网络</li><li>考虑使用MACVLAN/IPVLAN</li></ul></li><li><p><strong>存储性能</strong>：</p><ul><li>使用本地SSD存储高性能需求的数据</li><li>NFS存储配置适当的缓存和超时</li><li>考虑分布式存储（Ceph、GlusterFS）</li></ul></li><li><p><strong>调度优化</strong>：</p><ul><li>使用节点标签进行智能调度</li><li>合理设置资源预留和限制</li><li>监控节点负载并动态调整</li></ul></li><li><p><strong>更新策略</strong>：</p><ul><li>蓝绿部署或金丝雀发布</li><li>合理的健康检查间隔和超时</li><li>自动回滚配置</li></ul></li></ol><hr><p>通过掌握Docker Swarm集群管理，您可以构建稳定、高效、可扩展的容器化应用平台。Swarm以其简单易用的特性，特别适合中小规模团队快速构建容器编排环境。</p>`,79)])])}const b=a(_,[["render",l]]);export{r as __pageData,b as default};
