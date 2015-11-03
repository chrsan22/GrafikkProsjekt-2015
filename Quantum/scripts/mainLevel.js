    var camera, controls, scene, renderer;  // Creates Camera, Controls, Scene and Renderer
    var clock = new THREE.Clock();  //Creates Clock
    //var grassGroup = new THREE.Object3D();
    var snowGroup = new THREE.Object3D();
    var particleCount, particles, snowMesh;


var init = function() {
    var canvas = document.getElementById("canvas"); // Canvas
    var createObject = new CreateObject(); // Contains functions to create usefulFunctions
    var createLight = new CreateLight(); // Contains functions to create light
    var cleanerMain = new CleanMain(); // Contains functions to clean up the main

    // Camera is positioned towards -z axis
    scene = new THREE.Scene(); // Scene
    // Adding fog
   // scene.fog = new THREE.Fog( 0xCCCCCC, 0.0100, 600 );
    // Adding camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1e7);   // Set Camera Perspective
    camera.position.set(0,150,200);  // Set Camera Position towards -z axis
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

    var grid = new THREE.GridHelper(250,10); // Create Grid
    var skyBox = createObject.skyBox("resources/skybox3/", "cube", "tCube", 2100, 4000, 2100)    // Create Skybox
    var ground = createObject.heightMap("resources/textures/texture_snow.jpg", "heightmap", "terrain", 500, 50, 250, 0, -2, -125)    // Create Heightmap Ground


//-------------------------------------------------------------------------------------------------------------------
    // Start of Grass testing
/*    var greenGrass = createObject.boxGeometryColor(0x009900, 500, 1, 100, 0, 0, -200, false, true);
    scene.add(greenGrass);
    var greenGrass2 = createObject.boxGeometryColor(0x009900, 100, 1, 400, -200, 0, 50,false, true);
    scene.add(greenGrass2);*/

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
    // Start of snow implementation
    // create the particle variables
     particleCount = 300;
     particles = new THREE.Geometry();
     pMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 2,
            map: THREE.ImageUtils.loadTexture(
                "resources/particle.png"
            ),
            blending: THREE.AdditiveBlending,
            transparent: true
        });

    // now create the individual particles
    for(var p = 0; p <= particleCount; p++) {
        snowMesh = new THREE.Points(particles, pMaterial);
        snowMesh.position.x = Math.random() * 250 - 125;
        snowMesh.position.y = Math.random() * 250;
        snowMesh.position.z = Math.random() * 125 - 62.5;
        snowMesh.velocity = -(Math.random() * 0.5) - 0.1;
        particles.vertices.push(new THREE.Vector3(snowMesh.position.x, snowMesh.position.y, snowMesh.position.z))
        snowMesh.sortParticles = true;
        snowGroup.add(snowMesh);
    }

    // End of snow implementation
    //-----------------------------------------------------------------------------------------------------------------
    // Start of water implementation

    // Load textures
    var waterNormals = new THREE.ImageUtils.loadTexture('resources/heightmaps/waternormals.jpg');
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    // Create the water effect
    water = new THREE.Water(renderer, camera, scene, {
        textureWidth: 2000,
        textureHeight: 2000,
        waterNormals: waterNormals,
        alpha: 	1.0,
        sunDirection: lightPoint.position.normalize(),
        waterColor: 0x001e0f,
        betaVersion: 0,
        side: THREE.DoubleSide
    });
    var aMeshMirror = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2000, 2000, 10, 10),
        water.material
    );

    aMeshMirror.add(water);
    aMeshMirror.rotation.x = - Math.PI * 0.5;
    scene.add(aMeshMirror);

    // End of water implementation
    //-----------------------------------------------------------------------------------------------------------------


    //scene.add(grassGroup); // Adds Dynamic Grass to Scene
    ground.add(snowGroup);    // Adds Snowmeshes
    scene.children.reverse();   // Reverses the children in the opposite direction.
    //scene.add(grid);    // Adds Helping Grid for easy view
    scene.add(skyBox);  // Adds SkyBox to Scene
    scene.add(ground);  // Adds Heightmap Ground to Scene
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
        window.requestAnimFrame(render);    // Banana
        //Water rendering
        water.material.uniforms.time.value += 1.0 / 60.0;
        water.render();
/*        var time = Date.now() / 6000;
        for ( var i = 0, l = grassGroup.children.length; i < l; i ++ ) {
            var Posmesh = grassGroup.children[ i ];
            Posmesh.position.x = Math.sin( time * 4 ) * i * i * 0.005;
            Posmesh.position.z = 9.9 + Math.cos( time * 6 ) * i * i * 0.005;
        }*/
        // Snow movement
        for(var i = 0; i < snowGroup.children.length; i++) {
            var particle = snowGroup.children[i];
            if(particle.position.y <= 1) {
                particle.position.y = 250;
                particle.velocity = -(Math.random() * 0.6) - 0.1; // Sets new random velocity rate
            }else {
                particle.position.y = particle.position.y + particle.velocity; // Continues down with the same velocity rate
            }
        }
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

