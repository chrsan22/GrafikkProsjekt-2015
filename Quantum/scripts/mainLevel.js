var camera, controls, scene, renderer;  // Creates Camera, Controls, Scene and Renderer
var clock = new THREE.Clock();  //Creates Clock
var cloudGroup = new THREE.Object3D();
var snow = new THREE.Object3D();
var createObject;
var objects = [];   //  Holds the objects created by picker
var raycaster, mouse;   //  Variables used in the picker
var objectInt = 0;
var keyboard;
var tieSquadron;
var tieSquadron2 = new THREE.Object3D();
var tieSquadron3 = new THREE.Object3D();
var tieSquadron4 = new THREE.Object3D();
var tieSquadron5 = new THREE.Object3D();
var tieSquadron6 = new THREE.Object3D();
var tieSquadron7 = new THREE.Object3D();
var tieSquadron8 = new THREE.Object3D();
var tieSquadron9 = new THREE.Object3D();
var tieSquadron10 = new THREE.Object3D();
var tieSquadron11 = new THREE.Object3D();
var tieSquadron12 = new THREE.Object3D();
var tieSquadron13 = new THREE.Object3D();
var tieSquadron14 = new THREE.Object3D();
var tieSquadron15 = new THREE.Object3D();

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
    // Tie Squadron

        tieSquadron = createObject.tieSquadronType1(2100, 75, 2100, 8, 0.7, function (tieSquad){
            tieSquadron = tieSquad;
            scene.add(tieSquadron);
                    });

        tieSquadron2 = createObject.tieSquadronType2(1900, 75, 1900, 8, 0.7);
        tieSquadron3 = createObject.tieSquadronType1(1700,75, 1700, 8, 0.7);
        tieSquadron4 = createObject.tieSquadronType2(1500,75, 1500, 8, 0.7);
        tieSquadron5 = createObject.tieSquadronType1(1000,75, 1000, 8, 0.7);
        tieSquadron6 = createObject.tieSquadronType1(700,75, 700, 8, 0.7);
        tieSquadron7 = createObject.tieSquadronType2(300,75, 300, 8, 0.7);
        tieSquadron8 = createObject.tieSquadronType2(100,75, 100, 8, 0.7);
        tieSquadron9 = createObject.tieSquadronType1(0,75, 0, 8, 0.7);
        tieSquadron10 = createObject.tieSquadronType1(-100,75, -100, 8, 0.7);
        tieSquadron11 = createObject.tieSquadronType1(-500,75, -500, 8, 0.7);
        tieSquadron12 = createObject.tieSquadronType2(-900,75, -900, 8, 0.7);
        tieSquadron13 = createObject.tieSquadronType1(-1200,75, -1200, 8, 0.7);
        tieSquadron14 = createObject.tieSquadronType2(-1500,75, -1500, 8, 0.7);
        tieSquadron15 = createObject.tieSquadronType1(-1900,75, -1900, 8, 0.7);

        scene.add(tieSquadron);
        scene.add(tieSquadron2);
        scene.add(tieSquadron3);
        scene.add(tieSquadron4);
        scene.add(tieSquadron5);
        scene.add(tieSquadron6);
        scene.add(tieSquadron7);
        scene.add(tieSquadron8);
        scene.add(tieSquadron9);
        scene.add(tieSquadron10);
        scene.add(tieSquadron11);
        scene.add(tieSquadron12);
        scene.add(tieSquadron13);
        scene.add(tieSquadron14);
        scene.add(tieSquadron15);

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
        depthTest: false,
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
    } else if (keyboard.pressed('six')) {
        objectInt = 6;
    } else if (keyboard.pressed('seven')) {
        objectInt = 7;
    } else if (keyboard.pressed('eight')) {
        objectInt = 8;
    } else if (keyboard.pressed('nine')) {
        objectInt = 9;
    } else if (keyboard.pressed('zero')) {
        objectInt = 0;
    }

    // Billboard clouds watching you while you sleep, walk etc.
    for (var i = 0, l = cloudGroup.children.length; i < l; i++) {
        var cloudMesh = cloudGroup.children[i];
        cloudMesh.lookAt(camera.position);
    }

    //tie Squadron section
    //TieSquadrons.moveSquadrons();

    if (tieSquadron.position.z > 2201) {
        tieSquadron.position.z = -2100;
        tieSquadron.position.x = -2100;
        tieSquadron.position.y = 75;
    }else{
        tieSquadron.position.z += tieSquadron.forwardSpeed;
        tieSquadron.position.x += tieSquadron.forwardSpeed;
    }

    if (tieSquadron2.position.z > 2201) {
        tieSquadron2.position.z = -2100;
        tieSquadron2.position.x = -2100;
        tieSquadron2.position.y = 75;
    }else{
        tieSquadron2.position.z += tieSquadron.forwardSpeed*1.1;
        tieSquadron2.position.x += tieSquadron.forwardSpeed;
    }
    if (tieSquadron3.position.z > 2201) {
        tieSquadron3.position.z = -2100;
        tieSquadron3.position.x = -2100;
        tieSquadron3.position.y = 75;
    }else{
        tieSquadron3.position.z += tieSquadron.forwardSpeed*0.9;
        tieSquadron3.position.x += tieSquadron.forwardSpeed;
    }

    if (tieSquadron4.position.z > 2201) {
        tieSquadron4.position.z = -2100;
        tieSquadron4.position.x = -2100;
        tieSquadron4.position.y = 75;
    }else{
        tieSquadron4.position.z += tieSquadron.forwardSpeed*1.1;
        tieSquadron4.position.x += tieSquadron.forwardSpeed;
    }

    if (tieSquadron5.position.z > 2201) {
        tieSquadron5.position.z = -2100;
        tieSquadron5.position.x = -2100;
        tieSquadron5.position.y = 75;
    }else{
        tieSquadron5.position.z += tieSquadron.forwardSpeed;
        tieSquadron5.position.x += tieSquadron.forwardSpeed;
    }

    if (tieSquadron6.position.z > 2201) {
        tieSquadron6.position.z = -2100;
        tieSquadron6.position.x = -2100;
        tieSquadron6.position.y = 75;
    }else{
        tieSquadron6.position.z += tieSquadron.forwardSpeed*0.9;
        tieSquadron6.position.x += tieSquadron.forwardSpeed;
    }

    if (tieSquadron7.position.z > 2201) {
        tieSquadron7.position.z = -2100;
        tieSquadron7.position.x = -2100;
        tieSquadron7.position.y = 75;
    }else{
        tieSquadron7.position.z += tieSquadron.forwardSpeed;
        tieSquadron7.position.x += tieSquadron.forwardSpeed*0.9;
    }

    if (tieSquadron8.position.z > 2201) {
        tieSquadron8.position.z = -2100;
        tieSquadron8.position.x = -2100;
        tieSquadron8.position.y = 75;

    }else{
        tieSquadron8.position.z += tieSquadron.forwardSpeed*1.1;
        tieSquadron8.position.x += tieSquadron.forwardSpeed;
    }
    if (tieSquadron9.position.z > 2201) {
        tieSquadron9.position.z = -2100;
        tieSquadron9.position.x = -2100;
        tieSquadron9.position.y = 75;
    }else{
        tieSquadron9.position.z += tieSquadron.forwardSpeed*0.9;
        tieSquadron9.position.x += tieSquadron.forwardSpeed;
    }

    if (tieSquadron10.position.z > 2201) {
        tieSquadron10.position.z = -2100;
        tieSquadron10.position.x = -2100;
        tieSquadron10.position.y = 75;
    }else{
        tieSquadron10.position.z += tieSquadron.forwardSpeed;
        tieSquadron10.position.x += tieSquadron.forwardSpeed*1.1;
    }
    if (tieSquadron11.position.z > 2201) {
        tieSquadron11.position.z = -2100;
        tieSquadron11.position.x = -2100;
        tieSquadron11.position.y = 75;
    }else{
        tieSquadron11.position.z += tieSquadron.forwardSpeed;
        tieSquadron11.position.x += tieSquadron.forwardSpeed*1.1;
    }
    if (tieSquadron12.position.z > 2201) {
        tieSquadron12.position.z = -2100;
        tieSquadron12.position.x = -2100;
        tieSquadron12.position.y = 75;
    }else{
        tieSquadron12.position.z += tieSquadron.forwardSpeed;
        tieSquadron12.position.x += tieSquadron.forwardSpeed*1.1;
    }
    if (tieSquadron13.position.z > 2201) {
        tieSquadron13.position.z = -2100;
        tieSquadron13.position.x = -2100;
        tieSquadron13.position.y = 75;
    }else{
        tieSquadron13.position.z += tieSquadron.forwardSpeed*1.2;
        tieSquadron13.position.x += tieSquadron.forwardSpeed;
    }
    if (tieSquadron14.position.z > 2201) {
        tieSquadron14.position.z = -2100;
        tieSquadron14.position.x = -2100;
        tieSquadron14.position.y = 75;
    }else{
        tieSquadron14.position.z += tieSquadron.forwardSpeed;
        tieSquadron14.position.x += tieSquadron.forwardSpeed*1.2;
    }
    if (tieSquadron15.position.z > 2201) {
        tieSquadron15.position.z = -2100;
        tieSquadron15.position.x = -2100;
        tieSquadron15.position.y = 75;
    }else{
        tieSquadron15.position.z += tieSquadron.forwardSpeed;
        tieSquadron15.position.x += tieSquadron.forwardSpeed*1.3;
    }

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


// Start of Grass testing

/*    var geometry = new THREE.PlaneBufferGeometry( 20, 20 );
 var groundUnderGrass = new THREE.CubeGeometry(20, 0, 20);
 var color = new THREE.MeshBasicMaterial({
 color: new THREE.Color(0xFFFFFF),
 //map: THREE.ImageUtils.loadTexture( 'resources/textures/texture_snow.jpg' ), overdraw: false,
 });
 var meshing = new THREE.Mesh(groundUnderGrass,color);
 scene.add(meshing);
 meshing.position.set(0,0,10);

 var texture2 = new THREE.CanvasTexture( generateTexture() );
 for ( var i = 0; i < 5; i ++ ) {
 var material = new THREE.MeshBasicMaterial( {
 color: new THREE.Color(0xFFFFFF),
 map: texture2,
 depthTest: false,
 depthWrite: false,
 transparent: true
 } );

 var grassMesh = new THREE.Mesh( geometry, material );
 grassMesh.position.y = i * 0.25;
 grassMesh.rotation.x = - Math.PI / 2;

 grassGroup.add( grassMesh );
 }

 function generateTexture() {
 var canvas = document.createElement( 'canvas' );
 canvas.width = 1024;
 canvas.height = 1024;

 var context = canvas.getContext( '2d' );

 for ( var i = 0; i < 10000; i ++ ) {
 context.fillStyle = 'hsl(0,0%,' + ( Math.random() * 50 + 50 ) + '%)';
 context.beginPath();
 context.arc( Math.random() * canvas.width, Math.random() * canvas.height, Math.random() + 0.1, 0, Math.PI * 2, true );
 context.fill();
 }

 context.globalAlpha = 0.075;
 context.globalCompositeOperation = 'lighter';

 return canvas;
 }


 var time = Date.now() / 6000;
 for ( var i = 0, l = grassGroup.children.length; i < l; i ++ ) {
 var Posmesh = grassGroup.children[ i ];
 Posmesh.position.x = Math.sin( time * 4 ) * i * i * 0.005;
 Posmesh.position.z = 9.9 + Math.cos( time * 6 ) * i * i * 0.005;
 }*/
// End of Grass testing
//-----------------------------------------------------------------------------------------------------------------
