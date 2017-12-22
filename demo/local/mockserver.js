/**
 * Created by mdeppe on 28.11.2017.
 */
sap.ui.define([
    "sap/ui/core/util/MockServer"
], function (MockServer) {  // eslint-disable-line id-match
    "use strict";
    var oMockServer,
        _sAppModulePath = "mhp/ui5StarterKit/demo/",
        _sJsonFilesModulePath = _sAppModulePath + "local/mockdata";

    // noinspection UnnecessaryLocalVariableJS
    /**
     * mockserver.js
     *
     * Mockserver implementation for local testing
     *
     * @param {Object} [mSettings] initial settings for the new control
     *
     * @class mockserver.js
     *
     * @constructor
     * @public
     * @alias mhp.ui5StarterKit.demo.mockserver
     */
    var oLocalMockserver = {

        /**
         * Initializes the mock server.
         * You can configure the delay with the URL parameter "serverDelay".
         * The local mock data in this folder is returned instead of the real data for testing.
         * @memberOf mhp.ui5StarterKit.demo.mockserver
         */
        init: function () {
            var oUriParameters = jQuery.sap.getUriParameters(),
                sJsonFilesUrl = jQuery.sap.getModulePath(_sJsonFilesModulePath),
                sManifestUrl = jQuery.sap.getModulePath(_sAppModulePath + "manifest", ".json"),
                sEntity = "SOHeaders",
                sErrorParam = oUriParameters.get("errorType"),
                iErrorCode = sErrorParam === "badRequest" ? 400 : 500,
                oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
                oMainDataSource = oManifest["sap.app"].dataSources.mainService,
                sMetadataUrl = jQuery.sap.getModulePath(_sAppModulePath + oMainDataSource.settings.localUri.replace(".xml", ""), ".xml"),
                // ensure there is a trailing slash
                sMockServerUrl = /.*\/$/.test(oMainDataSource.uri) ? oMainDataSource.uri : oMainDataSource.uri + "/";

            oMockServer = new MockServer({
                rootUri: sMockServerUrl
            });

            // configure mock server with a delay of 1s
            MockServer.config({
                autoRespond: true,
                autoRespondAfter: (oUriParameters.get("serverDelay") || 1000)
            });

            // load local mock data
            oMockServer.simulate(sMetadataUrl, {
                sMockdataBaseUrl: sJsonFilesUrl,
                bGenerateMissingMockData: true
            });


            // add function imports
            var aRequests = oMockServer.getRequests();
            aRequests.push({
                method: "POST",
                path: new RegExp("CheckAndChangeLock(.*)"),

                response: function (oXhr, sUrlParams) {     // eslint-disable-line require-jsdoc
                    jQuery.sap.log.info("Incoming request for CheckAndChangeLock with parameters" + sUrlParams);
                    var bLocked = localStorage.getItem(sUrlParams) === "true";
                    if (!bLocked) {
                        localStorage.setItem(sUrlParams, true);
                        oXhr.respondJSON(200, {}, JSON.stringify({d: {results: []}}));
                    } else {
                        oXhr.respond(500, {}, "It's locked.");
                    }
                    return true;
                }
            });
            aRequests.push({
                method: "POST",
                path: new RegExp("DeleteLock(.*)"),
                response: function (oXhr, sUrlParams) {     // eslint-disable-line require-jsdoc
                    jQuery.sap.log.info("Incoming request for DeleteLock with parameters" + sUrlParams);
                    localStorage.removeItem(sUrlParams);
                    oXhr.respondJSON(200, {}, JSON.stringify({d: {results: []}}));
                    return true;
                }
            });
            oMockServer.setRequests(aRequests);

            aRequests = oMockServer.getRequests();
            /**
             *
             * @param {numeric} iErrCode - Unknown description
             * @param {String} sMessage - Unknown description
             * @param {Array} aRequest - Unknown description
             */
            var fnResponse = function (iErrCode, sMessage, aRequest) {
                aRequest.response = function (oXhr) {
                    oXhr.respond(iErrCode, {"Content-Type": "text/plain;charset=utf-8"}, sMessage);
                };
            };

            // handling the metadata error test
            if (oUriParameters.get("metadataError")) {
                aRequests.forEach(function (aEntry) {
                    if (aEntry.path.toString().indexOf("$metadata") > -1) {
                        fnResponse(500, "metadata Error", aEntry);
                    }
                });
            }

            // Handling request errors
            if (sErrorParam) {
                aRequests.forEach(function (aEntry) {
                    if (aEntry.path.toString().indexOf(sEntity) > -1) {
                        fnResponse(iErrorCode, sErrorParam, aEntry);
                    }
                });
            }
            oMockServer.start();

            jQuery.sap.log.info("Running the app with mock data");
        },

        /**
         * returns the mockserver of the app, should be used in integration tests
         * @returns {sap.ui.core.util.MockServer} the mockserver instance
         * @memberOf mhp.ui5StarterKit.demo.mockserver
         */
        getMockServer: function () {
            return oMockServer;
        }
    };

    return oLocalMockserver;

});
