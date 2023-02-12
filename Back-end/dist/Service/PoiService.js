"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Model
const PointOfInterest_1 = require("../Model/PointOfInterest");
//Dao
const PoiDao_1 = __importDefault(require("../Dao/PoiDao"));
// Helper functions
const checkSqlResults_1 = __importDefault(require("../utils/checkSqlResults"));
const mapToClass_1 = __importDefault(require("../utils/mapToClass"));
const validatePoiFields_1 = __importDefault(require("../utils/validatePoiFields"));
class PoiService {
    async getPoisByRegion(region) {
        const data = await PoiDao_1.default.getPoisByRegion(region);
        (0, checkSqlResults_1.default)(data, `Not defined any Points Of Interest for region ${region}`, 404);
        return data;
    }
    async createPoi(newPoi) {
        console.log(newPoi);
        const validationErrors = (0, validatePoiFields_1.default)(newPoi);
        if (validationErrors.length !== 0)
            (0, checkSqlResults_1.default)([], JSON.stringify(validationErrors), 400);
        await PoiDao_1.default.createPoi(newPoi);
        const result = await PoiDao_1.default.getLastCreated();
        (0, checkSqlResults_1.default)(result, 'Server Error', 500);
        const savedPoi = (0, mapToClass_1.default)(result[0], PointOfInterest_1.PointOfInterest);
        return savedPoi;
    }
    async recomendPoi(id) {
        const result = await PoiDao_1.default.getPoiById(id);
        (0, checkSqlResults_1.default)(result, `POI with id ${id} does not exists`, 404);
        const poi = (0, mapToClass_1.default)(result[0], PointOfInterest_1.PointOfInterest);
        poi.recomend();
        await PoiDao_1.default.recomendPoi(poi);
        return poi;
    }
    async getRegions() {
        const data = await PoiDao_1.default.getPoiRegions();
        (0, checkSqlResults_1.default)(data, 'Server error', 500);
        return data.map((d) => d.region);
    }
}
exports.default = new PoiService();
