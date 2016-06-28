var gymPokemonIndex = 0;
var currentGym;
var counter;

var Gym = function(leaderName,town,pokemons,badgeReward,moneyReward){
	var temp = {
		leaderName: leaderName,
		town: town,
		pokemons: pokemons,
		badgeReward: badgeReward,
		moneyReward: moneyReward,
		timeLimit: 30*100,
		timeLeft: 30*100
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
	pokemonList.push(GymPokemon("Geodude", 2000));
	pokemonList.push(GymPokemon("Onix", 4000));
	return Gym("Brock", "Pewter City Gym", pokemonList, "Boulder", 1000);
}

var CeruleanCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Staryu", 6000));
	pokemonList.push(GymPokemon("Starmie", 8000));
	return Gym("Misty", "Cerulean City Gym", pokemonList, "Cascade", 5000);
}

var VermillionCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Voltorb", 5000));
	pokemonList.push(GymPokemon("Pikachu", 8000));
	pokemonList.push(GymPokemon("Raichu", 8000));
	return Gym("Lt. Surge", "Vermillion City Gym", pokemonList, "Thunder", 15000);
}

var CeladonCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Victreebel", 2000));
	pokemonList.push(GymPokemon("Tangela", 4000));
	pokemonList.push(GymPokemon("VilePlume", 4000))
	return Gym("Erika", "Celadon City Gym", pokemonList, "Rainbow", 25000);
}

var PewterCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Geodude", 2000));
	pokemonList.push(GymPokemon("Onix", 4000))
	return Gym("Brock", "Pewter City Gym", pokemonList, "Boulder", 1000);
}

var PewterCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Geodude", 2000));
	pokemonList.push(GymPokemon("Onix", 4000))
	return Gym("Brock", "Pewter City Gym", pokemonList, "Boulder", 1000);
}
var loadGym = function(townId){
	gymPokemonIndex = 0;
	currentGym = getTown(townId).gym;
	spawnGymPokemon(gymPokemonIndex);

	counter = setInterval(timer, 100); //100 will  run it every 10th of a second
}

var timer = function(){
	if (currentGym.timeLeft <= 0){
    	clearInterval(counter);
        inProgress = 0;
        moveToTown(currentGym.town.slice(0,-4));
        currentGym.timeLeft = currentGym.timeLimit;
        log("You couldn't defeat "+currentGym.leaderName+ " in time.");
        log("Train harder and try again!")
    }
    currentGym.timeLeft-=10;
        $("#timer").html((currentGym.timeLeft/100)+"/"+currentGym.timeLimit/100); 
    }

var updateGym = function(){
	
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

    if(curEnemy.health != 0){
    	inProgress = 2;
	}
}

var gymEnemyDefeated = function(){
	log("You defeated "+currentGym.leaderName+"'s " + curEnemy.name);
	gymPokemonIndex++;
	if(currentGym.pokemons[gymPokemonIndex] != null){
		spawnGymPokemon(gymPokemonIndex);
	}
	else {
		gymDefeated();
	}
}

var gymDefeated = function(){
	clearInterval(counter);
	log("Congratulations, you have defeated "+ currentGym.leaderName+"!");
	inProgress = 0;
	moveToTown(currentGym.town.slice(0,-4));
	currentGym.timeLeft = currentGym.timeLimit;
	var first = !alreadyGotBadge(currentGym.badgeReward);
	if(first){
		player.gymBadges.push(currentGym.badgeReward);
		player.money += currentGym.moneyReward;
	}
	else {
		player.money += currentGym.moneyReward/10;
	}
	showGymDefeated(first);
}

var showGymDefeated = function(first){
	html = "";

	if(first){
		html += "You have defeated " + currentGym.leaderName+"!<br>" ;		
		html +=	"<img id='badgeReward' src=images/gyms/badges/"+currentGym.badgeReward+"Badge.png><br>";
		html += "You have earned the "+currentGym.badgeReward+ " Badge!<br>";
		html += "Prize money: $" + currentGym.moneyReward;
	} else {
		html += "You have defeated " + currentGym.leaderName+" again!<br>" ;
		html += "Prize money: " + currentGym.moneyReward+ " x 10% = $"+ currentGym.moneyReward/10;
	}

	html += "<br><br>You can replay this gym for 10% of its original money reward!"
	
	$("#gymDefeatedBody").html(html);
	$("#gymModal").modal('show');
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