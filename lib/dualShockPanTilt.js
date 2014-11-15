"use strict";

var johnny = require("johnny-five");
var dualShock = require('dualshock-controller');
var components = require("./arduino/components.js")(johnny);
var isControllerMotion = false;
var controller = dualShock({
    //config: "dualshock4-generic-driver"
    accelerometerSmoothing: true,
    analogStickSmoothing: false
});
controller.connect();
components.board.on("ready", function() {
    controller.on('left:move', function(data) {
        //servos move from 0 to 180
        //data comes from 0 to 255 where 125 is the center.
        if (!isControllerMotion) {
            components.servoY.to(data.y * 0.72);
            components.servoX.to(180 - (data.x * 0.72));
        }
    });
    controller.on('error', function(error) {
        console.log(error);
    });

    controller.on('r2:press', function() {
        components.laser.on();
    });

    controller.on("r2:release", function() {
        components.laser.off();
    });

    controller.on("r1:press", function() {
        components.toggleLaser();
    });

    controller.on('psxButton:press', function() {
        isControllerMotion = !isControllerMotion;
        if (isControllerMotion) {
            components.blueLed.on();
        } else {
            components.blueLed.off();
        }
    });

    controller.on('rightLeft:motion', function(data) {
        if (isControllerMotion) {
            components.servoX.to(90 - (data.value * 0.75));
        }
    });

    controller.on('forwardBackward:motion', function(data) {
        if (isControllerMotion) {
            components.servoY.to(90 + (data.value * 0.75));
        }
    });
});
