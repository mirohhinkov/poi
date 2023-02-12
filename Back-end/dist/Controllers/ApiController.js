"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Services
const PoiService_1 = __importDefault(require("../Service/PoiService"));
//Helpers
const sendData_1 = __importDefault(require("../utils/sendData"));
/* --> Async Decorator <-- */
const catchAsyncErrors_js_1 = __importDefault(require("../utils/catchAsyncErrors.js"));
const ReviewService_1 = __importDefault(require("../Service/ReviewService"));
//
/* --> Route Handlers <-- */
// See the interface file
class ApiController {
    async getByRegion(req, res) {
        const { region } = req.params;
        const data = await PoiService_1.default.getPoisByRegion(region);
        (0, sendData_1.default)(res, { results: data.length, data });
    }
    async createPoi(req, res) {
        const newPoi = req.body;
        const savedPoi = await PoiService_1.default.createPoi(newPoi);
        (0, sendData_1.default)(res, savedPoi);
    }
    async recomendPoi(req, res) {
        const { id } = req.body;
        const updatedPoi = await PoiService_1.default.recomendPoi(id);
        (0, sendData_1.default)(res, updatedPoi);
    }
    async getRegions(_, res) {
        const data = await PoiService_1.default.getRegions();
        (0, sendData_1.default)(res, data);
    }
    async createReview(req, res) {
        const { poiId, review } = req.body;
        const data = await ReviewService_1.default.createReview(poiId, review);
        console.log(data);
        (0, sendData_1.default)(res, data);
    }
    async getPoisReviewFigures(_req, res) {
        const data = await ReviewService_1.default.getAllReviewsGroupedById();
        console.log(data);
        (0, sendData_1.default)(res, data);
    }
    async getAllReviewsById(req, res) {
        const { poiId } = req.params;
        const data = await ReviewService_1.default.getAllReviewsById(+poiId);
        console.log(data);
        (0, sendData_1.default)(res, data);
    }
}
__decorate([
    (0, catchAsyncErrors_js_1.default)()
], ApiController.prototype, "getByRegion", null);
__decorate([
    (0, catchAsyncErrors_js_1.default)()
], ApiController.prototype, "createPoi", null);
__decorate([
    (0, catchAsyncErrors_js_1.default)()
], ApiController.prototype, "recomendPoi", null);
__decorate([
    (0, catchAsyncErrors_js_1.default)()
], ApiController.prototype, "getRegions", null);
__decorate([
    (0, catchAsyncErrors_js_1.default)()
], ApiController.prototype, "createReview", null);
__decorate([
    (0, catchAsyncErrors_js_1.default)()
], ApiController.prototype, "getPoisReviewFigures", null);
__decorate([
    (0, catchAsyncErrors_js_1.default)()
], ApiController.prototype, "getAllReviewsById", null);
exports.default = new ApiController();
