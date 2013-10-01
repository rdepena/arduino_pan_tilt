/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
//process frame and return pointables.
var pointables = function () {
	"use strict";
	var my = {};

	//validate frame
	var isFrameValid = function (frame) {
		if (frame.pointables && frame.pointables[0] && frame.hands && frame.hands[0]) {
			if(frame.pointables.length === 1) {
				return frame.pointables[0].valid && frame.hands[0].valid;
			}
		}
		return false;
	};

	//expose leapmotion palm object as x,y,x
	var palmPosition = function (frame) {
		return {
			x : frame.hands[0].stabilizedPalmPosition[0],
			y : frame.hands[0].stabilizedPalmPosition[1],
			z : frame.hands[0].stabilizedPalmPosition[2]
		};
	};
	//expose leapmotion tip object as x,y,x
	var tipPosition = function (frame) {
		return {
			x : frame.pointables[0].stabilizedTipPosition[0],
			y : frame.pointables[0].stabilizedTipPosition[1],
			z : frame.pointables[0].stabilizedTipPosition[2]
		};
	};
	//calculate the delta of the palm and the pointable.
	var pointDelta = function (frame) {
		var palm = palmPosition(frame);
		var	tip = tipPosition(frame);
		return {
			//compensating x because yea.
			x : (palm.x - tip.x) + 100,
			y : (palm.y - tip.y),
			z : palm.x - tip.x
		};
	};

	//process the frame for pointables.
	my.processFrame = function (frame) {
		var valid = isFrameValid(frame);
		return {
			valid : valid,
			pointDirection : valid ? pointDelta(frame) : null
		};
	};

	return my;
};
module.exports = pointables;