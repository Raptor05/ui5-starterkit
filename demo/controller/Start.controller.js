/**
 * Created by mdeppe on 28.11.2017.
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {  // eslint-disable-line id-match
    "use strict";

    return Controller.extend("mhp.ui5StarterKit.demo.controller.Start", {
        /**
         * Start.controller.js
         *
         * This view is the landing page of the application, shown in the detail area of the SplitApp
         *
         * @param {string} [sId] id for the new control, generated automatically if no id is given
         * @param {object} [mSettings] initial settings for the new control
         *
         * @class Start.controller.js
         *
         * @extends sap.ui.core.mvc.Controller
         *
         * @constructor
         * @public
         * @alias mhp.ui5StarterKit.demo.Start
         */

        /* =========================================================== */
        /* Standard functions 										   */
        /* =========================================================== */

        /**
         * This function is called every time the view is loaded
         * @memberOf mhp.ui5StarterKit.demo.Start
         */
        onInit: function () {
            this.component = this.getOwnerComponent();
            this.bus = this.component.getEventBus();
        }

//      onBeforeRendering: function() {},

//      onAfterRendering: function() {},

//      onExit: function() {},

        /* =========================================================== */
        /* Utility functions of controller  						   */
        /* =========================================================== */

        /* =========================================================== */
        /* Event handlers (starts with "on")						   */
        /* =========================================================== */

        /* =========================================================== */
        /* Private functions (starts with "_")						   */
        /* =========================================================== */

    });
});