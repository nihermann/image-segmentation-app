"""
This file runs through the outputs_flicker folder and extracts the masks for each image, labeled from different participants and averages their votes to create a final mask for each image.
"""

import os
from pathlib import Path
from typing import List, Dict

import numpy as np
import cv2
from PIL import Image
import matplotlib.pyplot as plt

import paths


if __name__ == '__main__':
    # iterate through the outputs_flicker folder and go through each participant's folder
    img_to_mask_dict: Dict[str, List[Path]] = {}

    for root, dirs, files in os.walk(paths.OUTPUT_DIR):
        # skip all dirs that are not the deepest level and skip test trials (36 characters)
        root = Path(root)
        if dirs or len(root.parts[-2]) == 36:
            continue

        mask_path = root / files[0]
        if root.name not in img_to_mask_dict:
            img_to_mask_dict[root.name] = [mask_path]
        else:
            img_to_mask_dict[root.name].append(mask_path)

    # iterate through the dictionary and average the masks
    for img, masks in img_to_mask_dict.items():
        # load the first mask
        mask = np.array(Image.open(masks[0]))
        mask = mask / 255

        # iterate through the rest of the masks and average them
        for i in range(1, len(masks)):
            mask += np.array(Image.open(masks[i])) / 255

        mask = mask / len(masks)
        mask = (mask*255).astype(np.uint8)

        # save the mask
        mask_path = os.path.join(paths.MASK_DIR, img + '.png')
        cv2.imwrite(mask_path, mask)