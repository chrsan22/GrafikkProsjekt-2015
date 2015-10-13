/**
 * Created by oysmal on 29.09.15.
 */

var init = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var aspect = width/height;
    var fov = 45;
    var near = 0.1;
    var far = 500;
    var canvas = document.getElementById("canvas");

    // Create renderer, set antialias to true if possible
    var renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });

    // Create camera
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Create scene
    var scene = new THREE.Scene();

    // Add camera to scene
    scene.add(camera);
    camera.position.z = 500;

    // Clear window to black and set size
    renderer.setClearColor(0x000000);
    renderer.setSize(width, height);

    // Create Ground
    var groundTexture = THREE.ImageUtils.loadTexture('resources/texture_grass.jpg');
    var groundGeometry = new THREE.BoxGeometry(200, 200, 0);
    var groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture});
    var ground = new THREE.Mesh(groundGeometry, groundMaterial);
    scene.add(ground);

    // Light Point on Grass
    var pointLight = new THREE.PointLight(0xFFFFFF, 5);
    ground.add(pointLight);

    // Render the scene
    function render() {
        renderer.render(scene, camera);
        window.requestAnimFrame(render);
    }
    render();
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

