const electron = require('electron');
const spawn = require('child_process').spawn;
const fs = require('fs');
const rpc = require("discord-rich-presence")("554672370028380160");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const build_id = "3";

let window = null;
let config = {};
let config_builder = {}

function reset_config() {
  return
  ({
    "theme": 1,
    "discordrpc": true,
    "language": "english",
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
  });
};

function save_config(){
  fs.writeFileSync('config.json', JSON.stringify(config.data, null, "\t"));
};

function createWindow(){
  window = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
		title: "HLSR",
    backgroundColor: "#121212",
    resizable: false,
    webPreferences:{
      nodeIntegration: true,
  		devTools: true
    }
  });
  window.loadFile("./renderer/index.html");
  if(config.data.discordrpc){
    rpc.updatePresence({
      "details": "Exploring the launcher",
      "largeImageKey": "hlsr",
      "largeImageText": "Build ID - " + build_id,
      "startTimestamp": new Date().getTime()
    });
  };
};

function start(file, args){
  let proc = spawn("./tools/" + file + ".exe", args);
  proc.stdout.on('data', () => {});
};

config.read = function(param){
  try{
    config.data = JSON.parse(fs.readFileSync('config.json'));
  }catch(e){
    config.data = reset_config();
    save_config();
  }
  return config.data[param] != undefined ? config.data[param] : {};
};

config.write = function(param, value){
  config.data[param] = value;
  save_config();
};

config_builder.read = function(param){
  try{
    config_builder.data = JSON.parse(fs.readFileSync('config_builder.json'));
  }catch(e){
    console.log(e);
  };
};

config_builder.write = function(param, value){
  config_builder.data[param] = value;
  config_builder.save();
};

config_builder.save = function(){
  fs.writeFileSync('config_builder.json', JSON.stringify(config_builder.data, null, "\t"));
};

fs.writeFileSync('version.txt', build_id);

app.on("ready", createWindow);
app.on('window-all-closed', () => {app.quit()});

config.read();
config_builder.read();

exports.config_builder = config_builder;
exports.config = config;
exports.start = start;
exports.fs = fs;