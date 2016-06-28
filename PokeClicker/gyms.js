var gymPokemonIndex = 0;
var currentGym;
var counter;

var Gym = function(leaderName,town,pokemons,badgeReward,moneyReward,badgeReq){
	var temp = {
		leaderName: leaderName,
		town: town,
		pokemons: pokemons,
		badgeReward: badgeReward,
		moneyReward: moneyReward,
		badgeReq: badgeReq,
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
	pokemonList.push(GymPokemon("Geodude", 3500));
	pokemonList.push(GymPokemon("Onix", 4000));
	return Gym("Brock", "Pewter City Gym", pokemonList, "Boulder", 2000, 0);
}

var CeruleanCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Staryu", 8000));
	pokemonList.push(GymPokemon("Starmie", 10000));
	return Gym("Misty", "Cerulean City Gym", pokemonList, "Cascade", 5000, 1);
}

var VermillionCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Voltorb", 12000));
	pokemonList.push(GymPokemon("Pikachu", 15000));
	pokemonList.push(GymPokemon("Raichu", 18000));
	return Gym("Lt. Surge", "Vermillion City Gym", pokemonList, "Thunder", 15000, 2);
}

var CeladonCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Victreebel", 20000));
	pokemonList.push(GymPokemon("Tangela", 22500));
	pokemonList.push(GymPokemon("Vileplume", 25000));
	return Gym("Erika", "Celadon City Gym", pokemonList, "Rainbow", 25000 ,3);
}

var SaffronCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Kadabra", 15000));
	pokemonList.push(GymPokemon("Mr. Mime", 17500));
	pokemonList.push(GymPokemon("Venomoth", 20000));
	pokemonList.push(GymPokemon("Alakazam", 25000));
	return Gym("Sabrina", "Saffron City Gym", pokemonList, "Marsh", 25000, 4);
}

var FuchsiaCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Koffing", 20000));
	pokemonList.push(GymPokemon("Muk", 22000));
	pokemonList.push(GymPokemon("Koffing", 22500));
	pokemonList.push(GymPokemon("Weezing", 25000));
	return Gym("Koga", "Fuchsia City Gym", pokemonList, "Soul", 25000, 5);
}

var CinnabarIslandGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Growlithe", 22500));
	pokemonList.push(GymPokemon("Ponyta", 25000));
	pokemonList.push(GymPokemon("Rapidash", 27500));
	pokemonList.push(GymPokemon("Arcanine", 30000));
	return Gym("Blaine", "Cinnabar Island Gym", pokemonList, "Volcano", 25000, 6);
}

var ViridianCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Rhyhorn", 25000));
	pokemonList.push(GymPokemon("Dugtrio", 27500));
	pokemonList.push(GymPokemon("Nidoqueen", 28000));
	pokemonList.push(GymPokemon("Nidoking", 29000));
	pokemonList.push(GymPokemon("Rhydon", 30000));
	return Gym("Giovanni", "Viridian City Gym", pokemonList, "Earth", 25000, 7);
}



var loadGym = function(townId){
	clearInterval(counter);
	gymPokemonIndex = 0;
	currentGym = getTown(townId).gym;
	currentGym.timeLeft = currentGym.timeLimit;
	spawnGymPokemon(gymPokemonIndex);

	counter = setInterval(timer, 100); //100 will  run it every 10th of a second
}

var timer = function(){
	if (currentGym.timeLeft <= 0){
    	clearInterval(counter);

    	console.log("bad");
    	console.log(inProgress);
	    if (inProgress == 2){
	        inProgress = 0;
	        moveToTown(currentGym.town.slice(0,-4));
	        currentGym.timeLeft = currentGym.timeLimit;
	        log("You couldn't defeat "+currentGym.leaderName+ " in time.");
	        log("Train harder and try again!")
    	}
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

    var html = "";
    html += currentGym.leaderName + "<br>";
    html += "<img src='images/gyms/"+currentGym.leaderName+".png'><br><br>";

    for (var i = 0; i<gymPokemonIndex; i++){
    	html += "<img class='gymPokeball defeatPokeball' src=images/gyms/pokeball.png>";
    }
    for (var i = 0; i<currentGym.pokemons.length-gymPokemonIndex; i++){
    	html += "<img class='gymPokeball' src=images/gyms/pokeball.png>";
    }
    $("#gymTrainer").html(html);

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
	updateAll();
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