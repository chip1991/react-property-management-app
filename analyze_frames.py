import os
from PIL import Image
import numpy as np

def analyze_frames(folder_path):
    frames = sorted(os.listdir(folder_path))
    print(f"Total frames: {len(frames)}")
    
    sample_indices = [0, 30, 60, 90, 120, 150]
    
    for idx in sample_indices:
        if idx >= len(frames):
            continue
            
        frame_path = os.path.join(folder_path, frames[idx])
        with Image.open(frame_path) as img:
            width, height = img.size
            
            # Extract central region
            center_box = (width//4, height//4, width*3//4, height//2 + height//8)
            center_region = img.crop(center_box)
            center_arr = np.array(center_region)
            
            # Extract bottom region
            bottom_box = (width//4, height*3//4, width*3//4, height*7//8)
            bottom_region = img.crop(bottom_box)
            bottom_arr = np.array(bottom_region)
            
            # To get color, calculate mean of pixels that are bright enough
            center_mask = np.mean(center_arr, axis=2) > 50
            bottom_mask = np.mean(bottom_arr, axis=2) > 50
            
            center_active = np.sum(center_mask) > 500
            bottom_active = np.sum(bottom_mask) > 100
            
            if center_active:
                avg_color = np.mean(center_arr[center_mask], axis=0)
                color_desc = f"RGB({int(avg_color[0])}, {int(avg_color[1])}, {int(avg_color[2])})"
            else:
                color_desc = "Black/Empty"
                
            print(f"\nFrame {idx:03d}:")
            print(f"  Center Region Active: {center_active} - Dominant Color: {color_desc}")
            print(f"  Bottom Region Active (Small Dots): {bottom_active}")

if __name__ == "__main__":
    analyze_frames("/workspace/frames")
