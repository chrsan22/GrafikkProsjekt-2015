/**
 * Created by Christer on 23/10/15.
 */

function CreateLight() {
    var light;
}

/*
 Prototype function that creates a Three.JS Light
 Returns LightPoint
 */
CreateLight.prototype.lightPoint = function() {
    light = new THREE.PointLight(0xFFFFFF, 5);
    light.castShadow = true;
    return light;
};

CreateLight.prototype.directLight = function() {
    light = new THREE.DirectionalLight(0xFFFFFF);
    light.castShadow = true;
    return light;
};

CreateLight.prototype.ambientLight = function(posX, posY, posZ) {
    light = new THREE.AmbientLight(0x303030);
    light.position.set(posX, posY, posZ); // Sets Amibent Light Position
    light.castShadow = false;
    return light;
};