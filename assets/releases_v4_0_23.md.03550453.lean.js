import{_ as n,c as s,o as a,a as e}from"./app.64b20f26.js";const m='{"title":"v4.0.23 Release Notes","description":"","frontmatter":{"title":"v4.0.23 Release Notes","slug":"v4-0-23"},"headers":[{"level":2,"title":"AutoQuery","slug":"autoquery"},{"level":3,"title":"Getting Started","slug":"getting-started"},{"level":2,"title":"New VistaDB OrmLite Provider!","slug":"new-vistadb-ormlite-provider"},{"level":2,"title":"Improved AspNetWindowsAuthProvider","slug":"improved-aspnetwindowsauthprovider"},{"level":2,"title":"Other features","slug":"other-features"}],"relativePath":"releases/v4_0_23.md","lastUpdated":1645007721745}',t={},o=e(`__VP_STATIC_START__<h2 id="autoquery" tabindex="-1"><a href="/autoquery">AutoQuery</a> <a class="header-anchor" href="#autoquery" aria-hidden="true">#</a></h2><p>The big ticket feature in this release is the new <a href="/autoquery">AutoQuery</a> feature - with our approach of enabling Queryable Data Services, that&#39;s designed to avoid <a href="/autoquery#why-not-odata">OData&#39;s anti-patterns and pitfalls</a>.</p><ul><li>Simple, intuitive and easy to use!</li><li>Works with all OrmLite&#39;s <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/#download" target="_blank" rel="noopener noreferrer">supported RDBMS providers</a></li><li>Supports multiple table JOINs and custom responses</li><li>Code-first, declarative programming model</li><li>Promotes clean, intent-based self-describing API&#39;s</li><li>Highly extensible, implementations are completely overridable</li><li>Configurable Adhoc, Explicit and Implicit conventions</li><li>Allows preemptive client queries</li><li>New <code>GetLazy()</code> API in Service Clients allow transparently streaming of paged queries</li><li>Raw SqlFilters available if required</li></ul><h4 id="autoquery-services-are-normal-servicestack-services" tabindex="-1">AutoQuery Services are normal ServiceStack Services <a class="header-anchor" href="#autoquery-services-are-normal-servicestack-services" aria-hidden="true">#</a></h4><p>AutoQuery also benefits from just being normal ServiceStack Services where you can re-use existing knowledge in implementing, customizing, introspecting and consuming ServiceStack services, i.e:</p><ul><li>Utilizes the same customizable <a href="/order-of-operations">Request Pipeline</a></li><li>AutoQuery services can be mapped to any <a href="/routing">user-defined route</a></li><li>Is available in all <a href="/formats">registered formats</a><ul><li>The <a href="/csv-format">CSV Format</a> especially shines in AutoQuery who&#39;s tabular result-set are perfect for CSV</li></ul></li><li>Can be <a href="/clients-overview">consumed from typed Service Clients</a> allowing an end-to-end API without code-gen in <a href="https://github.com/ServiceStackApps/HelloMobile" target="_blank" rel="noopener noreferrer">PCL client platforms as well</a></li></ul><h3 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-hidden="true">#</a></h3><p>AutoQuery uses your Services existing OrmLite DB registration, the example below registers an InMemory Sqlite Provider:</p><div class="language-csharp"><pre><code>container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Register</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDbConnectionFactory<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OrmLiteConnectionFactory</span><span class="token punctuation">(</span><span class="token string">&quot;:memory:&quot;</span><span class="token punctuation">,</span> SqliteDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>There are no additional dependencies, enabling AutoQuery is as easy as registering the AutoQueryFeature Plugin:</p><div class="language-csharp"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AutoQueryFeature</span> <span class="token punctuation">{</span> MaxLimit <span class="token operator">=</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>The configuration above limits all queries to a maximum of <strong>100</strong> results.</p><p>The minimum code to expose a Query Service for the <code>Rockstar</code> table under a user-defined Route is just:</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;/rockstars&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FindRockstars</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">QueryBase<span class="token punctuation">&lt;</span>Rockstar<span class="token punctuation">&gt;</span></span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><p>With no additional code, this allows you to use any of the registered built-in conventions, e.g:</p><pre><code>/rockstars?Ids=1,2,3
/rockstars?AgeOlderThan=42
/rockstars?AgeGreaterThanOrEqualTo=42
/rockstars?FirstNameIn=Jim,Kurt
/rockstars?FirstNameBetween=A,F
/rockstars?FirstNameStartsWith=Jim
/rockstars?LastNameEndsWith=son
/rockstars?IdAbove=1000
</code></pre><p>You&#39;re also able to formalize your API by adding concrete properties to your Request DTO:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QueryRockstars</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">QueryBase<span class="token punctuation">&lt;</span>Rockstar<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span><span class="token punctuation">?</span></span> AgeOlderThan <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Which now lets you access AutoQuery Services from the ServiceStack&#39;s <a href="/csharp-client">Typed Service Clients</a>:</p><div class="language-csharp"><pre><code>client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">QueryRockstars</span> <span class="token punctuation">{</span> AgeOlderThan <span class="token operator">=</span> <span class="token number">42</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>You can also take advantage of the new <code>GetLazy()</code> API to transparently stream large result-sets in managable-sized chunks:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> results <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">GetLazy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">QueryMovies</span> <span class="token punctuation">{</span> Ratings <span class="token operator">=</span> <span class="token keyword">new</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token string">&quot;G&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;PG-13&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>As GetLazy returns a lazy <code>IEnumerable&lt;T&gt;</code> sequence it can be used within LINQ expressions:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> top250 <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">GetLazy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">QueryMovies</span> <span class="token punctuation">{</span> Ratings <span class="token operator">=</span> <span class="token keyword">new</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span> <span class="token string">&quot;G&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;PG-13&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">Take</span><span class="token punctuation">(</span><span class="token number">250</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">ConvertTo</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Title<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>This is just a sampler, for a more complete guide to AutoQuery checkout the <a href="/autoquery">AutoQuery wiki</a>.</p><h2 id="new-vistadb-ormlite-provider" tabindex="-1">New VistaDB OrmLite Provider! <a class="header-anchor" href="#new-vistadb-ormlite-provider" aria-hidden="true">#</a></h2><p>Also in this release is a preview release of OrmLite&#39;s new support for <a href="http://www.gibraltarsoftware.com/" target="_blank" rel="noopener noreferrer">VistaDB</a> thanks to the efforts of <a href="https://github.com/ilyalukyanov" target="_blank" rel="noopener noreferrer">Ilya Lukyanov</a>.</p><p><a href="http://www.gibraltarsoftware.com/" target="_blank" rel="noopener noreferrer">VistaDB</a> is a commercial easy-to-deploy SQL Server-compatible embedded database for .NET that provides a good alternative to Sqlite for embedded scenarios.</p><p>To use first download and install <a href="http://www.gibraltarsoftware.com/" target="_blank" rel="noopener noreferrer">VistaDB</a> itself, then grab OrmLite&#39;s VistaDB provider from NuGet:</p><pre><code>PM&gt; Install-Package ServiceStack.OrmLite.VistaDb
</code></pre><p>Then register the VistaDB Provider and the filename of what embedded database to use with:</p><div class="language-csharp"><pre><code>VistaDbDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">.</span>UseLibraryFromGac <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Register</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDbConnectionFactory<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OrmLiteConnectionFactory</span><span class="token punctuation">(</span><span class="token string">&quot;Data Source=db.vb5;&quot;</span><span class="token punctuation">,</span> VistaDbDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>The VistaDB provider is almost a complete OrmLite provider, the one major missing feature is OrmLite&#39;s new support for <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/#optimistic-concurrency" target="_blank" rel="noopener noreferrer">Optimistic Concurrency</a> which is missing in VistaDB which doesn&#39;t support normal Database triggers but we&#39;re still researching the most optimal way to implement this in VistaDB.</p><h2 id="improved-aspnetwindowsauthprovider" tabindex="-1">Improved AspNetWindowsAuthProvider <a class="header-anchor" href="#improved-aspnetwindowsauthprovider" aria-hidden="true">#</a></h2><p>A new <code>LoadUserAuthFilter</code> was added to allow <code>AspNetWindowsAuthProvider</code> to retrieve more detailed information about Windows Authenticated users by using the .NET&#39;s ActiveDirectory services, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">LoadUserAuthInfo</span><span class="token punctuation">(</span><span class="token class-name">AuthUserSession</span> userSession<span class="token punctuation">,</span> 
    <span class="token class-name">IAuthTokens</span> tokens<span class="token punctuation">,</span> <span class="token class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> authInfo<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>userSession <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">PrincipalContext</span> pc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PrincipalContext</span><span class="token punctuation">(</span>ContextType<span class="token punctuation">.</span>Domain<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> user <span class="token operator">=</span> UserPrincipal<span class="token punctuation">.</span><span class="token function">FindByIdentity</span><span class="token punctuation">(</span>pc<span class="token punctuation">,</span> userSession<span class="token punctuation">.</span>UserAuthName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        tokens<span class="token punctuation">.</span>DisplayName <span class="token operator">=</span> user<span class="token punctuation">.</span>DisplayName<span class="token punctuation">;</span>
        tokens<span class="token punctuation">.</span>Email <span class="token operator">=</span> user<span class="token punctuation">.</span>EmailAddress<span class="token punctuation">;</span>
        tokens<span class="token punctuation">.</span>FirstName <span class="token operator">=</span> user<span class="token punctuation">.</span>GivenName<span class="token punctuation">;</span>
        tokens<span class="token punctuation">.</span>LastName <span class="token operator">=</span> user<span class="token punctuation">.</span>Surname<span class="token punctuation">;</span>
        tokens<span class="token punctuation">.</span>FullName <span class="token operator">=</span> <span class="token punctuation">(</span>String<span class="token punctuation">.</span><span class="token function">IsNullOrWhiteSpace</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>MiddleName<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">?</span> <span class="token string">&quot;{0} {1}&quot;</span><span class="token punctuation">.</span><span class="token function">Fmt</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>GivenName<span class="token punctuation">,</span> user<span class="token punctuation">.</span>Surname<span class="token punctuation">)</span>
            <span class="token punctuation">:</span> <span class="token string">&quot;{0} {1} {2}&quot;</span><span class="token punctuation">.</span><span class="token function">Fmt</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>GivenName<span class="token punctuation">,</span> user<span class="token punctuation">.</span>MiddleName<span class="token punctuation">,</span> user<span class="token punctuation">.</span>Surname<span class="token punctuation">)</span><span class="token punctuation">;</span>
        tokens<span class="token punctuation">.</span>PhoneNumber <span class="token operator">=</span> user<span class="token punctuation">.</span>VoiceTelephoneNumber<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Then to use the above custom filter register it in AspNetWindowsAuthProvider with:</p><div class="language-csharp"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AuthFeature</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CustomUserSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IAuthProvider<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AspNetWindowsAuthProvider</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            LoadUserAuthFilter <span class="token operator">=</span> LoadUserAuthInfo
        <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Above example kindly provided by <a href="https://github.com/KevinHoward" target="_blank" rel="noopener noreferrer">Kevin Howard</a>.</p><h2 id="other-features" tabindex="-1">Other features <a class="header-anchor" href="#other-features" aria-hidden="true">#</a></h2><ul><li><a href="https://github.com/ServiceStack/ServiceStack.OrmLite/#t4-template-support" target="_blank" rel="noopener noreferrer">OrmLite&#39;s T4 Templates</a> were improved by <a href="https://github.com/Layoric" target="_blank" rel="noopener noreferrer">Darren Reid</a></li><li>ApiVersion added to Swaggers ResourcesResponse DTO</li><li><code>Uri</code> in RedisClient allows passwords</li></ul>__VP_STATIC_END__`,41),p=[o];function c(i,r,u,l,k,d){return a(),s("div",null,p)}var v=n(t,[["render",c]]);export{m as __pageData,v as default};
