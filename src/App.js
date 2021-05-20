import React, { Component, useEffect, useReducer, useState } from "react";
import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { Home } from "./components/Home.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./index.css";

export function App() {
  const initialState = {
    loggedIn: false,
  };

  

  const userReducer = (state = initialState, action) => {
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

  const [state, dispatchUser] = useReducer(userReducer, initialState);
  const [userTimeline, setUserTimeline] = useState(null)
  

  

  // const logout = () => {
  //   dispatch({ type: "LOGOUT" });
  // };

  const getUserTimeline = () => {
    fetch("http://localhost:3001/api/v1/user_timeline", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((timeline) => setUserTimeline(timeline));
  }
  
  useEffect(() =>{getUserTimeline()}, initialState.loggedIn)

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/home">
            <Home timeline={userTimeline}/>
          </Route>
          <Route path="/signup">
            <Signup redirect={state.loggedIn} dispatch={dispatchUser} />
          </Route>
          <Route exact path="/">
            <Login redirect={state.loggedIn} dispatch={dispatchUser}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
