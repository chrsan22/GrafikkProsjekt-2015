
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
    var createObject = new CreateObject();
    var createLight = new CreateLight();

    // Add camera to scene
    scene.add(camera);
    camera.position.z = 10000;

    // Create renderer, set antialias to true if possible
    var renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });

    // Create Ground
    var ground = createObject.boxGeometry("resources/texture_grass.jpg", 5000, 5000, 30);
    scene.add(ground);
    rotateObject(ground, [-1.3,0.0,0.0]);

    // Set sun orbit around ground
    var groundOrbit = new THREE.Object3D();
    ground.add(groundOrbit)
    // Create sun
    var sun = createObject.sphereGeometry("resources/texture_sun.jpg", 100, 16, 16);
    groundOrbit.add(sun);
    sun.position.set(0, 0, 3000);
    // Create Light
    var lightPoint = createLight.lightPoint();
    sun.add(lightPoint);

    // Create Building 1
    var building1 = createObject.boxGeometry("resources/texture_woodPane.jpg", 200, 200, 500);
    ground.add(building1);
    building1.position.z = 280;
    building1.position.y = 400;

    // Create Building 2
    var building2 = createObject.boxGeometry("resources/texture_woodPane.jpg", 200, 200, 500);
    ground.add(building2);
    building2.position.z = 280;
    building2.position.y = -400;

    // Create Bridge
    var bridge = createObject.boxGeometry("resources/texture_woodPane.jpg", 100, 700, 100);
    building1.add(bridge);
    bridge.position.z = 100;
    bridge.position.y = -400;

    // Create atmospheric white light
    var amb = new THREE.AmbientLight(0xFF9999);
    scene.add(amb);

    // Clear window to black and set size
    renderer.setClearColor(0x000000);
    renderer.setSize(width, height);

    // Render the scene
    function render() {
        rotateObject(ground, [0.0,0.0,0.01]);
        rotateObject(groundOrbit, [0.0,0.01,0.0]);
        rotateObject(sun, [0.0,0.01,0.0]);
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

