import { PointOfInterest } from '../Model/PointOfInterest';
import { PoiRow } from '../Model/PoiRow';

export interface IPoiDao {
  // finds Point of Interest by id
  getPoiById: (id: number) => Promise<PointOfInterest>;

  // creates a new Point of Interest
  createPoi: (newPoi: PoiRow) => Promise<void>;

  // update the recomendations field of a poi
  recomendPoi: (poi: PointOfInterest) => Promise<void>;

  // finds the last created poi
  getLastCreated: () => Promise<PointOfInterest>;

  // query db for all regions
  getPoiRegions: () => Promise<string[]>;

  // query db for all poi in a certain region
  getPoisByRegion: (region: string) => Promise<PointOfInterest[]>;
}
