"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReviewDao_1 = __importDefault(require("../Dao/ReviewDao"));
const Validatable_1 = require("../utils/Validatable");
const checkSqlResults_1 = __importDefault(require("../utils/checkSqlResults"));
class ReviewService {
    async createReview(poiId, review) {
        const validReview = {
            type: Validatable_1.validationTypes.string,
            value: review,
            minLength: 10,
            errorMessage: 'The lenght of the review have to be at least 10',
        };
        if (!(0, Validatable_1.validation)(validReview))
            return (0, checkSqlResults_1.default)([], validReview.errorMessage, 400);
        await ReviewDao_1.default.createReview(poiId, review);
        const result = await ReviewDao_1.default.getLastCreated();
        console.log(result);
        return result;
    }
    async getAllReviewsGroupedById() {
        const result = await ReviewDao_1.default.getAllReviewsGroupedById();
        return result.reduce((acc, el) => {
            return { ...acc, [el.poi_id]: el.nrev };
        }, {});
    }
    async getAllReviewsById(poiId) {
        const result = await ReviewDao_1.default.getAllReviewsById(poiId);
        return result.map((el) => el.review);
    }
}
exports.default = new ReviewService();
