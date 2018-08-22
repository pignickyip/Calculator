(function () {
    "use strict";
}());
let Joi = require("joi");
module.exports = {
    JoiValidation: async (flag, val) => {
        var scheme = schemeSelect(flag);
        return await new Promise((resolve, reject) => {
            try {
                Joi.validate(val, scheme, function (err, value) {
                    if (err === null) {
                        return resolve("success");
                    } else {
                        return resolve(err.details[0]["message"] + " - " + value);
                    }
                });
            } catch (e) {
                return reject(e);
            }
        });
    }
};

function schemeSelect(flag) {
    if (flag === 0) {
        return machineStoreScheme;
    } else if (flag === 1) {
        return machineOperateScheme;
    }
}
let machineStoreScheme = Joi.object().keys({
    data: Joi.string().regex(/[0-9-]$/).required(),
    username: Joi.string().regex(/[A-Za-z0-9]$/).required()
});
let machineOperateScheme = Joi.object().keys({
    value: Joi.string().regex(/[0-9-]$/).required(),
    operator: Joi.number().max(4).min(2).required(),
    username: Joi.string().regex(/[A-Za-z0-9]$/).required()
});
