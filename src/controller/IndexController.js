(function () {
	"use strict";
}());
var path = require("path"),
	definedData = require(path.join(__dirname, "/../utils/data.js"));
module.exports = {
	index: function (req, res) {
		res.status(200).render("index.html", {
			JSdata: definedData.externalJSFileConfig,
			vueJSdata: definedData.externalJSFileVue,
			CSSdata: definedData.externalCSSFile
		});
	},
	default: function (req, res) {
		res.status(404).send("Error");
	}
};
