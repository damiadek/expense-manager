import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./views/home";
import ExpensesView from "./views/expenses-view";
import Navbar from "./components/navbar";

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Navbar />
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <Switch>
                                <Route
                                    exact
                                    path="/account/home"
                                    component={Home}
                                />
                                <Route
                                    path="/account/expenses"
                                    component={ExpensesView}
                                />
                            </Switch>
                        </div>
                    </div>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;
