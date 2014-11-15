    var buffer = [],
        maxSample = 5,
        fakeData = [12, 18, 13, 15, 10, 20, 13, 15, 16, 17, 18, 19, 20],
        result = [];

    var smooth = function(val) {
        var sum;

        //push the new values.
        buffer.push(val);

        //if the max sample size has been reached, drop the tail
        if (buffer.length > maxSample) {
            buffer.shift();
        }

        //sum and average out.
        sum = buffer.reduce(function(x, y) {
            return x + y;
        });
        return Math.floor(sum / buffer.length);
    };

    //run the test.
    fakeData.forEach(function(val) {
        result.push(smooth(val));
    });
