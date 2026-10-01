import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Endereço do blog. Ao comprar um domínio próprio, troque aqui (ex.: 'https://victorsoares.dev').
export default defineConfig({
  site: 'https://victorsoad.github.io',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
});
