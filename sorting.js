	// Sorting functions
	
function compareByName(a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  if(a.id > b.id){
    return 1;
  }
  if(a.id < b.id){
    return -1;
  }
  return 0;
}	

function compareById(a,b) {
  if (a.id < b.id)
    return -1;
  if (a.id > b.id)
    return 1;
  return 0;
}

function compareByTimeStamp(a,b) {
  if (a.timeStamp < b.timeStamp)
    return -1;
  if (a.timeStamp > b.timeStamp)
    return 1;
  return 0;
}

function compareByRecent(a,b) {
  if (a.timeStamp > b.timeStamp)
    return -1;
  if (a.timeStamp < b.timeStamp)
    return 1;
  if (a.timeStamp == b.timeStamp){
    if(a.id > b.id){
      return 1;
    }
    if(a.id < b.id){
      return -1;
    }
  }
  return 0;
}

function compareByShiny(a,b) {
  if (a.shiny > b.shiny || b.shiny === undefined)
    return -1;
  if (a.shiny < b.shiny || a.shiny === undefined)
    return 1;
  if (a.shiny == b.shiny){
    if(a.timeStamp > b.timeStamp){
      return -1;
    }
    if(a.timeStamp < b.timeStamp){
      return 1;
    }
  }
  return 0;
}


function compareByCatchRate(a,b) {
  if (a.catchRate < b.catchRate)
    return -1;
  if (a.catchRate > b.catchRate)
    return 1;
  if(a.id > b.id){
    return 1;
  }
  if(a.id < b.id){
    return -1;
  }
  return 0;
}

function compareByLevel(a,b) {
  var aAttack = experienceToLevel(a.experience,a.levelType)*a.attack/100;
  var bAttack = experienceToLevel(b.experience,b.levelType)*b.attack/100;
  if (experienceToLevel(a.experience,a.levelType) > experienceToLevel(b.experience,b.levelType))
    return -1;
  if (experienceToLevel(a.experience,a.levelType) < experienceToLevel(b.experience,b.levelType))
    return 1;
  if (aAttack> bAttack)
    return -1;
  if (aAttack < bAttack)
    return 1;
  if(a.id > b.id){
    return 1;
  }
  if(a.id < b.id){
    return -1;
  }
  return 0;
}

function compareByAttack(a,b) {
	var aAttack = experienceToLevel(a.experience,a.levelType)*a.attack/100;
	var bAttack = experienceToLevel(b.experience,b.levelType)*b.attack/100;
  if (aAttack> bAttack)
    return -1;
  if (aAttack < bAttack)
    return 1;
  if(a.id > b.id){
    return 1;
  }
  if(a.id < b.id){
    return -1;
  }
  return 0;
}


var sortChange = function() {
    var selectBox = document.getElementById("sortBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  switch(selectedValue){
    case "name": 
      player.caughtPokemonList.sort(compareByName);
      break;
    case "id":
      player.caughtPokemonList.sort(compareById);
      break;
    case "attack":
      player.caughtPokemonList.sort(compareByAttack);
      break;
    case "level":
      player.caughtPokemonList.sort(compareByLevel);
      break;
    case "time":
      player.caughtPokemonList.sort(compareByTimeStamp);
      break;
    case "recent":
      player.caughtPokemonList.sort(compareByRecent);
      break;
    case "catchRate":
      player.caughtPokemonList.sort(compareByCatchRate);
      break;
    case "shiny":
      player.caughtPokemonList.sort(compareByShiny);
          break;
  }
  
  updateCaughtList();
}
