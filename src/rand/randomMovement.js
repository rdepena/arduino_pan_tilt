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
		var x = getRandomArbitrary(0,10),
			y = getRandomArbitrary(0,10),
			z = getRandomArbitrary(0,10);
		if (x % 2 === 0) {
			currentPossition.x += x;
			currentPossition.y += y;
			currentPossition.z += z;
		}
		else {
			currentPossition.x -= x;
			currentPossition.y -= y;
			currentPossition.z -= z;			
		}

		return currentPossition;
	};

	var movementLoop = function () {
		if(loopActive) {
			for(var i = 0; i < subscribedFunctions.length; i++) {
				subscribedFunctions[i](generateRandomFrame());
			}
		}
		setTimeout(movementLoop, 1000);
	};

	my.onFrame = function (callback) {
		subscribedFunctions.push(callback);
	};

	my.startRandomness = function () {
		loopActive = true;
	};

	my.stopRandomness = function () {
		loopActive = false;
	};
	
	return my;
};

module.exports = randomMovement;