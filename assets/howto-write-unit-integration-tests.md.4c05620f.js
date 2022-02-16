import{_ as n,c as s,o as a,a as t}from"./app.64b20f26.js";const y='{"title":"How to write Unit & Integration tests","description":"","frontmatter":{"slug":"howto-write-unit-integration-tests","title":"How to write Unit & Integration tests"},"headers":[{"level":2,"title":"Integration test example","slug":"integration-test-example"}],"relativePath":"howto-write-unit-integration-tests.md","lastUpdated":1645007720873}',p={},o=t(`<h2 id="integration-test-example" tabindex="-1">Integration test example <a class="header-anchor" href="#integration-test-example" aria-hidden="true">#</a></h2><p>The <a href="https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.WebHost.Endpoints.Tests/CustomerRestExample.cs" target="_blank" rel="noopener noreferrer">CustomerRestExample.cs</a> shows an example of a stand-alone integration test:</p><div class="language-csharp"><pre><code><span class="token comment">//Create your ServiceStack AppHost with only the dependencies your tests need</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppHost</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">AppSelfHostBase</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">AppHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span><span class="token string">&quot;Customer REST Example&quot;</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">CustomerService</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Assembly<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Configure</span><span class="token punctuation">(</span><span class="token class-name">Container</span> container<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Register</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDbConnectionFactory<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> 
            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OrmLiteConnectionFactory</span><span class="token punctuation">(</span><span class="token string">&quot;:memory:&quot;</span><span class="token punctuation">,</span> SqliteDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> db <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDbConnectionFactory<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">CreateTableIfNotExists</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Customer<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//Add Service Contract DTO&#39;s and Data Models</span>
<span class="token punctuation">[</span><span class="token function">Route</span><span class="token punctuation">(</span><span class="token string">&quot;/customers&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GetCustomers</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IReturn<span class="token punctuation">&lt;</span>GetCustomersResponse<span class="token punctuation">&gt;</span></span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GetCustomersResponse</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span>Customer<span class="token punctuation">&gt;</span></span> Results <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;/customers/{Id}&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GetCustomer</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IReturn<span class="token punctuation">&lt;</span>Customer<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;/customers&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;POST&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CreateCustomer</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IReturn<span class="token punctuation">&lt;</span>Customer<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;/customers/{Id}&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;PUT&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UpdateCustomer</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IReturn<span class="token punctuation">&lt;</span>Customer<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;/customers/{Id}&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;DELETE&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DeleteCustomer</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IReturnVoid</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Customer</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">AutoIncrement</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//Provide the implementation for your above Service Contracts</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomerService</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Service</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token class-name">GetCustomers</span> request<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">GetCustomersResponse</span> <span class="token punctuation">{</span> Results <span class="token operator">=</span> Db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Customer<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token class-name">GetCustomer</span> request<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> Db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Customer<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Post</span><span class="token punctuation">(</span><span class="token class-name">CreateCustomer</span> request<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> customer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Customer</span> <span class="token punctuation">{</span> Name <span class="token operator">=</span> request<span class="token punctuation">.</span>Name <span class="token punctuation">}</span><span class="token punctuation">;</span>
        Db<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span>customer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> customer<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Put</span><span class="token punctuation">(</span><span class="token class-name">UpdateCustomer</span> request<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> customer <span class="token operator">=</span> Db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Customer<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>customer <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> HttpError<span class="token punctuation">.</span><span class="token function">NotFound</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$&quot;Customer &#39;</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">request<span class="token punctuation">.</span>Id</span><span class="token punctuation">}</span></span><span class="token string">&#39; does not exist&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        customer<span class="token punctuation">.</span>Name <span class="token operator">=</span> request<span class="token punctuation">.</span>Name<span class="token punctuation">;</span>
        Db<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span>customer<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> customer<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Delete</span><span class="token punctuation">(</span><span class="token class-name">DeleteCustomer</span> request<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">DeleteById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Customer<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//Write your Integration tests</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomerRestExample</span>
<span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> BaseUri <span class="token operator">=</span> <span class="token string">&quot;http://localhost:2000/&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">ServiceStackHost</span> appHost<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CustomerRestExample</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//Start your AppHost on TestFixture SetUp</span>
        appHost <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AppHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>BaseUri<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">OneTimeTearDown</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OneTimeTearDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> appHost<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* Write your Integration Tests against the self-host instance */</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Test</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Run_Customer_REST_Example</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JsonServiceClient</span><span class="token punctuation">(</span>BaseUri<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//GET /customers</span>
        <span class="token class-name"><span class="token keyword">var</span></span> all <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">GetCustomers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Assert<span class="token punctuation">.</span><span class="token function">That</span><span class="token punctuation">(</span>all<span class="token punctuation">.</span>Results<span class="token punctuation">.</span>Count<span class="token punctuation">,</span> Is<span class="token punctuation">.</span><span class="token function">EqualTo</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//POST /customers</span>
        <span class="token class-name"><span class="token keyword">var</span></span> customer <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Post</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">CreateCustomer</span> <span class="token punctuation">{</span> Name <span class="token operator">=</span> <span class="token string">&quot;Foo&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Assert<span class="token punctuation">.</span><span class="token function">That</span><span class="token punctuation">(</span>customer<span class="token punctuation">.</span>Id<span class="token punctuation">,</span> Is<span class="token punctuation">.</span><span class="token function">EqualTo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//GET /customer/1</span>
        customer <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">GetCustomer</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> customer<span class="token punctuation">.</span>Id <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Assert<span class="token punctuation">.</span><span class="token function">That</span><span class="token punctuation">(</span>customer<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> Is<span class="token punctuation">.</span><span class="token function">EqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Foo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//GET /customers</span>
        all <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">GetCustomers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Assert<span class="token punctuation">.</span><span class="token function">That</span><span class="token punctuation">(</span>all<span class="token punctuation">.</span>Results<span class="token punctuation">.</span>Count<span class="token punctuation">,</span> Is<span class="token punctuation">.</span><span class="token function">EqualTo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//PUT /customers/1</span>
        customer <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">UpdateCustomer</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> customer<span class="token punctuation">.</span>Id<span class="token punctuation">,</span> Name <span class="token operator">=</span> <span class="token string">&quot;Bar&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Assert<span class="token punctuation">.</span><span class="token function">That</span><span class="token punctuation">(</span>customer<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> Is<span class="token punctuation">.</span><span class="token function">EqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Bar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//DELETE /customers/1</span>
        client<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">DeleteCustomer</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> customer<span class="token punctuation">.</span>Id <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//GET /customers</span>
        all <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">GetCustomers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Assert<span class="token punctuation">.</span><span class="token function">That</span><span class="token punctuation">(</span>all<span class="token punctuation">.</span>Results<span class="token punctuation">.</span>Count<span class="token punctuation">,</span> Is<span class="token punctuation">.</span><span class="token function">EqualTo</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,3),e=[o];function c(u,l,k,i,r,m){return a(),s("div",null,e)}var w=n(p,[["render",c]]);export{y as __pageData,w as default};
