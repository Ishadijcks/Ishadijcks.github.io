var version = "0.55"
var inProgress = 1;
var canCatch = 1;
var attackInterval;
var maxClicks = 15;
var clicks = 0;
// Add new variables to the savefile!!
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
	inventoryList: []
}

var curEnemy = {
	name: "",
	id: 0,
	health: 0,
	maxHealth: 0,
	reward: 0,
	alive: true,
	route: 0,
	catchRate: 0
}


$(document).ready(function(){
	//$('#changeLogModal').modal('show');

    $('.tooltip').tooltipster();


	if(localStorage.getItem("player") != null){
		load();
		generatePokemon(player.route);
	}
	
	else {
		$('#pickStarter').modal({backdrop: 'static', keyboard: false});
	}
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

	$("svg").on('click',"rect", function(){
		var id = this.id;
		routeNumber = idToRoute(id);
		moveToRoute(routeNumber);
	})

	$("svg").on('click',".city", function(){
		var id = this.id;
		moveToTown(id);
	})


	$("body").on('click',".gym", function(){
		var id = this.id;
		id = id.slice(0, -4);
		loadGym(id);
	})

	$("body").on('click',".dungeon", function(){
		var id = this.id;
		id = id.slice(0, -8);
		loadDungeon(id);
	})

	$("body").on('click',".dungeonRoom", function(){
		var id = parseInt(this.id.substring(4));
		moveToRoom(id);
	})	

	$(document).on("keydown", function (e) {
		var keyCode = e.keyCode;
		if(inProgress == 3){
			if(keyCode == 38){
				moveToRoom(playerPosition-currentDungeon.size);
				e.preventDefault();
			} else if(keyCode == 39){
				moveToRoom(playerPosition+1);
				e.preventDefault();
			} else if(keyCode == 37){
				moveToRoom(playerPosition-1);
				e.preventDefault();
			} else if(keyCode == 40){
				moveToRoom(playerPosition+currentDungeon.size);
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

	$("body").on('click',"#pokedexButton", function(){
		showPokedex();
		$("#pokedexModal").modal("show");

	})		
	
	$("body").on('click',".oakItem", function(){
		var id = this.id;
		var itemId = id.substr(id.length - 1);
		activateOakItem(itemId);
	})		

	$("body").on('click',"#resetButton", function(){
		var input = prompt("Are you sure you want to delete your savefile?, enter 6 if you are!","9");
		if (input == 6){
			localStorage.clear();
			location.reload();
		}
	})
	
	$("body").on('click',"#changeLogButton", function(){
		$("#changeLogModal").modal("show");
	})


	$("body").on('click',"#chestImage", function(){
		openDungeonChest();
	})



	// Logs to welcome the player
	log("Welcome to PokeClicker");
	log("Click on the pokemon to defeat them!");
	log("Earn exp and money as you defeat wild pokemons");
	log("And perhaps you'll get lucky and catch one");
	log("So they will fight wild pokemon for you!");
	log("Buy upgrades to increase your catch rate");
	log("Defeat 10 pokemon on a route to get access to the next");
	log("Have fun!");

});


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
	var mult;
	
	switch(levelType){
	case "slow":
		mult	 = 0.8;
		break;
	case "medium slow":
		mult = 0.9;
		break;
	case "medium":
		mult = 1.0;
		break;
	case "medium fast":
		mult = 1.1;
		break;
	case "fast":
		mult = 1.2;
		break;
	default: 
		
		mult = 1;
		break;
		
	}
	exp *= mult;
	return Math.min(100,Math.floor( Math.pow(20*exp,0.5)/(6*Math.sqrt(5))));
}

var getBonusCatchrate = function(){
	var catchRate = player.catchBonus;
	if(isActive("Magic Ball")){
		catchRate += getOakItemBonus("Magic Ball");
	}
	return catchRate;
}

var getClickAttack = function(){
	var totalMagnitude = 0;
	for (var i = 0; i<player.inventoryList; i++){
		if (player.inventoryList[i].inUse == 1 && player.inventoryList[i].use == "clickBoost"){
			totalMagnitude += player.inventoryList[i].magnitude;
		}
	}
	var clickAttack = Math.floor(player.clickAttack*(player.clickMultiplier+totalMagnitude));
	if(isActive("Poison Barb")){
		clickAttack *= getOakItemBonus("Poison Barb");
	}
	return clickAttack;
}

var getPokemonAttack = function(){
	var totalMagnitude = 0;
	for (var i = 0; i<player.inventoryList; i++){
		if (player.inventoryList[i].inUse == 1 && player.inventoryList[i].use == "attackBoost"){
			totalMagnitude += player.inventoryList[i].magnitude;
		}
	}
	var pokemonAttack = Math.floor(player.attack*(player.attackMultiplier+totalMagnitude));
	return pokemonAttack;
}

var gainMoney = function(money, message){
	money *= player.moneyMultiplier;

	if(isActive("Amulet Coin")){
		money *= getOakItemBonus("Amulet Coin")
	}
	money = Math.floor(money);
	player.money += money
	log(message + money + "!"); 
}

// All pokemon you have gain exp
var gainExp = function(exp){
	exp *= player.expMultiplier
	if(isActive("Exp Share")){
		exp *= getOakItemBonus("Exp Share")
	}

	for( var i = 0; i<player.caughtPokemonList.length; i++){
		var pokemonLevel = experienceToLevel(player.caughtPokemonList[i].experience, player.caughtPokemonList[i].levelType);
		if(pokemonLevel < (1+player.gymBadges.length) * 10){
			player.caughtPokemonList[i].experience+= exp;
		}
	}
	checkEvolution();
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
		log("You defeated the wild "+ curEnemy.name);
		
		
		
		var id = getPokemonByName(curEnemy.name).id-1;
		player.defeatNumbers[id]++;
		
		var pokedexBonusExp = pokedexBonus(player.defeatNumbers[id]);
		
		var money = curEnemy.moneyReward;
		var exp = 30 + 1.2*curEnemy.moneyReward;
		exp *= pokedexBonusExp;

		gainMoney(Math.floor(money), "You earned $");
		gainExp(exp);
		player.routeKills[player.route]++
		updateRoute();
		var chance = Math.floor(Math.random()*100+1);
			if (chance > 101){
				gainRandomItem(player.route);
			}


		
		
		setTimeout(function(){ 
			
			if(alreadyCaught(curEnemy.name)){
			$("#enemyInfo").html("<br>"+curEnemy.name+" <img id=alreadyCaughtImage src=images/Pokeball.PNG><br><img id=pokeball src=images/Pokeball.PNG>");
			}
			else{
			$("#enemyInfo").html("<br>"+curEnemy.name+" <br><img id=pokeball src=images/Pokeball.PNG>");
			}
			player.pokeballs--;
		}, 1);
		
		var catchRate = curEnemy.catchRate + getBonusCatchrate() -10;
		$("#catchDisplay").html("Catch chance: "+Math.min(100,catchRate) + "%");
	
		setTimeout(function(){
		if(canCatch){
			var chance = Math.floor(Math.random()*100+1);
			if(chance<=catchRate){
				capturePokemon(curEnemy.name, curEnemy.shiny);
				
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
				player.caughtPokemonList.push(pokemonList[i]);
				if(shiny){
					$.notify("You have caught a shiny "+ name +"!", "succes")
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
					console.log(name);
					player.caughtPokemonList[i].shiny = 1;
					$.notify("You have caught a shiny "+ name +"!", "succes")
				}
			}
		} else {
		
			var deviation = Math.floor(Math.random() * 11 ) -5;
		//	console.log("Deviation: " + deviation);
			if (deviation > player.route + 1){
				var money = Math.floor(30*1*player.moneyMultiplier);
			}
			else {
				var money = Math.floor((30-deviation)*player.route/4*player.moneyMultiplier);
			}
			gainMoney(money, "You managed to sell the "+name+" for $");
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

// Calculate the total attack of the players pokemon
var calculateAttack = function(){
	var total = 0;
	for (var i = 0; i<player.caughtPokemonList.length; i++){
		
		var level = experienceToLevel(player.caughtPokemonList[i].experience,player.caughtPokemonList[i].levelType);
		total += Math.ceil(level*(player.caughtPokemonList[i].attack)/100);
	}
	player.attack = total;
	player.clickAttack = player.caughtPokemonList.length;
	return total;
}



var generatePokemon = function(route){
	clicks = 0;
	clearInterval(attackInterval);
	attackInterval = setInterval(pokemonsAttack,1000);
	var randomRoute = 0;
	var decrease = 0;

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
	curEnemy.health = Math.max(Math.floor(Math.pow( (20+randomPokemon.health*route*(player.caughtPokemonList.length-1)/16) ,1.1)), 20);
	curEnemy.shiny = generateShiny();
	curEnemy.maxHealth = curEnemy.health;

	var catchVariation = Math.floor(Math.random()*7-3);
	curEnemy.catchRate = Math.floor(Math.pow(randomPokemon.catchRate,0.75)) + catchVariation;
	curEnemy.alive = true;
	var deviation = Math.floor(Math.random() * 51 ) - 25;
	curEnemy.moneyReward = Math.max(10, 6 * route + 5*Math.pow(route,1.2) + deviation);
	return randomPokemon;
}



var getPokemonByName = function(name){
	for( var i = 0; i<pokemonList.length; i++){
		if(pokemonList[i].name == name){
			return pokemonList[i];
		}
	}
}

var generateLegendary = function(){

	if(player.route > 9){
		var chance = Math.floor(Math.random()*500+1);
		if(isActive("Legendary Charm")){
			chance *= getOakItemBonus("Legendary Charm")
		}
		if (chance < 3){
			chance = Math.floor(Math.random()*100+1);
			if(chance < 5){
				return "Mew";
			}
			if(chance < 10){
				return "Mewtwo";
			}
			if (chance < 40){
				return "Articuno";
			}
			else if (chance <70){
				return "Zapdos";
			}
			else if (chance <100){
				return "Moltres";
			}
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

var gainRandomItem = function(route){
	if(route <= 25){
		var possibleItems = itemsPerRoute[route];
		var rand = Math.floor(Math.random()*possibleItems.length);
		var randomItemName = possibleItems[rand];
	} else {
		var rand = Math.floor(Math.random()*itemList.length);
		var randomItemName = itemList[rand].name;
	}
	var randomItem = getItemByName(randomItemName).id;
	if (alreadyHaveItem(randomItemName)==true){
		var itemNum = findItemInInventory(randomItemName);
		player.inventoryList[itemNum].quantity++;
	}
	else{
		var item = itemList[randomItem-1];
		var itemObject = {id:item.id, name:item.name, quantity:1, type:item.type, use:item.use, unUse:item.unUse, time:item.time, timeleft:0, instant:item.instant, magnitude:item.magnitude, inUse:0};
		player.inventoryList.push(itemObject);
	}

	$.notify("You got a "+randomItemName, 'success');
	
	updateItems()
}

var gainItemByName = function(name){
	if (alreadyHaveItem(name)==true){
		var itemNum = findItemInInventory(name);
		player.inventoryList[itemNum].quantity++;
	}
	else{
		var item = getItemByName(name);
		var itemObject = {id:item.id, name:item.name, quantity:1, type:item.type, use:item.use, unUse:item.unUse, time:item.time, timeleft:0, instant:item.instant, magnitude:item.magnitude, inUse:0};
		player.inventoryList.push(itemObject);
	}

	$.notify("You got a "+name, 'success');

	updateItems()
}

var getItemByName = function(name){
	for( var i = 0; i<itemList.length; i++){
		if(itemList[i].name == name){
			return itemList[i];
		}
	}
}

var alreadyHaveItem = function(name){
	if(isInventoryEmpty() == true){
		return false;
	}
	else { 
		for (var i = 0; i<player.inventoryList.length; i++){
			if(player.inventoryList[i] == undefined){
				return false;
			}
			else if(player.inventoryList[i].name == name){
				return true;
			}
			else if(i==player.inventoryList.length-1){
				return false;
			}
		}
	}
}

var findItemInInventory = function(name){
	for(var i = 0; i<player.inventoryList.length; i++){
		if(player.inventoryList[i].name == name){
			return i;
		}
		else if(i==player.inventoryList.length-1){
			return false;
		}
	}
}

var isInventoryEmpty = function(){
	if (player.inventoryList.length == 0){
		return true;
	}
	else {
		for (var i = 0; i<player.inventoryList.length; i++){
			if (player.inventoryList[i].quantity != 0){
				return false;
			}
			else if(i == player.inventoryList.length-1){
				return true;
			}
		}
	}
}

var useItem = function(id){
	if(player.inventoryList[id].use == null){
		itemModalHtml = "";
		itemModalHtml += "<div class='row'><p class='oakText'>This item has no effect and cannot be used.</p>";
		$("#itemModalBody").html(itemModalHtml);
		$("#itemModal").modal('show');
		return false;
	}
	else if(player.inventoryList[id].quantity<=0){
		itemModalHtml = "";
		itemModalHtml += "<div class='row'><p class='oakText'>You don't have any of this item.</p>";
		$("#itemModalBody").html(itemModalitemModalHtml);
		$("#itemModal").modal('show');
		return false;
	}
	else if(player.inventoryList[id].inUse==1){
		itemModalHtml = "";
		itemModalHtml += "<div class='row'><p class='oakText'>You are already using this item.</p>";
		$("#itemModalBody").html(itemModalHtml);
		$("#itemModal").modal('show');
		return false;
	}
	else if(player.inventoryList[id].instant == 0){
		itemChoiceModalResult = 0;
		itemChoiceModalHtml = "";
		itemChoiceModalHtml += "<div class='row'><p class='oakText'>Would you like to use a(n) "+player.inventoryList[id].name+"?</p></div>";
		itemChoiceModalHtml += "<br><div class='row' align='center'><button id='itemModalClose' type='button' onclick='itemChoiceModalButton(1,"+id+")'>Yes</button>   <button id='itemModalClose' type='button' onclick='itemChoiceModalButton(0,"+id+")'>No</button></div>"
		$("#itemChoiceModalBody").html(itemChoiceModalHtml);
		$("#itemChoiceModal").modal('show');
	}
	else {
		// instant item effects
	}
}

var itemInterval = function(){
	for (var i = 0; i<player.inventoryList.length; i++){
		if (player.inventoryList[i].inUse == 1){
			if (player.inventoryList[i].timeLeft != 0){
				player.inventoryList[i].timeLeft--;
			}
			else{
				player.inventoryList[i].inUse = 0;
				$.notify("The effects of your "+player.inventoryList[i].name+" ran out.", "succes")
			}
			updateItems();
			updateStats();
		}
	}
}

var itemChoiceModalButton = function(result, id){
	item = player.inventoryList[id]
	$('#itemChoiceModal').modal('hide');
	if(result == 1){
		item.timeLeft = item.time;
		item.inUse = 1;
		item.quantity--;
		$.notify("You used a(n) "+item.name+".", "succes")
		return true;
	}
	else{
		return false;
	}
	updateAll();
}