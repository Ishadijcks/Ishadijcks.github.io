var townList = [];

var addTown = function(name,gym,image,shop,reqRoute){

	var temp = {
		name: name,
		gym: gym,
		image: image,
		shop: shop,
	}
	
	townList.push(temp);
}

var moveToTown = function(townName){
	var town = getTown(townName);
}

var loadTowns = function(){
	addTown("Pewter City", PewterCityGym(), "images/charmander.png", null, 2);
}

var getTown = function(townName){
	for( var i = 0; i< townList.length; i++){
		if(townList[i].name == townName){
			return townList[i];
		}
	}
	return null;
}

var Gym = function(leaderName,city,pokemons,badgeReward,moneyReward){
	var temp = {
		leaderName: leaderName,
		city: city,
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
		health: health
	}
	return temp;
}

var PewterCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Geodude", 3000));
	pokemonList.push(GymPokemon("Onix", 6000))
	return Gym("Brock", "Pewter City", pokemonList, "Boulder", 5000);
}



