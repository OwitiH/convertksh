from PIL import Image, ImageDraw, ImageFont
import os

# Create output directory if it doesn't exist
os.makedirs('public/images', exist_ok=True)

def create_social_image(width, height, output_path, is_twitter=False):
    # Create a new image with a gradient background
    image = Image.new('RGB', (width, height), color='#1a1a1a')
    draw = ImageDraw.Draw(image)
    
    # Add gradient
    for i in range(height):
        r = int(26 + (i / height) * 30)  # Dark to slightly lighter gray
        g = int(32 + (i / height) * 30)
        b = int(44 + (i / height) * 30)
        draw.line([(0, i), (width, i)], fill=(r, g, b))
    
    # Try to load Inter font, fallback to default
    try:
        # Try to download Inter font directly
        import requests
        import os
        
        # Create fonts directory if it doesn't exist
        os.makedirs('fonts', exist_ok=True)
        
        # Download Inter fonts if they don't exist
        if not os.path.exists('fonts/Inter-Bold.ttf'):
            url = 'https://github.com/rsms/inter/releases/download/v4.0/Inter-Bold.otf'
            r = requests.get(url, allow_redirects=True)
            open('fonts/Inter-Bold.otf', 'wb').write(r.content)
            
        if not os.path.exists('fonts/Inter-Medium.otf'):
            url = 'https://github.com/rsms/inter/releases/download/v4.0/Inter-Medium.otf'
            r = requests.get(url, allow_redirects=True)
            open('fonts/Inter-Medium.otf', 'wb').write(r.content)
            
        # Try to load the fonts
        title_font = ImageFont.truetype("fonts/Inter-Bold.otf", 64 if not is_twitter else 60)
        subtitle_font = ImageFont.truetype("fonts/Inter-Medium.otf", 36 if not is_twitter else 32)
        
    except Exception as e:
        print(f"Warning: Could not load Inter font: {e}")
        # Fallback to default font
        try:
            title_font = ImageFont.truetype("arialbd.ttf", 64 if not is_twitter else 60)
            subtitle_font = ImageFont.truetype("arial.ttf", 36 if not is_twitter else 32)
        except:
            # Final fallback to PIL's default font
            title_font = ImageFont.load_default()
            subtitle_font = ImageFont.load_default()
    
    # Draw app name
    app_name = "ConvertKSH"
    title_bbox = draw.textbbox((0, 0), app_name, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_position = ((width - title_width) // 2, height // 3)
    draw.text(title_position, app_name, font=title_font, fill="#10b981")  # emerald-500
    
    # Draw tagline
    tagline = "USD to KES Converter & Currency Tools"
    subtitle_bbox = draw.textbbox((0, 0), tagline, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_position = ((width - subtitle_width) // 2, height // 2)
    draw.text(subtitle_position, tagline, font=subtitle_font, fill="#f3f4f6")  # gray-100
    
    # Add a subtle pattern or decoration
    for i in range(0, width, 100):
        for j in range(0, height, 100):
            draw.ellipse([i, j, i+5, j+5], fill=(16, 185, 129, 30))  # emerald-500 with opacity
    
    # Save the image
    image.save(output_path, 'PNG', quality=90)
    print(f"Generated: {output_path}")

# Generate Open Graph image (1200x630)
create_social_image(1200, 630, 'public/images/og-image.jpg')

# Generate Twitter Card image (1200x628)
create_social_image(1200, 628, 'public/images/twitter-card.jpg', is_twitter=True)
