/**
 * Created by ${USER} on ${DATE}.
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {  // eslint-disable-line id-match
    "use strict";

    // noinspection UnnecessaryLocalVariableJS
    /**
     * ${NAME}.controller.js
     *
     * ${Large_Description}
     *
     * @param {string} [sId] id for the new control, generated automatically if no id is given
     * @param {object} [mSettings] initial settings for the new control
     *
     * @class ${NAME}.controller.js
     *
     * @extends sap.ui.core.mvc.Controller
     *
     * @constructor
     * @public
     * @alias ${UI5_Namespace}.${NAME}
     */
    var o$;
    {
        NAME;
    }
    = Controller.extend("${UI5_Namespace}.controller.${NAME}", {

        /* =========================================================== */
        /* Standard functions 										   */
        /* =========================================================== */

        /**
         * This function is called every time the view is loaded
         * @memberOf ${UI5_Namespace}.${NAME}
         */
        onInit: function () {
            this.component = this.getOwnerComponent();
            this.bus = this.component.getEventBus();

            var oRouter = this.getRouter();
            oRouter.getRoute("example").attachMatched(
                this._onRouteMatched, this);
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
         * @memberOf ${UI5_Namespace}.${NAME}
         */
        onExampleFunction: function (oEvent) {

        },

        /* =========================================================== */
        /* Private functions (starts with "_")						   */
        /* =========================================================== */

        /**
         * Is called every time the route was matched
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf ${UI5_Namespace}.${NAME}
         * @private
         */
        _onRouteMatched: function (oEvent) {

            // do the binding stuff etc.

        }

    });

    return o$;
    {
        NAME;
    }
    ;

});
