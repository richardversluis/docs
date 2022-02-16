import{_ as n,c as a,o as s,a as t}from"./app.64b20f26.js";const y='{"title":"Anti Forgery","description":"","frontmatter":{"title":"Anti Forgery","slug":"anti-forgery"},"relativePath":"auth-anti-forgery.md","lastUpdated":1645007720865}',p={},e=t(`<p>You can leverage <a href="http://ASP.NET" target="_blank" rel="noopener noreferrer">ASP.NET</a> MVC&#39;s AntiForgery token support your Razor pages by embedding the token in your HTML Forms with:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/antiforgery/test<span class="token punctuation">&quot;</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>POST<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    @Html.AntiForgeryToken()
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Field<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Test<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>        
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>submit<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Which you can then validate in your Service with:</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;/antiforgery/test&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AntiForgeryTest</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Field <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AntiForgeryService</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Service</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Any</span><span class="token punctuation">(</span><span class="token class-name">AntiForgeryTest</span> request<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        AntiForgery<span class="token punctuation">.</span><span class="token function">Validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p><a href="http://ASP.NET" target="_blank" rel="noopener noreferrer">ASP.NET</a> MVC&#39;s AntiForgery API is only available in the .NET Framework</p></div>`,5),o=[e];function c(l,u,r,i,k,g){return s(),a("div",null,o)}var m=n(p,[["render",c]]);export{y as __pageData,m as default};
