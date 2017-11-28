"use strict";

var rfc = require("node-rfc");
var fs = require("fs");

module.exports = function (grunt) {
    // Project specific variables
    var abapDevelopmentUser = 'SAP_USER'; //TODO Set to SAP User Name
    var abapDevelopmentPassword = 'SAP_PW'; //TODO Set to SAP Passwort for user
    var abapDevelopmentServer = '53.20.52.23';
    var abapDevelopmentInstance = '10';
    var abapDevelopmentClient = '010';
    var abapDevelopmentRouter = '/H/10.157.1.224/H/10.157.38.5/H/';
    var abapApplicationName = 'APP_NAME'; //TODO Set to application name
    var abapApplicationDesc = 'APP_DESCR'; //TODO Set to application description
    var abapPackage = 'APP_PACKAGE'; //TODO Choose correct package
    var abapTransportRequest = 'SAP_TCORR'; //TODO Set the current transport you want to upload to in case of none $TMP packages

    // Global Variables
    var targetDir = "target";
    var zipFileSuffix = "-opt-static-abap.zip";

    // Project configuration.
    var abapConn = {
        user: abapDevelopmentUser,
        passwd: abapDevelopmentPassword,
        ashost: abapDevelopmentServer,
        sysnr: abapDevelopmentInstance,
        client: abapDevelopmentClient,
        saprouter: abapDevelopmentRouter
    };
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uploadToABAP: {
            options: {
                conn: abapConn,
                uploadTMP: true, // change if a transport shall be chosen and provide it using the cli
                zipFile: targetDir + "/<%= pkg.name %>" + zipFileSuffix,
                codePage: "UTF8"
            }
        }
    });

    var rfcConnect = function (functionModule, importParameters, gruntContext) {
        return new Promise(function (resolve, reject) {
            var conn = gruntContext.options().conn;
            var client = new rfc.Client(conn);

            grunt.log.writeln("RFC client lib version:", client.getVersion());

            client.connect(function (err) {
                if (err) { // check for login/connection errors
                    grunt.log.errorlns("could not connect to server", err);
                    return reject();
                }
                // invoke remote enabled ABAP function module
                grunt.log.writeln("Invoking function module", functionModule);
                client.invoke(functionModule,
                    importParameters,
                    function (err, res) {
                        if (err) { // check for errors (e.g. wrong parameters)
                            grunt.log.errorlns("Error invoking", functionModule, err);
                            return reject();
                        }
                        client.close();
                        grunt.log.writeln("Messages:", res.EV_LOG_MESSAGES);
                        return resolve(res);
                    });
            });
        });
    };

    grunt.registerTask("uploadToABAP", "Uploads the application to the ABAP System", function () {
        grunt.log.writeln("Uploading to ABAP");
        var transportRequest = '';
        if (!transportRequest) {
            if (this.options().uploadTMP == true) {
                transportRequest = '';
                grunt.log.writeln("Local $TMP package");
            } else {
                transportRequest = abapTransportRequest;
                grunt.log.writeln("Transport request:", transportRequest);
            }
        }

        var url = "";
        var zipBase64 = "";
        if (!(typeof this.options().zipFile === "undefined") && fs.existsSync(this.options().zipFile)) {
            zipBase64 = new Buffer(fs.readFileSync(this.options().zipFile)).toString('base64');
        } else {
            url = this.options().zipFileURL;
        }
        var importParameters = {
            IV_URL: url,
            IV_ZIP_FILE: zipBase64,
            IV_SAPUI5_APPLICATION_NAME: abapApplicationName,
            IV_SAPUI5_APPLICATION_DESC: abapApplicationDesc,
            IV_PACKAGE: abapPackage,
            IV_WORKBENCH_REQUEST: transportRequest,
            IV_TEST_MODE: "-",
            IV_EXTERNAL_CODE_PAGE: this.options().codePage
        };
        var done = this.async();
        grunt.log.writeln("Uploading application");
        rfcConnect("ZUI5_REPOSITORY_LOAD_HTTP", importParameters, this)
            .then(
                function (returnValue) {
                    if (returnValue.EV_SUCCESS == "E" || returnValue.EV_SUCCESS == "W") {
                        grunt.log.errorlns("Error invoking", "ZUI5_REPOSITORY_LOAD_HTTP");
                        grunt.log.errorlns("Message Id:", returnValue.EV_MSG_ID);
                        grunt.log.errorlns("Message No:", returnValue.EV_MSG_NO);
                        grunt.log.errorlns("Messages:", returnValue.EV_LOG_MESSAGES);
                        done(false);
                        return;
                    }
                    grunt.log.writeln("Application uploaded.");
                    done();
                },
                function () {
                    done(false);
                });
    });
};
