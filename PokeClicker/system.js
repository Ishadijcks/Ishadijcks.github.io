var version = "0.1"



var alreadyUpgrade = function(name){
	for( var i = 0; i<player.upgradeList.length;i++){
		if( player.upgradeList[i].name == name){
			return true;
		}
	}
	return false;
}

var alreadyUpgradeId = function(id){
	for( var i = 0; i<player.upgradeList.length;i++){
		if( player.upgradeList[i].id == id){
			return player.upgradeList[i].bought == 1;
		}
	}

}

// Add an upgrade to the upgradeList
// An upgrade consists of a name, money cost, what stat it upgrades, some flavorText, and other upgrades that might be required to buy it
var addUpgrade = function(name,cost,type,amount,require,flavorText, requiredUpgrade){

	var temp = {
		id: player.upgradeList.length,
		name: name,
		cost: cost,
		type: type,
		amount: amount,
		bought:0,
		require:require,
		flavorText:flavorText,
		requiredUpgrade: requiredUpgrade
	}
	if( !alreadyUpgrade(name)){
	player.upgradeList.push(temp);
	}
}

// 	clickAttack: 1,
//	clickMultiplier: 1,
//	attack: 0,
//	attackMultiplier: 1,
//	money: 0,
//	moneyMultiplier: 1,
//	expMultiplier:1,
//	catchBonus: 25,
//	routeVariation: 5,
//	catchTime: 3000,
//									name,cost,type,amount,require,flavorText
var initUpgrades = function(){
	addUpgrade("Pokeball upgrade I",1000, "catchBonus",3,0,"New technology gives you a 3% bonus to catch rate",null); 
	addUpgrade("Pokeball upgrade II",5000, "catchBonus",3,3,"New technology gives you a 3% bonus to catch rate",0); 
	addUpgrade("Pokeball upgrade III",10000, "catchBonus",3,5,"New technology gives you a 3% bonus to catch rate",1); 
	addUpgrade("Pokeball upgrade IV",25000, "catchBonus",3,7,"New technology gives you a 3% bonus to catch rate",2); 
	addUpgrade("Pokeball upgrade V",75000, "catchBonus",10,10,"New technology gives you a 10% bonus to catch rate",3); 
	addUpgrade("Experience upgrade I",500, "expMultiplier",0.10,0,"New technology gives you a 10% bonus to experience gain",null); 
	addUpgrade("Experience upgrade II",5000, "expMultiplier",0.10,1,"New technology gives you a 10% bonus to experience gain",5); 
	addUpgrade("Experience upgrade III",50000, "expMultiplier",0.10,4,"New technology gives you a 10% bonus to experience gain",6); 
	addUpgrade("Experience upgrade IV",100000, "expMultiplier",0.10,6,"New technology gives you a 10% bonus to experience gain",7); 
	addUpgrade("Experience upgrade V",500000, "expMultiplier",0.20,12,"New technology gives you a 20% bonus to experience gain",8); 
	addUpgrade("Catch time upgrade I",2000, "catchTime",250,0,"Decrease the catch time by 250 milliseconds",null); 
	addUpgrade("Catch time upgrade II",10000, "catchTime",250,2,"Decrease the catch time by 250 milliseconds",10); 
	addUpgrade("Catch time upgrade III",25000, "catchTime",500,5,"Decrease the catch time by half a second",11); 
	addUpgrade("Catch time upgrade IV",75000, "catchTime",500,8,"Decrease the catch time by half a second",12); 
	addUpgrade("Catch time upgrade V",1000000, "catchTime",1000,15,"Decrease the catch time by a whole second",13); 
	addUpgrade("Money multiplier upgrade I",1500, "moneyMultiplier",0.25,0,"Gain 25% more money",null); 
	addUpgrade("Money multiplier upgrade II",4000, "moneyMultiplier",0.30,3,"Gain 30% more money",15); 
	addUpgrade("Money multiplier upgrade III",10000, "moneyMultiplier",0.35,6,"Gain 35% more money",16); 
	addUpgrade("Money multiplier upgrade IV",25000, "moneyMultiplier",0.40,10,"Gain 40% more money",17); 
	addUpgrade("Money multiplier upgrade V",50000, "moneyMultiplier",0.50,16,"Gain 50% more money",18); 
	addUpgrade("Click multiplier upgrade I",100, "clickMultiplier",1,0,"Clicks do 100% more damage",null); 
	addUpgrade("Click multiplier upgrade II",500, "clickMultiplier",1,2,"Clicks do 100% more damage",20); 
	addUpgrade("Click multiplier upgrade III",1000, "clickMultiplier",1,5,"Clicks do 100% more damage",21); 
	addUpgrade("Click multiplier upgrade IV",2500, "clickMultiplier",1,7,"Clicks do 100% more damage",22); 
	addUpgrade("Click multiplier upgrade V",5000, "clickMultiplier",1,10,"Clicks do 100% more damage",23); 
}

var player = {
	clickAttack: 1,
	clickMultiplier: 1,
	attack: 0,
	attackMultiplier: 1,
	money: 0,
	moneyMultiplier: 1,
	expMultiplier:1,
	catchBonus: 5,
	route: 1,
	pokeballs: 100,
	routeVariation: 5,
	catchTime: 3000,
	caughtPokemonList: [],
	routeKills: Array.apply(null, Array(100)).map(Number.prototype.valueOf,0),
	starter: "none",
	upgradeList: [],
	gymBadges: 0,
	version: version,
	totalCaught: 0
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
 //TODO uncomment this for release
//	$('#changeLogModal').modal('show');
 
	if(localStorage.getItem("player") != null){
		load();
		generatePokemon(player.route);
	}
	
	else {
		$('#pickStarter').modal({backdrop: 'static', keyboard: false});
	}
	initUpgrades();

	
	if(player.starter != "none"){
	updateAll();
	}
	
	setInterval(function(){
		if(player.starter != "none"){
		curEnemy.health -= player.attack*player.attackMultiplier;
		updateAll();
		}
	},1000);

	$("body").on('click',"#enemy", function(){
		if (curEnemy.alive){
			if(curEnemy.health > 0){
				curEnemy.health -= player.clickAttack*player.clickMultiplier;
			}			
			
			else {
				curEnemy.health = 0;
			}
			
			updateEnemy();
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
		
		save();
	})
	
	// Picks a starter and starts the game
	$("body").on('click',"#startAdventure", function(){
		if(player.starter != "none"){
			$('#pickStarter').modal("hide")
			capturePokemon(player.starter);
		}
	})
	
	// Allows the player to move to the previous route
	$("body").on('click',"#routeLeft", function(){
	if(curEnemy.alive){
		player.route--;
		generatePokemon(player.route);
		updateAll();
		}
		else{
	log("You can't switch routes while catching a pokemon");
	}
	})
	
	// Allows the player to move to the next route
	$("body").on('click',"#routeRight", function(){
	if(curEnemy.alive){
		player.route++;
		generatePokemon(player.route);
		updateAll();
	}
	else{
	log("You can't switch routes while catching a pokemon");
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
		updateUpgrades();
	})

	// Allows the player to sort his pokemon
	

	
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
	

	// Navbar Button controllers
	$("body").on('click',"#badgeButton", function(){
		$("#badgeModal").modal("show");
		for (var i = 1; i<=player.gymBadges; i++){
			$("#Badge"+i).fadeTo("slow",1);
		}
	})

	$("body").on('click',"#pokedexButton", function(){
		$("#pokedexModal").modal("show");

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
	// Logs to welcome the player
	log("Welcome to PokeClicker");
	log("Click on the pokemon to defeat them!");
	log("Earn exp and money as you defeat wild pokemons");
	log("And perhaps you'll get lucky and catch one");
	log("So they will fight wild pokemon for you!");
	log("Buy upgrades to increase your catch rate");
	log("Defeat 5 pokemon on a route to get access to the next");
	log("Have fun!");

});

var sortChange = function() {
    var selectBox = document.getElementById("sortBox");
	
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
   console.log(selectedValue); 
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
		case "catchRate":
			player.caughtPokemonList.sort(compareByCatchRate);
	}
	
	updateCaughtList();
}


// Update all functions and save
var updateAll = function(){
	calculateAttack();
	updateStats();
	updateEnemy();
	updateCaughtList();
	updateRoute();
	updateUpgrades();
	save();
}

// Returns true if the player has access to this route
var accessToRoute = function(route){
	for (var i = 1; i<route; i++){
		if(player.routeKills[i] < 5 || player.routeKills[i] == undefined){
			return false;
		}
	}
	return true;
}

// Here I can add all upgradeTypes
var applyUpgrade = function(type, amount){
	switch(type){
		case "catchBonus":
			player.catchBonus += amount;
			log("Your catch bonus is increased by "+amount+ "%");
			break;
		case "catchTime":
			player.catchTime -= amount;
			log("Your catch time is decreased by "+amount+ " milliseconds");
			break;
		case "moneyMultiplier":
			player.moneyMultiplier += amount;
			log("Your money multiplier is increased by "+amount);
			break;
		case "expMultiplier":
			player.expMultiplier += amount;
			log("Your exp multiplier is increased by "+amount);
			break;
		case "clickAttack":
			player.clickAttack += amount;
			log("Your click attack is increased by "+amount);
			break;
		case "clickMultiplier":
			player.clickMultiplier += amount;
			log("Your click attack multiplier is increased by "+amount);
			break;		
		case "routeVariation":
			player.routeVariation -= amount;
			log("Your route variation is decreased by "+amount);
			break;		
		case "attackMultiplier":
			player.attackMultiplier += amount;
			log("Your pokemon attack multiplier is increased by "+amount);
			break;					
		default:
			console.log("This should never happen, contact the developer immediately!");
			break;

	}	
		updateStats();
}

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
	
	
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'images/'+player.starter+'.png';
    document.getElementsByTagName('head')[0].appendChild(link);
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
	return Math.min(100,Math.floor(-5/4 + Math.sqrt(8*exp +125)/(6*Math.sqrt(5))));
}

// All pokemon you have gain exp
var getExp = function(exp){
	for( var i = 0; i<player.caughtPokemonList.length; i++){
		player.caughtPokemonList[i].experience+= exp*player.expMultiplier;
	}
	checkEvolution();
}

// Update the health of the current enemy
var updateEnemy = function(){
	if (curEnemy.health <0){
		curEnemy.health = 0;
	}
	if(curEnemy.health == 0 ){
		enemyDefeated();
	}
	if (curEnemy.alive){
		if(alreadyCaught(curEnemy.name)){
			$("#enemyInfo").html("<br>"+curEnemy.name+" <img id=alreadyCaughtImage src=images/Pokeball.PNG><br><img id=enemy src=images/"+curEnemy.id+".png>");
		}
		else{
			$("#enemyInfo").html("<br>"+curEnemy.name+"<br><img id=enemy src=images/"+curEnemy.id+".png>");
		}
	}
		$("#healthBar").width(100*curEnemy.health/curEnemy.maxHealth+"%"); 
		$("#healthDisplay").html(curEnemy.health+"/"+curEnemy.maxHealth);
}

// When the enemy is defeated all stats are updated and a new enemy is picked
var enemyDefeated = function(){
	if (curEnemy.alive){
		log("You defeated the wild "+ curEnemy.name);
		
		var money = curEnemy.moneyReward;
		var exp = 30+ 0.8*curEnemy.moneyReward;
		
		
		money *= player.moneyMultiplier
		player.money += Math.floor(money);
		getExp(exp);
		player.routeKills[player.route]++
		updateRoute();
		log("You earned $" + Math.floor(money) + "!");

		var catchRate = curEnemy.catchRate + player.catchBonus-10;
		$("#catchDisplay").html("Catch chance: "+Math.min(100,catchRate));
		
		setTimeout(function(){ 
			
			if(alreadyCaught(curEnemy.name)){
			$("#enemyInfo").html("<br>"+curEnemy.name+" <img id=alreadyCaughtImage src=images/Pokeball.PNG><br><img height=96px width=96px id=pokeball src=images/Pokeball.PNG>");
			}
			else{
			$("#enemyInfo").html("<br>"+curEnemy.name+" <br><img height=96px width=96px id=pokeball src=images/Pokeball.PNG>");
			}
			player.pokeballs--;
		}, 1);
		

	
		setTimeout(function(){
			var chance = Math.floor(Math.random()*100+1);
			if(chance<=curEnemy.catchRate+player.catchBonus){
				capturePokemon(curEnemy.name);
				
			}
		
		generatePokemon(player.route);
		updateStats();
		updateEnemy();
		$("#catchDisplay").html("");
		}, player.catchTime);
		
		curEnemy.alive = false;
	}
}


// Capture a pokemon by moving it to the player.caughtPokemonList
// Pokemon are adressable by name
var capturePokemon = function(name){
	if(!alreadyCaught(name)){
		for( var i = 0; i<pokemonList.length; i++){
			if (pokemonList[i].name == name){
				pokemonList[i].timeStamp = Math.floor(Date.now() / 1000);
				player.caughtPokemonList.push(pokemonList[i]);
				calculateAttack();
			}
		}
		log("You successfully caught "+name);
		
	}
	
	else{
		log(name+" has already been caught!");
		x

		var deviation = Math.floor(Math.random() * 11 ) -5;
		console.log("Deviation: " + deviation);
		if (deviation > player.route + 1){
			var getMoney = Math.floor(30*1*player.moneyMultiplier);
		}
		else {
			var getMoney = Math.floor(30-deviation*player.route*player.moneyMultiplier);
		}
		log("You managed to sell the "+name+" for $" + getMoney + "!");
		player.money += getMoney;
	}
	player.totalCaught++;
	updateCaughtList();
	updateStats();
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


// Takes a route and spits out a pokemon that can be found on the route
// Can be done more efficient:
// Let correctRoute return all pokemon on a route
// Choose random from that set
// TODO
var generatePokemon = function (route){
	var randomRoute = 0;
	var decrease = 0;

	var legendary = generateLegendary();
	if( legendary){
		randomPokemon = getPokemonByName(legendary);
	}
	else {
		if(route == 19 || route == 20){
			route = 18;
		}
		if( route > 25){
			route = 25
		}
		var possiblePokemons = pokemonsPerRoute[route].land;
		console.log(possiblePokemons);
		var rand = Math.floor(Math.random()*possiblePokemons.length);
		console.log("Rand: " + rand);
		randomPokemonName = possiblePokemons[rand]
		randomPokemon = getPokemonByName(randomPokemonName);
	}
		
	//console.log(pokemonList);
	curEnemy.name = randomPokemon.name;
	curEnemy.id = randomPokemon.id;
	curEnemy.health = 20+randomPokemon.health*1/4*route*(player.caughtPokemonList.length-1);

	curEnemy.maxHealth = curEnemy.health;
	curEnemy.catchRate = Math.floor(Math.pow(randomPokemon.catchRate,0.8));
	curEnemy.alive = true;
	curEnemy.moneyReward = 30 + 3*Math.pow(route,1.2);
	return randomPokemon;
}

var checkEvolution = function(){
	for( var i = 0; i<player.caughtPokemonList.length; i++){
		if(player.caughtPokemonList[i].evoLevel != null){
			if( experienceToLevel(player.caughtPokemonList[i].experience, player.caughtPokemonList[i].levelType) >= player.caughtPokemonList[i].evoLevel && !player.caughtPokemonList[i].evolved){
				log("Your "+player.caughtPokemonList[i].name+" evolved into "+player.caughtPokemonList[i].evolution+"!");
				capturePokemon(player.caughtPokemonList[i].evolution);
				player.caughtPokemonList[i].evolved = 1;
			}
		}
	}
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
		if (chance < 3){
			chance = Math.floor(Math.random()*100+1);
			if(chance < 5){
				return "Mew";
			}
			if(chance < 10){
				return "Mewtwo";
			}
			if (chance < 33){
				return "Articuno";
			}
			else if (chance <66){
				return "Zapdos";
			}
			else if (chance <100){
				return "Moltres";
			}
		}
		return false;
	}
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


// Returns true is the route is valid by checking if there
// is a pokemon on that route
// TODO:
// Support multiple routes per pokemon
var correctRoute = function (route){
	for (var i = 0; i<pokemonList.length; i++){
		if (pokemonList[i].route == route){
			return true;
		}
	}
	return false;
}

		// Console stuff
		
var specialLog = [];
var completeLog = specialLog;

var log = function(text){
	$("#console").append(text+"<br>");
	var elem = document.getElementById('console');
	elem.scrollTop = elem.scrollHeight;
}

		// HTML functions

// Update the upgradeBox

var updateUpgrades = function(){
	$(".upgradeBoxes").remove();
	for( var i = 0; i<player.upgradeList.length; i++){
		if( player.upgradeList[i].require <= boughtUpgrades() && 
		    !player.upgradeList[i].bought && 
			(alreadyUpgradeId(player.upgradeList[i].requiredUpgrade) || player.upgradeList[i].requiredUpgrade == null )){
			
			var upgrade = player.upgradeList[i];
			$("#upgradeBox").append("<button type=button id=Upgrade"+upgrade.id+" title=s class='upgradeBoxes btn btn-primary col-sm-12'>"+upgrade.name+"<br>Cost: "+upgrade.cost+"</button>");
			
			document.getElementById("Upgrade"+upgrade.id).title = upgrade.flavorText;
		}
	}
}

var boughtUpgrades = function(){
	var number = 0;
	for( var i = 0; i<player.upgradeList.length; i++){
		
		if( player.upgradeList[i].bought == 1){
			number++;
		}
	}
	
	return number;
}
		
// Update the list of caught pokemon
var updateCaughtList = function(){

	var pokemonHtml = ""

	for (var i = 0; i<player.caughtPokemonList.length; i++){
		pokemonHtml += "<tr>";
		pokemonHtml += "<th><img class=smallImage src=images/"+player.caughtPokemonList[i].id+".png>"+player.caughtPokemonList[i].name + "</th>";
		pokemonHtml += "<th>" + Math.ceil(experienceToLevel(player.caughtPokemonList[i].experience,player.caughtPokemonList[i].levelType)*(player.caughtPokemonList[i].attack)/100) +"</th>";
		pokemonHtml += "<th>" + experienceToLevel(player.caughtPokemonList[i].experience,player.caughtPokemonList[i].levelType) + "</th>";
		pokemonHtml += "</tr>";
		
	}
	$("#pokemonBody").html(pokemonHtml);

	$("#caughtPokemon").html("<br>Name<br>");
	$("#AttackCaughtPokemon").html("<br>Attack <br><br>");
	$("#LevelCaughtPokemon").html("<br>Level <br><br>");
	
	if( player.caughtPokemonList.length == 0){
		$("#caughtPokemon").append("None");
		$("#AttackCaughtPokemon").append("<br>");
		$("#LevelCaughtPokemon").append("<br>");
	}
	for (var i = 0; i<player.caughtPokemonList.length; i++){
		$("#caughtPokemon").append("<div class=row> <img class=smallImage src=images/"+player.caughtPokemonList[i].id+".png>"+player.caughtPokemonList[i].name+"</div>>");
		$("#AttackCaughtPokemon").append(Math.ceil(experienceToLevel(player.caughtPokemonList[i].experience,player.caughtPokemonList[i].levelType)*(player.caughtPokemonList[i].attack)/100)+"<br>");
		$("#LevelCaughtPokemon").append(experienceToLevel(player.caughtPokemonList[i].experience,player.caughtPokemonList[i].levelType)+"<br>");
	}
}

// Update the stats
var updateStats = function(){
	$("#statBody").html("<tr><th>Money</th><th>$"+player.money+"</th></tr>" +
		"<tr><th>Click attack</th><th>"+player.clickAttack*player.clickMultiplier+"</th></tr>" +
		"<tr><th>Pokemon attack</th><th>"+player.attack*player.attackMultiplier+"</th></tr>" +
		"<tr><th>Exp multiplier</th><th>"+player.expMultiplier.toFixed(2)+"</th></tr>" +
		"<tr><th>Catch bonus</th><th>"+player.catchBonus+"%</th></tr>" +
		"<tr><th>Catch time</th><th>"+player.catchTime/1000+" sec</th></tr>" +
		"<tr><th>Route</th><th>"+player.route+"</th></tr>" + 
		"<tr><th>Pokemon Caught</th><th>"+player.totalCaught+"</th></tr>");
//	$("#statBody").html("Stats<br><br>Money<br>Click attack<br>Pokemon attack<br>Exp multiplier<br>Catch bonus<br>Catch time<br>Route<br>Pokemon Caught");
//	$("#statBoxStats").html("<br><br>$"+player.money+"<br>"+player.clickAttack*player.clickMultiplier+"<br>"+player.attack*player.attackMultiplier+"<br>"+player.expMultiplier.toFixed(2)+"x<br>"+player.catchBonus+"%<br>"+player.catchTime/1000+" sec<br>"+player.route+"<br>"+player.totalCaught);	
}



var updateRoute = function(){
	$("#currentRoute").html("Route "+player.route+ "<br>"+Math.min(5,player.routeKills[player.route])+"/5");
	if(accessToRoute(player.route+1)){
		$("#routeRight").show();
	}
	else{
		$("#routeRight").hide();
	}
	if(player.route == 1){
		$("#routeLeft").hide();
	} 
	else{
		$("#routeLeft").show();
	}
}

	// Sorting functions
	
function compareByName(a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
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

function compareByCatchRate(a,b) {
  if (a.catchRate < b.catchRate)
    return -1;
  if (a.catchRate > b.catchRate)
    return 1;
  return 0;
}

function compareByLevel(a,b) {
  if (experienceToLevel(a.experience,a.levelType) > experienceToLevel(b.experience,b.levelType))
    return -1;
  if (experienceToLevel(a.experience,a.levelType) < experienceToLevel(b.experience,b.levelType))
    return 1;
  return 0;
}

function compareByAttack(a,b) {
	var aAttack = experienceToLevel(a.experience,a.levelType)*a.attack/100;
	var bAttack = experienceToLevel(b.experience,b.levelType)*b.attack/100;
  if (aAttack> bAttack)
    return -1;
  if (aAttack < bAttack)
    return 1;
  return 0;
}

