import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
                Expense Manager
            </Link>
            {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText"> */}
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link to="/account/home" className="nav-link">
                        Home <span className="sr-only">(current)</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/account/expenses" className="nav-link">
                        Expenses
                    </Link>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="/logout" className="nav-link text-danger">
                        Logout
                    </a>
                </li>
            </ul>
            {/* </div> */}
        </nav>
    );
};

export default Navbar;
