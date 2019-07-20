from os import listdir
from shutil import copyfile
from os.path import join
import sys
import os

current_dir = os.getcwd()
files_path = "Customization\\skyboxes\\"
patch_path = "Half-Life\\%game%\\gfx\\env\\"
arguments = sys.argv


def installSkyboxes(game, id):
    if id == "0":
        skyboxesPack = "Standard"
    elif id == "1":
        skyboxesPack = "Better Quality"
    else:
        quit(1)
    for file in listdir(join(current_dir, files_path, skyboxesPack)):
        file_path = join(current_dir, files_path, skyboxesPack) + "\\" + file
        patch = join(current_dir, patch_path.replace("%game%", game)) + "\\" + file
        try:
            copyfile(file_path, patch)
        except:
            quit(1)


if len(arguments) > 1:
    skyboxes_id = arguments[1]
    installSkyboxes("valve", skyboxes_id)
    installSkyboxes("bshift", skyboxes_id)
    installSkyboxes("gearbox", skyboxes_id)