// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

import playformInline from '@playform/inline';
import minifyHtml from './integrations/html-minify';

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap(), mdx(), playformInline(), minifyHtml()]
});