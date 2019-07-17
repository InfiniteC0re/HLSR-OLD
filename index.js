const electron = require("electron");
const { spawn } = require('child_process');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let window = null;

function createWindow(){
    window = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        resizable:false,
        webPreferences:{
            nodeIntegration:true
        }
    });
    window.loadFile("./renderer/index.html");
};

app.on("ready", createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

//exports.start = () => {spawn("./binaries/game.exe", ["-game", "hl", "-console", "echo", "hello world!"])};
