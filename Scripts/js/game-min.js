!function(e,t,s,a){"use strict";function r(){this.contentFt=".jQ-contentFt",this.game=".jQ-game",this.screens=".jQ-screens",this.screenItem=".jQ-screenItem",this.scroll=".jQ-scroll",this.scrollItem=".jQ-scrollItem",this.richart=".jQ-richart",this.distance=".jQ-distance",this.started=".jQ-start",this.times=".jQ-times",this.timesMobile=".jQ-timesMobile",this.result=".jQ-result",this.replay=".jQ-replay",this.replay=".jQ-replay",this.animationNumber=".jQ-animationNumber",this.animationOver=".jQ-animationOver",this.messageRandom=".jQ-messageRandom",this.message=["%E6%9C%89%E6%A9%9F%E6%9C%83%E5%88%B0%E5%A4%8F%E5%A8%81%E5%A4%B7%E5%BA%A6%E5%81%87","%E5%8D%B3%E5%B0%87%E6%9C%89%E6%A9%9F%E6%9C%83%E6%93%81%E6%9C%89%E8%B6%85%E6%A3%92%E7%9A%84%E7%AD%86%E8%A8%98%E5%9E%8B%E9%9B%BB%E8%85%A6","%E6%9C%89%E6%A9%9F%E6%9C%83%E6%8F%9B%E4%B8%80%E6%94%AF%E6%9C%80%E6%96%B0%E5%9E%8B%E7%9A%84%E6%89%8B%E6%A9%9F","%E6%9C%89%E6%A9%9F%E6%9C%83%E7%8D%B2%E5%BE%97%E9%AB%94%E6%84%9F%E6%BB%91%E6%9D%BF","%E6%9C%89%E6%A9%9F%E6%9C%83%E7%8D%B2%E5%BE%97%E6%96%B0%E5%85%89%E4%B8%89%E8%B6%8A%E7%A6%AE%E5%88%B8NT%241%2C000"],this.random=null,this.startY=null,this.moveY=null,this.isTouch=!1,this.ANIMATE_TIME=500,this.resetTime=s(this.times).text(),this.move=0,this.runFrequency=0,this.scrollTop=0,this.runSpace=s(this.scrollItem).height()/5,this.MOBILE_SPACE=3}var o=new r;r.prototype.ChromeRemoveLoad=function(s){var a=!1,r=0,o=function(t){1===t.touches.length&&(r=t.touches[0].clientY,a=e.pageYOffset<=50)},n=function(e){var t=e.touches[0].clientY,s=t-r;return r=t,a&&(a=!1,s>0)?void e.preventDefault():void 0};t.addEventListener("touchstart",o,!1),t.addEventListener("touchmove",n,!1)},r.prototype.appendScrollItem=function(){for(var e=0;5>e;e++){var t=s(o.scrollItem).first().find("> em").first().clone();0!==e&&s(o.scrollItem).append(t)}for(var e=0;e<s(o.scroll).data("length");e++){var t=s(o.scrollItem).first().clone().css("z-index",s(o.scroll).data("length")+1-e);s(o.scrollItem+":last").after(t)}for(var e=s(o.scroll).find("em").length-1,a=0;a<s(o.scroll).find("em").length;e--,a++){var r="PC"===Projects.Factory.UserAgent?e*s(o.scroll).data("space"):e*(s(o.scroll).data("space")/o.MOBILE_SPACE)|0,n=r+" "+s(o.scroll).data("unit");r/1e3>1&&(r="PC"===Projects.Factory.UserAgent?(r/1e3).toFixed(1):(r/1e3).toFixed(2),n=r+" k"+s(o.scroll).data("unit")),s(o.scroll).find("em").eq(a).text(n)}},r.prototype.richartRun=function(e){var t=0,a=0;s(e).removeClass(s(e).data("run")+o.runFrequency),o.runFrequency++,o.runFrequency>3&&(o.runFrequency=0),o.scrollTop+=o.runSpace,s(o.scroll).css({transform:"translate(0 , "+o.scrollTop+"px)"}),s(e).addClass(s(e).data("run")+o.runFrequency),t="PC"===Projects.Factory.UserAgent?o.scrollTop*(s(o.scroll).data("space")/o.runSpace):o.scrollTop*(s(o.scroll).data("space")/o.MOBILE_SPACE/o.runSpace)|0,a=1e3*Math.floor(t/1e3),s(o.distance).find("> em").text(t),s(o.result).text(t),s(o.distance).hasClass(s(o.distance).data("mark"))&&s(o.distance).removeClass(s(o.distance).data("mark")),0!==a&&t>a-100&&a+(("PC"===Projects.Factory.UserAgent?s(o.scroll).data("space"):s(o.scroll).data("space")/o.MOBILE_SPACE|0)-1)>t&&s(o.distance).addClass(s(o.distance).data("mark"))},r.prototype.countdown=function(){var t=60*parseInt(s(o.times).text().split(":")[0],10)+parseInt(s(o.times).text().split(":")[1],10),a=null,r=null,n=null,c=null;r=setInterval(function(){1!==t?t--:(t=0,e.clearInterval(r),s(o.richart).removeClass(s(o.richart).data("start")),s(o.game).addClass(s(o.game).data("end")),"PC"!==Projects.Factory.UserAgent&&s(o.game).removeClass(s(o.game).data("start")),c=1e3*parseFloat(s(o.animationOver).css("animation-duration"),10)+1e3*parseFloat(s(o.animationOver).css("animation-delay"),10)+1e3,n=setTimeout(function(){"Mobile"===Projects.Factory.UserAgent&&s(o.contentFt).removeClass(s(o.contentFt).data("fixed")),s(o.game).removeClass(s(o.game).data("end")),s(o.messageRandom).text(decodeURIComponent(o.message[o.random])),s(o.screenItem).eq(0).removeClass(s(o.screens).data("move")+(o.move+"")).addClass(s(o.screens).data("move")+(o.move+1+"")),o.move++,s(o.screens).css("height",s(o.screenItem).eq(o.move).outerHeight()),Projects.Factory.HB.removeClass("is-hide").animate({scrollTop:0},o.ANIMATE_TIME),Projects.Factory.gaScript&&GAPush(s(o.screenItem).eq(o.move).attr("ga_cat"),s(o.screenItem).eq(o.move).attr("ga_event"),s(o.screenItem).eq(o.move).attr("ga_label"),{hitCallback:function(){lbReload(""+s(o.screenItem).eq(o.move).attr("ga_cat")+"_"+s(o.screenItem).eq(o.move).attr("ga_label"),"","","")}}),e.clearTimeout(n)},c)),a=(0===(t/60|0)?"00":10>(t/60|0)?"0"+((t/60|0)+""):t/60+"")+":"+(10>t%60?"0"+(t%60+""):t%60+""),s(""+o.times+" , "+o.timesMobile).text(a)},1e3)},s(o.started).on("click",function(t){var a=(s(this),1e3*parseFloat(s(o.screens).css("transition-duration"),10)+300),r=null,n=null;o.random=Math.ceil(Math.random()*o.message.length)-1,"Mobile"===Projects.Factory.UserAgent&&(s(o.contentFt).addClass(s(o.contentFt).data("fixed")),Projects.Factory.HB.animate({scrollTop:s(o.game).offset().top},o.ANIMATE_TIME,function(){Projects.Factory.HB.addClass("is-hide"),o.ChromeRemoveLoad()})),s(o.richart).addClass(s(o.richart).data("start")),s(o.screenItem).eq(0).removeClass(s(o.screens).data("move")+(o.move+"")).addClass(s(o.screens).data("move")+(o.move+1+"")),o.move++,s(o.screenItem).eq(o.move).addClass(s(o.screens).data("active")),s(o.screens).css("height",s(o.screenItem).eq(o.move).outerHeight()),n=setTimeout(function(){s(o.screenItem).eq(o.move-1).removeClass(s(o.screens).data("active")),s(o.game).addClass(s(o.game).data("ready")),e.clearTimeout(n),r=1e3*parseFloat(s(o.animationNumber).css("animation-duration"),10)+1e3*parseFloat(s(o.animationNumber).css("animation-delay"),10),n=setTimeout(function(){s(o.game).removeClass(s(o.game).data("ready")),o.countdown(),"PC"!==Projects.Factory.UserAgent&&s(o.game).addClass(s(o.game).data("start")),e.clearTimeout(n)},r)},a)}),"PC"===Projects.Factory.UserAgent?s(o.richart).on("click",function(e){var t=s(this);e.preventDefault(),t.hasClass(t.data("start"))&&o.richartRun(this)}):s(o.game).on("touchstart touchend",function(e){var t=s(this);t.hasClass(s(o.game).data("start"))&&o.richartRun(o.richart)}),s(o.replay).on("click",function(e){o.move=0,o.runFrequency=0,o.scrollTop=0,s(o.screenItem).eq(0).removeClass(s(o.screens).data("move")+(o.move+2+"")).addClass(s(o.screens).data("move")+(o.move+"")),s(o.screens).css("height",s(o.screenItem).eq(o.move).outerHeight()),s(o.scroll).removeAttr("style"),s(o.distance).find("> em").text(0),s(o.result).text(0),s(o.times).text(o.resetTime)}),Projects.Factory.D.ready(function(){o.appendScrollItem(),s(o.screens).css("height",s(o.screenItem).eq(o.move).outerHeight()),s(o.screenItem).removeClass(s(o.screens).data("hide")),s(o.timesMobile).text(s(o.times).text())}),Projects.Factory.W.resize(function(){s(o.screens).css("height",s(o.screenItem).eq(o.move).outerHeight())})}(window,document,$);