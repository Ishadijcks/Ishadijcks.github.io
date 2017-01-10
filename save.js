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

	var tmp = new Date().getTime();
	player.timePlayed += tmp - player.lastSaved;
	player.lastSaved = tmp;
}



// Loads the game from localStorage and update favIcon to starter
var load = function(){
	var savegame = JSON.parse(localStorage.getItem("player"));


	for (var property in savegame) {
		if (typeof savegame[property] !== 'undefined') player[property] = savegame[property];
	}

	player.route = Math.min(25,player.route);
	player.lastSaved = new Date().getTime();

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



	if( player.version < 0.8){
		resetXp();
	}

	if( player.version < 0.91) {
		correctFossils();

		//Not changed in this version, but definitely before this one
		for(var i = 0; i<player.caughtPokemonList.length; i++){
			if(player.caughtPokemonList[i].evoLevel === "Trade"){
				player.caughtPokemonList[i].evoLevel = "Trade Stone";
			}
		}
	}

	if(player.typeShards.length <= 17) {
		updateTypes();
		player.notEffectiveTypeBonus.push(0);
		player.normalEffectiveTypeBonus.push(0);
		player.veryEffectiveTypeBonus.push(0);
		player.typeShards.push(0);
	}
	
	var date = new Date();
	if(date.getDate() !== player.lastSeen){
		dailyReset();
	}


	if(player.attackMultiplier > 1){
		resetUpgrades();
	}

	if (typeof(player.curMine.maxDailyDeals) === 'undefined') {
		player.curMine.maxDailyDeals = 3;
		player.curMine.maxDailyDealUpgrades = 0;
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
	var saveData = btoa(JSON.stringify(player));
	if(typeof FileReader != "undefined" && typeof document.getElementById("saveAsFile").download != "undefined") {
		var timestamp = new Date().toISOString();
		$("#saveAsFile").attr("download", "pokeclicker_"+timestamp+".sav").attr('href', URL.createObjectURL(new Blob([saveData])));
		$("#fileUploadButton").css({"visibility": "visible"});
	}else{
		$("#saveAsFile").attr("visibility", "hidden");
	}
	if(document.queryCommandSupported("copy")){
		$("#copyToClipboard").css({"visibility":"visible"});
	}
    $("#exportBody").html("<textarea id='saveCode' style='width:100%; height:500px'>"+saveData+"</textarea>");
	$("#exportModal").modal('show');
}

var saveDataToClipboard = function(){
	var textField = document.getElementById("saveCode");
	textField.select();
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
}

var importSave = function(){
    var save = prompt("Paste your savefile here");
    console.log(save);
    if(save) {
		restoreSave(save)
	}
}

var readSaveFile = function(file) {
	if (typeof FileReader != "undefined") {
		var fr = new FileReader();
		fr.onload = function () {
			if (fr.result) {
				restoreSave(fr.result);
			}
		};
		fr.readAsText(file);
	}
}

var restoreSave = function(save){
	try {
		var decoded = atob(save);
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

var updateTypes = function() {
	for( var i = 0; i<player.caughtPokemonList.length; i++) {
		player.caughtPokemonList[i].type = getPokemonByName(player.caughtPokemonList[i].name).type;
	}
	for (i = 0; i < numberToType.length; i++) {
		player.typeShards[i] = player.typeShards[i] || 0;
	}
}