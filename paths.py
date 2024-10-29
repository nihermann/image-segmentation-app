from pathlib import Path

OUTPUT_DIR = Path("outputs_flicker")
MASK_DIR = Path("masks_flicker")
SELECTED_DIR = Path(r"C:\Users\nhermann\Dev\puzzle_sim\selected")
REF_DIR = Path("stimuli/ref")
DST_DIR = Path("stimuli/dst_layers")

# Create the save_path folder if it does not exist
if not MASK_DIR.exists():
    MASK_DIR.mkdir()