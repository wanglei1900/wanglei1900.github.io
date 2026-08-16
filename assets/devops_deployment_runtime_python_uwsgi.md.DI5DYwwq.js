import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/runtime/python/uwsgi.md","filePath":"devops/deployment/runtime/python/uwsgi.md"}'),_={name:"devops/deployment/runtime/python/uwsgi.md"};function l(h,s,c,e,t,o){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h2 id="uwsgi配置与应用部署-从基础到生产的完整指南" tabindex="-1">uWSGI配置与应用部署：从基础到生产的完整指南 <a class="header-anchor" href="#uwsgi配置与应用部署-从基础到生产的完整指南" aria-label="Permalink to &quot;uWSGI配置与应用部署：从基础到生产的完整指南&quot;">​</a></h2><p>uWSGI是Python Web应用部署中最强大、最灵活的WSGI服务器之一，特别适合复杂生产环境。与Gunicorn相比，uWSGI提供了更精细的进程控制、多种协议支持和丰富插件生态系统。</p><h2 id="_1-uwsgi核心架构与核心概念" tabindex="-1">1. uWSGI核心架构与核心概念 <a class="header-anchor" href="#_1-uwsgi核心架构与核心概念" aria-label="Permalink to &quot;1. uWSGI核心架构与核心概念&quot;">​</a></h2><h3 id="_1-1-uwsgi的架构模型" tabindex="-1">1.1 uWSGI的架构模型 <a class="header-anchor" href="#_1-1-uwsgi的架构模型" aria-label="Permalink to &quot;1.1 uWSGI的架构模型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Master进程 (管理者)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── Worker进程 (处理请求)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── Threads (线程，可选)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 信号处理器</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── 插件系统 (Python、Ruby、PHP等)</span></span></code></pre></div><p>uWSGI采用“预分叉+管理进程”模型：</p><ul><li><strong>Master进程</strong>：作为控制中心，管理所有子进程的生命周期</li><li><strong>Worker进程</strong>：实际处理HTTP请求的进程，可以配置为多线程模式</li><li><strong>缓存Worker</strong>（可选）：专门处理缓存操作的特殊Worker</li><li><strong>日志收集器</strong>：集中处理所有日志</li></ul><h3 id="_1-2-与gunicorn的关键差异" tabindex="-1">1.2 与Gunicorn的关键差异 <a class="header-anchor" href="#_1-2-与gunicorn的关键差异" aria-label="Permalink to &quot;1.2 与Gunicorn的关键差异&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>uWSGI</th><th>Gunicorn</th></tr></thead><tbody><tr><td>配置复杂度</td><td>高，配置项超过200个</td><td>中等，主要配置约20个</td></tr><tr><td>协议支持</td><td>HTTP, FastCGI, SCGI, uwsgi原生协议</td><td>HTTP, uwsgi协议</td></tr><tr><td>语言支持</td><td>Python, Ruby, Perl, PHP, Go等</td><td>主要Python</td></tr><tr><td>进程管理</td><td>极其精细（多种worker类型）</td><td>相对简单</td></tr><tr><td>监控接口</td><td>内置完整统计服务器</td><td>有限状态查询</td></tr><tr><td>内存使用</td><td>较高（功能丰富）</td><td>较低</td></tr><tr><td>学习曲线</td><td>陡峭</td><td>平缓</td></tr></tbody></table><h2 id="_2-uwsgi安装与基础配置" tabindex="-1">2. uWSGI安装与基础配置 <a class="header-anchor" href="#_2-uwsgi安装与基础配置" aria-label="Permalink to &quot;2. uWSGI安装与基础配置&quot;">​</a></h2><h3 id="_2-1-安装与验证" tabindex="-1">2.1 安装与验证 <a class="header-anchor" href="#_2-1-安装与验证" aria-label="Permalink to &quot;2.1 安装与验证&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 通过pip安装（推荐）</span></span>
<span class="line"><span class="__shiki_1t8gfj">pip</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> uwsgi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">uwsgi</span><span class="__shiki_dzsirb"> --version</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 通过系统包管理器安装（Ubuntu/Debian）</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt-get</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> uwsgi</span><span class="__shiki_mdbnqw"> uwsgi-plugin-python3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 编译安装（获取最新特性）</span></span>
<span class="line"><span class="__shiki_1t8gfj">wget</span><span class="__shiki_mdbnqw"> https://projects.unbit.it/downloads/uwsgi-latest.tar.gz</span></span>
<span class="line"><span class="__shiki_1t8gfj">tar</span><span class="__shiki_dzsirb"> -xzvf</span><span class="__shiki_mdbnqw"> uwsgi-latest.tar.gz</span></span>
<span class="line"><span class="__shiki_dzsirb">cd</span><span class="__shiki_mdbnqw"> uwsgi-</span><span class="__shiki_dzsirb">*</span></span>
<span class="line"><span class="__shiki_1t8gfj">make</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_dzsirb"> 4</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> cp</span><span class="__shiki_mdbnqw"> uwsgi</span><span class="__shiki_mdbnqw"> /usr/local/bin/</span></span></code></pre></div><h3 id="_2-2-配置文件格式选择" tabindex="-1">2.2 配置文件格式选择 <a class="header-anchor" href="#_2-2-配置文件格式选择" aria-label="Permalink to &quot;2.2 配置文件格式选择&quot;">​</a></h3><p>uWSGI支持多种配置格式，各有适用场景：</p><ol><li><strong>INI格式（最常用）</strong></li></ol><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_1itgoe">socket</span><span class="__shiki_140thh"> = :8000</span></span>
<span class="line"><span class="__shiki_1itgoe">plugin</span><span class="__shiki_140thh"> = python3</span></span>
<span class="line"><span class="__shiki_1itgoe">module</span><span class="__shiki_140thh"> = myapp.wsgi:application</span></span>
<span class="line"><span class="__shiki_1itgoe">master</span><span class="__shiki_140thh"> = true</span></span>
<span class="line"><span class="__shiki_1itgoe">processes</span><span class="__shiki_140thh"> = 4</span></span></code></pre></div><ol start="2"><li><strong>XML格式</strong></li></ol><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">uwsgi</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">socket</span><span class="__shiki_140thh">&gt;:8000&lt;/</span><span class="__shiki_17hn0y">socket</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">plugin</span><span class="__shiki_140thh">&gt;python3&lt;/</span><span class="__shiki_17hn0y">plugin</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">module</span><span class="__shiki_140thh">&gt;myapp.wsgi:application&lt;/</span><span class="__shiki_17hn0y">module</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">master</span><span class="__shiki_140thh">&gt;true&lt;/</span><span class="__shiki_17hn0y">master</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">processes</span><span class="__shiki_140thh">&gt;4&lt;/</span><span class="__shiki_17hn0y">processes</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">uwsgi</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><ol start="3"><li><strong>YAML格式</strong></li></ol><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">uwsgi</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  socket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;:8000&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  plugin</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;python3&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  module</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;myapp.wsgi:application&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  master</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  processes</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4</span></span></code></pre></div><ol start="4"><li><strong>命令行参数（测试用）</strong></li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">uwsgi</span><span class="__shiki_dzsirb"> --socket</span><span class="__shiki_mdbnqw"> :8000</span><span class="__shiki_dzsirb"> --plugin</span><span class="__shiki_mdbnqw"> python3</span><span class="__shiki_dzsirb"> --module</span><span class="__shiki_mdbnqw"> myapp.wsgi:application</span><span class="__shiki_dzsirb"> --processes</span><span class="__shiki_dzsirb"> 4</span></span></code></pre></div><h2 id="_3-uwsgi详细配置解析" tabindex="-1">3. uWSGI详细配置解析 <a class="header-anchor" href="#_3-uwsgi详细配置解析" aria-label="Permalink to &quot;3. uWSGI详细配置解析&quot;">​</a></h2><h3 id="_3-1-核心配置部分" tabindex="-1">3.1 核心配置部分 <a class="header-anchor" href="#_3-1-核心配置部分" aria-label="Permalink to &quot;3.1 核心配置部分&quot;">​</a></h3><h4 id="_3-1-1-基本应用服务配置" tabindex="-1">3.1.1 基本应用服务配置 <a class="header-anchor" href="#_3-1-1-基本应用服务配置" aria-label="Permalink to &quot;3.1.1 基本应用服务配置&quot;">​</a></h4><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_21nrsd">; 应用入口配置</span></span>
<span class="line"><span class="__shiki_1itgoe">module</span><span class="__shiki_140thh"> = myproject.wsgi:application  </span><span class="__shiki_21nrsd">; Django项目</span></span>
<span class="line"><span class="__shiki_21nrsd">; 或</span></span>
<span class="line"><span class="__shiki_1itgoe">wsgi-file</span><span class="__shiki_140thh"> = myapp.py  </span><span class="__shiki_21nrsd">; Flask或其他WSGI应用</span></span>
<span class="line"><span class="__shiki_1itgoe">callable</span><span class="__shiki_140thh"> = app        </span><span class="__shiki_21nrsd">; 可调用对象名称</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 进程与线程管理</span></span>
<span class="line"><span class="__shiki_1itgoe">master</span><span class="__shiki_140thh"> = true         </span><span class="__shiki_21nrsd">; 启用master进程</span></span>
<span class="line"><span class="__shiki_1itgoe">processes</span><span class="__shiki_140thh"> = 4         </span><span class="__shiki_21nrsd">; worker进程数，建议：(CPU核心数 * 2) + 1</span></span>
<span class="line"><span class="__shiki_1itgoe">threads</span><span class="__shiki_140thh"> = 2           </span><span class="__shiki_21nrsd">; 每个worker的线程数</span></span>
<span class="line"><span class="__shiki_1itgoe">enable-threads</span><span class="__shiki_140thh"> = true </span><span class="__shiki_21nrsd">; 启用Python线程支持</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 绑定选项（三选一）</span></span>
<span class="line"><span class="__shiki_1itgoe">socket</span><span class="__shiki_140thh"> = 127.0.0.1:8000     </span><span class="__shiki_21nrsd">; TCP socket</span></span>
<span class="line"><span class="__shiki_1itgoe">socket</span><span class="__shiki_140thh"> = /tmp/myapp.sock    </span><span class="__shiki_21nrsd">; Unix socket（性能更好）</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> = :8000                </span><span class="__shiki_21nrsd">; 直接HTTP服务（开发用）</span></span>
<span class="line"><span class="__shiki_1itgoe">http-socket</span><span class="__shiki_140thh"> = :8000         </span><span class="__shiki_21nrsd">; HTTP协议但使用uwsgi协议解析</span></span></code></pre></div><h4 id="_3-1-2-性能与资源管理" tabindex="-1">3.1.2 性能与资源管理 <a class="header-anchor" href="#_3-1-2-性能与资源管理" aria-label="Permalink to &quot;3.1.2 性能与资源管理&quot;">​</a></h4><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_21nrsd">; 进程管理</span></span>
<span class="line"><span class="__shiki_1itgoe">max-requests</span><span class="__shiki_140thh"> = 1000         </span><span class="__shiki_21nrsd">; 每个worker处理1000请求后重启，防止内存泄漏</span></span>
<span class="line"><span class="__shiki_1itgoe">max-requests-delta</span><span class="__shiki_140thh"> = 50     </span><span class="__shiki_21nrsd">; 随机化重启阈值 (±50)</span></span>
<span class="line"><span class="__shiki_1itgoe">worker-reload-mercy</span><span class="__shiki_140thh"> = 60    </span><span class="__shiki_21nrsd">; worker重启宽限期（秒）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 资源限制</span></span>
<span class="line"><span class="__shiki_1itgoe">memory-report</span><span class="__shiki_140thh"> = true        </span><span class="__shiki_21nrsd">; 启用内存报告</span></span>
<span class="line"><span class="__shiki_1itgoe">limit-as</span><span class="__shiki_140thh"> = 512              </span><span class="__shiki_21nrsd">; 每个进程内存限制（MB）</span></span>
<span class="line"><span class="__shiki_1itgoe">reload-on-as</span><span class="__shiki_140thh"> = 256          </span><span class="__shiki_21nrsd">; 内存超过256MB时重启</span></span>
<span class="line"><span class="__shiki_1itgoe">reload-on-rss</span><span class="__shiki_140thh"> = 384         </span><span class="__shiki_21nrsd">; RSS内存超过384MB时重启</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 请求与缓冲</span></span>
<span class="line"><span class="__shiki_1itgoe">buffer-size</span><span class="__shiki_140thh"> = 65535         </span><span class="__shiki_21nrsd">; 请求缓冲区大小（字节）</span></span>
<span class="line"><span class="__shiki_1itgoe">post-buffering</span><span class="__shiki_140thh"> = 8192       </span><span class="__shiki_21nrsd">; POST数据缓冲大小</span></span>
<span class="line"><span class="__shiki_1itgoe">max-vars</span><span class="__shiki_140thh"> = 1024             </span><span class="__shiki_21nrsd">; 请求变量最大数</span></span>
<span class="line"><span class="__shiki_1itgoe">harakiri</span><span class="__shiki_140thh"> = 30               </span><span class="__shiki_21nrsd">; 请求处理超时时间（秒）</span></span></code></pre></div><h3 id="_3-2-高级特性配置" tabindex="-1">3.2 高级特性配置 <a class="header-anchor" href="#_3-2-高级特性配置" aria-label="Permalink to &quot;3.2 高级特性配置&quot;">​</a></h3><h4 id="_3-2-1-静态文件服务" tabindex="-1">3.2.1 静态文件服务 <a class="header-anchor" href="#_3-2-1-静态文件服务" aria-label="Permalink to &quot;3.2.1 静态文件服务&quot;">​</a></h4><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_21nrsd">; 静态文件映射（生产环境建议用Nginx处理）</span></span>
<span class="line"><span class="__shiki_1itgoe">static-map</span><span class="__shiki_140thh"> = /</span><span class="__shiki_1itgoe">static</span><span class="__shiki_140thh">=/var/www/myapp/static</span></span>
<span class="line"><span class="__shiki_1itgoe">static-map</span><span class="__shiki_140thh"> = /</span><span class="__shiki_1itgoe">media</span><span class="__shiki_140thh">=/var/www/myapp/media</span></span>
<span class="line"><span class="__shiki_1itgoe">static-expires</span><span class="__shiki_140thh"> = /static/* 31536000  </span><span class="__shiki_21nrsd">; 缓存1年</span></span>
<span class="line"><span class="__shiki_1itgoe">static-index</span><span class="__shiki_140thh"> = index.html            </span><span class="__shiki_21nrsd">; 目录默认文件</span></span>
<span class="line"><span class="__shiki_1itgoe">check-static</span><span class="__shiki_140thh"> = /var/www/myapp        </span><span class="__shiki_21nrsd">; 静态文件检查</span></span></code></pre></div><h4 id="_3-2-2-缓存与共享区域" tabindex="-1">3.2.2 缓存与共享区域 <a class="header-anchor" href="#_3-2-2-缓存与共享区域" aria-label="Permalink to &quot;3.2.2 缓存与共享区域&quot;">​</a></h4><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_21nrsd">; 内置缓存系统</span></span>
<span class="line"><span class="__shiki_1itgoe">cache2</span><span class="__shiki_140thh"> = </span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">=mycache,</span><span class="__shiki_1itgoe">items</span><span class="__shiki_140thh">=1000,</span><span class="__shiki_1itgoe">blocksize</span><span class="__shiki_140thh">=4096,</span><span class="__shiki_1itgoe">keysize</span><span class="__shiki_140thh">=1024</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 共享内存区域（进程间通信）</span></span>
<span class="line"><span class="__shiki_1itgoe">sharedarea</span><span class="__shiki_140thh"> = 10 1000    </span><span class="__shiki_21nrsd">; 10个区域，每个1000项</span></span></code></pre></div><h4 id="_3-2-3-信号与事件系统" tabindex="-1">3.2.3 信号与事件系统 <a class="header-anchor" href="#_3-2-3-信号与事件系统" aria-label="Permalink to &quot;3.2.3 信号与事件系统&quot;">​</a></h4><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_21nrsd">; 信号处理器</span></span>
<span class="line"><span class="__shiki_1itgoe">signal-handler-interpreter</span><span class="__shiki_140thh"> = 1  </span><span class="__shiki_21nrsd">; 启用信号处理器</span></span>
<span class="line"><span class="__shiki_1itgoe">signal-handlers-as-threads</span><span class="__shiki_140thh"> = 1  </span><span class="__shiki_21nrsd">; 信号处理在新线程中</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 定时任务</span></span>
<span class="line"><span class="__shiki_1itgoe">cron</span><span class="__shiki_140thh"> = 0 0 * * * /path/to/script daily  </span><span class="__shiki_21nrsd">; 每天午夜</span></span>
<span class="line"><span class="__shiki_1itgoe">cron</span><span class="__shiki_140thh"> = */30 * * * * /path/to/script half_hour  </span><span class="__shiki_21nrsd">; 每30分钟</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 文件变更监控</span></span>
<span class="line"><span class="__shiki_1itgoe">touch-reload</span><span class="__shiki_140thh"> = /path/to/reload.trigger  </span><span class="__shiki_21nrsd">; 文件变化时重载</span></span>
<span class="line"><span class="__shiki_1itgoe">fs-reload</span><span class="__shiki_140thh"> = /path/to/watch              </span><span class="__shiki_21nrsd">; 目录变化时重载</span></span></code></pre></div><h2 id="_4-uwsgi与nginx集成配置" tabindex="-1">4. uWSGI与Nginx集成配置 <a class="header-anchor" href="#_4-uwsgi与nginx集成配置" aria-label="Permalink to &quot;4. uWSGI与Nginx集成配置&quot;">​</a></h2><h3 id="_4-1-nginx配置详解" tabindex="-1">4.1 Nginx配置详解 <a class="header-anchor" href="#_4-1-nginx配置详解" aria-label="Permalink to &quot;4.1 Nginx配置详解&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/nginx/sites-available/myapp</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> uwsgi_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 负载均衡配置（多uWSGI实例时使用）</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 127.0.0.1:8001;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 127.0.0.1:8002;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 127.0.0.1:8003;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 或使用Unix socket（性能更好）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # server unix:/tmp/myapp.sock;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 负载均衡算法</span></span>
<span class="line"><span class="__shiki_1itgoe">    least_conn</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 最少连接数</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ip_hash;   # 会话保持</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">example.com www.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL配置（生产环境必须）</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">443</span><span class="__shiki_140thh"> ssl http2;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate </span><span class="__shiki_140thh">/etc/ssl/certs/example.com.crt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate_key </span><span class="__shiki_140thh">/etc/ssl/private/example.com.key;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 静态文件处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /static/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        alias </span><span class="__shiki_140thh">/var/www/myapp/static/;</span></span>
<span class="line"><span class="__shiki_1itgoe">        expires </span><span class="__shiki_dzsirb">365d</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        gzip_static </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /media/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        alias </span><span class="__shiki_140thh">/var/www/myapp/media/;</span></span>
<span class="line"><span class="__shiki_1itgoe">        expires </span><span class="__shiki_dzsirb">30d</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 动态请求转发到uWSGI</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # uWSGI参数</span></span>
<span class="line"><span class="__shiki_1itgoe">        uwsgi_pass </span><span class="__shiki_140thh">uwsgi_backend;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 或直接指定</span></span>
<span class="line"><span class="__shiki_21nrsd">        # uwsgi_pass 127.0.0.1:8000;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # uwsgi_pass unix:/tmp/myapp.sock;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        include </span><span class="__shiki_140thh">uwsgi_params;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 重要：传递原始请求信息</span></span>
<span class="line"><span class="__shiki_1itgoe">        uwsgi_param </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_1itgoe">        uwsgi_param </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">        uwsgi_param </span><span class="__shiki_140thh">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span class="__shiki_1itgoe">        uwsgi_param </span><span class="__shiki_140thh">X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 超时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">        uwsgi_read_timeout </span><span class="__shiki_dzsirb">300s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        uwsgi_connect_timeout </span><span class="__shiki_dzsirb">75s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        uwsgi_send_timeout </span><span class="__shiki_dzsirb">300s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓冲优化</span></span>
<span class="line"><span class="__shiki_1itgoe">        uwsgi_buffers </span><span class="__shiki_dzsirb">8</span><span class="__shiki_dzsirb"> 16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        uwsgi_buffer_size </span><span class="__shiki_dzsirb">32k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 健康检查端点</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /health </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        uwsgi_pass </span><span class="__shiki_140thh">uwsgi_backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">        include </span><span class="__shiki_140thh">uwsgi_params;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_mdbnqw"> &quot;healthy</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 禁止访问隐藏文件</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> /\\. </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        log_not_found </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-socket权限与所有权" tabindex="-1">4.2 Socket权限与所有权 <a class="header-anchor" href="#_4-2-socket权限与所有权" aria-label="Permalink to &quot;4.2 Socket权限与所有权&quot;">​</a></h3><p>Unix Socket权限配置至关重要：</p><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_1itgoe">socket</span><span class="__shiki_140thh"> = /run/uwsgi/myapp.sock</span></span>
<span class="line"><span class="__shiki_1itgoe">chown-socket</span><span class="__shiki_140thh"> = www-data:www-data  </span><span class="__shiki_21nrsd">; Socket文件所有者</span></span>
<span class="line"><span class="__shiki_1itgoe">chmod-socket</span><span class="__shiki_140thh"> = 660                </span><span class="__shiki_21nrsd">; 读写权限</span></span>
<span class="line"><span class="__shiki_1itgoe">uid</span><span class="__shiki_140thh"> = www-data                    </span><span class="__shiki_21nrsd">; 运行uWSGI的用户</span></span>
<span class="line"><span class="__shiki_1itgoe">gid</span><span class="__shiki_140thh"> = www-data                    </span><span class="__shiki_21nrsd">; 运行uWSGI的组</span></span></code></pre></div><p>设置正确的目录权限：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建Socket目录</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> /run/uwsgi</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chown</span><span class="__shiki_dzsirb"> -R</span><span class="__shiki_mdbnqw"> www-data:www-data</span><span class="__shiki_mdbnqw"> /run/uwsgi</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chmod</span><span class="__shiki_dzsirb"> -R</span><span class="__shiki_dzsirb"> 775</span><span class="__shiki_mdbnqw"> /run/uwsgi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 如果使用Nginx，确保Nginx用户有权访问</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> usermod</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_dzsirb"> -G</span><span class="__shiki_mdbnqw"> www-data</span><span class="__shiki_mdbnqw"> nginx</span><span class="__shiki_21nrsd">  # 将nginx用户加入www-data组</span></span></code></pre></div><h2 id="_5-生产环境部署与系统集成" tabindex="-1">5. 生产环境部署与系统集成 <a class="header-anchor" href="#_5-生产环境部署与系统集成" aria-label="Permalink to &quot;5. 生产环境部署与系统集成&quot;">​</a></h2><h3 id="_5-1-systemd服务配置" tabindex="-1">5.1 Systemd服务配置 <a class="header-anchor" href="#_5-1-systemd服务配置" aria-label="Permalink to &quot;5.1 Systemd服务配置&quot;">​</a></h3><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/systemd/system/uwsgi-myapp.service</span></span>
<span class="line"><span class="__shiki_1t8gfj">[Unit]</span></span>
<span class="line"><span class="__shiki_1itgoe">Description</span><span class="__shiki_140thh">=uWSGI instance to serve myapp</span></span>
<span class="line"><span class="__shiki_1itgoe">After</span><span class="__shiki_140thh">=network.target</span></span>
<span class="line"><span class="__shiki_1itgoe">Requires</span><span class="__shiki_140thh">=network-online.target</span></span>
<span class="line"><span class="__shiki_1itgoe">Wants</span><span class="__shiki_140thh">=network-online.target</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">[Service]</span></span>
<span class="line"><span class="__shiki_1itgoe">Type</span><span class="__shiki_140thh">=notify                         </span><span class="__shiki_21nrsd">; 使用uWSGI的systemd集成</span></span>
<span class="line"><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">=www-data</span></span>
<span class="line"><span class="__shiki_1itgoe">Group</span><span class="__shiki_140thh">=www-data</span></span>
<span class="line"><span class="__shiki_1itgoe">WorkingDirectory</span><span class="__shiki_140thh">=/var/www/myapp</span></span>
<span class="line"><span class="__shiki_1itgoe">Environment</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;PATH=/var/www/myapp/venv/bin&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">Environment</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;PYTHONPATH=/var/www/myapp&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">Environment</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;DJANGO_SETTINGS_MODULE=myproject.settings.production&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 主进程配置</span></span>
<span class="line"><span class="__shiki_1itgoe">ExecStart</span><span class="__shiki_140thh">=/var/www/myapp/venv/bin/uwsgi \\</span></span>
<span class="line"><span class="__shiki_140thh">          --ini /etc/uwsgi/apps-available/myapp.ini \\</span></span>
<span class="line"><span class="__shiki_140thh">          --die-on-term \\           </span><span class="__shiki_21nrsd">; 优雅处理SIGTERM</span></span>
<span class="line"><span class="__shiki_140thh">          --need-app \\              </span><span class="__shiki_21nrsd">; 应用加载失败时退出</span></span>
<span class="line"><span class="__shiki_140thh">          --enable-threads</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 重启策略</span></span>
<span class="line"><span class="__shiki_1itgoe">Restart</span><span class="__shiki_140thh">=always</span></span>
<span class="line"><span class="__shiki_1itgoe">RestartSec</span><span class="__shiki_140thh">=5</span></span>
<span class="line"><span class="__shiki_1itgoe">StartLimitInterval</span><span class="__shiki_140thh">=0</span></span>
<span class="line"><span class="__shiki_1itgoe">KillSignal</span><span class="__shiki_140thh">=SIGQUIT</span></span>
<span class="line"><span class="__shiki_1itgoe">TimeoutStopSec</span><span class="__shiki_140thh">=30</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 资源限制</span></span>
<span class="line"><span class="__shiki_1itgoe">LimitNOFILE</span><span class="__shiki_140thh">=65535</span></span>
<span class="line"><span class="__shiki_1itgoe">LimitNPROC</span><span class="__shiki_140thh">=65535</span></span>
<span class="line"><span class="__shiki_1itgoe">LimitCORE</span><span class="__shiki_140thh">=infinity</span></span>
<span class="line"><span class="__shiki_1itgoe">MemoryMax</span><span class="__shiki_140thh">=1G                        </span><span class="__shiki_21nrsd">; 内存限制</span></span>
<span class="line"><span class="__shiki_1itgoe">CPUQuota</span><span class="__shiki_140thh">=200%                       </span><span class="__shiki_21nrsd">; CPU限制</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安全设置</span></span>
<span class="line"><span class="__shiki_1itgoe">NoNewPrivileges</span><span class="__shiki_140thh">=true</span></span>
<span class="line"><span class="__shiki_1itgoe">PrivateTmp</span><span class="__shiki_140thh">=true</span></span>
<span class="line"><span class="__shiki_1itgoe">ProtectSystem</span><span class="__shiki_140thh">=full</span></span>
<span class="line"><span class="__shiki_1itgoe">ProtectHome</span><span class="__shiki_140thh">=true</span></span>
<span class="line"><span class="__shiki_1itgoe">ReadWritePaths</span><span class="__shiki_140thh">=/var/www/myapp /run/uwsgi /var/log/uwsgi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">[Install]</span></span>
<span class="line"><span class="__shiki_1itgoe">WantedBy</span><span class="__shiki_140thh">=multi-user.target</span></span></code></pre></div><h3 id="_5-2-多应用管理与vassals" tabindex="-1">5.2 多应用管理与vassals <a class="header-anchor" href="#_5-2-多应用管理与vassals" aria-label="Permalink to &quot;5.2 多应用管理与vassals&quot;">​</a></h3><p>uWSGI的&quot;帝国模式&quot;支持运行多个应用：</p><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/uwsgi/emperor.ini</span></span>
<span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_1itgoe">emperor</span><span class="__shiki_140thh"> = /etc/uwsgi/vassals        </span><span class="__shiki_21nrsd">; vassal配置目录</span></span>
<span class="line"><span class="__shiki_1itgoe">emperor-stats</span><span class="__shiki_140thh"> = 127.0.0.1:1717      </span><span class="__shiki_21nrsd">; 统计服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">emperor-tyrant</span><span class="__shiki_140thh"> = true               </span><span class="__shiki_21nrsd">; 强制uid/gid</span></span>
<span class="line"><span class="__shiki_1itgoe">vassal-set</span><span class="__shiki_140thh"> = </span><span class="__shiki_1itgoe">uid</span><span class="__shiki_140thh">=www-data           </span><span class="__shiki_21nrsd">; 设置vassal的用户</span></span>
<span class="line"><span class="__shiki_1itgoe">vassal-set</span><span class="__shiki_140thh"> = </span><span class="__shiki_1itgoe">gid</span><span class="__shiki_140thh">=www-data           </span><span class="__shiki_21nrsd">; 设置vassal的组</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; vassal配置文件示例 /etc/uwsgi/vassals/myapp.ini</span></span>
<span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_1itgoe">socket</span><span class="__shiki_140thh"> = /run/uwsgi/myapp.sock</span></span>
<span class="line"><span class="__shiki_1itgoe">module</span><span class="__shiki_140thh"> = myapp.wsgi:application</span></span>
<span class="line"><span class="__shiki_1itgoe">processes</span><span class="__shiki_140thh"> = 4</span></span></code></pre></div><h2 id="_6-监控、日志与故障排除" tabindex="-1">6. 监控、日志与故障排除 <a class="header-anchor" href="#_6-监控、日志与故障排除" aria-label="Permalink to &quot;6. 监控、日志与故障排除&quot;">​</a></h2><h3 id="_6-1-内置统计服务器" tabindex="-1">6.1 内置统计服务器 <a class="header-anchor" href="#_6-1-内置统计服务器" aria-label="Permalink to &quot;6.1 内置统计服务器&quot;">​</a></h3><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_21nrsd">; 启用统计服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">stats</span><span class="__shiki_140thh"> = 127.0.0.1:1717</span></span>
<span class="line"><span class="__shiki_1itgoe">stats-http</span><span class="__shiki_140thh"> = true                    </span><span class="__shiki_21nrsd">; 通过HTTP访问统计</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 或使用Unix socket</span></span>
<span class="line"><span class="__shiki_1itgoe">stats</span><span class="__shiki_140thh"> = /tmp/stats.sock</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 定期快照</span></span>
<span class="line"><span class="__shiki_1itgoe">memory-report</span><span class="__shiki_140thh"> = true</span></span>
<span class="line"><span class="__shiki_1itgoe">log-encoder</span><span class="__shiki_140thh"> = format:\${time} \${pid} \${wid} \${vars} \${size} | msg: %(msg)</span></span></code></pre></div><p>访问统计信息：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用uwsgi工具查看</span></span>
<span class="line"><span class="__shiki_1t8gfj">uwsgi</span><span class="__shiki_dzsirb"> --connect-and-read</span><span class="__shiki_mdbnqw"> 127.0.0.1:1717</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或通过HTTP（如果启用了stats-http）</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_mdbnqw"> http://127.0.0.1:1717</span></span></code></pre></div><h3 id="_6-2-详细日志配置" tabindex="-1">6.2 详细日志配置 <a class="header-anchor" href="#_6-2-详细日志配置" aria-label="Permalink to &quot;6.2 详细日志配置&quot;">​</a></h3><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_21nrsd">; 日志系统</span></span>
<span class="line"><span class="__shiki_1itgoe">logto</span><span class="__shiki_140thh"> = /var/log/uwsgi/myapp.log</span></span>
<span class="line"><span class="__shiki_1itgoe">logformat</span><span class="__shiki_140thh"> = {</span><span class="__shiki_mdbnqw">&quot;time&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;%(ftime)&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;method&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;%(method)&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;uri&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;%(uri)&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;status&quot;</span><span class="__shiki_140thh">: %(status), </span><span class="__shiki_mdbnqw">&quot;size&quot;</span><span class="__shiki_140thh">: %(size), </span><span class="__shiki_mdbnqw">&quot;rt&quot;</span><span class="__shiki_140thh">: %(micros)}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 请求日志</span></span>
<span class="line"><span class="__shiki_1itgoe">req-logger</span><span class="__shiki_140thh"> = file:/var/log/uwsgi/requests.log</span></span>
<span class="line"><span class="__shiki_1itgoe">logger</span><span class="__shiki_140thh"> = file:/var/log/uwsgi/errors.log</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 日志轮转</span></span>
<span class="line"><span class="__shiki_1itgoe">log-maxsize</span><span class="__shiki_140thh"> = 10485760      </span><span class="__shiki_21nrsd">; 10MB</span></span>
<span class="line"><span class="__shiki_1itgoe">log-backupname</span><span class="__shiki_140thh"> = /var/log/uwsgi/myapp.log.old</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 详细调试（开发环境）</span></span>
<span class="line"><span class="__shiki_1itgoe">verbose</span><span class="__shiki_140thh"> = true</span></span>
<span class="line"><span class="__shiki_1itgoe">log-4xx</span><span class="__shiki_140thh"> = true</span></span>
<span class="line"><span class="__shiki_1itgoe">log-5xx</span><span class="__shiki_140thh"> = true</span></span></code></pre></div><h3 id="_6-3-健康检查与监控端点" tabindex="-1">6.3 健康检查与监控端点 <a class="header-anchor" href="#_6-3-健康检查与监控端点" aria-label="Permalink to &quot;6.3 健康检查与监控端点&quot;">​</a></h3><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_21nrsd">; 内置健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">health-check</span><span class="__shiki_140thh"> = /health     </span><span class="__shiki_21nrsd">; 简单的&quot;OK&quot;响应</span></span>
<span class="line"><span class="__shiki_1itgoe">health-check-http</span><span class="__shiki_140thh"> = /ping  </span><span class="__shiki_21nrsd">; 返回JSON格式的健康状态</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 详细状态报告</span></span>
<span class="line"><span class="__shiki_1itgoe">status</span><span class="__shiki_140thh"> = /var/run/uwsgi/myapp.status</span></span>
<span class="line"><span class="__shiki_1itgoe">memory-report</span><span class="__shiki_140thh"> = true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 自定义监控指标</span></span>
<span class="line"><span class="__shiki_1itgoe">metric-prefix</span><span class="__shiki_140thh"> = myapp</span></span>
<span class="line"><span class="__shiki_1itgoe">metric-host</span><span class="__shiki_140thh"> = localhost</span></span>
<span class="line"><span class="__shiki_1itgoe">metric-port</span><span class="__shiki_140thh"> = 8125         </span><span class="__shiki_21nrsd">; StatsD端口</span></span></code></pre></div><h2 id="_7-性能调优与安全加固" tabindex="-1">7. 性能调优与安全加固 <a class="header-anchor" href="#_7-性能调优与安全加固" aria-label="Permalink to &quot;7. 性能调优与安全加固&quot;">​</a></h2><h3 id="_7-1-性能优化配置" tabindex="-1">7.1 性能优化配置 <a class="header-anchor" href="#_7-1-性能优化配置" aria-label="Permalink to &quot;7.1 性能优化配置&quot;">​</a></h3><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_21nrsd">; 连接池优化</span></span>
<span class="line"><span class="__shiki_1itgoe">listen</span><span class="__shiki_140thh"> = 4096                      </span><span class="__shiki_21nrsd">; 监听队列大小</span></span>
<span class="line"><span class="__shiki_1itgoe">max-fd</span><span class="__shiki_140thh"> = 65535                     </span><span class="__shiki_21nrsd">; 最大文件描述符</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 进程调度优化</span></span>
<span class="line"><span class="__shiki_1itgoe">cpu-affinity</span><span class="__shiki_140thh"> = 1                   </span><span class="__shiki_21nrsd">; 绑定CPU核心</span></span>
<span class="line"><span class="__shiki_1itgoe">processes</span><span class="__shiki_140thh"> = 8                      </span><span class="__shiki_21nrsd">; 根据CPU核心调整</span></span>
<span class="line"><span class="__shiki_1itgoe">threads</span><span class="__shiki_140thh"> = 4                        </span><span class="__shiki_21nrsd">; 如果应用支持多线程</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 异步模式（需要插件）</span></span>
<span class="line"><span class="__shiki_1itgoe">plugin</span><span class="__shiki_140thh"> = asyncio_python3           </span><span class="__shiki_21nrsd">; 异步插件</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> = 100                        </span><span class="__shiki_21nrsd">; 异步核心数</span></span>
<span class="line"><span class="__shiki_1itgoe">socket-timeout</span><span class="__shiki_140thh"> = 30                </span><span class="__shiki_21nrsd">; socket超时</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 缓存优化</span></span>
<span class="line"><span class="__shiki_1itgoe">cache2</span><span class="__shiki_140thh"> = </span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">=default,</span><span class="__shiki_1itgoe">items</span><span class="__shiki_140thh">=10000,</span><span class="__shiki_1itgoe">blocksize</span><span class="__shiki_140thh">=4096,purge_lru,ignore_full</span></span>
<span class="line"><span class="__shiki_1itgoe">cache-store</span><span class="__shiki_140thh"> = </span><span class="__shiki_1itgoe">fsync</span><span class="__shiki_140thh">=0              </span><span class="__shiki_21nrsd">; 减少fsync调用</span></span></code></pre></div><h3 id="_7-2-安全配置" tabindex="-1">7.2 安全配置 <a class="header-anchor" href="#_7-2-安全配置" aria-label="Permalink to &quot;7.2 安全配置&quot;">​</a></h3><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_21nrsd">; 进程隔离</span></span>
<span class="line"><span class="__shiki_1itgoe">unshare</span><span class="__shiki_140thh"> = network                  </span><span class="__shiki_21nrsd">; 网络命名空间</span></span>
<span class="line"><span class="__shiki_1itgoe">unshare</span><span class="__shiki_140thh"> = pid                      </span><span class="__shiki_21nrsd">; PID命名空间</span></span>
<span class="line"><span class="__shiki_1itgoe">unshare</span><span class="__shiki_140thh"> = ipc                      </span><span class="__shiki_21nrsd">; IPC命名空间</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 文件系统限制</span></span>
<span class="line"><span class="__shiki_1itgoe">chdir</span><span class="__shiki_140thh"> = /var/www/myapp             </span><span class="__shiki_21nrsd">; 锁定工作目录</span></span>
<span class="line"><span class="__shiki_1itgoe">chroot</span><span class="__shiki_140thh"> = /var/www/chroot           </span><span class="__shiki_21nrsd">; 可选：chroot隔离</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 资源限制</span></span>
<span class="line"><span class="__shiki_1itgoe">limit-as</span><span class="__shiki_140thh"> = 512                     </span><span class="__shiki_21nrsd">; 内存限制（MB）</span></span>
<span class="line"><span class="__shiki_1itgoe">max-requests</span><span class="__shiki_140thh"> = 1000                </span><span class="__shiki_21nrsd">; 防止内存泄漏</span></span>
<span class="line"><span class="__shiki_1itgoe">reload-on-rss</span><span class="__shiki_140thh"> = 384                </span><span class="__shiki_21nrsd">; RSS内存限制</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 请求安全</span></span>
<span class="line"><span class="__shiki_1itgoe">max-vars</span><span class="__shiki_140thh"> = 256                     </span><span class="__shiki_21nrsd">; 限制请求变量数</span></span>
<span class="line"><span class="__shiki_1itgoe">max-post</span><span class="__shiki_140thh"> = 1048576                 </span><span class="__shiki_21nrsd">; POST数据限制（1MB）</span></span>
<span class="line"><span class="__shiki_1itgoe">post-buffering</span><span class="__shiki_140thh"> = 8192              </span><span class="__shiki_21nrsd">; 缓冲大小</span></span></code></pre></div><h3 id="_7-3-针对django的优化配置" tabindex="-1">7.3 针对Django的优化配置 <a class="header-anchor" href="#_7-3-针对django的优化配置" aria-label="Permalink to &quot;7.3 针对Django的优化配置&quot;">​</a></h3><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_21nrsd">; Django特定优化</span></span>
<span class="line"><span class="__shiki_1itgoe">plugin</span><span class="__shiki_140thh"> = python3</span></span>
<span class="line"><span class="__shiki_1itgoe">module</span><span class="__shiki_140thh"> = myproject.wsgi:application</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 预热和缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">lazy-apps</span><span class="__shiki_140thh"> = true                   </span><span class="__shiki_21nrsd">; 延迟加载应用</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> = django.core.wsgi          </span><span class="__shiki_21nrsd">; 预加载Django WSGI</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 静态文件优化（仅当Nginx不可用时）</span></span>
<span class="line"><span class="__shiki_1itgoe">static-map</span><span class="__shiki_140thh"> = /</span><span class="__shiki_1itgoe">static</span><span class="__shiki_140thh">=/var/www/myapp/static</span></span>
<span class="line"><span class="__shiki_1itgoe">static-expires</span><span class="__shiki_140thh"> = /static/* 31536000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; Django数据库连接池</span></span>
<span class="line"><span class="__shiki_1itgoe">enable-threads</span><span class="__shiki_140thh"> = true</span></span>
<span class="line"><span class="__shiki_1itgoe">threads</span><span class="__shiki_140thh"> = 2                        </span><span class="__shiki_21nrsd">; 每个worker的线程数</span></span>
<span class="line"><span class="__shiki_1itgoe">harakiri</span><span class="__shiki_140thh"> = 120                     </span><span class="__shiki_21nrsd">; 长请求超时</span></span></code></pre></div><h2 id="_8-故障排除与调试" tabindex="-1">8. 故障排除与调试 <a class="header-anchor" href="#_8-故障排除与调试" aria-label="Permalink to &quot;8. 故障排除与调试&quot;">​</a></h2><h3 id="_8-1-常见问题解决" tabindex="-1">8.1 常见问题解决 <a class="header-anchor" href="#_8-1-常见问题解决" aria-label="Permalink to &quot;8.1 常见问题解决&quot;">​</a></h3><ol><li><strong>Socket权限问题</strong></li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查socket权限</span></span>
<span class="line"><span class="__shiki_1t8gfj">ls</span><span class="__shiki_dzsirb"> -la</span><span class="__shiki_mdbnqw"> /run/uwsgi/myapp.sock</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chown</span><span class="__shiki_mdbnqw"> www-data:www-data</span><span class="__shiki_mdbnqw"> /run/uwsgi/myapp.sock</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chmod</span><span class="__shiki_dzsirb"> 660</span><span class="__shiki_mdbnqw"> /run/uwsgi/myapp.sock</span></span></code></pre></div><ol start="2"><li><strong>内存泄漏检测</strong></li></ol><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_1itgoe">memory-report</span><span class="__shiki_140thh"> = true</span></span>
<span class="line"><span class="__shiki_1itgoe">max-requests</span><span class="__shiki_140thh"> = 1000                </span><span class="__shiki_21nrsd">; 定期重启worker</span></span>
<span class="line"><span class="__shiki_1itgoe">reload-on-as</span><span class="__shiki_140thh"> = 256                 </span><span class="__shiki_21nrsd">; 内存超过256MB时重启</span></span></code></pre></div><ol start="3"><li><strong>Worker卡死处理</strong></li></ol><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_1itgoe">harakiri</span><span class="__shiki_140thh"> = 30                      </span><span class="__shiki_21nrsd">; 30秒超时</span></span>
<span class="line"><span class="__shiki_1itgoe">harakiri-verbose</span><span class="__shiki_140thh"> = true            </span><span class="__shiki_21nrsd">; 详细日志</span></span></code></pre></div><h3 id="_8-2-调试模式" tabindex="-1">8.2 调试模式 <a class="header-anchor" href="#_8-2-调试模式" aria-label="Permalink to &quot;8.2 调试模式&quot;">​</a></h3><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">[uwsgi]</span></span>
<span class="line"><span class="__shiki_21nrsd">; 详细日志</span></span>
<span class="line"><span class="__shiki_1itgoe">verbose</span><span class="__shiki_140thh"> = true</span></span>
<span class="line"><span class="__shiki_1itgoe">log-4xx</span><span class="__shiki_140thh"> = true</span></span>
<span class="line"><span class="__shiki_1itgoe">log-5xx</span><span class="__shiki_140thh"> = true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 请求追踪</span></span>
<span class="line"><span class="__shiki_1itgoe">log-format</span><span class="__shiki_140thh"> = %(addr) - %(user) [%(ctime)] </span><span class="__shiki_mdbnqw">&quot;%(method) %(uri) %(proto)&quot;</span><span class="__shiki_140thh"> %(status) %(size) </span><span class="__shiki_mdbnqw">&quot;%(referer)&quot;</span><span class="__shiki_mdbnqw"> &quot;%(uagent)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 内存调试</span></span>
<span class="line"><span class="__shiki_1itgoe">attach-daemon</span><span class="__shiki_140thh"> = gdb -p %(pid)      </span><span class="__shiki_21nrsd">; 附加调试器</span></span></code></pre></div><h2 id="_9-部署检查清单" tabindex="-1">9. 部署检查清单 <a class="header-anchor" href="#_9-部署检查清单" aria-label="Permalink to &quot;9. 部署检查清单&quot;">​</a></h2><h3 id="_9-1-预部署检查" tabindex="-1">9.1 预部署检查 <a class="header-anchor" href="#_9-1-预部署检查" aria-label="Permalink to &quot;9.1 预部署检查&quot;">​</a></h3><ul><li>[ ] uWSGI版本与Python版本兼容</li><li>[ ] 应用依赖已安装</li><li>[ ] 配置文件语法正确</li><li>[ ] Socket目录权限设置</li><li>[ ] 日志目录存在且有写入权限</li></ul><h3 id="_9-2-安全配置检查" tabindex="-1">9.2 安全配置检查 <a class="header-anchor" href="#_9-2-安全配置检查" aria-label="Permalink to &quot;9.2 安全配置检查&quot;">​</a></h3><ul><li>[ ] 不以root用户运行</li><li>[ ] 文件权限最小化</li><li>[ ] 启用适当的资源限制</li><li>[ ] 日志记录完整</li><li>[ ] 定期重启策略已配置</li></ul><h3 id="_9-3-性能测试" tabindex="-1">9.3 性能测试 <a class="header-anchor" href="#_9-3-性能测试" aria-label="Permalink to &quot;9.3 性能测试&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 压力测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">ab</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_mdbnqw"> http://localhost:8000/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 内存监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">uwsgi</span><span class="__shiki_dzsirb"> --connect-and-read</span><span class="__shiki_mdbnqw"> 127.0.0.1:1717</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> python</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_mdbnqw"> json.tool</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 连接测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> http://localhost:8000/health</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>uWSGI是功能极其强大的WSGI服务器，适合需要精细控制的生产环境。虽然学习曲线较陡峭，但其提供的丰富功能和灵活性是其他WSGI服务器难以比拟的。关键配置要点包括：</p><ol><li><strong>正确配置进程模型</strong>：根据应用类型（CPU/IO密集型）选择合适进程和线程数</li><li><strong>优化Socket配置</strong>：生产环境优先使用Unix Socket</li><li><strong>实施资源限制</strong>：防止内存泄漏和DoS攻击</li><li><strong>完善监控系统</strong>：利用内置统计服务器实时监控</li><li><strong>安全加固</strong>：使用非root用户运行，限制权限和资源</li></ol><p>对于大多数应用，从Gunicorn迁移到uWSGI的主要好处是更好的性能调优选项、更精细的监控和更强的稳定性。如果应用相对简单且流量中等，Gunicorn可能是更简单高效的选择；如果需要高级特性、多应用管理或复杂集成，uWSGI是更好的选择。</p>`,86)])])}const d=a(_,[["render",l]]);export{r as __pageData,d as default};
