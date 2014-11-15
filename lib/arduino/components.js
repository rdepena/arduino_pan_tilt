/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
//create an interface to communicate with the arduino board.
var components = function(johnnyFive) {
    "use strict";

    var my = {};

    //internal variables:
    var isLaserOn = false;

    //configure our board.
    my.board = johnnyFive.Board({
        debug: true
    });

    //we set up the components once the board is ready.
    my.board.on("ready", function() {
        my.servoX = new johnnyFive.Servo({
            pin: 9
        });
        my.servoY = new johnnyFive.Servo({
            pin: 10
        });
        //digital outs.
        my.laser = johnnyFive.Led(7);
        my.redLed = johnnyFive.Led(4);
        my.blueLed = johnnyFive.Led(3);
    });

    //we want to be able to toggle the laser.
    my.toggleLaser = function() {
        if (isLaserOn) {
            my.laser.off();
            my.redLed.off();
        } else {
            my.laser.on();
            my.redLed.on();
        }
        isLaserOn = !isLaserOn;
    };

    return my;

};
module.exports = components;
