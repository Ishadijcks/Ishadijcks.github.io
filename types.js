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
	for( var i = 0; i<17; i++){
		var row = [];
		for(var j = 0; j<17; j++){
			row.push(1);
		}
	typeEffectiveness.push(row);
	}


	typeEffectiveness[NORMAL][ROCK] = 0.5;
	typeEffectiveness[NORMAL][GHOST] = 0;
	typeEffectiveness[NORMAL][STEEL] = 0.5;
	typeEffectiveness[FIRE][FIRE] = 0.5;
}


