// Copy all paths in fromLayer to toLayer.
var copyAllPaths = function(fromLayer, toLayer, callback) {
  fromLayer.visible = true;
  for (var i = 0; i < fromLayer.pathItems.length; i++) {
    var path = fromLayer.pathItems[i].duplicate();
    path.move(toLayer, ElementPlacement.PLACEATBEGINNING);
    callback(path);
  }
  fromLayer.visible = false;
}

var forAllPaths = function(list, callback) {
  for (var i = 0; i < list.length; i++) {
    var path = list[i];
    if (path instanceof PathItem) {
      callback(path);
    } else {
      // } else if (path instance of compoundPathItem) {
      forAllPaths(path.pathItems, callback);
    }
  }
}
