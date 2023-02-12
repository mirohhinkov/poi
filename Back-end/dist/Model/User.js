"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    _id;
    _username;
    _password;
    constructor(_id, _username, _password) {
        this._id = _id;
        this._username = _username;
        this._password = _password;
    }
    get id() {
        return this._id;
    }
    get username() {
        return this._username;
    }
    get password() {
        return this._password;
    }
    toJSON() {
        return {
            id: this._id,
            username: this._username,
            password: this._password,
        };
    }
}
exports.User = User;
