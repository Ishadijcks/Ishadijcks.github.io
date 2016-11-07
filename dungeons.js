var currentDungeon;
var counter;
var playerPosition;
var dungeonCanMove = 0;

var Dungeon = function(name, pokemons, size, baseHealth, bossList, tokenCost, badgeReq, itemRoute, level) {
    var temp = {
        name: name,
        pokemonDefeated: 0,
        size: size,
        map: [],
        mapDiscovered: [],
        baseHealth: baseHealth,
        pokemons: pokemons,
        bossList: bossList,
        tokenCost: tokenCost,
        badgeReq: badgeReq,
        timeLimit: 60 * 100,
        timeLeft: 60 * 100,
        chestsOpened: 0,
        loot: [],
        itemRoute: itemRoute,
        level: level
    }
    return temp;
}

var BossPokemon = function(name, health, level) {
    var temp = {
        name: name,
        health: health,
        maxHealth: health,
        level: level
    }
    return temp;
}

var dungeonNameList = [];

var getDungeonNames = function(){
    dungeonNameList = [];
    for( var i = 16; i<townList.length; i++){
        dungeonNameList.push(townList[i].gym.name);
    }
    return dungeonNameList;
 }

var ViridianForestDungeon = function() {
    var pokemonList = ["Caterpie", "Metapod", "Weedle", "Kakuna", "Pidgey", "Pidgeotto"];
    var bossPokemon = [BossPokemon("Pikachu", 510, 7)];
    return Dungeon("Viridian Forest Dungeon", pokemonList, 5, 102, bossPokemon, 50, 0, 1, 5);
}

var DiglettsCaveDungeon = function(){
    var pokemonList = ["Diglett"];
    var bossPokemon = [BossPokemon("Dugtrio", 6040, 31)];
    return Dungeon("Digletts Cave Dungeon", pokemonList, 5, 1208, bossPokemon, 95, 0, 2, 22);
}

var MtMoonDungeon = function() {
    var pokemonList = ["Sandshrew", "Clefairy", "Zubat", "Paras", "Geodude", "Pidgeotto"];
    var bossPokemon = [BossPokemon("Kabuto", 4170, 12), BossPokemon("Omanyte", 4170, 12)];
    return Dungeon("Mt. Moon Dungeon", pokemonList, 5, 834, bossPokemon, 75, 1, 4, 10);
}

var RockTunnelDungeon = function(){
    var pokemonList = ["Zubat", "Geodude", "Machop"];
    var bossPokemon = [BossPokemon("Onix", 20585, 17)];
    return Dungeon("Rock Tunnel Dungeon", pokemonList, 5, 4117, bossPokemon, 500, 2, 5, 15);
}

var PowerPlantDungeon = function(){
    var pokemonList = ["Pikachu", "Raichu", "Magnemite", "Magneton", "Grimer", "Muk", "Electrode"];
    var bossPokemon = [BossPokemon("Zapdos", 101302, 50), BossPokemon("Electabuzz", 67535, 35), BossPokemon("Electabuzz", 67535, 35), BossPokemon("Electabuzz", 67535, 35)];
    return Dungeon("Power Plant Dungeon", pokemonList, 5, 13507, bossPokemon, 1000, 2, 8, 25);
}

var PokemonTowerDungeon = function(){
    var pokemonList = ["Gastly", "Haunter", "Cubone"];
    var bossPokemon = [BossPokemon("Marowak", 37615, 30)];
    return Dungeon("Pokemon Tower Dungeon", pokemonList, 5, 7523, bossPokemon, 750, 2, 10, 20);
}

var SeafoamIslandsDungeon = function(){
    var pokemonList = ["Zubat", "Golbat", "Psyduck", "Golduck", "Slowpoke", "Slowbro", "Shellder", "Krabby", "Horsea", "Staryu"];
    var bossPokemon = [ BossPokemon("Articuno", 129195, 50) , BossPokemon("Seel", 86130, 35), BossPokemon("Seel", 86130, 35), BossPokemon("Seel", 86130, 35)];
    return Dungeon("Seafoam Islands Dungeon", pokemonList, 5, 17226, bossPokemon, 1250, 6, 15, 30);
}

var PokemonMansionDungeon = function(){
    var pokemonList = ["Growlithe", "Vulpix", "Grimer", "Muk", "Koffing", "Weezing"];
    var bossPokemon = [BossPokemon("Magmar", 88800, 40)];
    return Dungeon("Pokemon Mansion Dungeon", pokemonList, 5, 17760, bossPokemon, 1500, 6, 16, 35);
}

var VictoryRoadDungeon = function(){
    var pokemonList = ["Zubat", "Golbat", "Machop", "Geodude", "Graveler", "Onix", "Marowak", "Venomoth"];
    var bossPokemon = [BossPokemon("Moltres", 184462, 50), BossPokemon("Machoke", 122975, 42), BossPokemon("Machoke", 122975, 42), BossPokemon("Machoke", 122975, 42)];
    return Dungeon("Victory Road Dungeon", pokemonList, 5, 24595, bossPokemon, 2000, 8, 20, 40);
}

var CeruleanCaveDungeon = function(){
    var pokemonList = ["Arbok", "Raichu", "Sandslash", "Golbat", "Parasect", "Venomoth", "Kadabra", "Magneton", "Dodrio", "Hypno", "Ditto", "Wigglytuff", "Electrode", "Marowak", "Chansey"];
    var bossPokemon = [BossPokemon("Mewtwo", 215512, 70), BossPokemon("Rhydon", 143675, 60), BossPokemon("Rhydon", 143675, 60), BossPokemon("Rhydon", 143675, 60)];
    return Dungeon("Cerulean Cave Dungeon", pokemonList, 5, 28735, bossPokemon, 2500, 8, 20, 55);
}


var loadDungeon = function(townId) {
        currentDungeon = getTown(townId).gym;
        $("#dungeonModal").modal('hide');
    if( player.dungeonTokens >= currentDungeon.tokenCost){
        curEnemy.alive = false;
        clearInterval(counter);


        currentDungeon.timeLeft = currentDungeon.timeLimit;
        inProgress = 3;
        currentDungeon.map = createMap(currentDungeon.size);
        playerPosition = Math.floor(currentDungeon.size * currentDungeon.size / 2);
        currentDungeon.mapDiscovered[playerPosition] = 1;
        player.dungeonTokens -= currentDungeon.tokenCost;
        currentDungeon.loot = [];
        dungeonCanMove = 1;
        updateDungeon();
        counter = setInterval(dungeonTimer, 100); //100 will  run it every 10th of a second
        hideHealthBar();
    } else {
        $.notify("You don't have enough tokens to start this dungeon","error");
    }
}

var createMap = function(size) {
    var map = ["Boss"];
    for (var i = 1; i < size + 1; i++) {
        map[i] = "Chest";
    }
    for( var i = size + 1; i< size + size; i++){
        map[i] = "Empty"
    }
    for (var i = size + size; i < size * size; i++) {
        map[i] = "Pokemon";
    }
    shuffle(map);
    var center = Math.floor(size * size / 2);
    if(map[center] == "Boss"){
        map[0] = "Boss";
    }

    map[center] = "Empty";

    return map;
}

var adjacent = function(pos, target, size) {
    if (target < 0 || target > (size*size) - 1) {
        return false;
    }
    if (target == pos + size) {
        return true;
    }
    if (target == pos - size) {
        return true;
    }
    if (target == pos + 1) {
        return !(target % (size) == 0)
    }

    if (target == pos - 1) {
        return !(target % (size) == (size - 1))
    }
    return false;

}

var moveToRoom = function(id) {
    if (adjacent(playerPosition, id, currentDungeon.size) && !curEnemy.alive && dungeonCanMove) {
        playerPosition = id;
        currentDungeon.mapDiscovered[id] = 1;
        hideDungeonChest();
        if (currentDungeon.map[id] == "Pokemon") {
            spawnDungeonPokemon();
        } else if (currentDungeon.map[id] == "Chest") {
            spawnDungeonChest();
        } else if (currentDungeon.map[id] == "Boss") {
            spawnDungeonBoss();
        }
        canCatch = 0;
    }
    updateDungeon();
}

var revealChests = function(){
    for(var i = 0; i<currentDungeon.map.length; i++){
        if(currentDungeon.map[i] == "Chest"){
            currentDungeon.mapDiscovered[i] = 1;
        }
    }
}

var revealEverything = function(){
    for(var i = 0; i<currentDungeon.map.length; i++){
        currentDungeon.mapDiscovered[i] = 1;
    }
}

var spawnDungeonChest = function() {
    $("#chestInfo").html("<img class='dungeonChest' id='chestImage' src=images/dungeons/chest.png><br>");
}

var hideDungeonChest = function() {
    $("#chestInfo").html("");
}

var openDungeonChest = function() {
    if(currentDungeon.map[playerPosition] === "Chest"){
        currentDungeon.chestsOpened++;
        currentDungeon.map[playerPosition] = "Empty";
        if( currentDungeon.chestsOpened >= 2){
            revealChests();
        }
        if( currentDungeon.chestsOpened >= 3){
            revealEverything();
        }
        currentDungeon.loot.push(gainRandomItem(currentDungeon.itemRoute));
        hideDungeonChest();
        updateDungeonMap();
    }

}

var dungeonTimer = function() {
    if (currentDungeon.timeLeft <= 0) {
        clearInterval(counter);
        if (inProgress == 3) {
            inProgress = 0;
            moveToTown(currentDungeon.name.slice(0, -8));
            currentDungeon.timeLeft = currentDungeon.timeLimit;
            $.notify("Train harder and try again!", 'error')
        }
    }
    currentDungeon.timeLeft -= 10;
    $("#dungeonTimer").html((currentDungeon.timeLeft / 100) + "/" + currentDungeon.timeLimit / 100);
}

// var hideDungeonEnemy = function(){
//     $("#dungeonHealthDisplay").html("");
//     $("#dungeonCatchDisplay").html("");
//     $("#dungeonEnemyInfo").html("");
//     $(".progress").hide();
// }

var hideHealthBar = function(){
    $("#dungeonProgress").hide();
    $("#dungeonHealthDisplay").hide();
}

var showHealthBar = function(){
    $("#dungeonProgress").show();
    $("#dungeonHealthDisplay").show();
}

var updateDungeon = function() {

    if (curEnemy.health < 0) {
        curEnemy.health = 0;
    }


    hideAllViews();
    $("#dungeonView").show();

    var html = "";
    html += "<div id='dungeonName'>"+currentDungeon.name.slice(0, -8)+"</div>";
    html += "<span id='dungeonTimer'>"+(currentDungeon.timeLeft / 100) + "/" + currentDungeon.timeLimit / 100+"</span>";
    html += "<div id='dungeonMap'></div>"
    if(!dungeonCanMove && curEnemy.alive){

        if(alreadyCaughtShiny(curEnemy.name)){
            html += "<div id='dungeonEnemyInfo'><br>" +curEnemy.name + " <img id='alreadyCaughtImage' src='images/shinyPokeball.PNG'><br><img id='dungeonEnemy' src='images/pokemon/"+curEnemy.id+".png' ></div>";
        } else if(alreadyCaught(curEnemy.name)){
            html += "<div id='dungeonEnemyInfo'><br>" +curEnemy.name + " <img id='alreadyCaughtImage' src='images/Pokeball.PNG'><br><img id='dungeonEnemy' src='images/pokemon/"+curEnemy.id+".png' ></div>";
        } else {
            html += "<div id='dungeonEnemyInfo'><br>" +curEnemy.name + "<br><img id='dungeonEnemy' src='images/pokemon/"+curEnemy.id+".png' ></div>";
        }
    }

    if(currentDungeon.map[playerPosition] == "Chest"){
        html += "<div id='chestInfo'><img class='dungeonChest' id='chestImage' src=images/dungeons/chest.png></div><br>"
    }
    if(!dungeonCanMove && curEnemy.alive){

        html +=     "<span id='dungeonCatchDisplay'></span>";

        html +=     "<span id='dungeonHealthDisplay'>"+curEnemy.health + "/" + curEnemy.maxHealth + "</span>";

    }


    $("#dungeonHealthBar").width(100*curEnemy.health/curEnemy.maxHealth+"%");
    $("#dungeonTest").html(html);


    if (curEnemy.health == 0) {
        dungeonEnemyDefeated(currentDungeon);

    }

    updateDungeonMap();
    if (curEnemy.health != 0) {
        inProgress = 3;
    }

}

var updateDungeonMap = function() {
    var size = currentDungeon.size;
    var bootstrap = Math.floor(11 / size);
    var html = "";
    var roomClass;
    var curRoom = currentDungeon.map[playerPosition];
    for (var i = 0; i < size; i++) {

        html += "<div class='row'>";
        for (var j = 0; j < size; j++) {

            if (currentDungeon.mapDiscovered[i * size + j] == 1) {
                if (i * size + j == playerPosition) {
                    html += "<span id='room" + (i * size + j) + "' class='playerRoom dungeonRoom col-sm-" + bootstrap + "'></span>";
                } else if (currentDungeon.map[i * size + j] == "Chest") {
                    html += "<span id='room" + (i * size + j) + "' class='chestRoom dungeonRoom col-sm-" + bootstrap + "'></span>";
                } else if (currentDungeon.map[i * size + j] == "Pokemon") {
                    html += "<span id='room" + (i * size + j) + "' class='enemyRoom dungeonRoom col-sm-" + bootstrap + "'></span>";
                } else if (currentDungeon.map[i * size + j] == "Boss") {
                    html += "<span id='room" + (i * size + j) + "' class='bossRoom dungeonRoom col-sm-" + bootstrap + "'></span>";
                } else if (currentDungeon.map[i * size + j] == "Empty") {
                    html += "<span id='room" + (i * size + j) + "' class='emptyRoom dungeonRoom col-sm-" + bootstrap + "'></span>";
                }
            } else {
                html += "<span id='room" + (i * size + j) + "' class='undiscoveredRoom dungeonRoom col-sm-" + bootstrap + "'></span>";
            }
        }
        html += "</div>";
    }
    $("#dungeonMap").html(html);
}

var dungeonEnemyDefeated = function() {
    hideHealthBar();
    clearInterval(attackInterval);
    attackInterval = setInterval(pokemonsAttack,1000);
    canCatch = 1;
    if (curEnemy.alive) {
        
        currentDungeon.map[playerPosition] = "Empty";

        var id = getPokemonByName(curEnemy.name).id - 1;
        player.defeatNumbers[id]++;
        setTimeout(function() {
            if(alreadyCaughtShiny(curEnemy.name)){
                $("#dungeonEnemyInfo").html("<br>" + curEnemy.name + " <img id=alreadyCaughtImage src=images/shinyPokeball.PNG><br><img id=dungeonPokeball src=images/Pokeball.PNG>");
            } else {
                if (alreadyCaught(curEnemy.name)) {
                    $("#dungeonEnemyInfo").html("<br>" + curEnemy.name + " <img id=alreadyCaughtImage src=images/Pokeball.PNG><br><img id=dungeonPokeball src=images/Pokeball.PNG>");
                } else {
                    $("#dungeonEnemyInfo").html("<br>" + curEnemy.name + " <br><img id=dungeonPokeball src=images/Pokeball.PNG>");
                }
            }
            player.pokeballs--;
        }, 1);

        gainExp(curEnemy.exp,curEnemy.level,false);
        gainShards(curEnemy.type[0], 3);
        dungeonCanMove = 1;
        var catchRate = curEnemy.catchRate + getBonusCatchrate();
        $("#dungeonCatchDisplay").html("Catch chance: " + Math.min(100, catchRate) + "%");
        progressEgg(Math.floor(Math.sqrt(currentDungeon.itemRoute)));
        setTimeout(function() {
            if (canCatch) {

                var chance = Math.floor(Math.random() * 100 + 1);
                if (chance <= catchRate) {
                    capturePokemon(curEnemy.name, curEnemy.shiny);

                }
                updateStats();
            }
            currentDungeon.pokemonDefeated++
            updateDungeon();
            // hideDungeonEnemy();
            if(bossDefeated()){
                dungeonDefeated();
            }
        }, player.catchTime);
        curEnemy.alive = false;
    }


}

var bossDefeated = function(){
    for( var i = 0; i<currentDungeon.map.length; i++){
        if (currentDungeon.map[i] === "Boss"){
            return false;
        }
    }
    return true;
}

var dungeonDefeated = function() {

    log("Congratulations, you have cleared the " + currentDungeon.name + "!");
    showDungeonDefeated(town);
    inProgress = 0;

    var town = currentDungeon.name.slice(0, -8);

    progressQuest('clearDungeons', currentDungeon.name , 1);

    moveToTown(town);
    resetDungeon();

    updateAll();
}

var resetDungeon = function() {
    if (currentDungeon != undefined) {
        clearInterval(counter);
        currentDungeon.timeLeft = currentDungeon.timeLimit;
        currentDungeon.pokemonDefeated = 0;
        currentDungeon.mapDiscovered = [];
        currentDungeon.chestsOpened = 0;
    }
}

var showDungeonDefeated = function() {
    if(inProgress === 3){
        html = "";
        html += "You have completed the " + currentDungeon.name + "!<br>";
        for(var i = 0; i < currentDungeon.loot.length; i++){
            html += "<img class='smallImage' src=images/items/"+getItemByName(currentDungeon.loot[i]).id+".png>";
        }
        html += "<div class='row'>"
        html +=     "<button class='dungeon leftTownButton btn btn-primary col-sm-2' id='" + currentDungeon.name + "'>Retry!<br>"+currentDungeon.tokenCost+" tokens</button>"
        html += "</div>"

        $("#dungeonDefeatedBody").html(html);
        $("#dungeonModal").modal('show');
    }
}

var alreadyGotBadge = function(badgeName) {
    for (var i = 0; i < player.dungeonBadges.length; i++) {
        if (player.dungeonBadges[i] == badgeName) {
            return true;
        }
    }
    return false;
}

var spawnDungeonBoss = function() {
    showHealthBar();
    dungeonCanMove = 0;

    hideDungeonChest();
    var possibleBosses = currentDungeon.bossList;
    var bossPokemon;
    if(isActive("Legendary Charm") && possibleBosses.length > 2){
            bossPokemon = possibleBosses[Math.floor(Math.random()*(possibleBosses.length-1))];
    } else {
        bossPokemon = possibleBosses[Math.floor(Math.random()*possibleBosses.length)];
    }

    curEnemy.name = bossPokemon.name;
    curEnemy.id = getPokemonByName(curEnemy.name).id;
    curEnemy.health = Math.floor(bossPokemon.health * (1 + (currentDungeon.chestsOpened) / 10));
    curEnemy.maxHealth = curEnemy.health;
    curEnemy.reward = 0;
    curEnemy.alive = true;
    curEnemy.route = 0;
    curEnemy.boss = 1;
    curEnemy.catchRate = 10;
    curEnemy.shiny = generateShiny();
    curEnemy.exp = getPokemonByName(curEnemy.name).baseXpGain;
    curEnemy.level = bossPokemon.level;

    var possibleType = getPokemonByName(curEnemy.name).type;
    if(possibleType != undefined){
        curEnemy.type = possibleType;
    } else {
        curEnemy.type = ['normal'];        
    }

    clearInterval(attackInterval);
    attackInterval = setInterval(pokemonsAttack, 1000);
    updateDungeon();
}

var spawnDungeonPokemon = function() {
    showHealthBar();
    dungeonCanMove = 0;
    var enemyName = currentDungeon.pokemons[Math.floor(Math.random() * currentDungeon.pokemons.length)];
    curEnemy.name = enemyName;
    curEnemy.id = getPokemonByName(curEnemy.name).id;
    curEnemy.health = Math.floor(currentDungeon.baseHealth * (1 + (currentDungeon.pokemonDefeated) / 10));
    curEnemy.maxHealth = curEnemy.health;
    curEnemy.reward = 0;
    curEnemy.alive = true;
    curEnemy.route = 0;
    curEnemy.catchRate = 20;
    curEnemy.shiny = generateShiny();
    curEnemy.boss = 0;
    curEnemy.exp = getPokemonByName(curEnemy.name).baseXpGain;
    curEnemy.level = currentDungeon.level;

    var possibleType = getPokemonByName(curEnemy.name).type;
    if(possibleType != undefined){
        curEnemy.type = possibleType;
    } else {
        curEnemy.type = ['normal'];        
    }
    clearInterval(attackInterval);
    attackInterval = setInterval(pokemonsAttack, 1000);
    updateDungeon();
}

var allPokemonCaughtInDungeon = function(pokemons, boss){

    for( var i = 0; i<boss.length; i++){
        if(!alreadyCaught(boss[i].name)){
            return false;
        }
    }
    
    for( var i = 0; i<pokemons.length; i++){
        if(!alreadyCaught(pokemons[i])){
            return false;
        }
    }
    return true;
}

/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
