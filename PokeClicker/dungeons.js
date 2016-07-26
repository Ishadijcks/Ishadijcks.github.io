var currentDungeon;
var counter;
var playerPosition;

var Dungeon = function(name, pokemons, size, baseHealth, bossPokemon, dungeonReq, badgeReq) {
    var temp = {
        name: name,
        pokemonDefeated: 0,
        size: size,
        map: [],
        mapDiscovered: [],
        baseHealth: baseHealth,
        pokemons: pokemons,
        bossPokemon: bossPokemon,
        dungeonReq: dungeonReq,
        badgeReq: badgeReq,
        timeLimit: 60 * 100,
        timeLeft: 60 * 100
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
    var bossPokemon = BossPokemon("Pikachu", 5000);
    return Dungeon("Viridian Forest Dungeon", pokemonList, 5, 40, bossPokemon, 0, 0);
}

var loadDungeon = function(townId) {
    clearInterval(counter);

    currentDungeon = getTown(townId).gym;
    currentDungeon.timeLeft = currentDungeon.timeLimit;

    currentDungeon.map = createMap(currentDungeon.size);
    playerPosition = Math.floor(currentDungeon.size*currentDungeon.size/2);
    currentDungeon.mapDiscovered[playerPosition] = 1;
    spawnDungeonPokemon();
    updateDungeonMap();
    counter = setInterval(dungeonTimer, 100); //100 will  run it every 10th of a second
}

var createMap = function(size) {
    var map = ["Boss"];
    for (var i = 1; i < size + 1; i++) {
        map[i] = "Chest";
    }
    for (var i = size + 1; i < size * size; i++) {
        map[i] = "Pokemon";
    }
    shuffle(map);
    return map;
}

var adjacent = function(pos, target, size){
    if(target == pos + size){
        return true;
    }
    if(target == pos - size){
        return true;
    }
    if(target == pos + 1){
        return !(target % (size) == 0)
    }

    if(target == pos - 1){
        return !(target % (size) == (size-1))
    }
    return false;

}

var moveToRoom = function(id){
    if(adjacent(playerPosition, id, currentDungeon.size)){
        playerPosition = id;
        currentDungeon.mapDiscovered[id] = 1;
        console.log(id)
    }
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

var updateDungeon = function() {

    hideAllViews();
    $("#dungeonView").show();

    if (curEnemy.health < 0) {
        curEnemy.health = 0;
    }
    if (curEnemy.health == 0) {
        dungeonEnemyDefeated(currentDungeon);
    }

    if (curEnemy.alive ) {

	    $("#dungeonName").html(currentDungeon.name.slice(0, -8));
	        if (alreadyCaught(curEnemy.name)) {
	            $("#dungeonEnemyInfo").html("<br>" + curEnemy.name + " <img id=alreadyCaughtImage src=images/Pokeball.PNG><br><img id=dungeonEnemy src=images/pokemon/" + curEnemy.id + ".png>");
	        } else {
	            $("#dungeonEnemyInfo").html("<br>" + curEnemy.name + "<br><img id=dungeonEnemy src=images/pokemon/" + curEnemy.id + ".png>");
	        }
	    
	    	$("#dungeonHealthBar").width(100 * curEnemy.health / curEnemy.maxHealth + "%");
	    	$("#dungeonHealthDisplay").html(curEnemy.health + "/" + curEnemy.maxHealth);
	}
    if (curEnemy.health != 0) {
        inProgress = 3;
    }
}

var updateDungeonMap = function(){
        var size = currentDungeon.size;
        var bootstrap = Math.floor(11 / size);
        var html = "";
        var roomClass;
        var curRoom = currentDungeon.map[playerPosition];
        for (var i = 0; i < size; i++) {

            html += "<div class='row'>";
            for (var j = 0; j < size; j++) {

                if(currentDungeon.mapDiscovered[i*size+j] == 1){
                    if( i*size+j == playerPosition){
                        html += "<span id='room" + (i*size+ j) + "' class='playerRoom dungeonRoom col-sm-" + bootstrap + "'></span>";
                    } else if( currentDungeon.map[i*size+j] == "Chest"){
                        html += "<span id='room" + (i*size+ j) + "' class='chestRoom dungeonRoom col-sm-" + bootstrap + "'></span>";
                    }
                    else if( currentDungeon.map[i*size+j] == "Pokemon"){
                        html += "<span id='room" + (i*size+ j) + "' class='enemyRoom dungeonRoom col-sm-" + bootstrap + "'></span>";
                    }
                    else if( currentDungeon.map[i*size+j] == "Boss"){
                        html += "<span id='room" + (i*size+ j) + "' class='bossRoom dungeonRoom col-sm-" + bootstrap + "'></span>";
                    }
                } else {
                     html += "<span id='room" + (i*size+ j) + "' class='undiscoveredRoom dungeonRoom col-sm-" + bootstrap + "'></span>";
                }
            }
            html += "</div>";
        }




        $("#dungeonMap").html(html);
}

var dungeonEnemyDefeated = function() {

    canCatch = 1;
    if (curEnemy.alive) {
        var id = getPokemonByName(curEnemy.name).id - 1;
        player.defeatNumbers[id]++;
        setTimeout(function() {


            if (alreadyCaught(curEnemy.name)) {
                $("#dungeonEnemyInfo").html("<br>" + curEnemy.name + " <img id=alreadyCaughtImage src=images/Pokeball.PNG><br><img id=pokeball src=images/Pokeball.PNG>");
            } else {
                $("#dungeonEnemyInfo").html("<br>" + curEnemy.name + " <br><img id=pokeball src=images/Pokeball.PNG>");
            }
            player.pokeballs--;
        }, 1);

        var catchRate = curEnemy.catchRate + getBonusCatchrate() - 10;
        $("#dungeonCatchDisplay").html("Catch chance: " + Math.min(100, catchRate) + "%");

        setTimeout(function() {
            if (canCatch) {

                var chance = Math.floor(Math.random() * 100 + 1);
                if (chance <= catchRate) {
                    capturePokemon(curEnemy.name, curEnemy.shiny);

                }

                if (inProgress == 1) {
                    generatePokemon(player.route);
                }

                updateStats();


            }


            currentDungeon.pokemonDefeated++

            $("#dungeonCatchDisplay").html("");
            updateDungeon();
        }, player.catchTime);
        curEnemy.alive = false;
    }


}

var dungeonDefeated = function() {
    clearInterval(counter);
    log("Congratulations, you have cleared the " + currentDungeon.name + "!");
    inProgress = 0;
    currentDungeon.timeLeft = currentDungeon.timeLimit;
    currentDungeon.pokemonDefeated = 0;

    console.log(currentDungeon);
    var town = currentDungeon.name.slice(0, -8);

    moveToTown(town);
    showDungeonDefeated(town);

    updateAll();
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

var spawnDungeonPokemon = function() {
    var enemyName = currentDungeon.pokemons[Math.floor(Math.random() * currentDungeon.pokemons.length)];
    curEnemy.name = enemyName;
    curEnemy.id = getPokemonByName(curEnemy.name).id;
    curEnemy.health = currentDungeon.baseHealth * (1 + (currentDungeon.pokemonDefeated) / 10);
    curEnemy.maxHealth = curEnemy.health;
    curEnemy.reward = 0;
    curEnemy.alive = true;
    curEnemy.route = 0;
    curEnemy.catchRate = 0;
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