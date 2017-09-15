(function (window , document , jQuery , undefined) {
	'use strict';
	var story = new storyFn();

	function storyFn() {
		this._btnCut     = '.jQ-cut';
		this._btnSkip    = '.jQ-skip';
		this._btnIgnore  = '.jQ-ignore';
		this._btnMedical = '.jQ-medical';
		this._btnHelp    = '.jQ-help';
		this._btnConfirm = '.jQ-confirm';
		this._btnScroll  = '.jQ-scroll';
		this._video      = '.jQ-video';
		this._owl        = '.jQ-owl';
		this._mainCut    = '.main-cut';
		this._url        = window.location.href.split('pet=')[1];
		this._urlTime    = window.location.href.split('time=')[1];
		this._videoUrl   = '';
		this._answer     = false;
		this._afterAns   = 0;
		this._speed      = 400;
		this._totalPrice = 20000; // 計算百分比的分母
		this._setinterval = null;
	};

	storyFn.prototype.visitor = function() {
		if (story._url === undefined || story._url.split('&')[0] === 'dog') {
			story._videoUrl = 'https://www.youtube.com/watch?v=tl5UYH-b-0I&autoplay=1&loop=0&mute=0&bgplay=1&opacity=1&stopat=23&modestbranding=1';
		} else if (story._url.split('&')[0] === 'cat') {
			story._videoUrl = 'https://www.youtube.com/watch?v=cu2oU_GdyDs&autoplay=1&loop=0&mute=0&bgplay=1&opacity=1&stopat=25&modestbranding=1';
		}

		$(story._mainCut).attr({
			'data-type': (story._url === undefined) ? 'dog' : story._url.split('&')[0],
			'data-media': story._videoUrl
		});
	}

	storyFn.prototype.thousandComma = function(number) {
		var num = number.toString();

		var pattern = /(-?\d+)(\d{3})/;

		while (pattern.test(num)) {
			num = num.replace(pattern, "$1,$2");
		}
		return num;
	}

	storyFn.prototype.getTime = function() {
		story._setinterval = setInterval(function(){
			if (projects._media._player[0].getCurrentTime() > (parseInt(story._afterAns, 10) - 1)) {
				if (projects.device() === 'PC') {
					projects._media._player[0].pauseVideo();
				} else {
					projects._media._player[0].stopVideo();
				}
				$(story._mainCut).attr('data-choice', 'question');
				clearInterval(story._setinterval);
			}
		}, 1000);
	}

	projects.$d.ready(function(){
		story.visitor();
		projects.owlCarousel(story._owl);
	});

	projects.$w.load(function(){
		try { localStorage.test = 2; } catch (e) {
			alert('〔貼心提醒〕\r\n您已啟用［無痕模式］，建議用［一般模式］讓網站瀏覽更順暢喔！');
		}

		projects.mediaInit(function(){
			if (story._urlTime !== undefined) {
				projects._media._player[0].seekTo(parseInt(story._urlTime.split('&')[0], 10));
			}
		});
	});

	projects.$w.on('scroll', function(){
		var _scrollTop    = projects.$w.scrollTop(),
			_headHeight   = $('.l-header').height(),
			_windowHeight = projects.$w.height() / 3;

		if (_scrollTop + _windowHeight < $('.m-cut').eq(1).offset().top - _headHeight) {
			$(story._btnCut).removeClass('is-curr');
			$('.m-cut-ctrl .list').eq(0).find(story._btnCut).addClass('is-curr');
			$(common._layout._body).attr('data-cut', 0);
		} else if (_scrollTop + _windowHeight > $('.m-cut').eq(0).offset().top - _headHeight && _scrollTop + _windowHeight < $('.m-cut').eq(2).offset().top - _headHeight) {
			$(story._btnCut).removeClass('is-curr');
			$('.m-cut-ctrl .list').eq(1).find(story._btnCut).addClass('is-curr');
			$(common._layout._body).attr('data-cut', 1);
		} else if (_scrollTop + _windowHeight > $('.m-cut').eq(1).offset().top - _headHeight && _scrollTop + _windowHeight < $('.m-cut').eq(3).offset().top - _headHeight) {
			$(story._btnCut).removeClass('is-curr');
			$('.m-cut-ctrl .list').eq(2).find(story._btnCut).addClass('is-curr');
			$(common._layout._body).attr('data-cut', 2);
		} else if (_scrollTop + _windowHeight > $('.m-cut').eq(2).offset().top - _headHeight && _scrollTop + _windowHeight < $('.m-cut').eq(4).offset().top - _headHeight) {
			$(story._btnCut).removeClass('is-curr');
			$('.m-cut-ctrl .list').eq(3).find(story._btnCut).addClass('is-curr');
			$(common._layout._body).attr('data-cut', 3);
		} else if (_scrollTop + _windowHeight > $('.m-cut').eq(3).offset().top - _headHeight && _scrollTop + _windowHeight < $('.m-cut').eq(5).offset().top - _headHeight) {
			$(story._btnCut).removeClass('is-curr');
			$('.m-cut-ctrl .list').eq(4).find(story._btnCut).addClass('is-curr');
			$(common._layout._body).attr('data-cut', 4);
		}
	});

	$(story._btnCut).on('click', function(){
		var _idx        = $(this).parent().index(),
			_headHeight = $('.l-header').height();

		$(story._btnCut).removeClass('is-curr');
		$(this).addClass('is-curr');
		projects.$hb.animate({'scrollTop': $('.m-cut').eq(_idx).offset().top - _headHeight}, story._speed);

		$(common._layout._body).attr('data-cut', _idx);
	});

	$('.dog').each(function(){
		$(this).on('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend', function(){
			$(this).off('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend').addClass('is-scared');
		});
	});

	$('.rescue-content').each(function(){
		$(this).on('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend', function(){
			$(this).off('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend');

			if ($(this).parent('.m-cut').data('play') === false) {
				$(this).parent('.m-cut').attr('data-play', 'true');
			}
		});
	});

	$(story._btnSkip + ', ' + story._btnIgnore).on('click', function(){
		$(common._layout._body).removeClass('is-full');
		$(story._mainCut).attr('data-choice', 'ignore');
		$(story._video).remove();
		clearInterval(story._setinterval);
	});

	$(story._btnHelp).on('click', function(){
		$(story._mainCut).attr('data-choice', 'medical');
		$(story._mainCut + ' .choice').remove();

		if (projects.device() !== 'PC') {
			projects.mediaInit();
			projects.$w.scrollTop(0);
		}
	});

	$(story._btnMedical).on('click', function(){
		$(this).toggleClass('is-active');

		if ($(story._btnMedical + '.is-active').length !== 0) {
			$('.medical .btn-wrap').removeClass('is-disable');
		} else {
			$('.medical .btn-wrap').addClass('is-disable');
		}
	});

	$(story._btnConfirm).on('click', function(){
		var _value = 0;

		story._answer = true;

		$(story._btnMedical + '.is-active').each(function(){
			_value += $(this).data('price');
		});

		if (projects.device() === 'PC') {
			projects._media._player[0].playVideo();
		} else {
			projects._media._player[0].seekTo(parseInt(story._afterAns, 10));
		}

		$('.calc-money').text(story.thousandComma(_value));
		$('.calc-percent').text((Math.floor((_value / story._totalPrice * 100) * 100) / 100));

		$(story._mainCut).attr('data-choice', 'video');
	});

	$(story._btnScroll).on('click', function(){
		var _headHeight = $('.l-header').height();

		projects.$hb.animate({'scrollTop': $('.m-cut').eq(1).offset().top - _headHeight}, story._speed);
	});

	$(story._owl).on('translated.owl.carousel', function(){
		$('.pets-intro').attr('data-index', $(this).find('.active .pet-content').data('index'));
	});

	if ( ! window.story ) {
		window.story = story;
	}
}(window, document, jQuery));