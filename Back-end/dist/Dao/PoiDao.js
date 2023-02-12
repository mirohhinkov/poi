"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbController_js_1 = __importDefault(require("../Controllers/dbController.js"));
class PoiDao {
    async recomendPoi(poi) {
        const sql = 'UPDATE pointsofinterest SET recommendations = ? WHERE id = ?';
        const sqlArgs = [poi.recommendations, poi.id];
        await (0, dbController_js_1.default)(sql, sqlArgs);
    }
    async createPoi(newPoi) {
        const sql = 'INSERT INTO pointsofinterest \
    (name, type, country, region, lon, lat, description) \
    VALUES (?, ?, ?, ?, ?, ?, ?)';
        const sqlArgs = Object.values(newPoi);
        await (0, dbController_js_1.default)(sql, sqlArgs);
    }
    async getLastCreated() {
        const sql = 'SELECT * FROM pointsofinterest ORDER BY id DESC LIMIT 1;';
        const sqlArgs = [];
        return await (0, dbController_js_1.default)(sql, sqlArgs);
    }
    async getPoiById(id) {
        const sql = 'SELECT * FROM pointsofinterest WHERE id = ?';
        const sqlArgs = [id];
        return await (0, dbController_js_1.default)(sql, sqlArgs);
    }
    async getPoiRegions() {
        const sql = 'SELECT DISTINCT region FROM pointsofinterest ORDER BY region';
        return await (0, dbController_js_1.default)(sql, []);
    }
    async getPoisByRegion(region) {
        const sql = 'SELECT * FROM pointsofinterest WHERE region = ?';
        const sqlArgs = [region];
        const data = await (0, dbController_js_1.default)(sql, sqlArgs);
        return data;
    }
}
exports.default = new PoiDao();
