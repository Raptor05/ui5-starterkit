/**
 * Created by mdeppe on 01.12.2017.
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {  // eslint-disable-line id-match
    "use strict";

    return Controller.extend("mhp.ui5StarterKit.demo.controller.BaseController", {
        /**
         * BaseController.js
         *
         * Base controller for all common used functions and variables
         *
         * @param {string} [sId] id for the new control, generated automatically if no id is given
         * @param {object} [mSettings] initial settings for the new control
         *
         * @class BaseController.js
         *
         * @extends sap.ui.core.mvc.Controller
         *
         * @constructor
         * @public
         * @alias mhp.ui5StarterKit.demo.BaseController
         */

        /**
         * Constructor function to declare some static variables
         * @memberOf mhp.ui5StarterKit.demo.BaseController
         */
        constructor: function () {
            var sRootPath = "mhp.ui5StarterKit.demo";
            this._sViewPath = sRootPath + ".view";
            this._sDialogPath = sRootPath + ".view.dialog";
            this._sFragmentPath = sRootPath + ".view.fragment";
        },

        /* =========================================================== */
        /* Getter functions of controller  						       */
        /* =========================================================== */

        /**
         * Getter for view files path
         * @returns {string} Path of view files
         * @memberOf mhp.ui5StarterKit.demo.BaseController
         */
        getViewPath: function () {
            return this._sViewPath;
        },

        /**
         * Getter for dialog files path
         * @returns {string} Path of dialog files
         * @memberOf mhp.ui5StarterKit.demo.BaseController
         */
        getDialogPath: function () {
            return this._sDialogPath;
        },

        /**
         * Getter for fragment files path
         * @returns {string} Path of fragment files
         * @memberOf mhp.ui5StarterKit.demo.BaseController
         */
        getFragmentPath: function () {
            return this._sFragmentPath;
        },

        /* =========================================================== */
        /* Utility functions of controller  						   */
        /* =========================================================== */

        /**
         * Get router for current view
         * @returns {sap.m.routing.Router} Router object
         * @memberOf mhp.ui5StarterKit.demo.BaseController
         */
        getRouter: function () {
            // return the Router for the current view
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        /* =========================================================== */
        /* Event handlers (starts with "on")						   */
        /* =========================================================== */

        /**
         * Closes the dialog
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.BaseController
         */
        onCloseDialog: function (oEvent) {
            oEvent.getSource().getParent().close();
        },

        /**
         * Navigates to master view on phone, because SplitApp has strange behaviour on phone
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.BaseController@param oEvent
         */
        onPhoneNavToMaster: function (oEvent) {
            this.getRouter().navTo("phoneMaster");
        },

        /**
         * Navigates to home view on phone, because SplitApp has strange behaviour on phone
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf mhp.ui5StarterKit.demo.BaseController@param oEvent
         */
        onPhoneNavToStart: function (oEvent) {
            this.getRouter().navTo("home");
        },


        /* =========================================================== */
        /* Private functions (starts with "_")						   */
        /* =========================================================== */

        /**
         * Is triggered every time a view gets a new binding
         * @memberOf mhp.ui5StarterKit.demo.BaseController
         * @private
         */
        _onBindingChange: function () {
            // No data for the binding
            if (!this.getView().getBindingContext()) {
                this.getRouter().getTargets().display("notFound");
            }
        },

        /**
         * Converts a numeric String value into an integer
         * @param {String} sValue - An integer value as String
         * @returns {number} the converted integer value
         * @memberOf mhp.ui5StarterKit.demo.BaseController
         * @private
         */
        _parseToInt: function (sValue) {
            var sInt = 0;
            if (sValue != null) {
                sInt = parseInt(sValue, 10);
            }
            return sInt;
        },

        /**
         * Check all mandatory fields are maintained
         * @param {Array} aMandatoryFields - An array of all mandatory fields to check
         * @returns {boolean} Flag if all fields are valid
         * @memberOf mhp.ui5StarterKit.demo.BaseController
         * @private
         */
        _checkMandatoryFields: function (aMandatoryFields) {
            var bValid = true;

            jQuery.each(aMandatoryFields, function (i, sValidate) {
                var oControl = this.getView().byId(sValidate);
                var oContext = this.getView().getBindingContext();
                if (!this._checkSingleMandatoryField(oControl, oContext)) {
                    bValid = false;
                }
            }.bind(this));

            return bValid;

        },

        /**
         *
         * @param {sap.m.InputBase} oControl - The sap.m.InputBase control provides a basic functionality for input controls.
         * @returns {boolean} Flag if control is valid
         * @memberOf mhp.ui5StarterKit.demo.BaseController
         * @private
         */
        _checkSingleMandatoryField: function (oControl) {
            var bValid = true,
                oView = this.getView(),
                oBundle = oView.getModel("i18n").getResourceBundle();

            // get control type
            var sType = oControl.getMetadata().getName();
            var oData = this.getView().getBindingContext().getObject();

            switch (sType) {
                case "sap.m.DatePicker":
                    if (!oControl.getValue()) {
                        bValid = false;
                        oControl.setValueState("Error");
                    } else {
                        oControl.setValueState("None");
                        oControl.setValueStateText("");
                    }
                    break;
                case "sap.m.Select":
                    if (oControl.getSelectedKey() === "") {
                        bValid = false;
                        oControl.setValueState("Error");
                        oControl.setValueStateText(oBundle.getText("PlsChooseAnOption"));
                    } else {
                        oControl.setValueState("None");
                        oControl.setValueStateText("");
                    }
                    break;

                case "sap.m.Input":
                    if (!oControl.getValue()) {
                        bValid = false;
                        oControl.setValueState("Error");
                    } else {
                        oControl.setValueState("None");
                        oControl.setValueStateText("");
                    }
                    break;
                default:
                    if (!oData[oControl.getBindingInfo("value").binding.sPath]) {
                        bValid = false;
                        oControl.setValueState("Error");
                    } else {
                        oControl.setValueState("None");
                        oControl.setValueStateText("");
                    }
            }
            return bValid;
        }

    });
});
