import{_ as n,c as s,o as a,a as t}from"./app.64b20f26.js";const g='{"title":"OrmLite INSERT APIs","description":"","frontmatter":{"title":"OrmLite INSERT APIs"},"headers":[{"level":2,"title":"Insert Examples","slug":"insert-examples"},{"level":2,"title":"Full Inserts","slug":"full-inserts"},{"level":2,"title":"Partial Inserts","slug":"partial-inserts"},{"level":2,"title":"Insert by Dictionary","slug":"insert-by-dictionary"},{"level":2,"title":"Insert records with AutoIncrement Ids","slug":"insert-records-with-autoincrement-ids"},{"level":2,"title":"Save API","slug":"save-api"},{"level":2,"title":"InsertOnly","slug":"insertonly"}],"relativePath":"ormlite/apis/insert.md","lastUpdated":1645007721713}',p={},o=t(`__VP_STATIC_START__<h2 id="insert-examples" tabindex="-1">Insert Examples <a class="header-anchor" href="#insert-examples" aria-hidden="true">#</a></h2><p>In most cases INSERT&#39;s in OrmLite is as straight forward as passing the POCO you want inserted:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Artist</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> Id<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> Name<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//INSERT one row</span>
db<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Artist</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> Name <span class="token operator">=</span> <span class="token string">&quot;Faith No More&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

db<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span> <span class="token comment">//INSERT multiple rows (params)</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Artist</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> Name <span class="token operator">=</span> <span class="token string">&quot;Live&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Artist</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">,</span> Name <span class="token operator">=</span> <span class="token string">&quot;Nirvana&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//INSERT multiple rows (IEnumerable&lt;T&gt;)</span>
db<span class="token punctuation">.</span><span class="token function">InsertAll</span><span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> 
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Artist</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">,</span> Name <span class="token operator">=</span> <span class="token string">&quot;Pearl Jam&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Artist</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">,</span> Name <span class="token operator">=</span> <span class="token string">&quot;Tool&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> artists <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Artist<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token interpolation-string"><span class="token string">$&quot;All Artists: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">artists<span class="token punctuation">.</span><span class="token function">Dump</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>To see the behaviour of the different APIs, the examples below uses the following data models:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> FirstName <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> LastName <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span><span class="token punctuation">?</span></span> Age <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Artist</span> 
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Reference</span></span><span class="token punctuation">]</span> <span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span>Track<span class="token punctuation">&gt;</span></span> Tracks <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Track</span> 
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">AutoIncrement</span></span><span class="token punctuation">]</span> 
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> ArtistId <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Album <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Year <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="full-inserts" tabindex="-1">Full Inserts <a class="header-anchor" href="#full-inserts" aria-hidden="true">#</a></h2><p>An <code>Insert</code> will insert every field by default:</p><div class="language-csharp"><pre><code>db<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Person</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> FirstName <span class="token operator">=</span> <span class="token string">&quot;Jimi&quot;</span><span class="token punctuation">,</span> LastName <span class="token operator">=</span> <span class="token string">&quot;Hendrix&quot;</span><span class="token punctuation">,</span> Age <span class="token operator">=</span> <span class="token number">27</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="partial-inserts" tabindex="-1">Partial Inserts <a class="header-anchor" href="#partial-inserts" aria-hidden="true">#</a></h2><p>You can use <code>InsertOnly</code> for the cases you don&#39;t want to insert every field</p><div class="language-csharp"><pre><code>db<span class="token punctuation">.</span><span class="token function">InsertOnly</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Person</span> <span class="token punctuation">{</span> FirstName <span class="token operator">=</span> <span class="token string">&quot;Amy&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Alternative API using an SqlExpression</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> q <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Person<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span>p <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> p<span class="token punctuation">.</span>FirstName <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

db<span class="token punctuation">.</span><span class="token function">InsertOnly</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Person</span> <span class="token punctuation">{</span> FirstName <span class="token operator">=</span> <span class="token string">&quot;Amy&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">onlyFields</span><span class="token punctuation">:</span> q<span class="token punctuation">)</span>
</code></pre></div><h2 id="insert-by-dictionary" tabindex="-1">Insert by Dictionary <a class="header-anchor" href="#insert-by-dictionary" aria-hidden="true">#</a></h2><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> row <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Person</span> <span class="token punctuation">{</span> FirstName <span class="token operator">=</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> LastName <span class="token operator">=</span> <span class="token string">&quot;Smith&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span></span> obj <span class="token operator">=</span> row<span class="token punctuation">.</span><span class="token function">ToObjectDictionary</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">[</span><span class="token keyword">nameof</span><span class="token punctuation">(</span>Person<span class="token punctuation">.</span>LastName<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

row<span class="token punctuation">.</span>Id <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Insert</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Person<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token named-parameter punctuation">selectIdentity</span><span class="token punctuation">:</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="insert-records-with-autoincrement-ids" tabindex="-1">Insert records with AutoIncrement Ids <a class="header-anchor" href="#insert-records-with-autoincrement-ids" aria-hidden="true">#</a></h2><p>OrmLite provides a couple of different ways to handle Inserting records with AutoIncrementing Ids:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> autoId <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Track</span> <span class="token punctuation">{</span> Name <span class="token operator">=</span> <span class="token string">&quot;Everything&#39;s Ruined&quot;</span><span class="token punctuation">,</span> Album <span class="token operator">=</span> <span class="token string">&quot;Angel Dust&quot;</span><span class="token punctuation">,</span> Year <span class="token operator">=</span> <span class="token number">1992</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> track <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Track<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>autoId<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> savedTrack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Track</span> <span class="token punctuation">{</span> Name <span class="token operator">=</span> <span class="token string">&quot;Ashes to Ashes&quot;</span><span class="token punctuation">,</span> Album <span class="token operator">=</span> <span class="token string">&quot;Album of the Year&quot;</span><span class="token punctuation">,</span> Year <span class="token operator">=</span> <span class="token number">1997</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span>savedTrack<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token interpolation-string"><span class="token string">$&quot;\\nSaved AutoIncrement Id: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">savedTrack<span class="token punctuation">.</span>Id</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token interpolation-string"><span class="token string">$&quot;\\nSaved Track: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">savedTrack<span class="token punctuation">.</span><span class="token function">Dump</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="save-api" tabindex="-1">Save API <a class="header-anchor" href="#save-api" aria-hidden="true">#</a></h2><p>OrmLite&#39;s Save() API offers high-level functionality over Insert() including auto populating AutoIncrementing Ids, transparently handling Insert or Updates and saving reference data:</p><div class="language-csharp"><pre><code>db<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Artist</span> <span class="token punctuation">{</span> 
    Id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> Name <span class="token operator">=</span> <span class="token string">&quot;Faith No More&quot;</span><span class="token punctuation">,</span> 
    Tracks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>Track<span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span> 
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Track</span> <span class="token punctuation">{</span> Name <span class="token operator">=</span> <span class="token string">&quot;Everythings Ruined&quot;</span><span class="token punctuation">,</span> Album <span class="token operator">=</span> <span class="token string">&quot;Angel Dust&quot;</span><span class="token punctuation">,</span> Year <span class="token operator">=</span> <span class="token number">1992</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Track</span> <span class="token punctuation">{</span> Name <span class="token operator">=</span> <span class="token string">&quot;Ashes to Ashes&quot;</span><span class="token punctuation">,</span> Album <span class="token operator">=</span> <span class="token string">&quot;Album of the Year&quot;</span><span class="token punctuation">,</span> Year <span class="token operator">=</span> <span class="token number">1997</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">references</span><span class="token punctuation">:</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> artist <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Artist<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> tracks <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Track<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> artistWithTracks <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">LoadSingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Artist<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> track <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Track</span> <span class="token punctuation">{</span> Name <span class="token operator">=</span> <span class="token string">&quot;The Gentle Art of Making Enemies&quot;</span><span class="token punctuation">,</span> Album <span class="token operator">=</span> <span class="token string">&quot;King for a Day&quot;</span><span class="token punctuation">,</span> Year <span class="token operator">=</span> <span class="token number">1995</span><span class="token punctuation">,</span> ArtistId<span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span>track<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Inserts new Track</span>
<span class="token interpolation-string"><span class="token string">$&quot;\\nInserted Track: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Track<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>track<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Dump</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

track<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;King for a Day... Fool for a Lifetime&quot;</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span>track<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Updates existing Track</span>
<span class="token interpolation-string"><span class="token string">$&quot;\\nUpdated Track: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Track<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>track<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Dump</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="insertonly" tabindex="-1">InsertOnly <a class="header-anchor" href="#insertonly" aria-hidden="true">#</a></h2><p>Use InsertOnly() for the rare cases when you don&#39;t want to insert an entire record. One instance when you would want to do this is to use the default value defined on the underlying CREATE TABLE RDBMS Schema:</p><div class="language-csharp"><pre><code>db<span class="token punctuation">.</span><span class="token function">InsertOnly</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Track</span> <span class="token punctuation">{</span> Name <span class="token operator">=</span> <span class="token string">&quot;State of Love and Trust&quot;</span><span class="token punctuation">,</span> Album <span class="token operator">=</span> <span class="token string">&quot;Singles&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Using explicit fields</span>
db<span class="token punctuation">.</span><span class="token function">InsertOnly</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Track</span> <span class="token punctuation">{</span> Name <span class="token operator">=</span> <span class="token string">&quot;I Got ID&quot;</span><span class="token punctuation">,</span> Album <span class="token operator">=</span> <span class="token string">&quot;Merkin Ball&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> x <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> x<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> x<span class="token punctuation">.</span>Album <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> tracks <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Track<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>__VP_STATIC_END__`,24),e=[o];function c(l,u,k,i,r,d){return a(),s("div",null,e)}var y=n(p,[["render",c]]);export{g as __pageData,y as default};
