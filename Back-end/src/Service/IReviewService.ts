import { Review } from '../Model/Review';

export interface IReviewDao {
  // creates a new Review of Interest
  createReview: (poiId: number, review: string) => Promise<Review>;

  // returns array with objects, containing poiId and the numbers of reviews for this POI
  getAllReviewsGroupedById: () => Promise<{ [key: string]: number }>;

  // returns all reviews for a POI
  getAllReviewsById: (poiId: number) => Promise<string[]>;
}

export default IReviewDao;
