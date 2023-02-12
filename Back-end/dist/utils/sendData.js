"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendData = (res, data) => {
    if (data?.data) {
        res.status(200).json({ status: 'successful', ...data });
    }
    else {
        res.status(200).json({
            status: 'successful',
            data,
        });
    }
};
exports.default = sendData;
