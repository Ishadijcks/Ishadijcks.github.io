var mineItemList = [];
var loadingNewMine = false;
var addDailyDeal = function(item1, amount1, item2, amount2){
    var temp = {
        item1: item1,
        amount1: amount1,
        item2: item2,
        amount2: amount2
    }
    player.curMine.dailyDeals.push(temp);
}

var seededRand = function(seed) {
	return (seed*9301 + 49297) % 233280;
}

var generateDailyDeals = function(){
    player.curMine.dailyDeals = [];
    var d = new Date();

    var dateSeed = Number(d.getYear()*d.getDate() + 1000*d.getMonth() + 100000*d.getDate());
    var seed = seededRand(dateSeed);

    for (var i=0; i<player.curMine.maxDailyDeals; i++) {
    	seed = generateDailyDeal(seed);
    }
}

var reverseDailyDealExists = function(item1, item2){
	for (var i=0; i<player.curMine.dailyDeals.length; i++) {
		if (player.curMine.dailyDeals[i].item2.name == item1.name) {
			if (player.curMine.dailyDeals[i].item1.name == item2.name) {
				return true;
			}else {
				return reverseDailyDealExists(player.curMine.dailyDeals[i].item1, item2);
			}
		}
	}
	return false
}

var generateDailyDeal = function(seed){
	var s = seed;

    var x1 = s/233280;
    var item1 = mineItemList[Math.floor(mineItemList.length*x1)];
    s = seededRand(s);

    var x2 = s/233280
    var amount1 = Math.floor(3 * x2) + 1;
    s = seededRand(s);

    var x3 = s/233280;
    var item2 = mineItemList[Math.floor(mineItemList.length*x3)];
    s = seededRand(s);

    var x4 = s/233280;
    var amount2 = Math.floor(3 * x4) + 1;
    s = seededRand(s);
    
    if(item1.name !== item2.name && !reverseDailyDealExists(item1,item2) && !mineItemIsStone(item1.name)) {
        addDailyDeal(item1, amount1, item2, amount2);
    }

    return s;
}

var canUseDailyDeal = function(id){
    var deal = player.curMine.dailyDeals[id];
    var index = alreadyHasMineItem(deal.item1.id);
    if(index === -1){
        return false;
    }
    return player.mineInventory[index].amount >= deal.amount1
}

var useDailyDeal = function(id){
    var deal = player.curMine.dailyDeals[id];
    var index = alreadyHasMineItem(deal.item1.id);
    if(player.mineInventory[index].amount >= deal.amount1){
        player.mineInventory[index].amount -= deal.amount1;
        for( var i = 0; i<deal.amount2; i++){
            gainMineItem(deal.item2.id);
        }
    }
    showDailyDeals();
}


var gainMineEnergy = function(){
    var multiplier = 1;
    if(isActive("Cell Battery")){
        multiplier = getOakItemBonus("Cell Battery");
    }
	player.curMine.energy = Math.min(player.curMine.maxEnergy, player.curMine.energy+ (multiplier*player.curMine.energyGain));
	if(player.curMine.energy === player.curMine.maxEnergy){
		$.notify("Your mining energy has reached maximum capacity!", "success");
		notifyMe("You mining energy has reached maximum capacity!");
	}
}

var addMineItem = function(name, id, space, value, valueType){
	var temp = {
		name: name,
		id: id,
		space: space,
		value: typeof(value) === 'undefined' ? 1 : value,
		valueType: typeof(valueType) === 'undefined' ? "mine" : valueType
	}
	mineItemList.push(temp);
}

var updateMineEnergy = function(){
	if(player.curMine.energy < player.curMine.maxEnergy){
		player.curMine.energyTick--;
		if(player.curMine.energyTick <= 0){
			player.curMine.energyTick = player.curMine.energyRegen;
			gainMineEnergy();
		}
		$("#energyDisplay").html(Math.floor(player.curMine.energy) + "/" + player.curMine.maxEnergy + " <img src='images/mine/flash.png'> (next: " + player.curMine.energyTick + "s)");
		$("#mineEnergyBar").width( player.curMine.energy/player.curMine.maxEnergy*100 + "%");
	}
}

var energyInterval = setInterval(updateMineEnergy, 1000);
var toolName = ["chissel", "hammer"];

addMineItem("Helix Fossil", 1, [[0,1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1]], 0);
addMineItem("Dome Fossil", 2, [[2,2,2,2,2], [2,2,2,2,2], [2,2,2,2,2], [0,2,2,2,0]], 0);
addMineItem("Old Amber", 3, [[0,3,3,3], [3,3,3,3], [3,3,3,3], [3,3,3,0]], 0);
// addMineItem("Root Fossil", 4, [[0,0,4,4,4], [0,0,4,4,4], [4,0,0,4,4], [4,4,4,4,4], [0,4,4,4,0]], 3);
// addMineItem("Claw Fossil", 5, [[5,5,5,0,0], [5,5,5,5,0], [0,5,5,5,5], [0,0,0,5,5]], 3);
// addMineItem("Armor Fossil", 6, [[0,6,6,6,0], [0,6,6,6,0], [6,6,6,6,6], [0,6,6,6,0]], 3);
// addMineItem("Skull Fossil", 7, [[7,7,7,7], [7,7,7,7], [7,7,7,7], [0,7,7,0]], 3);
addMineItem("Rare Bone", 8, [[8,0,0,0,0,8], [8,8,8,8,8,8], [8,0,0,0,0,8]], 3);
addMineItem("Star Piece", 9, [[0,9,0,], [9,9,9], [0,9,0]], 5);
addMineItem("Revive", 10, [[0,10,0], [10,10,10,], [0,10,0]], 2);
addMineItem("Max Revive", 11, [[11,11,11], [11,11,11], [11,11,11]], 4);
addMineItem("Iron Ball", 12, [[12,12,12], [12,12,12], [12,12,12]], 2);
addMineItem("Heart Scale", 13, [[13,0], [13,13]], 10);
addMineItem("Light Clay", 14, [[14,0,14,0], [14,14,14,0], [14,14,14,14], [0,14,0,14]], 2);
addMineItem("Odd Keystone", 15, [[15,15,15,15], [15,15,15,15], [15,15,15,15], [15,15,15,15]], 6);
addMineItem("Hard Stone", 16, [[16,16],[16,16]], 4);

addMineItem("Fire Stone", 17, [[17,17,17], [17,17,17], [17,17,17]]);
addMineItem("Water Stone", 18, [[18,18,18], [18,18,18], [18,18,0]]);
addMineItem("Thunder Stone", 19, [[0,19,19], [19,19,19], [19,19,0]]);
addMineItem("Leaf Stone", 20, [[0,20,0], [20,20,20], [20,20,20], [0,20,0]]);

addMineItem("Moon Stone", 21, [[0,21,21,21], [21,21,21,0]], 4);
addMineItem("Sun Stone", 22, [[0,22,0,], [22,22,22], [22,22,22]], 4);
addMineItem("Oval Stone", 23, [[23,23,23], [23,23,23], [23,23,23]], 3);
addMineItem("Everstone", 24, [[24,24,24], [24,24,24]], 3);
addMineItem("Smooth Rock", 25, [[25,25,25], [25,25,25], [25,25,25]], 2);
addMineItem("Heat Rock", 26, [[26,26,26], [26,26,26]], 2);
addMineItem("Icy Rock", 27, [[27,27,27], [27,27,27], [27,27,27]], 2);
addMineItem("Damp Rock", 28, [[28,28,28], [28,28,28], [28,0,28]], 2);

addMineItem("Draco Plate", 29, [[29,29,29,29], [29,29,29,29], [29,29,29,29]], 25, "dragon");
addMineItem("Dread Plate", 30, [[30,30,30,30], [30,30,30,30], [30,30,30,30]], 25, "dark");
addMineItem("Earth Plate", 31, [[31,31,31,31], [31,31,31,31], [31,31,31,31]], 25, "ground");
addMineItem("Fist Plate", 32, [[32,32,32,32], [32,32,32,32], [32,32,32,32]], 25, "fighting");
addMineItem("Flame Plate", 33, [[33,33,33,33], [33,33,33,33], [33,33,33,33]], 25, "fire");
addMineItem("Icicle Plate", 34, [[34,34,34,34], [34,34,34,34], [34,34,34,34]], 25, "ice");
addMineItem("Insect Plate", 35, [[35,35,35,35], [35,35,35,35], [35,35,35,35]], 25, "bug");
addMineItem("Iron Plate", 36, [[36,36,36,36], [36,36,36,36], [36,36,36,36]], 25, "steel");
addMineItem("Meadow Plate", 37, [[37,37,37,37], [37,37,37,37], [37,37,37,37]], 25, "grass");
addMineItem("Mind Plate", 38, [[38,38,38,38], [38,38,38,38], [38,38,38,38]], 25, "psychic");
addMineItem("Sky Plate", 39, [[39,39,39,39], [39,39,39,39], [39,39,39,39]], 25, "flying");
addMineItem("Splash Plate", 40, [[40,40,40,40], [40,40,40,40], [40,40,40,40]], 25, "water");
addMineItem("Spooky Plate", 41, [[41,41,41,41], [41,41,41,41], [41,41,41,41]], 25, "ghost");
addMineItem("Stone Plate", 42, [[42,42,42,42], [42,42,42,42], [42,42,42,42]], 25, "rock");
addMineItem("Toxic Plate", 43, [[43,43,43,43], [43,43,43,43], [43,43,43,43]], 25, "poison");
addMineItem("Zap Plate", 44, [[44,44,44,44], [44,44,44,44], [44,44,44,44]], 25, "electric");
addMineItem("Pixie Plate", 45, [[45,45,45,45], [45,45,45,45], [45,45,45,45]], 25, "fairy");

//addMineItem("", , [[,,,,], [,,,,], [,,,,], [,,,,]]);

var loadMine = function(){
	player.curMine.grid = [];
	player.curMine.rewardGrid = [];
	player.curMine.itemsFound = 0;
	player.curMine.itemsBuried = 0;
	player.curMine.rewardNumbers = [];
	for( var i = 0; i<player.curMine.sizeY; i++){
		var row = [];
		var rewardRow = [];
		for(var j = 0; j<player.curMine.sizeX; j++){
			row.push(Math.min(5, Math.max(1, Math.floor(Math.random()*2+Math.random()*3)+1)));
			rewardRow.push(0);
		}
	player.curMine.grid.push(row);
	player.curMine.rewardGrid.push(rewardRow);
	}
	
	for( var i = 0; i<player.curMine.maxItems; i++){
		var x = getRandomCoord(player.curMine.sizeX);
		var y = getRandomCoord(player.curMine.sizeY);
		var item = getRandomMineItem();
		var res = canAddReward(x,y,item)
		if(res){
			addReward(x,y,item);
		}
	}
	showCurMine();
	loadingNewMine = false;
}

var gainMineItem = function(id){
	var index = alreadyHasMineItem(id);
	var item = getMineItemById(id);
	if(mineItemIsStone(item.name)){
		gainItemByName(item.name);
		return;
	}
	if( index == -1){	

		var tempItem = {
			name: item.name,
			amount: 1,
			id: id,
			value: item.value,
			valueType: item.valueType
		}
		player.mineInventory.push(tempItem);
	} else {
		player.mineInventory[index].amount++;
	}
}

var mineItemIsStone = function(itemName){
	return	itemName == "Fire Stone" ||
			itemName == "Water Stone" ||
			itemName == "Thunder Stone" ||
			itemName == "Leaf Stone" ||
            itemName == "Moon Stone";
}

var showMineItems = function(){
	var html = "";
	html += "<table class='table'><tbody><tr>";
	if( isMineInventoryEmpty()){
		html += "<tr class='vertical-midle'>";
		html += 	"<td>Your mine inventory is empty...</td>";
		html += "</tr>";
	} else {
		for( var i = 0; i<player.mineInventory.length; i++){
			if(player.mineInventory[i].amount > 0){
				html += "<tr>";
				html += 	"<td class='vertical-midle'><img class='mineInventoryItem' src='images/mine/" + player.mineInventory[i].id + ".png'>(" + player.mineInventory[i].amount + ")</td>";
		 		html += 	"<td class='vertical-midle'>" + player.mineInventory[i].name + "</td>";
		 		var resourceName = getFullResourceName(player.mineInventory[i].valueType);
		 		if(player.mineInventory[i].value === 1){
		 			resourceName = resourceName.substring(0, resourceName.length - 1);
		 		}
		 		if(isMineEgg(player.mineInventory[i].name)){
		 			html += "<td></td>";
                    html += "<td class='vertical-midle'><button title='You can breed this item, I wonder what will happen...' class='btn btn-success tooltipRightMine' onClick='gainMineEgg(" + player.mineInventory[i].id + ")'>Breed</button></td>";
                } else {
                	html += "<td class='vertical-midle'>" + player.mineInventory[i].value + " " + resourceName + "</td>";
                    html += "<td class='vertical-midle'><button class='btn btn-success tooltipRightMine' onClick='sellMineItem(" + player.mineInventory[i].id + ")'>Sell</button></td>";
                }
                html += "</tr>";
			}
		}
	}

	html +="</tbody></table>";
	$("#treasuresBody").html(html);
	$("#diamondCounter").html(player.mineCoins);

	$(".tooltipRightMine").tooltipster({
		position: "right"
	});
}

var showDailyDeals = function(){
    var html = "";
    html += "<table class='table'><tbody>";
    for( var i = 0; i<player.curMine.dailyDeals.length; i++){
        var amountOwned = 0;
        if(alreadyHasMineItem(player.curMine.dailyDeals[i].item1.id) != -1) {
            amountOwned = player.mineInventory[alreadyHasMineItem(player.curMine.dailyDeals[i].item1.id)].amount;
        }
        html += "<tr>";
        html += 	"<td class='vertical-midle'><img class='mineInventoryItem' src='images/mine/" + player.curMine.dailyDeals[i].item1.id + ".png'>(" + amountOwned + ")</td>";
        html += 	"<td class='vertical-midle'>" + player.curMine.dailyDeals[i].item1.name + "</td>";
        html += 	"<td class='vertical-midle'>" + player.curMine.dailyDeals[i].amount1 + "</td>";
        html += 	"<td class='vertical-midle'><img src='images/mine/rightArrow.png'></td>";
        html += 	"<td class='vertical-midle'>" + player.curMine.dailyDeals[i].amount2 + "</td>";
        html += 	"<td class='vertical-midle'>" + player.curMine.dailyDeals[i].item2.name + "</td>";
        html += 	"<td class='vertical-midle'><img class='mineInventoryItem' src='images/mine/" + player.curMine.dailyDeals[i].item2.id + ".png'</td>";
        if(canUseDailyDeal(i)){
            html += 	"<td class='vertical-midle'><button class='btn btn-info' onClick='useDailyDeal(" + i + ")'>Trade</button></td>";
        } else {
            html += 	"<td class='vertical-midle'><button class='btn btn-info disabled'>Trade</button></td>";
        }
        html += "</tr>";
    }


    html +="</tbody></table>";
    $("#dailyDealsBody").html(html);

}

var isMineEgg = function(itemName){
	return itemName === "Dome Fossil" ||
			itemName === "Helix Fossil" ||
			itemName === "Old Amber"
}

var showMineUpgrades = function(){
	var html = "";
    html += "<table class='table'><tbody>";
	html += "<tr>";
	html += "<td class='vertical-midle'>Max energy: " + player.curMine.maxEnergy + "</td>";
    html += "<td class='vertical-midle' style='width:50%'>(+10)</td>";
	if (player.curMine.maxEnergyUpgrades < 10){
		html += "<td class='vertical-midle'>" + getMaxEnergyUpgradeCost() + " diamonds</td>"
		html += "<td class='vertical-midle'><button class='tooltipMineUpgrade btn btn-success' onclick='upgradeMaxEnergy()'>Upgrade</button></td>";
	} else {
		html += "<td></td>";
		html += "<td class='vertical-midle'><button class='disabled btn btn-success'>Max</button></td>";
	}
	html += "</tr>";


	html += "<tr>";
	html += "<td class='vertical-midle'>Max items: " + player.curMine.maxItems + "</td>";
    html += "<td class='vertical-midle'>(+1)</td>";
	if (player.curMine.maxItems < 7){
		html += "<td class='vertical-midle'>" + getMaxItemUpgradeCost() + " diamonds</td>"
		html += "<td class='vertical-midle'><button class='tooltipMineUpgrade btn btn-success' onclick='upgradeMaxItems()'>Upgrade</button></td>";
	} else {
		html += "<td></td>";
		html += "<td class='vertical-midle'><button class='disabled  btn btn-success'>Max</button></td>";
	}
	html += "</tr>";

	html += "<tr>";
	html += "<td class='vertical-midle'>Energy regen time: " + player.curMine.energyRegen + "</td> ";
    html += "<td class='vertical-midle'>(-1)</td>";
	if (player.curMine.energyRegenUpgrades < 20){
		html += "<td class='vertical-midle'>" + getEnergyRegenUpgradeCost() + " diamonds</td>"
		html += "<td class='vertical-midle'><button class='tooltipMineUpgrade btn btn-success' onclick='upgradeEnergyRegen()'>Upgrade</button></td>";
	} else {
		html += "<td></td>";
		html += "<td class='vertical-midle'><button class='disabled btn btn-success'>Max</button></td>";
	}
	html += "</tr>";

	html += "<tr>";
	html += "<td class='vertical-midle'>Energy gain: " + player.curMine.energyGain + "</td>";
    html += "<td class='vertical-midle'>(+1)</td>";
	if (player.curMine.energyGainUpgrades < 17){
		html += "<td class='vertical-midle'>" + getEnergyGainUpgradeCost() + " diamonds</td>"
		html += "<td class='vertical-midle'><button class='tooltipMineUpgrade btn btn-success' onclick='upgradeEnergyGain()'>Upgrade</button></td>";
	} else {
		html += "<td></td>";
		html += "<td class='vertical-midle'><button class='disabled btn btn-success'>Max</button></td>";
	}
	html += "</tr>";

	html += "<tr>";
	html += "<td class='vertical-midle'>Max Daily Deals: " + player.curMine.maxDailyDeals + "</td>";
    html += "<td class='vertical-midle'>(+1)</td>";
	if (player.curMine.maxDailyDealUpgrades < 2){
		html += "<td class='vertical-midle'>" + getMaxDailyDealUpgradeCost() + " diamonds</td>"
		html += "<td class='vertical-midle'><button class='tooltipMineUpgrade btn btn-success' onclick='upgradeMaxDailyDeals()'>Upgrade</button></td>";
	} else {
		html += "<td></td>";
		html += "<td class='vertical-midle'><button class='disabled btn btn-success'>Max</button></td>";
	}
	html += "</tr>";

	$("#upgradesBody").html(html);
	$("#diamondCounter").html(player.mineCoins);

	$(".tooltipMineUpgrade").tooltipster({
		position: "right"
	});
}

var getMaxEnergyUpgradeCost = function(){
	return 50 * (player.curMine.maxEnergyUpgrades+1);
}

var upgradeMaxEnergy = function(){
	if(player.mineCoins >= getMaxEnergyUpgradeCost()){
		player.mineCoins -= getMaxEnergyUpgradeCost();
		player.curMine.maxEnergyUpgrades += 1;
		player.curMine.maxEnergy += 10;
	} else {
		$.notify("You don't have enough diamonds");
	}
	showMineUpgrades();
}

var getMaxDailyDealUpgradeCost = function(){
	return 150 * (player.curMine.maxDailyDealUpgrades + 1);
}

var upgradeMaxDailyDeals = function(){
	if (player.mineCoins >= getMaxDailyDealUpgradeCost()){
		player.mineCoins -= getMaxDailyDealUpgradeCost();
		player.curMine.maxDailyDealUpgrades += 1;
		player.curMine.maxDailyDeals += 1;
		generateDailyDeals();
	} else {
		$.notify("You don't have enough diamonds")
	}
	showMineUpgrades();
}

var getMaxItemUpgradeCost = function(){
	return 200 * (player.curMine.maxItemsUpgrades + 1);
}

var upgradeMaxItems = function(){
	if(player.mineCoins >= getMaxItemUpgradeCost()){
		player.mineCoins -= getMaxItemUpgradeCost();
		player.curMine.maxItemsUpgrades += 1;
		player.curMine.maxItems += 1;
	} else {
		$.notify("You don't have enough diamonds");
	}
	showMineUpgrades();
}


var getEnergyRegenUpgradeCost = function(){
	return 10 * (player.curMine.energyRegenUpgrades + 1);
}

var upgradeEnergyRegen = function(){
	if(player.mineCoins >= getEnergyRegenUpgradeCost()){
		player.mineCoins -= getEnergyRegenUpgradeCost();
		player.curMine.energyRegenUpgrades += 1;
		player.curMine.energyRegen -= 1;
	} else {
		$.notify("You don't have enough diamonds");
	}
	showMineUpgrades();
}

var getEnergyGainUpgradeCost = function(){
	return 100 * (player.curMine.energyGainUpgrades + 1);
}

var upgradeEnergyGain = function(){
	if(player.mineCoins >= getEnergyGainUpgradeCost()){
		player.mineCoins -= getEnergyGainUpgradeCost();
		player.curMine.energyGainUpgrades += 1;
		player.curMine.energyGain += 1;
	} else {
		$.notify("You don't have enough diamonds");
	}
	showMineUpgrades();
}


var isMineInventoryEmpty = function(){
	for( var i = 0; i<player.mineInventory.length; i++){
		if(player.mineInventory[i].amount > 0){
			return false;
		}
	}
	return true;
}

var sellMineItem = function(id){
	for( var i = 0; i< player.mineInventory.length; i++){
		if(player.mineInventory[i].id === id){
			if(player.mineInventory[i].amount > 0){
				player.mineInventory[i].amount--;
				gainMainItemProfit(player.mineInventory[i].value, player.mineInventory[i].valueType);
			}
		}
	}
	showMineItems();
}

var gainMainItemProfit = function(value, valueType){
	if( valueType === "money"){
		player.money += value;
	} else if( valueType === "mine"){
		gainMineCoins(value);
	} else{
		gainShards([valueType], value);
	}
}


var gainMineCoins = function(x){
	player.mineCoins += x;
	player.totalMineCoins += x;
}

var alreadyHasMineItem = function(id){
	var name = getMineItemById(id).name;
	for( var i = 0; i<player.mineInventory.length; i++){
		if(player.mineInventory[i].name === name){
			return i;
		}
	}
	return -1;
}

var getRandomMineItem = function(){
	var index = Math.floor(Math.random()*(mineItemList.length));
	return mineItemList[index] || mineItemList[0];
}

var getRandomCoord = function(max){
	return Math.floor(Math.random()*(max-3)) + 1;
}

var addReward = function(x, y, reward){
	for(var i = 0; i<reward.space.length; i++){
		for( var j = 0; j<reward.space[i].length; j++){
			if(reward.space[i][j] !== 0){
				player.curMine.rewardGrid[i+y][j+x] = {
					x: j,
					y: i,
					value: reward.space[i][j],
					revealed: 0
				};
			}
		}
	}
	player.curMine.itemsBuried++;
	player.curMine.rewardNumbers.push(reward.id);
}


var canAddReward = function(x, y, reward){
    if(alreadyHasRewardId(reward.id)){
        return false;
    }
	if(y+reward.space.length >= player.curMine.sizeY || x+reward.space[0].length >= player.curMine.sizeX){
		return false;
	}
	for(var i = 0; i<reward.space.length; i++){
		for( var j = 0; j<reward.space[i].length; j++){
			if(reward.space[i][j] !== 0){
				if(player.curMine.rewardGrid[i+y][j+x] !== 0){
					return false;
				}
			}
		}
	}
	return true;
}

var alreadyHasRewardId = function(id){
    for(var i = 0; i<player.curMine.rewardGrid.length; i++){
        for(var j = 0; j<player.curMine.rewardGrid[0].length; j++){
            if(player.curMine.rewardGrid[i][j].value === id){
                return true;
            }
        }
    }
    return false;
}

// addReward(3, 3, mineItemList[19]);
// addReward(8, 5, mineItemList[24]);
// addReward(10, 1, mineItemList[40]);
// addReward(20, 6, mineItemList[1]);

var checkItemsRevealed = function(){
	for(var i = 0; i<player.curMine.rewardNumbers.length; i++){
		if(checkItemRevealed(player.curMine.rewardNumbers[i])){
			gainMineItem(player.curMine.rewardNumbers[i]);
			player.curMine.itemsFound++;
			player.curMine.rewardNumbers.splice(i,1);
			i--;
			$.notify("You dug an item", "success");
			player.curMine.totalItemsFound++;
		}
	}
	checkMineCompleted();
}

var checkMineCompleted = function(){

	if(player.curMine.itemsFound >= player.curMine.itemsBuried && !loadingNewMine){
		setTimeout(mineCompleted, 1500);
		loadingNewMine = true;
	}
}

var mineCompleted = function(){
	$.notify("You dig deeper...", "");
	player.curMine.layersCleared++;
	loadMine();
}

var getMineItemById = function(id){
	for( var i = 0; i<mineItemList.length; i++){
		if(mineItemList[i].id === id){
			return mineItemList[i];
		}
	}
}

var checkItemRevealed = function(number){
	for(var i = 0; i<player.curMine.sizeX; i++){
		for(var j = 0; j<player.curMine.sizeY; j++){
			// console.log(i + "," + j);
			if(player.curMine.rewardGrid[j][i] != 0){
				if(player.curMine.rewardGrid[j][i].value == number){
					if(player.curMine.rewardGrid[j][i].revealed === 0){
						return false
					}
				}
			}
		}
	}
	return true;
}

var showCurMine = function(){
	var html = "";

	html += "</div>";
	for(var i = 0; i<player.curMine.grid.length; i++){
		html += "<div class='row'>";
		for(var j = 0; j<player.curMine.grid[0].length; j++){
			html += mineSquare(player.curMine.grid[i][j], i, j);
		}
		html += "</div>";
	}

	html += "<div class='row'>";
	html += 	"<button onClick='setItemSelected(1)' class='btn btn-danger'>Hammer (" + player.curMine.hammerEnergy + " energy)</button>";
    html += 	"<button onClick='setItemSelected(0)' class='btn btn-info'>Chisel (" + player.curMine.chisselEnergy + " energy)</button>";
    html +=     "<h3>" + player.curMine.itemsFound + "/" + player.curMine.itemsBuried + " items found </h3>";
    html += "</div>";
	$("#mineBody").html(html);
	$("#energyDisplay").html(Math.floor(player.curMine.energy) + "/" + player.curMine.maxEnergy + " <img src='images/mine/flash.png'> (next: " + player.curMine.energyTick + "s)");
	$("#mineEnergyBar").width( player.curMine.energy/player.curMine.maxEnergy*100 + "%");
	$("#diamondCounter").html(player.mineCoins);
}

var setItemSelected = function(x){
	player.curMine.itemSelected = x;
	showCurMine();
}

var mineSquare = function(amount, i, j){
	if(player.curMine.rewardGrid[i][j] != 0 && player.curMine.grid[i][j] === 0){
		player.curMine.rewardGrid[i][j].revealed = 1;
		return "<img src='images/mine/"+ player.curMine.rewardGrid[i][j].value + "/" + player.curMine.rewardGrid[i][j].value + "-" + player.curMine.rewardGrid[i][j].y + "-" + player.curMine.rewardGrid[i][j].x + ".png' class='col-sm-1 mineReward mineSquare "+ toolName[player.curMine.itemSelected] + "Selected' data-i='" + i + "' data-j='" + j + "'>";
	} else {
		return "<div class='col-sm-1 rock" + Math.max(amount,0) + " mineSquare "+ toolName[player.curMine.itemSelected] + "Selected' data-i='" + i + "' data-j='" + j + "'></div>";
	}
}

var squareClicked = function(i, j){
	i = parseInt(i);
	j = parseInt(j);
	if(player.curMine.itemSelected){
		hammer(i,j);
	} else {
		chisel(i,j);
	}
	showCurMine();
	checkItemsRevealed();
	showCurMine();
}

var hammer = function(x,y){
	if(player.curMine.energy >= player.curMine.hammerEnergy){
		if(x < 0 || y < 0){
			return;
		}
		var hasMined = false;
		for(var i = -1; i < 2; i++){
			for(var j = -1; j < 2; j++){
				if(player.curMine.grid[normalizeY(x+i)][normalizeX(y+j)] > 0){
					hasMined = true;
				}
				player.curMine.grid[normalizeY(x+i)][normalizeX(y+j)] = Math.max(0, player.curMine.grid[normalizeY(x+i)][normalizeX(y+j)]-1);
			}
		}
		if(hasMined) {
			player.curMine.energy -= player.curMine.hammerEnergy
		}
	}
}

var chisel = function(x,y){
	if(player.curMine.grid[x][y] > 0) {
		if (player.curMine.energy >= player.curMine.chisselEnergy) {
			player.curMine.grid[normalizeY(x)][normalizeX(y)] = Math.max(0, player.curMine.grid[normalizeY(x)][normalizeX(y)] - 2);
			player.curMine.energy -= player.curMine.chisselEnergy;
		}
	}
}

var normalizeX = function(x){
	return Math.min(player.curMine.sizeX-1, Math.max(0, x));
}

var normalizeY = function(y){
	return Math.min(player.curMine.sizeY-1, Math.max(0, y));
}


loadMine();