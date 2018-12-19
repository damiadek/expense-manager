import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/buttons.css";

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center pt-5">
                    <div className="col-6 text-center mt-5">
                        <h1>
                            Welcome to your own personalized expense manager{" "}
                        </h1>
                        <Link
                            to="/account/expenses"
                            className="btn btn-danger rounded btn-lg new-button"
                        >
                            VIEW EXPENSES <i className="fa fa-th" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
