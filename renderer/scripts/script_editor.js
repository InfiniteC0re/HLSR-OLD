try{
  $(".editor").val(last_data);
}catch(e){};
var last_data = null;
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
    last_data = content;
  };
});
$("#save").click(save);
$(".editor").keyup(() => {
  last_data = $(".editor").val();
});
$(".list").on("keydown", (e) => {
  if(e.ctrlKey && e.key.toLowerCase() == "s" || e.key.toLowerCase() == "ы"){
    save();
  };
});
