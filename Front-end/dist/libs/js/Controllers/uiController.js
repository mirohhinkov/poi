import { ModalTypes } from '../Model/ModalTypes.js';
import state from '../Model/State.js';
import { EventHandlers } from './EventHandlers.js';
class UiController {
  htmlTemplates;
  isMapDrawn;
  map;
  _marker; // the marker click listeners update it with the current marker
  constructor() {
    /* ---  Gets all heeded html templates ---*/
    // gets all templates elements from index.html
    const templ = Array.from(document.getElementsByTagName('template'));
    // ids of the template tags are keys of the template object
    const keys = templ.map((t) => t.id);
    // template contents are the values of the template object
    const htmlTempl = templ.map(
      (t) => document.importNode(t.content, true).firstElementChild
    );
    //Merge key and value arrays in one object
    this.htmlTemplates = keys.reduce(
      (acc, key, ind) => ({
        ...acc,
        [key]: htmlTempl[ind],
      }),
      {}
    );
    /*--- end geting templates ---*/
    this.setModal();
    this.isMapDrawn = false;
    this.map = new L.Map('map');
    this._marker = L.marker([0, 0]); //initialization
  }
  get marker() {
    return this._marker;
  }
  /*******************
   *   Modal Functions
   *******************/
  // Setup modal closing listeners
  setModal() {
    document
      .getElementById('modal-close')
      .getElementsByTagName('span')[0]
      .addEventListener('click', this.toggleModal);
    document
      .getElementById('modal-background')
      .addEventListener('click', this.toggleModal);
  }
  // hides/shows modal
  toggleModal() {
    document.getElementById('modal').classList.toggle('hide');
    document.getElementById('modal-background').classList.toggle('hide');
  }
  // renders modal content and shows it
  showModal(modalType, ...args) {
    switch (modalType) {
      case ModalTypes.createPoi:
        const [lat, lng, country] = args;
        this.renderCreatePoi(lat, lng, country);
        break;
      case ModalTypes.userLogin:
        this.renderUserLogin();
        break;
      case ModalTypes.error:
        const [statusCode, message] = args;
        this.renderError(statusCode, message);
        break;
      case ModalTypes.reviews:
        const [reviews, id] = args;
        this.renderReviews(reviews, id);
        break;
    }
    this.toggleModal();
  }
  /* End modal functions */
  /*******************
   *   Nav Functions
   *******************/
  // create option element for the select region list
  optionEl(region) {
    const el = document.createElement('option');
    el.value = region;
    el.innerText = region;
    return el;
  }
  // adds all regions to the select list
  generateRegionsList(regions) {
    const selectNode = document.getElementById('selRegion');
    selectNode.innerHTML =
      '<option value="" selected disabled hidden>Select a region</option>';
    regions.forEach((region) => {
      selectNode.insertAdjacentElement('beforeend', this.optionEl(region));
    });
  }
  addChangeRegionsListener(changeHandler) {
    document
      .getElementById('selRegion')
      .addEventListener('change', changeHandler);
  }
  toggleUsernameAndLogout() {
    document.getElementById('uname').innerHTML =
      state.userName[0].toUpperCase() + state.userName.slice(1);
    document.getElementById('logout-p').classList.toggle('hide');
    document.getElementById('login').classList.toggle('hide');
  }
  /* End nav functions */
  /*******************
   *   Map Functions
   *******************/
  //Shows map on screen
  showMap(pois, numberOfPois) {
    // Shows all markers in a region, attaches a click listenet on each marker
    // and fits them in the map
    const showMarkers = () => {
      // Cteates markers for all points of interest
      const markers = pois.map((poi) => this.setUpMarker(poi));
      // Group all markers and add them to the map
      const group = L.featureGroup(markers).addTo(this.map);
      // finds bounds of the group and choose the best fit on the map
      // adds a listener for click event on the map
      this.map
        .fitBounds(group.getBounds())
        .on('click', EventHandlers.clickOnMap);
    };
    if (!numberOfPois) return;
    if (this.isMapDrawn) {
      this.map.off();
      this.map.remove();
      this.map = new L.Map('map');
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    //Show markers on the map
    showMarkers();
    this.isMapDrawn = true;
  }
  setUpMarker(poi) {
    const marker = L.marker([poi.lat, poi.lon])
      .addTo(this.map)
      .bindPopup(this.markerHtml(poi));
    marker.on('click', this.markersHandler.bind(this, marker));
    return marker;
  }
  markersHandler(marker) {
    this._marker = marker;
    const id = document.querySelector('.recomend').id;
    document
      .getElementById(id)
      .addEventListener('click', EventHandlers.recomendHandler);
    document
      .getElementsByClassName('recomend')[1]
      .addEventListener('click', EventHandlers.reviewsHandler.bind(this, id));
  }
  markerHtml(poi) {
    this.htmlTemplates.mapPopUp.getElementsByTagName('h3')[0].innerText =
      poi.name;
    this.htmlTemplates.mapPopUp.getElementsByTagName('p')[0].innerText =
      poi.description;
    this.htmlTemplates.mapPopUp.getElementsByClassName(
      'recomend'
    )[0].id = `${poi.id}`;
    this.htmlTemplates.mapPopUp.getElementsByTagName(
      'span'
    )[1].id = `${poi.id}span`;
    this.htmlTemplates.mapPopUp.getElementsByTagName(
      'span'
    )[1].innerText = `${poi.recommendations}`;
    this.htmlTemplates.mapPopUp.getElementsByTagName('span')[5].innerText = `${
      state.reviews[poi.id] ? state.reviews[poi.id] : 0
    }`;
    return this.htmlTemplates.mapPopUp.innerHTML;
  }
  /* End map functions */
  getInputFields(event) {
    const form = event.target;
    const inputTextFields = Array.from(form.getElementsByTagName('input'));
    inputTextFields.pop(); // remove the submit input Element
    return inputTextFields;
  }
  /************************************
   *   Modal Content Creating Functions
   ************************************/
  renderCreatePoi(lat, lng, country) {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = '';
    this.htmlTemplates.createForm.getElementsByClassName(
      'statusMsg'
    )[0].innerHTML = '';
    this.htmlTemplates.createForm.querySelector(
      'p'
    ).innerText = `${country}, region: ${state.region}  lat ${lat}, lng ${lng}`;
    const preSetValues =
      this.htmlTemplates.createForm.getElementsByClassName('preset');
    preSetValues[0].value = '-1';
    preSetValues[1].value = '';
    preSetValues[2].value = '';
    preSetValues[3].value = country;
    preSetValues[4].value = state.region;
    preSetValues[5].value = `${lng}`;
    preSetValues[6].value = `${lat}`;
    preSetValues[7].value = ``;
    preSetValues[8].value = `0`;
    modalContent.insertAdjacentElement(
      'afterbegin',
      this.htmlTemplates.createForm
    );
    document
      .querySelectorAll('#create-poi')[0]
      .addEventListener('submit', EventHandlers.createPoiHandler);
  }
  renderUserLogin() {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = '';
    modalContent.insertAdjacentElement(
      'afterbegin',
      this.htmlTemplates.loginForm
    );
    document
      .querySelectorAll('#user-login')[0]
      .addEventListener('submit', EventHandlers.submitUserDetails);
  }
  renderError(statusCode, message) {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = '';
    this.htmlTemplates.errorDiv.querySelector('h2').innerHTML = '' + statusCode;
    this.htmlTemplates.errorDiv.querySelector('p').innerHTML = message;
    modalContent.insertAdjacentElement(
      'afterbegin',
      this.htmlTemplates.errorDiv
    );
  }
  renderReviews(reviews, id) {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = '';
    const html = reviews.reduce(
      (acc, review) => `${acc}<p>${review}</p><hr />`,
      ''
    );
    this.htmlTemplates.reviewForm.getElementsByTagName('div')[1].innerHTML =
      html;
    modalContent.insertAdjacentElement(
      'afterbegin',
      this.htmlTemplates.reviewForm
    );
    state.id = id;
    document
      .querySelectorAll('#add-review')[0]
      .addEventListener('submit', EventHandlers.submitReview);
  }
  /*   end Modal rendering Functions */
  /*******************
   *   Listeners
   *******************/
  addLoginListener() {
    document
      .getElementById('login')
      ?.addEventListener('click', EventHandlers.loginHandler);
  }
  addLogOutListener() {
    document
      .getElementById('logout')
      ?.addEventListener('click', EventHandlers.logoutHandler);
  }
  showError(statusCode) {
    let message = '';
    switch (statusCode) {
      case 401:
        message = 'Unauthorised attempt. Please login';
        break;
      case 410:
        message = 'The selected region has no available Points of Interest';
        break;
      default:
        message = 'Something went wrong. Please reload';
    }
    this.showModal(ModalTypes.error, statusCode, message);
  }
  message(msg) {
    document.querySelector('.statusMsg').innerHTML = msg;
  }
  clearLoginData() {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    state.userName = '';
  }
}
export default new UiController();
//# sourceMappingURL=uiController.js.map
