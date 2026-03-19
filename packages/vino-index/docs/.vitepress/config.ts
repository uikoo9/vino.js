import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'vino.js',
  description: 'A minimal high-performance Node.js web framework',
  base: '/',
  outDir: '../../../docs',

  themeConfig: {
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
