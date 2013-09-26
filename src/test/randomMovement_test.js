/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
var randomMovement_test = {
	setUp: function (callback) {
		//we need to mock the set timout function
		setTimeOut = function (callback, time) {
			return callback()
		}
	},
	tearDown: function (callback) {
		
	},
	testOne: function (test) {

	}
};

moduleExports = randomMovement_test;