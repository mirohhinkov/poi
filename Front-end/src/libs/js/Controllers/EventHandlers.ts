import uiController from './uiController.js';
import apiController from './apiController.js';
import { PoiRow } from '../Model/PoiRow.js';
import { PointOfInterest } from '../Model/PointOfInterest.js';
import state from '../Model/State.js';
import { ApiCallData } from '../Model/apiCallData.js';
import { ModalTypes } from '../Model/ModalTypes.js';
import mapToClass from '../../utils/mapToClass.js';

export class EventHandlers {
  public static async createPoiHandler(event: Event): Promise<void> {
    type poiFieldsType = string | number;

    // prevent the default behavior - sendinh http request and refresh the page
    event.preventDefault();

    // create object needed for the create poi request
    const createPoi = (poiFielsds: poiFieldsType[]): PoiRow => {
      return {
        name: poiFielsds[1] as string,
        type: poiFielsds[2] as string,
        country: poiFielsds[3] as string,
        region: poiFielsds[4] as string,
        lat: poiFielsds[5] as number,
        lon: poiFielsds[6] as number,
        description: poiFielsds[7] as string,
      };
    };

    // gets the form fields
    const inputTextFields: HTMLInputElement[] =
      uiController.getInputFields(event);

    //extracts values from the fields and converts to proper format
    const poiFielsds: poiFieldsType[] = inputTextFields.map((el) =>
      !isNaN(+el.value) ? +el.value : el.value
    );
    const newRowPoi: PoiRow = createPoi(poiFielsds);

    // creates new poi
    let created = await apiController.createPoi(newRowPoi);
    if (created?.statusCode == 401) {
      uiController.showError(created.statusCode!);
      uiController.toggleModal();
      return;
    } else if (created.status === 'error') {
      const messages = JSON.parse(created.message!);
      return uiController.message(messages.join('<br />'));
    }

    //add marker of the new poi to the map
    const newPoi = created.data as PointOfInterest;
    uiController.setUpMarker(newPoi);
    uiController.toggleModal();

    // if the region of the new poi is different from the current region
    // rerender the region list
    if (state.region !== newPoi.region) {
      const responce: ApiCallData = await apiController.getRegions();
      if (responce.status === 'error') throw new Error(responce.message);
      const { data } = responce as { data: string[] };
      if (newPoi.region in data) return;
      uiController.generateRegionsList(data);
    }
  }

  // handles the click on thumb-up icon
  public static recomendHandler = async (e: any) => {
    const id = +e.target.id;
    const responce: ApiCallData = await apiController.recomendPoi(id);

    if (responce.status === 'error')
      return uiController.showError(responce.statusCode!);

    const poi = mapToClass(responce.data, PointOfInterest);

    uiController.marker.setPopupContent(uiController.markerHtml(poi));
  };

  public static async reviewsHandler(id: any) {
    const reviews = await apiController.getReviewsById(id);
    uiController.showModal(ModalTypes.reviews, reviews.data, id);
  }

  public static async submitReview(event: Event) {
    const poiId = state.id;
    event.preventDefault();
    const inputTextFields: HTMLInputElement[] =
      uiController.getInputFields(event);
    const review = inputTextFields[0].value;
    const responce: ApiCallData = await apiController.createReview(
      poiId,
      review
    );
    if (responce.status === 'error') {
      return uiController.message(responce.message!);
    }
    uiController.toggleModal();
  }

  public static async clickOnMap(event: any) {
    let { lat, lng } = event.latlng;
    while (lng < -180 || lng > 180) lng = lng > 180 ? lng - 360 : lng + 360;
    const country = await apiController.getCountryNameByCoords(lat, lng);
    uiController.showModal(ModalTypes.createPoi, lat, lng, country.countryName);
  }

  public static async selectRegionHandler() {
    // takes the user selection
    const regions = document.getElementById('selRegion') as HTMLSelectElement;
    state.region = regions!.options[regions!.selectedIndex].value;

    // Back-end call to collect pois for the region
    let responce: ApiCallData = await apiController.getReviewsFigures();
    if (responce.status === 'error') uiController.showError(500);
    state.reviews = responce.data;
    responce = await apiController.getPoisByRegion(state.region);
    const { data } = responce as { data: object[] };
    const pois: PointOfInterest[] = data.map((d: object) =>
      mapToClass(d, PointOfInterest)
    );

    if (responce?.results) {
      uiController.showMap(pois, responce.results);
    } else {
      uiController.showError(410);
    }
  }

  public static loginHandler() {
    uiController.showModal(ModalTypes.userLogin);
  }

  public static logoutHandler() {
    uiController.toggleUsernameAndLogout();
    uiController.clearLoginData();
  }

  public static async submitUserDetails(event: Event) {
    event.preventDefault();
    const inputTextFields: HTMLInputElement[] =
      uiController.getInputFields(event);
    const [username, password] = inputTextFields.map((el) => el.value);
    const result: ApiCallData = await apiController.login(username, password);
    console.log(result);
    if ((result.status = 'successful')) {
      state.userName = result.data.username;
      uiController.toggleModal();
      uiController.toggleUsernameAndLogout();
    } else {
      uiController.message('Invalid credentials. Please try again.');
    }
  }
}
