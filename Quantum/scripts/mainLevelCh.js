var camera, controls, scene, renderer;  // Creates Camera, Controls, Scene and Renderer
var clock = new THREE.Clock();  //Creates Clock

var init = function() {
    var canvas = document.getElementById("canvas"); // Canvas
    var createObject = new CreateObject(); // Contains functions to create usefulFunctions
    var createLight = new CreateLight(); // Contains functions to create light
    var cleanerMain = new CleanMain(); // Contains functions to clean up the main

    // Camera is positioned towards -z axis
    scene = new THREE.Scene(); // Scene
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1e7);   // Set Camera Perspective
    camera.position.set(0,150,200);  // Set Camera Position towards -z axis
    camera.rotation.x = 340*(Math.PI/180) // Set a rotate to watch down on the landscape

    // Controls for FlyControls
    controls = new THREE.FlyControls( camera ); // Creates Controls
    controls.movementSpeed = 30; // WASD speed
    controls.rollSpeed = Math.PI / 24; // Rollspeed for Q and E roll

    renderer = cleanerMain.renderSettings(renderer);    // Sets Renderer in a different file
    document.body.appendChild( renderer.domElement );   // Sets Size

    var lightPoint = createLight.directLight(); // Create Light
    var ambientLight = createLight.ambientLight(1500, 3000, -2000);  // Create atmospheric white light



    var grid = new THREE.GridHelper(250,10); // Create Grid
    var skyBox = createObject.skyBox("resources/skybox3/", "cube", "tCube", 500, 1000, 500)    // Create Skybox
    var ground = createObject.heightMap("resources/textures/texture_snow.jpg", "heightmap", "terrain", 500, 50, 250, 0, 0, -125)    // Create Heightmap Ground

    scene.children.reverse();   // Reverses the children in the opposite direction.
    scene.add(grid);    // Adds Helping Grid for easy view
    scene.add(skyBox);  // Adds SkyBox to Scene
    scene.add(ground);  // Adds Heightmap Ground to Scene
    scene.add(ambientLight);    // Adds Ambiebt Light to Scene
    scene.add(lightPoint);  // Adds Light Point to Scene

    //  --------- Trees
    for (var i = 0; i < 100; i++) {
        var tieLoaderMTL = new THREE.OBJMTLLoader();
        tieLoaderMTL.load("scripts/tree-toon.obj", "scripts/tree-toon.mtl", function (object) {
            var tempMesh;
            tempMesh = object;
            tempMesh.rotation.y = 180*(Math.PI/180);
            tempMesh.name = "tree" + i;
            tempMesh.position.set(Math.random() * (250 - (-250) + 1) + (-250), 100, Math.random() * (125 - (-125) + 1) + (-125));
            ground.add(tempMesh);
            tempMesh.position.y = ground.getHeightAtPoint(tempMesh.position);
        });
    }
    //  --------- Trees

    //  Useful for later, position on the heightmap!
    //  var temp = createObject.boxGeometry("resources/textures/texture_snow.jpg", 1, 1, 1, 0, 0, 0, true, true);
    //  ground.add(temp);
    //  temp.position.y = ground.getHeightAtPoint(temp.position) + 0.5;

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
    controls.update( delta );   // Update Controls
    renderer.render(scene, camera); // Repeat Renderer
    window.requestAnimFrame(render);    // Banana
}

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

