(function (window , document , jQuery , undefined) {
    'use strict';
    var login = new loginFn();

    function loginFn() {
        this._popup = {
            _element : '#popup',
            _text    : null,
            _url     : null
        };
    };

    loginFn.prototype.popup = function(){
        var _element = jQuery(''+common._tab._bd+' *.is-active').find('[type="submit"]');
        // console.log(_element);
        login._popup._text = _element.data('popup').split('||')[0];
        login._popup._url = _element.data('popup').split('||')[1];

        common.angula(jQuery(login._popup._element));
    };

    projects.$d.ready(function(){
        common.tab();
        projects.validate({
            event : ['focusout']
        });

        if ( projects.device() === 'PC' ) {
            jQuery(common._scrollbar).scrollbar();
        }
    });

    if ( ! window.login ) {
        window.login = login;
    }
}(window, document, jQuery));