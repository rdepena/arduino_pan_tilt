module.exports = {
	setUp: function (callback) {
		this.pointables = require("../leap/pointables.js")();
		//a valid frame.
		this.validMockFrame = {
			hands : [{
				stabilizedPalmPosition : [ -33.8248, 198.192, 14.5592 ],
				valid : true
			}],
			pointables : [{
				stabilizedTipPosition : [ -67.5669, 238.658, -77.0949 ],
				valid : true
			}]
		};
		//an invalid frame
		this.invalidMockFrame = {
			hands : [{
				stabilizedPalmPosition : [],
				valid : false
			}],
			pointables : [{
				stabilizedTipPosition : [],
				valid : false
			}],
		}
		callback();
	},
	tearDown: function (callback) {
		// clean up
		callback();
	},
	validFrameReturnsFlag: function (test) {
		var processedFrame = this.pointables.processFrame(this.validMockFrame);
	    test.expect(1);
	    test.ok(processedFrame.isValid, "valid flag should be true");
	    test.done();
	},
	invalidFrameReturnsFlag :function (test) {
		var processedFrame = this.pointables.processFrame(this.invalidMockFrame);
		test.expect(1);
		test.ok(!processedFrame.isValid, "valid flag should be false");
		test.done();
	},
	pointDirectionReturnsDelta: function (test) {
		var processedFrame = this.pointables.processFrame(this.validMockFrame);
		var pointXDelta = this.validMockFrame.hands[0].stabilizedPalmPosition[0] - this.validMockFrame.pointables[0].stabilizedTipPosition[0];
		var pointYDelta = this.validMockFrame.hands[0].stabilizedPalmPosition[1] - this.validMockFrame.pointables[0].stabilizedTipPosition[1];
		test.expect(2);
		test.equal(pointXDelta, processedFrame.pointDirection.x, "the pointDirection x should return the delta of the palm and the pointable");
		test.equal(pointYDelta, processedFrame.pointDirection.y, "the pointDirection x should return the delta of the palm and the pointable");
		test.done();
	},
};