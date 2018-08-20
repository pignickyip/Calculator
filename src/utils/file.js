(function () {
    'use strict';
}());
let fs = require("fs"),
    path = require('path');
module.exports = {
    store: async (fileName, data) => {
        return new Promise((resolve, reject) => {
            let filePath = path.join(__dirname, '/../../documents/', fileName)
            var stream = fs.createWriteStream(filePath)
            stream.once('open', function (fd) {
                stream.write(JSON.stringify(data))
                stream.end()
            })
            return resolve(fileName)
        })
    },
    result: async (fileName) => {
        return new Promise((resolve, reject) => {
            let filePath = path.join(__dirname, '/../../documents/' + fileName)
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    console.log(err)
                    return reject(JSON.parse([]))
                } else {
                    return resolve(JSON.parse(data))
                }
            })
        })
    }
}
