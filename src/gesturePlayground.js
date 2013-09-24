/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
(function () {
	"use strict";
	var Leap = require("leapjs"),
		controller = new Leap.Controller({enableGestures: true}),
		gestures = require("./leap/gestures.js")();

	//control the frames per second.
	var i = 0,
		processedFrame = null,
		direction = null;

	gestures.on('circle', 2, function () {
		console.log('this happened');
	});
	controller.on('frame', function (frame) {
		i += 1;
		//we only want to capture i % x frames per second.
		if (i % 60 === 0) {
			processedFrame = gestures.processFrame(frame);
			if (processedFrame.isFrameValid) {
				direction = processedFrame.pointDirection;
				console.log(direction.x);
				console.log(direction.y);
			}
		}
	});
	controller.connect();
}());
