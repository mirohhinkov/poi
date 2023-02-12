"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    _statusCode;
    constructor(message, statusCode) {
        super(message);
        this._statusCode = statusCode;
    }
    get statusCode() {
        return this._statusCode;
    }
}
exports.AppError = AppError;
