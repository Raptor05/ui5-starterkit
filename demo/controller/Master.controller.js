/**
 * Created by mdeppe on 28.11.2017.
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter"
], function (Controller, Filter) {  // eslint-disable-line id-match
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

        },

        /**
         * Handles the navigation to the selected product details
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Master
         */
        onProductSelected: function (oEvent) {

        },
        /**
         * Handles the navigation to the create view
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.Master
         */
        onAddProduct: function (oEvent) {

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

            if (this._oSearchFilter && this._oFiltersFilter) {
                oBinding.filter(new Filter({
                    filters: [this._oSearchFilter, this._oFiltersFilter],
                    and: true
                }));
            } else if (this._oSearchFilter) {
                oBinding.filter(this._oSearchFilter);
            } else if (this._oFiltersFilter) {
                oBinding.filter(this._oFiltersFilter);
            } else {
                oBinding.filter([]);
            }
        }

    });
});
