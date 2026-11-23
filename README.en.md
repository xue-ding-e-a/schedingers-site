<p align="center">
  <img src="docs/brand/logo.svg" width="120" height="120" alt="Schedinger's Site logo">
</p>

<h1 align="center">Schedinger's Site<br><sub>ASTROPHOTOGRAPHY &amp; ENGINEERING PORTFOLIO</sub></h1>

<p align="center">
  A dual portfolio of an astrophotographer and physics student: one photography track, one engineering track — independent in rhythm and colour, sharing the same type, grid and motion language.
</p>

<p align="center">
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-5-FF5D01?logo=astro&amp;logoColor=white" alt="Astro 5"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&amp;logoColor=white" alt="TypeScript"></a>
  <a href="https://github.com/xue-ding-e-a/schedingers-site/actions/workflows/deploy.yml"><img src="https://github.com/xue-ding-e-a/schedingers-site/actions/workflows/deploy.yml/badge.svg?branch=main" alt="Deploy status"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/language-EN%20%2F%20%E4%B8%AD-6b4eff" alt="English / 中文"></a>
  <a href="#license--credits"><img src="https://img.shields.io/badge/license-All%20Rights%20Reserved-1d1a2b" alt="All Rights Reserved"></a>
</p>

<p align="center">
  <a href="https://xue-ding-e-a.github.io/schedingers-site/en/">Live Site</a> ·
  <a href="https://xue-ding-e-a.github.io/schedingers-site/en/photo/">Photography</a> ·
  <a href="https://xue-ding-e-a.github.io/schedingers-site/en/dev/">Engineering</a> ·
  <a href="https://xue-ding-e-a.github.io/schedingers-site/en/build/">Build Log</a> ·
  <a href="README.md">中文</a>
</p>

<p align="center">
  <img src="docs/screenshots/portal-home.jpg" width="880" alt="Portal home: two entries for photography and engineering">
</p>

## Why This Site

Portfolio templates look good, but most of them show the result, not the process. This project tries to answer two questions at once:

- How can a photography portfolio let the photographs set the layout, instead of forcing them into identical cards?
- How can an engineering portfolio still show technical judgement when three of its four projects have no public repository?

So the site splits into two entries: photography in black, engineering in white, sharing only the type, grid, footer and neutral index pages.

## Screens

![Photography home: long-exposure night sky and curated works](docs/screenshots/photo-home.jpg)

| Work detail | Engineering home |
| --- | --- |
| ![Work detail](docs/screenshots/work-detail.jpg) | ![Engineering home](docs/screenshots/dev-home.jpg) |
| Capture coordinates, gear, EXIF and a bilingual story | Project matrix and terminal-style facts card |

## Features

- Photography in black and engineering in white, each with its own navigation and About page. The atom logo carries the transition between tracks. See the [photography homepage](https://xue-ding-e-a.github.io/schedingers-site/en/photo/), [engineering homepage](https://xue-ding-e-a.github.io/schedingers-site/en/dev/) and [engineering About page](https://xue-ding-e-a.github.io/schedingers-site/en/dev/about/).
- The portal inlines its lightweight WebGL starfield so it can render with the title and glass entry cards. CSS stars are available without WebGL. The photography homepage uses a WebP poster and a cacheable star-trail loop, then loads work and series previews once playback starts. Previews also load when motion is disabled, playback is paused or playback fails. See the [portal](src/pages/index.astro) and [photography homepage](src/pages/photo.astro) source.
- The All view arranges 10 photographs in paired and staggered rows while preserving each frame. Series filters group works by capture date and pack same-day cards by width. See the [works index](https://xue-ding-e-a.github.io/schedingers-site/en/works/) and [gallery source](src/components/WorksGallery.astro).
- Featured works scroll horizontally on the photography homepage. The stargazing map lives on the series index and each of the four series has its own page. Work details fit the photo’s native aspect ratio, show coordinates, gear, EXIF and stacking methods, and offer a Back action. See the [series index](https://xue-ding-e-a.github.io/schedingers-site/en/collections/) and [work detail example](https://xue-ding-e-a.github.io/schedingers-site/en/works/galactic-arch-snow-mountain/).
- All four engineering projects have covers and detail pages. Both tracks are bilingual and share a footer contact section with copy buttons for email and WeChat. See the [engineering projects](https://xue-ding-e-a.github.io/schedingers-site/en/projects/) and [contact section source](src/components/ContactFooter.astro).
- The site is statically generated, with page scripts handling interactions. Work images are prepared offline in responsive WebP sizes and use average-colour placeholders while loading. See the [image processing script](scripts/build-responsive-images.py).

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Astro 5 | Static pages with native scripts for interactions |
| Types | TypeScript | Locks down bilingual EXIF, coordinate and copy fields |
| Styling | Vanilla CSS | Aspect ratios run from 0.67 to 2.14; hand-written grids beat breakpoint tuning |
| Images | Python / Pillow | Largest original is 144 MB and 168 megapixels, processed before build |
| Hero motion | WebGL + CSS / MP4 | Inline animated starfield on the portal, static poster and looping video on the photography homepage |
| Deployment | GitHub Pages + Actions | Push to main builds and publishes |

## Quick Start

Requires Node.js 20 or newer.

```bash
npm install
npm run dev       # local development
npm run build     # static output in dist/
npm run preview   # preview the build
```

## Project Structure

```text
src/
├─ components/        WorksGallery, WorkCard, ProjectCard, ContactFooter
├─ data/              works.ts / series.ts / projects.ts (content and bilingual fields)
├─ i18n/              ui.ts (copy dictionary), utils.ts (language and path helpers)
├─ layouts/           BaseLayout.astro (navigation, footer, theme switch)
├─ pages/             Chinese pages; en/ holds the English mirror
├─ styles/            global.css (design tokens and global styles)
└─ consts.ts          Site info and the three navigations (NAV / PHOTO_NAV / DEV_NAV)
public/
└─ images/            Work images, thumbnails and map assets
```

## Content Maintenance

- Add a work: edit [src/data/works.ts](src/data/works.ts), fill in both languages and the `thumb` path, and put images in `public/images/works/`. To include the work in the All view, update the curated layout in [WorksGallery.astro](src/components/WorksGallery.astro).
- Add a series: edit [src/data/series.ts](src/data/series.ts); the detail route is generated by `src/pages/collections/[slug].astro`.
- Add a project: edit [src/data/projects.ts](src/data/projects.ts).
- Change navigation: edit [src/consts.ts](src/consts.ts); photography and engineering use `PHOTO_NAV` and `DEV_NAV`.
- Change copy: edit [src/i18n/ui.ts](src/i18n/ui.ts); every key must provide both `zh` and `en`. Keep `README.md` in sync with this file.

## Deployment

Pushing to `main` makes GitHub Actions build and publish to GitHub Pages. The workflow lives in [deploy.yml](.github/workflows/deploy.yml).

The site URL and subpath are configured in [astro.config.mjs](astro.config.mjs):

```js
site: 'https://xue-ding-e-a.github.io',
base: '/schedingers-site',
```

If the repository is renamed, update `base` as well or static assets will 404.

## Changelog

Each iteration is recorded by feature batch in the site's [Build Log](https://xue-ding-e-a.github.io/schedingers-site/en/build/), including technical choices, the split between AI and human work, the timeline and retrospective notes. Recent batches:

- `2026.11.23` Turned the photography About page into the CSVA Proust questionnaire, scaled down the contact block, and reordered the mobile hero to copy, star trail, then meta without the black gradient under the video.
- `2026.11.22` Reworked the mobile photography hero, works page and navigation, unified glass settings across both tracks, and split the track transition into 100 segments per half driven by loading.
- `2026.11.22` Finalised the curated works layout, packed filtered results by capture date, aligned photography card interactions and moved contact details into the shared footer.
- `2026.11.21` Added a lightweight portal starfield, switched the photography hero to a cacheable star-trail loop and deferred photo previews.
- `2026.11.20` Split the photography and engineering About pages, smoothed the atom logo transition, added a theme-aware favicon and refined series reveals, work framing and back navigation.
- `2026.11.19` Added engineering project covers and the WowLand Campus Deck case study, and adjusted navigation pills to reduce browser colour differences.
- `2026.11.18` Switched featured works to horizontal scrolling, moved the stargazing map to the series index and added font subsets and responsive image sizes.
- `2026.11.17` Set up GitHub Pages deployment, established the typography and visual system, and split the site into the photography and engineering tracks.

## Contributing

Issues are welcome for typos, factual errors or accessibility problems. Before opening a PR:

1. Keep Chinese and English fields paired;
2. Run `npm run build` and confirm there are no errors;
3. Do not commit uncompressed originals; convert images to WebP and thumbnails first.

## License & Credits

- All astrophotographs on this site are copyright the author. Commercial use, exhibition, printing or redistribution requires permission; see the [credits page](https://xue-ding-e-a.github.io/schedingers-site/en/credits/).
- The code carries no open-source licence. Please contact the author before reuse.
- Map data from OpenStreetMap and CARTO; typefaces: UP Job Heading, UP Job Numeric, Space Grotesk, DM Sans and system fonts.

## Contact

- Email: 2543165843@qq.com
- WeChat: schedinger
- GitHub: [@xue-ding-e-a](https://github.com/xue-ding-e-a)
