var version = "0.93"
var inProgress = 1;
var canCatch = 1;
var attackInterval;
var maxClicks = 15;
var clicks = 0;
var fadingModal = false;
// Add new variables to the savefile!!

var firstQuest = {progress: 0, type: "defeatPokemonRoute", description: "Defeat 30 Pokemon on route 1", difficulty: 1, amount: 30, type2: 1, reward: 5, notified:0}

var player = {
	clickAttack: 1,
	clickMultiplier: 1,
	attack: 0,
	attackMultiplier: 1,
	money: 0,
	dungeonTokens: 0,
	dungeonTokenMultiplier: 1,
	moneyMultiplier: 1,
	expMultiplier:1,
	catchBonus: 5,
	route: 1,
	pokeballs: 100,
	routeVariation: 5,
	catchTime: 2000,
	caughtPokemonList: [],
	catchNumbers: Array.apply(null, Array(pokemonList.length)).map(Number.prototype.valueOf,0),
	defeatNumbers: Array.apply(null, Array(pokemonList.length)).map(Number.prototype.valueOf,0),
	routeKills: Array.apply(null, Array(100)).map(Number.prototype.valueOf,0),
	starter: "none",
	upgradeList: [],
	gymBadges: [],
	version: version,
	totalCaught: 0,
	routeKillsNeeded: 10,
	oakItemSlots: 1,
	evoExplain: 0,
	mapExplain: 0,
	townExplain: 0,
	dungeonExplain: 0,
	inventoryList: [],
	typeShards: Array.apply(null, Array(18)).map(Number.prototype.valueOf,0),
	notEffectiveTypeBonus: Array.apply(null, Array(18)).map(Number.prototype.valueOf,0),
	normalEffectiveTypeBonus: Array.apply(null, Array(18)).map(Number.prototype.valueOf,0),
	veryEffectiveTypeBonus: Array.apply(null, Array(18)).map(Number.prototype.valueOf,0),
	shopPriceDeviation: Array.apply(null, Array(100)).map(Number.prototype.valueOf,1),
	questPoints:0,
	curQuest: firstQuest,
	questSkipToday: 0,
	questCompletedTotal: 0,
	questCompletedToday: 0,
	questCompletedDailyMax: 0,
	questDifficulty: 1,
	lastSeen: new Date().getDate(),
	eggList: [null, null, null, null],
	eggSlots: 0,
	totalBred: 0,
	shinyPoints: 0,
	mineInventory: [],
	mineCoins: 0,
	curMine: {
        itemSelected: 1,
        grid: [],
        sizeX: 25,
        sizeY: 12,
        rewardGrid: [],
        itemsFound: 0,
        itemsBuried: 0,
        rewardNumbers: [],
        maxItems: 3,
        maxDailyDeals: 3,
        layersCleared: 0,
        totalItemsFound: 0,
        energy: 50,
        energyTick: 60,
        maxEnergy: 50,
        energyRegen: 60,
        energyGain: 3,
        energyRefills: 1,
        chisselEnergy: 1,
        hammerEnergy: 3,
        maxEnergyUpgrades: 0,
        energyRegenUpgrades: 0,
        maxItemsUpgrades: 0,
        maxDailyDealUpgrades: 0,
        energyGainUpgrades: 0,
        dailyDeals: [],
    },
	oakItemsEquipped: [],
	gymsDefeated: Array.apply(null, Array(15)).map(Number.prototype.valueOf,0),
	dungeonsDefeated: Array.apply(null, Array(15)).map(Number.prototype.valueOf,0),
	dateStarted: new Date(),
	timePlayed: 0,
	lastSaved: new Date().getTime(),
	totalMoney: 0,
	totalDungeonTokens: 0,
	totalQuestPoints: 0,
	totalItemsFound: 0,
	totalClicks: 0,
	totalEggsHatched: 0,
	totalMineCoins: 0,
}

var curEnemy = {
	name: "Pidgey",
	id: 0,
	health: 30,
	maxHealth: 30,
	reward: 0,
	alive: true,
	route: 0,
	catchRate: 20,
	type: "normal",
	exp: 1,
	moneyReward: 1
}


$(document).ready(function(){
	if(!(document.domain === "ishadijcks.github.io" || document.domain === "")){
		$("#siteModal").modal('show')
	}
	initTypeEffectiveness();
	//$('#changeLogModal').modal('show');

	if(localStorage.getItem("player") != null){
		load();
		generatePokemon(player.route);
	}

	else {
		$('#pickStarter').modal({backdrop: 'static', keyboard: false});
	}
	initTypeEffectiveness();
	initUpgrades();
	initOakItems();
	updateItems();
	setInterval(itemInterval, 1000);
	itemInterval();

	if(player.starter != "none"){
	updateAll();
	}

	loadTowns();
	hideAllViews()
	$("#currentEnemy").show();



	$("body").on('click',"#enemy", function(){
		clicks++;
		player.totalClicks++;
		if(clicks < maxClicks){
			if (curEnemy.alive && inProgress != 0){
				if(curEnemy.health > 0){
					curEnemy.health -= getClickAttack();
				}

				else {
					curEnemy.health = 0;
				}

				updateEnemy();
			}
		}
	});

	$("body").on('click',"#healthBar", function(){
		clicks++;
		player.totalClicks++;
		if(clicks < maxClicks){
			if (curEnemy.alive && inProgress != 0){
				if(curEnemy.health > 0){
					curEnemy.health -= getClickAttack();
				}

				else {
					curEnemy.health = 0;
				}

				updateEnemy();
			}
		}
	});

	$("body").on('click',"#gymEnemy", function(){
		clicks++;
		player.totalClicks++;
		if(clicks < maxClicks){
			if (curEnemy.alive && inProgress != 0){
				if(curEnemy.health > 0){
					curEnemy.health -= getClickAttack();
				}

				else {
					curEnemy.health = 0;
				}

				updateGym();
			}
		}
	});

	$("body").on('click',"#dungeonEnemy", function(){
		clicks++;
		player.totalClicks++;
		if(clicks < maxClicks){
			if (curEnemy.alive && inProgress != 0){
				if(curEnemy.health > 0){
					curEnemy.health -= getClickAttack();
				}

				else {
					curEnemy.health = 0;
				}

				updateDungeon();
			}
		}
	});

	$("body").on('click touchstart',".useItemButton", function(){
		var id = this.id.substring(4);
		activateItem(id);
	});




	$("body").on('click',".starter", function(){
		$("#curStarterPick").html(this.id);
		player.starter = this.id;

		var link = document.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'shortcut icon';
		link.href = 'images/'+player.starter+'.png';
		document.getElementsByTagName('head')[0].appendChild(link);

		generatePokemon(player.route);
		loadTowns();
		save();
	})

	// Picks a starter and starts the game
	$("body").on('click',"#startAdventure", function(){
		if(player.starter != "none"){
			$('#pickStarter').modal("hide")
			capturePokemon(player.starter, 0);
		}
	})

	// Allows the player buy upgrades
	$("body").on('click',".upgradeBoxes", function(){
		var id = this.id.substr(7,this.id.length);
		for( var i = 0; i<player.upgradeList.length; i++){
			if( player.upgradeList[i].id == id){
				var upgrade = player.upgradeList[i];
				if( !upgrade.bought && player.money > upgrade.cost){
					applyUpgrade(upgrade.type,upgrade.amount);
					player.upgradeList[i].bought = 1;
					player.money -= upgrade.cost;
				}
				else{
					log("Not enough money");
				}
			}
		}
		updateAll();
	})

	// Allows the player to sort his pokemon
	// Add the listeners
	$("body").on('click',"#caughtPokemon", function(){
		player.caughtPokemonList.sort(compareByName);
		updateCaughtList();
	})



	$("body").on('click',"#AttackCaughtPokemon", function(){
		player.caughtPokemonList.sort(compareByAttack);
		updateCaughtList();
	})

	$("body").on('click',"#LevelCaughtPokemon", function(){
		player.caughtPokemonList.sort(compareByLevel);
		updateCaughtList();
	})

	$("svg").on('click',"g", function(){
		var id = this.id;
		routeNumber = idToRoute(id);
		moveToRoute(routeNumber);
	})

	$("svg").on('click touchstart',"rect", function(){
		var id = this.id;
		routeNumber = idToRoute(id);
		moveToRoute(routeNumber);
	})

	$("svg").on('click touchstart',".city", function(){
		var id = this.id;
		moveToTown(id);
	})


	$("body").on('click',".gym", function(){
		var id = this.id;
		id = id.slice(0, -4);
		$("#gymModal").modal('hide');
		loadGym(id);
	})

	$("body").on('click touchstart',".dungeon", function(){
		var id = this.id;
		id = id.slice(0, -8);
		loadDungeon(id);
	})

	$("body").on('click',".shop", function(){
		var id = this.id;
		id = id.slice(0, -5);
		loadShop(id);
	})

	$("body").on('click touchstart',".dungeonRoom", function(){
		var id = parseInt(this.id.substring(4));
		moveToRoom(id);
	})

	$(document).on("keydown", function (e) {
		var keyCode = e.keyCode;


		if (keyCode == 80){
			e.preventDefault();
			safelyToggle(showPokedexModal, '#pokedexModal')
		}

		if (keyCode == 85){
			e.preventDefault();
			safelyToggle(showMineModal, '#mineModal');
		}

		if (keyCode == 88){
			e.preventDefault();
			safelyToggle(showShardModal, '#shardModal');
		}

		if (keyCode == 81){
			e.preventDefault();
			safelyToggle(showQuestModal, '#questModal');
		}

		if(inProgress == 3){
			if(keyCode == 38 || keyCode == 87){
				moveToRoom(playerPosition-currentDungeon.size);
				e.preventDefault();
			} else if(keyCode == 39 || keyCode == 68){
				moveToRoom(playerPosition+1);
				e.preventDefault();
			} else if(keyCode == 37 || keyCode == 65){
				moveToRoom(playerPosition-1);
				e.preventDefault();
			} else if(keyCode == 40 || keyCode == 83){
				moveToRoom(playerPosition+currentDungeon.size);
    			e.preventDefault();
			} else if(keyCode == 32){
				openDungeonChest();
    			e.preventDefault();
			}
		}

	});

	$("body").on('click',".wrongGym", function(){
		log("You need more badges to challenge this gym leader")
	})

	// Navbar Button controllers
	$("body").on('click',"#badgeButton", function(){
		$("#badgeModal").modal("show");
		showGymBadges();
	})

	// Navbar Button controllers
	$("body").on('click',"#questButton", function(){
		$("#questModal").modal("show");
		showCurQuest();
	})

	$("body").on('click',"#questCounter", function(){
		// No action when completing quest
		if(!questCompleted()/*already false*/ && !(player.curQuest.progress==0 && $('#smallQuestBar').width()>0)){
			$("#questModal").modal("show");
			showCurQuest();
		} else if(questCompleted()) {
			completeQuest();
		}
	})

	$("body").on('click',"#mineButton", function(){
		$("#mineModal").modal("show");
		showCurMine();
	})

		// Navbar Button controllers
	$("body").on('click',"#shardButton", function(){
		showShardModal();
	})

	$("body").on('click',".evoButton", function(){
		activateEvoStone(this.dataset.pokemon, this.id.substr(3));
		$("#evoModal").modal("hide");
	})

	$("body").on('click',".breedPokemon", function(){
		breedPokemon(this.dataset.pokemon);
	})

	$("body").on('click',".mineSquare", function(){
		squareClicked(this.dataset.i, this.dataset.j);
	})

	$("body").on('click',".shopItem", function(){
		buyShopItem(this.dataset.itemname);
	})

	$("body").on('click',"#pokedexButton", function(){
		$("#pokedexModal").modal("show");
		showPokedex();
		showGymBadges();
		showStats();
	})

	$("body").on('click',".oakItem", function(){
		var id = this.id;
		var itemId = id.substr(id.length - 1);
		activateOakItem(itemId);
	})

	$("body").on('click',"#changeLogButton", function(){
		$("#changeLogModal").modal("show");
	})


	$("body").on('click',"#chestImage", function(){
		openDungeonChest();
	})

	$.notify.addStyle('shiny', {
		html: "<div><img src=images/shinypokemon/star.png height='25px' width='auto'><span data-notify-text/></div>",
		classes: {
			base: {
				"background-color": "#f9ff92",
				"font-weight": "bold",
				"color": "#84760d",
				"padding": "5px",
				"border-radius": "10px",
			}
		}
	});

	// Logs to welcome the player
	log("Welcome to PokeClicker");
	log("Click on the pokemon to defeat them!");
	log("Earn exp and money as you defeat wild pokemons");
	log("And perhaps you'll get lucky and catch one");
	log("So they will fight wild pokemon for you!");
	log("Buy upgrades to increase your catch rate");
	log("Defeat 10 pokemon on a route to get access to the next");
	log("Have fun!");

	initPossibleEggs();
	showCurQuest();
	showEggs();
	generateDailyDeals();
});

var safelyOpen = function(modalFunc){
	if (fadingModal == false){
		fadingModal = true;
		$('.modal').modal('hide');
		setTimeout(function(){
			modalFunc();
			setTimeout(function(){fadingModal = false},500);
		},500);
	} else {
		setTimeout(function(){safelyOpen(modalFunc)},100)
	}
}

var safelyToggle = function(modalFunc, modalId){
	var show = false;
	if (fadingModal == false){
		if (!$(modalId).hasClass('in')){show = true};
		fadingModal = true;
		$('.modal').modal('hide');
		setTimeout(function(){
			if (show){
				modalFunc();
			}
			setTimeout(function(){fadingModal=false},500)
		},500);
	}
}

var showMineModal = function(){
	$("#mineModal").modal("show");
	showCurMine();
}

var showPokedexModal = function(){
	$('#pokedexModal').modal('show');
	showPokedex();
	showGymBadges();
	showStats();
}

var showQuestModal = function(){
	$("#questModal").modal("show");
	showCurQuest();
}

// Update all functions and save
var updateAll = function(){
	calculateAttack();
	updateStats();
	if( inProgress == 1){
		updateEnemy();
	}
	else if (inProgress == 2){
		updateGym();
	}
	else if (inProgress == 3){
		updateDungeon();
	}
	updateCaughtList();
	updateRoute();
	updateUpgrades();
	updateItems();
	save();
}


var pokemonsAttack = function(){
	clicks = 0;
	if(player.starter != "none" && inProgress != 0){
		curEnemy.health -= getPokemonAttack();
		updateAll();
	}
}

			// Leveling functions

// Takes the experience and returns the level it is
var experienceToLevel = function(exp,levelType){
	var level;

	switch(levelType){
	case "slow":
		level = Math.pow(exp*4/5, 1/3);
		break;
	case "medium slow":
		var y;
		for (var x = 1; x <= 100; x++){
			y=6/5*Math.pow(x, 3)-15*Math.pow(x, 2)+100*x-140
			if (exp >= y){
				level = x
			} else {
				break;
			}

		}
		break;
	case "medium fast":
		level = Math.pow(exp, 1/3);
		break;
	case "fast":
		level = Math.pow(exp * 5 / 4, 1/3);
		break;
	default:
		level = Math.pow(30*exp,0.475)/(6*Math.sqrt(5));
		break;
	}
	level = Math.min(level, (player.gymBadges.length+2)*10);
	return Math.max(1, Math.min(100,Math.floor(level)));
}

var getBonusCatchrate = function(){
	var catchRate = player.catchBonus;
	if(isActive("Magic Ball")){
		catchRate += getOakItemBonus("Magic Ball");
	}
	return catchRate;
}

var getClickAttack = function(){
	var totalMagnitude = getItemBonus("clickBoost")
	var clickAttack = Math.floor(player.clickAttack*player.clickMultiplier*totalMagnitude);
	if(isActive("Poison Barb")){
		clickAttack *= getOakItemBonus("Poison Barb");
	}
	return Math.max(1, clickAttack);
}

var getPokemonAttack = function(){
	var totalMagnitude = getItemBonus("attackBoost");
	calculateAttack();
	var pokemonAttack = Math.floor(player.attack*player.attackMultiplier*totalMagnitude);
	return Math.max(1, pokemonAttack);
}

var getItemBonus = function(type){
	var totalMagnitude = 0;
	for (var i = 0; i<player.inventoryList.length; i++){
		if (player.inventoryList[i].inUse == 1 && player.inventoryList[i].use == type){
			totalMagnitude += player.inventoryList[i].magnitude;
		}
	}
	var totalMagnitude = Math.max(1, totalMagnitude);
	return totalMagnitude;
}
var gainTokens = function(amount){
	if(amount >= 1){
		amount *= player.dungeonTokenMultiplier;

		if(isActive("Token Case")){
			money *= getOakItemBonus("Token Case")
		}
		amount = Math.floor(amount);

		var totalMagnitude = getItemBonus("tokenBoost");
		amount *= totalMagnitude;

		progressQuest('gainTokens', "none" , amount);
		player.dungeonTokens += amount;
		player.totalDungeonTokens += amount;
		if(amount == 1){
			log("You gained " + amount + " dungeon token!");
		} else {
			log("You gained " + amount + " dungeon tokens!");
		}
	}
}

var gainMoney = function(money, message){
	if(!isNaN(money)){
		money *= player.moneyMultiplier;
		var totalMagnitude = getItemBonus("coinBoost");
		money *= totalMagnitude;
		if(isActive("Amulet Coin")){
			money *= getOakItemBonus("Amulet Coin")
		}
		money = Math.floor(money);

		progressQuest('gainMoney', "none" , money);
		player.money += money
		player.totalMoney += money;
		log(message + money + "!");
	}
}

// All pokemon you have gain exp
var gainExp = function(exp,level,trainer){
	if(!isNaN(exp)){
		var multiplier = player.expMultiplier;
		var oakBonus = 1;
		if(isActive("Exp Share")){
			oakBonus = getOakItemBonus("Exp Share");
		}

		var pokedexBonusExp = pokedexBonus(player.defeatNumbers[curEnemy.id-1]);
		var totalMagnitude = getItemBonus("expBoost");

		var trainerBonus = 1;
		if(trainer == true) {
			trainerBonus = 1.5;
		}


		var expTotal = Math.floor((exp * trainerBonus * oakBonus * level * pokedexBonusExp * multiplier * totalMagnitude) / 9);
		//realgame formula: (trainerbonus * baseexp * luckyeggbonus * affectionbonus * level * tradedbonus * unevolvedbonus) / (7 * outofbattlepenalty)
		for( var i = 0; i<player.caughtPokemonList.length; i++){
			var pokemonLevel = experienceToLevel(player.caughtPokemonList[i].experience, player.caughtPokemonList[i].levelType);
			if( pokemonLevel < (player.gymBadges.length+2)*10) {
				player.caughtPokemonList[i].experience += expTotal;
			}
		}
		checkEvolution();
	} else {
		console.log("exp NaN");
	}
}


var isShiny = function(name){
	for( var i = 0; i<player.caughtPokemonList.length; i++){
		if(player.caughtPokemonList[i].name == name){
			return player.caughtPokemonList[i].shiny;
		}
	}
	return 0;
}

// When the enemy is defeated all stats are updated and a new enemy is picked
var enemyDefeated = function(){

	canCatch = 1;
	if (curEnemy.alive){
		progressEgg(Math.floor(Math.sqrt(player.route)*100)/100);
		progressQuest('defeatPokemonRoute', player.route , 1);
		progressQuest('defeatPokemon', curEnemy.id, 1);

		decreaseShopPriceDeviation();
		log("You defeated the wild "+ curEnemy.name);



		var id = getPokemonByName(curEnemy.name).id-1;
		player.defeatNumbers[id]++;


		var money = curEnemy.moneyReward;
		var exp = curEnemy.exp;
		var level = player.route * 2; 


		gainMoney(Math.floor(money), "You earned $");
		gainExp(exp,level,false);
		player.routeKills[player.route]++
		gainShards(curEnemy.type,1);
		updateRoute();
		var chance = Math.floor(Math.random()*100+1);
		if (chance < getItemChance(player.route)){
				gainRandomItem(player.route);
		}



		var catchRate = curEnemy.catchRate + getBonusCatchrate() -10;

		setTimeout(function(){

			if(alreadyCaughtShiny(curEnemy.name)){
				$("#enemyInfo").html("<br>"+curEnemy.name+" <img id=alreadyCaughtImage src=images/shinyPokeball.PNG><br><img id=pokeball src=images/Pokeball.PNG>");
            } else if(alreadyCaught(curEnemy.name)){
				$("#enemyInfo").html("<br>"+curEnemy.name+" <img id=alreadyCaughtImage src=images/Pokeball.PNG><br><img id=pokeball src=images/Pokeball.PNG>");
			}
			else{
			$("#enemyInfo").html("<br>"+curEnemy.name+" <br><img id=pokeball src=images/Pokeball.PNG>");
			}
			$("#catchDisplay").html("Catch chance: "+Math.min(100,catchRate) + "%");
			player.pokeballs--;
		}, 1);


		setTimeout(function(){
		if(canCatch){
			var chance = Math.floor(Math.random()*100+1);
			if(chance<=catchRate){
				capturePokemon(curEnemy.name, curEnemy.shiny);
				progressQuest('capturePokemonRoute', player.route , 1);

			}

			if( inProgress == 1){
				generatePokemon(player.route);
			}

			updateStats();
			updateEnemy();
			$("#catchDisplay").html("");
		}
		}, player.catchTime);

		curEnemy.alive = false;
	}
}


// Capture a pokemon by moving it to the player.caughtPokemonList
// Pokemon are adressable by name
var capturePokemon = function(name, shiny){
	var id = getPokemonByName(name).id-1;
	player.catchNumbers[id]++;
	if(!alreadyCaught(name)){
		for( var i = 0; i<pokemonList.length; i++){
			if (pokemonList[i].name == name){
				pokemonList[i].timeStamp = Math.floor(Date.now() / 1000);
				pokemonList[i].shiny = shiny;
				pokemonList[i].experience = 0;
				player.caughtPokemonList.push(pokemonList[i]);
				if(shiny){
					$.notify("You have caught a shiny "+ name +"!", {style: "shiny"})
					progressQuest('captureShinies', "none" , 1);
				}
				calculateAttack();
			}
		}
		$.notify("You successfully caught "+name, 'success');

	}

	else{

		if(shiny){
			for( var i = 0; i<player.caughtPokemonList.length; i++){
				if(player.caughtPokemonList[i].name == name){
					if(player.caughtPokemonList[i].shiny){
						player.shinyPoints++;
					}
					if(player.caughtPokemonList[i].shiny === 0 || player.caughtPokemonList[i].shiny === undefined) {
						player.caughtPokemonList[i].timeStamp = Math.floor(Date.now() / 1000);
					}
					player.caughtPokemonList[i].shiny = 1;
					$.notify("You have caught a shiny "+ name +"!", {style: "shiny"})
					progressQuest('captureShinies', "none" , 1);
					var tokens = Math.floor(Math.pow(route,1.4) - route/2);
					var deviation = Math.floor(Math.random() * 2 ) + 3;
					tokens += deviation;
					gainTokens(tokens);
				}
			}
		} else {
			var route = player.route;
			if(inProgress == 3){
				route = currentDungeon.itemRoute;
			}
			var tokens = Math.floor(Math.pow(route,1.4) - route/2);
			var deviation = Math.floor(Math.random() * 2 ) + 3;
			tokens += deviation;
			gainTokens(tokens);
		}
	}
	player.totalCaught++;
	updateCaughtList();
	updateStats();
	checkOakItems();
	sortChange();
}

// Checks if you already caught a pokemon
// Pokemon are adressable by name
var alreadyCaught = function(name){
	for( var i = 0; i<player.caughtPokemonList.length; i++){
		if (player.caughtPokemonList[i].name == name){
			return true;
		}
	}
	return false;
}

var alreadyCaughtShiny = function(name){
	for( var i = 0; i<player.caughtPokemonList.length; i++){
		if (player.caughtPokemonList[i].name == name && player.caughtPokemonList[i].shiny){
			return true;
		}
	}
	return false;
}

// Calculate the total attack of the players pokemon
var calculateAttack = function(){
	var total = 0;
	for (var i = 0; i<player.caughtPokemonList.length; i++){

		var level = experienceToLevel(player.caughtPokemonList[i].experience,player.caughtPokemonList[i].levelType);
		if( curEnemy != "undefined"){
			total += Math.ceil(level*(player.caughtPokemonList[i].attack)/100)* damageModifier(player.caughtPokemonList[i], curEnemy);
		}
	}
	player.attack = total;
	player.clickAttack = player.caughtPokemonList.length;
	return Math.max(total,1);
}

var damageModifier = function(attacker, defender) {
	var tmp = 0;
	for (var i = 0; i<attacker.type.length; i++) {
		for (var j = 0; j<defender.type.length; j++) {
			tmp += typeEffectiveness[typeToNumber(attacker.type[i])][typeToNumber(defender.type[j])];
		}
	}
	
	tmp /= attacker.type.length * defender.type.length
	return tmp;
}

var generatePokemon = function(route){
	clicks = 0;
	clearInterval(attackInterval);
	attackInterval = setInterval(pokemonsAttack,1000);
	route = route || 1;
	var decrease = 0;
	var randomPokemon;
	var legendary = generateLegendary();
	if( legendary){
		randomPokemon = getPokemonByName(legendary);
	}
	else {

		if (route <= 25){

			if(isActive("Normal Rod") && pokemonsPerRoute[route].water != undefined){
				if(pokemonsPerRoute[route].land != undefined){
					var possiblePokemons = pokemonsPerRoute[route].land.concat(pokemonsPerRoute[route].water);
				} else {
					var possiblePokemons = pokemonsPerRoute[route].water;
				}
			} else {
				if(route == 19 || route == 20){
					route = 18;
				}
				var possiblePokemons = pokemonsPerRoute[route].land;
			}



			var rand = Math.floor(Math.random()*possiblePokemons.length);
			randomPokemonName = possiblePokemons[rand]
		}

		else {
			var rand = Math.floor(Math.random()*pokemonList.length);
			randomPokemonName = pokemonList[rand].name;
		}

		randomPokemon = getPokemonByName(randomPokemonName);
	}

	//console.log(pokemonList);

	curEnemy.name = randomPokemon.name;
	curEnemy.id = randomPokemon.id;

	curEnemy.health = Math.max(Math.floor(Math.pow( (randomPokemon.health*Math.pow(route,2.2)*(Math.pow(player.caughtPokemonList.length-1),1.2)/12) ,1.15)) , 20) || 20;
	curEnemy.shiny = generateShiny();
	curEnemy.maxHealth = curEnemy.health;
	curEnemy.exp = randomPokemon.baseXpGain;
	var catchVariation = Math.floor(Math.random()*7-3);
	curEnemy.catchRate = Math.floor(Math.pow(randomPokemon.catchRate,0.75)) + catchVariation;
	curEnemy.alive = true;
	curEnemy.type = randomPokemon.type;
	var deviation = Math.floor(Math.random() * 51 ) - 25;
	curEnemy.moneyReward = Math.max(10, 3 * route + 5*Math.pow(route,1.15) + deviation);

	return randomPokemon;
}



var getPokemonByName = function(name){
	for( var i = 0; i<pokemonList.length; i++){
		if(pokemonList[i].name == name){
			return pokemonList[i];
		}
	}
}

var getCaughtPokemonByName = function(name){
	for( var i = 0; i<player.caughtPokemonList.length; i++){
		if(player.caughtPokemonList[i].name == name){
			return player.caughtPokemonList[i];
		}
	}
}

var generateLegendary = function(){
	if(player.route > 9){
		var chance;

		if(isActive("Legendary Charm")){
			chance = Math.floor(Math.random()*(5000 - player.route*100)/getOakItemBonus("Legendary Charm")+1);
		} else {
			chance = Math.floor(Math.random()*(5000 - player.route*100)+1);
		}

		if (chance <= 1){
			return "Mew";
		}
		return false;
	}
}

var generateShiny = function(){
	var chance = 8192;
	if(isActive("Shiny Charm")){
		chance /= getOakItemBonus("Shiny Charm");
	}
	var number = Math.floor(Math.random()*chance) + 1;

	if(number <= 1){
		console.log("Shiny!!!");
		return 1;
	}
	return 0;
}

var testLegendary = function(tries){
	var uno = 0;
	var dos = 0;
	var tres = 0;
	var mew = 0;
	var two = 0;
	var fail = 0;

	for( var i = 0; i<tries; i++){
		var pokemon = generateLegendary();
	if(!pokemon ){ fail++;}
	if(pokemon == "Articuno"){uno++;}
	if(pokemon == "Zapdos"){dos++;}
	if(pokemon == "Moltres"){tres++;}
	if(pokemon == "Mew"){mew++;}
	if(pokemon == "Mewtwo"){two++;}
	}
	console.log(tries+" tries");
	console.log("Articuno: "+uno);
	console.log("Zapdos: "+dos);
	console.log("Moltres: "+tres);
	console.log("Mew: "+mew);
	console.log("Mewtwo: "+two);
	console.log("False: "+fail);
}

var numberWithCommas = function(x){
	return Number(x).toLocaleString('en');
}

var numberNoCommas = function(x){
	return parseFloat(String(x).replace(/,/g, ''));
}
