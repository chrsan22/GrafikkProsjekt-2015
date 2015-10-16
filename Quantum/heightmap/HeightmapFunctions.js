function HeightMapFunctions() {

}

HeightMapFunctions.prototype.getPixelValues = function(domImage, pixelComponents) {
    "use strict";
    var canvas = document.createElement('canvas');
    canvas.width = domImage.width;
    canvas.height = domImage.height;

    var context2d = canvas.getContext('2d');
    context2d.drawImage(domImage, 0, 0, domImage.width, domImage.height);

    var imageData = context2d.getImageData(0, 0, domImage.width, domImage.height);

    var componentExtractor = [];

    if (pixelComponents === undefined) {
        pixelComponents = 'rgba';
    }

    if (pixelComponents === 'r') { // Could extend this to other kinds of component extractors (eg. 'g', 'b','rb')
        componentExtractor = [0];
    } else if (pixelComponents === 'rg') {
        componentExtractor = [0,1];
    } else if (pixelComponents === 'rgb') {
        componentExtractor = [0,1,2];
    }else if (pixelComponents === 'rgba') {
        componentExtractor = [0,1,2,3];
        // return imageData.data;
    } else {
        console.error("unknown color component type");
        return [];
    }

    var imageSize = imageData.height * imageData.width;
    console.log(imageSize, imageData.data.length, imageData.data.length/4);
    var numComponents = componentExtractor.length;

    var pixelData = new Uint8ClampedArray(imageSize * numComponents);

    for (var i= 0, i4 = 0; i < imageSize; i++, i4 += 4) {
        for (var componentIdx = 0; componentIdx < numComponents; componentIdx++) {
            pixelData[i*numComponents + componentIdx] = imageData.data[i4 + componentExtractor[componentIdx]];
        }
    }

    return pixelData;
};

HeightMapFunctions.prototype.generateTexture = function( data, width, height ) {

    var canvas, canvasScaled, context, image, imageData,
        level, diff, vector3, sun, shade;

    vector3 = new THREE.Vector3( 0, 0, 0 );

    sun = new THREE.Vector3( 1, 1, 1 );
    sun.normalize();

    canvas = document.createElement( 'canvas' );
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext( '2d' );
    context.fillStyle = '#000';
    context.fillRect( 0, 0, width, height );

    image = context.getImageData( 0, 0, canvas.width, canvas.height );
    imageData = image.data;

    for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {

        vector3.x = data[ j - 2 ] - data[ j + 2 ];
        vector3.y = 2;
        vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
        vector3.normalize();

        shade = vector3.dot( sun );

        imageData[ i ] = ( 96 + shade * 128 ) * ( 0.5 + data[ j ] * 0.007 );
        imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
        imageData[ i + 2 ] = ( shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
    }

    context.putImageData( image, 0, 0 );

    // Scaled 4x

    canvasScaled = document.createElement( 'canvas' );
    canvasScaled.width = width * 4;
    canvasScaled.height = height * 4;

    context = canvasScaled.getContext( '2d' );
    context.scale( 4, 4 );
    context.drawImage( canvas, 0, 0 );

    image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
    imageData = image.data;

    for ( var i = 0, l = imageData.length; i < l; i += 4 ) {

        var v = ~~ ( Math.random() * 5 );

        imageData[ i ] += v;
        imageData[ i + 1 ] += v;
        imageData[ i + 2 ] += v;

    }

    context.putImageData( image, 0, 0 );

    return canvasScaled;

};