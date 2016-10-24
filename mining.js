var mineItemList = [];

var addMineItem = function(name, id, space, value, valueType){
	var temp = {
		name: name,
		id: id,
		space: space,
		value: value || 1,
		valueType: valueType || "mine"
	}
	mineItemList.push(temp);
}

var curMine = {
	itemSelected: 1,
	grid: [],
	sizeX: 25,
	sizeY: 12,
	rewardGrid: [],
	itemsFound: 0,
	itemsBuried: 0,
	rewardNumbers: [],
	maxItems: 3,
	layersCleared: 0,
	totalItemsFound: 0
}

var toolName = ["chissel", "hammer"];

addMineItem("Helix Fossil", 1, [[0,1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1]]);
addMineItem("Dome Fossil", 2, [[2,2,2,2,2], [2,2,2,2,2], [2,2,2,2,2], [0,2,2,2,0]]);
addMineItem("Old Amber", 3, [[0,3,3,3], [3,3,3,3], [3,3,3,3], [3,3,3,0]]);
addMineItem("Root Fossil", 4, [[0,0,4,4,4], [0,0,4,4,4], [4,0,0,4,4], [4,4,4,4,4], [0,4,4,4,0]]);
addMineItem("Claw Fossil", 5, [[5,5,5,0,0], [5,5,5,5,0], [0,5,5,5,5], [0,0,0,5,5]]);
addMineItem("Armor Fossil", 6, [[0,6,6,6,0], [0,6,6,6,0], [6,6,6,6,6], [0,6,6,6,0]]);
addMineItem("Skull Fossil", 7, [[7,7,7,7], [7,7,7,7], [7,7,7,7], [0,7,7,0]]);
addMineItem("Rare Bone", 8, [[8,0,0,0,0,8], [8,8,8,8,8,8], [8,0,0,0,0,8]]);
addMineItem("Star Piece", 9, [[0,9,0,], [9,9,9], [0,9,0]]);
addMineItem("Revive", 10, [[0,10,0], [10,10,10,], [0,10,0]]);
addMineItem("Max Revive", 11, [[11,11,11], [11,11,11], [11,11,11]]);
addMineItem("Iron Ball", 12, [[12,12,12], [12,12,12], [12,12,12]]);
addMineItem("Heart Scale", 13, [[13,0], [13,13]]);
addMineItem("Light Clay", 14, [[14,0,14,0], [14,14,14,0], [14,14,14,14], [0,14,0,14]]);
addMineItem("Odd Keystone", 15, [[15,15,15,15], [15,15,15,15], [15,15,15,15], [15,15,15,15]]);
addMineItem("Hard Stone", 16, [[16,16],[16,16]]);
addMineItem("Fire Stone", 17, [[17,17,17], [17,17,17], [17,17,17]]);
addMineItem("Water Stone", 18, [[18,18,18], [18,18,18], [18,18,0]]);
addMineItem("Thunder Stone", 19, [[0,19,19], [19,19,19], [19,19,0]]);
addMineItem("Leaf Stone", 20, [[0,20,0], [20,20,20], [20,20,20], [0,20,0]]);

addMineItem("Moon Stone", 21, [[0,21,21,21], [21,21,21,0]]);
addMineItem("Sun Stone", 22, [[0,22,0,], [22,22,22], [22,22,22]]);
addMineItem("Oval Stone", 23, [[23,23,23], [23,23,23], [23,23,23]]);
addMineItem("Everstone", 24, [[24,24,24], [24,24,24]]);
addMineItem("Smooth Rock", 25, [[25,25,25], [25,25,25], [25,25,25]]);
addMineItem("Heat Rock", 26, [[26,26,26], [26,26,26]]);
addMineItem("Icy Rock", 27, [[27,27,27], [27,27,27], [27,27,27]]);
addMineItem("Damp Rock", 28, [[28,28,28], [28,28,28], [28,0,28]]);

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
//addMineItem("", , [[,,,,], [,,,,], [,,,,], [,,,,]]);

var loadMine = function(){
	curMine.grid = [];
	curMine.rewardGrid = [];
	curMine.itemsFound = 0;
	curMine.itemsBuried = 0;
	curMine.rewardNumbers = [];
	for( var i = 0; i<curMine.sizeY; i++){
		var row = [];
		var rewardRow = [];
		for(var j = 0; j<curMine.sizeX; j++){
			row.push(Math.min(5, Math.max(1, Math.floor(Math.random()*2+Math.random()*3)+1)));
			rewardRow.push(0);
		}
	curMine.grid.push(row);
	curMine.rewardGrid.push(rewardRow);
	}
	
	for( var i = 0; i<curMine.maxItems; i++){
		var x = getRandomCoord(curMine.sizeX);
		var y = getRandomCoord(curMine.sizeY);
		var item = getRandomMineItem();
		var res = canAddReward(x,y,item)
		if(res){
			addReward(x,y,item);
		}
	}
	showCurMine();
}

var gainMineItem = function(id){
	console.log(id);
	var index = alreadyHasMineItem(id);
	if( index == -1){	
		var item = mineItemList[id-1];
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

var showMineItems = function(){
	var html = "";
	html += "<table class='table'><tbody><tr>";
	if( isMineInventoryEmpty()){
		html += "<tr>";
		html += 	"<td>Your mine inventory is empty...</td>";
		html += "</tr>";
	} else {
		for( var i = 0; i<player.mineInventory.length; i++){
			if(player.mineInventory[i].amount > 0){
				html += "<tr>";
				html += 	"<td><img class='mineInventoryItem' src='images/mine/" + player.mineInventory[i].id + ".png'</td>";
				html += 	"<td>" + player.mineInventory[i].name + "</td>";
		 		html += 	"<td>" + player.mineInventory[i].amount + "</td>";
		 		var resourceName = getFullResourceName(player.mineInventory[i].valueType);
		 		if(player.mineInventory[i].value === 1){
		 			resourceName = resourceName.substring(0, resourceName.length - 1);
		 		}
				html += 	"<td><button title='" + player.mineInventory[i].value + " " + resourceName + "'class='btn btn-success tooltipRightMine' onClick='sellMineItem(" + player.mineInventory[i].id + ")'>Sell</button></td>";
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
		gainShards(valueType, value);
		console.log(valueType);
		console.log(value);
	}
}


var gainMineCoins = function(x){
	player.mineCoins += x;
}

var alreadyHasMineItem = function(id){
	var name = mineItemList[id-1].name;
	for( var i = 0; i<player.mineInventory.length; i++){
		if(player.mineInventory[i].name === name){
			return i;
		}
	}
	return -1;
}

var getRandomMineItem = function(){
	var index = Math.floor(Math.random()*(mineItemList.length-1)+1);
	return mineItemList[index] || mineItemList[0];
}

var getRandomCoord = function(max){
	return Math.floor(Math.random()*(max-3)) + 1;
}

var addReward = function(x, y, reward){
	for(var i = 0; i<reward.space.length; i++){
		for( var j = 0; j<reward.space[i].length; j++){
			if(reward.space[i][j] !== 0){
				curMine.rewardGrid[i+y][j+x] = {
					x: j,
					y: i,
					value: reward.space[i][j],
					revealed: 0
				};
			}
		}
	}
	curMine.itemsBuried++;
	curMine.rewardNumbers.push(reward.id);
}


var canAddReward = function(x, y, reward){
	if(y+reward.space.length >= curMine.sizeY || x+reward.space[0].length >= curMine.sizeX){
		return false;
	}
	for(var i = 0; i<reward.space.length; i++){
		for( var j = 0; j<reward.space[i].length; j++){
			if(reward.space[i][j] !== 0){
				if(curMine.rewardGrid[i+y][j+x] !== 0){
					return false;
				}
			}
		}
	}
	return true;
}

// addReward(3, 3, mineItemList[19]);
// addReward(8, 5, mineItemList[24]);
// addReward(10, 1, mineItemList[40]);
// addReward(20, 6, mineItemList[1]);

var checkItemsRevealed = function(){
	for(var i = 0; i<curMine.rewardNumbers.length; i++){
		if(checkItemRevealed(curMine.rewardNumbers[i])){
			gainMineItem(curMine.rewardNumbers[i]);
			curMine.itemsFound++;
			curMine.rewardNumbers.splice(i,1);
			i--;
			$.notify("You dug an item", "success");
			curMine.totalItemsFound++;
			checkMineCompleted();
		}
	}
}

var checkMineCompleted = function(){
	if(curMine.itemsFound >= curMine.itemsBuried){
		setTimeout(mineCompleted, 2000);
	}
}

var mineCompleted = function(){
	$.notify("You dig deeper...", "");
	curMine.layersCleared++;
	loadMine();
}

var checkItemRevealed = function(number){
	for(var i = 0; i<curMine.sizeX; i++){
		for(var j = 0; j<curMine.sizeY; j++){
			// console.log(i + "," + j);
			if(curMine.rewardGrid[j][i] != 0){
				if(curMine.rewardGrid[j][i].value == number){
					if(curMine.rewardGrid[j][i].revealed === 0){
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
	for(var i = 0; i<curMine.grid.length; i++){
		html += "<div class='row'>";
		for(var j = 0; j<curMine.grid[0].length; j++){
			html += mineSquare(curMine.grid[i][j], i, j);
		}
		html += "</div>";
	}

	html += "<div class='row'>";
	html += 	"<button onClick='setItemSelected(1)' class='btn btn-succes'>Hammer</button>";
	html += 	"<button onClick='setItemSelected(0)' class='btn btn-succes'>Chisel</button>";	
	html += "</div>";

	html += "<div class='row'>";
	html += curMine.itemsFound + "/" + curMine.itemsBuried;
	html += "</div>";
	$("#mineBody").html(html);
	$("#diamondCounter").html(player.mineCoins);
}

var setItemSelected = function(x){
	curMine.itemSelected = x;
	showCurMine();
}

var mineSquare = function(amount, i, j){
	if(curMine.rewardGrid[i][j] != 0 && curMine.grid[i][j] === 0){
		curMine.rewardGrid[i][j].revealed = 1;
		return "<img src='images/mine/"+ curMine.rewardGrid[i][j].value + "/" + curMine.rewardGrid[i][j].value + "-" + curMine.rewardGrid[i][j].y + "-" + curMine.rewardGrid[i][j].x + ".png' class='col-sm-1 mineReward mineSquare "+ toolName[curMine.itemSelected] + "Selected' data-i='" + i + "' data-j='" + j + "'>";
	} else {
		return "<div class='col-sm-1 rock" + Math.max(amount,0) + " mineSquare "+ toolName[curMine.itemSelected] + "Selected' data-i='" + i + "' data-j='" + j + "'></div>";
	}
}

var squareClicked = function(i, j){
	i = parseInt(i);
	j = parseInt(j);
	if(curMine.itemSelected){
		hammer(i,j);
	} else {
		chisel(i,j);
	}
	showCurMine();
	checkItemsRevealed();
	showCurMine();
}

var hammer = function(x,y){
	if(x < 0 || y < 0){
		return;
	}
	for(var i = -1; i < 2; i++){
		for(var j = -1; j < 2; j++){
			curMine.grid[normalizeY(x+i)][normalizeX(y+j)] = Math.max(0, curMine.grid[normalizeY(x+i)][normalizeX(y+j)]-1);
		}
	}
}

var chisel = function(x,y){
	curMine.grid[normalizeY(x)][normalizeX(y)] = Math.max(0, curMine.grid[normalizeY(x)][normalizeX(y)]-2);
}

var normalizeX = function(x){
	return Math.min(curMine.sizeX-1, Math.max(0, x));
}

var normalizeY = function(y){
	return Math.min(curMine.sizeY-1, Math.max(0, y));
}


loadMine();