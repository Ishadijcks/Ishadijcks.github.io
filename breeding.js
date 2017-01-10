var Egg = function(type, steps, pokemon){
	var temp = {
		type:type,
		steps:steps,
		progress: 0,
		shinyProgress: 0,
		pokemon:pokemon ,
		notified: 0,
	}
	return temp;
}

var possibleEggs = Array.apply(null, Array(17)).map(Number.prototype.valueOf,0);

var eggSlotPrice = [0, 500, 1000, 2500];

var initPossibleEggs = function(){
	var fireEggs = ["Charmander", "Vulpix", "Growlithe", "Ponyta"];
	var waterEggs = ["Squirtle", "Lapras", "Staryu", "Psyduck"];
	var grassEggs = ["Bulbasaur", "Oddish", "Tangela", "Bellsprout"];
	var fightEggs = ["Hitmonlee", "Hitmonchan", "Machop", "Mankey"];
	var electricEggs = ["Magnemite", "Pikachu", "Voltorb", "Electabuzz"];
	var dragonEggs = ["Dratini", "Dragonair", "Dragonite"];
	possibleEggs[FIRE] = fireEggs;
	possibleEggs[WATER] = waterEggs;
	possibleEggs[GRASS] = grassEggs;
	possibleEggs[FIGHTING] = fightEggs;
	possibleEggs[ELECTRIC] = electricEggs;
	possibleEggs[DRAGON] = dragonEggs;
}

var gainRandomEgg = function(type){
	if(type === "random"){
		var eggs = [];
		for(var i = 0; i<possibleEggs.length; i++){
			for( var j = 0; j<possibleEggs[i].length; j++){
				eggs.push(possibleEggs[i][j]);
			}
		} 
		var eggName = eggs[Math.floor(Math.random()*(eggs.length))];
		var type = getPokemonByName(eggName).type;
		gainEgg(Egg(type, getSteps(eggName), eggName));
	} else {
		var num = typeToNumber(type);
		var eggs = possibleEggs[num];
		var eggName = eggs[Math.floor(Math.random()*(eggs.length))];
		gainEgg(Egg([type], getSteps(eggName), eggName));
	}
}

var gainPokemonEgg = function(pokemonName){
	var pokemon = getPokemonByName(pokemonName);
	gainEgg(Egg(pokemon.type, getSteps(pokemonName), pokemonName));
}

var gainMineEgg = function(itemId){
    if(breedSlotLeft()) {
        sellMineItem(itemId);
        var type = ["amber"];
        var pokemonName = "Aerodactyl";
        if (itemId === 1) {
            type = ["helix"];
            pokemonName = "Omanyte";
        } else if (itemId === 2) {
            type = ["dome"];
            pokemonName = "Kabuto";
        }
        var pokemon = getPokemonByName(pokemonName);
        gainEgg(Egg(type, getSteps(pokemonName), pokemonName));
    } else {
        $.notify("Your hatchery is full");
    }
}

var getSteps = function(pokemonName){
	var pokemon = getPokemonByName(pokemonName);
	if( pokemon.eggCycles === undefined){
		return 500;
	} else {
		return pokemon.eggCycles * 40;
	}
}

var gainEgg = function(egg){
	var eggType;
	if (egg.type[0] == 'Normal' && egg.type.length == 2) {
		eggType = egg.type[1];
	} else {
		eggType = egg.type[0];
	}
	for(var i = 0; i<player.eggSlots; i++){
		if(player.eggList[i] === null){
			var tempEgg = {
				type: eggType,
				steps: egg.steps,
				progress: 0,
				shinyProgress: 0,
				pokemon: egg.pokemon
			}
			player.eggList[i] = tempEgg;
			showEggs();
			return;
		}
	}
	save();
}

var releasePokemon = function(pokemonName){
	var index = -1;
	for(var i = 0; i<player.caughtPokemonList.length; i++){
		if(player.caughtPokemonList[i].name === pokemonName){
			index = i;
		}
	}
	if (index > -1) {
    	player.caughtPokemonList.splice(index, 1);
	}
	updateCaughtList();
}

var breedPokemon = function(pokemonName){
	if(pokemonName === "Farfetch"){
		pokemonName = "Farfetch'd";
	}
	for(var i = 0; i<player.eggSlots; i++){
		if(player.eggList[i] === null){
			var pokemon = getCaughtPokemonByName(pokemonName);
			if(canBreed(pokemon)){
				gainPokemonEgg(pokemonName);
				releasePokemon(pokemonName);
			}
			showMom();
			$.notify("You start breeding...", "success");
			$.notify("You leave your " + pokemonName + " with your mom", "success");
			save();
			return;
		}
	}
	$.notify("Your hatchery is full");
	save();
}

var breedSlotLeft = function(){
	for(var i = 0; i<player.eggSlots; i++){
		if(player.eggList[i] === null){
			return true;
		}
	}
	return false;
}

var progressEgg = function(amount){
	if(isActive("Blaze Cassette")){
		amount *= getOakItemBonus("Blaze Cassette");
	}
	for(var i = 0; i<player.eggList.length; i++){
		if(player.eggList[i] !== null){
			if(player.eggList[i].progress < player.eggList[i].steps && isActive("Shiny Charm")){
				//Prevent the egg from having more shinyProgress then steps if amount would go over the max (eg if progress is 499 and steps is 5 the egg doesn't get 504 shinyprogress)
				player.eggList[i].shinyProgress = Math.min(player.eggList[i].steps, player.eggList[i].shinyProgress + amount);
			}
			player.eggList[i].progress += amount;
		}
	}
	checkEggHatch();
	showEggs();
}

var checkEggHatch = function(){
	for(var i = 0; i<player.eggList.length; i++){
		var egg = player.eggList[i];
		if(egg !== null){
			if( egg.progress >= egg.steps){
				if(!egg.notify){
					egg.notify = 1;
					$.notify("One of your eggs is ready to hatch!", "success");
					notifyMe("One of your eggs is ready to hatch!");
				}
			}
		}
	}
}

var hatchEgg = function(i){
	var egg = player.eggList[i];
	player.eggList[i] = null;
	$.notify("You hatched " + egg.pokemon, 'success');
	progressQuest('breedPokemon', "none", 1);
	capturePokemon(egg.pokemon, generateEggShiny(egg));
	player.totalBred++;
	showEggs();
	save();
}

var buyEggSlot = function(i){
	if(canBuyEggSlot(i)){
		player.questPoints -= eggSlotPrice[i];
		player.eggSlots++;
		showEggs();
		save();	
	}
}

var canBuyEggSlot = function(i){
	return player.questPoints >= eggSlotPrice[i];
}

var showEggs = function(){
	for(var i = 0; i<player.eggList.length; i++){
		var html = ""
		if(player.eggList[i] !== null){
			if( player.eggList[i].progress >= player.eggList[i].steps){
				html += "<img style='cursor:pointer;' onClick='hatchEgg(" + i + ")' title='" + player.eggList[i].type + "' class='egg tooltipUp' src=images/breeding/egg" + player.eggList[i].type.toLowerCase() + ".png>"
			} else{
				html += "<img title='" + player.eggList[i].type + "' class='egg tooltipUp' src=images/breeding/egg" + player.eggList[i].type.toLowerCase() + ".png>";
			}
			if(player.eggList[i].progress < player.eggList[i].steps){
				html += "<div title='" + Math.floor(player.eggList[i].progress) + "/" + player.eggList[i].steps + "' class='progress eggProgress tooltipEggProgress' style='width: 80%; margin:auto'>";
			} else {
				html += "<div title='Click on the egg to hatch it!' class='progress eggProgress tooltipEggProgress' style='width: 80%; margin:auto'>";
			}
			html += 	"<div class='progress-bar progress-bar-success' style='width: " + Math.floor(player.eggList[i].progress)/player.eggList[i].steps*100 + "%'>";
			html += 		"<span class='sr-only'></span>";
			html +=		"</div>";
			html += "</div>";
		} else {
			if( i == player.eggSlots && canBuyEggSlot(i)){
				html += "<br><button class='egg btn btn-info' onClick='buyEggSlot("+i+")'>" + eggSlotPrice[i] + " QP</p><p>Egg slot</p>";
			} else if (i >= player.eggSlots){
				html += "<br><button class='egg btn btn-info disabled'>" + eggSlotPrice[i] + " QP</p><p>Egg slot</p>";
			}
		}
		$("#egg"+i).html(html)
	}

	$(".tooltipUp").tooltipster({
		position: "top"
	});

	$(".tooltipEggProgress").tooltipster({
		position: "bottom"
	});
}

var showMom = function(){
	var html = "<div class='row'>";
	html += "<p>Breed your level 100 Pokemon.</p>";
	html += "<p>You lose your Pokemon, but gain an egg with the same Pokemon</p>";
    html += "<p>Hatched Pokemon have a big chance to be shiny!</p>"
	html += "<p>Defeat wild Pokemon to hatch your eggs.</p>";
	html += "<p>Click on a Pokemon to breed them!</p>"
	html += "</div>";
	html += "<div class='row'>";
	for( var i = 0; i<player.caughtPokemonList.length; i++){
		if(canBreed(player.caughtPokemonList[i])){
			html += "<div data-pokemon='" + player.caughtPokemonList[i].name + "' class='col-sm-3 col-md-2 pokedexEntry breedPokemon' style='height:auto;'>";
			html += "<img class='center-block' id='pokedexImage' src=images/pokemon/"+player.caughtPokemonList[i].id+".png >";
			html += "<p>" + player.caughtPokemonList[i].name + "</p>";
			html += "</div>"
		}
	}

	html += "</div";

	$("#breedingBody").html(html);
	$("#breedingModal").modal('show');
}

var canBreed = function(pokemon){
	var pokemonLevel = experienceToLevel(pokemon.experience, pokemon.levelType);
	return pokemonLevel >= 100 && !pokemon.shiny;
}

var generateEggShiny = function(egg){
	var chance = 1024;
	if(isActive("Shiny Charm")){
		chance /= getOakItemBonus("Shiny Charm") - (1-(egg.shinyProgress/egg.steps));
	}
	var number = Math.floor(Math.random()*chance) + 1;

	if(number <= 1){
		console.log("Shiny!!!");
		return 1;
	}
	return 0;
};