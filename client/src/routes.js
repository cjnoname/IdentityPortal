import React from "react";
import { Route, IndexRoute } from "react-router";
import { hasAuthToken } from "./utils/auth";
import App from "./components/App";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";

function requireAuth (nextState, replace) {
  console.log("nextState: ", nextState)
  if (!hasAuthToken()) {
    replace({
      pathname: '/Login'
    })
  }
}

function requireNotAuth (nextState, replace) {
  if (hasAuthToken()) {
      replace({
      pathname: '/Welcome'
    })
  }
}

export default (
    <Route path="/" component={Home}>
        <IndexRoute component={Welcome} onEnter={requireAuth} />
        <Route path="/Login" component={Login} onEnter={requireNotAuth}/>
        <Route path="/Register" component={Register} onEnter={requireNotAuth}/>
        <Route path="Welcome" component={Welcome} onEnter={requireAuth}/>
    </Route>
);