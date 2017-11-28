/**
 * Created by mdeppe on 28.11.2017.
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {  // eslint-disable-line id-match
    "use strict";

    return Controller.extend("mhp.ui5StarterKit.demo.controller.Master", {
        /**
         * Master.controller.js
         *
         * This view contents the master list
         *
         * @param {string} [sId] id for the new control, generated automatically if no id is given
         * @param {object} [mSettings] initial settings for the new control
         *
         * @class Master.controller.js
         *
         * @extends sap.ui.core.mvc.Controller
         *
         * @constructor
         * @public
         * @alias mhp.ui5StarterKit.demo.Master
         */

        /* =========================================================== */
        /* Standard functions 										   */
        /* =========================================================== */

        /**
         * This function is called every time the view is loaded
         * @memberOf mhp.ui5StarterKit.demo.Master
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
