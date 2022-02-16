import{_ as a,c as e,o as s,a as n}from"./app.64b20f26.js";const g='{"title":"JAMStack with Vitepress and ServiceStack","description":"","frontmatter":{"slug":"jamstack-with-vitepress-servicestack","title":"JAMStack with Vitepress and ServiceStack"},"headers":[{"level":2,"title":"Your JAM","slug":"your-jam"},{"level":3,"title":"J is for JavaScript","slug":"j-is-for-javascript"},{"level":3,"title":"A is for API","slug":"a-is-for-api"},{"level":3,"title":"M is for Markup","slug":"m-is-for-markup"},{"level":2,"title":"Coming from Jekyll","slug":"coming-from-jekyll"},{"level":3,"title":"File name vs slug and permalink","slug":"file-name-vs-slug-and-permalink"},{"level":3,"title":"Broken links are build failures","slug":"broken-links-are-build-failures"},{"level":3,"title":"Syntax issues","slug":"syntax-issues"},{"level":2,"title":"Vitepress key advantages","slug":"vitepress-key-advantages"},{"level":3,"title":"Performance","slug":"performance"},{"level":3,"title":"Vue 3","slug":"vue-3"},{"level":3,"title":"Simple config","slug":"simple-config"},{"level":2,"title":"Vitepress drawbacks","slug":"vitepress-drawbacks"},{"level":3,"title":"Interpreting errors","slug":"interpreting-errors"},{"level":2,"title":"Why single repository","slug":"why-single-repository"},{"level":2,"title":"Why it is still a good idea","slug":"why-it-is-still-a-good-idea"}],"relativePath":"jamstack-with-vitepress-servicestack.md","lastUpdated":1645007721709}',t={},o=n(`<p>JAMStack, unlike other acronyms about the choice of technology, is a very broad architecture that stands for:</p><ul><li>JavaScript</li><li>API</li><li>Markup</li></ul><h2 id="your-jam" tabindex="-1">Your JAM <a class="header-anchor" href="#your-jam" aria-hidden="true">#</a></h2><p>It isn&#39;t prescriptive about what technology you use to achieve this architecture. The combination of using a statically generated site (MarkUp), and enhance the experience of that site with JavaScript pulling data from an API is not a new pattern. Even JAMStack itself has been promoted using that acronym since ~2015.</p><p>However, this architecture pattern has some very compelling advantages.</p><ul><li>Host your static site anywhere, cheaply.</li><li>Enable non-developers to contribute to content.</li><li>API and Markup technology completely decoupled.</li><li>Host API and Markup separately or together.</li><li>Deploy API and Markup separately or together.</li><li>SEO works great with statically generated sites.</li></ul><h3 id="j-is-for-javascript" tabindex="-1">J is for JavaScript <a class="header-anchor" href="#j-is-for-javascript" aria-hidden="true">#</a></h3><p>Starting with &quot;J&quot; in JAMStack, we have Vitepress. Vitepress is a Vite powered, VueJs 3 static site generator that is blazing fast and is an amazing tool for building a rich content heavy front end. It has instant hot reload that is only a &quot;Save&quot; away from instantly showing your more recent edits to a MarkDown file.</p><p>Using Vue 3, we also have a super powerful and extensible way of producing reusable components for both interactive and static content that can be referenced straight from your MarkDown files.</p><h3 id="a-is-for-api" tabindex="-1">A is for API <a class="header-anchor" href="#a-is-for-api" aria-hidden="true">#</a></h3><p>Building interactive Vue 3 components eventually leads to calling remote web services. Having a well defined, easy to use API is what ServiceStack has been promoting from the very beginning with its message based design, it encourages reuse in an interoperable way where using it as the API is a great fit. Obviously, we are bias but in this article we&#39;ll try and point out the advantages by showing the developer experience with Vitepress.</p><h3 id="m-is-for-markup" tabindex="-1">M is for Markup <a class="header-anchor" href="#m-is-for-markup" aria-hidden="true">#</a></h3><p>By Vitepress being a static site generator, it can be hosted virtually anywhere extremely cheaply. GitHub offers this service for free, and loads of other companies offer turn key solutions to just hosting static markup.</p><h2 id="coming-from-jekyll" tabindex="-1">Coming from Jekyll <a class="header-anchor" href="#coming-from-jekyll" aria-hidden="true">#</a></h2><p>The ServiceStack docs were previously using Jekyll before moving to Vitepress. Jekyll was recently declared deprecated and hasn&#39;t been well support for a long time despite having support baked into GitHub Pages.</p><p>Jekyll uses a templating engine called <code>Liquid</code> which is not completely compatible with Vue and Vitepress. Your miles may vary but we found the process of migrating a 300 page documentation site to be about 2 days effort while learning vitepress. This included time it took for some preprocess of files, renaming and learning what some of the vitepress errors actually meant.</p><p>To help others and to give you an idea of what this process was like, below are some of the issues we encountered and how we dealt with them.</p><h3 id="file-name-vs-slug-and-permalink" tabindex="-1">File name vs <code>slug</code> and <code>permalink</code> <a class="header-anchor" href="#file-name-vs-slug-and-permalink" aria-hidden="true">#</a></h3><p>In Jekyll, the <code>frontmatter</code> in the Markdown file could have properties that would alter the file output of the static site generator. This meant you could have completely different file names for Markdown files vs the output HTML files.</p><p>While this is a good flexibility, it did make us somewhat less interested in naming the markdown file when we created new files for new documentation pages. Vitepress doesn&#39;t have the flexibility, Markdown files need to match the desired output and there for, hosted path name of your page.</p><p>We got around this by writing a small .NET Core tool that copied the MD file by parsing the frontmatter of the markdown file to a new file using the <code>slug</code> into an <code>updated</code> child directory.</p><div class="language-csharp"><pre><code><span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> filename <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> fileLines <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">ReadAllLines</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Directory<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span><span class="token string">&quot;updated&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Directory<span class="token punctuation">.</span><span class="token function">CreateDirectory</span><span class="token punctuation">(</span><span class="token string">&quot;updated&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> line <span class="token keyword">in</span> fileLines<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>line<span class="token punctuation">.</span><span class="token function">StartsWith</span><span class="token punctuation">(</span><span class="token string">&quot;slug:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">var</span></span> newName <span class="token operator">=</span> line<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            File<span class="token punctuation">.</span><span class="token function">WriteAllLines</span><span class="token punctuation">(</span><span class="token string">&quot;./updated/&quot;</span> <span class="token operator">+</span> newName <span class="token operator">+</span> <span class="token string">&quot;.md&quot;</span><span class="token punctuation">,</span> fileLines<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Not very elegant, but it did the job. This was published as a <code>single file</code> executable targeting linux so it could be easily used with tools like <code>find</code> with <code>--exec</code>.</p><div class="language-shell"><pre><code><span class="token function">find</span> *.md -maxdepth <span class="token number">1</span> -type f -exec ./RenameMd <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span>
</code></pre></div><p>All round pretty hacky, but this was also while we were still evaluating vitepress, so something quick that works was the flavor of the day.</p><blockquote><p>This was run in each directory as needed, if <code>slug</code> or <code>permalink</code> is controlling your nested pathing, this problem will be more complex to handle.</p></blockquote><p>This was run for our main folder of docs as well as our <code>releases</code> folder and we have successfully renamed files.</p><h3 id="broken-links-are-build-failures" tabindex="-1">Broken links are build failures <a class="header-anchor" href="#broken-links-are-build-failures" aria-hidden="true">#</a></h3><p>Vitepress is a lot more strict with issues than Jekyll. This is actually a good thing, especially as your site content grows. Vitepress will fail building your site if in your markdown to link to a relative link that it can&#39;t see is a file.</p><p>This comes from the above design decision of not aliasing files to output paths. Markdown links like <code>[My link](/my-cool-page)</code> needs to be able to see <code>my-cool-page.md</code>. This means if you move or rename a file, it will break if something else links to it. Jekyll got around this by allowing the use of <code>permalink</code> and <code>slug</code> which is great for flexibility, but means at build time it can&#39;t be sure (without a lot more work) if the relative path won&#39;t be valid.</p><p>There are drawbacks to this though. If you host multiple resources under the same root path as your Vitepress site and you want to reference this, I&#39;m not sure you will be able to. You might have to resort to absolute URLs to link out to resources like this. And since Vitepress doesn&#39;t alias any paths, it means your hosting environment will need to do this.</p><h3 id="syntax-issues" tabindex="-1">Syntax issues <a class="header-anchor" href="#syntax-issues" aria-hidden="true">#</a></h3><p>Jekyll is very forgiving when it comes to content that is passed around as straight html and put in various places using Liquid. For example if you have the following HTML in an <code>include</code> for Jekyll.</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>This solution is &lt;50 lines of code<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Jekyll will just copy it and not bother you about the invalid HTML issues of having a <code>less-than (&lt;)</code> in the middle of a <code>&lt;p&gt;</code> element. Vitepress won&#39;t however, and you&#39;ll need to correctly use <code>&amp;lt;</code> and <code>&amp;gt;</code> encoded symbols appropriately.</p><h4 id="include-html" tabindex="-1">Include HTML <a class="header-anchor" href="#include-html" aria-hidden="true">#</a></h4><p>Another issue is the difference of how to reuse content. In Jekyll, you would use <code>{% include my/path/to/file.html %}</code>. This will likely show up in errors like <code>[vite:vue] Duplicate attribute</code>.</p><p>Instead in Vitepress, an include of straight HTML will require migrating that content to a Vue component.</p><p>For example, if we have content file <code>catchphrase.html</code> like the following.</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">&gt;</span></span>Catchphrase<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>It&#39;s.. what I do..<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>We would need to wrap this in a Vue component like <code>catchphrase.vue</code>:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">&gt;</span></span>Catchphrase<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>It&#39;s.. what I do..<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
        name<span class="token operator">:</span> <span class="token string">&quot;catchphrase&quot;</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Then it would need to be imported. This can be declared globally in the vitepress theme config or adhoc in the consuming Markdown file itself.</p><div class="language-markdown"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> catchphrase <span class="token keyword">from</span> <span class="token string">&#39;./catchphrase.vue&#39;</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>catchphrase</span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div><p>The <code>&lt;catchphrase /&gt;</code> is where it is injected into the output. For HTML so simple, this could be instead converted to Markdown and used the same way.</p><div class="language-markdown"><pre><code><span class="token title important"><span class="token punctuation">####</span> Catchphrase</span>
it&#39;s.. what I do..
</code></pre></div><p>And then used:</p><div class="language-markdown"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> catchphrase <span class="token keyword">from</span> <span class="token string">&#39;./catchphrase.md&#39;</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>catchphrase</span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div><h4 id="jekyll-markdownify-redundant" tabindex="-1">Jekyll markdownify redundant <a class="header-anchor" href="#jekyll-markdownify-redundant" aria-hidden="true">#</a></h4><p>Something similar is done in Jekyll, but with the use of Liquid filters.</p><div class="language-markdown"><pre><code>{% capture projects %}
{% include web-new-netfx.md %}
{% endcapture %} 
{{ projects | markdownify }}
</code></pre></div><p>This use of <code>capture</code> and passing the content to be converted is done by default when importing.</p><div class="language-markdown"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> netfxtable <span class="token keyword">from</span> <span class="token string">&#39;./.vitepress/includes/web-new-netfx.md&#39;</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>netfxtable</span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div><p>If the module is declared global, then only the <code>&lt;netfxtable /&gt;</code> is needed anywhere in your site to embed the content.</p><h4 id="templating-syntax-the-same-but-different" tabindex="-1">Templating syntax the same but different <a class="header-anchor" href="#templating-syntax-the-same-but-different" aria-hidden="true">#</a></h4><p>When moving from Jekyll to Vitepress, I came across errors like <code>Cannot read property &#39;X&#39; of undefined</code>. It was referring to some example code in a page we had that looked something like this.</p><div class="language-markdown"><pre><code>Content text here with templating code example below.

<span class="token code keyword">    Value: {{X.prop}}</span>

More explanation here.
</code></pre></div><div><p>This error came about because we didn&#39;t religiously fence our code examples. Jekyll let us get away with this and actually produced the visuals we wanted without trying to render value in the handlebars <code>{{ }}</code> syntax.</p></div><div><p>Vitepress only ignores these if they are in a code fence using the triple tilda syntax OR if the content is within a <code>:::v-pre</code> block.</p></div><h2 id="vitepress-key-advantages" tabindex="-1">Vitepress key advantages <a class="header-anchor" href="#vitepress-key-advantages" aria-hidden="true">#</a></h2><h3 id="performance" tabindex="-1">Performance <a class="header-anchor" href="#performance" aria-hidden="true">#</a></h3><p>Though Vitepress is a new and growing project which does have its trade offs, the development experience is extremely compelling.</p><p>It. Is. Fast.</p><p>Previously I use to use side by side IDE tooling for editing Markdown so I could see what it would look like. I would only glance at this after editing a sentence or two to get a rough ide of how it looked. The Markdown preview in your IDE is styled different, so I had to sort of imagine in my head roughly what that would translate to on our docs page since re-rendering with Jekyll would take 20-25 seconds on a 8 core Ryzen desktop.</p><p>Vitepress feels instant even on large pages. Opening up the network tab to see the hot reload event, I can see the latency time is on average for a pretty large document varies between 25ms and 380ms. Sub half a second always. This level of performance means I don&#39;t need the IDE markdown side by side and I can just edit, save, and instantly preview the page.</p><h3 id="vue-3" tabindex="-1">Vue 3 <a class="header-anchor" href="#vue-3" aria-hidden="true">#</a></h3><p>This might be a drawback for some, but if you are comfortable with development using Vue (2 or 3), you will love the fact you can just use Vue components in your static site. There are limitations given components need to be server side rendered during build time, but once this pattern is followed, it is very productive.</p><h3 id="simple-config" tabindex="-1">Simple config <a class="header-anchor" href="#simple-config" aria-hidden="true">#</a></h3><p>The minimal example of a Vitepress site is 2 files. An <code>index.md</code> and a <code>package.json</code>. There are loads of convention based defaults which you can use to customize your site, but they are well documented on the Vitepress docs site. If you are looking to build a content heavy site using a SSG, especially a documentation site, you will be able to get going very quickly with Vitepress.</p><h2 id="vitepress-drawbacks" tabindex="-1">Vitepress drawbacks <a class="header-anchor" href="#vitepress-drawbacks" aria-hidden="true">#</a></h2><p>Saying all that, it does have its tradeoffs. The biggest of which is that it is a young project still in active development. There are still rough edges, especially when it comes to more complex hosting.</p><p>For example, clean URLs can be used but the client side of Vitepress always appends <code>.html</code> to any path. So while the path will load, it will show <code>.html</code> in the address bar, and this is (at the time of writing), not configurable.</p><h3 id="interpreting-errors" tabindex="-1">Interpreting errors <a class="header-anchor" href="#interpreting-errors" aria-hidden="true">#</a></h3><p>When migrating our side, it was frustrating the the stacktrace would try to point to a line of the Markdown for the source of the issue but it would be nearly always off. It showed me an unrelated line, but it was close so it was usually pretty easy to see code near by that wasn&#39;t working. If I couldn&#39;t, I could very quickly delete + save + retry, trial and error method of finding the right line of code. Not ideal, but can work around it.</p><h2 class="mb-8">Test</h2><p>Test</p><h2 id="why-single-repository" tabindex="-1">Why single repository <a class="header-anchor" href="#why-single-repository" aria-hidden="true">#</a></h2><h2 id="why-it-is-still-a-good-idea" tabindex="-1">Why it is still a good idea <a class="header-anchor" href="#why-it-is-still-a-good-idea" aria-hidden="true">#</a></h2>`,78),i=[o];function p(l,c,r,u,d,h){return s(),e("div",null,i)}var f=a(t,[["render",p]]);export{g as __pageData,f as default};
