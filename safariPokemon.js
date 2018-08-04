

var SafariPokemon = {
    curEnemy:undefined,
    shiny:undefined,
    catchFactorModifier: 100/1275,
    baseEscapeFactor: 40,
    angry: 0,
    eating: 0,
    SHINY_CHANCE: 256,

    // Lower weighted pokemon will appear less frequently, equally weighted are equally likely to appear
    list: [
        { name: "Nidoran(F)", weight: 15 },
        { name: "Nidorina", weight: 10 },
        { name: "Nidoran(M)", weight: 25 },
        { name: "Nidorino", weight: 10 },
        { name: "Exeggcute", weight: 20 },
        { name: "Paras", weight: 5 },
        { name: "Parasect", weight: 15 },
        { name: "Rhyhorn", weight: 10 },
        { name: "Chansey", weight: 4 },
        { name: "Scyther", weight: 4 },
        { name: "Pinsir", weight: 4 },
        { name: "Kangaskhan", weight: 15 },
        { name: "Tauros", weight: 10 },
        { name: "Cubone", weight: 10 },
        { name: "Marowak", weight: 5 },
        { name: "Tangela", weight: 4 },
    ],

    listWeight: 0,

    new: function(name) {
        SafariPokemon.curEnemy = getPokemonByName(name);
        SafariPokemon.shiny = generateShiny(SafariPokemon.SHINY_CHANCE);
        SafariPokemon.angry = 0;
        SafariPokemon.eating = 0;
    },

    catchFactor: function() {
        let catchF = SafariPokemon.catchFactorModifier * SafariPokemon.pokemon.catchRate;
        if(SafariPokemon.eating > 0) {
            catchF /= 2;
        }
        if(SafariPokemon.angry > 0) {
            catchF *= 2;
        }

        return Math.min(100, catchF);
    },

    escapeFactor: function() {
        if(this.eating > 0) {
            return this.baseEscapeFactor / 4;
        }
        if(this.angry > 0) {
            return this.baseEscapeFactor * 2;
        }

        return this.baseEscapeFactor;
    },

    random: function() {
        let rand = Math.random() * SafariPokemon.listWeight;
        let i = 0;
        for (let pokemon of SafariPokemon.list) {
            i += pokemon.weight;
            if (rand < i) {
                SafariPokemon.new(pokemon.name);
            }
        }
    }
}

SafariPokemon.listWeight = SafariPokemon.list.reduce((sum, pokemon) => {return sum += pokemon.weight}, 0);
console.log(SafariPokemon)