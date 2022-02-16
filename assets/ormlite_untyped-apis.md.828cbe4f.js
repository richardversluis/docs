import{_ as n,c as s,o as a,a as t}from"./app.64b20f26.js";const y='{"title":"OrmLite Untyped API and T4 Templates","description":"","frontmatter":{"title":"OrmLite Untyped API and T4 Templates"},"headers":[{"level":2,"title":"T4 Template Support","slug":"t4-template-support"}],"relativePath":"ormlite/untyped-apis.md","lastUpdated":1645007721717}',p={},e=t(`<p>The <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/blob/master/src/ServiceStack.OrmLite/IUntypedApi.cs" target="_blank" rel="noopener noreferrer">IUntypedApi</a> interface is useful for when you only have access to a late-bound object runtime type which is accessible via <code>db.CreateTypedApi</code>, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BaseClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Target</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BaseClass</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token class-name"><span class="token keyword">var</span></span> row <span class="token operator">=</span> <span class="token punctuation">(</span>BaseClass<span class="token punctuation">)</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Target</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> Name <span class="token operator">=</span> <span class="token string">&quot;Foo&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> useType <span class="token operator">=</span> row<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> typedApi <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">CreateTypedApi</span><span class="token punctuation">(</span>useType<span class="token punctuation">)</span><span class="token punctuation">;</span>

db<span class="token punctuation">.</span><span class="token function">DropAndCreateTables</span><span class="token punctuation">(</span>useType<span class="token punctuation">)</span><span class="token punctuation">;</span>

typedApi<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> typedRow <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Target<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
typedRow<span class="token punctuation">.</span>Name <span class="token comment">//= Foo</span>

<span class="token class-name"><span class="token keyword">var</span></span> updateRow <span class="token operator">=</span> <span class="token punctuation">(</span>BaseClass<span class="token punctuation">)</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Target</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> Name <span class="token operator">=</span> <span class="token string">&quot;Bar&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

typedApi<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span>updateRow<span class="token punctuation">)</span><span class="token punctuation">;</span>

typedRow <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Target<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
typedRow<span class="token punctuation">.</span>Name <span class="token comment">//= Bar</span>

typedApi<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span>typedRow<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

typedRow <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Target<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//= null</span>
</code></pre></div><h2 id="t4-template-support" tabindex="-1">T4 Template Support <a class="header-anchor" href="#t4-template-support" aria-hidden="true">#</a></h2><p><a href="https://github.com/ServiceStack/ServiceStack.OrmLite/tree/master/src/T4" target="_blank" rel="noopener noreferrer">OrmLite&#39;s T4 Template</a> are useful in database-first development or when wanting to use OrmLite with an existing RDBMS by automatically generating POCO&#39;s and strong-typed wrappers for executing stored procedures.</p><div class="language-"><pre><code>PM&gt; Install-Package ServiceStack.OrmLite.T4
</code></pre></div>`,5),o=[e];function c(l,u,k,r,i,d){return a(),s("div",null,o)}var g=n(p,[["render",c]]);export{y as __pageData,g as default};
