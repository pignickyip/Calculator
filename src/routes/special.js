(function () {
	"use strict";
}());
var path = require("path"),
	express = require("express"),
	router = express.Router(),
	ctrl = require(path.join(__dirname, "/../controller/specialController.js"));


router.route("/store").post(ctrl.storeM);
router.route("/result").post(ctrl.resultM);
router.route("/clear").post(ctrl.clearM);
router.route("/operate").post(ctrl.operateM);

module.exports = router;
