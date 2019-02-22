import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DetailView from "../DetailView/DetailView";
import "./DishView.css";

class DishView extends Component {
  render() {
    return (
      <div className="DishView row">
        {/* We pass the model as property to the Sidebar component */}
        <Sidebar model={this.props.model} />
        <DetailView />
      </div>
    );
  }
}

export default DishView;
