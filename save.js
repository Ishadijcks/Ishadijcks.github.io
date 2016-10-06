			// Save and load functions
var canSave = 1;

// Saves the game by writing play to JSON and save it in localStorage
var save = function(){
	var date = new Date();
	if(date.toDateString() !== player.lastSeen){
		dailyReset();
	}
	player.lastSeen = new Date().toDateString();
	if(canSave){
		localStorage.setItem("player", JSON.stringify(player));
	}
}



// Loads the game from localStorage and update favIcon to starter
var load = function(){
	var savegame = JSON.parse(localStorage.getItem("player"));

	if (typeof savegame.clickAttack !== "undefined") player.clickAttack = savegame.clickAttack;
	if (typeof savegame.clickMultiplier !== "undefined") player.clickMultiplier = savegame.clickMultiplier;
	if (typeof savegame.attack !== "undefined") player.attack = savegame.attack;
	if (typeof savegame.attackMultiplier !== "undefined") player.attackMultiplier = savegame.attackMultiplier;
	if (typeof savegame.money !== "undefined") player.money = savegame.money;
	if (typeof savegame.moneyMultiplier !== "undefined") player.moneyMultiplier = savegame.moneyMultiplier;
	if (typeof savegame.dungeonTokens !== "undefined") player.dungeonTokens = savegame.dungeonTokens;
	if (typeof savegame.dungeonTokenMultiplier !== "undefined") player.dungeonTokenMultiplier = savegame.dungeonTokenMultiplier;
	if (typeof savegame.expMultiplier !== "undefined") player.expMultiplier = savegame.expMultiplier;
	if (typeof savegame.catchBonus !== "undefined") player.catchBonus = savegame.catchBonus;
	if (typeof savegame.route !== "undefined") player.route = savegame.route;
	if (typeof savegame.pokeballs !== "undefined") player.pokeballs = savegame.pokeballs;
	if (typeof savegame.catchTime !== "undefined") player.catchTime = savegame.catchTime;
	if (typeof savegame.caughtPokemonList !== "undefined") player.caughtPokemonList = savegame.caughtPokemonList;
	if (typeof savegame.routeKills !== "undefined") player.routeKills = savegame.routeKills;
	if (typeof savegame.starter !== "undefined") player.starter = savegame.starter;
	if (typeof savegame.upgradeList !== "undefined") player.upgradeList = savegame.upgradeList;
	if (typeof savegame.gymBadges !== "undefined") player.gymBadges = savegame.gymBadges;
	if (typeof savegame.totalCaught !== "undefined") player.totalCaught = savegame.totalCaught;
	if (typeof savegame.version !== "undefined") player.version = savegame.version;
	if (typeof savegame.routeKillsNeeded !== "undefined") player.routeKillsNeeded = savegame.routeKillsNeeded;
	if (typeof savegame.catchNumbers !== "undefined") player.catchNumbers = savegame.catchNumbers;
	if (typeof savegame.defeatNumbers !== "undefined") player.defeatNumbers = savegame.defeatNumbers;
	if (typeof savegame.oakItemSlots !== "undefined") player.oakItemSlots = savegame.oakItemSlots;
	if (typeof savegame.evoExplain !== "undefined") player.evoExplain = savegame.evoExplain;
	if (typeof savegame.mapExplain !== "undefined") player.mapExplain = savegame.mapExplain;
	if (typeof savegame.townExplain !== "undefined") player.townExplain = savegame.townExplain;
	if (typeof savegame.dungeonExplain !== "undefined") player.dungeonExplain = savegame.dungeonExplain;
	if (typeof savegame.inventoryList !== "undefined") player.inventoryList = savegame.inventoryList;
	if (typeof savegame.typeShards !== "undefined") player.typeShards = savegame.typeShards;
	if (typeof savegame.notEffectiveTypeBonus !== "undefined") player.notEffectiveTypeBonus = savegame.notEffectiveTypeBonus;
	if (typeof savegame.normalEffectiveTypeBonus !== "undefined") player.normalEffectiveTypeBonus = savegame.normalEffectiveTypeBonus;
	if (typeof savegame.veryEffectiveTypeBonus !== "undefined") player.veryEffectiveTypeBonus = savegame.veryEffectiveTypeBonus;
	if (typeof savegame.shopPriceDeviation !== "undefined") player.shopPriceDeviation = savegame.shopPriceDeviation;
	if (typeof savegame.questPoints !== "undefined") player.questPoints = savegame.questPoints;
	if (typeof savegame.curQuest !== "undefined") player.curQuest = savegame.curQuest;
	if (typeof savegame.questSkipToday !== "undefined") player.questSkipToday = savegame.questSkipToday;
	if (typeof savegame.questCompletedTotal !== "undefined") player.questCompletedTotal = savegame.questCompletedTotal;
	if (typeof savegame.questCompletedToday !== "undefined") player.questCompletedToday = savegame.questCompletedToday;
	if (typeof savegame.questCompletedDailyMax !== "undefined") player.questCompletedDailyMax = savegame.questCompletedDailyMax;
	if (typeof savegame.questDifficulty !== "undefined") player.questDifficulty = savegame.questDifficulty;
	if (typeof savegame.lastSeen !== "undefined") player.lastSeen = savegame.lastSeen;


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

	var date = new Date();
	if(date.toDateString() !== player.lastSeen){
		dailyReset();
	}


	player.version = version;

    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'images/'+player.starter+'.png';
    document.getElementsByTagName('head')[0].appendChild(link);
}
