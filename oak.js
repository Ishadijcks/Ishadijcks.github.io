var lastNumberOfPokemon = 0;
var oakItemList = [];

var oakExplainEvolution = function(){
	if(!player.evoExplain){
		html = "";
		html += "<div class='row'><img class='oakImage' src='images/oak/oak.png'</div>";
		html += "<div class='row'><p class='oakText'>One of your Pokemon has evolved.<br>When a Pokemon evolves, you capture its evolution, while still keeping the original Pokemon.</p>"
		html += "<img class='oakImage' id='evolutionImage' src=images/oak/"+player.starter+"Evolution.png>";
		$("#oakBody").html(html);
		$("#oakModal").modal('show')
		player.evoExplain = 1;
	}
}

var oakExplainMap = function(){
	if(!player.mapExplain){
		html = "";
		html += "<div class='row'><img class='oakImage' src='images/oak/oak.png'</div>";
		html += "<div class='row'><p class='oakText'>You have defeated enough Pokemon on this route, you can now advance to the next route by clicking on the map.</p>";
		html += "<img class='oakImage' src=images/oak/mapExplain.png>";
		$("#oakBody").html(html);
		$("#oakModal").modal('show')
		player.mapExplain = 1;
	}
}

var oakExplainTown = function(){
	if(!player.townExplain){
		html = "";
		html += "<div class='row'><img class='oakImage' src='images/oak/oak.png'</div>";
		html += "<div class='row'><p class='oakText'>Visit towns to challenge the gym leaders!</p>";
		html += "<img class='oakImage' src=images/oak/townExplain.png>";
		$("#oakBody").html(html);
		$("#oakModal").modal('show')
		player.townExplain = 1;
	}
}

var oakExplainDungeons = function(){
	if(!player.dungeonExplain){
		html = "";
		html += "<div class='row'><img class='oakImage' src='images/oak/oak.png'</div>";
		html += "<div class='row'><p class='oakText'>Move around in the dungeon to explore all the rooms!<br>You complete the dungeon when you have defeated the boss Pokemon!<br>You can click, use WASD or use the arrow keys to navigate in the dungeon.</p>";
		html += "<img class='oakImage' src=images/oak/dungeonExplain.png>";
		$("#oakBody").html(html);
		$("#oakModal").modal('show')
		player.dungeonExplain = 1;
	}
}

var oakExplainAgain = function () {
	if(player.mapExplain || player.townExplain || player.dungeonExplain) {
		var html = "<div class='row'><img class='oakImage' src='images/oak/oak.png'</div>";
		html +="<div class='row' style='padding-top:20px'>";
		html +="<div class='col-sm-offset-4'>";
		if (player.mapExplain) {

			html += "<button class='leftTownButton btn btn-primary col-sm-2' id='map_tutorial'>Maps</button>";
			//html += "</div><div class='row'>";
		}
		if (player.townExplain) {
			html += "<button class='leftTownButton btn btn-primary col-sm-2' id='town_tutorial'>Towns</button>";
			//html += "</div><div class='row'>";
		}
		if (player.dungeonExplain) {
			html += "<button class='leftTownButton btn btn-primary col-sm-2' id='dungeon_tutorial'>Dungeons</button>";
			//html += "</div><div class='row'>";
		}
		html += "</div>";
		html += "</div>";

		$("#tutorialBody").html(html);
		$("#tutorialModal").modal('show');

		$("#map_tutorial").on("click", function(){
			console.log("Hi");
			player.mapExplain = 0;
			safelyOpen(oakExplainMap);
		});

		$("#dungeon_tutorial").click(function () {
			player.dungeonExplain = 0;
			safelyOpen(oakExplainDungeons);
		});

		$("#town_tutorial").click(function () {
			player.townExplain = 0;
			safelyOpen(oakExplainTown);
		});
	}
};

var addOakItem = function(name, image, pokedexReq, flavorText, value){

	var temp = {
		name: name,
		image: image,
		earned: 0,
		active: 0,
		pokedexReq: pokedexReq,
		flavorText: flavorText,
		value: value
	}
	if(!alreadyOakItem(temp.name)){
		oakItemList.push(temp);
	}
}

var checkOakItems = function(suppresnotify){
	if(player.oakItemSlots == 1 && player.caughtPokemonList.length > 60){
		player.oakItemSlots = 2;
		$.notify("You can now have 2 Oak items active at the same time!");
	}
	for( var i = 0; i< oakItemList.length; i++){
		if(player.caughtPokemonList.length >= oakItemList[i].pokedexReq && oakItemList[i].earned === 0){
			oakItemList[i].earned = 1;
			if(!suppresnotify){
				$.notify("Professor Oak has a present for you: " + oakItemList[i].name, "success");
			}
		}
	}
	showOakItems();
}

var initOakItems = function(){
	addOakItem("Normal Rod", "images/oak/normalRod.png", 20, "With this rod you are able to catch water Pokemon", null);
	addOakItem("Magic Ball", "images/oak/magicBall.png", 30, "Get a 10% bonus to your catchRate", 10)
	addOakItem("Amulet Coin", "images/oak/amuletCoin.png", 40, "Gain 50% more coins from wild Pokemon", 1.5);
	addOakItem("Poison Barb", "images/oak/poisonBarb.png", 50, "Your clicks do 25% more damage!", 1.25);
	addOakItem("Exp Share", "images/oak/expShare.png", 60, "Gain 25% more exp from wild Pokemon", 1.25);
	addOakItem("Legendary Charm", "images/oak/pokeDoll.png", 70, "50% more chance to encounter a legendary Pokemon", 1.5);
	addOakItem("Shiny Charm", "images/oak/shinyCharm.png", 80, "Double the chance to encounter a shiny Pokemon", 2);
	addOakItem("Blaze Cassette", "images/oak/blazeCassette.png", 90, "Your eggs will hatch twice as fast!", 2);
	addOakItem("Cell Battery", "images/oak/cellBattery.png", 100, "Regenerate 50% more mining energy!", 1.5);
	checkOakItems(1);
	showOakItems(1);
}

var activateOakItem = function(id){
	if(player.oakItemSlots == 1){
		deactivateAllOakItems();
		oakItemList[id].active = 1;
		player.oakItemsEquipped.push(oakItemList[id].name);
	}
	
	else if(player.oakItemSlots == 2){
		if(oakItemList[id].active == 1){
			oakItemList[id].active = 0;
			for(var i = 0; i < player.oakItemsEquipped.length; i++){
				if(player.oakItemsEquipped[i] === oakItemList[id].name){
					player.oakItemsEquipped.splice(i, 1);
					i--;
				}
			}
		} else {
			if (getTotalActiveOakItems() < player.oakItemSlots){
				oakItemList[id].active = 1;
				player.oakItemsEquipped.push(oakItemList[id].name);
			} else {
				$.notify("You can only have " + player.oakItemSlots + " Oak items active at the same time", "error" );
			}
		}
	}


	showOakItems(1);

	updateAll();
}

var getTotalActiveOakItems = function(){
	var count = 0;
	
	for( var i = 0; i< oakItemList.length; i++){
		if (oakItemList[i].active == 1){
			count++;
		}
	}
	return count;
}

var deactivateAllOakItems = function(){
	for( var i = 0; i< oakItemList.length; i++){
		oakItemList[i].active = 0;
	}
	player.oakItemsEquipped = [];
}

var isActive = function(oakItemName){
	for( var i = 0; i<oakItemList.length; i++){
		if(oakItemList[i].name == oakItemName){
			return oakItemList[i].active;
		}
	}
}

var getOakItemBonus = function(oakItemName){
	for( var i = 0; i<oakItemList.length; i++){
		if(oakItemList[i].name == oakItemName && oakItemList[i].active){
			return oakItemList[i].value;
		}
	}	
}

var showOakItems = function(force){
	
	if(player.oakItemsEquipped.length > 0) {
		for (var i = 0; i < player.oakItemsEquipped.length; i++){
			for (var j = 0; j < oakItemList.length; j++){
				if (player.oakItemsEquipped[i] === oakItemList[j].name){
					oakItemList[j].active = 1;
				}
			}
		}
	}
	
	if(lastNumberOfPokemon != player.caughtPokemonList.length || force){
		lastNumberOfPokemon = player.caughtPokemonList.length;
		if(player.caughtPokemonList.length >= 20){
			html = "";
			html += "<p style='text-align:center; width:47px; font-size:16px'>"+ getTotalActiveOakItems() + "/" + player.oakItemSlots + "</p>";
			for( var i = 0; i< oakItemList.length; i++){
				if( oakItemList[i].earned === 1){
					if( oakItemList[i].active === 1){
						html += "<div id=item"+i+" class='oakItem activeOakItem'><img title='"+ oakItemList[i].flavorText+ "' class='oakItemImage tooltipRight' src='"+ oakItemList[i].image +"'' /></div>"
					} else {
						html += "<div id=item"+i+" class='oakItem'><img title='"+ oakItemList[i].flavorText+ "' class='oakItemImage tooltipRight' src='"+ oakItemList[i].image +"'' /></div>"
					}
				}
			}



			$("#oakItemBody").html(html);	

			$(".tooltipRight").tooltipster({
				position: "right"
		});

		}
	}
}


var alreadyOakItem = function(name){
	for( var i = 0; i<oakItemList.length;i++){
		if( oakItemList[i].name == name){
			return true;
		}
	}
	return false;
}
