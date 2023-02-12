//interface
import { IPoiService } from './IPoiServive';
// Model
import { PointOfInterest } from '../Model/PointOfInterest';
import { PoiRow } from '../Model/PoiRow';
//Dao
import PoiDao from '../Dao/PoiDao';
// Helper functions
import checkSqlResult from '../utils/checkSqlResults';
import mapToClass from '../utils/mapToClass';
import validatePoiFields from '../utils/validatePoiFields';

class PoiService implements IPoiService {
  public async getPoisByRegion(region: string) {
    const data: PointOfInterest[] = await PoiDao.getPoisByRegion(region);

    checkSqlResult(
      data,
      `Not defined any Points Of Interest for region ${region}`,
      404
    );
    return data;
  }

  public async createPoi(newPoi: PoiRow) {
    console.log(newPoi);
    const validationErrors = validatePoiFields(newPoi);
    if (validationErrors.length !== 0)
      checkSqlResult([], JSON.stringify(validationErrors), 400);

    await PoiDao.createPoi(newPoi);
    const result = await PoiDao.getLastCreated();

    checkSqlResult(result, 'Server Error', 500);
    const savedPoi: PointOfInterest = mapToClass(result[0], PointOfInterest);
    return savedPoi;
  }

  public async recomendPoi(id: number) {
    const result = await PoiDao.getPoiById(id);

    checkSqlResult(result, `POI with id ${id} does not exists`, 404);

    const poi: PointOfInterest = mapToClass(result[0], PointOfInterest);
    poi.recomend();
    await PoiDao.recomendPoi(poi);
    return poi;
  }

  public async getRegions(): Promise<string[]> {
    const data: { region: string }[] = await PoiDao.getPoiRegions();
    checkSqlResult(data, 'Server error', 500);
    return data.map((d: { region: string }) => d.region);
  }
}

export default new PoiService();
