var gymPokemonIndex = 0;
var currentGym;

var Gym = function(leaderName,town,pokemons,badgeReward,moneyReward){
	var temp = {
		leaderName: leaderName,
		town: town,
		pokemons: pokemons,
		badgeReward: badgeReward,
		moneyReward: moneyReward,
		timeLimit: 30
	}
	return temp;
}

var GymPokemon = function(name, health){
	var temp = {
		name: name,
		health: health,
		maxHealth: health
	}
	return temp;
}

var PewterCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Geodude", 3000));
	pokemonList.push(GymPokemon("Onix", 6000))
	return Gym("Brock", "Pewter City Gym", pokemonList, "Boulder", 5000);
}

var loadGym = function(townId){
	var gymPokemonIndex = 0;
	currentGym = getTown(townId).gym;
	spawnGymPokemon(gymPokemonIndex);
}

var updateGym= function(){
	inProgress = 2;
	hideAllViews();
	$("#gymView").show();
    
    if (curEnemy.health <0){
        curEnemy.health = 0;
    }
    if(curEnemy.health == 0 ){
        gymEnemyDefeated(currentGym);
    }

    if (curEnemy.alive){
        if(alreadyCaught(curEnemy.name)){
            $("#gymEnemyInfo").html("<br>"+curEnemy.name+" <img id=alreadyCaughtImage src=images/Pokeball.PNG><br><img id=gymEnemy src=images/"+curEnemy.id+".png>");
        }
        else{
            $("#gymEnemyInfo").html("<br>"+curEnemy.name+"<br><img id=gymEnemy src=images/"+curEnemy.id+".png>");
        }
    }
        $("#gymHealthBar").width(100*curEnemy.health/curEnemy.maxHealth+"%"); 
        $("#gymHealthDisplay").html(curEnemy.health+"/"+curEnemy.maxHealth);
}

var gymEnemyDefeated = function(){
	log("You defeated the "+ curEnemy.name);
	gymPokemonIndex++;
	console.log(currentGym);
	if(currentGym.pokemons[gymPokemonIndex] != null){
		spawnGymPokemon(gymPokemonIndex);
	}
	else {
		log("Congratulations, you have defeated the gym leader!");
		inProgress = 0;
		moveToTown(currentGym.town.slice(0,-4));
		if(!alreadyGotBadge(currentGym.badgeReward)){
			player.gymBadges.push(currentGym.badgeReward);
			console.log("first");
		}
	}
}

var alreadyGotBadge = function(badgeName){
	for( var i = 0; i<player.gymBadges.length; i++){
		if (player.gymBadges[i] == badgeName){
			return true;
		}
	}
	return false;
}

var spawnGymPokemon = function(pokemonIndex){
	curEnemy.name = currentGym.pokemons[pokemonIndex].name;
	curEnemy.id = getPokemonByName(curEnemy.name).id;
	curEnemy.health = currentGym.pokemons[pokemonIndex].health;
	curEnemy.maxHealth = currentGym.pokemons[pokemonIndex].maxHealth;
	curEnemy.reward = 0;
	curEnemy.alive = true;
	curEnemy.route = 0;
	curEnemy.catchRate = 0;
	updateGym();
}

var showGymBadges = function() {
	for (var i = 0; i<player.gymBadges.length; i++){
			$("#"+player.gymBadges[i]+"Badge").fadeTo("slow",1);
		}
}