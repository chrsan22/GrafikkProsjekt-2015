/**
 * Created by Christer on 23/10/15.
 */

function CreateObject() {
}

/*
 Prototype function that creates a Three.JS box
 Returns BoxGeometry Mesh
 */
CreateObject.prototype.boxGeometryColor = function(col, geoX, geoY, geoZ, posX, posY, posZ, giveShadow, getShadow) {
    geometry = new THREE.BoxGeometry(geoX, geoY, geoZ);
    material = new THREE.MeshPhongMaterial({ color: col });
    object = new THREE.Mesh(geometry, material);
    object.castShadow = giveShadow;
    object.receiveShadow = getShadow;
    object.position.set(posX, posY, posZ);
    return object;
};

/*
    Prototype function that creates a Three.JS box
    Returns BoxGeometry Mesh
 */
CreateObject.prototype.boxGeometry = function(tex, geoX, geoY, geoZ, posX, posY, posZ, giveShadow, getShadow) {
    texture = THREE.ImageUtils.loadTexture(tex);
    geometry = new THREE.BoxGeometry(geoX, geoY, geoZ);
    material = new THREE.MeshPhongMaterial({ map: texture });
    object = new THREE.Mesh(geometry, material);
    object.castShadow = giveShadow;
    object.receiveShadow = getShadow;
    object.position.set(posX, posY, posZ);
    return object;
};

/*
 Prototype function that creates a Three.JS sphere
 Returns SphereGeometry Mesh
 */
CreateObject.prototype.sphereGeometry = function(tex, rad, width, height, posX, posY, posZ, giveShadow, getShadow) {
    texture = THREE.ImageUtils.loadTexture(tex);
    texture.flipY = false;
    geometry = new THREE.SphereGeometry(rad, width, height);
    material = new THREE.MeshBasicMaterial({ map: texture});
    object = new THREE.Mesh(geometry, material);
    object.castShadow = giveShadow;
    object.receiveShadow = getShadow;
    object.position.set(posX, posY, posZ);
    return object;
};

/*
 Prototype function that creates a Three.JS plane
 Returns PlaneGeometry Mesh
 */
CreateObject.prototype.planeGeometry = function(tex, geoX, geoY, geoZ, posX, posY, posZ, giveShadow, getShadow) {
    texture = THREE.ImageUtils.loadTexture(tex);
    texture.flipY = false;
    geometry = new THREE.PlaneGeometry(geoX, geoY, geoZ);
    material = new THREE.MeshPhongMaterial({ map: texture});
    object = new THREE.Mesh(geometry, material);
    object.castShadow = giveShadow;
    object.receiveShadow = getShadow;
    object.position.set(posX, posY, posZ);
    return object;
};

CreateObject.prototype.skyBox = function (path, shadeLib, shadeUniform, geoX, geoY, geoZ) {
    var r = path;
    var urls = [ r + "posx.jpg", r + "negx.jpg",
        r + "posy.jpg", r + "negy.jpg",
        r + "posz.jpg", r + "negz.jpg" ];

    var textureCube = THREE.ImageUtils.loadTextureCube( urls  );
    textureCube.format = THREE.RGBFormat;

    var shader = THREE.ShaderLib[shadeLib];
    shader.uniforms[shadeUniform].value = textureCube;
    material = new THREE.ShaderMaterial({
        fragmentShader : shader.fragmentShader,
        vertexShader   : shader.vertexShader,
        uniforms       : shader.uniforms,
        depthWrite     : false,
        side           : THREE.BackSide
    });
    var object = new THREE.Mesh( new THREE.BoxGeometry( geoX, geoY, geoZ ), material );
    return object;
};

CreateObject.prototype.heightMap = function (texture, heightMap, name, scaleX, scaleY, scaleZ, posX, posY, posZ) {
    var heightMapFncs = new HeightMapFunctions(); // Contains functions used in the heightmap
    var terrainData, worldWidth, worldDepth, terrainTexture, texture, ground;
    var heightMapImage = document.getElementById(heightMap);  // Actual Heightmap
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
    heightMapGeometry.scale(scaleX, scaleY, scaleZ);    // Scale Geometry

    texture = THREE.ImageUtils.loadTexture(texture);   // Heightmap Texture
    object = new HeightMapMesh( heightMapGeometry, new THREE.MeshPhongMaterial( { map: terrainTexture, map: texture } ) );
    object.name = name;
    object.position.set(posX, posY, posZ);
    return object;
};

CreateObject.prototype.grass = function () {

};

CreateObject.prototype.createWater = function (lightPoint,posX, posZ) {
    // Load textures
    var waterNormals = new THREE.ImageUtils.loadTexture('resources/heightmaps/waternormals.jpg');
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    // Create the water effect
    water = new THREE.Water(renderer, camera, scene, {
        textureWidth: posX,
        textureHeight: posZ,
        waterNormals: waterNormals,
        alpha: 	1.0,
        sunDirection: lightPoint.position.normalize(),
        waterColor: 0x001e0f,
        betaVersion: 0,
        side: THREE.DoubleSide
    });
    var aMeshMirror = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(posX, posZ, 10, 10),
        water.material
    );
    aMeshMirror.add(water);
    aMeshMirror.rotation.x = - Math.PI * 0.5;

    return aMeshMirror;
}

CreateObject.prototype.fallingSnow = function (particleNr,xPos,xNeg,yPos,yNeg,zPos,zNeg) {
    // create the particle variables
    var particleCount = particleNr;
    var particles = new THREE.Geometry();
    var pMaterial = new THREE.PointsMaterial({
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
        object = new THREE.Points(particles, pMaterial);
        object.position.x = (Math.random() * xPos) - xNeg;
        object.position.y = (Math.random() * yPos) - yNeg;
        object.position.z = (Math.random() * zPos) - zNeg;
        object.velocity = -(Math.random() * 0.5) - 0.1;
        particles.vertices.push(new THREE.Vector3(object.position.x, object.position.y, object.position.z))
        object.sortParticles = true;
        snow.add(object);
    }
    return snow;
};

CreateObject.prototype.fallingSnowRender = function (snowGroup) {
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