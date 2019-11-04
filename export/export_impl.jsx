#include './export_settings.jsx'

var exportImpl = {
  window: null,
  exportSettings: {
    prefix: '',
    basePath: '~/Desktop',
    transparency: true,

    png8: false,
    png24: true,
    gif: false,
  },

  numToExport: 0,
  numExported: 0,

  exportType: null,
  exportOptions: null,

  setNumToExport: function(numToExport) {
    this.numToExport = numToExport;
  },

  openExportSettingsWindow: function(callback, exporterType) {
    this.callback = function() {
      this.setUpForExport();
      callback();
    }
    this.window = new Window('dialog', 'Export All ' + exporterType);
    setUpExportSettingsDialog(this);
  },

  exportToFile: function(filename) {
    var settings = this.exportSettings;
    var destFile = new File(settings.basePath + "/" + settings.prefix + filename);
    docRef.exportFile(destFile, this.exportType, this.exportOptions);

    // Update progress window.
    this.numExported++;
    this.window.progLabel.text = 'Exported ' + this.numExported
        + ' of ' + this.numToExport;
    this.window.progBar.value = this.numExported / this.numToExport * 100;
    this.window.update();
  },

  closeWindow: function() {
    this.window.close();
  },

  setUpForExport: function() {
    var settings = this.exportSettings;
    if (settings.png8) {
      this.exportType = ExportType.PNG8;
      this.exportOptions = new ExportOptionsPNG8();
    } else if (settings.png24) {
      this.exportType = ExportType.PNG24;
      this.exportOptions = new ExportOptionsPNG24();
      this.exportOptions.horizontalScale = 25;
      this.exportOptions.verticalScale = 25;
    } else if (settings.gif) {
      this.exportType = ExportType.GIF;
      this.exportOptions = new ExportOptionsGIF();
      this.exportOptions.horizontalScale = 50;
      this.exportOptions.verticalScale = 50;
    } else {
      alert('Error: export type not correctly set.');
    }
    this.exportOptions.antiAliasing = true;
    this.exportOptions.transparency = settings.transparency;
    this.exportOptions.artBoardClipping = true;
  },
}