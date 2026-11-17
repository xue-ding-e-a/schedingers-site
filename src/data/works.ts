export type Localized = { zh: string; en: string };

export type Work = {
  slug: string;
  title: Localized;
  series: string;
  location: Localized;
  region: Localized;
  coords: [number, number];
  date: string;
  gear: { camera: string; lens: string };
  exif: { aperture: string; iso: string; shutter: string; focal: string; frames: string };
  technique: Localized;
  story: Localized;
  image: string;
  thumb: string;
  width: number;
  height: number;
  color: string;
  featured?: boolean;
};

export const works: Work[] = [
  {
    slug: 'under-the-milky-way',
    title: { zh: '银河下的我们', en: 'Us Beneath the Milky Way' },
    series: 'pingan',
    location: { zh: '甘肃 · 天水 · 平安草原', en: "Ping'an Grassland, Tianshui, Gansu" },
    region: { zh: '甘肃 · 天水', en: 'Tianshui, Gansu' },
    coords: [35.02, 106.3],
    date: '2026-07-20',
    gear: { camera: 'Sony A7C', lens: 'Sigma 28-70mm f/2.8' },
    exif: { aperture: 'f/2.8', iso: '4000', shutter: '13s', focal: '28mm', frames: '1' },
    technique: { zh: '单张拍摄', en: 'Single frame' },
    story: {
      zh: `夏夜的风带着青草的气息吹过山野。

银河从地平线上拔地而起，如同一道璀璨的光瀑，径直贯穿了整片苍穹。暗夜深处，繁密的星辰与暗星云交织出宇宙最瑰丽的纹理。

远处的地平线还泛着淡淡的余晖，而我们并肩站在护栏前，谁也没有打破这份宁静。在数百亿光年的尺度面前，人类的个体显得如此渺小；但在这个夏夜里，紧靠着的肩膀与共同仰望的目光，却让浩瀚的虚空有了切实的温度。

或许我们追寻星空的意义，不仅在于记录未知的远方，更在于漫漫长夜里，有人愿意陪你一起抬头，分享同一片星海。`,
      en: `A summer wind carries the smell of grass across the hills.

The Milky Way rises straight up from the horizon like a waterfall of light, cutting the whole sky in two. Deep in the dark, dense stars and dust lanes weave the most extravagant texture the universe has to offer.

The afterglow still lingers on the far horizon. We stand side by side at the railing and neither of us breaks the silence. Against a scale of tens of billions of light years, a person is nothing — but on this summer night, two shoulders touching and two pairs of eyes looking up give the void a real temperature.

Maybe the point of chasing the sky is not only to record some distant unknown. It is that on a long night, someone is willing to look up with you and share the same sea of stars.`,
    },
    image: '/images/works/under-the-milky-way.webp',
    thumb: '/images/works/under-the-milky-way-thumb.webp',
    width: 2400,
    height: 3600,
    color: '#4b4651',
    featured: true,
  },
  {
    slug: 'twin-arches-jade',
    title: { zh: '双拱如玉', en: 'Twin Arches of Jade' },
    series: 'pingan',
    location: { zh: '甘肃 · 天水 · 平安草原', en: "Ping'an Grassland, Tianshui, Gansu" },
    region: { zh: '甘肃 · 天水', en: 'Tianshui, Gansu' },
    coords: [35.02, 106.3],
    date: '2026-07-20',
    gear: { camera: 'Sony A7C', lens: 'Sigma 28-70mm f/2.8' },
    exif: { aperture: 'f/2.8', iso: '4000', shutter: '13s', focal: '28mm', frames: '5 + 12' },
    technique: {
      zh: '地景 5 张拼接 · 天空 12 张拼接',
      en: 'Foreground: 5 frames stitched · Sky: 12 frames stitched',
    },
    story: {
      zh: `盛夏七月的夜空辽阔而通透。

完整的银河拱桥如同一道璀璨的光带横跨天宇，而山脊上蜿蜒亮起的路灯，也恰好在大地上勾勒出一道向下的光弧。两道弧线一上一下，将起伏青翠的山谷温柔环抱，在夜色中沉静舒展，宛如一方被天地雕琢的美玉。

画面一侧是绚烂深邃的银河核心，瑰丽的星云与暗尘在山巅舒展；另一侧的星流向着深空延伸，与天际泛起的微光融为一体。

没有白日的喧闹，唯有山风掠过草坡的轻响。我们站在山谷的边缘仰望，头顶是流转了亿万年的星河，脚下是沉睡的山野。`,
      en: `July skies are wide and transparent.

The complete galactic arch crosses the sky as a band of light, while the street lamps winding along the ridge happen to draw a second arc bending the other way on the ground. One above, one below, they hold the green valley in a soft embrace — like a piece of jade carved by the sky.

On one side the bright core, its nebulae and dust spreading over the summit; on the other the star stream fading into the first glow of the horizon.

No daytime noise, only wind over the grass slope. We stand at the edge of the valley and look up: billions of years of stars above, sleeping hills below.`,
    },
    image: '/images/works/twin-arches-jade.webp',
    thumb: '/images/works/twin-arches-jade-thumb.webp',
    width: 2400,
    height: 1434,
    color: '#373c45',
    featured: true,
  },
  {
    slug: 'prairie-starry-night',
    title: { zh: '草原星夜', en: 'Prairie Starry Night' },
    series: 'pingan',
    location: { zh: '甘肃 · 天水 · 平安草原', en: "Ping'an Grassland, Tianshui, Gansu" },
    region: { zh: '甘肃 · 天水', en: 'Tianshui, Gansu' },
    coords: [35.02, 106.3],
    date: '2026-07-20',
    gear: { camera: 'Sony A7C', lens: 'Sigma 28-70mm f/2.8' },
    exif: { aperture: 'f/2.8', iso: '4000', shutter: '13s', focal: '28mm', frames: '2' },
    technique: { zh: '2 张堆栈', en: '2 frames stacked' },
    story: {
      zh: `夜色在起伏的丘陵间缓缓铺展。

盛夏的银河核心毫无保留地倾泻在山脊上方，明暗交错的星尘在深邃的夜空中舒展，清晰得仿佛触手可及。

山坡上的营地灯火沿着小径渐次亮起，像散落在大地上的微弱火种，与苍穹之上奔流的银河遥相呼应。旷野里很安静，只有微风拂过草尖的细微声响。

这片星光在两万多年前就已经启程，跨越漫长的光年与虚空，最终落在这片青翠的山丘之上。大地在此刻静默沉睡，而宇宙正璀璨苏醒。`,
      en: `Night unfolds slowly across the rolling hills.

The core of the summer Milky Way pours without reservation over the ridge, its light and dark dust so clear it seems within reach.

Camp lights come on one by one along the path, like small fires scattered on the ground, answering the river of stars overhead. The open field is quiet apart from the wind in the grass.

This starlight set out more than twenty thousand years ago, crossed light years of emptiness, and landed on these green hills. The earth sleeps; the universe is wide awake.`,
    },
    image: '/images/works/prairie-starry-night.webp',
    thumb: '/images/works/prairie-starry-night-thumb.webp',
    width: 2400,
    height: 1600,
    color: '#575863',
  },
  {
    slug: 'winter-milky-way',
    title: { zh: '冬夜星河', en: 'Winter Milky Way' },
    series: 'guanshan',
    location: { zh: '陕西 · 宝鸡 · 关山草原', en: 'Guanshan Grassland, Baoji, Shaanxi' },
    region: { zh: '陕西 · 宝鸡', en: 'Baoji, Shaanxi' },
    coords: [34.84, 106.56],
    date: '2026-01-10',
    gear: { camera: 'Sony A7C', lens: 'Brightin Star 12mm f/2.8' },
    exif: { aperture: 'f/2.8', iso: '5000', shutter: '20s', focal: '12mm', frames: '210 / 11' },
    technique: {
      zh: '地景 210 张堆栈 · 天空 11 张堆栈',
      en: 'Foreground: 210 frames stacked · Sky: 11 frames stacked',
    },
    story: {
      zh: `雪后的山谷沉入夜色，白茫茫的山坡一直延伸到星空之下。

冬季的夜空格外清澈，猎户座、大犬座等冬季星座依次登场，银河也在群山上方显露出淡淡的轮廓。亿万颗恒星散落在深蓝色的天幕上，像一场落在宇宙深处的雪。

山脚下，几盏灯火照亮了雪地，也照亮了山间建筑的轮廓。一边是遥远的星光，穿越数十、数百甚至更久的岁月来到眼前；一边是人间的灯火，在这个寒冷的冬夜里散发着真实的温度。

天地之间，仿佛只隔着这一片雪原。抬头是浩瀚星海，低头是万家灯火。这一刻，遥远的宇宙与眼前的山野，在同一个夜晚相遇。`,
      en: `After snowfall the valley sinks into the night, and the white slope runs unbroken to the edge of the sky.

Winter air is exceptionally clear. Orion and Canis Major take their places one after another, and the Milky Way shows a faint outline above the ridgeline. Countless stars scatter across a deep blue dome like snow falling somewhere deep in the universe.

At the foot of the mountain a few lamps light the snow and trace the shape of the buildings. On one side, starlight that has travelled for tens or hundreds of years; on the other, the warmth of human light on a freezing night.

Between them lies only this snowfield. Look up and there is the sea of stars; look down and there are the lights of home.`,
    },
    image: '/images/works/winter-milky-way.webp',
    thumb: '/images/works/winter-milky-way-thumb.webp',
    width: 2400,
    height: 1600,
    color: '#444f5c',
  },
  {
    slug: 'star-trails-river',
    title: { zh: '星河流转', en: 'River of Turning Stars' },
    series: 'guanshan',
    location: { zh: '陕西 · 宝鸡 · 关山草原', en: 'Guanshan Grassland, Baoji, Shaanxi' },
    region: { zh: '陕西 · 宝鸡', en: 'Baoji, Shaanxi' },
    coords: [34.84, 106.56],
    date: '2026-01-10',
    gear: { camera: 'Sony A7C', lens: 'Brightin Star 12mm f/2.8' },
    exif: { aperture: 'f/2.8', iso: '5000', shutter: '20s', focal: '12mm', frames: '210' },
    technique: { zh: '天空 210 张堆栈', en: 'Sky: 210 frames stacked' },
    story: {
      zh: `当我们仰望星空，总以为群星是静止的。其实，宇宙从未停下。

长时间曝光之下，原本散落在夜空中的星辰逐渐化作一道道弧线。它们沿着天空缓缓延伸，留下属于时间的轨迹。山谷里的雪地依旧寂静，山坡上的树木也依旧伫立，只有星空在镜头前留下了流动的痕迹。

一颗星，从东方走向西方；一个夜晚，也在一道道星轨中悄然流逝。我们无法用肉眼看见这样的变化，却可以借助相机，将原本漫长到难以察觉的时间凝固在一幅画面里。

于是，星轨不再只是天空中的线条。它记录的是地球的自转，也是我们站在这片雪原上，与宇宙共同度过的一段时间。`,
      en: `When we look up, we assume the stars are still. The universe never stops.

In a long exposure the scattered points become arcs, sliding along the sky and leaving the trace of time itself. The snow in the valley stays silent; the trees on the slope stay where they are. Only the sky moves in front of the lens.

A single star travels from east to west, and a whole night passes in those arcs. We cannot see this with our eyes, but a camera can hold a span of time too long to notice and fix it into one frame.

So the star trails are not just lines in the sky. They record the rotation of the Earth — and a stretch of time we spent standing on this snowfield together with the universe.`,
    },
    image: '/images/works/star-trails-river.webp',
    thumb: '/images/works/star-trails-river-thumb.webp',
    width: 2400,
    height: 1600,
    color: '#536275',
  },
  {
    slug: 'galactic-arch-snow-mountain',
    title: { zh: '银河落入雪山', en: 'Where the Milky Way Falls' },
    series: 'guanshan',
    location: { zh: '陕西 · 宝鸡 · 关山草原', en: 'Guanshan Grassland, Baoji, Shaanxi' },
    region: { zh: '陕西 · 宝鸡', en: 'Baoji, Shaanxi' },
    coords: [34.84, 106.56],
    date: '2026-01-10',
    gear: { camera: 'Sony A7C', lens: 'Brightin Star 12mm f/2.8' },
    exif: { aperture: 'f/2.8', iso: '5000', shutter: '20s', focal: '12mm', frames: '7' },
    technique: { zh: '7 张拼接', en: '7 frames stitched' },
    story: {
      zh: `银河从群山之上缓缓升起。

冬夜的空气清冷而通透，繁密的星辰铺满天穹，银河如同一条横贯夜空的银色长河，从遥远的天际流向雪山深处。

山坡上的树木早已褪去叶色，雪覆盖了道路与田野，只留下几座伞亭和一条蜿蜒的小径，静静守在山谷之中。这里没有城市的喧嚣，只有风吹过雪地的声音，和头顶那片亘古不变的星海。

我们总习惯用“银河拱桥”去描述这样的天空，却很少去想，所谓银河，不过是我们身处其中的家园——无数恒星组成的银河系，从我们的脚下延伸到头顶，再一直延伸向看不见尽头的宇宙。而在这个冬夜，它似乎真的落到了雪山之上。`,
      en: `The Milky Way rises slowly above the mountains.

The winter air is cold and transparent; dense stars fill the sky and the galaxy pours like a silver river toward the snow peaks.

The trees have lost their leaves, snow covers the road and the fields, and only a few pavilions and a winding path remain in the valley. No city noise — only wind over snow, and the sky overhead.

We are used to calling this a galactic arch, and rarely stop to think that the galaxy is simply our home: a river of stars we are standing inside, running from beneath our feet to somewhere we cannot see. Tonight it seems to have landed on the snow mountain, looking back at us with light billions of years old.`,
    },
    image: '/images/works/galactic-arch-snow-mountain.webp',
    thumb: '/images/works/galactic-arch-snow-mountain-thumb.webp',
    width: 3000,
    height: 1400,
    color: '#404d5f',
    featured: true,
  },
  {
    slug: 'eaves-of-time',
    title: { zh: '檐上流年', en: 'Years Above the Eaves' },
    series: 'xianyou',
    location: { zh: '陕西 · 西安 · 周至仙游寺', en: 'Xianyou Temple, Zhouzhi, Xi’an' },
    region: { zh: '陕西 · 西安', en: 'Xi’an, Shaanxi' },
    coords: [34.09, 108.02],
    date: '2025-11-18',
    gear: { camera: 'Sony A7C', lens: 'Sigma 28-70mm f/2.8' },
    exif: { aperture: 'f/2.8', iso: '4000', shutter: '8s', focal: '28mm', frames: '190' },
    technique: { zh: '190 张堆栈', en: '190 frames stacked' },
    story: {
      zh: `夜幕低垂，深山里的古刹褪去喧嚣，在清冷的夜色中沉静伫立。

飞檐翘角昂首向天，屋脊之上，漫天星辰循着永恒的节律缓缓流转。在长时间的曝光中，群星化作一道道澄澈而规整的弧线，如同一幅巨大的苍穹织锦，笼罩在巍峨的殿宇上方。

木石榫卯间凝结着岁月的沉淀，而头顶回旋的星轨，则是宇宙更深邃的时间度量。飞檐挑起星光，石阶古意悠悠。建筑在人间守望了千百年，星辰在天际流转了百亿年。

我们站在古刹前静默仰望，在这片沉静的屋檐下，与千年前的星空完成了一场跨越时空的凝视。`,
      en: `Night falls and the old temple loses its noise, standing quietly in the cold.

Upturned eaves point at the sky, and above the ridge the stars turn at their eternal pace. In a long exposure they become clear, orderly arcs — a vast woven canopy over the hall.

Wood and stone joints hold centuries; the circling trails above measure something deeper. The eaves lift the starlight; the stone steps keep their age. The building has watched for a thousand years, the stars for billions.

Standing here in silence, we finish a gaze across time with the same sky people saw a thousand years ago.`,
    },
    image: '/images/works/eaves-of-time.webp',
    thumb: '/images/works/eaves-of-time-thumb.webp',
    width: 2400,
    height: 1600,
    color: '#2f5771',
  },
  {
    slug: 'meteor-over-ridge',
    title: { zh: '山脊流星', en: 'Meteor Over the Ridge' },
    series: 'jiuzhaigou',
    location: { zh: '四川 · 阿坝 · 九寨沟', en: 'Jiuzhaigou, Aba, Sichuan' },
    region: { zh: '四川 · 阿坝', en: 'Aba, Sichuan' },
    coords: [33.26, 103.92],
    date: '2025-07-31',
    gear: { camera: 'Sony A7R III', lens: 'Viltrox 16mm f/1.8' },
    exif: { aperture: 'f/1.8', iso: '3200', shutter: '13s', focal: '16mm', frames: '1' },
    technique: { zh: '单张拍摄', en: 'Single frame' },
    story: {
      zh: `深山里的夜，静得能听见松涛在风里的细微呼吸。

墨绿色的森林山峦在夜幕下沉睡，银河如同一条轻纱般的星带，自峰顶斜斜延伸向苍穹深处。繁密的星辰散落在深蓝色的天幕上，清冷而纯粹。

一道微光在群星深处悄然划过，在亿万年的古老背景里留下一抹短暂而清晰的轨迹。一边是亘古运转的浩瀚宇宙，一边是无声划过深空的微光。

站在静谧的山林之下仰望，时间仿佛在此刻停滞。唯有星光穿透长夜，落入这片无声的林海。`,
      en: `Deep in the mountains the night is quiet enough to hear the pines breathing in the wind.

Dark green ridges sleep under the sky, and the Milky Way extends from the summit like a gauze band into the depths.

A faint streak slides quietly through the stars, leaving a brief, clear trace against a background billions of years old. On one side the ancient machinery of the universe; on the other a flicker crossing the dark.

Standing below the silent forest, time seems to stop. Only starlight passes through the long night and falls into this soundless sea of trees.`,
    },
    image: '/images/works/meteor-over-ridge.webp',
    thumb: '/images/works/meteor-over-ridge-thumb.webp',
    width: 2400,
    height: 3598,
    color: '#28282c',
    featured: true,
  },
  {
    slug: 'stars-fall-on-village',
    title: { zh: '星落古寨', en: 'Stars Over the Old Village' },
    series: 'jiuzhaigou',
    location: { zh: '四川 · 阿坝 · 九寨沟', en: 'Jiuzhaigou, Aba, Sichuan' },
    region: { zh: '四川 · 阿坝', en: 'Aba, Sichuan' },
    coords: [33.26, 103.92],
    date: '2025-07-31',
    gear: { camera: 'Sony A7R III', lens: 'Viltrox 16mm f/1.8' },
    exif: { aperture: 'f/1.8', iso: '3200', shutter: '13s', focal: '16mm', frames: '9' },
    technique: { zh: '9 张堆栈', en: '9 frames stacked' },
    story: {
      zh: `山林环抱的村寨，在深沉的夜色里亮起了温暖的灯火。

高耸的山脊在天际勾勒出一道峡谷，而璀璨的银河核心恰好在山坳正上方盛大绽放。瑰丽的星云与深邃的暗尘交织奔流，如同从天外倾泻而下的一道光之瀑布。

暖黄色的灯光照亮了屋舍的轮廓与茂密的树冠，在群山的静谧中守护着人间的安宁。头顶是跨越两万多光年而来的宇宙深光，眼前是炊烟散去后最真实的烟火温度。

苍穹辽阔，山河无言。在群山的怀抱里，星海与人间在此刻温柔相拥。`,
      en: `A village held by wooded mountains lights its warm lamps in the deep night.

A high ridge draws a gorge across the sky, and the core of the Milky Way blooms right above the hollow — nebulae and dark dust pouring down like a waterfall of light from somewhere beyond.

Amber light traces the roofs and the crowns of the trees, keeping watch over the quiet. Above, light that left its source more than twenty thousand years ago; in front of me, the plain warmth of a fire after the cooking smoke has gone.

The sky is vast, the mountains say nothing. In their embrace, the sea of stars and the human world hold each other gently.`,
    },
    image: '/images/works/stars-fall-on-village.webp',
    thumb: '/images/works/stars-fall-on-village-thumb.webp',
    width: 2400,
    height: 2179,
    color: '#2a2927',
    featured: true,
  },
  {
    slug: 'plank-road-star-bridge',
    title: { zh: '栈道星桥', en: 'The Plank Road Star Bridge' },
    series: 'jiuzhaigou',
    location: { zh: '四川 · 阿坝 · 九寨沟', en: 'Jiuzhaigou, Aba, Sichuan' },
    region: { zh: '四川 · 阿坝', en: 'Aba, Sichuan' },
    coords: [33.26, 103.92],
    date: '2025-07-31',
    gear: { camera: 'Sony A7R III', lens: 'Viltrox 16mm f/1.8' },
    exif: { aperture: 'f/1.8', iso: '3200', shutter: '13s', focal: '16mm', frames: '15' },
    technique: { zh: '15 张拼接', en: '15 frames stitched' },
    story: {
      zh: `木质栈道沿着山崖静静延伸，一侧是灯火映照的林木，一侧是沉入幽暗的层峦与谷底村落。

抬头望去，完整的银河拱桥横跨在墨绿色的山脊之上。从绚烂深邃的银心，一直舒展到天际淡雅的星流，整片夜空被繁密的星辰彻底点亮。

独自走在空无一人的山间小径，夜风穿过林梢，带来草木清冷的气息。这条沿山而筑的木道，仿佛不仅是通向山林的深处，更像是铺向了头顶那座横跨古今的星之桥梁。

人行山野间，步步皆星河。`,
      en: `A wooden walkway follows the cliff, lamps on one side lighting the trees, the other side dropping into dark ridges and a valley village.

Look up and the full galactic arch spans the dark green ridge, from the bright core to the pale star stream at the horizon. The whole sky is lit.

Walking alone on an empty mountain path, night wind moving through the treetops, carrying the cold smell of grass and wood. This walkway seems to lead not only deeper into the forest but toward a bridge of stars above it.

Every step on the mountain is a step through the galaxy.`,
    },
    image: '/images/works/plank-road-star-bridge.webp',
    thumb: '/images/works/plank-road-star-bridge-thumb.webp',
    width: 2400,
    height: 1433,
    color: '#46442f',
  },
];

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}

export function sortByDate(list: Work[]) {
  return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const featuredWorks = sortByDate(works.filter((w) => w.featured));
