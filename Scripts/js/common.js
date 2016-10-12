(function (window, document, jQuery, undefined) {
	'use strict';

	var common = new page();

	function page() {
		this._menu      = '.jq-menu';
		this._share     = '.jq-share';
		this._slideDown = '.jq-slide-down';
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

	projects.$w.load(function(){
		projects.FBInit();
		common.offClick();

		$(common._menu).on('click', function(){
			$(this).toggleClass('is-hover');
		});

		$(common._share).on('click', function(){
			projects.FBShare();
		});

		$(common._slideDown).on('click', function(){
			projects.$hb.animate({'scrollTop': $(this).parent('.section-cut').next().offset().top}, 400);
		});
	});

	projects.$d.ready(function(){
		if (projects.device() === 'Mobile') {
			projects.owlCarousel('.jQ-owl-xs');
		}
	});

	projects.$w.on('scroll' , function(){
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