"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = __importDefault(require("../Dao/UserDao"));
const checkPassword_1 = __importDefault(require("../utils/checkPassword"));
class UserService {
    async login(username, password) {
        const user = await UserDao_1.default.findUserByName(username);
        if ((0, checkPassword_1.default)(user, password))
            return user;
        return null;
    }
    async findUser(id) {
        return UserDao_1.default.findUserById(id);
    }
}
exports.default = new UserService();
