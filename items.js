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
{id:6, name:"X Attack", price:25000, use:"attackBoost", unUse:null, time:30, type:"combat", instant:0, magnitude: 2},
{id:7, name:"X Click", price:25000, use:"clickBoost", unUse:null, time:30, type:"combat", instant:0, magnitude: 10},
];

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


var gainRandomItem = function(route){
	if(route <= 25){
		var possibleItems = itemsPerRoute[route];
		var rand = Math.floor(Math.random()*possibleItems.length);
		var randomItemName = possibleItems[rand];
	} else {
		var rand = Math.floor(Math.random()*itemList.length);
		var randomItemName = itemList[rand].name;
	}
	var randomItem = getItemByName(randomItemName).id;
	if (alreadyHaveItem(randomItemName)==true){
		var itemNum = findItemInInventory(randomItemName);
		player.inventoryList[itemNum].quantity++;
	}
	else{
		var item = itemList[randomItem-1];
		var itemObject = {id:item.id, name:item.name, quantity:1, type:item.type, use:item.use, unUse:item.unUse, time:item.time, timeleft:0, instant:item.instant, magnitude:item.magnitude, inUse:0};
		player.inventoryList.push(itemObject);
	}

	$.notify("You got a "+randomItemName, 'success');
	
	updateItems()
}

var gainItemByName = function(name){
	if (alreadyHaveItem(name)==true){
		var itemNum = findItemInInventory(name);
		player.inventoryList[itemNum].quantity++;
	}
	else{
		var item = getItemByName(name);
		var itemObject = {id:item.id, name:item.name, quantity:1, type:item.type, use:item.use, unUse:item.unUse, time:item.time, timeleft:0, instant:item.instant, magnitude:item.magnitude, inUse:0};
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
			else if(i==player.inventoryList.length-1){
				return false;
			}
		}
	}
}

var findItemInInventory = function(name){
	for(var i = 0; i<player.inventoryList.length; i++){
		if(player.inventoryList[i].name == name){
			return i;
		}
		else if(i==player.inventoryList.length-1){
			return false;
		}
	}
}

var isInventoryEmpty = function(){
	if (player.inventoryList.length == 0){
		return true;
	}
	else {
		for (var i = 0; i<player.inventoryList.length; i++){
			if (player.inventoryList[i].quantity != 0){
				return false;
			}
			else if(i == player.inventoryList.length-1){
				return true;
			}
		}
	}
}

var useItem = function(id){
	if(player.inventoryList[id].use == null){
		itemModalHtml = "";
		itemModalHtml += "<div class='row'><p class='oakText'>This item has no effect and cannot be used.</p>";
		$("#itemModalBody").html(itemModalHtml);
		$("#itemModal").modal('show');
		return false;
	}
	else if(player.inventoryList[id].quantity<=0){
		itemModalHtml = "";
		itemModalHtml += "<div class='row'><p class='oakText'>You don't have any of this item.</p>";
		$("#itemModalBody").html(itemModalitemModalHtml);
		$("#itemModal").modal('show');
		return false;
	}
	else if(player.inventoryList[id].inUse==1){
		itemModalHtml = "";
		itemModalHtml += "<div class='row'><p class='oakText'>You are already using this item.</p>";
		$("#itemModalBody").html(itemModalHtml);
		$("#itemModal").modal('show');
		return false;
	}
	else if(player.inventoryList[id].instant == 0){
		itemChoiceModalResult = 0;
		itemChoiceModalHtml = "";
		itemChoiceModalHtml += "<div class='row'><p class='oakText'>Would you like to use a(n) "+player.inventoryList[id].name+"?</p></div>";
		itemChoiceModalHtml += "<br><div class='row' align='center'><button id='itemModalClose' type='button' onclick='itemChoiceModalButton(1,"+id+")'>Yes</button>   <button id='itemModalClose' type='button' onclick='itemChoiceModalButton(0,"+id+")'>No</button></div>"
		$("#itemChoiceModalBody").html(itemChoiceModalHtml);
		$("#itemChoiceModal").modal('show');
	}
	else {
		// instant item effects
	}
}

var itemInterval = function(){
	for (var i = 0; i<player.inventoryList.length; i++){
		if (player.inventoryList[i].inUse == 1){
			if (player.inventoryList[i].timeLeft != 0){
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

var itemChoiceModalButton = function(result, id){
	item = player.inventoryList[id]
	$('#itemChoiceModal').modal('hide');
	if(result == 1){
		item.timeLeft = item.time;
		item.inUse = 1;
		item.quantity--;
		$.notify("You used a(n) "+item.name+".", "succes")
		return true;
	}
	else{
		return false;
	}
	updateAll();
}
