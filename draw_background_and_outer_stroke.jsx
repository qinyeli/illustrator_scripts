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
//
// Note: The script expects that each artboard has only one layer, and each
// layer is fully contained in a single artboard. It also expects that the
// layers and the artboards are in corresponding order.
var drawBackgroundAndOuterStroke = {
  init: function() {
    hideAllLayers();
    var oldLayers = existingLayers()
    var newLayers = []

    for (var i = 0; i < oldLayers.length; i++) {
      docRef.artboards.setActiveArtboardIndex(i);

      var oldLayer = oldLayers[i];
      var newLayer = docRef.layers.add();
      newLayer.visible = true;
      newLayers.push(newLayer);

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

      var r = docRef.artboards[i].artboardRect;
      var rec = newLayer.pathItems.rectangle(
          /*top=*/r[1],
          /*left=*/r[0],
          /*width=*/r[2] - r[0],
          /*height=*/r[1] - r[3]);
      rec.move(newLayer, ElementPlacement.PLACEATEND);
      rec.fillColor = colorWhite;

      this.mergeAndExpand();
      this.deleteBackground(newLayer, r);

      //-----------------------------------------------------------------------
      
      app.executeMenuCommand('showAll');
      newLayer.visible = false;
    }

    for (var i = 0; i < newLayers.length; i++) {
      newLayers[i].visible = true;
    }
  },

  deleteBackground: function(layer, r) {
    for (var j = 0; j < layer.compoundPathItems.length; j++) {
      var compoundPath = layer.compoundPathItems[j];
      if (compoundPath.position[0] == r[0] && compoundPath.position[1] == r[1]) {
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