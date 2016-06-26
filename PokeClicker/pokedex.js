var showPokedex = function(){
	html = "<div class='row'>";
	console.log("asd");
	var max = highestPokemonId();
	for( var i = 0; i<= max; i++){
		html += "<div class='col-sm-3 col-md-2 pokedexEntry'>";
		if( player.defeatNumbers[i] > 0 || player.catchNumbers[i] > 0){
			html += "<img class='center-block' id='pokedexImage' src=images/"+(i+1)+".png >";
			html += "<div class='pokedexRank rank"+ Math.min(6,pokedexRank(player.defeatNumbers[i])) + "''>" + Math.min(6,pokedexRank(player.defeatNumbers[i]))+ "</div>"
			html += "<p class='pokedexText'>"+ pokemonList[i].name + "</p>";
			html += "<p class='pokedexText'>Defeated: "+ player.defeatNumbers[i]+ "</p>";
			html += "<p class='pokedexText'>Captured: "+ player.catchNumbers[i] + "</p>";
		}
		else {
			html += "<img class='center-block' id='unkownPokemonImage' src=images/unknownPokemon.png >";
			html += "<p>"+(i+1)+"</p>"	
		}
		
		
		html += "</div>";
	}
	html += "</div>"
	$("#pokedexBody").html(html);
}

var highestPokemonId = function(){
	for( var i = pokemonList.length-1; i>0; i--){
		if ( player.defeatNumbers[i] > 0 || player.catchNumbers[i] > 0){
			return i;
		}
	}
	return 150;
}

var pokedexBonus = function(kills){
	return pokedexRank(kills)/10 + 1;
}

var pokedexRank = function(kills){
	if(kills <= 0){
		return 0;
	}
	else {
		return Math.min((Math.floor(Math.log10(kills) + 1)),6);
	}	
}