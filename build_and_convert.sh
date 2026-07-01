#!/bin/bash
set -e

echo "=========================================="
echo "CADEIRA BENI PITCH DECK — BUILD PIPELINE"
echo "=========================================="
echo ""

# Step 1: Generate backgrounds
echo "Step 1: Generating visual assets..."
python3 generate_backgrounds.py
echo ""

# Step 2: Process photos (if originals exist)
echo "Step 2: Processing photos..."
python3 process_photos.py
echo ""

# Step 3: Build deck
echo "Step 3: Building pitch deck (PPTX)..."
node build_deck.js
echo ""

# Step 4: Convert to PDF
echo "Step 4: Converting to PDF..."
if command -v soffice &> /dev/null; then
    soffice --headless --convert-to pdf --outdir output output/cadeira_beni_pitch.pptx
    echo "✓ PDF created: output/cadeira_beni_pitch.pdf"
else
    echo "⚠ LibreOffice not found. Skipping PDF conversion."
    echo "  To convert manually, use: soffice --headless --convert-to pdf --outdir output output/cadeira_beni_pitch.pptx"
fi
echo ""

# Step 5: Rasterize PDF to images for inspection
echo "Step 5: Rasterizing PDF for visual inspection..."
if [ -f "output/cadeira_beni_pitch.pdf" ]; then
    if command -v pdftoppm &> /dev/null; then
        mkdir -p output/inspection
        pdftoppm -png output/cadeira_beni_pitch.pdf output/inspection/slide
        echo "✓ Slides rasterized: output/inspection/slide-*.png"
        echo "  Review these images to check for visual defects."
    else
        echo "⚠ pdftoppm not found. Install with: apt-get install poppler-utils"
    fi
else
    echo "⚠ PDF not found. Skipping rasterization."
fi
echo ""

echo "=========================================="
echo "BUILD COMPLETE!"
echo "=========================================="
echo ""
echo "Deliverables:"
echo "  - output/cadeira_beni_pitch.pptx (editable)"
echo "  - output/cadeira_beni_pitch.pdf (for sharing)"
echo "  - output/inspection/slide-*.png (for QA)"
echo ""
echo "Next: Review the inspection images for visual defects."
echo "      If found, correct the build_deck.js and rebuild."
echo ""
