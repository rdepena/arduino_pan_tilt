/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
(function () {
	"use strict";
	var Leap = require("leapjs"),
		johnny = require("johnny-five"),
		controller = new Leap.Controller({enableGestures: true}	),
		gestures = require("./leap/gestures.js")(),
		components = require("./arduino/components.js")(johnny),
		frameRecorder = require("./record/frameRecorder.js")(),
		frameModes = {
			recording: 'recording',
			playback: 'playback',
			live: 'live'
		},
		frameMode = frameModes.live,
		recordStartTime = null;

	//internal functions.
	var startRecording = function () {
		components.redLed.on();
		components.blueLed.on();
		setTimeout(function () {
			components.blueLed.off();
			frameMode = frameModes.recording;	
			recordStartTime = Date.now();
		}, 1000);
	};

	var recordFrame = function (frame) {
		frameRecorder.recordFrame(frame);
		if(Date.now() - recordStartTime > 5000) {
			startPlayback();
		}
	};

	var startPlayback = function () {
		frameMode = frameModes.playback;
		components.blueLed.on();
		components.redLed.off();
	};

	var endPlayback = function () {
		frameMode = frameModes.live;
		frameRecorder.wipeBuffer();
		components.blueLed.off();
	};

	//declare gestures used:
	var threeFingerCircle = {
		callback: function () {
			components.toggleLaser(components.laser);
		},
		numberOfFingers: 3
	};

	var fourFingerCircle = {
		callback: function () {
			startRecording();
		},
		numberOfFingers: 4
	};

	var fiveFingerSwipe = {
		callback: function () {
			endPlayback();
		},
		numberOfFingers: 5
	};

	//react to the two finger circle event.
	gestures.on('circle', threeFingerCircle);
	gestures.on('circle', fourFingerCircle);
	gestures.on('swipe', fiveFingerSwipe);

	//when the board is ready we will listen to the leapmotion controller:
	components.board.on("ready", function () {
		//control the frames per second.
		var i = 0,
			processedFrame = null,
			direction = null;

		//react to each frame of the leap motion controller.
		controller.on('frame', function (frame) {
			i += 1;
			//we only want to capture i % x frames per second.
			if (i % 4 === 0) {
				//each frame needs processing for gestures.
				processedFrame = gestures.processFrame(frame);

				//we only want to react to valid frames.
				if (frameMode === frameModes.playback || processedFrame.isFrameValid) {
					direction = frameMode === frameModes.playback  ? frameRecorder.nextFrame() :
						processedFrame.pointDirection;

					components.servoX.move(direction.x);
					components.servoY.move(direction.y);

					if (frameMode === frameModes.recording) {
						recordFrame(direction);
					}
				}
			}
		});
		//connect to the leap motion controller service.
		controller.connect();
	});
}());
