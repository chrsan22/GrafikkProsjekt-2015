
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

    // Often Used
    var texture;
    var geometry;
    var material;

    // Create renderer, set antialias to true if possible
    var renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        //antialias: true
    });

    // Add camera to scene
    scene.add(camera);
    camera.position.z = 10000;

    // Clear window to black and set size
    renderer.setClearColor(0x000000);
    renderer.setSize(width, height);

    // Create Ground
    texture = THREE.ImageUtils.loadTexture('resources/texture_grass.jpg');
    geometry = new THREE.BoxGeometry(5000, 5000, 1);
    material = new THREE.MeshBasicMaterial({ map: texture});
    var ground = new THREE.Mesh(geometry, material);
    scene.add(ground);
    rotateObject(ground, [-0.9,0.2,0.0]);

    // Create Cube
    geometry = new THREE.BoxGeometry(200, 50, 100);
    material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    var cube1 = new THREE.Mesh(geometry, material);
    ground.add(cube1);

    cube1.position.x = 400;
    cube1.position.z = 51;

    // Light Point on Grass
    var pointLight = new THREE.PointLight(0xFFFFFF, 5);
    //ground.add(pointLight);

    // Render the scene
    function render() {
        rotateObject(ground, [0.0,0.0,0.0]);
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

