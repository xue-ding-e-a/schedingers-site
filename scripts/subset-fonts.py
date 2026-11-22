#!/usr/bin/env python3
"""按站点真实用字重新生成字体子集。

改动站内文案后运行：python scripts/subset-fonts.py
生成的子集写入 src/assets/fonts/，原始字体保留在 src/assets/fonts/source/。
依赖：pip install fonttools brotli
"""

import re
from pathlib import Path

from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
FONTS = SRC / "assets" / "fonts"
SOURCE = FONTS / "source"

# 基础字符：可见 ASCII + 站点常用标点
ASCII = "".join(chr(cp) for cp in range(0x20, 0x7F))
SYMBOLS = "°·—–…“”‘’、。，：；！？（）《》【】→←↑↓↗²×÷±%‰€$￥"

# 与数字同处一条 .numeric 文本里的中文，保留后避免同一字段切换字形
NUMERIC_EXTRA = "幅作品"

TARGETS = {
    "up-job-numeric-v1.woff2": ("up-job-numeric-subset.woff2", set(ASCII) | set(SYMBOLS) | set(NUMERIC_EXTRA)),
    "up-job-heading-v2.woff2": ("up-job-heading-subset.woff2", None),
}


def collect_site_chars() -> set[str]:
    """扫描 src 下所有会被渲染的内容文件，收集出现过的字符。"""
    chars = set(ASCII) | set(SYMBOLS)
    for path in SRC.rglob("*"):
        if path.is_file() and path.suffix in {".astro", ".ts", ".css", ".json"}:
            chars.update(path.read_text(encoding="utf-8", errors="ignore"))
    return chars


def write_subset(src: Path, out: Path, chars: set[str]) -> None:
    subset.main(
        [
            str(src),
            f"--text={''.join(sorted(chars))}",
            f"--output-file={out}",
            "--flavor=woff2",
            "--layout-features=*",
            "--no-hinting",
            "--desubroutinize",
        ]
    )
    print(f"{src.name}: {src.stat().st_size / 1024:.1f} KB -> {out.name}: {out.stat().st_size / 1024:.1f} KB")


def main() -> None:
    site_chars = collect_site_chars()
    print(f"站点字符集：{len(site_chars)} 个唯一字符")

    for source_name, (out_name, chars) in TARGETS.items():
        src = SOURCE / source_name
        if not src.exists():
            raise SystemExit(f"缺少原始字体：{src}")
        write_subset(src, FONTS / out_name, chars if chars is not None else site_chars)

    # Include both localized initial titles and the typewriter's alternate spelling.
    titles = re.findall(r"'portal\.title': ([^\n]+),", (SRC / 'i18n/ui.ts').read_text(encoding='utf-8'))
    title_chars = set("Schedinger's site" + "".join(title[1:-1] for title in titles))
    write_subset(SOURCE / 'up-job-heading-v2.woff2', FONTS / 'portal-title.woff2', title_chars)


if __name__ == "__main__":
    main()
