import{_ as n,c as s,o as a,a as t}from"./app.64b20f26.js";const m='{"title":"OrmLite Logging and Introspection","description":"","frontmatter":{"title":"OrmLite Logging and Introspection"},"headers":[{"level":2,"title":"BeforeExecFilter and AfterExecFilter filters","slug":"beforeexecfilter-and-afterexecfilter-filters"},{"level":2,"title":"Output Generated SQL","slug":"output-generated-sql"},{"level":2,"title":"Exec, Result and String Filters","slug":"exec-result-and-string-filters"},{"level":2,"title":"CaptureSqlFilter","slug":"capturesqlfilter"},{"level":2,"title":"Replay Exec Filter","slug":"replay-exec-filter"},{"level":2,"title":"Mockable extension methods","slug":"mockable-extension-methods"},{"level":2,"title":"String Filter","slug":"string-filter"},{"level":2,"title":"Pluggable Complex Type Serializers","slug":"pluggable-complex-type-serializers"}],"relativePath":"ormlite/introspection.md","lastUpdated":1645007721717}',e={},p=t(`<p>One way to see what queries OrmLite generates is to enable a <strong>debug</strong> enabled logger, e.g:</p><div class="language-csharp"><pre><code>LogManager<span class="token punctuation">.</span>LogFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ConsoleLogFactory</span><span class="token punctuation">(</span><span class="token named-parameter punctuation">debugEnabled</span><span class="token punctuation">:</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Where it will log the generated SQL and Params OrmLite executes to the Console.</p><h2 id="beforeexecfilter-and-afterexecfilter-filters" tabindex="-1">BeforeExecFilter and AfterExecFilter filters <a class="header-anchor" href="#beforeexecfilter-and-afterexecfilter-filters" aria-hidden="true">#</a></h2><p>An alternative to debug logging which can easily get lost in the noisy stream of other debug messages is to use the <code>BeforeExecFilter</code> and <code>AfterExecFilter</code> filters where you can inspect executed commands with a custom lambda expression before and after each query is executed. So if one of your a queries are failing you can put a breakpoint in <code>BeforeExecFilter</code> to inspect the populated <code>IDbCommand</code> object before it&#39;s executed or use the <code>.GetDebugString()</code> extension method for an easy way to print the Generated SQL and DB Params to the Console:</p><div class="language-csharp"><pre><code>OrmLiteConfig<span class="token punctuation">.</span>BeforeExecFilter <span class="token operator">=</span> dbCmd <span class="token operator">=&gt;</span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>dbCmd<span class="token punctuation">.</span><span class="token function">GetDebugString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//OrmLiteConfig.AfterExecFilter = dbCmd =&gt; Console.WriteLine(dbCmd.GetDebugString());</span>
</code></pre></div><h2 id="output-generated-sql" tabindex="-1">Output Generated SQL <a class="header-anchor" href="#output-generated-sql" aria-hidden="true">#</a></h2><p>You can use <code>OrmLiteUtils.PrintSql()</code> for the common debugging task of viewing the generated SQL OrmLite executes:</p><div class="language-csharp"><pre><code>OrmLiteUtils<span class="token punctuation">.</span><span class="token function">PrintSql</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>To later disable logging use:</p><div class="language-csharp"><pre><code>OrmLiteUtils<span class="token punctuation">.</span><span class="token function">UnPrintSql</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="exec-result-and-string-filters" tabindex="-1">Exec, Result and String Filters <a class="header-anchor" href="#exec-result-and-string-filters" aria-hidden="true">#</a></h2><p>OrmLite&#39;s core Exec filters makes it possible to inject your own behavior, tracing, profiling, etc.</p><p>It&#39;s useful in situations like wanting to use SqlServer in production but use an <code>in-memory</code> Sqlite database in tests and being able to emulate any missing SQL Server Stored Procedures in code:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MockStoredProcExecFilter</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">OrmLiteExecFilter</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name">T</span> <span class="token generic-method"><span class="token function">Exec</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token class-name">IDbConnection</span> dbConn<span class="token punctuation">,</span> <span class="token class-name">Func<span class="token punctuation">&lt;</span>IDbCommand<span class="token punctuation">,</span> T<span class="token punctuation">&gt;</span></span> filter<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span>dbConn<span class="token punctuation">,</span> filter<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>dbConn<span class="token punctuation">.</span><span class="token function">GetLastSql</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;exec sp_name @firstName, @age&quot;</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token punctuation">(</span>T<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">object</span><span class="token punctuation">)</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Person</span> <span class="token punctuation">{</span> FirstName <span class="token operator">=</span> <span class="token string">&quot;Mocked&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token keyword">throw</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

OrmLiteConfig<span class="token punctuation">.</span>ExecFilter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MockStoredProcExecFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> db <span class="token operator">=</span> <span class="token function">OpenDbConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> person <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SqlScalar</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Person<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;exec sp_name @firstName, @age&quot;</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token punctuation">{</span> firstName <span class="token operator">=</span> <span class="token string">&quot;aName&quot;</span><span class="token punctuation">,</span> age <span class="token operator">=</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    person<span class="token punctuation">.</span>FirstName<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//Mocked</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="capturesqlfilter" tabindex="-1">CaptureSqlFilter <a class="header-anchor" href="#capturesqlfilter" aria-hidden="true">#</a></h2><p>Result filters makes it trivial to implement the <code>CaptureSqlFilter</code> which allows you to capture SQL Statements without running them. <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/blob/4c56bde197d07cfc78a80be06dd557732ecf68fa/src/ServiceStack.OrmLite/OrmLiteResultsFilter.cs#L321" target="_blank" rel="noopener noreferrer">CaptureSqlFilter</a> is just a simple Results Filter which can be used to quickly found out what SQL your DB calls generate by surrounding DB access in a using scope, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> captured <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CaptureSqlFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> db <span class="token operator">=</span> <span class="token function">OpenDbConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Where</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Person<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token punctuation">{</span> Age <span class="token operator">=</span> <span class="token number">27</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    captured<span class="token punctuation">.</span>SqlStatements<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">PrintDump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Emits the Executed SQL along with any DB Parameters:</p><div class="language-"><pre><code>{
    Sql: &quot;SELECT &quot;&quot;Id&quot;&quot;, &quot;&quot;FirstName&quot;&quot;, &quot;&quot;LastName&quot;&quot;, &quot;&quot;Age&quot;&quot; FROM &quot;&quot;Person&quot;&quot; WHERE &quot;&quot;Age&quot;&quot; = @Age&quot;,
    Parameters: 
    {
        Age: 27
    }
}
</code></pre></div><h2 id="replay-exec-filter" tabindex="-1">Replay Exec Filter <a class="header-anchor" href="#replay-exec-filter" aria-hidden="true">#</a></h2><p>Or if you want to do things like executing each operation multiple times, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReplayOrmLiteExecFilter</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">OrmLiteExecFilter</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> ReplayTimes <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name">T</span> <span class="token generic-method"><span class="token function">Exec</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token class-name">IDbConnection</span> dbConn<span class="token punctuation">,</span> <span class="token class-name">Func<span class="token punctuation">&lt;</span>IDbCommand<span class="token punctuation">,</span> T<span class="token punctuation">&gt;</span></span> filter<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> holdProvider <span class="token operator">=</span> OrmLiteConfig<span class="token punctuation">.</span>DialectProvider<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> dbCmd <span class="token operator">=</span> <span class="token function">CreateCommand</span><span class="token punctuation">(</span>dbConn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">var</span></span> ret <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">(</span><span class="token type-expression class-name">T</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> ReplayTimes<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                ret <span class="token operator">=</span> <span class="token function">filter</span><span class="token punctuation">(</span>dbCmd<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">finally</span>
        <span class="token punctuation">{</span>
            <span class="token function">DisposeCommand</span><span class="token punctuation">(</span>dbCmd<span class="token punctuation">)</span><span class="token punctuation">;</span>
            OrmLiteConfig<span class="token punctuation">.</span>DialectProvider <span class="token operator">=</span> holdProvider<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

OrmLiteConfig<span class="token punctuation">.</span>ExecFilter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ReplayOrmLiteExecFilter</span> <span class="token punctuation">{</span> ReplayTimes <span class="token operator">=</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> db <span class="token operator">=</span> <span class="token function">OpenDbConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">DropAndCreateTable</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>PocoTable<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    db<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">PocoTable</span> <span class="token punctuation">{</span> Name <span class="token operator">=</span> <span class="token string">&quot;Multiplicity&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">var</span></span> rowsInserted <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Count</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>PocoTable<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Name <span class="token operator">==</span> <span class="token string">&quot;Multiplicity&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//3</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="mockable-extension-methods" tabindex="-1">Mockable extension methods <a class="header-anchor" href="#mockable-extension-methods" aria-hidden="true">#</a></h2><p>The Result Filters also lets you easily mock results and avoid hitting the database, typically useful in Unit Testing Services to mock OrmLite API&#39;s directly instead of using a repository, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">OrmLiteResultsFilter</span> <span class="token punctuation">{</span>
    PrintSql <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    SingleResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Person</span> <span class="token punctuation">{</span> 
      Id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> FirstName <span class="token operator">=</span> <span class="token string">&quot;Mocked&quot;</span><span class="token punctuation">,</span> LastName <span class="token operator">=</span> <span class="token string">&quot;Person&quot;</span><span class="token punctuation">,</span> Age <span class="token operator">=</span> <span class="token number">100</span> 
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Single</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Person<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Age <span class="token operator">==</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">.</span>FirstName <span class="token comment">// Mocked</span>
    db<span class="token punctuation">.</span><span class="token function">Single</span><span class="token punctuation">(</span>db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Person<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Age <span class="token operator">==</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>FirstName <span class="token comment">// Mocked</span>
    db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Single</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Person<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token punctuation">{</span> Age <span class="token operator">=</span> <span class="token number">42</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span>FirstName <span class="token comment">// Mocked</span>
    db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Single</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Person<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;Age = @age&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> age <span class="token operator">=</span> <span class="token number">42</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span>FirstName <span class="token comment">// Mocked</span>
<span class="token punctuation">}</span>
</code></pre></div><p>More examples showing how to mock different APIs including support for nesting available in <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/blob/master/tests/ServiceStack.OrmLite.Tests/MockAllApiTests.cs" target="_blank" rel="noopener noreferrer">MockAllApiTests.cs</a></p><h2 id="string-filter" tabindex="-1">String Filter <a class="header-anchor" href="#string-filter" aria-hidden="true">#</a></h2><p>There&#39;s also a specific filter for strings available which allows you to apply custom sanitization on String fields, e.g. you can ensure all strings are right trimmed with:</p><div class="language-csharp"><pre><code>OrmLiteConfig<span class="token punctuation">.</span>StringFilter <span class="token operator">=</span> s <span class="token operator">=&gt;</span> s<span class="token punctuation">.</span><span class="token function">TrimEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

db<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Poco</span> <span class="token punctuation">{</span> Name <span class="token operator">=</span> <span class="token string">&quot;Value with trailing   &quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Poco<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Name <span class="token comment">// &quot;Value with trailing&quot;</span>
</code></pre></div><h2 id="pluggable-complex-type-serializers" tabindex="-1">Pluggable Complex Type Serializers <a class="header-anchor" href="#pluggable-complex-type-serializers" aria-hidden="true">#</a></h2><p>Pluggable serialization lets you specify different serialization strategies of Complex Types for each available RDBMS provider, e.g:</p><div class="language-csharp"><pre><code><span class="token comment">//ServiceStack&#39;s JSON and JSV Format</span>
SqliteDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">.</span>StringSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JsvStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       
PostgreSqlDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">.</span>StringSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JsonStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//.NET&#39;s XML and JSON DataContract serializers</span>
SqlServerDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">.</span>StringSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataContractSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
MySqlDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">.</span>StringSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JsonDataContractSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//.NET XmlSerializer</span>
OracleDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">.</span>StringSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">XmlSerializableSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>You can also provide a custom serialization strategy by implementing <a href="https://github.com/ServiceStack/ServiceStack.Text/blob/master/src/ServiceStack.Text/IStringSerializer.cs" target="_blank" rel="noopener noreferrer">IStringSerializer</a>.</p><p>By default, all dialects use the existing <code>JsvStringSerializer</code>, except for PostgreSQL which due to its built-in support for JSON, uses the JSON format by default.</p>`,35),o=[p];function c(l,i,u,r,k,d){return a(),s("div",null,o)}var f=n(e,[["render",c]]);export{m as __pageData,f as default};
