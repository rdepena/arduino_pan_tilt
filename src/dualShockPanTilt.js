/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
(function () {
	"use strict";

	var johnny = require("johnny-five"),
    	dualshock = require("./dualShock/dualshock.js")(),
		components = require("./arduino/components.js")(johnny);

	var processFrame = function (frame) {
		console.log(frame);
		//compensate for servo possition. TODO: clean this up.
		components.servoY.move(frame.leftY -125);
		components.servoX.move(frame.leftX - 60);
	};
	var readLoop = function () {
		dualshock.read(processFrame);
		//getting errors with anything lower than 50.
		setTimeout(readLoop, 50);
	};

	components.board.on("ready", function () {
		readLoop();
	});
	
}());