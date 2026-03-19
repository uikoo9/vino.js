import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'vino.js',
  description: 'A minimal high-performance Node.js web framework',
  base: '/',
  outDir: '../../../docs',
  sitemap: { hostname: 'https://vino.js.org' },

  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#7C3AED' }],
    ['meta', { name: 'msapplication-TileColor', content: '#7C3AED' }],
    ['meta', { name: 'msapplication-TileImage', content: '/mstile-150x150.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'vino.js' }],
    ['meta', { property: 'og:description', content: 'A minimal high-performance Node.js web framework' }],
    ['meta', { property: 'og:image', content: 'https://vino.js.org/og-image.png' }],
    ['meta', { property: 'og:url', content: 'https://vino.js.org' }],
    ['meta', { property: 'og:site_name', content: 'vino.js' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'vino.js' }],
    ['meta', { name: 'twitter:description', content: 'A minimal high-performance Node.js web framework' }],
    ['meta', { name: 'twitter:image', content: 'https://vino.js.org/og-image.png' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'GitHub', link: 'https://github.com/uikoo9/vino.js' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [{ text: 'Getting Started', link: '/guide/getting-started' }],
      },
    ],
  },
});
