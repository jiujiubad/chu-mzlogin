;
/* module-key = 'com.atlassian.auiplugin:internal-src-js-vendor-underscorejs-underscore', location = 'src/js-vendor/underscorejs/underscore.js' */
("undefined"===typeof window?global:window).__0a791235a48093f6af7f79cdeaaa24aa=function(){var p={exports:{}},r=p.exports,x={module:p,exports:r},s;s=function(n,q,m){var k=("undefined"===typeof window?global:window).define,l,o,m=[m,q,n].filter(function(i){return"function"===typeof i})[0],q=[q,n,[]].filter(Array.isArray)[0];l=m.apply(null,q.map(function(i){return x[i]}));o=typeof l;"function"===typeof k&&k("string"===typeof n?n:"__0a791235a48093f6af7f79cdeaaa24aa",q,m);"string"===o?l=String(l):"number"===
o?l=Number(l):"boolean"===o&&(l=Boolean(l));void 0!==l&&(r=p.exports=l)};s.amd=!0;(function(){var n=this,q=n._,m={},k=Array.prototype,l=Object.prototype,o=k.push,i=k.slice,v=k.concat,t=l.toString,s=l.hasOwnProperty,E=k.forEach,F=k.map,G=k.reduce,H=k.reduceRight,I=k.filter,J=k.every,K=k.some,w=k.indexOf,L=k.lastIndexOf,l=Array.isArray,x=Object.keys,y=Function.prototype.bind,b=function(a){if(a instanceof b)return a;if(!(this instanceof b))return new b(a);this._wrapped=a};"undefined"!==typeof r?("undefined"!==
typeof p&&p.exports&&(r=p.exports=b),r._=b):n._=b;b.VERSION="1.5.2";var j=b.each=b.forEach=function(a,c,d){if(a!=null)if(E&&a.forEach===E)a.forEach(c,d);else if(a.length===+a.length)for(var e=0,f=a.length;e<f;e++){if(c.call(d,a[e],e,a)===m)break}else for(var g=b.keys(a),e=0,f=g.length;e<f;e++)if(c.call(d,a[g[e]],g[e],a)===m)break};b.map=b.collect=function(a,c,b){var e=[];if(a==null)return e;if(F&&a.map===F)return a.map(c,b);j(a,function(a,g,h){e.push(c.call(b,a,g,h))});return e};b.reduce=b.foldl=
b.inject=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(G&&a.reduce===G){e&&(c=b.bind(c,e));return f?a.reduce(c,d):a.reduce(c)}j(a,function(a,b,O){if(f)d=c.call(e,d,a,b,O);else{d=a;f=true}});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(H&&a.reduceRight===H){e&&(c=b.bind(c,e));return f?a.reduceRight(c,d):a.reduceRight(c)}var g=a.length;if(g!==+g)var h=b.keys(a),g=
h.length;j(a,function(b,i,k){i=h?h[--g]:--g;if(f)d=c.call(e,d,a[i],i,k);else{d=a[i];f=true}});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.find=b.detect=function(a,c,b){var e;M(a,function(a,g,h){if(c.call(b,a,g,h)){e=a;return true}});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(I&&a.filter===I)return a.filter(c,b);j(a,function(a,g,h){c.call(b,a,g,h)&&e.push(a)});return e};b.reject=function(a,c,d){return b.filter(a,function(a,b,
g){return!c.call(d,a,b,g)},d)};b.every=b.all=function(a,c,d){c||(c=b.identity);var e=true;if(a==null)return e;if(J&&a.every===J)return a.every(c,d);j(a,function(a,b,h){if(!(e=e&&c.call(d,a,b,h)))return m});return!!e};var M=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=false;if(a==null)return e;if(K&&a.some===K)return a.some(c,d);j(a,function(a,b,h){if(e||(e=c.call(d,a,b,h)))return m});return!!e};b.contains=b.include=function(a,c){return a==null?false:w&&a.indexOf===w?a.indexOf(c)!=-1:M(a,function(a){return a===
c})};b.invoke=function(a,c){var d=i.call(arguments,2),e=b.isFunction(c);return b.map(a,function(a){return(e?c:a[c]).apply(a,d)})};b.pluck=function(a,c){return b.map(a,function(a){return a[c]})};b.where=function(a,c,d){return b.isEmpty(c)?d?void 0:[]:b[d?"find":"filter"](a,function(a){for(var b in c)if(c[b]!==a[b])return false;return true})};b.findWhere=function(a,c){return b.where(a,c,true)};b.max=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.max.apply(Math,a);if(!c&&
b.isEmpty(a))return-Infinity;var e={computed:-Infinity,value:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;var e={computed:Infinity,value:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&(e={value:a,computed:b})});return e.value};b.shuffle=function(a){var c,d=0,e=[];j(a,function(a){c=
b.random(d++);e[d-1]=e[c];e[c]=a});return e};b.sample=function(a,c,d){return arguments.length<2||d?a[b.random(a.length-1)]:b.shuffle(a).slice(0,Math.max(0,c))};var z=function(a){return b.isFunction(a)?a:function(c){return c[a]}};b.sortBy=function(a,c,d){var e=z(c);return b.pluck(b.map(a,function(a,c,b){return{value:a,index:c,criteria:e.call(d,a,c,b)}}).sort(function(a,c){var b=a.criteria,d=c.criteria;if(b!==d){if(b>d||b===void 0)return 1;if(b<d||d===void 0)return-1}return a.index-c.index}),"value")};
var A=function(a){return function(c,d,e){var f={},g=d==null?b.identity:z(d);j(c,function(b,d){var i=g.call(e,b,d,c);a(f,i,b)});return f}};b.groupBy=A(function(a,c,d){(b.has(a,c)?a[c]:a[c]=[]).push(d)});b.indexBy=A(function(a,c,b){a[c]=b});b.countBy=A(function(a,c){b.has(a,c)?a[c]++:a[c]=1});b.sortedIndex=function(a,c,d,e){for(var d=d==null?b.identity:z(d),c=d.call(e,c),f=0,g=a.length;f<g;){var h=f+g>>>1;d.call(e,a[h])<c?f=h+1:g=h}return f};b.toArray=function(a){return!a?[]:b.isArray(a)?i.call(a):
a.length===+a.length?b.map(a,b.identity):b.values(a)};b.size=function(a){return a==null?0:a.length===+a.length?a.length:b.keys(a).length};b.first=b.head=b.take=function(a,c,b){return a==null?void 0:c==null||b?a[0]:i.call(a,0,c)};b.initial=function(a,c,b){return i.call(a,0,a.length-(c==null||b?1:c))};b.last=function(a,c,b){return a==null?void 0:c==null||b?a[a.length-1]:i.call(a,Math.max(a.length-c,0))};b.rest=b.tail=b.drop=function(a,b,d){return i.call(a,b==null||d?1:b)};b.compact=function(a){return b.filter(a,
b.identity)};var N=function(a,c,d){if(c&&b.every(a,b.isArray))return v.apply(d,a);j(a,function(a){b.isArray(a)||b.isArguments(a)?c?o.apply(d,a):N(a,c,d):d.push(a)});return d};b.flatten=function(a,b){return N(a,b,[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,c,d,e){if(b.isFunction(c)){e=d;d=c;c=false}var d=d?b.map(a,d,e):a,f=[],g=[];j(d,function(d,e){if(c?!e||g[g.length-1]!==d:!b.contains(g,d)){g.push(d);f.push(a[e])}});return f};b.union=function(){return b.uniq(b.flatten(arguments,
true))};b.intersection=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a){var c=v.apply(k,i.call(arguments,1));return b.filter(a,function(a){return!b.contains(c,a)})};b.zip=function(){for(var a=b.max(b.pluck(arguments,"length").concat(0)),c=Array(a),d=0;d<a;d++)c[d]=b.pluck(arguments,""+d);return c};b.object=function(a,b){if(a==null)return{};for(var d={},e=0,f=a.length;e<f;e++)b?d[a[e]]=b[e]:
d[a[e][0]]=a[e][1];return d};b.indexOf=function(a,c,d){if(a==null)return-1;var e=0,f=a.length;if(d)if(typeof d=="number")e=d<0?Math.max(0,f+d):d;else{e=b.sortedIndex(a,c);return a[e]===c?e:-1}if(w&&a.indexOf===w)return a.indexOf(c,d);for(;e<f;e++)if(a[e]===c)return e;return-1};b.lastIndexOf=function(a,b,d){if(a==null)return-1;var e=d!=null;if(L&&a.lastIndexOf===L)return e?a.lastIndexOf(b,d):a.lastIndexOf(b);for(d=e?d:a.length;d--;)if(a[d]===b)return d;return-1};b.range=function(a,b,d){if(arguments.length<=
1){b=a||0;a=0}for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),f=0,g=Array(e);f<e;){g[f++]=a;a=a+d}return g};var B=function(){};b.bind=function(a,c){var d,e;if(y&&a.bind===y)return y.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;d=i.call(arguments,2);return e=function(){if(!(this instanceof e))return a.apply(c,d.concat(i.call(arguments)));B.prototype=a.prototype;var b=new B;B.prototype=null;var g=a.apply(b,d.concat(i.call(arguments)));return Object(g)===g?g:b}};b.partial=
function(a){var b=i.call(arguments,1);return function(){return a.apply(this,b.concat(i.call(arguments)))}};b.bindAll=function(a){var c=i.call(arguments,1);if(c.length===0)throw Error("bindAll must be passed function names");j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,c){var d={};c||(c=b.identity);return function(){var e=c.apply(this,arguments);return b.has(d,e)?d[e]:d[e]=a.apply(this,arguments)}};b.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(null,
d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,b,d){var e,f,g,h=null,i=0;d||(d={});var k=function(){i=d.leading===false?0:new Date;h=null;g=a.apply(e,f)};return function(){var j=new Date;!i&&d.leading===false&&(i=j);var l=b-(j-i);e=this;f=arguments;if(l<=0){clearTimeout(h);h=null;i=j;g=a.apply(e,f)}else!h&&d.trailing!==false&&(h=setTimeout(k,l));return g}};b.debounce=function(a,b,d){var e,f,g,h,i;return function(){g=this;f=arguments;h=
new Date;var k=function(){var j=new Date-h;if(j<b)e=setTimeout(k,b-j);else{e=null;d||(i=a.apply(g,f))}},j=d&&!e;e||(e=setTimeout(k,b));j&&(i=a.apply(g,f));return i}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;d=a.apply(this,arguments);a=null;return d}};b.wrap=function(a,b){return function(){var d=[a];o.apply(d,arguments);return b.apply(this,d)}};b.compose=function(){var a=arguments;return function(){for(var b=arguments,d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};
b.after=function(a,b){return function(){if(--a<1)return b.apply(this,arguments)}};b.keys=x||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var c=[],d;for(d in a)b.has(a,d)&&c.push(d);return c};b.values=function(a){for(var c=b.keys(a),d=c.length,e=Array(d),f=0;f<d;f++)e[f]=a[c[f]];return e};b.pairs=function(a){for(var c=b.keys(a),d=c.length,e=Array(d),f=0;f<d;f++)e[f]=[c[f],a[c[f]]];return e};b.invert=function(a){for(var c={},d=b.keys(a),e=0,f=d.length;e<f;e++)c[a[d[e]]]=d[e];return c};
b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){if(b)for(var d in b)a[d]=b[d]});return a};b.pick=function(a){var b={},d=v.apply(k,i.call(arguments,1));j(d,function(d){d in a&&(b[d]=a[d])});return b};b.omit=function(a){var c={},d=v.apply(k,i.call(arguments,1)),e;for(e in a)b.contains(d,e)||(c[e]=a[e]);return c};b.defaults=function(a){j(i.call(arguments,1),function(b){if(b)for(var d in b)a[d]===
void 0&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?a:b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};var C=function(a,c,d,e){if(a===c)return a!==0||1/a==1/c;if(a==null||c==null)return a===c;if(a instanceof b)a=a._wrapped;if(c instanceof b)c=c._wrapped;var f=t.call(a);if(f!=t.call(c))return false;switch(f){case "[object String]":return a==String(c);case "[object Number]":return a!=+a?c!=+c:a==0?1/a==1/c:a==+c;case "[object Date]":case "[object Boolean]":return+a==
+c;case "[object RegExp]":return a.source==c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase}if(typeof a!="object"||typeof c!="object")return false;for(var g=d.length;g--;)if(d[g]==a)return e[g]==c;var g=a.constructor,h=c.constructor;if(g!==h&&(!b.isFunction(g)||!(g instanceof g&&b.isFunction(h)&&h instanceof h)))return false;d.push(a);e.push(c);g=0;h=true;if(f=="[object Array]"){g=a.length;if(h=g==c.length)for(;g--;)if(!(h=C(a[g],c[g],d,e)))break}else{for(var i in a)if(b.has(a,
i)){g++;if(!(h=b.has(c,i)&&C(a[i],c[i],d,e)))break}if(h){for(i in c)if(b.has(c,i)&&!g--)break;h=!g}}d.pop();e.pop();return h};b.isEqual=function(a,b){return C(a,b,[],[])};b.isEmpty=function(a){if(a==null)return true;if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(b.has(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType===1)};b.isArray=l||function(a){return t.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};j("Arguments Function String Number Date RegExp".split(" "),
function(a){b["is"+a]=function(b){return t.call(b)=="[object "+a+"]"}});b.isArguments(arguments)||(b.isArguments=function(a){return!(!a||!b.has(a,"callee"))});"function"!==typeof/./&&(b.isFunction=function(a){return typeof a==="function"});b.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))};b.isNaN=function(a){return b.isNumber(a)&&a!=+a};b.isBoolean=function(a){return a===true||a===false||t.call(a)=="[object Boolean]"};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===
void 0};b.has=function(a,b){return s.call(a,b)};b.noConflict=function(){n._=q;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=Array(Math.max(0,a)),f=0;f<a;f++)e[f]=b.call(d,f);return e};b.random=function(a,b){if(b==null){b=a;a=0}return a+Math.floor(Math.random()*(b-a+1))};var u={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};u.unescape=b.invert(u.escape);var P={escape:RegExp("["+b.keys(u.escape).join("")+"]","g"),unescape:RegExp("("+b.keys(u.unescape).join("|")+
")","g")};b.each(["escape","unescape"],function(a){b[a]=function(b){return b==null?"":(""+b).replace(P[a],function(b){return u[a][b]})}});b.result=function(a,c){if(a!=null){var d=a[c];return b.isFunction(d)?d.call(a):d}};b.mixin=function(a){j(b.functions(a),function(c){var d=b[c]=a[c];b.prototype[c]=function(){var a=[this._wrapped];o.apply(a,arguments);a=d.apply(b,a);return this._chain?b(a).chain():a}})};var Q=0;b.uniqueId=function(a){var b=++Q+"";return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var D=/(.)^/,R={"'":"'","\\":"\\","\r":"r","\n":"n","\t":"t","\u2028":"u2028","\u2029":"u2029"},S=/\\|'|\r|\n|\t|\u2028|\u2029/g;b.template=function(a,c,d){var e,d=b.defaults({},d,b.templateSettings),f=RegExp([(d.escape||D).source,(d.interpolate||D).source,(d.evaluate||D).source].join("|")+"|$","g"),g=0,h="__p+='";a.replace(f,function(b,c,d,e,f){h=h+a.slice(g,f).replace(S,function(a){return"\\"+R[a]});c&&(h=h+("'+\n((__t=("+c+"))==null?'':_.escape(__t))+\n'"));
d&&(h=h+("'+\n((__t=("+d+"))==null?'':__t)+\n'"));e&&(h=h+("';\n"+e+"\n__p+='"));g=f+b.length;return b});h=h+"';\n";d.variable||(h="with(obj||{}){\n"+h+"}\n");h="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+h+"return __p;\n";try{e=new Function(d.variable||"obj","_",h)}catch(i){i.source=h;throw i;}if(c)return e(c,b);c=function(a){return e.call(this,a,b)};c.source="function("+(d.variable||"obj")+"){\n"+h+"}";return c};b.chain=function(a){return b(a).chain()};
b.mixin(b);j("pop push reverse shift sort splice unshift".split(" "),function(a){var c=k[a];b.prototype[a]=function(){var d=this._wrapped;c.apply(d,arguments);(a=="shift"||a=="splice")&&d.length===0&&delete d[0];return this._chain?b(d).chain():d}});j(["concat","join","slice"],function(a){var c=k[a];b.prototype[a]=function(){var a=c.apply(this._wrapped,arguments);return this._chain?b(a).chain():a}});b.extend(b.prototype,{chain:function(){this._chain=true;return this},value:function(){return this._wrapped}})}).call(this);
"function"===typeof window.define&&s("underscore",[],function(){return window._});return p.exports}.call(this);;