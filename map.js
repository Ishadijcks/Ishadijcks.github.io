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
	22:[[1]],
	23:[[22]],
	24:[[4]],
	25:[[24]],
}

var routeGymRequirements = {
	1: 0,
	2: 0,
	3: 1,
	4: 0,
	5: 2,
	6: 0,
	7: 3,
	8: 3,
	9: 2,
	10: 0,
	11: 3,
	12: 0,
	13: 5,
	14: 0,
	15: 0,
	16: 5,
	17: 0,
	18: 0,
	19: 6,
	20: 0,
	21: 7,
	22: 8,
	23: 0,
	24: 2,
	25: 0,
}

var idToRoute = function(id){
	var split = id.split("_")
	var route = split[1];
	var routeNumber = parseInt(route);
	return routeNumber;
}

var moveToRoute = function(route){
	canCatch = 0;
	$("#catchDisplay").html("");	

	
		if(!isNaN(route) && !(route == player.route && inProgress === 1)){
			hideAllViews()
			resetDungeon();
			$("#currentEnemy").show();
			if(accessToRoute(route)){
				player.route = route;
			}
			else {
				log("You don't have access to that route yet.");
			}
			if(accessToRoute(route) || inProgress !== 1){
				inProgress = 1;
				generatePokemon(player.route);
			}
		}
	
	
	updateAll();
}

var accessToRoute = function(route){
	
	if(player.gymBadges.length >= routeGymRequirements[route]){

		var reqList = routeRequirements[route];
		if(reqList != undefined){
			for( var i = 0; i<reqList.length; i++){
				if(enoughRouteKills(reqList[i])){
					return true;
				}
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