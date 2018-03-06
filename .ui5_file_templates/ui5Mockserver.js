/**
 * Created by ${USER} on ${DATE}.
 */
sap.ui.define([
        "sap/ui/core/util/MockServer"
    ], function (MockServer) {  // eslint-disable-line id-match
        "use strict";
        var oMockServer,
            _sAppModulePath = "${UI5_Namespace_with_slashes}/",
            _sJsonFilesModulePath = _sAppModulePath + "local/mockdata";

        return {

            /**
             * Initializes the mock server.
             * You can configure the delay with the URL parameter "serverDelay".
             * The local mock data in this folder is returned instead of the real data for testing.
             * @public
             */
            init: function () {
                var oUriParameters = jQuery.sap.getUriParameters(),
                    sJsonFilesUrl = jQuery.sap.getModulePath(_sJsonFilesModulePath),
                    // sManifestUrl = jQuery.sap.getModulePath(_sAppModulePath + "manifest", ".json"),
                    sEntity = "SOHeaders",
                    sErrorParam = oUriParameters.get("errorType"),
                    iErrorCode = sErrorParam === "badRequest" ? 400 : 500,
                    // oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
                    oMainDataSource = "${oData_Service_Path}",
                    sMetadataUrl = jQuery.sap.getModulePath(_sAppModulePath + "local/metadata.xml".replace(".xml", ""), ".xml"),
                    // ensure there is a trailing slash
                    sMockServerUrl = /.*\/$/.test(oMainDataSource) ? oMainDataSource : oMainDataSource + "/";

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

                var aRequests = oMockServer.getRequests(),
                    fnResponse = function (iErrCode, sMessage, aRequest) {
                        aRequest.response = function (oXhr) {
                            oXhr.respond(iErrCode, {"Content-Type": "text/plain;charset=utf-8"}, sMessage);
                        };
                    };

                // handling the metadata error test
                if (oUriParameters.get("metadataError")) {
                    aRequests.forEach(function (aEntry) {
                        if (aEntry.path.toString().indexOf("\$metadata") > -1) {
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
             * @public returns the mockserver of the app, should be used in integration tests
             * @returns {sap.ui.core.util.MockServer} the mockserver instance
             */
            getMockServer: function () {
                return oMockServer;
            }
        };

    }
);
