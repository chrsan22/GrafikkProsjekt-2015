    var camera, controls, scene, renderer;  // Creates Camera, Controls, Scene and Renderer
    var clock = new THREE.Clock();  //Creates Clock
    //var grassGroup = new THREE.Object3D();
    var snow = new THREE.Object3D();
    var createObject;
    var objects = [];   //  Holds the objects created by picker
    var raycaster, mouse;   //  Variables used in the picker
    var objectInt = 0;


var init = function() {
    var canvas = document.getElementById("canvas"); // Canvas
    createObject = new CreateObject(); // Contains functions to create objects
    objectPlacer = new ObjectPlacer(); // Contains functions to create objects with picker
    var createLight = new CreateLight(); // Contains functions to create light
    var cleanerMain = new CleanMain(); // Contains functions to clean up the main

    scene = new THREE.Scene(); // Scene

    // Adding Camera, positioned towards -z axis
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1e7);   // Set Camera Perspective
    camera.position.set(0,150,400);  // Set Camera Position towards -z axis
    camera.rotation.x = 340*(Math.PI/180) // Set a rotate to watch down on the landscape

    // Controls for FlyControls
    controls = new THREE.FlyControls( camera ); // Creates Controls
    controls.movementSpeed = 500; // WASD speed
    controls.rollSpeed = Math.PI / 24; // Rollspeed for Q and E roll

    renderer = cleanerMain.renderSettings(renderer);    // Sets Renderer in a different file
    document.body.appendChild( renderer.domElement );   // Sets Size

    //initiating vital objects
    var lightPoint = createLight.directLight(); // Create Light
    var ambientLight = createLight.ambientLight(1500, 3000, -2000);  // Create atmospheric white light
    var grid = new THREE.GridHelper(500,10); // Create Grid
    var skyBox = createObject.skyBox("resources/skybox3/", "cube", "tCube", 4100, 4000, 4100)    // Create Skybox
    var ground = createObject.heightMap("resources/textures/texture_snow.jpg", "heightmap", "terrain", 500, 75, 500, 0, -2, 0)    // Create Heightmap Ground
    var water = createObject.createWater(lightPoint, 4000, 4000);     // Adding Water
    snow = createObject.fallingSnow(150, 1000 ,500, 100, 0, 1000, 500);     // Adding Snow
    //scene.fog = new THREE.Fog( 0x999999, 0.0100, 500 );     // Adding fog

    //-----------------------------------------------------------------------------------------------------------------
    // Billboard cloud testing

    var meshCloud, geometryCloud, materialCloud;

        // Bg gradient

/*        var canvas = document.createElement( 'canvas' );
        canvas.width = 32;
        canvas.height = window.innerHeight;

        var context = canvas.getContext( '2d' );

        var gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
        gradient.addColorStop(0, "#1e4877");
        gradient.addColorStop(0.5, "#4584b4");

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);*/

        geometryCloud = new THREE.Geometry();

        var textureCloud = THREE.ImageUtils.loadTexture( 'resources/cloud10.png', null, null );
        textureCloud.magFilter = THREE.LinearMipMapLinearFilter;
        textureCloud.minFilter = THREE.LinearMipMapLinearFilter;

        var fog = new THREE.Fog( 0x4584b4, - 100, 3000 );

        materialCloud = new THREE.ShaderMaterial( {

            uniforms: {

                "map": { type: "t", value: textureCloud },
                "fogColor" : { type: "c", value: fog.color },
                "fogNear" : { type: "f", value: fog.near },
                "fogFar" : { type: "f", value: fog.far },
            },
            vertexShader: document.getElementById( 'vs' ).textContent,
            fragmentShader: document.getElementById( 'fs' ).textContent,
            depthWrite: false,
            depthTest: false,
            transparent: true

        } );

        var plane = new THREE.Mesh( new THREE.PlaneGeometry( 64, 64 ) );

        for ( var i = 0; i < 4000; i++ ) {

            plane.position.x = Math.random() * 4000 - 2000;
            plane.position.y = Math.random() * 200 + 185;
            plane.position.z = Math.random() * 4000 - 2000;
            plane.rotation.z = Math.random() * Math.PI;
            plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

            THREE.GeometryUtils.merge( geometryCloud, plane );
        }

        meshCloud = new THREE.Mesh( geometryCloud, materialCloud );
        scene.add( meshCloud );

    // End of Billboard cloud testing
    //-----------------------------------------------------------------------------------------------------------------
    // Picker testing
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    cubeGeo = new THREE.BoxGeometry( 5, 5, 5 );
    cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c, shading: THREE.FlatShading, map: THREE.ImageUtils.loadTexture( "resources/textures/texture_snow.jpg" ) } );

    // Function that executes on mouse click!
    function onDocumentMouseDown( event ) {
        event.preventDefault();
        mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( objects );
        if ( intersects.length > 0 ) {
            var intersect = intersects[ 0 ];
            var createdObject = objectPlacer.objectToPlace(objectInt, intersect);
            ground.add(createdObject);
            objects.push( createdObject );
            }
        }
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
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
    objects.push (skyBox);
    objects.push (ground);
    objects.push (water);


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
        createObject.fallingSnowRender(snow, 100);   // Rendering snow movement
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
