var hideAllLayers = function() {
  for (var i = 0; i < docRef.layers.length; i++) {
    if (!docRef.layers[i].name.match(/^\+/)) {
      docRef.layers[i].visible = false;
    }
  }
}

var showAllLayers = function() {
  for (var i = 0; i < docRef.layers.length; i++) {
    if (!docRef.layers[i].name.match(/^\-/)) {
      docRef.layers[i].visible = true;
    }
  }
}

var numLayersToExport = function() {
  var count = 0;
  for (var i = 0; i < docRef.layers.length; i++) {
    var layer = docRef.layers[i];
    if (!layer.name.match(/^\+/) && !layer.name.match(/^\-/)) {
      count++;
    }
  }
  return count;
}

// Return all existing layers as a list,
// excluding layers starting with + or -
var existingLayers = function() {
  var result = []
  for (var i = 0; i < docRef.layers.length; i++) {
    var layer = docRef.layers[i];
    if (!(layer.name.match(/^\+/) || layer.name.match(/^\-/))) {
      result.push(layer)
    }
  }
  return result
}
