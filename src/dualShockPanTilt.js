/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
(function () {
	"use strict";

	var johnny = require("johnny-five"),
		dualShock3 = require('dualshock-controller'),
		components = require("./arduino/components.js")(johnny);

	dualShock3.on('left:move', function(data) {
			components.servoY.move(data.y -125);
			components.servoX.move(data.x - 60);
		});
	dualShock3.on('error', function (error) {
		console.log(error);
	});

	dualShock3.on('connect', function () {
		console.log("connected");
	})

	//when jhonny is alive go.
	components.board.on("ready", function () {
		dualShock3.connect();
	});
	
}());