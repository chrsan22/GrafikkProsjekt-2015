function CreateObject() {
}

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