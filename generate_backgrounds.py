#!/usr/bin/env python3
"""
Generate premium backgrounds for Cadeira Beni pitch deck.
16:9 aspect ratio (1920×1080) with subtle textures and glows.
"""

import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import math

# Color palette
COLORS = {
    "espresso": (31, 23, 18),           # #1F1712
    "off_white": (244, 239, 231),       # #F4EFE7
    "caramelo": (185, 130, 71),         # #B98247
    "caramelo_claro": (216, 180, 134),  # #D8B486
    "caramelo_escuro": (154, 106, 56),  # #9A6A38
    "oliva": (62, 74, 53),              # #3E4A35
    "bege_pedra": (231, 222, 209),      # #E7DED1
    "cinza_quente": (140, 131, 120),    # #8C8378
    "claro_base": (246, 241, 232),      # #F6F1E8
    "tinta": (42, 33, 27),              # #2A211B
}

WIDTH, HEIGHT = 1920, 1080

def create_wood_texture(width, height, scale=50, darkness=0.15):
    """Create subtle vertical wood grain texture."""
    x = np.linspace(0, scale, width)
    y = np.linspace(0, scale, height)
    X, Y = np.meshgrid(x, y)

    # Vertical grain pattern (perlin-like with sine)
    grain = np.sin(X * 3) * np.sin(Y * 0.1) * darkness
    grain += np.random.randn(height, width) * 0.02

    return grain

def create_radial_glow(width, height, center_x, center_y, radius, color, intensity=0.3):
    """Create radial glow effect."""
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))

    # Create gradient
    for y in range(height):
        for x in range(width):
            dx = x - center_x
            dy = y - center_y
            dist = math.sqrt(dx*dx + dy*dy)

            if dist < radius:
                alpha = int(255 * intensity * (1 - dist / radius))
                img.putpixel((x, y), (*color, alpha))

    # Blur for soft effect
    img = img.filter(ImageFilter.GaussianBlur(radius=80))
    return img

def create_vignette(width, height, darkness=0.4):
    """Create subtle vignette darkening edges."""
    img = Image.new('L', (width, height), 255)
    draw = ImageDraw.Draw(img)

    # Radial gradient vignette
    center_x, center_y = width // 2, height // 2
    max_dist = math.sqrt(center_x**2 + center_y**2) * 1.2

    for y in range(height):
        for x in range(width):
            dx = x - center_x
            dy = y - center_y
            dist = math.sqrt(dx*dx + dy*dy)
            val = int(255 * (1 - darkness * (dist / max_dist)))
            img.putpixel((x, y), max(0, val))

    img = img.filter(ImageFilter.GaussianBlur(radius=100))
    return img

def generate_dark_background(variant="cover"):
    """
    Generate dark background with glow, vignette and wood texture.
    variant: "cover" (right glow), "center" (bottom-center glow), "diagram" (center-right glow)
    """
    # Base: espresso
    base_arr = np.array(Image.new('RGB', (WIDTH, HEIGHT), COLORS["espresso"]), dtype=float)

    # Add wood texture
    grain = create_wood_texture(WIDTH, HEIGHT, scale=40, darkness=0.08)
    # Apply grain texture to base
    grain_normalized = (grain - grain.min()) / (grain.max() - grain.min() + 1e-6)
    for c in range(3):
        base_arr[:, :, c] = base_arr[:, :, c] * (1.0 + grain_normalized * 0.15)

    wood_texture = Image.fromarray(np.clip(base_arr, 0, 255).astype(np.uint8), mode='RGB')

    # Position glow based on variant
    glow_positions = {
        "cover": (1600, 400),      # right, upper-middle
        "center": (960, 850),      # center, bottom
        "diagram": (1300, 540),    # center-right
    }

    glow_pos = glow_positions.get(variant, glow_positions["cover"])
    glow = create_radial_glow(WIDTH, HEIGHT, glow_pos[0], glow_pos[1],
                               radius=600, color=COLORS["caramelo"], intensity=0.15)

    # Composite: base + glow
    result = Image.new('RGB', (WIDTH, HEIGHT))
    result.paste(wood_texture)
    result.paste(glow, (0, 0), glow)

    # Add vignette
    vignette = create_vignette(WIDTH, HEIGHT, darkness=0.35)
    result = Image.composite(result, Image.new('RGB', (WIDTH, HEIGHT), COLORS["espresso"]), vignette)

    # Add noise for anti-banding
    result_arr = np.array(result, dtype=float)
    noise = np.random.randn(HEIGHT, WIDTH, 3) * 3
    result_arr = np.clip(result_arr + noise, 0, 255).astype(np.uint8)
    result = Image.fromarray(result_arr)

    return result

def generate_light_background():
    """Generate light background with warm tones and subtle effects."""
    # Base: off-white quente
    base_arr = np.array(Image.new('RGB', (WIDTH, HEIGHT), COLORS["claro_base"]), dtype=float)

    # Add wood texture (very subtle)
    grain = create_wood_texture(WIDTH, HEIGHT, scale=60, darkness=0.04)
    grain_normalized = (grain - grain.min()) / (grain.max() - grain.min() + 1e-6)
    for c in range(3):
        base_arr[:, :, c] = base_arr[:, :, c] * (1.0 + grain_normalized * 0.08)

    textured = Image.fromarray(np.clip(base_arr, 0, 255).astype(np.uint8), mode='RGB')

    # Subtle central brightening
    center_glow = create_radial_glow(WIDTH, HEIGHT, WIDTH//2, HEIGHT//3,
                                     radius=800, color=(255, 255, 255), intensity=0.08)
    result = Image.new('RGB', (WIDTH, HEIGHT))
    result.paste(textured)
    result.paste(center_glow, (0, 0), center_glow)

    # Warm vignette (very subtle)
    vignette = create_vignette(WIDTH, HEIGHT, darkness=0.15)
    result = Image.composite(result, Image.new('RGB', (WIDTH, HEIGHT), COLORS["claro_base"]), vignette)

    # Minimal noise
    result_arr = np.array(result, dtype=float)
    noise = np.random.randn(HEIGHT, WIDTH, 3) * 1.5
    result_arr = np.clip(result_arr + noise, 0, 255).astype(np.uint8)
    result = Image.fromarray(result_arr)

    return result

if __name__ == "__main__":
    print("Generating backgrounds...")
    os.makedirs("output/backgrounds", exist_ok=True)

    # Dark variants
    print("  - Dark (Cover variant)...")
    dark_cover = generate_dark_background("cover")
    dark_cover.save("output/backgrounds/dark_cover.png")

    print("  - Dark (Center variant)...")
    dark_center = generate_dark_background("center")
    dark_center.save("output/backgrounds/dark_center.png")

    print("  - Dark (Diagram variant)...")
    dark_diagram = generate_dark_background("diagram")
    dark_diagram.save("output/backgrounds/dark_diagram.png")

    # Light variant
    print("  - Light base...")
    light = generate_light_background()
    light.save("output/backgrounds/light_base.png")

    print("✓ Backgrounds generated successfully!")
