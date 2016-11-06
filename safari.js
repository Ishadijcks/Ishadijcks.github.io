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
    for( var i = 0; i<safari.sizeY; i++){
        var row = [];
        for(var j = 0; j<safari.sizeX; j++){
            row.push(0);
        }
        safari.grid.push(row);
    }
    for( var i = 0; i<1; i++) {
        var x = getRandomCoord(safari.sizeX - 1);
        var y = getRandomCoord(safari.sizeY - 1);
        var item = i % 1 !== 0 ? waterBody() : sandBody();
        var res = canAddBody(x, y, item);
        if (res) {
            addBody(x, y, item);
        } else {
            console.log("(" + x + ", " + y + ")");
        }
    }
    showSafari();
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
                safari.grid[i+y][j+x] = body[i][j];
            }
        }
    }
}

var waterBody = function() {
    var x = Math.floor(Math.random() * 4) + 2;
    var y = Math.floor(Math.random() * 4) + 2;
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

var sandBody = function() {
    var x = Math.floor(Math.random() * 3) + 3;
    var y = Math.floor(Math.random() * 3) + 3;
    var body = [];

    // Fill it with blanks
    for (var i = 0; i < y; i++) {
        var row = [];
        for (var j = 0; j < x; j++) {
            row.push(15);
        }
        body.push(row);
    }

    // Roughen the eddges
    for (var i = 0; i < y; i++) {
        for (var j = 0; j < x; j++) {
            var adj = adjacentBodyParts(j,i,body);
            if(adj < 4) {
                var random = Math.floor(Math.random() * 100) + 1;
                if (15 * adj < random) {
                    // console.log("(" + j + ", " + i + ")");
                    // console.log(adj);
                    body[i][j] = 10;
                }
            }
        }
    }

    // Shift downwards
    // body.push(Array.apply(null, Array(x)).map(Number.prototype.valueOf,0))
    // for (var i = 0; i < y; i++) {
    //     for (var j = 0; j < x; j++) {
    //         if( i > 0){
    //             // console.log(body[i][j])
    //             if(body[i][j] !== 15 ){
    //                 body[i][j] = body[i-1][j];
    //                 console.log("updated");
    //             }
    //         }
    //     }
    //     // body[i].push(0);
    // }
    //
    // // Shift to the right
    // for (var i = 0; i < y; i++) {
    //     for (var j = 0; j < x; j++) {
    //         if( j > 0){
    //             if(body[i][j] !== 15 ){
    //                 body[i][j] = body[i][j-1];
    //                 console.log("updated2");
    //             }
    //         }
    //     }
    //     body[i].push(body[i][j-1]);
    //     console.log(body[i][j-1]);
    // }


    return body;
}

var dilate = function(body){
    for (var i=0; i<body.length; i++){
        for (var j=0; j<body[i].length; j++){
            if (body[i][j] == 10){
                if (i>0 && body[i-1][j]==0) body[i-1][j] = 2;
                if (j>0 && body[i][j-1]==0) body[i][j-1] = 2;
                if (i+1<body.length && body[i+1][j]==0) body[i+1][j] = 2;
                if (j+1<body[i].length && body[i][j+1]==0) body[i][j+1] = 2;
            }
        }
    }
    for (var i=0; i<body.length; i++){
        for (var j=0; j<body[i].length; j++){
            if (body[i][j] == 2){
                body[i][j] = 10;
            }
        }
    }
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
                    console.log(i+y);
                    console.log(j+x);
                    return false;
                }
            }
        }
    }
    return true;
}
