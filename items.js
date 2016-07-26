var Item = function(name,price,image,type,effect,time){

	var temp = {
		name: name,
		price: price,
		image: image,
		type: type,
		effect: effect,
		time: time,
		active: 0
	}
	return temp;
}

var xAttack = Item("X Attack", 500, "images/items/xattack.png", "attackBoost", 10, 180);
var xDefense = Item("X Defense", 500, "images/items/xdefense.png", "defenseBoost", 10, 180);
