(function (window, document, jQuery, undefined) {
	'use strict';

	Projects.Factory.GetUserAgent();

	$('.jq-menu').on('click' , function(e){
		e.preventDefault();
		Projects.Factory.Menu.Click(e, this);
	});

	Projects.Factory.W.load(function(e){
		if (Projects.Factory.LContent.hasClass('formstep')) {
			Projects.Factory.Validate.Init();

			$('.jq-submit').on('click' , function(e){
				e.preventDefault();
				Projects.Factory.Validate.Click(this);
			});
		}
	});

	Projects.Factory.D.ready(function(e){});
	Projects.Factory.W.resize(function(e){
		Projects.Factory.GetUserAgent();
	});
}(window, document, $));