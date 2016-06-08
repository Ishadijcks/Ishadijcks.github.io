var checkEvolution = function(){
	for( var i = 0; i<player.caughtPokemonList.length; i++){
		if(player.caughtPokemonList[i].evoLevel != null){
			curPokemon = player.caughtPokemonList[i];
			if( experienceToLevel(curPokemon.experience, curPokemon.levelType) >= curPokemon.evoLevel && !curPokemon.evolved){
				log("Your "+curPokemon.name+" evolved into "+curPokemon.evolution+"!");
				capturePokemon(curPokemon.evolution);
				player.caughtPokemonList[i].evolved = 1;
			}
		}
	}
}