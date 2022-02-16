import{_ as s,c as t,o as e,a,b as n}from"./app.64b20f26.js";const f='{"title":"Wire Format","description":"","frontmatter":{"slug":"wire-format","title":"Wire Format"},"headers":[{"level":2,"title":"Installing via NuGet","slug":"installing-via-nuget"},{"level":2,"title":"Client Usage","slug":"client-usage"}],"relativePath":"wire-format.md","lastUpdated":1645007721769}',o={},c=a('',4),p=n("div",{class:"nuget-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[n("div",{class:"flex-grow bg-gray-700"},[n("div",{class:"pl-4 py-1 pb-1.5 align-middle text-lg text-white"},[n("p",null,[n("code",null,'<PackageReference Include="ServiceStack.Wire" Version="6.*" />')])])]),n("div",{class:"flex"},[n("div",{class:"bg-sky-500 text-white p-1.5 pb-0"},[n("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),n("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),i=a(`__VP_STATIC_START__<p>After the NuGet Package is added to your Project, enable the Wire format in your <code>AppHost</code> with:</p><div class="language-cs"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">WireFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>The NuGet plugin also includes the <strong>WireServiceClient</strong> client below so you can easily call it from any C# Client.</p><h2 id="client-usage" tabindex="-1">Client Usage <a class="header-anchor" href="#client-usage" aria-hidden="true">#</a></h2><p>Just like the rest of ServiceStack C# Clients, <code>WireServiceClient</code> is interchangeable with the other Service clients and provides and end-to-end API for consuming ServiceStack&#39;s Services, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">WireServiceClient</span><span class="token punctuation">(</span>BaseUri<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List<span class="token punctuation">&lt;</span>Todo<span class="token punctuation">&gt;</span></span> all <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Todos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// Count = 0</span>

<span class="token class-name"><span class="token keyword">var</span></span> todo <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Post</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Todo</span> <span class="token punctuation">{</span> Content <span class="token operator">=</span> <span class="token string">&quot;New TODO&quot;</span><span class="token punctuation">,</span> Order <span class="token operator">=</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// todo.Id = 1</span>
all <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Todos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                      <span class="token comment">// Count = 1</span>

todo<span class="token punctuation">.</span>Content <span class="token operator">=</span> <span class="token string">&quot;Updated TODO&quot;</span><span class="token punctuation">;</span>
todo <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>todo<span class="token punctuation">)</span><span class="token punctuation">;</span>                            <span class="token comment">// todo.Content = Updated TODO</span>

client<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Todos</span><span class="token punctuation">(</span>todo<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
all <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Todos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   
</code></pre></div>__VP_STATIC_END__`,6),l=[c,p,i];function r(u,k,d,g,h,v){return e(),t("div",null,l)}var _=s(o,[["render",r]]);export{f as __pageData,_ as default};
