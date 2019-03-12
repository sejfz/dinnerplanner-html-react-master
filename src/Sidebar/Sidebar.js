import React, { Component } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      fullMenuList: this.props.model.getFullMenu(),
      fullMenuPrice: this.props.model.getFullMenuPrice()
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
      numberOfGuests: this.props.model.getNumberOfGuests(),
      fullMenuList: this.props.model.getFullMenu(),
      fullMenuPrice: this.props.model.getFullMenuPrice()
    });
  }

  dishRemover = e => {
    e.preventDefault();
    this.props.model.removeDishFromMenu(
      e.target.value,
      this.state.fullMenuList
    );
  };

  conslog(e) {
    e.preventDefault();
    console.log("waddup");
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };

  render() {
    return (
      <div id="sideb" className="container col-sm-3" expand="sm">
        <nav id="navId" className="navbar navbar-expand-sm navbar-light">
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-expanded="false"
            aria-controls="navbarSupportedContent"
            aria-label="Toggle navigation"
            onClick={this.conslog}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="nav navbar-nav collapse navbar-collapse">
              <h4 className="col-sm-12">My Dinner</h4>
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
              <div id="summaryDiv" className="col-sm-12">
                <div id="summaryBar" className="row">
                  <p className="col-6">Dish Name</p>
                  <p className="col-6" align="right">
                    Cost
                  </p>
                </div>
              </div>
              <div id="fullMenu">
                {this.state.fullMenuList.map(dish => (
                  <div className="row selectedDish" key={dish.id}>
                    <div className="col-4" align="left">
                      {dish.title}
                    </div>
                    <button
                      value={dish.id}
                      className="btn btn-danger removeButtonClass col-sm-4"
                      type="button"
                      onClick={this.dishRemover}
                    >
                      Remove
                    </button>
                    <div className="col-4" align="right">
                      {dish.extendedIngredients.length *
                        this.state.numberOfGuests +
                        " SEK"}
                    </div>
                  </div>
                ))}
              </div>
              <br />
              <div id="priceId" className="col-sm-12" />
              <div align="right" className="col-sm-12" id="finalId">
                <p>
                  <strong>
                    Total:
                    {" " +
                      this.state.numberOfGuests * this.state.fullMenuPrice +
                      " "}
                    SEK
                  </strong>
                </p>
              </div>
              <Link to="/confirmDinner">
                <button className="btn btn-danger" id="confirmButtonId">
                  Confirm Dinner
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Sidebar;
