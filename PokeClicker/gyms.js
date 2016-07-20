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
	pokemonList.push(GymPokemon("Geodude", 500));
	pokemonList.push(GymPokemon("Onix", 1000));
	return Gym("Brock", "Pewter City Gym", pokemonList, "Boulder", 1000, 0);
}

var CeruleanCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Staryu", 2000));
	pokemonList.push(GymPokemon("Starmie", 3000));
	return Gym("Misty", "Cerulean City Gym", pokemonList, "Cascade", 5000, 1);
}

var VermillionCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Voltorb", 3000));
	pokemonList.push(GymPokemon("Pikachu", 4000));
	pokemonList.push(GymPokemon("Raichu", 4500));
	return Gym("Lt. Surge", "Vermillion City Gym", pokemonList, "Thunder", 10000, 2);
}

var CeladonCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Victreebel", 7500));
	pokemonList.push(GymPokemon("Tangela", 8500));
	pokemonList.push(GymPokemon("Vileplume", 9000));
	return Gym("Erika", "Celadon City Gym", pokemonList, "Rainbow", 15000 ,3);
}

var SaffronCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Kadabra", 11000));
	pokemonList.push(GymPokemon("Mr. Mime", 11500));
	pokemonList.push(GymPokemon("Venomoth", 12000));
	pokemonList.push(GymPokemon("Alakazam", 12500));
	return Gym("Sabrina", "Saffron City Gym", pokemonList, "Marsh", 20000, 4);
}

var FuchsiaCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Koffing", 17500));
	pokemonList.push(GymPokemon("Muk", 18000));
	pokemonList.push(GymPokemon("Koffing", 20000));
	pokemonList.push(GymPokemon("Weezing", 22500));
	return Gym("Koga", "Fuchsia City Gym", pokemonList, "Soul", 30000, 5);
}

var CinnabarIslandGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Growlithe", 22500));
	pokemonList.push(GymPokemon("Ponyta", 25000));
	pokemonList.push(GymPokemon("Rapidash", 27500));
	pokemonList.push(GymPokemon("Arcanine", 30000));
	return Gym("Blaine", "Cinnabar Island Gym", pokemonList, "Volcano", 40000, 6);
}

var ViridianCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Rhyhorn", 27500));
	pokemonList.push(GymPokemon("Dugtrio", 30000));
	pokemonList.push(GymPokemon("Nidoqueen", 30000));
	pokemonList.push(GymPokemon("Nidoking", 32500));
	pokemonList.push(GymPokemon("Rhydon", 35000));
	return Gym("Giovanni", "Viridian City Gym", pokemonList, "Earth", 50000, 7);
}

var EliteLorelei = function(){
    var pokemonList = [];
    pokemonList.push(GymPokemon("Dewgong", 30000));
    pokemonList.push(GymPokemon("Cloyster", 32500));
    pokemonList.push(GymPokemon("Slowbro", 35000));
    pokemonList.push(GymPokemon("Jynx", 37500));
    pokemonList.push(GymPokemon("Lapras", 40000));
    return Gym("Elite Lorelei", "Indigo Plateau Gym", pokemonList, "E1", 60000, 8);
}

var EliteBruno = function(){
    var pokemonList = [];
    pokemonList.push(GymPokemon("Onix", 35000));
    pokemonList.push(GymPokemon("Hitmonchan", 37500));
    pokemonList.push(GymPokemon("Hitmonlee", 40000));
    pokemonList.push(GymPokemon("Onix", 42500));
    pokemonList.push(GymPokemon("Machamp", 45000));
    return Gym("Elite Bruno", "Indigo Plateau Gym", pokemonList, "E2", 75000, 9);
}

var EliteAgatha = function(){
    var pokemonList = [];
    pokemonList.push(GymPokemon("Gengar", 40000));
    pokemonList.push(GymPokemon("Golbat", 42500));
    pokemonList.push(GymPokemon("Haunter", 45000));
    pokemonList.push(GymPokemon("Arbok", 47500));
    pokemonList.push(GymPokemon("Gengar", 50000));
    return Gym("Elite Agatha", "Indigo Plateau Gym", pokemonList, "E3", 80000, 10);
}

var EliteLance = function(){
    var pokemonList = [];
    pokemonList.push(GymPokemon("Gyarados", 45000));
    pokemonList.push(GymPokemon("Dragonair", 47500));
    pokemonList.push(GymPokemon("Dragonair", 50000));
    pokemonList.push(GymPokemon("Aerodactyl", 52500));
    pokemonList.push(GymPokemon("Dragonite", 55000));
    return Gym("Elite Lance", "Indigo Plateau Gym", pokemonList, "E4", 90000, 11);
}

var Champion = function(){
    var pokemonList = [];
    pokemonList.push(GymPokemon("Pidgeot", 50000));
    pokemonList.push(GymPokemon("Alakazam", 60000));
    pokemonList.push(GymPokemon("Rhydon", 70000));
    pokemonList.push(GymPokemon("Arcanine", 75000));
    if( player.starter === "Charmander"){
    	pokemonList.push(GymPokemon("Blastoise", 100000));
	}

    if( player.starter === "Squirtle"){
    	pokemonList.push(GymPokemon("Venusaur", 100000));
	}

    if( player.starter === "Bulbasaur"){
    	pokemonList.push(GymPokemon("Charizard", 100000));
	}	
    return Gym("Champion", "Indigo Plateau Gym", pokemonList, "Champion", 100000, 12);
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
	     	$.notify("Train harder and try again!", 'error')
	        $.notify("You couldn't defeat "+currentGym.leaderName+ " in time.", 'error');
	     
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

	var id = getPokemonByName(curEnemy.name).id-1;
	player.defeatNumbers[id]++;

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
	currentGym.timeLeft = currentGym.timeLimit;
	var first = !alreadyGotBadge(currentGym.badgeReward);
	if(first){
		player.gymBadges.push(currentGym.badgeReward);
		player.money += currentGym.moneyReward;
	}
	else {
		player.money += currentGym.moneyReward/10;
	}

	
	var town = currentGym.town.slice(0,-4);
	
	moveToTown(town);
	showGymDefeated(first, town);

	updateAll();
}

var showGymDefeated = function(first, town){
	var e4 = 0;
	if( town === "Indigo Plateau"){
		e4 = 1;
	}

	html = "";

	if(first){
		html += "You have defeated " + currentGym.leaderName+"!<br>" ;
		if( e4){
			html += "Prize money: $" + currentGym.moneyReward;
			html += "<br><br>Defeat this elite four member again for 10% of its original money reward!"
		}
		else {
			html +=	"<img id='badgeReward' src=images/gyms/badges/"+currentGym.badgeReward+"Badge.png><br>";
			html += "You have earned the "+currentGym.badgeReward+ " Badge!<br>";
			html += "You can now train your pokemon to level " + (1+player.gymBadges.length)*10 + "<br>";
			html += "Prize money: $" + currentGym.moneyReward;
			html += "<br><br>Defeat this gym again to earn 10% of its original money reward!"
		}

	} else {
		html += "You have defeated " + currentGym.leaderName+" again!<br>" ;
		html += "Prize money: " + currentGym.moneyReward+ " x 10% = $"+ currentGym.moneyReward/10;
	}

	
	
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