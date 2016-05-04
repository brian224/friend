(function (window, document, jQuery, undefined) {
	'use strict';

	var Projects = {
		Factory : {
			W            : $(window),
			D            : $(document),
			HB           : $('html , body'),
			H            : $('html'),
			B            : $('body'),
			LContent     : $('.l-content'),
			Device       : /Android|webOS|iPad|BlackBerry/i,
			IOS          : /iPhone|iPad|iPod/i,
			UserAgent    : null,
			Dynamic      : null,
			OS           : null,
			GaLabel      : '',
			GetUserAgent : function() {
				var $this = this;
				
				if ( $this.W.width() < 768 ) {
					$this.UserAgent = 'Mobile';
				} else {
					if ( $this.Device.test(navigator.userAgent) ) {
						$this.UserAgent = 'Tablet';
					} else {
						$this.UserAgent = 'PC';
					}
				}

				if (navigator.userAgent.indexOf('MSIE 10') > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
					$this.UserAgent = 'IE';
				} else if (navigator.userAgent.indexOf('MSIE 8') > 0 || navigator.userAgent.indexOf('MSIE 9') > 0) {
					$this.UserAgent = 'IE89';
				}
				
				$this.OS = $this.UserAgent !== 'PC' ? ( /iPad|iPhone|iPod/i.test(navigator.userAgent) ? 'IOS' : 'Android' ) : null;
				$this.Dynamic = $this.Device.test(navigator.userAgent) ? 'webkitAnimationEnd webkitTransitionEnd' : 'animationend transitionend';
			},
			Menu         : {
				Click : function(e , Element) {
					$(Element).parents('.m-nav').toggleClass('is-active');
				}
			},
			PrivateMode  : {
				Init : function() {
					if (Projects.Factory.UserAgent !== 'IE' && Projects.Factory.UserAgent !== 'IE89') {
						if (typeof(FB) === 'undefined') {
							alert('提醒您，您目前正在使用私密瀏覽模式，請關閉此模式，以免導致轉轉賺翻天抽獎無法正常運作，謝謝您的配合。');
						}
						try { localStorage.test = 2; } catch (e) {
							alert('提醒您，您目前正在使用私密瀏覽模式，請關閉此模式，以免導致轉轉賺翻天抽獎無法正常運作，謝謝您的配合。');
						}
					}
				}
			},
			Validate     : {
				FormElement : $('form'),
				PassID      : false,
				PassTel     : false,
				PassEmail   : false,
				Init        : function() {
					var $this = this;

					$this.FormElement.find('.input-box').each(function(){
						$(this).on('focusout', function(){
							if ($(this).parent().hasClass('required')) {
								$this.Required($(this));
							} else if ($(this).parent().hasClass('switch')) {
								$this.Switch($(this));
							}
						});
					});
				},
				Click       : function(Element) {
					var $this = this;

					$this.FormElement.find('.input-box').each(function(){
						if($(this).parent().hasClass('required')) {
							$this.Required($(this));
						} else if ($(this).parent().hasClass('switch')) {
							$this.Switch($(this));
						}
					});

					if ($this.PassID === $this.PassTel === $this.PassEmail === true) {
						window.location.href = $(Element).attr('href');
					}
				},
				Required    : function(Element) {
					var $this = this;

					if($(Element).val() === '') {
						$(Element).parent().addClass('error').find('.warning').text($(Element).parent().data('empty'));
					} else {
						$(Element).parent().removeClass('error');

						if ($(Element).parent().hasClass('cust-id')) {
							if ( $this.CheckID($(Element).val()) ) {
								$(Element).parent().removeClass('error').find('.warning').text('');
								$this.PassID = true;
							} else {
								$(Element).parent().addClass('error').find('.warning').text($(Element).parent().data('error'));
								$this.PassID = false;
							}
						} else if ($(Element).parent().hasClass('phone-num')) {
							$this.CheckTel($(Element), $(Element).val());
						} else if ($(Element).parent().hasClass('email')) {
							$this.CheckMail($(Element), $(Element).val());
						}
					}
				},
				Switch      : function(Element) {
					var $this   = this,
						$switch = $('.switch'),
						_length = $switch.length,
						_match  = 0;

					$switch.each(function(){
						if ($(this).find('.input-box').val() === '') {
							_match += 1;
						}
					});

					if (_length === _match) {
						$(Element).parent().addClass('error').find('.warning').text($(Element).parent().data('empty'));
						$(Element).parent().siblings('.switch').removeClass('error');
					} else {
						if ($(Element).parent().hasClass('phone-num')) {
							$this.CheckTel($(Element), $(Element).val());
						} else if ($(Element).parent().hasClass('email')) {
							$this.CheckMail($(Element), $(Element).val());
						}
					}
				},
				CheckID     : function(ID) {
					var CountyCode = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
					var ENSort     = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
					var NumSort    = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5);
					var Multiply   = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);

					if ( ID.length != 10 ) return false;

					var index = CountyCode.indexOf( ID.charAt(0) );

					if ( index === -1 ) return false;

					var sum = ENSort[index] + ( NumSort[index] * 9 );

					for(var i = 1 ; i < 10 ; i ++ ) {
						var v = parseInt( ID.charAt(i) );

						if ( isNaN(v) ) return false;

						sum = sum + ( v * Multiply[i] );
					}

					if ( sum % 10 != 0 ) return false;

					return true;
				},
				CheckTel    : function(Element, Tel) {
					if(/^09[0-9]{8}$/.test(Tel)) {
						$(Element).parent().removeClass('error').find('.warning').text('');
						Projects.Factory.Validate.PassTel = true;
					} else if ($('.email').find('input').val() === '') {
						$(Element).parent().addClass('error').find('.warning').text($(Element).parent().data('error'));
						Projects.Factory.Validate.PassTel = false;
					} else {
						Projects.Factory.Validate.PassTel = true;
					}
				},
				CheckMail   : function(Element, mail) {
					var _mailArr = mail.split('@');

					if ((_mailArr.length === 1 || _mailArr[0] === '' || _mailArr[1] === '') && ($('.phone-num').find('input').val() === '')) {
						$(Element).parent().addClass('error').find('.warning').text($(Element).parent().data('error'));
						Projects.Factory.Validate.PassEmail = false;
					} else {
						$(Element).parent().removeClass('error');
						Projects.Factory.Validate.PassEmail = true;
					}
				}
			}
		}
	}

	if ( ! window.Projects ) {
		window.Projects = Projects;
	} else {
		window.Projects = $.extend( {} , window.Projects , Projects );
	}
}(window, document, $));