import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Docker网络模型详解 - 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/docker/networking.md","filePath":"devops/container/docker/networking.md"}'),_={name:"devops/container/docker/networking.md"};function l(c,s,h,e,k,t){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="docker网络模型详解-完整学习笔记" tabindex="-1">Docker网络模型详解 - 完整学习笔记 <a class="header-anchor" href="#docker网络模型详解-完整学习笔记" aria-label="Permalink to &quot;Docker网络模型详解 - 完整学习笔记&quot;">​</a></h1><h2 id="一、docker网络基础概念" tabindex="-1">一、Docker网络基础概念 <a class="header-anchor" href="#一、docker网络基础概念" aria-label="Permalink to &quot;一、Docker网络基础概念&quot;">​</a></h2><h3 id="_1-1-docker网络架构" tabindex="-1">1.1 Docker网络架构 <a class="header-anchor" href="#_1-1-docker网络架构" aria-label="Permalink to &quot;1.1 Docker网络架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">用户空间                                   内核空间</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Docker Daemon                                           │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────────────────────────────────┐       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ Docker Engine                               │       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  ┌──────────────────────────────────────┐   │       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │ Container Network Interface (CNI)    │   │       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  └──────────────────────────────────────┘   │       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────────────────────────────────┘       │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                        │</span></span>
<span class="line"><span class="__shiki_wvjl67">                        ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Network Drivers                                         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ Bridge  │  │ Host    │  │ Overlay │  │ Macvlan │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                        │</span></span>
<span class="line"><span class="__shiki_wvjl67">                        ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Linux Network Stack                                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────────────────────────────────────┐    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ iptables / nftables / netfilter                 │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ Network Namespaces / cgroups                    │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ veth pairs / bridge / routing tables            │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────────────────────────────────────┘    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_1-2-核心组件" tabindex="-1">1.2 核心组件 <a class="header-anchor" href="#_1-2-核心组件" aria-label="Permalink to &quot;1.2 核心组件&quot;">​</a></h3><ul><li><strong>Network Namespace（网络命名空间）</strong>：提供网络栈的隔离</li><li><strong>veth pair（虚拟以太网对）</strong>：连接不同网络命名空间的虚拟网卡</li><li><strong>bridge（网桥）</strong>：二层网络设备，连接多个网络接口</li><li><strong>iptables</strong>：网络包过滤和NAT规则</li></ul><h2 id="二、docker网络驱动类型" tabindex="-1">二、Docker网络驱动类型 <a class="header-anchor" href="#二、docker网络驱动类型" aria-label="Permalink to &quot;二、Docker网络驱动类型&quot;">​</a></h2><h3 id="_2-1-bridge网络-默认网络驱动" tabindex="-1">2.1 Bridge网络（默认网络驱动） <a class="header-anchor" href="#_2-1-bridge网络-默认网络驱动" aria-label="Permalink to &quot;2.1 Bridge网络（默认网络驱动）&quot;">​</a></h3><h4 id="工作原理" tabindex="-1">工作原理： <a class="header-anchor" href="#工作原理" aria-label="Permalink to &quot;工作原理：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                 Host Machine                         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────┐   ┌─────────────┐                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ Container A │   │ Container B │                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │   eth0      │   │   eth0      │                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ 172.17.0.2  │   │ 172.17.0.3  │                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └──────┬──────┘   └──────┬──────┘                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│         │                 │                         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│         └──────┬──────┬───┘                         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                │      │                             │</span></span>
<span class="line"><span class="__shiki_wvjl67">│        ┌───────▼──────▼────────┐                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│        │     docker0 bridge     │                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│        │      IP: 172.17.0.1    │                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│        └────────────┬───────────┘                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                     │                               │</span></span>
<span class="line"><span class="__shiki_wvjl67">│              ┌──────▼──────┐                       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│              │  eth0       │                       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│              │ Host NIC    │                       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│              │ 10.0.0.5    │                       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│              └─────────────┘                       │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="配置示例" tabindex="-1">配置示例： <a class="header-anchor" href="#配置示例" aria-label="Permalink to &quot;配置示例：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看默认bridge网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_mdbnqw"> bridge</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建自定义bridge网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --driver</span><span class="__shiki_mdbnqw"> bridge</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --subnet=192.168.100.0/24</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --gateway=192.168.100.1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --opt</span><span class="__shiki_mdbnqw"> &quot;com.docker.network.bridge.name&quot;=&quot;mybridge&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  my-bridge-network</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 运行容器连接到网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> web1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> my-bridge-network</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --ip</span><span class="__shiki_dzsirb"> 192.168.100.10</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 端口映射（容器-&gt;主机）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> web2</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -p</span><span class="__shiki_mdbnqw"> 8080:80</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -p</span><span class="__shiki_mdbnqw"> 8443:443</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span></code></pre></div><h3 id="_2-2-host网络" tabindex="-1">2.2 Host网络 <a class="header-anchor" href="#_2-2-host网络" aria-label="Permalink to &quot;2.2 Host网络&quot;">​</a></h3><h4 id="特点" tabindex="-1">特点： <a class="header-anchor" href="#特点" aria-label="Permalink to &quot;特点：&quot;">​</a></h4><ul><li>容器直接使用主机网络栈</li><li>没有网络隔离</li><li>性能最好（无NAT开销）</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用host网络模式</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> web</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> host</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 容器直接使用主机的80端口</span></span>
<span class="line"><span class="__shiki_21nrsd"># 无法使用端口映射（-p参数无效）</span></span></code></pre></div><h3 id="_2-3-none网络" tabindex="-1">2.3 None网络 <a class="header-anchor" href="#_2-3-none网络" aria-label="Permalink to &quot;2.3 None网络&quot;">​</a></h3><ul><li>容器只有lo回环接口</li><li>完全网络隔离</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> none</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --rm</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  alpine</span><span class="__shiki_mdbnqw"> sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 容器内只有lo接口</span></span>
<span class="line"><span class="__shiki_21nrsd"># ifconfig 或 ip addr 只能看到lo</span></span></code></pre></div><h3 id="_2-4-container网络" tabindex="-1">2.4 Container网络 <a class="header-anchor" href="#_2-4-container网络" aria-label="Permalink to &quot;2.4 Container网络&quot;">​</a></h3><ul><li>容器共享另一个容器的网络命名空间</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建第一个容器</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> nginx</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建第二个容器，共享nginx的网络栈</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> debugger</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> container:nginx</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --rm</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  alpine</span><span class="__shiki_mdbnqw"> sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># debugger容器中可以看到nginx的网络接口</span></span></code></pre></div><h3 id="_2-5-overlay网络-多主机网络" tabindex="-1">2.5 Overlay网络（多主机网络） <a class="header-anchor" href="#_2-5-overlay网络-多主机网络" aria-label="Permalink to &quot;2.5 Overlay网络（多主机网络）&quot;">​</a></h3><h4 id="工作原理-1" tabindex="-1">工作原理： <a class="header-anchor" href="#工作原理-1" aria-label="Permalink to &quot;工作原理：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Swarm Cluster</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────┐         ┌─────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│   Node 1        │         │   Node 2        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌───────────┐  │         │  ┌───────────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │Container A│  │         │  │Container B│  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │10.0.0.2   │  │         │  │10.0.0.3   │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────┬─────┘  │         │  └─────┬─────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│        │        │         │        │        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────▼─────┐  │         │  ┌─────▼─────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │Overlay    │◄───────────┼─►│Overlay    │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │Network    │  │         │  │Network    │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────┬─────┘  │         │  └─────┬─────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│        │        │         │        │        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────▼─────┐  │         │  ┌─────▼─────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ Host NIC  │  │         │  │ Host NIC  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ eth0      │  │         │  │ eth0      │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └───────────┘  │         │  └───────────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────┘         └─────────────────┘</span></span></code></pre></div><h4 id="配置示例-1" tabindex="-1">配置示例： <a class="header-anchor" href="#配置示例-1" aria-label="Permalink to &quot;配置示例：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 初始化Swarm集群</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> swarm</span><span class="__shiki_mdbnqw"> init</span><span class="__shiki_dzsirb"> --advertise-addr</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">MANAGER_I</span><span class="__shiki_140thh">P</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建overlay网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --driver</span><span class="__shiki_mdbnqw"> overlay</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --subnet=10.0.0.0/24</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --attachable</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  my-overlay-network</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在Swarm服务中使用overlay网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> web</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> my-overlay-network</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --replicas</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span></code></pre></div><h3 id="_2-6-macvlan网络" tabindex="-1">2.6 Macvlan网络 <a class="header-anchor" href="#_2-6-macvlan网络" aria-label="Permalink to &quot;2.6 Macvlan网络&quot;">​</a></h3><ul><li>为容器分配MAC地址</li><li>容器在物理网络中像独立设备</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建macvlan网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --driver</span><span class="__shiki_mdbnqw"> macvlan</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --subnet=192.168.1.0/24</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --gateway=192.168.1.1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --ip-range=192.168.1.100/28</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -o</span><span class="__shiki_mdbnqw"> parent=eth0</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  my-macvlan-network</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 运行容器</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> macvlan-container</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> my-macvlan-network</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span></code></pre></div><h3 id="_2-7-ipvlan网络" tabindex="-1">2.7 IPvlan网络 <a class="header-anchor" href="#_2-7-ipvlan网络" aria-label="Permalink to &quot;2.7 IPvlan网络&quot;">​</a></h3><ul><li>共享主机MAC地址</li><li>为容器分配独立IP地址</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建IPvlan网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --driver</span><span class="__shiki_mdbnqw"> ipvlan</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --subnet=192.168.1.0/24</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --gateway=192.168.1.1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -o</span><span class="__shiki_mdbnqw"> ipvlan_mode=l2</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -o</span><span class="__shiki_mdbnqw"> parent=eth0</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  my-ipvlan-network</span></span></code></pre></div><h2 id="三、网络配置详解" tabindex="-1">三、网络配置详解 <a class="header-anchor" href="#三、网络配置详解" aria-label="Permalink to &quot;三、网络配置详解&quot;">​</a></h2><h3 id="_3-1-网络连接管理" tabindex="-1">3.1 网络连接管理 <a class="header-anchor" href="#_3-1-网络连接管理" aria-label="Permalink to &quot;3.1 网络连接管理&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看所有网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> ls</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看网络详情</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_mdbnqw"> bridge</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 连接容器到网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> connect</span><span class="__shiki_mdbnqw"> my-network</span><span class="__shiki_mdbnqw"> container-name</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 断开容器网络连接</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> disconnect</span><span class="__shiki_mdbnqw"> my-network</span><span class="__shiki_mdbnqw"> container-name</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 清理未使用网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> prune</span></span></code></pre></div><h3 id="_3-2-容器网络配置" tabindex="-1">3.2 容器网络配置 <a class="header-anchor" href="#_3-2-容器网络配置" aria-label="Permalink to &quot;3.2 容器网络配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 设置静态IP</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> web</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> my-bridge</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --ip</span><span class="__shiki_dzsirb"> 172.20.0.10</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置主机名</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> web</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --hostname</span><span class="__shiki_mdbnqw"> webserver01</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 添加DNS服务器</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> web</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --dns</span><span class="__shiki_dzsirb"> 8.8.8.8</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --dns</span><span class="__shiki_dzsirb"> 1.1.1.1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义hosts文件映射</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> web</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --add-host</span><span class="__shiki_mdbnqw"> db.internal:192.168.1.100</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --add-host</span><span class="__shiki_mdbnqw"> &quot;kubernetes:10.96.0.1&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span></code></pre></div><h3 id="_3-3-高级网络配置" tabindex="-1">3.3 高级网络配置 <a class="header-anchor" href="#_3-3-高级网络配置" aria-label="Permalink to &quot;3.3 高级网络配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 设置MTU</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --driver</span><span class="__shiki_mdbnqw"> bridge</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --opt</span><span class="__shiki_mdbnqw"> &quot;com.docker.network.driver.mtu&quot;=&quot;1500&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  custom-mtu-network</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置网桥属性</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --driver</span><span class="__shiki_mdbnqw"> bridge</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --opt</span><span class="__shiki_mdbnqw"> com.docker.network.bridge.name=br0</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --opt</span><span class="__shiki_mdbnqw"> com.docker.network.bridge.enable_icc=</span><span class="__shiki_dzsirb">true</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --opt</span><span class="__shiki_mdbnqw"> com.docker.network.bridge.enable_ip_masquerade=</span><span class="__shiki_dzsirb">true</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  custom-bridge</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建内部网络（不提供NAT到外部）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --driver</span><span class="__shiki_mdbnqw"> bridge</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --internal</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  internal-network</span></span></code></pre></div><h2 id="四、网络通信原理" tabindex="-1">四、网络通信原理 <a class="header-anchor" href="#四、网络通信原理" aria-label="Permalink to &quot;四、网络通信原理&quot;">​</a></h2><h3 id="_4-1-容器间通信机制" tabindex="-1">4.1 容器间通信机制 <a class="header-anchor" href="#_4-1-容器间通信机制" aria-label="Permalink to &quot;4.1 容器间通信机制&quot;">​</a></h3><h4 id="同主机容器通信" tabindex="-1">同主机容器通信： <a class="header-anchor" href="#同主机容器通信" aria-label="Permalink to &quot;同主机容器通信：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 默认bridge网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">容器A(172.17.0.2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">--</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> docker0(</span><span class="__shiki_1t8gfj">172.17.0.1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">--</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> 容器B(</span><span class="__shiki_1t8gfj">172.17.0.3</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义bridge网络（通过DNS）</span></span>
<span class="line"><span class="__shiki_1t8gfj">容器A(web1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">--DNS解析--</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> 容器B(</span><span class="__shiki_1t8gfj">web2</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 通过links通信（已弃用）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> --name</span><span class="__shiki_mdbnqw"> web1</span><span class="__shiki_mdbnqw"> nginx</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> --name</span><span class="__shiki_mdbnqw"> web2</span><span class="__shiki_dzsirb"> --link</span><span class="__shiki_mdbnqw"> web1:nginx_alias</span><span class="__shiki_mdbnqw"> alpine</span></span></code></pre></div><h4 id="跨主机容器通信" tabindex="-1">跨主机容器通信： <a class="header-anchor" href="#跨主机容器通信" aria-label="Permalink to &quot;跨主机容器通信：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># docker-compose.yml示例</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.8&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  web</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx:alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">backend</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;80:80&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  app</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">backend</span></span>
<span class="line"><span class="__shiki_17hn0y">    depends_on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">db</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  db</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgres:13</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">backend</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      POSTGRES_PASSWORD</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">secret</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  frontend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bridge</span></span>
<span class="line"><span class="__shiki_17hn0y">    ipam</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">subnet</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10.10.0.0/24</span></span>
<span class="line"><span class="__shiki_17hn0y">  backend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bridge</span></span>
<span class="line"><span class="__shiki_17hn0y">    ipam</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">subnet</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10.20.0.0/24</span></span></code></pre></div><h3 id="_4-2-网络数据流向分析" tabindex="-1">4.2 网络数据流向分析 <a class="header-anchor" href="#_4-2-网络数据流向分析" aria-label="Permalink to &quot;4.2 网络数据流向分析&quot;">​</a></h3><h4 id="容器访问外部网络" tabindex="-1">容器访问外部网络： <a class="header-anchor" href="#容器访问外部网络" aria-label="Permalink to &quot;容器访问外部网络：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">容器进程 → 容器eth0 → veth pair → docker0 → iptables MASQUERADE → 主机eth0 → 互联网</span></span></code></pre></div><h4 id="外部访问容器" tabindex="-1">外部访问容器： <a class="header-anchor" href="#外部访问容器" aria-label="Permalink to &quot;外部访问容器：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">互联网 → 主机eth0 → iptables DNAT → docker0 → veth pair → 容器eth0 → 容器进程</span></span></code></pre></div><h4 id="同网络容器通信" tabindex="-1">同网络容器通信： <a class="header-anchor" href="#同网络容器通信" aria-label="Permalink to &quot;同网络容器通信：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">容器A → vethA → docker0 → vethB → 容器B</span></span></code></pre></div><h2 id="五、网络安全配置" tabindex="-1">五、网络安全配置 <a class="header-anchor" href="#五、网络安全配置" aria-label="Permalink to &quot;五、网络安全配置&quot;">​</a></h2><h3 id="_5-1-网络隔离策略" tabindex="-1">5.1 网络隔离策略 <a class="header-anchor" href="#_5-1-网络隔离策略" aria-label="Permalink to &quot;5.1 网络隔离策略&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 创建隔离网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --internal</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  isolated-network</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 配置网络策略</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --driver</span><span class="__shiki_mdbnqw"> bridge</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --opt</span><span class="__shiki_mdbnqw"> com.docker.network.bridge.enable_icc=</span><span class="__shiki_dzsirb">false</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  no-icc-network</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用用户定义网络的容器隔离</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> secure-app</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> isolated-network</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --security-opt</span><span class="__shiki_mdbnqw"> no-new-privileges</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  myapp:latest</span></span></code></pre></div><h3 id="_5-2-iptables规则管理" tabindex="-1">5.2 iptables规则管理 <a class="header-anchor" href="#_5-2-iptables规则管理" aria-label="Permalink to &quot;5.2 iptables规则管理&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看Docker创建的iptables规则</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_mdbnqw"> nat</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_dzsirb"> -v</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_mdbnqw"> filter</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_mdbnqw"> DOCKER</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_dzsirb"> -v</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 限制容器访问外部特定端口</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> DOCKER-USER</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> docker0</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> eth0</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> tcp</span><span class="__shiki_dzsirb"> --dport</span><span class="__shiki_dzsirb"> 22</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> DROP</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 允许特定容器访问外部</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> DOCKER-USER</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_dzsirb"> 172.17.0.2</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> ACCEPT</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> DOCKER-USER</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> DROP</span></span></code></pre></div><h3 id="_5-3-网络策略配置示例" tabindex="-1">5.3 网络策略配置示例 <a class="header-anchor" href="#_5-3-网络策略配置示例" aria-label="Permalink to &quot;5.3 网络策略配置示例&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># docker-compose.yml网络策略</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.8&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  frontend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx:alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      front-tier</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        aliases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">web</span></span>
<span class="line"><span class="__shiki_17hn0y">      back-tier</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        aliases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">webapp</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;443:443&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  backend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      back-tier</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    expose</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;8080&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  front-tier</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bridge</span></span>
<span class="line"><span class="__shiki_17hn0y">    enable_ipv6</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    ipam</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">      config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">subnet</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">172.28.0.0/16</span></span>
<span class="line"><span class="__shiki_17hn0y">          ip_range</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">172.28.5.0/24</span></span>
<span class="line"><span class="__shiki_17hn0y">          gateway</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">172.28.5.254</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">subnet</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2001:3984:3989::/64</span></span>
<span class="line"><span class="__shiki_17hn0y">          gateway</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2001:3984:3989::1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  back-tier</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bridge</span></span>
<span class="line"><span class="__shiki_17hn0y">    internal</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h2 id="六、网络诊断与故障排查" tabindex="-1">六、网络诊断与故障排查 <a class="header-anchor" href="#六、网络诊断与故障排查" aria-label="Permalink to &quot;六、网络诊断与故障排查&quot;">​</a></h2><h3 id="_6-1-诊断工具和命令" tabindex="-1">6.1 诊断工具和命令 <a class="header-anchor" href="#_6-1-诊断工具和命令" aria-label="Permalink to &quot;6.1 诊断工具和命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 基础网络检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_mdbnqw"> container-name</span><span class="__shiki_mdbnqw"> ip</span><span class="__shiki_mdbnqw"> addr</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_mdbnqw"> container-name</span><span class="__shiki_mdbnqw"> ip</span><span class="__shiki_mdbnqw"> route</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_mdbnqw"> container-name</span><span class="__shiki_mdbnqw"> cat</span><span class="__shiki_mdbnqw"> /etc/resolv.conf</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_mdbnqw"> container-name</span><span class="__shiki_mdbnqw"> ping</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_mdbnqw"> google.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 网络连通性测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> container:target-container</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  appropriate/curl</span><span class="__shiki_mdbnqw"> curl</span><span class="__shiki_mdbnqw"> http://localhost:8080</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 网络数据包捕获</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --net</span><span class="__shiki_mdbnqw"> container:target-container</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nicolaka/netshoot</span><span class="__shiki_mdbnqw"> tcpdump</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> any</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> port</span><span class="__shiki_dzsirb"> 80</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 网络诊断容器</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> host</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --pid</span><span class="__shiki_mdbnqw"> host</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --privileged</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nicolaka/netshoot</span></span></code></pre></div><h3 id="_6-2-常见问题排查" tabindex="-1">6.2 常见问题排查 <a class="header-anchor" href="#_6-2-常见问题排查" aria-label="Permalink to &quot;6.2 常见问题排查&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 问题1：容器无法访问外部网络</span></span>
<span class="line"><span class="__shiki_21nrsd"># 检查步骤：</span></span>
<span class="line"><span class="__shiki_1t8gfj">1.</span><span class="__shiki_mdbnqw"> 检查主机网络连接</span></span>
<span class="line"><span class="__shiki_1t8gfj">2.</span><span class="__shiki_mdbnqw"> 检查iptables规则</span></span>
<span class="line"><span class="__shiki_1t8gfj">3.</span><span class="__shiki_mdbnqw"> 检查DNS配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">4.</span><span class="__shiki_mdbnqw"> 检查MTU设置</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题2：容器间无法通信</span></span>
<span class="line"><span class="__shiki_21nrsd"># 检查步骤：</span></span>
<span class="line"><span class="__shiki_1t8gfj">1.</span><span class="__shiki_mdbnqw"> 确认容器在同一网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">2.</span><span class="__shiki_mdbnqw"> 检查防火墙规则</span></span>
<span class="line"><span class="__shiki_1t8gfj">3.</span><span class="__shiki_mdbnqw"> 验证DNS解析</span></span>
<span class="line"><span class="__shiki_1t8gfj">4.</span><span class="__shiki_mdbnqw"> 检查网络驱动状态</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题3：端口映射失败</span></span>
<span class="line"><span class="__shiki_21nrsd"># 检查步骤：</span></span>
<span class="line"><span class="__shiki_1t8gfj">1.</span><span class="__shiki_mdbnqw"> 验证端口是否被占用</span></span>
<span class="line"><span class="__shiki_1t8gfj">2.</span><span class="__shiki_mdbnqw"> 检查iptables</span><span class="__shiki_mdbnqw"> NAT规则</span></span>
<span class="line"><span class="__shiki_1t8gfj">3.</span><span class="__shiki_mdbnqw"> 确认容器是否监听正确端口</span></span>
<span class="line"><span class="__shiki_1t8gfj">4.</span><span class="__shiki_mdbnqw"> 检查SELinux/AppArmor策略</span></span></code></pre></div><h3 id="_6-3-高级诊断技巧" tabindex="-1">6.3 高级诊断技巧 <a class="header-anchor" href="#_6-3-高级诊断技巧" aria-label="Permalink to &quot;6.3 高级诊断技巧&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看网络命名空间</span></span>
<span class="line"><span class="__shiki_1t8gfj">ls</span><span class="__shiki_dzsirb"> -la</span><span class="__shiki_mdbnqw"> /var/run/docker/netns/</span></span>
<span class="line"><span class="__shiki_1t8gfj">nsenter</span><span class="__shiki_dzsirb"> --net=/var/run/docker/netns/</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb">namespace-id</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> ip</span><span class="__shiki_mdbnqw"> addr</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看veth pair映射</span></span>
<span class="line"><span class="__shiki_21nrsd"># 容器内：</span></span>
<span class="line"><span class="__shiki_1t8gfj">ip</span><span class="__shiki_mdbnqw"> link</span><span class="__shiki_mdbnqw"> show</span><span class="__shiki_mdbnqw"> eth0</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> link/ether</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 主机上：</span></span>
<span class="line"><span class="__shiki_1t8gfj">ip</span><span class="__shiki_mdbnqw"> link</span><span class="__shiki_mdbnqw"> show</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">MAC地</span><span class="__shiki_140thh">址</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">brctl</span><span class="__shiki_mdbnqw"> show</span><span class="__shiki_mdbnqw"> docker0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 跟踪网络请求</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cap-add=NET_ADMIN</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> container:target-container</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  busybox</span><span class="__shiki_mdbnqw"> tcpdump</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> any</span><span class="__shiki_dzsirb"> -n</span></span></code></pre></div><h2 id="七、生产环境网络设计" tabindex="-1">七、生产环境网络设计 <a class="header-anchor" href="#七、生产环境网络设计" aria-label="Permalink to &quot;七、生产环境网络设计&quot;">​</a></h2><h3 id="_7-1-多环境网络架构" tabindex="-1">7.1 多环境网络架构 <a class="header-anchor" href="#_7-1-多环境网络架构" aria-label="Permalink to &quot;7.1 多环境网络架构&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 生产环境网络架构示例</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 公共网络 - 对外服务</span></span>
<span class="line"><span class="__shiki_17hn0y">  public</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bridge</span></span>
<span class="line"><span class="__shiki_17hn0y">    ipam</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">subnet</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10.10.0.0/24</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver_opts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      com.docker.network.bridge.name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">br-public</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # 应用网络 - 内部通信</span></span>
<span class="line"><span class="__shiki_17hn0y">  app-tier</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">overlay</span></span>
<span class="line"><span class="__shiki_17hn0y">    attachable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    ipam</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">subnet</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10.20.0.0/24</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # 数据网络 - 数据库服务</span></span>
<span class="line"><span class="__shiki_17hn0y">  data-tier</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">overlay</span></span>
<span class="line"><span class="__shiki_17hn0y">    internal</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  # 不暴露到外部</span></span>
<span class="line"><span class="__shiki_17hn0y">    ipam</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">subnet</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10.30.0.0/24</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 负载均衡器</span></span>
<span class="line"><span class="__shiki_17hn0y">  traefik</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">traefik:v2.10</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">public</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;80:80&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;443:443&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/var/run/docker.sock:/var/run/docker.sock</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # Web应用</span></span>
<span class="line"><span class="__shiki_17hn0y">  webapp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">public</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">app-tier</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;traefik.http.routers.webapp.rule=Host(\`app.example.com\`)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # API服务</span></span>
<span class="line"><span class="__shiki_17hn0y">  api</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">app-tier</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">data-tier</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # 数据库</span></span>
<span class="line"><span class="__shiki_17hn0y">  postgres</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgres:14</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">data-tier</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      POSTGRES_PASSWORD</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${DB_PASSWORD}</span></span></code></pre></div><h3 id="_7-2-网络性能优化" tabindex="-1">7.2 网络性能优化 <a class="header-anchor" href="#_7-2-网络性能优化" aria-label="Permalink to &quot;7.2 网络性能优化&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用host网络模式提升性能</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> host</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --restart</span><span class="__shiki_mdbnqw"> unless-stopped</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 优化TCP参数</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --sysctl</span><span class="__shiki_mdbnqw"> net.core.somaxconn=</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --sysctl</span><span class="__shiki_mdbnqw"> net.ipv4.tcp_tw_reuse=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --sysctl</span><span class="__shiki_mdbnqw"> net.ipv4.tcp_fin_timeout=</span><span class="__shiki_dzsirb">30</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 调整网络MTU</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --driver</span><span class="__shiki_mdbnqw"> overlay</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --opt</span><span class="__shiki_mdbnqw"> com.docker.network.driver.mtu=</span><span class="__shiki_dzsirb">1450</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  optimized-overlay</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 使用SR-IOV或DPDK（高性能场景）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 需要特殊硬件和驱动支持</span></span></code></pre></div><h3 id="_7-3-网络监控" tabindex="-1">7.3 网络监控 <a class="header-anchor" href="#_7-3-网络监控" aria-label="Permalink to &quot;7.3 网络监控&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 容器网络统计</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stats</span><span class="__shiki_dzsirb"> --no-stream</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 网络接口监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> host</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --pid</span><span class="__shiki_mdbnqw"> host</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  teambit/container-network-stats</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用cAdvisor监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name=cadvisor</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> host</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --volume=/:/rootfs:ro</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --volume=/var/run:/var/run:ro</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --volume=/sys:/sys:ro</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --volume=/var/lib/docker/:/var/lib/docker:ro</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  google/cadvisor:latest</span></span></code></pre></div><h2 id="八、docker网络与云原生集成" tabindex="-1">八、Docker网络与云原生集成 <a class="header-anchor" href="#八、docker网络与云原生集成" aria-label="Permalink to &quot;八、Docker网络与云原生集成&quot;">​</a></h2><h3 id="_8-1-与kubernetes网络集成" tabindex="-1">8.1 与Kubernetes网络集成 <a class="header-anchor" href="#_8-1-与kubernetes网络集成" aria-label="Permalink to &quot;8.1 与Kubernetes网络集成&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Kubernetes网络策略示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">webapp-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">webapp</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          role</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          role</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5432</span></span></code></pre></div><h3 id="_8-2-使用cni插件" tabindex="-1">8.2 使用CNI插件 <a class="header-anchor" href="#_8-2-使用cni插件" aria-label="Permalink to &quot;8.2 使用CNI插件&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安装CNI插件</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. Calico - 网络策略和覆盖网络</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. Flannel - 简单的覆盖网络</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. Cilium - eBPF-based网络和安全</span></span>
<span class="line"><span class="__shiki_21nrsd"># 4. Weave Net - 多主机网络</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 示例：使用macvlan CNI配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> 10-macvlan.conf</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;cniVersion&quot;: &quot;0.3.1&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;name&quot;: &quot;macvlan-network&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;type&quot;: &quot;macvlan&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;master&quot;: &quot;eth0&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;mode&quot;: &quot;bridge&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;ipam&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;type&quot;: &quot;host-local&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;subnet&quot;: &quot;192.168.1.0/24&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;rangeStart&quot;: &quot;192.168.1.100&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;rangeEnd&quot;: &quot;192.168.1.200&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;gateway&quot;: &quot;192.168.1.1&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span></code></pre></div><h2 id="九、总结与最佳实践" tabindex="-1">九、总结与最佳实践 <a class="header-anchor" href="#九、总结与最佳实践" aria-label="Permalink to &quot;九、总结与最佳实践&quot;">​</a></h2><h3 id="_9-1-网络选择指南" tabindex="-1">9.1 网络选择指南 <a class="header-anchor" href="#_9-1-网络选择指南" aria-label="Permalink to &quot;9.1 网络选择指南&quot;">​</a></h3><table tabindex="0"><thead><tr><th>场景</th><th>推荐网络类型</th><th>说明</th></tr></thead><tbody><tr><td>开发测试</td><td>bridge</td><td>简单易用，支持端口映射</td></tr><tr><td>生产Web服务</td><td>bridge + 反向代理</td><td>灵活配置，易于管理</td></tr><tr><td>高性能应用</td><td>host</td><td>无NAT开销，性能最佳</td></tr><tr><td>数据库集群</td><td>overlay</td><td>多主机通信，自动发现</td></tr><tr><td>物理网络集成</td><td>macvlan/ipvlan</td><td>直接接入物理网络</td></tr><tr><td>安全隔离环境</td><td>多bridge + 内部网络</td><td>分层安全架构</td></tr></tbody></table><h3 id="_9-2-最佳实践要点" tabindex="-1">9.2 最佳实践要点 <a class="header-anchor" href="#_9-2-最佳实践要点" aria-label="Permalink to &quot;9.2 最佳实践要点&quot;">​</a></h3><ol><li><p><strong>网络规划</strong>：</p><ul><li>提前规划IP地址分配</li><li>设计网络分层架构</li><li>考虑未来扩展需求</li></ul></li><li><p><strong>安全策略</strong>：</p><ul><li>使用网络策略限制通信</li><li>实施最小权限原则</li><li>定期审计网络配置</li></ul></li><li><p><strong>性能优化</strong>：</p><ul><li>选择合适的网络驱动</li><li>优化MTU设置</li><li>监控网络流量和性能</li></ul></li><li><p><strong>运维管理</strong>：</p><ul><li>统一网络命名规范</li><li>文档化网络架构</li><li>自动化网络配置</li></ul></li></ol><h3 id="_9-3-故障排查流程" tabindex="-1">9.3 故障排查流程 <a class="header-anchor" href="#_9-3-故障排查流程" aria-label="Permalink to &quot;9.3 故障排查流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">容器网络问题排查流程：</span></span>
<span class="line"><span class="__shiki_wvjl67">1. 检查容器状态：docker ps</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 验证网络配置：docker network inspect</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 测试容器内连通性：docker exec ping</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 检查主机网络：iptables, route, DNS</span></span>
<span class="line"><span class="__shiki_wvjl67">5. 验证网络驱动：lsmod, dmesg</span></span>
<span class="line"><span class="__shiki_wvjl67">6. 捕获网络流量：tcpdump</span></span>
<span class="line"><span class="__shiki_wvjl67">7. 检查日志：docker logs, journalctl</span></span></code></pre></div><p>通过深入理解Docker网络模型，您可以构建出稳定、安全、高效的容器网络架构，满足不同场景下的业务需求。</p>`,87)])])}const b=a(_,[["render",l]]);export{r as __pageData,b as default};
