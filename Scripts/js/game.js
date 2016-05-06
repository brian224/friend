(function (window, document, jQuery, undefined) {
    'use strict';

    var game = new gameObj();

    function gameObj() {
        this.contentFt       = '.jQ-contentFt';
        this.game            = '.jQ-game';
        this.screens         = '.jQ-screens';
        this.screenItem      = '.jQ-screenItem';
        this.scroll          = '.jQ-scroll';
        this.scrollItem      = '.jQ-scrollItem';
        this.richart         = '.jQ-richart';
        this.distance        = '.jQ-distance';
        this.started         = '.jQ-start';
        this.times           = '.jQ-times';
        this.timesMobile     = '.jQ-timesMobile';
        this.result          = '.jQ-result';
        this.replay          = '.jQ-replay';
        this.replay          = '.jQ-replay';
        this.animationNumber = '.jQ-animationNumber';
        this.animationOver   = '.jQ-animationOver';
        this.messageRandom   = '.jQ-messageRandom';
        this.message         = ['%E6%9C%89%E6%A9%9F%E6%9C%83%E5%88%B0%E5%A4%8F%E5%A8%81%E5%A4%B7%E5%BA%A6%E5%81%87' ,
                                '%E5%8D%B3%E5%B0%87%E6%9C%89%E6%A9%9F%E6%9C%83%E6%93%81%E6%9C%89%E8%B6%85%E6%A3%92%E7%9A%84%E7%AD%86%E8%A8%98%E5%9E%8B%E9%9B%BB%E8%85%A6' ,
                                '%E6%9C%89%E6%A9%9F%E6%9C%83%E6%8F%9B%E4%B8%80%E6%94%AF%E6%9C%80%E6%96%B0%E5%9E%8B%E7%9A%84%E6%89%8B%E6%A9%9F' ,
                                '%E6%9C%89%E6%A9%9F%E6%9C%83%E7%8D%B2%E5%BE%97%E9%AB%94%E6%84%9F%E6%BB%91%E6%9D%BF' ,
                                '%E6%9C%89%E6%A9%9F%E6%9C%83%E7%8D%B2%E5%BE%97%E6%96%B0%E5%85%89%E4%B8%89%E8%B6%8A%E7%A6%AE%E5%88%B8NT%241%2C000'];
        this.random          = null;
        this.startY          = null;
        this.moveY           = null;
        this.isTouch         = false;
        this.ANIMATE_TIME    = 500;
        this.resetTime       = jQuery(this.times).text();
        this.move            = 0;
        this.runFrequency    = 0;
        this.scrollTop       = 0;
        this.runSpace        = (jQuery(this.scrollItem).height() / 5);
        this.MOBILE_SPACE    = 3;
    }

    gameObj.prototype.ChromeRemoveLoad = function(isTop) {
        var isWindowTop = false;
        var lastTouchY  = 0;

        var touchStartHandler = function(e) {
            if ( e.touches.length !== 1 ) return;
            lastTouchY  = e.touches[0].clientY;
            isWindowTop = ( window.pageYOffset <= 50 );
        };

        var touchMoveHandler = function(e) {
            var touchY     = e.touches[0].clientY;
            var touchYmove = touchY - lastTouchY;

            lastTouchY = touchY;

            if ( isWindowTop ) {
                isWindowTop = false;
                
                if ( touchYmove > 0 ) {
                    e.preventDefault();
                    return;
                }
            }

        };

        document.addEventListener('touchstart', touchStartHandler, false);
        document.addEventListener('touchmove', touchMoveHandler, false);
    }

    gameObj.prototype.appendScrollItem = function() {
        for ( var i = 0 ; i < 5 ; i ++ ) {
            var clone = jQuery(game.scrollItem).first().find('> em').first().clone();

            if ( i !== 0 ) {
                jQuery(game.scrollItem).append(clone);
            }
        };

        for ( var i = 0 ; i < jQuery(game.scroll).data('length') ; i ++ ) {
            var clone = jQuery(game.scrollItem).first().clone().css('z-index' , ((jQuery(game.scroll).data('length') + 1) - i));
            jQuery(game.scrollItem + ':last').after(clone);
        };

        for ( var i = jQuery(game.scroll).find('em').length - 1 , j = 0 ; i >= 0 , j < jQuery(game.scroll).find('em').length ; i -- , j ++ ) {
            var space = Projects.Factory.UserAgent === 'PC' ? ( i * jQuery(game.scroll).data('space')) : (( i * (jQuery(game.scroll).data('space') / game.MOBILE_SPACE) | 0));
            var text  = space + ' ' + jQuery(game.scroll).data('unit');

            if ( (space / 1000) > 1 ) {
                space = Projects.Factory.UserAgent === 'PC' ? (space / 1000).toFixed(1) : (space / 1000).toFixed(2);
                text  = space + ' k' + jQuery(game.scroll).data('unit');
            }

            jQuery(game.scroll).find('em').eq(j).text(text);
        };
    }

    gameObj.prototype.richartRun = function(element) {
        var distance = 0;
        var floor    = 0;

        jQuery(element).removeClass((jQuery(element).data('run') + game.runFrequency));
        game.runFrequency ++;

        if ( game.runFrequency > 3 ) {
            game.runFrequency = 0;
        }

        game.scrollTop += game.runSpace;
        jQuery(game.scroll).css({
            'transform' : 'translate(0 , '+ game.scrollTop +'px)'
        });
        jQuery(element).addClass((jQuery(element).data('run') + game.runFrequency));
        distance = Projects.Factory.UserAgent === 'PC' ? (game.scrollTop * (jQuery(game.scroll).data('space') / game.runSpace)) : ((game.scrollTop * ((jQuery(game.scroll).data('space') / game.MOBILE_SPACE) / game.runSpace) | 0));
        floor = (Math.floor(distance / 1000) * 1000);
        jQuery(game.distance).find('> em').text(distance);
        jQuery(game.result).text(distance);
        if ( jQuery(game.distance).hasClass(jQuery(game.distance).data('mark')) ) {
            jQuery(game.distance).removeClass(jQuery(game.distance).data('mark'));
        }
        if ( floor !== 0 && ( (floor - 100) < distance ) && ( floor + ( ( Projects.Factory.UserAgent === 'PC' ? jQuery(game.scroll).data('space') : ((jQuery(game.scroll).data('space') / game.MOBILE_SPACE) | 0) ) - 1 ) ) > distance ) {
            jQuery(game.distance).addClass(jQuery(game.distance).data('mark'));
        }
    }

    gameObj.prototype.countdown = function() {
        var time              = ((parseInt(jQuery(game.times).text().split(':')[0] , 10) * 60) + parseInt(jQuery(game.times).text().split(':')[1] , 10));
        var newTime           = null;
        var timeinterval      = null;
        var timeout           = null;
        var animationDuration = null;

        timeinterval = setInterval(function(){
            if ( time !== 1 ) {
                time --;
            } else {
                time = 0;
                window.clearInterval(timeinterval);
                jQuery(game.richart).removeClass(jQuery(game.richart).data('start'));
                jQuery(game.game).addClass(jQuery(game.game).data('end'));

                if ( Projects.Factory.UserAgent !== 'PC' ) {
                    jQuery(game.game).removeClass(jQuery(game.game).data('start'));
                }

                animationDuration = ( ( parseFloat(jQuery(game.animationOver).css('animation-duration') , 10) * 1000 ) + ( parseFloat(jQuery(game.animationOver).css('animation-delay') , 10) * 1000 ) + 1000 );

                timeout = setTimeout(function(){
                    if ( Projects.Factory.UserAgent === 'Mobile' ) {
                        jQuery(game.contentFt).removeClass(jQuery(game.contentFt).data('fixed'));
                    }
                    jQuery(game.game).removeClass(jQuery(game.game).data('end'));
                    jQuery(game.messageRandom).text(decodeURIComponent(game.message[game.random]));
                    jQuery(game.screenItem).eq(0)
                        .removeClass(( jQuery(game.screens).data('move') + (game.move + '') ))
                        .addClass(( jQuery(game.screens).data('move') + ((game.move + 1)  + '') ));
                    game.move ++;
                    jQuery(game.screens).css('height' , jQuery(game.screenItem).eq(game.move).outerHeight());
                    Projects.Factory.HB.removeClass('is-hide').animate({
                        'scrollTop' : 0
                    } , game.ANIMATE_TIME);
                    if ( Projects.Factory.gaScript ) {
                        GAPush(jQuery(game.screenItem).eq(ame.move).attr('ga_cat') , jQuery(game.screenItem).eq(ame.move).attr('ga_event') , jQuery(game.screenItem).eq(ame.move).attr('ga_label') , {
                            hitCallback : function(){
                                lbReload(''+jQuery(game.screenItem).eq(ame.move).attr('ga_cat')+'_'+jQuery(game.screenItem).eq(ame.move).attr('ga_label')+'', '', '', '');
                            }
                        });
                    }
                    window.clearTimeout(timeout);
                } , animationDuration);
            }

            newTime = ( ( ( ( time / 60 ) | 0 ) === 0 ? '00' : ( ( (time / 60) | 0 ) < 10 ) ? ( '0' + ( ( (time / 60) | 0 ) + '' ) ) : ( ( time / 60 ) + '' ) ) ) + ':' + ( ( ( time % 60 ) < 10 ) ? '0' + ( ( time % 60 ) + '' ) : ( ( time % 60 ) + '' ) );
            jQuery(''+game.times+' , '+game.timesMobile+'').text(newTime);
        } , 1000);
    }

    /* start click event */
    jQuery(game.started).on('click' , function(e){
        var self               = jQuery(this);
        var transitionDuration = ( parseFloat(jQuery(game.screens).css('transition-duration') , 10) * 1000 ) + 300;
        var animationDuration  = null;
        var timeout            = null;

        game.random = (Math.ceil(Math.random() * game.message.length) - 1);

        if ( Projects.Factory.UserAgent === 'Mobile' ) {
            jQuery(game.contentFt).addClass(jQuery(game.contentFt).data('fixed'));

            Projects.Factory.HB.animate({
                'scrollTop' : jQuery(game.game).offset().top
            } , game.ANIMATE_TIME , function(){
                Projects.Factory.HB.addClass('is-hide');
                game.ChromeRemoveLoad();
            });
        }

        jQuery(game.richart).addClass(jQuery(game.richart).data('start'));
        jQuery(game.screenItem).eq(0)
            .removeClass(( jQuery(game.screens).data('move') + (game.move + '') ))
            .addClass(( jQuery(game.screens).data('move') + ((game.move + 1)  + '') ));

        game.move ++;
        jQuery(game.screenItem).eq(game.move).addClass(jQuery(game.screens).data('active'));
        jQuery(game.screens).css('height' , jQuery(game.screenItem).eq(game.move).outerHeight());

        timeout = setTimeout(function(){
            jQuery(game.screenItem).eq((game.move - 1)).removeClass(jQuery(game.screens).data('active'));
            jQuery(game.game).addClass(jQuery(game.game).data('ready'));
            window.clearTimeout(timeout);

            animationDuration = ( parseFloat(jQuery(game.animationNumber).css('animation-duration') , 10) * 1000 ) + ( parseFloat(jQuery(game.animationNumber).css('animation-delay') , 10) * 1000 );

            timeout = setTimeout(function(){
                jQuery(game.game).removeClass(jQuery(game.game).data('ready'));
                game.countdown();
                if ( Projects.Factory.UserAgent !== 'PC' ) {
                    jQuery(game.game).addClass(jQuery(game.game).data('start'));
                }
                window.clearTimeout(timeout);
            } , animationDuration);
        } , transitionDuration);
    });

    if ( Projects.Factory.UserAgent === 'PC' ) {
        /* richart click event */
        jQuery(game.richart).on('click' , function(e){
            var self = jQuery(this);

            e.preventDefault();

            if ( self.hasClass(self.data('start')) ) {
                game.richartRun(this);
            }
        });
    } else {
        /* game touch event */
        jQuery(game.game).on('touchstart touchend' , function(e){
            var self = jQuery(this);

            if ( self.hasClass(jQuery(game.game).data('start')) ) {
                game.richartRun(game.richart);
            }
        });
    }

    /* replay click event */
    jQuery(game.replay).on('click' , function(e){
        game.move         = 0;
        game.runFrequency = 0;
        game.scrollTop    = 0;
        jQuery(game.screenItem).eq(0)
            .removeClass(( jQuery(game.screens).data('move') + ((game.move + 2) + '') ))
            .addClass(( jQuery(game.screens).data('move') + (game.move  + '') ));
        jQuery(game.screens).css('height' , jQuery(game.screenItem).eq(game.move).outerHeight());
        jQuery(game.scroll).removeAttr('style');
        jQuery(game.distance).find('> em').text(0);
        jQuery(game.result).text(0);
        jQuery(game.times).text(game.resetTime);
    });

    Projects.Factory.D.ready(function(){
        game.appendScrollItem();
        jQuery(game.screens).css('height' , jQuery(game.screenItem).eq(game.move).outerHeight());
        jQuery(game.screenItem).removeClass(jQuery(game.screens).data('hide'));
        jQuery(game.timesMobile).text(jQuery(game.times).text());
    });

    Projects.Factory.W.resize(function(){
        jQuery(game.screens).css('height' , jQuery(game.screenItem).eq(game.move).outerHeight());
    });
}(window, document, $));