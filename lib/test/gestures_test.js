/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
var gestures_test = {
    setUp: function(callback) {
        this.gestures = require("../leap/gestures.js")();
        //a valid frame.
        this.validMockFrame = {
            hands: [{
                stabilizedPalmPosition: [-33.8248, 198.192, 14.5592],
                valid: true
            }],
            pointables: [{
                stabilizedTipPosition: [-67.5669, 238.658, -77.0949],
                valid: true
            }],
            gestures: []
        };
        //an invalid frame
        this.invalidMockFrame = {
            hands: [{
                stabilizedPalmPosition: [],
                valid: false
            }],
            pointables: [{
                stabilizedTipPosition: [],
                valid: false
            }],
            gestures: []
        };
        callback();
    },
    tearDown: function(callback) {
        // clean up
        callback();
    },
    validFrameReturnsFlag: function(test) {
        var processedFrame = this.gestures.processFrame(this.validMockFrame);
        test.expect(1);
        //TODO: change isFrameValid to Valid.
        test.ok(processedFrame.valid, "valid flag should be true");
        test.done();
    },
    invalidFrameReturnsFlag: function(test) {
        var processedFrame = this.gestures.processFrame(this.invalidMockFrame);
        test.expect(1);
        test.ok(!processedFrame.valid, "valid flag should be false");
        test.done();
    },
};

module.exports = gestures_test;
