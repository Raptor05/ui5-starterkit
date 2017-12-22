/**
 * Created by mdeppe on 29.11.2017.
 */
sap.ui.define([
    "mhp/ui5StarterKit/demo/controller/BaseController"
], function (BaseController) {  // eslint-disable-line id-match
    "use strict";

    // noinspection UnnecessaryLocalVariableJS
    /**
     * NotFound.controller.js
     *
     * This view is called when the submitted route is not found
     *
     * @param {string} [sId] id for the new control, generated automatically if no id is given
     * @param {object} [mSettings] initial settings for the new control
     *
     * @class NotFound.controller.js
     *
     * @extends mhp.ui5StarterKit.demo.controller.BaseController
     *
     * @constructor
     * @public
     * @alias mhp.ui5StarterKit.demo.NotFound
     */
    var oNotFound = BaseController.extend("mhp.ui5StarterKit.demo.controller.NotFound", {

        /* =========================================================== */
        /* Standard functions 										   */
        /* =========================================================== */

        /**
         * This function is called every time the view is loaded
         * @memberOf mhp.ui5StarterKit.demo.NotFound
         */
        onInit: function () {
            this.component = this.getOwnerComponent();
            this.bus = this.component.getEventBus();
        },

//      onBeforeRendering: function() {},

//      onAfterRendering: function() {},

//      onExit: function() {},

        /* =========================================================== */
        /* Utility functions of controller  						   */
        /* =========================================================== */

        /* =========================================================== */
        /* Event handlers (starts with "on")						   */
        /* =========================================================== */

        /**
         * Navigates back to home site
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.NotFound
         */
        onNavBack: function (oEvent) {
            this.getRouter().navTo("home");
        }

        /* =========================================================== */
        /* Private functions (starts with "_")						   */
        /* =========================================================== */

    });

    return oNotFound;

});
