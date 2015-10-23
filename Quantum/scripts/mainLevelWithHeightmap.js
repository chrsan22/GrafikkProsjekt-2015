    var width = window.innerWidth;  // Sets Width
    var height = window.innerHeight;    // Sets Height
    var aspect = width/height;  // Sets Aspect Ratio
    var camera, controls, scene, renderer;  // Creates Camera, Controls, Scene and Renderer
    var clock = new THREE.Clock();  //Creates Clock
    var mirrorSphere, mirrorSphereCamera; // for mirror material


var init = function() {

    scene = new THREE.Scene(); // Scene
    scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );

    var canvas = document.getElementById("canvas"); // Canvas
    var createObject = new CreateObject(); // Contains functions to create objects
    var createLight = new CreateLight(); // Contains functions to create light
    var heightMapFncs = new HeightMapFunctions(); // Contains functions used in the heightmap

    // Camera is positioned towards -z axis
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1e7);   // Set Camera Perspective
    camera.position.set(0,10000,20000);  // Set Camera Position towards -z axis

    // Controls for FlyControls
    controls = new THREE.FlyControls( camera ); // Creates Controls
    controls.movementSpeed = 7000; // WASD speed
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

    // Create Skybox
    var r = "resources/skybox3/";
    var urls = [ r + "posx.jpg", r + "negx.jpg",
                 r + "posy.jpg", r + "negy.jpg",
                 r + "posz.jpg", r + "negz.jpg" ];

    var textureCube = THREE.ImageUtils.loadTextureCube( urls  );
    textureCube.format = THREE.RGBFormat;

    // Skybox
    var shader = THREE.ShaderLib["cube"];
    shader.uniforms["tCube"].value = textureCube;
    var skyMat = new THREE.ShaderMaterial({
        fragmentShader : shader.fragmentShader,
        vertexShader   : shader.vertexShader,
        uniforms       : shader.uniforms,
        depthWrite     : false,
        side           : THREE.BackSide
    });

    var skybox = new THREE.Mesh( new THREE.BoxGeometry( 50000, 50000, 50000 ), skyMat );

    // Skybox End
    // ----------------------------------------------------------------------------------------------------------------
    // Code relating to Height Map

    var terrainData, worldWidth, worldDepth, terrainTexture, texture, ground;
    var heightMapImage = document.getElementById('heightmap');  // Actual Heightmap
    terrainData = heightMapFncs.getPixelValues(heightMapImage, 'r');
    worldWidth = heightMapImage.width;
    worldDepth = heightMapImage.height;

    // Not required to use the generated texture
    terrainTexture = new THREE.CanvasTexture( heightMapFncs.generateTexture( terrainData, worldWidth, worldDepth ) );
    terrainTexture.wrapS = THREE.ClampToEdgeWrapping;
    terrainTexture.wrapT = THREE.ClampToEdgeWrapping;
    terrainTexture.castShadow = true;
    terrainTexture.receiveShadow = true;

    var heightMapGeometry = new HeightMapBufferGeometry(terrainData, worldWidth, worldDepth);   // Generate terrain geometry and mesh
    heightMapGeometry.scale(20000, 2000, 20000);    // Scale Geometry

    texture = THREE.ImageUtils.loadTexture("resources/texture_snow.jpg");   // Heightmap Texture
    ground = new HeightMapMesh( heightMapGeometry, new THREE.MeshPhongMaterial( { map: terrainTexture, map: texture } ) );
    ground.name = "terrain";

    // End of code relating to Height Map
    // ----------------------------------------------------------------------------------------------------------------
    // Start of Grass testing
/*

    var geometry = new THREE.PlaneBufferGeometry( 100, 100 );

    var texture2 = new THREE.CanvasTexture( generateTexture() );

    for ( var i = 0; i < 15; i ++ ) {

        var material = new THREE.MeshBasicMaterial( {
            color: new THREE.Color().setHSL( 0.3, 0.75, ( i / 15 ) * 0.4 + 0.1 ),
            map: texture2,
            depthTest: false,
            depthWrite: false,
            transparent: true
        } );

        var mesh = new THREE.Mesh( geometry, material );

        mesh.position.y = - i * 0.25;
        mesh.rotation.x = - Math.PI / 2;

        scene.add( mesh );
        mesh.position.x = -1000;
    }


    scene.children.reverse();

    function generateTexture() {

        var canvas = document.createElement( 'canvas' );
        canvas.width = 512;
        canvas.height = 512;

        var context = canvas.getContext( '2d' );

        for ( var i = 0; i < 20000; i ++ ) {

            context.fillStyle = 'hsl(0,0%,' + ( Math.random() * 50 + 50 ) + '%)';
            context.beginPath();
            context.arc( Math.random() * canvas.width, Math.random() * canvas.height, Math.random() + 0.15, 0, Math.PI * 2, true );
            context.fill();

        }

        context.globalAlpha = 0.075;
        context.globalCompositeOperation = 'lighter';

        return canvas;

    }

*/
    // End of Grass testing
    //-----------------------------------------------------------------------------------------------------------------

    var groundOrbit = new THREE.Object3D(); // Set sun orbit around ground
    var lightPoint = createLight.directLight(); // Create Light
    var ambientLight = createLight.ambientLight();  // Create atmospheric white light
    ambientLight.position.set(1500, 3000, -2000);

    // Grid to see where thing is placed, remove at end of project
    var grid = new THREE.GridHelper(20000,100);
    scene.add(grid);
    grid.position.set(0,100,0);

    // Reflection sphere

    var sphereGeom =  new THREE.SphereGeometry( 500, 32, 32 ); // radius, segmentsWidth, segmentsHeight
    mirrorSphereCamera = new THREE.CubeCamera( 0.2, 25000, 512 );
    mirrorSphereCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
    scene.add( mirrorSphereCamera );
    var mirrorSphereMaterial = new THREE.MeshBasicMaterial( { envMap: mirrorSphereCamera.renderTarget } );
    mirrorSphere = new THREE.Mesh( sphereGeom, mirrorSphereMaterial );
    mirrorSphere.position.set(75,5000,0);
    mirrorSphereCamera.position = mirrorSphere.position;

    // LIGHT
    var sphereLight = new THREE.PointLight(0xffffff);
    sphereLight.position.set(0,4800,0);

    scene.add(sphereLight);


    scene.add(mirrorSphere);
    scene.add(skybox);
    scene.add(ground);
    scene.add(ambientLight);
    scene.add(lightPoint);
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

        var time = Date.now() / 6000;

        for ( var i = 0, l = scene.children.length; i < l; i ++ ) {

            var mesh = scene.children[ i ];
            mesh.position.x = Math.sin( time * 4 ) * i * i * 0.005;
            mesh.position.z = Math.cos( time * 6 ) * i * i * 0.005;

        }
        mirrorSphere.visible = false;
        mirrorSphereCamera.updateCubeMap( renderer, scene );
        mirrorSphere.visible = true;
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

