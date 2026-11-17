export const SITE = {
  name: { zh: '薛定谔的站点', en: "Schrödinger's Site" },
  author: { zh: '薛广俭', en: 'Xue Guangjian' },
  handle: 'schedinger',
  role: { zh: '星空摄影师 / 物理专业学生', en: 'Astrophotographer / Physics Student' },
  location: { zh: '陕西 · 西安', en: "Xi'an, Shaanxi" },
  email: '2543165843@qq.com',
  wechat: 'schedinger',
  github: 'https://github.com/xue-ding-e-a',
  since: 2018,
  worksCount: 10,
} as const;

export const NAV = [
  { key: 'photo', href: '/photo' },
  { key: 'works', href: '/works' },
  { key: 'projects', href: '/projects' },
  { key: 'build', href: '/build' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

export const PHOTO_NAV = [
  { key: 'photo', href: '/photo' },
  { key: 'works', href: '/works' },
  { key: 'series', href: '/collections' },
  { key: 'atlas', href: '/atlas' },
  { key: 'about', href: '/about' },
] as const;

export const DEV_NAV = [
  { key: 'dev', href: '/dev' },
  { key: 'projects', href: '/projects' },
  { key: 'build', href: '/build' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;
