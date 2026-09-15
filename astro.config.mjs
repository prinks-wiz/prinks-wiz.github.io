import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://prinks-wiz.github.io',
  base: '/',
  integrations: [
    // applyBaseStyles: false so global.css owns the @tailwind directives
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],
  output: 'static',
});
