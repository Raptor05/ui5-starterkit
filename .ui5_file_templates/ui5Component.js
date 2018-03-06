/**
 * Created by ${USER} on ${DATE}.
 */
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (UIComponent, JSONModel, Device) {  // eslint-disable-line id-match
    "use strict";

    // noinspection UnnecessaryLocalVariableJS
    /**
     * Component.js
     *
     * The component class provides specific metadata for components by extending the ManagedObject class.
     * The UIComponent class provides additional metadata for the configuration of user interfaces
     * or the navigation between views.
     *
     * @param {String} [sId] id for the new control, generated automatically if no id is given
     * @param {Object} [mSettings] initial settings for the new control
     *
     * @class Component.js
     *
     * @extends sap.ui.core.UIComponent
     *
     * @constructor
     * @public
     * @alias ${UI5_Namespace}.Component
     */
    var oComponent = UIComponent.extend("${UI5_Namespace}.Component", {

        metadata: {
            manifest: "json"
        },

        /**
         * Initiates the application at first load
         * @memberOf ${UI5_Namespace}.Component
         */
        init: function () {

            // set device model
            var oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.setModel(oDeviceModel, "device");

            // call the base component's init function and create the App view
            UIComponent.prototype.init.apply(this, arguments);
            // create the views based on the url/hash
            this.getRouter().initialize();

        },

        /**
         * Destroys the application after exiting
         * @memberOf ${UI5_Namespace}.Component
         */
        destroy: function () {
            // call the base component's destroy function
            UIComponent.prototype.destroy.apply(this, arguments);
        },

        /**
         * This method returns the content density class
         * @returns {String} The content density class
         * @memberOf mhp.softfacts.Component
         */
        getContentDensityClass: function () {
            if (!this._sContentDensityClass) {
                if (!sap.ui.Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        }

    });

    return oComponent;

});
