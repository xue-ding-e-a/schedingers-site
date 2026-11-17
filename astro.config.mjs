import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://xue-ding-e-a.github.io',
  base: '/schedingers-site',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
