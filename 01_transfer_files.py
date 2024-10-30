"""
This script is used to transfer the selected images from the selected directory to the stimuli directory (ref and dst_layer).
"""

import os, shutil
from pathlib import Path

import paths
from prepareDirectories import prepare_dirs


def prepare_selected(path_to_selected: str):
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
                dst_path = paths.DST_DIR / dest_name[:-4]
                os.makedirs(dst_path, exist_ok=True)
                # copy the file to the new directory
                shutil.copyfile(img, dst_path / (dest_name[:-4] + "_l1.png"))
                shutil.copyfile(img, paths.REF_DIR / dest_name)

    # update scenes.txt
    prepare_dirs(paths.REF_DIR)
    print("Selected images have been transferred to the stimuli directory. Please copy the scenes.txt entries to set1.txt to include them into the experiment.")

if __name__ == "__main__":
    prepare_selected(paths.SELECTED_DIR)