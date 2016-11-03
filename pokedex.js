var showPokedex = function(){
	html = "";
	html += "<div class='row'>";
		html += "<div class='col-md-4 col-md-offset-2'>";
			html += "<h3>Unique Pok&eacute;mon captured: "+getUniqueCaptures()+"</h3><h3>Total Pok&eacute;mon captured: "+getTotalCaptures()+"</h3>";
		html += "</div>"
		html += "<div class='col-md-4 col-md-offset-2'>";
			html += "<h3>Unique shinies captured: "+getTotalShinies()+"</h3><h3>Total Pok&eacute;mon defeated: "+getTotalDefeats()+"</h3>";
		html += "</div>"
	html += "</div>";
	html += "<div class='row'>";
	
	var max = highestPokemonId();
	for( var i = 0; i<= max; i++){
		html += "<div class='col-sm-3 col-md-2 pokedexEntry'>";
		if( player.defeatNumbers[i] > 0 || player.catchNumbers[i] > 0){

			if(isShiny(pokemonList[i].name)){
				html += "<img class='center-block shinyFiller' id='pokedexImage' src=images/shinypokemon/"+(i+1)+".png >";
			} else {
				html += "<img class='center-block' id='pokedexImage' src=images/pokemon/"+(i+1)+".png >";
			}
			html += "<div title='You gain " + Math.min(6,pokedexRank(player.defeatNumbers[i]))*10 + "% more exp when defeating this Pokemon' class='pokedexRank rank"+ Math.min(6,pokedexRank(player.defeatNumbers[i])) + "''><span class='pokedexRankText'>"+ Math.min(6,pokedexRank(player.defeatNumbers[i]))+ "</span></div>"
			
			if( isShiny(pokemonList[i].name)){
				html += "<span class='pokedexText'>"+ pokemonList[i].name + "</span><img class='shinyPokedexStar' src='images/shinypokemon/star.png'>";
			} else {
				html += "<p class='pokedexText'>"+ pokemonList[i].name + "</p>";
			}
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

var getUniqueCaptures = function(){
	return player.caughtPokemonList.length;
}

var getTotalDefeats = function(){
	var total = 0;
	for (var i = 0; i< player.defeatNumbers.length; i++){
		if(player.defeatNumbers[i] > 0){
			total += player.defeatNumbers[i];
		}
	}
	return total;
}

var getTotalCaptures = function(){
	var total = 0;
	for (var i = 0; i< player.catchNumbers.length; i++){
		if(player.catchNumbers[i] > 0){
			total += player.catchNumbers[i];
		}
	}
	return total;
}

var getTotalShinies = function(){
	var total = 0;
	for (var i = 0; i< player.caughtPokemonList.length; i++){
		if(player.caughtPokemonList[i].shiny == 1){
			total++;
		}
	}
	return total;
}