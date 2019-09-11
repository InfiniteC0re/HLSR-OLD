switch (main.theme){
  case 1:
    $(".current-theme").html(lang[lang_selected].light);
    break;
  case 2:
    $(".current-theme").html(lang[lang_selected].dark);
    break;
};
var activeButtonHTML = `<i class="far fa-check-square"></i>`;
var deactiveButtonHTML = `<i class="far fa-square"></i>`;
var checkMarks = document.getElementsByClassName("entry");
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
      if(i == 2){
        config.data.discordrpc = checkMarks[2].active;
        config.write("discordrpc", config.data.discordrpc);
      };
    });
  }
};
$(".lang-change").click(() => {
  if(lang_selected == "english") lang_selected = "russian";
  else lang_selected = "english";
  main.updateLocale();
  updateLocale();
  config.write("language", lang_selected);
});
$(".current-theme").click(() => {
  switch (main.theme){
    case 1:
      $("html").attr("theme", "light");
      $(".current-theme").html(lang[lang_selected].dark);
      config.data.theme = main.theme = 2;
      config.write("theme", main.theme);
      break;
    case 2:
      $("html").attr("theme", "dark");
      $(".current-theme").html(lang[lang_selected].light);
      config.data.theme = main.theme = 1;
      config.write("theme", main.theme);
      break;
  };
});
