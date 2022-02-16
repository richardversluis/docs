import{_ as e,c as t,o as a,a as n}from"./app.64b20f26.js";const g=`{"title":"Nuxt Project Templates","description":"","frontmatter":{"slug":"templates-nuxt","title":"Nuxt Project Templates"},"headers":[{"level":3,"title":"ServiceStack Integration","slug":"servicestack-integration"},{"level":3,"title":"Nuxt Templates","slug":"nuxt-templates"},{"level":3,"title":"Getting Started","slug":"getting-started"},{"level":3,"title":"Dev Workflow","slug":"dev-workflow"},{"level":3,"title":"Update DTOs","slug":"update-dtos"},{"level":3,"title":"Generate Static Production Build","slug":"generate-static-production-build"},{"level":3,"title":"Publishing App for Deployment","slug":"publishing-app-for-deployment"},{"level":3,"title":"Host static content on Netlify's CDN for free","slug":"host-static-content-on-netlify-s-cdn-for-free"}],"relativePath":"templates-nuxt.md","lastUpdated":1645007721769}`,r={},o=n(`__VP_STATIC_START__<div class="my-8 ml-20"><svg style="max-width:200px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 298"><g fill="none" fill-rule="nonzero"><path fill="#00C58E" d="M227.92099 82.07407l-13.6889 23.7037-46.8148-81.08641L23.7037 273.58025h97.3037c0 13.0912 10.61252 23.7037 23.70371 23.7037H23.70371c-8.46771 0-16.29145-4.52017-20.5246-11.85382-4.23315-7.33366-4.23272-16.36849.00114-23.70174L146.89383 12.83951c4.23415-7.33433 12.0596-11.85252 20.5284-11.85252 8.46878 0 16.29423 4.51819 20.52839 11.85252l39.97037 69.23456z"></path><path fill="#2F495E" d="M331.6642 261.7284l-90.05432-155.95062-13.6889-23.7037-13.68888 23.7037-90.04445 155.95061c-4.23385 7.33325-4.23428 16.36808-.00113 23.70174 4.23314 7.33365 12.05689 11.85382 20.5246 11.85382h166.4c8.46946 0 16.29644-4.51525 20.532-11.84955 4.23555-7.3343 4.23606-16.37123.00132-23.706h.01976zM144.7111 273.58024L227.921 129.48148l83.19012 144.09877h-166.4z"></path><path fill="#108775" d="M396.04938 285.4321c-4.23344 7.33254-12.05656 11.85185-20.52345 11.85185H311.1111c13.0912 0 23.7037-10.6125 23.7037-23.7037h40.66173L260.09877 73.74815l-18.4889 32.02963-13.68888-23.7037L239.5753 61.8963c4.23416-7.33433 12.0596-11.85252 20.5284-11.85252 8.46879 0 16.29423 4.51819 20.52839 11.85252l115.41728 199.8321c4.23426 7.33395 4.23426 16.36975 0 23.7037z"></path></g></svg></div><p><a href="https://nuxtjs.org" target="_blank" rel="noopener noreferrer">Nuxt.js</a> is an exciting opinionated structured framework for rapidly developing Web Applications in a single unified solution pre-configured with Vue&#39;s high-quality components that abstracts away the complex build systems of Webpack powered JS Apps.</p><p>If you&#39;ve been intimidated with amount of complexity and knowledge required to develop an App using one of the major JS frameworks, we highly recommend evaluating Nuxt.js. Nuxt is an opinionated framework that integrates the most popular Vue components together in a pre-configured solution. It&#39;s like developing within guard rails where it lets you develop entire websites using just <a href="https://vuejs.org/v2/guide/single-file-components.html" target="_blank" rel="noopener noreferrer">Vue Single File Components</a> placed in a <a href="https://nuxtjs.org/guide/routing" target="_blank" rel="noopener noreferrer">conventional file and directory structure</a> where Nuxt will take care of managing the routing and abstracts away the build configuration to generate optimal production builds where it employs advanced packaging techniques like automatic code splitting, link prefetching, SPA navigation of statically-generated cacheable assets and integrated support for ES6/7 transpilation, linting and js/css bundling and minification.</p><p>Its watched builds enables Hot Module Replacement to enable the optimal development experience where it you will be able to see changes in real-time without needing to manually build or refresh pages. The Nuxt templates are also configured to support <a href="/templates-websites#watched-net-core-builds">.NET Core&#39;s watched builds</a> which automatically detects changes to your .NET Core App and re-compiles and restarts them with the new changes.</p><p><a href="https://github.com/NetCoreTemplates/vue-nuxt" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/csharp-templates/vue-nuxt.png" alt=""></a></p><h3 id="servicestack-integration" tabindex="-1">ServiceStack Integration <a class="header-anchor" href="#servicestack-integration" aria-hidden="true">#</a></h3><p>Whilst Nuxt and ServiceStack are 2 different frameworks, we&#39;ve combined them in a single seamlessly integrated .NET Core project. ServiceStack shines here where as the <a href="/typescript-add-servicestack-reference#typescript-serviceclient">TypeScript JsonServiceClient</a> utilizes ServiceStack&#39;s <a href="/routing#pre-defined-routes">pre-defined Routes</a> we can proxy all JSON API requests to our .NET Core App with a single config in <a href="https://github.com/NetCoreTemplates/vue-nuxt/blob/master/MyApp/nuxt.config.js" target="_blank" rel="noopener noreferrer">nuxt.config.js</a> and an additional entry to proxy links to any configured <a href="/authentication-and-authorization#oauth-providers">OAuth Providers</a>:</p><div class="language-js"><pre><code>  proxy<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;/json&#39;</span><span class="token operator">:</span> <span class="token string">&#39;http://localhost:5000/&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;/auth&#39;</span><span class="token operator">:</span> <span class="token string">&#39;http://localhost:5000/&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre></div><p>This lets us use Nuxt&#39;s Web Dev Server during development to take advantage of its incremental compilation, Live Reloading and instant UI updates.</p><h3 id="nuxt-templates" tabindex="-1">Nuxt Templates <a class="header-anchor" href="#nuxt-templates" aria-hidden="true">#</a></h3><p>There are 2 variants of Nuxt templates available for both .NET Core and .NET Framework:</p><p><a href="https://github.com/NetCoreTemplates/vue-nuxt" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/csharp-templates/vue-nuxt.png" alt=""></a></p><h4 id="net-core" tabindex="-1">.NET Core <a class="header-anchor" href="#net-core" aria-hidden="true">#</a></h4><ul><li><a href="https://github.com/NetCoreTemplates/vue-nuxt" target="_blank" rel="noopener noreferrer">vue-nuxt</a> - Vue + Nuxt</li><li><a href="https://github.com/NetCoreTemplates/vuetify-nuxt" target="_blank" rel="noopener noreferrer">vuetify-nuxt</a> - Vue + Nuxt + Vuetify</li></ul><h4 id="net-framework" tabindex="-1">.NET Framework <a class="header-anchor" href="#net-framework" aria-hidden="true">#</a></h4><ul><li><a href="https://github.com/NetFrameworkTemplates/vue-nuxt-netfx" target="_blank" rel="noopener noreferrer">vue-nuxt-netfx</a> - Vue + Nuxt</li><li><a href="https://github.com/NetFrameworkTemplates/vuetify-nuxt-netfx" target="_blank" rel="noopener noreferrer">vuetify-nuxt-netfx</a> - Vue + Nuxt + Vuetify</li></ul><h3 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-hidden="true">#</a></h3><p>To experience App development with Nuxt.js, create a new Nuxt Project using <a href="/web-new">x new</a>:</p><div class="language-bash"><pre><code>$ x new vue-nuxt ProjectName
</code></pre></div><p>Download npm and .NET Core dependencies:</p><div class="language-bash"><pre><code>$ <span class="token function">npm</span> <span class="token function">install</span>
$ dotnet restore
</code></pre></div><h3 id="dev-workflow" tabindex="-1">Dev Workflow <a class="header-anchor" href="#dev-workflow" aria-hidden="true">#</a></h3><p>Start a <a href="/templates-websites#watched-net-core-builds">watched .NET Core build</a> in the background from the command-line with:</p><div class="language-bash"><pre><code>$ dotnet <span class="token function">watch</span> run
</code></pre></div><p>In a new terminal window start a watched Nuxt dev server build with:</p><div class="language-bash"><pre><code>$ <span class="token function">npm</span> run dev
</code></pre></div><p>Then open <code>http://localhost:3000</code> in your browser to view your App served directly from Nuxt&#39;s dev server which will proxy all Server requests to ServiceStack Server running on <code>http://localhost:5000</code>. Any changes you make to your front-end will be automatically re-compiled and reloaded by the watched <code>Nuxt</code> build whilst any changes to your Server app will be automatically be rebuilt and restarted by the watched <code>dotnet</code> process.</p><h3 id="update-dtos" tabindex="-1">Update DTOs <a class="header-anchor" href="#update-dtos" aria-hidden="true">#</a></h3><p>Whilst Nuxt is a JavaScript (ES 6/7) App it still benefits from ServiceStack&#39;s <a href="/typescript-add-servicestack-reference">TypeScript Add Reference feature</a> where you can generate typed DTOs with the <code>dtos</code> npm script:</p><div class="language-bash"><pre><code>$ <span class="token function">npm</span> run dtos
</code></pre></div><p>This will update the Servers <code>dtos.ts</code> and generate its corresponding <code>dtos.js</code> which can be natively imported as seen in <a href="https://github.com/NetCoreTemplates/vue-nuxt/blob/master/MyApp/src/shared/gateway.js#L3" target="_blank" rel="noopener noreferrer">gateway.js</a>. Despite the App not being built with TypeScript, developing using a &quot;TypeScript-aware&quot; IDE like VS Code will still be able to utilize the generated <code>dtos.ts</code> to provide a rich intelli-sense experience.</p><h3 id="generate-static-production-build" tabindex="-1">Generate Static Production Build <a class="header-anchor" href="#generate-static-production-build" aria-hidden="true">#</a></h3><p>Most of the time during development you&#39;ll be viewing your App through Nuxt&#39;s dev server to take advantage of it&#39;s instant UI updates. At any time you can also view a production build of your App with:</p><div class="language-bash"><pre><code>$ <span class="token function">npm</span> run build
</code></pre></div><p>This will generate a static encapsulated production build of your App in .NET Core&#39;s <code>/wwwroot</code> which you can view served from your ServiceStack Server App directly at:</p><ul><li><a href="http://localhost:5000" target="_blank" rel="noopener noreferrer">http://localhost:5000</a></li></ul><h3 id="publishing-app-for-deployment" tabindex="-1">Publishing App for Deployment <a class="header-anchor" href="#publishing-app-for-deployment" aria-hidden="true">#</a></h3><p>To create a complete client and server build of your App run:</p><div class="language-bash"><pre><code>$ <span class="token function">npm</span> run publish
</code></pre></div><p>This publishes your App to <code>bin/Release/netcoreapp3.1/publish</code> that can then be deployed like any normal .NET Core App.</p><h3 id="host-static-content-on-netlify-s-cdn-for-free" tabindex="-1">Host static content on Netlify&#39;s CDN for free <a class="header-anchor" href="#host-static-content-on-netlify-s-cdn-for-free" aria-hidden="true">#</a></h3><p>One of the advantages of using Nuxt is that it generates a front-end UI with static <code>.html</code> files for all pages. This allows the static content of your Web App to be cleanly decoupled from your back-end your Server App and hosted independently on a CDN. Netlify makes this effortless where you can <a href="https://app.netlify.com/signup" target="_blank" rel="noopener noreferrer">Sign In with your GitHub account</a> and get it to create a new Site from a GitHub repository where you can tell it to host the static content in your .NET Core Apps <code>/wwwroot</code> folder on its CDN. It also synchronizes updates with every check-in so it automatically updates whenever you check-in a new version of your .NET Core project.</p><p>Netlify has built first-class support for hosting Single Page Apps like Nuxt where it lets you check-in a <a href="https://www.netlify.com/docs/redirects/" target="_blank" rel="noopener noreferrer">simple _redirects file</a> with all routes you want to be served by your .NET Core App and it will transparently proxy any API requests to your back-end server without needing to enable CORS. So the same .NET Core App that runs locally will be able to run without code changes when deployed despite having all its bandwidth intensive content served directly from Netlify&#39;s CDN. This opens up a nice scalability option for your App Servers, maximizing their efficiency as .NET Core Apps just ends up serving dynamic JSON API requests.</p>__VP_STATIC_END__`,43),i=[o];function s(l,p,c,d,u,h){return a(),t("div",null,i)}var m=e(r,[["render",s]]);export{g as __pageData,m as default};
