import { Router } from 'express';
const router = Router();

import apiController from '../Controllers/ApiController';
import authController from '../Controllers/AuthController';

router.route('/getPoisByRegion/:region').get(apiController.getByRegion);

router
  .route('/createPoi')
  .post(authController.isUserLogged, apiController.createPoi);

router
  .route('/recomend')
  .post(authController.isUserLogged, apiController.recomendPoi);

router.route('/getRegions').get(apiController.getRegions);

router
  .route('/createReview')
  .post(authController.isUserLogged, apiController.createReview);
router.route('/getPoisReviewFigures').get(apiController.getPoisReviewFigures);
router.route('/getAllReviewsById/:poiId').get(apiController.getAllReviewsById);
export default router;
