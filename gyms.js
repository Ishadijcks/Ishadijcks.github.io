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

var GymPokemon = function(name, health, level){
	var temp = {
		name: name,
		health: health,
		maxHealth: health,
		level: level
	}
	return temp;
}


var gymNameList = [];
var getGymNames = function(){
    gymNameList = [];
    for( var i = 0; i<11; i++){
    	if(townList[i].gym !== null ){
    		if(townList[i].gym.town !== undefined){
        		gymNameList.push(townList[i].gym.town);
        	}
    	}
    }
    return gymNameList;
 }


var PewterCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Geodude", 550, 12));
	pokemonList.push(GymPokemon("Onix", 1110, 14));
	return Gym("Brock", "Pewter City Gym", pokemonList, "Boulder", 250, 0);
}

var CeruleanCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Staryu", 4000, 18));
	pokemonList.push(GymPokemon("Starmie", 6000, 21));
	return Gym("Misty", "Cerulean City Gym", pokemonList, "Cascade", 500, 1);
}

var VermillionCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Voltorb", 9780, 21));
	pokemonList.push(GymPokemon("Pikachu", 13040, 18));
	pokemonList.push(GymPokemon("Raichu", 14775, 24));
	return Gym("Lt. Surge", "Vermillion City Gym", pokemonList, "Thunder", 1000, 2);
}

var CeladonCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Victreebel", 17830, 29));
	pokemonList.push(GymPokemon("Tangela", 20210, 24));
	pokemonList.push(GymPokemon("Vileplume", 21400, 29));
	return Gym("Erika", "Celadon City Gym", pokemonList, "Rainbow", 1500 ,3);
}

var SaffronCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Kadabra", 16810, 38));
	pokemonList.push(GymPokemon("Mr. Mime", 18340, 37));
	pokemonList.push(GymPokemon("Venomoth", 19870, 38));
	pokemonList.push(GymPokemon("Alakazam", 21400, 43));
	return Gym("Sabrina", "Saffron City Gym", pokemonList, "Marsh", 2500, 4);
}

var FuchsiaCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Koffing", 23333, 37));
	pokemonList.push(GymPokemon("Muk", 24000, 39));
	pokemonList.push(GymPokemon("Koffing", 26667, 37));
	pokemonList.push(GymPokemon("Weezing", 30000, 43));
	return Gym("Koga", "Fuchsia City Gym", pokemonList, "Soul", 3500, 5);
}

var CinnabarIslandGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Growlithe", 27870, 42));
	pokemonList.push(GymPokemon("Ponyta", 30960, 40));
	pokemonList.push(GymPokemon("Rapidash", 34060, 42));
	pokemonList.push(GymPokemon("Arcanine", 37155, 47));
	return Gym("Blaine", "Cinnabar Island Gym", pokemonList, "Volcano", 5000, 6);
}

var ViridianCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Rhyhorn", 27460, 45));
	pokemonList.push(GymPokemon("Dugtrio", 29960, 42));
	pokemonList.push(GymPokemon("Nidoqueen", 29960, 44));
	pokemonList.push(GymPokemon("Nidoking", 32452, 45));
	pokemonList.push(GymPokemon("Rhydon", 34950, 50));
	return Gym("Giovanni", "Viridian City Gym", pokemonList, "Earth", 6000, 7);
}

var EliteLorelei = function(){
    var pokemonList = [];
    pokemonList.push(GymPokemon("Dewgong", 30810, 52));
    pokemonList.push(GymPokemon("Cloyster", 33380, 51));
    pokemonList.push(GymPokemon("Slowbro", 35950, 52));
    pokemonList.push(GymPokemon("Jynx", 38510, 54));
    pokemonList.push(GymPokemon("Lapras", 44182, 54));
    return Gym("Elite Lorelei", "Indigo Plateau Gym", pokemonList, "E1", 7500, 8);
}

var EliteBruno = function(){
    var pokemonList = [];
    pokemonList.push(GymPokemon("Onix", 32950, 51));
    pokemonList.push(GymPokemon("Hitmonchan", 35300, 53));
    pokemonList.push(GymPokemon("Hitmonlee", 37660, 53));
    pokemonList.push(GymPokemon("Onix", 40010, 54));
    pokemonList.push(GymPokemon("Machamp", 42360, 56));
    return Gym("Elite Bruno", "Indigo Plateau Gym", pokemonList, "E2", 7500, 9);
}

var EliteAgatha = function(){
    var pokemonList = [];
    pokemonList.push(GymPokemon("Gengar", 35045, 54));
    pokemonList.push(GymPokemon("Golbat", 36660, 54));
    pokemonList.push(GymPokemon("Haunter", 48950, 53));
    pokemonList.push(GymPokemon("Arbok", 41241, 56));
    pokemonList.push(GymPokemon("Gengar", 45824, 58));
    return Gym("Elite Agatha", "Indigo Plateau Gym", pokemonList, "E3", 7500, 10);
}

var EliteLance = function(){
    var pokemonList = [];
    pokemonList.push(GymPokemon("Gyarados", 37320, 56));
    pokemonList.push(GymPokemon("Dragonair", 39390, 54));
    pokemonList.push(GymPokemon("Dragonair", 41160, 54));
    pokemonList.push(GymPokemon("Aerodactyl", 43540, 58));
    pokemonList.push(GymPokemon("Dragonite", 45610, 60));
    return Gym("Elite Lance", "Indigo Plateau Gym", pokemonList, "E4", 7500, 11);
}

var Champion = function(){
    var pokemonList = [];
    pokemonList.push(GymPokemon("Pidgeot", 30600, 59));
    pokemonList.push(GymPokemon("Alakazam", 36720, 57));
    pokemonList.push(GymPokemon("Rhydon", 42835, 59));
    if( player.starter === "Charmander"){
    	pokemonList.push(GymPokemon("Arcanine", 42835, 59));
    	pokemonList.push(GymPokemon("Exeggutor", 45895, 61));
    	pokemonList.push(GymPokemon("Blastoise", 61190, 63));
	}

    if( player.starter === "Squirtle"){
    	pokemonList.push(GymPokemon("Gyarados", 42835, 59));
    	pokemonList.push(GymPokemon("Arcanine", 45895, 61));
    	pokemonList.push(GymPokemon("Venusaur", 61190, 63));
	}

    if( player.starter === "Bulbasaur"){
    	pokemonList.push(GymPokemon("Exeggutor", 42835, 59));
    	pokemonList.push(GymPokemon("Gyarados", 45895, 61));
    	pokemonList.push(GymPokemon("Charizard", 61190, 63));
	}
    return Gym("Champion", "Indigo Plateau Gym", pokemonList, "Champion", 10000, 12);
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

    	if(alreadyCaughtShiny(curEnemy.name)){
    		 $("#gymEnemyInfo").html("<br>"+curEnemy.name+" <img id=alreadyCaughtImage src=images/shinyPokeball.PNG><br><img id=gymEnemy src=images/pokemon/"+curEnemy.id+".png>");
    	} else if(alreadyCaught(curEnemy.name)){
            $("#gymEnemyInfo").html("<br>"+curEnemy.name+" <img id=alreadyCaughtImage src=images/Pokeball.PNG><br><img id=gymEnemy src=images/pokemon/"+curEnemy.id+".png>");
        }
        else{
            $("#gymEnemyInfo").html("<br>"+curEnemy.name+"<br><img id=gymEnemy src=images/pokemon/"+curEnemy.id+".png>");
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
	gainShards(curEnemy.type, 3);
	gainExp(curEnemy.exp, curEnemy.level, true);
	progressEgg(Math.floor(Math.sqrt(currentGym.badgeReq*3 + 1)));
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
	player.gymsDefeated[currentGym.badgeReq]++;
	inProgress = 0;
	currentGym.timeLeft = currentGym.timeLimit;
	var first = !alreadyGotBadge(currentGym.badgeReward);
	if(first){
		player.gymBadges.push(currentGym.badgeReward);
		player.money += currentGym.moneyReward;
		progressQuest('gainMoney', "none" , currentGym.moneyReward);
	}
	else {
		player.money += currentGym.moneyReward/10;
		progressQuest('gainMoney', "none" , currentGym.moneyReward/10);
	}


    progressQuest('clearGyms', currentGym.town , 1);


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

	console.log(town);
	console.log(currentGym);
	if(!e4){
		html += "<div class='row'><button class='gym leftTownButton btn btn-primary col-sm-2' id='"+town+" Gym'>Retry!</button></div>";
	} else {
		html += "<div class='row'><button class='gym leftTownButton btn btn-primary col-sm-2' id='"+currentGym.leaderName+" Gym'>Retry!</button></div>";
	}



	$("#gymDefeatedBody").html(html);
	safelyOpen(function(){$("#gymModal").modal('show')});
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
	curEnemy.level = currentGym.pokemons[pokemonIndex].level;
	curEnemy.exp = getPokemonByName(curEnemy.name).baseXpGain;
	curEnemy.reward = 0;
	curEnemy.alive = true;
	curEnemy.route = 0;
	curEnemy.catchRate = 0;
	var possibleType = getPokemonByName(curEnemy.name).type;
    if(possibleType != undefined){
        curEnemy.type = possibleType;
    } else {
        curEnemy.type = ['normal'];        
    }
	updateGym();
}

var showGymBadges = function() {
	for (var i = 0; i<player.gymBadges.length; i++){
		$("#"+player.gymBadges[i]+"Badge").fadeTo("slow",1);
	}
}
