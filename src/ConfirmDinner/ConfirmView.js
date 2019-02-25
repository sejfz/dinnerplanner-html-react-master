import React, { Component } from "react";
import modelInstance from "../data/DinnerModel";
import "./ConfirmView.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

class ConfirmView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        status: "LOADING",
        dishId: "",
        numberOfGuests: modelInstance.getNumberOfGuests(),
        currentDishId: modelInstance.getCurrentId()
      };
    }
}