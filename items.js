var itemList = [
{id:1, name:"Cheri Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:2, name:"Chesto Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:3, name:"Pecha Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:4, name:"Rawst Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:5, name:"Aspear Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:6, name:"X Attack", price:25000, use:"attackBoost", unUse:null, time:60, type:"combat", instant:0, magnitude: 2, flavorText: "Double your Pokemons attack for 60 seconds!"},
{id:7, name:"X Click", price:25000, use:"clickBoost", unUse:null, time:60, type:"combat", instant:0, magnitude: 2, flavorText: "Double your click attack for 60 seconds!"},
{id:8, name:"Lucky Incense", price:25000, use:"coinBoost", unUse:null, time:60, type:"combat", instant:0, magnitude: 2, flavorText: "Double the money you earn for 60 seconds!"},
{id:9, name:"Item Magnet", price:25000, use:"itemBoost", unUse:null, time:60, type:"combat", instant:0, magnitude: 2, flavorText: "Double your chance of getting items for 60 seconds!"},
{id:10, name:"X Exp", price:25000, use:"expBoost", unUse:null, time:60, type:"combat", instant:0, magnitude: 2, flavorText: "Double the exp you earn for 60 seconds!"},
{id:11, name:"Token Collector", price:25000, use:"tokenBoost", unUse:null, time:60, type:"combat", instant:0, magnitude: 2, flavorText: "Double the dungeon tokens you earn for 60 seconds!"},
{id:12, name:"Thunder Stone", price:25000, use:"evolution", unUse:null, time: null, type:"evolution", instant:1, magnitude:0, flavorText: "A peculiar stone that makes certain species of Pokemon evolve. It has a thunderbolt pattern."},
{id:13, name:"Fire Stone", price:25000, use:"evolution", unUse:null, time: null, type:"evolution", instant:1, magnitude:0, flavorText: "A peculiar stone that makes certain species of Pokemon evolve. It is colored orange."},
{id:14, name:"Leaf Stone", price:25000, use:"evolution", unUse:null, time: null, type:"evolution", instant:1, magnitude:0, flavorText: "A peculiar stone that makes certain species of Pokemon evolve. It has a leaf pattern."},
{id:15, name:"Water Stone", price:25000, use:"evolution", unUse:null, time: null, type:"evolution", instant:1, magnitude:0, flavorText: "A peculiar stone that makes certain species of Pokemon evolve. It is a clear light blue."},
{id:16, name:"Moon Stone", price:25000, use:"evolution", unUse:null, time: null, type:"evolution", instant:1, magnitude:0, flavorText: "A peculiar stone that makes certain species of Pokemon evolve. It is as black as the night sky."},
{id:17, name:"Trade Stone", price:25000, use:"evolution", unUse:null, time: null, type:"evolution", instant:1, magnitude:0, flavorText: "A peculiar stone that makes certain species of Pokemon evolve. It looks very lonely."},
{id:23, name:"Fire Egg", price:25000, use:"breeding", unUse:null, time: null, type:"fire", instant:1, magnitude:0, flavorText: "A fire egg."},
{id:24, name:"Water Egg", price:25000, use:"breeding", unUse:null, time: null, type:"water", instant:1, magnitude:0, flavorText: "A water egg."},
{id:25, name:"Grass Egg", price:25000, use:"breeding", unUse:null, time: null, type:"grass", instant:1, magnitude:0, flavorText: "A grass egg."},
{id:26, name:"Fighting Egg", price:25000, use:"breeding", unUse:null, time: null, type:"fighting", instant:1, magnitude:0, flavorText: "A fighting egg."},
{id:27, name:"Electric Egg", price:25000, use:"breeding", unUse:null, time: null, type:"electric", instant:1, magnitude:0, flavorText: "An electric egg."},
{id:28, name:"Dragon Egg", price:25000, use:"breeding", unUse:null, time: null, type:"dragon", instant:1, magnitude:0, flavorText: "A dragon egg."},
{id:29, name:"Random Egg", price:25000, use:"breeding", unUse:null, time: null, type:"random", instant:1, magnitude:0, flavorText: "An egg of a random type."},
]


var itemsPerRoute = {
	1: ["X Attack", "X Click", "X Attack", "X Click", "X Attack", "X Click", "Lucky Incense"],
	2: ["X Attack", "X Click", "X Attack", "X Click", "X Attack", "X Attack", "Lucky Incense"],
	3: ["X Attack", "X Click", "X Attack", "X Click", "X Attack", "X Attack", "Token Collector"],
	4: ["X Attack", "X Click", "X Attack", "X Click", "X Attack", "Item Magnet"],
	5: ["X Attack", "X Click", "X Attack", "X Click", "X Click", "Lucky Incense"],
	6: ["X Attack", "X Click", "X Attack", "X Click", "Item Magnet"],
	7: ["X Attack", "X Click", "X Attack", "X Click", "X Exp"],
	8: ["X Attack", "X Click", "X Attack", "X Click", "Token Collector"],
	9: ["X Attack", "X Click", "X Attack", "X Click", "Item Magnet"],
	10: ["X Attack", "X Click", "X Click", "Lucky Incense"],
	11: ["X Attack", "X Click", "X Attack", "Item Magnet"],
	12: ["X Attack", "X Click", "X Click", "Item Magnet"],
	13: ["X Attack", "X Click", "X Attack", "X Exp"],
	14: ["X Attack", "X Click", "X Click", "Token Collector"],
	15: ["X Attack", "X Click", "Lucky Incense"],
	16: ["X Attack", "X Click", "Item Magnet"],
	17: ["X Attack", "X Click", "X Exp"],
	18: ["X Attack", "X Click", "Token Collector"],
	19: ["X Attack", "Lucky Incense"],
	20: ["X Click", "Item Magnet"],
	21: ["X Attack", "X Exp"],
	22: ["X Click", "Token Collector"],
	23: ["Lucky Incense", "Item Magnet", "Token Collector"],
	24: ["X Exp", "Lucky Incense", "Token Collector"],
	25: ["X Exp", "Item Magnet"],
}

var getItemChance = function(route){
	return (1+route/10)*getItemBonus("itemBoost");
}


var gainRandomItem = function(route){
	var randomItemName;
	if(route <= 25){
		var possibleItems = itemsPerRoute[route];
		var rand = Math.floor(Math.random()*possibleItems.length);
		randomItemName = possibleItems[rand];
		progressQuest("findItems", "none", 1);
		player.totalItemsFound++;
		return gainItemByName(randomItemName);
	}
}

var isPokemon = function(name){
	for(var i = 0; i<pokemonList.length; i++){
		if(pokemonList[i].name === name){
			return true;
		}
	}
	return false;
}

var gainItemByName = function(name){
	if(isPokemon(name)){
		capturePokemon(name);
		$.notify("You got a "+name, 'success');
	} else if(name == "Underground Key"){
		oakExplainUnderground();
		if(curShop.name == "Lavender Town" && curShop.itemList.length == 4){
			curShop.itemList.splice(3,1);
		}
	} else {
		if (alreadyHaveItem(name)){
			var itemNum = findItemInInventory(name);
			player.inventoryList[itemNum].quantity++;
		}
		else{

			var item = getItemByName(name);
			var itemObject = {id:item.id, name:item.name, quantity:1, type:item.type, use:item.use, unUse:item.unUse, time:item.time, timeLeft:0, instant:item.instant, magnitude:item.magnitude, inUse:0, flavorText:item.flavorText};
			player.inventoryList.push(itemObject);
		}

		$.notify("You got a "+name, 'success');

		updateItems()
	
		
	}
	save();
	return name;
}

var getItemByName = function(name){
	for( var i = 0; i<itemList.length; i++){
		if(itemList[i].name == name){
			return itemList[i];
		}
	}
}

var getItemById = function(id){
	for( var i = 0; i<player.inventoryList.length; i++){
		if(player.inventoryList[i].id == id){
			return i;
		}
	}
}

var alreadyHaveItem = function(name){
	if(isInventoryEmpty() == true){
		return false;
	}
	else {
		for (var i = 0; i<player.inventoryList.length; i++){
			if(player.inventoryList[i] == undefined){
				return false;
			}
			else if(player.inventoryList[i].name == name){
				return true;
			}
		}
		return false;
	}
}

var findItemInInventory = function(name){
	for(var i = 0; i<player.inventoryList.length; i++){
		if(player.inventoryList[i].name == name){
			return i;
		}
	}
	return false;
}

var isInventoryEmpty = function(){
	if (player.inventoryList.length == 0){
		return true;
	}
	else {
		for (var i = 0; i<player.inventoryList.length; i++){
			if (player.inventoryList[i].quantity != 0 || player.inventoryList[i].time > 0 ){
				return false;
			}
		}
		return true
	}
}


var itemInterval = function(){
	for (var i = 0; i<player.inventoryList.length; i++){
		if (player.inventoryList[i].inUse == 1){
			if (player.inventoryList[i].timeLeft > 0){
				player.inventoryList[i].timeLeft--;
			}
			else{
				player.inventoryList[i].inUse = 0;
				$.notify("The effects of your "+player.inventoryList[i].name+" ran out.", "succes")
			}
			updateItems();
			updateStats();
		}
	}
}

var activateItem = function(id){
	item = player.inventoryList[getItemById(id)];
	// Item with a timer.
	if(item.use === "evolution"){
		useEvoStone(item);
		updateItems();
		updateStats();
	} else if (item.use === "breeding"){
		if(breedSlotLeft()){
			gainRandomEgg(item.type);
			item.quantity--;
			updateItems();
			updateStats();
		} else {
			$.notify("Your hatchery is full");
		}
	} else if (!isNaN(item.time)){
		if(item.quantity > 0){
			item.timeLeft += item.time;
			item.inUse = 1;
			item.quantity--;
			//$.notify(""+item.name+" activated", "succes")
			updateItems();
			updateStats();
			return true;
		}
	}

}

var useEvoStone = function(item){
	var html = "<div class='row row-centered'>";
	var possibleEvolutions = getStoneEvolutionPokemon(item.name);
	$("#evoModal").modal("show");
	for(var i = 0; i <possibleEvolutions.length; i++){
		html += "<div class='col-sm-3 col-md-2 col-centered'>"
		if (!possibleEvolutions[i].evolved){
			var id = getPokemonByName(possibleEvolutions[i].name).id;
			if(possibleEvolutions[i].name === "Eevee"){
				var eeveelution;
				if(item.name === "Thunder Stone"){
					eeveelution = "Jolteon";
				}
				else if(item.name === "Water Stone"){
					eeveelution = "Vaporeon";
				}
				else if(item.name === "Fire Stone"){
					eeveelution = "Flareon";
				}
				html += "<div data-pokemon='" + eeveelution + "' class='evoButton pokedexEntry' id='evo" + item.id + "'>";
				html += "<img class='center-block"
				if (alreadyCaughtShiny("Eevee")) {
					html += " largeShinyImage"
				}
				html += "' id='pokedexImage' src=images/"
				if (alreadyCaughtShiny("Eevee")) {
					html += "shiny";
				}
				html += "pokemon/" + id + ".png >" + possibleEvolutions[i].name;
				evolution = eeveelution;
			} else {
				html += "<div data-pokemon='" + possibleEvolutions[i].evolution + "' class='evoButton pokedexEntry' id='evo" + item.id + "'>";
				html += "<img class='center-block"
				if (alreadyCaughtShiny(possibleEvolutions[i].name)) {
					html += " largeShinyImage"
				}
				html += "' id='pokedexImage' src=images/"
				if (alreadyCaughtShiny(possibleEvolutions[i].name)){
					html += "shiny";
				}
				html += "pokemon/" + id + ".png >" + possibleEvolutions[i].name;
				evolution = possibleEvolutions[i].evolution;
			}



			
			if (alreadyCaught(evolution)){
				html += " <img id=alreadyCaughtImage src=images/"
				if (alreadyCaughtShiny(evolution)) {
					html += "shiny";
				}
				html+= "Pokeball.PNG>";
			}
			html += "</div>";


		}
		html += "</div>" //Close evoButton wrapper
	}
	
	html += "</div>";

	$("#evoBody").html(html);
	$("#evoTitle").html(item.name + " (" + player.inventoryList[getItemById(item.id)].quantity + ")");
	updateItems();
}

var activateEvoStone = function(pokemon, id){
	var item = player.inventoryList[getItemById(id)];
	if (item.quantity > 0){
		var shiny = generateStoneShiny();
		capturePokemon(pokemon, shiny);
		item.quantity--;
		updateItems();
		if (shiny){
			$("#evoModal div[data-pokemon='"+pokemon+"'] > #alreadyCaughtImage").attr('src', "images/shinyPokeball.PNG");
		}
		if (item.quantity == 0){
			$("#evoModal").modal("hide");
		} else {
			$("#evoTitle").html(item.name + " (" + item.quantity + ")");
		}
	}
}

var generateStoneShiny = function(){
	var chance = 2048;
	if(isActive("Shiny Charm")){
		chance /= getOakItemBonus("Shiny Charm");
	}
	var number = Math.floor(Math.random()*chance) + 1;

	if(number <= 1){
		console.log("Shiny!!!");
		return 1;
	}
	return 0;
}

var keyItemsList = []

var addKeyItem = function(name, location, unlocks, player_property, filetype){
	if (typeof filetype == 'undefined'){ filetype = 'png' };

	var temp = {
		name: name,
		location: location,
		unlocks: unlocks,
		image: "images/keyItems/"+player_property+"."+filetype,
		isFound: function(){
			return player[player_property];
		},
		setFound: function(n){
			player[player_property] = n;
		}
	}

	if (typeof temp.isFound() == 'undefined'){
		temp.setFound(0);
	}

	keyItemsList.push(temp)
}

var getKeyItem = function(name){
	for (var i=0;i<keyItemsList.length;i++){
		if (keyItemsList[i].name == name){
			return keyItemsList[i];
		}
	}
	console.log("No item found with name "+name);
	return 0;
}

addKeyItem("Teachy TV", "Start the game", "Help explanations", "teachyTV", "gif");
addKeyItem("Dungeon Pass", "Route 2", "Access to dungeons", "dungeonPass");
addKeyItem("Incubator", "Pewter City Gym", "Hatching eggs", "incubator");
addKeyItem("Shard Case", "Route 5", "See shards and use them to upgrade damage", "shardCase");
addKeyItem("Underground Key", "Lavender Town Shop", "Access to underground mining", "undergroundKey");
addKeyItem("Mom's Letter", "First level 100 pokemon", "Breeding at mom's house", "momLetter");

var showKeyItems = function(){
	var html = "";
	html +=	"<div id='keyItemsTableHead' class='keyItemsHead row buffer-bottom-30 visible-md visible-lg'>";
	html +=		"<div class='col-md-3'></div>"
	html +=		"<div class='col-md-9 row'>"
	html +=			"<div class='col-md-4'><span>Name</span></div>";
	html +=			"<div class='col-md-4'><span>Location</span></div>";
	html +=			"<div class='col-md-4'><span>Unlocks</span></div>";
	html += 	"</div>"
	html += "</div>"
	for (var i=0;i<keyItemsList.length;i++){
		var tmp = keyItemsList[i];
		var style = "";
		if (!tmp.isFound()){
			style = ' dark'
		}
		html +=	"<div class='row buffer-bottom-30"+style+"'>";
		html +=		"<div class='col-xs-3'><img class='keyItemImage' src='"+tmp.image+"'></div>";
		html +=		"<div class='col-xs-9 row'>";
		html +=			"<div class='col-xs-12 col-md-4'><span>"+tmp.name+"</span></div>";
		html +=			"<div class='clearfix visible-xs'></div>";
		html +=			"<div class='col-xs-12 col-sm-6 col-md-4'><span class='visible-xs visible-sm'>Location: </span><span>"+tmp.location+"</span></div>";
		html +=			"<div class='clearfix visible-xs'></div>";
		html +=			"<div class='col-xs-12 col-sm-6 col-md-4'><span class='visible-xs visible-sm'>Unlocks: </span><span>"+tmp.unlocks+"</span></div>";
		html +=		"</div>";
		html +=	"</div>";
	}

	$('#keyItemsBody').html(html)
}
