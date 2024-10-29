"""
Copy reference images to dst_layers folder assuming there is only one layer in the reference images.
"""
import os, shutil

fileList = os.listdir("./stimuli/ref")
for fileName in fileList:
    fileName = fileName[:-4]
    newDir = "./stimuli/dst_layers/" + fileName
    os.makedirs(newDir, exist_ok=True)
    shutil.copyfile("./stimuli/ref/" + fileName + ".png", newDir + "/" + fileName + "_l1.png")
