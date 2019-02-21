import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./Dishes.css";
import "bootstrap/dist/css/bootstrap.css";

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING"
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance
      .getAllDishes()
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes: dishes.results
        });
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
          <div class="cardDiv">
            <img
              src={"https://spoonacular.com/recipeImages/" + dish.image}
              height="150px"
              width="200px"
            />
            <br />
            <button type="button" class="btn btn-outline-danger" value={dish.id}>
              Go to dish page
            </button>
            <br />
            <div id="titleDiv">{dish.title}</div>
          </div>
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Dishes" class="col-sm-9">
        <div class="input-group">
          <input type="text" placeholder="Enter Key Words"/>
           <span class="input-group-btn">
            <button class="btn btn-search" type="button"><i class="fa fa-search fa-fw"></i> Search</button>
          </span>
        <br />
      </div>
        <h3>Dishes</h3>
        {dishesList}
      </div>
    );
  }
}

export default Dishes;
