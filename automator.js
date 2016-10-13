var automatorInterval;

var startAutomator = function(place, type){
	player.automator.active = 1;
	player.automator.curPlace = place;
	if(type === "gym"){
		loadGym(place);
	} else {

	}
	automatorInterval = setInterval(automatorLoop, 100);
}



var automatorLoop = function(){
	// Gym
	if(automator.active){
		if(player.automator.gymDefeated){
			player.automator.gymDefeated = 0;
			setTimeout(restartGym, player.automator.gymDelay);
			
			// var e = $.Event("keydown", { keyCode: 82}); //"keydown" if that's what you're doing
			// $("body").trigger(e);
		}
	} else {
		clearInterval(automatorInterval);
	}
}

var restartGym = function(){
	loadGym(player.automator.curPlace);
	$(".gym").click();
}