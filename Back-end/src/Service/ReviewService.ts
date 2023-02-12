import IReviewService from './IReviewService';
import reviewDao from '../Dao/ReviewDao';
import { Validatable, validation, validationTypes } from '../utils/Validatable';
import checkSqlResult from '../utils/checkSqlResults';

class ReviewService implements IReviewService {
  public async createReview(poiId: number, review: string) {
    const validReview: Validatable = {
      type: validationTypes.string,
      value: review,
      minLength: 10,
      errorMessage: 'The lenght of the review have to be at least 10',
    };
    if (!validation(validReview))
      return checkSqlResult([], validReview.errorMessage, 400);
    await reviewDao.createReview(poiId, review);
    const result = await reviewDao.getLastCreated();
    console.log(result);
    return result;
  }
  public async getAllReviewsGroupedById() {
    const result = await reviewDao.getAllReviewsGroupedById();
    return result.reduce((acc: any, el: any) => {
      return { ...acc, [el.poi_id]: el.nrev };
    }, {});
  }
  public async getAllReviewsById(poiId: number) {
    const result = await reviewDao.getAllReviewsById(poiId);
    return result.map((el: { review: string }) => el.review);
  }
}

export default new ReviewService();
