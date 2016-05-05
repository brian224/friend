(function (window, document, jQuery, undefined) {
    'use strict';

    var game = new gameObj();

    function gameObj() {
        this.game          = '.jQ-game';
        this.screens       = '.jQ-screens';
        this.screenItem    = '.jQ-screenItem';
        this.scroll        = '.jQ-scroll';
        this.scrollItem    = '.jQ-scrollItem';
        this.richart       = '.jQ-richart';
        this.distance      = '.jQ-distance';
        this.started       = '.jQ-start';
        this.times         = '.jQ-times';
        this.result        = '.jQ-result';
        this.replay        = '.jQ-replay';
        this.replay        = '.jQ-replay';
        this.messageRandom = '.jQ-messageRandom';
        this.message       = ['%E6%9C%89%E6%A9%9F%E6%9C%83%E5%88%B0%E5%A4%8F%E5%A8%81%E5%A4%B7%E5%BA%A6%E5%81%87' ,
                            '%E5%8D%B3%E5%B0%87%E6%9C%89%E6%A9%9F%E6%9C%83%E6%93%81%E6%9C%89%E8%B6%85%E6%A3%92%E7%9A%84%E7%AD%86%E8%A8%98%E5%9E%8B%E9%9B%BB%E8%85%A6' ,
                            '%E6%9C%89%E6%A9%9F%E6%9C%83%E6%8F%9B%E4%B8%80%E6%94%AF%E6%9C%80%E6%96%B0%E5%9E%8B%E7%9A%84%E6%89%8B%E6%A9%9F' ,
                            '%E6%9C%89%E6%A9%9F%E6%9C%83%E7%8D%B2%E5%BE%97%E9%AB%94%E6%84%9F%E6%BB%91%E6%9D%BF' ,
                            '%E6%9C%89%E6%A9%9F%E6%9C%83%E7%8D%B2%E5%BE%97%E6%96%B0%E5%85%89%E4%B8%89%E8%B6%8A%E7%A6%AE%E5%88%B8NT%241%2C000'];
        this.random        = null;
        this.startY        = null;
        this.moveY         = null;
        this.isTouch       = false;
        this.ANIMATE_TIME  = 500;
        this.resetTime     = jQuery(this.times).text();
        this.move          = 0;
        this.runFrequency  = 0;
        this.scrollTop     = 0;
        this.runSpace      = (jQuery(this.scrollItem).height() / 5);
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
            var space = ( i * jQuery(game.scroll).data('space'));
            var text  = space + ' ' + jQuery(game.scroll).data('unit');

            if ( (space / 1000) > 1 ) {
                space = (space / 1000).toFixed(1);
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
        distance = (game.scrollTop * (jQuery(game.scroll).data('space') / game.runSpace));
        floor = (Math.floor(distance / 1000) * 1000);
        jQuery(game.distance).find('> em').text(distance);
        jQuery(game.result).text(distance);
        if ( jQuery(game.distance).hasClass(jQuery(game.distance).data('mark')) ) {
            jQuery(game.distance).removeClass(jQuery(game.distance).data('mark'));
        }
        if ( floor !== 0 && ( (floor - 100) < distance ) && ( floor + ( jQuery(game.scroll).data('space') - 1 ) ) > distance ) {
            jQuery(game.distance).addClass(jQuery(game.distance).data('mark'));
        }
    }

    gameObj.prototype.countdown = function() {
        var time         = ((parseInt(jQuery(game.times).text().split(':')[0] , 10) * 60) + parseInt(jQuery(game.times).text().split(':')[1] , 10));
        var newTime      = null;
        var timeinterval = null;

        timeinterval = setInterval(function(){
            if ( time !== 1 ) {
                time --;
            } else {
                time = 0;
                window.clearInterval(timeinterval);
                jQuery(game.messageRandom).text(decodeURIComponent(game.message[game.random]));
                jQuery(game.richart).removeClass(jQuery(game.richart).data('start'));
                jQuery(game.screenItem).eq(0)
                    .removeClass(( jQuery(game.screens).data('move') + (game.move + '') ))
                    .addClass(( jQuery(game.screens).data('move') + ((game.move + 1)  + '') ));
                game.move ++;
                jQuery(game.screens).css('height' , jQuery(game.screenItem).eq(game.move).outerHeight());
                Projects.Factory.HB.removeAttr('style');

                if ( Projects.Factory.UserAgent !== 'PC' ) {
                    jQuery(game.game).removeClass(jQuery(game.game).data('start'));
                }
            }

            newTime = ( ( ( ( time / 60 ) | 0 ) === 0 ? '00' : ( ( (time / 60) | 0 ) < 10 ) ? ( '0' + ( ( (time / 60) | 0 ) + '' ) ) : ( ( time / 60 ) + '' ) ) ) + ':' + ( ( ( time % 60 ) < 10 ) ? '0' + ( ( time % 60 ) + '' ) : ( ( time % 60 ) + '' ) );
            jQuery(game.times).text(newTime);
        } , 1000);
    }

    /* start click event */
    jQuery(game.started).on('click' , function(e){
        var self               = jQuery(this);
        var transitionDuration = ( parseFloat(jQuery(game.screens).css('transition-duration') , 10) * 1000 ) + 300;
        var timeout            = null;

        game.random = (Math.ceil(Math.random() * game.message.length) - 1);

        if ( Projects.Factory.UserAgent === 'Mobile' ) {
            Projects.Factory.HB.animate({
                'scrollTop' : jQuery(game.game).offset().top
            } , game.ANIMATE_TIME , function(){
                game.ChromeRemoveLoad();
                Projects.Factory.HB.css('overflow' , 'hidden');
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
            game.countdown();
            if ( Projects.Factory.UserAgent !== 'PC' ) {
                jQuery(game.game).addClass(jQuery(game.game).data('start'));
            }
        } , transitionDuration);
    });

    /* game touch event */
    jQuery(game.game).on('touchstart touchmove touchend' , function(e){
        var self    = jQuery(this);
        var timeout = null;

        if ( self.hasClass(jQuery(game.game).data('start')) ) {

            game.isTouch = true;

            if ( e.type === 'touchstart' && game.startY === null ) {
                game.isTouch = false;
                game.startY = e.originalEvent.touches[0].clientY;
            } else if ( e.type === 'touchmove' ) {
                game.isTouch = false;
                game.moveY = e.originalEvent.touches[0].clientY;
            } else if ( e.type === 'touchend' ) {
                game.isTouch = true;
                timeout = setTimeout(function(){
                    game.startY  = null;
                } , 10);
            }

            if ( (game.moveY - game.startY) >= 50 && game.isTouch ) {
                game.richartRun(game.richart);
            }
        }
    });

    /* richart click event */
    jQuery(game.richart).on('click' , function(e){
        var self = jQuery(this);

        e.preventDefault();
        
        if ( Projects.Factory.UserAgent === 'PC' && self.hasClass(self.data('start')) ) {
            game.richartRun(this);
        }
    });

    /* replay click event */
    jQuery(game.replay).on('click' , function(e){
        game.move         = 0;
        game.runFrequency = 0;
        game.scrollTop    = 0;
        jQuery(game.screenItem).eq(0)
            .removeClass(( jQuery(game.screens).data('move') + ((game.move + 2) + '') ))
            .addClass(( jQuery(game.screens).data('move') + (game.move  + '') ));
        jQuery(game.screens).css('height' , jQuery(game.screenItem).eq(game.move).outerHeight());
        jQuery(game.scroll).css('bottom' , 0);
        jQuery(game.distance).find('> em').text(0);
        jQuery(game.result).text(0);
        jQuery(game.times).text(game.resetTime);
    });

    Projects.Factory.D.ready(function(){
        game.appendScrollItem();
        jQuery(game.screens).css('height' , jQuery(game.screenItem).eq(game.move).outerHeight());
        jQuery(game.screenItem).removeClass(jQuery(game.screens).data('hide'));
    });

    Projects.Factory.W.resize(function(){
        jQuery(game.screens).css('height' , jQuery(game.screenItem).eq(game.move).outerHeight());
    });
}(window, document, $));