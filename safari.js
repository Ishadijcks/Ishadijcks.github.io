var safari = {
    grid: [],
    sizeX: 25,
    sizeY: 12,
    maxItems: 3,
    layersCleared: 0,
    totalItemsFound: 0,
    energy: 50,
    maxEnergy: 50,
}

var loadSafari = function(){
    safari.grid = [];
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
    addRandomBody(sandBody(), 'sand');
    addRandomBody(grassBody(), 'grass');
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
        x -= 3;
        y -= 3;
    }
    var res = canAddBody(x, y, body);
    if (res || type === 'grass') {
        addBody(x, y, body);
    }
}

var showSafari = function(){
    var html = "";

    html += "<div>";
    for(var i = 0; i<safari.grid.length; i++){
        html += "<div class='row'>";
        for(var j = 0; j<safari.grid[0].length; j++){
            html += safariSquare(safari.grid[i][j]);
        }
        html += "</div>";
    }

    $("#safariBody").html(html);
}

var safariSquare = function(id){
    return "<div style=background-image:url('images/safari/"+ id + ".png') class='col-sm-1 safariSquare'></div>";
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
    var grass = sandBody(7,7);
    return edgeDetect(grass, 'fence');
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


var sandBody = function(x, y) {
    if ( x === undefined) {
        var x = Math.floor(Math.random() * 3) + 3;
    }
    if ( y === undefined) {
        var y = Math.floor(Math.random() * 3) + 3;
    }
    var body = generateCube(x,y, 'sand');
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

    var amount = type === 'sand' ? 20 : 5
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
            if(body[i][j] !== 0){
                if(safari.grid[i+y][j+x] !== 0){
                    return false;
                }
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