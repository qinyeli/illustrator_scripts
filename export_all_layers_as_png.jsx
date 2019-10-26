#include 'export/export_impl.jsx';
#include 'utils/layer_utils.jsx';

var docRef = app.activeDocument;

var pngExporter = {
  init: function() {
    exportImpl.setNumToExport(numLayersToExport());
    exportImpl.openExportSettingsWindow(this.runExport);
  },

  runExport: function() {
    hideAllLayers();
    var layers = existingLayers();
    for (var i = 0; i < layers.length; i++) {
      var layer = layers[i];
      layer.visible = true;
      exportImpl.exportToFile(layer.name);
      layer.visible = false;
    }
    exportImpl.closeWindow();
  },
}

pngExporter.init();