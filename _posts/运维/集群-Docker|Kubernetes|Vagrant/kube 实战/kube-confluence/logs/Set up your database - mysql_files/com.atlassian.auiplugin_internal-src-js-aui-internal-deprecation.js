;
/* module-key = 'com.atlassian.auiplugin:internal-src-js-aui-internal-deprecation', location = 'src/js/aui/internal/deprecation.js' */
("undefined"===typeof window?global:window).__1f642ac889edd28b9a56a069e947b2fa=function(){function k(){"undefined"!==typeof console&&console.warn&&Function.prototype.apply.call(console.warn,console,arguments)}function h(c,b){if("function"===typeof c)return c;var a=!1,b=b||{};return function(d){var d=d?d:1,f=Error();(f=(f=f.stack||f.stacktrace)&&f.replace(/^Error\n/,"")||"")?(f=f.split("\n"),d=f[d+2]):d=f;d=d||"";if(!a||-1===n.indexOf(d)){n.push(d);a=!0;var f="DEPRECATED "+(b.deprecationType+" "||
"")+"- ",e;e=c;e=(e+="")?e.charAt(0).toUpperCase()+e.substring(1):"";f=f+e+" has been deprecated"+(b.sinceVersion?" since "+b.sinceVersion:"")+" and will be removed in "+(b.removeInVersion||"a future release")+".";b.alternativeName&&(f+=" Use "+b.alternativeName+" instead. ");b.extraInfo&&(f+=" "+b.extraInfo);d=""===d?" \n No stack trace of the deprecated usage is available in your current browser.":" \n "+d;b.extraObject?k(f+"\n",b.extraObject,d):k(f,d)}}}function o(c,b){var a=c.options.displayName,
a=a?" ("+a+")":"",d=l.default.extend({deprecationType:"CSS",extraObject:b},c.options);h("'"+c.selector+"' pattern"+a,d)()}function i(c,b,a){a=a||{};a.deprecationType=a.deprecationType||"JS";var d=h(b||c.name||"this function",a);return function(){d();return c.apply(this,arguments)}}function p(c,b,a){a=a||{};a.deprecationType=a.deprecationType||"JS";b=i(c,b,a);b.prototype=c.prototype;l.default.extend(b,c);return b}function m(c,b,a){if("function"===typeof c[b])a=a||{},a.deprecationType=a.deprecationType||
"JS",c[b]=i(c[b],a.displayName||b,a);else if(j){var d=c[b],a=a||{};a.deprecationType=a.deprecationType||"JS";var e=h(a.displayName||b,a);Object.defineProperty(c,b,{get:function(){e();return d},set:function(a){d=a;e();return a}})}}function q(c,b,a){var a=a||{},d;for(d in c)t.call(c,d)&&(a.deprecationType=a.deprecationType||"JS",a.displayName=b+d,a.alternativeName=a.alternativeNamePrefix&&a.alternativeNamePrefix+d,m(c,d,l.default.extend({},a)))}function u(c){return function(b){var a={selector:b,options:c||
{}};r.push(a);for(var b=document.querySelectorAll(b),d=0;d<b.length;d++)o(a,b[d])}}function s(c,b){window.MutationObserver?("string"===typeof c&&(c=[c]),c.forEach(u(b))):k("CSS could not be deprecated as Mutation Observer was not found.")}function v(c){return function(b){(c.matches||c.msMatchesSelector||c.webkitMatchesSelector||c.mozMatchesSelector||c.oMatchesSelector).call(c,b.selector)&&o(b,c)}}var e={};"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.getMessageLogger=e.propertyDeprecationSupported=
e.obj=e.prop=e.css=e.construct=e.fn=void 0;var g=__1eb48266f41b91e032ea4c8f591d9298,l=g&&g.__esModule?g:{"default":g},g=(g=__b613df58051c78dae364b2cf48254285)&&g.__esModule?g:{"default":g},t=Object.prototype.hasOwnProperty,n=[],r=[],j=!1;try{Object.defineProperty&&(Object.defineProperty({},"blam",{get:function(){},set:function(){}}),e.propertyDeprecationSupported=j=!0)}catch(x){}window.MutationObserver&&(new MutationObserver(function(c){c.forEach(function(b){for(var b=b.addedNodes,a=0;a<b.length;a++){var c=
b[a];1===c.nodeType&&r.forEach(v(c))}})})).observe(document,{childList:!0,subtree:!0});var w={fn:i,construct:p,css:s,prop:m,obj:q,propertyDeprecationSupported:j,getMessageLogger:h};(0,g.default)("deprecate",w);e.fn=i;e.construct=p;e.css=s;e.prop=m;e.obj=q;e.propertyDeprecationSupported=j;e.getMessageLogger=h;return e}.call(this);;