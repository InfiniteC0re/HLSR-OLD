let panel = {};
panel.selected = "LIBRARY";
panel.update = function(){
  let elems = document.getElementsByClassName('panelButton');
  for(let i = 0; i < elems.length; i++){
    if(panel.selected != elems[i].innerText.toUpperCase())
      elems[i].removeAttribute("active");
    else
      elems[i].setAttribute("active", null);
  };
  $("#content").load(("./menus/" + panel.selected + ".html").replace(" ", "%20"));
};
panel.updateEvents = function(){
  let elems = document.getElementsByClassName('panelButton');
  for(let i = 0; i < elems.length; i++){
    elems[i].addEventListener("click", (e) => {
      let elem = elems[i];
      if(/nomenu/.test(elem.className)){
        shell.openExternal('https://github.com/InfiniteC0re/HLSR')
        return;
      };
      panel.selected = elem.innerText.toUpperCase();
      $("#content").load(("./menus/" + panel.selected + ".html").replace(" ", "%20"));
      panel.update();
    });
  };
};
panel.loadMenu = function(path){
  $("#content").load(("./menus/" + path + ".html").replace(" ", "%20"));
};
