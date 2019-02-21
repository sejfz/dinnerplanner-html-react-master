import React, { Component } from "react";
import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests()
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };

  render() {
    return (
      <div id="sideb" className="Sidebar" class="col-sm-3">
        <nav id="navId" class="navbar navbar-expand-sm navbar-light">
          <button
            type="button"
            class="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-expanded="false"
            aria-controls="navbarSupportedContent"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="nav navbar-nav collapse navbar-collapse">
              <h4 class="col-sm-12">My Dinner</h4>
              <p>
                People:
                <input
                  type="number"
                  value={this.state.numberOfGuests}
                  size="3"
                  onChange={this.onNumberOfGuestsChanged}
                />
                <br />
                Total number of guests: {this.state.numberOfGuests}
              </p>
              <div id="summaryDiv" class="col-sm-12">
                <div id="summaryBar" class="row">
                  <p class="col-6">Dish Name</p>
                  <p class="col-6" align="right">
                    Cost
                  </p>
                </div>
              </div>
              <span id="menuDishes" />
              <br />
              <div id="priceId" class="col-sm-12" />
              <div align="right" class="col-sm-12" id="finalId">
                Total:
                <span id="totalPrice" />
              </div>
              <button class="btn btn-warning" id="confirmButtonId" disabled>
                Confirm Dinner
              </button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Sidebar;
