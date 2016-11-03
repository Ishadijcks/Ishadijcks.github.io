
// Add an upgrade to the upgradeList
// An upgrade consists of a name, money cost, what stat it upgrades, some flavorText, and other upgrades that might be required to buy it
var addUpgrade = function(name,cost,type,amount,require,flavorText, requiredUpgrade){

	var temp = {
		id: player.upgradeList.length,
		name: name,
		cost: cost,
		type: type,
		amount: amount,
		bought:0,
		require:require,
		flavorText:flavorText,
		requiredUpgrade: requiredUpgrade
	}
	if( !alreadyUpgrade(name)){
	player.upgradeList.push(temp);
	}
}


// 	clickAttack: 1,
//	clickMultiplier: 1,
//	attack: 0,
//	attackMultiplier: 1,
//	money: 0,
//	moneyMultiplier: 1,
//	expMultiplier:1,
//	catchBonus: 25,
//	routeVariation: 5,
//	catchTime: 3000,
//									name,cost,type,amount,require,flavorText
var initUpgrades = function(){
	addUpgrade("Pokeball upgrade I",1000, "catchBonus",5,0,"New technology gives you a 5% bonus to catch rate",null); 
	addUpgrade("Pokeball upgrade II",5000, "catchBonus",5,3,"New technology gives you a 5% bonus to catch rate",0); 
	addUpgrade("Pokeball upgrade III",10000, "catchBonus",5,5,"New technology gives you a 5% bonus to catch rate",1); 
	addUpgrade("Pokeball upgrade IV",25000, "catchBonus",5,7,"New technology gives you a 5% bonus to catch rate",2); 
	addUpgrade("Pokeball upgrade V",75000, "catchBonus",10,10,"New technology gives you a 10% bonus to catch rate",3); 
	addUpgrade("Experience upgrade I",500, "expMultiplier",0.10,0,"New technology gives you a 10% bonus to experience gain",null); 
	addUpgrade("Experience upgrade II",5000, "expMultiplier",0.10,1,"New technology gives you a 10% bonus to experience gain",5); 
	addUpgrade("Experience upgrade III",50000, "expMultiplier",0.10,4,"New technology gives you a 10% bonus to experience gain",6); 
	addUpgrade("Experience upgrade IV",100000, "expMultiplier",0.10,6,"New technology gives you a 10% bonus to experience gain",7); 
	addUpgrade("Experience upgrade V",500000, "expMultiplier",0.20,12,"New technology gives you a 20% bonus to experience gain",8); 
	addUpgrade("Catch time upgrade I",2000, "catchTime",250,0,"Decrease the catch time by 250 milliseconds",null); 
	addUpgrade("Catch time upgrade II",10000, "catchTime",250,2,"Decrease the catch time by 250 milliseconds",10); 
	addUpgrade("Catch time upgrade III",25000, "catchTime",250,5,"Decrease the catch time by 250 milliseconds",11); 
	addUpgrade("Catch time upgrade IV",75000, "catchTime",250,8,"Decrease the catch time by 250 milliseconds",12); 
	addUpgrade("Catch time upgrade V",1000000, "catchTime",250,15,"Decrease the catch time by 250 milliseconds",13); 
	addUpgrade("Money multiplier upgrade I",1500, "moneyMultiplier",0.25,0,"Gain 25% more money",null); 
	addUpgrade("Money multiplier upgrade II",4000, "moneyMultiplier",0.30,3,"Gain 30% more money",15); 
	addUpgrade("Money multiplier upgrade III",10000, "moneyMultiplier",0.35,6,"Gain 35% more money",16); 
	addUpgrade("Money multiplier upgrade IV",25000, "moneyMultiplier",0.40,10,"Gain 40% more money",17); 
	addUpgrade("Money multiplier upgrade V",50000, "moneyMultiplier",0.50,16,"Gain 50% more money",18); 
	addUpgrade("Click multiplier upgrade I",100, "clickMultiplier",1,0,"Clicks do 100% more damage",null); 
	addUpgrade("Click multiplier upgrade II",500, "clickMultiplier",1,2,"Clicks do 100% more damage",20); 
	addUpgrade("Click multiplier upgrade III",1000, "clickMultiplier",1.5,5,"Clicks do 150% more damage",21); 
	addUpgrade("Click multiplier upgrade IV",2500, "clickMultiplier",1.5,7,"Clicks do 150% more damage",22); 
	addUpgrade("Click multiplier upgrade V",5000, "clickMultiplier",2,10,"Clicks do 200% more damage",23); 
}


// Here I can add all upgradeTypes
// Lol, do you even factory pattern?
var applyUpgrade = function(type, amount){
	switch(type){
		case "catchBonus":
			player.catchBonus += amount;
			$.notify("Your catch bonus is increased by "+amount+ "%", 'success');
			break;
		case "catchTime":
			player.catchTime -= amount;
			$.notify("Your catch time is decreased by "+amount+ " milliseconds", 'success');
			break;
		case "moneyMultiplier":
			player.moneyMultiplier += amount;
			$.notify("Your money multiplier is increased by "+amount, 'success');
			break;
		case "expMultiplier":
			player.expMultiplier += amount;
			$.notify("Your exp multiplier is increased by "+amount, 'success');
			break;
		case "clickAttack":
			player.clickAttack += amount;
			$.notify("Your click attack is increased by "+amount, 'success');
			break;
		case "clickMultiplier":
			player.clickMultiplier += amount;
			$.notify("Your click attack multiplier is increased by "+amount, 'success');
			break;		
		case "routeVariation":
			player.routeVariation -= amount;
			$.notify("Your route variation is decreased by "+amount, 'success');
			break;		
		case "attackMultiplier":
			player.attackMultiplier += amount;
			$.notify("Your pokemon attack multiplier is increased by "+amount, 'success');
			break;					
		default:
			$.notify("This should never happen, contact the developer immediately!", 'error');
			break;
	}	
}

var resetUpgrades = function(){
	player.catchBonus = 5;
	player.expMultiplier = 1;
	player.catchTime = 2000;
	player.moneyMultiplier = 1;
	player.clickMultiplier = 1;
	player.attackMultiplier = 1;
	player.upgradeList = [];
	initUpgrades();
	updateAll();
}

var boughtUpgrades = function(){
	var number = 0;
	for( var i = 0; i<player.upgradeList.length; i++){
		
		if( player.upgradeList[i].bought == 1){
			number++;
		}
	}
	
	return number;
}

var alreadyUpgrade = function(name){
	for( var i = 0; i<player.upgradeList.length;i++){
		if( player.upgradeList[i].name == name){
			return true;
		}
	}
	return false;
}

var alreadyUpgradeId = function(id){
	for( var i = 0; i<player.upgradeList.length;i++){
		if( player.upgradeList[i].id == id){
			return player.upgradeList[i].bought == 1;
		}
	}

}