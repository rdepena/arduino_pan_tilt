//process frames and raise pointable events.
var gestures = function() {
    "use strict";
    //we need will expose the pointables library and also use it to ensure that the number of fingers per gesture is correct.
    var pointables = require('./pointables.js')();
    var my = {};
    var gestureEvents = [];
    var lastPublishedEventTime = null;

    //we only want to process gestures each x seconds.
    var isWithinTimeThreshold = function() {
        var millisecond = 2000;
        if (lastPublishedEventTime) {
            return Date.now() - lastPublishedEventTime > millisecond;
        }
        return true;
    };

    //invoke the callbacks for a specified gesture.
    var publishGesture = function(gesture, frame) {
        if (gestureEvents[gesture.type]) {
            for (var x = 0; x < gestureEvents[gesture.type].length; x++) {
                if (gestureEvents[gesture.type][x].numberOfFingers === frame.pointables.length) {
                    gestureEvents[gesture.type][x].callback();
                    lastPublishedEventTime = Date.now();
                }
            }
        }
    };

    //Process the frame to look for gestures.
    var processGestures = function(frame) {
        //only respond if two fingers are shown.
        if (isWithinTimeThreshold() && frame.gestures.length > 0) {
            //we check the event raised against our subscribed events.
            for (var i = 0; i < frame.gestures.length; i++) {
                var gesture = frame.gestures[i];
                publishGesture(gesture, frame);
            }
        }
    };

    //subscribe to events.
    my.on = function(gesture, options) {
        if (!gestureEvents[gesture]) {
            gestureEvents[gesture] = [];
        }
        gestureEvents[gesture].push(options);
    };

    //processes a given frame for gestures.
    my.processFrame = function(frame) {
        processGestures(frame);
        var pointable = pointables.processFrame(frame);
        return {
            //TODO: change isFrameValid to Valid.
            valid: pointable.valid,
            pointDirection: pointable.pointDirection
        };
    };

    return my;
};

module.exports = gestures;
