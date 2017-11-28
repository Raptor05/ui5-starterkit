/**
 * Created by mdeppe on 28.11.2017.
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {  // eslint-disable-line id-match
    "use strict";

    return Controller.extend("mhp.ui5StarterKit.demo.controller.SplitApp", {
        /**
         * SplitApp.controller.js
         *
         * This view is the SplitApp of the application, which consists of a master and a detail part
         *
         * @param {string} [sId] id for the new control, generated automatically if no id is given
         * @param {object} [mSettings] initial settings for the new control
         *
         * @class SplitApp.controller.js
         *
         * @extends sap.ui.core.mvc.Controller
         *
         * @constructor
         * @public
         * @alias mhp.ui5StarterKit.demo.SplitApp
         */

        /* =========================================================== */
        /* Standard functions 										   */
        /* =========================================================== */

        /**
         * This function is called every time the view is loaded
         * @memberOf mhp.ui5StarterKit.demo.SplitApp
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
         * Just a function header to show how to use JSDocs. Use "/**" + Enter to auto-create it.
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.SplitApp
         */
        onExampleFunction: function (oEvent) {

        }

        /* =========================================================== */
        /* Private functions (starts with "_")						   */
        /* =========================================================== */

    });
});
