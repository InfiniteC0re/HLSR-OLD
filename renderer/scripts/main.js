let main = {
  theme: config.data.theme,
  selected: lang[lang_selected].panel_library
};
main.theme = main.theme <= 2 && main.theme > 0 ? main.theme : 1;

main.update = function(){
  let elems = document.getElementsByClassName('panelButton');
  for(let i = 0; i < elems.length; i++){
    if(main.selected.toUpperCase() != elems[i].innerText)
      elems[i].removeAttribute("active");
    else
      elems[i].setAttribute("active", null);
  };
  if(typeof socket != "undefined" && socket.connected){
    socket.disconnect();
  };
};

main.updateEvents = function(){
  let elems = document.getElementsByClassName('panelButton');
  for(let i = 0; i < elems.length; i++){
    elems[i].addEventListener("click", (e) => {
      let elem = elems[i];
      if(/nomenu/.test(elem.className)){
        shell.openExternal('http://hlspeedrun.com/')
        return;
      };
      main.selected = elem.innerText.toUpperCase();
      main.update();
    });
  };
  $('.panelButton[name="lib"]').click(() => {main.loadMenu("LIBRARY")});
  $('.panelButton[name="scripts"]').click(() => {main.loadMenu("SCRIPT EDITOR")});
  $('.panelButton[name="builder"]').click(() => {main.loadMenu("CONFIG BUILDER")});
  $('.panelButton[name="customization"]').click(() => {main.loadMenu("CUSTOMIZATION")});
  $('.panelButton[name="settings"]').click(() => {main.loadMenu("SETTINGS")});
  $('.panelButton[name="chat"]').click(() => {main.loadMenu("CHAT")});
};

main.updateLocale = function(){
  $('.button-text[name="lib"]').html(lang[lang_selected].panel_library);
  $('.button-text[name="scripts"]').html(lang[lang_selected].panel_script_editor);
  $('.button-text[name="builder"]').html(lang[lang_selected].panel_config_builder);
  $('.button-text[name="customization"]').html(lang[lang_selected].panel_customization);
  $('.button-text[name="settings"]').html(lang[lang_selected].panel_settings);
  $('.button-text[name="chat"]').html(lang[lang_selected].panel_chat);
  $('.button-text[name="website"]').html(lang[lang_selected].panel_website);
};

main.loadMenu = function(path, callback=null){
  $("#content").load(("./menus/" + path + ".html").replace(" ", "%20"), callback);
};

main.updateTheme = function(){
  switch (main.theme){
    case 1:
      $("html").attr("theme", "dark");
      break;
    case 2:
      $("html").attr("theme", "light");
      break;
  };
};

main.createNotification = function(data){
  let elem = document.createElement("div");
  elem.className = "notification";
  elem.innerHTML = data;
  let deleted = false;
  elem.addEventListener("click", () => {
    elem.remove();
    deleted = true;
  });
  $("#content").append(elem);
  setTimeout(function() {
    if(deleted) return;
    $(elem).fadeOut(400, () => {
      elem.remove();
    });
  },2500);
};
