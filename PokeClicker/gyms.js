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
		health: health,
		maxHealth: health
	}
	return temp;
}

var PewterCityGym = function(){
	var pokemonList = [];
	pokemonList.push(GymPokemon("Geodude", 3000));
	pokemonList.push(GymPokemon("Onix", 6000))
	return Gym("Brock", "Pewter City", pokemonList, "Boulder", 5000);
}

var showGym= function(gym){

	curEnemy.name = gym.pokemons[0].name;
	curEnemy.health = gym.pokemons[0].health;
	curEnemy.maxHealth = gym.pokemons[0].maxHealth;
	curEnemy.reward = 0;
	curEnemy.alive = true;
	curEnemy.route = 0;
	curEnemy.catchRate = 0;


}