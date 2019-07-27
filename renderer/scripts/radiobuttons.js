var active = 0;
var activeButtonHTML = `<i class="far fa-check-square"></i>`;
var deactiveButtonHTML = `<i class="far fa-square"></i>`;
var radioButtons = document.getElementsByClassName("entry");
radioButtons[active].active = true;
for(let i = 0; i < radioButtons.length; i++){
  if(i !== active){
    radioButtons[i].active = false;
  }
  radioButtons[i].addEventListener("click", (e) => {
    if(active != i){
      radioButtons[i].active = true;
      radioButtons[active].active = false;
      radioButtons[i].children[0].innerHTML = activeButtonHTML;
      radioButtons[active].children[0].innerHTML = deactiveButtonHTML;
      active = i;
    }
  });
};
var getActiveId = function() {
  for(let i = 0; i < radioButtons.length; i++){
    if(radioButtons[i].active) return i;
  };
};
