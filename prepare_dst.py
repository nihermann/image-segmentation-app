"""
Copy reference images to dst_layers folder assuming there is only one layer in the reference images.
"""
import os, shutil

import paths

fileList = os.listdir(paths.REF_DIR)
for fileName in fileList:
    fileName = fileName[:-4]
    newDir = paths.DST_DIR / fileName
    os.makedirs(newDir, exist_ok=True)
    shutil.copyfile(paths.REF_DIR / (fileName + ".png"), newDir / (fileName + "_l1.png"))
