import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

export default (
    <Route path="/" component={Home}>
        <IndexRoute component={Login} />
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
    </Route>
);