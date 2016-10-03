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



var questDifficultyName = ["EASY", "MEDIUM", "HARD", "", "IMPOSSIBLE"];

var startQuest = function(quest){
	player.curQuest.progress = 0;
	player.curQuest.type = quest.type;
	player.curQuest.description = quest.description;
	player.curQuest.difficulty = quest.difficulty;
	player.curQuest.amount = Math.floor((quest.minAmount + Math.random()*(quest.maxAmount-quest.minAmount) + 1)*player.questDifficulty); // some math
	player.curQuest.reward = Math.floor(quest.baseReward*player.questDifficulty); // some math.

	switch(quest.type){
		case "defeatPokemonRoute":
		//Route to kill Pokémon on.
			player.curQuest.type2 = Math.max(1, Math.min(25, Math.floor(5* Math.random()) + (quest.difficulty )*5));
			player.curQuest.description = "Defeat " + player.curQuest.amount + " Pokemon on route " + player.curQuest.type2;
			break;
		case "findItems":
		//Item id to find.
			player.curQuest.type2 = Math.floor(Math.random()*itemList.length) + 1;
			player.curQuest.description = "Find " + player.curQuest.amount + " " + getItemNameFromId(player.curQuest.type2) + ".";
			break;
		case "defeatPokemon":
			player.curQuest.type2 = Math.floor(Math.random()*pokemonList.length) + 1;
			player.curQuest.description = "Defeat " + player.curQuest.amount + " " + getPokemonById(player.curQuest.type2).name + ".";
			break;
		case "gainMoney":
			player.curQuest.type2 = "none";
			player.curQuest.description = "Gain " + player.curQuest.amount + " money!";
			break;
		case "gainExp":
			player.curQuest.type2 = "none";
			player.curQuest.description = "Gain " + player.curQuest.amount + " exp!";
			break;
		case "gainTokens":
			player.curQuest.type2 = "none";
			player.curQuest.description = "Gain " + player.curQuest.amount + " tokens!";
			break;
	}
	showCurQuest();
}

var progressQuest = function(type, type2,  amount){
	if(type === player.curQuest.type){
		if(type2 === player.curQuest.type2 || type2 === "none"){
			player.curQuest.progress += amount;
			showCurQuest();
		}
	}
}

var EASY = 0;
var MEDIUM = 1;
var HARD = 2;
var IMPOSSIBLE = 4;
//				Type 			Description   Difficulty Min Max Reward

// Secondary routenumber
addQuest('defeatPokemonRoute', 'Defeat x pokemon', EASY, 10, 30, 3);
addQuest('defeatPokemonRoute', 'Defeat x pokemon', MEDIUM, 30, 50, 8);
addQuest('defeatPokemonRoute', 'Defeat x pokemon', HARD, 50, 80, 20);
addQuest('defeatPokemonRoute', 'Defeat x pokemon', IMPOSSIBLE, 80, 100, 50);

// Secondary routenumber
addQuest('capturePokemonRoute', 'Capture x pokemon', EASY, 10, 30, 4);
addQuest('capturePokemonRoute', 'Capture x pokemon', MEDIUM, 30, 50, 10);
addQuest('capturePokemonRoute', 'Capture x pokemon', HARD, 50, 80, 25);
addQuest('capturePokemonRoute', 'Capture x pokemon', IMPOSSIBLE, 80, 100, 55);

// Secondary itemnumber
addQuest('findItems', 'Find x items', EASY, 1, 5, 5);
addQuest('findItems', 'Find x items', MEDIUM, 5, 10, 12);
addQuest('findItems', 'Find x items', HARD, 10, 15, 28);
addQuest('findItems', 'Find x items', IMPOSSIBLE, 20, 25, 60);

addQuest('gainMoney', 'Gain x money', EASY, 300, 500, 2)
addQuest('gainMoney', 'Gain x money', MEDIUM, 1000, 5000, 6)
addQuest('gainMoney', 'Gain x money', HARD, 10000, 20000, 15)
addQuest('gainMoney', 'Gain x money', IMPOSSIBLE, 25000, 50000, 20)

addQuest('gainTokens', 'Gain x tokens', EASY, 30, 50, 2)
addQuest('gainTokens', 'Gain x tokens', MEDIUM, 100, 500, 6)
addQuest('gainTokens', 'Gain x tokens', HARD, 1000, 2000, 15)
addQuest('gainTokens', 'Gain x tokens', IMPOSSIBLE, 2500, 5000, 20)

addQuest('captureShinies', 'Capture x shinies', HARD, 1, 1, 20)
addQuest('captureShinies', 'Capture x shinies', IMPOSSIBLE, 3, 3, 100)



var increaseQuestCount = function(){
	player.questCompletedTotal++;
	player.questCompletedToday++;
	player.questCompletedDailyMax = Math.max(player.questCompletedDailyMax, player.questCompletedToday);
}

var completeQuest = function(){
	if(questCompleted()){
		increaseQuestCount();
		gainQuestPoints(player.curQuest.reward)
		player.questDifficulty *= 1.1;
		startRandomQuest();
	}
}

var questCompleted = function(){
	return player.curQuest.progress >= player.curQuest.amount;
}

var gainQuestPoints = function(amount){
	player.questPoints += amount;
}

var getSkipPrice = function(){
	return Math.floor(5*player.questSkipToday^1.2);	
}

var skipQuest = function(){
	var cost = getSkipPrice();
	if( canSkipQuest()){	
		player.questPoints -= cost;
		player.questSkipToday++;
		player.questDifficulty *= 0.8;
		startRandomQuest();

	}
}

var startRandomQuest = function(){

	startQuest(questList[0]);
}

var canSkipQuest = function(){
	return player.questPoints >= getSkipPrice();
}

var showCurQuest = function(){
	var html = "";
	html += "<div id='questTop'>";
	html += 	"<h2 style='text-align:center; padding:5px'>" + player.curQuest.description + "</h2><div id='difficultyBlock'>" + questDifficultyName[player.curQuest.difficulty] + "</div>";
	html += 	"<br>";
	html += 	"<p style='text-align:center; margin-bottom:15px'>" + Math.min(player.curQuest.progress,player.curQuest.amount) + "/" + player.curQuest.amount + "</p>";
	html += 	"<div class='row' id='questProgressRow'>";
	html += 		"<div class='progress' id='questProgress'>"
	html += 			"<div class='progress-bar progress-bar-danger' id='healthBar' style='width: " + Math.min(player.curQuest.progress,player.curQuest.amount) /player.curQuest.amount*100 + "%'>"
	html += 				"<span class='sr-only'></span>";
	html += 			"</div>";
	html += 		"</div>";
	html +=		"</div>";
	html += 	"<div class='row' style='width:80%;margin-top:15px;'>"
	html += 		"<p>Reward: " + player.curQuest.reward + " Quest points</p>";
	html += 	"</div>";
	html += 	"<div class='row' style='width:80%;margin-top:15px;'>"
	if(questCompleted()){
		html += 		"<button onClick='completeQuest()' class='btn btn-success'>Complete Quest</button>";
	} else {
		html += 		"<button class='btn btn-success disabled'>Complete Quest</button>";
	}

	if(canSkipQuest()){
		html += 		"<button onClick='skipQuest()' class='btn btn-danger'>Skip Quest</button> (" + getSkipPrice() + " points)";
	} else {
		html += 		"<button class='btn btn-danger disabled'>Skip Quest</button> (" + getSkipPrice() + " points)";
	}
	html += 		"</div>";
	html += 	"</div>"
	html += "</div>";
	html += "<div class= 'row' style='width:80%;margin-top:50px;'>"
	html += 	"<p>Quest difficulty: " + player.questDifficulty + "</p>";
	html += 	"<p>Quest points: " + player.questPoints + "</p>";
	html += 	"<p>Quests  completed: " + player.questCompletedTotal + "</p>";
	html += 	"<p>Completed today: " + player.questCompletedToday + "</p>";
	html += 	"<p>Maximum in 1 day: " + player.questCompletedDailyMax + "</p>";
	html += "</div>";
	$("#questBody").html(html);
}