// SETTINGS

// Image modification
var TEAM1COLOR = "#F73434";
var TEAM2COLOR = "#4949F2";
var IMAGEWIDTH = 180;
var IMAGEHEIGHT = 280;
var BORDERWIDTH = 30;
var LOGOTOP = 60;
var LOGORIGHT = 80;

var players = 10;





var curCard = 1;

var listeners = [""];
var canvasses = [""];
var ctxs = [""];

var addListeners = function(amount){
	for( var i = 1; i<=amount; i++){
		var tempLoader = document.getElementById('imageLoader'+i);
		tempLoader.addEventListener('change', handleImage, false);
		listeners.push(tempLoader);
		var canvas = document.getElementById('imageCanvas'+i);
		canvasses.push(canvas);
		var ctx = canvas.getContext('2d');
		ctxs.push(ctx);
	}
}

function handleImage(e){
console.log(curCard);
console.log(e);
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvasses[curCard].width = IMAGEWIDTH;
            canvasses[curCard].height = IMAGEHEIGHT;
						
			ctxs[curCard].drawImage(img, 0, 0, IMAGEWIDTH+1, IMAGEHEIGHT+1); // resizes image to 300px wide, 200px high
			
			// Draw inner black border
			ctxs[curCard].rect(0, 0, IMAGEWIDTH, IMAGEHEIGHT);
			ctxs[curCard].lineWidth = 1;
			ctxs[curCard].strokeStyle = "black";
			ctxs[curCard].stroke();
			
			// Draw teamcolor border
			ctxs[curCard].rect(0, 0, IMAGEWIDTH, IMAGEHEIGHT);
			ctxs[curCard].lineWidth = BORDERWIDTH;
			ctxs[curCard].strokeStyle = TEAM1COLOR;
			ctxs[curCard].stroke();
			
			// Draw outer black border
			ctxs[curCard].rect(0, 0, IMAGEWIDTH+BORDERWIDTH, IMAGEHEIGHT+BORDERWIDTH);
			ctxs[curCard].lineWidth = 1;
			ctxs[curCard].strokeStyle = "black";
			ctxs[curCard].stroke();
			
			// Draw number
			ctxs[curCard].font="30px Arial";
			ctxs[curCard].fillStyle = TEAM1COLOR;
			ctxs[curCard].fillText(curCard,(IMAGEWIDTH-LOGORIGHT), LOGOTOP);
			ctxs[curCard].strokeText(curCard,(IMAGEWIDTH-LOGORIGHT), LOGOTOP);
			ctxs[curCard].stroke();
			
		}
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}


$(document).ready(function(){

addListeners(9);

$(".imageLoader").on('click', function(){
curCard = this.id.replace(/\D/g,'');
//console.log(curCard);

});






// Canvas Stuff




})