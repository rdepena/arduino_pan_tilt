/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
var components = function (johnnyFive) {
	"use strict";

	var my = {};
	
	var isLaserOn = false;
	my.board = johnnyFive.Board({
		debug : true
	});

	//we set up the components once the board is ready.
	my.board.on("ready", function () {
		my.servoX = new johnnyFive.Servo({
			pin : 9
		});
		my.servoY =	new johnnyFive.Servo({
			pin : 10
		});

		my.laser = johnnyFive.Led(7);

		my.redLed = johnnyFive.Led(4);

		my.blueLed = johnnyFive.Led(3);
	});

	//we want to be able to toggle the laser.
	my.toggleLaser = function () {
		if(isLaserOn) {
			my.laser.off();
		} else {
			my.laser.on();
		}
		isLaserOn = !isLaserOn;
	};

	return my;

};
module.exports = components;