#include 'export/export_impl.jsx';
#include 'utils/layer_utils.jsx';

var docRef = app.activeDocument; 

var pngExporter = {
  init: function() {
    exportImpl.setNumToExport(docRef.artboards.length);
    exportImpl.openExportSettingsWindow(this.runExport, 'Artboards');
  },

  runExport: function() {
    showAllLayers();
    var artboards = docRef.artboards;
    for (var i = 0; i < artboards.length; i++) {
      var artboard = artboards[i];
      artboards.setActiveArtboardIndex(i);
      exportImpl.exportToFile(artboard.name);

    }
    exportImpl.closeWindow();
  },
}

pngExporter.init();