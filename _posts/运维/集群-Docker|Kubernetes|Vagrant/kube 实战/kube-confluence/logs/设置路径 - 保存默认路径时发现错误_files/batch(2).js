WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'confluence.web.resources:common-header-resources', location = '/includes/js/header-user-menu.js' */
define("confluence/header-user-menu",["jquery","confluence/meta","underscore"],function(a,c,b){function d(){var b=c.get("current-user-avatar-uri-reference");a("#user-menu-link").find(".aui-avatar-inner img").attr("src",b)}return function(){b.defer(d)}});require("confluence/module-exporter").safeRequire("confluence/header-user-menu",function(a){require("ajs").toInit(a)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:setup', location = '/setup/includes/js/utils.js' */
/**
 * @module confluence/setup/utils
 */
define('confluence/setup/utils', [
    'jquery'
],
function(
    $
) {
    "use strict";

    function getMeta(key) {
        function asBooleanOrString(value) {
            var lc = value ? value.toLowerCase() : "";

            if (lc === "true") { return true; }
            if (lc === "false") { return false; }

            return value;
        }

        var metaEl = $("meta[name='ajs-" + key + "']");
        var value = metaEl.attr("content");
        return asBooleanOrString(value);
    }

    return {
        getMeta: getMeta
    };
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:setup', location = '/setup/includes/js/setup-progress-tracking-iframe.js' */
/**
 * @module confluence/setup/setup-tracker
 */
define('confluence/setup/setup-tracker', [
    'jquery',
    'ajs',
    'confluence/setup/utils'
],
function(
    $,
    AJS,
    utils
) {

    "use strict";

    var isDevMode = AJS.isDevMode ? AJS.isDevMode() : utils.getMeta("dev-mode");
    var iframeHost = isDevMode ? "https://qa-wac.internal.atlassian.com" : "https://www.atlassian.com";
    var iframeContextPath = "/pingback";

    function dataToUrl(data) {
        var queryStringParameters = [];
        for (var key in data) {
            queryStringParameters.push(key + "=" + encodeURIComponent(data[key]));
        }
        if (queryStringParameters.length) {
            return "?" + queryStringParameters.join("&");
        } else {
            return "";
        }
    }

    function insertIframe(paramsString){
        var deferred = $.Deferred();

        var $iframe = $("<iframe>")
            .css("display", "none")
            .attr("src", iframeHost + iframeContextPath + paramsString)
            .attr("id", "setup-properties");

        $iframe.load(function(){
            deferred.resolve();
        });
        $iframe.appendTo("body");

        setTimeout(function(){
            deferred.reject();
        }, 3000);

        return deferred.promise();
    }

    /**
     * The id from metadata takes always precedence over local storage,
     * which is used only as a fallback for action which does not inherit
     * from AbstractSetupAction (VerifySMTPServerConnection)
     *
     * @returns id of current setup session
     */
    function getSetupSessionId(){
        var id = utils.getMeta("setup-session-id");
        var key = "confluence.setup.session.id";

        if (id){
            localStorage.setItem(key, id);
        } else {
            id = localStorage.getItem(key);
        }

        return id;
    }

    function getDefaultParams(licenseType){
        var defaultParams = {
            "pg": window.location.pathname.replace(/\//g,"_"),
            "product": "confluence",
            "server-id": utils.getMeta("server-id"),
            "SEN": utils.getMeta("SEN"),
            "setupSessionId": getSetupSessionId(),
            "v": utils.getMeta("version-number")
        };
        if (licenseType !== undefined) {
            defaultParams.pg += "-" + licenseType;
        }
        return defaultParams;

    }

    function insert(licenseType){
        return insertIframe(dataToUrl(getDefaultParams(licenseType)));
    }

    return {
        insert: insert
    };
});

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:setup', location = '/setup/includes/js/setup.js' */
define('confluence/setup/setup', [
    'jquery',
    'confluence/setup/setup-tracker'
],
function(
    $,
    setupTracker
) {
    "use strict";

    if (!$) { return; }

    $.fn.ready(function() {
        setupTracker.insert();

        $(document).bind("long-running-task-complete", function () {
            $("#wait-spinner").hide();
        });

        $(document).bind("long-running-task-failed", function () {
            $("#wait-spinner").hide();
            $("#task-elapsed-time-label").hide();
            $("#taskElapsedTime").hide();
        });

        //Disable the submit button(s) on the form after form is submitted
        $(document).on('submit',function() {
            var $form = $(this);
            setTimeout(function() {
                $form.find('input:submit').prop('disabled', 'true');
            }, 0);
        });
    });

    function showSpinner(message) {
        var template = $('#loading-spinner-template').html();
        var html = _.template(template, { message: message });

        var $form = $('form');
        if ($('.setup-back-button').length) {
            $form.find('.setup-back-button').after(html);
        } else {
            $form.find(':submit').after(html);
        }
    }

    return {
        showSpinner: showSpinner
    };
});

}catch(e){WRMCB(e)};