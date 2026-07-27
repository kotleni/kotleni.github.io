# Baking Markdown into HTML
For my blog posts I don’t use any heavy backend, CMS, or fancy admin panel - everything is just plain Markdown files that get precompiled into static `JavaScript` during the build.

When I rebuilt my personal site I had three hard rules:  
- Fully static (no SSR, no server functions)  
- As few runtime dependencies as possible  
- Blog posts written in plain Markdown

Client-side markdown libraries add 30–100 kB and delay content visibility. MDX is depends on Next.js ecosystem and just heavy.
So I built a tiny Vite plugin instead.

## The plugin
Since I use Vite as project bundler, I can write custom plugins for it. 
So that’s exactly what I did. The source code is here: <a href="https://github.com/kotleni/kotleni.github.io/blob/d725c9abc856e817693fd17ec89fdf05383f8f61/build-src/markdown-precompile.ts" target="_blank">/build-src/markdown-precompile.ts</a>.

The plugin uses the popular npm package <a href="https://www.npmjs.com/package/showdown" target="_blank">showdown</a> to convert Markdown to HTML and bundles everything into a newly generated JavaScript object.

When someone opens a blog post, the page simply fetches the corresponding `.js` file and injects the content. For more details on how it’s used, check <a href="https://github.com/kotleni/kotleni.github.io/blob/dev/src/routes/BlogPostPage.tsx" target="_blank">/src/routes/BlogPostPage.tsx</a>.

## Results
Here's the build output with lazy-loaded blog posts:
```
dist/index.html                                      0.93 kB
dist/assets/index-Dy-mA99e.css                      29.12 kB
dist/assets/baking-markdown-into-html-CMtaV5Rp.js    1.62 kB
dist/assets/hosting-infrastructure-BDk1uZcy.js       1.72 kB
dist/assets/new-website-v6-hXQB4nJy.js               2.24 kB
dist/assets/asahi-linux-eS61HFeg.js                  3.42 kB
dist/assets/index-BjZ7lGnn.js                      319.89 kB
```

Each post is now its own tiny chunk - a couple of kilobytes. Visiting `/blog/baking-html` only pulls `baking-html-eS61HFeg.js`, the other three posts never get fetched. No markdown parser ships to the browser at all, since the conversion happens at build time.
