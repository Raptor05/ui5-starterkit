/**
 * Created by mdeppe on 28.11.2017.
 */
sap.ui.define([
    "mhp/ui5StarterKit/demo/controller/BaseController"
], function (BaseController) {  // eslint-disable-line id-match
    "use strict";

    // noinspection UnnecessaryLocalVariableJS
    /**
     * Start.controller.js
     *
     * This view is the landing page of the application, shown in the detail area of the SplitApp
     *
     * @param {String} [sId] id for the new control, generated automatically if no id is given
     * @param {Object} [mSettings] initial settings for the new control
     *
     * @class Start.controller.js
     *
     * @extends mhp.ui5StarterKit.demo.controller.BaseController
     *
     * @constructor
     * @public
     * @alias mhp.ui5StarterKit.demo.Start
     */
    var oStart = BaseController.extend("mhp.ui5StarterKit.demo.controller.Start", {

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

    return oStart;

});
