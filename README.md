# 3D Reconstruction Artifact Experiment Workflow
This image segmentation tool was used in the [PuzzleSim](https://nihermann.github.io/puzzlesim/index.html) paper during dataset creation. The software is a derivative work of the tool used by [Wolski et al.](https://dl.acm.org/doi/abs/10.1145/3196493). If you found this tool useful, please consider citing the papers below. Thank you and have fun! :)


## Before the Experiment

### Validate that the experiment is set up correctly
```shell
python 00_validate.py
```

### Run the experiment
Visit this [website](http://localhost/app/) to run the experiment. If you can already see an image please reset the experiment with either `CONTROL + ALT + R` or by opening the console in the browser and execute `clearCookies()` in that console.

On the Desktop you can find two images `00009.png` and `00009 gt.png`. Show both side by side and explain the artifacts. Take away, just color things that feel unnatural - all scenes are natural scenes so they can trust their feelings.

Then explain the segmentation tool. There are many controls below but arguably the easiest workflow is to use the mouse wheel to adapt the brush size and to hold `f` to hide the colored mask and hold `d` to temporarily activate the eraser. Press `p` to proceed to the next image. The first image after starting the experiment is to play around and show but will not be counted. Thus, the first image does not need to be labeled. 

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


## Citation
If you found this tool useful, please consider citing:
```
@inproceedings{hermann2025puzzle,
  title={Puzzle similarity: A perceptually-guided cross-reference metric for artifact detection in 3d scene reconstructions},
  author={Hermann, Nicolai and Condor, Jorge and Didyk, Piotr},
  booktitle={2025 IEEE/CVF International Conference on Computer Vision (ICCV)},
  pages={28881--28891},
  year={2025},
  organization={IEEE}
}
@article{wolski2018dataset,
  title={Dataset and metrics for predicting local visible differences},
  author={Wolski, Krzysztof and Giunchi, Daniele and Ye, Nanyang and Didyk, Piotr and Myszkowski, Karol and Mantiuk, Rados{\l}aw and Seidel, Hans-Peter and Steed, Anthony and Mantiuk, Rafa{\l} K},
  journal={ACM Transactions on Graphics (TOG)},
  volume={37},
  number={5},
  pages={1--14},
  year={2018},
  publisher={ACM New York, NY, USA}
}
```
