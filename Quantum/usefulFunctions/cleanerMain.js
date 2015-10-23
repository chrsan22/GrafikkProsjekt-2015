/**
 * Created by Christer on 23/10/15.
 */
function CleanMain() {

}

/*
 * Start settings for renderer
 */
CleanMain.prototype.renderSettings = function (renderIn) {
    renderIn = new THREE.WebGLRenderer({
        canvas: canvas, // Sets Canvas
        antialias: true // Sets Anti Aliasing
    });
    renderIn.shadowMapEnabled = true;   // Enables Shadow Map
    renderIn.shadowMapSoft = true;      // Shadow Map Settings
    renderIn.setClearColor(0x000000);   // Clears Window to Black
    renderIn.setSize(window.innerWidth, window.innerHeight);    // Sets Size

    return renderIn;
};

/*
 * Function for rotating objects
 */
CleanMain.prototype.rotateObject = function(object, rotation) {
        object.rotation.x += rotation[0];
        object.rotation.y += rotation[1];
        object.rotation.z += rotation[2];
};