"""
This script is used to transfer the selected images from the selected directory to the stimuli directory (ref and dst_layer).
"""

import os, shutil
from pathlib import Path
import pathlib as pl

def prepare_selected(path_to_selected: str):
    src = Path("./stimuli/ref")
    dst = Path("./stimuli/dst_layers")
    # recursively walk through the directory
    for root, dirs, files in os.walk(path_to_selected):
        root = Path(root)
        if root.parts[-1] == "results":
            continue
        for file in files:
            # if the file is a .png file
            if file.endswith(".png"):
                # create a new directory in the dst_layers directory
                img = root / file
                dest_name = "_".join(img.parts[-3:])
                dst_path = dst / dest_name[:-4]
                os.makedirs(dst_path, exist_ok=True)
                # copy the file to the new directory
                shutil.copyfile(img, dst_path / (dest_name[:-4] + "_l1.png"))
                shutil.copyfile(img, src / dest_name)

    # importing prepareDirectories will execute the file and update scenes.txt
    import prepareDirectories

if __name__ == "__main__":
    prepare_selected(r"C:\Users\nhermann\Dev\puzzle_sim\selected")