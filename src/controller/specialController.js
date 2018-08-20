(function () {
    'use strict';
}());
let path = require('path'),
    definedData = require(path.join(__dirname, '/../utils/data.js')),
    myFile = require(path.join(__dirname, '/../utils/file.js')),
    db = require(path.join(__dirname, '/../utils/mySQLDataBase.js')),
    myJoi = require(path.join(__dirname, '/../utils/joi.js'));
module.exports = {
    store: async (req, res, next) => {
        let deci = await myJoi.JoiValidation(0, req.body)
        let msg = 404;
        if (deci === 'success') {
            //            let fileI = await myFile.store(req.ip.substring(7) + '_mechineValue.json', {
            //                ip: req.ip.substring(7),
            //                value: req.body.data
            //            })
            let goInsert = await db.myDatabaseRequest({
                s1: 'INSERT INTO machineHistory SELECT null , ? , ? , id , ? , null FROM machineRecord WHERE username = ? ;',
                s2: 'UPDATE machineRecord SET val = ? WHERE username = ? ;'
            }, {
                p1: [req.ip.substring(7), definedData.operator[0], req.body.data, req.body.username],
                p2: [req.body.data, req.body.username]
            }, 1);
            if (goInsert.r1.affectedRows !== 0 && goInsert.r1.affectedRows !== 0) {
                msg = 200;
            }
        }
        res.status(msg).send({
            msg: msg
        });
    },
    result: async (req, res, next) => {
        //let file = await myFile.result(req.ip.substring(7) + '_mechineValue.json');
        let getRecord = await db.myDatabaseRequest('SELECT val FROM machineRecord WHERE username = ? ;', [req.body.username], 0);
        //console.log(file)
        res.status(200).send({
            msg: '0',
            result: getRecord[0]['val']
        })
    },
    clear: async (req, res, next) => {
        //let fileI = await myFile.store(req.ip.substring(7) + '_mechineValue.json', {});
        let clearRecord = await db.myDatabaseRequest({
            s1: 'INSERT INTO machineHistory SELECT null , ? , ? , id , ? , null FROM machineRecord WHERE username = ? ;',
            s2: 'UPDATE machineRecord SET val = ? WHERE username = ? ;'
        }, {
            p1: [req.ip.substring(7), definedData.operator[1], 0.0, req.body.username],
            p2: [0.0, req.body.username]
        }, 1);
        res.status(200).send({
            msg: '0'
        })
    },
    operate: async (req, res, next) => {
        //        let file = await myFile.result(req.ip.substring(7) + '_mechineValue.json');
        //        let cal = parseFloat(file.value);
        //        if (req.body.operator === 0) {
        //            cal += parseFloat(req.body.value);
        //        } else if (req.body.operator === 1) {
        //            cal -= parseFloat(req.body.value);
        //        }
        //        let fileI = await myFile.store(req.ip.substring(7) + '_mechineValue.json', {
        //            ip: req.ip.substring(7),
        //            value: cal
        //        })
        let deci = await myJoi.JoiValidation(1, req.body)
        let msg = 404;
        if (deci === 'success') {
            let operateSQL = 'UPDATE machineRecord a JOIN machineRecord b ON a.id = b.id SET a.val = (b.val';
            if (req.body.operator === 2) {
                operateSQL += '+?)'
            } else if (req.body.operator === 3) {
                operateSQL += '-?)'
            }
            let operateRecord = await db.myDatabaseRequest({
                s1: 'INSERT INTO machineHistory SELECT null , ? , ? , id , ? , null FROM machineRecord WHERE username = ? ;',
                s2: operateSQL + ' WHERE a.username = ? ;'
            }, {
                p1: [req.ip.substring(7), definedData.operator[req.body.operator], parseFloat(req.body.value), req.body.username],
                p2: [parseFloat(req.body.value), req.body.username]
            }, 1);
            //Done Update
            let getRecord = await db.myDatabaseRequest('SELECT val FROM machineRecord WHERE username = ? ;', [req.body.username], 0);
            //console.log(file)
            res.status(200).send({
                msg: '0',
                result: getRecord[0]['val']
            })
        } else {
            res.status(404).send({
                msg: '404'
            })
        }
    },
    default: function (req, res, next) {
        res.status(404).send('Error')
    }
}
