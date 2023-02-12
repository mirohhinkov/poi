import { Review } from '../Model/Review';

export interface IReviewDao {
  // creates a new Review of Interest
  createReview: (poiId: number, review: string) => Promise<void>;

  // returns array with objects, containing poiId and the numbers of reviews for this POI
  getAllReviewsGroupedById: () => Promise<any[]>;

  // returns all reviews for a POI
  getAllReviewsById: (poiId: number) => Promise<string[]>;

  // returns last created
  getLastCreated: () => Promise<Review>;
}
