//(function () {
//    'use strict';
//}());
//var mongoose = require('mongoose'),
//    dbServer = '<Server Name>:27017';
////And change the Database setting, /etc/mongodb.conf's bind ip to its lan interface ip
//mongoose.connect('mongodb://' + dbServer + '/calculator', {
//    useNewUrlParser: true
//});
//// Get Mongoose to use the global promise library
//mongoose.Promise = global.Promise;
////Get the default connection
//var db = mongoose.connection;
//
////Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//
//var theScheme = new mongoose.Schema({
//    'ipAddress': {
//        type: String,
//        ref: "User"
//    },
//    'value': {
//        type: Number,
//        default: 0
//    }
//})
//
//module.exports = {
//    databaseInsert: async (flag, data) => {
//        let sh = mongoose.model('sh', theScheme),
//            eq = new sh({
//                ipAddress: data.ip,
//                value: data.value
//            });
//        eq.save().then(() => console.log('meow'));
//    }
//}
