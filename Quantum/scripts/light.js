function CreateLight() {
}

/*
 Prototype function that creates a Three.JS Light
 Returns LightPoint
 */
CreateLight.prototype.lightPoint = function() {
    var pointLight = new THREE.PointLight(0xFFFFFF, 5);
    return pointLight;
};