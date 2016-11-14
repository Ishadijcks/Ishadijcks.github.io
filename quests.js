var questList = [];
var addQuest = function(type, description, difficulty, minAmount, randomAmount, rewardMultiplier, baseReward, hardness, type2) {
	var tempQuest = {
		type: type,
		description: description,
		difficulty: difficulty,
		minAmount: minAmount,
		randomAmount: randomAmount,
		baseReward: (baseReward || 1) * (rewardMultiplier || 1),
		hardness: hardness || 0,
		type2: type2 || "none";
	};
	questList.push(tempQuest);
}

var addQuests = function(type, description, quests) {
	for (var i = 0; i < quests.length; i++) {
		var q = quests[i];
		addQuest(type, description, q[0], q[1], q[2], q[3], q[4]);
	}
}

var questDifficultyName = ["EASY", "MEDIUM", "HARD", "HARDER", "IMPOSSIBLE"];
var questPointsPerKillInAverageZone = 0.2;
var startQuest = function(quest) {
	var curQuest = player.curQuest;
	curQuest.progress = 0;
	curQuest.type = quest.type;
	curQuest.difficulty = quest.difficulty;
	curQuest.amount = Math.ceil(quest.minAmount + Math.random() * quest.randomAmount * (1 + player.questDifficulty)); // some math
	curQuest.notified = 0;
	curQuest.type2 = quest.type2;

	switch (quest.type) {
		case "defeatPokemonRoute":
			//Route to defeat Pokémon on.
			curQuest.type2 = Math.min(Math.floor(5 * Math.random() + quest.hardness), 25) || 1;
			if(!accessToRoute(curQuest.type2)) return startRandomQuest(); //restart
			break;
		case "capturePokemonRoute":
			//Route to capture Pokémon on.
			curQuest.type2 = Math.min(Math.floor(5 * Math.random() + quest.hardness), 25) || 1;
			if(!accessToRoute(curQuest.type2)) return startRandomQuest(); //restart
			break;
		case "captureShinies":
			curQuest.amount = 1;
			curQuest.reward = 100;
			break;
		case "findItems":
			break;
		case "clearDungeons":
			var dungeonNameList = getDungeonNames();
			curQuest.type2 = dungeonNameList[Math.floor(Math.min(dungeonNameList.length - 1, curQuest.hardness + Math.random() * 3))];
			break;
		case "clearGyms":
			var gymNameList = getGymNames();
			curQuest.type2 = gymNameList[Math.floor(Math.min(gymNameList.length - 1, curQuest.hardness + Math.random() * 3))];
			break;
		case "defeatPokemon":
			curQuest.type2 = Math.floor(Math.random() * pokemonList.length) + 1;
			curQuest.description = "Defeat " + numberWithCommas(curQuest.amount) + " " + getPokemonById(curQuest.type2).name;
			break;
		case "gainMoney":
			break;
		case "gainTokens":
			break;
		case "gainShards":
			break;
		case "breedPokemon":
			break;
	}
	curQuest.description = quest.description.replace(/\$(\w*);/g,function(s,a){return curQuest[a];});
	curQuest.reward = Math.floor(quest.baseReward * curQuest.amount * (0.9 + Math.random() * 0.2) * questPointsPerKillInAverageZone); // some math.
	if(curQuest.amount==0||curQuest.reward==0){
		return startRandomQuest();
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
				notifyMe("You can complete your quest");
				player.curQuest.notified = 1;
			}
		}
	}
}

var EASY = 0;
var MEDIUM = 1;
var HARD = 2;
var HARDER = 3;
var IMPOSSIBLE = 4;
//           >      Type      <    >     Description      < [ [Difficulty MinAmt RndAmt  gainMult (baseGain) (Hardness) (type2) ] ]
//addQuests('defeatPokemonRoute', 'Defeat $amount; Pokemon', [[    EASY,    10,    30,     1,         1,         0     (null)  ]]);
// base: 1 kill
addQuests('defeatPokemonRoute', 'Defeat $amount; Pokemon on route $type2;', [
	[EASY,        10, 20,  1, 0.8,  0],
	[MEDIUM,      50, 20,  1, 0.9,  5],
	[HARD,       150, 20,  1,   1, 10],
	[HARDER,     300, 20,  1, 1.2, 15],
	[IMPOSSIBLE, 500, 20,  1, 1.5, 20]
]);
// base: 1.2 kill
addQuest('capturePokemonRoute', 'Capture $amount; Pokemon on route $type2;', [
	[EASY,         8, 16, 1.2,   1,  0],
	[MEDIUM,      40, 16, 1.2, 1.1,  5],
	[HARD,       120, 16, 1.2, 1.2, 10],
	[HARDER,     240, 16, 1.2, 1.5, 10],
	[IMPOSSIBLE, 400, 16, 1.2,   2, 20]
]);
// base: 50kills(route,no use) | 20 kills(route,use) | 5 kills(dung,random) | 3 kills(dung,plan) |  4 used
addQuests('findItems', 'Find $amount; items', [
	[EASY,         2, 4, 4],
	[MEDIUM,      10, 4, 4],
	[HARD,        30, 4, 5],
	[HARDER,      60, 4, 6],
	[IMPOSSIBLE, 100, 4, 7]
]);
// base: 1/2k (route,no use) | 1/1k (route,use) | 1.5/1.7 used
addQuests('gainMoney', 'Gain $amount; money', [
	[EASY,        15000, 30000, 0.0017],
	[MEDIUM,      75000, 30000, 0.0017],
	[HARD,       225000, 30000, 0.0017],
	[HARDER,     450000, 30000, 0.0017],
	[IMPOSSIBLE, 750000, 30000, 0.0017]
]);
// base: 1.2/45=1/37.5 | 37.5 used
addQuests('gainTokens', 'Gain $amount; dungeon tokens', [
	[EASY,         375, 750, 0.027],
	[MEDIUM,      1875, 750, 0.027],
	[HARD,        5625, 750, 0.027],
	[HARDER,     11250, 750, 0.027],
	[IMPOSSIBLE, 18750, 750, 0.027]
]);
// base: 512*100||1.2*4000
addQuest('captureShinies', 'Capture $amount; shinies', 
	IMPOSSIBLE, 1, 0, 6000 // that's 1200QP!
);
// base: 10
addQuests('clearDungeons', 'Clear the $type2; $amount; times', [
	[EASY,   1, 5, 9 ],
	[MEDIUM, 3, 8, 15]
]);
addQuests('clearGyms', 'Clear the $type2; $amount; times', [
	[EASY,       1,  5,  5],
	[MEDIUM,     3, 10, 10],
	[HARD,       3, 10, 10],
	[HARDER,     3, 10, 10],
	[IMPOSSIBLE, 3, 10, 10]
]);
// base: 1 kill | 1/3 kills(dung) | 2 used
addQuests('gainShards', 'Gain $amount; shards (any type)', [
	[EASY,         20, 40, 0.4],
	[MEDIUM,      100, 40, 0.5],
	[HARD,        300, 40, 0.6],
	[HARDER,      600, 40, 0.7],
	[IMPOSSIBLE, 1000, 40, 0.8]
]);
// base: 125/4 kills | 62/4 kills(item) | 33 used
addQuests('breedPokemon', 'Hatch $amount; eggs', [
	[MEDIUM,     1.5, 0.6, 33],
	[HARD,       4.5, 0.6, 33],
	[HARDER,       9, 0.6, 33],
	[IMPOSSIBLE,  15, 0.6, 33]
]);










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
