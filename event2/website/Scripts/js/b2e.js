'use strict';

var b2e = new b2eFn();

function b2eFn() {

};

b2eFn.prototype.has = function(form) {
    common.sugarfunbox(jQuery(form).find('[type="submit"]'));
};

b2eFn.prototype.no = function(form) {
    common.sugarfunbox(jQuery(form).find('[type="submit"]'));
};