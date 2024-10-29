"""
This script fills scenes.txt with the names of the scenes in the stimuli/ref directory.
"""
import os
import paths

fileList = os.listdir(paths.REF_DIR)
with open("./stimuli/scenes.txt", "w") as text_file:
   for fileName in fileList:
      fileName = fileName[:-4]
      print(fileName)

      text_file.write(fileName + '\n')
