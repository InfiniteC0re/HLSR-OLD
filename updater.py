from io import BytesIO
from zipfile import ZipFile
import subprocess
import requests
import json
import os

patches = None


def get_last_version(version, cycle):
    global patches
    try:
        print(patches[version])
        if not patches[version]['is_last']:
            get_last_version(patches[version]['next_version'], cycle + 1)
        if cycle > 1:
            url = requests.get(patches[version]['patch_link'])
            zipfile = ZipFile(BytesIO(url.content))
            zipfile.extractall(os.getcwd())
            open('version.txt', 'w').write(version)
    except Exception as e:
        print(e)


try:
    version = open('version.txt').read()
    res = requests.request("get", "https://raw.githubusercontent.com/InfiniteC0re/HLSR/master/patches.json")
    patches = json.loads(res.text)
    get_last_version(version, 1)
    try:
        subprocess.Popen(['launcher.exe'])
    except:
        print("No launcher detected!")
except Exception as e:
    try:
        subprocess.Popen(['launcher.exe'])
    except:
        print("No launcher detected!")
