import Axios from "axios";
import React, { Component } from "react";

class Logout extends Component {
    componentDidMount() {
        Axios.post("/logout").then(response => {
            console.log(response);
        });
    }

    render() {
        return <h1>Logged Out</h1>;
    }
}

export default Logout;
