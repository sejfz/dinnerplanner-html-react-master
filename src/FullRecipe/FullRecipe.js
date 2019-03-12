import React, { Component } from "react";
import modelInstance from "../data/DinnerModel";
import "./FullRecipe.css";
import { Link } from "react-router-dom";

class FullRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      fullMenuList: this.props.model.getFullMenu(),
      fullMenuPrice: this.props.model.getFullMenuPrice()
    };
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
      </div>
    );
  }
}
export default FullRecipe;
