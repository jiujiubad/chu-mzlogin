;
/* module-key = 'confluence.web.resources:setup-select-database-type', location = '/setup/includes/js/setup-select-database-type.js' */
require([
        'jquery',
        'confluence/setup/setupdb'
    ],
    function ($, testConnection) {
        "use strict";

        var fieldsOfDatabaseType = {
            'mssql': {
                'fields': ['dbConfigInfo-databaseName', ['dbConfigInfo-instanceName']],
                'defaultUrl': 'jdbc:sqlserver://localhost;instanceName=<insert_instanceName>;database=<insert_database>'
            },
            'mysql': {
                'fields': ['dbConfigInfo-databaseName'],
                'defaultUrl': 'jdbc:mysql://localhost/confluence'
            },
            'oracle12c': {
                'fields': ['dbConfigInfo-serviceName'],
                'defaultUrl': 'jdbc:oracle:thin:@localhost:1521:SID'
            },
            'postgresql': {
                'fields': ['dbConfigInfo-databaseName'],
                'defaultUrl': 'jdbc:postgresql://localhost:5432/confluence'
            }
        }

        function hideFieldsOnMissingDriver() {
            $('.field-group >input, .field-group > .radio').closest('.field-group').hide();
            $('div.hint').hide();
        }
        function showField(fieldId) {
            $(fieldId).closest('.field-group').css('display', 'inline-block');
        }

        function showMissingDriver(databaseType) {
            var $mySQLMissingDriverInstruction = $("#mysql-missing-driver-instruction");
            var $oracleMissingDriverInstruction = $("#oracle-missing-driver-instruction");
            testConnection.setButtonDisabled(true);
            $('.testConnection').hide();
            hideFieldsOnMissingDriver();
            if (databaseType === 'mysql') {
                $oracleMissingDriverInstruction.hide();
                $mySQLMissingDriverInstruction.show();
            } else if (databaseType === 'oracle12c') {
                $oracleMissingDriverInstruction.show();
                $mySQLMissingDriverInstruction.hide();
            }
        }

        function showCommonFieldsWhenDriverExists() {
            var $mySQLMissingDriverInstruction = $("#mysql-missing-driver-instruction");
            var $oracleMissingDriverInstruction = $("#oracle-missing-driver-instruction");
            $oracleMissingDriverInstruction.hide();
            $mySQLMissingDriverInstruction.hide();
            $('.testConnection').show();
            testConnection.setButtonDisabled(false);

            showField('#dbConfigInfo-username');
            showField('#dbConfigInfo-password');
            $('div.hint').show();
            $('div.radio').closest('.field-group').show();
        }

        function showFieldsWhenSimpleFormIsSelected(databaseType) {
            $('#dbConfigInfo-databaseUrl').closest('.field-group').hide();
            showField('#dbConfigInfo-hostname');
            showField('#dbConfigInfo-port');
            $('input.dbSpecific').closest('.field-group').hide();
            fieldsOfDatabaseType[databaseType]['fields'].forEach(function(fieldId) { showField('#' + fieldId);});
        }

        function showFieldsWhenCustomizeIsSelected(databaseType) {
            $('#dbConfigInfo-databaseUrl').val(fieldsOfDatabaseType[databaseType].defaultUrl);
            $('#dbConfigInfo-databaseUrl').closest('.field-group').css('display', 'inline-block');
            $('.simpleUrl').closest('.field-group').hide();
        }

        function setupFields() {
            if ($(this).is('#dbConfigInfo-databaseType')) {
                $("input.text, input.password").val('');
            }
            var databaseType = $('#dbConfigInfo-databaseType option:selected').val();
            testConnection.hideSuccessMessage();
            testConnection.removeErrorMessage();
            if (isMissingDriver(databaseType)) {
                showMissingDriver(databaseType);
                return;
            }
            showCommonFieldsWhenDriverExists();

            if ($('#dbConfigInfo-simple').prop('checked')) {
                showFieldsWhenSimpleFormIsSelected(databaseType);
            } else {
                showFieldsWhenCustomizeIsSelected(databaseType);
            }
            testConnection.validateFields();
        }

        function isMissingDriver(databaseType) {
            return (databaseType === 'mysql' && $('#mysql-missing-driver-instruction').length) ||
                (databaseType === 'oracle12c' && $('#oracle-missing-driver-instruction').length);
        }

        $(function () {
            $('#testConnection').click(testConnection.testConnection);
            $('#setup-next-button').click(testConnection.testAndSubmit);
            $('input.text, input.password').keypress(testConnection.hideSuccessMessage);
            $('input.radio').change(setupFields);
            $('input.text').on('input', testConnection.validateFields);
            setupFields();
            $('#dbConfigInfo-databaseType').on('change', setupFields);
        });
    });
;