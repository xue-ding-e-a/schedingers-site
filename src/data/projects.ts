import type { Localized } from './works';

export type Project = {
  slug: string;
  name: Localized;
  tagline: Localized;
  year: string;
  role: Localized;
  stack: string[];
  liveUrl: string;
  repoUrl?: string;
  cover?: string;
  color: string;
  status: 'ready' | 'draft';
  note?: Localized;
  highlights?: Localized[];
  overview?: Localized;
};

// 数组按录入先后排列，对外统一反转，让最新的项目排在前面
export const projects: Project[] = [
  {
    slug: 'smart-sleep-alarm',
    name: { zh: '智能睡眠闹钟', en: 'Smart Sleep Alarm' },
    tagline: {
      zh: '带账户体系与个人中心的网页端睡眠闹钟。',
      en: 'A browser-based sleep alarm with accounts and a personal dashboard.',
    },
    year: '2025',
    role: { zh: '独立开发', en: 'Solo developer' },
    stack: ['Vue', '前端路由', 'GitHub Pages'],
    liveUrl: 'https://xue-ding-e-a.github.io/smart-sleep-alarm/',
    cover: '/images/projects/smart-sleep-alarm.jpg',
    color: '#1b2537',
    status: 'draft',
    note: {
      zh: '部署在 GitHub Pages 上的单页应用，包含登录与个人中心路由。详细说明整理中。',
      en: 'A single-page app deployed on GitHub Pages, with login and profile routes. Full write-up in progress.',
    },
  },
  {
    slug: 'xdf-student-center',
    name: { zh: '学生服务中心', en: 'Student Service Center' },
    tagline: {
      zh: '面向学生的服务类 Web 应用，承载日常查询与事务入口。',
      en: 'A student-facing web app for everyday queries and service entry points.',
    },
    year: '2025',
    role: { zh: '开发者', en: 'Developer' },
    stack: ['Web 应用'],
    liveUrl: 'https://xdf-sd-student-center.app.workbuddy.host',
    cover: '/images/projects/xdf-student-center.jpg',
    color: '#1c2430',
    status: 'draft',
    note: {
      zh: '外部直接访问返回 403，可能需要在原平台的权限内打开。详细说明整理中。',
      en: 'Direct external access returns 403, so it likely needs to be opened from within the original platform. Full write-up in progress.',
    },
  },
  {
    slug: 'trae-artifact',
    name: { zh: 'TRAE 创意作品', en: 'TRAE Artifact' },
    tagline: {
      zh: '与 AI 协作完成的一次创意页面实验。',
      en: 'A creative page experiment made in collaboration with AI.',
    },
    year: '2026',
    role: { zh: '设计 + 实现', en: 'Design & implementation' },
    stack: ['TRAE', 'HTML', 'CSS'],
    liveUrl: 'https://share.traecontent.cn/artifact/T9CU023H2EJ1C7',
    cover: '/images/projects/trae-artifact.jpg',
    color: '#241d33',
    status: 'draft',
    note: {
      zh: '作品以 TRAE 共享链接形式发布，需在客户端内打开。',
      en: 'Published as a TRAE share link; it opens inside the TRAE client.',
    },
  },
  {
    slug: 'schrodingers-site',
    name: { zh: '薛定谔的站点', en: "Schrödinger's Site" },
    tagline: {
      zh: '你现在看到的这个站点：一个摄影与工程双主线的个人网站。',
      en: 'The site you are reading: a dual-track personal website for photography and engineering.',
    },
    year: '2026',
    role: { zh: '设计 + 前端 + 内容', en: 'Design, front-end, content' },
    stack: ['Astro', 'TypeScript', 'CSS', 'Canvas'],
    liveUrl: '/',
    repoUrl: 'https://github.com/xue-ding-e-a/schedingers-site',
    cover: '/images/projects/schrodingers-site.jpg',
    color: '#101827',
    status: 'ready',
    overview: {
      zh: '把一个模糊的想法——「做个能写进简历的作品集」——拆成信息架构、视觉系统、内容模型和可上线的代码。摄影与工程两条主线共用一个站点，门户页负责分流，两套导航各自独立。',
      en: 'Turning a vague idea — "make a portfolio worth putting on a résumé" — into an information architecture, a visual system, a content model and shippable code. Two tracks share one site: a portal splits the traffic, and each track keeps its own navigation.',
    },
    highlights: [
      {
        zh: '双主线信息架构：门户分流 + 两套导航，16 个路由，中英双语镜像',
        en: 'Dual-track IA: portal split, two navigations, 16 routes, mirrored in Chinese and English',
      },
      {
        zh: '10 幅作品的完整内容模型：拍摄地点、坐标、机身镜头、EXIF、堆栈方式、中英双语故事',
        en: 'A full content model for 10 works: location, coordinates, gear, EXIF, stacking method and bilingual stories',
      },
      {
        zh: '与 AI 分工完成：需求拆解、结构设计、内容整理、实现与自测',
        en: 'Built with AI: requirement breakdown, structure, content, implementation and self-testing',
      },
    ],
  },
].reverse();

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const capabilities = [
  {
    group: { zh: '前端', en: 'Front end' },
    items: ['Astro', 'TypeScript', 'Vue', 'CSS 架构', 'Canvas 动画', '响应式与无障碍'],
  },
  {
    group: { zh: '脚本与工具', en: 'Scripts & tools' },
    items: ['Node.js', 'Python / Pillow', 'Git', 'Vite', '静态部署'],
  },
  {
    group: { zh: '影像', en: 'Imaging' },
    items: ['星空摄影', '长曝光与堆栈', 'PTGui 拼接', 'Photoshop 后期', '色彩管理'],
  },
];
