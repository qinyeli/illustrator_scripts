#include './export_settings.jsx'

var exportImpl = {
  window: null,
  exportSettings: {
    prefix: '',
    basePath: '~/Desktop',
    transparency: true,
    png8: false,
    png24: true,
  },
  export_function: null,

  numToExport: 0,
  numExported: 0,

  setNumToExport: function(numToExport) {
    this.numToExport = numToExport;
  },

  openExportSettingsWindow: function(callback) {
    this.callback = callback;
    this.window = showExportSettingsDialog(this);
  },

  exportToFile: function(filename) {
  	var settings = this.exportSettings;
    var destFile = new File(settings.basePath + "/" + settings.prefix
        + filename + ".png");
    docRef.exportFile(destFile, this.getExportType(), this.getExportOptions());

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

  //---------------------------------------------------------------------------
  getExportOptions: function() {
    if (this.options == null) {
      var settings = this.exportSettings;
      this.options = settings.png8 ? new ExportOptionsPNG8() : new ExportOptionsPNG24();
      this.options.antiAliasing = true;
      this.options.transparency = settings.transparency;
      this.options.artBoardClipping = true;
    }
    return this.options;
  },

  getExportType: function() {
    if (this.exportType == null) {
      var settings = this.exportSettings;
      this.exportType = settings.png8 ? ExportType.PNG8 : ExportType.PNG24;
    }
    return this.exportType;
  }
}