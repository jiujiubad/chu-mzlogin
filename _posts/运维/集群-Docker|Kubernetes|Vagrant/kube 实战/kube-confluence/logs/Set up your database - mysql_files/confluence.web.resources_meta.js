;
/* module-key = 'confluence.web.resources:meta', location = '/includes/js/meta.js' */
define("confluence/meta",["jquery","confluence/api/type-helpers"],function(b,d){var c={};return{set:function(a,b){c[a]=b},get:function(a){if("undefined"!==typeof c[a])return c[a];a=b("meta[name='ajs-"+a+"']");if(a.length)return a=a.attr("content"),d.asBooleanOrString(a)},getBoolean:function(a){return!0===this.get(a)},getNumber:function(a){return+this.get(a)},getAllAsMap:function(){var a={};b("meta[name^=ajs-]").each(function(){a[this.name.substring(4)]=this.content});return b.extend(a,c)}}});
require("confluence/module-exporter").exportModuleAsGlobal("confluence/meta","AJS.Meta");;
;
/* module-key = 'confluence.web.resources:meta', location = '/includes/js/page-links.js' */
define("confluence/page-links",["jquery"],function(a){return{canonical:function(){return a('head link[rel="canonical"]').attr("href")},shortlink:function(){return a('head link[rel="shortlink"]').attr("href")}}});require("confluence/module-exporter").exportModuleAsGlobal("confluence/page-links","AJS.Meta.Links");;