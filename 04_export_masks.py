import os
import shutil

import paths


def export_to_selected():
    for file in os.listdir(paths.MASK_DIR):
        if not file.endswith(".png"):
            continue

        mask = paths.MASK_DIR / file
        dataset, hold_out_perc, img_name = file.split("_")

        mask_destination = paths.SELECTED_DIR / dataset / "results" / f"{hold_out_perc}_{img_name[:-4]}_mask.png"

        mask_destination.parent.mkdir(exist_ok=True)

        shutil.copy(mask, mask_destination)
    shutil.copy("stimuli/set1.txt", paths.SELECTED_DIR / "set1.txt")

if __name__ == '__main__':
    export_to_selected()