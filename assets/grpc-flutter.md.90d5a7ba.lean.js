import{_ as n,c as s,o as a,a as t}from"./app.64b20f26.js";const m='{"title":"gRPC protoc Flutter Dart Client","description":"","frontmatter":{"slug":"grpc-flutter","title":"gRPC protoc Flutter Dart Client"},"headers":[{"level":2,"title":"Flutter protoc generated GrpcServiceClient Example","slug":"flutter-protoc-generated-grpcserviceclient-example"},{"level":3,"title":"Flutter protoc gRPC insecure Example","slug":"flutter-protoc-grpc-insecure-example"},{"level":3,"title":"Flutter protoc gRPC SSL Example","slug":"flutter-protoc-grpc-ssl-example"}],"relativePath":"grpc-flutter.md","lastUpdated":1645007720873}',p={},e=t(`__VP_STATIC_START__<p><a href="https://youtu.be/t83gDzEGpac" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/NetCoreApps/todo-world/master/src/TodoWorld/wwwroot/assets/img/flutter/flutter-grpc-ssl.png" alt=""></a></p><div class="info custom-block"><p class="custom-block-title">YouTube</p><p><a href="https://youtu.be/t83gDzEGpac" target="_blank" rel="noopener noreferrer">youtu.be/t83gDzEGpac</a></p></div><h2 id="flutter-protoc-generated-grpcserviceclient-example" tabindex="-1">Flutter protoc generated GrpcServiceClient Example <a class="header-anchor" href="#flutter-protoc-generated-grpcserviceclient-example" aria-hidden="true">#</a></h2><p>Install <a href="https://docs.servicestack.net/dotnet-tool" target="_blank" rel="noopener noreferrer">x dotnet tool</a>:</p><div class="language-bash"><pre><code>$ dotnet tool <span class="token function">install</span> --global x 
</code></pre></div><p>Create a new Flutter project with <a href="https://developer.android.com/studio" target="_blank" rel="noopener noreferrer">Android Studio</a>:</p><p><img src="https://raw.githubusercontent.com/NetCoreApps/todo-world/master/src/TodoWorld/wwwroot/assets/img/flutter/new-flutter-project.png" alt=""></p><p>Add protoc generated TodoWorld DTOs and gRPC GrpcServiceClient to <code>lib/</code> folder:</p><div class="language-bash"><pre><code>$ x proto-dart https://todoworld.servicestack.net -out lib
</code></pre></div><p>Add required dependencies to <strong>pubspec.yaml</strong>:</p><div class="language-yaml"><pre><code><span class="token key atrule">dependencies</span><span class="token punctuation">:</span>
  <span class="token key atrule">fixnum</span><span class="token punctuation">:</span> ^0.10.11
  <span class="token key atrule">async</span><span class="token punctuation">:</span> ^2.2.0
  <span class="token key atrule">protobuf</span><span class="token punctuation">:</span> ^1.0.1
  <span class="token key atrule">grpc</span><span class="token punctuation">:</span> ^2.1.3
</code></pre></div><p>Install dependencies by running <code>pub get</code> or clicking on <strong>Get Dependencies</strong> link in the IDE:</p><p><img src="https://raw.githubusercontent.com/NetCoreApps/todo-world/master/src/TodoWorld/wwwroot/assets/img/flutter/pub-get.png" alt=""></p><h3 id="flutter-protoc-grpc-insecure-example" tabindex="-1">Flutter protoc gRPC insecure Example <a class="header-anchor" href="#flutter-protoc-grpc-insecure-example" aria-hidden="true">#</a></h3><p>Use protoc generated DTOs and <code>GrpcServiceClient</code> to call TodoWorld gRPC Service in <code>_MyHomePageState</code> class in <code>bin/main.dart</code>:</p><div class="language-dart"><pre><code><span class="token keyword">import</span> <span class="token string">&#39;package:flutter/material.dart&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;package:flutter_grpc/services.pbgrpc.dart&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;package:grpc/grpc.dart&#39;</span><span class="token punctuation">;</span>

<span class="token comment">//...</span>

<span class="token keyword">class</span> _MyHomePageState <span class="token keyword">extends</span> <span class="token class-name">State</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MyHomePage</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token class-name">GrpcServicesClient</span> client <span class="token operator">=</span> <span class="token class-name">GrpcServicesClient</span><span class="token punctuation">(</span>
      <span class="token class-name">ClientChannel</span><span class="token punctuation">(</span><span class="token string">&#39;todoworld.servicestack.net&#39;</span><span class="token punctuation">,</span> port<span class="token punctuation">:</span><span class="token number">50054</span><span class="token punctuation">,</span>
          options<span class="token punctuation">:</span><span class="token class-name">ChannelOptions</span><span class="token punctuation">(</span>credentials<span class="token punctuation">:</span> <span class="token class-name">ChannelCredentials</span><span class="token punctuation">.</span><span class="token function">insecure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">void</span> <span class="token function">_callGrpcService</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> response <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">getHello</span><span class="token punctuation">(</span><span class="token class-name">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>name<span class="token operator">=</span><span class="token string">&quot;Flutter gRPC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      result <span class="token operator">=</span> response<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Capture the result gRPC API request in the <code>result</code> String then change the Widget <code>build()</code> to display that instead of <code>_counter</code> then update the <code>floatingActionButton</code> to call your <code>_callGrpcService</code> method instead:</p><div class="language-dart"><pre><code>  <span class="token metadata symbol">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Scaffold</span><span class="token punctuation">(</span>
      appBar<span class="token punctuation">:</span> <span class="token class-name">AppBar</span><span class="token punctuation">(</span>
        title<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span>widget<span class="token punctuation">.</span>title<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
      body<span class="token punctuation">:</span> <span class="token class-name">Center</span><span class="token punctuation">(</span>
        child<span class="token punctuation">:</span> <span class="token class-name">Column</span><span class="token punctuation">(</span>
          mainAxisAlignment<span class="token punctuation">:</span> <span class="token class-name">MainAxisAlignment</span><span class="token punctuation">.</span>center<span class="token punctuation">,</span>
          children<span class="token punctuation">:</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Widget</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span>
            <span class="token class-name">Text</span><span class="token punctuation">(</span>
              <span class="token string">&#39;gRPC Service Example:&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token class-name">Text</span><span class="token punctuation">(</span>
              <span class="token string">&#39;$result&#39;</span><span class="token punctuation">,</span>
              style<span class="token punctuation">:</span> <span class="token class-name">Theme</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">.</span>textTheme<span class="token punctuation">.</span>display1<span class="token punctuation">,</span>
            <span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
      floatingActionButton<span class="token punctuation">:</span> <span class="token class-name">FloatingActionButton</span><span class="token punctuation">(</span>
        onPressed<span class="token punctuation">:</span> _callGrpcService<span class="token punctuation">,</span>
        tooltip<span class="token punctuation">:</span> <span class="token string">&#39;gRPC Service Example&#39;</span><span class="token punctuation">,</span>
        child<span class="token punctuation">:</span> <span class="token class-name">Icon</span><span class="token punctuation">(</span><span class="token class-name">Icons</span><span class="token punctuation">.</span>play_arrow<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre></div><p>With Flutter&#39;s live-reload capability you should be able to see your changes instantly in the Android emulator where clicking the icon should display the result of your plain-text gRPC Service Request:</p><p><img src="https://raw.githubusercontent.com/NetCoreApps/todo-world/master/src/TodoWorld/wwwroot/assets/img/flutter/flutter-grpc-insecure.png" alt=""></p><h3 id="flutter-protoc-grpc-ssl-example" tabindex="-1">Flutter protoc gRPC SSL Example <a class="header-anchor" href="#flutter-protoc-grpc-ssl-example" aria-hidden="true">#</a></h3><p>To use gRPC SSL we&#39;ll need a copy of our gRPC&#39;s Service SSL Certificate which we can make available to our Flutter App by saving it to our App&#39;s <code>assets</code> directory:</p><div class="language-bash"><pre><code>$ <span class="token function">mkdir</span> assets
$ x get https://todoworld.servicestack.net/grpc.crt -out assets
</code></pre></div><p>As loading assets is an asynchronous operation we&#39;ll need to preload it either by loading it in <code>main()</code> and passing it as an attribute down to all our components or we can load it in our State widget&#39;s <code>initState()</code> method:</p><div class="language-dart"><pre><code><span class="token keyword">class</span> _MyHomePageState <span class="token keyword">extends</span> <span class="token class-name">State</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MyHomePage</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token class-name">GrpcServicesClient</span> client<span class="token punctuation">;</span>

  <span class="token metadata symbol">@override</span>
  <span class="token keyword">void</span> <span class="token function">initState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">initState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">DefaultAssetBundle</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string">&quot;assets/grpc.crt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      client <span class="token operator">=</span> <span class="token class-name">GrpcServicesClient</span><span class="token punctuation">(</span>
          <span class="token class-name">ClientChannel</span><span class="token punctuation">(</span><span class="token string">&#39;todoworld.servicestack.net&#39;</span><span class="token punctuation">,</span> port<span class="token punctuation">:</span><span class="token number">50051</span><span class="token punctuation">,</span>
              options<span class="token punctuation">:</span><span class="token class-name">ChannelOptions</span><span class="token punctuation">(</span>credentials<span class="token punctuation">:</span> <span class="token class-name">ChannelCredentials</span><span class="token punctuation">.</span><span class="token function">secure</span><span class="token punctuation">(</span>
                  certificates<span class="token punctuation">:</span> bytes<span class="token punctuation">.</span>buffer<span class="token punctuation">.</span><span class="token function">asUint8List</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                  authority<span class="token punctuation">:</span> <span class="token string">&#39;todoworld.servicestack.net&#39;</span>
              <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">void</span> <span class="token function">_callGrpcService</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> response <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">getHello</span><span class="token punctuation">(</span><span class="token class-name">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>name<span class="token operator">=</span><span class="token string">&quot;gRPC SSL&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      result <span class="token operator">=</span> response<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>You&#39;ll also need to update the port to refer to the gRPC SSL endpoint, update your <code>Hello</code> request so we can verify the result is from the new gRPC SSL request. Now after live-reload has completed, clicking on the icon will show the response of a gRPC SSL Request:</p><p><img src="https://raw.githubusercontent.com/NetCoreApps/todo-world/master/src/TodoWorld/wwwroot/assets/img/flutter/flutter-grpc-ssl.png" alt=""></p><p>Refer to <a href="https://github.com/NetCoreApps/todo-world/tree/master/src/mobile/flutter/flutter_grpc" target="_blank" rel="noopener noreferrer">/src/mobile/flutter/flutter_grpc</a> for a complete example project.</p>__VP_STATIC_END__`,28),o=[e];function c(l,u,i,r,k,d){return a(),s("div",null,o)}var h=n(p,[["render",c]]);export{m as __pageData,h as default};
