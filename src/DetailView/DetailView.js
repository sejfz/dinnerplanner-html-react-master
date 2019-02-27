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
      currentDishId: modelInstance.getCurrentId(),
      displayedDish: []
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
      currentDishId: modelInstance.getCurrentId()
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
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.addObserver(this);
    modelInstance
      .getSpecificDish(this.state.currentDishId)
      .then(displayedDish => {
        this.setState({
          status: "LOADED",
          displayedDish: [displayedDish]
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
    let dishesList = null;
    let ingredCount = 0;
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned displayedDish
    switch (this.state.status) {
      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;
      case "LOADED":
        dishesList = this.state.displayedDish.map(dish => (
          <div key={dish.id} className="row container">
            <div id="displayView" className="col-sm-6">
              <h3>{dish.title}</h3>
              <img src={dish.image} />
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
              <p>{dish.instructions}</p>
            </div>

            <div id="ingredView" className="col-sm-3">
              <p>
                <b>Ingredients for {this.state.numberOfGuests} people</b>
              </p>
              <ul>
                {dish.extendedIngredients.map(
                  ingred => (
                    (ingredCount += 1),
                    (
                      <li key={ingred.id}>
                        {" "}
                        {this.state.numberOfGuests * ingred.amount +
                          " " +
                          ingred.unit +
                          " " +
                          ingred.name +
                          " " +
                          this.state.numberOfGuests +
                          " SEK"}{" "}
                      </li>
                    )
                  )
                )}
              </ul>
              <p>
                <strong>
                  {"Total: " + this.state.numberOfGuests * ingredCount + " SEK"}
                </strong>
              </p>
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
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return <div className="currentDish col-sm-9">{dishesList}</div>;
  }
}

export default DetailView;
