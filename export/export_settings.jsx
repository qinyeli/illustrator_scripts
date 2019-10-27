var setUpExportSettingsDialog = function(exporter) {
  var window = exporter.window;
  var settings = exporter.exportSettings;
  var numToExport = exporter.numToExport;

  var msgPnl = window.add('panel', undefined, 'Export settings');

  // For spcifying the output prefix
  var prefixGrp = msgPnl.add('group', undefined, '')
  prefixGrp.oreintation = 'row';
  prefixGrp.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

  var prefixSt = prefixGrp.add('statictext', undefined, 'File prefix:');
  prefixSt.size = [100, 20]
  var prefixEt = prefixGrp.add('edittext', undefined, settings.prefix);
  prefixEt.size = [300, 20];

  // For specifying the output directory
  var dirGrp = msgPnl.add('group', undefined, '')
  dirGrp.orientation = 'row'
  dirGrp.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]

  var dirSt = dirGrp.add('statictext', undefined, 'Output directory:');
  dirSt.size = [100, 20];
  var dirEt = dirGrp.add('edittext', undefined, settings.basePath);
  dirEt.size = [300, 20];

  var chooseBtn = dirGrp.add('button', undefined, 'Choose ...');
  chooseBtn.onClick = function() {
    dirEt.text = Folder.selectDialog();
  }

  // For specifying the transparency and output format
  var transPnl = msgPnl.add('group', undefined, '');
  transPnl.orientation = 'row'
  transPnl.alignment = [ScriptUI.Alignment.LEFT, ScriptUI.Alignment.TOP]
  transPnl.transparentChk = transPnl.add('checkbox', undefined, 'Transparency');
  transPnl.transparentChk.value = settings.transparency;
  transPnl.png8Btn = transPnl.add('radiobutton', undefined, 'PNG 8');
  transPnl.png8Btn.value = settings.png8;
  transPnl.png24Btn = transPnl.add('radiobutton', undefined, 'PNG 24');
  transPnl.png24Btn.value = settings.png24;
  transPnl.gifBtn = transPnl.add('radiobutton', undefined, 'GIF');
  transPnl.gifBtn.value = settings.gif;
  window.transPnl = transPnl;

  // For showing the progress
  window.progBar = msgPnl.add('progressbar', undefined, 0, 100);
  window.progBar.size = [400, 10]
  window.progLabel = msgPnl.add('statictext', undefined, 'Will export ' + numToExport + ' of ' + docRef.layers.length + ' layers in document');
  window.progLabel.size = [400, 20];

  // Confirm / Cancel buttons
  var btnPnl = window.add('group', undefined, '');
  btnPnl.orientation = 'row'

  var cancelBtn = btnPnl.add('button', undefined, 'Cancel', {
    name: 'cancel'
  });
  cancelBtn.onClick = function() {
    exporter.window.close()
  };

  var okBtn = btnPnl.add('button', undefined, 'Export', {
    name: 'ok'
  });
  okBtn.onClick = function() {
    var settings = exporter.exportSettings;
    settings.prefix = prefixEt.text;
    settings.basePath = dirEt.text;
    settings.transparency = exporter.window.transPnl.transparentChk.value;
    settings.png8 = exporter.window.transPnl.png8Btn.value;
    settings.png24 = exporter.window.transPnl.png24Btn.value;
    settings.gif = exporter.window.transPnl.gifBtn.value;
    exporter.callback();
  };

  window.show();
}