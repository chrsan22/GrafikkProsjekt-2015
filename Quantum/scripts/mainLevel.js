

    var width = window.innerWidth;
    var height = window.innerHeight;
    var aspect = width/height;
    var camera, controls, scene, renderer;
    var clock = new THREE.Clock();


var init = function() {

    var fov = 45; // Field of View
    var near = 0.1; // How near you can get
    scene = new THREE.Scene(); // Scene
    var canvas = document.getElementById("canvas"); // Canvas
    var createObject = new CreateObject(); // Contains functions to create objects
    var createLight = new CreateLight(); // Contains functions to create light
    var heightMapFncs = new HeightMapFunctions(); // Contains functions used in the heightmap

    // Camera
    camera = new THREE.PerspectiveCamera(fov, aspect, near, 1e7);
    camera.position.set(0,5000,10000);

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
    // Clear window to black and set size
    renderer.setClearColor(0x000000);   // Clears Window to Black
    renderer.setPixelRatio( window.devicePixelRatio );  // Sets Size
    renderer.setSize(width, height);    // Sets Size
    document.body.appendChild( renderer.domElement );   // Sets Size
    // Renderer End
    // ----------------------------------------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------------------------------------
    // Skybox Start

    var r = "resources/skybox/";
    var urls = [ r + "posx.jpg", r + "negx.jpg",
                 r + "posy.jpg", r + "negy.jpg",
                 r + "posz.jpg", r + "negz.jpg" ];

    var textureCube = THREE.ImageUtils.loadTextureCube( urls  );
    textureCube.format = THREE.RGBFormat;

    // Skybox

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

    scene.add(skybox);
    scene.add(ground);
    scene.add(sun);
    sun.add(lightPoint);
    ground.add(groundOrbit);





    // Create atmospheric white light
    var ambientLight = createLight.ambientLight();
    scene.add(ambientLight);

    // Resize function
    function onWindowResize() {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    // Render the scene

    render();
    window.addEventListener('resize', onWindowResize, false);
};

var rotateObject = function(object, rotation) {
    object.rotation.x += rotation[0];
    object.rotation.y += rotation[1];
    object.rotation.z += rotation[2];
};

    function animate() {
        requestAnimationFrame( animate );
        render();
    }

    function render() {
        //Controller Variables
        var delta = clock.getDelta(); // seconds.
/*        var moveDistance = 200 * delta; // 200 pixels per second
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
            camera.translateZ(  moveDistance );*/
        controls.update( delta );
        //rotateObject(ground, [0.0,0.0,0.0]);
        //rotateObject(groundOrbit, [0.0,0.0,0.0]);
        //rotateObject(sun, [0.0,0.01,0.0]);
        //rotateObject(skyBox, [0.01,0.01,0.01]);
        renderer.render(scene, camera);
        window.requestAnimFrame(render);
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

