(window.webpackJsonp=window.webpackJsonp||[]).push([[131],{421:function(n,s,e){"use strict";e.r(s),s.default='<p>The following sections describe the major changes from webpack 1 to 2.</p>\n<blockquote class="tip">\n<p>Note that there were far fewer changes between 2 and 3, so that migration shouldn\'t be too bad. If you are running into issues, please see <a href="https://github.com/webpack/webpack/releases">the changelog</a> for details.</p>\n</blockquote>\n<h2 id="resolveroot-resolvefallback-resolvemodulesdirectories"><code>resolve.root</code>, <code>resolve.fallback</code>, <code>resolve.modulesDirectories</code><a href="#resolveroot-resolvefallback-resolvemodulesdirectories" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>These options were replaced by a single option <code>resolve.modules</code>. See <a href="/configuration/resolve">resolving</a> for more usage.</p>\n<pre><code class="hljs language-diff">  resolve: {\n<span class="token deleted">-   root: path.join(__dirname, "src")</span>\n<span class="token inserted">+   modules: [</span>\n<span class="token inserted">+     path.join(__dirname, "src"),</span>\n<span class="token inserted">+     "node_modules"</span>\n<span class="token inserted">+   ]</span>\n  }</code></pre>\n<h2 id="resolveextensions"><code>resolve.extensions</code><a href="#resolveextensions" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>This option no longer requires passing an empty string. This behavior was moved to <code>resolve.enforceExtension</code>. See <a href="/configuration/resolve">resolving</a> for more usage.</p>\n<h2 id="resolve"><code>resolve.*</code><a href="#resolve" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Several APIs were changed here. Not listed in detail as it\'s not commonly used. See <a href="/configuration/resolve">resolving</a> for details.</p>\n<h2 id="moduleloaders-is-now-modulerules"><code>module.loaders</code> is now <code>module.rules</code><a href="#moduleloaders-is-now-modulerules" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>The old loader configuration was superseded by a more powerful rules system, which allows configuration of loaders and more.\nFor compatibility reasons, the old <code>module.loaders</code> syntax is still valid and the old names are parsed.\nThe new naming conventions are easier to understand and are a good reason to upgrade the configuration to using <code>module.rules</code>.</p>\n<pre><code class="hljs language-diff">  module: {\n<span class="token deleted">-   loaders: [</span>\n<span class="token inserted">+   rules: [</span>\n      {\n        test: /\\.css$/,\n<span class="token deleted">-       loaders: [</span>\n<span class="token deleted">-         "style-loader",</span>\n<span class="token deleted">-         "css-loader?modules=true"</span>\n<span class="token inserted">+       use: [</span>\n<span class="token inserted">+         {</span>\n<span class="token inserted">+           loader: "style-loader"</span>\n<span class="token inserted">+         },</span>\n<span class="token inserted">+         {</span>\n<span class="token inserted">+           loader: "css-loader",</span>\n<span class="token inserted">+           options: {</span>\n<span class="token inserted">+             modules: true</span>\n<span class="token inserted">+           }</span>\n<span class="token inserted">+         }</span>\n        ]\n      },\n      {\n        test: /\\.jsx$/,\n        loader: "babel-loader", // Do not use "use" here\n        options: {\n          // ...\n        }\n      }\n    ]\n  }</code></pre>\n<h2 id="chaining-loaders">Chaining loaders<a href="#chaining-loaders" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Like in webpack 1, loaders can be chained to pass results from loader to loader. Using the <a href="/configuration/module/#ruleuse">rule.use</a>\nconfiguration option, <code>use</code> can be set to an array of loaders.\nIn webpack 1, loaders were commonly chained with <code>!</code>. This style is only supported using the legacy option <code>module.loaders</code>.</p>\n<pre><code class="hljs language-diff">  module: {\n<span class="token deleted">-   loaders: [{</span>\n<span class="token inserted">+   rules: [{</span>\n      test: /\\.less$/,\n<span class="token deleted">-     loader: "style-loader!css-loader!less-loader"</span>\n<span class="token inserted">+     use: [</span>\n<span class="token inserted">+       "style-loader",</span>\n<span class="token inserted">+       "css-loader",</span>\n<span class="token inserted">+       "less-loader"</span>\n<span class="token inserted">+     ]</span>\n    }]\n  }</code></pre>\n<h2 id="automatic--loader-module-name-extension-removed">Automatic <code>-loader</code> module name extension removed<a href="#automatic--loader-module-name-extension-removed" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>It is not possible anymore to omit the <code>-loader</code> extension when referencing loaders:</p>\n<pre><code class="hljs language-diff">  module: {\n    rules: [\n      {\n        use: [\n<span class="token deleted">-         "style",</span>\n<span class="token inserted">+         "style-loader",</span>\n<span class="token deleted">-         "css",</span>\n<span class="token inserted">+         "css-loader",</span>\n<span class="token deleted">-         "less",</span>\n<span class="token inserted">+         "less-loader",</span>\n        ]\n      }\n    ]\n  }</code></pre>\n<p>You can still opt-in to the old behavior with the <code>resolveLoader.moduleExtensions</code> configuration option, but this is not recommended.</p>\n<pre><code class="hljs language-diff"><span class="token inserted">+ resolveLoader: {</span>\n<span class="token inserted">+   moduleExtensions: ["-loader"]</span>\n<span class="token inserted">+ }</span></code></pre>\n<p>See <a href="https://github.com/webpack/webpack/issues/2986">#2986</a> for the reason behind this change.</p>\n<h2 id="json-loader-is-not-required-anymore"><code>json-loader</code> is not required anymore<a href="#json-loader-is-not-required-anymore" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>When no loader has been configured for a JSON file, webpack will automatically try to load the JSON\nfile with the <a href="https://github.com/webpack-contrib/json-loader"><code>json-loader</code></a>.</p>\n<pre><code class="hljs language-diff">  module: {\n    rules: [\n<span class="token deleted">-     {</span>\n<span class="token deleted">-       test: /\\.json/,</span>\n<span class="token deleted">-       loader: "json-loader"</span>\n<span class="token deleted">-     }</span>\n    ]\n  }</code></pre>\n<p><a href="https://github.com/webpack/webpack/issues/3363">We decided to do this</a> in order to iron out environment differences\nbetween webpack, node.js and browserify.</p>\n<h2 id="loaders-in-configuration-resolve-relative-to-context">Loaders in configuration resolve relative to context<a href="#loaders-in-configuration-resolve-relative-to-context" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>In <strong>webpack 1</strong>, configured loaders resolve relative to the matched file. However, in <strong>webpack 2</strong>, configured loaders resolve relative to the <code>context</code> option.</p>\n<p>This solves some problems with duplicate modules caused by loaders when using <code>npm link</code> or referencing modules outside of the <code>context</code>.</p>\n<p>You may remove some hacks to work around this:</p>\n<pre><code class="hljs language-diff">  module: {\n    rules: [\n      {\n        // ...\n<span class="token deleted">-       loader: require.resolve("my-loader")</span>\n<span class="token inserted">+       loader: "my-loader"</span>\n      }\n    ]\n  },\n  resolveLoader: {\n<span class="token deleted">-   root: path.resolve(__dirname, "node_modules")</span>\n  }</code></pre>\n<h2 id="modulepreloaders-and-modulepostloaders-were-removed"><code>module.preLoaders</code> and <code>module.postLoaders</code> were removed:<a href="#modulepreloaders-and-modulepostloaders-were-removed" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<pre><code class="hljs language-diff">  module: {\n<span class="token deleted">-   preLoaders: [</span>\n<span class="token inserted">+   rules: [</span>\n      {\n        test: /\\.js$/,\n<span class="token inserted">+       enforce: "pre",</span>\n        loader: "eslint-loader"\n      }\n    ]\n  }</code></pre>\n<h2 id="uglifyjsplugin-sourcemap"><code>UglifyJsPlugin</code> sourceMap<a href="#uglifyjsplugin-sourcemap" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>The <code>sourceMap</code> option of the <code>UglifyJsPlugin</code> now defaults to <code>false</code> instead of <code>true</code>. This means that if you are using source maps for minimized code or want correct line numbers for uglifyjs warnings, you need to set <code>sourceMap: true</code> for <code>UglifyJsPlugin</code>.</p>\n<pre><code class="hljs language-diff">  devtool: "source-map",\n  plugins: [\n    new UglifyJsPlugin({\n<span class="token inserted">+     sourceMap: true</span>\n    })\n  ]</code></pre>\n<h2 id="uglifyjsplugin-warnings"><code>UglifyJsPlugin</code> warnings<a href="#uglifyjsplugin-warnings" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>The <code>compress.warnings</code> option of the <code>UglifyJsPlugin</code> now defaults to <code>false</code> instead of <code>true</code>.\nThis means that if you want to see uglifyjs warnings, you need to set <code>compress.warnings</code> to <code>true</code>.</p>\n<pre><code class="hljs language-diff">  devtool: "source-map",\n  plugins: [\n    new UglifyJsPlugin({\n<span class="token inserted">+     compress: {</span>\n<span class="token inserted">+       warnings: true</span>\n<span class="token inserted">+     }</span>\n    })\n  ]</code></pre>\n<h2 id="uglifyjsplugin-minimize-loaders"><code>UglifyJsPlugin</code> minimize loaders<a href="#uglifyjsplugin-minimize-loaders" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p><code>UglifyJsPlugin</code> no longer switches loaders into minimize mode. The <code>minimize: true</code> setting needs to be passed via loader options in the long-term. See loader documentation for relevant options.</p>\n<p>The minimize mode for loaders will be removed in webpack 3 or later.</p>\n<p>To keep compatibility with old loaders, loaders can be switched to minimize mode via plugin:</p>\n<pre><code class="hljs language-diff">  plugins: [\n<span class="token inserted">+   new webpack.LoaderOptionsPlugin({</span>\n<span class="token inserted">+     minimize: true</span>\n<span class="token inserted">+   })</span>\n  ]</code></pre>\n<h2 id="dedupeplugin-has-been-removed"><code>DedupePlugin</code> has been removed<a href="#dedupeplugin-has-been-removed" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p><code>webpack.optimize.DedupePlugin</code> isn\'t needed anymore. Remove it from your configuration.</p>\n<h2 id="bannerplugin---breaking-change"><code>BannerPlugin</code> - breaking change<a href="#bannerplugin---breaking-change" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p><code>BannerPlugin</code> no longer accepts two parameters, but a single options object.</p>\n<pre><code class="hljs language-diff">  plugins: [\n<span class="token deleted">-    new webpack.BannerPlugin(\'Banner\', {raw: true, entryOnly: true});</span>\n<span class="token inserted">+    new webpack.BannerPlugin({banner: \'Banner\', raw: true, entryOnly: true});</span>\n  ]</code></pre>\n<h2 id="occurrenceorderplugin-is-now-on-by-default"><code>OccurrenceOrderPlugin</code> is now on by default<a href="#occurrenceorderplugin-is-now-on-by-default" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>The <code>OccurrenceOrderPlugin</code> is now enabled by default and has been renamed (<code>OccurenceOrderPlugin</code> in webpack 1).\nThus make sure to remove the plugin from your configuration:</p>\n<pre><code class="hljs language-diff">  plugins: [\n    // webpack 1\n<span class="token deleted">-   new webpack.optimize.OccurenceOrderPlugin()</span>\n    // webpack 2\n<span class="token deleted">-   new webpack.optimize.OccurrenceOrderPlugin()</span>\n  ]</code></pre>\n<h2 id="extracttextwebpackplugin---breaking-change"><code>ExtractTextWebpackPlugin</code> - breaking change<a href="#extracttextwebpackplugin---breaking-change" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p><a href="https://github.com/webpack-contrib/extract-text-webpack-plugin">ExtractTextPlugin</a> requires version 2 to work with webpack 2.</p>\n<p><code>npm install --save-dev extract-text-webpack-plugin</code></p>\n<p>The configuration changes for this plugin are mainly syntactical.</p>\n<h3 id="extracttextpluginextract"><code>ExtractTextPlugin.extract</code><a href="#extracttextpluginextract" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<pre><code class="hljs language-diff">module: {\n  rules: [\n    {\n      test: /.css$/,\n<span class="token deleted">-      loader: ExtractTextPlugin.extract("style-loader", "css-loader", { publicPath: "/dist" })</span>\n<span class="token inserted">+      use: ExtractTextPlugin.extract({</span>\n<span class="token inserted">+        fallback: "style-loader",</span>\n<span class="token inserted">+        use: "css-loader",</span>\n<span class="token inserted">+        publicPath: "/dist"</span>\n<span class="token inserted">+      })</span>\n    }\n  ]\n}</code></pre>\n<h3 id="new-extracttextpluginoptions"><code>new ExtractTextPlugin({options})</code><a href="#new-extracttextpluginoptions" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<pre><code class="hljs language-diff">plugins: [\n<span class="token deleted">-  new ExtractTextPlugin("bundle.css", { allChunks: true, disable: false })</span>\n<span class="token inserted">+  new ExtractTextPlugin({</span>\n<span class="token inserted">+    filename: "bundle.css",</span>\n<span class="token inserted">+    disable: false,</span>\n<span class="token inserted">+    allChunks: true</span>\n<span class="token inserted">+  })</span>\n]</code></pre>\n<h2 id="full-dynamic-requires-now-fail-by-default">Full dynamic requires now fail by default<a href="#full-dynamic-requires-now-fail-by-default" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>A dependency with only an expression (i. e. <code>require(expr)</code>) will now create an empty context instead of the context of the complete directory.</p>\n<p>Code like this should be refactored as it won\'t work with ES2015 modules. If this is not possible you can use the <code>ContextReplacementPlugin</code> to hint the compiler towards the correct resolving.</p>\n<blockquote class="todo">\n<p>Link to an article about dynamic dependencies.</p>\n</blockquote>\n<h3 id="using-custom-arguments-in-cli-and-configuration">Using custom arguments in CLI and configuration<a href="#using-custom-arguments-in-cli-and-configuration" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>If you abused the CLI to pass custom arguments to the configuration like so:</p>\n<p><code>webpack --custom-stuff</code></p>\n<pre><code class="hljs language-js"><span class="token comment">// webpack.config.js</span>\n<span class="token keyword">var</span> customStuff <span class="token operator">=</span> process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">\'--custom-stuff\'</span><span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n<span class="token comment">/* ... */</span>\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> config<span class="token punctuation">;</span></code></pre>\n<p>You may notice that this is no longer allowed. The CLI is more strict now.</p>\n<p>Instead there is an interface for passing arguments to the configuration. This should be used instead. Future tools may rely on this.</p>\n<p><code>webpack --env.customStuff</code></p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>env<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> customStuff <span class="token operator">=</span> env<span class="token punctuation">.</span>customStuff<span class="token punctuation">;</span>\n  <span class="token comment">/* ... */</span>\n  <span class="token keyword">return</span> config<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>See <a href="/api/cli">CLI</a>.</p>\n<h2 id="requireensure-and-amd-require-are-asynchronous"><code>require.ensure</code> and AMD <code>require</code> are asynchronous<a href="#requireensure-and-amd-require-are-asynchronous" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>These functions are now always asynchronous instead of calling their callback synchronously if the chunk is already loaded.</p>\n<p><strong><code>require.ensure</code> now depends upon native <code>Promise</code>s. If using <code>require.ensure</code> in an environment that lacks them then you will need a polyfill.</strong></p>\n<h2 id="loader-configuration-is-through-options">Loader configuration is through <code>options</code><a href="#loader-configuration-is-through-options" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>You can <em>no longer</em> configure a loader with a custom property in the <code>webpack.config.js</code>. It must be done through the <code>options</code>. The following configuration with the <code>ts</code> property is no longer valid with webpack 2:</p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n      test<span class="token punctuation">:</span> <span class="token regex">/\\.tsx?$/</span><span class="token punctuation">,</span>\n      loader<span class="token punctuation">:</span> <span class="token string">\'ts-loader\'</span>\n    <span class="token punctuation">}</span><span class="token punctuation">]</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// does not work with webpack 2</span>\n  ts<span class="token punctuation">:</span> <span class="token punctuation">{</span> transpileOnly<span class="token punctuation">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h3 id="what-are-options">What are <code>options</code>?<a href="#what-are-options" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Good question. Well, strictly speaking it\'s 2 possible things; both ways to configure a webpack loader. Classically <code>options</code> was called <code>query</code> and was a string which could be appended to the name of the loader. Much like a query string but actually with <a href="https://github.com/webpack/loader-utils#parsequery">greater powers</a>:</p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n      test<span class="token punctuation">:</span> <span class="token regex">/\\.tsx?$/</span><span class="token punctuation">,</span>\n      loader<span class="token punctuation">:</span> <span class="token string">\'ts-loader?\'</span> <span class="token operator">+</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span> transpileOnly<span class="token punctuation">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">]</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>But it can also be a separately specified object that\'s supplied alongside a loader:</p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n      test<span class="token punctuation">:</span> <span class="token regex">/\\.tsx?$/</span><span class="token punctuation">,</span>\n      loader<span class="token punctuation">:</span> <span class="token string">\'ts-loader\'</span><span class="token punctuation">,</span>\n      options<span class="token punctuation">:</span>  <span class="token punctuation">{</span> transpileOnly<span class="token punctuation">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">]</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h2 id="loaderoptionsplugin-context"><code>LoaderOptionsPlugin</code> context<a href="#loaderoptionsplugin-context" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Some loaders need context information and read them from the configuration. This needs to be passed via loader options in the long-term. See loader documentation for relevant options.</p>\n<p>To keep compatibility with old loaders, this information can be passed via plugin:</p>\n<pre><code class="hljs language-diff">  plugins: [\n<span class="token inserted">+   new webpack.LoaderOptionsPlugin({</span>\n<span class="token inserted">+     options: {</span>\n<span class="token inserted">+       context: __dirname</span>\n<span class="token inserted">+     }</span>\n<span class="token inserted">+   })</span>\n  ]</code></pre>\n<h2 id="debug"><code>debug</code><a href="#debug" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>The <code>debug</code> option switched loaders to debug mode in webpack 1. This needs to be passed via loader options in long-term. See loader documentation for relevant options.</p>\n<p>The debug mode for loaders will be removed in webpack 3 or later.</p>\n<p>To keep compatibility with old loaders, loaders can be switched to debug mode via a plugin:</p>\n<pre><code class="hljs language-diff"><span class="token deleted">- debug: true,</span>\n  plugins: [\n<span class="token inserted">+   new webpack.LoaderOptionsPlugin({</span>\n<span class="token inserted">+     debug: true</span>\n<span class="token inserted">+   })</span>\n  ]</code></pre>\n<h2 id="code-splitting-with-es2015">Code Splitting with ES2015<a href="#code-splitting-with-es2015" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>In webpack 1, you could use <a href="/api/module-methods/#requireensure"><code>require.ensure()</code></a> as a method to lazily-load chunks for your application:</p>\n<pre><code class="hljs language-javascript">require<span class="token punctuation">.</span><span class="token function">ensure</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>require<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./module\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>The ES2015 Loader spec defines <a href="/api/module-methods/#import-1"><code>import()</code></a> as method to load ES2015 Modules dynamically on runtime. webpack treats <code>import()</code> as a split-point and puts the requested module in a separate chunk. <code>import()</code> takes the module name as argument and returns a Promise.</p>\n<pre><code class="hljs language-js"><span class="token keyword">function</span> <span class="token function">onClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">\'./module\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>module <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> module<span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span>err <span class="token operator">=></span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Chunk loading failed\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n<p>Good news: Failure to load a chunk can now be handled because they are <code>Promise</code> based.</p>\n<h2 id="dynamic-expressions">Dynamic expressions<a href="#dynamic-expressions" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>It\'s possible to pass a partial expression to <code>import()</code>. This is handled similar to expressions in CommonJS (webpack creates a <a href="/plugins/context-replacement-plugin/">context</a> with all possible files).</p>\n<p><code>import()</code> creates a separate chunk for each possible module.</p>\n<pre><code class="hljs language-js"><span class="token keyword">function</span> <span class="token function">route</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> query<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`./routes/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>path<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/route`</span></span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>route <span class="token operator">=></span> <span class="token keyword">new</span> <span class="token class-name">route<span class="token punctuation">.</span>Route</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token comment">// This creates a separate chunk for each possible route</span></code></pre>\n<h2 id="mixing-es2015-with-amd-and-commonjs">Mixing ES2015 with AMD and CommonJS<a href="#mixing-es2015-with-amd-and-commonjs" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>As for AMD and CommonJS you can freely mix all three module types (even within the same file). webpack behaves similar to babel and node-eps in this case:</p>\n<pre><code class="hljs language-javascript"><span class="token comment">// CommonJS consuming ES2015 Module</span>\n<span class="token keyword">var</span> book <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./book\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nbook<span class="token punctuation">.</span>currentPage<span class="token punctuation">;</span>\nbook<span class="token punctuation">.</span><span class="token function">readPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nbook<span class="token punctuation">.</span><span class="token keyword">default</span> <span class="token operator">===</span> <span class="token string">\'This is a book\'</span><span class="token punctuation">;</span></code></pre>\n<pre><code class="hljs language-javascript"><span class="token comment">// ES2015 Module consuming CommonJS</span>\n<span class="token keyword">import</span> fs <span class="token keyword">from</span> <span class="token string">\'fs\'</span><span class="token punctuation">;</span> <span class="token comment">// module.exports map to default</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> readFileSync <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'fs\'</span><span class="token punctuation">;</span> <span class="token comment">// named exports are read from returned object+</span>\n\n<span class="token keyword">typeof</span> fs<span class="token punctuation">.</span>readFileSync <span class="token operator">===</span> <span class="token string">\'function\'</span><span class="token punctuation">;</span>\n<span class="token keyword">typeof</span> readFileSync <span class="token operator">===</span> <span class="token string">\'function\'</span><span class="token punctuation">;</span></code></pre>\n<p>It is important to note that you will want to tell Babel to not parse these module symbols so webpack can use them. You can do this by setting the following in your <code>.babelrc</code> or <code>babel-loader</code> options.</p>\n<p><strong>.babelrc</strong></p>\n<pre><code class="hljs language-json"><span class="token punctuation">{</span>\n  <span class="token property">"presets"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">[</span><span class="token string">"es2015"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token property">"modules"</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre>\n<h2 id="hints">Hints<a href="#hints" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>No need to change something, but opportunities</p>\n<h3 id="template-strings">Template strings<a href="#template-strings" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>webpack now supports template strings in expressions. This means you can start using them in webpack constructs:</p>\n<pre><code class="hljs language-diff"><span class="token deleted">- require("./templates/" + name);</span>\n<span class="token inserted">+ require(`./templates/${name}`);</span></code></pre>\n<h3 id="configuration-promise">Configuration Promise<a href="#configuration-promise" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>webpack now supports returning a <code>Promise</code> from the configuration file. This allows async processing in your configuration file.</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token function">fetchLangs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>lang <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    entry<span class="token punctuation">:</span> <span class="token string">\'...\'</span><span class="token punctuation">,</span>\n    <span class="token comment">// ...</span>\n    plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token keyword">new</span> <span class="token class-name">DefinePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token constant">LANGUAGE</span><span class="token punctuation">:</span> lang <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h3 id="advanced-loader-matching">Advanced loader matching<a href="#advanced-loader-matching" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>webpack now supports more things to match on for loaders.</p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        resource<span class="token punctuation">:</span> <span class="token regex">/filename/</span><span class="token punctuation">,</span> <span class="token comment">// matches "/path/filename.js"</span>\n        resourceQuery<span class="token punctuation">:</span> <span class="token regex">/^\\?querystring$/</span><span class="token punctuation">,</span> <span class="token comment">// matches "?querystring"</span>\n        issuer<span class="token punctuation">:</span> <span class="token regex">/filename/</span><span class="token punctuation">,</span> <span class="token comment">// matches "/path/something.js" if requested from "/path/filename.js"</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h3 id="more-cli-options">More CLI options<a href="#more-cli-options" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>There are some new CLI options for you to use:</p>\n<p><code>--define process.env.NODE_ENV="production"</code> See <a href="/plugins/define-plugin/"><code>DefinePlugin</code></a>.</p>\n<p><code>--display-depth</code> displays the distance to the entry point for each module.</p>\n<p><code>--display-used-exports</code> display info about which exports are used in a module.</p>\n<p><code>--display-max-modules</code> sets the number for modules displayed in the output (defaults to 15).</p>\n<p><code>-p</code> also defines <code>process.env.NODE_ENV</code> to <code>"production"</code> now.</p>\n<h2 id="loader-changes">Loader changes<a href="#loader-changes" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Changes only relevant for loader authors.</p>\n<h3 id="cacheable">Cacheable<a href="#cacheable" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Loaders are now cacheable by default. Loaders must opt-out if they are not cacheable.</p>\n<pre><code class="hljs language-diff">  // Cacheable loader\n  module.exports = function(source) {\n<span class="token deleted">-   this.cacheable();</span>\n    return source;\n  }</code></pre>\n<pre><code class="hljs language-diff">  // Not cacheable loader\n  module.exports = function(source) {\n<span class="token inserted">+   this.cacheable(false);</span>\n    return source;\n  }</code></pre>\n<h3 id="complex-options">Complex options<a href="#complex-options" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p><strong>webpack 1</strong> only supports <code>JSON.stringify</code>-able options for loaders.</p>\n<p><strong>webpack 2</strong> now supports any JS object as loader options.</p>\n<p>Before webpack <a href="https://github.com/webpack/webpack/releases/tag/v2.2.1">2.2.1</a> (i.e. from 2.0.0 through 2.2.0), using complex options required using <code>ident</code> for the <code>options</code> object to allow its reference from other loaders. <strong>This was removed in 2.2.1</strong> and thus current migrations do not require any use of the <code>ident</code> key.</p>\n<pre><code class="hljs language-diff">{\n  test: /\\.ext/\n  use: {\n    loader: \'...\',\n    options: {\n<span class="token deleted">-     ident: \'id\',</span>\n      fn: () => require(\'./foo.js\')\n    }\n  }\n}</code></pre>\n'}}]);