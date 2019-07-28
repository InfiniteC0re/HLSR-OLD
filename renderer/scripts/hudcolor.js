function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};
var color = hexToRgb($("#hudColor").val());
$(".colorPicker").css("background", $("#hudColor").val());
$("#command").val(`bxt_hud_color "${color.r} ${color.g} ${color.b}"`);
$("#hudColor").on('input', () => {
  var color = hexToRgb($("#hudColor").val());
  $(".colorPicker").css("background", $("#hudColor").val());
  $("#command").val(`bxt_hud_color "${color.r} ${color.g} ${color.b}"`);
});
function writeHUDToGame(game){
  let old;
  if(fs.existsSync("./Half-Life/" + game + "/autoexec.cfg")){
    old = fs.readFileSync("./Half-Life/" + game + "/autoexec.cfg").toString();
    let old_color = old.match(/bxt_hud_color [^\n]*/);
    if(old_color){
      for(let i = 0; i < old_color.length; i++){
        old = old.replace(old_color[i], '');
      };
    };
  }else{
    old = "";
  };
  return old;
};
$("#save").click(() => {
  let valve = writeHUDToGame("valve");
  let gearbox = writeHUDToGame("gearbox");
  let bshift = writeHUDToGame("bshift");

  valve += "\n" + $("#command").val();
  gearbox += "\n" + $("#command").val();
  bshift += "\n" + $("#command").val();
  fs.writeFileSync("./Half-Life/valve/autoexec.cfg", valve);
  fs.writeFileSync("./Half-Life/gearbox/autoexec.cfg", gearbox);
  fs.writeFileSync("./Half-Life/bshift/autoexec.cfg", bshift);
  main.createNotification("HUD color was saved!");
});
