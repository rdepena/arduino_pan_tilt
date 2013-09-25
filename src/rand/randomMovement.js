/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
var randomMovement = function () {
	"use strict";

	var my = {};

	var loopActive = false;
	var subscribedFunctions = [];
	
	var currentPossition = {
		x : 0,
		y : 0,
		z : 0
	};

	var getRandomArbitrary = function (min, max) {
		return Math.random() * (max - min) + min;
	};

	var generateRandomFrame = function () {
		currentPossition.x += getRandomArbitrary(0,10);
		currentPossition.y = getRandomArbitrary(0,10);
		currentPossition.z = getRandomArbitrary(0,10);

		return currentPossition;
	};

	var randomFrame = function () {
		for(var i = 0; i < subscribedFunctions.length; i++) {
			subscribedFunctions[i](currentPossition);
		}
	};
	var movementLoop = function () {
		if(loopActive) {
			randomFrame();
		}
		setTimeout(movementLoop, 1000);
	};

	my.onFrame = function (callback) {
		subscribedFunctions = callback;
	};

	my.startRandomness = function () {
		loopActive = true;
	};

	my.stopRandomness = function () {
		loopActive = false;
	};

};

module.exports = randomMovement;