# Baking Markdown into HTML
For my blog posts I don’t use any heavy backend, CMS, or fancy admin panel — everything is just plain Markdown files that get precompiled into static JavaScript during the build.

When I rebuilt my personal site I had three hard rules:  
- Fully static (no SSR, no server functions)  
- As few runtime dependencies as possible  
- Blog posts written in plain Markdown

Client-side markdown libraries add 30–100 kB and delay content visibility. MDX is depends on Next.js ecosystem and just heavy. 
So I built a tiny Vite plugin instead.

But how could I load Markdown content on my website? One option was to use libraries that render it in the browser. In the past, when my site was built with Next.js + React, I used the <a href="https://nextjs.org/docs/app/guides/mdx" target="_blank">MDX library</a>. However, in Svelte I couldn’t find any out-of-the-box implementation that I really liked.

## What I build
Since I use Vite as project bundler, I can write custom plugins for it. 
So that’s exactly what I did. The source code is here: <a href="https://github.com/kotleni/kotleni.github.io/blob/d725c9abc856e817693fd17ec89fdf05383f8f61/build-src/markdown-precompile.ts" target="_blank">/build-src/markdown-precompile.ts</a>.

The plugin uses the popular npm package <a href="https://www.npmjs.com/package/showdown" target="_blank">showdown</a> to convert Markdown to HTML and bundles everything into a newly generated JavaScript object.

When someone opens a blog post, the page simply fetches the corresponding `.js` file and injects the content. For more details on how it’s used, check <a href="https://github.com/kotleni/kotleni.github.io/blob/d725c9abc856e817693fd17ec89fdf05383f8f61/src/routes/ReadPage.vue" target="_blank">/src/routes/ReadPage.vue</a>.