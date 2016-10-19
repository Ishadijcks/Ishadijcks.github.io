var curMine = [];

var loadMine = function(){
	curMine = [];
	for( var i = 0; i<12; i++){
		var row = [];
		for(var j = 0; j<12; j++){
			row.push(0);
		}
	curMine.push(row);
	}
}



var showCurMine = function(){
	loadMine();
	var html = "";
	for(var i = 0; i<curMine.length; i++){
		html += "<div class='row'>";
		for(var j = 0; j<curMine[0].length; j++){
			html += mineSquare(curMine[i][j]);
		}
		html += "</div>";
	}
	$("#mineBody").html(html);
}

var mineSquare = function(i){
	return "<div class='col-sm-1 mineSquare'>" + i + "</div>";
}