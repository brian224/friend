(function (window , document , jQuery , undefined) {
	'use strict';
	var index = new indexFn();

	function indexFn() {
		this._indexWrap = '.index';
		this._selection = '.jQ-selection';
		this._indexVal  = '';
	};

	projects.$d.ready(function(){
		$(index._selection).hover(function(){
			$(index._indexWrap).attr('data-index', $(this).index());
			index._indexVal = $(this).index();
		}, function(){
			$(index._indexWrap).removeAttr('data-index');
		});
	});

	if ( ! window.index ) {
		window.index = index;
	}
}(window, document, jQuery));