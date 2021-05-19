import React, { Component, useReducer, useState } from "react";
import { Login } from "./components/Login.js";
import {Signup} from './components/Signup.js'
import {Home} from './components/Home.js'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './index.css'

const initialState = {
  loggedIn: false
}

const signUserUp = (newUserObject) => {
  // make fetch inside of here and return the state object 
  console.log(newUserObject)
  return {loggedIn: true}
}

const reducer = (state, action) => {
  switch(action.type){
    case 'LOGIN':
      return {loggedIn: true}
    case 'LOGOUT':
      return {loggedIn: false}
    case 'SIGNED UP':
      return signUserUp(action.payload)
    default:
      return state
  }
}

export function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  const loginUser = () => {
    dispatch({type: 'LOGIN'})
  }

  const logout = () => {
    dispatch({type: 'LOGOUT'})
  }
  
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/signup">
              <Signup redirect={state.loggedIn} dispatch={dispatch}/>
            </Route>
            <Route exact path="/">
                <Login />   
            </Route>
          </Switch>
        </Router>
      </div>
    );
  
}