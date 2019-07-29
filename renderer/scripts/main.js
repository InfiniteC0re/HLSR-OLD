let main = {};
main.theme = config.data.theme;
if(main.theme != 1 && main.theme != 2) main.theme = 1;
main.selected = "LIBRARY";
main.update = function(){
  let elems = document.getElementsByClassName('panelButton');
  for(let i = 0; i < elems.length; i++){
    if(main.selected != elems[i].innerText.toUpperCase())
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
        shell.openExternal('https://github.com/InfiniteC0re/HLSR')
        return;
      };
      main.selected = elem.innerText.toUpperCase();
      $("#content").load(("./menus/" + main.selected + ".html").replace(" ", "%20"));
      main.update();
    });
  };
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
