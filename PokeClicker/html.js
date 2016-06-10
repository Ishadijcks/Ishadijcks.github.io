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


		
// Update the list of caught pokemon
var updateCaughtList = function(){

	var pokemonHtml = ""
	var pokemonHeight = $("#pokemonBody").height()
	log("pokemonHeight: "+pokemonHeight);
	log("windowHeight: "+getHeight())
	if( pokemonHeight > 1000){
		$("#pokemons").height(1000);
	}
	else {
		$("#pokemons").height(pokemonHeight + 120);
	}

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

var getHeight = function(){
	return $(window).height();
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

