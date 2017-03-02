// Move it somewhere
function isLocationAccessible(name) {
	if (!name)
		return false;
	if (+name)
		return accessToRoute(+name);
	name = name + '';
	if (name.match(/[Rr]oute/))
		return accessToRoute(name.match(/\d+/)[0]);
	for (var i = 0; i < townList.length; i++) {
		if (townList[i].name == name)
			return accessToTown(townList[i].reqRoutes);
		if (townList[i].gym)
			if (townList[i].gym.name == name || townList[i].gym.town == name)
				return accessToTown(townList[i].reqRoutes) && player.gymBadges.length >= townList[i].gym.badgeReq;
	}
	console.warn("Wrong location name!");
	return null;
}
//////////////////////////


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
		type2: type2 || "none"
	};
	questList.push(tempQuest);
}
var addQuests = function(type, description, quests) {
	for (var i = 0; i < quests.length; i++) {
		var q = quests[i];
		addQuest(type, description, q[0], q[1], q[2], q[3], q[4], q[5], q[6]);
	}
};
var addQuestMultiplate = function(type, difficulty, list, base, quests, fn) {
	var tempQuest = {
		isMultiplate: true,
		type: type,
		difficulty: difficulty,
		list: list,
		base: base,
		quests: quests,
		fn: fn
	};
	questList.push(tempQuest);
}
var addQuestMultiplates = function(type, list, base, plates, fn) {
	for (var i = 0; i < plates.length; i++) {
		var p = plates[i];
		addQuestMultiplate(type, p[0], list, base, p, fn);
	}
};
var useQuestMultiplate = function(plate, curQuest) {
	var tempQuest = {
		type: plate.type,
		description: plate.description,
		difficulty: plate.difficulty,
		minAmount: 0,
		randomAmount: 0,
		baseReward: 1,
		hardness: 0,
		type2: "none"
	};
	var list = plate.list;
	var quest = plate.quests[Math.floor(plate.quests.length * Math.random())];
	for (var i = 0; i < list.length; i++) {
		tempQuest[list[i]] = plate.base[i];
	}
	for (i = 0; i < quest.length; i++) {
		tempQuest[list[i]] = quest[i];
	}
	if (tempQuest.rewardMultiplier)
		tempQuest.baseReward *= tempQuest.rewardMultiplier;
	if (plate.fn)
		plate.fn(tempQuest);
	for (i in tempQuest) {
		curQuest[i] = tempQuest[i];
	}
	return tempQuest;
}

var questDifficultyName = ["EASY", "MEDIUM", "HARD", "HARDER", "IMPOSSIBLE"];
var questPointsPerKillInAverageZone = 0.2;
var startQuest = function(quest, forsed) {
	var curQuest = player.curQuest;
	curQuest.progress = 0;
	curQuest.notified = 0;
	curQuest.location = '';
	if (quest.isMultiplate) {
		curQuest.multiplate = quest;
		curQuest.template = quest = useQuestMultiplate(quest, curQuest);
	} else {
		curQuest.multiplate = null;
		curQuest.template = quest;
		curQuest.type = quest.type;
		curQuest.difficulty = quest.difficulty;
		curQuest.hardness = quest.hardness;
	}
	curQuest.amount = Math.ceil(quest.minAmount + Math.random() * quest.randomAmount * (1 + player.questDifficulty)); // some math

	if (typeof quest.type2 == "object")
		curQuest.type2 = quest.type2[Math.floor(quest.type2.length * Math.random())];
	else
		curQuest.type2 = quest.type2;

	switch (quest.type) {
		case "defeatPokemonRoute":
			//Route to defeat Pokémon on.
			curQuest.location = curQuest.type2 = Math.min(Math.floor(5 * Math.random() + quest.hardness), 25) || 1;
			break;
		case "capturePokemonRoute":
			//Route to capture Pokémon on.
			curQuest.location = curQuest.type2 = Math.min(Math.floor(5 * Math.random() + quest.hardness), 25) || 1;
			break;
		case "clearDungeons":
			var dungeonNameList = getDungeonNames();
			if (typeof curQuest.type2 == "number")
				curQuest.location = curQuest.type2 = dungeonNameList[curQuest.type2];
			break;
		case "clearGyms":
			var gymNameList = getGymNames();
			if (typeof curQuest.type2 == "number")
				curQuest.location = curQuest.type2 = gymNameList[curQuest.type2];
			break;
		case "defeatPokemon":
			curQuest.type2 = Math.floor(Math.random() * pokemonList.length) + 1;
			curQuest.description = "Defeat " + numberWithCommas(curQuest.amount) + " " + getPokemonById(curQuest.type2).name;
			break;
		case "captureShinies":
			if (curQuest.amount > getTotalShinies() / 3 + 20 && !forsed) return startRandomQuest(); //restart
			break;
			// case "findItems":
			//  if (curQuest.amount > player.totalItemsFound / 3 + 20 && !forsed) return startRandomQuest(); //restart
			// 	break;
			// case "gainMoney":
			// 	if (curQuest.amount > player.totalMoney / 3 + 1000 && !forsed) return startRandomQuest(); //restart
			// 	break;
			// case "gainTokens":
			// 	if (curQuest.amount > player.totalDungeonTokens / 3 + 1000 && !forsed) return startRandomQuest(); //restart
			// 	break;
			// case "gainShards":
			// 	if (curQuest.amount > getTotalDefeats() / 3 + 300 && !forsed) return startRandomQuest(); //restart
			// 	break;
		case "breedPokemon":
			if ((player.totalBred == 0 || curQuest.amount > player.totalBred / 3 + 4) && !forsed) return startRandomQuest(); //restart
			break;
	}
	curQuest._amount = numberWithCommas(curQuest.amount);
	curQuest.description = quest.description.replace(/\$(\w*);/g, function(s, a) {
		return curQuest[a];
	});
	curQuest.reward = Math.floor(quest.baseReward * curQuest.amount * (0.9 + Math.random() * 0.2) * questPointsPerKillInAverageZone); // Fluctuation is +-10%. May be changed.
	if ((!(curQuest.amount > 0) || !(curQuest.reward > 0)) && !forsed) {
		// console.log('bag quest:',JSON.stringify(curQuest))
		// console.log(curQuest.template)
		return startRandomQuest();
	}
	if (curQuest.location)
		if (!isLocationAccessible(curQuest.location) && !forsed) return startRandomQuest(); //restart
	showCurQuest();
	// console.log(`Started quest "${curQuest.type}", "${curQuest.type2}", x${curQuest.amount}, ${questDifficultyName[curQuest.difficulty]}, ${curQuest.reward} QP, hard ${curQuest.hardness}\n"${curQuest.description}"`)
}



var progressQuest = function(type, type2, amount) {
	// if (window.logp)
	// 	console.log('progressQuest(' + Array.from(arguments).join(',') + ')')
		// console.log(type);
		// console.log(type2);
		// console.log(player.curQuest);
	if (type === player.curQuest.type) {
		if (type2 === player.curQuest.type2 || type2 === "none" || player.curQuest.type2 === "none") {
			player.curQuest.progress += amount;
			showCurQuest();
			if (player.curQuest.progress >= player.curQuest.amount && !player.curQuest.notified) {
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
var HARDER = 3;
var IMPOSSIBLE = 4;

//           >----- Type -----<    >---- Description ----< [ [Difficulty MinAmt RndAmt  gainMult (baseGain) (Hardness) (type2) ] ]
//addQuests('defeatPokemonRoute', 'Defeat $amount; Pokemon', [[    EASY,    10,    30,     1,         1,         0     (null)  ]]);
// base: 1 kill
addQuests('defeatPokemonRoute', 'Defeat $_amount; Pokemon on route $type2;', [
	[EASY,        10, 20,  1, 0.8,   0],
	[MEDIUM,      50, 20,  1, 0.9,   5],
	[HARD,       150, 20,  1,   1,  10],
	[HARDER,     300, 20,  1, 1.2,  15],
	[IMPOSSIBLE, 500, 20,  1,   2,  20]
]);
// base: 1.2 kill
addQuest('capturePokemonRoute', 'Capture $_amount; Pokemon on route $type2;', [
	[EASY,         8, 16,  1.2,   1,   0],
	[MEDIUM,      40, 16,  1.2, 1.1,   5],
	[HARD,       120, 16,  1.2, 1.2,  10],
	[HARDER,     240, 16,  1.2, 1.5,  10],
	[IMPOSSIBLE, 400, 16,  1.2,   2,  20]
]);
// base: 50kills(route,no use) | 20 kills(route,use) | 5 kills(dung,random) | 3 kills(dung,plan) |  4 used
addQuests('findItems', 'Find $_amount; items', [
	[EASY,         2, 4,  4],
	[MEDIUM,      10, 4,  4],
	[HARD,        30, 4,  5],
	[HARDER,      60, 4,  6],
	[IMPOSSIBLE, 100, 4,  7]
]);
// base: 1/2k (route,no use) | 1/1k (route,use) | 1.5/1.7 used
addQuests('gainMoney', 'Gain $_amount; money', [
	[EASY,        15000, 30000,  0.0017],
	[MEDIUM,      75000, 30000,  0.0017],
	[HARD,       225000, 30000,  0.0017],
	[HARDER,     450000, 30000,  0.0017],
	[IMPOSSIBLE, 750000, 30000,  0.0017]
]);
// base: 1.2/45=1/37.5 | 37.5 used
addQuests('gainTokens', 'Gain $_amount; dungeon tokens', [
	[EASY,         375, 750,  0.027],
	[MEDIUM,      1875, 750,  0.027],
	[HARD,        5625, 750,  0.027],
	[HARDER,     11250, 750,  0.027],
	[IMPOSSIBLE, 18750, 750,  0.027]
]);
// base: 512*100||1.2*4000
addQuest('captureShinies', 'Capture $_amount; shinies', 
	IMPOSSIBLE, 1, 0, 6000 // that's 1200QP!
);
// base: 10
//        >--- Type ---<   >---------- Description ----------< [ [Difficulty MinAmt RndAmt  gainMult (baseGain) (Hardness) (type2) ] ]
addQuests('clearDungeons', 'Clear the $type2; $_amount; times', [
	[EASY,        1,   3,  1, 10,  0, [0,1,2]],
	[MEDIUM,      5,   3,  1, 10,  0, [0,1,2]],
	[HARD,       15,   3,  1, 10,  0, [0,1,2]],
	[HARDER,     30,   2,  1, 10,  0, [0,1,2]],
	[IMPOSSIBLE, 50,   1,  1, 10,  0, [0,1,2]],
	[IMPOSSIBLE,  7, 0.2,  2, 10,  0, [3,4,5]],
	[IMPOSSIBLE,  5, 0.1,  4, 10,  0, [6,7,8,9]]
]);
addQuest('clearDungeons', 'Clear any dungeon $_amount; times',
	MEDIUM, 5,3, 10
);
// base: 2,2, 3,4, 5.5,7, 8.5,10
addQuests('clearGyms', 'Clear the $type2; $amount; times', [
	[EASY,   1, 3,    2, 1,  0, [0,1]],
	[MEDIUM, 1, 2,  3.5, 1,  0, [2,3]],
	[HARD,   1, 1,  6.3, 1,  0, [4,5]],
	[HARDER, 1, 2,  9.3, 1,  0, [6,7]]
]);
addQuest('clearGyms', 'Clear any gym $_amount; times',
	MEDIUM, 1, 2,  3.5
);
// base: 1 kill | 1/3 kills(dung) | 2 used
addQuests('gainShards', 'Gain $_amount; shards (any type)', [
	[EASY,         20, 40,  0.4],
	[MEDIUM,      100, 40,  0.5],
	[HARD,        300, 40,  0.6],
	[HARDER,      600, 40,  0.7],
	[IMPOSSIBLE, 1000, 40,  0.8]
]);
// base: 125/4 kills | 62/4 kills(item) | 33 used
addQuests('breedPokemon', 'Hatch $_amount; eggs', [
	[MEDIUM,     1.5, 0.6,  33],
	[HARD,       4.5, 0.6,  33],
	[HARDER,       9, 0.6,  33],
	[IMPOSSIBLE,  15, 0.6,  33]
]);
////////////////////////
// TRYING MULTIPLATES //
////////////////////////
//addQuestMultiplate(type,difficulty,list,base,quests,fn)
addQuestMultiplate('gainShards',MEDIUM,
	['type2','rewardMultiplier','randomAmount','location','description',                                                                       'minAmount','baseReward'],
	['none',                0.5,            40,'location','Gain $_amount; $type2; shards<br><small>Recommended location is $location;</small>',         10,           1],[
	["Ground",   0.33, 30, "Digletts Cave Dungeon"],
	["Rock",     0.67, 15, "Pewter City Gym"],
	["Water",    0.44, 23, "Cerulean City Gym"],
	["Psychic",  0.53, 19, "Saffron City Gym"],
	["Electric", 0.33, 30, "Vermillion City Gym"],
	["Poison",   0.33, 30, "Fuchsia City Gym"],
	["Grass",     0.5, 20, "Celadon City Gym"],
	["Fairy",       2,  5, "Mt. Moon Dungeon"],
	["Bug",      0.67, 15, "Viridian Forest Dungeon"],
	["Fire",     0.33, 30, "Cinnabar Island Gym"],
	["Ice",      0.83, 12, "Elite Lorelei"],
	["Fighting", 0.56, 18, "Elite Bruno"],
	["Flying",   1.11,  9, "Elite Lance"],
	["Ghost",       1, 10, "Pokemon Tower Dungeon"],
	["Dragon",   0.67, 15, "Elite Lance"],
	["Normal",   1.33,  8, "Route 1"],
	["Steel",    2.33,  4, "Power Plant Dungeon"]],
	function(quest){});

////////////////////////////////////
// UNOPTIMIZED QUESTS FOR TESTING //
////////////////////////////////////
//addQuest(type, description, difficulty, minAmount, randomAmount, rewardMultiplier, baseReward, hardness, type2)
/* UNDERGROUND */
// addQuest('clearUnderground','clearUnderground',EASY, 1,0, 5,5, 0,'none'); // tested

// addQuest('digUnderground','digUnderground',EASY, 1,0, 5,5, 0,'none'); // tested
// addQuest('digUnderground','digUnderground',EASY, 1,0, 5,5, 0,'chisel'); // tested
// addQuest('digUnderground','digUnderground',EASY, 1,0, 5,5, 0,'hammer'); // tested

// addQuest('tilesUnderground','tilesUnderground',EASY, 1,0, 5,5, 0,'none'); // tested
// addQuest('tilesUnderground','tilesUnderground',EASY, 1,0, 5,5, 0,'chisel'); // tested
// addQuest('tilesUnderground','tilesUnderground',EASY, 1,0, 5,5, 0,'hammer'); // tested

// addQuest('itemsUnderground','itemsUnderground',EASY, 1,0, 5,5, 0,'none'); // tested
// addQuest('dealsUnderground','dealsUnderground',EASY, 1,0, 5,5, 0,'none'); // tested



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
	startQuest(possibleQuests[random]/*,1*/);
}

var getQuestsByDifficulty = function(difficulty){
																				return[questList.pop()];
	difficulty = Math.min(questDifficultyName.length-1, Math.floor(Math.sqrt(difficulty)));
	var list = [];
	for( var i = 0; i<questList.length; i++){
		if(questList[i].type === player.curQuest.type) {
			continue;
		}
		if( questList[i].difficulty === difficulty){
			list.push(questList[i]);
		} else {
			if (Math.random()>(questList[i].difficulty - difficulty)*0.4){
				list.push(questList[i]);
			}
		}
	}
	// console.log(difficulty);
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
