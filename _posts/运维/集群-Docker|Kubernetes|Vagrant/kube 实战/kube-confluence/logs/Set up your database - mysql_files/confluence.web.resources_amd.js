;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/window-amd.js' */
define("window",function(){return window});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/confluence-amd.js' */
define("confluence/legacy",function(){return Confluence});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/confluence-mobile-amd.js' */
define("confluence-mobile/legacy",function(){return ConfluenceMobile});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/confluence-templates-amd.js' */
define("confluence/templates",["confluence/legacy"],function(a){return a.Templates});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/document-amd.js' */
define("document",["window"],function(a){return a.document});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/ajs-amd.js' */
define("ajs",function(){return AJS});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/jquery-amd.js' */
define("jquery",function(){return"undefined"!==typeof jQuery?jQuery:Zepto});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/memoir-amd.js' */
define("memoir",function(){return memoir});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/underscore-amd.js' */
define("underscore",function(){return _});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/backbone-amd.js' */
define("backbone",["underscore","jquery"],function(){return Backbone});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/aui-templates-amd.js' */
define("aui/templates",function(){return aui});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/skate-amd.js' */
define("skate",["atlassian/libs/skate-0.12.6"],function(a){return a});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/plupload-amd.js' */
define("plupload",function(){return plupload});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/raphael-amd.js' */
define("raphael",function(){return Raphael});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/tinymce-amd.js' */
define("tinymce",["window"],function(a){if((a=a.document.head.querySelector("meta[name='ajs-enabled-dark-features']"))&&a.hasAttribute("content"))a=a.getAttribute("content").split(","),-1!==a.indexOf("frontend.editor.v4")&&-1===a.indexOf("frontend.editor.v4.disable")&&require("confluence-editor-v4/build/editor");return tinymce});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/tinymce-popup-amd.js' */
define("tinymce/popup",function(){return"undefined"===typeof tinyMCEPopup?{}:tinyMCEPopup});;
;
/* module-key = 'confluence.web.resources:amd', location = '/includes/js/amd/shim/wrm-amd.js' */
define("wrm",function(){return WRM});;