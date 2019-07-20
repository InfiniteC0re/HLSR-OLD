from os import listdir
from shutil import copyfile
from os.path import join
import sys
import os

current_dir = os.getcwd()
files_path = "Customization\\itemsprites\\"
patch_path = "Half-Life\\%game%\\models\\"
arguments = sys.argv


def installSprites(game, id):
    if id == "0":
        spritesPack = "Standard"
    elif id == "1":
        spritesPack = "Q3 Styled"
    else:
        quit(1)
    for file in listdir(join(current_dir, files_path, spritesPack)):
        file_path = join(current_dir, files_path, spritesPack) + "\\" + file
        patch = join(current_dir, patch_path.replace("%game%", game)) + "\\" + file
        try:
            copyfile(file_path, patch)
        except:
            quit(1)


if len(arguments) > 1:
    sprite_id = arguments[1]
    installSprites("valve", sprite_id)
    installSprites("bshift", sprite_id)
    installSprites("gearbox", sprite_id)