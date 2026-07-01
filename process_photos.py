#!/usr/bin/env python3
"""
Process and enhance photos for the pitch deck.
Applies contrast, saturation, sharpness adjustments and adds framing.
"""

import os
from PIL import Image, ImageEnhance, ImageFilter
import sys

COLORS = {
    "off_white": (244, 239, 231),       # #F4EFE7 for frame
    "espresso": (31, 23, 18),           # #1F1712 for shadow
}

def enhance_photo(image_path, output_path, contrast=1.07, saturation=1.08, sharpness=1.05):
    """
    Enhance photo: contrast, saturation, sharpness.
    Then add frame and shadow.
    """
    try:
        img = Image.open(image_path).convert('RGB')

        # Enhance contrast
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(contrast)

        # Enhance saturation
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(saturation)

        # Enhance sharpness
        enhancer = ImageEnhance.Sharpness(img)
        img = enhancer.enhance(sharpness)

        # Add frame (off-white mat, 20px)
        frame_size = 20
        frame_color = COLORS["off_white"]

        # Create image with frame
        framed_width = img.width + (frame_size * 2)
        framed_height = img.height + (frame_size * 2)

        framed = Image.new('RGB', (framed_width, framed_height), frame_color)
        framed.paste(img, (frame_size, frame_size))

        # Add shadow (paste shadow then framed image on top)
        shadow_offset = 8
        shadow_blur = 4
        final_width = framed_width + shadow_offset
        final_height = framed_height + shadow_offset

        final = Image.new('RGB', (final_width, final_height), (255, 255, 255))

        # Create shadow layer
        shadow_layer = Image.new('RGBA', (framed_width, framed_height), (0, 0, 0, 0))
        shadow_color = COLORS["espresso"]
        for y in range(framed_height):
            for x in range(framed_width):
                alpha = int(60 * (1 - (x + y) / (framed_width + framed_height)))
                shadow_layer.putpixel((x, y), (*shadow_color, max(0, alpha)))

        # Blur shadow
        shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(radius=shadow_blur))

        # Composite: shadow + framed image
        final.paste(framed, (0, 0))
        shadow_rgb = Image.new('RGB', (final_width, final_height), (255, 255, 255))
        shadow_rgb.paste(shadow_layer, (0, 0), shadow_layer)

        # Blend shadow with final
        final = Image.blend(final, Image.new('RGB', (final_width, final_height), COLORS["espresso"]), 0.15)

        final.save(output_path)
        print(f"  ✓ {os.path.basename(image_path)} → {os.path.basename(output_path)}")

    except FileNotFoundError:
        print(f"  ✗ Photo not found: {image_path}")

if __name__ == "__main__":
    os.makedirs("output/photos", exist_ok=True)

    photos = {
        "fotos/cachorro.jpg": "output/photos/cachorro.png",
        "fotos/produto.jpg": "output/photos/produto.png",
        "fotos/construcao.jpg": "output/photos/construcao.png",
        "fotos/bancada.jpg": "output/photos/bancada.png",
        "fotos/v1_marchetaria.jpg": "output/photos/v1_marchetaria.png",
        "fotos/v2_bambu.jpg": "output/photos/v2_bambu.png",
    }

    print("Processing photos...")
    for src, dest in photos.items():
        if os.path.exists(src):
            enhance_photo(src, dest)
        else:
            print(f"  ⚠ Skipping (not found): {src}")

    print("✓ Photo processing complete!")
