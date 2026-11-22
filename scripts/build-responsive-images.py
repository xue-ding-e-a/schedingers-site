#!/usr/bin/env python3
"""Generate responsive images for the photo pages.

Run: python scripts/build-responsive-images.py (requires Pillow)
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
WORKS = ROOT / "public" / "images" / "works"
PHOTO = ROOT / "src" / "assets" / "photo"


def write_variant(source: Path, target: Path, width: int, quality: int, portrait: bool = False) -> None:
    if target.exists() and target.stat().st_mtime >= source.stat().st_mtime:
        return

    with Image.open(source) as image:
        if portrait:
            crop_width = min(image.width, round(image.height * 9 / 16))
            left = (image.width - crop_width) // 2
            image = image.crop((left, 0, left + crop_width, image.height))
        if image.width < width:
            width = image.width
        height = round(image.height * width / image.width)
        resized = image.convert("RGB").resize((width, height), Image.LANCZOS)
        resized.save(target, "WEBP", quality=quality, method=6)

    print(f"{target.name}: {target.stat().st_size / 1024:.1f} KiB ({width}x{height})")


def main() -> None:
    for thumb in sorted(WORKS.glob("*-thumb.webp")):
        slug = thumb.stem.removesuffix("-thumb")
        original = WORKS / f"{slug}.webp"
        write_variant(thumb, WORKS / f"{slug}-480.webp", 480, 74)
        with Image.open(original) as image:
            needs_intermediate = image.width > 1600
        if needs_intermediate:
            write_variant(original, WORKS / f"{slug}-1600.webp", 1600, 80)

    write_variant(PHOTO / "star-trails-poster.webp", PHOTO / "star-trails-poster-mobile.webp", 480, 72, portrait=True)


if __name__ == "__main__":
    main()
