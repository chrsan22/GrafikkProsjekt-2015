

    var width = window.innerWidth;  // Sets Width
    var height = window.innerHeight;    // Sets Height
    var aspect = width/height;  // Sets Aspect Ratio
    var camera, controls, scene, renderer;  // Creates Camera, Controls, Scene and Renderer
    var clock = new THREE.Clock();  //Creates Clock


var init = function() {

    scene = new THREE.Scene(); // Scene
    var canvas = document.getElementById("canvas"); // Canvas
    var createObject = new CreateObject(); // Contains functions to create objects
    var createLight = new CreateLight(); // Contains functions to create light
    var heightMapFncs = new HeightMapFunctions(); // Contains functions used in the heightmap

    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1e7);   // Set Camera Perspective
    camera.position.set(0,5000,10000);  // Set Camera Position

    // Controls for FlyControls
    controls = new THREE.FlyControls( camera ); // Creates Controls
    controls.movementSpeed = 5000; // WASD speed
    controls.rollSpeed = Math.PI / 24; // Rollspeed for Q and E roll

    // ----------------------------------------------------------------------------------------------------------------
    // Renderer Creation and Settings
    renderer = new THREE.WebGLRenderer({
        canvas: canvas, // Sets Canvas
        antialias: true // Sets Anti Aliasing
    });
    renderer.shadowMapEnabled = true;   // Enables Shadow Map
    renderer.shadowMapSoft = true;      // Shadow Map Settings
    renderer.setClearColor(0x000000);   // Clears Window to Black
    renderer.setSize(width, height);    // Sets Size
    document.body.appendChild( renderer.domElement );   // Sets Size
    // Renderer End
    // ----------------------------------------------------------------------------------------------------------------
    // Skybox Start

    var r = "resources/skybox/";
    var urls = [ r + "posx.jpg", r + "negx.jpg",
                 r + "posy.jpg", r + "negy.jpg",
                 r + "posz.jpg", r + "negz.jpg" ];

    var textureCube = THREE.ImageUtils.loadTextureCube( urls  );
    textureCube.format = THREE.RGBFormat;

    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = textureCube;

    var material = new THREE.ShaderMaterial( {
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.DoubleSide

    } );
    var skybox = new THREE.Mesh( new THREE.BoxGeometry( 5000, 5000, 5000 ), material );

    // Skybox End
    // ----------------------------------------------------------------------------------------------------------------
    // Code relating to Height Map

    var terrainData, worldWidth, worldDepth, terrainTexture, texture, ground;
    var useRandomHeightMap = false;
    if (useRandomHeightMap) {
        terrainData = generateHeight();
    } else {
        var heightMapImage = document.getElementById('heightmap');  // Actual Heightmap
        terrainData = heightMapFncs.getPixelValues(heightMapImage, 'r');
        worldWidth = heightMapImage.width;
        worldDepth = heightMapImage.height;
    }

    // Not required to use the generated texture
    terrainTexture = new THREE.CanvasTexture( heightMapFncs.generateTexture( terrainData, worldWidth, worldDepth ) );
    terrainTexture.wrapS = THREE.ClampToEdgeWrapping;
    terrainTexture.wrapT = THREE.ClampToEdgeWrapping;
    terrainTexture.castShadow = true;
    terrainTexture.receiveShadow = true;

    var heightMapGeometry = new HeightMapBufferGeometry(terrainData, worldWidth, worldDepth);   // Generate terrain geometry and mesh
    heightMapGeometry.scale(50*worldWidth, 1000, 50*worldDepth);    // Scale Geometry

    texture = THREE.ImageUtils.loadTexture("resources/heightmap_11.png");   // Heightmap Texture
    ground = new HeightMapMesh( heightMapGeometry, new THREE.MeshPhongMaterial( { map: terrainTexture, map: texture } ) );
    ground.name = "terrain";

    // End of code relating to Height Map
    // ----------------------------------------------------------------------------------------------------------------

    var groundOrbit = new THREE.Object3D(); // Set sun orbit around ground
    var sun = createObject.sphereGeometry("resources/texture_sun.jpg", 500, 16, 16, 1500, 3000, -2000, false, false);   // Create sun
    var lightPoint = createLight.directLight(); // Create Light
    var ambientLight = createLight.ambientLight();  // Create atmospheric white light

    scene.add(skybox);
    scene.add(ground);
    scene.add(sun);
    scene.add(ambientLight);
    sun.add(lightPoint);
    ground.add(groundOrbit);

    // Resize function
    function onWindowResize() {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    render();   // Render the scene
    window.addEventListener('resize', onWindowResize, false);
};

// Currently unused rotate function
var rotateObject = function(object, rotation) {
    object.rotation.x += rotation[0];
    object.rotation.y += rotation[1];
    object.rotation.z += rotation[2];
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

