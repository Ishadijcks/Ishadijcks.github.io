var screenWidth = 1000;
var screenHeight = 500;
var playerHeight = 50;
var playerWidth = 20;
var movingLeft = false;
var movingRight = false;
var stickHeight = 50;
var stickWidth = 15;

var name;
var stickList = [];
var playerList = [];
var stickColors = ["red","green","striped"];

var isActive = 1;
var frame = 0;

var score = 0;

var c;
var ctx;

document.onkeydown = checkKeyDown;

function checkKeyDown(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
       playerList[0].movingLeft = true;
	   playerList[0].movingRight = false;
    }
    if (e.keyCode == '39') {
       playerList[0].movingLeft = false;
	   playerList[0].movingRight = true;
    }

}

document.onkeyup = checkKeyUp;

function checkKeyUp(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
       playerList[0].movingLeft = false;
    }
    if (e.keyCode == '39') {
	   playerList[0].movingRight = false;
    }

}

$(document).ready(function(){

	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	ctx.canvas.width  = screenWidth;
	ctx.canvas.height = screenHeight;
		
	name = prompt("Wat is je naam?");
		
	setInterval(spawnStick,750);
	  addPlayer(name);
	setInterval(function(){
	  mover();
	  draw();
	  },10);
});



var Player  = function(name){
	this.name = name;
	this.x = Math.floor(screenWidth/2)+1;
	this.y = screenHeight - playerHeight;
	this.moveRight = function(){
		this.x+=3;
	}
	this.moveLeft = function(){
		this.x-=3;
	}
	this.movingLeft = false;
	this.movingRight = false;
	this.intersect = function(stick){
		return (this.x <= (stick.x+stickWidth) && (this.x+playerWidth) >= stick.x && this.y <= (stick.y+stickHeight) && (stick.y+stickHeight) >= stick.y);

	}
}

var Stick = function(x,y,type,speed){
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.type = type;
	this.move = function(){
		this.y+=speed;
	}
}

var spawnStick = function(){
	var tempX = Math.floor(Math.random()*screenWidth+1);
	var tempSpeed = 0.5+Math.random();
	var tempStick = new Stick(tempX,-stickHeight,1,tempSpeed);
	stickList.push(tempStick);
}

var addPlayer = function(name){
	var tempPlayer = new Player(name);
	playerList.push(tempPlayer);
}

var draw = function(){
	canvas.width = canvas.width;

	for(var i = 0; i<stickList.length; i++){
		var stick = stickList[i];
		ctx.fillStyle = "green";
		ctx.fillRect(stick.x,stick.y,stickWidth,stickHeight);
		ctx.rect(stick.x-1,stick.y-1,stickWidth+2,stickHeight+2)
		ctx.stroke();
	}
	
	for(var i = 0; i<playerList.length; i++){
		var player = playerList[i];
		ctx.fillStyle = "blue";
		ctx.fillRect(player.x,player.y,playerWidth,playerHeight);
		ctx.fillStyle = "black";
		ctx.font="20px Arial";
		ctx.textAlign="center"; 
		ctx.fillText(player.name,player.x+playerWidth/2,player.y-30);
	}
	
	$("#scoreTag").html("Score: "+score);
}

var mover = function(){
	for( var i = 0; i<stickList.length; i++){
		stickList[i].move();
		if( stickList[i].y > screenHeight){
			stickList.splice(i,1);
				i--;
		}
	}
	for( var i = 0; i<playerList.length; i++){
		if( playerList[0].movingLeft == true){
			playerList[0].moveLeft();
		}
		if( playerList[0].movingRight == true){
			playerList[0].moveRight();
		}
	}
	playerStickCollision();
}

var playerStickCollision = function(){
	for( var i = 0; i<playerList.length; i++){
		for( var j = 0; j<stickList.length; j++){
			if (playerList[i].intersect(stickList[j])){
				score++;
				stickList.splice(j,1);
				j--;
			}
		}
	}
}

