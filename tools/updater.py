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
        if cycle > 1:
            os.system('color 2')
            print("Getting {} update...".format(version))
            download_update(patches[version]['patch_link'])
        if not patches[version]['is_last']:
            if cycle == 1:
                print("New update(s) detected!")
            get_last_version(patches[version]['next_version'], cycle + 1)
        else:
            open('version.txt', 'w').write(version)
    except Exception as e:
        print(e)

def download_update(link):
    url = requests.get(link, headers=headers)
    zipfile = ZipFile(BytesIO(url.content))
    zipfile.extractall(os.getcwd())

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
