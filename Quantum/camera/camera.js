"use strict";

/**
 * Simple camera that listens to the key board and mouse.
 * @param keyboardState an THREEx.keyboardState object, monitors keyboard input
 * @constructor
 */
function Camera(keyboardState) {
    this.keyboardState = keyboardState;

    this.position = vec3(0,0,0);
    this.forwardDirection = vec3(0,0,1);
    this.upDirection = vec3(0,-1,0);
    this.leftDirection = vec3(-1,0,0);

    this.viewMatrix = lookAt(this.position, add(this.position, this.forwardDirection), this.upDirection);

    // The speed the camera moves with when position is changed.
    this.speed = 0.20;

    // mouseSensitivity is a way of controlling how sensitive the system is when moving mouse.
    this.mouseSensitivity = 0.9;

    // Properties mostly concerned with mouse movement
    this.mouse = {
        initialized: false,

        // Previous mouse position
        lastX: -1,
        lastY: -1,

        // The difference from previous to current position
        deltaX: 0,
        deltaY: 0,

        // Have we used the deltaX and deltaY?
        consumedUpdate: false
    };

    document.addEventListener('mousemove', this._onMouseMove.bind(this));
}

/**
 * Moves the current position and adjusts orientation. Called in the main loop.
 * @param timestampMillis {Number} number of milliseconds since last draw
 */
Camera.prototype.update = function(timestampMillis) {

    this._updatePosition(timestampMillis);
    this._updateOrientation(timestampMillis);

    // Create the view matrix
    this.viewMatrix = lookAt(this.position, add(this.position, this.forwardDirection), this.upDirection);
};

/**
 * Updates the current position
 * @param timestampMillis
 * @private
 */
Camera.prototype._updatePosition = function(timestampMillis) {
    var seconds = timestampMillis / 1000;


    //  How far should we move in the forward direction?
    var forwardStep = scale(this.speed, this.forwardDirection);
    var leftStep = scale(this.speed, this.leftDirection);
    var upStep = scale(this.speed, this.upDirection);

    if (this.keyboardState.pressed('a')) {
        this.position = add(this.position, negate(leftStep));
    }

    if (this.keyboardState.pressed('d')) {
        this.position = add(this.position, leftStep);
    }

    // Handle keyboard inputs, only forward is handled for now
    if (this.keyboardState.pressed('w')) {
        this.position = add(this.position, forwardStep);
    }

    if (this.keyboardState.pressed('s')) {
        this.position = add(this.position, negate(forwardStep));
    }

    if (this.keyboardState.pressed('space')) {
        this.position = add(this.position, upStep);
    }

    if (this.keyboardState.pressed('ctrl')) {
        this.position = add(this.position, negate(upStep));
    }

};

/**
 * Updates orientations (the forwardDirection and upDirection)
 * @param timestampMillis
 * @private
 */
Camera.prototype._updateOrientation = function(timestampMillis) {
    // Lets handle the mouse.deltaX and mouse.deltaY as degrees, use mouseSensitivity
    // as a way of controlling how much the system should react to orientation change.
    var rotations = mat4();

    var yawAngle = 0;
    var rotAngle = 0;
    var pitchAngle = 0;

    if (!this.mouse.consumedUpdate) {
        yawAngle = -1 * this.mouseSensitivity * this.mouse.deltaX;
        pitchAngle = -1 * this.mouseSensitivity * this.mouse.deltaY;
        this.mouse.consumedUpdate = true;
    }
    // Rotates around the Z axis, using the q and e keys.
    if (this.keyboardState.pressed('q')) {
        rotAngle = -1.5;
    } else if (this.keyboardState.pressed('e')){
        rotAngle = 1.5;
    }

    // Rotates around the Y axis, using the left/right keys.
    if (this.keyboardState.pressed('right')) {
        yawAngle = -1.5;
    }     else if (this.keyboardState.pressed('left')) {
        yawAngle = 1.5;
    }

    if (this.keyboardState.pressed('down')) {
        pitchAngle = -1;
    }   else if(this.keyboardState.pressed('up')) {
        pitchAngle = 1;
    }

    // Rotate so and so degrees about the upDirection
    var yawRotation = rotate(yawAngle, this.upDirection);
    var pitchRotation = rotate(pitchAngle, this.leftDirection);
    var rollRotation = rotate(rotAngle, this.forwardDirection);

    rotations = mult(rotations, yawRotation);
    rotations = mult(rotations, rollRotation);
    rotations = mult(rotations, pitchRotation);

    // Finally update the forward and up direction
    this.setForwardDirection(vec3(
        dot(vec3(rotations[0]), this.forwardDirection),
        dot(vec3(rotations[1]), this.forwardDirection),
        dot(vec3(rotations[2]), this.forwardDirection)
    ));

    this.setRightDirection(vec3(
        dot(vec3(rotations[0]), this.leftDirection),
        dot(vec3(rotations[1]), this.leftDirection),
        dot(vec3(rotations[2]), this.leftDirection)
    ));

    this.setUpDirection(vec3(
        dot(vec3(rotations[0]), this.upDirection),
        dot(vec3(rotations[1]), this.upDirection),
        dot(vec3(rotations[2]), this.upDirection)
    ));

};

/**
 * Set the current position
 * @param position {(vec3|vec4)} a an array with at lest 3 numeric elements
 */
Camera.prototype.setPosition = function(position) {
    this.position = vec3(position);
};

/**
 * Set the current forward direction the camera is supposed to move
 * @param {(vec3|vec4)} forwardDirection
 */
Camera.prototype.setForwardDirection = function(forwardDirection) {
    this.forwardDirection = normalize(vec3(forwardDirection));
};

Camera.prototype.setRightDirection = function(leftDirection) {
    this.leftDirection = normalize(vec3(leftDirection));
};

Camera.prototype.setUpDirection = function(upDirection) {
    this.upDirection = normalize(vec3(upDirection));
};

/**
 * Set the current up direction of the camera.
 * @param {(vec3|vec4)} upDirection
 */
Camera.prototype.setUpDirection = function(upDirection) {
    this.upDirection = normalize(vec3(upDirection));
};

/**
 * Get the current view matrix-
 * @returns {mat4} a 4x4 view matrix
 */
Camera.prototype.getViewMatrix = function() {
    return this.viewMatrix;
};

/**
 * Handles updates of mouse positions. only called when mouse actually moves.
 * @param event
 * @private
 */
Camera.prototype._onMouseMove = function(event) {
    var newX = event.clientX;
    var newY = event.clientY;

    if (this.mouse.initialized) {
        this.mouse.deltaX = newX - this.mouse.lastX;
        this.mouse.deltaY = newY - this.mouse.lastY;
    } else {
        this.mouse.initialized = true;
    }

    this.mouse.lastX = newX;
    this.mouse.lastY = newY;

    // This is a new update
    this.mouse.consumedUpdate = false;
};