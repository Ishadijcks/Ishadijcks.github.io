var graph = {
  "nodes":[
    // {"name":"Je girl","gender":2},
    // {"name":"Andere girl","gender":2},
    // {"name":"Je boy","gender":1},
    // {"name":"Sloerie","gender":2},
    // {"name":"G-ice","gender":1}

  ],
  "links":[
    // {"source":1,"target":0,"value":2},
    // {"source":2,"target":0,"value":2},
    // {"source":3,"target":0,"value":2},
    // {"source":3,"target":2,"value":2},
  
  
  ]
};


// Takes a name and returns the id of the node.
var lookupByName = function(name){
    var list = graph["nodes"];
    for( var i = 0; i< list.length; i++){
        if(name == list[i].name){
            return i;
        }
    }
    return -1;
}

// Takes an id and returns the name of the node.
var lookupById = function(id){
    var list = graph["nodes"];
    return list[id].name;
}

var linkExists = function(name1, name2){
    var list = graph["links"]
    for(var i = 0; i<list.length; i++){
       
        if (list[i].source.name == name1 && list[i].target.name == name2){
            return true;
        }
        if (list[i].source.name == name2 && list[i].target.name == name1){
            return true;
        }
    }
    return false;
}

var getLinkId = function(name1, name2){
    var list = graph["links"]
    for(var i = 0; i<list.length; i++){
       
        if (list[i].source.name == name1 && list[i].target.name == name2){
            return i;
        }
        if (list[i].source.name == name2 && list[i].target.name == name1){
            return i;
        }
    }
    return -1;
}

var newNode = function(name, gender){
    if(lookupByName(name) == -1){
        addNode(name, gender);
    }
    else {
        console.log("Name already exists");
    }

}

var addNode = function(name, gender){
    if(gender == "male") {
        gender = 1;
    }
    else {
        gender = 2;
    }
    graph["nodes"].push({"name": name, "gender": gender});

}

var newLink = function(name1, gender1, name2, gender2){
    newNode(name1, gender1);
    newNode(name2, gender2);
    console.log(linkExists(name1,name2));
    if(!linkExists(name1,name2)){
        addLink(name1,name2);
    }
}

var addLink = function(name1, name2){
    var id1 = lookupByName(name1);
    var id2 = lookupByName(name2);
    graph["links"].push({"source":id1, "target":id2, "value": 2})
        
    createGraph(graph);
}

var countRoddels = function(name){
    var list = graph["links"]
    var sum = 0;
    for(var i = 0; i<list.length; i++){
        if (list[i].source.name == name || list[i].target.name == name){
            sum++;
        }
    }
    return sum;
}

// Massive bug in this one, needs to be called twice. Too lazy to fix it.
var removeLoners = function(){
    var list = graph["nodes"]
    console.log("Length: " + list.length)
    console.log(list[5]);
    for (var i = 0; i < list.length; i++){
        console.log(" " + list[i].name + ": " + countRoddels(list[i].name))
        

        if (countRoddels(list[i].name) == 0){
            removeNode(list[i].name)
        }
    }
    createGraph(graph);
}

var removeNode = function(name){
    var index = lookupByName(name);
    var roddelCount = countRoddels(name);

    var res = "J";
    if (roddelCount != 0) {
       res = prompt("Je probeert een persoon te verwijderen die nog roddels heeft. Wil je deze persoon en al zijn/haar roddels verwijderen? [J/N]"); 
    }
    if(res.toUpperCase() == "J"){
        if (index > -1) {
            console.log("Removing: "+name);
            graph["nodes"].splice(index, 1);
        }
    }
    createGraph(graph);
}

var removeLink = function(name1, name2){
    var index = getLinkId(name1, name2);
    console.log(index);
    if (index > -1) {
        graph["links"].splice(index, 1);
        console.log(graph["links"]);
    }
    // console.log("Roddels");
    // console.log(countRoddels(name1));
    // console.log(countRoddels(name2));

    // I have to call this one twice, no clue why, they both have 0 roddels, so once should be enough.
    removeLoners();
    removeLoners();
    createGraph(graph);
}