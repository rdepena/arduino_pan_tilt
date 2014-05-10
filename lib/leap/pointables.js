//process frame and return pointables.
var pointables = function() {
    "use strict";
    var my = {},
        buffer = {},
        maxSampleSize = 10;

    var smooth = function(axis, val) {
        var sum;
        buffer[axis] = buffer[axis] || [];

        buffer[axis].push(val);

        if (buffer[axis].length > maxSampleSize) {
            buffer[axis].shift();
        }

        //sum and average out.
        sum = buffer[axis].reduce(function(x, y) {
            return x + y;
        });
        return Math.floor(sum / buffer[axis].length);
    };

    var smoothFrame = function(frame) {
        frame.x = smooth('x', frame.x);
        frame.y = smooth('y', frame.y);
        frame.z = smooth('z', frame.z);

        console.log(frame);
        return frame;
    };

    //validate frame
    var isFrameValid = function(frame) {
        if (frame.pointables && frame.pointables[0] && frame.hands && frame.hands[0]) {
            if (frame.pointables.length === 1) {
                return frame.pointables[0].valid && frame.hands[0].valid;
            }
        }
        return false;
    };

    //expose leapmotion palm object as x,y,x
    var palmPosition = function(frame) {
        return {
            x: frame.hands[0].stabilizedPalmPosition[0],
            y: frame.hands[0].stabilizedPalmPosition[1],
            z: frame.hands[0].stabilizedPalmPosition[2]
        };
    };
    //expose leapmotion tip object as x,y,x
    var tipPosition = function(frame) {
        return {
            x: frame.pointables[0].stabilizedTipPosition[0],
            y: frame.pointables[0].stabilizedTipPosition[1],
            z: frame.pointables[0].stabilizedTipPosition[2]
        };
    };
    //calculate the delta of the palm and the pointable.
    var pointDelta = function(frame) {
        var palm = palmPosition(frame);
        var tip = tipPosition(frame);
        return {
            //compensating x because yea.
            x: (palm.x - tip.x) + 100,
            y: (palm.y - tip.y),
            z: palm.x - tip.x
        };
    };

    //process the frame for pointables.
    my.processFrame = function(frame) {
        var valid = isFrameValid(frame);

        return {
            valid: valid,
            pointDirection: valid ? smoothFrame(pointDelta(frame)) : null
        };
    };

    return my;
};
module.exports = pointables;
