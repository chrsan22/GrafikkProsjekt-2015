var camera, controls, scene, renderer;  // Creates Camera, Controls, Scene and Renderer
var clock = new THREE.Clock();  //Creates Clock
var cloudGroup = new THREE.Object3D();
var snow = new THREE.Object3D();
var createObject;
var objects = [];   //  Holds the objects created by picker
var raycaster, mouse;   //  Variables used in the picker
var objectInt = 0;
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
    var grid = new THREE.GridHelper(500, 10); // Create Grid
    var skyBox = createObject.skyBox("resources/skybox3/", "cube", "tCube", 4100, 4000, 4100)    // Create Skybox
    var ground = createObject.heightMap("resources/textures/texture_snow.jpg", "heightmap", "terrain", 500, 45, 500, 0, -2, 0)    // Create Heightmap Ground
    var water = createObject.createWater(lightPoint, 4000, 4000);     // Adding Water
    snow = createObject.fallingSnow(200, 1000 ,500, 100, 0, 1000, 500);     // Adding Snow
    //scene.fog = new THREE.Fog( 0x999999, 0.0100, 500 );     // Adding fog


    //-----------------------------------------------------------------------------------------------------------------
    // Tie Squadron2
/*
    createObject.tieSquadronType1(2100, 75, 2100, 8, 0.7, function(tieSquad){
        tieSquadron1 = tieSquad;
        tieForce.push(tieSquadron1);
        scene.add(tieSquadron1);
    });

    createObject.tieSquadronType2(1900, 75, 1900, 8, 0.7, function(tieSquad){
        tieSquadron2 = tieSquad;
        tieForce.push(tieSquadron2);
        console.log(tieForce[0]);
        scene.add(tieSquadron2);
    });


    for(var i = 0; i<100; i++){
        var startPos = Math.random()* 4200 - 2100;
        var squadType = Math.random()* 10 + 1;
        var directionX = Math.random()* 1.3 + 0.7;
        var directionZ = Math.random()* 1.3 + 0.7;

        if(squadType > 4){
            var tieSquadron = new THREE.Object3D();
            tieSquadron = tieSquadron1.clone();
          // console.log(tieSquadron);
            tieSquadron.position.x = startPos;
            tieSquadron.position.z = startPos;
            tieSquadron.directionX = directionX;
            tieSquadron.directionZ = directionZ;

            tieForce.push(tieSquadron);

        } else {
            var tieSquadron = new THREE.Object3D();
            tieSquadron = tieSquadron2.clone();
            // console.log(tieSquadron);
            tieSquadron.position.x = startPos;
            tieSquadron.position.z = startPos;
            tieSquadron.directionX = directionX;
            tieSquadron.directionZ = directionZ;

            tieForce.push(tieSquadron);
        }
    }
*/
    for(var i = 0; i<20; i++){
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


    // End of Tie Squadron
    //-----------------------------------------------------------------------------------------------------------------
    // Billboard cloud testing

    var geometryCloud, materialCloud, textureCloud;

    geometryCloud = new THREE.Geometry();
    textureCloud = THREE.ImageUtils.loadTexture('resources/cloud10.png', null, null);
    textureCloud.magFilter = THREE.LinearMipMapLinearFilter;
    textureCloud.minFilter = THREE.LinearMipMapLinearFilter;

    var fog = new THREE.Fog(0x4584b4, -100, 3000);

    materialCloud = new THREE.ShaderMaterial({

        uniforms: {

            "map": {type: "t", value: textureCloud},
            "fogColor": {type: "c", value: fog.color},
            "fogNear": {type: "f", value: fog.near},
            "fogFar": {type: "f", value: fog.far},
        },
        vertexShader: document.getElementById('vs').textContent,
        fragmentShader: document.getElementById('fs').textContent,
        depthWrite: false,
        depthTest: true,
        transparent: true

    });

    for (var i = 0; i < 2000; i++) {
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(64, 64), materialCloud);
        plane.position.x = Math.random() * 4000 - 2000;
        plane.position.y = Math.random() * 300 + 285;
        plane.position.z = Math.random() * 4000 - 2000;
        plane.rotation.z = Math.random() * Math.PI;
        plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

        THREE.GeometryUtils.merge(geometryCloud, plane);
        cloudGroup.add(plane);
    }
    scene.add( cloudGroup );

    // End of Billboard cloud testing
    //-----------------------------------------------------------------------------------------------------------------
    // Picker testing
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    cubeGeo = new THREE.BoxGeometry(5, 5, 5);
    cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xfeb74c,
        shading: THREE.FlatShading,
        map: THREE.ImageUtils.loadTexture("resources/textures/texture_snow.jpg")
    });

    // Function that executes on mouse click!
    function onDocumentMouseDown(event) {
        event.preventDefault();
        mouse.set(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1);
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(objects);
        if (intersects.length > 0) {
            var intersect = intersects[0];
            objectPlacer.objectToPlace(objectInt, intersect, function (mesh) {
                ground.add(mesh);
                objects.push(mesh);
            });
        }
    }

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    //-----------------------------------------------------------------------------------------------------------------

    //scene.add(grassGroup); // Adds Dynamic Grass to Scene
    ground.add(snow);    // Adds Snowmeshes
    scene.children.reverse();   // Reverses the children in the opposite direction.
    //scene.add(grid);    // Adds Helping Grid for easy view
    scene.add(skyBox);  // Adds SkyBox to Scene
    scene.add(ground);  // Adds Heightmap Ground to Scene
    scene.add(water);   // Adds Water to Scene
    scene.add(ambientLight);    // Adds Ambiebt Light to Scene
    scene.add(lightPoint);  // Adds Light Point to Scene

    //  Adds mesh'es to the objects list
    objects.push(skyBox);
    objects.push(ground);
    objects.push(water);


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
    controls.update(delta);   // Update Controls
    renderer.render(scene, camera); // Repeat Renderer
    //Water rendering
    water.material.uniforms.time.value += 1.0 / 60.0;   // The rate the water will render
    water.render();     // Rendering water movement
    createObject.fallingSnowRender(snow, 100);   // Rendering snow movement
    window.requestAnimFrame(render);    // Reloop

    // Picks the object to be placed
    if (keyboard.pressed('one')) {
        objectInt = 1;
    } else if (keyboard.pressed('two')) {
        objectInt = 2;
    } else if (keyboard.pressed('three')) {
        objectInt = 3;
    } else if (keyboard.pressed('four')) {
        objectInt = 4;
    } else if (keyboard.pressed('five')) {
        objectInt = 5;
    } else if (keyboard.pressed('zero')) {
        objectInt = 0;
    }

    // Billboard clouds watching you while you sleep, walk etc.
    for (var i = 0, l = cloudGroup.children.length; i < l; i++) {
        var cloudMesh = cloudGroup.children[i];
        cloudMesh.lookAt(camera.position);
    }

    //tie Squadron section
    createObject.tieSquadronRendering();

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

