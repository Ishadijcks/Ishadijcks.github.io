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
			if(player.money > upgrade.cost){
				$("#upgradeBox").append("<button type=button id=Upgrade"+upgrade.id+" title=s class='upgradeBoxes btn btn-primary col-sm-12'>"+upgrade.name+"<br>Cost: "+upgrade.cost+"</button>");
			}
			else {
				$("#upgradeBox").append("<button type=button id=Upgrade"+upgrade.id+" title=s class='upgradeBoxes disabled btn btn-primary col-sm-12'>"+upgrade.name+"<br>Cost: "+upgrade.cost+"</button>");	
			}
			document.getElementById("Upgrade"+upgrade.id).title = upgrade.flavorText;
		}
	}
}


		
// Update the list of caught pokemon
var updateCaughtList = function(){

	var pokemonHtml = ""
	// var pokemonHeight = $("#pokemonBody").height()
	// if( pokemonHeight > 1000){
	// 	$("#pokemons").height(1000);
	// }
	// else {
	// 	$("#pokemons").height(pokemonHeight + 120);
	// }

	// var pokemonHeight = $("#pokemonBody").height()

	// if( pokemonHeight > 1000){
	// 	$("#pokemons").height(1000);
	// }
	// else {
	// 	$("#pokemons").height(pokemonHeight + 120);
	// }

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
		"<tr><th>Click attack</th><th>"+Math.floor(player.clickAttack*player.clickMultiplier*1.5)+"</th></tr>" +
		"<tr><th>Pokemon attack</th><th>"+Math.floor(player.attack*player.attackMultiplier*1.5)+"</th></tr>" +
		"<tr><th>Exp multiplier</th><th>"+player.expMultiplier.toFixed(2)+"</th></tr>" +
		"<tr><th>Catch bonus</th><th>"+player.catchBonus+"%</th></tr>" +
		"<tr><th>Catch time</th><th>"+player.catchTime/1000+" sec</th></tr>" +
		"<tr><th>Pokemon Caught</th><th>"+player.totalCaught+"</th></tr>");
//	$("#statBody").html("Stats<br><br>Money<br>Click attack<br>Pokemon attack<br>Exp multiplier<br>Catch bonus<br>Catch time<br>Route<br>Pokemon Caught");
//	$("#statBoxStats").html("<br><br>$"+player.money+"<br>"+player.clickAttack*player.clickMultiplier+"<br>"+player.attack*player.attackMultiplier+"<br>"+player.expMultiplier.toFixed(2)+"x<br>"+player.catchBonus+"%<br>"+player.catchTime/1000+" sec<br>"+player.route+"<br>"+player.totalCaught);	
}

var getHeight = function(){
	return $(window).height();
}


var updateRoute = function(){
	$("#currentRoute").html("Route "+player.route+ "<br>"+Math.min(player.routeKillsNeeded, player.routeKills[player.route])+"/"+player.routeKillsNeeded);
	// if(accessToRoute(player.route+1)){
	// 	$("#routeRight").show();
	// }
	// else{
	// 	$("#routeRight").hide();
	// }
	// if(player.route == 1){
	// 	$("#routeLeft").hide();
	// } 
	// else{
	// 	$("#routeLeft").show();
	// }

	for(var i = 1; i< 26; i++){
		if(player.routeKills[i]> player.routeKillsNeeded){
			if( i == 19){
				$("#route_"+i+"a").attr('style', "fill:#FCB612" );	
			}
			$("#route_"+i).attr('style', "fill:#FCB612" );
		}
		else if (accessToRoute(i)){
			if( i == 19){
				$("#route_"+i+"a").attr('style', "fill:#D89803");
			}
			$("#route_"+i).attr('style', "fill:#D89803");
		}
		else {
			if( i == 19){
				$("#route_"+i+"a").attr('style', "fill:#BD1952");	
			}
			$("#route_"+i).attr('style', "fill:#BD1952");	
		}
		
	}

	if( inProgress == 1){
		$("#route_"+player.route).attr('style', "fill:green" );
		if( player.route == 19){
			$("#route_"+player.route+"a").attr('style', "fill:green" );	
		}
	}
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



var hideAllViews = function(){
	$("#currentEnemy").hide();
	$("#gymView").hide();
	$("#townView").hide();
}