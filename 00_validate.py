import paths


if __name__ == '__main__':

    with open("stimuli/set1.txt", "r") as f:
        selected_images = f.read().splitlines()

    success = True
    for img in selected_images:
        ref = paths.REF_DIR /  f"{img}.png"
        dst = paths.DST_DIR / img / f"{img}_l1.png"
        if not ref.is_file():
            print(ref,  "DOES NOT EXIST")
            success = False
        if not dst.is_file():
            print(dst,  "DOES NOT EXIST")
            success = False

    if not len(selected_images) == 36:
        print("FATAL: There should be 36 images in the set1.txt file")
        success = False

    with open("functions.js", "r") as f:
        js = f.read().splitlines()
        for line in js:
            if "var totalSceneNumberPerUser" in line:
                total = int(line.split("//")[0].split("=")[1].replace(";", "").strip())
                if not total == 36:
                    print("FATAL: 'totalSceneNumberPerUser' in 'functions.js' should be set to 36")
                    success = False

    if success:
        print("SUCCESS")
