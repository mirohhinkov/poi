"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dbDescriptor_1 = require("../utils/dbDescriptor");
const dbController = (sql, sqlArgs) => {
    return new Promise((resolve, reject) => {
        const conn = mysql2_1.default.createConnection(dbDescriptor_1.dbD);
        conn.connect((err) => {
            if (err)
                reject(err); // rejects the promise on connection error
            conn.execute(sql, sqlArgs, (err, result) => {
                if (err)
                    reject(err); //
                resolve(result);
            });
        });
    });
};
exports.default = dbController;
