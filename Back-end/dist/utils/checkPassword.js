"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkPassword = (user, password) => {
    if (user != null)
        return password === user.password;
    return false;
};
exports.default = checkPassword;
