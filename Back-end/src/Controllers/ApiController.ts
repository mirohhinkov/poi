import { Request, Response } from 'express';
//Model objects
import { PointOfInterest } from '../Model/PointOfInterest';
import { PoiRow } from '../Model/PoiRow';
// Services
import PoiService from '../Service/PoiService';
//Helpers
import sendData from '../utils/sendData';
/* --> Async Decorator <-- */
import catchAsyncErrors from '../utils/catchAsyncErrors.js';
import reviewService from '../Service/ReviewService';
//

/* --> Route Handlers <-- */
// See the interface file
class ApiController implements IApiController {
  @catchAsyncErrors()
  public async getByRegion(req: Request, res: Response): Promise<void> {
    const { region } = req.params as { region: string };
    const data: PointOfInterest[] = await PoiService.getPoisByRegion(region);
    sendData(res, { results: data.length, data });
  }

  @catchAsyncErrors()
  public async createPoi(req: Request, res: Response): Promise<void> {
    const newPoi = req.body as PoiRow;
    const savedPoi: PointOfInterest = await PoiService.createPoi(newPoi);
    sendData(res, savedPoi);
  }

  @catchAsyncErrors()
  public async recomendPoi(req: Request, res: Response): Promise<void> {
    const { id } = req.body;
    const updatedPoi: PointOfInterest = await PoiService.recomendPoi(id);
    sendData(res, updatedPoi);
  }

  @catchAsyncErrors()
  public async getRegions(_: Request, res: Response): Promise<void> {
    const data: string[] = await PoiService.getRegions();
    sendData(res, data);
  }

  @catchAsyncErrors()
  public async createReview(req: Request, res: Response): Promise<void> {
    const { poiId, review } = req.body;
    const data = await reviewService.createReview(poiId, review);
    console.log(data);
    sendData(res, data);
  }

  @catchAsyncErrors()
  public async getPoisReviewFigures(_req: Request, res: Response) {
    const data = await reviewService.getAllReviewsGroupedById();
    console.log(data);
    sendData(res, data);
  }

  @catchAsyncErrors()
  public async getAllReviewsById(req: Request, res: Response) {
    const { poiId } = req.params;
    const data = await reviewService.getAllReviewsById(+poiId);
    console.log(data);
    sendData(res, data);
  }
}

export default new ApiController();
