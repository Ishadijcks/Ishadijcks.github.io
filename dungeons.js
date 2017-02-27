var currentDungeon;
var counter;
var catchTimeout;
var playerPosition;
var dungeonCanMove = 0;

var Dungeon = function(name, pokemons, size, baseHealth, bossList, tokenCost, badgeReq, itemRoute, level) {
    var temp = {
        name: name,
        pokemonDefeated: 0,
        size: size,
        map: [],
        mapDiscovered: [],
        mapVisited: [],
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

var getDungeonId = function(dungeonName){
    var dungeonList = getDungeonNames();
    for( var i = 0; i<dungeonList.length; i++){
        if(dungeonList[i] === dungeonName){
            return i;
        }
    }
    return -1;
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
        currentDungeon.mapVisited[playerPosition] = 1;
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

var canMoveToRoom = function(target, size) {
    if (curEnemy.alive || !dungeonCanMove) {
        return false;
    }

    //If any of the adjacent squares are visited, it's a valid room.
    if (target < 0 || target > (size*size) - 1) {
        return false;
    }
    if (currentDungeon.mapVisited[target+size] || currentDungeon.mapVisited[target-size]) {
        return true;
    }
    //things get a bit tricky with the wrapped "x-values".
    if (currentDungeon.mapVisited[target-1]) {
        return !(target % (size) == 0)
    }
    if (currentDungeon.mapVisited[target+1]) {
        return !(target % (size) == (size - 1))
    }
}

var floodVisit = function(startPos) {
	var size = currentDungeon.size;
	var Q = [];
	var chk = [];
	currentDungeon.mapVisited[startPos] = 1;
	Q.push(startPos);
	chk[startPos] = 1;
	while (Q.length > 0) {
		var n = Q.shift();
		var nStep = n-1; //left
		if (chk[nStep] != 1 && 
			n % (size) != 0 && (nStep) >= 0 && 
			currentDungeon.mapDiscovered[nStep] && currentDungeon.map[nStep] == "Empty") {
				currentDungeon.mapVisited[nStep] = 1;
				Q.push(nStep);
				chk[nStep] = 1;
		}
		nStep = n+1; //right
		if (chk[nStep] != 1 && 
			n % (size) != (size-1) && (nStep) < (size*size) && 
			currentDungeon.mapDiscovered[nStep] && currentDungeon.map[nStep] == "Empty") {
				currentDungeon.mapVisited[nStep] = 1;
				Q.push(nStep);
				chk[nStep] = 1;
		}
		nStep = n-size; //up
		if (chk[nStep] != 1 && 
			(nStep) >= 0 && 
			currentDungeon.mapDiscovered[nStep] && currentDungeon.map[nStep] == "Empty") {
				currentDungeon.mapVisited[nStep] = 1;
				Q.push(nStep);
				chk[nStep] = 1;
		}
		nStep = n+size; //down
		if (chk[nStep] != 1 && 
			(nStep) < (size*size) && 
			currentDungeon.mapDiscovered[nStep] && currentDungeon.map[nStep] == "Empty") {
				currentDungeon.mapVisited[nStep] = 1;
				Q.push(nStep);
				chk[nStep] = 1;
		}
	}
}

var moveToRoom = function(id) {
    if (canMoveToRoom(id, currentDungeon.size)) {
        playerPosition = id;
        currentDungeon.mapDiscovered[id] = 1;
		floodVisit(playerPosition);
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

    floodVisit(playerPosition);
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
    html += "<div id='dungeonName'>"+currentDungeon.name.slice(0, -8);
    if (dungeonCompletedShiny(currentDungeon)){
        html += "<a title='You have caught all shiny Pokemon on this route!'><img id='alreadyCaughtImage' src='images/shinyPokeball.PNG'></a>";
    } else if(dungeonCompleted(currentDungeon)){
        html += "<a title='You have caught all available Pokemon on this route!'><img id='alreadyCaughtImage' src='images/Pokeball.PNG'></a>";
    }
    html += "</div>"
    html += "<span id='dungeonTimer'>"+(currentDungeon.timeLeft / 100) + "/" + currentDungeon.timeLimit / 100+"</span>";
    html += "<div id='dungeonMap'></div>"
    if(!dungeonCanMove && curEnemy.alive){

        html += "<div id='dungeonEnemyInfo'><br>" + curEnemy.name + " ";

        if(curEnemy.shiny){
            html += "<img class='shinyEnemyStar' src='images/shinypokemon/star.png'><br><img id=dungeonEnemy class='shinyFiller' src='images/shinypokemon/"+curEnemy.id+".png' >";
        } else {

            if(alreadyCaughtShiny(curEnemy.name)){
                html += "<img id=alreadyCaughtImage src=images/shinyPokeball.PNG><br><img id=dungeonEnemy src='images/pokemon/"+curEnemy.id+".png' >";
            } else if(alreadyCaught(curEnemy.name)){
                html += "<img id=alreadyCaughtImage src=images/Pokeball.PNG><br><img id=dungeonEnemy src='images/pokemon/"+curEnemy.id+".png' >";
            } else {
                html += "<br><img id=dungeonEnemy src='images/pokemon/"+curEnemy.id+".png' >";
            }
        }

        html += "</div>";

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

        var catchRate = curEnemy.catchRate + getBonusCatchrate();
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
            $("#dungeonCatchDisplay").html("Catch chance: " + Math.min(100, catchRate) + "%");
            player.pokeballs--;
        }, 1);

        gainExp(curEnemy.exp,curEnemy.level,false);
        gainShards(curEnemy.type, 3);
        dungeonCanMove = 1;
        progressEgg(Math.floor(Math.sqrt(currentDungeon.itemRoute)));
        catchTimeout = setTimeout(function() {
            if (inProgress != 0) {
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
    var index = getDungeonId(currentDungeon.name);
    if(index !== -1){
        player.dungeonsDefeated[index]++;
    }
    var town = currentDungeon.name.slice(0, -8);

    progressQuest('clearDungeons', currentDungeon.name , 1);

    moveToTown(town);
    resetDungeon();

    updateAll();
}

var resetDungeon = function() {
    if (currentDungeon != undefined) {
        clearInterval(counter);
        clearTimeout(catchTimeout);
        currentDungeon.timeLeft = currentDungeon.timeLimit;
        currentDungeon.pokemonDefeated = 0;
        currentDungeon.mapDiscovered = [];
        currentDungeon.mapVisited = [];
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

var dungeonCompleted = function(dungeon){

    for (var i=0; i<dungeon.pokemons.length; i++) {
        if(!alreadyCaught(dungeon.pokemons[i])) {
            return false;
        }
    }

    for (var i=0; i<dungeon.bossList.length; i++) {
        if(!alreadyCaught(dungeon.bossList[i].name)) {
            return false;
        }
    }

    return true;
}

var dungeonCompletedShiny = function(dungeon){

    for (var i=0; i<dungeon.pokemons.length; i++) {
        if(!alreadyCaughtShiny(dungeon.pokemons[i])) {
            return false;
        }
    }

    for (var i=0; i<dungeon.bossList.length; i++) {
        if(!alreadyCaughtShiny(dungeon.bossList[i].name)) {
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
