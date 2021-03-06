import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery";
import "bootstrap/dist/js/bootstrap.bundle";
import "components-font-awesome/css/fontawesome-all.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

if (document.getElementById("root"))
    ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
