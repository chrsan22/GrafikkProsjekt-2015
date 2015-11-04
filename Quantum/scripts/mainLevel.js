    var camera, controls, scene, renderer;  // Creates Camera, Controls, Scene and Renderer
    var clock = new THREE.Clock();  //Creates Clock
    //var grassGroup = new THREE.Object3D();
    var snow = new THREE.Object3D();
    var createObject;


var init = function() {
    var canvas = document.getElementById("canvas"); // Canvas
    createObject = new CreateObject(); // Contains functions to create usefulFunctions
    var createLight = new CreateLight(); // Contains functions to create light
    var cleanerMain = new CleanMain(); // Contains functions to clean up the main

    scene = new THREE.Scene(); // Scene

    // Adding Camera, positioned towards -z axis
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1e7);   // Set Camera Perspective
    camera.position.set(0,150,400);  // Set Camera Position towards -z axis
    camera.rotation.x = 340*(Math.PI/180) // Set a rotate to watch down on the landscape

    // Controls for FlyControls
    controls = new THREE.FlyControls( camera ); // Creates Controls
    controls.movementSpeed = 100; // WASD speed
    controls.rollSpeed = Math.PI / 24; // Rollspeed for Q and E roll

    renderer = cleanerMain.renderSettings(renderer);    // Sets Renderer in a different file
    document.body.appendChild( renderer.domElement );   // Sets Size

    //initiating vital objects
    var lightPoint = createLight.directLight(); // Create Light
    var ambientLight = createLight.ambientLight(1500, 3000, -2000);  // Create atmospheric white light
    var grid = new THREE.GridHelper(500,10); // Create Grid
    var skyBox = createObject.skyBox("resources/skybox3/", "cube", "tCube", 2100, 4000, 2100)    // Create Skybox
    var ground = createObject.heightMap("resources/textures/texture_snow.jpg", "heightmap", "terrain", 500, 75, 500, 0, -2, 0)    // Create Heightmap Ground
    var water = createObject.createWater(lightPoint, 2000, 2000);     // Adding Water
    snow = createObject.fallingSnow(300, 250 ,125, 250, 0, 250, 125);     // Adding Snow
    scene.fog = new THREE.Fog( 0x999999, 0.0100, 400 );     // Adding fog


    //-----------------------------------------------------------------------------------------------------------------
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
    }*/
    // End of Grass testing
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
        //Water rendering
        water.material.uniforms.time.value += 1.0 / 60.0;   // The rate the water will render
        water.render();     // Rendering water movement
        createObject.fallingSnowRender(snow);   // Rendering snow movement
        window.requestAnimFrame(render);    // Reloop
/*      var time = Date.now() / 6000;
        for ( var i = 0, l = grassGroup.children.length; i < l; i ++ ) {
            var Posmesh = grassGroup.children[ i ];
            Posmesh.position.x = Math.sin( time * 4 ) * i * i * 0.005;
            Posmesh.position.z = 9.9 + Math.cos( time * 6 ) * i * i * 0.005;
        }*/
    }

window.addEventListener('load', init);

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

