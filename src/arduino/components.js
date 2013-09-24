/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
var components = function () {
	"use strict";

	var my = {};
	//TODO:resolve this via injection.
	var five = require("johnny-five");

	my.board = five.Board({
		debug : true
	});

	my.servoX = null;
	my.servoY = null;
	my.laser =  null;

	//we set up the components once the board is ready.
	my.board.on("ready", function () {
		my.servoX = new five.Servo({
			pin : 9
		});
		my.servoY =	new five.Servo({
			pin : 10
		});

		my.laser = five.Led(7);
	});

	return my;

};
module.exports = components;