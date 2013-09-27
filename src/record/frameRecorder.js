/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
var frameRecorder = function (){
	var my = {};

	var frameBuffer = [];

	var position = 0;

	my.recordFrame = function (frame) {
		frameBuffer.push(frame);
	};

	my.nextFrame = function () {
		var frame = frameBuffer[position];
		position = (position + 1) % frameBuffer.length;

		return frame;
	};

	my.wipeBuffer = function () {
		frameBuffer = [];
		position = 0;
	};

	return my;
};

module.exports = frameRecorder;