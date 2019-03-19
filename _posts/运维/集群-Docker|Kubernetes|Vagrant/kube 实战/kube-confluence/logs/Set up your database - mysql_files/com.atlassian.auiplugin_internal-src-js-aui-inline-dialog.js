;
/* module-key = 'com.atlassian.auiplugin:internal-src-js-aui-inline-dialog', location = 'src/js/aui/inline-dialog.js' */
("undefined"===typeof window?global:window).__b4997e7c0a55381ec0848d18c6e51b28=function(){function B(b){if(b&&b.__esModule)return b;var c={};if(null!=b)for(var d in b)Object.prototype.hasOwnProperty.call(b,d)&&(c[d]=b[d]);c.default=b;return c}function u(b){return b&&b.__esModule?b:{"default":b}}function w(b,c,l,a){a=a||[];a.hasOwnProperty("onTop")&&(E(),a.onTop&&void 0===a.gravity&&(a.gravity="s"));if("undefined"===typeof c&&(c=String(Math.random()).replace(".",""),(0,d.default)("#inline-dialog-"+
c+", #arrow-"+c+", #inline-dialog-shim-"+c).length))throw"GENERATED_IDENTIFIER_NOT_UNIQUE";var g=(0,F.default)(c),e=d.default.extend(!1,w.opts,a);"w"===e.gravity&&(e.offsetX=void 0===a.offsetX?10:a.offsetX,e.offsetY=void 0===a.offsetY?0:a.offsetY);var i,j,h,k=!1,o=!1,q=!1,m,t,f=(0,d.default)('<div id="inline-dialog-'+c+'" class="aui-inline-dialog"><div class="aui-inline-dialog-contents contents"></div><div id="arrow-'+c+'" class="aui-inline-dialog-arrow arrow aui-css-arrow"></div></div>'),n=(0,d.default)("#arrow-"+
g,f),p=f.find(".contents");e.displayShadow||p.addClass("aui-inline-dialog-no-shadow");e.autoWidth?p.addClass("aui-inline-dialog-auto-width"):p.width(e.width);p.on({mouseenter:function(){clearTimeout(j);f.unbind("mouseenter")},mouseleave:function(){r()}});var s=function(){i||(i={popup:f,hide:function(){r(0)},id:c,show:function(){x()},persistent:e.persistent?true:false,reset:function(){var a=(0,d.default)(window).height(),a=Math.round(a*0.75);f.children(".aui-inline-dialog-contents").css("max-height",
a);a=e.calculatePositions(f,t,m,e);if(a.hasOwnProperty("displayAbove")){G();a.gravity=a.displayAbove?"s":"n"}f.css(a.popupCss);n.removeClass("aui-bottom-arrow aui-left-arrow aui-right-arrow");a.gravity==="s"&&!n.hasClass("aui-bottom-arrow")?n.addClass("aui-bottom-arrow"):a.gravity==="w"?n.addClass("aui-left-arrow"):a.gravity==="e"&&n.addClass("aui-right-arrow");n.css(a.arrowCss);f.fadeIn(e.fadeTime,function(){});if((0,H.needsLayeringShim)()){a=(0,d.default)("#inline-dialog-shim-"+g);a.length||(0,
d.default)(f).prepend((0,d.default)('<iframe class = "inline-dialog-shim" id="inline-dialog-shim-'+c+'" frameBorder="0" src="javascript:false;"></iframe>'));a.css({width:p.outerWidth(),height:p.outerHeight()})}}});return i},x=function(){f.is(":visible")||(h=setTimeout(function(){if(q&&o){e.addActiveClass&&(0,d.default)(b).addClass("active");k=true;if(!e.persistent){if(!v){(0,d.default)("body").bind("click."+A,function(a){(0,d.default)(a.target).closest("#inline-dialog-"+g+" .contents").length===0&&
r(0)});v=true}(0,d.default)(document).on("keydown",B)}w.current=s();(0,d.default)(document).trigger("showLayer",["inlineDialog",s()]);s().reset()}},e.showDelay))},r=function(a){if(!(typeof a==="undefined"&&e.persistent)&&typeof f.get(0)._datePickerPopup==="undefined"){o=false;if(k&&e.preHideCallback.call(f[0].popup)){a=a==null?e.hideDelay:a;clearTimeout(j);clearTimeout(h);a!=null&&(j=setTimeout(function(){v&&(0,d.default)("body").unbind("click."+A);v=false;(0,d.default)(document).off("keydown",B);
e.addActiveClass&&(0,d.default)(b).removeClass("active");f.fadeOut(e.fadeTime,function(){e.hideCallback.call(f[0].popup)});o=k=false;(0,d.default)(document).trigger("hideLayer",["inlineDialog",s()]);w.current=null;if(!e.cacheContent)u=q=false},a))}}},z=function(a,b){var g=(0,d.default)(b);e.upfrontCallback.call({popup:f,hide:function(){r(0)},id:c,show:function(){x()}});f.each(function(){typeof this.popup!=="undefined"&&this.popup.hide()});e.closeOthers&&(0,d.default)(".aui-inline-dialog").each(function(){!this.popup.persistent&&
this.popup.hide()});t={target:g};m=a?{x:a.pageX,y:a.pageY}:{x:g.offset().left,y:g.offset().top};k||clearTimeout(h);o=true;g=function(){u=false;q=true;e.initCallback.call({popup:f,hide:function(){r(0)},id:c,show:function(){x()}});x()};if(!u){u=true;d.default.isFunction(l)?l(p,b,g):d.default.get(l,function(a,b,d){p.html(e.responseHandler(a,b,d));q=true;e.initCallback.call({popup:f,hide:function(){r(0)},id:c,show:function(){x()}});x()})}clearTimeout(j);k||x();return false};f[0].popup=s();var u=!1,y=
!1,C=function(){if(!y){(0,d.default)(e.container).append(f);y=true}},a=(0,d.default)(b);if(e.onHover)if(e.useLiveEvents)if(a.selector)(0,d.default)(document).on("mouseenter",a.selector,function(a){C();z(a,this)}).on("mouseleave",a.selector,function(){r()});else D.log("Warning: inline dialog trigger elements must have a jQuery selector when the useLiveEvents option is enabled.");else a.on({mouseenter:function(a){C();z(a,this)},mouseleave:function(){r()}});else if(!e.noBind)if(e.useLiveEvents)if(a.selector)(0,
d.default)(document).on("click",a.selector,function(a){C();k&&e.closeOnTriggerClick?f.hide():z(a,this);return false}).on("mouseleave",a.selector,function(){r()});else D.log("Warning: inline dialog trigger elements must have a jQuery selector when the useLiveEvents option is enabled.");else a.on("click",function(a){C();k&&e.closeOnTriggerClick?f.hide():z(a,this);return false}).on("mouseleave",function(){r()});var v=!1,A=c+".inline-dialog-check",B=function(a){a.keyCode===I.default.ESCAPE&&r(0)};f.show=
function(a,c){a&&a.stopPropagation();C();e.noBind&&(!b||!b.length)?z(a,c===void 0?a.target:c):z(a,b)};f.hide=function(){r(0)};f.refresh=function(){k&&s().reset()};f.getOptions=function(){return e};return f}function y(b){var b=(0,d.default)(b),c=d.default.extend({left:0,top:0},b.offset());return{left:c.left,top:c.top,width:b.outerWidth(),height:b.outerHeight()}}function J(b,c,l,a){var g,e,i,j,h,k,o,q,m=d.default.isFunction(a.offsetX)?a.offsetX(b,c,l,a):a.offsetX,t=d.default.isFunction(a.offsetY)?a.offsetY(b,
c,l,a):a.offsetY;d.default.isFunction(a.arrowOffsetX)&&a.arrowOffsetX(b,c,l,a);l=d.default.isFunction(a.arrowOffsetY)?a.arrowOffsetY(b,c,l,a):a.arrowOffsetY;h="body"!==a.container.toLowerCase();i=(0,d.default)(a.container);a=h?(0,d.default)(a.container).parent():(0,d.default)(window);j=h?i.offset():{left:0,top:0};h&&a.offset();g=c.target;h=g.offset();e=g[0].getBBox&&g[0].getBBox();c=a.scrollTop();q=a.scrollLeft();a.width();a=a.height();o=i.width();i.height();i=h.top-j.top;j=h.left-j.left;h=e?e.width:
g.outerWidth();k=e?e.height:g.outerHeight();g=b.width();e=b.height();var f=10,n=b.find(".arrow").outerHeight(),p=i-c,s=j-q,b=Math.floor(k/2);q=Math.floor(e/2);k=Math.floor(n/2);o=!(o-s-h-m-f>=g)&&s-m-f>=g?"e":"w";s=p+b-k;n=a-s-n;f=Math.min(f,s-5);f=Math.min(f,n-5);n=p+b;p=Math.max(n-f,0);n=Math.max(a-n-f,0);q-t>p?(m={top:c+f,left:"w"===o?j+h+m:j-g-m},t={top:i+b-(m.top+k)}):q+t>n?(m={top:c+a-e-f,left:"w"===o?j+h+m:j-g-m},t={top:i+b-(m.top+k)}):(m={top:i+b-q+t,left:"w"===o?j+h+m:j-g-m},t={top:q-k+l});
return{gravity:o,popupCss:m,arrowCss:t}}function K(b,c,l,a){var g=d.default.isFunction(a.offsetX)?a.offsetX(b,c,l,a):a.offsetX,e=d.default.isFunction(a.offsetY)?a.offsetY(b,c,l,a):a.offsetY,i=d.default.isFunction(a.arrowOffsetX)?a.arrowOffsetX(b,c,l,a):a.arrowOffsetX,j=y(window),h=y(c.target),c=y(b),b=y(b.find(".aui-inline-dialog-arrow")),k=h.left+h.width/2,o=(window.pageYOffset||document.documentElement.scrollTop)+j.height;c.top=h.top+h.height+~~e;c.left=h.left+~~g;g=j.width-(c.left+c.width+10);
b.left=k-c.left+~~i;b.top=-(b.height/2);i=h.top>c.height;if(i=!(c.top+c.height<o)&&i||i&&"s"===a.gravity)c.top=h.top-c.height-b.height/2,b.top=c.height;a.isRelativeToMouse?0>g?(c.right=10,c.left="auto",b.left=l.x-(j.width-c.width)):(c.left=l.x-20,b.left=l.x-c.left):0>g?(c.right=10,c.left="auto",l=j.width-c.right-c.width,b.right="auto",b.left=k-l-b.width/2):c.width<=h.width/2&&(b.left=c.width/2,c.left=k-c.width/2);return{gravity:i?"s":"n",displayAbove:i,popupCss:{left:c.left,top:c.top,right:c.right},
arrowCss:{left:b.left,top:b.top,right:b.right}}}var v={};Object.defineProperty(v,"__esModule",{value:!0});var d=u(__1eb48266f41b91e032ea4c8f591d9298),H=__a37f8278b12fcc512e18899c7286d9a8,A=B(__1f642ac889edd28b9a56a069e947b2fa),D=B(__89656e4711dc98e663b0f5fc5aa5d55c),L=u(__b613df58051c78dae364b2cf48254285),I=u(__2d62fee3ee7452731a665cbfb7024e5c),F=u(__7d86197ea8cace35ffe896b6cc1a5c7e);w.opts={onTop:!1,responseHandler:function(b){return b},closeOthers:!0,isRelativeToMouse:!1,addActiveClass:!0,onHover:!1,
useLiveEvents:!1,noBind:!1,fadeTime:100,persistent:!1,hideDelay:1E4,showDelay:0,width:300,offsetX:0,offsetY:10,arrowOffsetX:0,arrowOffsetY:0,container:"body",cacheContent:!0,displayShadow:!0,autoWidth:!1,gravity:"n",closeOnTriggerClick:!1,preHideCallback:function(){return!0},hideCallback:function(){},initCallback:function(){},upfrontCallback:function(){},calculatePositions:function(b,c,d,a){a=a||{};return("w"===a.gravity?J:K)(b,c,d,a)}};var w=A.construct(w,"Inline dialog constructor",{alternativeName:"inline dialog 2"}),
G=A.getMessageLogger("displayAbove","[remove version]",{alternativeName:"gravity",extraInfo:"See https://ecosystem.atlassian.net/browse/AUI-2197."}),E=A.getMessageLogger("onTop","[remove version]",{alternativeName:"gravity",extraInfo:"See https://ecosystem.atlassian.net/browse/AUI-2197."});(0,L.default)("InlineDialog",w);v.default=w;return v=v["default"]}.call(this);;