;
/* module-key = 'com.atlassian.auiplugin:internal-src-js-aui-polyfills-console', location = 'src/js/aui/polyfills/console.js' */
("undefined"===typeof window?global:window).__45603ef390083ad85d4c363718c61548=function(){"use strict";"undefined"===typeof window.console?window.console={messages:[],log:function(a){this.messages.push(a)},show:function(){alert(this.messages.join("\n"));this.messages=[]}}:window.console.show=function(){};return{}}.call(this);;