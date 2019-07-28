document.getElementsByClassName("bottom")[2].innerHTML = selectedGame + " Start Settings";
var activeButtonHTML = `<i class="far fa-check-square"></i>`;
var deactiveButtonHTML = `<i class="far fa-square"></i>`;
var checkMarks = document.getElementsByClassName("entry");
var gamedir;
if(selectedGame == "Half-Life")
  gamedir = 'hl';
else if(selectedGame == "Opposing Force")
  gamedir = 'of';
else if(selectedGame == "Blue Shift")
  gamedir = 'bs';
config.read();
function fillBoxes(gameName){
  let check = function(id){
    if(!checkMarks[id].active)
      checkMarks[id].children[0].innerHTML = deactiveButtonHTML;
    else
      checkMarks[id].children[0].innerHTML = activeButtonHTML;
  };
  checkMarks[0].active = config.data.games[gameName].bxt;
  checkMarks[1].active = config.data.games[gameName].ls;
  checkMarks[2].active = config.data.games[gameName].ri;
  checkMarks[3].active = config.data.games[gameName].won;
  check(0);
  check(1);
  check(2);
  check(3);
}
fillBoxes(gamedir);
for(let i = 0; i < checkMarks.length; i++){
  checkMarks[i].addEventListener("click", (e) => {
    if(!checkMarks[i].active){
      checkMarks[i].children[0].innerHTML = activeButtonHTML;
    }else{
      checkMarks[i].children[0].innerHTML = deactiveButtonHTML;
    }
    checkMarks[i].active = !checkMarks[i].active;
  });
};
if(selectedGame == "Blue Shift") $(".won").remove();
$("#install").click(() => {
  let bxt = checkMarks[0].active;
  let ls = checkMarks[1].active;
  let ri = checkMarks[2].active;
  let won;
  if(checkMarks[3])
    won = checkMarks[3].active;
  else
    won = null;
  config.data.games[gamedir].bxt = bxt;
  config.data.games[gamedir].ls = ls;
  config.data.games[gamedir].ri = ri;
  config.data.games[gamedir].won = won;
  config.write("games", config.data.games);
  main.loadMenu("LIBRARY", () => {
    main.createNotification("Saved!");
  });
});
