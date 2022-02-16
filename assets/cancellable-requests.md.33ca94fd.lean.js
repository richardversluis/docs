import{_ as n,c as a,o as s,a as e}from"./app.64b20f26.js";const h='{"title":"Cancellable Requests","description":"","frontmatter":{"slug":"cancellable-requests","title":"Cancellable Requests"},"headers":[{"level":2,"title":"Designing a Cancellable Service","slug":"designing-a-cancellable-service"},{"level":2,"title":"Cancelling a remote Service","slug":"cancelling-a-remote-service"}],"relativePath":"cancellable-requests.md","lastUpdated":1645007720869}',t={},c=e(`__VP_STATIC_START__<p>The Cancellable Requests Feature makes it easy to design long-running Services that are cancellable with an external Web Service Request. To enable this feature, register the <code>CancellableRequestsFeature</code> plugin:</p><div class="language-csharp"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">CancellableRequestsFeature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="designing-a-cancellable-service" tabindex="-1">Designing a Cancellable Service <a class="header-anchor" href="#designing-a-cancellable-service" aria-hidden="true">#</a></h2><p>Then in your Service you can wrap your implementation within a disposable <code>ICancellableRequest</code> block which encapsulates a Cancellation Token that you can watch to determine if the Request has been cancelled, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Any</span><span class="token punctuation">(</span><span class="token class-name">TestCancelRequest</span> req<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> cancellableRequest <span class="token operator">=</span> <span class="token keyword">base</span><span class="token punctuation">.</span>Request<span class="token punctuation">.</span><span class="token function">CreateCancellableRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//Simulate long-running request</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            cancellableRequest<span class="token punctuation">.</span>Token<span class="token punctuation">.</span><span class="token function">ThrowIfCancellationRequested</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="cancelling-a-remote-service" tabindex="-1">Cancelling a remote Service <a class="header-anchor" href="#cancelling-a-remote-service" aria-hidden="true">#</a></h2><p>To be able to cancel a Server request on the client, the client must first <strong>Tag</strong> the request which it does by assigning the <code>X-Tag</code> HTTP Header with a user-defined string in a Request Filter before calling a cancellable Service, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> tag <span class="token operator">=</span> Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JsonServiceClient</span><span class="token punctuation">(</span>baseUri<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    RequestFilter <span class="token operator">=</span> req <span class="token operator">=&gt;</span> req<span class="token punctuation">.</span>Headers<span class="token punctuation">[</span>HttpHeaders<span class="token punctuation">.</span>XTag<span class="token punctuation">]</span> <span class="token operator">=</span> tag
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> responseTask <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">PostAsync</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">TestCancelRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Then at anytime whilst the Service is still executing the remote request can be cancelled by calling the <code>CancelRequest</code> Service with the specified <strong>Tag</strong>, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> cancelResponse <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Post</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">CancelRequest</span> <span class="token punctuation">{</span> Tag <span class="token operator">=</span> tag <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>If it was successfully cancelled it will return a <code>CancelRequestResponse</code> DTO with the elapsed time of how long the Service ran for. Otherwise if the remote Service had completed or never existed it will throw <strong>404 Not Found</strong> in a <code>WebServiceException</code>.</p>__VP_STATIC_END__`,11),p=[c];function o(l,i,u,r,k,d){return s(),a("div",null,p)}var v=n(t,[["render",o]]);export{h as __pageData,v as default};
