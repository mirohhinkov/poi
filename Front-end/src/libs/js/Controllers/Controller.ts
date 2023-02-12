import { ApiCallData } from '../Model/apiCallData.js';
// import { PointOfInterest } from '../Model/PointOfInterest.js';
import state from '../Model/State.js';

import apiController from './apiController.js';
import uiController from './uiController.js';

// import mapToClass from '../../utils/mapToClass.js';
import { EventHandlers } from './EventHandlers.js';

class LogicController {
  // private eventHandlers: EventHandlers = new EventHandlers();
  public async initApplication() {
    console.log('Running...');

    // [1] https://www.w3schools.com/js/js_cookies.asp
    // gets all regions
    let responce: ApiCallData = await apiController.getRegions();
    if (responce.status === 'error') uiController.showError(500);
    const { data } = responce as { data: string[] };
    this.setupView(data);
    responce = await apiController.getReviewsFigures();
    if (responce.status === 'error') uiController.showError(500);
    state.reviews = responce.data;
  }

  private setupView(regions: string[]) {
    //Delete previous login data
    uiController.clearLoginData();
    uiController.generateRegionsList(regions);
    uiController.addChangeRegionsListener(
      EventHandlers.selectRegionHandler.bind(this)
    );
    uiController.addLoginListener();
    uiController.addLogOutListener();
  }

  // Listeners
  /*
  private async selectRegionHandler() {
    // takes the user selection
    const regions = document.getElementById('selRegion') as HTMLSelectElement;
    state.region = regions!.options[regions!.selectedIndex].value;

    // Back-end call to collect pois for the region
    const responce: ApiCallData = await apiController.getPoisByRegion(
      state.region
    );
    const { data } = responce as { data: object[] };
    const pois: PointOfInterest[] = data.map((d: object) =>
      mapToClass(d, PointOfInterest)
    );
    if (responce?.results) {
      uiController.showMap(pois, responce.results);
    } else {
      throw new Error(
        'The selected region has no available Points of Interest'
      );
    }
  }
  */
  // Event handlers
  /*
  // handles the click on thumb-up icon
  private recomendHandler = async (e: any) => {
    const id = +e.target.id;
    const responce: ApiCallData = await apiController.recomendPoi(id);

    if (responce.status === 'error') throw new Error(responce.message);

    const poi = mapToClass(responce.data, PointOfInterest);

    uiController.marker.setPopupContent(uiController.markerHtml(poi));
  };
*/
  // handles click on map

  /*
  private async clickOnMap(event: any) {
    let { lat, lng } = event.latlng;
    while (lng < -180 || lng > 180) lng = lng > 180 ? lng - 360 : lng + 360;
    const country = await apiController.getCountryNameByCoords(lat, lng);
    uiController.showModal(ModalTypes.createPoi, lat, lng, country.countryName);
  }
*/
}

export default new LogicController();
