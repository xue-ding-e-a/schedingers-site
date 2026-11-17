import { ui, defaultLang, type Lang, type UIKey } from './ui';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string): string {
  if (/^(https?:|mailto:|tel:|#|\/\/)/.test(path)) return path;
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

export function stripBase(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) return pathname.slice(BASE.length) || '/';
  return pathname;
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = stripBase(url.pathname).split('/');
  return first === 'en' ? 'en' : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const localized = lang === defaultLang ? clean : clean === '/' ? '/en/' : `/en${clean}`;
  return withBase(localized);
}

export function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split('-');
  if (lang === 'en') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
  }
  return `${y} 年 ${Number(m)} 月 ${Number(d)} 日`;
}
