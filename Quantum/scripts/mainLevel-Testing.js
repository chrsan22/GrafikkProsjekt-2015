
var init = function() {
    var width = window.innerWidth; // Variable used in Camera
    var height = window.innerHeight; // Variable used in Camera
    var aspect = width/height; // Variable used in Camera
    var fov = 45; // Variable used in Camera
    var near = 0.1; // Variable used in Camera
    var canvas = document.getElementById("canvas"); // Finds the canvas element
    var scene = new THREE.Scene(); // Creates the Scene
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, 1e7); // Sets the Camera's values
    var createObject = new CreateObject(); // Contains functions to create objects
    var createLight = new CreateLight(); // Contains functions to create light
    var heightMapFncs = new HeightMapFunctions(); // Contains functions used in the heightmap
    var keyboard = new THREEx.KeyboardState(); // Contains code relating to keyboard detection
    var objectMaterialLoader = new THREE.OBJMTLLoader(); // Material Loader for Objects
    var clock = new THREE.Clock(); // ????

    camera.position.set(0,1000,0); // Sets the Camera start position

    // Create renderer, set antialias to true if possible
    var renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });
    // Activates Shadows, Clears window to black and set size
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.setClearColor(0x000000);
    renderer.setSize(width, height);

    controls = new THREE.OrbitControls( camera, renderer.domElement ); // Initiates mouse controller

    // ----------------------------------------------------------------------------------------------------------------
    // Code relating to Height Map
    var useRandomHeightMap = false;
    if (useRandomHeightMap) {
        terrainData = generateHeight( worldWidth, worldDepth );
    } else {
        var heightMapImage = document.getElementById('heightmap');
        terrainData = heightMapFncs.getPixelValues(heightMapImage, 'r');
        worldWidth = heightMapImage.width;
        worldDepth = heightMapImage.height;
        worldHalfWidth = Math.floor(worldWidth / 2);
        worldHalfDepth = Math.floor(worldDepth / 2);
    }

    // Not required to use the generated texture
    terrainTexture = new THREE.CanvasTexture( heightMapFncs.generateTexture( terrainData, worldWidth, worldDepth ) );
    terrainTexture.wrapS = THREE.ClampToEdgeWrapping;
    terrainTexture.wrapT = THREE.ClampToEdgeWrapping;
    terrainTexture.castShadow = true;
    terrainTexture.receiveShadow = true;

    // Generate terrain geometry and mesh
    var heightMapGeometry = new HeightMapBufferGeometry(terrainData, worldWidth, worldDepth);
    // We scale the geometry to avoid scaling the node, since scales propagate.
    heightMapGeometry.scale(50*worldWidth, 1000, 50*worldDepth);

    texture = THREE.ImageUtils.loadTexture("resources/heightmap_11.png");
    terrainMesh = new HeightMapMesh( heightMapGeometry, new THREE.MeshPhongMaterial( { map: terrainTexture, map: texture } ) );
    terrainMesh.name = "terrain";

    // End of code relating to Height Map
    // ----------------------------------------------------------------------------------------------------------------

    var texture = THREE.ImageUtils.loadTexture("resources/texture_clouds.jpeg");
    texture.flipY = false;
    var geometry = new THREE.CubeGeometry(15000, 1, 15000);
    var material = new THREE.MeshLambertMaterial({ map: texture, transparent: true, opacity: 0.5});
    var clouds = new THREE.Mesh(geometry, material);
    clouds.position.set(0, 4000, 0);

    var sun = createObject.sphereGeometry("resources/texture_sun.jpg", 1000, 16, 16, 1500, 7000, -10000, false, false); // Create sun
    var lightPoint = createLight.directLight(); // Create Light


    // Create Skybox
    var skyBoxGeometry = new THREE.CubeGeometry( 100000, 100000, 100000 );
    texture = THREE.ImageUtils.loadTexture("resources/texture_skybox.jpg");
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { map: texture, side: THREE.BackSide } );
    var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );

    var ambientLight = createLight.ambientLight(); // Create atmospheric white light

    //Add Items to the Scene
    scene.add(ambientLight);
    scene.add( terrainMesh );
    scene.add(skyBox);
    scene.add(sun);
    scene.add(clouds);
    sun.add(lightPoint);


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
        renderer.render(scene, camera);
        window.requestAnimFrame(render);
        //rotateObject(terrainMesh, [0.0, 0.003, 0.0]);
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

