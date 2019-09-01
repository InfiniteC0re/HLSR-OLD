from io import BytesIO
from zipfile import ZipFile
import subprocess
import requests
import json
import os

patches = None
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}

def get_last_version(version, cycle):
    global patches
    try:
        if not patches[version]['is_last']:
            get_last_version(patches[version]['next_version'], cycle + 1)
        if cycle > 1:
            url = requests.get(patches[version]['patch_link'], headers=headers)
            zipfile = ZipFile(BytesIO(url.content))
            zipfile.extractall(os.getcwd())
            open('version.txt', 'w').write(version)
    except Exception as e:
        print(e)


try:
    version = open('version.txt').read()
    res = requests.request("get", "http://hlspeedrun.com/patches/patches.json", headers=headers)
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
