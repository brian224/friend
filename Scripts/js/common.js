(function (window, document, jQuery, undefined) {
	'use strict';

	var common = new page();

	function page() {
		this._menu = '.jq-menu';
	}

	page.prototype.showFooter = function() {
	}

	projects.$w.load(function(){
		$(common._menu).on('click', function(){
			$(this).toggleClass('is-hover');
		});
	});

	projects.$d.ready(function(){
		if ( projects.device() === 'Mobile') {
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