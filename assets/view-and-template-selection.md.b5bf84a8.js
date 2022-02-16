import{_ as s,c as n,o as a,a as e}from"./app.64b20f26.js";const h='{"title":"View & Template Selection","description":"","frontmatter":{"slug":"view-and-template-selection","title":"View & Template Selection"},"headers":[{"level":3,"title":"Layout Templates","slug":"layout-templates"},{"level":2,"title":"Executing Razor in Code","slug":"executing-razor-in-code"},{"level":3,"title":"Creating Pages at Runtime","slug":"creating-pages-at-runtime"},{"level":2,"title":"Debuggable Razor Views","slug":"debuggable-razor-views"}],"relativePath":"view-and-template-selection.md","lastUpdated":1645007721769}',t={},o=e(`<p>ServiceStack provides multiple ways to select the Razor View that will be used to render your services response with. First if the <code>IHttpRequest.Items[&quot;View&quot;]</code> has been set <a href="/order-of-operations">via any Global, Request, Response or Action Filter</a> it will use that, otherwise the fallback convention is to use the view with the same name as the <strong>Request DTO</strong> followed finally by one with the <strong>Response DTO</strong> name.</p><p>To illustrate this, the below service is overloaded with different ways to select a Razor View, each are assigned a priority number starting from <code>#1</code>:</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">ClientCanSwapTemplates</span></span><span class="token punctuation">]</span>        <span class="token comment">// #4 Client can select with ?view=UserSpecified4</span>
<span class="token punctuation">[</span><span class="token function">DefaultView</span><span class="token punctuation">(</span><span class="token string">&quot;DevSpecified3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>  <span class="token comment">// #3 </span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RockstarsService</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Service</span></span> 
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DefaultView</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;DevSpecified2&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>        <span class="token comment">// #2 </span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token class-name">Rockstars5</span> request<span class="token punctuation">)</span> <span class="token comment">// #5</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HttpResult</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">RockstarsResponse6</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// #6</span>
        <span class="token punctuation">{</span>
            View <span class="token operator">=</span> <span class="token string">&quot;DevSpecified1&quot;</span>  <span class="token comment">// #1</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>The above service selects views that are mapped to the below Razor views. The folder structure is inconsequential so Views can be organized and nested in any number of folders, e.g:</p><div class="language-"><pre><code>/Views
    /Any
        /Nested
            /Deep
                DevSpecified1.cshtml       // #1
                DevSpecified2.cshtml       // #2
                DevSpecified3.cshtml       // #3
                UserSpecified4.cshtml      // #4
                Rockstars5.cshtml          // #5
                RockstarsResponse6.cshtml  // #6
    /Shared
        _Layout.cshtml
</code></pre></div><p>The <code>DevSpecified1.cshtml</code> would be selected first because it is last to set the <code>IHttpRequest.Items[&quot;View&quot;]</code> property that the Razor Format uses to select the view. You&#39;re also not limited to these options as you can easily set the same property in any of your own custom filters.</p><p>E.g. this is the entire source code of the <a href="https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.ServiceInterface/ClientCanSwapTemplatesAttribute.cs" target="_blank" rel="noopener noreferrer">ClientCanSwapTemplates Attribute</a> which once enabled lets the client to specify the view via HTTP Header, QueryString, FormData or Cookies (in that order):</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ClientCanSwapTemplatesAttribute</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ResponseFilterAttribute</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Execute</span><span class="token punctuation">(</span><span class="token class-name">IHttpRequest</span> req<span class="token punctuation">,</span> <span class="token class-name">IHttpResponse</span> res<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">object</span></span> requestDto<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        req<span class="token punctuation">.</span>Items<span class="token punctuation">[</span><span class="token string">&quot;View&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> req<span class="token punctuation">.</span><span class="token function">GetParam</span><span class="token punctuation">(</span><span class="token string">&quot;View&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        req<span class="token punctuation">.</span>Items<span class="token punctuation">[</span><span class="token string">&quot;Template&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> req<span class="token punctuation">.</span><span class="token function">GetParam</span><span class="token punctuation">(</span><span class="token string">&quot;Template&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>The last filter to set <code>req.Items[&quot;View&quot;]</code> wins.</p><h3 id="layout-templates" tabindex="-1">Layout Templates <a class="header-anchor" href="#layout-templates" aria-hidden="true">#</a></h3><p>Although the above example only shows how to select the View (e.g. Page Body), the exact same rules applies to select the Layout template via the <strong>Template</strong> field also on the HttpResult and DefaultView attribute. If a template is not specified the default <code>/Shared/_Layout.cshtml</code> is used.</p><h2 id="executing-razor-in-code" tabindex="-1">Executing Razor in Code <a class="header-anchor" href="#executing-razor-in-code" aria-hidden="true">#</a></h2><p>The <code>RazorFormat</code> plugin provides several APIs which lets you access Razor views independently from ServiceStack, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> razorFormat <span class="token operator">=</span> HostContext<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetPlugin</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>RazorFormat<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> razorView <span class="token operator">=</span> razorFormat<span class="token punctuation">.</span><span class="token function">GetViewPage</span><span class="token punctuation">(</span><span class="token string">&quot;MyView&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//e.g. /Views/MyView.cshtml</span>
<span class="token class-name"><span class="token keyword">var</span></span> html <span class="token operator">=</span> razorFormat<span class="token punctuation">.</span><span class="token function">RenderToHtml</span><span class="token punctuation">(</span>razorView<span class="token punctuation">,</span> dto<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="creating-pages-at-runtime" tabindex="-1">Creating Pages at Runtime <a class="header-anchor" href="#creating-pages-at-runtime" aria-hidden="true">#</a></h3><p>For views that don&#39;t exist you can use the <code>CreatePage()</code> API to dynamically create a Razor View from a dynamic string at runtime that can be later reused to generate HTML for multiple models:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> razorView <span class="token operator">=</span> razorFormat<span class="token punctuation">.</span><span class="token function">CreatePage</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;h3&gt;Hello @Model.name, the year is @DateTime.Now.Year&lt;/h3&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> htmlFoo <span class="token operator">=</span> razorFormat<span class="token punctuation">.</span><span class="token function">RenderToHtml</span><span class="token punctuation">(</span>razorView<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> name <span class="token operator">=</span> <span class="token string">&quot;foo&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> htmlBar <span class="token operator">=</span> razorFormat<span class="token punctuation">.</span><span class="token function">RenderToHtml</span><span class="token punctuation">(</span>razorView<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> name <span class="token operator">=</span> <span class="token string">&quot;bar&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Or if you don&#39;t need to reuse the page again, it can be done in 1-line with:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> html <span class="token operator">=</span> razorFormat<span class="token punctuation">.</span><span class="token function">CreateAndRenderToHtml</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;h3&gt;Hello @Model.name&lt;/h3&gt;&quot;</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">model</span><span class="token punctuation">:</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> name <span class="token operator">=</span> <span class="token string">&quot;foo&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="debuggable-razor-views" tabindex="-1">Debuggable Razor Views <a class="header-anchor" href="#debuggable-razor-views" aria-hidden="true">#</a></h2><p>Razor Views are now debuggable for <a href="/debugging#debugmode">Debug builds</a> by default, it can also be explicitly specified on:</p><div class="language-csharp"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">RazorFormat</span> <span class="token punctuation">{</span>
    IncludeDebugInformation <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    CompileFilter <span class="token operator">=</span> compileParams <span class="token operator">=&gt;</span> <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>The <code>CompileFilter</code> is an advanced option that lets modify the <code>CompilerParameters</code> used by the C# CodeDom provider to compile the Razor Views if needed.</p>`,23),p=[o];function c(l,i,r,u,k,d){return a(),n("div",null,p)}var g=s(t,[["render",c]]);export{h as __pageData,g as default};
