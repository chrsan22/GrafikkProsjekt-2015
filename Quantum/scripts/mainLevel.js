var camera, controls, scene, renderer;  // Creates Camera, Controls, Scene and Renderer
var clock = new THREE.Clock();  //Creates Clock
var cloudGroup = new THREE.Object3D();
var snow = new THREE.Object3D();
var createObject;
var objects = [];   //  Holds the objects created by picker
var raycaster, mouse;   //  Variables used in the picker
var objectInt = 1;
var keyboard;
var tieForce = [];
var tieSquadron1 = new THREE.Object3D();
var tieSquadron2 = new THREE.Object3D();

var init = function () {
    var canvas = document.getElementById("canvas"); // Canvas
    createObject = new CreateObject(); // Contains functions to create objects
    objectPlacer = new ObjectPlacer(); // Contains functions to create objects with picker
    var createLight = new CreateLight(); // Contains functions to create light
    var cleanerMain = new CleanMain(); // Contains functions to clean up the main

    scene = new THREE.Scene(); // Scene
    keyboard = new THREEx.KeyboardState();

    // Adding Camera, positioned towards -z axis
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1e7);   // Set Camera Perspective
    camera.position.set(0, 150, 400);  // Set Camera Position towards -z axis
    camera.rotation.x = 340 * (Math.PI / 180) // Set a rotate to watch down on the landscape

    // Controls for FlyControls
    controls = new THREE.FlyControls(camera); // Creates Controls
    controls.movementSpeed = 200; // WASD speed
    controls.rollSpeed = Math.PI / 24; // Rollspeed for Q and E roll

    renderer = cleanerMain.renderSettings(renderer);    // Sets Renderer in a different file
    document.body.appendChild(renderer.domElement);   // Sets Size

    //initiating vital objects
    var lightPoint = createLight.directLight(); // Create Light
    var ambientLight = createLight.ambientLight(1500, 3000, -2000);  // Create atmospheric white light
    var skyBox = createObject.skyBox("resources/skybox3/", "cube", "tCube", 4100, 4000, 4100)    // Create Skybox
    var ground = createObject.heightMap("resources/textures/texture_snow.jpg", "heightmap", "terrain", 500, 45, 500, 0, -2, 0)    // Create Heightmap Ground
    var water = createObject.createWater(lightPoint, 4000, 4000);     // Adding Water
    snow = createObject.fallingSnow(200, 1000 ,500, 100, 0, 1000, 500);     // Adding Snow

    /*
        Creates Tie Fighter squadrons
        TODO Explain?
     */
    for(var i = 0; i<10; i++){
        var startPos = Math.random()* 4200 - 2100;
        var squadType = Math.random()* 10 + 1;

        if(squadType > 4){
            var tieSquadron = new THREE.Object3D();

            createObject.tieSquadronType1(startPos, 75, startPos, 8, 0.7, function(tieSquad){
                tieSquadron = tieSquad;
                tieForce.push(tieSquadron);
                scene.add(tieSquadron);
            });

            tieSquadron.position.x = startPos;
            tieSquadron.position.z = startPos;

            tieForce.push(tieSquadron);

        } else {
            var tieSquadron = new THREE.Object3D();

            createObject.tieSquadronType2(startPos, 75, startPos, 8, 0.7, function(tieSquad){
                tieSquadron = tieSquad;
                tieForce.push(tieSquadron);
                scene.add(tieSquadron);
            });

            tieSquadron.position.x = startPos;
            tieSquadron.position.z = startPos;
        }
    }

    /*
        Creates clouds using the cloud function in createObjects.js
        Static function with no user input
     */
    var cloudGroup = createObject.clouds();
    scene.add( cloudGroup );

    /*
        Implementation of Picker.
        Uses RayCaster and a array of objects in order to find where you click
     */
    raycaster = new THREE.Raycaster();  //  Creates RayCaster
    mouse = new THREE.Vector2();
    document.addEventListener('mousedown', onDocumentMouseDown, false); // Creates event listener for left mouse click

    /*
        On click(left) event using the RayCaster
        The function gathers information from RayCaster and finds the first object in the path of your mouse when click(left)
        Executes the objectToPlace function in objectPlacer which plases a object (based on selection by numbers 0-5)
        and the intersects gathered from RayCaster.
     */
    function onDocumentMouseDown(event) {
        event.preventDefault();
        mouse.set(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1);  //  Registers mous position
        raycaster.setFromCamera(mouse, camera); //  Bases RayCaster off current camera position
        var intersects = raycaster.intersectObjects(objects);
        if (intersects.length > 0) {
            var intersect = intersects[0];
            objectPlacer.objectToPlace(objectInt, intersect, function (mesh) {
                ground.add(mesh);   //  Adds mesh to ground(Heightmap)
                objects.push(mesh); //  Pushes mesh to objects
            });
        }
    }

    /*
        All Mesh that does not need to be added in spesific areas are added here
        Followed by pushing some Mesh to the objects array which is used in the RayCaster/Picker
     */
    ground.add(snow);    // Adds Snowmeshes
    scene.children.reverse();   // Reverses the children in the opposite direction.
    scene.add(skyBox);  // Adds SkyBox to Scene
    scene.add(ground);  // Adds Heightmap Ground to Scene
    scene.add(water);   // Adds Water to Scene
    scene.add(ambientLight);    // Adds Ambient Light to Scene
    scene.add(lightPoint);  // Adds Light Point to Scene
    objects.push(skyBox);   //  Pushes skyBox to objects
    objects.push(ground);   // Pushes ground to objects
    objects.push(water);    // Pushes water to objects


    /*
        Resize function
        Re-Sets the size of view based on window size
        Also executes the render function
     */
    function onWindowResize() {
        renderer.setSize(window.innerWidth, window.innerHeight); // Re-Sets Renderer size
        camera.aspect = window.innerWidth / window.innerHeight; // Re-Sets Camera Aspect
        camera.updateProjectionMatrix();    // Updates Projection Matrix
    }

    render();   // Render the scene
    window.addEventListener('resize', onWindowResize, false);
};

/*
    Render function which is updated constantly as events occur in the application
 */
function render() {
    var delta = clock.getDelta(); // seconds.
    controls.update(delta);   // Update Controls
    renderer.render(scene, camera); // Repeat Renderer

    /*
        Sets render rates of water
        Renders water movement
     */
    water.material.uniforms.time.value += 1.0 / 60.0;   // The rate the water will render
    water.render();     // Rendering water movement

    /*
        Creates falling snow
     */
    createObject.fallingSnowRender(snow, 100);   // Rendering snow movement

    /*
        TODO Explain?
     */
    window.requestAnimFrame(render);    // Reloop

    /*
        Reacts to pressed Keys in order to select which object the picker should place once click(left) is executed
        0-5 (6 Objects to choose from)
        Once a object is selected the menu in the top left corner of screen will highlight selected object
        Highlighted object will be placed on click(left)
     */
    if (keyboard.pressed('one')) {
        document.getElementById(objectInt).style.backgroundColor = "rgba(3,3,3,.4)";
        objectInt = 1;
        document.getElementById("1").style.backgroundColor = "rgba(255,255,0,.4)";
    } else if (keyboard.pressed('two')) {
        document.getElementById(objectInt).style.backgroundColor = "rgba(3,3,3,.4)";
        objectInt = 2;
        document.getElementById("2").style.backgroundColor = "rgba(255,255,0,.4)";
    } else if (keyboard.pressed('three')) {
        document.getElementById(objectInt).style.backgroundColor = "rgba(3,3,3,.4)";
        objectInt = 3;
        document.getElementById("3").style.backgroundColor = "rgba(255,255,0,.4)";
    } else if (keyboard.pressed('four')) {
        document.getElementById(objectInt).style.backgroundColor = "rgba(3,3,3,.4)";
        objectInt = 4;
        document.getElementById("4").style.backgroundColor = "rgba(255,255,0,.4)";
    } else if (keyboard.pressed('five')) {
        document.getElementById(objectInt).style.backgroundColor = "rgba(3,3,3,.4)";
        objectInt = 5;
        document.getElementById("5").style.backgroundColor = "rgba(255,255,0,.4)";
    } else if (keyboard.pressed('six')) {
        document.getElementById(objectInt).style.backgroundColor = "rgba(3,3,3,.4)";
        objectInt = 6;
        document.getElementById("6").style.backgroundColor = "rgba(255,255,0,.4)";
    }


    /*
        Updates clouds based on camera angle
     */
    for (var i = 0, l = cloudGroup.children.length; i < l; i++) {
        var cloudMesh = cloudGroup.children[i];
        cloudMesh.lookAt(camera.position);
    }

    /*
        TODO Magnus what this do? Describe! Describe!
     */
    createObject.tieSquadronRendering();

}

window.addEventListener('load', init);

/*
    Shim layer with setTimeout fallback
    TODO Better description?
 */
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };

})();

