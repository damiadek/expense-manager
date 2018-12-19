import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/buttons.css";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h1>Welcome new user</h1>
            <Link
              to="/products"
              className="btn btn-danger rounded btn-lg new-button"
            >
              VIEW PRODUCTS
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
