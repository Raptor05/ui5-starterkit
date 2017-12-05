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

        /**
         * Navigates back to home site
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Detail
         */
        onNavBack: function (oEvent) {
            this.getRouter().navTo("home");
        },

        /**
         * Is called when user presses the "Edit" button
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Detail
         */
        onProductEditPress: function (oEvent) {
            this._toggleButtonsAndView(true);
        },

        /**
         * Is called when the user presses the "Cancel" button
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Detail
         */
        onProductCancelPress: function (oEvent) {
            var oView = this.getView(),
                oContext = oView.getBindingContext(),
                oModel = oView.getModel();

            oModel.resetChanges([
                oContext.getPath()
            ]);
            this._toggleButtonsAndView(false);
        },

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

            this._showFormFragment("ProductDisplay");
        },

        /**
         * Changes the visible state of the footer buttons and changes the form to edit/display mode
         * @param {boolean} bEdit - Indicates if the mode shall be "edit" or "display"
         * @memberOf mhp.ui5StarterKit.demo.Detail
         * @private
         */
        _toggleButtonsAndView: function (bEdit) {
            var oView = this.getView();

            // Show the appropriate action buttons
            oView.byId("btnProductEdit").setVisible(!bEdit);
            oView.byId("btnProductSave").setVisible(bEdit);
            oView.byId("btnProductCancel").setVisible(bEdit);

            // Set the right form type
            this._showFormFragment(bEdit ? "ProductEdit" : "ProductDisplay");
        },

        /**
         * Changes the editable state of the form fragments
         * @param {String}sMode - Contains the mode for edit/display
         * @memberOf mhp.ui5StarterKit.demo.Detail
         * @private
         */
        _showFormFragment: function (sMode) {
            var oPage = this.getView().byId("viewDetail");

            oPage.removeAllContent();
            oPage.insertContent(this._getFormFragment(sMode));
        },

        _formFragments: {},

        /**
         * Returns the right fragment for each mode
         * @param {String} sFragmentName - The name of the fragment which shall be shown
         * @returns {sap.ui.core.Control} The fragment
         * @memberOf mhp.ui5StarterKit.demo.Detail
         * @private
         */
        _getFormFragment: function (sFragmentName) {
            var oFormFragment = this._formFragments[sFragmentName];

            if (oFormFragment) {
                return oFormFragment;
            } else {
                oFormFragment = sap.ui.xmlfragment(this.getView().getId(), this.getFragmentPath() + "." + sFragmentName);
                this._formFragments[sFragmentName] = oFormFragment;
                return this._formFragments[sFragmentName];
            }
        }

    });
});
