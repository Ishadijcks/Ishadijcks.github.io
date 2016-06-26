var showPokedex = function(){
	html = "";
	html += "<div class='row'>";
		html += "<div class='col-sm-4 col-sm-offset-2'>";
			html += "<h3>Unique Pok&eacute;mon captured: "+getUniqueCaptures()+"</h3><h3>Total Pok&eacute;mon captured: "+getTotalCaptures()+"</h3>";
		html += "</div>"
		html += "<div class='col-sm-4 col-sm-offset-2'>";
			html += "<h3>Total Pok&eacute;mon defeated: "+getTotalDefeats()+"</h3><h3>Total Pok&eacute;mon bred: 0</h3>";
		html += "</div>"
	html += "</div>";
	html += "<div class='row'>";
	
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