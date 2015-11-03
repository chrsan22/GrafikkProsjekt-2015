var camera, controls, scene, renderer;  // Creates Camera, Controls, Scene and Renderer
var clock = new THREE.Clock();  //Creates Clock
var grassGroup = new THREE.Object3D();
var tieMesh;
var keyboard;
var flightControlGroup = new THREE.Object3D();
var water;

var init = function () {
    var canvas = document.getElementById("canvas"); // Canvas
    var createObject = new CreateObject(); // Contains functions to create usefulFunctions
    var createLight = new CreateLight(); // Contains functions to create light
    var cleanerMain = new CleanMain(); // Contains functions to clean up the main

    keyboard = new THREEx.KeyboardState();
    //TIE-fighter object loading section
    var tieLoaderMTL = new THREE.OBJMTLLoader();
    tieLoaderMTL.load("scripts/starwars-tie-fighter.obj", "scripts/starwars-tie-fighter.mtl", function (object) {
        tieMesh = object;
        tieMesh.rotation.y = 180*(Math.PI/180);
        tieMesh.name = "tieMesh";
        tieMesh.castShadow = true;

        flightControlGroup.add(camera);
        flightControlGroup.add(tieMesh);
        flightControlGroup.position.y = 50;
        flightControlGroup.position.z = 100;

        tieMesh.position.set(0,0, -35);
        controls.object = flightControlGroup;
        scene.add(flightControlGroup);
    });


    // Camera is positioned towards -z axis
    scene = new THREE.Scene(); // Scene
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1e7);   // Set Camera Perspective
    //camera.position.set(0, 50, 100);  // Set Camera Position towards -z axis

    // Controls for FlyControls
    controls = new THREE.FlyControls( camera ); // Creates Controls
    controls.movementSpeed = 30; // WASD speed
    controls.rollSpeed = Math.PI / 24; // Rollspeed for Q and E roll

    renderer = cleanerMain.renderSettings(renderer);
    document.body.appendChild(renderer.domElement);   // Sets Size
/*
    // Start of Grass testing
    var geometry = new THREE.PlaneBufferGeometry(100, 100);
    var groundUnderGrass = new THREE.CubeGeometry(100, 0, 100);
    var color = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xFFFFFF),
        //map: THREE.ImageUtils.loadTexture( 'resources/textures/texture_snow.jpg' ), overdraw: false,
    });
    var meshing = new THREE.Mesh(groundUnderGrass, color);
   scene.add(meshing);
    meshing.position.set(50, 0, 50);

    var texture2 = new THREE.CanvasTexture(generateTexture());
    for (var i = 0; i < 5; i++) {
        var material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0xFFFFFF),
            map: texture2,
            depthTest: false,
            depthWrite: false,
            transparent: true
        });

        var grassMesh = new THREE.Mesh(geometry, material);
        grassMesh.position.y = i * 0.25;
        grassMesh.rotation.x = -Math.PI / 2;

        grassGroup.add(grassMesh);
    }
*/
    function generateTexture() {
        var canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;

        var context = canvas.getContext('2d');

        for (var i = 0; i < 100000; i++) {
            context.fillStyle = 'hsl(0,0%,' + ( Math.random() * 50 + 50 ) + '%)';
            context.beginPath();
            context.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() + 0.1, 0, Math.PI * 2, true);
            context.fill();
        }

        context.globalAlpha = 0.075;
        context.globalCompositeOperation = 'lighter';

        return canvas;
    }

    // End of Grass testing
    //-----------------------------------------------------------------------------------------------------------------

    var lightPoint = createLight.directLight(); // Create Light
    var ambientLight = createLight.ambientLight(1500, 3000, -2000);  // Create atmospheric white light

    var grid = new THREE.GridHelper(20000, 100); // Create Grid
    var skybox = createObject.skyBox("resources/skybox3/", "cube", "tCube", 20000, 30000, 20000)    // Create Skybox
    var ground = createObject.heightMap("resources/textures/texture_snow.jpg", "heightmap", "terrain", 300, 20, 300, 50, -2, -150)    // Create Heightmap Ground
    ground.recieveShadow = true;
    //scene.add(grassGroup); // Adds Dynamic Grass to Scene
    scene.children.reverse();   // Reverses the children in the opposite direction.
    //scene.add(grid);    // Adds Helping Grid for easy view
    scene.add(skybox);  // Adds SkyBox to Scene
    scene.add(ground);  // Adds Heightmap Ground to Scene
    scene.add(ambientLight);    // Adds Ambiebt Light to Scene
    scene.add(lightPoint);  // Adds Light Point to Scene

    // Create ocean
    // Load textures
    var waterNormals = new THREE.ImageUtils.loadTexture('resources/heightmaps/waternormals.jpg');
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    // Create the water effect
    water = new THREE.Water(renderer, camera, scene, {
        textureWidth: 4000,
        textureHeight: 4000,
        waterNormals: waterNormals,
        alpha: 	1.0,
        sunDirection: lightPoint.position.normalize(),
        waterColor: 0x001e0f,
        betaVersion: 0,
        side: THREE.DoubleSide
    });
    var aMeshMirror = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(4000, 4000, 10, 10),
        water.material
    );

    aMeshMirror.add(water);
    aMeshMirror.rotation.x = - Math.PI * 0.5;
    scene.add(aMeshMirror);


    function onWindowResize() {
        renderer.setSize(window.innerWidth, window.innerHeight); // Re-Sets Renderer size
        camera.aspect = window.innerWidth / window.innerHeight; // Re-Sets Camera Aspect
        camera.updateProjectionMatrix();    // Updates Projection Matrix
    }

    render();   // Render the scene
    window.addEventListener('resize', onWindowResize, false);
};

function render() {
    var delta = clock.getDelta(); // seconds.
    controls.update(delta);   // Update Controls
    water.material.uniforms.time.value += 1.0 / 60.0;
    water.render();
    renderer.render(scene, camera); // Repeat Renderer
    window.requestAnimFrame(render);    // Banana

    var time = Date.now() / 6000;
/*
    for (var i = 0, l = grassGroup.children.length; i < l; i++) {
        var Posmesh = grassGroup.children[i];
        Posmesh.position.x = 50 + Math.sin(time * 4) * i * i * 0.005;
        Posmesh.position.z = 50 + Math.cos(time * 6) * i * i * 0.005;
    }
*/
     //TIE- control section
    //  var tieMesh = scene.getObjectByName("tieMesh");
     var moveDistance = 50 * delta; // 50 pixels per second
     var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second

     if (keyboard.pressed("h")) {
     tieMesh.translateX(moveDistance);
     }
     if (keyboard.pressed("k")) {
     tieMesh.translateX(-moveDistance);
     }
     if (keyboard.pressed("j")) {
     tieMesh.translateZ(-moveDistance);
     }
     if (keyboard.pressed("u")) {
     tieMesh.translateZ(moveDistance);
     }
     var rotation_matrix = new THREE.Matrix4().identity();
     if (keyboard.pressed("i")) {
     tieMesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), rotateAngle);
     }
     if (keyboard.pressed("y")) {
     tieMesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), -rotateAngle);
     }
    // camera.position.set(tieMesh.position.x,tieMesh.position.y+5,tieMesh.position.z+30);


}

window.addEventListener('load', init);

// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

/*******************
    Ocean section
  ******************/

/*
function initiateOcean(){
var gsize = 512;
var res = 1024;
var gres = res / 2;
var origx = -gsize / 2;
var origz = -gsize / 2;
ocean = new THREE.Ocean(renderer, this.camera, this.scene,
    {
        USE_HALF_FLOAT : hash === 'half-float',
        INITIAL_SIZE : 256.0,
        INITIAL_WIND : [10.0, 10.0],
        INITIAL_CHOPPINESS : 1.5,
        CLEAR_COLOR : [1.0, 1.0, 1.0, 0.0],
        GEOMETRY_ORIGIN : [origx, origz],
        SUN_DIRECTION : [-1.0, 1.0, 1.0],
        OCEAN_COLOR: new THREE.Vector3(0.004, 0.016, 0.047),
        SKY_COLOR: new THREE.Vector3(3.2, 9.6, 12.8),
        EXPOSURE : 0.35,
        GEOMETRY_RESOLUTION: gres,
        GEOMETRY_SIZE : gsize,
        RESOLUTION : res
    });
    ocean.materialOcean.uniforms.u_projectionMatrix = { type: "m4", value: camera.projectionMatrix };
    ocean.materialOcean.uniforms.u_viewMatrix = { type: "m4", value: camera.matrixWorldInverse };
    ocean.materialOcean.uniforms.u_cameraPosition = { type: "v3", value: camera.position };
    scene.add(ocean.oceanMesh);

var gui = new dat.GUI();
var c1 = gui.add(ocean, "size",100, 5000);
c1.onChange(function(v) {
    this.object.size = v;
    this.object.changed = true;
});
var c2 = gui.add(ocean, "choppiness", 0.1, 4);
c2.onChange(function (v) {
    this.object.choppiness = v;
    this.object.changed = true;
});
var c3 = gui.add(ocean, "windX",-15, 15);
c3.onChange(function (v) {
    this.object.windX = v;
    this.object.changed = true;
});
var c4 = gui.add(ocean, "windY", -15, 15);
c4.onChange(function (v) {
    this.object.windY = v;
    this.object.changed = true;
});
var c5 = gui.add(ocean, "sunDirectionX", -1.0, 1.0);
c5.onChange(function (v) {
    this.object.sunDirectionX = v;
    this.object.changed = true;
});
var c6 = gui.add(ocean, "sunDirectionY", -1.0, 1.0);
c6.onChange(function (v) {
    this.object.sunDirectionY = v;
    this.object.changed = true;
});
var c7 = gui.add(this.ms_Ocean, "sunDirectionZ", -1.0, 1.0);
c7.onChange(function (v) {
    this.object.sunDirectionZ = v;
    this.object.changed = true;
});
var c8 = gui.add(this.ms_Ocean, "exposure", 0.0, 0.5);
c8.onChange(function (v) {
    this.object.exposure = v;
    this.object.changed = true;
});

}
*/