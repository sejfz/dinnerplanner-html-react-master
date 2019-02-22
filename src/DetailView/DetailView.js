import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./DetailView.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

class DetailView extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statusess
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      dishId: ""
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance
      .getSpecificDish(this.state.dishId)
      .then(dishes => {
        console.log("hello man wtf is up");
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
          <div>
            <div id="displayView" className="col-sm-6" style="display: none">
              <h3>{dish.title}</h3>
              <p>{dish.image}</p>
              <button
                id="backButton"
                type="button"
                className="btn btn-warning btn-sm"
              >
                Back to search
              </button>
              <h3>PREPARATION</h3>
              <p>{dish.instructions}</p>
            </div>

            <div id="ingredView" className="col-sm-3" style="display: none">
              <p>
                <b>
                  Ingredients for <span id="numpeep" /> people
                </b>
              </p>
              {dish.extendedIngredients}

              <button
                id="addToMenu"
                type="button"
                className="btn btn-warning btn-sm"
              >
                Add to menu
              </button>
            </div>
          </div>
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return <div className="Dishes col-sm-9">{dishesList}</div>;
  }
}

export default DetailView;
