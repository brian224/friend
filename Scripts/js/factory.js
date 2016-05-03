(function (window, document, jQuery, undefined) {
	'use strict';

	var Projects = {
		Factory : {
			W            : $(window),
			D            : $(document),
			HB           : $('html , body'),
			H            : $('html'),
			B            : $('body'),
			Location     : $('.m-nav .location'),
			MNavMenuList : $('.m-nav-menu .list'),
			MainContent  : $('.main-content'),
			LContent     : $('.l-content'),
			LContentData : $('.l-content').data('location'),
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
				Init  : function() {
					Projects.Factory.Location.text(Projects.Factory.LContentData);

					if (Projects.Factory.UserAgent === 'Mobile') {
						$('.m-nav-menu .friday .link').attr('href', '//video.friday.tw/m/sn');

						if (Projects.Factory.LContent.hasClass('getcode')) {
							$('.slogan .link').attr('href', '//video.friday.tw/m/sn');
						}
					}

					if (Projects.Factory.LContent.hasClass('index')) {
						Projects.Factory.GaLabel = 'A';
					} else if (Projects.Factory.LContent.hasClass('game')) {
						Projects.Factory.GaLabel = 'B';
					} else if (Projects.Factory.LContent.hasClass('getcode')) {
						Projects.Factory.GaLabel = 'C';
					} else if (Projects.Factory.LContent.hasClass('action')) {
						Projects.Factory.GaLabel = 'D';
					}

					$('.jq-menu').attr('ga_label', 'menu_' + Projects.Factory.GaLabel);
					Projects.Factory.MNavMenuList.each(function(){
						var $this = $(this),
							$link = $this.find('.link'),
							_idx  = $this.index();

						if (_idx === 0) {
							$link.attr('ga_label', 'menu_' + Projects.Factory.GaLabel + '_home');
						} else if (_idx === 1) {
							$link.attr('ga_label', 'menu_' + Projects.Factory.GaLabel + '_activity');
						} else if (_idx === 2) {
							$link.attr('ga_label', 'menu_' + Projects.Factory.GaLabel + '_Richart');
						} else if (_idx === 3) {
							$link.attr('ga_label', 'menu_' + Projects.Factory.GaLabel + '_luckdraw');
						} else if (_idx === 4) {
							$link.attr('ga_label', 'menu_' + Projects.Factory.GaLabel + '_friDay');
						}
					});
				},
				Click : function(e , Element) {
					$(Element).parents('.m-nav').toggleClass('is-active');
				}
			},
			MovieLoad    : function() {
				var _str = '';

				for (var i = 0; i < Datas.length; i++) {
					_str += '<div class="list">';
					_str += '	<span class="img-wrap">';
					_str += '		<img src="/Content/img/index/cover/' + Datas[i].cover + '?img=20160421" alt="' + Datas[i].name + '">';
					_str += '	</span>';
					_str += '	<em class="movie-name">' + Datas[i].name + '</em>';
					_str += '</div>';
				}

				$('.js-movies').html(_str);
				Projects.Factory.OwlCarousel.Init();
			},
			OwlCarousel  : {
				Init    : function() {
					var $this = this;

					if ( $('.jq-owl-slide').length !== 0 ) {
						$this.Setting($('.jq-owl-slide .movie-list'));
					}
				},
				Setting : function(Element) {
					Element.siblings('.pagination').remove();

					Element.owlCarousel({
						items              : parseInt(Element.data('items'), 10),
						nav                : ( Element.data('nav') === true ) ? true : false,
						navText            : Element.data('navtext') ? Element.data('navtext').split(',') : ['', ''],
						navClass           : Element.data('navclass') ? Element.data('navclass').split(',') : ['', ''],
						navContainer       : Element.data('navcontainer'),
						navContainerClass  : Element.data('navcontainerclass'),
						loop               : ( Element.find('.list').length > 1 ) ? ( ( Element.data('loop') === true ) ? true : false ) : false,
						dots               : ( Element.data('dots') === true ) ? true : false,
						autoplay           : ( Element.data('autoplay') === true ) ? true : false,
						autoplayTimeout    : 5000,
						autoplayHoverPause : true,
						dotsContainer      : Element.data('dotscontainer'),
						mouseDrag          : true,
						slideBy            : 3
					});
				}
			},
			Slideshow    : function() {
				if (Projects.Factory.UserAgent === 'IE89') {
					var $list = $('.award-list .list'),
						i     = 0;

					$list.eq(i).addClass('is-show');
					setInterval(function(){
						if (i === $list.length - 1) {
							i = 0;
						} else {
							i += 1;
						}
						$list.eq(i).addClass('is-show').siblings().removeClass('is-show');
					}, 1500);
				}
			},
			Checked      : {
				OpenChecked : function() {
					if ( Projects.Factory.IOSChrome() ) {
						alert('請使用 iOS Safari 開啟此活動網站，以免導致轉轉賺翻天抽獎無法正常運作，謝謝您的配合。');
					}
				}
			},
			FB           : {
				UserID         : null,
				UserEMail      : null,
				Init           : function() {
					window.fbAsyncInit = function(){
						FB.init({
							appId   : 628830867268760,
							status  : true,
							cookie  : true,
							xfbml   : true,
							version : 'v2.5'
						});
					};

					(function(d, s, id){
						var js,
							fjs = d.getElementsByTagName(s)[0];

						if ( d.getElementById(id) ) {return;}

						js     = d.createElement(s);
						js.id  = id;
						js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.5&appId=628830867268760";

						fjs.parentNode.insertBefore(js, fjs);
					}(document, 'script', 'facebook-jssdk'));
				},
				GetLoaginState : function(Functions) {
					var $this = this;

					$('.btn-start').addClass('b-cloak disable');
					Projects.Factory.MainContent.addClass('loading');
					FB.getLoginStatus(function (response) {
						if ( response.authResponse ) {
							$this.UserID = response.authResponse.userID;
							Projects.Factory.Play.Click($this.UserID, $this.UserEMail);
						} else {
							$this.Login(Functions);
						}
					});
				},
				Login          : function(Functions) {
					var $this = this;

					FB.login(function (response) {
						if ( response.authResponse ) {
							$this.UserID = response.authResponse.userID;
							Projects.Factory.Play.Click($this.UserID, $this.UserEMail);
						} else {
							alert('須同意應用程式');
							$('.btn-start').removeClass('b-cloak disable');
							Projects.Factory.MainContent.removeClass('loading');
						}
					} , {scope : 'email'});
				}
			},
			Play         : {
				Ul       : $('.award-list'),
				List     : $('.award-list .list'),
				Wording  : $('.get-award'),
				BtnLink  : $('.btn-link'),
				Check    : false,
				Award    : null,
				End      : null,
				I        : 0,
				Speed    : 50,
				Click    : function(fbid, email) {
					var $this = this;

					Projects.Factory.MainContent.removeClass('loading');

					if ($this.Check === false) {
						$this.Check = true;
						$this.Loop();

						$.ajax({
							type     : 'POST',
							url      : '/api/lottery',
							data     : {
								fbid  : fbid,
								email : ''
							},
							dataType : 'json',
							success  : function(data) {
								if (data.prize === '180') {
									$this.End = 0;
								} else if (data.prize === '60') {
									$this.End = 6;
								} else if (data.prize === '37') {
									$this.End = 3;
								}
								$this.Award = data.prize;
								sessionStorage.setItem('award', $this.Award);
								sessionStorage.setItem('serial', data.serial);
								sessionStorage.setItem('ACT_NO', data.ACT_NO);
							}
						});
					}
				},
				Loop     : function() {
					var $this = this;

					var runit = setTimeout(function(){
						$this.I += 1;

						if ($this.I === $this.List.length - 1) {
							$this.I = -1;
						}

						if ($this.I === $this.End) {
							$this.Speed = $this.Speed * 2.5;

							if ($this.Speed > 700 && $this.I === $this.End) {
								$this.Ul.addClass('is-shine');
								$this.Finish();
							} else {
								$this.Loop();
							}
						} else {
							$this.Loop();
						}

						$this.List.eq($this.I).addClass('is-show').siblings().removeClass('is-show');
					}, $this.Speed);
				},
				Finish   : function() {
					var $this = this;

					$this.Wording.text($this.Award + '天免費看');

					if (Projects.Factory.UserAgent === 'IE') {
						$this.Ul.delay(0).queue(function(){
							$(this).addClass('is-shine').dequeue();
						}).delay(350).queue(function(){
							$(this).removeClass('is-shine').dequeue();
						}).delay(350).queue(function(){
							$(this).addClass('is-shine').dequeue();
						}).delay(350).queue(function(){
							$(this).removeClass('is-shine').dequeue();
						}).delay(350).queue(function(){
							$(this).addClass('is-shine').dequeue();
						}).delay(350).queue(function(){
							$(this).removeClass('is-shine').dequeue();
						}).delay(350).queue(function(){
							$(this).addClass('is-shine').dequeue();
						}).delay(350).queue(function(){
							$(this).removeClass('is-shine').dequeue();
						});
						Projects.Factory.HB.animate({
							scrollTop : $this.BtnLink.offset().top
						});
						$('.main-content-bd').addClass('show-result');
					} else if (Projects.Factory.UserAgent === 'IE89') {
						$this.Ul.removeClass('is-shine');
						Projects.Factory.HB.animate({
							scrollTop : $this.BtnLink.offset().top
						});
						$('.main-content-bd').addClass('show-result');
					} else {
						$this.Ul.delay(3200).queue(function(){
							$this.Ul.removeClass('is-shine');
						});
						Projects.Factory.HB.animate({
							scrollTop : $this.BtnLink.offset().top
						});
						$('.main-content-bd').addClass('show-result');
					}
				}
			},
			GetSession   : {
				serial : $('.serial'),
				award  : $('.award'),
				money  : $('.money'),
				ACT_NO : $('.ACT_NO'),
				Init   : function() {
					var $this   = this,
						_serial = sessionStorage.getItem('serial') || '',
						_ACT_NO = sessionStorage.getItem('ACT_NO') || '',
						_award  = sessionStorage.getItem('award') || '';

					$this.serial.text(_serial);
					$this.award.text(_award);
					$this.ACT_NO.val(_ACT_NO);

					if (_award === '37') {
						$this.money.text('領NT$300');
					}
				}
			},
			Submit       : function(e , Element) {
				GAPush($(Element).attr('ga_cat') , $(Element).attr('ga_event') , $(Element).attr('ga_label'));
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
			IOSChrome    : function () {
				if ( Projects.Factory.IOS.test(navigator.userAgent) && navigator.userAgent.toLowerCase().split('version/')[1] === undefined ) {
					return true;
				} else {
					return false;
				}
			},
			Validate     : {
				FormElement : $('form'),
				Init        : function() {
					var $this = this;

					$this.FormElement.find('.input-box').each(function(){
						$(this).on('focusout', function(){
							if($(this).parent().hasClass('required')) {
								$this.Required($(this));
							}
						});
					});
				},
				Click       : function(Element) {
					var $this = this;

					$this.FormElement.find('.input-box').each(function(){
						if($(this).parent().hasClass('required')) {
							$this.Required($(this));
						}
					});
				},
				Required    : function(Element) {
					var $this = this;

					if($(Element).val() === '' || $(Element).val() === $(Element).attr('placeholder')) {
						$(Element).parent().addClass('error').find('.warning').text($(Element).parent().data('empty'));
					} else {
						$(Element).parent().removeClass('error');

						if ($(Element).parent().hasClass('cust-id')) {
							if ( $this.CheckID($(Element), $(Element).val()) ) {
								$(Element).parent().removeClass('error');
							} else {
								$(Element).parent().addClass('error').find('.warning').text($(Element).parent().data('error'));
							}
						} else if ($(Element).parent().hasClass('phone-num')) {
							$this.CheckTel($(Element), $(Element).val());
						} else if ($(Element).parent().hasClass('email')) {
							$this.CheckMail($(Element), $(Element).val());
						}
					}
				},
				CheckID     : function(Element, ID) {
					var CountyCode = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'W', 'Z', 'I', 'O');
					var Multiply   = new Array(1, 9, 8, 7, 6, 5, 4, 3, 2, 1);
					var Nums       = new Array(2);
					var Total      = 0;
					var RegExps    = /^[a-z](1|2)\d{8}$/i;
					var CountyEN , FirstNum , LastNum;

					if ( ID.search(RegExps) == -1 ) {
						console.log(0);
						return false;
					} else {
						CountyEN = ID.charAt(0).toUpperCase();
						LastNum  = ID.charAt(9);
					}

					for ( var i = 0 ; i < 26 ; i ++ ) {
						if ( CountyEN === CountyCode[i] ) {
							FirstNum = i + 10;
							Nums[0]  = Math.floor( FirstNum / 10 );
							Nums[1]  = FirstNum - ( Nums[0] * 10 );
							break;
						} 
					}

					for( var i = 0 ; i < Multiply.length ; i ++ ) {
						if ( i < 2 ) {
							Total += Nums[i] * Multiply[i];
						} else {
							Total += parseInt( ID.charAt( i - 1 ) ) * Multiply[i];
						}
					}

					if ( ( 10 - ( Total % 10 ) ) !== parseInt(LastNum , 10) ) {
						return false;
					}

					return true;
				},
				CheckTel    : function(Element, Tel) {
					if(/^09[0-9]{8}$/.test(Tel)) {
						$(Element).parent().removeClass('error');
					} else {
						$(Element).parent().addClass('error').find('.warning').text($(Element).parent().data('error'));
					}
				},
				CheckMail   : function(Element, mail) {
					var _mailArr = mail.split('@');

					if (_mailArr.length === 1 || _mailArr[0] === '' || _mailArr[1] === '') {
						$(Element).parent().addClass('error').find('.warning').text($(Element).parent().data('error'));
					} else {
						$(Element).parent().removeClass('error');
					}
				}
			},
			Box          : {
				Open : function() {
					var $this = this;

					Projects.Factory.B.addClass('show-box');
					$this.OffClick();
				},
				Close : function() {
					Projects.Factory.B.removeClass('show-box');
				},
				OffClick : function() {
					var $this = this;

					Projects.Factory.D.on('click' , function(e){
						e.stopPropagation();

						if ( ! jQuery(e.target).is('.m-lightbox , .m-lightbox * , .jq-submit , .jq-submit *')) {
							$this.Close();
						}
					});
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