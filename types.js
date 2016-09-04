var NORMAL = 0;
var FIRE = 1;
var WATER = 2;
var ELECTRIC = 3;
var GRASS = 4;
var ICE = 5;
var FIGHTING = 6;
var POISON = 7;
var GROUND = 8;
var FLYING = 9;
var PSYCHIC = 10;
var BUG = 11;
var ROCK = 12;
var GHOST = 13;
var DRAGON = 14;
var DARK = 15;
var STEEL = 16;
var FAIRY = 17;


var typeEffectiveness = [];

var numberToType = ["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock",	"ghost","dragon","dark","steel","fairy"];

var typeColorLocked = ["9da07d","f85858","6b94ff","ffc663","73e763","b5efef","e78c6b","c684ff","cead7b","4ac6ff","ffb5ad","cef77b","d6bd94","948cad","ce6363","7394b5","AAAAAA"];
var typeColorUnlocked = ["595c3b","b10818","294a94","b57b31","4a944a","42a59c","b54a4a","7b42c6","946b4a","218cb5","ce6363","8cb521","a58c4a","737373","8c424a","4a6b84","737373"];

var initTypeEffectiveness = function(){
	typeEffectiveness = [];
	for( var i = 0; i<17; i++){
		var row = [];
		for(var j = 0; j<17; j++){
			row.push(getNormalEffective(i));
		}
	typeEffectiveness.push(row);
	}


	typeEffectiveness[NORMAL][ROCK] = getNotEffective(NORMAL);
	typeEffectiveness[NORMAL][GHOST] = 0;
	typeEffectiveness[NORMAL][STEEL] = getNotEffective(NORMAL);
	
	typeEffectiveness[FIRE][FIRE] = getNotEffective(FIRE);
	typeEffectiveness[FIRE][NORMAL] = getNotEffective(FIRE);
	typeEffectiveness[FIRE][GRASS] = getVeryEffective(FIRE);
	typeEffectiveness[FIRE][ICE] = getVeryEffective(FIRE);
	typeEffectiveness[FIRE][BUG] = getVeryEffective(FIRE);
	typeEffectiveness[FIRE][ROCK] = getNotEffective(FIRE);
	typeEffectiveness[FIRE][STEEL] = getNotEffective(FIRE);
	typeEffectiveness[FIRE][DRAGON] = getVeryEffective(FIRE);

	typeEffectiveness[WATER][FIRE] = getVeryEffective(WATER);
	typeEffectiveness[WATER][WATER] = getNotEffective(WATER);
	typeEffectiveness[WATER][GRASS] = getNotEffective(WATER);
	typeEffectiveness[WATER][GROUND] = getVeryEffective(WATER);
	typeEffectiveness[WATER][ROCK] = getVeryEffective(WATER);
	typeEffectiveness[WATER][DRAGON] = getNotEffective(WATER);

	typeEffectiveness[GRASS][FIRE] = getNotEffective(GRASS);
	typeEffectiveness[GRASS][WATER] = getVeryEffective(GRASS);
	typeEffectiveness[GRASS][GRASS] = getNotEffective(GRASS);
	typeEffectiveness[GRASS][POISON] = getNotEffective(GRASS);
	typeEffectiveness[GRASS][GROUND] = getVeryEffective(GRASS);
	typeEffectiveness[GRASS][FLYING] = getNotEffective(GRASS);
	typeEffectiveness[GRASS][BUG] = getNotEffective(GRASS);
	typeEffectiveness[GRASS][ROCK] = getVeryEffective(GRASS);
	typeEffectiveness[GRASS][DRAGON] = getNotEffective(GRASS);
	typeEffectiveness[GRASS][STEEL] = getNotEffective(GRASS);

	
}

var typeToNumber = function(type){
	switch(type) {
		case "normal":
			return 0;
		case "fire":
			return 1;
		case "water":
			return 2;
		case "electric":
			return 3;
		case "grass":
			return 4;
		case "ice":
			return 5;
		case "fighting":
			return 6;
		case "poison":
			return 7;
		case "ground":
			return 8;
		case "flying":
			return 9;
		case "psychic":
			return 10;
		case "bug":
			return 11;
		case "rock":
			return 12;
		case "ghost":
			return 13;
		case "dragon":
			return 14;
		case "dark":
			return 15;
		case "steel":
			return 16;
		case "fairy":
			return 17;
	}
}


var buyUpgrade = function(type, eff){
	switch(eff){
		case 1:
			buyNotUpgrade(type);
			break;
		case 2:
			buyNormalUpgrade(type);
			break;
		case 3:
			buyVeryUpgrade(type);
			break;
	}
	initTypeEffectiveness();
	showShardModal();
}

var buyNotUpgrade = function(type){
	var cost = 500*(player.notEffectiveTypeBonus[type]+1);
	if(player.typeShards[type] >= cost && player.notEffectiveTypeBonus[type] < 10){
		player.typeShards[type] -= cost;
		player.notEffectiveTypeBonus[type]++;
	} else {

		$.notify("You don't have enough " + numberToType[type] + " shards", "error");
	}
}

var buyNormalUpgrade = function(type){
	var cost = 500*(player.normalEffectiveTypeBonus[type]+1);
	if(player.typeShards[type] >= cost && player.normalEffectiveTypeBonus[type] < 10){
		player.typeShards[type] -= cost;
		player.normalEffectiveTypeBonus[type]++;
	} else {
				console.log(cost);
		$.notify("You don't have enough " + numberToType[type] + " shards", "error");
	}
}

var buyVeryUpgrade = function(type){
	var cost = 500*(player.veryEffectiveTypeBonus[type]+1);
	if(player.typeShards[type] >= cost && player.veryEffectiveTypeBonus[type] < 10){
		player.typeShards[type] -= cost;
		player.veryEffectiveTypeBonus[type]++;
	} else {
		$.notify("You don't have enough " + numberToType[type] + " shards", "error");
	}	
}

var showShardModal = function(){
	$("#shardModal").modal("show");
	var html = ""
	for(var i = 0; i<17; i++){
		html += "<table class=shardTable>";
		html += "<tr> <td style='width:15%'>" +numberToType[i] + "</td><td>Not very effective:</td>";
		html +=	"<td>" + getNotEffective(i).toFixed(2) + "x</td>";
		html += "<td style='width:50%'>";
		for( var j = 0; j<player.notEffectiveTypeBonus[i]; j++){
			html += "<div style='background-color:#" + typeColorUnlocked[i] + "' class='col-sm-1 shardUpgrade'></div>";
		}
		for(var j = player.notEffectiveTypeBonus[i]; j<10; j++){
			html += "<div style='background-color:#" + typeColorLocked[i] + "' class='col-sm-1 shardUpgrade shardUpgradeLocked'></div>";	
		}
		
		html += "<td class='shardColumn4'>";
		if (player.notEffectiveTypeBonus[i] < 10){
			html += "<button class='tooltipShard' title='" +500*(player.notEffectiveTypeBonus[i]+1) + " " + numberToType[i] + " shards' onclick='buyUpgrade("+ i + "," + 1 +")'>Upgrade</button>";
		} else {
			html += "<button class='disabled'>Upgrade</button>";
		}

		html += "</td></td></tr>";

		html +="<tr><td><img class= shardImage' id='normalShard' src='images/shards/" + i + ".png'> " + player.typeShards[i] + "</td>";
		html +="<td>Normal:</td>";
		html +="<td>"+getNormalEffective(i).toFixed(2)+"x</td>";
		html +="<td style='width:50%'>";
		for( var j = 0; j<player.normalEffectiveTypeBonus[i]; j++){
			html += "<div <div style='background-color:#" + typeColorUnlocked[i] + "' class='col-sm-1 shardUpgrade'></div>";
		}
		for(var j = player.normalEffectiveTypeBonus[i]; j<10; j++){
			html += "<div <div style='background-color:#" + typeColorLocked[i] + "' class='col-sm-1 shardUpgrade shardUpgradeLocked'></div>";
		}
		
		html += "<td class='shardColumn4'>";
		if (player.normalEffectiveTypeBonus[i] < 10){
			html += "<button class='tooltipShard' title='" +500*(player.normalEffectiveTypeBonus[i]+1) + " " + numberToType[i] + " shards' onclick='buyUpgrade("+ i + "," + 2 +")'>Upgrade</button>";
		} else {
			html += "<button class='disabled'>Upgrade</button>";
		}
		html += "</td></td></tr>";


		html +="<tr><td></td>";
		html +="<td>Very effective:</td>";
		html +="<td>"+getVeryEffective(i).toFixed(2)+"x</td>";
		html +="<td style='width:50%'>";
		for( var j = 0; j<player.veryEffectiveTypeBonus[i]; j++){
			html += "<div <div style='background-color:#" + typeColorUnlocked[i] + "' class='col-sm-1 shardUpgrade'></div>";
		}
		for(var j = player.veryEffectiveTypeBonus[i]; j<10; j++){
			html += "<div <div style='background-color:#" + typeColorLocked[i] + "' class='col-sm-1 shardUpgrade shardUpgradeLocked'></div>";
		}
		
		html += "<td class='shardColumn4'>";
		if (player.veryEffectiveTypeBonus[i] < 10){
			html += "<button class='tooltipShard' title='" +500*(player.veryEffectiveTypeBonus[i]+1) + " " + numberToType[i] + " shards' onclick='buyUpgrade("+ i + "," + 3 +")'>Upgrade</button>";
		} else {
			html += "<button class='disabled'>Upgrade</button>";
		}
		html += "</td></td></tr>";


		html += "</table><br><br><br>";

	}

	$("#shardBody").html(html);

	$(".tooltipShard").tooltipster({
		position: "right",
		delay:10
	});
}

var getStoneEvolutionPokemon = function(type){
	var possiblePokemon = [];
	for( var i = 0; i <player.caughtPokemonList.length; i++){
		if(isNaN(player.caughtPokemonList[i].evoLevel)){
			if(player.caughtPokemonList[i].evoLevel.indexOf(type) !== -1 ){
				possiblePokemon.push(player.caughtPokemonList[i]);
			}
		}
	}
	return possiblePokemon;
}

var gainShards = function(type, amount){
	player.typeShards[typeToNumber(type)] += amount;
}

var getNotEffective = function(type){
	return Math.min(0.5 + player.notEffectiveTypeBonus[type]*0.25, 3);
}

var getNormalEffective = function(type){
	return Math.min(1 + player.normalEffectiveTypeBonus[type]*0.25, 3.5);
}

var getVeryEffective = function(type){
	return Math.min(1.5 + player.veryEffectiveTypeBonus[type]*0.25, 4);
}

