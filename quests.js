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
	player.curQuest.amount = Math.floor((quest.minAmount + Math.random()*(quest.maxAmount-quest.minAmount) + 1)*player.questDifficulty) + 1; // some math
	player.curQuest.reward = Math.floor(quest.baseReward*player.questDifficulty); // some math.
	player.curQuest.notified = 0;

	switch(quest.type){
		case "defeatPokemonRoute":
		//Route to defeat Pokémon on.
			player.curQuest.type2 = Math.max(1, Math.min(25, Math.floor(5* Math.random()) + (quest.difficulty )*5));
			player.curQuest.description = "Defeat " + numberWithCommas(player.curQuest.amount) + " Pokemon on route " + player.curQuest.type2;
			break;

		case "capturePokemonRoute":
		//Route to capture Pokémon on.
			player.curQuest.type2 = Math.max(1, Math.min(25, Math.floor(5* Math.random()) + (quest.difficulty )*5));
			player.curQuest.description = "Capture " + numberWithCommas(player.curQuest.amount) + " Pokemon on route " + player.curQuest.type2;
			break;
		case "captureShinies":
			player.curQuest.type2 = "none";
			player.curQuest.amount = 1;
			player.curQuest.reward = 100;
			player.curQuest.description = "Capture " + player.curQuest.amount + " shinies";
			break;
		case "findItems":
			player.curQuest.type2 = "none";
			player.curQuest.description = "Find " + player.curQuest.amount + " items";
			break;
		case "clearDungeons":
			var dungeonNameList = getDungeonNames();
			player.curQuest.type2 = dungeonNameList[Math.floor(Math.min(dungeonNameList.length-1, player.curQuest.difficulty + Math.random() * 3))];
			player.curQuest.description = "Clear the " + player.curQuest.type2 + " " + player.curQuest.amount + " times";
			break;
		case "clearGyms":
			var gymNameList = getGymNames();
			player.curQuest.type2 = gymNameList[Math.floor(Math.min(gymNameList.length-1, player.curQuest.difficulty + Math.random() * 3))];
			player.curQuest.description = "Clear the " + player.curQuest.type2 + " " + player.curQuest.amount + " times";
			break;
		case "defeatPokemon":
			player.curQuest.type2 = Math.floor(Math.random()*pokemonList.length) + 1;
			player.curQuest.description = "Defeat " + numberWithCommas(player.curQuest.amount) + " " + getPokemonById(player.curQuest.type2).name;
			break;
		case "gainMoney":
			player.curQuest.type2 = "none";
			player.curQuest.description = "Gain " + numberWithCommas(player.curQuest.amount) + " money!";
			break;
		case "gainExp":
			player.curQuest.type2 = "none";
			player.curQuest.description = "Gain " + numberWithCommas(player.curQuest.amount) + " exp!";
			break;
		case "gainTokens":
			player.curQuest.type2 = "none";
			player.curQuest.description = "Gain " + numberWithCommas(player.curQuest.amount) + " dungeon tokens!";
			break;
		case "gainShards":
			player.curQuest.type2 = "none";
			player.curQuest.description = "Gain " + numberWithCommas(player.curQuest.amount) + " shards (any type)";
			break;
		case "breedPokemon":
			player.curQuest.type2 = "none";
			player.curQuest.description = "Hatch " + player.curQuest.amount + " eggs";
			break;
	}
	showCurQuest();
}

var progressQuest = function(type, type2,  amount){
	// console.log(type);
	// console.log(type2);
	// console.log(player.curQuest);
	if(type === player.curQuest.type){
		if(type2 === player.curQuest.type2 || type2 === "none"){
			player.curQuest.progress += amount;
			showCurQuest();
			if(player.curQuest.progress >= player.curQuest.amount && !player.curQuest.notified){
				$.notify("Your random quest is ready to be completed!", "success");
				player.curQuest.notified = 1;
				notifyMe("You can complete your quest");
			}
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

addQuest('findItems', 'Find x items', EASY, 1, 5, 5);
addQuest('findItems', 'Find x items', MEDIUM, 5, 10, 12);
addQuest('findItems', 'Find x items', HARD, 10, 15, 28);
addQuest('findItems', 'Find x items', IMPOSSIBLE, 20, 25, 60);

addQuest('gainMoney', 'Gain x money', EASY, 300, 500, 2)
addQuest('gainMoney', 'Gain x money', MEDIUM, 2500, 7000, 6)
addQuest('gainMoney', 'Gain x money', HARD, 15000, 25000, 15)
addQuest('gainMoney', 'Gain x money', IMPOSSIBLE, 50000, 100000, 30)

addQuest('gainTokens', 'Gain x tokens', EASY, 30, 50, 2)
addQuest('gainTokens', 'Gain x tokens', MEDIUM, 100, 500, 6)
addQuest('gainTokens', 'Gain x tokens', HARD, 1000, 2000, 15)
addQuest('gainTokens', 'Gain x tokens', IMPOSSIBLE, 2500, 5000, 20)

addQuest('captureShinies', 'Capture x shinies', IMPOSSIBLE, 1, 1, 80)

addQuest('clearDungeons', 'Clear x dungeons', EASY, 1, 5, 9)
addQuest('clearDungeons', 'Clear x dungeons', MEDIUM, 3, 8, 15)
// addQuest('clearDungeons', 'Clear x dungeons', HARD, 5, 10, 28)
// addQuest('clearDungeons', 'Clear x dungeons', IMPOSSIBLE, 15, 25, 60)

addQuest('clearGyms', 'Clear x gyms', EASY, 1, 5, 5)
addQuest('clearGyms', 'Clear x gyms', MEDIUM, 3, 10, 10)
// addQuest('clearGyms', 'Clear x gyms', HARD, 1, 5, 23)
// addQuest('clearGyms', 'Clear x gyms', IMPOSSIBLE, 1, 5, 55)

addQuest('gainShards', 'Gain x shards', EASY, 25, 50, 5)
addQuest('gainShards', 'Gain x shards', MEDIUM, 50, 100, 10)
addQuest('gainShards', 'Gain x shards', HARD, 100, 150, 20)
addQuest('gainShards', 'Gain x shards', IMPOSSIBLE, 250, 500, 40)

// addQuest('breedPokemon', 'Breed x Pokemon', EASY, 1, 3, 5)
// addQuest('breedPokemon', 'Breed x Pokemon', MEDIUM, 3, 7, 11)
addQuest('breedPokemon', 'Breed x Pokemon', HARD, 3, 7, 25)
addQuest('breedPokemon', 'Breed x Pokemon', IMPOSSIBLE, 5, 10, 52);






var increaseQuestCount = function(){
	player.questCompletedTotal++;
	player.questCompletedToday++;
	player.questCompletedDailyMax = Math.max(player.questCompletedDailyMax, player.questCompletedToday);
}

var completeQuest = function(){
	if(questCompleted()){
		increaseQuestCount();
		gainQuestPoints(player.curQuest.reward)
		player.questDifficulty *= 1.2;
		player.questDifficulty += 0.1;
		startRandomQuest();
	}
}

var questCompleted = function(){
	return player.curQuest.progress >= player.curQuest.amount;
}

var gainQuestPoints = function(amount){
	player.questPoints += amount;
	player.totalQuestPoints += amount;
}

var getSkipPriceQuest = function(){
	return Math.floor(5*Math.pow(player.questSkipToday,1.1));
}

var skipQuestQuest = function(){
	var cost = getSkipPriceQuest();
	if( canSkipQuestQuest()){
		player.questPoints -= cost;
		player.questSkipToday++;
		player.questDifficulty *= 0.65;
		startRandomQuest();

	}
}

var getSkipPriceMoney = function(){
	return Math.floor(Math.pow(500*player.questSkipToday,1.5));
}

var skipQuestMoney = function(){
	var cost = getSkipPriceMoney();
	if( canSkipQuestMoney()){
		player.money -= cost;
		player.questSkipToday++;
		player.questDifficulty *= 0.8;
		startRandomQuest();
	}
}

var dailyReset = function(){
	player.questSkipToday = 0;
	player.questDifficulty = 1;
	player.questCompletedToday = 0;
	generateDailyDeals();
	console.log("Rise and shine, it's a new day!");
}

var startRandomQuest = function(){
	var possibleQuests = getQuestsByDifficulty(player.questDifficulty);
	var random = Math.floor(Math.random() * possibleQuests.length);
	startQuest(possibleQuests[random]);
}

var getQuestsByDifficulty = function(difficulty){
	difficulty = Math.min(4, Math.floor(Math.sqrt(difficulty)));
	var list = [];
	for( var i = 0; i<questList.length; i++){
		if(questList[i].type === player.curQuest.type) {
			continue;
		}
		if( questList[i].difficulty === difficulty){
			list.push(questList[i]);
		} else {
			var random = Math.floor(Math.random()*100 + 1);
			if( random < (100 - (questList[i].difficulty - difficulty)* 40)){
				list.push(questList[i]);
			}
		}
	}
	console.log(difficulty);
	if(list.length > 0){
		return list;
	} else {
		return questList;
		console.log("Weird error: " + difficulty);
	}
}

var canSkipQuestQuest = function(){
	return player.questPoints >= getSkipPriceQuest();
}

var canSkipQuestMoney = function(){
	return player.money >= getSkipPriceMoney();
}

var showCurQuest = function(){
	var html = "";
	html += "<div id='questTop'>";
	html += 	"<h2 style='text-align:center; padding:5px'>" + player.curQuest.description + "</h2><div id='difficultyBlock'>" + questDifficultyName[player.curQuest.difficulty] + "</div>";
	html += 	"<br>";
	html += 	"<p style='text-align:center; margin-bottom:15px'>" + numberWithCommas(Math.min(player.curQuest.progress,player.curQuest.amount)) + "/" + numberWithCommas(player.curQuest.amount) + "</p>";
	html += 	"<div class='row' id='questProgressRow'>";
	html += 		"<div class='progress' id='questProgress'>"
	html += 			"<div class='progress-bar progress-bar-success' id='healthBar' style='width: " + Math.min(player.curQuest.progress,player.curQuest.amount) /player.curQuest.amount*100 + "%'>"
	html += 				"<span class='sr-only'></span>";
	html += 			"</div>";
	html += 		"</div>";
	html += 		"<p>All progress needs to be made after the quest has started.</p>";
	html +=		"</div>";
	html += 	"<div class='row' style='width:80%;margin-top:15px;'>"
	html += 		"<p>Reward: " + numberWithCommas(player.curQuest.reward) + " Quest points</p>";
	html += 	"</div>";
	html += 	"<div class='row' style='width:80%;margin-top:15px;'>"
	if(questCompleted()){
		html += 		"<button onClick='completeQuest()' class='btn btn-success'>Complete Quest</button>";
	} else {
		html += 		"<button class='btn btn-success disabled'>Complete Quest</button>";
	}
	html += 	"</div>";
	html += 	"<div class='row' style='width:80%;margin-top:15px;'>"
	if(canSkipQuestQuest()){
		html += 		"<button onClick='skipQuestQuest()' class='btn btn-danger'>Skip Quest</button> (" + numberWithCommas(getSkipPriceQuest()) + " points)";
	} else {
		html += 		"<button class='btn btn-danger disabled'>Skip Quest</button> (" + numberWithCommas(getSkipPriceQuest()) + " points)";
	}
	html += 	"</div>";
	html += 	"<div class='row' style='width:80%;margin-top:15px;'>"
	if(canSkipQuestMoney()){
		html += 		"<button onClick='skipQuestMoney()' class='btn btn-danger'>Skip Quest</button> ($" + numberWithCommas(getSkipPriceMoney()) + ")";
	} else {
		html += 		"<button class='btn btn-danger disabled'>Skip Quest</button> ($" + numberWithCommas(getSkipPriceMoney()) + ")";
	}

	html += 		"</div>";
	html += 	"</div>"
	html += "</div>";
	html += "<div class= 'row' style='width:80%;margin-top:50px;'>"
	// html += 	"<p>Quest difficulty: " + player.questDifficulty + "</p>";
	html += 	"<p>Quest points: " + numberWithCommas(player.questPoints) + "</p>";
	html += 	"<p>Quests  completed: " + numberWithCommas(player.questCompletedTotal) + "</p>";
	html += 	"<p>Completed today: " + player.questCompletedToday + "</p>";
	html += 	"<p>Maximum in 1 day: " + player.questCompletedDailyMax + "</p>";
	html += "</div>";
	$("#questBody").html(html);


	$("#questCounterTitle").html(player.curQuest.description);
	$("#smallQuestBar").width(player.curQuest.progress/player.curQuest.amount*100 + "%");
	$("#questCounterProgress").html(Math.min(player.curQuest.amount, player.curQuest.progress) +"/" + player.curQuest.amount)
}
