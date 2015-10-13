
var init = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var aspect = width/height;
    var fov = 45;
    var near = 0.1;
    var far = 50000;
    var canvas = document.getElementById("canvas");
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Add camera to scene
    scene.add(camera);
    camera.position.z = 10000;

    // Create renderer, set antialias to true if possible
    var renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });

    // Clear window to black and set size
    renderer.setClearColor(0x000000);
    renderer.setSize(width, height);

    // getObject
    var createObject = new CreateObject();
    scene.add(createObject.planeGeometry("resources/texture_grass.jpg", 5000, 5000, 1));

    // Render the scene
    function render() {
        renderer.render(scene, camera);
        window.requestAnimFrame(render);
    }
    render();
};

var rotateObject = function(object, rotation) {
    object.rotation.x += rotation[0];
    object.rotation.y += rotation[1];
    object.rotation.z += rotation[2];
};

window.addEventListener('load', init);


// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

