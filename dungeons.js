var currentDungeon;
var counter;
var playerPosition;
var dungeonCanMove = 0;

var Dungeon = function(name, pokemons, size, baseHealth, bossPokemon, tokenCost, badgeReq) {
    var temp = {
        name: name,
        pokemonDefeated: 0,
        size: size,
        map: [],
        mapDiscovered: [],
        baseHealth: baseHealth,
        pokemons: pokemons,
        bossPokemon: bossPokemon,
        tokenCost: tokenCost,
        badgeReq: badgeReq,
        timeLimit: 60 * 100,
        timeLeft: 60 * 100,
        chestsOpened: 0,
        loot: []
    }
    return temp;
}

var BossPokemon = function(name, health) {
    var temp = {
        name: name,
        health: health,
        maxHealth: health
    }
    return temp;
}

var ViridianForestDungeon = function() {
    var pokemonList = ["Caterpie", "Metapod", "Weedle", "Kakuna", "Pidgey", "Pidgeotto"];
    var bossPokemon = BossPokemon("Pikachu", 1000);
    return Dungeon("Viridian Forest Dungeon", pokemonList, 5, 100, bossPokemon, 0, 0);
}

var DiglettsCaveDungeon = function(){
    var pokemonList = ["Diglett"];
    var bossPokemon = BossPokemon("Dugtrio", 1500);
    return Dungeon("Digglets Cave Dungeon", pokemonList, 5, 150, bossPokemon, 0, 0);   
}

var MtMoonDungeon = function() {
    var pokemonList = ["Sandshrew", "Clefairy", "Zubat", "Paras", "Geodude", "Pidgeotto"];
    if (Math.random() >= 0.5) {
        var bossPokemon = BossPokemon("Kabuto", 2000);
    } else {
        var bossPokemon = BossPokemon("Omanyte", 2000);
    }
    return Dungeon("Mt. Moon Dungeon", pokemonList, 5, 250, bossPokemon, 0, 1);
}

var RockTunnelDungeon = function(){
    var pokemonList = ["Zubat", "Geodude", "Machop"];
    var bossPokemon = BossPokemon("Onix", 3000);
    return Dungeon("Rock Tunnel Dungeon", pokemonList, 5, 400, bossPokemon, 0, 2);   
}

var PowerPlantDungeon = function(){
    var pokemonList = ["Pikachu", "Raichu", "Magnemite", "Magneton", "Grimer", "Muk", "Electrode"];
    if( Math.random >= 0.75){
        var bossPokemon = BossPokemon("Zapdos", 15000);
    } else {
        var bossPokemon = BossPokemon("Electabuzz", 5000);
    }
    return Dungeon("Power Plant Dungeon", pokemonList, 5, 800, bossPokemon, 0, 2);   
}

var PokemonTowerDungeon = function(){
    var pokemonList = ["Gastly", "Haunter", "Cubone"];
    var bossPokemon = BossPokemon("Marowak", 7000);
    return Dungeon("Pokemon tower Dungeon", pokemonList, 5, 1200, bossPokemon, 0, 2);   
}

var SeafoamIslandsDungeon = function(){
    var pokemonList = ["Zubat", "Golbat", "Psyduck", "Golduck", "Slowpoke", "Slowbro", "Shellder", "Krabby", "Horsea", "Staryu"];
    if( Math.random >= 0.75){
        var bossPokemon = BossPokemon("Articuno", 25000);
    } else {
        var bossPokemon = BossPokemon("Seel", 8000);
    }
    return Dungeon("Seafoam Islands Dungeon", pokemonList, 5, 1500, bossPokemon, 0, 6);   
}

var VictoryRoadDungeon = function(){
    var pokemonList = ["Zubat", "Golbat", "Machop", "Geodude", "Graveler", "Onix", "Marowak", "Venomoth"];
    if( Math.random >= 0.75){
        var bossPokemon = BossPokemon("Moltres", 30000);
    } else {
        var bossPokemon = BossPokemon("Machoke", 10000);
    }
    return Dungeon("Victory Road Dungeon", pokemonList, 5, 1800, bossPokemon, 0, 8);   
}

var loadDungeon = function(townId) {
    curEnemy.alive = false;
    clearInterval(counter);

    currentDungeon = getTown(townId).gym;

    currentDungeon.timeLeft = currentDungeon.timeLimit;

    currentDungeon.map = createMap(currentDungeon.size);
    playerPosition = Math.floor(currentDungeon.size * currentDungeon.size / 2);
    currentDungeon.mapDiscovered[playerPosition] = 1;
    player.dungeonTokens -= currentDungeon.tokenCost;
   // spawnDungeonPokemon();
    dungeonCanMove = 1;
    updateDungeon();
    counter = setInterval(dungeonTimer, 100); //100 will  run it every 10th of a second
    hideHealthBar();
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
    if (target < 0 || target > size*size){
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
            console.log(i)
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
    currentDungeon.chestsOpened++;
    currentDungeon.map[playerPosition] = "Empty";
    console.log("chest openend: " + currentDungeon.chestsOpened );
    if( currentDungeon.chestsOpened >= 1){

        revealChests();
    }
    if( currentDungeon.chestsOpened >= 2){
        revealEverything();
    }

    hideDungeonChest();
    updateDungeonMap();

}

var dungeonTimer = function() {
    if (currentDungeon.timeLeft <= 0) {
        clearInterval(counter);
        if (inProgress == 3) {
            inProgress = 0;
            moveToTown(currentDungeon.name.slice(0, -8));
            currentDungeon.timeLeft = currentDungeon.timeLimit;
            $.notify("Train harder and try again!", 'error')
            $.notify("You couldn't defeat " + currentDungeon.leaderName + " in time.", 'error');

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
        html += "<div id='dungeonEnemyInfo'><br>" +curEnemy.name + "<img id='alreadyCaughtImage' src='images/Pokeball.PNG'><br><img id='dungeonEnemy' src='images/pokemon/"+curEnemy.id+".png' ></div>";
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
            if (alreadyCaught(curEnemy.name)) {
                $("#dungeonEnemyInfo").html("<br>" + curEnemy.name + " <img id=alreadyCaughtImage src=images/Pokeball.PNG><br><img id=dungeonPokeball src=images/Pokeball.PNG>");
            } else {
                $("#dungeonEnemyInfo").html("<br>" + curEnemy.name + " <br><img id=dungeonPokeball src=images/Pokeball.PNG>");
            }
            player.pokeballs--;
        }, 1);


        dungeonCanMove = 1;
        var catchRate = curEnemy.catchRate + getBonusCatchrate();
        $("#dungeonCatchDisplay").html("Catch chance: " + Math.min(100, catchRate) + "%");

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
            if(curEnemy.boss){
                dungeonDefeated();
            }
        }, player.catchTime);
        curEnemy.alive = false;
    }


}

var dungeonDefeated = function() {

    log("Congratulations, you have cleared the " + currentDungeon.name + "!");
    inProgress = 0;
    resetDungeon();

    var town = currentDungeon.name.slice(0, -8);

    moveToTown(town);
    showDungeonDefeated(town);

    updateAll();
}

var resetDungeon = function() {
    if (currentDungeon != undefined) {
        clearInterval(counter);
        currentDungeon.timeLeft = currentDungeon.timeLimit;
        currentDungeon.pokemonDefeated = 0;
        currentDungeon.loot = [];
        currentDungeon.mapDiscovered = [];
        currentDungeon.chestsOpened = 0;
    }
}

var showDungeonDefeated = function() {

    html = "";

    html += "You have completed the " + currentDungeon.name + "!<br>";


    html += "<br><br>Defeat this dungeon again to earn 10% of its original money reward!"




    $("#dungeonDefeatedBody").html(html);
    $("#dungeonModal").modal('show');
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
    curEnemy.name = currentDungeon.bossPokemon.name;
    curEnemy.id = getPokemonByName(curEnemy.name).id;
    curEnemy.health = Math.floor(currentDungeon.bossPokemon.health * (1 + (currentDungeon.chestsOpened) / 10));
    curEnemy.maxHealth = curEnemy.health;
    curEnemy.reward = 0;
    curEnemy.alive = true;
    curEnemy.route = 0;
    curEnemy.boss = 1;
    curEnemy.catchRate = 10;
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
    curEnemy.boss = 0;
    clearInterval(attackInterval);
    attackInterval = setInterval(pokemonsAttack, 1000);
    updateDungeon();
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