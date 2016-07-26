			// Save and load functions

// Saves the game by writing play to JSON and save it in localStorage			
var save = function(){
	localStorage.setItem("player", JSON.stringify(player));
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
	if (typeof savegame.oakItemList !== "undefined") player.oakItemList = savegame.oakItemList;
	if (typeof savegame.oakItemSlots !== "undefined") player.oakItemSlots = savegame.oakItemSlots;
	if (typeof savegame.evoExplain !== "undefined") player.evoExplain = savegame.evoExplain;
	if (typeof savegame.mapExplain !== "undefined") player.mapExplain = savegame.mapExplain;
	if (typeof savegame.townExplain !== "undefined") player.townExplain = savegame.townExplain;
	
	if(player.version < version){
		$('#changeLogModal').modal('show');
	}

	if(player.version < 0.51){
		if(player.oakItemList[2].image != undefined){
			player.oakItemList[2].image = "images/oak/amuletCoin.png";
		}
	}



	player.version = version;
	
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'images/'+player.starter+'.png';
    document.getElementsByTagName('head')[0].appendChild(link);
}	