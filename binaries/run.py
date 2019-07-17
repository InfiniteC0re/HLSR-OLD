from pathlib import Path
import subprocess
import sys

game_path = 'Half-Life\\hl.exe'
arguments = sys.argv
game = None
bxt = False
ri = False
ls = False

if len(arguments) > 1:
    game = arguments[1]
    for num, arg in enumerate(arguments):
        if num == 0:
            continue
        else:
            if "-bxt" in arg:
                bxt = True
            elif "-ri" in arg:
                ri = True
            elif "-ls" in arg:
                ls = True


hl_exe = Path(game_path)
if hl_exe.is_file() and hl_exe.exists():
    subprocess.Popen([game_path, "-game", game])
    if bxt:
        subprocess.Popen(['Bunnymod XT\\Injector.exe'])
    if ri:
        subprocess.Popen(['RInput\\RInput.exe', 'hl.exe'])
    if ls:
        subprocess.Popen(['LiveSplit\\LiveSplit.exe'])
