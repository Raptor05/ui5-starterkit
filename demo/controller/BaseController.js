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
        }

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
