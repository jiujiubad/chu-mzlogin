;
/* module-key = 'com.atlassian.auiplugin:internal-src-js-aui-navigation', location = 'src/js/aui/navigation.js' */
("undefined"===typeof window?global:window).__3a1917cf0d5c6ddbfc3648da2ad27148=function(){function c(a){return a&&a.__esModule?a:{"default":a}}function b(a){this.$el=(0,d.default)(a).closest(".aui-nav");if(1<this.$el.length)return this.$el.map(function(a,d){return new b(d)})[0];if(this.$el.data("aui-navigation"))return this.$el.data("aui-navigation");this.$el.data("aui-navigation",this);this.$treeParent=this.$el.parent("li[aria-expanded]");this.$subtreeToggleIcon=this.$treeParent.children(".aui-nav-subtree-toggle").children("span.aui-icon");
this.hideMoreItems();this.$el.children("li:has(.aui-nav-selected)").addClass("aui-nav-child-selected");a=this.$el.children(".aui-nav-selected");a.parents(".aui-nav > [aria-expanded=false]").add(a.filter("[aria-expanded=false]")).each(function(){e((0,d.default)(this).children(".aui-nav")).expand()});this.$el.find("> li[aria-expanded] > .aui-nav-subtree-toggle").on("click",function(){e((0,d.default)(this).siblings(".aui-nav")).toggle()});return this}var f={};"use strict";Object.defineProperty(f,"__esModule",
{value:!0});__b32f862918680df4e9f235eb6ba33e07;var d=c(__1eb48266f41b91e032ea4c8f591d9298),g=c(__c78625c2aff08e683738b7980cffc672),h=c(__b613df58051c78dae364b2cf48254285),i=c(__045396eb80ea30210d7d51a20e70f6a3);b.prototype.isNested=function(){return 1===this.$treeParent.length};b.prototype.isCollapsed=function(){return"false"===this.$treeParent.attr("aria-expanded")};b.prototype.expand=function(){this.$treeParent.attr("aria-expanded","true");this.$subtreeToggleIcon.removeClass("aui-iconfont-collapsed").addClass("aui-iconfont-expanded");
this.hideMoreItems();return this};b.prototype.collapse=function(){this.$treeParent.attr("aria-expanded","false");this.$subtreeToggleIcon.removeClass("aui-iconfont-expanded").addClass("aui-iconfont-collapsed");return this};b.prototype.toggle=function(){this.isCollapsed()?this.expand():this.collapse();return this};b.prototype.hideMoreItems=function(){if(this.$el.is(".aui-nav:not([aria-expanded=false]) [data-more]")){var a=this.$el.attr("data-more")||"aui.words.moreitem",b=Math.abs(parseInt(this.$el.attr("data-more-limit")))||
5,c=this.$el.children("li"),e=c.length<=b+1,f=c.filter(".aui-nav-selected").length,g=c.filter(".aui-nav-more").length;if(e||f||g)return this;(0,d.default)("<li>",{"class":"aui-nav-more","aria-hidden":"true"}).append((0,d.default)("<a>",{href:"#","class":"aui-nav-item",text:a,click:function(a){a.preventDefault();(0,d.default)(this).parent().remove()}})).insertAfter(c.eq(b-1))}return this};var e=(0,i.default)("navigation",b);(0,g.default)("aui-nav",{type:g.default.type.CLASSNAME,attached:function(a){new b(a)},
detached:function(a){(0,d.default)(a).removeData()}});(0,h.default)("navigation",e);f.default=e;return f=f["default"]}.call(this);;