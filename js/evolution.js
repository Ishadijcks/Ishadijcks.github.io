var checkEvolution = function(){

	for( var i = 0; i<player.caughtPokemonList.length; i++){ // For all pokemon that you have captured, do the following:

		if(player.caughtPokemonList[i].evoLevel != null){ // If the pokemon can actually evolve

			curPokemon = player.caughtPokemonList[i]; // Grab the pokemon we are currently evaluating

			if( experienceToLevel(curPokemon.experience, curPokemon.levelType) >= curPokemon.evoLevel && !curPokemon.evolved){  // If this pokemons level is high enough, and not evolved yet.
				oakExplainEvolution();
				$.notify("Your "+curPokemon.name+" evolved into "+curPokemon.evolution+"!", 'success');

				player.caughtPokemonList[i].evolved = 1; // Mark it as evolved.
				capturePokemon(curPokemon.evolution); // Capture it's evolution

			}
		}
	}
}