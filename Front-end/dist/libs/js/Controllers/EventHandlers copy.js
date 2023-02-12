import { PointOfInterest } from '../Model/PointOfInterest.js';
import mapToClass from './../../utils/mapToClass.js';
export class EventHandlers {
  async createPoiHandler(event) {
    event.preventDefault();
    const createPoi = (poiFielsds) => {
      let tempObj = {};
      poiFielsds.forEach((el, i) => {
        Object.defineProperties(tempObj, `${i}`, { value: el });
      });
      return new PointOfInterest(...Object.values(tempObj));
    };
    const form = event.target;
    const inputTextFields = Array.from(form.getElementsByTagName('input'));
    inputTextFields.pop();
    const poiFielsds = inputTextFields.map((el) =>
      !isNaN(+el.value) ? +el.value : el.value
    );
    const newPoi = createPoi(poiFielsds);

    const createdPoi = await apiController.createPoi(newPoi);
  }
}
//# sourceMappingURL=EventHandlers.js.map
