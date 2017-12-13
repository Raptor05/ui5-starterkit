/**
 * Created by mdeppe on 04.12.2017.
 */
sap.ui.define([
    "mhp/ui5StarterKit/demo/controller/BaseController",
    "sap/ui/model/Filter"
], function (BaseController, Filter) {  // eslint-disable-line id-match
    "use strict";

    var _aMandatoryFields = ["inpProductId", "inpProductName", "slcProductTypeCode", "slcProductCategory"];
    var _aMandatoryFieldsCreate = ["inpProductIdCreate", "inpProductNameCreate", "slcProductTypeCodeCreate", "slcProductCategoryCreate"];

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
            oRouter.getRoute("create").attachMatched(
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
            var bPhone = this.getView().getModel("device").getProperty("/system/phone");

            //when Phone go to master view
            if (bPhone) {
                this.getRouter().navTo("phoneMaster");
            } else {
                this.getRouter().navTo("home");
            }
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

            if (oContext.bCreated) {
                this.onNavBack();
            } else {
                this._toggleButtonsAndView(false);
            }
        },

        /**
         * Validates all fields and saves
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Detail
         */
        onProductSavePress: function (oEvent) {
            var oView = this.getView(),
                bValid;

            if (oView.getModel().hasPendingChanges()) {

                if (oView.getBindingContext().bCreated) {
                    bValid = this._checkMandatoryFields(_aMandatoryFieldsCreate);
                } else {
                    bValid = this._checkMandatoryFields(_aMandatoryFields);
                }

                if (bValid) {

                    oView.setBusy(true);

                    var oModel = oView.getModel();

                    oModel.setUseBatch(true);

                    oModel.submitChanges({
                        success: jQuery.proxy(function () {   // eslint-disable-line require-jsdoc
                            this._toggleButtonsAndView(false);
                            oModel.setUseBatch(false);
                            oView.setBusy(false);
                        }, this),
                        error: jQuery.proxy(function () {    // eslint-disable-line require-jsdoc
                            oModel.setUseBatch(false);
                            oView.setBusy(false);
                        })
                    });
                }
            }
        },

        /**
         * Opens a small dialog with a bigger product picture
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Detail
         */
        onOpenProductPic: function (oEvent) {
            var sBindingPath = oEvent.getSource().getBindingContext().getPath();

            if (!this._oProductPicDialog) {
                this._oProductPicDialog = sap.ui.xmlfragment(this.getDialogPath() + ".ProductPicDialog", this);
                this.getView().addDependent(this._oProductPicDialog);
            }
            this._oProductPicDialog.bindElement(sBindingPath);
            this._oProductPicDialog.open();
        },

        /**
         * Opens the configuration dialog for the sales order items table
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Detail
         */
        onOpenSalesOrderItemsTableConfig: function (oEvent) {

        },

        /**
         * Opens a value help dialog
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Detail
         */
        onCurrencyHelp: function (oEvent) {
            if (!this._vhCurrencyDialog) {
                this._vhCurrencyDialog = sap.ui.xmlfragment(this.getDialogPath() + ".VhCurrencyDialog", this);
                this.getView().addDependent(this._vhCurrencyDialog);
            }
            this._vhCurrencyDialog.open();
        },

        /**
         * Searches for currencies in the value help list
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Detail
         */
        onSearchCurrencyVh: function (oEvent) {
            var sQuery = oEvent.getParameter("value"),
                aFilters = [];
            if (sQuery && sQuery.length > 0) {
                aFilters.push(new Filter("Waers", sap.ui.model.FilterOperator.Contains, sQuery));
                aFilters.push(new Filter("Ltext", sap.ui.model.FilterOperator.Contains, sQuery));


                var oFilter = new Filter({
                    filters: aFilters,
                    and: false
                });

                oEvent.getSource().getBinding("items").filter(oFilter);
            } else {
                oEvent.getSource().getBinding("items").filter();
            }
        },

        /**
         * Confirms the selected currency from the value help
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Detail
         */
        onCloseCurrencyVh: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                var oInput = this.getView().byId("inpProductCurrency");
                oInput.setValue(oSelectedItem.getTitle());
            }
            oEvent.getSource().getBinding("items").filter([]);
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
            var sRoute = oEvent.getParameter("name"),
                oView = this.getView();
            if (sRoute === "create") {
                oView.unbindElement();
                var oEntry = oView.getModel().createEntry("/ProductSet");
                oView.setBindingContext(oEntry);
                this._showFormFragment("ProductCreate");
                oView.byId("btnProductEdit").setVisible(false);
                oView.byId("btnProductSave").setVisible(true);
                oView.byId("btnProductCancel").setVisible(true);
            } else {
                var sProductId = oEvent.getParameter("arguments").productid;
                oView.bindElement({
                    path: "/ProductSet('" + sProductId + "')",
                    events: {
                        change: this._onBindingChange.bind(this),
                        dataRequested: function () {    //eslint-disable-line require-jsdoc
                            oView.setBusy(true);
                        },
                        dataReceived: function () { //eslint-disable-line require-jsdoc
                            oView.setBusy(false);
                        }
                    }
                });

                this._toggleButtonsAndView(false);
            }

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
                oFormFragment = sap.ui.xmlfragment(this.getView().getId(), this.getFragmentPath() + "." + sFragmentName, this);
                this._formFragments[sFragmentName] = oFormFragment;
                return this._formFragments[sFragmentName];
            }
        }

    });
});
