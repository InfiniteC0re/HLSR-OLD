from os import listdir
from shutil import copyfile
from os.path import isfile, join
import sys
import os

current_dir = os.getcwd()
files_path = "Customization\\backgrounds\\"
patch_path = "Half-Life\\%game%\\resource\\background\\"
arguments = sys.argv


def installBackground(game, id):
    if id == "0":
        back = "Standard"
    elif id == "1":
        back = "Black Mesa"
    elif id == "2":
        back = "Crossfire"
    elif id == "3":
        back = "Surface Tension"
    elif id == "4":
        back = "Xen"
    elif id == "5":
        back = "Xen 2"
    else:
        return
    for file in listdir(join(current_dir, files_path, back)):
        file_path = join(current_dir, files_path, back) + "\\" + file
        patch = join(current_dir, patch_path.replace("%game%", game)) + "\\" + file
        try:
            copyfile(file_path, patch)
        except:
            quit(1)


if len(arguments) > 1:
    background_id = arguments[1]
    installBackground("valve", background_id)
    installBackground("bshift", background_id)
    installBackground("gearbox", background_id)
