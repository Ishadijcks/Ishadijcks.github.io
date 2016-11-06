var berryList = [];
var farmInterval;
var curBerry = "Aguav";

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
        if(farm.plotList[i].berry !== null){
            farm.plotList[i].berry.stage = getStage(farm.plotList[i].timeLeft, farm.plotList[i].berry.harvestTime);
        }
    }
    // showFarm();
    updateFarm();
}

var getStage = function(timeLeft, maxTime){
    return 5 - Math.ceil(5*timeLeft/maxTime);
}

farmInterval = setInterval(farmTick, 1000);

var plantAll = function(){
    for(var i = 0; i<farm.plotList.length; i++){
        plant(i, curBerry);
    }
}

var harvestAll = function(){
    for(var i = 0; i<farm.plotList.length; i++){
        harvest(i);
    }
}

var updateFarm = function(){
    for (var i = 0; i<farm.plotList.length; i++){
        if(farm.plotList[i].berry !== null){
            var time = farm.plotList[i].timeLeft === 0 ? "Ready" : farm.plotList[i].timeLeft.toString().toHHMMSS();
            $("#farmPlot"+i).attr({src: getPlantImageName(farm.plotList[i].berry.name, farm.plotList[i].berry.stage)});
            $("#farmPlot"+i).tooltipster('content', farm.plotList[i].berry.name + " Tree<br>" + time);
        } else {
            $("#farmPlot"+i).attr({src: 'images/farm/soil.png' });
        }
    }

}
var showFarm = function(){
    var html = "<div class='row'>";
    for (var i = 0; i<farm.plotList.length; i++){
        if(farm.plotList[i].berry !== null){
            var time = farm.plotList[i].timeLeft === 0 ? "Ready" : farm.plotList[i].timeLeft.toString().toHHMMSS();
            var description =farm.plotList[i].berry.name + " Tree<br>" + time;
            html += "<img src='" + getPlantImageName(farm.plotList[i].berry.name, farm.plotList[i].berry.stage) + "' id='farmPlot" + i + "' class='farmPlot' title='" + description + "' onClick='harvest(" + i + ")'></img>";
        } else {
            html += "<img src='images/farm/soil.png' class='farmPlot' id='farmPlot" + i + "' onClick='plant(" + i + ")'></img>";
        }
    }
    html += "</div>";

    html += "<div class='row'>";
    for (var i = 0; i<berryList.length; i++){
        if(berryList[i].name === curBerry){
            html += "<img src='images/farm/berries/" + berryList[i].name + ".png' class='berrySlot selectedBerry' onClick=selectBerry('" + berryList[i].name + "')></img>";
        } else {
            html += "<img src='images/farm/berries/" + berryList[i].name + ".png' class='berrySlot' onClick=selectBerry('" + berryList[i].name + "')></img>";
        }

    }
    html += "</div>";

    html += "<div class='row'><button class='btn btn-success' onClick='plantAll()'>Plant all</button><button class='btn btn-info' onClick='harvestAll()'>Harvest all</button></div>"
    $("#farmBody").html(html);

    $(".farmPlot").tooltipster({
        position: "top",
        delay: 0,
        contentAsHTML: true
    });
}

var plant = function(plotId, berryName){
    if(berryName === undefined){
        berryName = curBerry;
    }
    var berry;
    if(farm.plotList[plotId].berry === null) {
        if (berry = getBerryByName(berryName)) {
            farm.plotList[plotId].berry = berry;
            farm.plotList[plotId].timeLeft = berry.harvestTime;
        }
    } else {
        console.log("Full");
    }
    showFarm();
}

var selectBerry = function(berryId){
    curBerry = getBerryByName(berryId).name;
    showFarm();
}

var plantName = ["Seed","Seed", "Sprout", "Taller", "Bloom", "Berry"];

var getPlantImageName = function(berryName, stage){
    if(stage <= 2){
        return "images/farm/AllTree" + plantName[stage] + "III.png";
    } else {
        return "images/farm/" + berryName + "Tree" + plantName[stage] + "III.png";
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
    showFarm();
}

var gainBerryRewards = function(berry){
    gainFarmPoints(berry.value)
}

var getBerryByName = function(berryName){
    for(var i = 0; i<berryList.length; i++){
        if(berryList[i].name === berryName){
            var temp = {
                name: berryList[i].name,
                harvestTime: berryList[i].harvestTime,
                stage: 1,
                value: berryList[i].value,
                expValue: berryList[i].expValue
            }
            return temp;
        }
    }
    return 0;
}

var gainFarmPoints = function(x){
    farm.points += x;
}

var addBerry = function(name, harvestTime, value, expValue){
    var temp = {
        name: name,
        harvestTime: harvestTime,
        stage: 1,
        value: value,
        expValue: expValue
    }
    berryList.push(temp);
}

addBerry("Aguav", 100, 3, 3);
addBerry("Apicot", 50, 3, 3);
addBerry("Aspear", 20, 3, 3);
addBerry("Belue", 10, 3, 3);
addBerry("Bluk", 10, 3, 3);

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}