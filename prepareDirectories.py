"""
This script fills scenes.txt with the names of the scenes in the stimuli/ref directory.
"""
import os
from pathlib import Path

import paths


def prepare_dirs(path: Path) -> None:
   with open("./stimuli/scenes.txt", "w") as text_file:
      for file_name in os.listdir(path):
         file_name = file_name[:-4]
         print(file_name)

         text_file.write(file_name + '\n')


if __name__ == '__main__':
    prepare_dirs(paths.REF_DIR)