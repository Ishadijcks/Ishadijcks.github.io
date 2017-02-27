var showStats = function(){

    var html = "<div class='row'>"
    html +=     addStatTableHead("Current values");
    html +=         addStatTableRow("Unique Pokemon", numberWithCommas(getUniqueCaptures()));
    html +=         addStatTableRow("Unique Shinies", numberWithCommas(getTotalShinies()));
    html +=         addStatTableRow("Money", numberWithCommas(player.money));
    html +=         addStatTableRow("Dungeon Tokens", numberWithCommas(player.dungeonTokens));
    html +=         addStatTableRow("Quest Points", numberWithCommas(player.questPoints));
    html +=         addStatTableRow("Diamonds", numberWithCommas(player.mineCoins));
    html +=         addStatTableRow("Click Attack", numberWithCommas(getClickAttack()));
    html +=         addStatTableRow("Pokemon Attack", numberWithCommas(player.attack));
    html +=         addStatTableRow("Catch Bonus", player.catchBonus, "%");
    html +=         addStatTableRow("Catch Time", player.catchTime/1000, "s");
    html +=         addStatTableRow("Exp Multiplier", player.expMultiplier.toFixed(2), "x");
    html +=         addStatTableRow("Money Multiplier", player.moneyMultiplier.toFixed(2), "x");
    html +=     addStatTableFooter();

    html +=     addStatTableHead("Total values", 2);
    html +=         addStatTableRow("Total Pokemon Defeated", numberWithCommas(getTotalDefeats()));
    html +=         addStatTableRow("Total Captures", numberWithCommas(getTotalCaptures()));
    html +=         addStatTableRow("Money", numberWithCommas(player.totalMoney));
    html +=         addStatTableRow("Dungeon Tokens", numberWithCommas(player.totalDungeonTokens));
    html +=         addStatTableRow("Quest Points", numberWithCommas(player.totalQuestPoints));
    html +=         addStatTableRow("Diamonds", numberWithCommas(player.totalMineCoins));
    html +=         addStatTableRow("Clicks", numberWithCommas(player.totalClicks));
    html +=         addStatTableRow("Items Found", numberWithCommas(player.totalItemsFound));
    html +=         addStatTableRow("Eggs Hatched", numberWithCommas(player.totalBred));
    html +=     addStatTableFooter();

    html += "</div>";
    html += "<div class='row'>";

    var gymList = getGymNames();
    html += addStatTableHead("Gyms Defeated");
    for(var i = 0; i < gymList.length; i++){
        html += addStatTableRow(gymList[i].slice(0, -4), player.gymsDefeated[i]);
    }
    html += addStatTableFooter();

    

    var dungeonList = getDungeonNames();
    html += addStatTableHead("Dungeons Cleared", 2);
    for(var i = 0; i < dungeonList.length; i++){
        html += addStatTableRow(dungeonList[i].slice(0, -8), player.dungeonsDefeated[i]);
    }
    html += addStatTableFooter();

    html += addStatTableHead("Elite Four", 1);
    html +=     addStatTableRow("Elite Lorelei", player.gymsDefeated[8]);
    html +=     addStatTableRow("Elite Bruno", player.gymsDefeated[9]);
    html +=     addStatTableRow("Elite Agatha", player.gymsDefeated[10]);
    html +=     addStatTableRow("Elite Lance", player.gymsDefeated[11]);
    html +=     addStatTableRow("Champion", player.gymsDefeated[12]);
    html += addStatTableFooter();

    html += addStatTableHead("Pokemons Defeated per route", 2);
    for(var i = 1; i < 26; i++){
        html += addStatTableRow(i, player.routeKills[i]);
    }
    html += addStatTableFooter();


    $("#statsBody").html(html);
}

var addStatTableRow = function(name, value, unit = ""){
    var html = "";
    html += "<tr>";
    html += 	"<td>" + name + "</td>";
    html += 	"<td>" + value + "" + unit + "</td>";
    html += "</tr>";
    return html;
}

var addStatTableHead = function(name, offset = 1){
    var html = "";
    html += "<div class='col-sm-4 col-sm-offset-" + offset + "'>";
    html += "<table class='table table-striped noselect' style='cursor:default'>";
    html += "<thead><tr><th>" + name + "</th><th></th></tr></thead>";
    html += "<tbody class='table-bordered'>";
    return html;
}

var addStatTableFooter = function(){
    return "</tbody></table></div>";
}