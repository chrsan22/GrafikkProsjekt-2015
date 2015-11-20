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
        side: THREE.DoubleSide,
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
        transparent: true,
        depthWrite: false,
        depthTest: true
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

CreateObject.prototype.fallingSnowRender = function (snowGroup, posY) {
    for(var i = 0; i < snowGroup.children.length; i++) {
        var particle = snowGroup.children[i];
        if(particle.position.y <= 1) {
            particle.position.y = posY;
            particle.velocity = -(Math.random() * 0.6) - 0.1; // Sets new random velocity rate
        }else {
            particle.position.y = particle.position.y + particle.velocity; // Continues down with the same velocity rate
        }
    }
}


CreateObject.prototype.tieSquadronType1 = function(posX, posY, posZ, speed, rotation,callback){
    var tieLoaderMTL = new THREE.OBJMTLLoader();
    tieLoaderMTL.load("resources/objects/starwars-tie-fighter.obj", "resources/objects/starwars-tie-fighter.mtl", function (object) {
        var tieMesh = object;
        tieMesh.name = "tieMesh";
        tieMesh.castShadow = true;
        var tieMesh2 = tieMesh.clone();
        var tieMesh3 = tieMesh.clone();
        var tieMesh4 = tieMesh.clone();

        var tieSquadron = new THREE.Object3D();

        tieSquadron.add(tieMesh);
        tieSquadron.add(tieMesh2);
        tieSquadron.add(tieMesh3);
        tieSquadron.add(tieMesh4);

        tieSquadron.position.x = posX;
        tieSquadron.position.z = posZ;
        tieSquadron.position.y = posY;
        tieSquadron.forwardSpeed = speed;
        tieSquadron.rotation.y = rotation;

        tieMesh.position.set(0, 10, 0);
        tieMesh2.position.set(0, -7, -2);
        tieMesh3.position.set(12, 0, 1);
        tieMesh4.position.set(-10, 0, -1);

        var directionX = Math.random()* 1.3 + 0.7;
        var directionZ = Math.random()* 1.3 + 0.7;

        tieSquadron.directionX = directionX;
        tieSquadron.directionZ = directionZ;

        callback(tieSquadron);
    });
}

    CreateObject.prototype.tieSquadronType2 = function(posX, posY, posZ, speed, rotation, callback){
        var tieLoaderMTL = new THREE.OBJMTLLoader();
        tieLoaderMTL.load("resources/objects/starwars-tie-fighter.obj", "resources/objects/starwars-tie-fighter.mtl", function (object) {
            var tieMesh = object;
            tieMesh.name = "tieMesh";
            tieMesh.castShadow = true;

            var tieMesh2 = tieMesh.clone();
            var tieMesh3 = tieMesh.clone();

            var tieSquadron = new THREE.Object3D();

            tieSquadron.add(tieMesh);
            tieSquadron.add(tieMesh2);
            tieSquadron.add(tieMesh3);

            tieSquadron.position.x = posX;
            tieSquadron.position.z = posZ;
            tieSquadron.position.y = posY;

            tieMesh.position.set(0, 10, 0);
            tieMesh2.position.set(0, -7, -2);
            tieMesh3.position.set(12, 0, 1);

            tieSquadron.forwardSpeed = speed;
            tieSquadron.rotation.y = rotation;

            var directionX = Math.random()* 1.3 + 0.7;
            var directionZ = Math.random()* 1.3 + 0.7;

            tieSquadron.directionX = directionX;
            tieSquadron.directionZ = directionZ;

            callback(tieSquadron);
        });
    }

CreateObject.prototype.tieSquadronRendering = function(){
    var length = tieForce.length;

   for(var i = 0; i<=length; i++) {
        if (tieForce[i].position.z > 2201 || tieForce[i].position.x > 2201) {
            tieForce[i].position.z = -2100;
            tieForce[i].position.x = -2100;
        } else {
            tieForce[i].position.z += tieForce[i].forwardSpeed*tieForce[i].directionZ;
            tieForce[i].position.x += tieForce[i].forwardSpeed*tieForce[i].directionX;
        }
    }

}

CreateObject.prototype.clouds = function() {
    var geometryCloud, materialCloud, textureCloud;

    geometryCloud = new THREE.Geometry();
    textureCloud = THREE.ImageUtils.loadTexture('resources/cloud10.png', null, null);
    textureCloud.magFilter = THREE.LinearMipMapLinearFilter;
    textureCloud.minFilter = THREE.LinearMipMapLinearFilter;

    var fog = new THREE.Fog(0x4584b4, -100, 3000);

    materialCloud = new THREE.ShaderMaterial({

        uniforms: {

            "map": {type: "t", value: textureCloud},
            "fogColor": {type: "c", value: fog.color},
            "fogNear": {type: "f", value: fog.near},
            "fogFar": {type: "f", value: fog.far},
        },
        vertexShader: document.getElementById('vs').textContent,
        fragmentShader: document.getElementById('fs').textContent,
        depthWrite: false,
        depthTest: true,
        transparent: true

    });

    for (var i = 0; i < 2000; i++) {
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(64, 64), materialCloud);
        plane.position.x = Math.random() * 4000 - 2000;
        plane.position.y = Math.random() * 300 + 285;
        plane.position.z = Math.random() * 4000 - 2000;
        plane.rotation.z = Math.random() * Math.PI;
        plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

        THREE.GeometryUtils.merge(geometryCloud, plane);
        cloudGroup.add(plane);
    }
    return  cloudGroup;
}
    /*
    if (tieSquadron.position.z > 2201) {
        tieSquadron.position.z = -2100;
        tieSquadron.position.x = -2100;
    }else{
        tieSquadron.position.z += tieSquadron.forwardSpeed;
        tieSquadron.position.x += tieSquadron.forwardSpeed;
    }

    if (tieSquadron2.position.z > 2201) {
        tieSquadron2.position.z = -2100;
        tieSquadron2.position.x = -2100;
    }else{
        tieSquadron2.position.z += tieSquadron.forwardSpeed*1.1;
        tieSquadron2.position.x += tieSquadron.forwardSpeed;
    }
    if (tieSquadron3.position.z > 2201) {
        tieSquadron3.position.z = -2100;
        tieSquadron3.position.x = -2100;
    }else{
        tieSquadron3.position.z += tieSquadron.forwardSpeed*0.9;
        tieSquadron3.position.x += tieSquadron.forwardSpeed;
    }

    if (tieSquadron4.position.z > 2201) {
        tieSquadron4.position.z = -2100;
        tieSquadron4.position.x = -2100;
    }else{
        tieSquadron4.position.z += tieSquadron.forwardSpeed*1.1;
        tieSquadron4.position.x += tieSquadron.forwardSpeed;
    }

    if (tieSquadron5.position.z > 2201) {
        tieSquadron5.position.z = -2100;
        tieSquadron5.position.x = -2100;

    }else{
        tieSquadron5.position.z += tieSquadron.forwardSpeed;
        tieSquadron5.position.x += tieSquadron.forwardSpeed;
    }

    if (tieSquadron6.position.z > 2201) {
        tieSquadron6.position.z = -2100;
        tieSquadron6.position.x = -2100;
    }else{
        tieSquadron6.position.z += tieSquadron.forwardSpeed*0.9;
        tieSquadron6.position.x += tieSquadron.forwardSpeed;
    }

    if (tieSquadron7.position.z > 2201) {
        tieSquadron7.position.z = -2100;
        tieSquadron7.position.x = -2100;
    }else{
        tieSquadron7.position.z += tieSquadron.forwardSpeed;
        tieSquadron7.position.x += tieSquadron.forwardSpeed*0.9;
    }

    if (tieSquadron8.position.z > 2201) {
        tieSquadron8.position.z = -2100;
        tieSquadron8.position.x = -2100;

    }else{
        tieSquadron8.position.z += tieSquadron.forwardSpeed*1.1;
        tieSquadron8.position.x += tieSquadron.forwardSpeed;
    }
    if (tieSquadron9.position.z > 2201) {
        tieSquadron9.position.z = -2100;
        tieSquadron9.position.x = -2100;
    }else{
        tieSquadron9.position.z += tieSquadron.forwardSpeed*0.9;
        tieSquadron9.position.x += tieSquadron.forwardSpeed;
    }

    if (tieSquadron10.position.z > 2201) {
        tieSquadron10.position.z = -2100;
        tieSquadron10.position.x = -2100;
    }else{
        tieSquadron10.position.z += tieSquadron.forwardSpeed;
        tieSquadron10.position.x += tieSquadron.forwardSpeed*1.1;
    }
    if (tieSquadron11.position.z > 2201) {
        tieSquadron11.position.z = -2100;
        tieSquadron11.position.x = -2100;
    }else{
        tieSquadron11.position.z += tieSquadron.forwardSpeed;
        tieSquadron11.position.x += tieSquadron.forwardSpeed*1.1;
    }
    if (tieSquadron12.position.z > 2201) {
        tieSquadron12.position.z = -2100;
        tieSquadron12.position.x = -2100;
    }else{
        tieSquadron12.position.z += tieSquadron.forwardSpeed;
        tieSquadron12.position.x += tieSquadron.forwardSpeed*1.1;
    }
    if (tieSquadron13.position.z > 2201) {
        tieSquadron13.position.z = -2100;
        tieSquadron13.position.x = -2100;
    }else{
        tieSquadron13.position.z += tieSquadron.forwardSpeed*1.2;
        tieSquadron13.position.x += tieSquadron.forwardSpeed;
    }
    if (tieSquadron14.position.z > 2201) {
        tieSquadron14.position.z = -2100;
        tieSquadron14.position.x = -2100;
    }else{
        tieSquadron14.position.z += tieSquadron.forwardSpeed;
        tieSquadron14.position.x += tieSquadron.forwardSpeed*1.2;
    }
    if (tieSquadron15.position.z > 2201) {
        tieSquadron15.position.z = -2100;
        tieSquadron15.position.x = -2100;
    }else{
        tieSquadron15.position.z += tieSquadron.forwardSpeed;
        tieSquadron15.position.x += tieSquadron.forwardSpeed*1.3;
    }
    */
