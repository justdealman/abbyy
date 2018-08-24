function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setRatio() {
	$('[data-ratio]').each(function() {
		var t = $(this).find('.scale');
		if ( !t.is('.scale-min') ) {
			t.outerHeight(t.outerWidth()*$(this).attr('data-ratio'));
		} else {
			t.css({
				'min-height': t.outerWidth()*$(this).attr('data-ratio')
			});
		}
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));

	function videoScale() {
		$('.video-bg').each(function() {
			var v = $(this).find('video'),
				a = v.attr('width'),
				b = v.attr('height'),
				c = a / b,
				d = $(this).width(),
				e = $(this).height();
			d / e > c ? v.css({
				left: "0",
				top: .5 * -(d / a * b - e) + 'px',
				transform: 'scale(' + d / a + ')',
				'-webkit-transform': 'scale(' + d / a + ')'
			}) : v.css({
				left: .5 * -(e / b * a - d) + 'px',
				top: '0',
				transform: 'scale(' + e / b + ')',
				'-webkit-transform': 'scale(' + e / b + ')'
			});
			$(this).find('video').get(0).play();
		}).addClass('is-visible');
	}
	
	$('.hero--button_more').on('click', function() {
		$('html, body').animate({
			scrollTop: $('.about').offset().top
		}, 500);
	});

	function startApp() {
		videoScale();
		setRatio();
	}
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
	}, 100));
	
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('is-active');
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		t.siblings('[data-target]').removeClass('is-opened is-active');
		$('.fade-bg').addClass('is-opened');
		t.addClass('is-opened');
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		var diff = 30;
		if ( h < $(window).scrollTop()+(diff*2) ) {
			h = $(window).scrollTop()+diff;
		}
		t.css({
			'top': h+'px'
		}).addClass('is-active').siblings('[data-target]').removeClass('is-active');
	});
	$('[data-target] .modal--close, .fade-bg').on('click', function(e) {
		e.preventDefault();
		$('[data-target], .fade-bg').removeClass('is-opened');
		$('[data-open]').removeClass('is-active');
	});
	function menuOpen() {
		$('.menu-drop').addClass('is-opened');
		$('.fade-bg').addClass('is-opened');
	}
	function menuClose() {
		$('.menu-drop').removeClass('is-opened');
		$('.fade-bg').removeClass('is-opened');
	}
	$(document).on('click', '.menu-open', function(e) {
		menuOpen();
	});
	$('.menu-drop--close, .fade-bg').on('click', function(e) {
		menuClose();
	});

	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	
	$('.values-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite: false,
		cssEase: 'ease',
		speed: 300,
		fade: true,
		adaptiveHeight: true,
		draggable: false
	});
	
	$('.values-nav--link').on('click', function() {
		var t = $(this);
		if ( !t.hasClass('is-active') ) {
			t.addClass('is-active').siblings().removeClass('is-active');
			var wheel = $('.values-nav--wheel');
			var id = t.attr('data');
			wheel.removeClass().addClass('values-nav--wheel values-nav--wheel_'+id);
			$('.values-slider').slick('slickGoTo', id-1);
		}
	});
	
	$('.stories-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 500,
		adaptiveHeight: true,
		draggable: false
	});
	$('.stories-slider .slick-prev').html('<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><g fill="none" fill-rule="evenodd" stroke="#D3D3D3" stroke-width="2" transform="rotate(-180 35.5 35.5)"><circle cx="35" cy="35" r="35"/><path stroke-linecap="square" d="M31 19l12.547 16.5L31 52"/></g></svg>');
	$('.stories-slider .slick-next').html('<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><g fill="none" fill-rule="evenodd" stroke="#D3D3D3" stroke-width="2" transform="translate(1 1)"><circle cx="35" cy="35" r="35"/><path stroke-linecap="square" d="M31 19l12.547 16.5L31 52"/></g></svg>');
	
	$(document).on('scroll', function() {
		$('[data-parallax]').each(function() {
			var t = $(this).offset().top-$(window).height();
			var b = $(this).offset().top+$(this).outerHeight();
			var s = $(document).scrollTop();
			if ( s > t && s < b ) {
				var progress = -((s-t)/(b-t)-0.5);
			} else if ( s <= t ) {
				var progress = 0.5;
			} else if ( s >= b ) {
				var progress = -0.5;
			}
			var diff = $(this).attr('data-parallax')*progress;
			$(this).css({
				'transform': 'translateY('+diff+'px)'
			});
		});
	});
});
$(function() {
	$('.history-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite: false,
		cssEase: 'ease',
		speed: 500,
		adaptiveHeight: true,
		draggable: false
	});

	var timeline = $('.timeline');
	var totalWidth = timeline.outerWidth();
	var content = timeline.find('.timeline__row');
	
	var visible = 7;
	var activeScale = 1.233;
	var piece = totalWidth/(visible-1+activeScale);
	
	var items = timeline.find('.timeline__item');
	var size = items.length;
	
	var prevButton = timeline.find('.timeline-prev');
	var nextButton = timeline.find('.timeline-next');
	
	var arrow = timeline.find('.timeline-arrow');
	
	var currentID = 0;
	var position = 0;
	
	function recount(a,b) {
		a.outerWidth(piece);
		b.outerWidth(piece*activeScale);
	}
	recount(items,items.eq(currentID));
	
	function setActive(e) {
		if ( e == 0 ) {
			prevButton.addClass('is-disabled');
		} else {
			prevButton.removeClass('is-disabled');
		}
		if ( e >= size-1 ) {
			nextButton.addClass('is-disabled');
		} else {
			nextButton.removeClass('is-disabled');
		}
		items.filter('.is-current').removeClass('is-current');
		items.eq(e).addClass('is-current');
		recount(items,items.eq(currentID));
		var arrowPosition = currentID*piece+(piece*activeScale)/2-position*piece;
		arrow.css({
			'transform': 'translateX('+arrowPosition+'px)'
		});
		$('.history-slider').slick('slickGoTo', e);
	}
	setActive(currentID);
	
	function movePosition(e) {
		content.css({
			'transform': 'translateX(-'+e*piece+'px)'
		});
	}
	
	prevButton.on('click', function() {
		if ( !$(this).hasClass('is-disabled') ) {
			currentID--;
			if ( currentID-position < 0 ) {
				position--;
				movePosition(position);
			}
			setActive(currentID);
		}
	});
	
	nextButton.on('click', function() {
		if ( !$(this).hasClass('is-disabled') ) {
			currentID++;
			if ( currentID-position >= visible-1 ) {
				position++;
				movePosition(position);
			}
			setActive(currentID);
		}
	});
	
	items.on('click', function() {
		currentID = $(this).index();
		setActive(currentID);
	});
	
	setTimeout(function() {
		timeline.addClass('is-visible');
	}, 10);
});