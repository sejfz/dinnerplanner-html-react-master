import React, { Component } from "react";
import ConfirmDishes from "../ConfirmDishes/ConfirmDishes";
import "./ConfirmView.css";

class ConfirmView extends Component {
  render() {
    return (
      <div className="ConfirmDishes row">
        {/* We pass the model as property to the Sidebar component */}
        <ConfirmDishes model={this.props.model} />
      </div>
    );
  }
}

export default ConfirmView;
