import { IReviewDao } from './IReviewDao';

import dbController from '../Controllers/dbController.js';

class ReviewDao implements IReviewDao {
  public async createReview(poiId: number, review: string) {
    const sql = `INSERT INTO poi_reviews (poi_id, review)
      VALUES (?, ?)`;
    const sqlArgs = [poiId, review];

    await dbController(sql, sqlArgs);
  }

  public async getAllReviewsGroupedById() {
    const sql = `SELECT poi_id, COUNT(*) as nrev FROM poi_reviews GROUP BY poi_id`;
    const sqlArgs: any[] = [];

    return await dbController(sql, sqlArgs);
  }

  public async getAllReviewsById(poiId: number) {
    const sql = `SELECT review FROM poi_reviews WHERE poi_id = ?`;
    const sqlArgs = [poiId];

    return await dbController(sql, sqlArgs);
  }

  public async getLastCreated() {
    const sql = `SELECT * FROM poi_reviews ORDER BY id DESC LIMIT 1`;
    const sqlArgs: any[] = [];

    return await dbController(sql, sqlArgs);
  }
}

export default new ReviewDao();
