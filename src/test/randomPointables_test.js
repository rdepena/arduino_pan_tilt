/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
var randomPointables_test = {
	setUp: function (callback) {
		this.randomPointables = require("../rand/randomPointables.js")();
		callback();
	},
	tearDown: function (callback) {
		callback();
	},
	frameIsValid: function (test) {
		test.expect(1);
		test.ok(this.randomPointables.generateRandomFrame({}).isFrameValid, "frame must be valid.");
		test.done();
	}
};

module.exports = randomPointables_test;