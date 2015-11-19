/**
 * Created by Christer on 10/11/15.
 */

function ObjectPlacer() {
}

/*
    Prototype function that creates MTL Object and returns it
 */
ObjectPlacer.prototype.objectToPlace = function(objNr, intersect, callback) {
    var objectLoad = new THREE.OBJMTLLoader();
    var obj = selectObject(objNr);
    console.log(obj);
    objectLoad.load("resources/objects/" + obj + ".obj", "resources/objects/" + obj + ".mtl", function (object) {
        var mesh = object;
        mesh.name = obj;
        mesh.position.copy(intersect.point).add(intersect.face.normal);
        mesh.position.divideScalar(5).floor().multiplyScalar(5).addScalar(4.5);
        callback(mesh);
    })
};

/*
    Function for changing the object being placed based on integer set in mainLevel
 */
function selectObject(objNr) {
    switch(objNr) {
        case 0:
            return "tree-toon";
            break;
        case 1:
            return "starwars-tie-fighter";
            break;
        case 2:
            return "apartment-house";
            break;
        case 3:
            return "medieval-house-2";
            break;
        case 4:
            return "tardis";
            break;
        case 5:
            return "rainbow-dash";
            break;
    }
}