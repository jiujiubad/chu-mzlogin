;
/* module-key = 'com.atlassian.auiplugin:internal-src-js-jquery-jquery-moveto', location = 'src/js/jquery/jquery.moveto.js' */
("undefined"===typeof window?global:window).__accb88a74e7364188d54045883d2d38a=function(){"use strict";jQuery.fn.moveTo=function(a){var a=jQuery.extend({transition:!1,scrollOffset:35},a),c=this,b=c.offset().top;if((jQuery(window).scrollTop()+jQuery(window).height()-this.outerHeight()<b||jQuery(window).scrollTop()+a.scrollOffset>b)&&jQuery(window).height()>a.scrollOffset){b=jQuery(window).scrollTop()+a.scrollOffset>b?b-(jQuery(window).height()-this.outerHeight())+a.scrollOffset:b-a.scrollOffset;if(!jQuery.fn.moveTo.animating&&
a.transition)return jQuery(document).trigger("moveToStarted",this),jQuery.fn.moveTo.animating=!0,jQuery("html,body").animate({scrollTop:b},1E3,function(){jQuery(document).trigger("moveToFinished",c);delete jQuery.fn.moveTo.animating}),this;a=jQuery("html, body");a.is(":animated")&&(a.stop(),delete jQuery.fn.moveTo.animating);jQuery(document).trigger("moveToStarted");jQuery(window).scrollTop(b);setTimeout(function(){jQuery(document).trigger("moveToFinished",c)},100);return this}jQuery(document).trigger("moveToFinished",
this);return this};return{}}.call(this);;