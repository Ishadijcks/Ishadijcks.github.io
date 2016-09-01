/**
 * Created by Halflive9 on 29/08/2016.
 */

var pokedexInfo = [
    {
        name: "Bulbasaur",
        description: "There is a plant seed on its back right from the day this Pok&eacute;mon is born. The seed slowly grows larger.",
        species:"Seed Pok&eacute;mon",
        height: "2\'04\"",
        weight: "15.2 lbs.",
        types: ["Grass","Poison"]
    },
    {
        name: "Ivysaur",
        species:"Seed Pok&eacute;mon",
        description: "There is a plant bulb on its back. When it absorbs nutrients, the bulb is said to blossom into a large flower.",
        height: "3\'3\"",
        weight: "28.7 lbs.",
		types: ["Grass","Poison"]
    },
    {
        name: "Venusaur",
        species:"Seed Pok&eacute;mon",
        description:  "A bewitching aroma wafts from its flower. The fragrance becalms those engaged in a battle.",
        height: "6\'7\"",
        weight: "220.5 lbs.",
		types: ["Grass","Poison"]
    },
    {
        name: "Charmander",
        species:"Lizard Pok&eacute;mon",
        description: "From the time it is born, a flame burns at the tip of its tail. Its life would end if the flame were to go out.",
        height: "2\'0\"",
        weight: "18.7 lbs.",
		types: ["Fire"]
    },
    {
        name: "Charmeleon",
        species: "Flame Pok&eacute;mon",
        description: "It lashes about with its tail to knock down its foe. It then tears up the fallen opponent with sharp claws.",
        height: "3\'7\"",
        weight: "41.9 lbs.",
		types: ["Fire"]
    },
    {
        name: "Charizard",
        species: "Flame Pok&eacute;mon",
        description: "Its wings can carry this Pok&eacute;mon close to an altitude of 4,6000 feet. It blows out fire at very high temperatures.",
        height: "5\'7\"",
        weight: "199.5 lbs",
		types: ["Fire","Flying"]
    },
    {
        name: "Squirtle",
        species: "Tiny Turtle Pok&eacute;mon",
        description: "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
        height: "1\'8\"",
        weight: "19.8 lbs.",
		types: ["Water"]
    },
    {
        name: "Wartortle",
        species: "Turtle Pok&eacute;mon",
        description: "This Pok&eacute;mon is very popular as a pet. Its fur-covered tail is a symbol of its longevity.",
        height: "3\'3\"",
        weight: "49.6 lbs.",
		types: ["Water"]
    },
    {
        name: "Blastoise",
        species: "Shellfish Pok&eacute;mon",
        description: "It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell.",
        height: "5\'3\"",
        weight: "188.5 lbs.",
		types: ["Water"]
    },
    {
        name: "Caterpie",
        species: "Worm Pok&eacute;mon",
        description: "It is covered with a green skin. When it grows, it sheds the skin, covers itself with silk, and becomes a cocoon.",
        height: "1\'0\"",
        weight: "6.4 lbs.",
		types: ["Bug"]
    },
    {
        name: "Metapod",
        species: "Cocoon Pok&eacute;mon",
        description: "Even though it is encased in a sturdy shell, the body inside is tender. It can't withstand a harsh attack.",
        height: "2\'4\"",
        weight: "21.8 lbs.",
		types: ["Bug"]
    },
    {
        name: "Butterfree",
        species: "Butterfly Pok&eacute;mon",
        description: "The wings are protected by rain-repellent dust. As a result, this Pok&eacute;mon can fly about even in rain.",
        height: "3\'7\"",
        weight: "70.5 lbs",
		types: ["Bug", "Flying"]
    },
    {
        name: "Weedle",
        species: "Hairy Bug Pok&eacute;mon",
        description: "Often found in forests and grasslands. It has a sharp, toxic barb of around two inches on top of its head.",
        height: "1\'0\"",
        weight: "7.1 lbs.",
		types: ["Bug","Poison"]
    },
    {
        name: "Kakuna",
        species: "Cocoon Pok&eacute;mon",
        description: "This Pok&eacute;monis in a temporary stage while making its body. It is almost completely unable to move on its own.",
        height: "2\'0\"",
        weight: "22 lbs.",
		types: ["Bug","Poison"]
    },
    {
        name: "Beedrill",
        species: "Poison Bee Pok&eacute;mon",
        description: "May appear in a swarm. Flies at violent speeds, all the while stabbing with the toxic stinger on its rear.",
        height: "3\'3\"",
        weight: "65 lbs.",
		types: ["Bug", "Poison"]
    },
    {
        name: "Pidgey",
        species: "Tiny Bird Pok&eacute;mon",
        description: "Does not like to fight. It hides in tall grass and so on, foraging for food such as small bugs.",
        height: "1\'0\"",
        weight: "4 lbs.",
		types: ["Normal","Flying"]
    },
    {
        name: "Pidgeotto",
        species: "Bird Pok&eacute;mon",
        description: "The claws on its feet are well developed. It can carry prey such as an Exeggcute to its nest over 60 miles away.",
        height: "3\'7\"",
        weight: "66.1 lbs.",
		types: ["Normal","Flying"]
    },
    {
        name: "Pidgeot",
        species: "Bird Pok&eacute;mon",
        description: "It spreads its gorgeous wings widely to intimidate enemies. It races through the skies at Mach-2 speed.",
        height: "4\'11\"",
        weight: "87.1 lbs.",
		types: ["Normal", "Flying"]
    },
    {
        name: "Rattata",
        species: "Mouse Pok&eacute;mon",
        description: "Its fangs are long and very sharp. They grow continuously, so it gnaws on hard things to whittle them down.",
        height: "1\'0\"",
        weight: "7.7 lbs.",
		types: ["Normal"]
    },
    {
        name: "Raticate",
        species: "Mouse Pok&eacute;mon",
        description: "Its rear feet have three toes each. They are webbed, enabling it to swima cross rivers.",
        height: "2\'4\"",
        weight: "40.8 lbs.",
		types: ["Normal"]
    },
	{
		name: "Spearow",
		species: "Tiny Bird Pok&eacute;mon",
		description: "It busily flits around here and there. Even if it is frail, it can be a tough foe that uses Mirror Move.",
		height: "1\'0\"",
		weight: "4.4 lbs.",
		types: ["Normal", "Flying"]
	},
	{
		name: "Fearow",
		species: "Beak Pok&eacute;mon",
		description: "Its huge and magnificent wings can keep it aloft in the sky. It can remain flying a whole day without landing.",
		height: "3\'11\"",
		weight: "83.8 lbs.",
		types: ["Normal", "Flying"],
	}
];