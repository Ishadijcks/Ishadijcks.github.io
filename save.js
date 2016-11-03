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
var load = function(savegame){

	if ((typeof savegame.clickAttack == "undefined") 
	|| (typeof savegame.clickMultiplier == "undefined") 
	|| (typeof savegame.attack == "undefined") 
	|| (typeof savegame.attackMultiplier == "undefined") 
	|| (typeof savegame.money == "undefined") 
	|| (typeof savegame.moneyMultiplier == "undefined") 
	|| (typeof savegame.dungeonTokens == "undefined") 
	|| (typeof savegame.dungeonTokenMultiplier == "undefined") 
	|| (typeof savegame.expMultiplier == "undefined") 
	|| (typeof savegame.catchBonus == "undefined") 
	|| (typeof savegame.route == "undefined") 
	|| (typeof savegame.pokeballs == "undefined") 
	|| (typeof savegame.catchTime == "undefined") 
	|| (typeof savegame.caughtPokemonList == "undefined") 
	|| (typeof savegame.routeKills == "undefined") 
	|| (typeof savegame.starter == "undefined") 
	|| (typeof savegame.upgradeList == "undefined") 
	|| (typeof savegame.gymBadges == "undefined") 
	|| (typeof savegame.totalCaught == "undefined") 
	|| (typeof savegame.version == "undefined") 
	|| (typeof savegame.routeKillsNeeded == "undefined") 
	|| (typeof savegame.catchNumbers == "undefined") 
	|| (typeof savegame.defeatNumbers == "undefined") 
	|| (typeof savegame.oakItemSlots == "undefined") 
	|| (typeof savegame.evoExplain == "undefined") 
	|| (typeof savegame.mapExplain == "undefined") 
	|| (typeof savegame.townExplain == "undefined") 
	|| (typeof savegame.dungeonExplain == "undefined") 
	|| (typeof savegame.inventoryList == "undefined") 
	|| (typeof savegame.typeShards == "undefined") 
	|| (typeof savegame.notEffectiveTypeBonus == "undefined") 
	|| (typeof savegame.normalEffectiveTypeBonus == "undefined") 
	|| (typeof savegame.veryEffectiveTypeBonus == "undefined") 
	|| (typeof savegame.shopPriceDeviation == "undefined") 
	|| (typeof savegame.questPoints == "undefined") 
	|| (typeof savegame.curQuest == "undefined") 
	|| (typeof savegame.questSkipToday == "undefined") 
	|| (typeof savegame.questCompletedTotal == "undefined") 
	|| (typeof savegame.questCompletedToday == "undefined") 
	|| (typeof savegame.questCompletedDailyMax == "undefined") 
	|| (typeof savegame.questDifficulty == "undefined") 
	|| (typeof savegame.lastSeen == "undefined") 
	|| (typeof savegame.eggList == "undefined") 
	|| (typeof savegame.eggSlots == "undefined") 
	|| (typeof savegame.shinyPoints == "undefined") 
	|| (typeof savegame.mineInventory == "undefined") 
	|| (typeof savegame.mineCoins == "undefined") 
	|| (typeof savegame.curMine == "undefined") 
	|| (typeof savegame.totalBred == "undefined")) {
		return "undefined"
	}

	player.clickAttack = savegame.clickAttack;
	player.clickMultiplier = savegame.clickMultiplier;
	player.attack = savegame.attack;
	player.attackMultiplier = savegame.attackMultiplier;
	player.money = savegame.money;
	player.moneyMultiplier = savegame.moneyMultiplier;
	player.dungeonTokens = savegame.dungeonTokens;
	player.dungeonTokenMultiplier = savegame.dungeonTokenMultiplier;
	player.expMultiplier = savegame.expMultiplier;
	player.catchBonus = savegame.catchBonus;
	player.route = savegame.route;
	player.pokeballs = savegame.pokeballs;
	player.catchTime = savegame.catchTime;
	player.caughtPokemonList = savegame.caughtPokemonList;
	player.routeKills = savegame.routeKills;
	player.starter = savegame.starter;
	player.upgradeList = savegame.upgradeList;
	player.gymBadges = savegame.gymBadges;
	player.totalCaught = savegame.totalCaught;
	player.version = savegame.version;
	player.routeKillsNeeded = savegame.routeKillsNeeded;
	player.catchNumbers = savegame.catchNumbers;
	player.defeatNumbers = savegame.defeatNumbers;
	player.oakItemSlots = savegame.oakItemSlots;
	player.evoExplain = savegame.evoExplain;
	player.mapExplain = savegame.mapExplain;
	player.townExplain = savegame.townExplain;
	player.dungeonExplain = savegame.dungeonExplain;
	player.inventoryList = savegame.inventoryList;
	player.typeShards = savegame.typeShards;
	player.notEffectiveTypeBonus = savegame.notEffectiveTypeBonus;
	player.normalEffectiveTypeBonus = savegame.normalEffectiveTypeBonus;
	player.veryEffectiveTypeBonus = savegame.veryEffectiveTypeBonus;
	player.shopPriceDeviation = savegame.shopPriceDeviation;
	player.questPoints = savegame.questPoints;
	player.curQuest = savegame.curQuest;
	player.questSkipToday = savegame.questSkipToday;
	player.questCompletedTotal = savegame.questCompletedTotal;
	player.questCompletedToday = savegame.questCompletedToday;
	player.questCompletedDailyMax = savegame.questCompletedDailyMax;
	player.questDifficulty = savegame.questDifficulty;
	player.lastSeen = savegame.lastSeen;
	player.eggList = savegame.eggList;
	player.eggSlots = savegame.eggSlots;
	player.shinyPoints = savegame.shinyPoints;
	player.mineInventory = savegame.mineInventory;
	player.mineCoins = savegame.mineCoins;
	player.curMine = savegame.curMine;
	player.totalBred = savegame.totalBred;
	if (typeof savegame.oakItemsEquipped !== "undefined") player.oakItemsEquipped = savegame.oakItemsEquipped;
	if (typeof savegame.dailyDeals !== "undefined") player.dailyDeals = savegame.dailyDeals;

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
	if(save) {
		var decoded = atob(save);
		if (decoded) {
			var saveCheck = load(JSON.parse(decoded));
			if (saveCheck !== "undefined") {
				localStorage.setItem("player", decoded);
				canSave = 0;
				location.reload();
			} else {
				$.notify("This is not a valid savefile", "error");
			}
		} else {
			$.notify("This is not a valid savefile", "error");
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
