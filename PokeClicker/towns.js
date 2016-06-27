var townList = [];

var addTown = function(name,gym,image,shop,reqRoutes){

	var temp = {
		name: name,
		gym: gym,
		image: image,
		shop: shop,
		reqRoutes: reqRoutes
	}
	
	townList.push(temp);
}

var moveToTown = function(townName){
	var town = getTown(townName);
	if( accessToTown(town.reqRoutes)){
		inProgress = 0;
		showTown(town);
	}
	else {
		log("You don't have access to "+ townName + " yet.");
	}
}

var accessToTown = function(routeList){
	for( var i = 0; i<routeList.length; i++){
		if(player.routeKills[routeList[i]] > player.routeKillsNeeded){
			return true;
		}
	}
	return false;
}

var showTown = function(town){
	
	var html = "";
	html += "<h3 class='townName strokeme'>"+town.name+"</h3>";
	//html += "<img src="+town.image+">";
	html += "<div class='row'>";
		if (town.gym != null){
			html += "<button class='leftTownButton btn btn-primary col-sm-2' id="+town.name+"gym>Gym</button>"
		}
	html += "</div>"
	$("#townView").html(html);
	$("#townView").css("background-image", "url("+town.image+")");  
	$("#townView").css("background-repeat", "no-repeat");  
	$("#townView").css("background-repeat", "no-repeat");
	$("#townView").css("background-position", "center");    

	hideAllViews()
	$("#townView").show();	
}

var loadTowns = function(){
	addTown("Pewter City", PewterCityGym(), "images/gyms/pewtercity.png", null, [2]);
}

var getTown = function(townName){
	for( var i = 0; i< townList.length; i++){
		if(townList[i].name == townName){
			return townList[i];
		}
	}
	return null;
}




