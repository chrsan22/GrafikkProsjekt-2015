
var init = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var aspect = width/height;
    var fov = 45;
    var near = 0.1;
    var canvas = document.getElementById("canvas");
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, 1e7);
    var createObject = new CreateObject();
    var createLight = new CreateLight();

    // Starting position for camera (x, y, z)
    camera.position.set(0,0,1000);

    // Create renderer, set antialias to true if possible
    var renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });

    // Renderer Shadows
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    // Create Ground
    var ground = createObject.planeGeometry("resources/texture_grass.jpg", 10000, 10000, 0, 0, 0, 0, false, true);
    scene.add(ground);
    rotateObject(ground, [-1.3,0.0,1.0]);

    // Set sun orbit around ground
    var groundOrbit = new THREE.Object3D();
    ground.add(groundOrbit);
    // Create sun
    var sun = createObject.sphereGeometry("resources/texture_sun.jpg", 100, 16, 16, 1500, 3000, -2000, false, false);
    scene.add(sun);
    // Create Light
    var lightPoint = createLight.directLight();
    sun.add(lightPoint);

    // Create Building 1
    var building1 = createObject.boxGeometry("resources/texture_skyscraper.jpg", 200, 200, 500, 0, 400, 250, true, true);
    ground.add(building1);

    // Create Building 2
    var building2 = createObject.boxGeometry("resources/texture_skyscraper.jpg", 200, 200, 500, 0, -400, 250, true, true);
    ground.add(building2);

    // Create Christers Car
    var car = createObject.boxGeometry("resources/texture_skyscraper.jpg", 50, 10, 15, 0, 0, 50, true, true);
    ground.add(car);
    var keyboard	= new THREEx.KeyboardState();
    var clock = new THREE.Clock();
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // Create Bridge
    var bridge = createObject.boxGeometry("resources/texture_bridge.jpg", 20, 700, 20, 0, -400, 100, true, true);
    building1.add(bridge);

    // Create Street
    var street = createObject.planeGeometry("resources/texture_street.jpg", 200, 2000, 0, 0, 0, 5, true, true);
    ground.add(street);
    rotateObject(street, [0.0,0.0,1.6]);

    // Create atmospheric white light
    var ambientLight = createLight.ambientLight();
    scene.add(ambientLight);

    // Clear window to black and set size
    renderer.setClearColor(0x000000);
    renderer.setSize(width, height);

    // Resize function
    function onWindowResize() {
        width = window.innerWidth;
        height = window.innerHeight;

        renderer.setSize(width, height);
    }
    window.addEventListener('resize', onWindowResize, false);

    // Render the scene
    function render() {
        //Controller Variables
        var delta = clock.getDelta(); // seconds.
        var moveDistance = 200 * delta; // 200 pixels per second
        var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
        //Car Movement
        if ( keyboard.pressed("up") )
            car.translateX( moveDistance );
        if ( keyboard.pressed("down") )
            car.translateX(  -moveDistance );
        if ( keyboard.pressed("o") )
            car.translateZ( -moveDistance );
        if ( keyboard.pressed("l") )
            car.translateZ(  moveDistance );
        var rotation_matrix = new THREE.Matrix4().identity();
        if ( keyboard.pressed("left") )
            car.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngle);
        if ( keyboard.pressed("right") )
            car.rotateOnAxis( new THREE.Vector3(0,0,1), -rotateAngle);

        // Camera Movement
        if ( keyboard.pressed("a") )
            camera.translateX( moveDistance );
        if ( keyboard.pressed("d") )
            camera.translateX(  -moveDistance );
        if ( keyboard.pressed("w") )
            camera.translateZ( -moveDistance );
        if ( keyboard.pressed("s") )
            camera.translateZ(  moveDistance );
        controls.update();
        rotateObject(ground, [0.0,0.0,0.0]);
        //rotateObject(groundOrbit, [0.0,0.0,0.0]);
        rotateObject(sun, [0.0,0.01,0.0]);
        //rotateObject(skyBox, [0.01,0.01,0.01]);
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

