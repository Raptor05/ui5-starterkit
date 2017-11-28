/**
 * Created by mdeppe on 28.11.2017.
 */
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (UIComponent, JSONModel, Device) { // eslint-disable-line id-match
    "use strict";

    return UIComponent.extend("mhp.ui5StarterKit.demo.Component", {

        metadata: {
            manifest: "json"
        },

        /**
         * Initiates the application at first load
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
         */
        destroy: function () {
            // call the base component's destroy function
            UIComponent.prototype.destroy.apply(this, arguments);
        }

    });

});
