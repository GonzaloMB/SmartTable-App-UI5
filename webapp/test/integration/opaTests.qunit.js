/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZGONZALOMB/ZGONZALOMB/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});