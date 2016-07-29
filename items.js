/* var Item = function(name,price,image,type,effect,time){

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
} */

// var xAttack = Item("X Attack", 500, "images/items/xattack.png", "attackBoost", 10, 180);
// var xDefense = Item("X Defense", 500, "images/items/xdefense.png", "defenseBoost", 10, 180);
var itemList = [
{id:1, name:"Cheri Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:2, name:"Chesto Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:3, name:"Pecha Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:4, name:"Rawst Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:5, name:"Aspear Berry", price:100, use:null, unUse:null, time:0, type:"berry", instant:1, magnitude: 1},
{id:6, name:"X Attack", price:25000, use:"attackBoost", unUse:null, time:30, type:"combat", instant:0, magnitude: 2},
{id:7, name:"X Click", price:25000, use:"clickBoost", unUse:null, time:30, type:"combat", instant:0, magnitude: 10},
];

var itemsPerRoute = {
	1: ["X Attack", "X Click"],
	2: ["X Attack", "X Click"],
	3: ["X Attack", "X Click"],
	4: ["X Attack", "X Click"],
	5: ["X Attack", "X Click"],
	6: ["X Attack", "X Click"],
	7: ["X Attack", "X Click"],
	8: ["X Attack", "X Click"],
	9: ["X Attack", "X Click"],
	10: ["X Attack", "X Click"],
	11: ["X Attack", "X Click"],
	12: ["X Attack", "X Click"],
	13: ["X Attack", "X Click"],
	14: ["X Attack", "X Click"],
	15: ["X Attack", "X Click"],
	16: ["X Attack", "X Click"],
	17: ["X Attack", "X Click"],
	18: ["X Attack", "X Click"],
	19: ["X Attack", "X Click"],
	20: ["X Attack", "X Click"],
	21: ["X Attack", "X Click"],
	22: ["X Attack", "X Click"],
	23: ["X Attack", "X Click"],
	24: ["X Attack", "X Click"],
	25: ["X Attack", "X Click"],
}