import{_ as e,c as n,o as t,a}from"./app.64b20f26.js";const f='{"title":"Run ServiceStack in FastCGI hosted on nginx","description":"","frontmatter":{"slug":"servicestack-in-fastcgi-hosted-on-nginx","title":"Run ServiceStack in FastCGI hosted on nginx"},"headers":[{"level":2,"title":"Install prerequisites","slug":"install-prerequisites"},{"level":2,"title":"Service example","slug":"service-example"},{"level":2,"title":"nginx configuration","slug":"nginx-configuration"},{"level":2,"title":"Fast CGI","slug":"fast-cgi"},{"level":2,"title":"References","slug":"references"}],"relativePath":"servicestack-in-fastcgi-hosted-on-nginx.md","lastUpdated":1645007721761}',i={},r=a(`<p>FastCGI is a protocol for interfacing programs with a web server. In this case we&#39;re going to interface with nginx. This guide will show you how to host a simple hello world application in nginx.</p><h2 id="install-prerequisites" tabindex="-1">Install prerequisites <a class="header-anchor" href="#install-prerequisites" aria-hidden="true">#</a></h2><p>The tutorial is written using Ubuntu 12.04. At the time of writing I using the following versions.</p><ul><li>nginx - 1.1.19-1</li><li>mono - 2.10.8.1</li><li>mono-fastcgi-server4 - 2.10.0.0</li></ul><p>The easiest way to get started is using apt-get</p><div class="language-bash"><pre><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> mono
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> mono-fastcgi-server4
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> nginx
</code></pre></div><h2 id="service-example" tabindex="-1">Service example <a class="header-anchor" href="#service-example" aria-hidden="true">#</a></h2><p>The earlier example of <a href="/create-your-first-webservice">Create your first webservice</a> provides us with everything we need for this demo. If you&#39;re feeling very lazy you can <a href="https://github.com/ServiceStack/ServiceStack.Examples/tree/master/src/ServiceStack.Hello" target="_blank" rel="noopener noreferrer">grab one of the examples.</a></p><h2 id="nginx-configuration" tabindex="-1">nginx configuration <a class="header-anchor" href="#nginx-configuration" aria-hidden="true">#</a></h2><p>First start by editing your nginx config</p><div class="language-bash"><pre><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/nginx/sites-available/default 
</code></pre></div><p>replace the server tag with the following config</p><div class="language-"><pre><code>server {
  listen 80; ## listen for ipv4
  location / {
    root /var/www;
      index index.html index.htm;
      fastcgi_pass unix:/tmp/SOCK-ServiceStack;
      include /etc/nginx/fastcgi_params;
  }
}
</code></pre></div><p>then restart nginx</p><div class="language-"><pre><code>sudo /etc/init.d/nginx restart 
</code></pre></div><h2 id="fast-cgi" tabindex="-1">Fast CGI <a class="header-anchor" href="#fast-cgi" aria-hidden="true">#</a></h2><p>You need to launch fastcgi from within the directory that has your web.config. You can run fastcgi with the following command</p><div class="language-"><pre><code>fastcgi-mono-server4 /applications=/:. /filename=/tmp/SOCK-ServiceStack /socket=unix
</code></pre></div><p>Alternatively you can provide the path /applications=/:/path/to/web_config_directory</p><p>This will run fastcgi-mono-server4 as the current user and will change the permissions on the socket to be that of the current user. You will need to setup your permissions so that the www-data group/user has read-write access to /tmp/SOCK-ServiceStack. To get up and running you can do the following</p><div class="language-"><pre><code>sudo chgrp www-data /tmp/SOCK-ServiceStack
sudo chmod g+rw /tmp/SOCK-ServiceStack
</code></pre></div><p>And that&#39;s it you should be up and running. You can now visit your site running on <a href="http://localhost/hello/service%20stack%20running%20in%20mono%20on%20nginx" target="_blank" rel="noopener noreferrer">localhost</a></p><h2 id="references" tabindex="-1">References <a class="header-anchor" href="#references" aria-hidden="true">#</a></h2><ul><li>[Mono Fast Cgi] (<a href="http://www.mono-project.com/FastCGI" target="_blank" rel="noopener noreferrer">http://www.mono-project.com/FastCGI</a>)</li><li>[Mono Fast Cgi with Nginx] (<a href="http://www.mono-project.com/FastCGI_Nginx" target="_blank" rel="noopener noreferrer">http://www.mono-project.com/FastCGI_Nginx</a>)</li><li>[nginx] (<a href="http://wiki.nginx.org/Main" target="_blank" rel="noopener noreferrer">http://wiki.nginx.org/Main</a>)</li><li><a href="http://stackoverflow.com/questions/12188356/what-is-the-best-way-to-run-servicestack-on-linux-mono" target="_blank" rel="noopener noreferrer">What is the best way to run ServiceStack on Linux / Mono?</a> answered on <a href="http://stackoverflow.com" target="_blank" rel="noopener noreferrer">StackOverflow</a></li></ul>`,24),s=[r];function o(c,l,p,h,g,u){return t(),n("div",null,s)}var v=e(i,[["render",o]]);export{f as __pageData,v as default};
