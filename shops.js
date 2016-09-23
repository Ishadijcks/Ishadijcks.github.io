var shopItemList = [];

var ShopItem = function(id, name, cost, costType) {
    var temp = {
    	id: id,
        name: name,
        cost: cost,
        costType: costType
    }
    shopItemList.push(temp);
    return temp;
}

var getShopItemByName = function(name){
	for(var i = 0; i<shopItemList.length; i++){
		if(shopItemList[i].name === name){
			return shopItemList[i];	
		}
	}
	return 0;
}

var Shop = function(name, itemList, shopChange){
	var temp = {
		name: name,
		itemList: itemList,
		shopChange: shopChange || 1
	}
	return temp;
}

var fireStone = ShopItem(13, "Fire Stone", 3000, 'fire');
var waterStone = ShopItem(15, "Water Stone", 3000, 'water');
var leafStone = ShopItem(14, "Leaf Stone", 3000, 'grass');
var thunderStone = ShopItem(12, "Thunder Stone", 3000, 'water');
var xAttack = ShopItem(6, "X Attack", 3000, 'money');
var xClick = ShopItem(7, "X Click", 3000, 'money');

var decreaseShopPriceDeviation = function(){
	player.shopPriceDeviation = Math.max(1, player.shopPriceDeviation-0.01);
	console.log(player.shopPriceDeviation);
}

var buyShopItem = function(itemName){
	var item;
	console.log(itemName);
	if(item = getShopItemByName(itemName)){
		if(enoughResources(item.cost*player.shopPriceDeviation, item.costType)){
		
			payShopItem(item.cost*player.shopPriceDeviation, item.costType);
			player.shopPriceDeviation = Math.floor(player.shopPriceDeviation * 1.05 * 100)/100;
			console.log(player.shopPriceDeviation);
			gainItemByName(item.name)
			console.log(curShop);
			loadShop(curShop.name);
			updateStats();
		} else {
			var string = "You don't have enough " + item.costType;
			if(item.costType !== "money" && item.costType !== "dungeon tokens"){
				string += " shards";
			}
			$.notify(string);
		}
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
		console.log(costType);
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

var ViridianCityShop = function(){ return Shop("Viridian City", [xAttack]); }
var PewterCityShop = function(){ return Shop("Pewter City", [xClick]); }

	var curShop;

var loadShop = function(shopName){

	if(curShop = getShop(shopName)){
		showShop(curShop);
	}
}

var showShop = function(shop){
	var items = shop.itemList;
	hideAllViews();
	var html = "";
	console.log(shop);
	html += "<h3 class='townName'>" + shop.name + " Shop</h3>"
	html += "<div class='row'>";
	for(var i = 0; i<items.length; i++){
		console.log(items[i]);
		html += "<div data-itemName='" + items[i].name + "' class='col-sm-3 col-md-2 pokedexEntry shopItem'>";
		html += "<br><img class='center-block' src=images/items/" + items[i].id + ".png >" + items[i].name + "<br><br>";
		html += "<p style='margin-top:15px'>" + (items[i].cost*player.shopPriceDeviation).toFixed(2) + "<br>";
		html += getFullResourceName(items[i].costType) + "</p>";
		html += "</div>";
	}

	html += "</div>";
	$("#shopView").html(html);
	$(".tooltipShopItem").tooltipster({
			position: "bottom",
			delay:10
	});

	$("#shopView").show();
}

var getShop = function(townName){
	for(var i = 0; i<townList.length; i++){
		if(townList[i].name === townName){
			return townList[i].shop;
		}
	}
	return -1;
}

var getFullResourceName = function(type){
	if(type === "money"){
		return "coins";
	}
	if(type === "dungeon token"){
		return "tokens";
	}
	return type + " shards";
}