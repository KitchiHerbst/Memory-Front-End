import React, { Component, useReducer, useState } from "react";
import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { Home } from "./components/Home.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./index.css";

export function App() {
  const initialState = {
    loggedIn: false,
  };

  

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        return { loggedIn: true };
      case "LOGOUT":
        return { loggedIn: false };
      case "SIGNED UP":
        return {loggedIn: true}
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const loginUser = () => {
    dispatch({ type: "LOGIN" });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup redirect={state.loggedIn} dispatch={dispatch} />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
