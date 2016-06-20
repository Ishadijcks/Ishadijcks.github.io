var routeRequirements = {
	
	1: [[]],
	2: [[1]],
	3: [[2]],
	4: [[3]],
	5: [[4]],
	6: [[5]],
	7: [[5],[10]],
	8: [[5],[7],[6]],
	9: [[4]],
	10: [[9]],
	11: [[6],[12]],
	12: [[7],[10],[11]],
	13: [[11],[12]],
	14: [[13]],
	15:[[14]],
	16:[[8]],
	17:[[16]],
	18:[[17]],
	19:[[18],[15]],
	20:[[19]],
	21:[[20]],
	22:[[100]],
	23:[[100]],
	24:[[4]],
	25:[[24]],
}

var idToRoute = function(id){
	var split = id.split("_")
	var route = split[1];
	var routeNumber = parseInt(route);
	return routeNumber;
}

var moveToRoute = function(route){

	

	if(curEnemy.alive){
		if(!isNaN(route)){
			if(accessToRoute(route)){
				player.route = route;
				generatePokemon(player.route);
			}
			else {
				log("You don't have access to that route yet.")
			}
		}
	}
	else{
		log("You can't switch routes while catching a pokemon");
	}
	updateAll();
}

var accessToRoute = function(route){
	
	var reqList = routeRequirements[route];
	if(reqList != undefined){
		for( var i = 0; i<reqList.length; i++){
			if(enoughRouteKills(reqList[i])){
				return true;
			}
		}
	}
		return false;
}

var enoughRouteKills = function(reqList){
	for( var i = 0; i<reqList.length; i++){
		if(player.routeKills[reqList[i]] < player.routeKillsNeeded){
			return false;
		}
	}
	return true;
}