/* --> Route Handlers <-- */

interface IApiController {
  // GET - Getting all pois in a given region
  // route - localhost:3030/api/v1/getPoisByRegion/:region
  // Dynamic part of the url - region
  getByRegion: (req: any, res: any) => Promise<void>;

  // POST - save a new Point of Interest into a db
  // route - localhost:3030/api/v1/createPoi
  // request body has a type of PoiRow
  createPoi(req: any, res: any): Promise<void>;

  // PATCH - update recomendations field of the pointsofinterest table for certain poi
  // route - localhost:3030/api/v1/recomend
  // request body type is { id: number }
  recomendPoi(req: any, res: any): Promise<void>;

  // GET - takes the existing regions FROM pointsofinterest table;
  // route - localhost:3030/api/v1/getRegions
  // it does not require dynamic content
  getRegions(req: any, res: any): Promise<void>;
}
