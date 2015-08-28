var pokemonList = [
{id: 1, name: "Bulbasaur", evolution: "Ivysaur", evoLevel: 16, evolved: 0, type: "grass", attack: 49, route: 100, health:100, levelType: "medium slow", experience: 150,  }, 
{id: 2, name: "Ivysaur", evolution: "Venusaur", evoLevel: 32, evolved: 0, type: "grass", attack: 62, route:null, health:100, levelType: "medium slow", experience: 150,  }, 
{id: 3, name: "Venusaur", evolution: null, evoLevel: null, evolved: 0, type: "grass", attack: 82, route:null, health:100, levelType: "medium slow", experience: 150  }, 
{id: 4, name: "Charmander", evolution: "Charmeleon", evoLevel: 16, evolved: 0, type: "fire", attack: 52, route:100, health:100, levelType: "medium slow", experience: 150  }, 
{id: 5, name: "Charmeleon", evolution: "Charizard", evoLevel: 32, evolved: 0, type: "fire", attack: 64, route:null, health:100, levelType: "medium slow", experience: 150  }, 
{id: 6, name: "Charizard", evolution: null, evoLevel: null, evolved: 0, type: "fire", attack: 84, route:null, health:100, levelType: "medium slow", experience: 150  }, 
{id: 7, name: "Squirtle", evolution: "Wartortle", evoLevel: 16, evolved: 0, type: "water", attack: 48, route:100, health:100, levelType: "medium slow", experience: 150  }, 
{id: 8, name: "Wartortle", evolution: "Blastoise", evoLevel: 32, evolved: 0, type: "water", attack: 63, route:null, health:100, levelType: "medium slow", experience: 150  }, 
{id: 9, name: "Blastoise", evolution: null, evoLevel: null, evolved: 0, type: "water", attack: 83, route:null, health:100, levelType: "medium slow", experience: 150  }, 
{id: 10, name: "Caterpie", evolution: "Metapod", evoLevel: 7, evolved: 0, type: "bug", attack: 30, route:2, health:100, levelType: "medium fast", experience: 150  }, 
{id: 11, name: "Metapod", evolution: "Butterfree", evoLevel: 10, evolved: 0, type: "bug", attack: 20, route:24, health:100, levelType: "medium fast", experience: 150  }, 
{id: 12, name: "Butterfree", evolution: null, evoLevel: null, evolved: 0, type: "bug", attack: 45, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 13, name: "Weedle", evolution: "Kakuna", evoLevel: 7, evolved: 0, type: "bug", attack: 35, route:2, health:100, levelType: "medium fast", experience: 150  },
{id: 14, name: "Kakuna", evolution: "Beedrill", evoLevel: 10, evolved: 0, type: "bug", attack: 25, route:24, health:100, levelType: "medium fast", experience: 150  },
{id: 15, name: "Beedrill", evolution: null, evoLevel: null, evolved: 0, type: "bug", attack: 80, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 16, name: "Pidgey", evolution: "Pidgeotto", evoLevel: 18, evolved: 0, type: "flying", attack: 45, route:1, health:100, levelType: "medium slow", experience: 150 },
{id: 17, name: "Pidgeotto", evolution: "Pidgeot", evoLevel: 36, evolved: 0, type: "flying", attack: 60, route:24, health:100, levelType: "medium slow", experience: 150  },
{id: 18, name: "Pidgeot", evolution: null, evoLevel: null, evolved: 0, type: "flying", attack: 80, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 19, name: "Rattata", evolution: "Raticate", evoLevel: 20, evolved: 0, type: "normal", attack: 56, route:1, health:100, levelType: "medium fast", experience: 150  },
{id: 20, name: "Raticate", evolution: null, evoLevel: null, evolved: 0, type: "normal", attack: 81, route:16, health:100, levelType: "medium fast", experience: 150  },
{id: 21, name: "Spearow", evolution: "Fearow", evoLevel: 20, evolved: 0, type: "flying", attack: 60, route:3, health:100, levelType: "medium fast", experience: 150  },
{id: 22, name: "Fearow", evolution: null, evoLevel: null, evolved: 0, type: "flying", attack: 90, route:9, health:100, levelType: "medium fast", experience: 150  },
{id: 22, name: "Fearow", evolution: null, evoLevel: null, evolved: 0, type: "flying", attack: 90, route:9, health:100, levelType: "medium fast", experience: 150  },
{id: 23, name: "Ekans", evolution: "Arbok", evoLevel: 22, evolved: 0, type: "poison", attack: 60, route:4, health:100, levelType: "medium fast", experience: 150  },
{id: 24, name: "Arbok", evolution: null, evoLevel: null, evolved: 0, type: "poison", attack: 85, route:23, health:100, levelType: "medium fast", experience: 150  },
{id: 25, name: "Pikachu", evolution: "Raichu", evoLevel: "Thunder Stone", evolved: 0, type: "electric", attack: 55, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 26, name: "Raichu", evolution: null, evoLevel: null, evolved: 0, type: "electric", attack: 90, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 27, name: "Sandshrew", evolution: "Sandslash", evoLevel: 22, evolved: 0, type: "ground", attack: 75, route:3, health:100, levelType: "medium fast", experience: 150  },
{id: 28, name: "Sandslash", evolution: null, evoLevel: null, evolved: 0, type: "ground", attack: 100, route:23, health:100, levelType: "medium fast", experience: 150  },
{id: 29, name: "Nidoran♀", evolution: "Nidorina", evoLevel: 16, evolved: 0, type: "poison", attack: 47, route:2, health:100, levelType: "medium slow", experience: 150  },
{id: 30, name: "Nidorina", evolution: "Nidoqueen", evoLevel: "Moon Stone", evolved: 0, type: "poison", attack: 62, route:9, health:100, levelType: "medium slow", experience: 150  },
{id: 31, name: "Nidoqueen", evolution: null, evoLevel: null, evolved: 0, type: "poison", attack: 82, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 32, name: "Nidoran♂", evolution: "Nidorino", evoLevel: 16, evolved: 0, type: "poison", attack: 57, route:2, health:100, levelType: "medium slow", experience: 150  },
{id: 33, name: "Nidorino", evolution: "Nidoking", evoLevel: "Moon Stone", evolved: 0, type: "poison", attack: 72, route:9, health:100, levelType: "medium slow", experience: 150  },
{id: 34, name: "Nidoking", evolution: null, evoLevel: null, evolved: 0, type: "poison", attack: 92, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 35, name: "Clefairy", evolution: "Clefable", evoLevel: "Moon Stone", evolved: 0, type: "normal", attack: 45, route:null, health:100, levelType: "fast", experience: 150  },
{id: 36, name: "Clefable", evolution: null, evoLevel: null, evolved: 0, type: "normal", attack: 70, route:null, health:100, levelType: "fast", experience: 150  },
{id: 37, name: "Vulpix", evolution: "Ninetales", evoLevel: "Fire Stone", evolved: 0, type: "fire", attack: 41, route:7, health:100, levelType: "medium fast", experience: 150  },
{id: 38, name: "Ninetales", evolution: null, evoLevel: null, evolved: 0, type: "fire", attack: 76, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 39, name: "Jigglypuff", evolution: "Wigglytuff", evoLevel: "Moon Stone", evolved: 0, type: "normal", attack: 45, route:3, health:100, levelType: "fast", experience: 150  },
{id: 40, name: "Wigglytuff", evolution: null, evoLevel: null, evolved: 0, type: "normal", attack: 70, route:null, health:100, levelType: "fast", experience: 150  },
{id: 41, name: "Zubat", evolution: "Golbat", evoLevel: 22, evolved: 0, type: "poison", attack: 45, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 42, name: "Golbat", evolution: null, evoLevel: null, evolved: 0, type: "poison", attack: 80, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 43, name: "Oddish", evolution: "Gloom", evoLevel: 21, evolved: 0, type: "grass", attack: 50, route:5, health:100, levelType: "medium slow", experience: 150  },
{id: 44, name: "Gloom", evolution: "Vileplume", evoLevel: "Leaf Stone", evolved: 0, type: "grass", attack: 65, route:12, health:100, levelType: "medium slow", experience: 150  },
{id: 45, name: "Vileplume", evolution: null, evoLevel: null, evolved: 0, type: "grass", attack: 80, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 46, name: "Paras", evolution: "Parasect", evoLevel: 24, evolved: 0, type: "grass", attack: 70, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 47, name: "Parasect", evolution: null, evoLevel: null, evolved: 0, type: "grass", attack: 95, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 48, name: "Venonat", evolution: "Venomoth", evoLevel: 31, evolved: 0, type: "grass", attack: 55, route:12, health:100, levelType: "medium fast", experience: 150  },
{id: 49, name: "Venomoth", evolution: null, evoLevel: null, evolved: 0, type: "grass", attack: 65, route:14, health:100, levelType: "medium fast", experience: 150  },
{id: 50, name: "Diglett", evolution: "Dugtrio", evoLevel: 26, evolved: 0, type: "ground", attack: 55, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 51, name: "Dugtrio", evolution: null, evoLevel: null, evolved: 0, type: "ground", attack: 80, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 52, name: "Meowth", evolution: "Persian", evoLevel: 28, evolved: 0, type: "normal", attack: 45, route:5, health:100, levelType: "medium fast", experience: 150  },
{id: 53, name: "Persian", evolution: null, evoLevel: null, evolved: 0, type: "normal", attack: 70, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 54, name: "Psyduck", evolution: "Golduck", evoLevel: 33, evolved: 0, type: "water", attack: 52, route:4, health:100, levelType: "medium fast", experience: 150  },
{id: 55, name: "Golduck", evolution: null, evoLevel: null, evolved: 0, type: "water", attack: 82, route:6, health:100, levelType: "medium fast", experience: 150  },
{id: 56, name: "Mankey", evolution: "Primeape", evoLevel: 28, evolved: 0, type: "fighting", attack: 80, route:3, health:100, levelType: "medium fast", experience: 150  },
{id: 57, name: "Primeape", evolution: null, evoLevel: null, evolved: 0, type: "fighting", attack: 105, route:23, health:100, levelType: "medium fast", experience: 150  },
{id: 58, name: "Growlithe", evolution: "Arcanine", evoLevel: "Fire Stone", evolved: 0, type: "fire", attack: 70, route:7, health:100, levelType: "slow", experience: 150  },
{id: 59, name: "Arcanine", evolution: null, evoLevel: null, evolved: 0, type: "fire", attack: 110, route:null, health:100, levelType: "slow", experience: 150  },
{id: 60, name: "Poliwag", evolution: "Poliwhirl", evoLevel: 25, evolved: 0, type: "water", attack: 50, route:4, health:100, levelType: "medium slow", experience: 150  },
{id: 61, name: "Poliwhirl", evolution: "Poliwrath", evoLevel: "Water Stone", evolved: 0, type: "water", attack: 65, route:10, health:100, levelType: "medium slow", experience: 150  },
{id: 62, name: "Poliwrath", evolution: null, evoLevel: null, evolved: 0, type: "water", attack: 85, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 63, name: "Abra", evolution: "Kadabra", evoLevel: 16, evolved: 0, type: "psychic", attack: 20, route:5, health:100, levelType: "medium slow", experience: 150  },
{id: 64, name: "Kadabra", evolution: "Alakazam", evoLevel: "Trade", evolved: 0, type: "psychic", attack: 35, route:8, health:100, levelType: "medium slow", experience: 150  },
{id: 65, name: "Alakazam", evolution: null, evoLevel: null, evolved: 0, type: "psychic", attack: 50, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 66, name: "Machop", evolution: "Machoke", evoLevel: 28, evolved: 0, type: "fighting", attack: 80, route:10, health:100, levelType: "medium slow", experience: 150  },
{id: 67, name: "Machoke", evolution: "Machamp", evoLevel: "Trade", evolved: 0, type: "fighting", attack: 100, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 68, name: "Machamp", evolution: null, evoLevel: null, evolved: 0, type: "fighting", attack: 130, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 69, name: "Bellsprout", evolution: "Weepinbell", evoLevel: 21, evolved: 0, type: "grass", attack: 75, route:5, health:100, levelType: "medium slow", experience: 150  },
{id: 70, name: "Weepinbell", evolution: "Victreebel", evoLevel: "Leaf Stone", evolved: 0, type: "grass", attack: 90, route:12, health:100, levelType: "medium slow", experience: 150  },
{id: 71, name: "Victreebel", evolution: null, evoLevel: null, evolved: 0, type: "grass", attack: 105, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 72, name: "Tentacool", evolution: "Tentacruel", evoLevel: 30, evolved: 0, type: "water", attack: 40, route:11, health:100, levelType: "slow", experience: 150  },
{id: 73, name: "Tentacruel", evolution: null, evoLevel: null, evolved: 0, type: "water", attack: 70, route:19, health:100, levelType: "slow", experience: 150  },
{id: 74, name: "Geodude", evolution: "Graveler", evoLevel: 25, evolved: 0, type: "rock", attack: 80, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 75, name: "Graveler", evolution: "Golem", evoLevel: "Trade", evolved: 0, type: "rock", attack: 95, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 76, name: "Golem", evolution: null, evoLevel: null, evolved: 0, type: "rock", attack: 110, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 77, name: "Ponyta", evolution: "Rapidash", evoLevel: 40, evolved: 0, type: "fire", attack: 85, route:17, health:100, levelType: "medium fast", experience: 150  },
{id: 78, name: "Rapidash", evolution: null, evoLevel: null, evolved: 0, type: "fire", attack: 100, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 79, name: "Slowpoke", evolution: "Slowbro", evoLevel: 37, evolved: 0, type: "water", attack: 65, route:10, health:100, levelType: "medium fast", experience: 150  },
{id: 80, name: "Slowbro", evolution: null, evoLevel: null, evolved: 0, type: "water", attack: 75, route:12, health:100, levelType: "medium fast", experience: 150  },
{id: 81, name: "Magnemite", evolution: "Magneton", evoLevel: 30, evolved: 0, type: "electric", attack: 35, route:10, health:100, levelType: "medium fast", experience: 150  },
{id: 82, name: "Magneton", evolution: null, evoLevel: null, evolved: 0, type: "electric", attack: 60, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 83, name: "Farfetch'd", evolution: null, evoLevel: null, evolved: 0, type: "normal", attack: 65, route:12, health:100, levelType: "medium fast", experience: 150  },
{id: 84, name: "Doduo", evolution: "Dodrio", evoLevel: 31, evolved: 0, type: "normal", attack: 85, route:16, health:100, levelType: "medium fast", experience: 150  },
{id: 85, name: "Dodrio", evolution: null, evoLevel: null, evolved: 0, type: "normal", attack: 110, route:17, health:100, levelType: "medium fast", experience: 150  },
{id: 86, name: "Seel", evolution: "Dewgong", evoLevel: 34, evolved: 0, type: "water", attack: 45, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 87, name: "Dewgong", evolution: null, evoLevel: null, evolved: 0, type: "water", attack: 70, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 88, name: "Grimer", evolution: "Muk", evoLevel: 38, evolved: 0, type: "poison", attack: 80, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 89, name: "Muk", evolution: null, evoLevel: null, evolved: 0, type: "poison", attack: 105, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 90, name: "Shellder", evolution: "Cloyster", evoLevel: "Water Stone", evolved: 0, type: "water", attack: 65, route:6, health:100, levelType: "slow", experience: 150  },
{id: 91, name: "Cloyster", evolution: null, evoLevel: null, evolved: 0, type: "water", attack: 95, route:null, health:100, levelType: "slow", experience: 150  },
{id: 92, name: "Gastly", evolution: "Haunter", evoLevel: 25, evolved: 0, type: "ghost", attack: 35, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 93, name: "Haunter", evolution: "Gengar", evoLevel: "Trade", evolved: 0, type: "ghost", attack: 50, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 94, name: "Gengar", evolution: null, evoLevel: null, evolved: 0, type: "ghost", attack: 65, route:null, health:100, levelType: "medium slow", experience: 150  },
{id: 95, name: "Onix", evolution: null, evoLevel: null, evolved: 0, type: "rock", attack: 45, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 96, name: "Drowzee", evolution: "Hypno", evoLevel: 26, evolved: 0, type: "psychic", attack: 48, route:11, health:100, levelType: "medium fast", experience: 150  },
{id: 97, name: "Hypno", evolution: null, evoLevel: null, evolved: 0, type: "psychic", attack: 73, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 98, name: "Krabby", evolution: "Kingler", evoLevel: 28, evolved: 0, type: "water", attack: 105, route:4, health:100, levelType: "medium fast", experience: 150  },
{id: 99, name: "Kingler", evolution: null, evoLevel: null, evolved: 0, type: "water", attack: 130, route:10, health:100, levelType: "medium fast", experience: 150  },
{id: 100, name: "Voltorb", evolution: "Electrode", evoLevel: 30, evolved: 0, type: "electric", attack: 30, route:10, health:100, levelType: "medium fast", experience: 150  },
{id: 101, name: "Electrode", evolution: null, evoLevel: null, evolved: 0, type: "electric", attack: 50, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 102, name: "Exeggcute", evolution: "Exeggutor", evoLevel: "Leaf Stone", evolved: 0, type: "grass", attack: 40, route:null, health:100, levelType: "slow", experience: 150  },
{id: 103, name: "Exeggutor", evolution: null, evoLevel: null, evolved: 0, type: "grass", attack: 95, route:null, health:100, levelType: "slow", experience: 150  },
{id: 104, name: "Cubone", evolution: "Marowak", evoLevel: 28, evolved: 0, type: "ground", attack: 50, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 105, name: "Marowak", evolution: null, evoLevel: null, evolved: 0, type: "ground", attack: 80, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 106, name: "Hitmonlee", evolution: null, evoLevel: null, evolved: 0, type: "fighting", attack: 120, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 107, name: "Hitmonchan", evolution: null, evoLevel: null, evolved: 0, type: "fighting", attack: 105, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 108, name: "Lickitung", evolution: null, evoLevel: null, evolved: 0, type: "normal", attack: 55, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 109, name: "Koffing", evolution: "Weezing", evoLevel: 35, evolved: 0, type: "poison", attack: 65, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 110, name: "Weezing", evolution: null, evoLevel: null, evolved: 0, type: "poison", attack: 90, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 111, name: "Rhyhorn", evolution: "Rhydon", evoLevel: 42, evolved: 0, type: "ground", attack: 85, route:null, health:100, levelType: "slow", experience: 150  },
{id: 112, name: "Rhydon", evolution: null, evoLevel: null, evolved: 0, type: "ground",  attack: 130, route:null, health:100, levelType: "slow", experience: 150  },
{id: 113, name: "Chansey", evolution: null, evoLevel: null, evolved: 0, type: "normal", attack: 5, route:null, health:100, levelType: "fast", experience: 150  },
{id: 114, name: "Tangela", evolution: null, evoLevel: null, evolved: 0, type: "grass", attack: 55, route:21, health:100, levelType: "medium fast", experience: 150  },
{id: 115, name: "Kangaskhan", evolution: null, evoLevel: null, evolved: 0, type: "normal", attack: 95, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 116, name: "Horsea", evolution: "Seadra", evoLevel: 32, evolved: 0, type: "water", attack: 40, route:10, health:100, levelType: "medium fast", experience: 150  },
{id: 117, name: "Seadra", evolution: null, evoLevel: null, evolved: 0, type: "water", attack: 65, route:12, health:100, levelType: "medium fast", experience: 150  },
{id: 118, name: "Goldeen", evolution: "Seaking", evoLevel: 33, evolved: 0, type: "water", attack: 67, route:4, health:100, levelType: "medium fast", experience: 150  },
{id: 119, name: "Seaking", evolution: null, evoLevel: null, evolved: 0, type: "water", attack: 92, route:4, health:100, levelType: "medium fast", experience: 150  },
{id: 120, name: "Staryu", evolution: "Starmie", evoLevel: "Water Stone", evolved: 0, type: "water", attack: 45, route:19, health:100, levelType: "slow", experience: 150  },
{id: 121, name: "Starmie", evolution: null, evoLevel: null, evolved: 0, type: "water", attack: 75, route:null, health:100, levelType: "slow", experience: 150  },
{id: 122, name: "Mr. Mime", evolution: null, evoLevel: null, evolved: 0, type: "psychic", attack: 45, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 123, name: "Scyther", evolution: null, evoLevel: null, evolved: 0, type: "grass", attack: 110, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 124, name: "Jynx", evolution: null, evoLevel: null, evolved: 0, type: "psychic", attack: 50, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 125, name: "Electabuzz", evolution: null, evoLevel: null, evolved: 0, type: "electric", attack: 83, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 126, name: "Magmar", evolution: null, evoLevel: null, evolved: 0, type: "fire", attack: 95, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 127, name: "Pinsir", evolution: null, evoLevel: null, evolved: 0, type: "grass", attack: 125, route:null, health:100, levelType: "slow", experience: 150  },
{id: 128, name: "Tauros", evolution: null, evoLevel: null, evolved: 0, type: "normal", attack: 100, route:null, health:100, levelType: "slow", experience: 150  },
{id: 129, name: "Magikarp", evolution: "Gyarados", evoLevel: 20, evolved: 0, type: "water", attack: 10, route:4, health:100, levelType: "slow", experience: 150  },
{id: 130, name: "Gyarados", evolution: null, evoLevel: null, evolved: 0, type: "water", attack: 125, route:null, health:100, levelType: "slow", experience: 150  },
{id: 131, name: "Lapras", evolution: null, evoLevel: null, evolved: 0, type: "water", attack: 85, route:null, health:100, levelType: "slow", experience: 150  },
{id: 132, name: "Ditto", evolution: null, evoLevel: null, evolved: 0, type: "normal", attack: 48, route:13, health:100, levelType: "medium fast", experience: 150  },
{id: 133, name: "Eevee", evolution: "Vaporeon,Jolteon,Flareon", evoLevel: "Water Stone, Thunder Stone, Fire Stone", evolved: 0, type: "normal", attack: 55, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 134, name: "Vaporeon", evolution: null, evoLevel: null, evolved: 0, type: "water", attack: 65, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 135, name: "Jolteon", evolution: null, evoLevel: null, evolved: 0, type: "electric", attack: 65, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 136, name: "Flareon", evolution: null, evoLevel: null, evolved: 0, type: "fire", attack: 130, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 137, name: "Porygon", evolution: null, evoLevel: null, evolved: 0, type: "normal", attack: 60, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 138, name: "Omanyte", evolution: "Omastar", evoLevel: 40, evolved: 0, type: "rock", attack: 40, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 139, name: "Omastar", evolution: null, evoLevel: null, evolved: 0, type: "rock", attack: 60, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 140, name: "Kabuto", evolution: "Kabutops", evoLevel: 40, evolved: 0, type: "rock", attack: 80, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 141, name: "Kabutops", evolution: null, evoLevel: null, evolved: 0, type: "rock", attack: 115, route:null, health:100, levelType: "medium fast", experience: 150  },
{id: 142, name: "Aerodactyl", evolution: null, evoLevel: null, evolved: 0, type: "rock", attack: 105, route:null, health:100, levelType: "slow", experience: 150  },
{id: 143, name: "Snorlax", evolution: null, evoLevel: null, evolved: 0, type: "normal", attack: 110, route:16, health:100, levelType: "slow", experience: 150  },
{id: 144, name: "Articuno", evolution: null, evoLevel: null, evolved: 0, type: "ice", attack: 85, route:null, health:100, levelType: "slow", experience: 150  },
{id: 145, name: "Zapdos", evolution: null, evoLevel: null, evolved: 0, type: "electric", attack: 90, route:null, health:100, levelType: "slow", experience: 150  },
{id: 146, name: "Moltres", evolution: null, evoLevel: null, evolved: 0, type: "fire", attack: 100, route:null, health:100, levelType: "slow", experience: 150  },
{id: 147, name: "Dratini", evolution: "Dragonair", evoLevel: 30, evolved: 0, type: "dragon", attack: 64, route:null, health:100, levelType: "slow", experience: 150  },
{id: 148, name: "Dragonair", evolution: "Dragonite", evoLevel: 55, evolved: 0, type: "dragon", attack: 84, route:null, health:100, levelType: "slow", experience: 150  },
{id: 149, name: "Dragonite", evolution: null, evoLevel: null, evolved: 0, type: "dragon", attack: 134, route:null, health:100, levelType: "slow", experience: 150  },
{id: 150, name: "Mewtwo", evolution: null, evoLevel: null, evolved: 0, type: "psychic", attack: 110, route:null, health:100, levelType: "slow", experience: 150  },
{id: 151, name: "Mew", evolution: null, evoLevel: null, evolved: 0, type: "psychic", attack: 100, route:null, health:100, levelType: "medium slow", experience: 150  },
];

var alreadyUpgrade = function(name){
	for( var i = 0; i<player.upgradeList.length;i++){
		if( player.upgradeList[i].name == name){
			return true;
		}
	}
	return false;
}

var addUpgrade = function(name,cost,type,amount,require,flavorText){

	var temp = {
		id: player.upgradeList.length,
		name: name,
		cost: cost,
		type: type,
		amount: amount,
		bought:0,
		require:require,
		flavorText:flavorText
	}
	if( !alreadyUpgrade(name)){
	player.upgradeList.push(temp);
	}
}

// 	clickAttack: 1,
//	clickMultiplier: 1,
//	attack: 0,
//	attackMultiplier: 1,
//	money: 0,
//	moneyMultiplier: 1,
//	expMultiplier:1,
//	catchPercentage: 25,
//	routeVariation: 5,
//	catchTime: 3000,
//									name,cost,type,amount,require,flavorText
var initUpgrades = function(){
	addUpgrade("Pokeball upgrade I",1000, "catchPercentage",3,0,"New technology gives you a 3% bonus to catch rate"); 
	addUpgrade("Pokeball upgrade II",5000, "catchPercentage",3,3,"New technology gives you a 3% bonus to catch rate"); 
	addUpgrade("Pokeball upgrade III",10000, "catchPercentage",3,5,"New technology gives you a 3% bonus to catch rate"); 
	addUpgrade("Pokeball upgrade IV",25000, "catchPercentage",3,7,"New technology gives you a 3% bonus to catch rate"); 
	addUpgrade("Pokeball upgrade V",75000, "catchPercentage",10,10,"New technology gives you a 10% bonus to catch rate"); 
	addUpgrade("Experience upgrade I",500, "expMultiplier",0.10,0,"New technology gives you a 10% bonus to experience gain"); 
	addUpgrade("Experience upgrade II",5000, "expMultiplier",0.10,1,"New technology gives you a 10% bonus to experience gain"); 
	addUpgrade("Experience upgrade III",50000, "expMultiplier",0.10,4,"New technology gives you a 10% bonus to experience gain"); 
	addUpgrade("Experience upgrade IV",100000, "expMultiplier",0.10,6,"New technology gives you a 10% bonus to experience gain"); 
	addUpgrade("Experience upgrade V",500000, "expMultiplier",0.20,12,"New technology gives you a 20% bonus to experience gain"); 
	addUpgrade("Catch time upgrade I",2000, "catchTime",250,0,"Decrease the catch time by 250 milliseconds"); 
	addUpgrade("Catch time upgrade II",10000, "catchTime",250,2,"Decrease the catch time by 250 milliseconds"); 
	addUpgrade("Catch time upgrade III",25000, "catchTime",500,5,"Decrease the catch time by half a second"); 
	addUpgrade("Catch time upgrade IV",75000, "catchTime",500,8,"Decrease the catch time by half a second"); 
	addUpgrade("Catch time upgrade V",1000000, "catchTime",1000,15,"Decrease the catch time by a whole second"); 
	addUpgrade("Money multiplier upgrade I",1500, "moneyMultiplier",0.25,0,"Gain 25% more money"); 
	addUpgrade("Money multiplier upgrade II",4000, "moneyMultiplier",0.30,3,"Gain 30% more money"); 
	addUpgrade("Money multiplier upgrade III",10000, "moneyMultiplier",0.35,6,"Gain 35% more money"); 
	addUpgrade("Money multiplier upgrade IV",25000, "moneyMultiplier",0.40,10,"Gain 40% more money"); 
	addUpgrade("Money multiplier upgrade V",50000, "moneyMultiplier",0.50,16,"Gain 50% more money"); 
	addUpgrade("Click multiplier upgrade I",100, "clickMultiplier",1,0,"Clicks do 100% more damage"); 
	addUpgrade("Click multiplier upgrade II",500, "clickMultiplier",1,2,"Clicks do 100% more damage"); 
	addUpgrade("Click multiplier upgrade III",1000, "clickMultiplier",1,5,"Clicks do 100% more damage"); 
	addUpgrade("Click multiplier upgrade IV",2500, "clickMultiplier",1,7,"Clicks do 100% more damage"); 
	addUpgrade("Click multiplier upgrade V",5000, "clickMultiplier",1,10,"Clicks do 100% more damage"); 
}

var player = {
	clickAttack: 1,
	clickMultiplier: 1,
	attack: 0,
	attackMultiplier: 1,
	money: 0,
	moneyMultiplier: 1,
	expMultiplier:1,
	catchPercentage: 25,
	route: 1,
	pokeballs: 100,
	routeVariation: 5,
	catchTime: 3000,
	caughtPokemonList: [],
	routeKills: Array.apply(null, Array(100)).map(Number.prototype.valueOf,0),
	starter: "none",
	upgradeList: [],
	gymBadges: 0
}

var curEnemy = {
	name: "",
	id: 0,
	health: 0,
	maxHealth: 0,
	reward: 0,
	alive: true,
	route: 0
}

$(document).ready(function(){
 
	if(localStorage.getItem("player") != null){
		load();
		generatePokemon(player.route);
	}
	
	else {
		$('#pickStarter').modal({backdrop: 'static', keyboard: false});
	}
	initUpgrades();

	updateAll();

	setInterval(function(){

		curEnemy.health -= player.attack*player.attackMultiplier;
		updateAll();
	},1000);

	$("body").on('click',"#enemy", function(){
		if (curEnemy.alive){
			if(curEnemy.health > 0){
				curEnemy.health -= player.clickAttack*player.clickMultiplier;
			}			
			
			else {
				curEnemy.health = 0;
			}
			
			updateEnemy();
		}

	});

	$("body").on('click',".starter", function(){
		$("#curStarterPick").html(this.id);
		player.starter = this.id;
		
		var link = document.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'shortcut icon';
		link.href = 'images/'+player.starter+'.png';
		document.getElementsByTagName('head')[0].appendChild(link);
		
		generatePokemon(player.route);
		
		save();
	})
	
	// Picks a starter and starts the game
	$("body").on('click',"#startAdventure", function(){
		if(player.starter != "none"){
			$('#pickStarter').modal("hide")
			capturePokemon(player.starter);
		}
	})
	
	// Allows the player to move to the previous route
	$("body").on('click',"#routeLeft", function(){
		player.route--;
		updateAll();
	})
	
	// Allows the player to move to the next route
	$("body").on('click',"#routeRight", function(){
		player.route++;
		updateAll();
	})	
	
	// Allows the player buy upgrades
	$("body").on('click',".upgradeBoxes", function(){
		var id = this.id.substr(7,this.id.length);
		for( var i = 0; i<player.upgradeList.length; i++){
			if( player.upgradeList[i].id == id){
				var upgrade = player.upgradeList[i];
				if( !upgrade.bought && player.money > upgrade.cost){
					applyUpgrade(upgrade.type,upgrade.amount);
					player.upgradeList[i].bought = 1;
					player.money -= upgrade.cost;
				}
				else{
					log("Not enough money");
				}
			}
		}
		updateUpgrades();
	})

	// Allows the player to sort his pokemon
	$("body").on('click',"#caughtPokemon", function(){
		player.caughtPokemonList.sort(compareByName);
		updateCaughtList();
	})

	$("body").on('click',"#AttackCaughtPokemon", function(){
		player.caughtPokemonList.sort(compareByAttack);
		updateCaughtList();
	})

	$("body").on('click',"#LevelCaughtPokemon", function(){
		player.caughtPokemonList.sort(compareByLevel);
		updateCaughtList();
	})
	
	// Navbar Button controllers
	$("body").on('click',"#badgeButton", function(){
		$("#badgeModal").modal("show");
		for (var i = 1; i<=player.gymBadges; i++){
			$("#Badge"+i).fadeTo("slow",1);
		}
	})

	$("body").on('click',"#pokedexButton", function(){
		$("#pokedexModal").modal("show");

	})		
	
	// Logs to welcome the player
	log("Welcome to PokeClicker");
	log("Click on the pokemon to defeat them!");
	log("Earn exp and money as you defeat wild pokemons");
	log("And perhaps you'll get lucky and catch one");
	log("So they will fight wild pokemon for you!");
	log("Buy upgrades to increase your catch rate");
	log("Defeat 10 pokemon on a route to get access to the next");
	log("Have fun!");

});

// Update all functions and save
var updateAll = function(){
	calculateAttack();
	updateStats();
	updateEnemy();
	updateCaughtList();
	updateRoute();
	updateUpgrades();
	save();
}

// Returns true if the player has access to this route
var accessToRoute = function(route){
	for (var i = 1; i<route; i++){
		if(player.routeKills[i] <10 || player.routeKills[i] == undefined){
			return false;
		}
	}
	return true;
}

// Here I can add all upgradeTypes
var applyUpgrade = function(type, amount){
	switch(type){
		case "catchPercentage":
			player.catchPercentage += amount;
			log("Your catch rate is increased by "+amount+ "%");
			break;
		case "catchTime":
			player.catchTime -= amount;
			log("Your catch time is decreased by "+amount+ " seconds");
			break;
		case "moneyMultiplier":
			player.moneyMultiplier += amount;
			log("Your money multiplier is increased by "+amount);
			break;
		case "expMultiplier":
			player.expMultiplier += amount;
			log("Your exp multiplier is increased by "+amount);
			break;
		case "clickAttack":
			player.clickAttack += amount;
			log("Your click attack is increased by "+amount);
			break;
		case "clickMultiplier":
			player.clickMultiplier += amount;
			log("Your click attack multiplier is increased by "+amount);
			break;		
		case "routeVariation":
			player.routeVariation -= amount;
			log("Your route variation is decreased by "+amount);
			break;		
		case "attackMultiplier":
			player.attackMultiplier += amount;
			log("Your pokemon attack multiplier is increased by "+amount);
			break;					
		default:
			console.log("This should never happen, contact the developer immediately!");
			break;

	}	
		updateStats();
}

			// Save and load functions

// Saves the game by writing play to JSON and save it in localStorage			
var save = function(){
	localStorage.setItem("player", JSON.stringify(player));
}

// Loads the game from localStorage and update favIcon to starter
var load = function(){
	player = JSON.parse(localStorage.getItem("player"));
	
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'images/'+player.starter+'.png';
    document.getElementsByTagName('head')[0].appendChild(link);
}		

			// Leveling functions

// Takes the experience and returns the level it is			
var experienceToLevel = function(exp,levelType){
	var mult;
	
	switch(levelType){
	case "slow":
		mult	 = 0.8;
		break;
	case "medium slow":
		mult = 0.9;
		break;
	case "medium":
		mult = 1.0;
		break;
	case "medium fast":
		mult = 1.1;
		break;
	case "fast":
		mult = 1.2;
		break;
	default: 
		
		mult = 1;
		break;
		
	}
	exp *= mult;
	return Math.min(100,Math.floor(-5/4 + Math.sqrt(8*exp +125)/(6*Math.sqrt(5))));
}

// All pokemon you have gain exp
var getExp = function(exp){
	for( var i = 0; i<player.caughtPokemonList.length; i++){
		player.caughtPokemonList[i].experience+= exp*player.expMultiplier;
	}
	checkEvolution();
}

// Update the health of the current enemy
var updateEnemy = function(){
	if (curEnemy.health <0){
		curEnemy.health = 0;
	}
	if(curEnemy.health == 0 ){
		enemyDefeated();
	}
	if (curEnemy.alive){
		$("#enemyInfo").html("<br>"+curEnemy.name+"<br><img id=enemy src=images/"+curEnemy.id+".png>");
	}
		$("#healthBar").width(100*curEnemy.health/curEnemy.maxHealth+"%"); 
		$("#healthDisplay").html(curEnemy.health+"/"+curEnemy.maxHealth);
}

// When the enemy is defeated all stats are updated and a new enemy is picked
var enemyDefeated = function(){
	if (curEnemy.alive){
		log("You defeated the wild "+ curEnemy.name);
		var money = 15 + Math.floor(Math.random()*30) + 8 * curEnemy.route;
		money *= player.moneyMultiplier
		player.money += Math.floor(money);
		var exp = 10 + Math.floor(Math.random()*10) + 3 *  curEnemy.route;
		getExp(exp);
		player.routeKills[player.route]++
		updateRoute();
		log("You earned " + Math.floor(money) + " money!");
	
		setTimeout(function(){ 
			$("#enemyInfo").html("<br>"+curEnemy.name+"<br><img height=96px width=96px id=enemy src=images/Pokeball.PNG>");
			player.pokeballs--;
		}, 1);
	
		setTimeout(function(){
			var chance = Math.floor(Math.random()*100+1);
			if(chance<player.catchPercentage){
				capturePokemon(curEnemy.name);
			}
		
		generatePokemon(player.route);
		updateStats();
		updateEnemy();
		}, player.catchTime);
		
		curEnemy.alive = false;
	}
}


// Capture a pokemon by moving it to the player.caughtPokemonList
// Pokemon are adressable by name
var capturePokemon = function(name){
	if(!alreadyCaught(name)){
		for( var i = 0; i<pokemonList.length; i++){
			if (pokemonList[i].name == name){
				player.caughtPokemonList.push(pokemonList[i]);
				calculateAttack();
			}
		}
		log("You succesfully caught "+name);

	}
	
	else{
		log(name+" has already been caught!");
		log("You managed to sell the "+name+" for " + 50*curEnemy.route + " money!");
		player.money += Math.floor(50*curEnemy.route*player.moneyMultiplier);
	}
	
	updateCaughtList();
	updateStats();
}

// Checks if you already caught a pokemon
// Pokemon are adressable by name
var alreadyCaught = function(name){
	for( var i = 0; i<player.caughtPokemonList.length; i++){
		if (player.caughtPokemonList[i].name == name){
			return true;
		}
	}
	return false;
}

// Calculate the total attack of the players pokemon
var calculateAttack = function(){
	var total = 0;
	for (var i = 0; i<player.caughtPokemonList.length; i++){
		
		var level = experienceToLevel(player.caughtPokemonList[i].experience,player.caughtPokemonList[i].levelType);
		total += Math.ceil(level*(player.caughtPokemonList[i].attack)/100);
	}
	player.attack = total;
	player.clickAttack = player.caughtPokemonList.length;
	return total;
}


// Takes a route and spits out a pokemon that can be found on the route
// Can be done more efficient:
// Let correctRoute return all pokemon on a route
// Choose random from that set
// TODO
var generatePokemon = function (route){
	var randomRoute = 0;

	for( var i = 0; i<100; i++){
		randomRoute =  Math.max(1,player.route-Math.floor(Math.random()*player.routeVariation));
		if(correctRoute(randomRoute)){
			i = 100;
		}
		if(i == 99 && !correctRoute(randomRoute)){
			randomRoute = 1;
			i = 100;
		}
	}
	
	var randomPokemon = pokemonList[Math.floor(Math.random()*pokemonList.length)];
	
	while (randomPokemon.route != randomRoute){
		randomPokemon = pokemonList[Math.floor(Math.random()*pokemonList.length)];
	}
	
	curEnemy.name = randomPokemon.name;
	curEnemy.id = randomPokemon.id;
	curEnemy.health = 20+randomPokemon.health*1/4*randomPokemon.route*(player.caughtPokemonList.length-1);
	curEnemy.maxHealth = curEnemy.health;
	curEnemy.catchPercentage = player.catchPercentage;
	curEnemy.alive = true;
	curEnemy.route = randomPokemon.route;
	return randomPokemon;
}

var checkEvolution = function(){
	for( var i = 0; i<player.caughtPokemonList.length; i++){
		if(player.caughtPokemonList[i].evoLevel != null){
			if( experienceToLevel(player.caughtPokemonList[i].experience) >= player.caughtPokemonList[i].evoLevel && !player.caughtPokemonList[i].evolved){
				log(player.caughtPokemonList[i].name);
				capturePokemon(player.caughtPokemonList[i].evolution);
				log("Evolution triggered ^");
				player.caughtPokemonList[i].evolved = 1;
			}
		}
	}
}



// Returns true is the route is valid by checking if there
// is a pokemon on that route
// TODO:
// Support multiple routes per pokemon
var correctRoute = function (route){
	for (var i = 0; i<pokemonList.length; i++){
		if (pokemonList[i].route == route){
			return true;
		}
	}
	return false;
}

		// Console stuff
		
var specialLog = [];
var completeLog = specialLog;

var log = function(text){
	$("#console").append(text+"<br>");
	var elem = document.getElementById('console');
	elem.scrollTop = elem.scrollHeight;
}

		// HTML functions

// Update the upgradeBox

var updateUpgrades = function(){
	$(".upgradeBoxes").remove();
	for( var i = 0; i<player.upgradeList.length; i++){
		if( player.upgradeList[i].require <= boughtUpgrades() && !player.upgradeList[i].bought){
			
			var upgrade = player.upgradeList[i];
			$("#upgradeBox").append("<div id=Upgrade"+upgrade.id+" title=s class=upgradeBoxes>"+upgrade.name+"<br>Cost: "+upgrade.cost+"</div>");
			document.getElementById("Upgrade"+upgrade.id).title = upgrade.flavorText;
		}
	}
}

var boughtUpgrades = function(){
	var number = 0;
	for( var i = 0; i<player.upgradeList.length; i++){
		
		if( player.upgradeList[i].bought == 1){
			number++;
		}
	}
	
	return number;
}
		
// Update the list of caught pokemon
var updateCaughtList = function(){
	$("#caughtPokemon").html("Name <br><br>");
	$("#AttackCaughtPokemon").html("Attack <br><br>");
	$("#LevelCaughtPokemon").html("Level <br><br>");
	
	if( player.caughtPokemonList.length == 0){
		$("#caughtPokemon").append("None");
		$("#AttackCaughtPokemon").append("<br>");
		$("#LevelCaughtPokemon").append("<br>");
	}
	for (var i = 0; i<player.caughtPokemonList.length; i++){
		$("#caughtPokemon").append("<img class=smallImage src=images/"+player.caughtPokemonList[i].id+".png>"+player.caughtPokemonList[i].name+"<br>");
		$("#AttackCaughtPokemon").append(Math.ceil(experienceToLevel(player.caughtPokemonList[i].experience,player.caughtPokemonList[i].levelType)*(player.caughtPokemonList[i].attack)/100)+"<br>");
		$("#LevelCaughtPokemon").append(experienceToLevel(player.caughtPokemonList[i].experience,player.caughtPokemonList[i].levelType)+"<br>");
	}
}

// Update the stats
var updateStats = function(){
	$("#statBox").html("Stats<br><br>Money<br>Click attack<br>Pokemon attack<br>Exp multiplier<br>Catch chance<br>Catch time<br>Pokeballs<br>Route");
	$("#statBoxStats").html("<br><br>"+player.money+"<br>"+player.clickAttack*player.clickMultiplier+"<br>"+player.attack*player.attackMultiplier+"<br>"+player.expMultiplier+"x<br>"+player.catchPercentage+"%<br>"+player.catchTime/1000+" sec<br>"+player.pokeballs+"<br>"+player.route);	
}



var updateRoute = function(){
	$("#currentRoute").html("Route "+player.route+ "<br>"+Math.min(10,player.routeKills[player.route])+"/10");
	if(accessToRoute(player.route+1)){
		$("#routeRight").show();
	}
	else{
		$("#routeRight").hide();
	}
	if(player.route == 1){
		$("#routeLeft").hide();
	} 
	else{
		$("#routeLeft").show();
	}
}

	// Sorting functions
	
function compareByName(a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}	

function compareByLevel(a,b) {
  if (experienceToLevel(a.experience,a.levelType) > experienceToLevel(b.experience,b.levelType))
    return -1;
  if (experienceToLevel(a.experience,a.levelType) < experienceToLevel(b.experience,b.levelType))
    return 1;
  return 0;
}

function compareByAttack(a,b) {
	var aAttack = experienceToLevel(a.experience,a.levelType)*a.attack/100;
	var bAttack = experienceToLevel(b.experience,b.levelType)*b.attack/100;
  if (aAttack> bAttack)
    return -1;
  if (aAttack < bAttack)
    return 1;
  return 0;
}