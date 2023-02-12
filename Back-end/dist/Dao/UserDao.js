"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbController_js_1 = __importDefault(require("../Controllers/dbController.js"));
const User_js_1 = require("../Model/User.js");
const mapToClass_js_1 = __importDefault(require("../utils/mapToClass.js"));
class UserDao {
    async findUserById(id) {
        const sql = 'SELECT * FROM poi_users WHERE id = ?';
        const sqlArgs = [id];
        const result = await this.queryForUser(sql, sqlArgs);
        return result;
    }
    async findUserByName(username) {
        const sql = 'SELECT * FROM poi_users WHERE username = ?';
        const sqlArgs = [username];
        const result = await this.queryForUser(sql, sqlArgs);
        return result;
    }
    async queryForUser(sql, sqlArgs) {
        const result = await (0, dbController_js_1.default)(sql, sqlArgs);
        if (result[0] == undefined)
            return null;
        return (0, mapToClass_js_1.default)(result[0], User_js_1.User);
    }
}
exports.default = new UserDao();
