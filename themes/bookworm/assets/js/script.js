// $(document).on('turbolinks:load', function () {
	'use strict';

	// prelaoder
	$('.preloader').delay(100).fadeOut(10);

	// Horizontal Scrolling
	jQuery(function ($) {
		$.fn.hScroll = function (amount) {
			amount = amount || 1200;
			$(this).bind("DOMMouseScroll mousewheel", function (event) {
				var oEvent = event.originalEvent, 
					direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta, 
					position = $(this).scrollLeft();
				position += direction > 0 ? -amount : amount;
				$(this).scrollLeft(position);
				event.preventDefault();
			})
		};
	});

	// desplazamiento animado en anclas de enlaces
	$('.scroll').click(function () {
		$('html, body').animate({
			scrollTop: $('[id="' + $.attr(this, 'data-target').substr(1) + '"]').offset().top
		}, 1000);
		return false;
	});

	$(document).ready(function () {
		// Horizontal Scrolling to layout
		// You can pass (optionally) scrolling amount
		$('.scroll-h-auto').hScroll(100);

		// search-popup
		function searchPopup() {
			$('[data-toggle="search"]').on('click', function () {
				$('.search-block').fadeIn(200);
				setTimeout(function () {
					$('.search-block').addClass('is-visible');
					var value = $('#search-field').val();
					$('#search-query').focus().val('').val(value);
				}, 250);
			});
			$('[data-toggle="search-close"]').on('click', function () {
				$('.search-block').fadeOut(200).removeClass('is-visible');
			});
		}
		searchPopup();

		// menuHumBurger icon toggle Init
		function menuHumBurgerIcon() {
			$('.navbar-toggler').on('click', function () {
				$('i').toggleClass('d-inline d-none');
			});
		}
		menuHumBurgerIcon();

		// instafeed
		if (($('#instafeed').length) !== 0) {
			var accessToken = $('#instafeed').attr('data-accessToken');
			var userFeed = new Instafeed({
				get: 'user',
				limit: 6,
				resolution: 'low_resolution',
				accessToken: accessToken,
				template: '<div class="col-xl col-lg-2 col-md-3 col-sm-3 col-4"><a class="instagram-post" href="{{link}}" aria-label="instagram-post-link"><img loading="lazy" class="img-fluid" src="{{image}}" alt="instagram-image"></a></div>'
			});
			userFeed.run();
		}

	});

	// tab
	$('.tab-content').find('.tab-pane').each(function (idx, item) {
		var navTabs = $(this).closest('.code-tabs').find('.nav-tabs'),
			title = $(this).attr('title');
		navTabs.append('<li class="nav-item"><a class="nav-link" href="#">' + title + '</a></li>');
	});

	$('.code-tabs ul.nav-tabs').each(function () {
		$(this).find("li:first").addClass('active');
	})

	$('.code-tabs .tab-content').each(function () {
		$(this).find("div:first").addClass('active');
	});

	$('.nav-tabs a').click(function (e) {
		e.preventDefault();
		var tab = $(this).parent(),
			tabIndex = tab.index(),
			tabPanel = $(this).closest('.code-tabs'),
			tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
		tabPanel.find('.active').removeClass('active');
		tab.addClass('active');
		tabPane.addClass('active');
	});

	// Accordions
	$('.collapse').on('shown.bs.collapse', function () {
		$(this).parent().find('.la-plus').removeClass('la-plus').addClass('la-minus');
	}).on('hidden.bs.collapse', function () {
		$(this).parent().find('.la-minus').removeClass('la-minus').addClass('la-plus');
	});

// });
