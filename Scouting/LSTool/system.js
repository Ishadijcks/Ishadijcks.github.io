// SETTINGS

// Image modification
var TEAM1COLOR = "#F73434";
var TEAM2COLOR = "#4949F2";
var IMAGEWIDTH = 240;
var IMAGEHEIGHT = 336;
var BORDERWIDTH = 30;
var LOGOTOP = 60;
var LOGORIGHT = 80;

var players = 10;


$(document).ready(function(){









// Canvas Stuff
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas1');
var ctx = canvas.getContext('2d');

function handleImage(e){
console.log(e);
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = IMAGEWIDTH;
            canvas.height = IMAGEHEIGHT;
						
			ctx.drawImage(img, 0, 0, IMAGEWIDTH+1, IMAGEHEIGHT+1); // resizes image to 300px wide, 200px high
			
			// Draw inner black border
			ctx.rect(0, 0, IMAGEWIDTH, IMAGEHEIGHT);
			ctx.lineWidth = 1;
			ctx.strokeStyle = "black";
			ctx.stroke();
			
			// Draw teamcolor border
			ctx.rect(0, 0, IMAGEWIDTH, IMAGEHEIGHT);
			ctx.lineWidth = BORDERWIDTH;
			ctx.strokeStyle = TEAM1COLOR;
			ctx.stroke();
			
			// Draw outer black border
			ctx.rect(0, 0, IMAGEWIDTH+BORDERWIDTH, IMAGEHEIGHT+BORDERWIDTH);
			ctx.lineWidth = 1;
			ctx.strokeStyle = "black";
			ctx.stroke();
			
			// Draw number
			ctx.font="30px Arial";
			ctx.fillStyle = TEAM1COLOR;
			ctx.fillText("1",(IMAGEWIDTH-LOGORIGHT), LOGOTOP);
			ctx.stroke();
			
		}
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}

})