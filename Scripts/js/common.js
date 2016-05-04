(function (window, document, jQuery, undefined) {
	'use strict';

	$('.jq-menu').on('click' , function(e){
		e.preventDefault();
		Projects.Factory.Menu.Click(e, this);
	});

	$(window).load(function(e){
		if (Projects.Factory.LContent.hasClass('formstep')) {
			Projects.Factory.Validate.Init();

			$('.jq-submit').on('click' , function(e){
				e.preventDefault();
				Projects.Factory.Validate.Click(this);
			});
		}
	});

	$(document).ready(function(e){
		Projects.Factory.GetUserAgent();
	});
}(window, document, $));