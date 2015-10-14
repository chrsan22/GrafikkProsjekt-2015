/**
 * Created by endre on 06.09.15.
 */

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
    this.upDirection = vec3(0,1,0);
    this.leftDirection = vec3(1,0,0);

    this.viewMatrix = lookAt(this.position, add(this.position, this.forwardDirection), this.upDirection);

    // The speed the camera moves with when position is changed.
    this.speed = 0.01;

    // mouseSensitivity is a way of controlling how sensitive the system is when moving mouse.
    this.mouseSensitivity = 0.5;

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
    var forwardStep = scale(this.speed*seconds, this.forwardDirection);
    var leftStep = scale(this.speed*seconds, this.leftDirection);
    var upStep = scale(this.speed*seconds, this.upDirection);

    // TODO: Handle movement along the vertical direction
    // TODO: Handle movement along the horizontal direction

    // Handle keyboard inputs, only forward is handled for now
    if (this.keyboardState.pressed('w')) {
        this.position = add(this.position, forwardStep);
    }

    if (this.keyboardState.pressed('s')) {
        this.position = add(this.position, negate(forwardStep));
    }

    if (this.keyboardState.pressed('left')) {
        this.position = add(this.position, leftStep);
    }

    if (this.keyboardState.pressed('right')) {
        this.position = add(this.position, negate(leftStep));
    }

    if (this.keyboardState.pressed('up')) {
        this.position = add(this.position, upStep);
    }

    if (this.keyboardState.pressed('down')) {
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
    var pitchAngle = 0;
    var rollAngle = 0;

    if (!this.mouse.consumedUpdate) {
        yawAngle = -1 * this.mouseSensitivity * this.mouse.deltaX;
        this.mouse.consumedUpdate = true;
        var yawRotation = rotate(yawAngle, this.upDirection);
        rotations = mult(rotations, yawRotation);
    }

    if (this.keyboardState.pressed('a')) {
        pitchAngle = 1;
        var pitchRotation = rotate(pitchAngle, this.leftDirection);
        rotations = mult(rotations, pitchRotation);
    }

    if (this.keyboardState.pressed('d')) {
        pitchAngle = -1;
        var pitchRotation = rotate(pitchAngle, this.leftDirection);
        rotations = mult(rotations, pitchRotation);
    }

    if (this.keyboardState.pressed('e')) {
        rollAngle = 1;
        var rollRotation = rotate(rollAngle, this.forwardDirection);
        rotations = mult(rotations, rollRotation);
    }

    if (this.keyboardState.pressed('q')) {
        rollAngle = -1;
        var rollRotation = rotate(rollAngle, this.forwardDirection);
        rotations = mult(rotations, rollRotation);
    }


    // Finally update the forward and up direction
    this.setForwardDirection(vec3(
        dot(vec3(rotations[0]), this.forwardDirection),
        dot(vec3(rotations[1]), this.forwardDirection),
        dot(vec3(rotations[2]), this.forwardDirection)
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