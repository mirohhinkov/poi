import { ApiCallData } from './../Model/apiCallData';
import setHeaders from '../../utils/setHeaders.js';

class ApiController {
  //Gets the regions from the DB - using endpoint /api/v1/getRegions
  public async getRegions(): Promise<ApiCallData> {
    const result = await fetch(`dist/libs/php/getRegions.php`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    });
    return await result.json();
  }

  public async getPoisByRegion(region: string): Promise<ApiCallData> {
    const result = await fetch(`dist/libs/php/getPoisByRegion.php`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `region=${region}`,
    });
    return await result.json();
  }

  public async getCountryNameByCoords(lat: number, lng: number) {
    const result = await fetch(`dist/libs/php/getCountryNameByCoords.php`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `lat=${lat}&lng=${lng}`,
    });

    const r = await result.json();
    return r;
  }

  public async recomendPoi(id: number): Promise<ApiCallData> {
    const headers = setHeaders();
    const result = await fetch(`http://localhost:3030/api/v1/recomend`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ id }),
    });
    const { status } = result;
    if (status == 401) return { status: 'error', statusCode: 401 };
    return await result.json();
  }

  public async createPoi(rowPoi: any): Promise<ApiCallData> {
    const headers = setHeaders();
    const result = await fetch(`http://localhost:3030/api/v1//createPoi`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ ...rowPoi }),
    });
    const { status } = result;
    if (status == 401) return { status: 'error', statusCode: 401 };
    return await result.json();
  }

  public async login(username: string, password: string): Promise<ApiCallData> {
    const result = await fetch(`http://localhost:3030/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });
    return await result.json();
  }

  // public async getReviewsFigures(): Promise<ApiCallData> {
  //   const result = await fetch(`http://localhost:3030/getPoisReviewFigures`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json, text/plain, */*',
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   return await result.json();
  // }

  public async getReviewsFigures(): Promise<ApiCallData> {
    const result = await fetch(`dist/libs/php/getReviewsFigures.php`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    });
    return await result.json();
  }

  public async getReviewsById(id: number): Promise<ApiCallData> {
    const result = await fetch(`dist/libs/php/getReviewsById.php`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `id=${id}`,
    });
    return await result.json();
  }

  public async createReview(
    poiId: number,
    review: string
  ): Promise<ApiCallData> {
    const headers = setHeaders();
    const result = await fetch(`http://localhost:3030/api/v1/createReview`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ poiId, review }),
    });
    const { status } = result;
    if (status == 401) return { status: 'error', statusCode: 401 };
    return await result.json();
  }
}

export default new ApiController();
