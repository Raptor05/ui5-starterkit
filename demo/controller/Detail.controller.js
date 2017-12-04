/**
 * Created by mdeppe on 04.12.2017.
 */
sap.ui.define([
    "mhp/ui5StarterKit/demo/controller/BaseController"
], function (BaseController) {  // eslint-disable-line id-match
    "use strict";

    return BaseController.extend("mhp.ui5StarterKit.demo.controller.Detail", {
        /**
         * Detail.controller.js
         *
         * This is the detail view, with more information for the products
         *
         * @param {string} [sId] id for the new control, generated automatically if no id is given
         * @param {object} [mSettings] initial settings for the new control
         *
         * @class Detail.controller.js
         *
         * @extends mhp.ui5StarterKit.demo.controller.BaseController
         *
         * @constructor
         * @public
         * @alias mhp.ui5StarterKit.demo.Detail
         */

        /* =========================================================== */
        /* Standard functions 										   */
        /* =========================================================== */

        /**
         * This function is called every time the view is loaded
         * @memberOf mhp.ui5StarterKit.demo.Detail
         */
        onInit: function () {
            this.component = this.getOwnerComponent();
            this.bus = this.component.getEventBus();

            var oRouter = this.getRouter();
            oRouter.getRoute("detail").attachMatched(
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

        /* =========================================================== */
        /* Private functions (starts with "_")						   */
        /* =========================================================== */

        /**
         * Is called every time the route was matched
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Detail
         * @private
         */
        _onRouteMatched: function (oEvent) {
            var sProductId = oEvent.getParameter("arguments").productid,
                oView = this.getView();
            oView.bindElement({
                path: "/ProductSet('" + sProductId + "')"
            });

            oView.byId("viewDetail").insertContent(sap.ui.xmlfragment(this.getFragmentPath() + ".ProductDisplay"));
        }

    });
});
