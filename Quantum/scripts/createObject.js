function CreateObject() {
    var texture;
    var geometry;
    var material;
    var object;
}

/*
    Prototype function that creates a Three.JS box
    Returns BoxGeometry Mesh
 */
CreateObject.prototype.boxGeometry = function(tex, geoX, geoY, geoZ, posX, posY, posZ, giveShadow, getShadow) {
    texture = THREE.ImageUtils.loadTexture(tex);
    geometry = new THREE.BoxGeometry(geoX, geoY, geoZ);
    material = new THREE.MeshPhongMaterial({ map: texture });
    object = new THREE.Mesh(geometry, material);
    object.castShadow = giveShadow;
    object.receiveShadow = getShadow;
    object.position.set(posX, posY, posZ);
    return object;
};

/*
 Prototype function that creates a Three.JS sphere
 Returns SphereGeometry Mesh
 */
CreateObject.prototype.sphereGeometry = function(tex, rad, width, height, posX, posY, posZ, giveShadow, getShadow) {
    texture = THREE.ImageUtils.loadTexture(tex);
    texture.flipY = false;
    geometry = new THREE.SphereGeometry(rad, width, height);
    material = new THREE.MeshBasicMaterial({ map: texture});
    object = new THREE.Mesh(geometry, material);
    object.castShadow = giveShadow;
    object.receiveShadow = getShadow;
    object.position.set(posX, posY, posZ);
    return object;
};

/*
 Prototype function that creates a Three.JS plane
 Returns PlaneGeometry Mesh
 */
CreateObject.prototype.planeGeometry = function(tex, geoX, geoY, geoZ, posX, posY, posZ, giveShadow, getShadow) {
    texture = THREE.ImageUtils.loadTexture(tex);
    texture.flipY = false;
    geometry = new THREE.PlaneGeometry(geoX, geoY, geoZ);
    material = new THREE.MeshPhongMaterial({ map: texture});
    object = new THREE.Mesh(geometry, material);
    object.castShadow = giveShadow;
    object.receiveShadow = getShadow;
    object.position.set(posX, posY, posZ);
    return object;
};

CreateObject.prototype.heightMap = function(geoX, geoY) {

    return object;
};