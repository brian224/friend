(function (window, document, jQuery, undefined) {
	'use strict';

	$('.jq-menu').on('click' , function(e){
		e.preventDefault();
		Projects.Factory.Menu.Click(e, this);
	});

	$(window).load(function(e){
		$('.jq-play').on('click' , function(e){
			if (!$(this).hasClass('disable')) {
				e.preventDefault();
				Projects.Factory.Play.Click(e, this);
			}
		});

		if (Projects.Factory.LContent.hasClass('index')) {
		} else if (Projects.Factory.LContent.hasClass('game')) {
			Projects.Factory.Checked.OpenChecked();
			Projects.Factory.PrivateMode.Init();
		} else if (Projects.Factory.LContent.hasClass('getcode')) {
			Projects.Factory.GetSession.Init();

			$('.jq-submit').on('click' , function(e){
				Projects.Factory.Submit(e, this);
				Projects.Factory.Box.Open(e, this);
			});

			$('.jq-close-box').on('click' , function(e){
				e.preventDefault();
				Projects.Factory.Box.Close(e, this);
			});
		} else if (Projects.Factory.LContent.hasClass('formstep')) {
			Projects.Factory.Validate.Init();

			$('.jq-submit').on('click' , function(e){
				e.preventDefault();
				Projects.Factory.Validate.Click(e, this);
			});
		}
	});

	$(document).ready(function(e){
		Projects.Factory.GetUserAgent();
		Projects.Factory.Menu.Init();
	});
}(window, document, $));