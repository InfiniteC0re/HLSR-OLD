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
		    title: "HLSR",
        color: "#121212",
        resizable: false,
        webPreferences:{
            nodeIntegration: true,
			      devTools: true
        }
    });
    window.loadFile("./renderer/index.html");
    if(config.data.discordrpc){
      rpc.updatePresence({
        "details": "Using HLSR v" + version,
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
	  "discordrpc": true,
	  "autoupdatescheck": true,
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
  config.data[param] = value;
  fs.writeFileSync('config.json', JSON.stringify(config.data, null, "\t"))
};
config.read();

config_builder = {}
config_builder.data = null;

config_builder.read = function(param){
  try{
    config_builder.data = JSON.parse(fs.readFileSync('config_builder.json'));
  }catch(e){
    console.log(e);
  };
};
config_builder.write = function(param, value){
  config_builder.data[param] = value;
  fs.writeFileSync('config_builder.json', JSON.stringify(config_builder.data, null, "\t"))
};
config_builder.save = function(){
  fs.writeFileSync('config_builder.json', JSON.stringify(config_builder.data, null, "\t"))
};
config_builder.read();

exports.config_builder = config_builder;
exports.config = config;
exports.fs = fs;
exports.start = (file, args) => {
	let proc = spawn("./tools/" + file + ".exe", args);
	proc.stdout.on('data', () => {});
};
