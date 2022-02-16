import{_ as e,c as t,o,a}from"./app.64b20f26.js";const m='{"title":"GitHub Actions mix template - Deploy to AWS ECS","description":"","frontmatter":{"title":"GitHub Actions mix template - Deploy to AWS ECS","slug":"mix-github-actions-aws-ecs"},"headers":[{"level":3,"title":"Hosting setup","slug":"hosting-setup"},{"level":3,"title":"Deployment setup","slug":"deployment-setup"},{"level":3,"title":"Getting started","slug":"getting-started"},{"level":2,"title":"AWS Setup","slug":"aws-setup"},{"level":3,"title":"ECS Cluster","slug":"ecs-cluster"},{"level":3,"title":"EC2 Instance Setup","slug":"ec2-instance-setup"},{"level":3,"title":"Choose AMI","slug":"choose-ami"},{"level":3,"title":"Choose Instance Type","slug":"choose-instance-type"},{"level":3,"title":"Configure Instance","slug":"configure-instance"},{"level":3,"title":"Add Storage","slug":"add-storage"},{"level":3,"title":"Configure Security Groups","slug":"configure-security-groups"},{"level":3,"title":"Setup Docker-compose and nginx-proxy","slug":"setup-docker-compose-and-nginx-proxy"},{"level":3,"title":"IAM Deploy User","slug":"iam-deploy-user"},{"level":3,"title":"Route 53","slug":"route-53"},{"level":3,"title":"Validate AWS Setup","slug":"validate-aws-setup"},{"level":3,"title":"Setup Repository Secrets","slug":"setup-repository-secrets"},{"level":3,"title":"Deploying your application","slug":"deploying-your-application"},{"level":3,"title":"Wrapping up","slug":"wrapping-up"}],"relativePath":"mix-github-actions-aws-ecs.md","lastUpdated":1645007721713}',s={},n=a(`__VP_STATIC_START__<p>AWS EC2 Container Service (ECS) is a managed container orchestration environment that while not as flexible as Kubernetes, it provides some great integration if you are already in an AWS environment, especially for hosting HTTP APIs. However, when just getting started on a project, setting up Application Load Balancers, CloudFront CDN, AutoScaling Groups etc can be a high entry point from a monthly cost and complexity standpoint. It also provides an alternative to &#39;serverless&#39; solutions that avoid issues like cold starts as well as polluting any of your code with cloud provider specific implementation.</p><p>We&#39;ve created a new <code>x mix release-ecr-aws</code> template to try and help solo developers and small teams that think they might use a more mature AWS ECS setup in the future, but don&#39;t have the budget or just want a cheap host for a prototype/demo. Once your product grows, integrating all the other AWS infrastructure is a smaller and clearer path than trying to do it from the very beginning, not knowing if you&#39;ll ever need it.</p><p>We&#39;re also going to leverage the powerful GitHub Actions platform so that the distance between your CI environment and code is as small as possible. The <code>x mix release-ecr-aws</code> template provides a starting point for your ServiceStack application to have a CI setup and deploy to a <strong>single</strong> server in ECS to keep costs down. This is good for prototyping an idea or any low request rate applications where you think you&#39;ll move into a more standard ECS infrastructure pattern as your application usage increases.</p><h3 id="hosting-setup" tabindex="-1">Hosting setup <a class="header-anchor" href="#hosting-setup" aria-hidden="true">#</a></h3><p>Since we are trying to keep costs at a minimal, just like our Digital Ocean hosting, we are using just 1 EC2 instance to (potentially) host multiple low traffic applications with minimal infrastructure. In this pattern we are using</p><ul><li>Route53 (DNS)</li><li>1 EC2 instance</li><li>ECS (to manage our deployments)</li><li>ECR (to stored our docker images)</li></ul><p>The lion share of the costs will come from the single EC2 instance which you can match for size depending on how many applications you want to host on the 1 instance, a t3.micro is ~$8/month. ECR (docker repository) does cost money for storage at ~$0.10 per GB/month. $0.50 a month for a Route53 hosted zone. So while this is not quite as cheap as Digital Ocean setup we&#39;ve shown, it is a stepping stone into using AWS ECS for a much larger horizontally scaling hosting setup without much change.</p><p>Keeping parts to our setup to a minimum, Route 53 points each subomain to the IP address of our EC2 instance, nginx-proxy routes traffic to each application running in docker.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/cloudcraft-host-digram-release-ecr-aws.png" alt=""></p><h3 id="deployment-setup" tabindex="-1">Deployment setup <a class="header-anchor" href="#deployment-setup" aria-hidden="true">#</a></h3><p>In the <code>release-ecr-aws</code> template we are using <code>ecr</code> for the storage of our Docker images and ECS for the deployment. Everything runes on GitHub Actions as provided by the template and your specific details are provided by GitHub Secrets (stored at the repository or organization level).</p><p>The GitHub Actions require an ECS cluster to be created with a single EC2 instance as member of that cluster. The rest of the AWS resources are created by the GitHub Action the first time it runs.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/release-ecr-aws-diagram.png" alt=""></p><p>AWS ECS Agent that runs on the EC2 instance manages with ECS when to create/destroy containers. Since there is only 1 EC2 instance in the cluster, everything runs on the same instance.</p><h3 id="getting-started" tabindex="-1">Getting started <a class="header-anchor" href="#getting-started" aria-hidden="true">#</a></h3><p>Now that we have the high level overview out of the way, lets get your apps running! For this tutorial, we&#39;ll start with a new ServiceStack application using <code>x new</code> and incorporate the GitHub Action templates to get our CI environment started.</p><p>First, create your new git repository on GitHub.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/github-create-new-repo.png" alt=""></p><p>Once created, follow the GitHub wizard and clone it to your local machine.</p><p>Then you can use the following commands to get your new ServiceStack application setup in GitHub with GitHub Actions.</p><blockquote><p>Choose the appropriate web template from <code>x new</code> for your needs as most templates are compatible GitHub Actions <code>x mix</code> templates. <code>x new web</code> will create a project in an existing directory, <code>x new web WebApp</code> will create the project in a new <code>WebApp</code> folder.</p></blockquote><div class="language-"><pre><code>git clone &lt;Git URL&gt;
cd WebApp
x new web
git add -A
git commit -m &quot;Initial commit&quot;
git branch -M main
git remote add origin &lt;copy git URL from GitHub page&gt;
git push -u origin main
x mix build release-ecr-aws
git add -A
git commit -m &quot;Add GitHub Action files&quot;
git push
</code></pre></div><h2 id="aws-setup" tabindex="-1">AWS Setup <a class="header-anchor" href="#aws-setup" aria-hidden="true">#</a></h2><p>If you&#39;re use to setting up larger AWS infrastructure, you&#39;ll likely have experienced how costs can rise easily or seen complex infrastructure architected small for a web application doing 5 requests/sec with minimal users. These types of setups can be unnecessarily costly and complex and if you are a solo developer or small team (for which is pattern is more suited), is likely not suitable starting point. As your application infrastructure needs evolve, so can your cloud provider environment, this template provides a starting point with AWS ECS while keeping costs to a minimum.</p><p>As previously stated above, this template needs the following in AWS:</p><ul><li>A <strong>dedicated</strong> ECS cluster (not shared)</li><li>Single EC2 server registered to that ECS cluster</li><li>IAM User Credentials with <code>AmazonEC2ContainerRegistryFullAccess</code> and <code>AmazonECS_FullAccess</code> for use (exclusively) by GitHub Actions.</li><li>Route53 (or other DNS manager) with an A record pointing to the EC2 instance public IP</li></ul><h3 id="ecs-cluster" tabindex="-1">ECS Cluster <a class="header-anchor" href="#ecs-cluster" aria-hidden="true">#</a></h3><p>An empty ECS Cluster is needed as the GitHub Action process won&#39;t create this for you. You can choose to use the ECS Cluster wizard to create you an Auto-scaling Group, security groups, etc but the idea to start with is to just start with an empty ECS Cluster that an EC2 instance will join when we create it. This pattern doesn&#39;t scale horizontally with additional EC2 instances, but since it does use ECS, changing to use a load balancer and target groups can be introduced once they are needed.</p><blockquote><p>If you know you need horizontal scaling, it would be suggested to jump straight to using Application Load Balancer with Target Groups to manage your cluster services routing with the additional costs that come with that. The base cost of an ALB is ~$20/month, costs also scales up with requests. <a href="https://aws.amazon.com/elasticloadbalancing/pricing/" target="_blank" rel="noopener noreferrer">See pricing details</a>, the use of &quot;LCU&quot;s makes it highly dependent on your use case.</p></blockquote><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/create-cluster-ecs-1.png" alt=""> <img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/create-cluster-ecs-2.png" alt=""></p><h3 id="ec2-instance-setup" tabindex="-1">EC2 Instance Setup <a class="header-anchor" href="#ec2-instance-setup" aria-hidden="true">#</a></h3><p>Now we can create the EC2 instance, the goal being is that our EC2 instance will join our cluster and run docker + ECS agent to work with this setup.</p><h3 id="choose-ami" tabindex="-1">Choose AMI <a class="header-anchor" href="#choose-ami" aria-hidden="true">#</a></h3><p>You need to use the AWS <code>Optimized for ECS</code> images, the easiest way to find the latest Amazon Linux 2 image for this is to go to the <a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-optimized_AMI.html#ecs-optimized-ami-linux" target="_blank" rel="noopener noreferrer">AWS documentation for ECS-optimized AMIs and look up your region here</a>.</p><p>Using the AMI ID (starts with <code>ami-</code>) at the bottom, search in the &#39;Community AMIs&#39; tab on the first step of the <code>Launch EC2 Instance</code> wizard.</p><h3 id="choose-instance-type" tabindex="-1">Choose Instance Type <a class="header-anchor" href="#choose-instance-type" aria-hidden="true">#</a></h3><p>A t3.micro or larger will work fine, this pattern can be used to host multiple applications on the 1 server so if the number of applications gets larger, you might need a larger instance type.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>this pattern is suitable for testing prototypes or low traffic applications as it is cost effective and makes it easy to bundle multiple apps onto 1 EC2 instance.</p></div><h3 id="configure-instance" tabindex="-1">Configure Instance <a class="header-anchor" href="#configure-instance" aria-hidden="true">#</a></h3><p>Under <code>IAM role</code>, use the <code>ecsInstanceRole</code>, if this is not available, see <a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/instance_IAM_role.html" target="_blank" rel="noopener noreferrer">AWS documentation for the process of checking if it exists and creating it if needed</a>.</p><p>If you are <em>not</em> using your own generated Elastic IP, select <code>Enabled</code> for <code>Auto-assign Public IP</code>.</p><p>You will also want to add the following Userdata script (in the <code>Configure</code> step of the launch wizard) with your own <code>ECS_CLUSTER</code> value. This tells the ecs-agent running on the instance which ECS cluster the instance should join.</p><div class="language-bash"><pre><code><span class="token shebang important">#!/bin/bash</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOS<span class="token bash punctuation"> <span class="token operator">&gt;</span>/etc/ecs/ecs.config</span>
ECS_CLUSTER=my-cluster
ECS_AVAILABLE_LOGGING_DRIVERS=[&quot;awslogs&quot;, &quot;syslog&quot;]
ECS_ENABLE_CONTAINER_METADATA=true
EOS</span>
</code></pre></div><p>Note down your cluster name as it will need to be used to create the cluster in ECS before it is visible. See <a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html" target="_blank" rel="noopener noreferrer"><code>ECS Container Agent Configuration</code></a> for more information.</p><h3 id="add-storage" tabindex="-1">Add Storage <a class="header-anchor" href="#add-storage" aria-hidden="true">#</a></h3><p>The default of 30gb is fine but take into account how large/how many applications you&#39;ll have running.</p><h3 id="configure-security-groups" tabindex="-1">Configure Security Groups <a class="header-anchor" href="#configure-security-groups" aria-hidden="true">#</a></h3><p>You&#39;ll want to expose at least ports 80, 443 and 22 for remote SSH access. We&#39;ll need SSH access for the next step, once setup it can be closed off or restricted.</p><h3 id="setup-docker-compose-and-nginx-proxy" tabindex="-1">Setup Docker-compose and nginx-proxy <a class="header-anchor" href="#setup-docker-compose-and-nginx-proxy" aria-hidden="true">#</a></h3><p>To route traffic to your ServiceStack applications and automate the generation and management of TLS certificates, an additional docker-compose file is provided via the <code>x mix</code> template, <code>nginx-proxy-compose.yml</code> under the <code>deploy</code> directory of your repository. This docker-compose file is ready to run and can be copied to the deployment server.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>This is done via docker-compose rather than via ECS itself for simplicity as ECS is really not designed to make it easy to handle routing on the EC2 instance itself</p></div><p>First you&#39;ll need to install <code>docker-compose</code>.</p><div class="language-bash"><pre><code><span class="token function">sudo</span> <span class="token function">curl</span> -L <span class="token string">&quot;https://github.com/docker/compose/releases/download/1.27.4/docker-compose-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -s<span class="token variable">)</span></span>-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -m<span class="token variable">)</span></span>&quot;</span> -o /usr/local/bin/docker-compose
<span class="token function">sudo</span> <span class="token function">chmod</span> +x /usr/local/bin/docker-compose
</code></pre></div><p>Run <code>docker-compose --version</code> to confirm.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Check <a href="https://docs.docker.com/compose/install/" target="_blank" rel="noopener noreferrer">docker-compose documentation</a> for changes or new versions</p></div><p>To copy you can use scp or create a new file via server text editor to copy the short YML file over. For this example, we are going to copy it straight to the ~/ (home) directory.</p><div class="language-bash"><pre><code><span class="token function">scp</span> -i <span class="token operator">&lt;</span>path to private <span class="token function">ssh</span> key<span class="token operator">&gt;</span> ./nginx-proxy-compose.yml ec2-user@<span class="token operator">&lt;</span>server_floating_ip<span class="token operator">&gt;</span>:~/nginx-proxy.compose.yml
</code></pre></div><p>For example, once copied to remote <code>~/nginx-proxy-compose.yml</code>, the following command can be run on the remote server.</p><div class="language-"><pre><code>docker-compose -f ~/nginx-proxy-compose.yml up -d
</code></pre></div><p>This will run an nginx reverse proxy along with a companion container that will watch for additional containers in the same docker bridge network and attempt to initialize them with valid TLS certificates. This includes containers created and managed by the ECS agent.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>If the container doesn&#39;t have the environment variable <code>VIRTUAL_HOST</code> set, it will be ignored. See the <code>task-definition-template.json</code> environment for more details</p></div><h3 id="iam-deploy-user" tabindex="-1">IAM Deploy User <a class="header-anchor" href="#iam-deploy-user" aria-hidden="true">#</a></h3><p>For GitHub Actions to authenticate with AWS, you&#39;ll need a user with programmatic access and sufficient permissions to initialize the ECS + ECR resources. Once the initial deployment is complete, reduced access can be used for just uploading to ECR and promoting new releases to ECS. See the README in the Mix template for example of reduced access IAM policy for deployments.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/release-ecr-aws-iam-create.png" alt=""></p><h3 id="route-53" tabindex="-1">Route 53 <a class="header-anchor" href="#route-53" aria-hidden="true">#</a></h3><p>To enough the nginx-proxy-lets-ecrypt-companion to work, a domain or subdomain DNS entry is needed to point to our EC2 host. You can use any DNS management tool, but in this example we will be using Route53.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/route-53-create-A-record.png" alt=""></p><h3 id="validate-aws-setup" tabindex="-1">Validate AWS Setup <a class="header-anchor" href="#validate-aws-setup" aria-hidden="true">#</a></h3><p>Once completed the above steps, we can validate some of the setup by performing the following tests.</p><ul><li>Check our ECS cluster has 1 EC2 instance registered.</li><li>Get a response from nginx for the application&#39;s subdomain.</li></ul><p>If both these are showing up, our AWS environment should be ready to deploy the application.</p><h3 id="setup-repository-secrets" tabindex="-1">Setup Repository Secrets <a class="header-anchor" href="#setup-repository-secrets" aria-hidden="true">#</a></h3><p>The GitHub Action templates added using <code>x mix release-ecr-aws</code> get their input from GitHub Secrets. These can be added to the repository or to your organization if there are common ones you are using in multiple repositories.</p><ul><li>AWS_ACCESS_KEY_ID - AWS access key for programmatic access to AWS APIs.</li><li>AWS_SECRET_ACCESS_KEY - AWS access secrets for programmatic access to AWS APIs.</li><li>AWS_REGION - default region for AWS API calls.</li><li>AWS_ECS_CLUSTER - Cluster name in ECS, this should match the value in your Userdata.</li><li>HOST_DOMAIN - Domain/sub-domain of your application, eg <code>my-app.example.com</code> .</li><li>LETSENCRYPT_EMAIL - Email address, required for Let&#39;s Encrypt automated TLS certificates.</li></ul><p>These secrets can use the <a href="https://cli.github.com/manual/gh_secret_set" target="_blank" rel="noopener noreferrer">GitHub CLI</a> for ease of creation. Eg, using the GitHub CLI the following can be set.</p><div class="language-bash"><pre><code>gh secret <span class="token builtin class-name">set</span> AWS_ACCESS_KEY_ID -b<span class="token string">&quot;&lt;AWS_ACCESS_KEY_ID&gt;&quot;</span>
gh secret <span class="token builtin class-name">set</span> AWS_SECRET_ACCESS_KEY -b<span class="token string">&quot;&lt;AWS_SECRET_ACCESS_KEY&gt;&quot;</span>
gh secret <span class="token builtin class-name">set</span> AWS_REGION -b<span class="token string">&quot;&lt;AWS_REGION, eg us-east-1&gt;&quot;</span>
gh secret <span class="token builtin class-name">set</span> AWS_ECS_CLUSTER -b<span class="token string">&quot;&lt;AWS_ECS_CLUSTER, eg my-apps&gt;&quot;</span>
gh secret <span class="token builtin class-name">set</span> HOST_DOMAIN -b<span class="token string">&quot;&lt;HOST_DOMAIN, eg my-app.example.com&gt;&quot;</span>
gh secret <span class="token builtin class-name">set</span> LETSENCRYPT_EMAIL -b<span class="token string">&quot;&lt;LETSENCRYPT_EMAIL, eg me@example.com&gt;&quot;</span>
</code></pre></div><p>These secrets are used to populate variables within GitHub Actions and other configuration files.</p><p>For the AWS access, a separate user specifically for deploying via GitHub Actions should be used.</p><p>The GitHub Action template in <code>.github/workflows/release.yml</code> is there as a starting point and should be edited as required. The idea is that you can evolve and change these to your needs as your application grows.</p><h3 id="deploying-your-application" tabindex="-1">Deploying your application <a class="header-anchor" href="#deploying-your-application" aria-hidden="true">#</a></h3><p>To start any new deployment, we use GitHub Releases.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/github-create-new-release.png" alt=""></p><p>Provide a version number and name, the version will be used to tag the Docker image in ECR. If you are using the GitHub CLI, you can also do this via the command line. For example,</p><div class="language-"><pre><code>gh release create v1.0 -t &quot;CI Deploy&quot; --notes &quot;&quot;
</code></pre></div><p>Go to the Actions tab in your repository to see the progress of your deployment.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/github-actions-workflows-release.png" alt=""></p><p>The initial deployment might take up to a minute for Lets-Encrypt to generate and use the certificate with your domain. Make sure your DNS is all setup before doing this, otherwise further delays related to DNS TTL will likely occur. If you are having problems with your app hosting, be sure to configure the logs in the nginx and your app docker containers for any startup issues. You can also run in attached mode to watch the output of these containers via docker-compose -f ~/nginx-proxy-compose.yml up. Logs for your application are automatically setup to use CloudWatch under the name <code>{your-ecs-cluster-name}-{your-app-name}</code>.</p><h3 id="wrapping-up" tabindex="-1">Wrapping up <a class="header-anchor" href="#wrapping-up" aria-hidden="true">#</a></h3><p>Like our other GitHub Action templates, making it easier to have an automated CI environment setup and running from the beginning pays off very quickly. If you&#39;re confident you are going to be using ECS in the future or already have AWS as your cloud provider, using this template will help you get started cheaply whilst enabling you to expand and adjust your automated CI strategies as your needs evolve.</p><p>Using ECS with a single EC2 instance is not a common pattern you&#39;ll see on AWS sales pitches or &#39;How to scale&#39; guides. However, it does allow you to test your ideas, share your prototypes cheaply with friends and colleagues. Not everything has to be &#39;web scale&#39; and starting from that point can be distracting and intimidating, not to mention expensive. Hopefully this pattern helps you build something small, test out your theories quickly while giving you a good base to build on as your application grows.</p><p>We intend to put together more of these templates and patterns for different use cases utilizing GitHub Actions, feel free to give us feedback and let us know what you&#39;d like to see!</p>__VP_STATIC_END__`,91),i=[n];function r(c,l,p,u,d,h){return o(),t("div",null,i)}var y=e(s,[["render",r]]);export{m as __pageData,y as default};
