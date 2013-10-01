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
		//amount of time to wait before actually starting to record.
		var waitBeforeRecordMilliseconds = 1000;
		components.redLed.on();
		components.blueLed.on();

		//want to give the user a second before we start recording.
		setTimeout(function () {
			components.blueLed.off();
			frameMode = frameModes.recording;	
			recordStartTime = Date.now();
		}, waitBeforeRecordMilliseconds);
	};

	//records a given frame.
	var recordFrame = function (frame) {
		//amount of milliseconds to record.
		var recordMilliSeconds = 5000;
		frameRecorder.recordFrame(frame);

		//check if we have recorded the correct amount of time
		if(Date.now() - recordStartTime > recordMilliSeconds) {
			//recorded enough start the playback
			startPlayback();
		}
	};

	//starts the playback of a recorded session.
	var startPlayback = function () {
		frameMode = frameModes.playback;
		components.blueLed.on();
		components.redLed.off();
	};

	//ends playback and returns the board to live mode.
	var endPlayback = function () {
		frameMode = frameModes.live;
		frameRecorder.wipeBuffer();
		components.blueLed.off();
	};

	//describing a circle with three exposed finger the laser will be toggled.
	var threeFingerCircle = {
		callback: components.toggleLaser,
		numberOfFingers: 3
	};

	//describing a circle with four exposed finger you will begin recording
	var fourFingerCircle = {
		callback: startRecording,
		numberOfFingers: 4
	};
	//a five finger swipe will end playback and return the board to live mode
	var fiveFingerSwipe = {
		callback: endPlayback,
		numberOfFingers: 5
	};

	//subscibe all the events
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
				if (frameMode === frameModes.playback || processedFrame.valid) {
					direction = frameMode === frameModes.playback  ? frameRecorder.nextFrame() :
						processedFrame.pointDirection;

					//move the servos 
					components.servoX.move(direction.x);
					components.servoY.move(direction.y);

					//record the frame if in recording mode.
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
