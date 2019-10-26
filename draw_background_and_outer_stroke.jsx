#include 'utils/layer_utils.jsx';
#include 'utils/path_utils.jsx';
#include 'utils/colors.jsx'

var docRef = app.activeDocument;

var lineStrokeWidth = 2;
var outerStrokeWidth = 7;

// drawBackgroundAndOuterStroke.init() makes a copy of all layers in the
// current document, fills the background with white and adds a white outer
// stroke to it. The assumption is that all layers contain only unexpanded
// line strokes.
var drawBackgroundAndOuterStroke = {
  init: function() {
    hideAllLayers();
    var oldLayers = existingLayers()

    var r = docRef.artboards[docRef.artboards.getActiveArtboardIndex()].artboardRect;

    for (var i = 0; i < oldLayers.length; i++) {
      var oldLayer = oldLayers[i];
      var newLayer = docRef.layers.add();
      newLayer.visible = true;

      //-----------------------------------------------------------------------
      copyAllPaths(oldLayer, newLayer, function(path) {
        path.strokeWidth = lineStrokeWidth;
      });
      this.mergeAndExpand();

      var callbackStroke = function(path) {
        path.stroked = true;
        path.strokeColor = colorWhite;
        path.strokeWidth = outerStrokeWidth;
      }
      forAllPaths(newLayer.pathItems, callbackStroke);
      forAllPaths(newLayer.compoundPathItems, callbackStroke);

      app.executeMenuCommand('selectall');
      app.executeMenuCommand('hide');

      //-----------------------------------------------------------------------
      copyAllPaths(oldLayer, newLayer, function(path) {
        path.strokeWidth = lineStrokeWidth;
      });

      var rec = newLayer.pathItems.rectangle(r[1], r[0], r[2] - r[0], r[1] - r[3]);
      rec.move(newLayer, ElementPlacement.PLACEATEND);
      rec.fillColor = colorWhite;

      this.mergeAndExpand();
      this.deleteBackground(newLayer);

      //-----------------------------------------------------------------------
      
      app.executeMenuCommand('showAll');
      newLayer.visible = false;
    }
  },

  deleteBackground: function(layer) {
    for (var j = 0; j < layer.compoundPathItems.length; j++) {
      var compoundPath = layer.compoundPathItems[j];
      if (compoundPath.position[0] == 0 && compoundPath.position[1] == 0) {
        compoundPath.remove();
        break;
      }
    }
  },

  mergeAndExpand: function() {
    app.executeMenuCommand('selectall');
    app.executeMenuCommand('group');
    app.executeMenuCommand('Live Pathfinder Merge');
    app.executeMenuCommand('expandStyle');
    app.executeMenuCommand('ungroup');
    app.executeMenuCommand('deselectall');
  }
}

drawBackgroundAndOuterStroke.init();