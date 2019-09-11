$(".hl").click(() => {
  selectedGame = "Half-Life";
});
$(".bs").click(() => {
  selectedGame = "Blue Shift";
});
$(".of").click(() => {
  selectedGame = "Opposing Force";
});

$("#playHL").click(() => {
  let game = 'valve';

  let bxt = config.data.games['hl'].bxt;
  let ri = config.data.games['hl'].ri;
  let ls = config.data.games['hl'].ls;
  let won = config.data.games['hl'].won;

  if(won) game = "valve_WON";
  let args = [game];
  if(bxt) args.push("-bxt");
  if(ri) args.push("-ri");
  if(ls) args.push("-ls");
  startApp("run", args);
  main.createNotification(lang[lang_selected].starting_game);
});
$("#playBS").click(() => {
  let game = 'bshift';

  let bxt = config.data.games['bs'].bxt;
  let ri = config.data.games['bs'].ri;
  let ls = config.data.games['bs'].ls;

  let args = [game];
  if(bxt) args.push("-bxt");
  if(ri) args.push("-ri");
  if(ls) args.push("-ls");
  startApp("run", args);
  main.createNotification(lang[lang_selected].starting_game);
});
$("#playOF").click(() => {
  let game = 'gearbox';

  let bxt = config.data.games['of'].bxt;
  let ri = config.data.games['of'].ri;
  let ls = config.data.games['of'].ls;
  let won = config.data.games['of'].won;

  if(won) game = "gearbox_WON";
  let args = [game];
  if(bxt) args.push("-bxt");
  if(ri) args.push("-ri");
  if(ls) args.push("-ls");
  startApp("run", args);
  main.createNotification(lang[lang_selected].starting_game);
});
$("#playGC").click(() => {
  let game = 'rewolf';
  let args = [game];
  startApp("run", args);
  main.createNotification(lang[lang_selected].starting_game);
});
