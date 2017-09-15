(function (window , document , jQuery , undefined) {
    'use strict';

    var common = new commonFn();

    function commonFn() {
        this._layout = {
            _body      : '.jQ-body',
            _header    : '.jQ-header',
            _main      : '.jQ-main',
            _content   : '.jQ-content',
            _footer    : '.jQ-footer',
            _nav       : '.jQ-nav'
        };
        this._nav = {
            _ctrl : '.jQ-navCtrl'
        };
        this._tab = {
            _frame : '.jQ-tab',
            _bd    : '.jQ-tabBd',
            _item  : '.jQ-tabItem'
        };
        this._scrollbar = '.jQ-scrollbar';
        this._share     = '.jQ-share';
    };

    commonFn.prototype.tab = function() {
        projects.tab({
            stopClass    : jQuery(common._tab._frame).data('transition'),
            slideClass   : jQuery(common._tab._frame).data('slide'),
            activeClass  : jQuery(common._tab._frame).data('active'),
            activedClass : jQuery(common._tab._frame).data('actived'),
            frame        : common._tab._frame,
            body         : common._tab._bd,
            button       : common._tab._item
        });
    };

    commonFn.prototype.comma = function(value) {
        return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    commonFn.prototype.headerScroll = function() {
        var _class = jQuery(common._layout._header).data('scroll');

        if ( projects.$w.scrollTop() > 0 ) {
            jQuery(common._layout._header).addClass(_class);
        } else {
            jQuery(common._layout._header).removeClass(_class);
        }
    };

    commonFn.prototype.sugarfunbox = function(element) {
        jQuery.sugarfunbox.open({
            closeBtn      : ( element.data('close-btn') !== undefined ) ? element.data('close-btn') : true,
            supportMobile : true,
            content       : ( element.data('content') !== undefined ) ? element.data('content') : null,
            href          : ( element.attr('href') !== undefined ) ? element.attr('href') : null,
            overlay       : {
                closeClick : ( element.data('close-click') !== undefined ) ? element.data('close-click') : true
            },
            beforeOpen : ( element.data('before-open') !== undefined ) ? eval(element.data('before-open'))() : $.noop
        });
    };

    commonFn.prototype.angula = function(element){
        if ( element.length === 0 )  return false;

        for ( var i = 0; i < element.length; i++ ) {
            var _match = element.eq(i)[0].outerHTML.match(/{{\s*(\w*|.*)\s*[^\s]+\s*}}/g);

            if ( _match ) {
                for ( var j = 0 ; j < _match.length ; j++ ) {
                    var _regexItem = _match[j],
                        _regexec   = /(?![{{]).*(?=}})/i.exec(_regexItem)[0].replace(/\s+/g , '');

                    if ( element[0].nodeName === 'SCRIPT' ) {
                        element.eq(i).html(element.eq(i).html().replace( new RegExp( _regexItem, 'g') , eval(_regexec) ));
                    } else {
                        element.eq(i)[0].outerHTML = element.eq(i)[0].outerHTML.replace( new RegExp( _regexItem, 'g') , eval(_regexec) );
                    }
                }
            }
        }
    };

    commonFn.prototype.openWin = function(element) {
        var _top      = element.data('height') ? 
                        ( ( window.screen.availHeight - element.data('height') ) / 2 ) : 
                        ( ( window.screen.availHeight - 600 ) / 2 ),
            _left     = element.data('width') ? 
                        ( ( window.screen.availLeft || window.screenX ) + ( projects.$d.width() / 2 ) ) - ( element.data('width') / 2 ) : 
                        ( ( window.screen.availLeft || window.screenX ) + ( projects.$d.width() / 2 ) ) - ( 600 / 2 ),
            _width    = element.data('width') || 600,
            _height   = element.data('height')  || 600,
            _menubar  = element.data('menu-bar')  || 'no',
            _titlebar = element.data('title-bar') || 'no',
            _status   = element.data('status') || 'no';
        var _href     = element.attr('href') || element.data('href');

        window.open(''+_href+'' , '' , 'top='+_top+', left='+_left+', width='+_width+', height='+_height+', menubar='+_menubar+', titlebar='+_titlebar+', status='+_status+'' , false);
    };

    jQuery(common._nav._ctrl).on('click', function(e){
        var $self  = jQuery(this);
        var _class = $self.data('nav');

        e.preventDefault();

        $self.toggleClass(_class);
        jQuery(common._layout._nav).toggleClass(_class);

        projects.documentOff(''+common._nav._ctrl+', '+common._nav._ctrl+' *, '+common._layout._nav+', '+common._layout._nav+' *', function(){
            $self.removeClass(_class);
            jQuery(common._layout._nav).removeClass(_class);
        });
    });

    jQuery(common._share).on('click', function(e){
        var $self = jQuery(this);
        e.preventDefault();
        common.openWin($self);
    });

    projects.$d.ready(function(){
        // projects.owlCarousel(common._owl);
    });

    projects.$w.scroll(function(){
        common.headerScroll();
    }).scroll();

    if ( ! window.common ) {
        window.common = common;
    }
}(window, document, jQuery));