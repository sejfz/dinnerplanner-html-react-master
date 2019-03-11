import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./Dishes.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statusess
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      value: "all",
      filter: "",
      currentId: modelInstance.getCurrentId()
    };
    this.valueUpdate = this.valueUpdate.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.filterUpdate = this.filterUpdate.bind(this);
    this.currentIdUpdate = this.currentIdUpdate.bind(this);
  }

  decodeUrlBar() {
    var currentURL = window.location.search.replace("?", "");
    var componentArray = [
      currentURL.slice(0, currentURL.lastIndexOf("&")),
      currentURL.slice(currentURL.lastIndexOf("&"))
    ];
    for (var elem in componentArray) {
      var newElem = componentArray[elem].slice(
        componentArray[elem].lastIndexOf("=")
      );
      componentArray[elem] = newElem.replace("=", "");
    }
    return componentArray;
  }

  valueUpdate(event) {
    this.setState({ value: event.target.value });
    console.log(this.state.value);
    console.log(event.target.value);
  }

  filterUpdate(event) {
    this.setState({ filter: event.target.value });
  }

  currentIdUpdate(event) {
    modelInstance.setCurrentId(event.target.value);
    this.setState({ currentId: modelInstance.getCurrentId() });
  }

  submitClick() {
    setTimeout(() => this.componentDidMount(), 100);
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    var searchArray = this.decodeUrlBar();
    console.log(searchArray);

    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance
      .getAllDishes(searchArray[0], searchArray[1])
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes: dishes.results
        });
        console.log(this.decodeUrlBar());
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  render() {
    let dishesList = null;
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;
      case "LOADED":
        dishesList = this.state.dishes.map(dish => (
          <div className="cardDiv" key={dish.id}>
            <img
              src={"https://spoonacular.com/recipeImages/" + dish.image}
              height="150px"
              width="200px"
            />
            <br />
            <Link to={"/details/id=?" + dish.id}>
              <button
                type="button"
                className="btn btn-outline-danger"
                value={dish.id}
                onClick={this.currentIdUpdate}
              >
                Go to dish page
              </button>
            </Link>
            <br />
            <div className="titleDiv">{dish.title}</div>
          </div>
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Dishes col-sm-9">
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Key Words"
            value={this.state.filter}
            onChange={this.filterUpdate}
          />
          <select
            id="allTypes"
            value={this.state.value}
            onChange={this.valueUpdate}
          >
            <option value="all">All</option>
            <option value="side+dish">Side Dish</option>
            <option value="main+course">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="appetizer">Appetizer</option>
            <option value="beverage">Beverage</option>
            <option value="bread">Bread</option>
            <option value="breakfast">Breakfast</option>
            <option value="drink">Drink</option>
            <option value="salad">Salad</option>
            <option value="sauce">Sauce</option>
            <option value="soup">Soup</option>
          </select>
          <Link
            to={
              "/search/?query=" +
              this.state.filter +
              "&type=" +
              this.state.value
            }
          >
            <button
              className="btn btn-search"
              type="button"
              onClick={this.submitClick}
            >
              Search
            </button>
          </Link>
        </div>
        <div align="center">
          <h3>Sample dishes</h3>
          <p>Please use the search function to find more dishes!</p>
        </div>
        {dishesList}
      </div>
    );
  }
}

export default Dishes;
