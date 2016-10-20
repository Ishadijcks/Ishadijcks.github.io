var curMine = {
	itemSelected: 0,
	grid: [],
	sizeX: 25,
	sizeY: 12,
	rewardGrid: []
}

var blockReward = {
	id: 1,
	space:	[[1,1,1], [1,1,1], [1,1,1], [1,1,1]]
}

var blockReward2 = {
	id: 2,
	space:	[[1,1,1,1,1], [1,1,1,1,1]]
}

var loadMine = function(){
	curMine.grid = [];
	for( var i = 0; i<curMine.sizeY; i++){
		var row = [];
		var rewardRow = [];
		for(var j = 0; j<curMine.sizeX; j++){
			row.push(Math.floor(Math.random()*5)+1);
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
		for( var j = 0; j<reward.space[0].length; j++){
			console.log(j + ", " + i);
			curMine.rewardGrid[i+y][j+x] = reward.space[i][j];
		}
	}
}

addReward(3, 3, blockReward)
addReward(12, 8, blockReward2)

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
		return "<div class='col-sm-1 mineReward mineSquare' data-i='" + i + "' data-j='" + j + "'></div>";
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
			console.log(normalizeX(x+i) + "," + normalizeY(y+j))
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