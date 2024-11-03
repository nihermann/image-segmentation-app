# 3D Reconstruction Artifact Experiment Workflow

## Before the Experiment

### Validate that the experiment is set up correctly
```shell
python 00_validate.py
```

### Run the experiment
Visit this [website](http://localhost/app/) to run the experiment. If you can already see an image please reset the experiment with either `CONTROL + ALT + R` or by opening the console in the browser and execute `clearCookies()` in that console.

- The experiment is done once the progressbar is full and no more images are shown.
- If during the experiment an image cannot be loaded (you can't see an image but the progressbar is not full) please press `F5` and complete the experiment until refreshing the page does not yield new images. To trouble shoot after the experiment please run `python 02_count_masks.py` and check that the count is 36:
  - If this is the case and all bars in the plot have the same number you can dismiss the participant - everything is in order, the error did not affect the experiment.
  - If the count is not 36 or the bars have different counts please call open `stimuli/set1.txt` and only put the missing file name in here (without the .png). Then change the variable in `totalSceneNumberPerUser` from `functions.js`, line 20 to the number of missing files left in `set1.txt`. (e.g. if one image was missing, set it to `1`) Now rerun the experiment and you should only see the missing image. Let the participant complete the last images and dismiss him. If the missing image does not appear - right click on the refresh page button and do a hard refresh to clear the cached files. For the next experiment please get all 36 image names back in `set1.txt` and set the variable in `functions.js` back to 36. (Find a backup of `set1.txt` in `stimuli/backup_set1.txt/`. Please fix the issue in both set1.txt so it doesn't happen again.)  
    
## After the Experiment
### Check that all masks were recorded correctly and uniformly 
Please visually verify that all masks have the same count and that there are 36 in total (see count in the title or x-axis description)
```shell
python 02_count_masks.py
```

### Collect the participants' masks and average them
```shell
python 03_average_masks.py
```

### Export masks to the other project for evaluation
```shell
python 04_export_masks.py
```