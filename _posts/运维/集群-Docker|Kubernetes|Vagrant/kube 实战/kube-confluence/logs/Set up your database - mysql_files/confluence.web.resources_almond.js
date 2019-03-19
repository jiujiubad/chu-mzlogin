;
/* module-key = 'confluence.web.resources:almond', location = '/includes/js/amd/almond-noconflict-pre.js' */
window.__require=window.require;window.__requirejs=window.requirejs;window.__define=window.define;;
;
/* module-key = 'confluence.web.resources:almond', location = '/includes/js/amd/almond/almond.js' */
var requirejs,require,define;
(function(m){function q(a,b){var c,f,d,g,h,k,v,e,l,n=b&&b.split("/"),m=j.map,i=m&&m["*"]||{};if(a&&"."===a.charAt(0))if(b){n=n.slice(0,n.length-1);a=n.concat(a.split("/"));for(e=0;e<a.length;e+=1)if(c=a[e],"."===c)a.splice(e,1),e-=1;else if(".."===c)if(1===e&&(".."===a[2]||".."===a[0]))break;else 0<e&&(a.splice(e-1,2),e-=2);a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||i)&&m){c=a.split("/");for(e=c.length;0<e;e-=1){f=c.slice(0,e).join("/");if(n)for(l=n.length;0<l;l-=1)if(d=m[n.slice(0,
l).join("/")])if(d=d[f]){g=d;h=e;break}if(g)break;!k&&(i&&i[f])&&(k=i[f],v=e)}!g&&k&&(g=k,h=v);g&&(c.splice(0,h,g),a=c.join("/"))}return a}function w(a,b){return function(){return i.apply(m,y.call(arguments,0).concat([a,b]))}}function z(a){return function(b){return q(b,a)}}function A(a){return function(b){h[a]=b}}function r(a){if(l.call(o,a)){var b=o[a];delete o[a];t[a]=!0;s.apply(m,b)}if(!l.call(h,a)&&!l.call(t,a))throw Error("No "+a);return h[a]}function x(a){var b,c=a?a.indexOf("!"):-1;-1<c&&(b=
a.substring(0,c),a=a.substring(c+1,a.length));return[b,a]}var s,i,u,p,h={},o={},j={},t={},l=Object.prototype.hasOwnProperty,y=[].slice;u=function(a,b){var c,f=x(a),d=f[0],a=f[1];d&&(d=q(d,b),c=r(d));d?a=c&&c.normalize?c.normalize(a,z(b)):q(a,b):(a=q(a,b),f=x(a),d=f[0],a=f[1],d&&(c=r(d)));return{f:d?d+"!"+a:a,n:a,pr:d,p:c}};p={require:function(a){return w(a)},exports:function(a){var b=h[a];return"undefined"!==typeof b?b:h[a]={}},module:function(a){return{id:a,uri:"",exports:h[a],config:function(){return j&&
j.config&&j.config[a]||{}}}}};s=function(a,b,c,f){var d,g,i,k,j=[],e,f=f||a;if("function"===typeof c){b=!b.length&&c.length?["require","exports","module"]:b;for(k=0;k<b.length;k+=1)if(i=u(b[k],f),g=i.f,"require"===g)j[k]=p.require(a);else if("exports"===g)j[k]=p.exports(a),e=!0;else if("module"===g)d=j[k]=p.module(a);else if(l.call(h,g)||l.call(o,g)||l.call(t,g))j[k]=r(g);else if(i.p)i.p.load(i.n,w(f,!0),A(g),{}),j[k]=h[g];else throw Error(a+" missing "+g);b=c.apply(h[a],j);if(a)if(d&&d.exports!==
m&&d.exports!==h[a])h[a]=d.exports;else if(b!==m||!e)h[a]=b}else a&&(h[a]=c)};requirejs=require=i=function(a,b,c,f,d){if("string"===typeof a)return p[a]?p[a](b):r(u(a,b).f);a.splice||(j=a,b.splice?(a=b,b=c,c=null):a=m);b=b||function(){};"function"===typeof c&&(c=f,f=d);f?s(m,a,b,c):setTimeout(function(){s(m,a,b,c)},4);return i};i.config=function(a){j=a;j.deps&&i(j.deps,j.callback);return i};define=function(a,b,c){b.splice||(c=b,b=[]);!l.call(h,a)&&!l.call(o,a)&&(o[a]=[a,b,c])};define.amd={jQuery:!0}})();;
;
/* module-key = 'confluence.web.resources:almond', location = '/includes/js/dist/amd-instrumenter.js' */
function AmdInstrumenter(a){this.config=a;this.originalRequire=window.require}AmdInstrumenter.prototype.instrument=function(a){var d=this;if("undefined"===typeof window.require.instrumented||!0!==window.require.instrumented)window.require=function(b){if(Array.isArray(b))for(var c=0;c<b.length;c++)a.log({name:b[c]},"amdRecord");else a.log({name:b},"amdRecord");return d.originalRequire.apply(require,arguments)},window.require.config=d.originalRequire.config,window.require.instrumented=!0};
AmdInstrumenter.prototype.restore=function(){window.require.instrumented&&(window.require=this.originalRequire)};;
;
/* module-key = 'confluence.web.resources:almond', location = '/includes/js/amd-usage-reporting.js' */
var AmdUsageReporting=function(a,b){this.amdInstrumenter=a;this.configObject=b};AmdUsageReporting.prototype.enable=function(){var a=document.querySelector('meta[name="ajs-enabled-dark-features"]');null!==a&&(a=a.getAttribute("content"),null!==a&&(a=a.split(","),-1<a.indexOf("confluence.frontend.stats")&&-1<a.indexOf("confluence.frontend.amd.stats")&&(a=new this.amdInstrumenter(this.configObject),window.jsReporting?window.jsReporting.addInstrumenter("amdInstrument",a):window.console.warn("Js Reporting plugin is undefined."))))};
if("undefined"!==typeof AmdInstrumenter){var amdUsageReporter=new AmdUsageReporting(AmdInstrumenter,{flushAtCount:50,flushAtTime:6E4});amdUsageReporter.enable()};;
;
/* module-key = 'confluence.web.resources:almond', location = '/includes/js/amd/almond-noconflict-post.js' */
window.__require?(window.require=window.__require,window.requirejs=window.__requirejs,window.define=window.__define):delete window.define.amd;try{delete window.__require}catch(e){window.__require=void 0}try{delete window.__requirejs}catch(e$$1){window.__requirejs=void 0}try{delete window.__define}catch(e$$2){window.__define=void 0};;