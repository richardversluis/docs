import{_ as s,c as n,o as a,a as e}from"./app.64b20f26.js";const h='{"title":"Serialization and Deserialization","description":"","frontmatter":{"slug":"serialization-deserialization","title":"Serialization and Deserialization"},"headers":[{"level":3,"title":"Passing complex objects in the Query String","slug":"passing-complex-objects-in-the-query-string"},{"level":2,"title":"Custom Media Types","slug":"custom-media-types"},{"level":3,"title":"Register a custom format","slug":"register-a-custom-format"},{"level":3,"title":"Encapsulate inside a plugin","slug":"encapsulate-inside-a-plugin"},{"level":3,"title":"Other ContentType Examples","slug":"other-contenttype-examples"},{"level":2,"title":"Reading in and De-Serializing ad-hoc custom requests","slug":"reading-in-and-de-serializing-ad-hoc-custom-requests"},{"level":3,"title":"Create a custom request dto binder","slug":"create-a-custom-request-dto-binder"},{"level":3,"title":"Uploading Files","slug":"uploading-files"},{"level":3,"title":"Reading directly from the Request Stream","slug":"reading-directly-from-the-request-stream"},{"level":3,"title":"Buffering the Request and Response Streams","slug":"buffering-the-request-and-response-streams"},{"level":3,"title":"Raw SOAP Message","slug":"raw-soap-message"}],"relativePath":"serialization-deserialization.md","lastUpdated":1645007721757}',t={},p=e(`__VP_STATIC_START__<h3 id="passing-complex-objects-in-the-query-string" tabindex="-1">Passing complex objects in the Query String <a class="header-anchor" href="#passing-complex-objects-in-the-query-string" aria-hidden="true">#</a></h3><p>ServiceStack uses the <a href="/jsv-format">JSV-Format</a> (JSON without quotes) to parse QueryStrings.</p><p>JSV lets you embed deep object graphs in QueryString as seen <a href="http://test.servicestack.net/json/reply/StoreLogs?Loggers=%5B%7BId:786,Devices:%5B%7BId:5955,Type:Panel,TimeStamp:1199303309,Channels:%5B%7BName:Temperature,Value:58%7D,%7BName:Status,Value:On%7D%5D%7D,%7BId:5956,Type:Tank,TimeStamp:1199303309,Channels:%5B%7BName:Volume,Value:10035%7D,%7BName:Status,Value:Full%7D%5D%7D%5D%7D%5D" target="_blank" rel="noopener noreferrer">this example url</a>:</p><div class="language-"><pre><code>http://test.servicestack.net/json/reply/StoreLogs?Loggers=[{Id:786,Devices:[{Id:5955,Type:Panel,
Channels:[{Name:Temperature,Value:58},{Name:Status,Value:On}]},
{Id:5956,Type:Tank,TimeStamp:1199303309,
Channels:[{Name:Volume,Value:10035},{Name:Status,Value:Full}]}]}]
</code></pre></div><p>If you want to change the default binding ServiceStack uses, you can register your own <strong>Custom Request Binder</strong>.</p><h2 id="custom-media-types" tabindex="-1">Custom Media Types <a class="header-anchor" href="#custom-media-types" aria-hidden="true">#</a></h2><p>ServiceStack serializes and deserializes your DTOs automatically. If you want to override the default serializers or you want to add a new format, you have to register your own <code>Content-Type</code>:</p><h3 id="register-a-custom-format" tabindex="-1">Register a custom format <a class="header-anchor" href="#register-a-custom-format" aria-hidden="true">#</a></h3><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">string</span></span> contentType <span class="token operator">=</span> <span class="token string">&quot;application/yourformat&quot;</span><span class="token punctuation">;</span> <span class="token comment">//To override JSON eg, write &quot;application/json&quot;</span>
<span class="token class-name"><span class="token keyword">var</span></span> serialize <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">IRequest</span> req<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">object</span></span> response<span class="token punctuation">,</span> <span class="token class-name">Stream</span> stream<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> deserialize <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Type</span> type<span class="token punctuation">,</span> <span class="token class-name">Stream</span> stream<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">;</span>

<span class="token comment">//In AppHost Configure method</span>
<span class="token comment">//Pass two delegates for serialization and deserialization</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>ContentTypes<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>contentType<span class="token punctuation">,</span> serialize<span class="token punctuation">,</span> deserialize<span class="token punctuation">)</span><span class="token punctuation">;</span>	
</code></pre></div><h3 id="encapsulate-inside-a-plugin" tabindex="-1">Encapsulate inside a plugin <a class="header-anchor" href="#encapsulate-inside-a-plugin" aria-hidden="true">#</a></h3><p>If you&#39;re looking to standardize on a custom implementation, it&#39;s recommended to wrap the registration inside a plugin.</p><p>E.g. here&#39;s how you can change ServiceStack to use .NET&#39;s <code>XmlSerializer</code> instead of its <code>DataContractSerializer</code> default:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">XmlSerializerFormat</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IPlugin</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Serialize</span><span class="token punctuation">(</span><span class="token class-name">IRequest</span> req<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">object</span></span> response<span class="token punctuation">,</span> <span class="token class-name">Stream</span> stream<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> serializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">XmlSerializer</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        serializer<span class="token punctuation">.</span><span class="token function">Serialize</span><span class="token punctuation">(</span>stream<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Deserialize</span><span class="token punctuation">(</span><span class="token class-name">Type</span> type<span class="token punctuation">,</span> <span class="token class-name">Stream</span> stream<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> serializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">XmlSerializer</span><span class="token punctuation">(</span>type<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> obj <span class="token operator">=</span> <span class="token punctuation">(</span>Type<span class="token punctuation">)</span> serializer<span class="token punctuation">.</span><span class="token function">Deserialize</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> obj<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Register</span><span class="token punctuation">(</span><span class="token class-name">IAppHost</span> appHost<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        appHost<span class="token punctuation">.</span>ContentTypes<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>MimeTypes<span class="token punctuation">.</span>Xml<span class="token punctuation">,</span> Serialize<span class="token punctuation">,</span> Deserialize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Where it can then be easily registered as a regular <a href="/plugins">plugin</a>:</p><div class="language-csharp"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">XmlSerializerFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="other-contenttype-examples" tabindex="-1">Other ContentType Examples <a class="header-anchor" href="#other-contenttype-examples" aria-hidden="true">#</a></h3><p>The <a href="/protobuf-format">Protobuf-format</a> shows an example of registering a new format whilst the <a href="http://northwind.netcore.io/vcard-format.htm" target="_blank" rel="noopener noreferrer">Northwind VCard Format</a> shows an example of creating a custom media type in ServiceStack.</p><p>For reference see registration examples of ServiceStack&#39;s different Formats:</p><ul><li><a href="https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Formats/CsvFormat.cs" target="_blank" rel="noopener noreferrer">CSV</a></li><li><a href="https://github.com/ServiceStack/ServiceStack/blob/6e584877125fa0750db10700a6f1a271a7ef918a/src/ServiceStack.MsgPack/MsgPackFormat.cs#L67" target="_blank" rel="noopener noreferrer">MsgPack</a></li><li><a href="https://github.com/ServiceStack/ServiceStack/blob/6e584877125fa0750db10700a6f1a271a7ef918a/src/ServiceStack.ProtoBuf/ProtoBufFormat.cs#L12" target="_blank" rel="noopener noreferrer">Protobuf</a></li><li><a href="https://github.com/ServiceStack/ServiceStack/blob/6e584877125fa0750db10700a6f1a271a7ef918a/src/ServiceStack.Wire/WireServiceClient.cs#L64" target="_blank" rel="noopener noreferrer">Wire</a></li><li><a href="https://github.com/ServiceStack/ServiceStack/blob/6e584877125fa0750db10700a6f1a271a7ef918a/src/ServiceStack/Formats/SoapFormat.cs#L29" target="_blank" rel="noopener noreferrer">SOAP</a></li></ul><h4 id="async-contenttypes-formats" tabindex="-1">Async ContentTypes Formats <a class="header-anchor" href="#async-contenttypes-formats" aria-hidden="true">#</a></h4><p>The async registration APIs are for Content-Type Formats which perform Async I/O, most serialization formats don&#39;t except for HTML View Engines which can perform Async I/O when rendering views, which are all registered using the <code>RegisterAsync</code> APIs:</p><div class="language-csharp"><pre><code>appHost<span class="token punctuation">.</span>ContentTypes<span class="token punctuation">.</span><span class="token function">RegisterAsync</span><span class="token punctuation">(</span>MimeTypes<span class="token punctuation">.</span>Html<span class="token punctuation">,</span> SerializeToStreamAsync<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
appHost<span class="token punctuation">.</span>ContentTypes<span class="token punctuation">.</span><span class="token function">RegisterAsync</span><span class="token punctuation">(</span>MimeTypes<span class="token punctuation">.</span>JsonReport<span class="token punctuation">,</span> SerializeToStreamAsync<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
appHost<span class="token punctuation">.</span>ContentTypes<span class="token punctuation">.</span><span class="token function">RegisterAsync</span><span class="token punctuation">(</span>MimeTypes<span class="token punctuation">.</span>MarkdownText<span class="token punctuation">,</span> SerializeToStreamAsync<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="reading-in-and-de-serializing-ad-hoc-custom-requests" tabindex="-1">Reading in and De-Serializing ad-hoc custom requests <a class="header-anchor" href="#reading-in-and-de-serializing-ad-hoc-custom-requests" aria-hidden="true">#</a></h2><p>There are 2 ways to deserialize your own custom format, via attaching a custom request binder for a particular service or marking your service with <code>IRequiresRequestStream</code> which will skip auto-deserialization and inject the <a href="http://ASP.NET" target="_blank" rel="noopener noreferrer">ASP.NET</a> Request stream instead.</p><h3 id="create-a-custom-request-dto-binder" tabindex="-1">Create a custom request dto binder <a class="header-anchor" href="#create-a-custom-request-dto-binder" aria-hidden="true">#</a></h3><p>You can register custom binders in your AppHost by using the example below:</p><div class="language-cs"><pre><code>appHost<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">RegisterRequestBinder</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>MyRequest<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>httpReq <span class="token operator">=&gt;</span> <span class="token range operator">..</span><span class="token punctuation">.</span> requestDto<span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// or:</span>
appHost<span class="token punctuation">.</span>RequestBinders<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">MyRequest</span><span class="token punctuation">)</span><span class="token punctuation">,</span> httpReq <span class="token operator">=&gt;</span> <span class="token range operator">..</span><span class="token punctuation">.</span> requestDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>This gives you access to the IHttpRequest object letting you parse it manually so you can construct and return the strong-typed request DTO manually which will be passed to the service instead.</p><h3 id="uploading-files" tabindex="-1">Uploading Files <a class="header-anchor" href="#uploading-files" aria-hidden="true">#</a></h3><p>You can access uploaded files independently of the Request DTO using <code>Request.Files</code>. e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Post</span><span class="token punctuation">(</span><span class="token class-name">MyFileUpload</span> request<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Files<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> uploadedFile <span class="token operator">=</span> <span class="token keyword">base</span><span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        uploadedFile<span class="token punctuation">.</span><span class="token function">SaveTo</span><span class="token punctuation">(</span>MyUploadsDirPath<span class="token punctuation">.</span><span class="token function">CombineWith</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span>FileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> HttpResult<span class="token punctuation">.</span><span class="token function">Redirect</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>ServiceStack&#39;s <a href="http://imgur.servicestack.net" target="_blank" rel="noopener noreferrer">imgur.servicestack.net</a> example shows how to access the <a href="https://github.com/ServiceStackApps/Imgur/blob/master/src/Imgur/Global.asax.cs#L62" target="_blank" rel="noopener noreferrer">byte stream of multiple uploaded files</a>, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Post</span><span class="token punctuation">(</span><span class="token class-name">Upload</span> request<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> uploadedFile <span class="token keyword">in</span> <span class="token keyword">base</span><span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Files
       <span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>uploadedFile <span class="token operator">=&gt;</span> uploadedFile<span class="token punctuation">.</span>ContentLength <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> ms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MemoryStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            uploadedFile<span class="token punctuation">.</span><span class="token function">WriteTo</span><span class="token punctuation">(</span>ms<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">WriteImage</span><span class="token punctuation">(</span>ms<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> HttpResult<span class="token punctuation">.</span><span class="token function">Redirect</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="reading-directly-from-the-request-stream" tabindex="-1">Reading directly from the Request Stream <a class="header-anchor" href="#reading-directly-from-the-request-stream" aria-hidden="true">#</a></h3><p>Instead of registering a custom binder you can skip the serialization of the request DTO, you can add the <a href="https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Interfaces/Web/IRequiresRequestStream.cs" target="_blank" rel="noopener noreferrer">IRequiresRequestStream</a> interface to directly retrieve the stream without populating the request DTO.</p><div class="language-csharp"><pre><code><span class="token comment">//Request DTO</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RawBytes</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IRequiresRequestStream</span></span>
<span class="token punctuation">{</span>
    <span class="token comment">/// &lt;summary&gt;</span>
    <span class="token comment">/// The raw Http Request Input Stream</span>
    <span class="token comment">/// &lt;/summary&gt;</span>
    <span class="token return-type class-name">Stream</span> RequestStream <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Which tells ServiceStack to skip trying to deserialize the request so you can read in the raw HTTP Request body yourself, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span></span> <span class="token function">PostAsync</span><span class="token punctuation">(</span><span class="token class-name">RawBytes</span> request<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bytes <span class="token operator">=</span> <span class="token keyword">await</span> request<span class="token punctuation">.</span>RequestStream<span class="token punctuation">.</span><span class="token function">ReadFullyAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> text <span class="token operator">=</span> bytes<span class="token punctuation">.</span><span class="token function">FromUtf8Bytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//if text was sent</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="buffering-the-request-and-response-streams" tabindex="-1">Buffering the Request and Response Streams <a class="header-anchor" href="#buffering-the-request-and-response-streams" aria-hidden="true">#</a></h3><p>ServiceStack&#39;s Request and Response stream are non-buffered (i.e. forward-only) by default. This can be changed at runtime using a <code>PreRequestFilters</code> to allow the Request Body and Response Output stream to be re-read multiple times should your Services need it:</p><div class="language-csharp"><pre><code>appHost<span class="token punctuation">.</span>PreRequestFilters<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token punctuation">(</span>httpReq<span class="token punctuation">,</span> httpRes<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    httpReq<span class="token punctuation">.</span>UseBufferedStream <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>  <span class="token comment">// Buffer Request Input</span>
    httpRes<span class="token punctuation">.</span>UseBufferedStream <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>  <span class="token comment">// Buffer Response Output</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Which you&#39;ll then be able to re-read the Request Input Stream with:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">string</span></span> textBody <span class="token operator">=</span> <span class="token keyword">await</span> httpReq<span class="token punctuation">.</span><span class="token function">GetRawBodyAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//read as string</span>

<span class="token class-name">ReadOnlySpan<span class="token punctuation">&lt;</span><span class="token keyword">byte</span><span class="token punctuation">&gt;</span></span> bytes <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>MemoryStream<span class="token punctuation">)</span>httpReq<span class="token punctuation">.</span>InputStream<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetBufferAsSpan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//read as bytes</span>
</code></pre></div><h3 id="raw-soap-message" tabindex="-1">Raw SOAP Message <a class="header-anchor" href="#raw-soap-message" aria-hidden="true">#</a></h3><p>You can access raw WCF Message when accessed with the SOAP endpoints in your Service with <code>IHttpRequest.GetSoapMessage()</code> extension method, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name">Message</span> requestMsg <span class="token operator">=</span> <span class="token keyword">base</span><span class="token punctuation">.</span>Request<span class="token punctuation">.</span><span class="token function">GetSoapMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>To tell ServiceStack to skip Deserializing the SOAP request entirely, add the <code>IRequiresSoapMessage</code> interface to your Request DTO, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RawWcfMessage</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IRequiresSoapMessage</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">Message</span> Message <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Post</span><span class="token punctuation">(</span><span class="token class-name">RawWcfMessage</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    request<span class="token punctuation">.</span>Message<span class="token range operator">..</span><span class="token punctuation">.</span> <span class="token comment">//Raw WCF SOAP Message</span>
<span class="token punctuation">}</span>
</code></pre></div>__VP_STATIC_END__`,48),o=[p];function c(l,u,i,r,k,d){return a(),n("div",null,o)}var g=s(t,[["render",c]]);export{h as __pageData,g as default};
