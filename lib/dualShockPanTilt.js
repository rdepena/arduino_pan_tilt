/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
(function () {
	"use strict";

	var johnny = require("johnny-five"),
		dualShock = require('dualshock-controller'),
		components = require("./arduino/components.js")(johnny),
		controller = dualShock(
			{
				config: "dualshock4-generic-driver"
			});

	controller.on('left:move', function(data) {
		components.servoY.move(data.y -125);
		components.servoX.move(250 - data.x);
	});
	controller.on('error', function (error) {
		console.log(error);
	});

	controller.on('connect', function () {
		console.log("connected");
	});

	controller.on('r2:pressed', function () {
		components.laser.on();
	});
	controller.on("r2:release", function (){
		components.laser.off();
	});

	//when jhonny is alive go.
	components.board.on("ready", function () {
		console.log("board is ready");
		controller.connect();
	});
	
}());