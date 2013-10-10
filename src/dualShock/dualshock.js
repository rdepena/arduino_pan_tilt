var dualShockController = function (){
	var HID = require('node-hid'),
	//analogs resting ~125, up 0, down 255, left 0, right 155
	leftAnalogY = 7,
	leftAnalogX = 6,
	rightAnalogY = 8,
	rightAnalogX = 9,
	////left 128, down 64, right 32, top 16, start 8, 
	//right joystick bumb 4, left joistic bumb 2, left 1
	directionalButtons = 2,
	//square : 128, x : 64, circle: 32, triangle 16, R1: 8, L1:4, R2: 2, L2:1
	actionButtons = 3,
	dualshockVendorId = 1356,
	dualshockProductId = 616,
	dualshock = new HID.HID(dualshockVendorId, dualshockProductId),
	subscribedCallback = null;

	var my = {};
	
	my.read = function (callback) {
		dualshock.read(function (err, data) {
			callback ({
				//todo: add buttons and stuff.
				leftY : data[leftAnalogY],
				leftX : data[leftAnalogX],
				rightY : data[rightAnalogY],
				rightX : data[rightAnalogX]
			});
		});
	}
	
	return my;
};

module.exports = dualShockController;