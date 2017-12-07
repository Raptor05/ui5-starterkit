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
        }

    });
});
