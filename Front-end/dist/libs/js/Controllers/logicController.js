// import { PointOfInterest } from '../Model/PointOfInterest.js';
import state from '../Model/State.js';
import apiController from './apiController.js';
import uiController from './uiController.js';
// import mapToClass from '../../utils/mapToClass.js';
import { EventHandlers } from './EventHandlers.js';
class LogicController {
    // private eventHandlers: EventHandlers = new EventHandlers();
    async initApplication() {
        console.log('Running...');
        // [1] https://www.w3schools.com/js/js_cookies.asp
        // gets all regions
        let responce = await apiController.getRegions();
        if (responce.status === 'error')
            uiController.showError(500);
        const { data } = responce;
        this.setupView(data);
        responce = await apiController.getReviewsFigures();
        if (responce.status === 'error')
            uiController.showError(500);
        state.reviews = responce.data;
    }
    setupView(regions) {
        //Delete previous login data
        uiController.clearLoginData();
        uiController.generateRegionsList(regions);
        uiController.addChangeRegionsListener(EventHandlers.selectRegionHandler.bind(this));
        uiController.addLoginListener();
        uiController.addLogOutListener();
    }
}
export default new LogicController();
//# sourceMappingURL=logicController.js.map