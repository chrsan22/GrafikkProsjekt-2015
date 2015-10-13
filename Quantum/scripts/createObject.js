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
CreateObject.prototype.boxGeometry = function(tex, geoX, geoY, geoZ, name) {
    texture = THREE.ImageUtils.loadTexture(tex);
    geometry = new THREE.BoxGeometry(geoX, geoY, geoZ);
    material = new THREE.MeshBasicMaterial({ map: texture});
    object = new THREE.Mesh(geometry, material);
    return object;
};

/*
 Prototype function that creates a Three.JS circle
 Returns CircleGeometry Object
 */
CreateObject.prototype.circleGeometry = function(tex, rad, width, height, name) {
    texture = THREE.ImageUtils.loadTexture(tex);
    geometry = new THREE.CircleGeometry(rad, width, height);
    material = new THREE.MeshPhongMaterial({ map: texture});
    object = new THREE.Mesh(geometry, material);
    return object;
};

/*
 Prototype function that creates a Three.JS plane
 Returns PlaneGeometry Object
 */
CreateObject.prototype.planeGeometry = function(tex, geoX, geoY, geoZ, name) {
    texture = THREE.ImageUtils.loadTexture(tex);
    geometry = new THREE.PlaneGeometry(geoX, geoY, geoZ);
    material = new THREE.MeshBasicMaterial({ map: texture});
    object = new THREE.Mesh(geometry, material);
    return object;
};