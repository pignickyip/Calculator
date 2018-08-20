(function () {
    'use strict';
}());
var path = require('path')
var express = require('express')
var router = express.Router()
var ctrl = require(path.join(__dirname, '/../controller/IndexController.js'))

router.route('/').get(ctrl.index)
router.route('*').get(ctrl.default)

module.exports = router
