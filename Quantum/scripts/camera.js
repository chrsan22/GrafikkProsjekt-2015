var controls, scene, camera;
var init = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var aspect = width/height;
    var fov = 45;
    var near = 0.1;
    var far = 50000;
    var canvas = document.getElementById("canvas");
    scene = new THREE.Scene();
    var createObject = new CreateObject();
    var createLight = new CreateLight();

    // Camera stuff
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    //camera.position.set(0, 0, 8000);

    controls = new THREE.TrackballControls(camera);
    //controls.addEventListener('change', render);


    // Add camera to scene
    //scene.add(camera);
    camera.position.z = 10000;


    // Create renderer, set antialias to true if possible
    var renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });

    // Create Ground
    var ground = createObject.planeGeometry("resources/texture_grass.jpg", 3000, 3000, 1);
    scene.add(ground);
    rotateObject(ground, [-1.3,0.0,0.0]);

    // Create atmospheric white light
    var ambientLight = createLight.ambientLight();
    scene.add(ambientLight);

    // Clear window to black and set size
    renderer.setClearColor(0x000000);
    renderer.setSize(width, height);

    // Render the scene
    function render() {

        renderer.render(scene, camera);
        window.requestAnimFrame(render);

    }
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
    }
    animate();
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