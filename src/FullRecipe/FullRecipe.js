import React, { Component } from "react";
import modelInstance from "../data/DinnerModel";
import "./FullRecipe.css";
import { Link } from "react-router-dom";

class FullRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfGuests: modelInstance.getNumberOfGuests(),
      fullMenuList: modelInstance.getFullMenu(),
      fullMenuPrice: modelInstance.getFullMenuPrice()
    };
    this.showAllIngredients = this.showAllIngredients.bind(this);
  }

  update() {
    this.setState({
      numberOfGuests: modelInstance.getNumberOfGuests(),
      fullMenuList: modelInstance.getFullMenu(),
      fullMenuPrice: modelInstance.getFullMenuPrice()
    });
  }
  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    modelInstance.setNumberOfGuests(e.target.value);
  };

  showAllIngredients(currentDish) {
    let str = "";
    let currentIngredients = currentDish.extendedIngredients;
    for (var ingred in currentIngredients) {
      if (
        currentIngredients[currentIngredients.length - 1] ===
        currentIngredients[ingred]
      ) {
        str += currentIngredients[ingred].name;
      } else {
        str += currentIngredients[ingred].name + ", ";
      }
    }

    return str;
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    modelInstance.addObserver(this);
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this);
  }

  render() {
    return (
      <div className="container" align="center">
        <div className="row">
          <h1 className="col-12">
            {"My Dinner: " + this.state.numberOfGuests + " people"}
          </h1>
        </div>
        <Link to="/confirmDinner">
          <button type="button" className="btn btn-outline-danger col-3">
            Go back and edit dinner
          </button>
        </Link>

        <div className="row">
          {this.state.fullMenuList.map(dish => (
            <div className="row summaryDiv" key={dish.id}>
              <img
                id="summaryImage"
                className="col-4"
                src={dish.image}
                height="300px"
              />
              <div className="col-4">
                <h4>{dish.title}</h4>
                <p> {this.showAllIngredients(dish)} </p>
              </div>

              <div className="col-4">
                <h4>Preparation</h4>
                <p>{dish.instructions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default FullRecipe;
