switch (panel.theme){
  case 1:
    $(".current-theme").html("Switch To Light Theme");
    break;
  case 2:
    $(".current-theme").html("Switch To Dark Theme");
    break;
};
var activeButtonHTML = `<i class="far fa-check-square"></i>`;
var deactiveButtonHTML = `<i class="far fa-square"></i>`;
var checkMarks = document.getElementsByClassName("entry");
checkMarks[0].active = config.read("autoupdatescheck");
checkMarks[2].active = config.read("discordrpc");
for(let i = 0; i < checkMarks.length; i++){
  if(checkMarks[i].getAttribute("radio") != undefined){
    if(!checkMarks[i].active){
      checkMarks[i].children[0].innerHTML = deactiveButtonHTML;
    }else{
      checkMarks[i].children[0].innerHTML = activeButtonHTML;
    }
    checkMarks[i].addEventListener("click", (e) => {
      if(!checkMarks[i].active){
        checkMarks[i].children[0].innerHTML = activeButtonHTML;
      }else{
        checkMarks[i].children[0].innerHTML = deactiveButtonHTML;
      }
      checkMarks[i].active = !checkMarks[i].active;
      if(i == 0){
        config.data.autoupdatescheck = checkMarks[0].active;
        config.write("autoupdatescheck", config.data.autoupdatescheck);
      }else if(i == 2){
        config.data.discordrpc = checkMarks[2].active;
        config.write("discordrpc", config.data.discordrpc);
      };
    });
  }
};
$(".current-theme").click(() => {
  switch (panel.theme){
    case 1:
      $("html").attr("theme", "light");
      $(".current-theme").html("Switch To Dark Theme");
      config.data.theme = panel.theme = 2;
      config.write("theme", panel.theme);
      break;
    case 2:
      $("html").attr("theme", "dark");
      $(".current-theme").html("Switch To Light Theme");
      config.data.theme = panel.theme = 1;
      config.write("theme", panel.theme);
      break;
  };
});