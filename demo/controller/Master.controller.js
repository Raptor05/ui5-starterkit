/**
 * Created by mdeppe on 28.11.2017.
 */
sap.ui.define([
    "mhp/ui5StarterKit/demo/controller/BaseController",
    "sap/ui/model/Filter"
], function (BaseController, Filter) {  // eslint-disable-line id-match
    "use strict";

    return BaseController.extend("mhp.ui5StarterKit.demo.controller.Master", {
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
         * @extends mhp.ui5StarterKit.demo.controller.BaseController
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
         * Activates the fullscreen mode of the shell control
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Master
         */
        onEnterFullsScreen: function (oEvent) {
            var oShell = sap.ui.getCore().byId("ShellContainer");
            var oButton = oEvent.getSource();
            if (oButton.getIcon() === "sap-icon://full-screen") {
                oButton.setIcon("sap-icon://exit-full-screen");
                oShell.setAppWidthLimited(false);
            } else {
                oButton.setIcon("sap-icon://full-screen");
                oShell.setAppWidthLimited(true);
            }
        },

        /**
         * Searches for a product based on the input
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Master
         */
        onProductSearch: function (oEvent) {

            var sQuery = oEvent.getSource().getValue();
            var aFilters = [];
            delete this._oSearchFilter;

            // add filters for search
            if (sQuery && sQuery.length > 0) {
                aFilters.push(new Filter("ProductID", sap.ui.model.FilterOperator.Contains, sQuery));
                aFilters.push(new Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery));
            }

            if (aFilters.length > 0) {
                this._oSearchFilter = new Filter({
                    filters: aFilters,
                    and: false
                });
            }

            // update list binding
            this._filterList();

        },

        /**
         * Filters for a product
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Master
         */
        onProductFilterPress: function (oEvent) {

            var oView = this.getView();

            if (!this._oProductFilterDialog) {
                this._oProductFilterDialog = sap.ui.xmlfragment(this.getDialogPath() + ".ProductFilterDialog", this);
                oView.addDependent(this._oProductFilterDialog);
            }
            this._oProductFilterDialog.open();

        },

        /**
         * Updates the list binding depending on the selected filters
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Master
         */
        onProductFilterConfirmed: function (oEvent) {

            var aDialogFilter = [],
                oButton = this.getView().byId("btnProductFilter");

            delete this._oDialogFilter;

            var aFilterItems = oEvent.getParameter("filterItems");
            jQuery.each(aFilterItems, function (i, oFilterItem) {
                var aSplit = oFilterItem.getKey().split("___"),
                    sKey = aSplit[0],
                    sOperator = aSplit[1],
                    sValue1 = aSplit[2],
                    sValue2 = aSplit[3],
                    oFilter = new Filter(sKey, sOperator, sValue1, sValue2);
                aDialogFilter.push(oFilter);
            });

            if (aDialogFilter.length > 0) {
                this._oDialogFilter = new Filter({
                    filters: aDialogFilter,
                    and: true
                });
                oButton.setIcon("sap-icon://clear-filter");
                oButton.setPressed(true);
            } else {
                oButton.setIcon("sap-icon://add-filter");
                oButton.setPressed(false);
            }

            this._filterList();

        },

        /**
         * Handles the navigation to the selected product details
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Master
         */
        onProductSelected: function (oEvent) {
            var sProductId = oEvent.getSource().getBindingContext() && oEvent.getSource().getBindingContext().getProperty("ProductID");

            if (!sProductId) {
                return;
            }

            this.getRouter().navTo("detail", {
                productid: sProductId
            });
        },
        /**
         * Handles the navigation to the create view
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Master
         */
        onAddProduct: function (oEvent) {

            this.getRouter().navTo("create");
        },

        /* =========================================================== */
        /* Private functions (starts with "_")						   */
        /* =========================================================== */

        /**
         * This function updates the product list binding with the specified filters
         * @memberOf mhp.ui5StarterKit.demo.Master
         * @private
         */
        _filterList: function () {

            var oBinding = this.getView().byId("lstProductsMasterList").getBinding("items");

            if (this._oSearchFilter && this._oDialogFilter) {
                oBinding.filter(new Filter({
                    filters: [this._oSearchFilter, this._oDialogFilter],
                    and: true
                }));
            } else if (this._oSearchFilter) {
                oBinding.filter(this._oSearchFilter);
            } else if (this._oDialogFilter) {
                oBinding.filter(this._oDialogFilter);
            } else {
                oBinding.filter([]);
            }
        }

    });
});
