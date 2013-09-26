/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
(function () {
	"use strict";
	var Leap = require("leapjs"),
		controller = new Leap.Controller({enableGestures: true}	),
		gestures = require("./leap/gestures.js")(),
		components = require("./arduino/components.js")(),
		randomPointables = require("./rand/randomPointables.js")(),
		isLaserOn = false,
		isRandomMode = false;

	//we want to be able to toggle the laser.
	var toggleLaser = function (laser) {
		if(isLaserOn) {
			laser.off();
		} else {
			laser.on();
		}
		isLaserOn = !isLaserOn;
	};

	var toggleRandomMode = function () {
		isRandomMode = !isRandomMode;
	};


	//when the board is ready we will listen to the leapmotion controller:
	components.board.on("ready", function () {
		//control the frames per second.
		var i = 0,
			processedFrame = null,
			direction = null;

		var previousPosition = {
			x : 60,
			y : 60,
			z : 60
		};

		//declare gestures used:
		var twoFingerCircle = {
			callback: function () {
				toggleLaser(components.laser);
			},
			numberOfFingers: 2
		};
		var fourFingerCircle = {
			callback: function () {
				toggleRandomMode();
			},
			numberOfFingers: 4

		};
		var fiveFingerSwipe = {
			callback: function () {
				isRandomMode = false;
			},
			numberOfFingers: 5
		};

		//react to the two finger circle event.
		gestures.on('circle', twoFingerCircle);
		gestures.on('circle', fourFingerCircle);
		gestures.on('swipe', fiveFingerSwipe);

		//react to each frame of the leap motion controller.
		controller.on('frame', function (frame) {
			i += 1;
			var frameMod = isRandomMode ? 60 : 4;
			//we only want to capture i % x frames per second.
			if (i % frameMod === 0) {
				//each frame needs processing for gestures.
				processedFrame = gestures.processFrame(frame);

				//we only want to react to valid frames.
				if (isRandomMode || processedFrame.isFrameValid) {
					direction = isRandomMode ? 
						randomPointables.generateRandomFrame(previousPosition).pointDirection 
						:  processedFrame.pointDirection;

					components.servoX.move(direction.x);
					components.servoY.move(direction.y);
					previousPosition = direction;
				}
			}
		});
		//connect to the leap motion controller service.
		controller.connect();
	});
}());
