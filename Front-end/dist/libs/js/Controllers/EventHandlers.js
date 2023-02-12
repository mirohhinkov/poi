import uiController from './uiController.js';
import apiController from './apiController.js';
import { PointOfInterest } from '../Model/PointOfInterest.js';
import state from '../Model/State.js';
import { ModalTypes } from '../Model/ModalTypes.js';
import mapToClass from '../../utils/mapToClass.js';
export class EventHandlers {
    static async createPoiHandler(event) {
        // prevent the default behavior - sendinh http request and refresh the page
        event.preventDefault();
        // create object needed for the create poi request
        const createPoi = (poiFielsds) => {
            return {
                name: poiFielsds[1],
                type: poiFielsds[2],
                country: poiFielsds[3],
                region: poiFielsds[4],
                lat: poiFielsds[5],
                lon: poiFielsds[6],
                description: poiFielsds[7],
            };
        };
        // gets the form fields
        const inputTextFields = uiController.getInputFields(event);
        //extracts values from the fields and converts to proper format
        const poiFielsds = inputTextFields.map((el) => !isNaN(+el.value) ? +el.value : el.value);
        const newRowPoi = createPoi(poiFielsds);
        // creates new poi
        let created = await apiController.createPoi(newRowPoi);
        if (created?.statusCode == 401) {
            uiController.showError(created.statusCode);
            uiController.toggleModal();
            return;
        }
        else if (created.status === 'error') {
            const messages = JSON.parse(created.message);
            return uiController.message(messages.join('<br />'));
        }
        //add marker of the new poi to the map
        const newPoi = created.data;
        uiController.setUpMarker(newPoi);
        uiController.toggleModal();
        // if the region of the new poi is different from the current region
        // rerender the region list
        if (state.region !== newPoi.region) {
            const responce = await apiController.getRegions();
            if (responce.status === 'error')
                throw new Error(responce.message);
            const { data } = responce;
            if (newPoi.region in data)
                return;
            uiController.generateRegionsList(data);
        }
    }
    // handles the click on thumb-up icon
    static recomendHandler = async (e) => {
        const id = +e.target.id;
        const responce = await apiController.recomendPoi(id);
        if (responce.status === 'error')
            return uiController.showError(responce.statusCode);
        const poi = mapToClass(responce.data, PointOfInterest);
        uiController.marker.setPopupContent(uiController.markerHtml(poi));
    };
    static async reviewsHandler(id) {
        const reviews = await apiController.getReviewsById(id);
        uiController.showModal(ModalTypes.reviews, reviews.data, id);
    }
    static async submitReview(event) {
        const poiId = state.id;
        event.preventDefault();
        const inputTextFields = uiController.getInputFields(event);
        const review = inputTextFields[0].value;
        const responce = await apiController.createReview(poiId, review);
        if (responce.status === 'error') {
            return uiController.message(responce.message);
        }
        uiController.toggleModal();
    }
    static async clickOnMap(event) {
        let { lat, lng } = event.latlng;
        while (lng < -180 || lng > 180)
            lng = lng > 180 ? lng - 360 : lng + 360;
        const country = await apiController.getCountryNameByCoords(lat, lng);
        uiController.showModal(ModalTypes.createPoi, lat, lng, country.countryName);
    }
    static async selectRegionHandler() {
        // takes the user selection
        const regions = document.getElementById('selRegion');
        state.region = regions.options[regions.selectedIndex].value;
        // Back-end call to collect pois for the region
        let responce = await apiController.getReviewsFigures();
        if (responce.status === 'error')
            uiController.showError(500);
        state.reviews = responce.data;
        responce = await apiController.getPoisByRegion(state.region);
        const { data } = responce;
        const pois = data.map((d) => mapToClass(d, PointOfInterest));
        if (responce?.results) {
            uiController.showMap(pois, responce.results);
        }
        else {
            uiController.showError(410);
        }
    }
    static loginHandler() {
        uiController.showModal(ModalTypes.userLogin);
    }
    static logoutHandler() {
        uiController.toggleUsernameAndLogout();
        uiController.clearLoginData();
    }
    static async submitUserDetails(event) {
        event.preventDefault();
        const inputTextFields = uiController.getInputFields(event);
        const [username, password] = inputTextFields.map((el) => el.value);
        const result = await apiController.login(username, password);
        console.log(result);
        if ((result.status = 'successful')) {
            state.userName = result.data.username;
            uiController.toggleModal();
            uiController.toggleUsernameAndLogout();
        }
        else {
            uiController.message('Invalid credentials. Please try again.');
        }
    }
}
//# sourceMappingURL=EventHandlers.js.map