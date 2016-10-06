var Egg = function(type, steps, pokemon){
	var temp = {
		type:type,
		steps:steps,
		progress: 0,
		pokemon:pokemon
	}
	return temp;
}

var possibleEggs = Array.apply(null, Array(17)).map(Number.prototype.valueOf,0);

var eggSlotPrice = [0, 25000, 100000, 1000000];

var initPossibleEggs = function(){
	var fireEggs = ["Charmander", "Vulpix", "Growlithe", "Ponyta"];
	var waterEggs = ["Squirtle", "Lapras", "Staryu", "Psyduck"];
	var grassEggs = ["Bulbasaur", "Oddish", "Paras", "Bellsprout"];
	var fightEggs = ["Hitmonlee", "Hitmonchan", "Machop", "Mankey"];
	var electricEggs = ["Magnemite", "Pikachu", "Voltorb", "Electabuzz"];
}

var gainEgg = function(egg){
	for(var i = 0; i<player.eggSlots; i++){
		if(player.eggList[i] === null){
			var tempEgg = {
				type: egg.type,
				steps: egg.steps,
				progress: 0,
				pokemon: egg.pokemon
			}
			player.eggList[i] = tempEgg;
			return;
		}
	}
	showEggs();
}

var progressEgg = function(amount){
	for(var i = 0; i<player.eggList.length; i++){
		if(player.eggList[i] !== null){
			player.eggList[i].progress += amount;
		}
	}
	checkEggHatch();
	// showEggs();
}

var checkEggHatch = function(){
	for(var i = 0; i<player.eggList.length; i++){
		var egg = player.eggList[i];
		if(egg !== null){
			if( egg.progress >= egg.steps){
				hatchEgg(egg);
				player.eggList[i] = null;
			}
		}
	}
}

var hatchEgg = function(egg){
	$.notify("You hatched a " + egg.pokemon, 'success');
	progressQuest('breedPokemon', "none", 1);
	capturePokemon(egg.pokemon);
	showEggs();
}

var showEggs = function(){
	for(var i = 0; i<player.eggList.length; i++){
		var html = ""
		if(player.eggList[i] !== null){
			html += "<img class='egg' src=images/breeding/egg.png>";
			html += "<div class='progress eggProgress' style='width: 80%; margin:auto'>";
			html += 	"<div class='progress-bar progress-bar-success' style='width: " + player.eggList[i].progress/player.eggList[i].steps*100 + "%'>";
			html += 		"<span class='sr-only'></span>";
			html +=		"</div>";
			html += "</div>";
		}
		$("#egg"+i).html(html)
	}
}

var pikachuEgg = Egg('electric', 1000, "Pikachu");
gainEgg(pikachuEgg);