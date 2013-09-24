/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
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

	var palmPosition = function (frame) {
		return {
			x : frame.hands[0].stabilizedPalmPosition[0],
			y : frame.hands[0].stabilizedPalmPosition[1],
			z : frame.hands[0].stabilizedPalmPosition[2]
		};
	};

	var tipPosition = function (frame) {
		return {
			x : frame.pointables[0].stabilizedTipPosition[0],
			y : frame.pointables[0].stabilizedTipPosition[1],
			z : frame.pointables[0].stabilizedTipPosition[2]
		};
	};

	var pointDelta = function (frame) {
		var palm = palmPosition(frame);
		var	tip = tipPosition(frame);
		return {
			x : palm.x - tip.x,
			y : palm.y - tip.y,
			z : palm.x - tip.x
		};
	};

	my.processFrame = function (frame) {
		var isValid = isFrameValid(frame);
		return {
			isValid : isValid,
			pointDirection : isValid ? pointDelta(frame) : null

		};
	};

	return my;
};
module.exports = pointables;