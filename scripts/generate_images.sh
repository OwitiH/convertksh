#!/bin/bash

# Install Pillow if not already installed
pip install pillow --user

# Ensure the Inter font is available (optional)
mkdir -p fonts
if [ ! -f "fonts/Inter-Bold.ttf" ]; then
    echo "Downloading Inter font..."
    wget -O fonts/Inter.zip https://github.com/rsms/inter/releases/download/v3.19/Inter-3.19.zip
    unzip -j fonts/Inter.zip "Inter 3.19/Inter-Bold.ttf" -d fonts/
    unzip -j fonts/Inter.zip "Inter 3.19/Inter-Medium.ttf" -d fonts/
    rm fonts/Inter.zip
fi

# Run the Python script
python3 scripts/generate_social_images.py
