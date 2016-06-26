var version = "0.2"

// Add new variables to the savefile!!
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
	catchNumbers: Array.apply(null, Array(pokemonList.length)).map(Number.prototype.valueOf,0),
	defeatNumbers: Array.apply(null, Array(pokemonList.length)).map(Number.prototype.valueOf,0),
	routeKills: Array.apply(null, Array(100)).map(Number.prototype.valueOf,0),
	starter: "none",
	upgradeList: [],
	gymBadges: 0,
	version: version,
	totalCaught: 0,
	routeKillsNeeded: 10
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
		curEnemy.health -= Math.floor(player.attack*player.attackMultiplier*1.5);
		updateAll();
		}
	},1000);

	$("body").on('click',"#enemy", function(){
		if (curEnemy.alive){
			if(curEnemy.health > 0){
				curEnemy.health -= Math.floor(player.clickAttack*player.clickMultiplier*1.5);
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


	// Navbar Button controllers
	$("body").on('click',"#badgeButton", function(){
		$("#badgeModal").modal("show");
		for (var i = 1; i<=player.gymBadges; i++){
			$("#Badge"+i).fadeTo("slow",1);
		}
	})

	$("body").on('click',"#pokedexButton", function(){
		showPokedex();
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
		
		var id = getPokemonByName(curEnemy.name).id-1;
		player.defeatNumbers[id]++;
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
			$("#enemyInfo").html("<br>"+curEnemy.name+" <img id=alreadyCaughtImage src=images/Pokeball.PNG><br><img id=pokeball src=images/Pokeball.PNG>");
			}
			else{
			$("#enemyInfo").html("<br>"+curEnemy.name+" <br><img id=pokeball src=images/Pokeball.PNG>");
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
	var id = getPokemonByName(name).id-1;
	player.catchNumbers[id]++;
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
		

		var deviation = Math.floor(Math.random() * 11 ) -5;
	//	console.log("Deviation: " + deviation);
		if (deviation > player.route + 1){
			var getMoney = Math.floor(30*1*player.moneyMultiplier);
		}
		else {
			var getMoney = Math.floor((30-deviation)*player.route*player.moneyMultiplier);
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
		if (route <= 25){
		var possiblePokemons = pokemonsPerRoute[route].land;
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
	curEnemy.health = Math.max(20+randomPokemon.health*1/4*route*(player.caughtPokemonList.length-1),20);

	curEnemy.maxHealth = curEnemy.health;
	curEnemy.catchRate = Math.floor(Math.pow(randomPokemon.catchRate,0.8));
	curEnemy.alive = true;
	curEnemy.moneyReward = 30 + 3*Math.pow(route,1.2);
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


