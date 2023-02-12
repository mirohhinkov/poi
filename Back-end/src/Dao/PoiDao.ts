import dbController from '../Controllers/dbController.js';

import { PointOfInterest } from '../Model/PointOfInterest.js';
import { PoiRow } from '../Model/PoiRow.js';
import { IPoiDao } from './IPoiDao.js';

class PoiDao implements IPoiDao {
  public async recomendPoi(poi: PointOfInterest) {
    const sql = 'UPDATE pointsofinterest SET recommendations = ? WHERE id = ?';
    const sqlArgs = [poi.recommendations, poi.id];
    await dbController(sql, sqlArgs);
  }

  public async createPoi(newPoi: PoiRow) {
    const sql =
      'INSERT INTO pointsofinterest \
    (name, type, country, region, lon, lat, description) \
    VALUES (?, ?, ?, ?, ?, ?, ?)';

    const sqlArgs = Object.values(newPoi);
    await dbController(sql, sqlArgs);
  }

  public async getLastCreated() {
    const sql = 'SELECT * FROM pointsofinterest ORDER BY id DESC LIMIT 1;';
    const sqlArgs: any[] = [];
    return await dbController(sql, sqlArgs);
  }

  public async getPoiById(id: number) {
    const sql = 'SELECT * FROM pointsofinterest WHERE id = ?';
    const sqlArgs = [id];
    return await dbController(sql, sqlArgs);
  }

  public async getPoiRegions() {
    const sql = 'SELECT DISTINCT region FROM pointsofinterest ORDER BY region';
    return await dbController(sql, []);
  }

  public async getPoisByRegion(region: string) {
    const sql = 'SELECT * FROM pointsofinterest WHERE region = ?';
    const sqlArgs = [region];
    const data: PointOfInterest[] = await dbController(sql, sqlArgs);
    return data;
  }
}

export default new PoiDao();
