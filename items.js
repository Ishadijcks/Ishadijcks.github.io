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
{id:6, name:"X Attack", price:25000, use:"attackBoost", unUse:null, time:30, type:"combat", instant:0, magnitude: 0.5},
{id:7, name:"X Click", price:25000, use:"clickBoost", unUse:null, time:30, type:"combat", instant:0, magnitude: 0.5},
];

var itemsPerRoute = {
	1: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	2: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	3: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	4: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	5: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	6: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	7: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	8: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	9: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	10: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	11: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	12: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	13: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	14: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	15: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	16: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	17: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	18: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	19: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	20: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	21: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	22: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	23: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	24: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
	25: ["Cheri Berry", "Chesto Berry", "Pecha Berry", "Rawst Berry", "Aspear Berry"],
}