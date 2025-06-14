from PIL import Image
import os

def generate_favicon():
    # Create output directory if it doesn't exist
    os.makedirs('public', exist_ok=True)
    
    # Sizes needed for different platforms
    sizes = [16, 32, 48, 64, 96, 128, 192, 256, 384, 512]
    
    # Generate PNG favicons
    for size in sizes:
        output_path = f'public/favicon-{size}x{size}.png'
        if not os.path.exists(output_path):
            try:
                # Create a simple colored square as a placeholder
                img = Image.new('RGBA', (size, size), (26, 26, 26, 255))  # Dark background
                draw = ImageDraw.Draw(img)
                
                # Draw a simple "CK" logo
                try:
                    font = ImageFont.truetype("Arial Bold", size // 2)
                except:
                    font = ImageFont.load_default()
                
                text = "CK"
                text_bbox = draw.textbbox((0, 0), text, font=font)
                text_width = text_bbox[2] - text_bbox[0]
                text_height = text_bbox[3] - text_bbox[1]
                position = ((size - text_width) // 2, (size - text_height) // 2)
                
                draw.text(position, text, font=font, fill=(16, 185, 129, 255))  # emerald-500
                img.save(output_path, 'PNG')
                print(f"Generated: {output_path}")
                
            except Exception as e:
                print(f"Error generating {output_path}: {e}")
    
    # Generate ICO file
    ico_path = 'public/favicon.ico'
    if not os.path.exists(ico_path):
        try:
            # Use the 64x64 image as the base for ICO
            img = Image.open('public/favicon-64x64.png')
            img.save(ico_path, format='ICO')
            print(f"Generated: {ico_path}")
        except Exception as e:
            print(f"Error generating {ico_path}: {e}")
    
    # Generate Apple Touch Icon
    apple_touch_path = 'public/apple-touch-icon.png'
    if not os.path.exists(apple_touch_path):
        try:
            img = Image.open('public/favicon-180x180.png')
            img.save(apple_touch_path, 'PNG')
            print(f"Generated: {apple_touch_path}")
        except:
            print(f"Could not generate {apple_touch_path}")

if __name__ == "__main__":
    from PIL import ImageDraw, ImageFont
    generate_favicon()
