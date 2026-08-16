import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"Prometheus远程读写协议详解","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/timeseries/prometheus/remote-write.md","filePath":"data/database/nosql/timeseries/prometheus/remote-write.md"}'),p={name:"data/database/nosql/timeseries/prometheus/remote-write.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="prometheus远程读写协议详解" tabindex="-1">Prometheus远程读写协议详解 <a class="header-anchor" href="#prometheus远程读写协议详解" aria-label="Permalink to &quot;Prometheus远程读写协议详解&quot;">​</a></h1><h2 id="一、远程读写架构概述" tabindex="-1">一、远程读写架构概述 <a class="header-anchor" href="#一、远程读写架构概述" aria-label="Permalink to &quot;一、远程读写架构概述&quot;">​</a></h2><h3 id="_1-1-远程读写设计理念" tabindex="-1">1.1 远程读写设计理念 <a class="header-anchor" href="#_1-1-远程读写设计理念" aria-label="Permalink to &quot;1.1 远程读写设计理念&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                    Prometheus Server                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌────────────┐    ┌────────────┐    ┌────────────┐    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  抓取目标  │────▶│ 本地TSDB  │────▶│ 远程写入  │───▶│</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └────────────┘    └────────────┘    └────────────┘    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                                                        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌────────────┐    ┌────────────┐    ┌────────────┐    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  查询请求  │◀───│ 查询引擎  │◀────│ 远程读取  │◀───│</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └────────────┘    └────────────┘    └────────────┘    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                                     ▲                   ▲</span></span>
<span class="line"><span class="__shiki_wvjl67">                                     │                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">                                     ▼                   ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                   远程存储系统                           │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌────────────┐    ┌────────────┐    ┌────────────┐    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  接收API   │◀───│  存储层    │────▶│  查询API   │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └────────────┘    └────────────┘    └────────────┘    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_1-2-远程读写核心价值" tabindex="-1">1.2 远程读写核心价值 <a class="header-anchor" href="#_1-2-远程读写核心价值" aria-label="Permalink to &quot;1.2 远程读写核心价值&quot;">​</a></h3><ol><li><strong>长期存储</strong>：扩展本地存储限制，支持历史数据查询</li><li><strong>数据联邦</strong>：跨多个Prometheus实例聚合数据</li><li><strong>高可用</strong>：数据复制和容灾备份</li><li><strong>计算卸载</strong>：复杂查询在远程存储执行</li></ol><h2 id="二、远程写入协议-remote-write" tabindex="-1">二、远程写入协议（Remote Write） <a class="header-anchor" href="#二、远程写入协议-remote-write" aria-label="Permalink to &quot;二、远程写入协议（Remote Write）&quot;">​</a></h2><h3 id="_2-1-协议架构" tabindex="-1">2.1 协议架构 <a class="header-anchor" href="#_2-1-协议架构" aria-label="Permalink to &quot;2.1 协议架构&quot;">​</a></h3><h4 id="_2-1-1-数据流模型" tabindex="-1">2.1.1 数据流模型 <a class="header-anchor" href="#_2-1-1-数据流模型" aria-label="Permalink to &quot;2.1.1 数据流模型&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Prometheus Side:</span></span>
<span class="line"><span class="__shiki_wvjl67">┌──────────────┐  批次打包   ┌──────────────┐   HTTP POST   ┌──────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│  样本队列     │──────────▶│ 序列化压缩    │─────────────▶│ 远程端点     │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────┘            └──────────────┘               └──────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">       ▲                            │                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">       │                            │                              ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">┌──────────────┐                    │                      ┌──────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│  抓取/规则    │                    │                      │  接收确认    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────┘                    │                      └──────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                                    │                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">                                    ▼                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">                            ┌──────────────┐                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">                            │  重试队列     │◀────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                            └──────────────┘</span></span></code></pre></div><h4 id="_2-1-2-配置语法" tabindex="-1">2.1.2 配置语法 <a class="header-anchor" href="#_2-1-2-配置语法" aria-label="Permalink to &quot;2.1.2 配置语法&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">remote_write</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://remote-storage:8086/api/v1/prom/write&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基本认证</span></span>
<span class="line"><span class="__shiki_17hn0y">    basic_auth</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      username</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">admin</span></span>
<span class="line"><span class="__shiki_17hn0y">      password</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">secret</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 令牌认证</span></span>
<span class="line"><span class="__shiki_17hn0y">    authorization</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      credentials</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Bearer token123&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # TLS配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    tls_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      ca_file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/path/to/ca.crt</span></span>
<span class="line"><span class="__shiki_17hn0y">      cert_file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/path/to/client.crt</span></span>
<span class="line"><span class="__shiki_17hn0y">      key_file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/path/to/client.key</span></span>
<span class="line"><span class="__shiki_17hn0y">      insecure_skip_verify</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 队列配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    queue_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      capacity</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_21nrsd">           # 队列容量</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_shards</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">200</span><span class="__shiki_21nrsd">          # 最大分片数</span></span>
<span class="line"><span class="__shiki_17hn0y">      min_shards</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_21nrsd">            # 最小分片数</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_samples_per_send</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">500</span><span class="__shiki_21nrsd"> # 每次发送最大样本数</span></span>
<span class="line"><span class="__shiki_17hn0y">      batch_send_deadline</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5s</span><span class="__shiki_21nrsd">   # 批次发送截止时间</span></span>
<span class="line"><span class="__shiki_17hn0y">      min_backoff</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30ms</span><span class="__shiki_21nrsd">         # 最小重试间隔</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_backoff</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5s</span><span class="__shiki_21nrsd">           # 最大重试间隔</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 写入重试</span></span>
<span class="line"><span class="__shiki_17hn0y">    retry_on_http_429</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">    # 429状态码重试</span></span>
<span class="line"><span class="__shiki_17hn0y">    max_retries</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_21nrsd">             # 最大重试次数</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 重标签配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    write_relabel_configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">source_labels</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">__name__</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        regex</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;expensive.*&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">drop</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 元数据配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      send</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">               # 发送元数据</span></span>
<span class="line"><span class="__shiki_17hn0y">      send_interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1m</span><span class="__shiki_21nrsd">        # 发送间隔</span></span></code></pre></div><h3 id="_2-2-协议详解" tabindex="-1">2.2 协议详解 <a class="header-anchor" href="#_2-2-协议详解" aria-label="Permalink to &quot;2.2 协议详解&quot;">​</a></h3><h4 id="_2-2-1-http接口规范" tabindex="-1">2.2.1 HTTP接口规范 <a class="header-anchor" href="#_2-2-1-http接口规范" aria-label="Permalink to &quot;2.2.1 HTTP接口规范&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 请求方法</span></span>
<span class="line"><span class="__shiki_1t8gfj">POST</span><span class="__shiki_mdbnqw"> /api/v1/write</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 请求头</span></span>
<span class="line"><span class="__shiki_1t8gfj">Content-Type:</span><span class="__shiki_mdbnqw"> application/x-protobuf</span></span>
<span class="line"><span class="__shiki_1t8gfj">Content-Encoding:</span><span class="__shiki_mdbnqw"> snappy</span></span>
<span class="line"><span class="__shiki_1t8gfj">X-Prometheus-Remote-Write-Version:</span><span class="__shiki_dzsirb"> 0.1.0</span></span>
<span class="line"><span class="__shiki_1t8gfj">User-Agent:</span><span class="__shiki_mdbnqw"> Prometheus/2.40.0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 请求体</span></span>
<span class="line"><span class="__shiki_1t8gfj">Protocol</span><span class="__shiki_mdbnqw"> Buffers编码</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_mdbnqw"> Snappy压缩的WriteRequest</span></span></code></pre></div><h4 id="_2-2-2-protocol-buffers消息定义" tabindex="-1">2.2.2 Protocol Buffers消息定义 <a class="header-anchor" href="#_2-2-2-protocol-buffers消息定义" aria-label="Permalink to &quot;2.2.2 Protocol Buffers消息定义&quot;">​</a></h4><h5 id="writerequest消息" tabindex="-1">WriteRequest消息 <a class="header-anchor" href="#writerequest消息" aria-label="Permalink to &quot;WriteRequest消息&quot;">​</a></h5><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">syntax</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;proto3&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_mdbnqw"> prometheus</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> WriteRequest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> TimeSeries</span><span class="__shiki_140thh"> timeseries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 以下字段为元数据，在v2.11.0中引入</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> MetricMetadata</span><span class="__shiki_140thh"> metadata </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // v2.43.0新增：跳过标签名验证</span></span>
<span class="line"><span class="__shiki_1itgoe">  bool</span><span class="__shiki_140thh"> skip_label_name_validation </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> TimeSeries</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> Label</span><span class="__shiki_140thh"> labels </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> Sample</span><span class="__shiki_140thh"> samples </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // v2.27.0新增：示例（exemplar）支持</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> Exemplar</span><span class="__shiki_140thh"> exemplars </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> Label</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> Sample</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  double</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> timestamp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">// 毫秒时间戳</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> Exemplar</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> Label</span><span class="__shiki_140thh"> labels </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  double</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> timestamp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> MetricMetadata</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  enum</span><span class="__shiki_1t8gfj"> MetricType</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    UNKNOWN </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    COUNTER </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    GAUGE </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    HISTOGRAM </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    SUMMARY </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    INFO </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    STATESET </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_1itgoe">  MetricType</span><span class="__shiki_140thh"> type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> metric_family_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> help </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> unit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h5 id="消息编码示例" tabindex="-1">消息编码示例 <a class="header-anchor" href="#消息编码示例" aria-label="Permalink to &quot;消息编码示例&quot;">​</a></h5><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Go语言编码示例</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> encodeWriteRequest</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">series</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TimeSeries</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">metadata</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MetricMetadata</span><span class="__shiki_140thh">) ([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    req </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WriteRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Timeseries: series,</span></span>
<span class="line"><span class="__shiki_140thh">        Metadata:   metadata,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. Protocol Buffers编码</span></span>
<span class="line"><span class="__shiki_140thh">    data, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> proto.</span><span class="__shiki_1t8gfj">Marshal</span><span class="__shiki_140thh">(req)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. Snappy压缩</span></span>
<span class="line"><span class="__shiki_140thh">    compressed </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> snappy.</span><span class="__shiki_1t8gfj">Encode</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">, data)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> compressed, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建TimeSeries</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> createTimeSeries</span><span class="__shiki_140thh">() []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TimeSeries</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TimeSeries</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">            Labels: []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Label</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                {Name: </span><span class="__shiki_mdbnqw">&quot;__name__&quot;</span><span class="__shiki_140thh">, Value: </span><span class="__shiki_mdbnqw">&quot;http_requests_total&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">                {Name: </span><span class="__shiki_mdbnqw">&quot;method&quot;</span><span class="__shiki_140thh">, Value: </span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">                {Name: </span><span class="__shiki_mdbnqw">&quot;status&quot;</span><span class="__shiki_140thh">, Value: </span><span class="__shiki_mdbnqw">&quot;200&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            Samples: []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Sample</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                {Value: </span><span class="__shiki_dzsirb">123</span><span class="__shiki_140thh">, Timestamp: </span><span class="__shiki_dzsirb">1672531200000</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">                {Value: </span><span class="__shiki_dzsirb">124</span><span class="__shiki_140thh">, Timestamp: </span><span class="__shiki_dzsirb">1672531260000</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-3-序列化优化" tabindex="-1">2.3 序列化优化 <a class="header-anchor" href="#_2-3-序列化优化" aria-label="Permalink to &quot;2.3 序列化优化&quot;">​</a></h3><h4 id="_2-3-1-重复标签优化" tabindex="-1">2.3.1 重复标签优化 <a class="header-anchor" href="#_2-3-1-重复标签优化" aria-label="Permalink to &quot;2.3.1 重复标签优化&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Prometheus实际实现中的优化</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> remoteWriteEncoder</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 标签重复检测</span></span>
<span class="line"><span class="__shiki_140thh">    labelPool </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    labelRefs []</span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 序列缓存</span></span>
<span class="line"><span class="__shiki_140thh">    seriesCache </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">]</span><span class="__shiki_1t8gfj">cachedSeries</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">remoteWriteEncoder</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">encodeSeries</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">series</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">tsdb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Series</span><span class="__shiki_140thh">) []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TimeSeries</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> result []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TimeSeries</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, s </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> series {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 生成标签</span></span>
<span class="line"><span class="__shiki_140thh">        labels </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> e.</span><span class="__shiki_1t8gfj">encodeLabels</span><span class="__shiki_140thh">(s.Labels)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 编码样本</span></span>
<span class="line"><span class="__shiki_140thh">        samples </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> e.</span><span class="__shiki_1t8gfj">encodeSamples</span><span class="__shiki_140thh">(s.Samples)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(result, </span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TimeSeries</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Labels:  labels,</span></span>
<span class="line"><span class="__shiki_140thh">            Samples: samples,</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">remoteWriteEncoder</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">encodeLabels</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ls</span><span class="__shiki_1t8gfj"> labels</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Labels</span><span class="__shiki_140thh">) []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Label</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    encoded </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Label</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(ls))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, l </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> ls {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查标签名是否已存在</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> idx, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> e.labelPool[l.Name]; ok {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 重用标签名引用</span></span>
<span class="line"><span class="__shiki_140thh">            encoded </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(encoded, </span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Label</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                Name:  e.labelRefs[idx],</span></span>
<span class="line"><span class="__shiki_140thh">                Value: l.Value,</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 新标签名</span></span>
<span class="line"><span class="__shiki_140thh">            e.labelPool[l.Name] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(e.labelRefs)</span></span>
<span class="line"><span class="__shiki_140thh">            e.labelRefs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(e.labelRefs, l.Name)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            encoded </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(encoded, </span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Label</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                Name:  l.Name,</span></span>
<span class="line"><span class="__shiki_140thh">                Value: l.Value,</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> encoded</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-4-队列与分片机制" tabindex="-1">2.4 队列与分片机制 <a class="header-anchor" href="#_2-4-队列与分片机制" aria-label="Permalink to &quot;2.4 队列与分片机制&quot;">​</a></h3><h4 id="_2-4-1-队列管理器实现" tabindex="-1">2.4.1 队列管理器实现 <a class="header-anchor" href="#_2-4-1-队列管理器实现" aria-label="Permalink to &quot;2.4.1 队列管理器实现&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WriteQueue</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    shards []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Shard</span></span>
<span class="line"><span class="__shiki_140thh">    config </span><span class="__shiki_1t8gfj">QueueConfig</span></span>
<span class="line"><span class="__shiki_140thh">    hash   </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">uint32</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Shard</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    samples </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1t8gfj"> sampleBatch</span></span>
<span class="line"><span class="__shiki_140thh">    queue   </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">list</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">List</span><span class="__shiki_21nrsd">  // 待发送批次列表</span></span>
<span class="line"><span class="__shiki_140thh">    sending </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_21nrsd">        // 是否正在发送</span></span>
<span class="line"><span class="__shiki_140thh">    mutex   </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutex</span></span>
<span class="line"><span class="__shiki_140thh">    wg      </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WaitGroup</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 统计信息</span></span>
<span class="line"><span class="__shiki_140thh">    samplesDropped  </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    samplesQueued   </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    samplesSent     </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> sampleBatch</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    series []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TimeSeries</span></span>
<span class="line"><span class="__shiki_140thh">    done   </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> error</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-4-2-分片调度算法" tabindex="-1">2.4.2 分片调度算法 <a class="header-anchor" href="#_2-4-2-分片调度算法" aria-label="Permalink to &quot;2.4.2 分片调度算法&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">q </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WriteQueue</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">enqueue</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">samples</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TimeSeries</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 根据标签哈希选择分片</span></span>
<span class="line"><span class="__shiki_140thh">    shardIdx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> q.</span><span class="__shiki_1t8gfj">selectShard</span><span class="__shiki_140thh">(samples)</span></span>
<span class="line"><span class="__shiki_140thh">    shard </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> q.shards[shardIdx]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 检查队列容量</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(shard.samples) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> q.config.Capacity {</span></span>
<span class="line"><span class="__shiki_140thh">        atomic.</span><span class="__shiki_1t8gfj">AddInt64</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">shard.samplesDropped, </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(samples)))</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;queue full&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 放入批次</span></span>
<span class="line"><span class="__shiki_140thh">    batch </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> sampleBatch</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        series: samples,</span></span>
<span class="line"><span class="__shiki_140thh">        done:   </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> error</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> shard.samples </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_140thh"> batch:</span></span>
<span class="line"><span class="__shiki_140thh">        atomic.</span><span class="__shiki_1t8gfj">AddInt64</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">shard.samplesQueued, </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(samples)))</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">batch.done</span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        atomic.</span><span class="__shiki_1t8gfj">AddInt64</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">shard.samplesDropped, </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(samples)))</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;queue full&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">q </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WriteQueue</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">selectShard</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">samples</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TimeSeries</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(samples) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用第一个样本的标签计算哈希</span></span>
<span class="line"><span class="__shiki_140thh">    hash </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> q.</span><span class="__shiki_1t8gfj">hash</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">encodeLabels</span><span class="__shiki_140thh">(samples[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].Labels))</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">(hash </span><span class="__shiki_1itgoe">%</span><span class="__shiki_1itgoe"> uint32</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(q.shards)))</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-4-3-批次发送器" tabindex="-1">2.4.3 批次发送器 <a class="header-anchor" href="#_2-4-3-批次发送器" aria-label="Permalink to &quot;2.4.3 批次发送器&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Shard</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">runSender</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">client</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">url</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> batch []</span><span class="__shiki_1t8gfj">sampleBatch</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> timer </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Timer</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> b </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">s.samples:</span></span>
<span class="line"><span class="__shiki_140thh">            batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(batch, b)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 检查是否达到批次大小或超时</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(batch) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> maxBatchesPerSend </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">               (timer </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> timer.</span><span class="__shiki_1t8gfj">Stop</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">                s.</span><span class="__shiki_1t8gfj">sendBatch</span><span class="__shiki_140thh">(client, url, batch)</span></span>
<span class="line"><span class="__shiki_140thh">                batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 启动定时器</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> timer </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(batch) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                timer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">AfterFunc</span><span class="__shiki_140thh">(batchSendDeadline, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">                    s.mutex.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(batch) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                        s.</span><span class="__shiki_1t8gfj">sendBatch</span><span class="__shiki_140thh">(client, url, batch)</span></span>
<span class="line"><span class="__shiki_140thh">                        batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                    timer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">                    s.mutex.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                })</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="三、远程读取协议-remote-read" tabindex="-1">三、远程读取协议（Remote Read） <a class="header-anchor" href="#三、远程读取协议-remote-read" aria-label="Permalink to &quot;三、远程读取协议（Remote Read）&quot;">​</a></h2><h3 id="_3-1-协议架构" tabindex="-1">3.1 协议架构 <a class="header-anchor" href="#_3-1-协议架构" aria-label="Permalink to &quot;3.1 协议架构&quot;">​</a></h3><h4 id="_3-1-1-数据流模型" tabindex="-1">3.1.1 数据流模型 <a class="header-anchor" href="#_3-1-1-数据流模型" aria-label="Permalink to &quot;3.1.1 数据流模型&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">查询流程:</span></span>
<span class="line"><span class="__shiki_wvjl67">┌──────────────┐   查询解析   ┌──────────────┐   构建请求   ┌──────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│  查询引擎     │───────────▶│ 远程读处理器 │───────────▶│ 远程存储     │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────┘             └──────────────┘             └──────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">       ▲                            │                            │</span></span>
<span class="line"><span class="__shiki_wvjl67">       │                            │                            │</span></span>
<span class="line"><span class="__shiki_wvjl67">       │                            ▼                            │</span></span>
<span class="line"><span class="__shiki_wvjl67">┌──────────────┐            ┌──────────────┐                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  结果合并     │◀───────────│ 响应处理     │◀───────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────┘            └──────────────┘</span></span></code></pre></div><h4 id="_3-1-2-配置语法" tabindex="-1">3.1.2 配置语法 <a class="header-anchor" href="#_3-1-2-配置语法" aria-label="Permalink to &quot;3.1.2 配置语法&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">remote_read</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://remote-storage:8086/api/v1/prom/read&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基本认证</span></span>
<span class="line"><span class="__shiki_17hn0y">    basic_auth</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      username</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">admin</span></span>
<span class="line"><span class="__shiki_17hn0y">      password</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">secret</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 读取配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    read_recent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">        # 是否从本地读取最近数据</span></span>
<span class="line"><span class="__shiki_17hn0y">    required_matchers</span><span class="__shiki_140thh">:       </span><span class="__shiki_21nrsd"># 必需的标签匹配器</span></span>
<span class="line"><span class="__shiki_17hn0y">      job</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;prometheus&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 超时配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 过滤器</span></span>
<span class="line"><span class="__shiki_17hn0y">    filter_external_labels</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # TLS配置（同remote_write）</span></span>
<span class="line"><span class="__shiki_17hn0y">    tls_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      ca_file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/path/to/ca.crt</span></span></code></pre></div><h3 id="_3-2-协议详解" tabindex="-1">3.2 协议详解 <a class="header-anchor" href="#_3-2-协议详解" aria-label="Permalink to &quot;3.2 协议详解&quot;">​</a></h3><h4 id="_3-2-1-http接口规范" tabindex="-1">3.2.1 HTTP接口规范 <a class="header-anchor" href="#_3-2-1-http接口规范" aria-label="Permalink to &quot;3.2.1 HTTP接口规范&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 请求方法</span></span>
<span class="line"><span class="__shiki_1t8gfj">POST</span><span class="__shiki_mdbnqw"> /api/v1/read</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 请求头</span></span>
<span class="line"><span class="__shiki_1t8gfj">Content-Type:</span><span class="__shiki_mdbnqw"> application/x-protobuf</span></span>
<span class="line"><span class="__shiki_1t8gfj">Content-Encoding:</span><span class="__shiki_mdbnqw"> snappy</span></span>
<span class="line"><span class="__shiki_1t8gfj">Accept:</span><span class="__shiki_mdbnqw"> application/x-protobuf</span></span>
<span class="line"><span class="__shiki_1t8gfj">Accept-Encoding:</span><span class="__shiki_mdbnqw"> snappy</span></span>
<span class="line"><span class="__shiki_1t8gfj">X-Prometheus-Remote-Read-Version:</span><span class="__shiki_dzsirb"> 0.1.0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 请求体</span></span>
<span class="line"><span class="__shiki_1t8gfj">Protocol</span><span class="__shiki_mdbnqw"> Buffers编码</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_mdbnqw"> Snappy压缩的ReadRequest</span></span></code></pre></div><h4 id="_3-2-2-protocol-buffers消息定义" tabindex="-1">3.2.2 Protocol Buffers消息定义 <a class="header-anchor" href="#_3-2-2-protocol-buffers消息定义" aria-label="Permalink to &quot;3.2.2 Protocol Buffers消息定义&quot;">​</a></h4><h5 id="readrequest消息" tabindex="-1">ReadRequest消息 <a class="header-anchor" href="#readrequest消息" aria-label="Permalink to &quot;ReadRequest消息&quot;">​</a></h5><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> ReadRequest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> Query</span><span class="__shiki_140thh"> queries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 接受的响应类型</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> ReadHints.AcceptableResponseTypes</span><span class="__shiki_140thh"> accepted_response_types </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> Query</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> start_timestamp_ms </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;    </span><span class="__shiki_21nrsd">// 开始时间戳</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> end_timestamp_ms </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;      </span><span class="__shiki_21nrsd">// 结束时间戳</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> LabelMatcher</span><span class="__shiki_140thh"> matchers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">// 标签匹配器</span></span>
<span class="line"><span class="__shiki_1itgoe">  ReadHints</span><span class="__shiki_140thh"> hints </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;             </span><span class="__shiki_21nrsd">// 查询提示</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> LabelMatcher</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  enum</span><span class="__shiki_1t8gfj"> Type</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    EQ  </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">// 等于</span></span>
<span class="line"><span class="__shiki_140thh">    NEQ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">// 不等于</span></span>
<span class="line"><span class="__shiki_140thh">    RE  </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">// 正则匹配</span></span>
<span class="line"><span class="__shiki_140thh">    NRE </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">// 正则不匹配</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_1itgoe">  Type</span><span class="__shiki_140thh"> type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> ReadHints</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> step_ms </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;    </span><span class="__shiki_21nrsd">// 查询步长</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> func </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;      </span><span class="__shiki_21nrsd">// 聚合函数</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> start_ms </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;   </span><span class="__shiki_21nrsd">// 提示开始时间</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> end_ms </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;     </span><span class="__shiki_21nrsd">// 提示结束时间</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh"> grouping </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">// 分组标签</span></span>
<span class="line"><span class="__shiki_1itgoe">  bool</span><span class="__shiki_140thh"> by </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">;          </span><span class="__shiki_21nrsd">// 是否按分组</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> range_ms </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 7</span><span class="__shiki_140thh">;   </span><span class="__shiki_21nrsd">// 范围查询长度</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  enum</span><span class="__shiki_1t8gfj"> AcceptableResponseTypes</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    SAMPLES </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;                </span><span class="__shiki_21nrsd">// 原始样本</span></span>
<span class="line"><span class="__shiki_140thh">    STREAMED_XOR_CHUNKS </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;    </span><span class="__shiki_21nrsd">// 流式XOR块</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> ReadResponse</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> QueryResult</span><span class="__shiki_140thh"> results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> QueryResult</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 可能包含Timeseries或StreamedChunks</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> TimeSeries</span><span class="__shiki_140thh"> timeseries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> StreamedChunksSeries</span><span class="__shiki_140thh"> streamed_chunks_series </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> StreamedChunksSeries</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> Label</span><span class="__shiki_140thh"> labels </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> StreamedChunk</span><span class="__shiki_140thh"> chunks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> StreamedChunk</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> min_time_ms </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> max_time_ms </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // XOR编码的块数据</span></span>
<span class="line"><span class="__shiki_1itgoe">  bytes</span><span class="__shiki_140thh"> data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 样本类型</span></span>
<span class="line"><span class="__shiki_1itgoe">  enum</span><span class="__shiki_1t8gfj"> Encoding</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    UNKNOWN </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    XOR </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_1itgoe">  Encoding</span><span class="__shiki_140thh"> type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-查询处理流程" tabindex="-1">3.3 查询处理流程 <a class="header-anchor" href="#_3-3-查询处理流程" aria-label="Permalink to &quot;3.3 查询处理流程&quot;">​</a></h3><h4 id="_3-3-1-查询构建器" tabindex="-1">3.3.1 查询构建器 <a class="header-anchor" href="#_3-3-1-查询构建器" aria-label="Permalink to &quot;3.3.1 查询构建器&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> RemoteReadQuerier</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    client    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span></span>
<span class="line"><span class="__shiki_140thh">    url       </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    config    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">config</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RemoteReadConfig</span></span>
<span class="line"><span class="__shiki_140thh">    filters   []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">relabel</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Config</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">q </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">RemoteReadQuerier</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    sortSeries</span><span class="__shiki_1itgoe"> bool</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    hints</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">storage</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">SelectHints</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    matchers</span><span class="__shiki_1itgoe"> ...*</span><span class="__shiki_1t8gfj">labels</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Matcher</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">storage</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">SeriesSet</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 应用过滤器</span></span>
<span class="line"><span class="__shiki_140thh">    filteredMatchers </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> q.</span><span class="__shiki_1t8gfj">applyFilters</span><span class="__shiki_140thh">(matchers)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 构建查询请求</span></span>
<span class="line"><span class="__shiki_140thh">    req </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> q.</span><span class="__shiki_1t8gfj">buildReadRequest</span><span class="__shiki_140thh">(hints, filteredMatchers)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 发送查询</span></span>
<span class="line"><span class="__shiki_140thh">    resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> q.</span><span class="__shiki_1t8gfj">executeQuery</span><span class="__shiki_140thh">(req)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> storage.</span><span class="__shiki_1t8gfj">ErrSeriesSet</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 转换响应为SeriesSet</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> q.</span><span class="__shiki_1t8gfj">convertResponse</span><span class="__shiki_140thh">(resp)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">q </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">RemoteReadQuerier</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">buildReadRequest</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    hints</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">storage</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">SelectHints</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    matchers</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">labels</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Matcher</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ReadRequest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 构建标签匹配器</span></span>
<span class="line"><span class="__shiki_140thh">    pbMatchers </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LabelMatcher</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(matchers))</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, m </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> matchers {</span></span>
<span class="line"><span class="__shiki_140thh">        pbMatchers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(pbMatchers, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LabelMatcher</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Type:  prompb.</span><span class="__shiki_1t8gfj">LabelMatcher_Type</span><span class="__shiki_140thh">(m.Type),</span></span>
<span class="line"><span class="__shiki_140thh">            Name:  m.Name,</span></span>
<span class="line"><span class="__shiki_140thh">            Value: m.Value,</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 构建查询提示</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> readHints </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ReadHints</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> hints </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        readHints </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ReadHints</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            StepMs:   hints.Step,</span></span>
<span class="line"><span class="__shiki_140thh">            Func:     hints.Func,</span></span>
<span class="line"><span class="__shiki_140thh">            StartMs:  hints.Start,</span></span>
<span class="line"><span class="__shiki_140thh">            EndMs:    hints.End,</span></span>
<span class="line"><span class="__shiki_140thh">            RangeMs:  hints.Range,</span></span>
<span class="line"><span class="__shiki_140thh">            Grouping: hints.Grouping,</span></span>
<span class="line"><span class="__shiki_140thh">            By:       hints.By,</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 构建查询</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Query</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        StartTimestampMs: hints.Start,</span></span>
<span class="line"><span class="__shiki_140thh">        EndTimestampMs:   hints.End,</span></span>
<span class="line"><span class="__shiki_140thh">        Matchers:         pbMatchers,</span></span>
<span class="line"><span class="__shiki_140thh">        Hints:            readHints,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ReadRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Queries: []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Query</span><span class="__shiki_140thh">{query},</span></span>
<span class="line"><span class="__shiki_140thh">        AcceptedResponseTypes: []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ReadHints_ResponseType</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            prompb.ReadHints_STREAMED_XOR_CHUNKS,</span></span>
<span class="line"><span class="__shiki_140thh">            prompb.ReadHints_SAMPLES,</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-3-2-响应处理" tabindex="-1">3.3.2 响应处理 <a class="header-anchor" href="#_3-3-2-响应处理" aria-label="Permalink to &quot;3.3.2 响应处理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">q </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">RemoteReadQuerier</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">convertResponse</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resp</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ReadResponse</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">storage</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">SeriesSet</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> series []</span><span class="__shiki_1t8gfj">storage</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Series</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, result </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> resp.Results {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 处理普通时间序列</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, ts </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> result.Timeseries {</span></span>
<span class="line"><span class="__shiki_140thh">            series </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(series, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">remoteSeries</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                labels:  </span><span class="__shiki_1t8gfj">convertLabels</span><span class="__shiki_140thh">(ts.Labels),</span></span>
<span class="line"><span class="__shiki_140thh">                samples: </span><span class="__shiki_1t8gfj">convertSamples</span><span class="__shiki_140thh">(ts.Samples),</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 处理流式块</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, streamed </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> result.StreamedChunksSeries {</span></span>
<span class="line"><span class="__shiki_140thh">            series </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(series, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">streamedSeries</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                labels: </span><span class="__shiki_1t8gfj">convertLabels</span><span class="__shiki_140thh">(streamed.Labels),</span></span>
<span class="line"><span class="__shiki_140thh">                chunks: streamed.Chunks,</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> newRemoteSeriesSet</span><span class="__shiki_140thh">(series)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> remoteSeries</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    labels  </span><span class="__shiki_1t8gfj">labels</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Labels</span></span>
<span class="line"><span class="__shiki_140thh">    samples []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Sample</span></span>
<span class="line"><span class="__shiki_140thh">    idx     </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">remoteSeries</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Iterator</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">chunkenc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Iterator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">remoteSeriesIterator</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        samples: s.samples,</span></span>
<span class="line"><span class="__shiki_140thh">        idx:     </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> remoteSeriesIterator</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    samples []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Sample</span></span>
<span class="line"><span class="__shiki_140thh">    idx     </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">it </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">remoteSeriesIterator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Next</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    it.idx</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> it.idx </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(it.samples)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">it </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">remoteSeriesIterator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">At</span><span class="__shiki_140thh">() (</span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    sample </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> it.samples[it.idx]</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> sample.Timestamp, sample.Value</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-4-流式块传输" tabindex="-1">3.4 流式块传输 <a class="header-anchor" href="#_3-4-流式块传输" aria-label="Permalink to &quot;3.4 流式块传输&quot;">​</a></h3><h4 id="_3-4-1-块流式编码" tabindex="-1">3.4.1 块流式编码 <a class="header-anchor" href="#_3-4-1-块流式编码" aria-label="Permalink to &quot;3.4.1 块流式编码&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> StreamedChunkEncoder</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    buf         </span><span class="__shiki_1t8gfj">bytes</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Buffer</span></span>
<span class="line"><span class="__shiki_140thh">    chunkWriter </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">chunkenc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">XORChunk</span></span>
<span class="line"><span class="__shiki_140thh">    appender    </span><span class="__shiki_1t8gfj">chunkenc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Appender</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    minTime, maxTime </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    samples          </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">StreamedChunkEncoder</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">WriteSample</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">t</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">v</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> e.chunkWriter </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建新chunk</span></span>
<span class="line"><span class="__shiki_140thh">        e.chunkWriter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> chunkenc.</span><span class="__shiki_1t8gfj">NewXORChunk</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        e.appender, _ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> e.chunkWriter.</span><span class="__shiki_1t8gfj">Appender</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        e.minTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> t</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 追加样本</span></span>
<span class="line"><span class="__shiki_140thh">    e.appender.</span><span class="__shiki_1t8gfj">Append</span><span class="__shiki_140thh">(t, v)</span></span>
<span class="line"><span class="__shiki_140thh">    e.samples</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">    e.maxTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> t</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否应该完成当前chunk</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> e.samples </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> maxSamplesPerChunk </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">       t</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">e.minTime </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> maxChunkDuration {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> e.</span><span class="__shiki_1t8gfj">finalizeChunk</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">StreamedChunkEncoder</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">finalizeChunk</span><span class="__shiki_140thh">() (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StreamedChunk</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> e.chunkWriter </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取编码数据</span></span>
<span class="line"><span class="__shiki_140thh">    data </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> e.chunkWriter.</span><span class="__shiki_1t8gfj">Bytes</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    chunk </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StreamedChunk</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        MinTimeMs: e.minTime,</span></span>
<span class="line"><span class="__shiki_140thh">        MaxTimeMs: e.maxTime,</span></span>
<span class="line"><span class="__shiki_140thh">        Data:      data,</span></span>
<span class="line"><span class="__shiki_140thh">        Type:      prompb.StreamedChunk_XOR,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 重置编码器</span></span>
<span class="line"><span class="__shiki_140thh">    e.chunkWriter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    e.appender </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    e.minTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    e.maxTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    e.samples </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> chunk, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、高级特性与优化" tabindex="-1">四、高级特性与优化 <a class="header-anchor" href="#四、高级特性与优化" aria-label="Permalink to &quot;四、高级特性与优化&quot;">​</a></h2><h3 id="_4-1-元数据传输" tabindex="-1">4.1 元数据传输 <a class="header-anchor" href="#_4-1-元数据传输" aria-label="Permalink to &quot;4.1 元数据传输&quot;">​</a></h3><h4 id="_4-1-1-元数据同步" tabindex="-1">4.1.1 元数据同步 <a class="header-anchor" href="#_4-1-1-元数据同步" aria-label="Permalink to &quot;4.1.1 元数据同步&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> MetadataWriter</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    client </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span></span>
<span class="line"><span class="__shiki_140thh">    url    </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    cache  </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">metadataCache</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">w </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MetadataWriter</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">syncMetadata</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">metadata</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MetricMetadata</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 过滤已发送的元数据</span></span>
<span class="line"><span class="__shiki_140thh">    newMetadata </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> w.</span><span class="__shiki_1t8gfj">filterNewMetadata</span><span class="__shiki_140thh">(metadata)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(newMetadata) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 构建元数据请求</span></span>
<span class="line"><span class="__shiki_140thh">    req </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WriteRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Metadata: newMetadata,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 编码和发送</span></span>
<span class="line"><span class="__shiki_140thh">    data, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> proto.</span><span class="__shiki_1t8gfj">Marshal</span><span class="__shiki_140thh">(req)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    compressed </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> snappy.</span><span class="__shiki_1t8gfj">Encode</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">, data)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    httpReq, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> http.</span><span class="__shiki_1t8gfj">NewRequest</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;POST&quot;</span><span class="__shiki_140thh">, w.url, bytes.</span><span class="__shiki_1t8gfj">NewReader</span><span class="__shiki_140thh">(compressed))</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    httpReq.Header.</span><span class="__shiki_1t8gfj">Set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;application/x-protobuf&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    httpReq.Header.</span><span class="__shiki_1t8gfj">Set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Content-Encoding&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;snappy&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    httpReq.Header.</span><span class="__shiki_1t8gfj">Set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;X-Prometheus-Remote-Write-Version&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;0.1.0&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> w.client.</span><span class="__shiki_1t8gfj">Do</span><span class="__shiki_140thh">(httpReq)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> resp.Body.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 更新缓存</span></span>
<span class="line"><span class="__shiki_140thh">    w.cache.</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">(newMetadata)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-示例支持-exemplars" tabindex="-1">4.2 示例支持（Exemplars） <a class="header-anchor" href="#_4-2-示例支持-exemplars" aria-label="Permalink to &quot;4.2 示例支持（Exemplars）&quot;">​</a></h3><h4 id="_4-2-1-示例数据结构" tabindex="-1">4.2.1 示例数据结构 <a class="header-anchor" href="#_4-2-1-示例数据结构" aria-label="Permalink to &quot;4.2.1 示例数据结构&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ExemplarStorage</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    AddExemplar</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ref</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">e</span><span class="__shiki_1t8gfj"> exemplar</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Exemplar</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_1t8gfj">    GetExemplars</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ref</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">start</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">end</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) []</span><span class="__shiki_1t8gfj">exemplar</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Exemplar</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> encodeExemplars</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ref</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">exs</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">exemplar</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Exemplar</span><span class="__shiki_140thh">) []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Exemplar</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    pbExemplars </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Exemplar</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(exs))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, ex </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> exs {</span></span>
<span class="line"><span class="__shiki_140thh">        pbExemplars </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(pbExemplars, </span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Exemplar</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Labels: </span><span class="__shiki_1t8gfj">convertLabels</span><span class="__shiki_140thh">(ex.Labels),</span></span>
<span class="line"><span class="__shiki_140thh">            Value:  ex.Value,</span></span>
<span class="line"><span class="__shiki_140thh">            Timestamp: ex.Ts,</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> pbExemplars</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-性能优化策略" tabindex="-1">4.3 性能优化策略 <a class="header-anchor" href="#_4-3-性能优化策略" aria-label="Permalink to &quot;4.3 性能优化策略&quot;">​</a></h3><h4 id="_4-3-1-连接池优化" tabindex="-1">4.3.1 连接池优化 <a class="header-anchor" href="#_4-3-1-连接池优化" aria-label="Permalink to &quot;4.3.1 连接池优化&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ConnectionPool</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    clients []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span></span>
<span class="line"><span class="__shiki_140thh">    mu      </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">    idx     </span><span class="__shiki_1itgoe">uint32</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 连接配置</span></span>
<span class="line"><span class="__shiki_140thh">    maxIdleConns        </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    maxIdleConnsPerHost </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    idleConnTimeout     </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">p </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ConnectionPool</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    p.mu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> p.mu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 轮询获取客户端</span></span>
<span class="line"><span class="__shiki_140thh">    idx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> atomic.</span><span class="__shiki_1t8gfj">AddUint32</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">p.idx, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> p.clients[idx</span><span class="__shiki_1itgoe">%uint32</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(p.clients))]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> NewConnectionPool</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">size</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">cfg</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">config</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">HTTPClientConfig</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ConnectionPool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    pool </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">ConnectionPool</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        clients: </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span><span class="__shiki_140thh">, size),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> size; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        pool.clients[i] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Transport: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Transport</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                MaxIdleConns:        cfg.MaxIdleConns,</span></span>
<span class="line"><span class="__shiki_140thh">                MaxIdleConnsPerHost: cfg.MaxIdleConnsPerHost,</span></span>
<span class="line"><span class="__shiki_140thh">                IdleConnTimeout:     cfg.IdleConnTimeout,</span></span>
<span class="line"><span class="__shiki_140thh">                TLSClientConfig:     cfg.TLSConfig,</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 启用HTTP/2</span></span>
<span class="line"><span class="__shiki_140thh">                ForceAttemptHTTP2: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            Timeout: cfg.Timeout,</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> pool</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-3-2-压缩优化" tabindex="-1">4.3.2 压缩优化 <a class="header-anchor" href="#_4-3-2-压缩优化" aria-label="Permalink to &quot;4.3.2 压缩优化&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> CompressionPool</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    snappyWriters </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Pool</span></span>
<span class="line"><span class="__shiki_140thh">    snappyReaders </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Pool</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">p </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">CompressionPool</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Compress</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">) ([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取或创建writer</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> w </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">snappyWriter</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> v </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> p.snappyWriters.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(); v </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        w </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">snappyWriter</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        w.</span><span class="__shiki_1t8gfj">Reset</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        w </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">snappyWriter</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> p.snappyWriters.</span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(w)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 压缩数据</span></span>
<span class="line"><span class="__shiki_140thh">    n, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> w.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">(data)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    compressed </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, n)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    copy</span><span class="__shiki_140thh">(compressed, w.</span><span class="__shiki_1t8gfj">Bytes</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> compressed, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> snappyWriter</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    buf </span><span class="__shiki_1t8gfj">bytes</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Buffer</span></span>
<span class="line"><span class="__shiki_140thh">    enc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">snappy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Writer</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">w </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">snappyWriter</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> w.enc </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        w.enc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> snappy.</span><span class="__shiki_1t8gfj">NewBufferedWriter</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">w.buf)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> w.enc.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">(data)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">w </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">snappyWriter</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Reset</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    w.buf.</span><span class="__shiki_1t8gfj">Reset</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> w.enc </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        w.enc.</span><span class="__shiki_1t8gfj">Reset</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">w.buf)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">w </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">snappyWriter</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Bytes</span><span class="__shiki_140thh">() []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> w.enc </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        w.enc.</span><span class="__shiki_1t8gfj">Flush</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> w.buf.</span><span class="__shiki_1t8gfj">Bytes</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、实现远程存储适配器" tabindex="-1">五、实现远程存储适配器 <a class="header-anchor" href="#五、实现远程存储适配器" aria-label="Permalink to &quot;五、实现远程存储适配器&quot;">​</a></h2><h3 id="_5-1-服务端实现" tabindex="-1">5.1 服务端实现 <a class="header-anchor" href="#_5-1-服务端实现" aria-label="Permalink to &quot;5.1 服务端实现&quot;">​</a></h3><h4 id="_5-1-1-写入处理器" tabindex="-1">5.1.1 写入处理器 <a class="header-anchor" href="#_5-1-1-写入处理器" aria-label="Permalink to &quot;5.1.1 写入处理器&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WriteHandler</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    storage </span><span class="__shiki_1t8gfj">StorageBackend</span></span>
<span class="line"><span class="__shiki_140thh">    metrics </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WriteMetrics</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">h </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WriteHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1t8gfj"> http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 验证请求</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> r.Method </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw"> &quot;POST&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        http.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;Method not allowed&quot;</span><span class="__shiki_140thh">, http.StatusMethodNotAllowed)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> r.Header.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw"> &quot;application/x-protobuf&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        http.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;Unsupported content type&quot;</span><span class="__shiki_140thh">, http.StatusUnsupportedMediaType)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 读取和验证数据</span></span>
<span class="line"><span class="__shiki_140thh">    body, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> io.</span><span class="__shiki_1t8gfj">ReadAll</span><span class="__shiki_140thh">(r.Body)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        http.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;Failed to read body&quot;</span><span class="__shiki_140thh">, http.StatusBadRequest)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. Snappy解压</span></span>
<span class="line"><span class="__shiki_140thh">    data, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> snappy.</span><span class="__shiki_1t8gfj">Decode</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">, body)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        http.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;Invalid snappy compressed data&quot;</span><span class="__shiki_140thh">, http.StatusBadRequest)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. Protocol Buffers解码</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> req </span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WriteRequest</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> proto.</span><span class="__shiki_1t8gfj">Unmarshal</span><span class="__shiki_140thh">(data, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">req); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        http.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;Invalid protobuf data&quot;</span><span class="__shiki_140thh">, http.StatusBadRequest)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 处理时间序列</span></span>
<span class="line"><span class="__shiki_140thh">    h.metrics.samplesReceived.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">countSamples</span><span class="__shiki_140thh">(req.Timeseries)))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> h.storage.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">(req.Timeseries); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        h.metrics.writeErrors.</span><span class="__shiki_1t8gfj">Inc</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        http.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;Write failed&quot;</span><span class="__shiki_140thh">, http.StatusInternalServerError)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 6. 处理元数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(req.Metadata) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> h.storage.</span><span class="__shiki_1t8gfj">WriteMetadata</span><span class="__shiki_140thh">(req.Metadata); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            log.</span><span class="__shiki_1t8gfj">Warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Failed to write metadata&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;err&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 7. 返回成功</span></span>
<span class="line"><span class="__shiki_140thh">    w.</span><span class="__shiki_1t8gfj">WriteHeader</span><span class="__shiki_140thh">(http.StatusNoContent)</span></span>
<span class="line"><span class="__shiki_140thh">    h.metrics.writeSuccess.</span><span class="__shiki_1t8gfj">Inc</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-1-2-读取处理器" tabindex="-1">5.1.2 读取处理器 <a class="header-anchor" href="#_5-1-2-读取处理器" aria-label="Permalink to &quot;5.1.2 读取处理器&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ReadHandler</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    storage </span><span class="__shiki_1t8gfj">Queryable</span></span>
<span class="line"><span class="__shiki_140thh">    metrics </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ReadMetrics</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">h </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ReadHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1t8gfj"> http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 验证请求</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> r.Method </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw"> &quot;POST&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        http.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;Method not allowed&quot;</span><span class="__shiki_140thh">, http.StatusMethodNotAllowed)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 读取请求数据</span></span>
<span class="line"><span class="__shiki_140thh">    body, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> io.</span><span class="__shiki_1t8gfj">ReadAll</span><span class="__shiki_140thh">(r.Body)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        http.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;Failed to read body&quot;</span><span class="__shiki_140thh">, http.StatusBadRequest)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 解压和解码</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> data []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> r.Header.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Content-Encoding&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;snappy&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        data, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> snappy.</span><span class="__shiki_1t8gfj">Decode</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">, body)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            http.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;Invalid snappy compressed data&quot;</span><span class="__shiki_140thh">, http.StatusBadRequest)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> body</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> req </span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ReadRequest</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> proto.</span><span class="__shiki_1t8gfj">Unmarshal</span><span class="__shiki_140thh">(data, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">req); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        http.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;Invalid protobuf data&quot;</span><span class="__shiki_140thh">, http.StatusBadRequest)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 执行查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> results []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">QueryResult</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, query </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> req.Queries {</span></span>
<span class="line"><span class="__shiki_140thh">        result, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> h.</span><span class="__shiki_1t8gfj">executeQuery</span><span class="__shiki_140thh">(query)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            http.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(w, err.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(), http.StatusInternalServerError)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(results, result)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 构建响应</span></span>
<span class="line"><span class="__shiki_140thh">    resp </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ReadResponse</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Results: results,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 6. 编码和压缩响应</span></span>
<span class="line"><span class="__shiki_140thh">    data, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> proto.</span><span class="__shiki_1t8gfj">Marshal</span><span class="__shiki_140thh">(resp)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        http.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;Failed to marshal response&quot;</span><span class="__shiki_140thh">, http.StatusInternalServerError)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 根据请求支持的编码类型选择压缩方式</span></span>
<span class="line"><span class="__shiki_140thh">    acceptEncoding </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.Header.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Accept-Encoding&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> strings.</span><span class="__shiki_1t8gfj">Contains</span><span class="__shiki_140thh">(acceptEncoding, </span><span class="__shiki_mdbnqw">&quot;snappy&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        compressed </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> snappy.</span><span class="__shiki_1t8gfj">Encode</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">, data)</span></span>
<span class="line"><span class="__shiki_140thh">        w.</span><span class="__shiki_1t8gfj">Header</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Content-Encoding&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;snappy&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> compressed</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    w.</span><span class="__shiki_1t8gfj">Header</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;application/x-protobuf&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    w.</span><span class="__shiki_1t8gfj">WriteHeader</span><span class="__shiki_140thh">(http.StatusOK)</span></span>
<span class="line"><span class="__shiki_140thh">    w.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">(data)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    h.metrics.readSuccess.</span><span class="__shiki_1t8gfj">Inc</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">h </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ReadHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">executeQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">q</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Query</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">QueryResult</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 转换标签匹配器</span></span>
<span class="line"><span class="__shiki_140thh">    matchers </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">labels</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Matcher</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(q.Matchers))</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, m </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> q.Matchers {</span></span>
<span class="line"><span class="__shiki_140thh">        matcher, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> labels.</span><span class="__shiki_1t8gfj">NewMatcher</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            labels.</span><span class="__shiki_1t8gfj">MatchType</span><span class="__shiki_140thh">(m.Type),</span></span>
<span class="line"><span class="__shiki_140thh">            m.Name,</span></span>
<span class="line"><span class="__shiki_140thh">            m.Value,</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        matchers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(matchers, matcher)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行查询</span></span>
<span class="line"><span class="__shiki_140thh">    seriesSet </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> h.storage.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(q.Hints, matchers</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 转换结果</span></span>
<span class="line"><span class="__shiki_140thh">    result </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">QueryResult</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> seriesSet.</span><span class="__shiki_1t8gfj">Next</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        series </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> seriesSet.</span><span class="__shiki_1t8gfj">At</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 转换标签</span></span>
<span class="line"><span class="__shiki_140thh">        lbs </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> series.</span><span class="__shiki_1t8gfj">Labels</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        pbLabels </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Label</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, lbs.</span><span class="__shiki_1t8gfj">Len</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        lbs.</span><span class="__shiki_1t8gfj">Range</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">l</span><span class="__shiki_1t8gfj"> labels</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Label</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            pbLabels </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(pbLabels, </span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Label</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                Name:  l.Name,</span></span>
<span class="line"><span class="__shiki_140thh">                Value: l.Value,</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 获取数据</span></span>
<span class="line"><span class="__shiki_140thh">        it </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> series.</span><span class="__shiki_1t8gfj">Iterator</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        var</span><span class="__shiki_140thh"> samples []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Sample</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> it.</span><span class="__shiki_1t8gfj">Next</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">            t, v </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> it.</span><span class="__shiki_1t8gfj">At</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            samples </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(samples, </span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Sample</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                Timestamp: t,</span></span>
<span class="line"><span class="__shiki_140thh">                Value:     v,</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        result.Timeseries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(result.Timeseries, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TimeSeries</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Labels:  pbLabels,</span></span>
<span class="line"><span class="__shiki_140thh">            Samples: samples,</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result, seriesSet.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-存储后端接口" tabindex="-1">5.2 存储后端接口 <a class="header-anchor" href="#_5-2-存储后端接口" aria-label="Permalink to &quot;5.2 存储后端接口&quot;">​</a></h3><h4 id="_5-2-1-存储接口定义" tabindex="-1">5.2.1 存储接口定义 <a class="header-anchor" href="#_5-2-1-存储接口定义" aria-label="Permalink to &quot;5.2.1 存储接口定义&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> StorageBackend</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 写入接口</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Write</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">series</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TimeSeries</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_1t8gfj">    WriteMetadata</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">metadata</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MetricMetadata</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 读取接口</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Queryable</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Queryable</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">hints</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ReadHints</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">matchers</span><span class="__shiki_1itgoe"> ...*</span><span class="__shiki_1t8gfj">labels</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Matcher</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">SeriesSet</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> SeriesSet</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Next</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_1t8gfj">    At</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">Series</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Err</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Series</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Labels</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">labels</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Labels</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Iterator</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">SeriesIterator</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> SeriesIterator</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Next</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_1t8gfj">    At</span><span class="__shiki_140thh">() (</span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Err</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-2-2-内存存储示例" tabindex="-1">5.2.2 内存存储示例 <a class="header-anchor" href="#_5-2-2-内存存储示例" aria-label="Permalink to &quot;5.2.2 内存存储示例&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> MemoryStorage</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    data </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TimeSeriesData</span></span>
<span class="line"><span class="__shiki_140thh">    mu   </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TimeSeriesData</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    labels  </span><span class="__shiki_1t8gfj">labels</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Labels</span></span>
<span class="line"><span class="__shiki_140thh">    samples []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Sample</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MemoryStorage</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">series</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TimeSeries</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    s.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> s.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, ts </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> series {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 生成唯一标识</span></span>
<span class="line"><span class="__shiki_140thh">        key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> seriesKey</span><span class="__shiki_140thh">(ts.Labels)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> existing, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.data[key]; ok {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 合并现有数据</span></span>
<span class="line"><span class="__shiki_140thh">            existing.samples </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mergeSamples</span><span class="__shiki_140thh">(existing.samples, ts.Samples)</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 创建新序列</span></span>
<span class="line"><span class="__shiki_140thh">            s.data[key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">TimeSeriesData</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                labels:  </span><span class="__shiki_1t8gfj">convertLabels</span><span class="__shiki_140thh">(ts.Labels),</span></span>
<span class="line"><span class="__shiki_140thh">                samples: ts.Samples,</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MemoryStorage</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    hints</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ReadHints</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    matchers</span><span class="__shiki_1itgoe"> ...*</span><span class="__shiki_1t8gfj">labels</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Matcher</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">SeriesSet</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    s.mu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> s.mu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> matched []</span><span class="__shiki_1t8gfj">Series</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, ts </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> s.data {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 应用标签匹配器</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">matchLabels</span><span class="__shiki_140thh">(ts.labels, matchers) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 应用时间范围过滤</span></span>
<span class="line"><span class="__shiki_140thh">        filtered </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> filterSamplesByTime</span><span class="__shiki_140thh">(ts.samples, hints)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(filtered) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        matched </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(matched, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">memorySeries</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            labels:  ts.labels,</span></span>
<span class="line"><span class="__shiki_140thh">            samples: filtered,</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> newMemorySeriesSet</span><span class="__shiki_140thh">(matched)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、性能调优与监控" tabindex="-1">六、性能调优与监控 <a class="header-anchor" href="#六、性能调优与监控" aria-label="Permalink to &quot;六、性能调优与监控&quot;">​</a></h2><h3 id="_6-1-监控指标定义" tabindex="-1">6.1 监控指标定义 <a class="header-anchor" href="#_6-1-监控指标定义" aria-label="Permalink to &quot;6.1 监控指标定义&quot;">​</a></h3><h4 id="_6-1-1-客户端监控指标" tabindex="-1">6.1.1 客户端监控指标 <a class="header-anchor" href="#_6-1-1-客户端监控指标" aria-label="Permalink to &quot;6.1.1 客户端监控指标&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> RemoteWriteMetrics</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    samplesQueued        </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Gauge</span></span>
<span class="line"><span class="__shiki_140thh">    samplesDropped       </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    samplesSent          </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    samplesFailed        </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    requestDuration      </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    requestSizeBytes     </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    responseSizeBytes    </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    shardQueueLength     </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">GaugeVec</span></span>
<span class="line"><span class="__shiki_140thh">    shardCapacity        </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">GaugeVec</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> RemoteReadMetrics</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    queriesTotal        </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    queriesFailed       </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    samplesReturned     </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    requestDuration     </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    cacheHits          </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    cacheMisses        </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_6-1-2-prometheus告警规则" tabindex="-1">6.1.2 Prometheus告警规则 <a class="header-anchor" href="#_6-1-2-prometheus告警规则" aria-label="Permalink to &quot;6.1.2 Prometheus告警规则&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">remote-storage.rules</span></span>
<span class="line"><span class="__shiki_17hn0y">    rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 远程写入告警</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RemoteWriteQueueHigh</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prometheus_remote_storage_sent_bytes_total - prometheus_remote_storage_samples_in_total &gt; 10000</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RemoteWriteErrorsHigh</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rate(prometheus_remote_storage_failed_samples_total[5m]) &gt; 0.1</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 远程读取告警</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RemoteReadLatencyHigh</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">histogram_quantile(0.95, rate(prometheus_remote_storage_read_request_duration_seconds_bucket[5m])) &gt; 5</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span></code></pre></div><h3 id="_6-2-性能调优参数" tabindex="-1">6.2 性能调优参数 <a class="header-anchor" href="#_6-2-性能调优参数" aria-label="Permalink to &quot;6.2 性能调优参数&quot;">​</a></h3><h4 id="_6-2-1-最佳实践配置" tabindex="-1">6.2.1 最佳实践配置 <a class="header-anchor" href="#_6-2-1-最佳实践配置" aria-label="Permalink to &quot;6.2.1 最佳实践配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">remote_write</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://remote:9090/api/v1/write&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    queue_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 根据负载调整分片数</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 公式: max_shards = max(1, samples_per_second / 1000)</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_shards</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">      min_shards</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 批次大小优化</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 网络延迟低: 500-1000</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 网络延迟高: 100-500</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_samples_per_send</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">500</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 超时配置</span></span>
<span class="line"><span class="__shiki_17hn0y">      batch_send_deadline</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5s</span></span>
<span class="line"><span class="__shiki_17hn0y">      min_backoff</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100ms</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_backoff</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10s</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 队列容量</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 公式: capacity = max_samples_per_send * max_shards * 10</span></span>
<span class="line"><span class="__shiki_17hn0y">      capacity</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">500000</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 网络优化</span></span>
<span class="line"><span class="__shiki_17hn0y">    http_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      idle_conn_timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">90s</span></span>
<span class="line"><span class="__shiki_17hn0y">      response_header_timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_17hn0y">      tls_handshake_timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10s</span></span>
<span class="line"><span class="__shiki_17hn0y">      expect_continue_timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1s</span></span></code></pre></div><h2 id="七、实际应用场景" tabindex="-1">七、实际应用场景 <a class="header-anchor" href="#七、实际应用场景" aria-label="Permalink to &quot;七、实际应用场景&quot;">​</a></h2><h3 id="_7-1-长期存储集成" tabindex="-1">7.1 长期存储集成 <a class="header-anchor" href="#_7-1-长期存储集成" aria-label="Permalink to &quot;7.1 长期存储集成&quot;">​</a></h3><h4 id="_7-1-1-thanos接收器配置" tabindex="-1">7.1.1 Thanos接收器配置 <a class="header-anchor" href="#_7-1-1-thanos接收器配置" aria-label="Permalink to &quot;7.1.1 Thanos接收器配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># prometheus.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">remote_write</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://thanos-receive:10908/api/v1/receive&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    write_relabel_configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">source_labels</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">__name__</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        regex</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;up|prometheus_.*|go_.*&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">drop</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># thanos-receive配置</span></span>
<span class="line"><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RECEIVE</span></span>
<span class="line"><span class="__shiki_17hn0y">receive</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hashrings</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">hashring</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">      endpoints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">thanos-receive-0:10901</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">thanos-receive-1:10901</span></span></code></pre></div><h4 id="_7-1-2-cortex配置" tabindex="-1">7.1.2 Cortex配置 <a class="header-anchor" href="#_7-1-2-cortex配置" aria-label="Permalink to &quot;7.1.2 Cortex配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">remote_write</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://cortex-distributor:9009/api/v1/push&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    headers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      X-Scope-OrgID</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;team-a&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    queue_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_shards</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">200</span></span>
<span class="line"><span class="__shiki_17hn0y">      capacity</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">250000</span></span></code></pre></div><h3 id="_7-2-数据联邦架构" tabindex="-1">7.2 数据联邦架构 <a class="header-anchor" href="#_7-2-数据联邦架构" aria-label="Permalink to &quot;7.2 数据联邦架构&quot;">​</a></h3><h4 id="_7-2-1-跨数据中心复制" tabindex="-1">7.2.1 跨数据中心复制 <a class="header-anchor" href="#_7-2-1-跨数据中心复制" aria-label="Permalink to &quot;7.2.1 跨数据中心复制&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 主数据中心配置</span></span>
<span class="line"><span class="__shiki_17hn0y">remote_write</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://secondary-dc-prometheus:9090/api/v1/write&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    write_relabel_configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">source_labels</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">dc</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        regex</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;primary&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">keep</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 从数据中心读取</span></span>
<span class="line"><span class="__shiki_17hn0y">remote_read</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://primary-dc-prometheus:9090/api/v1/read&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    required_matchers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      dc</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;primary&quot;</span></span></code></pre></div><h2 id="八、故障排除" tabindex="-1">八、故障排除 <a class="header-anchor" href="#八、故障排除" aria-label="Permalink to &quot;八、故障排除&quot;">​</a></h2><h3 id="_8-1-常见问题诊断" tabindex="-1">8.1 常见问题诊断 <a class="header-anchor" href="#_8-1-常见问题诊断" aria-label="Permalink to &quot;8.1 常见问题诊断&quot;">​</a></h3><h4 id="_8-1-1-网络连接问题" tabindex="-1">8.1.1 网络连接问题 <a class="header-anchor" href="#_8-1-1-网络连接问题" aria-label="Permalink to &quot;8.1.1 网络连接问题&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 测试端点连通性</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> http://remote-storage:9090/api/v1/write</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 检查防火墙规则</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> 9090</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 检查DNS解析</span></span>
<span class="line"><span class="__shiki_1t8gfj">nslookup</span><span class="__shiki_mdbnqw"> remote-storage</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 抓包分析</span></span>
<span class="line"><span class="__shiki_1t8gfj">tcpdump</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> eth0</span><span class="__shiki_mdbnqw"> port</span><span class="__shiki_dzsirb"> 9090</span><span class="__shiki_dzsirb"> -w</span><span class="__shiki_mdbnqw"> remote_write.pcap</span></span></code></pre></div><h4 id="_8-1-2-性能问题诊断" tabindex="-1">8.1.2 性能问题诊断 <a class="header-anchor" href="#_8-1-2-性能问题诊断" aria-label="Permalink to &quot;8.1.2 性能问题诊断&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 查看队列状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_mdbnqw"> http://localhost:9090/api/v1/status/remote-write</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 监控关键指标</span></span>
<span class="line"><span class="__shiki_21nrsd"># 队列长度</span></span>
<span class="line"><span class="__shiki_1t8gfj">prometheus_remote_storage_samples_in_total</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_mdbnqw"> prometheus_remote_storage_samples_out_total</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 失败率</span></span>
<span class="line"><span class="__shiki_1t8gfj">rate(prometheus_remote_storage_failed_samples_total[5m]</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">/</span></span>
<span class="line"><span class="__shiki_1t8gfj">rate(prometheus_remote_storage_samples_in_total[5m]</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 延迟</span></span>
<span class="line"><span class="__shiki_1t8gfj">histogram_quantile(0.95,</span><span class="__shiki_mdbnqw"> rate</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">prometheus_remote_storage_write_request_duration_seconds_bucket[5m]</span><span class="__shiki_140thh">))</span></span></code></pre></div><h3 id="_8-2-调试工具" tabindex="-1">8.2 调试工具 <a class="header-anchor" href="#_8-2-调试工具" aria-label="Permalink to &quot;8.2 调试工具&quot;">​</a></h3><h4 id="_8-2-1-协议调试工具" tabindex="-1">8.2.1 协议调试工具 <a class="header-anchor" href="#_8-2-1-协议调试工具" aria-label="Permalink to &quot;8.2.1 协议调试工具&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 调试中间件</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> DebugMiddleware</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    handler </span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Handler</span></span>
<span class="line"><span class="__shiki_140thh">    log     </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Logger</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">DebugMiddleware</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1t8gfj"> http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录请求信息</span></span>
<span class="line"><span class="__shiki_140thh">    m.log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Request: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_dzsirb"> %s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, r.Method, r.URL.Path)</span></span>
<span class="line"><span class="__shiki_140thh">    m.log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Headers: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, r.Header)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录请求体（调试时）</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> r.Body </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        body, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> io.</span><span class="__shiki_1t8gfj">ReadAll</span><span class="__shiki_140thh">(r.Body)</span></span>
<span class="line"><span class="__shiki_140thh">        r.Body </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> io.</span><span class="__shiki_1t8gfj">NopCloser</span><span class="__shiki_140thh">(bytes.</span><span class="__shiki_1t8gfj">NewReader</span><span class="__shiki_140thh">(body))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 尝试解码</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> r.Header.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;application/x-protobuf&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            data, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> snappy.</span><span class="__shiki_1t8gfj">Decode</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">, body)</span></span>
<span class="line"><span class="__shiki_1itgoe">            var</span><span class="__shiki_140thh"> req </span><span class="__shiki_1t8gfj">prompb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WriteRequest</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> proto.</span><span class="__shiki_1t8gfj">Unmarshal</span><span class="__shiki_140thh">(data, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">req); err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                m.log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Decoded </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> timeseries&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(req.Timeseries))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 调用实际处理器</span></span>
<span class="line"><span class="__shiki_140thh">    m.handler.</span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(w, r)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="九、总结" tabindex="-1">九、总结 <a class="header-anchor" href="#九、总结" aria-label="Permalink to &quot;九、总结&quot;">​</a></h2><h3 id="_9-1-关键要点回顾" tabindex="-1">9.1 关键要点回顾 <a class="header-anchor" href="#_9-1-关键要点回顾" aria-label="Permalink to &quot;9.1 关键要点回顾&quot;">​</a></h3><ol><li><p><strong>协议设计</strong>：</p><ul><li>基于HTTP/HTTPS的RESTful接口</li><li>Protocol Buffers编码 + Snappy压缩</li><li>支持流式块传输优化性能</li></ul></li><li><p><strong>性能优化</strong>：</p><ul><li>分片队列提高并发</li><li>批次发送减少请求数</li><li>智能重试机制保证可靠性</li></ul></li><li><p><strong>扩展特性</strong>：</p><ul><li>元数据传输（指标类型、帮助信息）</li><li>示例（Exemplar）支持分布式追踪</li><li>可配置的重标签和过滤</li></ul></li><li><p><strong>运维监控</strong>：</p><ul><li>丰富的内置监控指标</li><li>灵活的告警配置</li><li>详细的日志记录</li></ul></li></ol><h3 id="_9-2-最佳实践建议" tabindex="-1">9.2 最佳实践建议 <a class="header-anchor" href="#_9-2-最佳实践建议" aria-label="Permalink to &quot;9.2 最佳实践建议&quot;">​</a></h3><ol><li><p><strong>容量规划</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">队列容量 = max_samples_per_send × max_shards × 10</span></span>
<span class="line"><span class="__shiki_wvjl67">内存需求 ≈ 队列容量 × 100字节/样本</span></span></code></pre></div></li><li><p><strong>网络优化</strong>：</p><ul><li>使用持久HTTP连接</li><li>启用HTTP/2多路复用</li><li>配置合适的超时时间</li></ul></li><li><p><strong>监控告警</strong>：</p><ul><li>监控队列积压和丢弃率</li><li>设置延迟和错误率告警</li><li>定期检查存储后端状态</li></ul></li><li><p><strong>安全考虑</strong>：</p><ul><li>使用TLS加密传输</li><li>实现身份认证和授权</li><li>限制客户端访问权限</li></ul></li></ol><h3 id="_9-3-未来发展方向" tabindex="-1">9.3 未来发展方向 <a class="header-anchor" href="#_9-3-未来发展方向" aria-label="Permalink to &quot;9.3 未来发展方向&quot;">​</a></h3><ol><li><p><strong>协议演进</strong>：</p><ul><li>gRPC支持替代HTTP</li><li>更强的类型检查和验证</li><li>更高效的数据编码格式</li></ul></li><li><p><strong>功能增强</strong>：</p><ul><li>更好的数据去重机制</li><li>增量同步和断点续传</li><li>双向流式传输</li></ul></li><li><p><strong>生态集成</strong>：</p><ul><li>更多的存储后端支持</li><li>标准化的API接口</li><li>云原生深度集成</li></ul></li></ol><p>通过深入理解Prometheus远程读写协议，可以实现高效、可靠的数据存储和查询扩展，构建强大的监控和可观测性平台。</p>`,108)])])}const g=a(p,[["render",h]]);export{o as __pageData,g as default};
