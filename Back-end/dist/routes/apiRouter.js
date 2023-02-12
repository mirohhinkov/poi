"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const ApiController_1 = __importDefault(require("../Controllers/ApiController"));
const AuthController_1 = __importDefault(require("../Controllers/AuthController"));
router.route('/getPoisByRegion/:region').get(ApiController_1.default.getByRegion);
router
    .route('/createPoi')
    .post(AuthController_1.default.isUserLogged, ApiController_1.default.createPoi);
router
    .route('/recomend')
    .post(AuthController_1.default.isUserLogged, ApiController_1.default.recomendPoi);
router.route('/getRegions').get(ApiController_1.default.getRegions);
router
    .route('/createReview')
    .post(AuthController_1.default.isUserLogged, ApiController_1.default.createReview);
router.route('/getPoisReviewFigures').get(ApiController_1.default.getPoisReviewFigures);
router.route('/getAllReviewsById/:poiId').get(ApiController_1.default.getAllReviewsById);
exports.default = router;
