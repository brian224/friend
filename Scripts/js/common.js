(function (window, document, jQuery, undefined) {
	'use strict';

	var common = new page();

	function page() {
		this._menu      = '.jq-menu';
		this._share     = '.jq-share';
		this._slideDown = '.jq-slide-down';
		this._ani       = '.jq-weight-ani';
		this._weighing  = '.jq-weight';
		this._slideshow = '.jq-m-slideshow';
		this._speed     = 400;
		this._images    = [];
		this._number    = 0;
	}

	// 點擊目標區域以外的地方可關閉目標區域
	page.prototype.offClick = function() {
		projects.$d.off('click').on('click' , function(e){
			e.stopPropagation();

			if (!$(e.target).is('.m-nav-menu, .m-nav-menu *, ' + common._menu + ', ' + common._menu + ' *')) {
				$(common._menu).removeClass('is-hover');
			}
		});
	}

	// 阻擋下拉重整事件
	page.prototype.fixPosition = function() {
		var isWindowTop = false,
			lastTouchY  = 0;

		var touchStartHandler = function(e) {
			if (e.touches.length !== 1) return;
			lastTouchY = e.touches[0].clientY;
			isWindowTop = (window.pageYOffset <= 50);
		};

		var touchMoveHandler = function(e) {
			var touchY = e.touches[0].clientY;
			var touchYmove = touchY - lastTouchY;
			lastTouchY = touchY;
			if (isWindowTop) {
				isWindowTop = false;
				// 阻擋移動事件
				if (touchYmove > 0) {
					e.preventDefault();
					return;
				}
			}
		};

		document.addEventListener('touchstart', touchStartHandler, false);
		document.addEventListener('touchmove', touchMoveHandler, false);
	}

	projects.$w.load(function(){
		projects.FBInit();
		common.offClick();

		if (projects._ISIPHONE) {
			common.fixPosition();
		}

		var percentCounter = 0;

		$(common._menu).on('click', function(){
			$(this).toggleClass('is-hover');
		});

		$(common._share).on('click', function(){
			projects.FBShare();
		});

		$(common._slideDown).on('click', function(){
			projects.$hb.animate({
				'scrollTop': $(this).parent('.section-cut').next().offset().top
			}, common._speed);
		});

		$(common._ani + ' .svg-icon').each(function(){
			$(this).on('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend', function(){
				var $this = $(this);

				$(common._weighing).text(parseInt($(common._weighing).text(), 10) + $this.data('weight'));
			});
		});

		$(common._slideshow).on('click', function(){
			if (projects.device() !== 'PC') {
				$(this).toggleClass('is-hover');
			}
		});

		projects.owlEvents('changed.owl.carousel' , function(){
			$(common._slideshow).removeClass('is-hover');
		});
	});

	projects.$d.ready(function(){
		if (projects.device() === 'Mobile') {
			projects.owlCarousel('.jQ-owl-xs');
		}

		if ($('.l-content').hasClass('index')) {
			for (var i = 0; i < $('.dog-list img').length; i++) {
				common._images.push($('.dog-list img').eq(i).attr('data-src'));
			}

			$.preload(common._images , 1 , function(){
				for (var i = 0; i < this.length; i++) {
					common._number += ((100 / common._images.length));
					$('.percentage').text((common._number | 0) + '%');
				}

				for (var i = 0; i < common._images.length; i++) {
					$('.dog-list img').eq(i).attr('src', common._images[i]);
				}

				if ((common._number | 0) === 100) {
					$('.l-loading').addClass('is-hide').on('webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend', function(){
						$(this).remove();
					});
				}
			});
		}
	});

	projects.$w.on('scroll' , function(){
		if ($('.l-content').hasClass('index')) {
			var _scrollTop;

			if (projects._browsers.msie === true) {
				_scrollTop = projects.$hb.scrollTop();
			} else {
				_scrollTop = projects.$b.scrollTop();
			}

			// 平均安樂死率變化圖
			if (_scrollTop + (projects.$w.height() / 2) >= $('.bar-graph').offset().top || _scrollTop + projects.$w.height() >= $('.after-cut').offset().top) {
				$('.bar-graph').addClass('graph-ani');
			}
			if (_scrollTop + projects.$w.height() >= $('.situation-list .list').eq(0).offset().top) {
				$('.situation-list .list').eq(0).find('.animation-wrap').addClass('go-ani');
			}
			if (_scrollTop + projects.$w.height() >= $('.situation-list .list').eq(1).offset().top) {
				$('.situation-list .list').eq(1).find('.animation-wrap').addClass('go-ani');
			}
			if (_scrollTop + projects.$w.height() >= $('.donate-cut').offset().top) {
				$(common._ani).addClass('weighing-ani');
			}
		}
	});

	projects.$w.resize(function(){
		if (projects.$w.width() <= 740){
			projects.owlCarousel('.jQ-owl-xs');
		}
	});

	if ( ! window.common ) {
		window.common = common;
	}
}(window, document, $));