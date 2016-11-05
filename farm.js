var berryList = [];

var farm = {
    plotList: [],
    points: 0,
    berryInventory: []
}

var Plot = {
    unlocked: 0,
    exp: 0,
    level: 1,
    boosted: 0,
    berry: 0,
    timeLeft: 0
}

var initPlots = function(){
    for( var i = 0; i<25; i++){
        farm.plotList.push(new Plot);
    }
}

var farmTick = function(){
    for(var i = 0; i<25; i++){
        farm.plotList[i].timeLeft = Math.max(0, farm.plotList[i].timeLeft-1);
    }
}

var harvest = function(id){

}

var gainBerryRewards = function(berryId){

}

var addBerry = function(name, image, value, expValue){
    var temp = {
        name: name,
        image: image,
        value: value,
        expValue: expValue
    }
    berryList.push(temp);
}