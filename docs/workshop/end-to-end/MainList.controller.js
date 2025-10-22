// Prompt: "Generate controller to refresh Product list and trigger restock prompt flow."
sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/m/MessageToast'
], function(Controller, MessageToast) {
  'use strict';
  return Controller.extend('workshop.product.app.controller.MainList', {
    onInit: function() {},
    onRefresh: function() {
      this.getView().byId('tblProducts').getBinding('items').refresh();
      MessageToast.show('Products refreshed');
    },
    onRestock: function() {
      // Placeholder: open dialog -> call restock action
      MessageToast.show('Restock action would be triggered');
    }
  });
});
