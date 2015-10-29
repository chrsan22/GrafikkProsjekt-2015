var camera, controls, scene, renderer;  // Creates Camera, Controls, Scene and Renderer
var clock = new THREE.Clock();  //Creates Clock
var grassGroup = new THREE.Object3D();

var init = function() {
    var canvas = document.getElementById("canvas"); // Canvas
    var createObject = new CreateObject(); // Contains functions to create usefulFunctions
    var createLight = new CreateLight(); // Contains functions to create light
    var cleanerMain = new CleanMain(); // Contains functions to clean up the main

    // Camera is positioned towards -z axis
    scene = new THREE.Scene(); // Scene
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1e7);   // Set Camera Perspective
    camera.position.set(0,50,100);  // Set Camera Position towards -z axis

    // Controls for FlyControls
    controls = new THREE.FlyControls( camera ); // Creates Controls
    controls.movementSpeed = 30; // WASD speed
    controls.rollSpeed = Math.PI / 24; // Rollspeed for Q and E roll

    renderer = cleanerMain.renderSettings(renderer);
    document.body.appendChild( renderer.domElement );   // Sets Size
//-------------------------------------------------------------------------------------------------------------------
    // Start of Grass testing
    /*var geometry = new THREE.PlaneBufferGeometry( 100, 20 );
    var groundUnderGrass = new THREE.CubeGeometry(100,0,20);
    var color = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xFFFFFF),
        //map: THREE.ImageUtils.loadTexture( 'resources/textures/texture_snow.jpg' ), overdraw: false,
    });
    var meshing = new THREE.Mesh(groundUnderGrass,color);
    scene.add(meshing);
    meshing.position.set(50,0,10);

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

        for ( var i = 0; i < 50000; i ++ ) {
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


    // Start snow testing
    //--------------------------------------------------------------

    //// set the scene size
    //var WIDTH = window.innerWidth,
    //    HEIGHT = window.innerHeight;
    //
    //// set some camera attributes
    //var VIEW_ANGLE = 45,
    //    ASPECT = WIDTH / HEIGHT,
    //    NEAR = 0.1,
    //    FAR = 10000;

    // get the DOM element to attach to
    // - assume we've got jQuery to hand
    var $container = $('#container');

    // create a WebGL renderer, camera
    // and a scene
    //var renderer = new THREE.WebGLRenderer();
    //var camera = new THREE.Camera(  VIEW_ANGLE,
    //    ASPECT,
    //    NEAR,
    //    FAR  );
    //var scene = new THREE.Scene();
    //
    //// the camera starts at 0,0,0 so pull it back
    //camera.position.z = 900;

    // start the renderer - set the clear colour
    // to a full black
    //renderer.setClearColor(new THREE.Color(0, 1));
    //renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    $container.append(renderer.domElement);

    // create the particle variables
    var particleCount = 8000,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.ParticleBasicMaterial({
            color: 0xFFFFFF,
            size: 10,
            map: THREE.ImageUtils.loadTexture(
                "resources/particle.png"
            ),
            blending: THREE.AdditiveBlending,
            transparent: true
        });

    // now create the individual particles
    for(var p = 0; p < particleCount; p++) {

        // create a particle with random
        // position values, -250 -> 250
        var pX = Math.random() * 500 - 250,
            pY = Math.random() * 500 - 250,
            pZ = Math.random() * 500 - 250,
            particle = new THREE.Vertex(
                new THREE.Vector3(pX, pY, pZ)
            );
        // create a velocity vector
        particle.velocity = new THREE.Vector3(
            0,				// x
            -Math.random(),	// y
            0);				// z

        // add it to the geometry
        particles.vertices.push(particle);
    }

    // create the particle system
    var particleSystem = new THREE.ParticleSystem(
        particles,
        pMaterial);

    particleSystem.sortParticles = true;

    // add it to the scene
    scene.addChild(particleSystem);

    // animation loop
    function update() {

        // add some rotation to the system
        //particleSystem.rotation.y += 0.01;

        var pCount = particleCount;
        while(pCount--) {
            // get the particle
            var particle = particles.vertices[pCount];

            // check if we need to reset
            if(particle.position.y < -300) {
                particle.position.y = 200;
                particle.velocity.y = 0;
            }

            // update the velocity
            particle.velocity.y =-1;

            // and the position
            particle.position.addSelf(
                particle.velocity);
        }

        // flag to the particle system that we've
        // changed its vertices. This is the
        // dirty little secret.
        particleSystem.geometry.__dirtyVertices = false;

        //renderer.render(scene, camera);

        // set up the next call
    }

    // End snow testing
    //--------------------------------------------------------------
    var lightPoint = createLight.directLight(); // Create Light
    var ambientLight = createLight.ambientLight(1500, 3000, -2000);  // Create atmospheric white light

    var grid = new THREE.GridHelper(5000,10); // Create Grid
    var skybox = createObject.skyBox("resources/skybox3/", "cube", "tCube", 1000, 4000, 1000)    // Create Skybox
    var ground = createObject.heightMap("resources/textures/texture_snow.jpg", "heightmap", "terrain", 100, 7, 100, 50, 0, -50)    // Create Heightmap Ground

    scene.add(grassGroup); // Adds Dynamic Grass to Scene
    scene.children.reverse();   // Reverses the children in the opposite direction.
    scene.add(grid);    // Adds Helping Grid for easy view
    scene.add(skybox);  // Adds SkyBox to Scene
    scene.add(ground);  // Adds Heightmap Ground to Scene
    scene.add(ambientLight);    // Adds Ambiebt Light to Scene
    scene.add(lightPoint);  // Adds Light Point to Scene

    //  Useful for later
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

    var time = Date.now() / 6000;

    for ( var i = 0, l = grassGroup.children.length; i < l; i ++ ) {
        var Posmesh = grassGroup.children[ i ];
        Posmesh.position.x = 50 + Math.sin( time * 4 ) * i * i * 0.005;
        Posmesh.position.z = 9.9 + Math.cos( time * 6 ) * i * i * 0.005;
    }
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

