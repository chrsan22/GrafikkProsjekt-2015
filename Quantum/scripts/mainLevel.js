    var width = window.innerWidth;  // Sets Width
    var height = window.innerHeight;    // Sets Height
    var aspect = width/height;  // Sets Aspect Ratio
    var camera, controls, scene, renderer;  // Creates Camera, Controls, Scene and Renderer
    var clock = new THREE.Clock();  //Creates Clock
    var grassGroup = new THREE.Object3D();


var init = function() {

    scene = new THREE.Scene(); // Scene

    var canvas = document.getElementById("canvas"); // Canvas
    var createObject = new CreateObject(); // Contains functions to create objects
    var createLight = new CreateLight(); // Contains functions to create light

    // Camera is positioned towards -z axis
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1e7);   // Set Camera Perspective
    camera.position.set(0,100,200);  // Set Camera Position towards -z axis

    // Controls for FlyControls
    controls = new THREE.FlyControls( camera ); // Creates Controls
    controls.movementSpeed = 50; // WASD speed
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
    // Start of Grass testing


    var geometry = new THREE.PlaneBufferGeometry( 300, 300 );
    var texture2 = new THREE.CanvasTexture( generateTexture() );
    for ( var i = 0; i < 10; i ++ ) {
        var material = new THREE.MeshBasicMaterial( {
            color: new THREE.Color().setHSL( 0.3, 0.75, ( i / 15 ) * 0.4 + 0.1 ),
            map: texture2,
            depthTest: false,
            depthWrite: false,
            transparent: true
        } );

        var grassMesh = new THREE.Mesh( geometry, material );
        grassMesh.position.y = i * 0.1;
        grassMesh.rotation.x = - Math.PI / 2;

        grassGroup.add( grassMesh );
    }
    scene.add(grassGroup);
    scene.children.reverse();

    function generateTexture() {

        var canvas = document.createElement( 'canvas' );
        canvas.width = 2048;
        canvas.height = 2048;

        var context = canvas.getContext( '2d' );

        for ( var i = 0; i < 100000; i ++ ) {

            context.fillStyle = 'hsl(0,0%,' + ( Math.random() * 50 + 50 ) + '%)';
            context.beginPath();
            context.arc( Math.random() * canvas.width, Math.random() * canvas.height, Math.random() + 0.15, 0, Math.PI * 2, true );
            context.fill();

        }

        context.globalAlpha = 0.075;
        context.globalCompositeOperation = 'lighter';

        return canvas;
    }


    // End of Grass testing
    //-----------------------------------------------------------------------------------------------------------------

    var lightPoint = createLight.directLight(); // Create Light
    var ambientLight = createLight.ambientLight();  // Create atmospheric white light
    ambientLight.position.set(1500, 3000, -2000);


    var grid = new THREE.GridHelper(20000,100); // Create Grid
    var skybox = createObject.skyBox("resources/skybox3/", "cube", "tCube", 50000, 50000, 50000)    // Create Skybox
    var ground = createObject.heightMap("resources/texture_snow.jpg", "heightmap", 300, 20, 300, 50, 0, -150)    // Create Heightmap Ground

    scene.add(grid);
    scene.add(skybox);
    scene.add(ground);
    scene.add(ambientLight);
    scene.add(lightPoint);

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

        var time = Date.now() / 6000;

        for ( var i = 0, l = grassGroup.children.length; i < l; i ++ ) {
            var Posmesh = grassGroup.children[ i ];
            Posmesh.position.x = 50 + Math.sin( time * 4 ) * i * i * 0.005;
            Posmesh.position.z = 150 + Math.cos( time * 6 ) * i * i * 0.005;
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

