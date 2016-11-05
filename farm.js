var berryList = [];
var farmInterval;

var farm = {
    plotList: [],
    points: 0,
    berryInventory: [],
}

var Plot = function(){
    this.unlocked = 0;
    this.exp = 0;
    this.level = 1;
    this.boosted = 0;
    this.berry = null;
    this.timeLeft = 0;
}

var initPlots = function(){
    for( var i = 0; i<25; i++){
        farm.plotList.push(new Plot());
    }
}

initPlots();

var farmTick = function(){
    for(var i = 0; i<25; i++){
        farm.plotList[i].timeLeft = Math.max(0, farm.plotList[i].timeLeft-1);
    }
}

farmInterval = setInterval(farmTick, 1000);

var showFarm = function(){
    var html = "tetst";



    $("#farmBody").html(html);
}

var plant = function(plotId, berryName){
    var berry;
    if(farm.plotList[plotId].berry === null) {
        if (berry = getBerryById(berryName)) {
            farm.plotList[plotId].berry = berry;
            farm.plotList[plotId].timeLeft = berry.harvestTime;
        }
    } else {
        console.log("Full");
    }
}

var harvest = function(plotId){

    if(farm.plotList[plotId].berry !== null && farm.plotList[plotId].timeLeft <= 0) {
        farm.plotList[plotId].exp += farm.plotList[plotId].berry.expValue;
        gainBerryRewards(farm.plotList[plotId].berry);
        farm.plotList[plotId].berry = null;
    } else {
        console.log("Not ready");
    }
}

var gainBerryRewards = function(berry){
    gainFarmPoints(berry.value)
}

var getBerryById = function(berryName){
    for(var i = 0; i<berryList.length; i++){
        if(berryList[i].name === berryName){
            return berryList[i];
        }
    }
    return 0;
}

var gainFarmPoints = function(x){
    farm.points += x;
}

var addBerry = function(name, image, harvestTime, value, expValue){
    var temp = {
        name: name,
        image: image,
        harvestTime: harvestTime,
        value: value,
        expValue: expValue
    }
    berryList.push(temp);
}

addBerry("Test Berry", null, 10, 3, 3);