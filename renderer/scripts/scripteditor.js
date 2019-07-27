var last_config = undefined;
var save = function(){
  if(last_config){
    fs.writeFileSync(last_config[0], $(".editor").val())
  }else{
    let last_save = dialog.showSaveDialog({
      filters: [
        { name: 'Configs / Scripts', extensions: ['cfg'] }
      ]
    });
    if(last_save){
      fs.writeFileSync(last_save, $(".editor").val());
      last_config = [last_save];
    };
  };
};
$("#new").click(() => {
  last_config = undefined;
  $(".editor").val("");
});
$("#open").click(() => {
  last_config = undefined;
  last_config = dialog.showOpenDialog({
    filters: [
      { name: 'Configs / Scripts', extensions: ['cfg'] }
    ]
  });
  if(last_config){
    content = fs.readFileSync(last_config[0]);
    $(".editor").val(content);
  };
});
$("#save").click(save);
$(".list").on("keydown", (e) => {
  if(e.ctrlKey && e.key.toLowerCase() == "s" || e.key.toLowerCase() == "ы"){
    save();
  };
});
