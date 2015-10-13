function CreateObject() {
    var texture;
    var geometry;
    var material;
    var object;
}

/*
    Prototype function that creates a Three.JS box
    Returns BoxGeometry Object
 */
CreateObject.prototype.boxGeometry = function(tex, geoX, geoY, geoZ) {
    texture = THREE.ImageUtils.loadTexture(tex);
    geometry = new THREE.BoxGeometry(geoX, geoY, geoZ);
    material = new THREE.MeshPhongMaterial({ map: texture});
    object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    object.receiveShadow = true;
    return object;
};

/*
 Prototype function that creates a Three.JS sphere
 Returns SphereGeometry Object
 */
CreateObject.prototype.sphereGeometry = function(tex, rad, width, height) {
    texture = THREE.ImageUtils.loadTexture(tex);
    geometry = new THREE.SphereGeometry(rad, width, height);
    material = new THREE.MeshBasicMaterial({ map: texture});
    object = new THREE.Mesh(geometry, material);
    return object;
};

/*
 Prototype function that creates a Three.JS plane
 Returns PlaneGeometry Object
 */
CreateObject.prototype.planeGeometry = function(tex, geoX, geoY, geoZ) {
    texture = THREE.ImageUtils.loadTexture(tex);
    geometry = new THREE.PlaneGeometry(geoX, geoY, geoZ);
    material = new THREE.MeshPhongMaterial({ map: texture});
    object = new THREE.Mesh(geometry, material);
    return object;
};