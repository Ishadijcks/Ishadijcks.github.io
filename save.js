			// Save and load functions
var canSave = 1;

// Saves the game by writing play to JSON and save it in localStorage
var save = function(){
	var date = new Date();
	if(date.getDate() !== player.lastSeen){
		dailyReset();
	}
	player.lastSeen = new Date().getDate();
	if(canSave){
		localStorage.setItem("player", JSON.stringify(player));
	}
}



// Loads the game from localStorage and update favIcon to starter
var load = function(){
	var savegame = JSON.parse(localStorage.getItem("player"));


	for (var property in savegame) {
		if (typeof savegame[property] !== 'undefined') player[property] = savegame[property];
	}
	

    if(player.starter === "none"){
        $("#pickStarter").modal('show');
    }

	if(player.version < version){
		$('#changeLogModal').modal('show');
	}

	if(player.version < 0.6){
		resetUpgrades();
	}

	if(player.version < 0.71){
		player.questSkipToday = Math.max(0, player.questSkipToday-4);
	}

	for(var i = 0; i<player.caughtPokemonList.length; i++){
		if(player.caughtPokemonList[i].evoLevel === "Trade"){
			player.caughtPokemonList[i].evoLevel = "Trade Stone";
		}
	}

	if( player.version < 0.8){
		resetXp();
	}

	if( player.version < 0.91) {
		correctFossils();
	}
	
	var date = new Date();
	if(date.getDate() !== player.lastSeen){
		dailyReset();
	}


	if(player.attackMultiplier > 1){
		resetUpgrades();
	}

	player.catchTime = Math.max(player.catchTime,750);
	player.version = version;

    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'images/'+player.starter+'.png';
    document.getElementsByTagName('head')[0].appendChild(link);
}

var exportSave = function(){
    $("#exportBody").html("<textarea id='saveCode' style='width:100%; height:500px'>"+btoa(JSON.stringify(player))+"</textarea>");
	$("#exportModal").modal('show');
}

var importSave = function(){
    var save = prompt("Paste your savefile here");
    console.log(save);
    if(save) {
		try {
			var decoded = atob(save)
			JSON.parse(decoded);
			if (decoded) {
				localStorage.setItem("player", decoded);
				canSave = 0;
				location.reload();
			} else {
				$.notfiy("This is not a valid savefile", "error")
			}
        } catch(err){
			$.notify("This is not a valid savefile");
		}

	}
}

var confirmReset = function() {
    var input = prompt("Are you sure you want to delete your savefile?, enter 6 if you are!", "9");
    if (input == 6) {
        canSave = 0;
        localStorage.clear();
        location.reload();
    }
}

var resetXp = function(){
	for( var i = 0; i<player.caughtPokemonList.length; i++){
		player.caughtPokemonList[i].experience = 0;
	}
	$.notify("Your exp has been reset for balancing purposes.")
}

var correctFossils = function() {
	for ( var i = 0; i<player.mineInventory.length; i++) {
		if (player.mineInventory[i].id < 4 && player.mineInventory[i].value != 0) {
			player.mineInventory[i].value = 0;
		}
	}
}
