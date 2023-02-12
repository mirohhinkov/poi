"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, _, res, _2) => {
    const statusCode = err.statusCode || 500;
    res
        .status(statusCode)
        .json({ status: 'error', statusCode, message: err.message });
};
exports.default = errorHandler;
