"""
This script counts the number of masks in each of the deepest directories in the "output" directory. This can be a useful way to check the distribution of masks across different categories.
"""
import os
from collections import Counter
import matplotlib.pyplot as plt
from pathlib import Path
import paths

with open("stimuli/set1.txt", "r") as f:
    selected_images = f.read().splitlines()

# Function to get the names of the deepest directories
def find_deepest_directories(directory):
    deepest_dirs = []
    for root, dirs, files in os.walk(directory):
        # If there are no subdirectories, this is the deepest level
        if not dirs:
            # check that the len of the directory name is greater than 1
            if len(Path(root).parts[-2]) > 36:  # exclude test image
                if os.path.basename(root) in selected_images:
                    deepest_dirs.append(os.path.basename(root))
    return deepest_dirs

# Count occurrences of each deepest directory name
deepest_dirs = find_deepest_directories(paths.OUTPUT_DIR)
deepest_counts = Counter(deepest_dirs)

print(deepest_counts)
categories, counts = zip(*deepest_counts.items())
# Plot the results in a histogram
plt.figure(figsize=(10, 12))
plt.barh(categories, counts, color='skyblue')
plt.xticks(rotation=90)
plt.xlabel("Deepest Directory Names N={}".format(len(categories)))
plt.ylabel("Occurrences")
plt.title("Occurrences of Deepest Directories in 'output'")
plt.tight_layout()
plt.show()