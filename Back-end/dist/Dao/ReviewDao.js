"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbController_js_1 = __importDefault(require("../Controllers/dbController.js"));
class ReviewDao {
    async createReview(poiId, review) {
        const sql = `INSERT INTO poi_reviews (poi_id, review)
      VALUES (?, ?)`;
        const sqlArgs = [poiId, review];
        await (0, dbController_js_1.default)(sql, sqlArgs);
    }
    async getAllReviewsGroupedById() {
        const sql = `SELECT poi_id, COUNT(*) as nrev FROM poi_reviews GROUP BY poi_id`;
        const sqlArgs = [];
        return await (0, dbController_js_1.default)(sql, sqlArgs);
    }
    async getAllReviewsById(poiId) {
        const sql = `SELECT review FROM poi_reviews WHERE poi_id = ?`;
        const sqlArgs = [poiId];
        return await (0, dbController_js_1.default)(sql, sqlArgs);
    }
    async getLastCreated() {
        const sql = `SELECT * FROM poi_reviews ORDER BY id DESC LIMIT 1`;
        const sqlArgs = [];
        return await (0, dbController_js_1.default)(sql, sqlArgs);
    }
}
exports.default = new ReviewDao();
