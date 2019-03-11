import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import "./App.css";
import DishView from "./DishView/DishView";
import ConfirmView from "./ConfirmView/ConfirmView";
import FullRecipe from "./FullRecipe/FullRecipe";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title" align="center">
            {this.state.title}
          </h1>

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route
            path="/search"
            render={() => <SelectDish model={modelInstance} />}
          />
          <Route
            path="/details/:id"
            render={() => <DishView model={modelInstance} />}
          />
          <Route
            path="/confirmDinner"
            render={() => <ConfirmView model={modelInstance} />}
          />
          <Route
            path="/fullRecipe"
            render={() => <FullRecipe model={modelInstance} />}
          />
        </header>
      </div>
    );
  }
}

export default App;
