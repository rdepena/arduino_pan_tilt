/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
//records processed frames and has ability to play back recording.
var frameRecorder = function (){
	var my = {};

	//stores recorded frames.
	var frameBuffer = [];

	//keep track of our position.
	var position = 0;

	//records a frame to the buffer.
	my.recordFrame = function (frame) {
		frameBuffer.push(frame);
	};

	//returns the next frame position
	my.nextFrame = function () {
		var frame = frameBuffer[position];
		position = (position + 1) % frameBuffer.length;

		return frame;
	};

	//clears the frame buffer.
	my.wipeBuffer = function () {
		frameBuffer = [];
		position = 0;
	};

	return my;
};

module.exports = frameRecorder;