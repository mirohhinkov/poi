import { PointOfInterest } from '../Model/PointOfInterest';
import { PoiRow } from '../Model/PoiRow';

export interface IPoiService {
  //Gets all pois in a certain region
  getPoisByRegion: (region: string) => Promise<PointOfInterest[]>;
  // Validate and save new Poi in the database
  createPoi: (newPoi: PoiRow) => Promise<PointOfInterest>;
  // updates poi recomendations and return the updated poi
  recomendPoi: (id: number) => Promise<PointOfInterest>;
  // returns all regions in the database
  getRegions: () => Promise<string[]>;
}
