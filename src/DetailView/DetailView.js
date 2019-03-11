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
      dishId: "",
      numberOfGuests: modelInstance.getNumberOfGuests(),
      currentDishId: null,
      displayedDish: null,
      fullMenu: []
    };
    this.selectedDishObj = this.selectedDishObj.bind(this);
    this.showallIngredients = this.showallIngredients.bind(this);
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: modelInstance.getNumberOfGuests(),
      fullMenu: modelInstance.getFullMenu()
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

  showallIngredients() {
    let ingredCount = 0;
    let unsortedList = [];
    let currentIngredients = this.state.displayedDish.extendedIngredients;
    for (var ingred in currentIngredients) {
      unsortedList.push(
        <li key={currentIngredients[ingred].id}>
          {this.state.numberOfGuests * currentIngredients[ingred].amount +
            " " +
            currentIngredients[ingred].unit +
            " " +
            currentIngredients[ingred].name +
            ", " +
            this.state.numberOfGuests +
            " SEK"}
        </li>
      );
      ingredCount += 1;
    }
    unsortedList.push(
      <strong key="totalPrice">
        {"Total: " + this.state.numberOfGuests * ingredCount + " SEK"}
      </strong>
    );

    return unsortedList;
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    var currentURL = window.location.search.replace("?", "");
    this.setState({
      currentDishId: currentURL
    });

    modelInstance.addObserver(this);
    modelInstance
      .getSpecificDish(currentURL)
      .then(displayedDish => {
        this.setState({
          status: "LOADED",
          displayedDish: displayedDish
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }
  componentWillUnmount() {
    modelInstance.removeObserver(this);
  }

  render() {
    switch (this.state.status) {
      case "LOADING":
        return <em>Loading...</em>;
      case "LOADED":
        return (
          <div className="col-sm-9">
            <div key={this.state.displayedDish.id} className="row container">
              <div id="displayView" className="col-sm-6">
                <h3>{this.state.displayedDish.title}</h3>
                <img src={this.state.displayedDish.image} />
                <Link to="/search">
                  <button
                    id="backButton"
                    type="button"
                    className="btn btn-danger btn-sm"
                  >
                    Back to search
                  </button>
                </Link>
                <h3>PREPARATION</h3>
                <p>{this.state.displayedDish.instructions}</p>
              </div>

              <div id="ingredView" className="col-sm-3">
                <p>
                  <b>Ingredients for {this.state.numberOfGuests} people</b>
                </p>
                <ul>{this.showallIngredients()}</ul>

                <button
                  id="addToMenu"
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={this.selectedDishObj}
                >
                  Add to menu
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <b>Failed to load data, please try again</b>;
    }
  }
}

export default DetailView;
