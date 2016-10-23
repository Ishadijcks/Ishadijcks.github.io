var mineItemList = [];

var addMineItem = function(name, id, space){
	var temp = {
		name: name,
		id: id,
		space: space
	}
	mineItemList.push(temp);
}

var curMine = {
	itemSelected: 1,
	grid: [],
	sizeX: 25,
	sizeY: 12,
	rewardGrid: []
}

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

addMineItem("Draco Plate", 29, [[29,29,29,29], [29,29,29,29], [29,29,29,29]]);
addMineItem("Dread Plate", 30, [[30,30,30,30], [30,30,30,30], [30,30,30,30]]);
addMineItem("Earth Plate", 31, [[31,31,31,31], [31,31,31,31], [31,31,31,31]]);
addMineItem("Fist Plate", 32, [[32,32,32,32], [32,32,32,32], [32,32,32,32]]);
addMineItem("Flame Plate", 33, [[33,33,33,33], [33,33,33,33], [33,33,33,33]]);
addMineItem("Icicle Plate", 34, [[34,34,34,34], [34,34,34,34], [34,34,34,34]]);
addMineItem("Insect Plate", 35, [[35,35,35,35], [35,35,35,35], [35,35,35,35]]);
addMineItem("Iron Plate", 36, [[36,36,36,36], [36,36,36,36], [36,36,36,36]]);
addMineItem("Meadow Plate", 37, [[37,37,37,37], [37,37,37,37], [37,37,37,37]]);
addMineItem("Mind Plate", 38, [[38,38,38,38], [38,38,38,38], [38,38,38,38]]);
addMineItem("Sky Plate", 39, [[39,39,39,39], [39,39,39,39], [39,39,39,39]]);
addMineItem("Splash Plate", 40, [[40,40,40,40], [40,40,40,40], [40,40,40,40]]);
addMineItem("Spooky Plate", 41, [[41,41,41,41], [41,41,41,41], [41,41,41,41]]);
addMineItem("Stone Plate", 42, [[42,42,42,42], [42,42,42,42], [42,42,42,42]]);
addMineItem("Toxic Plate", 43, [[43,43,43,43], [43,43,43,43], [43,43,43,43]]);
addMineItem("Zap Plate", 44, [[44,44,44,44], [44,44,44,44], [44,44,44,44]]);
//addMineItem("", , [[,,,,], [,,,,], [,,,,], [,,,,]]);

var loadMine = function(){
	curMine.grid = [];
	for( var i = 0; i<curMine.sizeY; i++){
		var row = [];
		var rewardRow = [];
		for(var j = 0; j<curMine.sizeX; j++){
			row.push(Math.floor(Math.random()*1)+0);
			rewardRow.push(0);
		}
	curMine.grid.push(row);
	curMine.rewardGrid.push(rewardRow);
	}
}

loadMine();

var addReward = function(x, y, reward){
	console.log(reward);
	for(var i = 0; i<reward.space.length; i++){
		for( var j = 0; j<reward.space[i].length; j++){
			console.log(j + ", " + i);
			if(reward.space[i][j] !== 0){
				curMine.rewardGrid[i+y][j+x] = {
					x: j,
					y: i,
					value: reward.space[i][j]
				};
			}
		}
	}
}

addReward(3, 3, mineItemList[29]);


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
	html += "</row>";
	$("#mineBody").html(html);
}

var setItemSelected = function(x){
	curMine.itemSelected = x;
}

var mineSquare = function(amount, i, j){

	if(curMine.rewardGrid[i][j] != 0 && curMine.grid[i][j] === 0){
		return "<img src='images/mine/"+ curMine.rewardGrid[i][j].value + "/" + curMine.rewardGrid[i][j].value + "-" + curMine.rewardGrid[i][j].y + "-" + curMine.rewardGrid[i][j].x + ".png' class='col-sm-1 mineReward mineSquare' data-i='" + i + "' data-j='" + j + "'>";
	} else {
		return "<div class='col-sm-1 rock" + Math.max(amount,0) + " mineSquare' data-i='" + i + "' data-j='" + j + "'></div>";
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
	showCurMine();
}

var chisel = function(x,y){
	curMine.grid[normalizeY(x)][normalizeX(y)] = Math.max(0, curMine.grid[normalizeY(x)][normalizeX(y)]-2);
	showCurMine();
}

var normalizeX = function(x){
	return Math.min(curMine.sizeX-1, Math.max(0, x));
}

var normalizeY = function(y){
	return Math.min(curMine.sizeY-1, Math.max(0, y));
}