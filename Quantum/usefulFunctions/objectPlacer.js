/**
 * Created by Christer on 10/11/15.
 */

function ObjectPlacer() {
}

/*
 Prototype function that creates MTL Object and returns it
 */
ObjectPlacer.prototype.objectToPlace = function(objNr, intersect) {
    var objectLoad = new THREE.OBJMTLLoader();
    var obj = "tree-toon";
    objectLoad.load("scripts/" + obj + ".obj", "scripts/" + obj + ".mtl", function (object) {
        var mesh = object;
        mesh.name = obj;
        mesh.position.copy(intersect.point).add(intersect.face.normal);
        mesh.position.divideScalar(5).floor().multiplyScalar(5).addScalar(4.5);
        return mesh;
    })
};