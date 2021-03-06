selected.forEach((a) => {
  let binds = presets[a].binds;
  if(binds)
    binds.forEach(bind => {
      let entry = document.createElement("div");
      entry.section = a;
      entry.bind = bind;
      entry.className = "panel-entry";
      let bind_key = document.createElement("input");
      let bind_command = document.createElement("input");
      bind_command.type = bind_key.type = "text";
      bind_key.value = bind.key;
      bind_command.value = bind.command;
      bind_key.className = "bind-key";
      bind_command.className = "bind-command";
      bind_command.setAttribute("readonly", "true");
      let bind_desc = document.createElement("div");
      bind_desc.className = "bind-description";
      bind_desc.innerHTML = bind.description;
      entry.append(bind_key);
      entry.append(bind_command);
      entry.append(bind_desc);
      $(".panel-content").append(entry);
    });
});

$("#save").click(() => {
  let entries = document.getElementsByClassName("panel-entry");
  for(let i = 0; i < entries.length; i++){
    for(let section in config_builder.data){
      let binds = config_builder.data[section].binds;
      if(binds){
        let result = binds.find(x => x.command == entries[i].bind.command && x.description == entries[i].bind.description);
        if(result) {
          result.key = entries[i].childNodes[0].value;
        };
      };
    };
  };
  config_builder.save();
  main.loadMenu("CONFIG BUILDER", () => {
    main.createNotification("Saved!");
  });
});
$("#back").click(() => {
  main.loadMenu("CONFIG BUILDER");
});
