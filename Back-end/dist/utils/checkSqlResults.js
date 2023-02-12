"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../utils/AppError");
const checkSqlResult = (data, errorMsg, statusCode) => {
    if (data.length < 1)
        throw new AppError_1.AppError(errorMsg, statusCode);
};
exports.default = checkSqlResult;
