import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://schedinger.art',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
