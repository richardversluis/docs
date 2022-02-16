import{_ as t,c as a,o as r,a as e,b as n}from"./app.64b20f26.js";const S='{"title":"v4.0.35 Release Notes","description":"","frontmatter":{"title":"v4.0.35 Release Notes","slug":"v4-0-35"},"headers":[{"level":2,"title":"New TechStacks LiveDemo!","slug":"new-techstacks-livedemo"},{"level":3,"title":"View the Source","slug":"view-the-source"},{"level":3,"title":"HTML5 Routing and Full-page reloads","slug":"html5-routing-and-full-page-reloads"},{"level":2,"title":"ServerEvents now supports Multiple Channels per subscription","slug":"serverevents-now-supports-multiple-channels-per-subscription"},{"level":3,"title":"Chat Apps now support multiple Chat Rooms","slug":"chat-apps-now-support-multiple-chat-rooms"},{"level":2,"title":"Minor Changes and Fixes","slug":"minor-changes-and-fixes"},{"level":3,"title":"Framework Changes","slug":"framework-changes"},{"level":3,"title":"Auth Changes","slug":"auth-changes"},{"level":3,"title":"MQ Changes","slug":"mq-changes"},{"level":3,"title":"OrmLite Changes","slug":"ormlite-changes"},{"level":3,"title":"ServiceStack.Text Changes","slug":"servicestack-text-changes"},{"level":3,"title":"Dependencies Updated","slug":"dependencies-updated"}],"relativePath":"releases/v4_0_35.md","lastUpdated":1645007721745}',o={},s=e('<p>We&#39;re ending 2014 with a short release cycle primarily focused on a polished and fixes Release, ready for before everyone gets back at work - re-energized for a Happy New 2015 work year \u{1F603}</p><h2 id="new-techstacks-livedemo" tabindex="-1">New <a href="https://techstacks.io" target="_blank" rel="noopener noreferrer">TechStacks</a> LiveDemo! <a class="header-anchor" href="#new-techstacks-livedemo" aria-hidden="true">#</a></h2><p>We&#39;ve been gradually refining our modern <a href="https://github.com/ServiceStack/ServiceStackVS/blob/master/docs/angular-spa.md" target="_blank" rel="noopener noreferrer">AngularJS</a> and <a href="https://github.com/ServiceStackApps/Chat-React" target="_blank" rel="noopener noreferrer">React</a> Single Page App <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> templates which represents what we believe to be the optimal formula for developing future .NET-based JS Apps - utilizing a best-of-breed node.js, npm, bower, grunt/gulp build system.</p><p>To this end we&#39;re developing new Single Page Apps alongside to further refine these <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> templates and demonstrate their potential in using the pre-configured Grunt tasks to manage the full iterative client/server building, optimization and deployment dev workflows.</p><p>We&#39;re happy to be able to preview the latest Live Demo built on the <strong>AngularJS App</strong> <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> template in: <a href="https://techstacks.io" target="_blank" rel="noopener noreferrer">https://techstacks.io</a></p><p><a href="https://techstacks.io" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/img/livedemos/techstacks/screenshots/techstacks.png" alt="TechStacks"></a></p><p>TechStacks is a modern <a href="https://angularjs.org/" target="_blank" rel="noopener noreferrer">AngularJS</a> CRUD App that lets you Browse and Add Technology Stacks of popular StartUps. After Signing in you can add your own TechStacks and favorite technologies to create a personalized custom &#39;feed&#39; to view Websites and Apps built with your favorite programming languages and technologies.</p><p>TechStacks is based on a <a href="http://getbootstrap.com" target="_blank" rel="noopener noreferrer">Bootstrap template</a> with client-side features:</p><ul><li>HTML5 Routing to enable pretty urls, also supports full page reloads and back button support</li><li>Same Services supporting both human-readable Slugs or int primary keys</li><li>Responsive design supporting iPad Landscape and Portrait modes</li><li>Preloading and background data fetching to reduce flicker and maximize responsiveness</li><li><a href="https://disqus.com/" target="_blank" rel="noopener noreferrer">Disqus</a> commenting system</li><li><a href="http://harvesthq.github.io/chosen/" target="_blank" rel="noopener noreferrer">Chosen</a> for UX-friendly multi combo boxes</li></ul><p>and some of TechStacks back-end features include:</p><ul><li><a href="/authentication-and-authorization">Twitter and GitHub OAuth Providers</a></li><li>Substitutable <a href="https://github.com/ServiceStack/ServiceStack.OrmLite" target="_blank" rel="noopener noreferrer">OrmLite</a> RDBMS <a href="https://github.com/ServiceStackApps/TechStacks/blob/875e78910e43d2230f0925b71d5990497216511e/src/TechStacks/TechStacks/AppHost.cs#L49-L56" target="_blank" rel="noopener noreferrer">PostgreSQL and Sqlite</a> back-ends</li><li><a href="/autoquery">Auto Query</a> for automatic services of RDBMS tables</li><li><a href="/caching">RDBMS Sessions and In Memory Caching</a></li><li><a href="http://razor.servicestack.net" target="_blank" rel="noopener noreferrer">Smart Razor Views</a></li><li><a href="/validation">Fluent Validation</a></li></ul><p>TechStacks is a good example of the experience you can get running a packaged ServiceStack/AngularJS App on modest hardware - <a href="https://techstacks.io" target="_blank" rel="noopener noreferrer">techstacks.io</a> is currently running on a single <strong>m1.small</strong> AWS EC2 instance and <strong>db.t1.micro</strong> RDS PostgreSQL instance that hosts all <a href="https://github.com/ServiceStackApps/LiveDemos" target="_blank" rel="noopener noreferrer">Live Demos</a>.</p>',12),c=n("img",{src:"https://raw.githubusercontent.com/ServiceStack/Assets/master/img/release-notes/techstacks-client-layout.png",align:"right",hspace:"30"},null,-1),i=e(`<h3 id="view-the-source" tabindex="-1"><a href="https://github.com/ServiceStackApps/TechStacks" target="_blank" rel="noopener noreferrer">View the Source</a> <a class="header-anchor" href="#view-the-source" aria-hidden="true">#</a></h3><p>Checkout the <a href="https://github.com/ServiceStackApps/TechStacks" target="_blank" rel="noopener noreferrer">Source Code for TechStacks</a> for the full details to see how it&#39;s built. The project also includes an <a href="https://github.com/ServiceStackApps/TechStacks/tree/master/src/TechStacks/TechStacks/js" target="_blank" rel="noopener noreferrer">example client layout</a> for structuring larger AngularJS projects in an extensible layout files and folder structure:</p><h3 id="html5-routing-and-full-page-reloads" tabindex="-1">HTML5 Routing and Full-page reloads <a class="header-anchor" href="#html5-routing-and-full-page-reloads" aria-hidden="true">#</a></h3><p>One of the disadvantages of Single Page Apps is having to resort to hash-style <code>#!</code> url suffix hacks to prevent JavaScript apps from making full-page reloads. By utilizing <a href="https://docs.angularjs.org/guide/$location#html5-mode" target="_blank" rel="noopener noreferrer">AngularJS&#39;s HTML5 mode</a> we can take advantage of modern browsers support for HTML5 History API to retain the optimal pretty urls (we&#39;d have if this were a server generated website) whilst still retaining the responsiveness of JS Apps which are able to load just the minimum content required, i.e. instead of waiting for the full page rendering of Server generated pages and their resource dependencies to be loaded again.</p><p>ServiceStack has great support for these modern-style SPA&#39;s which lets you specify a fallback handler for <strong>HTML page requests</strong> with un-matched routes to return the same <code>/default.cshtml</code> home page so AngularJS is able to handle the request and perform the same client-side routing it would&#39;ve had the url been navigated from within the App - using the <a href="https://github.com/ServiceStackApps/TechStacks/blob/41efa5d8add1c4b0bdd449d6507878f2c8387bbc/src/TechStacks/TechStacks/AppHost.cs#L41" target="_blank" rel="noopener noreferrer">AppHost configuration below</a>:</p><div class="language-csharp"><pre><code><span class="token keyword">base</span><span class="token punctuation">.</span>CustomErrorHttpHandlers<span class="token punctuation">[</span>HttpStatusCode<span class="token punctuation">.</span>NotFound<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RazorHandler</span><span class="token punctuation">(</span><span class="token string">&quot;/default.cshtml&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>This lets you re-use pretty client-side routes like:</p><ul><li><a href="https://techstacks.io/tech/servicestack" target="_blank" rel="noopener noreferrer">https://techstacks.io/tech/servicestack</a></li></ul><p>And allow deep-link support for full round-trip requests (i.e. outside of AngularJS) - where since <code>/tech/servicestack</code> doesn&#39;t match any custom Server routes, ServiceStack instead responds with the above <code>/default.cshtml</code> Razor View. At which point AngularJS takes over and navigates to the internal route mapping that matches <code>/tech/servicestack</code>.</p><blockquote><p>To get the latest AngularJS and React.js App templates download the latest <a href="https://visualstudiogallery.msdn.microsoft.com/5bd40817-0986-444d-a77d-482e43a48da7" target="_blank" rel="noopener noreferrer">ServiceStackVS VS.NET Extension</a></p></blockquote><h2 id="serverevents-now-supports-multiple-channels-per-subscription" tabindex="-1">ServerEvents now supports Multiple Channels per subscription <a class="header-anchor" href="#serverevents-now-supports-multiple-channels-per-subscription" aria-hidden="true">#</a></h2><p>To ensure each Client only ever needs 1 ServerEvents subscription, subscriptions now support subscribing to multiple channels. Multi Channel Support is fully implemented in all <a href="/javascript-server-events-client">JavaScript ServerEvents</a> and <a href="/csharp-server-events-client">C#/.NET ServerEvents</a> Clients as well as both <a href="/server-events">back-end InMemory</a> and <a href="/redis-server-events">Redis ServerEvents</a> providers.</p><p>The API remains similar to the previous Single Channel Routes where in addition to subscribing to a single channel:</p><pre><code>/event-stream?channel=Home
</code></pre><p>Clients can also subscribe to multiple channels:</p><pre><code>/event-stream?channel=Home,Work,Play
</code></pre><blockquote><p>If preferred, clients can also use the more readable <strong>?channels=</strong> plural variable name</p></blockquote><p>And the above example again using the <a href="/csharp-server-events-client">C#/.NET ServerEvents Client</a>:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ServerEventsClient</span><span class="token punctuation">(</span>BaseUri<span class="token punctuation">,</span> <span class="token string">&quot;Home&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ServerEventsClient</span><span class="token punctuation">(</span>BaseUri<span class="token punctuation">,</span> <span class="token string">&quot;Home&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Work&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Play&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Multi-Channel subscriptions works conceptually similar to having multiple &quot;single channel&quot; subscriptions where multiple Join/Leave/Message events are fired for events occurring in each channel. For more details on this checkout the <a href="https://github.com/ServiceStack/ServiceStack/blob/42d08dee1f4945f1a7be29ac234ce1250e04de9b/tests/ServiceStack.WebHost.Endpoints.Tests/ServerEventTests.cs#L781" target="_blank" rel="noopener noreferrer">multi-channel ServerEvents tests</a>.</p><h3 id="chat-apps-now-support-multiple-chat-rooms" tabindex="-1">Chat Apps now support multiple Chat Rooms <a class="header-anchor" href="#chat-apps-now-support-multiple-chat-rooms" aria-hidden="true">#</a></h3><p>With this feature, we can now create Chat Apps that support multiple Chat Rooms using only a single ServerEvents subscription:</p><p><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/img/livedemos/chat-react-multichannels.png" alt="React Multi-Channel Chat"></p><blockquote><p>Multi-Channel React Chat preview</p></blockquote><p>Surprisingly it only took a small amount of code to add support for multiple chat rooms in all the different Chat Apps which now all support Multiple Chat rooms:</p><ul><li>Upgrade <a href="https://github.com/ServiceStackApps/Chat/commit/f23bb912791425abcba1bc724cd86cb4ab8cac82" target="_blank" rel="noopener noreferrer">jQuery Chat Client/Server</a> to support multiple Chat Rooms</li><li>Upgrade <a href="https://github.com/ServiceStackApps/Chat-React/commit/8969ce9c291d88f63d84500b3bb281c3b1f451c7" target="_blank" rel="noopener noreferrer">React Chat Client</a> to support multiple Chat Rooms</li><li>Upgrade <a href="https://github.com/ServiceStackApps/Chat-React/commit/cae43b6923771b02c28726dcfa4927d8490275ee" target="_blank" rel="noopener noreferrer">React Chat Server</a> to support multiple Chat Rooms</li><li>Upgrade <a href="https://github.com/ServiceStack/ServiceStack.Gap/commit/6ee72d81fcf7cd73573b686400500d7516f312b9" target="_blank" rel="noopener noreferrer">ServiceStack.Gap Chat Client/Server</a> to support multiple Chat Rooms</li></ul><p>Should you want to run the previous &quot;Single Room&quot; Chat Apps, they&#39;re available in the <strong>single-channel</strong> branches:</p><ul><li><a href="https://github.com/ServiceStackApps/Chat/tree/single-channel" target="_blank" rel="noopener noreferrer">jQuery Chat</a></li><li><a href="https://github.com/ServiceStackApps/Chat-React/tree/singe-channel" target="_blank" rel="noopener noreferrer">React Chat</a></li></ul><blockquote><p>Multi-Channel support is mostly backwards compatible where all Chat Apps can be run as-is when upgraded to use the latest ServiceStack v4.0.35+ - but it does require upgrading both v4.0.35 Client and Server libraries together.</p></blockquote><h2 id="minor-changes-and-fixes" tabindex="-1">Minor Changes and Fixes <a class="header-anchor" href="#minor-changes-and-fixes" aria-hidden="true">#</a></h2><p>Rest of this release was focused on minor features, changes and fixes:</p><h3 id="framework-changes" tabindex="-1">Framework Changes <a class="header-anchor" href="#framework-changes" aria-hidden="true">#</a></h3><ul><li>Custom HTTP Handlers now execute Global Request Filters <a href="https://github.com/ServiceStack/ServiceStack/commit/709fb73c1450f13ba6449eed9101e588775c3d9d" target="_blank" rel="noopener noreferrer">709fb73</a></li><li>Static Default html pages (e.g. default.html) are served directly from root instead of being redirected to static file - Behavior is now in-line with <code>default.cshtml</code> in Razor Support <a href="https://github.com/ServiceStack/ServiceStack/commit/5b5d7fa66bbd3d4237ede8a5bc9054354dfa7b2c" target="_blank" rel="noopener noreferrer">5b5d7fa</a></li><li>StaticFileHandler HTTP Handler is now re-usable <code>VirtualNode</code> for returning Static Files <a href="https://github.com/ServiceStack/ServiceStack/commit/8571ecd6f7e244ee152e959e6759f6a1ee82fe4d" target="_blank" rel="noopener noreferrer">8571ecd</a></li><li>Original C#/.NET Exception is now accessible as <code>InnerException</code> in wrapped <code>HttpError</code> <a href="https://github.com/ServiceStack/ServiceStack/commit/42d59767fd8ea9414470cbedbac8b2bae308e9e8" target="_blank" rel="noopener noreferrer">42d5976</a></li><li>Added overridable <code>IDbConnectionFactory</code> and <code>IRedisClientsManager</code> properties in <code>Service</code> base class <a href="https://github.com/ServiceStack/ServiceStack/commit/c18215b58a7a71f9537f8614ce42acf91beaee3b" target="_blank" rel="noopener noreferrer">c18215b</a></li><li>Add <code>.woff2</code> to <code>Config.AllowFileExtensions</code> white-list <a href="https://github.com/ServiceStack/ServiceStack/commit/aa1e93adcea85216aac807cad4bdbe8f71ff2f52" target="_blank" rel="noopener noreferrer">aa1e93a</a></li><li>Changed all methods in MVC ServiceStackController base class to protected to prevent MVC Controller Factories from assuming their MVC Actions <a href="https://github.com/ServiceStack/ServiceStack/commit/eff11c8992df78b18b07cc0137d27ea1e2d7eb47" target="_blank" rel="noopener noreferrer">eff11c</a></li><li>Added Remove Plugin and Debug Link API&#39;s <a href="https://github.com/ServiceStack/ServiceStack/commit/9002d4827c43dd91e02b298a3b5a56e6e376963a" target="_blank" rel="noopener noreferrer">9002d48</a></li><li>Added Retry logic on Concurrent Update collisions in <code>OrmLiteCacheClient</code> <a href="https://github.com/ServiceStack/ServiceStack/commit/aa6d62ca23ebef30eb3727f3894d214d320843b0" target="_blank" rel="noopener noreferrer">aa6d62c</a></li><li>Added Runtime Attribute Filter example <a href="https://github.com/ServiceStack/ServiceStack/commit/355365bbfc45e1309fa2d91fcbc1856e874a9676" target="_blank" rel="noopener noreferrer">355365b</a></li><li>Add support for implicit querying of enums in AutoQuery <a href="https://github.com/ServiceStack/ServiceStack/commit/b5d2477c581152168f43017a355cbcae9dccbefb" target="_blank" rel="noopener noreferrer">b5d2477</a></li><li>Handle Retry Exceptions during on <code>ServerEventsClient</code> reconnections <a href="https://github.com/ServiceStack/ServiceStack/commit/7833cd8c25e0eb4dc10cd0e0033d2d156393625a" target="_blank" rel="noopener noreferrer">7833cd8</a></li><li>Added <code>AppHost.GetCurrentRequest()</code> to allow different AppHosts to return the current HttpContext <a href="https://github.com/ServiceStack/ServiceStack/commit/7cbadda18f5666a4c24a0e49fa1af740afd0fec4" target="_blank" rel="noopener noreferrer">7cbadda</a></li><li>Fixed NRE during max pool-size overflow handling in <code>RedisManagerPool</code> <a href="https://github.com/ServiceStack/ServiceStack.Redis/commit/c94eedd2e3467a418b290209fdf52b01c0516855" target="_blank" rel="noopener noreferrer">c94eedd</a></li></ul><h3 id="auth-changes" tabindex="-1">Auth Changes <a class="header-anchor" href="#auth-changes" aria-hidden="true">#</a></h3><ul><li><code>IAuthRepository.CreateOrMergeAuthSession()</code> now returns the merged <code>IUserAuthDetails</code> <a href="https://github.com/ServiceStack/ServiceStack/commit/f2383fffd390d58d2da55dd47eb2b68110066c51" target="_blank" rel="noopener noreferrer">f2383ff</a><ul><li><code>OnRegistered()</code> callback now fired for successful first-time OAuth requests (in addition to <code>/register</code> Service)</li></ul></li><li>Added <code>AppHost.OnSaveSession()</code> to allow custom logic whenever a User Session is saved to the Cache <a href="https://github.com/ServiceStack/ServiceStack/commit/002a4ebf9ea75e922554148ffa2581be05e2c359" target="_blank" rel="noopener noreferrer">002a4eb</a></li><li>New <code>Dictionary&lt;string,string&gt; Meta</code> added to allow custom Auth params on <code>Authenticate</code> during Authentication <a href="https://github.com/ServiceStack/ServiceStack/commit/4d339c190bf086e2639c3373792b9f4547e0851b" target="_blank" rel="noopener noreferrer">4d339c1</a></li><li>New <code>Config.AddRedirectParamsToQueryString</code> option added to change redirect params to be added to QueryString instead of hash <code>#</code> params <a href="https://github.com/ServiceStack/ServiceStack/commit/fea60fa37000ff7603dc15a31b53150d72bae131" target="_blank" rel="noopener noreferrer">fea60fa</a></li><li><code>NHibernateUserAuthRepository.GetCurrentSession()</code> is now overridable to customize NH Session Initialization <a href="https://github.com/ServiceStack/ServiceStack/commit/7249c9af8191ec1bdf7b95db0bba607fe5015dc8" target="_blank" rel="noopener noreferrer">7249c9a</a></li></ul><h3 id="mq-changes" tabindex="-1">MQ Changes <a class="header-anchor" href="#mq-changes" aria-hidden="true">#</a></h3><ul><li>Added <code>QueueNames.IsTempQueue()</code> API to determine if a MQ name is a Temp Queue even when custom naming conventions are used <a href="https://github.com/ServiceStack/ServiceStack/commit/c3ee3d037ec5676a05e0852ea90d0d75f0d25787" target="_blank" rel="noopener noreferrer">c3ee3d0</a></li><li>Pass <code>IMessageHandler</code> in custom MQ Error Handlers so Nak&#39;s can be sent from same client that received the message <a href="https://github.com/ServiceStack/ServiceStack/commit/3be2e3f9d3e9340c4993f8eabc8805c2b1325b18" target="_blank" rel="noopener noreferrer">3be2e3f</a></li></ul><h3 id="ormlite-changes" tabindex="-1">OrmLite Changes <a class="header-anchor" href="#ormlite-changes" aria-hidden="true">#</a></h3><ul><li><code>SqlProc</code> no longer disposes <code>IDbCommand</code> before returning it <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/commit/9e714808079aa08f8b7b90766ba308279532c08f" target="_blank" rel="noopener noreferrer">9e71480</a></li><li>Fixed <code>SingleAsync</code> API to call correct internal API <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/commit/b234105065b38df5eb18449e2fb8d5173458c269" target="_blank" rel="noopener noreferrer">b23410</a></li><li>Added support new Multi-Column OrderBy Descending API&#39;s <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/commit/33292ef67ec09cbe005afc2cba1f7c417da4434c" target="_blank" rel="noopener noreferrer">33292ef</a></li><li>Add support for <code>ConvertToList&lt;T&gt;</code> to handle Scalars as well <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/commit/4290229cd50ae6475a3edffc198bbdc87cc54539" target="_blank" rel="noopener noreferrer">4290229</a></li></ul><h3 id="servicestack-text-changes" tabindex="-1">ServiceStack.Text Changes <a class="header-anchor" href="#servicestack-text-changes" aria-hidden="true">#</a></h3><ul><li>Add support for Dates in <code>yyyyMMdd</code> format <a href="https://github.com/ServiceStack/ServiceStack.Text/commit/a752f2af70f165398899e92b2775daa0d870ff57" target="_blank" rel="noopener noreferrer">a752f2a</a><ul><li>Add New <code>DateTimeSerializer.OnParseErrorFn</code> fallback can be used to handle unknown Date Formats</li></ul></li><li>Added convenient <code>Task.Success()</code> and <code>Task.Error()</code> extension methods for non-generic <code>Task</code> <a href="https://github.com/ServiceStack/ServiceStack.Text/commit/b17866a3b46e3e6c699c20b7f33ef3738fdffd46" target="_blank" rel="noopener noreferrer">b17866a</a></li><li>PCL version of <code>GetPublicProperties()</code> now only return instance (non-static) properties <a href="https://github.com/ServiceStack/ServiceStack.Text/commit/dbe1f8349600ba47e2c4aaaa49c4759198a6ac1f" target="_blank" rel="noopener noreferrer">dbe1f83</a></li></ul><h3 id="dependencies-updated" tabindex="-1">Dependencies Updated <a class="header-anchor" href="#dependencies-updated" aria-hidden="true">#</a></h3><ul><li>FacebookAuthProvider upgraded to use v2.0 of Facebook&#39;s API</li><li>Swagger UI updated latest version</li><li>Memcached updated to 0.57</li><li>FluentNHibernate to 2.0.1.0</li></ul>`,43),l=[s,c,i];function p(d,h,u,f,g,b){return r(),a("div",null,l)}var k=t(o,[["render",p]]);export{S as __pageData,k as default};
