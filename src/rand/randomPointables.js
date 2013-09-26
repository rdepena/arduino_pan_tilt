/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
var randomPointables = function () {
	"use strict";

	var my = {};

	var bounds = {
		top: 180, 
		low: 100
	};

	var getRandomArbitrary = function (min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	};

	my.generateRandomFrame = function (currentPossition) {
		currentPossition.x = getRandomArbitrary(bounds.low, bounds.top);

		return {
			isFrameValid : true,
			pointDirection : currentPossition
		};
	};
	
	return my;
};

module.exports = randomPointables;