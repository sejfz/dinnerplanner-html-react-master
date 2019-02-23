import ObservableModel from "./ObservableModel";
//import ourKey from "./ourKey";
const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/51/";
const httpOptions = {
  headers: {
    "X-Mashape-Key": "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767"
  }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 1;
    this._currentId = null;
    this.getNumberOfGuests();
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    if (this._numberOfGuests < 1) {
      this._numberOfGuests = 1;
    }
    this.notifyObservers();
  }

  setCurrentId(num) {
    this._currentId = num;
    this.notifyObservers();
  }

  getCurrentId() {
    return this._currentId;
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes(filter, type) {
    const url =
      BASE_URL +
      "/recipes/search?query=" +
      filter +
      "&type=" +
      type +
      "&number=10";
    return fetch(url, httpOptions).then(this.processResponse);
  }

  getSpecificDish(id) {
    const detailUrl = BASE_URL + "recipes/" + id + "/information";
    return fetch(detailUrl, httpOptions).then(this.processResponse);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
