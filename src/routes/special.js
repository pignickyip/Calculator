(function () {
    'use strict';
}());
var path = require('path'),
    express = require('express'),
    router = express.Router(),
    ctrl = require(path.join(__dirname, '/../controller/specialController.js'))


router.route('/store').post(ctrl.store)
router.route('/result').post(ctrl.result)
router.route('/clear').post(ctrl.clear)
router.route('/operate').post(ctrl.operate)

module.exports = router
