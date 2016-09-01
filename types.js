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

var initTypeEffectiveness = function(){
	typeEffectiveness = [];
	for( var i = 0; i<17; i++){
		var row = [];
		for(var j = 0; j<17; j++){
			row.push(1);
		}
	typeEffectiveness.push(row);
	}


	typeEffectiveness[NORMAL][ROCK] = getNotEffective(NORMAL);
	typeEffectiveness[NORMAL][GHOST] = 0;
	typeEffectiveness[NORMAL][STEEL] = getNotEffective(NORMAL);
	typeEffectiveness[FIRE][FIRE] = getNotEffective(FIRE);
	typeEffectiveness[FIRE][NORMAL] = getNotEffective(FIRE);
	typeEffectiveness[FIRE][GRASS] = getVeryEffective(FIRE);


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


var gainShards = function(type, amount){
	
	player.typeShards[typeToNumber(type)] += amount;
}

var getNotEffective = function(type){
	return Math.min(0.5 + player.notEffectiveTypeBonus[type], 1);
}

var getNormal = function(type){
	return Math.min(1 + player.normalEffectiveTypeBonus[type], 1.5);
}

var getVeryEffective = function(type){
	return Math.min(1.5 + player.veryEffectiveTypeBonus[type], 2);
}

