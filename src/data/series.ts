import type { Localized } from './works';

export type Series = {
  slug: string;
  name: Localized;
  region: Localized;
  desc: Localized;
  coords: [number, number];
  cover: string;
  color: string;
};

export const series: Series[] = [
  {
    slug: 'pingan',
    name: { zh: '平安草原', en: "Ping'an Grassland" },
    region: { zh: '甘肃 · 天水', en: 'Tianshui, Gansu' },
    desc: {
      zh: '盛夏的银河核心悬在草坡与营地灯火之上，是整组作品里最通透的一夜。',
      en: "The summer core hanging over grass slopes and camp lights — the clearest night in the whole set.",
    },
    coords: [35.02, 106.3],
    cover: 'twin-arches-jade',
    color: '#373c45',
  },
  {
    slug: 'guanshan',
    name: { zh: '关山雪夜', en: 'Guanshan Snow Night' },
    region: { zh: '陕西 · 宝鸡', en: 'Baoji, Shaanxi' },
    desc: {
      zh: '三十公里积雪山路开上去的一夜，雪原、灯火与冬季银河，温度是零下。',
      en: 'One night earned by driving thirty kilometres of snow-covered mountain road. Snowfield, lamps, winter Milky Way.',
    },
    coords: [34.84, 106.56],
    cover: 'galactic-arch-snow-mountain',
    color: '#404d5f',
  },
  {
    slug: 'jiuzhaigou',
    name: { zh: '九寨夜行', en: 'Jiuzhaigou After Dark' },
    region: { zh: '四川 · 阿坝', en: 'Aba, Sichuan' },
    desc: {
      zh: '山林、栈道与村寨的灯火，银河拱桥在墨绿色的山脊上完整升起。',
      en: 'Forest, plank roads and village lights, with the full galactic arch over dark green ridges.',
    },
    coords: [33.26, 103.92],
    cover: 'plank-road-star-bridge',
    color: '#46442f',
  },
  {
    slug: 'xianyou',
    name: { zh: '古刹星轨', en: 'Star Trails at the Old Temple' },
    region: { zh: '陕西 · 西安', en: "Xi'an, Shaanxi" },
    desc: {
      zh: '飞檐之上，一百九十张照片累积出一圈星轨，也累积出一段更慢的时间。',
      en: 'Above the eaves, 190 frames accumulate into a circle of trails — and into a slower kind of time.',
    },
    coords: [34.09, 108.02],
    cover: 'eaves-of-time',
    color: '#2f5771',
  },
];

export function getSeries(slug: string) {
  return series.find((s) => s.slug === slug);
}
