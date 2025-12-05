/*
	Helios by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		settings = {

			// Carousels
				carousels: {
					speed: 4,
					fadeIn: true,
					fadeDelay: 250
				},

		};

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '961px',   '1280px' ],
			narrow:    [ '841px',   '960px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			speed: 350,
			noOpenerFade: true,
			alignment: 'center'
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Nav.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Carousels.
		$('.carousel').each(function() {

			var	$t = $(this),
				$forward = $('<span class="forward"></span>'),
				$backward = $('<span class="backward"></span>'),
				$reel = $t.children('.reel'),
				$items = $reel.children('article');

			var	pos = 0,
				leftLimit,
				rightLimit,
				itemWidth,
				reelWidth,
				timerId;

			// Items.
				if (settings.carousels.fadeIn) {

					$items.addClass('loading');

					$t.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						enter: function() {

							var	timerId,
								limit = $items.length - Math.ceil($window.width() / itemWidth);

							timerId = window.setInterval(function() {
								var x = $items.filter('.loading'), xf = x.first();

								if (x.length <= limit) {

									window.clearInterval(timerId);
									$items.removeClass('loading');
									return;

								}

								xf.removeClass('loading');

							}, settings.carousels.fadeDelay);

						}
					});

				}

			// Main.
				$t._update = function() {
					pos = 0;
					rightLimit = (-1 * reelWidth) + $window.width();
					leftLimit = 0;
					$t._updatePos();
				};

				$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };

			// Forward.
				$forward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos -= settings.carousels.speed;

							if (pos <= rightLimit)
							{
								window.clearInterval(timerId);
								pos = rightLimit;
							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Backward.
				$backward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos += settings.carousels.speed;

							if (pos >= leftLimit) {

								window.clearInterval(timerId);
								pos = leftLimit;

							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Init.
				$window.on('load', function() {

					reelWidth = $reel[0].scrollWidth;

					if (browser.mobile) {

						$reel
							.css('overflow-y', 'hidden')
							.css('overflow-x', 'scroll')
							.scrollLeft(0);
						$forward.hide();
						$backward.hide();

					}
					else {

						$reel
							.css('overflow', 'visible')
							.scrollLeft(0);
						$forward.show();
						$backward.show();

					}

					$t._update();

					$window.on('resize', function() {
						reelWidth = $reel[0].scrollWidth;
						$t._update();
					}).trigger('resize');

				});

		});

	// Filtres Formation
	document.addEventListener('DOMContentLoaded', function() {
		const filterBtns = document.querySelectorAll('.filter-btn');
		const timelineItems = document.querySelectorAll('.timeline-item');

		filterBtns.forEach(btn => {
			btn.addEventListener('click', function() {
				// Retirer la classe active de tous les boutons
				filterBtns.forEach(b => b.classList.remove('active'));
				// Ajouter la classe active au bouton cliqué
				this.classList.add('active');

				const filter = this.getAttribute('data-filter');

				timelineItems.forEach(item => {
					if (filter === 'all') {
						item.style.display = 'block';
						setTimeout(() => {
							item.style.opacity = '1';
							item.style.transform = 'translateX(0)';
						}, 50);
					} else if (item.classList.contains(filter)) {
						item.style.display = 'block';
						setTimeout(() => {
							item.style.opacity = '1';
							item.style.transform = 'translateX(0)';
						}, 50);
					} else {
						item.style.opacity = '0';
						item.style.transform = 'translateX(-20px)';
						setTimeout(() => {
							item.style.display = 'none';
						}, 300);
					}
				});
			});
		});
	});

	// Filtres Projets
	document.addEventListener('DOMContentLoaded', function() {
		const filterBtns = document.querySelectorAll('.projet-filter-btn');
		const projectCards = document.querySelectorAll('.project-card');

		filterBtns.forEach(btn => {
			btn.addEventListener('click', function() {
				// Retirer la classe active de tous les boutons
				filterBtns.forEach(b => b.classList.remove('active'));
				// Ajouter la classe active au bouton cliqué
				this.classList.add('active');

				const filter = this.getAttribute('data-filter');

				projectCards.forEach(card => {
					if (filter === 'all') {
						card.style.display = 'block';
						setTimeout(() => {
							card.classList.remove('filtered-out');
						}, 50);
					} else if (card.getAttribute('data-category') === filter) {
						card.style.display = 'block';
						setTimeout(() => {
							card.classList.remove('filtered-out');
						}, 50);
					} else {
						card.classList.add('filtered-out');
						setTimeout(() => {
							card.style.display = 'none';
						}, 400);
					}
				});
			});
		});
	});

})(jQuery);

