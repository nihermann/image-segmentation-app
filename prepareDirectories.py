import os

fileList = os.listdir("./stimuli/ref")
outputDirectory = "./outputs/"
text_file = open("./stimuli/scenes.txt", "w")

for fileName in fileList:
   fileName = fileName[:-4]
   print fileName
   
   # newDir = outputDirectory + fileName
   # if not os.path.exists(newDir):
      # os.makedirs(newDir)
   text_file.write(fileName + '\n')