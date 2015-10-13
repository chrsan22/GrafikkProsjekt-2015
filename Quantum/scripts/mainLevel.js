
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

    // Create Ground
    var createObject = new CreateObject();
    var ground = createObject.boxGeometry("resources/texture_grass.jpg", 5000, 5000, 30);
    scene.add(ground);

    // Create Building 1
    var building1 = createObject.boxGeometry("resources/texture_woodPane.jpg", 200, 200, 500);
    ground.add(building1);
    building1.add(bridge);
    building1.position.z = 280;
    building1.position.y = 400;

    // Create Building 2
    var building2 = createObject.boxGeometry("resources/texture_woodPane.jpg", 200, 200, 500);
    ground.add(building2);
    building2.position.z = 280;
    building2.position.y = -400;

    // Create Bridge
    var bridge = createObject.boxGeometry("resources/texture_woodPane.jpg", 100, 700, 100);
    bridge.position.z = 100;
    bridge.position.y = -400;

    rotateObject(ground, [-1.3,0.0,0.6]);


    // Render the scene
    function render() {
        rotateObject(ground, [0.0,0.0,0.01]);
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

