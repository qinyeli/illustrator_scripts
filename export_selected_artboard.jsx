#include 'export/export_impl.jsx';
#include 'utils/layer_utils.jsx';

var docRef = app.activeDocument;

var pngExporter = {
  init: function() {
    exportImpl.setNumToExport(docRef.artboards.length);
    exportImpl.openExportSettingsWindow(this.runExport, 'Selected Artboards');
  },

  runExport: function() {
    showAllLayers();
    var artboard = docRef.artboards[docRef.artboards.getActiveArtboardIndex()];
    exportImpl.exportToFile(artboard.name);
    exportImpl.closeWindow();
  },
}

pngExporter.init();