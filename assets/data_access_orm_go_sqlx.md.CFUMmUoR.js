import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"SQLX 学习笔记：Go 生态中处理原生 SQL 的利器","description":"","frontmatter":{},"headers":[],"relativePath":"data/access/orm/go/sqlx.md","filePath":"data/access/orm/go/sqlx.md"}'),p={name:"data/access/orm/go/sqlx.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="sqlx-学习笔记-go-生态中处理原生-sql-的利器" tabindex="-1">SQLX 学习笔记：Go 生态中处理原生 SQL 的利器 <a class="header-anchor" href="#sqlx-学习笔记-go-生态中处理原生-sql-的利器" aria-label="Permalink to &quot;SQLX 学习笔记：Go 生态中处理原生 SQL 的利器&quot;">​</a></h1><h2 id="_1-sqlx-概述与设计哲学" tabindex="-1">1. SQLX 概述与设计哲学 <a class="header-anchor" href="#_1-sqlx-概述与设计哲学" aria-label="Permalink to &quot;1. SQLX 概述与设计哲学&quot;">​</a></h2><h3 id="_1-1-sqlx-是什么" tabindex="-1">1.1 SQLX 是什么？ <a class="header-anchor" href="#_1-1-sqlx-是什么" aria-label="Permalink to &quot;1.1 SQLX 是什么？&quot;">​</a></h3><p><strong>SQLX</strong> 是一个建立在 Go 标准库 <code>database/sql</code> 之上的扩展包，它不是 ORM，而是一个<strong>增强型 SQL 工具包</strong>。SQLX 提供了更方便的接口来处理原生 SQL 查询，同时保持与标准库的高度兼容性。</p><h3 id="_1-2-核心设计理念" tabindex="-1">1.2 核心设计理念 <a class="header-anchor" href="#_1-2-核心设计理念" aria-label="Permalink to &quot;1.2 核心设计理念&quot;">​</a></h3><ol><li><strong>不隐藏 SQL</strong>：鼓励开发者编写和优化原生 SQL，提供透明性。</li><li><strong>减少样板代码</strong>：通过反射简化结构体映射，减少数据绑定代码。</li><li><strong>100% 兼容标准库</strong>：可以在现有 <code>database/sql</code> 代码中逐步引入。</li><li><strong>最小化魔法</strong>：保持简单直观的 API，避免过度抽象。</li></ol><h3 id="_1-3-sqlx-vs-orm-vs-标准库" tabindex="-1">1.3 SQLX vs ORM vs 标准库 <a class="header-anchor" href="#_1-3-sqlx-vs-orm-vs-标准库" aria-label="Permalink to &quot;1.3 SQLX vs ORM vs 标准库&quot;">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th>SQLX</th><th>GORM/Ent</th><th>标准库 <code>database/sql</code></th></tr></thead><tbody><tr><td><strong>SQL 控制</strong></td><td>✅ 完全控制</td><td>⚠️ 部分控制（可能生成复杂 SQL）</td><td>✅ 完全控制</td></tr><tr><td><strong>类型安全</strong></td><td>⚠️ 运行时反射检查</td><td>✅ 编译时类型安全</td><td>❌ 无</td></tr><tr><td><strong>开发效率</strong></td><td>✅ 高（减少样板代码）</td><td>✅ 很高（高级抽象）</td><td>❌ 低（大量样板代码）</td></tr><tr><td><strong>性能开销</strong></td><td>⚠️ 轻微反射开销</td><td>⚠️ ORM 抽象层开销</td><td>✅ 无额外开销</td></tr><tr><td><strong>学习曲线</strong></td><td>📈 平坦</td><td>📈 中等至陡峭</td><td>📈 中等</td></tr><tr><td><strong>灵活性</strong></td><td>✅ 极高</td><td>⚠️ 受框架限制</td><td>✅ 极高</td></tr><tr><td><strong>复杂查询支持</strong></td><td>✅ 原生 SQL 全部支持</td><td>⚠️ 受 ORM 能力限制</td><td>✅ 原生 SQL 全部支持</td></tr></tbody></table><h2 id="_2-安装与基本配置" tabindex="-1">2. 安装与基本配置 <a class="header-anchor" href="#_2-安装与基本配置" aria-label="Permalink to &quot;2. 安装与基本配置&quot;">​</a></h2><h3 id="_2-1-安装" tabindex="-1">2.1 安装 <a class="header-anchor" href="#_2-1-安装" aria-label="Permalink to &quot;2.1 安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> github.com/jmoiron/sqlx</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 根据使用的数据库安装驱动</span></span>
<span class="line"><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> github.com/go-sql-driver/mysql</span><span class="__shiki_21nrsd">      # MySQL</span></span>
<span class="line"><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> github.com/lib/pq</span><span class="__shiki_21nrsd">                   # PostgreSQL</span></span>
<span class="line"><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> modernc.org/sqlite</span><span class="__shiki_21nrsd">                  # SQLite</span></span></code></pre></div><h3 id="_2-2-数据库连接配置" tabindex="-1">2.2 数据库连接配置 <a class="header-anchor" href="#_2-2-数据库连接配置" aria-label="Permalink to &quot;2.2 数据库连接配置&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">context</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/jmoiron/sqlx</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    _ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">github.com/go-sql-driver/mysql</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 配置结构体</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> DBConfig</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Driver          </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Host            </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Port            </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    Database        </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Username        </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Password        </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    MaxOpenConns    </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    MaxIdleConns    </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    ConnMaxLifetime </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    ConnMaxIdleTime </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> NewDB</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">config</span><span class="__shiki_1t8gfj"> DBConfig</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 构建 DSN（数据源名称）</span></span>
<span class="line"><span class="__shiki_140thh">    dsn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">@tcp(</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">)/</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">?charset=utf8mb4&amp;parseTime=true&amp;loc=Local&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        config.Username,</span></span>
<span class="line"><span class="__shiki_140thh">        config.Password,</span></span>
<span class="line"><span class="__shiki_140thh">        config.Host,</span></span>
<span class="line"><span class="__shiki_140thh">        config.Port,</span></span>
<span class="line"><span class="__shiki_140thh">        config.Database,</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 打开数据库连接</span></span>
<span class="line"><span class="__shiki_140thh">    db, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sqlx.</span><span class="__shiki_1t8gfj">Open</span><span class="__shiki_140thh">(config.Driver, dsn)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;failed to open database: </span><span class="__shiki_dzsirb">%w</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 配置连接池</span></span>
<span class="line"><span class="__shiki_140thh">    db.</span><span class="__shiki_1t8gfj">SetMaxOpenConns</span><span class="__shiki_140thh">(config.MaxOpenConns)        </span><span class="__shiki_21nrsd">// 最大打开连接数</span></span>
<span class="line"><span class="__shiki_140thh">    db.</span><span class="__shiki_1t8gfj">SetMaxIdleConns</span><span class="__shiki_140thh">(config.MaxIdleConns)        </span><span class="__shiki_21nrsd">// 最大空闲连接数</span></span>
<span class="line"><span class="__shiki_140thh">    db.</span><span class="__shiki_1t8gfj">SetConnMaxLifetime</span><span class="__shiki_140thh">(config.ConnMaxLifetime)  </span><span class="__shiki_21nrsd">// 连接最大存活时间</span></span>
<span class="line"><span class="__shiki_140thh">    db.</span><span class="__shiki_1t8gfj">SetConnMaxIdleTime</span><span class="__shiki_140thh">(config.ConnMaxIdleTime)  </span><span class="__shiki_21nrsd">// 连接最大空闲时间</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证连接</span></span>
<span class="line"><span class="__shiki_140thh">    ctx, cancel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithTimeout</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Second)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_1t8gfj"> cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">PingContext</span><span class="__shiki_140thh">(ctx); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;failed to ping database: </span><span class="__shiki_dzsirb">%w</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> db, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    config </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> DBConfig</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Driver:          </span><span class="__shiki_mdbnqw">&quot;mysql&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        Host:            </span><span class="__shiki_mdbnqw">&quot;localhost&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        Port:            </span><span class="__shiki_dzsirb">3306</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        Database:        </span><span class="__shiki_mdbnqw">&quot;testdb&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        Username:        </span><span class="__shiki_mdbnqw">&quot;root&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        Password:        </span><span class="__shiki_mdbnqw">&quot;password&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        MaxOpenConns:    </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        MaxIdleConns:    </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        ConnMaxLifetime: time.Hour,</span></span>
<span class="line"><span class="__shiki_140thh">        ConnMaxIdleTime: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Minute,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    db, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> NewDB</span><span class="__shiki_140thh">(config)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 可以同时获取标准库的 DB 对象</span></span>
<span class="line"><span class="__shiki_140thh">    stdDB </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.DB</span></span>
<span class="line"><span class="__shiki_140thh">    _ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stdDB</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_3-核心-api-与基本用法" tabindex="-1">3. 核心 API 与基本用法 <a class="header-anchor" href="#_3-核心-api-与基本用法" aria-label="Permalink to &quot;3. 核心 API 与基本用法&quot;">​</a></h2><h3 id="_3-1-结构体标签与映射" tabindex="-1">3.1 结构体标签与映射 <a class="header-anchor" href="#_3-1-结构体标签与映射" aria-label="Permalink to &quot;3.1 结构体标签与映射&quot;">​</a></h3><p>SQLX 使用结构体标签 <code>db</code> 来映射数据库列名：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ID        </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw">      \`db:&quot;id&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Username  </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw">     \`db:&quot;username&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Email     </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw">     \`db:&quot;email&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Age       </span><span class="__shiki_1itgoe">int</span><span class="__shiki_mdbnqw">        \`db:&quot;age&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    CreatedAt </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_mdbnqw">  \`db:&quot;created_at&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    UpdatedAt </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_mdbnqw">  \`db:&quot;updated_at&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    DeletedAt </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_mdbnqw"> \`db:&quot;deleted_at&quot;\`</span><span class="__shiki_21nrsd">  // 指针类型表示可空字段</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 注意：字段名必须大写（公开），否则 sqlx 无法访问</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义映射关系</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ProductID    </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw">   \`db:&quot;product_id&quot;\`</span><span class="__shiki_21nrsd">    // 列名与字段名不同</span></span>
<span class="line"><span class="__shiki_140thh">    ProductName  </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw">  \`db:&quot;-&quot;\`</span><span class="__shiki_21nrsd">             // 忽略此字段（不映射）</span></span>
<span class="line"><span class="__shiki_140thh">    Price        </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_mdbnqw"> \`db:&quot;price&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 嵌套结构体（需要实现 Scanner/Valuer 接口或使用自定义映射）</span></span>
<span class="line"><span class="__shiki_140thh">    Metadata     </span><span class="__shiki_1t8gfj">JSONMap</span><span class="__shiki_mdbnqw"> \`db:&quot;metadata&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 实现 sql.Scanner 和 driver.Valuer 接口</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> JSONMap</span><span class="__shiki_1itgoe"> map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">j </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">JSONMap</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Scan</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">value</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh">{}) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        *</span><span class="__shiki_140thh">j </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    bytes, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> value.([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;type assertion to []byte failed&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> json.</span><span class="__shiki_1t8gfj">Unmarshal</span><span class="__shiki_140thh">(bytes, j)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">j </span><span class="__shiki_1t8gfj">JSONMap</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Value</span><span class="__shiki_140thh">() (</span><span class="__shiki_1t8gfj">driver</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Value</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> j </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> json.</span><span class="__shiki_1t8gfj">Marshal</span><span class="__shiki_140thh">(j)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-查询操作" tabindex="-1">3.2 查询操作 <a class="header-anchor" href="#_3-2-查询操作" aria-label="Permalink to &quot;3.2 查询操作&quot;">​</a></h3><h4 id="单行查询-get" tabindex="-1">单行查询（Get） <a class="header-anchor" href="#单行查询-get" aria-label="Permalink to &quot;单行查询（Get）&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Get 查询单行，自动映射到结构体</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> user </span><span class="__shiki_1t8gfj">User</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">user, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE id = ?&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> sql.ErrNoRows {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 处理无结果的情况</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查询指定字段</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">user, </span><span class="__shiki_mdbnqw">&quot;SELECT id, username FROM users WHERE email = ?&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用命名参数（更安全）</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">user, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE username = :username&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}{</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;alice&quot;</span><span class="__shiki_140thh">})</span></span></code></pre></div><h4 id="多行查询-select" tabindex="-1">多行查询（Select） <a class="header-anchor" href="#多行查询-select" aria-label="Permalink to &quot;多行查询（Select）&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Select 查询多行，映射到结构体切片</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> users []</span><span class="__shiki_1t8gfj">User</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">users, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE age &gt; ? ORDER BY created_at DESC&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 限制返回数量</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">users, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users LIMIT ? OFFSET ?&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用 IN 查询</span></span>
<span class="line"><span class="__shiki_140thh">ids </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">{</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">query, args, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sqlx.</span><span class="__shiki_1t8gfj">In</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE id IN (?)&quot;</span><span class="__shiki_140thh">, ids)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_21nrsd">// query: &quot;SELECT * FROM users WHERE id IN (?, ?, ?, ?, ?)&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">// args: [1, 2, 3, 4, 5]</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">users, query, args</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 简化的 IN 查询方式</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">users, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE id IN (?)&quot;</span><span class="__shiki_140thh">, ids)</span></span></code></pre></div><h4 id="查询到-map" tabindex="-1">查询到 Map <a class="header-anchor" href="#查询到-map" aria-label="Permalink to &quot;查询到 Map&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 查询单行到 Map</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">QueryRowx</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE id = ?&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">MapScan</span><span class="__shiki_140thh">(result)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查询多行到 Map 切片</span></span>
<span class="line"><span class="__shiki_140thh">rows, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Queryx</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> rows.</span><span class="__shiki_1t8gfj">Next</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    row </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{})</span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> rows.</span><span class="__shiki_1t8gfj">MapScan</span><span class="__shiki_140thh">(row)</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理每一行</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">rows.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 获取所有行到 Map 切片</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> results []</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">results, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="聚合查询" tabindex="-1">聚合查询 <a class="header-anchor" href="#聚合查询" aria-label="Permalink to &quot;聚合查询&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 查询单个值</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">count, </span><span class="__shiki_mdbnqw">&quot;SELECT COUNT(*) FROM users WHERE active = ?&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> avgAge </span><span class="__shiki_1itgoe">float64</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">avgAge, </span><span class="__shiki_mdbnqw">&quot;SELECT AVG(age) FROM users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查询多个聚合值</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> stats </span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Count   </span><span class="__shiki_1itgoe">int</span><span class="__shiki_mdbnqw">     \`db:&quot;count&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    AvgAge  </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_mdbnqw"> \`db:&quot;avg_age&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    MaxAge  </span><span class="__shiki_1itgoe">int</span><span class="__shiki_mdbnqw">     \`db:&quot;max_age&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">stats, </span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">    SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">        COUNT(*) as count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        AVG(age) as avg_age,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        MAX(age) as max_age</span></span>
<span class="line"><span class="__shiki_mdbnqw">    FROM users</span></span>
<span class="line"><span class="__shiki_mdbnqw">    WHERE active = ?</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_3-3-执行操作" tabindex="-1">3.3 执行操作 <a class="header-anchor" href="#_3-3-执行操作" aria-label="Permalink to &quot;3.3 执行操作&quot;">​</a></h3><h4 id="插入数据" tabindex="-1">插入数据 <a class="header-anchor" href="#插入数据" aria-label="Permalink to &quot;插入数据&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 单条插入</span></span>
<span class="line"><span class="__shiki_140thh">result, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">    INSERT INTO users (username, email, age) </span></span>
<span class="line"><span class="__shiki_mdbnqw">    VALUES (?, ?, ?)</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;alice&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;alice@example.com&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">25</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">lastInsertID, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> result.</span><span class="__shiki_1t8gfj">LastInsertId</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">rowsAffected, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> result.</span><span class="__shiki_1t8gfj">RowsAffected</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用命名参数插入</span></span>
<span class="line"><span class="__shiki_140thh">result, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">NamedExec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">    INSERT INTO users (username, email, age)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    VALUES (:username, :email, :age)</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}{</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;username&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;bob&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;email&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;bob@example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;age&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 批量插入</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">    {Username: </span><span class="__shiki_mdbnqw">&quot;charlie&quot;</span><span class="__shiki_140thh">, Email: </span><span class="__shiki_mdbnqw">&quot;charlie@example.com&quot;</span><span class="__shiki_140thh">, Age: </span><span class="__shiki_dzsirb">28</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    {Username: </span><span class="__shiki_mdbnqw">&quot;david&quot;</span><span class="__shiki_140thh">, Email: </span><span class="__shiki_mdbnqw">&quot;david@example.com&quot;</span><span class="__shiki_140thh">, Age: </span><span class="__shiki_dzsirb">32</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    {Username: </span><span class="__shiki_mdbnqw">&quot;eve&quot;</span><span class="__shiki_140thh">, Email: </span><span class="__shiki_mdbnqw">&quot;eve@example.com&quot;</span><span class="__shiki_140thh">, Age: </span><span class="__shiki_dzsirb">24</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方法1：循环插入（简单但效率低）</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> _, user </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> users {</span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">NamedExec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">        INSERT INTO users (username, email, age)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        VALUES (:username, :email, :age)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">, user)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方法2：批量插入（推荐）</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">    INSERT INTO users (username, email, age)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    VALUES (:username, :email, :age)</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_140thh">_, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">NamedExec</span><span class="__shiki_140thh">(query, users)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方法3：使用 SQL 批量语法（性能最好）</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">    INSERT INTO users (username, email, age) </span></span>
<span class="line"><span class="__shiki_mdbnqw">    VALUES </span></span>
<span class="line"><span class="__shiki_mdbnqw">    (?, ?, ?),</span></span>
<span class="line"><span class="__shiki_mdbnqw">    (?, ?, ?),</span></span>
<span class="line"><span class="__shiki_mdbnqw">    (?, ?, ?)</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_140thh">args </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}{}</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> _, user </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> users {</span></span>
<span class="line"><span class="__shiki_140thh">    args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(args, user.Username, user.Email, user.Age)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">_, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(query, args</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="更新数据" tabindex="-1">更新数据 <a class="header-anchor" href="#更新数据" aria-label="Permalink to &quot;更新数据&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 单条更新</span></span>
<span class="line"><span class="__shiki_140thh">result, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">    UPDATE users </span></span>
<span class="line"><span class="__shiki_mdbnqw">    SET email = ?, age = ?, updated_at = NOW()</span></span>
<span class="line"><span class="__shiki_mdbnqw">    WHERE id = ?</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;newemail@example.com&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">26</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用命名参数更新</span></span>
<span class="line"><span class="__shiki_140thh">user </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">    ID:    </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    Email: </span><span class="__shiki_mdbnqw">&quot;updated@example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    Age:   </span><span class="__shiki_dzsirb">27</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">_, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">NamedExec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">    UPDATE users </span></span>
<span class="line"><span class="__shiki_mdbnqw">    SET email = :email, age = :age, updated_at = NOW()</span></span>
<span class="line"><span class="__shiki_mdbnqw">    WHERE id = :id</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">, user)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 批量更新（需要逐条执行）</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> _, user </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> users {</span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">NamedExec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">        UPDATE users </span></span>
<span class="line"><span class="__shiki_mdbnqw">        SET email = :email, age = :age</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE id = :id</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">, user)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="删除数据" tabindex="-1">删除数据 <a class="header-anchor" href="#删除数据" aria-label="Permalink to &quot;删除数据&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 单条删除</span></span>
<span class="line"><span class="__shiki_140thh">result, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;DELETE FROM users WHERE id = ?&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 批量删除</span></span>
<span class="line"><span class="__shiki_140thh">ids </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">{</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">query, args, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sqlx.</span><span class="__shiki_1t8gfj">In</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;DELETE FROM users WHERE id IN (?)&quot;</span><span class="__shiki_140thh">, ids)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">_, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(query, args</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 软删除（更新 deleted_at 字段）</span></span>
<span class="line"><span class="__shiki_140thh">_, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">    UPDATE users </span></span>
<span class="line"><span class="__shiki_mdbnqw">    SET deleted_at = NOW() </span></span>
<span class="line"><span class="__shiki_mdbnqw">    WHERE id = ? AND deleted_at IS NULL</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_3-4-预处理语句-prepared-statements" tabindex="-1">3.4 预处理语句（Prepared Statements） <a class="header-anchor" href="#_3-4-预处理语句-prepared-statements" aria-label="Permalink to &quot;3.4 预处理语句（Prepared Statements）&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建预处理语句</span></span>
<span class="line"><span class="__shiki_140thh">stmt, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Preparex</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">    SELECT * FROM users </span></span>
<span class="line"><span class="__shiki_mdbnqw">    WHERE age &gt; ? AND active = ?</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ORDER BY created_at DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">    LIMIT ?</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1itgoe">defer</span><span class="__shiki_140thh"> stmt.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 重复使用预处理语句</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> youngUsers, oldUsers []</span><span class="__shiki_1t8gfj">User</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stmt.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">youngUsers, </span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 年轻活跃用户</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stmt.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">oldUsers, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">)     </span><span class="__shiki_21nrsd">// 年长活跃用户</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 命名预处理语句</span></span>
<span class="line"><span class="__shiki_140thh">namedStmt, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">PrepareNamed</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">    SELECT * FROM users </span></span>
<span class="line"><span class="__shiki_mdbnqw">    WHERE age &gt; :min_age AND age &lt; :max_age</span></span>
<span class="line"><span class="__shiki_mdbnqw">    AND status = :status</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1itgoe">defer</span><span class="__shiki_140thh"> namedStmt.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> users []</span><span class="__shiki_1t8gfj">User</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> namedStmt.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">users, </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}{</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;min_age&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;max_age&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;status&quot;</span><span class="__shiki_140thh">:  </span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span></code></pre></div><h2 id="_4-高级特性" tabindex="-1">4. 高级特性 <a class="header-anchor" href="#_4-高级特性" aria-label="Permalink to &quot;4. 高级特性&quot;">​</a></h2><h3 id="_4-1-连接管理与上下文" tabindex="-1">4.1 连接管理与上下文 <a class="header-anchor" href="#_4-1-连接管理与上下文" aria-label="Permalink to &quot;4.1 连接管理与上下文&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用上下文控制查询超时</span></span>
<span class="line"><span class="__shiki_140thh">ctx, cancel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithTimeout</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Second)</span></span>
<span class="line"><span class="__shiki_1itgoe">defer</span><span class="__shiki_1t8gfj"> cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 所有支持上下文的方法</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> user </span><span class="__shiki_1t8gfj">User</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">GetContext</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">user, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE id = ?&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">rows, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">QueryxContext</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">defer</span><span class="__shiki_140thh"> rows.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">result, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">ExecContext</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;UPDATE users SET active = ? WHERE id = ?&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 命名查询支持上下文</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">NamedExecContext</span><span class="__shiki_140thh">(ctx, query, params)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用事务上下文</span></span>
<span class="line"><span class="__shiki_140thh">tx, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">BeginTxx</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1itgoe">defer</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Rollback</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在事务中执行查询</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">GetContext</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">user, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE id = ? FOR UPDATE&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_4-2-事务处理" tabindex="-1">4.2 事务处理 <a class="header-anchor" href="#_4-2-事务处理" aria-label="Permalink to &quot;4.2 事务处理&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基础事务</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> TransferMoney</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">fromID</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">toID</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">amount</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 开始事务</span></span>
<span class="line"><span class="__shiki_140thh">    tx, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Beginx</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 确保事务回滚（如果函数返回错误）</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> recover</span><span class="__shiki_140thh">(); p </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            tx.</span><span class="__shiki_1t8gfj">Rollback</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">            panic</span><span class="__shiki_140thh">(p) </span><span class="__shiki_21nrsd">// 重新抛出 panic</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            tx.</span><span class="__shiki_1t8gfj">Rollback</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查发送方余额</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">float64</span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">balance, </span><span class="__shiki_mdbnqw">&quot;SELECT balance FROM accounts WHERE id = ? FOR UPDATE&quot;</span><span class="__shiki_140thh">, fromID)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> amount {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;insufficient balance&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 扣除发送方金额</span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;UPDATE accounts SET balance = balance - ? WHERE id = ?&quot;</span><span class="__shiki_140thh">, amount, fromID)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 增加接收方金额</span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;UPDATE accounts SET balance = balance + ? WHERE id = ?&quot;</span><span class="__shiki_140thh">, amount, toID)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录交易</span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">NamedExec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">        INSERT INTO transactions (from_account, to_account, amount, created_at)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        VALUES (:from, :to, :amount, NOW())</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}{</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;from&quot;</span><span class="__shiki_140thh">:   fromID,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;to&quot;</span><span class="__shiki_140thh">:     toID,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;amount&quot;</span><span class="__shiki_140thh">: amount,</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用闭包的事务辅助函数</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> WithTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">fn</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Tx</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    tx, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Beginx</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> recover</span><span class="__shiki_140thh">(); p </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            tx.</span><span class="__shiki_1t8gfj">Rollback</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">            panic</span><span class="__shiki_140thh">(p)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> fn</span><span class="__shiki_140thh">(tx); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        tx.</span><span class="__shiki_1t8gfj">Rollback</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> WithTransaction</span><span class="__shiki_140thh">(db, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tx</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Tx</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">count, </span><span class="__shiki_mdbnqw">&quot;SELECT COUNT(*) FROM users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;INSERT INTO logs (message) VALUES (?)&quot;</span><span class="__shiki_140thh">, fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Total users: </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, count))</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span></code></pre></div><h3 id="_4-3-批量操作优化" tabindex="-1">4.3 批量操作优化 <a class="header-anchor" href="#_4-3-批量操作优化" aria-label="Permalink to &quot;4.3 批量操作优化&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用 sqlx.In 构建批量操作</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> BulkInsertUsers</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">users</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(users) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 构建批量插入语句</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_mdbnqw"> \`INSERT INTO users (username, email, age) VALUES \`</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 构建占位符和参数</span></span>
<span class="line"><span class="__shiki_140thh">    placeholders </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(users))</span></span>
<span class="line"><span class="__shiki_140thh">    args </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(users)</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, user </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> users {</span></span>
<span class="line"><span class="__shiki_140thh">        placeholders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(placeholders, </span><span class="__shiki_mdbnqw">&quot;(?, ?, ?)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(args, user.Username, user.Email, user.Age)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> strings.</span><span class="__shiki_1t8gfj">Join</span><span class="__shiki_140thh">(placeholders, </span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行批量插入</span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(query, args</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用 CopyFrom（PostgreSQL 专用）</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> BulkInsertUsersPG</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">users</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // PostgreSQL 的 COPY FROM 命令（性能极高）</span></span>
<span class="line"><span class="__shiki_140thh">    tx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">MustBegin</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用 CopyFrom 需要 pq.CopyIn</span></span>
<span class="line"><span class="__shiki_140thh">    stmt, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Prepare</span><span class="__shiki_140thh">(pq.</span><span class="__shiki_1t8gfj">CopyIn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;users&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, user </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> users {</span></span>
<span class="line"><span class="__shiki_140thh">        _, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stmt.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(user.Username, user.Email, user.Age)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stmt.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stmt.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-4-复杂查询构建" tabindex="-1">4.4 复杂查询构建 <a class="header-anchor" href="#_4-4-复杂查询构建" aria-label="Permalink to &quot;4.4 复杂查询构建&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 动态查询构建器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> UserQuery</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ID       </span><span class="__shiki_1itgoe">*int64</span></span>
<span class="line"><span class="__shiki_140thh">    Username </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Email    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    MinAge   </span><span class="__shiki_1itgoe">*int</span></span>
<span class="line"><span class="__shiki_140thh">    MaxAge   </span><span class="__shiki_1itgoe">*int</span></span>
<span class="line"><span class="__shiki_140thh">    Status   </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Limit    </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    Offset   </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    OrderBy  </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> QueryUsers</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">q</span><span class="__shiki_1t8gfj"> UserQuery</span><span class="__shiki_140thh">) ([]</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 构建动态 SQL</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> query </span><span class="__shiki_1t8gfj">strings</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Builder</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> args []</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> conditions []</span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    query.</span><span class="__shiki_1t8gfj">WriteString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE 1=1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 动态添加条件</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> q.ID </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        conditions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(conditions, </span><span class="__shiki_mdbnqw">&quot;id = ?&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(args, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">q.ID)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> q.Username </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        conditions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(conditions, </span><span class="__shiki_mdbnqw">&quot;username = ?&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(args, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">q.Username)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> q.Email </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        conditions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(conditions, </span><span class="__shiki_mdbnqw">&quot;email LIKE ?&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(args, </span><span class="__shiki_mdbnqw">&quot;%&quot;</span><span class="__shiki_1itgoe">+*</span><span class="__shiki_140thh">q.Email</span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw">&quot;%&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> q.MinAge </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        conditions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(conditions, </span><span class="__shiki_mdbnqw">&quot;age &gt;= ?&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(args, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">q.MinAge)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> q.MaxAge </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        conditions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(conditions, </span><span class="__shiki_mdbnqw">&quot;age &lt;= ?&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(args, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">q.MaxAge)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> q.Status </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        conditions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(conditions, </span><span class="__shiki_mdbnqw">&quot;status = ?&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(args, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">q.Status)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加 WHERE 条件</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(conditions) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        query.</span><span class="__shiki_1t8gfj">WriteString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot; AND &quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        query.</span><span class="__shiki_1t8gfj">WriteString</span><span class="__shiki_140thh">(strings.</span><span class="__shiki_1t8gfj">Join</span><span class="__shiki_140thh">(conditions, </span><span class="__shiki_mdbnqw">&quot; AND &quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 排序</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> q.OrderBy </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        query.</span><span class="__shiki_1t8gfj">WriteString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot; ORDER BY &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> q.OrderBy)</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        query.</span><span class="__shiki_1t8gfj">WriteString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot; ORDER BY id DESC&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分页</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> q.Limit </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        query.</span><span class="__shiki_1t8gfj">WriteString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot; LIMIT ?&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(args, q.Limit)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> q.Offset </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        query.</span><span class="__shiki_1t8gfj">WriteString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot; OFFSET ?&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(args, q.Offset)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> users []</span><span class="__shiki_1t8gfj">User</span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">users, query.</span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">(), args</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> users, err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-5-连接池监控与优化" tabindex="-1">4.5 连接池监控与优化 <a class="header-anchor" href="#_4-5-连接池监控与优化" aria-label="Permalink to &quot;4.5 连接池监控与优化&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> DBPoolStats</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    MaxOpenConns     </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    OpenConns        </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    InUse            </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    Idle             </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    WaitCount        </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    WaitDuration     </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    MaxIdleClosed    </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    MaxLifetimeClosed </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> MonitorDBPool</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">DBPoolStats</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    stats </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Stats</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> DBPoolStats</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        MaxOpenConns:     db.</span><span class="__shiki_1t8gfj">Stats</span><span class="__shiki_140thh">().MaxOpenConnections,</span></span>
<span class="line"><span class="__shiki_140thh">        OpenConns:        stats.OpenConnections,</span></span>
<span class="line"><span class="__shiki_140thh">        InUse:            stats.InUse,</span></span>
<span class="line"><span class="__shiki_140thh">        Idle:             stats.Idle,</span></span>
<span class="line"><span class="__shiki_140thh">        WaitCount:        stats.WaitCount,</span></span>
<span class="line"><span class="__shiki_140thh">        WaitDuration:     stats.WaitDuration,</span></span>
<span class="line"><span class="__shiki_140thh">        MaxIdleClosed:    stats.MaxIdleClosed,</span></span>
<span class="line"><span class="__shiki_140thh">        MaxLifetimeClosed: stats.MaxLifetimeClosed,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自动调整连接池大小</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> AutoTuneConnectionPool</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">interval</span><span class="__shiki_1t8gfj"> time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    ticker </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">NewTicker</span><span class="__shiki_140thh">(interval)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> ticker.</span><span class="__shiki_1t8gfj">Stop</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> ticker.C {</span></span>
<span class="line"><span class="__shiki_140thh">        stats </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Stats</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 根据使用情况调整连接池</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> stats.WaitCount </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 等待连接过多，增加最大连接数</span></span>
<span class="line"><span class="__shiki_140thh">            maxOpen </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Stats</span><span class="__shiki_140thh">().MaxOpenConnections</span></span>
<span class="line"><span class="__shiki_140thh">            db.</span><span class="__shiki_1t8gfj">SetMaxOpenConns</span><span class="__shiki_140thh">(maxOpen </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> stats.Idle </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> stats.OpenConnections</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 空闲连接过多，减少空闲连接数</span></span>
<span class="line"><span class="__shiki_140thh">            maxIdle </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Stats</span><span class="__shiki_140thh">().MaxIdleConns</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> maxIdle </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                db.</span><span class="__shiki_1t8gfj">SetMaxIdleConns</span><span class="__shiki_140thh">(maxIdle </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-性能优化技巧" tabindex="-1">5. 性能优化技巧 <a class="header-anchor" href="#_5-性能优化技巧" aria-label="Permalink to &quot;5. 性能优化技巧&quot;">​</a></h2><h3 id="_5-1-查询性能优化" tabindex="-1">5.1 查询性能优化 <a class="header-anchor" href="#_5-1-查询性能优化" aria-label="Permalink to &quot;5.1 查询性能优化&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 使用正确的数据类型</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">count, </span><span class="__shiki_mdbnqw">&quot;SELECT COUNT(*) FROM users WHERE age &gt; ?&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 好</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">count, </span><span class="__shiki_mdbnqw">&quot;SELECT COUNT(*) FROM users WHERE age &gt; &#39;18&#39;&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 差</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 使用索引友好的查询</span></span>
<span class="line"><span class="__shiki_21nrsd">// 好：使用索引列作为条件</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">users, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE email = ?&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 差：使用函数或计算</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">users, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE YEAR(created_at) = ?&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2023</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 减少数据传输</span></span>
<span class="line"><span class="__shiki_21nrsd">// 只选择需要的列</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> userIDs []</span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">userIDs, </span><span class="__shiki_mdbnqw">&quot;SELECT id FROM users WHERE active = ?&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用分页</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">users, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users LIMIT ? OFFSET ?&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 4. 使用预处理语句重复查询</span></span>
<span class="line"><span class="__shiki_140thh">stmt, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Preparex</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE id = ?&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">defer</span><span class="__shiki_140thh"> stmt.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> _, id </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> ids {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> user </span><span class="__shiki_1t8gfj">User</span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stmt.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">user, id)</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理用户</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-批量操作性能" tabindex="-1">5.2 批量操作性能 <a class="header-anchor" href="#_5-2-批量操作性能" aria-label="Permalink to &quot;5.2 批量操作性能&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 批量插入优化</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> BatchInsertOptimized</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">users</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">batchSize</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分批处理，避免超大事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(users); i </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> batchSize {</span></span>
<span class="line"><span class="__shiki_140thh">        end </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> batchSize</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> end </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(users) {</span></span>
<span class="line"><span class="__shiki_140thh">            end </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(users)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        batch </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> users[i:end]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使用事务</span></span>
<span class="line"><span class="__shiki_140thh">        tx, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Beginx</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_mdbnqw"> &quot;INSERT INTO users (username, email, age) VALUES &quot;</span></span>
<span class="line"><span class="__shiki_140thh">        placeholders </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(batch))</span></span>
<span class="line"><span class="__shiki_140thh">        args </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(batch)</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, user </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> batch {</span></span>
<span class="line"><span class="__shiki_140thh">            placeholders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(placeholders, </span><span class="__shiki_mdbnqw">&quot;(?, ?, ?)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(args, user.Username, user.Email, user.Age)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> strings.</span><span class="__shiki_1t8gfj">Join</span><span class="__shiki_140thh">(placeholders, </span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        _, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(query, args</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            tx.</span><span class="__shiki_1t8gfj">Rollback</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">(); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-错误处理与调试" tabindex="-1">6. 错误处理与调试 <a class="header-anchor" href="#_6-错误处理与调试" aria-label="Permalink to &quot;6. 错误处理与调试&quot;">​</a></h2><h3 id="_6-1-错误处理模式" tabindex="-1">6.1 错误处理模式 <a class="header-anchor" href="#_6-1-错误处理模式" aria-label="Permalink to &quot;6.1 错误处理模式&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 定义应用层错误类型</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> DBError</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Op      </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Err     </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">    Query   </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Args    []</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">DBError</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, e.Op, e.Err)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">DBError</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Unwrap</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> e.Err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 包装 SQLX 错误</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> QueryUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">id</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> user </span><span class="__shiki_1t8gfj">User</span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">user, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE id = ?&quot;</span><span class="__shiki_140thh">, id)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> sql.ErrNoRows {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span><span class="__shiki_21nrsd"> // 返回 nil 表示未找到</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">DBError</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Op:    </span><span class="__shiki_mdbnqw">&quot;QueryUser&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            Err:   err,</span></span>
<span class="line"><span class="__shiki_140thh">            Query: </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE id = ?&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            Args:  []</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}{id},</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_140thh">user, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 重试机制</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> QueryWithRetry</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_1itgoe"> ...interface</span><span class="__shiki_140thh">{}) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Rows</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> rows </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Rows</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> { </span><span class="__shiki_21nrsd">// 重试3次</span></span>
<span class="line"><span class="__shiki_140thh">        rows, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Queryx</span><span class="__shiki_140thh">(query, args</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> rows, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 只对特定错误重试</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> isRetryableError</span><span class="__shiki_140thh">(err) {</span></span>
<span class="line"><span class="__shiki_140thh">            time.</span><span class="__shiki_1t8gfj">Sleep</span><span class="__shiki_140thh">(time.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(i) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Millisecond) </span><span class="__shiki_21nrsd">// 指数退避</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-调试与日志" tabindex="-1">6.2 调试与日志 <a class="header-anchor" href="#_6-2-调试与日志" aria-label="Permalink to &quot;6.2 调试与日志&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 查询日志拦截器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LoggingInterceptor</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Logger </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Logger</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">li </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LoggingInterceptor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">InterceptQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}) (</span><span class="__shiki_1t8gfj">context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">, []</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}) {</span></span>
<span class="line"><span class="__shiki_140thh">    start </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建新的上下文存储开始时间</span></span>
<span class="line"><span class="__shiki_140thh">    ctx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithValue</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;query_start&quot;</span><span class="__shiki_140thh">, start)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录查询（注意：生产环境不要记录敏感参数）</span></span>
<span class="line"><span class="__shiki_140thh">    li.Logger.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Executing query: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw"> with args: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, query, args)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> ctx, query, args</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">li </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LoggingInterceptor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">InterceptExec</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}) (</span><span class="__shiki_1t8gfj">context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">, []</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}) {</span></span>
<span class="line"><span class="__shiki_140thh">    start </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    ctx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithValue</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;exec_start&quot;</span><span class="__shiki_140thh">, start)</span></span>
<span class="line"><span class="__shiki_140thh">    li.Logger.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Executing exec: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw"> with args: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, query, args)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> ctx, query, args</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用 sqlx.DB 的 Conn 钩子（需要自定义包装）</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LoggingDB</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span></span>
<span class="line"><span class="__shiki_140thh">    Logger </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Logger</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ldb </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LoggingDB</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Queryx</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_1itgoe"> ...interface</span><span class="__shiki_140thh">{}) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Rows</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    ldb.Logger.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Query: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">, Args: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, query, args)</span></span>
<span class="line"><span class="__shiki_140thh">    start </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    rows, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ldb.DB.</span><span class="__shiki_1t8gfj">Queryx</span><span class="__shiki_140thh">(query, args</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ldb.Logger.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Query took: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, time.</span><span class="__shiki_1t8gfj">Since</span><span class="__shiki_140thh">(start))</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> rows, err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 开启 SQL 调试模式</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> EnableSQLDebug</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置日志级别</span></span>
<span class="line"><span class="__shiki_140thh">    db.</span><span class="__shiki_1t8gfj">MapperFunc</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">s</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> s })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用自定义的 DB 包装</span></span>
<span class="line"><span class="__shiki_140thh">    debugDB </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">DebugDB</span><span class="__shiki_140thh">{DB: db}</span></span>
<span class="line"><span class="__shiki_140thh">    _ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> debugDB</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> DebugDB</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">db </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">DebugDB</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Queryx</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_1itgoe"> ...interface</span><span class="__shiki_140thh">{}) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Rows</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;[SQL DEBUG] Query: </span><span class="__shiki_dzsirb">%s\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, query)</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;[SQL DEBUG] Args: </span><span class="__shiki_dzsirb">%v\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, args)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> db.DB.</span><span class="__shiki_1t8gfj">Queryx</span><span class="__shiki_140thh">(query, args</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_7-最佳实践" tabindex="-1">7. 最佳实践 <a class="header-anchor" href="#_7-最佳实践" aria-label="Permalink to &quot;7. 最佳实践&quot;">​</a></h2><h3 id="_7-1-架构模式" tabindex="-1">7.1 架构模式 <a class="header-anchor" href="#_7-1-架构模式" aria-label="Permalink to &quot;7.1 架构模式&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Repository 模式</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    FindByID</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">id</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    FindByEmail</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Create</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">user</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Update</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">user</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Delete</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">id</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_1t8gfj">    List</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">filter</span><span class="__shiki_1t8gfj"> UserFilter</span><span class="__shiki_140thh">) ([]</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> userRepository</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    db </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> NewUserRepository</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">UserRepository</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">userRepository</span><span class="__shiki_140thh">{db: db}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">userRepository</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">FindByID</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">id</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> user </span><span class="__shiki_1t8gfj">User</span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.db.</span><span class="__shiki_1t8gfj">GetContext</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">user, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE id = ?&quot;</span><span class="__shiki_140thh">, id)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> sql.ErrNoRows {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_140thh">user, err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">userRepository</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">user</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">        INSERT INTO users (username, email, age, created_at, updated_at)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        VALUES (:username, :email, :age, NOW(), NOW())</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    result, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.db.</span><span class="__shiki_1t8gfj">NamedExecContext</span><span class="__shiki_140thh">(ctx, query, user)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    id, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> result.</span><span class="__shiki_1t8gfj">LastInsertId</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    user.ID </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> id</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Service 层使用 Repository</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    repo </span><span class="__shiki_1t8gfj">UserRepository</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">UserService</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">RegisterUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">req</span><span class="__shiki_1t8gfj"> RegisterRequest</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 业务逻辑验证</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> req.Age </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age must be at least 18&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查邮箱是否已存在</span></span>
<span class="line"><span class="__shiki_140thh">    existing, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.repo.</span><span class="__shiki_1t8gfj">FindByEmail</span><span class="__shiki_140thh">(ctx, req.Email)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> existing </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;email already registered&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建用户</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Username: req.Username,</span></span>
<span class="line"><span class="__shiki_140thh">        Email:    req.Email,</span></span>
<span class="line"><span class="__shiki_140thh">        Age:      req.Age,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.repo.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">(ctx, user); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> user, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-迁移管理" tabindex="-1">7.2 迁移管理 <a class="header-anchor" href="#_7-2-迁移管理" aria-label="Permalink to &quot;7.2 迁移管理&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 简单的迁移管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Migration</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ID        </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    Name      </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    UpSQL     </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    DownSQL   </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    AppliedAt </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Migrator</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    db </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> NewMigrator</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Migrator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">Migrator</span><span class="__shiki_140thh">{db: db}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Migrator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Setup</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建迁移表</span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> m.db.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">        CREATE TABLE IF NOT EXISTS migrations (</span></span>
<span class="line"><span class="__shiki_mdbnqw">            id INTEGER PRIMARY KEY AUTO_INCREMENT,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            name VARCHAR(255) NOT NULL UNIQUE,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            up_sql TEXT NOT NULL,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            down_sql TEXT NOT NULL,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP</span></span>
<span class="line"><span class="__shiki_mdbnqw">        )</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Migrator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Apply</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">migrations</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">Migration</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, migration </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> migrations {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查是否已应用</span></span>
<span class="line"><span class="__shiki_1itgoe">        var</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">        err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> m.db.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">count, </span><span class="__shiki_mdbnqw">&quot;SELECT COUNT(*) FROM migrations WHERE name = ?&quot;</span><span class="__shiki_140thh">, migration.Name)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span><span class="__shiki_21nrsd"> // 已应用</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 开始事务</span></span>
<span class="line"><span class="__shiki_140thh">        tx, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> m.db.</span><span class="__shiki_1t8gfj">Beginx</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 应用迁移</span></span>
<span class="line"><span class="__shiki_140thh">        _, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(migration.UpSQL)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            tx.</span><span class="__shiki_1t8gfj">Rollback</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;failed to apply migration </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%w</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, migration.Name, err)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录迁移</span></span>
<span class="line"><span class="__shiki_140thh">        _, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">NamedExec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">            INSERT INTO migrations (name, up_sql, down_sql)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            VALUES (:name, :up_sql, :down_sql)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        \`</span><span class="__shiki_140thh">, migration)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            tx.</span><span class="__shiki_1t8gfj">Rollback</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">(); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-3-测试策略" tabindex="-1">7.3 测试策略 <a class="header-anchor" href="#_7-3-测试策略" aria-label="Permalink to &quot;7.3 测试策略&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 集成测试</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> TestUserRepository</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用测试数据库</span></span>
<span class="line"><span class="__shiki_140thh">    db, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sqlx.</span><span class="__shiki_1t8gfj">Open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;mysql&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;test:test@tcp(localhost:3306)/testdb_test?parseTime=true&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清空测试数据</span></span>
<span class="line"><span class="__shiki_140thh">    db.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;DELETE FROM users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    repo </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> NewUserRepository</span><span class="__shiki_140thh">(db)</span></span>
<span class="line"><span class="__shiki_140thh">    ctx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    t.</span><span class="__shiki_1t8gfj">Run</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Create and Find&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        user </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Username: </span><span class="__shiki_mdbnqw">&quot;testuser&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            Email:    </span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            Age:      </span><span class="__shiki_dzsirb">25</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建用户</span></span>
<span class="line"><span class="__shiki_140thh">        err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> repo.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">(ctx, user)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            t.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 查找用户</span></span>
<span class="line"><span class="__shiki_140thh">        found, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> repo.</span><span class="__shiki_1t8gfj">FindByID</span><span class="__shiki_140thh">(ctx, user.ID)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            t.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> found </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            t.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;expected to find user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> found.Username </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> user.Username {</span></span>
<span class="line"><span class="__shiki_140thh">            t.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;expected username </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">, got </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, user.Username, found.Username)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用测试容器</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> TestWithTestContainer</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    ctx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 启动 MySQL 测试容器</span></span>
<span class="line"><span class="__shiki_140thh">    container, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> testcontainers.</span><span class="__shiki_1t8gfj">GenericContainer</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_1t8gfj">testcontainers</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">GenericContainerRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        ContainerRequest: </span><span class="__shiki_1t8gfj">testcontainers</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ContainerRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Image:        </span><span class="__shiki_mdbnqw">&quot;mysql:8.0&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            ExposedPorts: []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&quot;3306/tcp&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">            Env: </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;MYSQL_ROOT_PASSWORD&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;test&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;MYSQL_DATABASE&quot;</span><span class="__shiki_140thh">:      </span><span class="__shiki_mdbnqw">&quot;testdb&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        Started: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> container.</span><span class="__shiki_1t8gfj">Terminate</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取容器地址</span></span>
<span class="line"><span class="__shiki_140thh">    host, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> container.</span><span class="__shiki_1t8gfj">Host</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    port, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> container.</span><span class="__shiki_1t8gfj">MappedPort</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;3306&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 连接数据库</span></span>
<span class="line"><span class="__shiki_140thh">    dsn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;root:test@tcp(</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">)/testdb?parseTime=true&quot;</span><span class="__shiki_140thh">, host, port.</span><span class="__shiki_1t8gfj">Port</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    db, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sqlx.</span><span class="__shiki_1t8gfj">Open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;mysql&quot;</span><span class="__shiki_140thh">, dsn)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 运行测试...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_8-常见陷阱与解决方案" tabindex="-1">8. 常见陷阱与解决方案 <a class="header-anchor" href="#_8-常见陷阱与解决方案" aria-label="Permalink to &quot;8. 常见陷阱与解决方案&quot;">​</a></h2><h3 id="_8-1-null-值处理" tabindex="-1">8.1 NULL 值处理 <a class="header-anchor" href="#_8-1-null-值处理" aria-label="Permalink to &quot;8.1 NULL 值处理&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 错误：无法处理 NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> BadUser</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    DeletedAt </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_mdbnqw"> \`db:&quot;deleted_at&quot;\`</span><span class="__shiki_21nrsd"> // 如果数据库为 NULL 会报错</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 正确：使用指针类型</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> GoodUser</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    DeletedAt </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_mdbnqw"> \`db:&quot;deleted_at&quot;\`</span><span class="__shiki_21nrsd"> // 可以处理 NULL</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用 sql.Null* 类型</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> BetterUser</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    DeletedAt </span><span class="__shiki_1t8gfj">sql</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">NullTime</span><span class="__shiki_mdbnqw"> \`db:&quot;deleted_at&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Age       </span><span class="__shiki_1t8gfj">sql</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">NullInt64</span><span class="__shiki_mdbnqw"> \`db:&quot;age&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 检查 NULL 值</span></span>
<span class="line"><span class="__shiki_140thh">user </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> BetterUser</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">user, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE id = ?&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> user.DeletedAt.Valid {</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Deleted at:&quot;</span><span class="__shiki_140thh">, user.DeletedAt.Time)</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Not deleted&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-sql-注入防护" tabindex="-1">8.2 SQL 注入防护 <a class="header-anchor" href="#_8-2-sql-注入防护" aria-label="Permalink to &quot;8.2 SQL 注入防护&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 危险：字符串拼接（SQL 注入风险）</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> DangerousQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 不要这样做！</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE username = &#39;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&#39;&quot;</span><span class="__shiki_140thh">, username)</span></span>
<span class="line"><span class="__shiki_140thh">    db.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">users, query)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 安全：使用参数化查询</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> SafeQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // SQLX 自动处理参数转义</span></span>
<span class="line"><span class="__shiki_140thh">    db.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">users, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE username = ?&quot;</span><span class="__shiki_140thh">, username)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 安全：使用命名参数</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> SafeNamedQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">filter</span><span class="__shiki_1itgoe"> map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}) {</span></span>
<span class="line"><span class="__shiki_140thh">    db.</span><span class="__shiki_1t8gfj">NamedExec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE username = :username&quot;</span><span class="__shiki_140thh">, filter)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 注意：sqlx.In 也安全</span></span>
<span class="line"><span class="__shiki_140thh">ids </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">{</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">query, args, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sqlx.</span><span class="__shiki_1t8gfj">In</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE id IN (?)&quot;</span><span class="__shiki_140thh">, ids)</span></span>
<span class="line"><span class="__shiki_140thh">db.</span><span class="__shiki_1t8gfj">Select</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">users, query, args</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 安全</span></span></code></pre></div><h3 id="_8-3-连接泄露" tabindex="-1">8.3 连接泄露 <a class="header-anchor" href="#_8-3-连接泄露" aria-label="Permalink to &quot;8.3 连接泄露&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 错误：忘记关闭连接</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> LeakConnections</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    rows, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Queryx</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 忘记 rows.Close()</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 连接泄露！</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 正确：使用 defer 确保关闭</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> ProperConnectionHandling</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">sqlx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    rows, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Queryx</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> rows.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">() </span><span class="__shiki_21nrsd">// 确保关闭</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> rows.</span><span class="__shiki_1t8gfj">Next</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        var</span><span class="__shiki_140thh"> user </span><span class="__shiki_1t8gfj">User</span></span>
<span class="line"><span class="__shiki_140thh">        err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> rows.</span><span class="__shiki_1t8gfj">StructScan</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">user)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 处理用户</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> rows.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用 Must* 方法时要小心</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> UsingMustMethods</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // MustExec 在错误时会 panic</span></span>
<span class="line"><span class="__shiki_140thh">    db.</span><span class="__shiki_1t8gfj">MustExec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;INSERT INTO users (name) VALUES (?)&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;test&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 更好的方式：处理错误</span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">Exec</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;INSERT INTO users (name) VALUES (?)&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;test&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_9-总结" tabindex="-1">9. 总结 <a class="header-anchor" href="#_9-总结" aria-label="Permalink to &quot;9. 总结&quot;">​</a></h2><p>SQLX 是 Go 生态中处理数据库访问的<strong>实用主义选择</strong>。它通过提供更友好的 API 减少了使用 <code>database/sql</code> 时的样板代码，同时保持了原生 SQL 的灵活性和控制力。</p><h3 id="核心优势" tabindex="-1">核心优势： <a class="header-anchor" href="#核心优势" aria-label="Permalink to &quot;核心优势：&quot;">​</a></h3><ol><li><strong>简单直观</strong>：API 设计直观，学习曲线平缓</li><li><strong>完全控制</strong>：可以编写和优化原生 SQL</li><li><strong>高性能</strong>：接近原生性能，反射开销极小</li><li><strong>兼容性好</strong>：与现有 <code>database/sql</code> 代码无缝集成</li><li><strong>类型安全增强</strong>：通过结构体映射减少运行时错误</li></ol><h3 id="适用场景" tabindex="-1">适用场景： <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景：&quot;">​</a></h3><ul><li>需要精细控制 SQL 查询的项目</li><li>从其他语言迁移的现有 SQL 代码库</li><li>性能敏感的应用</li><li>需要渐进式改进现有数据库代码的项目</li><li>团队熟悉 SQL 但希望减少样板代码</li></ul><h3 id="不适用场景" tabindex="-1">不适用场景： <a class="header-anchor" href="#不适用场景" aria-label="Permalink to &quot;不适用场景：&quot;">​</a></h3><ul><li>需要复杂对象关系映射的领域模型</li><li>希望完全避免 SQL 的团队</li><li>需要自动迁移和数据库版本管理的项目</li><li>高度动态的查询需求（可考虑查询构建器）</li></ul><p>SQLX 在<strong>控制力</strong>和<strong>开发效率</strong>之间找到了一个很好的平衡点，特别适合那些重视 SQL 技能、需要对数据库有完全控制权，同时又不希望被冗长样板代码困扰的 Go 开发团队。</p>`,79)])])}const g=a(p,[["render",h]]);export{o as __pageData,g as default};
