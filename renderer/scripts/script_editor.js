if(typeof last_data != "undefined"){
  $(".editor").val(last_data);
}else{
  var last_data = null;
};
if(typeof last_config == "undefined"){
  var last_config = null;
  var saved = true;
};
var updateFileName = function() {
  if(!last_config){
    $(".editor-filename").html("New file" + (saved ? "" : "*"));
  }else{
    $(".editor-filename").html(last_config[0].split("\\").reverse()[0] + (saved ? "" : "*"));
  };
};
var save = function(){
  if(last_config){
    fs.writeFileSync(last_config[0], $(".editor").val());
    saved = true;
  }else{
    let last_save = dialog.showSaveDialog({
      filters: [
        { name: 'Configs / Scripts', extensions: ['cfg'] }
      ]
    });
    if(last_save){
      fs.writeFileSync(last_save, $(".editor").val());
      last_config = [last_save];
      saved = true;
    };
  };
  if(saved){
    updateFileName();
    main.createNotification("Saved!");
  };
};
$("#new").click(() => {
  last_config = null;
  last_data = null;
  $(".editor").val("");
  saved = true;
  updateFileName();
});
$("#open").click(() => {
  last_config = null;
  last_config = dialog.showOpenDialog({
    filters: [
      { name: 'Configs / Scripts', extensions: ['cfg'] }
    ]
  });
  if(last_config){
    content = fs.readFileSync(last_config[0]);
    $(".editor").val(content);
    last_data = content;
    saved = true;
    updateFileName();
  };
});
$("#save").click(save);
$(".editor").keyup(() => {
  last_data = $(".editor").val();
  if(saved){
    saved = false;
    updateFileName();
  };
});
$(".list").on("keydown", (e) => {
  if(e.ctrlKey && e.key.toLowerCase() == "s" || e.key.toLowerCase() == "ы"){
    save();
    updateFileName();
  };
});
updateFileName();
