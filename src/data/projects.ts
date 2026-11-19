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
    name: { zh: '醒了吗？', en: 'Are You Awake?' },
    tagline: {
      zh: '让你的睡眠不再失控。',
      en: 'Your sleep, back under control.',
    },
    year: '2026',
    role: { zh: '产品设计 + 前端开发', en: 'Product design & front-end' },
    stack: ['React', 'TypeScript', 'Vite', '原生 SVG', 'Web Audio API', 'TRAE / Codex'],
    liveUrl: 'https://xue-ding-e-a.github.io/smart-sleep-alarm/',
    repoUrl: 'https://github.com/xue-ding-e-a/smart-sleep-alarm',
    cover: '/images/projects/smart-sleep-alarm.jpg',
    color: '#1b2537',
    status: 'ready',
    overview: {
      zh: '「醒了吗？」是一个监测唤醒闹钟 Demo，最初为 TRAE AI 创造力大赛（硬件交互赛道）而做，用 TRAE 和 Codex 完成开发。它针对睡眠有效时长难以预测和保证的问题：用户设定目标睡眠时长，可选开启一个最早到最晚的唤醒窗口；睡眠页用日、周、月三种视图展开阶段分布与心率、血氧、呼吸率、HRV；唤醒页在窗口内挑一个合适的浅睡点响铃，并给出「为什么是现在」的理由。Demo 的睡眠数据由生成器模拟，账户、设置和历史都存在 localStorage，没有后端；仓库配好 GitHub Actions，推送到 master 即部署到 Pages。',
      en: 'A monitoring alarm demo first built for the TRAE AI Creativity Contest (hardware track) and developed with TRAE and Codex. It targets what you cannot schedule around: how long you will actually sleep, and when you will wake up. You set a target sleep length, optionally with an earliest-to-latest wake window; the sleep page opens the night in day, week and month views with stage distribution plus heart rate, blood oxygen, breathing rate and HRV; the wake page picks a light-sleep moment inside the window and states why now. The demo feeds generated sleep data, while accounts, settings and history live in localStorage — no backend. GitHub Actions deploys to Pages on every push to master.',
    },
    highlights: [
      {
        zh: '唤醒判定不是定时器：把睡眠阶段权重（浅睡 95、清醒 85、REM 60、深睡 15）与心率、体动趋势叠加成 0–100 的唤醒适宜度，窗口内优先浅睡，深睡继续等待，窗口结束则强制唤醒。',
        en: 'Wake-up is not a timer: stage weights (light 95, awake 85, REM 60, deep 15) combine with heart-rate and movement trends into a 0–100 readiness score. Inside the window it prefers light sleep, keeps waiting through deep sleep, and forces a wake when the window closes.',
      },
      {
        zh: '唤醒窗口支持跨午夜（如 23:00–01:00），并依据 90 分钟睡眠周期预测下一个浅睡点，给出建议唤醒时间；跨窗口、深睡转浅睡、REM 后期等情况各有独立的判定分支。',
        en: 'Wake windows can cross midnight (23:00–01:00). A 90-minute cycle model predicts the next light-sleep point to suggest a wake time, with separate branches for window edges, deep-to-light transitions and late REM.',
      },
      {
        zh: '整套交互纯前端：图表用手写 SVG，Web Audio API 做 30 秒渐强的铃声，localStorage 承担账户与数据，GitHub Actions 推送即部署到 Pages；另有访客登录，打开就能体验完整流程。',
        en: 'Entirely front-end: charts are hand-written SVG, the alarm fades in over 30 seconds via the Web Audio API, localStorage carries accounts and data, and GitHub Actions deploys to Pages on push. A guest login lets anyone try the full flow immediately.',
      },
    ],
  },
  {
    slug: 'xdf-student-center',
    name: { zh: '学生服务中心', en: 'Student Service Center' },
    tagline: {
      zh: '给新东方大学事业部山东学习中心做的内部产品站：四大业务线 26 个内容页，一套能挑板块发给学生的分享机制。',
      en: 'An internal product site for New Oriental’s Shandong student learning centre: 26 pages across four business lines, plus a share tool that sends students only the sections they need.',
    },
    year: '2026',
    role: { zh: '产品运营 + 内容工程', en: 'Product operations & content engineering' },
    stack: ['原生 JS', 'Pjax', 'Python', 'WorkBuddy'],
    liveUrl: 'https://xdf-sd-student-center.app.workbuddy.host/?sharecode=F52BEZAJA4',
    cover: '/images/projects/xdf-student-center.jpg',
    color: '#1c2430',
    status: 'ready',
    overview: {
      zh: '新东方大学事业部（山东）大学生学习与发展中心的内部产品站，顾问在咨询现场打开使用。考研、保研、四六级、专升本四大业务线共 26 个内容页，另有科研匹配系统与竞赛匹配系统；课程、师资与学员案例来自 294 份产品资料，经 AI 数据清洗与结构化归类后生成。因为内容最终要发给学生，站点还得把「整站」和「只给对方看几块」拆成两种交付。',
      en: 'An internal product site for New Oriental’s Shandong student learning centre, opened by advisers during consultations. 26 content pages across four business lines — postgraduate recommendation, entrance exams, CET and top-up degrees — plus a research matching system and a competition matching system. Courses, faculty and student cases come from 294 product documents, cleaned and structured with AI before generation. Because the content ends up in students’ hands, the site has to separate “the whole site” from “just the few sections they should see”.',
    },
    highlights: [
      {
        zh: '导航由一份 RAIL 数据派生：左侧四大业务线、顶部模块平铺、面包屑与可分享板块清单同源；站内换页走 pjax + View Transitions，不整页重载。',
        en: 'Navigation derives from a single RAIL data source: the four business-line rail, flattened top nav, breadcrumbs and the shareable-section list all come from it. In-site navigation uses pjax with View Transitions instead of full reloads.',
      },
      {
        zh: '分享单页：跨页勾选板块后生成免登录的在线链接或 PDF / 长图，剥离脚本、表单与全部跳转，学生只能看到被选中的内容。',
        en: 'Share pages: select sections across pages, then export a login-free link, PDF or long image. Scripts, forms and every outbound link are stripped, so students see only what was chosen.',
      },
      {
        zh: '内容来自 294 份产品资料：先用 AI 数据清洗 SOP 与 skill 做结构化归类，再用 WorkBuddy Vibecoding 搭站、Python 生成器把表格注入页面模板，保研案例库的 337 条学员档案换表重跑即可更新，不必手改 HTML（学员信息库另见多维表格 500+ 条）。',
        en: 'Content comes from 294 product documents: an AI data-cleaning SOP and skill structure and categorise them first, then WorkBuddy Vibecoding builds the site and Python generators inject spreadsheets into page templates. The 337-record recommendation case library updates by re-running against a new sheet instead of editing HTML by hand (the student database is a separate 500+ record multi-dimensional table).',
      },
      {
        zh: '已供业务团队 182 位顾问实际使用，咨询现场 10 秒内完成资料检索与发送，替代原先通话结束后再查找补发的方式。',
        en: 'Used by 182 advisers on the business team; materials are found and sent within 10 seconds during a consultation, replacing the old lookup-and-resend after the call.',
      },
    ],
  },
  {
    slug: 'trae-artifact',
    name: { zh: 'WowLand 招募宣讲', en: 'WowLand Campus Deck' },
    tagline: {
      zh: '把一份 17 页的校园招募 PPT，重做成能在线放映、也能扫码传播的网页。',
      en: 'A 17-slide campus recruitment deck, rebuilt as a web presentation that plays online and spreads by QR code.',
    },
    year: '2026',
    role: { zh: '内容重构 + 设计 + 前端', en: 'Content, design & front end' },
    stack: ['HTML', 'CSS', '原生 JS', 'Python', 'TRAE'],
    liveUrl: 'https://share.traecontent.cn/artifact/T9CU023H2EJ1C7',
    cover: '/images/projects/trae-artifact.jpg',
    color: '#f446df',
    status: 'ready',
    overview: {
      zh: '抖音校园 WowLand 2026 秋季学期成长社群招募宣讲的在线版：17 页、1920×1080，为西安石油大学站定制。原始素材是两份 PPT 和一组现场海报，先重构成「S1 回顾 → 秋季项目 → 成长路径 → 加入社群」的四段叙事，再用纯 HTML/CSS 把整套幻灯片重做了一遍：像素字、霓虹渐变与硬阴影，翻页、进度条、二维码灯箱都由自写的 runtime 驱动。以分享链接交付，扫码即可在手机或微信里放映。',
      en: 'An online version of the Douyin Campus WowLand autumn 2026 community recruitment deck: 17 slides on a 1920×1080 canvas, tailored to the Xi’an Shiyou University stop. Starting from two PPTs and a set of on-site posters, the story was rebuilt into four acts — S1 recap, autumn programmes, growth path, join us — then rebuilt again as a pure HTML/CSS deck. Pixel type, neon gradients and hard shadows, with paging, the progress bar and the QR lightbox all driven by a hand-written runtime.',
    },
    highlights: [
      {
        zh: '自写放映 runtime：舞台锁定 1920×1080 设计画布并等比缩放，hash 深链 #/12 可直达任意页，方向键与左右滑动都能翻页；顶部一条全局进度条支持点击与拖拽，拖动时只预览页码和页标题、松手才跳页，两端留出彩虹条，手机端从 3% 起算更易触控。',
        en: 'A hand-written runtime: the stage locks to a 1920×1080 canvas and scales as one unit, hash deep links such as #/12 jump to any slide, and both arrow keys and horizontal swipes page through the deck. A single global progress bar sits on top, clickable and draggable; dragging only previews the page number and title, and the jump happens on release. The rainbow strip keeps a touchable margin at both ends — 3% on phones.',
      },
      {
        zh: '首屏不抢跑：等封面与前几页的关键图 decode 完成后再激活第一页，第一次翻页不再因为图片解码而卡顿；加载页也不等 window.load，交互脚本外置成 69KB 的 defer bundle，HTML 控制在 152KB，微信内置浏览器也能直接打开。',
        en: 'The first paint doesn’t race ahead: the deck waits for the cover and the next few slides’ key images to decode before activating page one, so the first transition no longer stalls on image decoding. The loading screen also stops waiting for window.load, and the interaction script is externalised into a 69KB deferred bundle, keeping the HTML at 152KB so it opens directly inside WeChat’s browser.',
      },
      {
        zh: '一套小工具把稿子变成交付物：build_standalone.py 负责把 17 页内容、3 个字体与 25 张图片收进分享包；同一份 1920×1080 设计稿在 ≤768px 时取消缩放，切换成流式竖屏单列，手机上要完整翻完 17 页而不是硬缩一张画布。',
        en: 'A small toolchain turns the deck into a deliverable: build_standalone.py packs the 17 slides, 3 fonts and 25 images into the share package. The same 1920×1080 design drops fixed-canvas scaling below 768px and switches to a fluid single column, so phones read all 17 slides properly instead of squeezing one giant canvas.',
      },
      {
        zh: '内容侧同样是工程活：两份 PPT 与现场海报被重排成四段式叙事；二维码按 H 级容错出 PNG 与 SVG 两版，缩到 200px 仍可识别；尾页把「扫码进抖音群」和「加负责人微信」拆成两条清楚的路径，文案改了三轮才定稿。',
        en: 'The content side was engineering too: two PPTs and the on-site posters were re-cut into a four-act narrative; the error-correction-H QR codes ship as both PNG and SVG and still decode at 200px; and the closing slide separates “scan into the Douyin group” from “add the organiser on WeChat”, a wording that took three rounds to settle.',
      },
    ],
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
