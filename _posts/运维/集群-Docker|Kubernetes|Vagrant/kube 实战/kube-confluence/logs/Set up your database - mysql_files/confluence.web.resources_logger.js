;
/* module-key = 'confluence.web.resources:logger', location = '/includes/js/api/logger.js' */
define("confluence/api/logger",["ajs"],function(a){return{debug:function(){a.debug.apply(this,arguments)},log:function(){a.log.apply(this,arguments)},logError:function(){a.logError.apply(this,arguments)},error:function(){a.error.apply(this,arguments)},warn:function(){a.warn.apply(this,arguments)}}});;