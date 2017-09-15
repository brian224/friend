if ( document.getElementById('gaScript') ) {
    var _gaId = document.getElementById('gaScript').dataset ? document.getElementById('gaScript').dataset.id : document.getElementById('gaScript').getAttribute('data-id');

    if ( _gaId ) {
        var SFGa = new gaFn();

        function gaFn() {
            this._cat   = null;
            this._event = null;
            this._label = null;
        }

        ( function (i , s , o , g , r , a , m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function(){(
                i[r].q = i[r].q || []
            ).push(arguments)},

            i[r].l = 1*new Date();
            a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a , m)
        })(window , document , 'script' , '//www.google-analytics.com/analytics.js' , 'ga');

        ga('create', _gaId , 'auto');
        ga('require', 'displayfeatures');
        ga('send', 'pageview');

        gaFn.prototype.push = function(cat , event , label , hitCallback) {
            var _hitCallback = typeof(hitCallback) === 'function' ? {'hitCallback' : hitCallback} : null;
            ga('send' , 'event' , cat , event , label , _hitCallback);
        }

        gaFn.prototype.hitBack = function(element) {
            var _href = element.href ? element.href : '';

            if ( _href ) {
                if ( element.target === '_parent' ) {
                    window.parent.location = _href;
                } else {
                    window.location = _href;
                }
            }
        }

        gaFn.prototype.handleClick = function(event) {
            var _path = [],
                _elm,
                _entry;
            event        = event;
            event.target = event.target || event.srcElement;
            
            for ( _elm = event.target ; _elm ; _elm = _elm.parentNode ) {
                if ( _entry === 'html' ) {
                    break;
                }

                _path.push(_elm);
            }

            var _regexName = /ga_click_trace/;
            var _element   = null;

            for ( var i = 0 ; i < _path.length ; i ++ ) {
                if ( _regexName.test(_path[i].className) ) {
                    _element = _path[i];

                    SFGa._cat   = _element.getAttribute('ga_cat');
                    SFGa._event = _element.getAttribute('ga_event');
                    SFGa._label = _element.getAttribute('ga_label');

                    if ( _element.target !== '_blank' && _element.href && _element.href !== '#' ) {
                        if ( /(\s|^)ga_click_preventDefault(\s|$)/.test( _element.className ) ) {
                            SFGa.push(SFGa._cat , SFGa._event , SFGa._label);
                        } else {
                            event.preventDefault();
                            SFGa.push(SFGa._cat , SFGa._event , SFGa._label , SFGa.hitBack(_element));
                        }
                    } else {
                        SFGa.push(SFGa._cat , SFGa._event , SFGa._label);
                    }

                    return false;
                }
            }
        }

        if ( document.addEventListener ) {
            document.addEventListener('click' , SFGa.handleClick , true);
        } else if ( document.attachEvent ) {
            document.attachEvent('onclick' , SFGa.handleClick);
        }
    }
}