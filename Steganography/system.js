var pixelSize = 10;
var canvasWidth = 600;
var canvasHeight = 600;
var c;
var ctx;


$(document).ready(function(){
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	c.width  = canvasWidth;
	c.height = canvasHeight;
	
});


$(document).on('click', '#submitMessage', function(){
	var message = document.getElementById("inputMessage").value;
	var colorArray = getColorArrayFromMessage(message);
	console.log(colorArray.length + " pixels!")
	drawCanvas(colorArray);
})

$(document).on('click', '#readImage', function(){
	
	var hexArray = getHexArrayFromImage();
	var message = getMessageFromHexArray(hexArray);
	console.log(message);
})

var getMessageFromHexArray = function(hexArray){
	var message = "";
	for( var i = 0; i<hexArray.length; i++){
		message += hexToAscii(hexArray[i]);
	}
	return message;
} 

var getHexArrayFromImage = function(){
	var hexArray = [];
	for( var j = 0; j<canvasHeight; j+= pixelSize){

		for(var i = 0; i<canvasWidth; i+=pixelSize){
		
			var imgData = ctx.getImageData(i,j,1,1);

			if(!(imgData.data[0] == 255 && imgData.data[1] == 255 && imgData.data[2] == 255)){
				hexArray.push(imgData.data[0])
				hexArray.push(imgData.data[1])
				hexArray.push(imgData.data[2])
			}
		}
	}
	console.log(hexArray.length/3);
	return hexArray;
}

var hexToAscii = function(hex){
	return String.fromCharCode(hex);
}

var getHexArrayFromMessage = function(message){
	var hexArray = [];
	for (i=0; i < message.length; i++) {
        hexArray.push(message[i].charCodeAt(0).toString(16));
    }
    return hexArray;
}

var getColorArrayFromMessage = function(message){
	var hexArray = getHexArrayFromMessage(message);
	var colorArray = [];
    for(var i = 0; i< hexArray.length; i+=3){
    	colorArray[i/3] = "#"+hexArray[i]+hexArray[i+1]+hexArray[i+2];	
    }
    return colorArray;
} 

var drawCanvas = function(colorArray){
	
	clearCanvas()

    for(var i = 0; i<colorArray.length; i++){
    	var x = (i*pixelSize)%600;
    	var y = Math.floor(i*pixelSize/600)*pixelSize;
    	ctx.fillStyle = colorArray[i];
    	ctx.fillRect(x,y,pixelSize,pixelSize);
    }

}

var clearCanvas = function(){
	ctx.fillStyle = "white"
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
}