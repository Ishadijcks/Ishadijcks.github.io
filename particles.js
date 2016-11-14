
var afterShowBall = function() {
	//$(':not(#pokeballContainer) > #pokeball').remove()
	flyingPokeball = $('#pokeballContainer > #pokeball');
	//$('#pokeball').not(flyingPokeball).remove();
	var ofs = window.ofs = $('#pokeballContainer')[0].getBoundingClientRect();
	flyingPokeball.appendTo('body').css({
		position: 'absolute',
		top: ofs.top,
		left: ofs.left
	});
}

var afterCatch = function(succ) {
	var p = flyingPokeball;
	if (succ) {
		flyingPokeball.animate({
			top: $('#pokemons').offset().top,
			left: $('#pokemons').offset().left + $('#pokemons').width() - 10,
			height: 0,
			width: 0
		}, 1000);
		setTimeout(function(){p.remove();},750)
	} else {
		// flyingPokeball.fadeOut(200);
		flyingPokeball.animate({top:flyingPokeball.offset().top+50,opacity:0},200);
		setTimeout(function(){p.remove();},200)
	}
}

var dropParticle = function(html, pos, target, time = 2) {
	var p = $('<ptcl>').html(html).children().appendTo('body');
	p.offset(pos);
	p[0].style.transition = 'left ' + time + 's linear, top ' + time + 's cubic-bezier(0.6, -0.3, 0.7, 0)';
	p.offset(target);
	setTimeout(function(){ p.fadeOut() }, time * 1000 - 200);
	setTimeout(function(){ p.remove() }, time * 1000);
	return p;
};

var dropMoneyParticle = function(amt) {
	setTimeout(function(){
		dropParticle('<b class="particle moneyParticle">$' + amt + '</b>', {
				left: $('#catchDisplay').offset().left - 50,
				top: $('#catchDisplay').offset().top - 30
			},
			$('#statBody th:eq(1)').offset(), 1, 0.4);
	}, 100)
}

var dropTokenParticle = function(amt) {
	dropParticle('<b class="particle tokenParticle"><img class="smallImage" src="images/dungeonToken.png">' + amt + '</b>', {
			left: $('#catchDisplay').offset().left - 50,
			top: $('#catchDisplay').offset().top
		},
		$('#statBody th:eq(3)').offset(), 0.8, 0.4);
}

var dropItemParticle = function(item) {
	setTimeout(function(){
		dropParticle('<b class="particle itemParticle"><img class="smallImage" src="images/items/' + item + '.png"></b>', {
				left: $('#dungeonTimer:visible,#catchDisplay:visible').offset().left + $('#dungeonTimer:visible,#catchDisplay:visible').width(),
				top: $('#dungeonTimer:visible,#catchDisplay:visible').offset().top
			},
			$('#item' + item).prev().offset());
	}, 100)
}
