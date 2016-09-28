var questList = [];

var addQuest = function(type, description, difficulty, minAmount, maxAmount, baseReward){
	var tempQuest = {
		type:type,
		description:description,
		difficulty:difficulty,
		minAmount:minAmount,
		maxAmount:maxAmount,
		baseReward:baseReward
	}
	questList.push(tempQuest);
}

var curQuest = {
	type:"",
	type2: "",
	description: "",
	difficulty: "",
	progress: 0,
	amount: "",
	reward: "",
}

var startQuest = function(quest){
	curQuest.type = quest.type;
	curQuest.description = quest.description;
	curQuest.difficulty = quest.difficulty;
	curQuest.amount = quest.minAmount + Math.floor(Math.random()*(quest.maxAmount-quest.minAmount)) + 1 // some math
	console.log(curQuest.amount);
	curQuest.reward = 3 // some math.

	switch(quest.type){
		case "defeatPokemonRoute":
		//Route to kill Pokémon on.
			curQuest.type2 = Math.floor(Math.random()* quest.difficulty) + 1;
			curQuest.description = "Defeat " + curQuest.amount + " Pokemon on route " + curQuest.type2 + ".";
			break;
		case "findItems":
		//Item id to find.
			curQuest.type2 = Math.floor(Math.random()*itemList.length) + 1;
			curQuest.description = "Find " + curQuest.amount + " " + getItemNameFromId(curQuest.type2) + ".";
		case "defeatPokemon":
			curQuest.type2 = Math.floor(Math.random()*pokemonList.length) + 1;
			curQuest.description = "Defeat " + curQuest.amount + " " + getPokemonById(curQuest.type2).name + ".";
	}
}

var progressQuest = function(type, type2,  amount){
	if(type === curQuest.type){
		if(type2 === curQuest.type2){
			curQuest.progress += amount;
		}
	}
}

var EASY = 0;
var MEDIUM = 1;
var HARD = 2;
var IMPOSSIBLE = 3;

addQuest('defeatPokemonRoute', 'Defeat x pokemon', EASY, 5, 20, 3);
addQuest('defeatPokemonRoute', 'Defeat x pokemon', MEDIUM, 20, 40, 5);
addQuest('findItems', 'Find x items', MEDIUM, 20, 40, 5);


startQuest(questList[1]);

var findItem = function(){
	//Normal stuff
	progressQuest('findItem', item.id , 1);
}


