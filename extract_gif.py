import os
from PIL import Image

def extract_frames(gif_path, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        
    with Image.open(gif_path) as img:
        frame_idx = 0
        while True:
            try:
                img.seek(frame_idx)
                # Convert to RGB to save as JPEG/PNG correctly
                frame = img.convert("RGB")
                frame.save(os.path.join(output_folder, f"frame_{frame_idx:03d}.png"))
                frame_idx += 1
            except EOFError:
                break
                
    print(f"Successfully extracted {frame_idx} frames to {output_folder}")

if __name__ == "__main__":
    gif_path = "/workspace/chatgpt.gif"
    output_folder = "/workspace/frames"
    extract_frames(gif_path, output_folder)
