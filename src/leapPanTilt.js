/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
(function () {
	"use strict";
	var Leap = require("leapjs"),
		controller = new Leap.Controller({enableGestures: true}	),
		gestures = require("./leap/gestures.js")(),
		components = require("./arduino/components.js")(),
		isLaserOn = false;

	//we want to be able to toggle the laser.
	var toggleLaser = function (laser) {
		if(isLaserOn) {
			laser.off();
		} else {
			laser.on();
		}
		isLaserOn = !isLaserOn;
	};

	//when the board is ready we will listen to the leapmotion controller:
	components.board.on("ready", function () {
		//control the frames per second.
		var i = 0,
			processedFrame = null,
			direction = null;

		//react to the circle event.
		gestures.on('circle', 2, function () {
			toggleLaser(components.laser);
		});

		//react to each frame of the leap motion controller.
		controller.on('frame', function (frame) {
			i += 1;
			//we only want to capture i % x frames per second.
			if (i % 4 === 0) {
				//each frame needs processing for gestures.
				processedFrame = gestures.processFrame(frame);
				//we only want to react to valid frames.
				if (processedFrame.isFrameValid) {
					direction = processedFrame.pointDirection;
					//we add 180 to compensate to the sevo center
					components.servoX.move(direction.x + 120);
					components.servoY.move(direction.y);
				}
				else { 
					console.log("frame not valid.");
				}
			}
		});
		//connect to the leap motion controller service.
		controller.connect();
	});
}());
