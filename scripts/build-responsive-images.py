#!/usr/bin/env python3
"""为作品详情页生成 1600px 宽的中间档图片。

运行：python scripts/build-responsive-images.py
原图与缩略图已存在，这里只补一档介于两者之间的尺寸，供 srcset 使用。
依赖：pip install pillow
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
WORKS = ROOT / "public" / "images" / "works"
TARGET_WIDTH = 1600
QUALITY = 80
SUFFIXES = ("-thumb.webp", "-flow.webp", f"-{TARGET_WIDTH}.webp")


def main() -> None:
    created = 0
    for path in sorted(WORKS.glob("*.webp")):
        if path.name.endswith(SUFFIXES):
            continue

        out = path.with_name(f"{path.stem}-{TARGET_WIDTH}.webp")
        if out.exists() and out.stat().st_mtime >= path.stat().st_mtime:
            continue

        with Image.open(path) as image:
            if image.width <= TARGET_WIDTH:
                continue
            height = round(image.height * TARGET_WIDTH / image.width)
            resized = image.convert("RGB").resize((TARGET_WIDTH, height), Image.LANCZOS)
            resized.save(out, "WEBP", quality=QUALITY, method=6)

        created += 1
        print(f"{out.name}: {out.stat().st_size / 1024:.1f} KB ({TARGET_WIDTH}x{height})")

    print(f"完成，新生成 {created} 个文件。")


if __name__ == "__main__":
    main()
