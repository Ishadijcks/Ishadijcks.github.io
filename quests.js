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



var questDifficultyName = ["EASY", "MEDIUM", "HARD", "IMPOSSIBLE"];

var startQuest = function(quest){
	player.curQuest.progress = 0;
	player.curQuest.type = quest.type;
	player.curQuest.description = quest.description;
	player.curQuest.difficulty = quest.difficulty;
	player.curQuest.amount = quest.minAmount + Math.floor(Math.random()*(quest.maxAmount-quest.minAmount)) + 1 // some math
	console.log(player.curQuest.amount);
	player.curQuest.reward = 3 // some math.

	switch(quest.type){
		case "defeatPokemonRoute":
		//Route to kill Pokémon on.
			player.curQuest.type2 = Math.floor(Math.random()* quest.difficulty) + 1;
			player.curQuest.description = "Defeat " + player.curQuest.amount + " Pokemon on route " + player.curQuest.type2;
			break;
		case "findItems":
		//Item id to find.
			player.curQuest.type2 = Math.floor(Math.random()*itemList.length) + 1;
			player.curQuest.description = "Find " + player.curQuest.amount + " " + getItemNameFromId(player.curQuest.type2) + ".";
		case "defeatPokemon":
			player.curQuest.type2 = Math.floor(Math.random()*pokemonList.length) + 1;
			player.curQuest.description = "Defeat " + player.curQuest.amount + " " + getPokemonById(player.curQuest.type2).name + ".";
	}
	showCurQuest();
}

var progressQuest = function(type, type2,  amount){
	if(type === player.curQuest.type){
		if(type2 === player.curQuest.type2){
			player.curQuest.progress += amount;
			showCurQuest();
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



var findItem = function(){
	//Normal stuff
	progressQuest('findItem', item.id , 1);
}

var increaseQuestCount = function(){
	player.questCompletedTotal++;
	player.questCompletedToday++;
	player.questCompletedDailyMax = Math.max(player.questCompletedDailyMax, player.questCompletedToday);
}

var completeQuest = function(){
	if(questCompleted()){
		increaseQuestCount();
		gainQuestPoints(player.curQuest.reward)
		startQuest(questList[1]);
	}
}

var questCompleted = function(){
	return player.curQuest.progress >= player.curQuest.amount;
}

var gainQuestPoints = function(amount){
	player.questPoints += amount;
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
	html += 		"<p>Reward: " + player.curQuest.reward + " Quest tokens</p>";
	html += 	"</div>";
	html += 	"<div class='row' style='width:80%;margin-top:15px;'>"
	if(questCompleted()){
		html += 		"<button onClick='completeQuest()' class='btn btn-success'>Complete Quest</button>";
	} else {
		html += 		"<button class='btn btn-success disabled'>Complete Quest</button>";
	}
	html += 		"<button class='btn btn-danger'>Skip Quest</button> (500 tokens)";
	html += 		"</div>";
	html += 	"</div>"
	html += "</div>";
	html += "<div class= 'row' style='width:80%;margin-top:50px;'>"
	html += 	"<p>Completed: " + player.questCompletedTotal + "</p>";
	html += 	"<p>Today: " + player.questCompletedToday + "</p>";
	html += 	"<p>Maximum in 1 day: " + player.questCompletedDailyMax + "</p>";
	html += "</div>";
	$("#questBody").html(html);
}


startQuest(questList[1]);