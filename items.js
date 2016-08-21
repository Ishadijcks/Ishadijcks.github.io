/* var Item = function(name,price,image,type,effect,time){

	var temp = {
		name: name,
		price: price,
		image: image,
		type: type,
		effect: effect,
		time: time,
		active: 0
	}
	return temp;
} */

// var xAttack = Item("X Attack", 500, "images/items/xattack.png", "attackBoost", 10, 180);
// var xDefense = Item("X Defense", 500, "images/items/xdefense.png", "defenseBoost", 10, 180);
var itemList = [
{id:1, name:"Cheri Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:2, name:"Chesto Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:3, name:"Pecha Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:4, name:"Rawst Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:5, name:"Aspear Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:6, name:"X Attack", price:25000, use:"attackBoost", unUse:null, time:60, type:"combat", instant:0, magnitude: 2, flavorText: "Double your Pokemons attack for 60 seconds!"},
{id:7, name:"X Click", price:25000, use:"clickBoost", unUse:null, time:60, type:"combat", instant:0, magnitude: 2, flavorText: "Double your click attack for 60 seconds!"},
{id:8, name:"Lucky Incense", price:25000, use:"coinBoost", unUse:null, time:60, type:"combat", instant:0, magnitude: 2, flavorText: "Double the money you earn for 60 seconds!"},
{id:9, name:"Item Magnet", price:25000, use:"itemBoost", unUse:null, time:60, type:"combat", instant:0, magnitude: 2, flavorText: "Double your chance of getting items for 60 seconds!"},
{id:10, name:"X Exp", price:25000, use:"expBoost", unUse:null, time:60, type:"combat", instant:0, magnitude: 2, flavorText: "Double the exp you earn for 60 seconds!"},
{id:11, name:"Token Collector", price:25000, use:"tokenBoost", unUse:null, time:60, type:"combat", instant:0, magnitude: 2, flavorText: "Double the dungeon tokens you earn for 60 seconds!"},


var itemsPerRoute = {
	1: ["X Attack", "X Click"],
	2: ["X Attack", "X Click"],
	3: ["X Attack", "X Click"],
	4: ["X Attack", "X Click"],
	5: ["X Attack", "X Click"],
	6: ["X Attack", "X Click"],
	7: ["X Attack", "X Click"],
	8: ["X Attack", "X Click"],
	9: ["X Attack", "X Click"],
	10: ["X Attack", "X Click"],
	11: ["X Attack", "X Click"],
	12: ["X Attack", "X Click"],
	13: ["X Attack", "X Click"],
	14: ["X Attack", "X Click"],
	15: ["X Attack", "X Click"],
	16: ["X Attack", "X Click"],
	17: ["X Attack", "X Click"],
	18: ["X Attack", "X Click"],
	19: ["X Attack", "X Click"],
	20: ["X Attack", "X Click"],
	21: ["X Attack", "X Click"],
	22: ["X Attack", "X Click"],
	23: ["X Attack", "X Click"],
	24: ["X Attack", "X Click"],
	25: ["X Attack", "X Click"],
}

var getItemChance = function(route){
	return 1+route/10;
}


var gainRandomItem = function(route){
	var randomItemName;
	if(route <= 25){
		var possibleItems = itemsPerRoute[route];
		var rand = Math.floor(Math.random()*possibleItems.length);
		randomItemName = possibleItems[rand];
	} else {
		var rand = Math.floor(Math.random()*itemList.length);
		randomItemName = itemList[rand].name;
	}
	gainItemByName(randomItemName);

	$.notify("You got a "+randomItemName, 'success');
	
	updateItems()
}

var gainItemByName = function(name){
	console.log(name);
	if (alreadyHaveItem(name)){
		var itemNum = findItemInInventory(name);
		player.inventoryList[itemNum].quantity++;
	}
	else{
		var item = getItemByName(name);
		var itemObject = {id:item.id, name:item.name, quantity:1, type:item.type, use:item.use, unUse:item.unUse, time:item.time, timeLeft:0, instant:item.instant, magnitude:item.magnitude, inUse:0};
		player.inventoryList.push(itemObject);
	}

	$.notify("You got a "+name, 'success');

	updateItems()
}

var getItemByName = function(name){
	for( var i = 0; i<itemList.length; i++){
		if(itemList[i].name == name){
			return itemList[i];
		}
	}
}

var getItemById = function(id){
	for( var i = 0; i<player.inventoryList.length; i++){
		if(player.inventoryList[i].id == id){
			return i;
		}
	}
}

var alreadyHaveItem = function(name){
	if(isInventoryEmpty() == true){
		return false;
	}
	else { 
		for (var i = 0; i<player.inventoryList.length; i++){
			if(player.inventoryList[i] == undefined){
				return false;
			}
			else if(player.inventoryList[i].name == name){
				return true;
			}
		}
		return false;
	}
}

var findItemInInventory = function(name){
	for(var i = 0; i<player.inventoryList.length; i++){
		if(player.inventoryList[i].name == name){
			return i;
		}
	}
	return false;
}

var isInventoryEmpty = function(){
	if (player.inventoryList.length == 0){
		return true;
	}
	else {
		for (var i = 0; i<player.inventoryList.length; i++){
			if (player.inventoryList[i].quantity != 0 || player.inventoryList[i].time > 0 ){
				return false;
			}
		}
		return true
	}
}


var itemInterval = function(){
	for (var i = 0; i<player.inventoryList.length; i++){
		if (player.inventoryList[i].inUse == 1){
			if (player.inventoryList[i].timeLeft > 0){
				player.inventoryList[i].timeLeft--;
			}
			else{
				player.inventoryList[i].inUse = 0;
				$.notify("The effects of your "+player.inventoryList[i].name+" ran out.", "succes")
			}
			updateItems();
			updateStats();
		}
	}
}

var activateItem = function(id){
	item = player.inventoryList[getItemById(id)];

	// Item with a timer.
	if(!isNaN(item.time)){
		if(item.quantity > 0){
			item.timeLeft = item.time;
			item.inUse = 1;
			item.quantity--;
			$.notify(""+item.name+" activated", "succes")
			updateItems();
			updateStats();
			return true;
		}
	}

}
