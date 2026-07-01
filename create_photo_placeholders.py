#!/usr/bin/env python3
"""
Create placeholder images for missing photos.
"""

import os
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

def create_placeholder(width, height, color, label, filename):
    """Create a placeholder image with gradient background and label."""
    # Create image with gradient
    img = Image.new('RGB', (width, height), color)

    # Add subtle gradient
    gradient = np.linspace(0.8, 1.2, height)
    pixels = img.load()

    # Get color components
    r, g, b = color[0], color[1], color[2]

    for y in range(height):
        for x in range(width):
            factor = 0.9 + (0.2 * (y / height))
            nr = int(min(255, r * factor))
            ng = int(min(255, g * factor))
            nb = int(min(255, b * factor))
            pixels[x, y] = (nr, ng, nb)

    # Add text
    draw = ImageDraw.Draw(img)
    text_color = (255, 255, 255) if sum(color) < 384 else (0, 0, 0)

    # Draw label centered
    bbox = draw.textbbox((0, 0), label, font=None)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]

    x = (width - text_w) // 2
    y = (height - text_h) // 2

    draw.text((x, y), label, fill=text_color, font=None)

    # Add subtle border
    draw.rectangle([(0, 0), (width-1, height-1)], outline=(100, 100, 100), width=2)

    # Blur slightly for a more natural look
    img = img.filter(ImageFilter.GaussianBlur(radius=1))

    img.save(filename)
    print(f"  ✓ Created: {filename}")

if __name__ == "__main__":
    os.makedirs("fotos", exist_ok=True)

    placeholders = {
        "fotos/cachorro.jpg": (
            (200, 160, 100),
            "PHOTO: poodle toy\nna plataforma"
        ),
        "fotos/produto.jpg": (
            (180, 120, 80),
            "PHOTO: Cadeira Beni V2\nproduto"
        ),
        "fotos/construcao.jpg": (
            (150, 120, 100),
            "PHOTO: construção\nlaboratório"
        ),
        "fotos/bancada.jpg": (
            (160, 130, 100),
            "PHOTO: protótipo\nbancada"
        ),
        "fotos/v1_marchetaria.jpg": (
            (170, 100, 60),
            "PHOTO: V1\nmarchetaria"
        ),
        "fotos/v2_bambu.jpg": (
            (160, 110, 70),
            "PHOTO: V2\nbambu"
        ),
    }

    print("Creating photo placeholders...")
    for filename, (color, label) in placeholders.items():
        if not os.path.exists(filename):
            create_placeholder(1920, 1440, color, label, filename)
        else:
            print(f"  → Skipping (exists): {filename}")

    print("✓ Photo placeholders ready!")
