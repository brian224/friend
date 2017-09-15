(function (window , document , jQuery , undefined) {
    'use strict';

    var projects = new factory();

    function factory() {
        this.$w      = jQuery(window);
        this.$d      = jQuery(document);
        this.$hb     = jQuery('html , body');
        this.$b      = jQuery('body');
        this._ORIGIN = /^file\:\/\/\//.exec(window.location.href) ? '' : ( /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i.exec(window.location.href)[0] );
        this._HREF   = window.location.href;
        this._EVENTS = 'click touchstart';
        this._ISMAC  = navigator.platform.match(/Mac/i) ? true : false;
        this._browsers = {
            'msie'    : navigator.userAgent.match(/(msie|trident(?=\/))\/?\s*(\d+)/i) ? true : false,
            'edge'    : navigator.userAgent.match(/(Edge(?=\/))\/?\s*(\d+)/i) ? true : false,
            'chrome'  : navigator.userAgent.match(/(chrome(?=\/))\/?\s*(\d+)/i) ? true : false,
            'safari'  : navigator.userAgent.match(/(safari(?=\/))\/?\s*(\d+)/i) ? true : false,
            'firefox' : navigator.userAgent.match(/(firefox(?=\/))\/?\s*(\d+)/i) ? true : false,
            'opera'   : navigator.userAgent.match(/(opera(?=\/))\/?\s*(\d+)/i) ? true : false,
            'version' : null
        };
    };

    /* Animationend */
    factory.prototype.animationend = function() {
        if ( /Android|webOS|iPad|BlackBerry/i.test(navigator.userAgent) ) {
            return 'webkitAnimationEnd webkitTransitionEnd';
        } else {
            return 'animationend transitionend';
        }
    };

    /* input event */
    factory.prototype.eventInput = function() {
        if ( projects.browsers() === 'MSIE 8' ) {
            return 'propertychange input';
        } else {
            return 'input';
        }
    };

    /* IE8 & iE9 placeholder */
    factory.prototype.placeholder = function(){
        if ( jQuery.fn.placeholder ) {
            var $input = document.createElement('input');
            var _placeholder = ('placeholder' in $input);

            if ( ! _placeholder && jQuery('[placeholder]').length !== 0 ) {
                jQuery('[placeholder].jQ-placeholder').placeholder();
            }
        }
    };

    /* get device ( PC or Tablet or Mobile )  */
    factory.prototype.device = function() {
        if ( projects.$w.width() < 768 && /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return 'Mobile';
        } else {
            if ( /Android|webOS|iPad|BlackBerry/i.test(navigator.userAgent) ) {
                return 'Tablet';
            } else {
                return 'PC';
            }
        }
    };

    /* get browsers */
    factory.prototype.browsersVersion = function(){
        var _useragent = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        var _tem;

        if( /trident/i.test( _useragent[1] ) ){
            _tem = /\brv[ :]+(\d+)/g.exec( navigator.userAgent ) || [];
            return projects._browsers.version = (Number(_tem[1]) || '');
        }
        
        if( _useragent[1] === 'Chrome' ){
            _tem = navigator.userAgent.match( /\b(OPR|Edge)\/(\d+)/ );
            if ( _tem != null ) {
                return projects._browsers.version = _tem[2];

                if ( _tem.slice(1).join(' ').match( /\b(OPR)\/(\d+)/ ) ) return projects._browsers.version = _tem.slice(1).join(' ').replace('OPR', 'Opera');
            } 
        }

        _useragent = _useragent[2] ? [ _useragent[1] , _useragent[2] ]: [ navigator.appName , navigator.appVersion , '-?' ];

        if ( ( _tem = navigator.userAgent.match( /version\/(\d+)/i ) ) != null ) _useragent.splice(1 , 1 , _tem[1]);
            return projects._browsers.version = Number(_useragent[1]);
    }();

    /* ajax init */
    // factory.prototype.ajax = function(url , success , complete , erroe , element) {
    //     var _type          = /[?&]type=([^&#]*)/.exec(url) ? ( /[?&]type=([^&#]*)/.exec(url)[1] ) : 'POST',
    //         _url           = /^((?!(\?|\&)callback=).)*/.exec(url)[0],
    //         _dataType      = /[?&]dataType=([^&#]*)/.exec(url) ? ( /[?&]dataType=([^&#]*)/.exec(url)[1] ) : 'script',
    //         _data          = /[?&]data=([^&#]*)/.exec(url) ? ( /[?&]data=([^&#]*)/.exec(url)[1] ) : '',
    //         _jsonpCallback = /[?&]callback=([^&#]*)/.exec(url) ? ( ( /[?&]callback=([^&#]*)/.exec(url)[1] ) !== '?' ? ( /[?&]callback=([^&#]*)/.exec(url)[1] ) : 'Sugarfun_' + new Date().getTime() ) : null;
    //     var _function      = null;

    //     if ( _data.indexOf('[object Object]') !== -1 ) {
    //         alert('data format error \n try JSON.stringify(data)');
    //     } else {
    //         if ( _url ) {
    //             if ( _type.toUpperCase() === 'POST' ) {
    //                 _function = jQuery.post;
    //             } else if ( _type.toUpperCase() === 'GET' ) {
    //                 _function = jQuery.get;
    //             } else if ( _type.toUpperCase() === 'getScript' ) {
    //                 _function = jQuery.getScript;
    //             }
    // 
    //             _function(_url , JSON.parse(_data) , function(data){
    //                 if ( success && typeof(success) === 'function' ) {
    //                     success(data , element);
    //                 }
    //             }).always(function(data){
    //                 if ( complete && typeof(complete) === 'function' ) {
    //                     complete(data , element);
    //                 }
    //             }).fail(function(jqXHR, textStatus, errorThrown){
    //                 if ( erroe && typeof(erroe) === 'function' ) {
    //                     erroe(jqXHR, textStatus, errorThrown);
    //                 }
    //             })
    //         }
    //     }
    // }

    factory.prototype.documentOff = function(cName , func) {
        projects.$d.off(projects._EVENTS).on(projects._EVENTS , function(e){
            e.stopPropagation();
            if ( ! jQuery( e.target ).is(cName) ) {
                if ( typeof(func) === 'function' ) {
                    func();
                } else {
                    eval(func);
                }

                projects.$d.off(projects._EVENTS);
            }
        });
    };

    /* tab */
    factory.prototype.tab = jQuery.tab = function () {
        projects.tab.init.apply( this , arguments );
    };

    jQuery.extend( projects.tab , {
        _defaults : {
            stopClass     : null,
            slideClass    : null,
            activeClass   : null,
            activedClass  : null,
            frame         : null,
            body          : null,
            button        : null,
            bar           : null,
            _isAnimateEnd : true,
        },
        _DELAY : 100,
        _group : {},
        init : function(group , opts) {
            if ( ! group || jQuery(group.frame).length === 0 ) {
                return;
            }

            if ( ! $.isArray(group) ) {
                group = projects.isQuery(group) ? $(group).get() : [group];
            }

            $.each( group , function( i , element ) {
                var obj = {};

                obj = element;
                group[ i ] = obj;
                // console.log(i);
            });

            projects.tab.opts   = $.extend(true , {} , projects.tab._defaults , opts);
            projects.tab._group = group;

            // return projects.tab.bar();

            return projects.tab.start();
        },
        bar : function(coming, index) {
            if ( coming.bar ) {
                var _parent = jQuery(coming.frame).eq(index).find(coming.button).parent('.'+ coming.activeClass +'');

                var _left   = _parent.position().left,
                    _width  = _parent.outerWidth();

                if ( jQuery(coming.bar).eq(index).length === 0 ) {
                    return;
                }

                jQuery(coming.frame).eq(index).find(coming.bar).css({
                    'left'  : _left,
                    'width' : _width
                });

                jQuery(coming.frame).eq(index).attr('data-ready', 1);
            }
        },
        start : function() {
            var _coming = {},
                _obj;
            var _animateTimes = null;

            _obj = projects.tab._group[0] || null;

            if ( ! _obj ) {
                return false;
            }

            _coming = $.extend(true , {} , projects.tab.opts , _obj);

            
            _animateTimes = ( (parseFloat(jQuery(_coming.body).css('transitionDuration') , 10) * 1000) + 100 );
            projects.tab.addData(_coming);


            for (var i = 0, $tab = jQuery(_coming.frame); i < $tab.length; i++) {

                projects.tab.bar(_coming, i);
                $tab.eq(i).find(_coming.button).data('parent-index', i);

                $tab.eq(i).find(_coming.button).off('click').on('click' , function(e){
                    var $self         = jQuery(this);
                    var _setTime      = null;

                    e.preventDefault();

                    if ( ! _coming._isAnimateEnd ) return false;

                    _coming._isAnimateEnd = false;

                    $self.parent().addClass(_coming.activeClass).siblings().removeClass(_coming.activeClass);
                    projects.tab.bar(_coming, $self.data('parent-index'));
                    projects.tab.animate($self , _coming , false);

                    _setTime = setTimeout(function(){
                        _coming._isAnimateEnd = true;
                        window.clearTimeout(_setTime);
                    } , _animateTimes);

                    if ( typeof(_coming.click) === 'function' ) {
                        eval(_coming.click)($self , _animateTimes);
                    }

                    if ( $self.data('click') ) {
                        eval($self.data('click'))($self , _animateTimes);
                    }
                });
            }

            
        },
        ctrlClass : function(element , activeClass , activedClass , indexArray) {
            element.removeClass(''+activeClass+' '+activedClass+'');
            element.eq(indexArray[0]).addClass(activedClass);
            element.eq(indexArray[1]).addClass(activeClass);
        },
        addData : function(coming) {
            for ( var i = 0 , $frame = jQuery(coming.frame) ; i < $frame.length ; i ++ ) {
                for ( var j = 0 , $button = $frame.eq(i).find(coming.button) ; j < $button.length ; j ++ ) {
                    $button.eq(j).data('index' , j);
                    // console.log($button.eq(j).data('index'));
                    if ( $frame.eq(i).find(coming.button).eq(j).parent().hasClass(coming.activeClass) ) {
                        $frame.eq(i).data('active-arr' , ''+j+' , '+j+'');
                    }
                }
            }
        },
        animate : function(element , coming , addData) {
            var $frame       = element.parents(coming.frame),
                $body        = $frame.find(coming.body);
            var _regexActive = null;
            var _setTimeout  = null;
            var _activeArr   = null;
            var _times       = (parseFloat($body.css('transitionDuration') , 10) * 1000);

            if ( typeof($frame[0]) === 'undefined' ) return false;

            if ( addData !== false ) {
                projects.tab.addData(coming);
            }

            _regexActive = /\w+$/.exec($frame.data('active-arr'))[0];

            $frame.removeData('active-arr').data('active-arr' , ''+_regexActive+' , '+ ( ( addData !== false ) ? _regexActive : element.data('index') ) +'');

            _activeArr = [(jQuery.trim($frame.data('active-arr').split(',')[0]) | 0) , (jQuery.trim($frame.data('active-arr').split(',')[1]) | 0)];

            $body.find('> *').removeClass(''+coming.activeClass+' '+coming.activedClass+'');
            $body.find('> *').eq(_activeArr[0]).addClass(coming.activedClass);
            $body.find('> *').eq(_activeArr[1]).addClass(coming.activeClass);

            if ( _activeArr[1] > _activeArr[0] ) {
                $body.addClass(coming.slideClass);

                _setTimeout = setTimeout(function(){
                    if ( $body.hasClass(coming.slideClass) ) {
                        $body.addClass(coming.stopClass).delay(projects.tab._DELAY).queue(function(){
                            $body.removeClass(coming.slideClass);
                            $body.dequeue();
                            _activeArr[0] = _activeArr[1];
                            projects.tab.ctrlClass($body.find('> *') , coming.activeClass , coming.activedClass , _activeArr);
                        }).delay(projects.tab._DELAY).queue(function(){
                            $body.removeClass(coming.stopClass);
                            $body.dequeue();
                            window.clearTimeout(_setTimeout);
                        });
                    }
                } , _times);
            } else if ( _activeArr[1] < _activeArr[0] ) {
                $body.addClass(''+coming.stopClass+' '+coming.slideClass+'').delay(0).queue(function(){
                    $body.removeClass(''+coming.stopClass+' '+coming.slideClass+'');
                    $body.dequeue();

                    _setTimeout = setTimeout(function(){
                        _activeArr[0] = _activeArr[1];
                        projects.tab.ctrlClass($body.find('> *') , coming.activeClass , coming.activedClass , _activeArr);
                        window.clearTimeout(_setTimeout);
                    } , _times);
                });
            }
        }
    });

    /* owlCarousel */
    factory.prototype.owlCarousel = function(element) {
        if ( jQuery.fn.owlCarousel ) {
            if ( jQuery(element).length !== 0 ) {
                jQuery(element).each(function(i , elem){
                    var $owl         = jQuery(elem);
                    var _items       = $owl.find('> *').length;
                    var _arrowClass  = ( $owl.data('ctrl-class') ? $owl.data('ctrl-class') : 'm-owl' ),
                        _arrowCtrl   = '<div class="'+ _arrowClass +'-arrow-ctrl"><button class="'+ _arrowClass +'-arrow is-prev">'+ ( $owl.data('prev') ? $owl.data('prev') : '' ) +'</button><button class="'+ _arrowClass +'-arrow is-next">'+ ( $owl.data('next') ? $owl.data('next') : '' ) +'</button></div>';
                    var $arrowPrev   = null,
                        $arrowNext   = null;
                    var setIntervals = null;
                    var _prev        = null,
                        _this        = null;
                    var hasArrow     = function() {
                        if ( $owl.data('arrow') === true || 
                            ( $owl.data('arrow-md') === true && projects.device() === 'PC' ) ||
                            ( $owl.data('arrow-sm') === true && projects.device() === 'Tablet' ) ||
                            ( $owl.data('arrow-xs') === true && projects.device() === 'Mobile' )
                        ) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    arrow = function() {
                        if ( hasArrow() ) {
                            if ( $owl.next('.'+ _arrowClass +'-arrow-ctrl').length === 0 ) {
                                $owl.after(_arrowCtrl);
                            }
                            
                            $arrowPrev = $owl.next().find('.' + _arrowClass + '-arrow.is-prev'),
                            $arrowNext = $owl.next().find('.' + _arrowClass + '-arrow.is-next');

                            // if ( $owl.data('loop') !== true ||  ) {
                            projects.owlArrowHide($owl , $arrowPrev , $arrowNext);
                            // }

                            $arrowPrev.on('click' , function(){
                                projects.owlPrev($owl);
                            });

                            $arrowNext.on('click' , function(){
                                projects.owlNext($owl);
                            });
                        } else {
                            if ( $owl.next('.'+ _arrowClass +'-arrow-ctrl').length !== 0 ) {
                                $owl.next('.'+ _arrowClass +'-arrow-ctrl').remove();
                            }
                        }
                    };

                    $owl.owlCarousel({
                        animateIn  : $owl.data('animate-in') ? $owl.data('animate-in') : projects.device() === 'PC' ? $owl.data('animate-in-md') : projects.device() === 'Tablet' ? $owl.data('animate-in-sm') : projects.device() === 'Mobile' ? $owl.data('animate-in-xs') : false,
                        animateOut : $owl.data('animate-out') ? $owl.data('animate-out') : projects.device() === 'PC' ? $owl.data('animate-out-md') : projects.device() === 'Tablet' ? $owl.data('animate-out-sm') : projects.device() === 'Mobile' ? $owl.data('animate-out-xs') : false,
                        mouseDrag  : projects.device() !== 'PC' ? ( $owl.data('mouse-drag') !== false ) ? true : false : false,
                        touchDrag  : ( $owl.data('touch-drag') !== false ) ? true : false,
                        pullDrag   : ( $owl.data('pull-drag') !== false ) ? true : false,
                        center     : ( $owl.data('center') !== true ) ? false : true,
                        loop       : ( $owl.find('> *').length > 1 ) ? ( ( $owl.data('loop') !== true ) ? false : true ) : false,
                        nav        : false,
                        responsive : {
                            0 : {
                                items : $owl.data('items') !== undefined ? $owl.data('items') : ( ( $owl.data('items-xs') | 0 ) > 0 ) ? ( $owl.data('items-xs') | 0 ) : 1,
                                nav   : ( ( $owl.data('ctrl') === true || $owl.data('ctrl-xs') === true ) ? ( $owl.data('items-xs') !== undefined ? ( _items > $owl.data('items-xs') ? true : false ) : ( _items > 1 ? true : false ) ) : false ),
                                dots  : _items > 1 ? ( $owl.data('dots') !== undefined ? $owl.data('dots') : ( $owl.data('dots-xs') !== false ) ? true : false ) : false,
                                autoplay  : ( $owl.data('autoplay') !== true ) ? ( $owl.data('autoplay-xs') ? $owl.data('autoplay-xs') : false ) : true
                            },
                            768 : {
                                items : $owl.data('items') !== undefined ? $owl.data('items') : ( ( $owl.data('items-sm') | 0 ) > 0 ) ? ( $owl.data('items-sm') | 0 ) : 1,
                                nav   : ( ( $owl.data('ctrl') === true || $owl.data('ctrl-sm') === true ) ? ( $owl.data('items-sm') !== undefined ? ( _items > $owl.data('items-sm') ? true : false ) : ( _items > 1 ? true : false ) ) : false ),
                                dots  : _items > 1 ? ( $owl.data('dots') !== undefined ? $owl.data('dots') : ( $owl.data('dots-sm') !== false ) ? true : false ) : false,
                                autoplay  : ( $owl.data('autoplay') !== true ) ? ( $owl.data('autoplay-sm') ? $owl.data('autoplay-sm') : false ) : true
                            },
                            1000 : {
                                items : $owl.data('items') !== undefined ? $owl.data('items') : ( $owl.data('items-md') !== undefined ? ( ( $owl.data('items-md') | 0 ) > 0 ) ? ( $owl.data('items-md') | 0 ) : 1 : 1 ),
                                nav   : ( ( $owl.data('ctrl') === true || $owl.data('ctrl-md') === true ) ? ( $owl.data('items-md') !== undefined ? ( _items > $owl.data('items-md') ? true : false ) : ( _items > 1 ? true : false ) ) : false ),
                                dots  : _items > 1 ? ( $owl.data('dots') !== undefined ? $owl.data('dots') : ( $owl.data('dots-md') !== false ) ? true : false ) : false,
                                autoplay           : ( $owl.data('autoplay') !== true ) ? ( $owl.data('autoplay-md') ? $owl.data('autoplay-md') : false ) : true
                            }
                        },
                        lazyLoad           : ( $owl.data('img-load') !== true ) ? false : true,
                        autoplayTimeout    : $owl.data('timeout') ? $owl.data('timeout') : 5000,
                        navContainerClass  : $owl.data('ctrl-class') ? $owl.data('ctrl-class') + '-ctrl' : 'm-owl-ctrl',
                        dotsClass          : $owl.data('ctrl-class') ? $owl.data('ctrl-class') + '-dots' : 'm-owl-dots ' + ( $owl.data('dots-position') !== 'relative' ? 'is-absolute' : 'is-relative') + '',
                        dotClass           : $owl.data('ctrl-class') ? $owl.data('ctrl-class') + '-dot' : 'm-owl-dot',
                        centerClass        : $owl.data('ctrl-class') ? $owl.data('ctrl-class') + '-center' : 'm-owl-center',
                        startPosition      : ( ( $owl.data('start-position') | 0 ) > 0 ) ? ( $owl.data('start-position') | 0 ) : 0,
                        autoplayHoverPause : projects.device() === 'PC' ? ( ( $owl.data('hover-pause') !== true ) ? false : true ) : false
                    });

                    arrow();

                    $owl.on('resized.owl.carousel' , function(e){
                        arrow();
                    }).on('translated.owl.carousel' , function(e){
                        var $self = jQuery(this);

                        if ( $self.data('loop') ) {
                            _prev = (_this ? _this : ( e.item.index - 1 ));
                            _this = e.item.index;
                        } else {
                            _prev = (_this ? _this : ( e.item.index - 1 ));
                            _this = e.item.index;
                        }

                        if ( $self.find('.owl-item > *').eq(_prev).is('[data-media]') ) {
                            projects.owlMediaPlay($owl , _prev , 'prev');
                        }

                        if ( $self.find('.owl-item > *').eq(_this).is('[data-media]') ) {
                            projects.owlMediaPlay($owl , _this);

                            if ( $self.data('autoplay') ) {
                                var _url      = $self.find('.owl-item > *').eq(_this).attr('data-media'),
                                    _autoplay = ( /autoplay\=/.test(_url) ? ( ( ( /autoplay\=([^?&#]*)/.exec(_url)[1] ) | 0 ) === 1 ? true : false ) : false );

                                if ( _autoplay ) {
                                    projects.owlStop($self);
                                }

                            }
                        }
                    });
                });

                projects.owlMediaInit(element);
            }
        }
    };

    factory.prototype.owlMediaInit = function(element) {
        var setTime = null;

        projects.mediaInit(function(){
            jQuery(element).each(function(i , elem){
                var $owl = jQuery(elem);
                var _eq  = $owl.find('.owl-item.active > *').attr('data-media') ? $owl.find('.owl-item.active').index() : null;

                if ( _eq ) {
                    window.clearTimeout(setTime);

                    $owl.find('.m-youtube:eq('+ _eq +') > iframe').load(function(){
                        setTime = setTimeout(function(){
                            projects.owlMediaPlay($owl , _eq);
                        } , 250);
                    });
                }

            });
        });
    }

    factory.prototype.owlMediaPlay = function(element , eq , type) {
        var _url      = element.find('.owl-item > *').eq(eq).attr('data-media'),
            _idx      = ( /index\=([^?&#]*)/.exec(_url)[1] | 0 ),
            _autoplay = ( /autoplay\=/.test(_url) ? ( ( ( /autoplay\=([^?&#]*)/.exec(_url)[1] ) | 0 ) === 1 ? true : false ) : false );

        if ( type !== 'prev' ) {
            if ( _autoplay ) {
                projects._media._player[_idx].playVideo();
            } else {
                projects._media._player[_idx].pauseVideo();
            }
        } else {
            projects._media._player[_idx].pauseVideo();
        }
    };

    factory.prototype.owlArrowHide = function(element , arrowPrev , arrowNext) {
        var $stageOuter  = element.find('.owl-stage-outer'),
            $stage       = element.find('.owl-stage');
        var _items       = null,
            _elemWidth   = null,
            // _offsetWidth = null,
            // _scrollWidth = null,
            _stageWidth  = null,
            // _scrollbar   = null,
            _position    = 0;
        var _HIDE        = 'b-hide';
        var arrowHide = function() {
            _items       = $stage.find('.owl-item').length;
            _elemWidth   = typeof(document.body.getBoundingClientRect) === 'object' ? element.width() : Math.ceil(element[0].getBoundingClientRect().width);
            // _offsetWidth = ( Math.round( element.outerWidth() ) | 0 ) - ( parseInt(element.css('padding-left') , 10) + parseInt(element.css('padding-right') , 10) );
            // _scrollWidth = ( Math.round( element[0].scrollWidth ) | 0 ) - ( parseInt(element.css('padding-left') , 10) + parseInt(element.css('padding-right') , 10) );
            _stageWidth  = ( $stage.outerWidth() | 0 );
            // _scrollbar   = (( $stage.find('.owl-item').outerWidth() | 0 ) * $stage.find('.owl-item.active').length) - ( $stageOuter.outerWidth() | 0 );
            // _scrollbar = function() {
            //     var _width = 0;

            //     for ( var i = 0 , $elem = $stage.find('.owl-item'); i < $elem.length; i ++ ) {
            //         _width += ($elem.eq(i).outerWidth());
            //     }

            //     return ( _width - ( $stageOuter.outerWidth() | 0 ) );
            // };
            _position = ( ( Math.round( $stage.position().left ) | 0 ) ) === 0 ? 0 : ( ( Math.round( $stage.position().left ) | 0 ) * (-1) );


            if ( _position !== 0 ) {
                if ( arrowPrev.hasClass(_HIDE) ) {
                    arrowPrev.removeClass(_HIDE);
                }
            } else {
                if ( ! arrowPrev.hasClass(_HIDE) ) {
                    arrowPrev.addClass(_HIDE);
                }
            }

            if ( ( _stageWidth <= _elemWidth ) || ( ( _elemWidth + _position ) === _stageWidth ) ) {
                if ( ! arrowNext.hasClass(_HIDE) ) {
                    arrowNext.addClass(_HIDE);
                }
            } else {
                if ( arrowNext.hasClass(_HIDE) ) {
                    arrowNext.removeClass(_HIDE);
                }
            }
        };

        arrowHide();

        element.on('resized.owl.carousel , translated.owl.carousel' , function(e){
            arrowHide();
        });

        projects.owlEvents(element , 'resized.owl.carousel , translated.owl.carousel' , function(){
            arrowHide();
        })
    };

    factory.prototype.owlEvents = function(element , onEvents , callback) {
        var $elem = element;
        if ( typeof(element) === 'string' ) {
            $elem = jQuery(element);
        }
        $elem.on(onEvents , function(e){
            if ( typeof(callback) === 'function' ) {
                callback(e);
            } else if ( typeof(callback) === 'string' ) {
                eval(callback);
            }
        });
    };

    factory.prototype.owlPrev = function(element) {
        var $elem = element;
        if ( typeof(element) === 'string' ) {
            $elem = jQuery(element);
        }
        $elem.trigger('prev.owl.carousel');
    };

    factory.prototype.owlNext = function(element) {
        var $elem = element;
        if ( typeof(element) === 'string' ) {
            $elem = jQuery(element);
        }
        $elem.trigger('next.owl.carousel');
    };

    factory.prototype.owlStop = function(element) {
        var $elem = element;
        if ( typeof(element) === 'string' ) {
            $elem = jQuery(element);
        }
        $elem.trigger('stop.owl.autoplay');
    };

    factory.prototype.owlPlay = function(element) {
        var $elem = element;
        if ( typeof(element) === 'string' ) {
            $elem = jQuery(element);
        }
        $elem.trigger('play.owl.autoplay');
    };

    factory.prototype.owlGoto = function(element , position , speed) {
        var $elem = element;
        if ( typeof(element) === 'string' ) {
            $elem = jQuery(element);
        }
        $elem.trigger('to.owl.carousel', [position , ( speed ? speed : 500 ) , true]);
    };

    /* validate */
    factory.prototype.validate = function(object) {
        if ( jQuery.fn.validate ) {
            var _settings = null;

            projects.addMethod();

            if ( object && typeof(object.selfMethod) === 'function' ) {
                object.selfMethod.call();
            }

            for ( var i = 0 , $forms = jQuery('form') ; i < $forms.length ; i ++ ) {
                $forms.eq(i).validate({
                    errorClass : ( object && object.errorClass ) ? object.errorClass : 'is-error',
                    validClass : ( object && object.validClass ) ? object.validClass : 'is-success',
                    onkeyup    : function(element) {
                        if ( object && typeof(object.event) === 'string' && object.event === 'keyup' ) {
                            jQuery(element).valid();
                        } else if ( object && typeof(object.event) === 'object' ) {
                            for ( var i = 0 ; i < object.event.length; i ++ ) {
                                if ( object.event[i] === 'keyup' ) {
                                    jQuery(element).valid();
                                }
                            }
                        }
                    },
                    onfocusout : function(element) {
                        if ( object && typeof(object.event) === 'string' && object.event === 'focusout' ) {
                            jQuery(element).valid();
                        } else if ( object && typeof(object.event) === 'object' ) {
                            for ( var i = 0 ; i < object.event.length; i ++ ) {
                                if ( object.event[i] === 'focusout' ) {
                                    jQuery(element).valid();
                                }
                            }
                        }
                    }
                });

                _settings = $forms.eq(i).data('validator').settings;

                _settings.submitHandler = function(form) {
                    if ( jQuery(form).data('submit') ) {
                        eval(jQuery(form).data('submit'))(form);
                        return false;
                    } else {
                        form.submit();
                        return false;
                    }
                }
            }
        }
    };

    factory.prototype.addMethod = function() {
        /* chinese checked */
        jQuery.validator.addMethod('chinese' , function (value, elem, params) {
            var _chinese = /^[\u4E00-\u9FA5]+$/;
            return this.optional(elem) || ( _chinese.test(value) );
        });

        /* phone checked */
        jQuery.validator.addMethod('phone' , function (value, elem, params) {
            var _phone = /^09[0-9]{8}$/;
            return this.optional(elem) || ( _phone.test(value) );
        });

        /* idcard checked */
        jQuery.validator.addMethod('idcard' , function (value, elem, params){
            var _countyCode = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
            var _enSort     = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
            var _numSort    = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5);
            var _multiply   = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);
            
            if ( value.length != 10 ) return false;

            var _index = _countyCode.indexOf( value.charAt(0) );
            
            if ( _index === -1 ) return false;

            var _sum = _enSort[_index] + ( _numSort[_index] * 9 );

            for(var i = 1 ; i < 10 ; i ++ ) {
                var _v = parseInt( value.charAt(i) );

                if ( isNaN(_v) ) return false;

                _sum = _sum + ( _v * _multiply[i] );
            }
            
            if ( _sum % 10 != 0 ) return false;
            
            return true;
        });

        /* either checked */
        jQuery.validator.addMethod('either' , function (value, elem, params){
            var _group   = /either in \w+/.exec(jQuery(elem).attr('class'))[0].replace(/ /g , '.');
            var _elem = jQuery('.' + _group);
            var _length  = 0;
            // var _input   = false;

            for ( var i = 0 ; i < _elem.length ; i ++ ) {
                if ( _elem.eq(i).val() === '' ) {
                    _length ++;
                }
            };

            return (_elem.length !== _length);
        });

        jQuery.validator.addClassRules({
            'chinese' : {
                chinese : true
            },
            'phone' : {
                phone : true
            },
            'idcard' : {
                idcard : true
            },
            'either' : {
                either : true
            }
        });
    };

    /* youtube */
    factory.prototype._media  = {
        _length   : 0,
        _id       : null,
        _player   : [],
        _idArray  : [],
        $media    : null,
        _autoplay : null
    };

    factory.prototype.mediaSet = function() {
        projects._media._orientation = ( projects.$w.width() > projects.$w.height() ) ? 'landscape' : 'portrait';
        projects._media._scale       = projects._media._orientation === 'portrait' ? (9 / 16) : (16 / 9);
    };

    factory.prototype.mediaInit = function(callback) {
        var setIntervals = null;

        projects.mediaSet();
        projects.u2bPlayer();

        setIntervals = setInterval(function(){
            if ( window.YT ) {
                window.clearInterval(setIntervals);

                projects._media.$media = ( jQuery('[data-media]').length !== 0 ) ? jQuery('[data-media]') : null;

                if ( projects._media.$media ) {
                    projects._media.$media.each(function(i , elem) {
                        var $elem       = jQuery(elem);
                        var _data       = null;
                        var _opacity    = ( /opacity\=/.test($elem.attr('data-media')) ? ( ( /opacity\=([^?&#]*)/.exec($elem.attr('data-media'))[1] ) | 0 ) : 0 ),
                            _absolute   = ( /absolute\=/.test($elem.attr('data-media')) ? ( ( /absolute\=([^?&#]*)/.exec($elem.attr('data-media'))[1] ) | 0 ) : 0 ),
                            _fullscreen = ( /fullscreen\=/.test($elem.attr('data-media')) ? ( ( /fullscreen\=([^?&#]*)/.exec($elem.attr('data-media'))[1] ) | 0 ) : 0 );
                        var _closest    = $elem.find($elem.data('elem')) || $elem.next($elem.data('elem')) || $elem.parent().find($elem.data('elem')),
                            _elem       = $elem.data('elem') ? _closest : $elem,
                            _elemHeight = _fullscreen ? ( $elem.data('elem') ? ( _elem.parent().height() + 'px' ) : ( _elem.height() + 'px' ) ) : '100%',
                            _elemWidth  = _fullscreen ? ( $elem.data('elem') ? ( _elem.parent().width() + 'px' ) : ( _elem.width() + 'px' ) ) : '100%',
                            _top        = _fullscreen ? ( projects._media._orientation === 'landscape' ? ( ( ( _elemHeight  - _elem.width() ) /  2 ) + 'px' ) : '0px' ) : '0px',
                            _left       = _fullscreen ? ( ( ( _elem.width() / _elemHeight ) <= projects._media._scale ) ? ( ( ( ( _elem.width() - ( _elem.width() / ( _elemHeight / _elem.width() ) ) ) / 2 ) | 0 ) + 'px' ) : '0px' ) : '0px',
                            _width      = _fullscreen ? ( ( ( _elem.width() / _elemHeight ) <= projects._media._scale ) ? ( ( ( _elem.width() / ( _elemHeight / _elem.width() ) ) | 0 ) + 'px' ) : '100%' ) : '100%',
                            _height     = _fullscreen ? ( projects._media._orientation === 'landscape' ? ( _elem.width() + 'px' ) : '100%' ) : '100%';

                        var _youtube = '<div class="m-youtube' + ( _opacity === 0 ? ' is-opacity' : '' ) +''+ ( _absolute === 1 ? ' is-absolute' : '' ) +'" style="width: '+_elemWidth+'; height: '+_elemHeight+';overflow: hidden;"><span id="m-youtube-'+i+'" class="m-youtube-append" style="top: '+ _top +'; height: '+_height+'; width: '+_width+'; left: '+_left+'; position : absolute;"></span></div>';

                        _data = $elem.data('media');
                        $elem.attr('data-media' , ( _data + (( /\?/.test(_data) ) ? '&index='+i+'' : '?index='+i+'') ) );

                        if ( _elem.find('.m-youtube').length === 0 ) {
                            _elem.append(_youtube);

                            if ( /youtube/i.exec( $elem.data('media') )) {
                                projects.mediaAppend($elem , callback);
                            }
                        }
                    });

                    projects.mediaResize();
                }
            }
        } , 1);
    };

    factory.prototype.mediaResize = function() {
        var resize = function() {
            projects.mediaSet();

            for (var i = 0 ; i < projects._media.$media.length ; i ++ ) {
                var $elem       = projects._media.$media.eq(i);
                var _fullscreen = ( /fullscreen\=/.test($elem.attr('data-media')) ? ( ( /fullscreen\=([^?&#]*)/.exec($elem.attr('data-media'))[1] ) | 0 ) : 0 );
                var _closest    = $elem.find($elem.data('elem')) || $elem.next($elem.data('elem')) || $elem.parent().find($elem.data('elem')),
                    _elem       = $elem.data('elem') ? _closest : $elem,
                    _elemHeight = $elem.data('elem') ? _elem.parent().height() : _elem.height(),
                    _elemWidth  = $elem.data('elem') ? _elem.parent().width() : _elem.width(),
                    _top        = projects._media._orientation === 'landscape' ? ( ( _elemHeight - _elem.width() ) /  2 ) + 'px' : '0px',
                    _left       = ( ( _elem.width() / _elemHeight ) <= projects._media._scale ) ? ( ( ( ( _elem.width() - ( _elem.width() / ( _elemHeight / _elem.width() ) ) ) / 2 ) | 0 ) + 'px' ) : '0px',
                    _width      = ( ( _elem.width() / _elemHeight ) <= projects._media._scale ) ? ( ( ( _elem.width() / ( _elemHeight / _elem.width() ) ) | 0 ) + 'px' ) : '100%',
                    _height     = projects._media._orientation === 'landscape' ? ( _elem.width() + 'px' ) : '100%';

                if ( _fullscreen ) {
                    $elem.find('.m-youtube').css({
                        'width'  : _elemWidth,
                        'height' : _elemHeight
                    }).find('.m-youtube-append').css({
                        'top'    : _top,
                        'left'   : _left,
                        'width'  : _width,
                        'height' : _height
                    });
                }
            }
        }

        if( window.attachEvent ) {
            window.attachEvent('onresize', function() {
                resize();
            });
        } else if( window.addEventListener ) {
            window.addEventListener('resize', function() {
                resize();
            }, true);
        }
    };

    factory.prototype.u2bPlayer = function() {
        if ( ! window['YT'] ) {
            var YT = {
                loading : 0,
                loaded  : 0
            };
        }
        if ( ! window['YTConfig'] ) {
            var YTConfig = {
                'host': 'http://www.youtube.com'
            };
        }
        if ( ! YT.loading ) {
            YT.loading = 1;

            (function() {
                var l    = [];
                YT.ready = function(f) {
                    if ( YT.loaded ) {
                        f();
                    } else {
                        l.push(f);
                    }
                };
                
                window.onYTReady = function() {
                    YT.loaded = 1;
                    for ( var i = 0 ; i < l.length ; i ++ ) {
                        try {
                            l[i]();
                        } catch (e) {}
                    }
                };

                YT.setConfig = function(c) {
                    for ( var k in c ) {
                        if ( c.hasOwnProperty(k) ) {
                            YTConfig[k] = c[k];
                        }
                    }
                };

                var a = document.createElement('script');
                a.type  = 'text/javascript';
                a.id    = 'www-widgetapi-script';
                a.src   = 'https:' + '//s.ytimg.com/yts/jsbin/www-widgetapi-vfl_Bhgrs/www-widgetapi.js';
                a.async = true;
                var b = document.getElementsByTagName('script')[0];
                b.parentNode.insertBefore(a, b);
            })();
        }
    };

    factory.prototype.mediaAppend = function(element , callback) {
        var _url        = element.attr('data-media'),
            _id         = _url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i)[1],
            _idx        = /index\=/.test(_url) ? ( ( /index\=([^?&#]*)/.exec(_url)[1] ) | 0 ) : null,
            _owl        = ( /owl\=/.test(_url) ? ( ( /owl\=([^?&#]*)/.exec(_url)[1] ) | 0 ) : 0 ),
            _autoPlay   = ( /autoplay\=/.test(_url) ? ( ( /autoplay\=([^?&#]*)/.exec(_url)[1] ) | 0 ) : 0 ),
            _ctrls      = /controls\=/.test(_url) ? ( ( /controls\=([^?&#]*)/.exec(_url)[1] ) | 0 ) : 0,
            _showinfo   = /showinfo\=/.test(_url) ? ( ( /showinfo\=([^?&#]*)/.exec(_url)[1] ) | 0 ) : 0,
            _loop       = /loop\=/.test(_url) ? ( ( /loop\=([^?&#]*)/.exec(_url)[1] ) | 0 ) : 0,
            _mute       = /mute\=/.test(_url) ? ( ( /mute\=([^?&#]*)/.exec(_url)[1] ) | 0 ) : 0,
            _bgplay     = /bgplay\=/.test(_url) ? ( ( /bgplay\=([^?&#]*)/.exec(_url)[1] ) | 0 ) : 0;
        var ready       = element.data('ready'),
            stateChange = element.data('statechange');

        projects._media._id = 'm-youtube-' + _idx;

        projects._media._idArray.push({'id' : _id , 'bgplay' : _bgplay});
        
        if ( _autoPlay && projects._media._autoplay === null ) {
            projects._media._autoplay = true;
        } else if ( projects._media._autoplay ) {
            _autoPlay = 0;
        }

        if ( _owl ) {
            _autoPlay = 0;
        }

        projects._media._player.push(
            new YT.Player(projects._media._id , {
                width            : '100%',
                height           : '100%',
                videoId          : _id,
                suggestedQuality : 'highres',
                playerVars : {
                    autoplay       : _autoPlay,
                    controls       : _ctrls,
                    showinfo       : _showinfo,
                    loop           : _loop,
                    fs             : 0,
                    rel            : 0,
                    modestbranding : 1,
                    iv_load_policy : 1,
                    autohide       : 0,
                    start          : 0,
                    playsinline    : 0,
                    enablejsapi    : 1,
                    version        : 3,
                    playlist       : _id,
                    origin         : projects._ORIGIN + '/',
                    wmode          : 'transparent'
                },
                events: {
                    onReady : function(event) {
                        if ( _mute ) {
                            projects._media._player[_idx].mute();
                        }
                        if ( ready ) {
                            if ( typeof(ready) === 'function' ) {
                                ready.call(event);
                            } else if ( typeof(ready) === 'string' ) {
                                eval(ready);
                            }
                        }
                    },
                    onStateChange : function(event) {
                        var $owl         = jQuery('.m-youtube-append').eq(_idx).parents('.owl-loaded');
                        var _owlAutoPlay = $owl.data('autoplay');

                        // if ( event.data === 0 && ! _loop ) {
                            
                        // }

                        /* unstarted */
                        if ( event.data === -1 ) {
                            jQuery('#m-youtube-'+_idx+'').parent().addClass('is-opacity');
                            // for ( var i = 0 ; i < projects._media._idArray.length ; i ++ ) {
                            //     if ( _id === projects._media._idArray[i].id ) {
                            //     }
                            // }
                        }

                        /* playing */
                        if ( event.data === 1 ) {
                            for ( var i = 0 ; i < projects._media._player.length ; i ++ ) {
                                if ( i !== _idx && projects._media._idArray[i].bgplay === 0 ) {
                                    projects._media._player[i].pauseVideo();
                                }
                            }

                            if ( _owl && _owlAutoPlay ) {
                                projects.owlStop($owl);
                            }
                        }

                        /* paused */
                        if ( event.data === 2 ) {
                            var _currentTime = null;

                            for (var i = 0 ; i < projects._media._player.length ; i ++ ) {
                                if ( i === _idx ) {
                                    _currentTime = projects._media._player[i].getCurrentTime();

                                    if ( projects._media._idArray[i].bgplay === 0 ) {
                                        projects._media._player[i].seekTo(_currentTime).pauseVideo();
                                    }
                                }
                            }
                        }

                        /* buffering */
                        if ( event.data === 3 ) {
                            jQuery('#m-youtube-'+_idx+'').parent().removeClass('is-opacity');
                            // for ( var i = 0 ; i < projects._media._idArray.length ; i ++ ) {
                            //     if ( _id === projects._media._idArray[i].id ) {
                            //     }
                            // }
                        } 

                        /* ended */
                        if ( event.data === 0 ) {
                            if ( ! _loop ) {
                                projects._media._player[_idx].stopVideo();
                            }

                            if ( _owl && _owlAutoPlay ) {
                                projects.owlPlay($owl);
                            }
                        }

                        if ( stateChange ) {
                            if ( typeof(stateChange) === 'function' ) {
                                stateChange.call(event);
                            } else if ( typeof(stateChange) === 'string' ) {
                                eval(stateChange)(event);
                            }
                        }
                    }
                }
            })
        );

        projects._media._length += 1;
        

        if ( callback && projects._media._length === projects._media.$media.length ) {
            if ( typeof(callback) === 'function' ) {
                callback.call();
            } else if ( typeof(callback) === 'string' ) {
                eval(callback);
            }
        }
    };

    // factory.prototype.mediaRemove = function() {
    //     if ( jQuery(projects._media.$element).length !== 0 ) {
    //         jQuery(projects._media.$element).after('<span id="'+projects._media._id+'" class="'+projects._media._class+'" style="'+ projects._media._fullStyle +'"></span>').remove();
    //     }
    // };

    /* plugin isQuery function */
    factory.prototype.isQuery = function(obj) {
        return obj && obj.hasOwnProperty && obj instanceof $;
    };

    /* plugin accordion event */
    factory.prototype.accordion = jQuery.accordion = function () {
        projects.accordion.init.apply( this , arguments );
    };

    jQuery.extend( projects.accordion , {
        _defaults : {
            header        : null,
            content       : null,
            classEvent    : null,
            className     : null,
            siblingsClose : true,
            documentOff   : false,
            index         : 0
        },
        _group : {},
        _activeIndex : null,
        init : function(group , opts) {
            if ( ! group ) {
                return;
            }

            if ( ! $.isArray(group) ) {
                group = projects.isQuery(group) ? $(group).get() : [group];
            }

            $.each( group , function( i , element ) {
                var obj = {};

                obj = element;
                group[ i ] = obj;
            });

            projects.accordion.opts   = $.extend(true , {} , projects.accordion._defaults , opts);
            projects.accordion._group = group;

            return projects.accordion.click(projects.accordion.opts.index);
        },
        click : function(index) {
            var _coming = {},
                _regex,
                _obj,
                _elemName,
                _sfName = 'sf-accordion';

            _obj = projects.accordion._group[ index ] || null;

            if ( ! _obj ) {
                return false;
            }

            _coming = $.extend(true , {} , projects.accordion.opts , _obj);

            _regex    = ( typeof(_coming.content) === 'string' ? ( /(?![\.]|[\#]).*/.exec(_coming.content)[0] ) : ( _coming.content[0].className && ( _coming.content[0].className !== _coming.className ) ? _coming.content[0].className.split(' ')[0] + '-sf' : ( _coming.content[0].id ? _coming.content[0].id + '-sf' : _sfName ) ) );
            _elemName = ( typeof(_coming.content) === 'string' ? _coming.content : ( _coming.content[0].className && ( _coming.content[0].className !== _coming.className ) ? ( '.' + _coming.content[0].className.split(' ')[0] ) + '-sf' : ( _coming.content[0].id ? ( '#' + _coming.content[0].id ) + '-sf' : '.'+_sfName+'' ) ) );

            for ( var i = 0 , _headerArr = _coming.header.split(',') , $showeElem = ( typeof(_coming.content) === 'string' ? jQuery(_coming.content) : _coming.content ) ; i < _headerArr.length ; i ++ ) {
                for ( var j = 0 , $header = jQuery( jQuery.trim(_headerArr[i]) ) ; j < $header.length ; j ++ ) {
                    if ( $header.eq(j).hasClass(_coming.className) ) {
                        projects.accordion._activeIndex = j;
                    }

                    if ( typeof(_coming.content) === 'object' && $header.eq(j).next().length !== 0 && ! $header.eq(j).next()[0].className && ! $header.eq(j).next()[0].id ) {
                        $header.eq(j).next().addClass(_regex);
                    }

                    if ( ( $header.length > 1 && ( $header.eq(j).find($showeElem).length !== 0 ) || $header.eq(j).next().hasClass(_regex) ) || ( $header.length === $showeElem.length ) ) {
                        $header.eq(j).attr('data-index' , j);
                        if ( $header.eq(j).find($showeElem).length !== 0 ) {
                            $header.eq(j).find($showeElem).addClass(''+_regex+' '+(_regex + '-' +  j)+'');
                        } else if ( $header.eq(j).next().hasClass(_regex) ) {
                            $header.eq(j).next().addClass(''+_regex+' '+(_regex + '-' +  j)+'');
                        } else if ( $header.length === $showeElem.length ) {
                            $showeElem.eq(j).addClass(''+_regex+' '+(_regex + '-' +  j)+'');
                        }
                    } else if ( $header.length === 1 ) {
                        $header.eq(j).attr('data-index' , j);
                        jQuery($showeElem).addClass(''+_regex+' '+(_regex + '-' +  j)+'');
                    }
                };
            };

            jQuery(_coming.header).bind('click' , function(e){
                var $self   = this,
                    $jQSelf = jQuery($self);
                var _TIME   = 150;
                var _index  = $jQSelf.data('index');
                var _times  = ( ( parseFloat(jQuery(_elemName + '-' + _index).css('transition-duration') , 10) * 1000 ) + _TIME ) ||
                                ( ( parseFloat(jQuery(_elemName + '-' + _index).css('animation-duration') , 10) * 10000 ) + _TIME ) ||
                                _TIME,
                    timeout = null;

                if ( _index !== undefined ) {
                    if ( $self.nodeName === 'A' ) {
                        e.preventDefault();
                    }

                    clearTimeout(timeout);

                    if ( _coming.classEvent === 'toggle' ) {
                        if ( _coming.siblingsClose ) {
                            var _hasClass = $jQSelf.hasClass(_coming.className) ? true : false;
                            // if ( projects.accordion._activeIndex === _index && $jQSelf.hasClass(_coming.className) ) return;
                            jQuery(_coming.header).removeClass(_coming.className);
                            jQuery(_elemName).removeClass(_coming.className);
                            
                            if ( _hasClass ) {
                                $jQSelf.addClass(_coming.className);
                                jQuery(_elemName + '-' + _index).addClass(_coming.className);
                            }
                            $jQSelf.toggleClass(_coming.className);
                            jQuery(_elemName + '-' + _index).toggleClass(_coming.className);
                        } else {
                            $jQSelf.toggleClass(_coming.className);
                            jQuery(_elemName + '-' + _index).toggleClass(_coming.className);
                        }
                    } else if ( _coming.classEvent === 'add' && ! $jQSelf.hasClass(_coming.className) ) {
                        jQuery(_coming.header).removeClass(_coming.className);
                        jQuery(_elemName).removeClass(_coming.className);
                        $jQSelf.addClass(_coming.className);
                        jQuery(_elemName + '-' + _index).addClass(_coming.className);
                    } else if ( _coming.classEvent === 'remove' && $jQSelf.hasClass(_coming.className) ) {
                        $jQSelf.removeClass(_coming.className);
                        jQuery(_elemName + '-' + _index).removeClass(_coming.className);
                    }

                    if ( _coming.documentOff ) {
                        projects.documentOff(''+_coming.header+' , '+_coming.header+' * , '+_elemName+' , '+_elemName+' *' , function(){
                            $jQSelf.removeClass(_coming.className);
                            jQuery(_elemName + '-' + _index).removeClass(_coming.className);

                            if ( typeof(_coming.offCallback) === 'function' ) {
                                _coming.offCallback($self ,  jQuery(_elemName + '-' + _index)[0] , projects.accordion._activeIndex);
                            }
                        });
                    }

                    if ( typeof(_coming.click) === 'function' ) {
                        _coming.click($self ,  jQuery(_elemName + '-' + _index)[0] , projects.accordion._activeIndex);
                    }

                    if ( typeof(_coming.callback) === 'function' ) {
                        timeout = setTimeout(function(){
                            _coming.callback($self , jQuery(_elemName + '-' + _index)[0] , projects.accordion._activeIndex);
                        } , _times);
                    }
                }
            });
        }
    });

    factory.prototype.mousewheel = function(element , fn) {
        var $element = typeof(element) === 'object' ? element : jQuery(element);
        var _event , _deltaY;

        $element.bind('mousewheel DOMMouseScroll', function (e) {
            if ( ! e ) e = event;
            
            e.deltaY = e.originalEvent.detail || e.originalEvent.wheelDelta;
            e.deltaY = e.type !== 'DOMMouseScroll' ? ( e.deltaY > 0 ? 1 : -1 ) : ( e.deltaY < 0 ? 1 : -1  );
            
            if ( fn ) {
                fn(e);
            }
        });
    };

    factory.prototype.imgLoader = function(element , thingToDo , allDone , delay) {
        if ( ! element ) {
            return;
        }

        var _items   = [];
        var _uri     = null;
        var _setTime = null;

        for ( var i = 0 , $elem = document.querySelectorAll(element) ; i < $elem.length ; i ++ ) {
            if ( $elem[i].nodeName === 'IMG' ) {
                _items.push($elem[i].src);
            } else {
                if ( $elem[i].currentStyle ) {
                    _uri = $elem[i].currentStyle['background-image'] !== 'none' ? /(?:\(['"]?)(.*?)(?:['"]?\))/.exec($elem[i].currentStyle['background-image'])[1] : '';
                } else if (window.getComputedStyle) {
                    _uri = document.defaultView.getComputedStyle($elem[i] , null).getPropertyValue('background-image') !== 'none' ? /(?:\(['"]?)(.*?)(?:['"]?\))/.exec(document.defaultView.getComputedStyle($elem[i] , null).getPropertyValue('background-image'))[1] : '';
                }

                if ( _uri ) {
                    _items.push(_uri);
                }
            }
        }

        if ( _items.length === 0 ) {
            allDone(_items , 0);
            return;
        }

        var _count = 0;

        // this callback counts down the things to do.
        var loadCompleted = function (items , i) {
            _count ++;
            window.clearTimeout(_setTime);

            _setTime = setTimeout(function(){
                if ( _count === _items.length ) {
                    allDone(items , i);
                }
            } , delay ? delay : 0);
        };

        for ( var i = 0 ; i < _items.length ; i ++ ) {
            

            var onLoad = function (e) {
                e.target.removeEventListener('load' , onLoad);

                // this next line can be removed.
                // only here to prove the image was loaded.
                if ( thingToDo ) {
                    thingToDo(e.target , _count);
                }
                
                // notify that we're done.
                loadCompleted(_items , i);
            }

            var img = new Image();
            img.addEventListener('load' , onLoad , false);
            img.src = _items[i];
        }
    };

    factory.prototype.scrollTopAnimate = function(scrollTop , speed) {
        projects.$hb.animate({
            'scrollTop' : scrollTop
        } , (speed ? speed : 500));
    };

    if ( ! window.projects ) {
        window.projects = projects;
    }
}(window, document, jQuery));