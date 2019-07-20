const electron = require('electron');
const { spawn } = require('child_process');
const rpc = require("discord-rich-presence")("554672370028380160");
const app = electron.app;
const fs = require('fs');
const BrowserWindow = electron.BrowserWindow;
const rpc_splashes = ["Better than v1.0", "Better than v1.1", "Better than v1.1a", "Better than v1.1b", "echo \"Hello Earth!\"", "RSLH", "V2h5IHlvdSdyZSBoZXJlPw==", "After two months...", "True", "False"];

const version = "1.2";

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
    if(config.data.discordrpc){
      rpc.updatePresence({
        "details": "Using HLSR Electron " + version,
        "largeImageKey": "hlsr",
        "largeImageText": rpc_splashes[Math.round(Math.random(rpc_splashes.length))],
        "startTimestamp": new Date().getTime()
      });
    };
    if(config.data.autoupdatescheck){
      
    };
};

app.on("ready", createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

config = {};
config.data;
config.read = function(param){
  try{
    config.data = JSON.parse(fs.readFileSync('config.json'));
  }catch(e){
    config.data = {
      "games":{
        "hl":{
          "bxt": false,
          "ri": false,
          "ls": false,
          "won": false
        },
        "bs":{
          "bxt": false,
          "ri": false,
          "ls": false,
          "won": null
        },
        "of":{
          "bxt": false,
          "ri": false,
          "ls": false,
          "won": false
        }
      }
    };
    fs.writeFileSync('config.json', JSON.stringify(config.data, null, "\t"))
  }
  return config.data[param] != undefined ? config.data[param] : {};
};
config.write = function(param, value){
  config[param] = value;
  fs.writeFileSync('config.json', JSON.stringify(config.data, null, "\t"))
};
config.read();

exports.config = config;
exports.fs = fs;
exports.start = (file, args) => {
	let proc = spawn("./tools/" + file + ".exe", args);
	proc.stdout.on('data', () => {});
};
