var ShopItem = function(name, cost, costType) {
    var temp = {
        name: name,
        cost: cost,
        costType: costType
    }
    return temp;
}

var fireStone = ShopItem("Fire Stone", 3000, 'fire');


var buyShopItem = function(item){
	if(enoughResources(item.cost, item.costType)){
		payShopItem(item.cost, item.costType);
		gainItemByName(item.name)
	} else {
		var string = "You don't have enough " + item.costType;
		if(item.costType !== "money" || item.costType !== "dungeon tokenm"){
			string += " shards";
		}
		$.notify(string);
	}
}

var enoughResources = function(cost, costType){
	if(costType === "money"){
		return player.money >= cost;
	}
	if(costType === "dungeon token"){
		return player.dungeonTokens >= cost;
	}
	if(numberToType.indexOf(costType) !== -1){
		return player.typeShards[typeToNumber(costType)] >= cost;
	} else {
		console.log("Incorrect costType");
		return false;
	}
}

var payShopItem = function(cost, costType){
	if(costType === "money"){
		player.money -= cost;
	}
	else if(costType === "dungeon token"){
		player.dungeonTokens -= cost;
	} else {
		player.typeShards[typeToNumber(costType)] -= cost;
	}
}
