;
/* module-key = 'com.atlassian.auiplugin:internal-src-js-aui-template', location = 'src/js/aui/template.js' */
("undefined"===typeof window?global:window).__bef1aeeb0caeb1bf87862664b33aff27=function(){function i(b){return b&&b.__esModule?b:{"default":b}}var e={};"use strict";Object.defineProperty(e,"__esModule",{value:!0});var f=i(__1eb48266f41b91e032ea4c8f591d9298),m=i(__243168c81594cda3be4f65d33a9d270e),n=i(__b613df58051c78dae364b2cf48254285),o=f.default,k=/\{([^\}]+)\}/g,p=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,l=function(b,a,d,e){var c=d;a.replace(p,function(b,a,d,f,g){a=a||f;c&&(a+
":html"in c?(c=c[a+":html"],e=!0):a in c&&(c=c[a]),g&&"function"===typeof c&&(c=c()))});if(null==c||c===d)c=b;c=String(c);e||(c=g.escape(c));return c},q=function(b){this.template=this.template.replace(k,function(a,d){return l(a,d,b,!0)});return this},r=function(b){this.template=this.template.replace(k,function(a,d){return l(a,d,b)});return this},s=function(){return this.template},g=function(b){function a(){return a.template}a.template=String(b);a.toString=a.valueOf=s;a.fill=r;a.fillHtml=q;return a},
h={},j=[];g.load=function(b){b=String(b);if(!h.hasOwnProperty(b)){1E3<=j.length&&delete h[j.shift()];j.push(b);var a=b,d,e=b;d=o("script").filter(function(){return this.getAttribute("title")===e});h[a]=d[0].text}return this(h[b])};g.escape=m.default;f=g;(0,n.default)("template",f);e.default=f;return e=e["default"]}.call(this);;