var safari = {
    grid: [],
    sizeX: 25,
    sizeY: 21,
    maxItems: 3,
    layersCleared: 0,
    totalItemsFound: 0,
    energy: 50,
    maxEnergy: 50,
    player: {
        x: 12,
        y: 20
    },
    isMoving:0,
    movingX: 0,
    movingY: 0,
    lastDirection: "up",
    nextDirection: "up",
    offset: {
        top: 0,
        left: 0
    },
    balls: 30,
    inBattle: 0,
    enemy: {
        name: "",
        catchFactor: 0,
        angry: 0,
        eating: 0,
        escapeFactor: 0
    },
    escapes: 0,
    frame: 0,
    battleBusy: 0
}

var element;
var sprite;
var walking = false;
var origin;


var loadSafari = function(){
    inProgress = 4;
    safari.grid = [];
    safari.player.x = 12;
    safari.player.y = 20
    for( var i = 0; i<safari.sizeY; i++){
        var row = [];
        for(var j = 0; j<safari.sizeX; j++){
            row.push(0);
        }
        safari.grid.push(row);
    }

    addRandomBody(fenceBody(), 'fence');
    addRandomBody(waterBody(), 'water');
    addRandomBody(sandBody(), 'sand');
    addRandomBody(waterBody(), 'water');
    addRandomBody(waterBody(), 'water');
    addRandomBody(sandBody(), 'sand');
    addRandomBody(treeBody(), 'tree');
    addRandomBody(treeBody(), 'tree');
    addRandomBody(treeBody(), 'tree');
    addRandomBody(treeBody(), 'tree');
    addRandomBody(treeBody(), 'tree');
    addRandomBody(fenceBody(), 'fence');
    addRandomBody(sandBody(), 'sand');
    addRandomBody(fenceBody(), 'fence');
    addRandomBody(waterBody(), 'water');
    addRandomBody(sandBody(), 'sand');
    addRandomBody(waterBody(), 'water');
    addRandomBody(waterBody(), 'water');
    addRandomBody(sandBody(), 'sand');
    addRandomBody(sandBody(), 'sand');
    addRandomBody(grassBody(), 'grass');
    addRandomBody(grassBody(), 'grass');
    addRandomBody(grassBody(), 'grass');
    addRandomBody(grassBody(), 'grass');
    showSafari();
}

var addRandomBody = function(body, type){
    var x = getRandomCoord(safari.sizeX - 2);
    var y = getRandomCoord(safari.sizeY - 2);
    if(type === 'fence'){
        x = Math.max(0, x-3);
        y = Math.max(0, y-3);
    }
    var res = canAddBody(x, y, body);
    if (res || type === 'grass') {
        addBody(x, y, body);
    }
}

var getXY = function(direction){
    var x = 0;
    var y = 0;
    switch(direction){
        case 'up':
            y = -1;
            break;
        case 'right':
            x = 1;
            break;
        case 'left':
            x = -1;
            break;
        case 'down':
            y = 1;
            break;
    }

    return {x: x, y: y}
}

var showSafari = function(){
    var html = "";

    html += "<div>";
    for(var i = 0; i<safari.grid.length; i++){
        html += "<div class='row'>";
        for(var j = 0; j<safari.grid[0].length; j++){
            html += safariSquare(safari.grid[i][j], j, i);
        }
        html += "</div>";
    }

    $("#safariBody").html(html);
    addPlayer();


    // Sprite
    element = document.querySelector('#sprite');
    sprite = new Motio(element, {
        fps: 10,
        frames: 2
    });
}


var safariStep = function(direction) {
    safari.lastDirection = direction;

    sprite.toggle();
    directionOffset = getXY(direction);
    safari.movingX = directionOffset.x;
    safari.movingY = directionOffset.y;

    safari.isMoving = 1;

    if (canMoveSafari(safari.player.x + safari.movingX, safari.player.y + safari.movingY)) {
        var next = $("#safari-" + (safari.player.x + safari.movingX) + "-" + (safari.player.y + safari.movingY)).offset();
        safari.offset = {
            top: next.top - origin.top,
            left: next.left - origin.left
        }

        $(".sprite").css("background", "url('images/safari/walk"+direction+".png')");
        safari.player.x += safari.movingX;
        safari.player.y += safari.movingY;
        $('#sprite').animate(safari.offset, 250, "linear", function() {
            checkBattle();
            safari.isMoving = 0;
            if(walking){ if (!checkBattle() && queue[0]){safariStep(queue[0])} }
        });
    } else {
        $(".sprite").css("background", "url('images/safari/walk"+direction+".png')");
        setTimeout(function(){
            walking = false;
            safari.isMoving = 0;
            if(queue[0]){
                safari.isMoving = 1;
                walking = true;
                safariStep(queue[0]);
            }
        }, 250);
    }
}

var checkBattle = function(){
    if(safari.grid[safari.player.y][safari.player.x] === 10){
        var battle = Math.random() <= 1;
    }
    if(battle){
        loadBattle();
        return true;
    }
    return false;
}

var loadBattle = function(){
    safari.enemy.name = "Pinsir";
    safari.enemy.catchFactor = getPokemonByName(safari.enemy.name).catchRate * 100/1275;
    safari.enemy.escapeFactor = 10;
    safari.enemy.angry = 0;
    safari.enemy.eating = 0;
    safari.inBattle = 1;
    $.notify("Battle");
    showBattleBars();
}

var getSafariCatchFactor = function(){
    if(safari.enemy.eating > 0) {
        return safari.enemy.catchFactor / 2;
    }
    if(safari.enemy.angry > 0) {
        return safari.enemy.catchFactor * 2;
    }

    return safari.enemy.catchFactor;
}

var getSafariEscapeFactor = function(){
    if(safari.enemy.eating > 0) {
        return safari.enemy.escapeFactor / 4;
    }
    if(safari.enemy.angry > 0) {
        return safari.enemy.escapeFactor * 2;
    }

    return safari.enemy.escapeFactor;
}

var showBattleBars = function(){
    var html =  "<div id='battleBars' class='container-fluid'>";
    for( var i = 0; i<10; i++){
        html += "<div id=battleBar"+i + " class='row battleBar'></div>";
    }

    html += "</div>";
    $("#safariBody").html(html);
        $(".battleBar").animate({
            width: "50%"
        }, 1000, "linear");
    showBattle();
}

var showBattle = function(){
    var enemy = getPokemonByName(safari.enemy.name || "Pinsir");
    var html = "";
    html += "<div class='row safariEnemyRow'>";
    html +=     "<div class='col-sm-2 col-sm-offset-8' id='safariEnemy'><img src='images/pokemon/" + enemy.id + ".png'></div>";
    html += "</div>";
    html += "<div class='row'>";
    html +=     "<div class='col-sm-2 col-sm-offset-3'>";
    html +=         "<img id='safariPlayer' src='images/safari/playerBack.png'>"
    html +=     "</div>";
    html += "</div>";

    html += "<div class='row'>";
    html +=     "<div class='col-sm-12' id='battleConsole'>";
    html +=         "<div class='col-sm-6'>"
    html +=             "<h3 id='safariBattleText'>What will you do?</h3>"
    html +=         "</div>";
    html +=     "<div class='col-sm-4 col-sm-offset-2 safariOptions'>";
    html +=             "<div class='col-sm-6 safariOption'><button onClick='throwBall()' class='btn btn-info safariButton'>Ball (" + safari.balls + ")</button></div>";
    html +=             "<div class='col-sm-6 safariOption'><button onClick='throwBait()' class='btn btn-info safariButton'>Bait</button></div>";
    html +=             "<div class='col-sm-6 safariOption'><button onClick='throwRock()' class='btn btn-info safariButton'>Rock</button></div>";
    html +=             "<div class='col-sm-6 safariOption'><button onClick='safariRun()' class='btn btn-info safariButton'>Run</button></div>";
    html +=     "</div>";

    html += "</div>";

    $("#safariBody").html(html);
    $("#safariBody").css("background-image", "url('images/safari/safariBattle.png')");
    $("#safariBody").css("background-size", "100% auto");
}

var safariEnemyTurn = function(){
    // Enemy turn to flee;
    console.log("Enemy turn");
    var random = Math.floor(Math.random()*100);
    if( random < 5*getSafariEscapeFactor()){
        updateSafariBattleText(safari.enemy.name + " has fled.");
        setTimeout(endBattle, 1000);
    } else if(safari.enemy.eating > 0) {
        updateSafariBattleText(safari.enemy.name + " is eating.");
    } else if(safari.enemy.angry > 0) {
        updateSafariBattleText(safari.enemy.name + " is watching carefully.");
    }
    safari.enemy.eating = Math.max(0, safari.enemy.eating-1);
    safari.enemy.angry = Math.max(0, safari.enemy.angry-1);
    setTimeout(function(){
        updateSafariBattleText("What will you do?");
        safari.battleBusy = 0;
    }, 1500);
    console.log(getSafariCatchFactor()*1275/100);
    console.log(getSafariEscapeFactor()*5 + "%");
}

var endBattle = function(){
    safari.inBattle = 0;
    safari.battleBusy = 0;
    showSafari();
    $("#safariBody").css("background-image", "none");
}

var safariRun = function(){
    if(Math.random()*100 < (30 + 15*safari.escapes)){
        updateSafariBattleText("You flee.");
        setTimeout(endBattle, 1500);
    } else {
        updateSafariBattleText("You can't escape...");
        setTimeout(safariEnemyTurn, 1000);
    }
}

var updateSafariBattleText = function(text){
    $("#safariBattleText").html(text);
}

var safariCatchMessages = ["Oh, no!<br>The Pokemon broke free!", "Aww! It appeared to be caught!", "Aargh! Almost had it!", "Shoot! It was so close, too!"]

var throwBall = function() {
    if(!safari.battleBusy) {
        safari.balls--;
        showBattle();
        updateSafariBattleText("You throw a ball... (fancy animation #DimavaPls)");
        safari.battleBusy = 1;
        var enemy = $('#safariEnemy').offset();
        enemy.left += 48;
        var p = dropParticle('<img src=images/safari/pokeball.png>', $('#safariPlayer').offset(), enemy, 0.75, 'cubic-bezier(0,0,0.4,1)', true).css('z-index',9999);

        setTimeout(function() {
        	$('#safariEnemy').addClass('safariCapture')
        }, 750);

        setTimeout(function() {
        	$('#safariEnemy > img').css('opacity', '0');
        }, 1500)

        setTimeout(function () {
            var random = Math.random();
            var index = Math.floor(random*4);
            if (random*100 < getSafariCatchFactor()*1275/100){
                captureSafariPokemon(safari.enemy.name);
                endBattle();
            } else {
            	//Dimava pls help
            	//p.addClass('bounce');
            	setTimeout(function() {
        			$('#safariEnemy > img').css('opacity', '1');
            		$('#safariEnemy').removeClass('safariCapture');
                	updateSafariBattleText(safariCatchMessages[index]);
                	setTimeout(safariEnemyTurn,1000);
                	p.remove();
                }, 1000 + index*500);
            }
        }, 1600)
    }
}

var throwRock = function(){
    if(!safari.battleBusy) {
        updateSafariBattleText("You throw a rock at " + safari.enemy.name + "... (fancy animation #AegyoPls)");
        safari.battleBusy = 1;
        safari.enemy.angry = Math.max(safari.enemy.angry, Math.floor(Math.random() * 5 + 2))
        safari.enemy.eating = 0;
        var enemy = $('#safariEnemy').offset();
        enemy.left += 40;
        enemy.top += 10
        dropParticle('<img src=images/safari/rock.png>', $('#safariPlayer').offset(), enemy, 0.8, 'cubic-bezier(0,0,0.4,1)').css('z-index',9999);
        setTimeout(function(){
        	var hitSplash = $('<ptcl>').html("<img src=images/safari/hit.png>").children().appendTo('body');
        	hitSplash.offset(enemy).css({'opacity': 0.8, 'z-index': 9998});
        	hitSplash.fadeOut(400, function(){hitSplash.remove();});
        	setTimeout(function(){
        		var newOffset = {
        			top: enemy.top + 4,
        			left: enemy.left - 20
        		}
        		var ang = $('<ptcl>').html("<img src=images/safari/angry.png>").children().appendTo('body');
    			ang.css('position','absolute').css('z-index', 9999);
    			ang.offset(newOffset);
        		ang.addClass('pulse');
        		setTimeout(function(){
        			newOffset.top -= 10;
        			newOffset.left += 60;
        			ang.offset(newOffset);
        			setTimeout(function(){
        				ang.remove();
        			},350)
        		},350);
        	},300);
        },800);
        setTimeout(safariEnemyTurn, 2000);
    }
}

var throwBait = function(){
    if(!safari.battleBusy){
        updateSafariBattleText("You throw some bait at " + safari.enemy.name + "... (fancy animation #AegyoPls)");
        safari.battleBusy = 1;
        safari.enemy.eating = Math.max(safari.enemy.eating, Math.floor(Math.random()*5 + 2))
        safari.enemy.angry = 0;
        var enemy = $('#safariEnemy').offset();
        enemy.left += 40;
        enemy.top += 10
        dropParticle('<img src=images/safari/bait.png>', $('#safariPlayer').offset(), enemy, 1, 'cubic-bezier(0,0,0.4,1)').css('z-index',9999);
        setTimeout(safariEnemyTurn, 1500);
    }
}


var captureSafariPokemon = function(pokemonName){
    updateSafariBattleText("GOTCHA!<br>" + pokemonName + " was caught!");
    // capturePokemon(pokemonName);
}


var safariMove = function(direction){
    safari.nextDirection = direction;

    if(!safari.isMoving) {
        var frame = 0;
        origin = $("#safari-12-20").offset();

        element = document.querySelector('#sprite');
        sprite = new Motio(element, {
            fps: 8,
            frames: 4
        }).on('frame', function() {
            if (sprite.frame%2 == 0) {
                sprite.pause();
                safari.frame = sprite.frame;
            }
        });
        if (safari.frame == 2) {
            sprite.to(2, true, function(){safariStep(direction)});
        }
        else {
            safariStep(direction);
        }
        
        safari.lastDirection = direction;
    }
}

var canMoveSafari = function(x,y){
    for(var i = 0; i<legalBlock.length; i++){
        if(safari.grid[y] && safari.grid[y][x] === legalBlock[i]){
            return true;
        }
    }
    return false;
}

var legalBlock = [0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

var addPlayer = function(){
    $("#safari-12-20").html("<div id='sprite' class='sprite'></div>");
    $(".sprite").css('background',  "url('images/safari/walk" + safari.lastDirection + ".png')");
    $(".sprite").css('position', 'absolute');
    $(".sprite").animate(safari.offset,0)
}

var updatePlayer = function(){
    safari.isMoving = 0;
}

var safariSquare = function(id, j, i){
    return "<div id='safari-"+j+"-"+i+"' style=background-image:url('images/safari/"+ id + ".png') class='col-sm-1 safariSquare'></div>";
}

var addBody = function(x, y, body){
    for(var i = 0; i<body.length; i++){
        for( var j = 0; j<body[i].length; j++){
            if(body[i][j] !== 0){
                if( (i + y) <safari.sizeY && (j + x) < safari.sizeX) {
                    if (safari.grid[i + y][j + x] === 0) {
                        safari.grid[i + y][j + x] = body[i][j];
                    }
                }
            }
        }
    }
}

var fenceBody = function(){
    var body = sandBody(7,7, 'fence');
    return openFence(edgeDetect(body, 'fence'));
}

var openFence = function(body){
    var options = [26, 28, 29, 31];
    var pick = options[Math.floor(Math.random()*options.length)];
    for(var i = 0; i<body.length; i++){
        for(var j = 0; j<body[0].length; j++){
            if(body[i][j] === pick){
                body[i][j] = 0;
                return body;
            }
        }
    }
    return body;
}

var waterBody = function() {
    var x = Math.floor(Math.random() * 3) + 3;
    var y = Math.floor(Math.random() * 3) + 3;
    var body = [];
    for (var i = 0; i < y; i++) {
        var row = [];
        for (var j = 0; j < x; j++) {
            if (i === 0){
                if( j === 0){
                    row.push(1);
                } else if (j < x-1){
                    row.push(2)
                } else if (j === x-1){
                    row.push(3)
                }
            } else if (i < y - 1){
                if( j === 0){
                    row.push(4);
                } else if (j < x-1){
                    row.push(5)
                } else if (j === x-1){
                    row.push(6)
                }
            } else if (i === y - 1){
                if( j === 0){
                    row.push(7);
                } else if (j < x-1){
                    row.push(8)
                } else if (j === x-1){
                    row.push(9)
                }
            }
        }
        body.push(row);
    }
    return body;
}

var grassBody = function(){
    var x = Math.floor(Math.random() * 3) + 4;
    var y = Math.floor(Math.random() * 3) + 4;
    var body = [];
    for (var i = 0; i < y; i++) {
        var row = [];
        for (var j = 0; j < x; j++) {
            if(j < x*2/3-1) {
                row.push(10);
            } else {
                row.push(0);
            }
        }
        shuffle(row);
        body.push(row);
    }

    body = fillHoles(body);

    return body;
}

var fillHoles = function(body){
    for(var i = 0; i<body.length; i++){
        for(var j = 0; j<body[0].length; j++){
            if(body[i][j] === 0) {
                if (i !== 0 && i !== body.length - 1) {
                    if (body[i - 1][j] === 10 && body[i + 1][j] === 10) {
                        body[i][j] = 10;
                    }
                }
            }
        }
    }

    for(var i = 0; i<body.length; i++){
        for(var j = 0; j<body[0].length; j++){
            if(body[i][j] === 0) {

                if (j !== 0 && j !== body[0].length - 1) {
                    if (body[i][j-1] === 10 && body[i][j+1] === 10) {
                        body[i][j] = 10;
                    }
                }
            }
        }
    }
    return body;
}

var treeBody = function(){
    return [[37,38,39],[40,41,42],[43,44,45],[46,47,48]];
}

var sandBody = function(x, y, type) {
    if ( x === undefined) {
        var x = Math.floor(Math.random() * 3) + 3;
    }
    if ( y === undefined) {
        var y = Math.floor(Math.random() * 3) + 3;
    }
    var body = generateCube(x,y, type);
    return edgeDetect(body,'sand');
}

var edgeDetect = function(body, type){
    for (var i = 0; i < body.length; i++) {
        for (var j = 0; j < body[i].length; j++) {
            if( type === 'sand') {
                if (body[i][j] === 15) {
                    body[i][j] = getSandNumber(getTileNeighbours(j, i, body));
                }
            } else if( type === 'fence') {
                if (body[i][j] !== 0) {
                    body[i][j] = getFenceNumber(getTileNeighbours(j, i, body));
                }
            }
        }
    }
    return body;
}

var getTileNeighbours = function(x, y, body) {
    var ret = ["N", "E", "S", "W"];
    var cross = ["NE", "SE", "SW", "NW"]
    if (x === 0) {
        ret[3] = false;
    } else {
        ret[3] = body[y][x - 1] !== 0;
    }
    if (y === 0) {
        ret[0] = false;
    } else {
        ret[0] = body[y - 1][x] !== 0;
    }
    if (x === body[0].length - 1) {
        ret[1] = false;
    } else {
        ret[1] = body[y][x + 1] !== 0;
    }

    if (y === body.length - 1) {
        ret[2] = false;
    } else {
        ret[2] = body[y + 1][x] !== 0 && body[y + 1][x] !== undefined;
    }

    if (ret.equals([true, true, true, true])) {
        cross[0] = body[y - 1][x + 1] !== 0;
        cross[1] = body[y + 1][x + 1] !== 0;
        cross[2] = body[y + 1][x - 1] !== 0;
        cross[3] = body[y - 1][x - 1] !== 0;
    }
    return {
        plus: ret,
        cross: cross
    };
}

var getSandNumber = function(neighbours){
    var plus = neighbours.plus;
    var cross = neighbours.cross;
    if(plus.equals([false, true, true, false])){
        return 11;
    }
    if(plus.equals([false, true, true, true])){
        return 12;
    }
    if(plus.equals([false, false, true, true])){
        return 13;
    }
    if(plus.equals([true, true, true, false])){
        return 14;
    }
    if(plus.equals([true, true, true, true])){
        if(!cross[0]){
            return 21;
        }
        if(!cross[1]){
            return 22;
        }
        if(!cross[2]){
            return 23;
        }
        if(!cross[3]){
            return 24;
        }
        return 15;
    }
    if(plus.equals([true, false, true, true])){
        return 16;
    }
    if(plus.equals([true, true, false, false])){
        return 17;
    }
    if(plus.equals([true, true, false, true])){
        return 18;
    }
    if(plus.equals([true, false, false, true])){
        return 19;
    }
    return 10;
}

var getFenceNumber = function(neighbours){
    var plus = neighbours.plus;
    var cross = neighbours.cross;
    if(plus.equals([false, true, true, false])){
        return 25;
    }
    if(plus.equals([false, true, true, true])){
        return 26;
    }
    if(plus.equals([false, false, true, true])){
        return 27;
    }
    if(plus.equals([true, true, true, false])){
        return 28;
    }
    if(plus.equals([true, true, true, true])){
        if(!cross[0]){
            return 33;
        }
        if(!cross[1]){
            return 34;
        }
        if(!cross[2]){
            return 35;
        }
        if(!cross[3]){
            return 36;
        }
        return 10;
    }
    if(plus.equals([true, false, true, true])){
        return 29;
    }
    if(plus.equals([true, true, false, false])){
        return 30;
    }
    if(plus.equals([true, true, false, true])){
        return 31;
    }
    if(plus.equals([true, false, false, true])){
        return 32;
    }
    return 10;
}

var addCoord = function(from, dir){
    var res = [];
    res.push(from[0] + dir[0]);
    res.push(from[1] + dir[1]);
    return res;
}

var generateCube = function(sizeX, sizeY, type){
    var body = [];
    for (var i = 0; i < sizeY; i++) {
        var row = [];
        for (var j = 0; j < sizeX; j++) {
            row.push(0);
        }
        body.push(row);
    }

    var amount = type === 'fence' ? 20 : 4
    for (var i = 0; i<amount; i++){
        var x = Math.floor(Math.random()*(sizeX-2));
        var y = Math.floor(Math.random()*(sizeY-2));
        body =addCube(x,y,body);
    }
    return body;
}

var addCube = function(x, y, body){
    if (Math.random() >= 0.5){
        body[y+2][x] = 15;
        body[y+2][x+1] = 15;
        body[y][x+2] = 15;
        body[y+1][x+2] = 15;
        body[y+2][x+2] = 15;
    }
    body[y][x] = 15;
    body[y+1][x] = 15;
    body[y][x+1] = 15;
    body[y+1][x+1] = 15;
    return body;
}

var adjacentBodyParts = function(x, y, body){
    var total = 4;
    if(x == 0 || x == body[0].length-1){
        total--;
    }
    if(y == 0 || y == body.length-1){
        total--;
    }
    return total;
}

var canAddBody = function(x, y, body){
    if(y+body.length > safari.sizeY || x+body[0].length > safari.sizeX){
        return false;
    }
    for(var i = 0; i<body.length; i++){
        for( var j = 0; j<body[i].length; j++){
            if( (i + y) <safari.sizeY && (j + x) < safari.sizeX) {
                if (body[i][j] !== 0) {
                    if (safari.grid[i + y][j + x] !== 0) {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }
    }
    return true;
}

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

var dropParticle = function(html, pos, target, time = 2, top, persistentParticle) {
    var p = $('<ptcl>').html(html).children().appendTo('body');
    p.css('position','absolute')
    p.offset(pos);
    if (!top) top = 'cubic-bezier(0.6, -0.3, 0.7, 0)';
    p[0].style.transition = 'left ' + time + 's linear, top ' + time + 's '+top;
    p.offset(target);
    if (!persistentParticle) {
    	setTimeout(function() {
        	p.fadeOut()
    	}, time * 1000 - 200);
    	setTimeout(function() {
        	p.remove()
    	}, time * 1000);
    }
    return p;
};