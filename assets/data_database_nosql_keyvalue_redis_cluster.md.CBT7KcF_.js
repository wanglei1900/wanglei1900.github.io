import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"NoSQL数据库 - 键值存储Redis：集群与分片深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/keyvalue/redis/cluster.md","filePath":"data/database/nosql/keyvalue/redis/cluster.md"}'),p={name:"data/database/nosql/keyvalue/redis/cluster.md"};function l(h,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="nosql数据库-键值存储redis-集群与分片深度解析" tabindex="-1">NoSQL数据库 - 键值存储Redis：集群与分片深度解析 <a class="header-anchor" href="#nosql数据库-键值存储redis-集群与分片深度解析" aria-label="Permalink to &quot;NoSQL数据库 - 键值存储Redis：集群与分片深度解析&quot;">​</a></h1><h2 id="一、redis分布式架构概述" tabindex="-1">一、Redis分布式架构概述 <a class="header-anchor" href="#一、redis分布式架构概述" aria-label="Permalink to &quot;一、Redis分布式架构概述&quot;">​</a></h2><h3 id="_1-1-为什么需要集群与分片" tabindex="-1">1.1 为什么需要集群与分片？ <a class="header-anchor" href="#_1-1-为什么需要集群与分片" aria-label="Permalink to &quot;1.1 为什么需要集群与分片？&quot;">​</a></h3><p>随着数据量和访问量的增长，单节点Redis面临以下瓶颈：</p><ul><li><strong>内存限制</strong>：单节点内存有限（通常64GB-256GB）</li><li><strong>CPU瓶颈</strong>：单线程处理能力有限</li><li><strong>网络带宽</strong>：单节点网络吞吐受限</li><li><strong>可用性问题</strong>：单点故障影响整个服务</li></ul><h3 id="_1-2-redis分布式解决方案演进" tabindex="-1">1.2 Redis分布式解决方案演进 <a class="header-anchor" href="#_1-2-redis分布式解决方案演进" aria-label="Permalink to &quot;1.2 Redis分布式解决方案演进&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                   演进历程                                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 客户端分片 → 代理分片 → Redis Cluster → 云托管方案           │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">    │            │           │              │</span></span>
<span class="line"><span class="__shiki_wvjl67">    │            │           │              │</span></span>
<span class="line"><span class="__shiki_wvjl67">    ▼            ▼           ▼              ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">┌──────────┐┌──────────┐┌──────────┐┌─────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│简单但维护││集中管理但││官方方案，││弹性扩展，    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│复杂，需  ││有单点风险││功能完整  ││高可用保障    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│客户端实现││          ││          ││              │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────┘└──────────┘└──────────┘└─────────────┘</span></span></code></pre></div><h2 id="二、客户端分片-client-side-sharding" tabindex="-1">二、客户端分片（Client-side Sharding） <a class="header-anchor" href="#二、客户端分片-client-side-sharding" aria-label="Permalink to &quot;二、客户端分片（Client-side Sharding）&quot;">​</a></h2><h3 id="_2-1-基本原理" tabindex="-1">2.1 基本原理 <a class="header-anchor" href="#_2-1-基本原理" aria-label="Permalink to &quot;2.1 基本原理&quot;">​</a></h3><p>客户端负责将数据分布到多个Redis节点，并维护分片逻辑。</p><h3 id="_2-2-分片算法" tabindex="-1">2.2 分片算法 <a class="header-anchor" href="#_2-2-分片算法" aria-label="Permalink to &quot;2.2 分片算法&quot;">​</a></h3><h4 id="_2-2-1-一致性哈希算法" tabindex="-1">2.2.1 一致性哈希算法 <a class="header-anchor" href="#_2-2-1-一致性哈希算法" aria-label="Permalink to &quot;2.2.1 一致性哈希算法&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> hashlib</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> bisect</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConsistentHash</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, nodes, replicas</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.replicas </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> replicas</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.ring </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.sorted_keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> node </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> nodes:</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(replicas):</span></span>
<span class="line"><span class="__shiki_140thh">                key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.hash(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">node</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.ring[key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> node</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.sorted_keys.append(key)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.sorted_keys.sort()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> hash</span><span class="__shiki_140thh">(self, key):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;使用MD5哈希&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> int</span><span class="__shiki_140thh">(hashlib.md5(key.encode()).hexdigest(), </span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_node</span><span class="__shiki_140thh">(self, key):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取键对应的节点&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.ring:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        hash_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.hash(key)</span></span>
<span class="line"><span class="__shiki_140thh">        idx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> bisect.bisect_right(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.sorted_keys, hash_key)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> idx </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.sorted_keys):</span></span>
<span class="line"><span class="__shiki_140thh">            idx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.ring[</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.sorted_keys[idx]]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_140thh">nodes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;redis-node1:6379&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;redis-node2:6379&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;redis-node3:6379&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">hash_ring </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ConsistentHash(nodes)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;user:1001&quot;</span></span>
<span class="line"><span class="__shiki_140thh">node </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> hash_ring.get_node(key)  </span><span class="__shiki_21nrsd"># 返回负责该key的节点</span></span></code></pre></div><h4 id="_2-2-2-哈希槽算法" tabindex="-1">2.2.2 哈希槽算法 <a class="header-anchor" href="#_2-2-2-哈希槽算法" aria-label="Permalink to &quot;2.2.2 哈希槽算法&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> HashSlotSharding</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, nodes):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.nodes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> nodes</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.slot_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 16384</span><span class="__shiki_21nrsd">  # Redis Cluster的标准槽数</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.slots_per_node </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.slot_count </span><span class="__shiki_1itgoe">//</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(nodes)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.node_slots </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 分配槽范围</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i, node </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> enumerate</span><span class="__shiki_140thh">(nodes):</span></span>
<span class="line"><span class="__shiki_140thh">            start_slot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.slots_per_node</span></span>
<span class="line"><span class="__shiki_140thh">            end_slot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> start_slot </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.slots_per_node </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(nodes) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                end_slot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.slot_count </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_21nrsd">  # 最后一个节点处理剩余槽</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.node_slots[node] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (start_slot, end_slot)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_slot</span><span class="__shiki_140thh">(self, key):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;计算键的哈希槽&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # Redis使用的CRC16算法</span></span>
<span class="line"><span class="__shiki_140thh">        crc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> crc16(key.encode()) </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1itgoe"> 0x</span><span class="__shiki_dzsirb">3FFF</span><span class="__shiki_21nrsd">  # 取低14位</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> crc</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_node</span><span class="__shiki_140thh">(self, key):</span></span>
<span class="line"><span class="__shiki_140thh">        slot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_slot(key)</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> node, (start, end) </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.node_slots.items():</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> start </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> slot </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> end:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> node</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> None</span></span></code></pre></div><h3 id="_2-3-优点与缺点" tabindex="-1">2.3 优点与缺点 <a class="header-anchor" href="#_2-3-优点与缺点" aria-label="Permalink to &quot;2.3 优点与缺点&quot;">​</a></h3><h4 id="优点" tabindex="-1">优点： <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点：&quot;">​</a></h4><ol><li><strong>简单直接</strong>：不需要中间件</li><li><strong>高性能</strong>：没有代理层开销</li><li><strong>灵活性</strong>：可根据业务定制分片逻辑</li></ol><h4 id="缺点" tabindex="-1">缺点： <a class="header-anchor" href="#缺点" aria-label="Permalink to &quot;缺点：&quot;">​</a></h4><ol><li><strong>客户端复杂</strong>：每个客户端都需要实现分片逻辑</li><li><strong>动态扩展困难</strong>：节点增减需要重新分片</li><li><strong>数据迁移复杂</strong>：需要客户端或额外工具支持</li><li><strong>连接管理复杂</strong>：需要维护多个连接池</li></ol><h2 id="三、代理分片-proxy-based-sharding" tabindex="-1">三、代理分片（Proxy-based Sharding） <a class="header-anchor" href="#三、代理分片-proxy-based-sharding" aria-label="Permalink to &quot;三、代理分片（Proxy-based Sharding）&quot;">​</a></h2><h3 id="_3-1-架构模式" tabindex="-1">3.1 架构模式 <a class="header-anchor" href="#_3-1-架构模式" aria-label="Permalink to &quot;3.1 架构模式&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│          客户端                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">               │</span></span>
<span class="line"><span class="__shiki_wvjl67">               ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│          代理层                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  (Twemproxy, Codis, RedisCell)  │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">       │         │         │</span></span>
<span class="line"><span class="__shiki_wvjl67">       ▼         ▼         ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────┐ ┌─────────┐ ┌─────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│Redis节点1│ │Redis节点2│ │Redis节点3│</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────┘ └─────────┘ └─────────┘</span></span></code></pre></div><h3 id="_3-2-twemproxy-nutcracker" tabindex="-1">3.2 Twemproxy（nutcracker） <a class="header-anchor" href="#_3-2-twemproxy-nutcracker" aria-label="Permalink to &quot;3.2 Twemproxy（nutcracker）&quot;">​</a></h3><h4 id="_3-2-1-架构特点" tabindex="-1">3.2.1 架构特点 <a class="header-anchor" href="#_3-2-1-架构特点" aria-label="Permalink to &quot;3.2.1 架构特点&quot;">​</a></h4><ul><li>轻量级代理，支持Redis和Memcached</li><li>使用一致性哈希分片</li><li>支持故障节点自动摘除</li></ul><h4 id="_3-2-2-配置示例" tabindex="-1">3.2.2 配置示例 <a class="header-anchor" href="#_3-2-2-配置示例" aria-label="Permalink to &quot;3.2.2 配置示例&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># nutcracker.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">alpha</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  listen</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">127.0.0.1:22121</span></span>
<span class="line"><span class="__shiki_17hn0y">  hash</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">fnv1a_64</span><span class="__shiki_21nrsd">          # 哈希算法</span></span>
<span class="line"><span class="__shiki_17hn0y">  distribution</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ketama</span><span class="__shiki_21nrsd">     # 一致性哈希</span></span>
<span class="line"><span class="__shiki_17hn0y">  auto_eject_hosts</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">   # 自动摘除故障节点</span></span>
<span class="line"><span class="__shiki_17hn0y">  redis</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">              # Redis协议</span></span>
<span class="line"><span class="__shiki_17hn0y">  server_retry_timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2000</span></span>
<span class="line"><span class="__shiki_17hn0y">  server_failure_limit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">  servers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">127.0.0.1:6379:1 server1</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">127.0.0.1:6380:1 server2</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">127.0.0.1:6381:1 server3</span></span></code></pre></div><h4 id="_3-2-3-优缺点" tabindex="-1">3.2.3 优缺点 <a class="header-anchor" href="#_3-2-3-优缺点" aria-label="Permalink to &quot;3.2.3 优缺点&quot;">​</a></h4><p><strong>优点</strong>：</p><ul><li>客户端无需关心分片逻辑</li><li>支持连接池和负载均衡</li><li>配置简单</li></ul><p><strong>缺点</strong>：</p><ul><li>单点故障（需部署多个代理）</li><li>额外的网络开销</li><li>不支持事务、管道等跨节点操作</li></ul><h3 id="_3-3-codis架构" tabindex="-1">3.3 Codis架构 <a class="header-anchor" href="#_3-3-codis架构" aria-label="Permalink to &quot;3.3 Codis架构&quot;">​</a></h3><h4 id="_3-3-1-codis组件" tabindex="-1">3.3.1 Codis组件 <a class="header-anchor" href="#_3-3-1-codis组件" aria-label="Permalink to &quot;3.3.1 Codis组件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                    Codis架构                             │</span></span>
<span class="line"><span class="__shiki_wvjl67">├───────────┬────────────┬────────────┬───────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 客户端     │ Dashboard  │ Proxy层    │ Redis实例         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│           │ (管理界面)  │ (无状态代理)│ (Codis-server)    │</span></span>
<span class="line"><span class="__shiki_wvjl67">├───────────┼────────────┼────────────┼───────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│           │            │            │                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 连接任意   │ 配置管理、  │ 路由转发、  │ 数据存储，支持     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Proxy     │ 监控        │ 协议转换    │ 动态迁移          │</span></span>
<span class="line"><span class="__shiki_wvjl67">└───────────┴────────────┴────────────┴───────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                      │</span></span>
<span class="line"><span class="__shiki_wvjl67">                      ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">            ┌───────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">            │  ZooKeeper/Etcd   │</span></span>
<span class="line"><span class="__shiki_wvjl67">            │  (配置存储)        │</span></span>
<span class="line"><span class="__shiki_wvjl67">            └───────────────────┘</span></span></code></pre></div><h4 id="_3-3-2-数据分片" tabindex="-1">3.3.2 数据分片 <a class="header-anchor" href="#_3-3-2-数据分片" aria-label="Permalink to &quot;3.3.2 数据分片&quot;">​</a></h4><ul><li>1024个slot（可配置）</li><li>使用CRC32计算slot：<code>slot = crc32(key) % 1024</code></li><li>Proxy维护slot到Redis实例的映射</li></ul><h4 id="_3-3-3-数据迁移" tabindex="-1">3.3.3 数据迁移 <a class="header-anchor" href="#_3-3-3-数据迁移" aria-label="Permalink to &quot;3.3.3 数据迁移&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Codis迁移伪代码</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> migrateSlot</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">source</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">target</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">RedisNode</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">slot</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 设置slot为迁移中状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setSlotState</span><span class="__shiki_140thh">(slot, </span><span class="__shiki_mdbnqw">&quot;migrating&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 分批迁移key</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        keys </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> source.</span><span class="__shiki_1t8gfj">clusterGetKeysInSlot</span><span class="__shiki_140thh">(slot, BATCH_SIZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(keys) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 逐个迁移key</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> keys {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 原子操作：获取并删除</span></span>
<span class="line"><span class="__shiki_140thh">            value </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> source.</span><span class="__shiki_1t8gfj">dump</span><span class="__shiki_140thh">(key)</span></span>
<span class="line"><span class="__shiki_140thh">            target.</span><span class="__shiki_1t8gfj">restore</span><span class="__shiki_140thh">(key, value)</span></span>
<span class="line"><span class="__shiki_140thh">            source.</span><span class="__shiki_1t8gfj">del</span><span class="__shiki_140thh">(key)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 更新slot映射</span></span>
<span class="line"><span class="__shiki_1t8gfj">    updateSlotMapping</span><span class="__shiki_140thh">(slot, target)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 清理状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setSlotState</span><span class="__shiki_140thh">(slot, </span><span class="__shiki_mdbnqw">&quot;normal&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、redis-cluster官方集群方案" tabindex="-1">四、Redis Cluster官方集群方案 <a class="header-anchor" href="#四、redis-cluster官方集群方案" aria-label="Permalink to &quot;四、Redis Cluster官方集群方案&quot;">​</a></h2><h3 id="_4-1-redis-cluster架构概览" tabindex="-1">4.1 Redis Cluster架构概览 <a class="header-anchor" href="#_4-1-redis-cluster架构概览" aria-label="Permalink to &quot;4.1 Redis Cluster架构概览&quot;">​</a></h3><h4 id="_4-1-1-集群节点角色" tabindex="-1">4.1.1 集群节点角色 <a class="header-anchor" href="#_4-1-1-集群节点角色" aria-label="Permalink to &quot;4.1.1 集群节点角色&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                  Redis Cluster                       │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────┬──────────────┬──────────────┬────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 主节点1       │ 主节点2      │ 主节点3      │ ...    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ (槽0-5460)   │ (槽5461-10922)│ (槽10923-16383)│       │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────┼──────────────┼──────────────┼────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 从节点1-1    │ 从节点2-1    │ 从节点3-1    │ ...    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ (复制主1)    │ (复制主2)    │ (复制主3)    │        │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────┴──────────────┴──────────────┴────────┘</span></span></code></pre></div><h4 id="_4-1-2-集群特性" tabindex="-1">4.1.2 集群特性 <a class="header-anchor" href="#_4-1-2-集群特性" aria-label="Permalink to &quot;4.1.2 集群特性&quot;">​</a></h4><ul><li><strong>自动分片</strong>：16384个哈希槽</li><li><strong>高可用</strong>：主从复制与故障自动转移</li><li><strong>去中心化</strong>：每个节点维护集群状态</li><li><strong>客户端重定向</strong>：支持MOVED/ASK重定向</li></ul><h3 id="_4-2-数据分片与哈希槽" tabindex="-1">4.2 数据分片与哈希槽 <a class="header-anchor" href="#_4-2-数据分片与哈希槽" aria-label="Permalink to &quot;4.2 数据分片与哈希槽&quot;">​</a></h3><h4 id="_4-2-1-哈希槽计算" tabindex="-1">4.2.1 哈希槽计算 <a class="header-anchor" href="#_4-2-1-哈希槽计算" aria-label="Permalink to &quot;4.2.1 哈希槽计算&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Redis源码中的槽计算</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> CLUSTER_SLOTS</span><span class="__shiki_dzsirb"> 16384</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// CRC16实现</span></span>
<span class="line"><span class="__shiki_1itgoe">unsigned</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> crc16</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">buf</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> len</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> counter;</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> crc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (counter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; counter </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> len; counter</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        crc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (crc </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">^</span><span class="__shiki_1jdh33"> crc16tab</span><span class="__shiki_140thh">[((crc </span><span class="__shiki_1itgoe">&gt;&gt;</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">^</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">buf</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1itgoe"> 0x</span><span class="__shiki_dzsirb">00FF</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> crc;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 计算key的slot</span></span>
<span class="line"><span class="__shiki_1itgoe">unsigned</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> keyHashSlot</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> keylen</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> s, e;</span><span class="__shiki_21nrsd"> // start-end indexes of { and }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查找哈希标签 {...}</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (s </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; s </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> keylen; s</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">[s] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;{&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (s </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> keylen) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_1t8gfj"> crc16</span><span class="__shiki_140thh">(key,keylen) </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh"> (CLUSTER_SLOTS</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (e </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> s</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">; e </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> keylen; e</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">[e] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;}&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (e </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> keylen </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> e </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> s</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_1t8gfj"> crc16</span><span class="__shiki_140thh">(key,keylen) </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh"> (CLUSTER_SLOTS</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用{}内的内容计算hash</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> crc16</span><span class="__shiki_140thh">(key</span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh">s</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,e</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">s</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh"> (CLUSTER_SLOTS</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-2-2-哈希标签-hash-tags" tabindex="-1">4.2.2 哈希标签（Hash Tags） <a class="header-anchor" href="#_4-2-2-哈希标签-hash-tags" aria-label="Permalink to &quot;4.2.2 哈希标签（Hash Tags）&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 普通键 - 使用整个键计算slot</span></span>
<span class="line"><span class="__shiki_1t8gfj">SET</span><span class="__shiki_mdbnqw"> user:1000:profile</span><span class="__shiki_mdbnqw"> &quot;...&quot;</span><span class="__shiki_21nrsd">  # slot基于&quot;user:1000:profile&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">SET</span><span class="__shiki_mdbnqw"> user:1000:session</span><span class="__shiki_mdbnqw"> &quot;...&quot;</span><span class="__shiki_21nrsd">  # slot基于&quot;user:1000:session&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd"># 两个key可能在不同节点</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用哈希标签 - 确保相关key在同一slot</span></span>
<span class="line"><span class="__shiki_1t8gfj">SET</span><span class="__shiki_mdbnqw"> {user:1000}:profile</span><span class="__shiki_mdbnqw"> &quot;...&quot;</span><span class="__shiki_21nrsd">  # slot基于&quot;user:1000&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">SET</span><span class="__shiki_mdbnqw"> {user:1000}:session</span><span class="__shiki_mdbnqw"> &quot;...&quot;</span><span class="__shiki_21nrsd">  # slot基于&quot;user:1000&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd"># 两个key肯定在同一节点</span></span></code></pre></div><h3 id="_4-3-集群节点通信-gossip协议" tabindex="-1">4.3 集群节点通信（Gossip协议） <a class="header-anchor" href="#_4-3-集群节点通信-gossip协议" aria-label="Permalink to &quot;4.3 集群节点通信（Gossip协议）&quot;">​</a></h3><h4 id="_4-3-1-节点数据结构" tabindex="-1">4.3.1 节点数据结构 <a class="header-anchor" href="#_4-3-1-节点数据结构" aria-label="Permalink to &quot;4.3.1 节点数据结构&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// src/cluster.h</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> clusterNode {</span></span>
<span class="line"><span class="__shiki_dzsirb">    mstime_t</span><span class="__shiki_140thh"> ctime;</span><span class="__shiki_21nrsd">             // 节点创建时间</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33"> name</span><span class="__shiki_140thh">[CLUSTER_NAMELEN];</span><span class="__shiki_21nrsd"> // 节点ID（40字符）</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> flags;</span><span class="__shiki_21nrsd">                  // 节点标志位</span></span>
<span class="line"><span class="__shiki_1itgoe">    uint64_t</span><span class="__shiki_140thh"> configEpoch;</span><span class="__shiki_21nrsd">       // 配置纪元</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1jdh33"> slots</span><span class="__shiki_140thh">[CLUSTER_SLOTS</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">];</span><span class="__shiki_21nrsd"> // 槽位图</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> numslots;</span><span class="__shiki_21nrsd">               // 负责的槽数</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> numslaves;</span><span class="__shiki_21nrsd">              // 从节点数</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> clusterNode </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">slaves;</span><span class="__shiki_21nrsd"> // 从节点数组</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> clusterNode </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">slaveof;</span><span class="__shiki_21nrsd"> // 主节点</span></span>
<span class="line"><span class="__shiki_dzsirb">    mstime_t</span><span class="__shiki_140thh"> ping_sent;</span><span class="__shiki_21nrsd">         // 上次发送ping的时间</span></span>
<span class="line"><span class="__shiki_dzsirb">    mstime_t</span><span class="__shiki_140thh"> pong_received;</span><span class="__shiki_21nrsd">     // 上次收到pong的时间</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ... 其他字段</span></span>
<span class="line"><span class="__shiki_140thh">} clusterNode;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> clusterState {</span></span>
<span class="line"><span class="__shiki_140thh">    clusterNode </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">myself;</span><span class="__shiki_21nrsd">        // 当前节点</span></span>
<span class="line"><span class="__shiki_1itgoe">    uint64_t</span><span class="__shiki_140thh"> currentEpoch;</span><span class="__shiki_21nrsd">      // 当前配置纪元</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> state;</span><span class="__shiki_21nrsd">                  // 集群状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> size;</span><span class="__shiki_21nrsd">                   // 至少负责一个槽的主节点数</span></span>
<span class="line"><span class="__shiki_140thh">    dict </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">nodes;</span><span class="__shiki_21nrsd">                // 所有节点字典</span></span>
<span class="line"><span class="__shiki_140thh">    clusterNode </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">migrating_slots_to</span><span class="__shiki_140thh">[CLUSTER_SLOTS];</span><span class="__shiki_21nrsd">   // 槽迁出目标</span></span>
<span class="line"><span class="__shiki_140thh">    clusterNode </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">importing_slots_from</span><span class="__shiki_140thh">[CLUSTER_SLOTS];</span><span class="__shiki_21nrsd"> // 槽迁入源</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ... 其他字段</span></span>
<span class="line"><span class="__shiki_140thh">} clusterState;</span></span></code></pre></div><h4 id="_4-3-2-gossip消息格式" tabindex="-1">4.3.2 Gossip消息格式 <a class="header-anchor" href="#_4-3-2-gossip消息格式" aria-label="Permalink to &quot;4.3.2 Gossip消息格式&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                Cluster消息头部                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 总长度(4) │ 签名(4) │ 消息类型(2) │ 消息体        │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">消息类型包括：</span></span>
<span class="line"><span class="__shiki_wvjl67">- CLUSTERMSG_TYPE_PING（定期发送，用于节点发现）</span></span>
<span class="line"><span class="__shiki_wvjl67">- CLUSTERMSG_TYPE_PONG（响应PING）</span></span>
<span class="line"><span class="__shiki_wvjl67">- CLUSTERMSG_TYPE_MEET（邀请新节点加入）</span></span>
<span class="line"><span class="__shiki_wvjl67">- CLUSTERMSG_TYPE_FAIL（节点故障通知）</span></span>
<span class="line"><span class="__shiki_wvjl67">- CLUSTERMSG_TYPE_UPDATE（槽配置更新）</span></span></code></pre></div><h4 id="_4-3-3-节点发现与维护" tabindex="-1">4.3.3 节点发现与维护 <a class="header-anchor" href="#_4-3-3-节点发现与维护" aria-label="Permalink to &quot;4.3.3 节点发现与维护&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 节点间通信逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> clusterCron</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">void</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 每隔100ms执行一次</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 发送PING给随机节点</span></span>
<span class="line"><span class="__shiki_140thh">    clusterNode </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">node </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> getRandomNode</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (node </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">nodeInTimeout</span><span class="__shiki_140thh">(node)) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        clusterSendPing</span><span class="__shiki_140thh">(node-&gt;link, CLUSTERMSG_TYPE_PING);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 检查超时节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">    checkNodeTimeout</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 清理失败节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">    cleanupFailedNodes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 更新集群状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">    updateClusterState</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-4-集群搭建与配置" tabindex="-1">4.4 集群搭建与配置 <a class="header-anchor" href="#_4-4-集群搭建与配置" aria-label="Permalink to &quot;4.4 集群搭建与配置&quot;">​</a></h3><h4 id="_4-4-1-节点配置" tabindex="-1">4.4.1 节点配置 <a class="header-anchor" href="#_4-4-1-节点配置" aria-label="Permalink to &quot;4.4.1 节点配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># redis-cluster-node-7000.conf</span></span>
<span class="line"><span class="__shiki_mdbnqw">port 7000</span></span>
<span class="line"><span class="__shiki_mdbnqw">cluster-enabled yes</span></span>
<span class="line"><span class="__shiki_mdbnqw">cluster-config-file nodes-7000.conf</span></span>
<span class="line"><span class="__shiki_mdbnqw">cluster-node-timeout 15000</span></span>
<span class="line"><span class="__shiki_mdbnqw">cluster-require-full-coverage no</span></span>
<span class="line"><span class="__shiki_mdbnqw">cluster-migration-barrier 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">cluster-slave-validity-factor 10</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 持久化配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">appendonly yes</span></span>
<span class="line"><span class="__shiki_mdbnqw">appendfsync everysec</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 内存配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">maxmemory 2gb</span></span>
<span class="line"><span class="__shiki_mdbnqw">maxmemory-policy allkeys-lru</span></span></code></pre></div><h4 id="_4-4-2-集群创建" tabindex="-1">4.4.2 集群创建 <a class="header-anchor" href="#_4-4-2-集群创建" aria-label="Permalink to &quot;4.4.2 集群创建&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方式1：使用redis-cli创建</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> --cluster</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  127.0.0.1:7000</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  127.0.0.1:7001</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  127.0.0.1:7002</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  127.0.0.1:7003</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  127.0.0.1:7004</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  127.0.0.1:7005</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cluster-replicas</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方式2：手动创建</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 启动所有节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-server</span><span class="__shiki_mdbnqw"> redis-7000.conf</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-server</span><span class="__shiki_mdbnqw"> redis-7001.conf</span></span>
<span class="line"><span class="__shiki_21nrsd"># ...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 节点握手</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7000</span><span class="__shiki_mdbnqw"> cluster</span><span class="__shiki_mdbnqw"> meet</span><span class="__shiki_dzsirb"> 127.0.0.1</span><span class="__shiki_dzsirb"> 7001</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7000</span><span class="__shiki_mdbnqw"> cluster</span><span class="__shiki_mdbnqw"> meet</span><span class="__shiki_dzsirb"> 127.0.0.1</span><span class="__shiki_dzsirb"> 7002</span></span>
<span class="line"><span class="__shiki_21nrsd"># ...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 分配槽</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7000</span><span class="__shiki_mdbnqw"> cluster</span><span class="__shiki_mdbnqw"> addslots</span><span class="__shiki_mdbnqw"> {0..5460}</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7001</span><span class="__shiki_mdbnqw"> cluster</span><span class="__shiki_mdbnqw"> addslots</span><span class="__shiki_mdbnqw"> {5461..10922}</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7002</span><span class="__shiki_mdbnqw"> cluster</span><span class="__shiki_mdbnqw"> addslots</span><span class="__shiki_mdbnqw"> {10923..16383}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 设置主从关系</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7003</span><span class="__shiki_mdbnqw"> cluster</span><span class="__shiki_mdbnqw"> replicate</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node-id-700</span><span class="__shiki_1itgoe">0&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7004</span><span class="__shiki_mdbnqw"> cluster</span><span class="__shiki_mdbnqw"> replicate</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node-id-700</span><span class="__shiki_1itgoe">1&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7005</span><span class="__shiki_mdbnqw"> cluster</span><span class="__shiki_mdbnqw"> replicate</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node-id-700</span><span class="__shiki_1itgoe">2&gt;</span></span></code></pre></div><h3 id="_4-5-集群重分片-resharding" tabindex="-1">4.5 集群重分片（Resharding） <a class="header-anchor" href="#_4-5-集群重分片-resharding" aria-label="Permalink to &quot;4.5 集群重分片（Resharding）&quot;">​</a></h3><h4 id="_4-5-1-重分片流程" tabindex="-1">4.5.1 重分片流程 <a class="header-anchor" href="#_4-5-1-重分片流程" aria-label="Permalink to &quot;4.5.1 重分片流程&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">1. 计算迁移计划</span></span>
<span class="line"><span class="__shiki_wvjl67">   │</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 设置迁移状态</span></span>
<span class="line"><span class="__shiki_wvjl67">   │</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 逐个槽迁移</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  ┌─────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">   ├─▶│ 迁移单个槽   │</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  │ 1. 设置slot为迁移中│</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  │ 2. 获取slot中所有key│</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  │ 3. 逐个迁移key    │</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  │ 4. 更新slot归属   │</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  └─────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">   │</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 更新集群配置</span></span>
<span class="line"><span class="__shiki_wvjl67">   │</span></span>
<span class="line"><span class="__shiki_wvjl67">5. 清理迁移状态</span></span></code></pre></div><h4 id="_4-5-2-迁移单个键" tabindex="-1">4.5.2 迁移单个键 <a class="header-anchor" href="#_4-5-2-迁移单个键" aria-label="Permalink to &quot;4.5.2 迁移单个键&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 键迁移的核心操作</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> migrateKey</span><span class="__shiki_140thh">(redisClient </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">c</span><span class="__shiki_140thh">, robj </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, clusterNode </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">target</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 序列化键值</span></span>
<span class="line"><span class="__shiki_140thh">    rio payload;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    createDumpPayload</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">payload, key);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 发送RESTORE命令到目标节点</span></span>
<span class="line"><span class="__shiki_140thh">    redisAsyncContext </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">ac </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> connectToNode</span><span class="__shiki_140thh">(target);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    redisAsyncCommand</span><span class="__shiki_140thh">(ac, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;RESTORE </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw"> 0 </span><span class="__shiki_2bbn9v">%</span><span class="__shiki_mdbnqw">b REPLACE&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_1itgoe">char*</span><span class="__shiki_140thh">)key-&gt;ptr,</span></span>
<span class="line"><span class="__shiki_140thh">        payload.io.buffer.ptr,</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sdslen</span><span class="__shiki_140thh">(payload.io.buffer.ptr));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 从源节点删除</span></span>
<span class="line"><span class="__shiki_1t8gfj">    dbDelete</span><span class="__shiki_140thh">(c-&gt;db, key);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 响应ASKING重定向</span></span>
<span class="line"><span class="__shiki_1t8gfj">    addReply</span><span class="__shiki_140thh">(c, shared.ask);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-5-3-使用redis-cli重分片" tabindex="-1">4.5.3 使用redis-cli重分片 <a class="header-anchor" href="#_4-5-3-使用redis-cli重分片" aria-label="Permalink to &quot;4.5.3 使用redis-cli重分片&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 交互式重分片</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> --cluster</span><span class="__shiki_mdbnqw"> reshard</span><span class="__shiki_mdbnqw"> 127.0.0.1:7000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自动化重分片</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> --cluster</span><span class="__shiki_mdbnqw"> reshard</span><span class="__shiki_mdbnqw"> 127.0.0.1:7000</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cluster-from</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">source-node-i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cluster-to</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">target-node-i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cluster-slots</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cluster-yes</span></span></code></pre></div><h3 id="_4-6-故障检测与转移" tabindex="-1">4.6 故障检测与转移 <a class="header-anchor" href="#_4-6-故障检测与转移" aria-label="Permalink to &quot;4.6 故障检测与转移&quot;">​</a></h3><h4 id="_4-6-1-故障检测机制" tabindex="-1">4.6.1 故障检测机制 <a class="header-anchor" href="#_4-6-1-故障检测机制" aria-label="Permalink to &quot;4.6.1 故障检测机制&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 故障检测状态机</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> enum</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    CLUSTER_NODE_PFAIL </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span><span class="__shiki_21nrsd">    // 疑似下线</span></span>
<span class="line"><span class="__shiki_140thh">    CLUSTER_NODE_FAIL </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span><span class="__shiki_21nrsd">     // 已下线</span></span>
<span class="line"><span class="__shiki_140thh">    CLUSTER_NODE_HANDSHAKE </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">,</span><span class="__shiki_21nrsd"> // 握手状态</span></span>
<span class="line"><span class="__shiki_140thh">    CLUSTER_NODE_NOADDR </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">,</span><span class="__shiki_21nrsd">   // 无地址</span></span>
<span class="line"><span class="__shiki_140thh">    CLUSTER_NODE_MASTER </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">,</span><span class="__shiki_21nrsd">   // 主节点</span></span>
<span class="line"><span class="__shiki_140thh">    CLUSTER_NODE_SLAVE </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">,</span><span class="__shiki_21nrsd">    // 从节点</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ... 其他标志</span></span>
<span class="line"><span class="__shiki_140thh">} clusterNodeFlags;</span></span></code></pre></div><h4 id="_4-6-2-故障转移流程" tabindex="-1">4.6.2 故障转移流程 <a class="header-anchor" href="#_4-6-2-故障转移流程" aria-label="Permalink to &quot;4.6.2 故障转移流程&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">1. 故障检测</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  ┌──────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">   ├─▶│ 节点A向节点B发送PING │</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  │ 超时未收到PONG    │</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  └──────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">   │</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 疑似下线（PFAIL）</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  ┌──────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">   ├─▶│ 标记节点为PFAIL状态 │</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  │ 通过Gossip传播    │</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  └──────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">   │</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 已下线（FAIL）</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  ┌──────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">   ├─▶│ 多数主节点确认故障 │</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  │ 广播FAIL消息     │</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  └──────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">   │</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 选举新主节点</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  ┌──────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">   ├─▶│ 从节点发起选举    │</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  │ 获得多数投票     │</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  └──────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">   │</span></span>
<span class="line"><span class="__shiki_wvjl67">5. 故障转移完成</span></span>
<span class="line"><span class="__shiki_wvjl67">   │  ┌──────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">   └─▶│ 新主节点接管槽    │</span></span>
<span class="line"><span class="__shiki_wvjl67">      │ 更新集群配置     │</span></span>
<span class="line"><span class="__shiki_wvjl67">      └──────────────┘</span></span></code></pre></div><h4 id="_4-6-3-选举算法-raft变体" tabindex="-1">4.6.3 选举算法（Raft变体） <a class="header-anchor" href="#_4-6-3-选举算法-raft变体" aria-label="Permalink to &quot;4.6.3 选举算法（Raft变体）&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 故障转移选举逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> clusterFailoverAuthIfNeeded</span><span class="__shiki_140thh">(clusterNode </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">node</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否有资格发起选举</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">nodeIsSlave</span><span class="__shiki_140thh">(node) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        node-&gt;slaveof </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> NULL</span><span class="__shiki_1itgoe"> ||</span></span>
<span class="line"><span class="__shiki_1itgoe">        !</span><span class="__shiki_140thh">(node-&gt;slaveof-&gt;flags </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh"> CLUSTER_NODE_FAIL)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 计算选举延迟</span></span>
<span class="line"><span class="__shiki_dzsirb">    mstime_t</span><span class="__shiki_140thh"> delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CLUSTER_FAILOVER_DELAY </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    delay </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_1t8gfj"> random</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh"> CLUSTER_FAILOVER_DELAY </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 等待延迟后发起选举</span></span>
<span class="line"><span class="__shiki_140thh">    node-&gt;slaveof-&gt;failover_start_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mstime</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> delay;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 请求投票</span></span>
<span class="line"><span class="__shiki_1t8gfj">    clusterRequestFailoverAuth</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 投票逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> clusterSendFailoverAuthIfNeeded</span><span class="__shiki_140thh">(clusterNode </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">node</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否应该投票</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 请求者必须是当前节点的从节点</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 主节点必须已下线</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 当前配置纪元必须最新</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 每个节点在每个配置纪元只能投一次票</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">shouldVoteFor</span><span class="__shiki_140thh">(node)) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        clusterSendFailoverAuth</span><span class="__shiki_140thh">(node);</span></span>
<span class="line"><span class="__shiki_140thh">        node-&gt;flags </span><span class="__shiki_1itgoe">|=</span><span class="__shiki_140thh"> CLUSTER_NODE_VOTED;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-7-集群客户端实现" tabindex="-1">4.7 集群客户端实现 <a class="header-anchor" href="#_4-7-集群客户端实现" aria-label="Permalink to &quot;4.7 集群客户端实现&quot;">​</a></h3><h4 id="_4-7-1-客户端重定向处理" tabindex="-1">4.7.1 客户端重定向处理 <a class="header-anchor" href="#_4-7-1-客户端重定向处理" aria-label="Permalink to &quot;4.7.1 客户端重定向处理&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> redis</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SmartRedisClusterClient</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, startup_nodes):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.startup_nodes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> startup_nodes</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.slots_cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}  </span><span class="__shiki_21nrsd"># slot -&gt; (host, port)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.nodes_cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}  </span><span class="__shiki_21nrsd"># node_id -&gt; (host, port)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.cluster_initialized </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> initialize</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;初始化集群信息&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> node </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.startup_nodes:</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                r </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redis.Redis(</span><span class="__shiki_1jdh33">host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">node[</span><span class="__shiki_mdbnqw">&#39;host&#39;</span><span class="__shiki_140thh">], </span><span class="__shiki_1jdh33">port</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">node[</span><span class="__shiki_mdbnqw">&#39;port&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 获取集群槽分配信息</span></span>
<span class="line"><span class="__shiki_140thh">                slots_info </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> r.cluster(</span><span class="__shiki_mdbnqw">&#39;slots&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.update_slots_cache(slots_info)</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.cluster_initialized </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span></span>
<span class="line"><span class="__shiki_1itgoe">            except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_1itgoe">                continue</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> update_slots_cache</span><span class="__shiki_140thh">(self, slots_info):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;更新槽缓存&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> slot_range </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> slots_info:</span></span>
<span class="line"><span class="__shiki_140thh">            start_slot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> slot_range[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">            end_slot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> slot_range[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">            master_node </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> slot_range[</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># [host, port, node_id]</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> slot </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(start_slot, end_slot </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.slots_cache[slot] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (master_node[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">], master_node[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_connection_for_key</span><span class="__shiki_140thh">(self, key):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取键对应的连接&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.cluster_initialized:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.initialize()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        slot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.calculate_slot(key)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> slot </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.slots_cache:</span></span>
<span class="line"><span class="__shiki_140thh">            host, port </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.slots_cache[slot]</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> redis.Redis(</span><span class="__shiki_1jdh33">host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">host, </span><span class="__shiki_1jdh33">port</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">port)</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;No node found for slot </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">slot</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> calculate_slot</span><span class="__shiki_140thh">(self, key):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;计算键的哈希槽&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 简化版本，实际应实现CRC16算法</span></span>
<span class="line"><span class="__shiki_140thh">        s </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> key.find(</span><span class="__shiki_mdbnqw">&#39;{&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> s </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            e </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> key.find(</span><span class="__shiki_mdbnqw">&#39;}&#39;</span><span class="__shiki_140thh">, s </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> e </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> and</span><span class="__shiki_140thh"> e </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> s </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> key[s </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">:e]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 使用内置哈希函数模拟</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> hash</span><span class="__shiki_140thh">(key) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_dzsirb"> 16384</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> execute_command</span><span class="__shiki_140thh">(self, key, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;执行命令，处理重定向&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        max_redirects </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_140thh">        redirects </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh"> redirects </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> max_redirects:</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_connection_for_key(key)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> conn.execute_command(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args)</span></span>
<span class="line"><span class="__shiki_1itgoe">            except</span><span class="__shiki_140thh"> redis.exceptions.ResponseError </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 处理MOVED重定向</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_dzsirb"> str</span><span class="__shiki_140thh">(e).startswith(</span><span class="__shiki_mdbnqw">&#39;MOVED&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 格式: MOVED slot target_host:target_port</span></span>
<span class="line"><span class="__shiki_140thh">                    parts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> str</span><span class="__shiki_140thh">(e).split()</span></span>
<span class="line"><span class="__shiki_140thh">                    slot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> int</span><span class="__shiki_140thh">(parts[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">                    target </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parts[</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">].split(</span><span class="__shiki_mdbnqw">&#39;:&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    host, port </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> target[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">], </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">(target[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 更新槽缓存</span></span>
<span class="line"><span class="__shiki_dzsirb">                    self</span><span class="__shiki_140thh">.slots_cache[slot] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (host, port)</span></span>
<span class="line"><span class="__shiki_140thh">                    redirects </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">                    continue</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 处理ASK重定向</span></span>
<span class="line"><span class="__shiki_1itgoe">                elif</span><span class="__shiki_dzsirb"> str</span><span class="__shiki_140thh">(e).startswith(</span><span class="__shiki_mdbnqw">&#39;ASK&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">                    parts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> str</span><span class="__shiki_140thh">(e).split()</span></span>
<span class="line"><span class="__shiki_140thh">                    target </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parts[</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">].split(</span><span class="__shiki_mdbnqw">&#39;:&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    host, port </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> target[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">], </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">(target[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 临时重定向，不更新缓存</span></span>
<span class="line"><span class="__shiki_140thh">                    conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redis.Redis(</span><span class="__shiki_1jdh33">host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">host, </span><span class="__shiki_1jdh33">port</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">port)</span></span>
<span class="line"><span class="__shiki_140thh">                    conn.execute_command(</span><span class="__shiki_mdbnqw">&#39;ASKING&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> conn.execute_command(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args)</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    raise</span></span>
<span class="line"><span class="__shiki_1itgoe">        raise</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Too many redirects&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_4-7-2-管道-pipeline-支持" tabindex="-1">4.7.2 管道（Pipeline）支持 <a class="header-anchor" href="#_4-7-2-管道-pipeline-支持" aria-label="Permalink to &quot;4.7.2 管道（Pipeline）支持&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ClusterPipeline</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, cluster_client):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.cluster_client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cluster_client</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.commands_by_node </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}  </span><span class="__shiki_21nrsd"># (host, port) -&gt; [commands]</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> execute_command</span><span class="__shiki_140thh">(self, key, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;将命令按节点分组&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        conn_info </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.cluster_client.get_connection_for_key(key)</span></span>
<span class="line"><span class="__shiki_140thh">        node_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (conn_info.connection_pool.connection_kwargs[</span><span class="__shiki_mdbnqw">&#39;host&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">                   conn_info.connection_pool.connection_kwargs[</span><span class="__shiki_mdbnqw">&#39;port&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> node_key </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.commands_by_node:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.commands_by_node[node_key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 存储命令和回调</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.commands_by_node[node_key].append({</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;command&#39;</span><span class="__shiki_140thh">: args,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;callback&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">None</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;批量执行所有命令&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (host, port), commands </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.commands_by_node.items():</span></span>
<span class="line"><span class="__shiki_140thh">            conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redis.Redis(</span><span class="__shiki_1jdh33">host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">host, </span><span class="__shiki_1jdh33">port</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">port)</span></span>
<span class="line"><span class="__shiki_140thh">            pipe </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.pipeline()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> cmd </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> commands:</span></span>
<span class="line"><span class="__shiki_140thh">                pipe.execute_command(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">cmd[</span><span class="__shiki_mdbnqw">&#39;command&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pipe.execute()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 将结果与命令关联</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> i, result </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> enumerate</span><span class="__shiki_140thh">(results):</span></span>
<span class="line"><span class="__shiki_140thh">                cmd_index </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> i</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 这里需要更复杂的逻辑来映射结果到原始命令</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.results</span></span></code></pre></div><h3 id="_4-8-集群运维与监控" tabindex="-1">4.8 集群运维与监控 <a class="header-anchor" href="#_4-8-集群运维与监控" aria-label="Permalink to &quot;4.8 集群运维与监控&quot;">​</a></h3><h4 id="_4-8-1-集群状态检查" tabindex="-1">4.8.1 集群状态检查 <a class="header-anchor" href="#_4-8-1-集群状态检查" aria-label="Permalink to &quot;4.8.1 集群状态检查&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查集群状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> --cluster</span><span class="__shiki_mdbnqw"> check</span><span class="__shiki_mdbnqw"> 127.0.0.1:7000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看集群信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7000</span><span class="__shiki_mdbnqw"> cluster</span><span class="__shiki_mdbnqw"> info</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看节点信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7000</span><span class="__shiki_mdbnqw"> cluster</span><span class="__shiki_mdbnqw"> nodes</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看槽分布</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> --cluster</span><span class="__shiki_mdbnqw"> slots</span><span class="__shiki_mdbnqw"> 127.0.0.1:7000</span></span></code></pre></div><h4 id="_4-8-2-集群监控指标" tabindex="-1">4.8.2 集群监控指标 <a class="header-anchor" href="#_4-8-2-集群监控指标" aria-label="Permalink to &quot;4.8.2 集群监控指标&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 集群关键指标</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7000</span><span class="__shiki_mdbnqw"> info</span><span class="__shiki_mdbnqw"> cluster</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 输出示例：</span></span>
<span class="line"><span class="__shiki_1t8gfj">cluster_state:ok</span><span class="__shiki_21nrsd">                    # 集群状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">cluster_slots_assigned:16384</span><span class="__shiki_21nrsd">       # 已分配槽数</span></span>
<span class="line"><span class="__shiki_1t8gfj">cluster_slots_ok:16384</span><span class="__shiki_21nrsd">             # 正常槽数</span></span>
<span class="line"><span class="__shiki_1t8gfj">cluster_slots_pfail:0</span><span class="__shiki_21nrsd">              # 疑似故障槽数</span></span>
<span class="line"><span class="__shiki_1t8gfj">cluster_slots_fail:0</span><span class="__shiki_21nrsd">               # 故障槽数</span></span>
<span class="line"><span class="__shiki_1t8gfj">cluster_known_nodes:6</span><span class="__shiki_21nrsd">              # 已知节点数</span></span>
<span class="line"><span class="__shiki_1t8gfj">cluster_size:3</span><span class="__shiki_21nrsd">                     # 主节点数</span></span>
<span class="line"><span class="__shiki_1t8gfj">cluster_current_epoch:6</span><span class="__shiki_21nrsd">            # 当前配置纪元</span></span>
<span class="line"><span class="__shiki_1t8gfj">cluster_my_epoch:1</span><span class="__shiki_21nrsd">                 # 本节点配置纪元</span></span>
<span class="line"><span class="__shiki_1t8gfj">cluster_stats_messages_sent:123456</span><span class="__shiki_21nrsd"> # 发送消息数</span></span>
<span class="line"><span class="__shiki_1t8gfj">cluster_stats_messages_received:123400</span><span class="__shiki_21nrsd"> # 接收消息数</span></span></code></pre></div><h4 id="_4-8-3-运维命令" tabindex="-1">4.8.3 运维命令 <a class="header-anchor" href="#_4-8-3-运维命令" aria-label="Permalink to &quot;4.8.3 运维命令&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 添加新节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> --cluster</span><span class="__shiki_mdbnqw"> add-node</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  new_host:new_port</span><span class="__shiki_mdbnqw"> existing_host:existing_port</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cluster-slave</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cluster-master-id</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">master-i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 删除节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> --cluster</span><span class="__shiki_mdbnqw"> del-node</span><span class="__shiki_mdbnqw"> host:port</span><span class="__shiki_mdbnqw"> node_id</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 从节点提升为主节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> --cluster</span><span class="__shiki_mdbnqw"> failover</span><span class="__shiki_dzsirb"> --cluster-master-id</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node-i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 重新平衡槽</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> --cluster</span><span class="__shiki_mdbnqw"> rebalance</span><span class="__shiki_mdbnqw"> host:port</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cluster-weight</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node-i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw">=</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw">weigh</span><span class="__shiki_140thh">t</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 修复槽（当槽分配不一致时）</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> --cluster</span><span class="__shiki_mdbnqw"> fix</span><span class="__shiki_mdbnqw"> host:port</span></span></code></pre></div><h3 id="_4-9-集群限制与最佳实践" tabindex="-1">4.9 集群限制与最佳实践 <a class="header-anchor" href="#_4-9-集群限制与最佳实践" aria-label="Permalink to &quot;4.9 集群限制与最佳实践&quot;">​</a></h3><h4 id="_4-9-1-功能限制" tabindex="-1">4.9.1 功能限制 <a class="header-anchor" href="#_4-9-1-功能限制" aria-label="Permalink to &quot;4.9.1 功能限制&quot;">​</a></h4><ol><li><strong>事务限制</strong>：事务中所有key必须在同一slot</li><li><strong>Lua脚本限制</strong>：脚本中所有key必须在同一slot</li><li><strong>多键操作限制</strong>：MGET、MSET等需要所有key在同一slot</li><li><strong>数据库选择</strong>：只支持db0，SELECT命令无效</li><li><strong>发布订阅</strong>：客户端需要连接到所有节点才能接收全部消息</li></ol><h4 id="_4-9-2-最佳实践" tabindex="-1">4.9.2 最佳实践 <a class="header-anchor" href="#_4-9-2-最佳实践" aria-label="Permalink to &quot;4.9.2 最佳实践&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 生产环境配置建议</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 节点配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">cluster-node-timeout 15000</span><span class="__shiki_21nrsd">          # 适当超时时间</span></span>
<span class="line"><span class="__shiki_mdbnqw">cluster-require-full-coverage no</span><span class="__shiki_21nrsd">    # 允许部分节点失效</span></span>
<span class="line"><span class="__shiki_mdbnqw">cluster-migration-barrier 1</span><span class="__shiki_21nrsd">         # 迁移屏障</span></span>
<span class="line"><span class="__shiki_mdbnqw">cluster-slave-validity-factor 10</span><span class="__shiki_21nrsd">    # 从节点有效性因子</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 网络配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">tcp-keepalive 60</span><span class="__shiki_21nrsd">                    # 保持连接</span></span>
<span class="line"><span class="__shiki_mdbnqw">tcp-backlog 511</span><span class="__shiki_21nrsd">                     # 连接队列</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 内存配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">maxmemory 16gb</span><span class="__shiki_21nrsd">                      # 根据物理内存设置</span></span>
<span class="line"><span class="__shiki_mdbnqw">maxmemory-policy allkeys-lru</span><span class="__shiki_21nrsd">        # 淘汰策略</span></span>
<span class="line"><span class="__shiki_mdbnqw">maxmemory-samples 10</span><span class="__shiki_21nrsd">                # LRU采样数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 持久化配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">appendonly yes</span><span class="__shiki_21nrsd">                      # 开启AOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">appendfsync everysec</span><span class="__shiki_21nrsd">                # 每秒刷盘</span></span>
<span class="line"><span class="__shiki_mdbnqw">auto-aof-rewrite-percentage 100</span><span class="__shiki_21nrsd">     # AOF重写条件</span></span>
<span class="line"><span class="__shiki_mdbnqw">auto-aof-rewrite-min-size 64mb</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 监控配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">slowlog-log-slower-than 10000</span><span class="__shiki_21nrsd">       # 慢查询日志</span></span>
<span class="line"><span class="__shiki_mdbnqw">latency-monitor-threshold 100</span><span class="__shiki_21nrsd">       # 延迟监控</span></span></code></pre></div><h4 id="_4-9-3-容量规划" tabindex="-1">4.9.3 容量规划 <a class="header-anchor" href="#_4-9-3-容量规划" aria-label="Permalink to &quot;4.9.3 容量规划&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> calculate_cluster_size</span><span class="__shiki_140thh">(data_size, growth_rate, replication_factor):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    计算集群规模</span></span>
<span class="line"><span class="__shiki_mdbnqw">    :param data_size: 预期数据大小（GB）</span></span>
<span class="line"><span class="__shiki_mdbnqw">    :param growth_rate: 年增长率（如0.3表示30%）</span></span>
<span class="line"><span class="__shiki_mdbnqw">    :param replication_factor: 复制因子（通常为1或2）</span></span>
<span class="line"><span class="__shiki_mdbnqw">    :return: 所需主节点数，总节点数</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 考虑3年增长</span></span>
<span class="line"><span class="__shiki_140thh">    future_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data_size </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> growth_rate) </span><span class="__shiki_1itgoe">**</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 每个节点建议不超过16GB（考虑持久化、复制等开销）</span></span>
<span class="line"><span class="__shiki_140thh">    max_memory_per_node </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 16</span><span class="__shiki_21nrsd">  # GB</span></span>
<span class="line"><span class="__shiki_140thh">    master_nodes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> math.ceil(future_data </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> max_memory_per_node)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 总节点数 = 主节点数 * (1 + 复制因子)</span></span>
<span class="line"><span class="__shiki_140thh">    total_nodes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> master_nodes </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> replication_factor)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 确保至少有3个主节点用于选举</span></span>
<span class="line"><span class="__shiki_140thh">    master_nodes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> max</span><span class="__shiki_140thh">(master_nodes, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    total_nodes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> max</span><span class="__shiki_140thh">(total_nodes, master_nodes </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> replication_factor))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> master_nodes, total_nodes</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 示例：1TB数据，年增长30%，复制因子1</span></span>
<span class="line"><span class="__shiki_140thh">masters, total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> calculate_cluster_size(</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.3</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;需要</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">masters</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">个主节点，共</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">total</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">个节点&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="五、云原生redis集群" tabindex="-1">五、云原生Redis集群 <a class="header-anchor" href="#五、云原生redis集群" aria-label="Permalink to &quot;五、云原生Redis集群&quot;">​</a></h2><h3 id="_5-1-redis-on-kubernetes" tabindex="-1">5.1 Redis on Kubernetes <a class="header-anchor" href="#_5-1-redis-on-kubernetes" aria-label="Permalink to &quot;5.1 Redis on Kubernetes&quot;">​</a></h3><h4 id="_5-1-1-使用statefulset部署" tabindex="-1">5.1.1 使用StatefulSet部署 <a class="header-anchor" href="#_5-1-1-使用statefulset部署" aria-label="Permalink to &quot;5.1.1 使用StatefulSet部署&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># redis-cluster-statefulset.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">StatefulSet</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis-cluster</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  serviceName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis-cluster</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">6</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis-cluster</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis-cluster</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis:7.0-alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">        command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/bin/sh&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        args</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 启动脚本</span></span>
<span class="line"><span class="__shiki_mdbnqw">          IP=$(hostname -i)</span></span>
<span class="line"><span class="__shiki_mdbnqw">          PORT=6379</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 等待所有Pod就绪</span></span>
<span class="line"><span class="__shiki_mdbnqw">          sleep 10</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 第一个Pod初始化集群</span></span>
<span class="line"><span class="__shiki_mdbnqw">          if [[ $HOSTNAME == &quot;redis-cluster-0&quot; ]]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            redis-cli --cluster create \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">              $(hostname -i):6379 \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">              redis-cluster-1.redis-cluster:6379 \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">              redis-cluster-2.redis-cluster:6379 \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">              redis-cluster-3.redis-cluster:6379 \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">              redis-cluster-4.redis-cluster:6379 \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">              redis-cluster-5.redis-cluster:6379 \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">              --cluster-replicas 1 --cluster-yes</span></span>
<span class="line"><span class="__shiki_mdbnqw">          fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 启动Redis</span></span>
<span class="line"><span class="__shiki_mdbnqw">          redis-server /usr/local/etc/redis/redis.conf</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">6379</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">client</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">16379</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gossip</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis-data</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/data</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis-config</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/usr/local/etc/redis</span></span>
<span class="line"><span class="__shiki_17hn0y">  volumeClaimTemplates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis-data</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      accessModes</span><span class="__shiki_140thh">: [ </span><span class="__shiki_mdbnqw">&quot;ReadWriteOnce&quot;</span><span class="__shiki_140thh"> ]</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">20Gi</span></span></code></pre></div><h4 id="_5-1-2-使用operator管理" tabindex="-1">5.1.2 使用Operator管理 <a class="header-anchor" href="#_5-1-2-使用operator管理" aria-label="Permalink to &quot;5.1.2 使用Operator管理&quot;">​</a></h4><ul><li><strong>Redis Operator</strong>：自动化集群管理</li><li><strong>Redis Enterprise Operator</strong>：企业级功能</li><li><strong>K8s原生集成</strong>：自动扩缩容、备份恢复</li></ul><h3 id="_5-2-云托管服务对比" tabindex="-1">5.2 云托管服务对比 <a class="header-anchor" href="#_5-2-云托管服务对比" aria-label="Permalink to &quot;5.2 云托管服务对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>Redis OSS Cluster</th><th>Amazon ElastiCache</th><th>Azure Cache for Redis</th><th>Google Memorystore</th></tr></thead><tbody><tr><td>管理复杂度</td><td>高</td><td>低</td><td>低</td><td>低</td></tr><tr><td>自动故障转移</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td>在线扩缩容</td><td>手动</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td>多可用区</td><td>手动配置</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td>备份恢复</td><td>手动</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td>监控告警</td><td>需自建</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td>成本</td><td>低</td><td>中高</td><td>中高</td><td>中高</td></tr></tbody></table><h2 id="六、性能优化与故障排除" tabindex="-1">六、性能优化与故障排除 <a class="header-anchor" href="#六、性能优化与故障排除" aria-label="Permalink to &quot;六、性能优化与故障排除&quot;">​</a></h2><h3 id="_6-1-性能优化策略" tabindex="-1">6.1 性能优化策略 <a class="header-anchor" href="#_6-1-性能优化策略" aria-label="Permalink to &quot;6.1 性能优化策略&quot;">​</a></h3><h4 id="_6-1-1-数据分片优化" tabindex="-1">6.1.1 数据分片优化 <a class="header-anchor" href="#_6-1-1-数据分片优化" aria-label="Permalink to &quot;6.1.1 数据分片优化&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> optimize_sharding</span><span class="__shiki_140thh">(keys, access_patterns):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    基于访问模式优化分片</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 热点键分离</span></span>
<span class="line"><span class="__shiki_140thh">    hot_keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> detect_hot_keys(access_patterns)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 将热点键分散到不同节点</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 相关键聚合</span></span>
<span class="line"><span class="__shiki_140thh">    related_keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> find_related_keys(keys)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用哈希标签确保相关键在同一节点</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. 负载均衡</span></span>
<span class="line"><span class="__shiki_140thh">    node_load </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> calculate_node_load()</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 调整槽分配平衡负载</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> optimized_shard_map</span></span></code></pre></div><h4 id="_6-1-2-网络优化" tabindex="-1">6.1.2 网络优化 <a class="header-anchor" href="#_6-1-2-网络优化" aria-label="Permalink to &quot;6.1.2 网络优化&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 调整内核参数</span></span>
<span class="line"><span class="__shiki_1t8gfj">sysctl</span><span class="__shiki_dzsirb"> -w</span><span class="__shiki_mdbnqw"> net.core.somaxconn=</span><span class="__shiki_dzsirb">65535</span></span>
<span class="line"><span class="__shiki_1t8gfj">sysctl</span><span class="__shiki_dzsirb"> -w</span><span class="__shiki_mdbnqw"> net.ipv4.tcp_max_syn_backlog=</span><span class="__shiki_dzsirb">65535</span></span>
<span class="line"><span class="__shiki_1t8gfj">sysctl</span><span class="__shiki_dzsirb"> -w</span><span class="__shiki_mdbnqw"> vm.overcommit_memory=</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Redis配置优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># redis.conf</span></span>
<span class="line"><span class="__shiki_1t8gfj">tcp-keepalive</span><span class="__shiki_dzsirb"> 300</span></span>
<span class="line"><span class="__shiki_1t8gfj">repl-backlog-size</span><span class="__shiki_mdbnqw"> 256mb</span></span>
<span class="line"><span class="__shiki_1t8gfj">client-output-buffer-limit</span><span class="__shiki_mdbnqw"> normal</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1t8gfj">client-output-buffer-limit</span><span class="__shiki_mdbnqw"> slave</span><span class="__shiki_mdbnqw"> 512mb</span><span class="__shiki_mdbnqw"> 256mb</span><span class="__shiki_dzsirb"> 60</span></span></code></pre></div><h3 id="_6-2-常见故障排除" tabindex="-1">6.2 常见故障排除 <a class="header-anchor" href="#_6-2-常见故障排除" aria-label="Permalink to &quot;6.2 常见故障排除&quot;">​</a></h3><h4 id="_6-2-1-集群无法建立" tabindex="-1">6.2.1 集群无法建立 <a class="header-anchor" href="#_6-2-1-集群无法建立" aria-label="Permalink to &quot;6.2.1 集群无法建立&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查节点间网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7000</span><span class="__shiki_mdbnqw"> ping</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7000</span><span class="__shiki_mdbnqw"> cluster</span><span class="__shiki_mdbnqw"> meet</span><span class="__shiki_dzsirb"> 127.0.0.1</span><span class="__shiki_dzsirb"> 7001</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查防火墙</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> 6379</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> 16379</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看集群日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">tail</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> /var/log/redis/redis-7000.log</span></span></code></pre></div><h4 id="_6-2-2-槽分配异常" tabindex="-1">6.2.2 槽分配异常 <a class="header-anchor" href="#_6-2-2-槽分配异常" aria-label="Permalink to &quot;6.2.2 槽分配异常&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查槽状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> --cluster</span><span class="__shiki_mdbnqw"> check</span><span class="__shiki_mdbnqw"> 127.0.0.1:7000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 修复槽分配</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> --cluster</span><span class="__shiki_mdbnqw"> fix</span><span class="__shiki_mdbnqw"> 127.0.0.1:7000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 手动分配槽</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7000</span><span class="__shiki_mdbnqw"> cluster</span><span class="__shiki_mdbnqw"> addslots</span><span class="__shiki_mdbnqw"> {0..100}</span></span></code></pre></div><h4 id="_6-2-3-脑裂问题处理" tabindex="-1">6.2.3 脑裂问题处理 <a class="header-anchor" href="#_6-2-3-脑裂问题处理" aria-label="Permalink to &quot;6.2.3 脑裂问题处理&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查节点状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_dzsirb"> 7000</span><span class="__shiki_mdbnqw"> cluster</span><span class="__shiki_mdbnqw"> nodes</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> fail</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 强制故障转移</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> --cluster</span><span class="__shiki_mdbnqw"> failover</span><span class="__shiki_dzsirb"> --cluster-master-id</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node-i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> --force</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 恢复分裂的集群</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 停止所有节点</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 选择配置纪元最大的节点为主</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 手动更新其他节点配置</span></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 重启集群</span></span></code></pre></div><h2 id="七、未来发展趋势" tabindex="-1">七、未来发展趋势 <a class="header-anchor" href="#七、未来发展趋势" aria-label="Permalink to &quot;七、未来发展趋势&quot;">​</a></h2><h3 id="_7-1-redis-7-0-集群改进" tabindex="-1">7.1 Redis 7.0+集群改进 <a class="header-anchor" href="#_7-1-redis-7-0-集群改进" aria-label="Permalink to &quot;7.1 Redis 7.0+集群改进&quot;">​</a></h3><ol><li><strong>多线程I/O</strong>：提高网络处理能力</li><li><strong>函数计算</strong>：Redis Functions，支持跨节点执行</li><li><strong>更好的重分片</strong>：减少迁移对性能的影响</li><li><strong>增强的ACL</strong>：更细粒度的权限控制</li></ol><h3 id="_7-2-新技术整合" tabindex="-1">7.2 新技术整合 <a class="header-anchor" href="#_7-2-新技术整合" aria-label="Permalink to &quot;7.2 新技术整合&quot;">​</a></h3><ol><li><strong>RDMA支持</strong>：远程直接内存访问，降低延迟</li><li><strong>持久内存</strong>：Intel Optane等，结合内存与持久化优势</li><li><strong>智能分片</strong>：基于AI/ML的自动分片优化</li></ol><h2 id="八、总结" tabindex="-1">八、总结 <a class="header-anchor" href="#八、总结" aria-label="Permalink to &quot;八、总结&quot;">​</a></h2><p>Redis集群与分片技术为企业级应用提供了可扩展、高可用的数据存储方案。关键要点：</p><h3 id="架构选择指南" tabindex="-1">架构选择指南： <a class="header-anchor" href="#架构选择指南" aria-label="Permalink to &quot;架构选择指南：&quot;">​</a></h3><ol><li><strong>小规模应用</strong>：使用主从复制 + Sentinel</li><li><strong>中等规模</strong>：考虑代理分片（Codis/Twemproxy）</li><li><strong>大规模生产</strong>：使用Redis Cluster</li><li><strong>云环境</strong>：考虑托管服务</li></ol><h3 id="最佳实践" tabindex="-1">最佳实践： <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践：&quot;">​</a></h3><ol><li><strong>合理分片</strong>：避免数据倾斜和热点</li><li><strong>监控告警</strong>：建立完善的监控体系</li><li><strong>容量规划</strong>：提前规划扩展路径</li><li><strong>灾难恢复</strong>：定期测试故障转移</li></ol><h3 id="技术趋势" tabindex="-1">技术趋势： <a class="header-anchor" href="#技术趋势" aria-label="Permalink to &quot;技术趋势：&quot;">​</a></h3><ol><li><strong>云原生</strong>：容器化、Kubernetes集成</li><li><strong>智能化</strong>：自动优化、智能运维</li><li><strong>高性能</strong>：新硬件、新协议支持</li></ol><p>通过深入理解Redis集群原理，结合实际业务需求，可以构建出稳定、高效、可扩展的Redis分布式系统。</p>`,131)])])}const r=a(p,[["render",l]]);export{d as __pageData,r as default};
