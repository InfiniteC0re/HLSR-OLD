from os import listdir
from shutil import copyfile
from os.path import join
import sys
import os

current_dir = os.getcwd()
files_path = "Customization\\crosshairs\\"
patch_path = "Half-Life\\%game%\\sprites\\"
arguments = sys.argv


def installCrosshair(game, id):
    if id == "0":
        crosshair = "Standard"
    elif id == "1":
        crosshair = "Standard Black"
    elif id == "2":
        crosshair = "Counter-Strike"
    elif id == "3":
        crosshair = "Dot"
    elif id == "4":
        crosshair = "Green"
    else:
        quit(1)
    for file in listdir(join(current_dir, files_path, crosshair)):
        file_path = join(current_dir, files_path, crosshair) + "\\" + file
        patch = join(current_dir, patch_path.replace("%game%", game)) + "\\" + file
        try:
            copyfile(file_path, patch)
        except:
            quit(1)


if len(arguments) > 1:
    crossfire_id = arguments[1]
    installCrosshair("valve", crossfire_id)
    installCrosshair("bshift", crossfire_id)
    installCrosshair("gearbox", crossfire_id)