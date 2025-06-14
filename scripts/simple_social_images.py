from PIL import Image, ImageDraw, ImageFont
import os

def create_social_image(width, height, output_path):
    # Create a new image with a solid background
    image = Image.new('RGB', (width, height), color='#1a1a1a')
    draw = ImageDraw.Draw(image)
    
    # Try to load default system fonts
    try:
        # Try different common font paths
        font_paths = [
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',  # Common on Linux
            '/System/Library/Fonts/Supplemental/Arial Bold.ttf',      # macOS
            'Arial Bold',                                             # Windows
            'Arial',                                                  # Fallback
        ]
        
        title_font = None
        for font_path in font_paths:
            try:
                title_font = ImageFont.truetype(font_path, 72 if width > 1000 else 48)
                break
            except:
                continue
                
        if not title_font:
            title_font = ImageFont.load_default()
            
        # Draw app name
        app_name = "ConvertKSH"
        title_bbox = draw.textbbox((0, 0), app_name, font=title_font)
        title_width = title_bbox[2] - title_bbox[0]
        title_position = ((width - title_width) // 2, height // 3)
        draw.text(title_position, app_name, font=title_font, fill="#10b981")  # emerald-500
        
        # Draw tagline with smaller font
        tagline = "USD to KES Converter & Currency Tools"
        subtitle_font_size = 36 if width > 1000 else 24
        try:
            subtitle_font = ImageFont.truetype(font_paths[0].replace('Bold', ''), subtitle_font_size)
        except:
            subtitle_font = ImageFont.load_default()
            
        subtitle_bbox = draw.textbbox((0, 0), tagline, font=subtitle_font)
        subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
        subtitle_position = ((width - subtitle_width) // 2, height // 2 + 20)
        draw.text(subtitle_position, tagline, font=subtitle_font, fill="#f3f4f6")
        
    except Exception as e:
        print(f"Error generating image: {e}")
    
    # Save the image
    image.save(output_path, 'JPEG', quality=90)
    print(f"Generated: {output_path}")

# Create output directory if it doesn't exist
os.makedirs('public/images', exist_ok=True)

# Generate Open Graph image (1200x630)
create_social_image(1200, 630, 'public/images/og-image.jpg')

# Generate Twitter Card image (1200x628)
create_social_image(1200, 628, 'public/images/twitter-card.jpg')
