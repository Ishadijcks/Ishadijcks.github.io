var lastNumberOfPokemon = 0;

var oakExplainEvolution = function(){
	if(!player.evoExplain){
		html = "";
		html += "<div class='row'><img class='oakImage' src='images/oak/oak.png'</div";
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
		html += "<div class='row'><img class='oakImage' src='images/oak/oak.png'</div";
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
		html += "<div class='row'><img class='oakImage' src='images/oak/oak.png'</div";
		html += "<div class='row'><p class='oakText'>Visit towns to challenge the gym leaders!</p>";
		html += "<img class='oakImage' src=images/oak/townExplain.png>";
		$("#oakBody").html(html);
		$("#oakModal").modal('show')
		player.townExplain = 1;
	}
}


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
		player.oakItemList.push(temp);
	}
}

var checkOakItems = function(){
	for( var i = 0; i< player.oakItemList.length; i++){
		if(player.caughtPokemonList.length >= player.oakItemList[i].pokedexReq && player.oakItemList[i].earned === 0){
			player.oakItemList[i].earned = 1;
			$.notify("Professor Oak has a present for you: " + player.oakItemList[i].name, "success");
		}
	}
	showOakItems();
}

var initOakItems = function(){
	addOakItem("Normal Rod", "images/oak/normalRod.png", 20, "With this rod you are able to catch water Pokemon", null);
	addOakItem("Magic Ball", "images/oak/magicBall.png", 30, "Get a 10% bonus to your catchRate", 10)
	addOakItem("Amulet Coin", "images/oak/amuletcoin.png", 40, "Gain 50% more coins from wild Pokemon", 1.5);
	addOakItem("Poison Barb", "images/oak/poisonBarb.png", 50, "Your clicks do 25% more damage!", 1.25);
	addOakItem("Exp Share", "images/oak/expShare.png", 60, "Gain 25% more exp from wild Pokemon", 1.25);
	addOakItem("Legendary Charm", "images/oak/pokeDoll.png", 70, "50% more chance to encounter a legendary Pokemon", 1.5);
	addOakItem("Shiny Charm", "images/oak/shinyCharm.png", 80, "100% more chance to encounter a shiny Pokemon", 2);
	showOakItems();
}

var activateOakItem = function(id){
	if(player.oakItemSlots == 1){
		deactivateAllOakItems();
		player.oakItemList[id].active = 1;
	}
	
	else if(player.oakItemSlots == 2){
		if(player.oakItemList[id].active == 1){
			player.oakItemList[id].active = 0;
		} else {
			if (getTotalActiveOakItems() < player.oakItemSlots){
				player.oakItemList[id].active = 1;
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
	for( var i = 0; i< player.oakItemList.length; i++){
		if (player.oakItemList[i].active == 1){
			count++;
		}
	}
	return count;
}

var deactivateAllOakItems = function(){
	for( var i = 0; i< player.oakItemList.length; i++){
		player.oakItemList[i].active = 0;
	}
}

var isActive = function(oakItemName){
	for( var i = 0; i<player.oakItemList.length; i++){
		if(player.oakItemList[i].name == oakItemName){
			return player.oakItemList[i].active;
		}
	}
}

var getOakItemBonus = function(oakItemName){
	for( var i = 0; i<player.oakItemList.length; i++){
		if(player.oakItemList[i].name == oakItemName && player.oakItemList[i].active){
			return player.oakItemList[i].value;
		}
	}	
}

var showOakItems = function(force){
	if(lastNumberOfPokemon != player.caughtPokemonList.length || force){
		lastNumberOfPokemon = player.caughtPokemonList.length;
		html = "";
		for( var i = 0; i< player.oakItemList.length; i++){
			if( player.oakItemList[i].earned === 1){
				if( player.oakItemList[i].active === 1){
					html += "<div id=item"+i+" class='oakItem activeOakItem'><img title='"+ player.oakItemList[i].flavorText+ "' class='oakItemImage tooltipRight' src='"+ player.oakItemList[i].image +"'' /></div>"
				} else {
					html += "<div id=item"+i+" class='oakItem'><img title='"+ player.oakItemList[i].flavorText+ "' class='oakItemImage tooltipRight' src='"+ player.oakItemList[i].image +"'' /></div>"
				}
			}
		}


		$("#oakItemBody").html(html);	

		$(".tooltipRight").tooltipster({
			position: "right"
		});
	}
}


var alreadyOakItem = function(name){
	for( var i = 0; i<player.oakItemList.length;i++){
		if( player.oakItemList[i].name == name){
			return true;
		}
	}
	return false;
}