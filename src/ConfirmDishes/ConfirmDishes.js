import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./ConfirmDishes.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

class ConfirmDishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statusess
    // e.g. API data loading or error
    this.state = {
      numberOfGuests: modelInstance.getNumberOfGuests(),
      fullMenu: modelInstance.getFullMenu(),
      fullMenuPrice: modelInstance.getFullMenuPrice()
    };
    this.selectedDishObj = this.selectedDishObj.bind(this);
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: modelInstance.getNumberOfGuests(),
      fullMenu: modelInstance.getFullMenu(),
      fullMenuPrice: modelInstance.getFullMenuPrice()
    });
  }
  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    modelInstance.setNumberOfGuests(e.target.value);
  };

  selectedDishObj(e) {
    e.preventDefault();
    modelInstance.addDishToMenu(
      this.state.currentDishId,
      this.state.displayedDish
    );
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    console.log(document.cookie);
    modelInstance.addObserver(this);
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this);
  }

  render() {
    return (
      <div id="summaryHead" className="container" align="center">
        <div className="row">
          <h1 className="col-12">
            {"My Dinner: " + this.state.numberOfGuests + " people"}
          </h1>
        </div>
        <Link to="/search">
          {" "}
          <br />
          <button
            id="backToFeed"
            type="button"
            className="btn btn-outline-danger col-3"
          >
            Go back and edit dinner
          </button>
        </Link>
        <div className="row">
          <div className="col-sm-6">
            {this.state.fullMenu.map(dish => (
              <div className="cardDiv" key={dish.id}>
                <img src={dish.image} height="150px" width="200px" />
                <div className="titleDiv">{dish.title}</div>

                <strong>
                  <p>
                    {dish.extendedIngredients.length *
                      this.state.numberOfGuests +
                      " SEK"}
                  </p>
                </strong>
              </div>
            ))}
          </div>

          <div id="totcostView" className="col-sm-6">
            <strong>
              {"Total: " +
                this.state.numberOfGuests * this.state.fullMenuPrice +
                " SEK"}
            </strong>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="text-center">
          <Link to="/fullRecipe">
            <button
              id="printButton"
              type="button"
              className="btn btn-danger btn-sm"
            >
              Print Full Recipe
            </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmDishes;
