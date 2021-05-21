import React, { Component, useEffect, useReducer, useState } from "react";
import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { Home } from "./components/Home.js";
import { FriendPage } from "./components/FriendPage"
import {NavBar} from './components/NavBar'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {FriendsList} from "./components/FriendsList"
import { UsersIndex} from "./components/UsersIndex"
import "./index.css";

export function App() {

  const initialState = {
    loggedIn: false,
  };

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {...state, loggedIn: true };
      case "LOGOUT":
        return {...state, loggedIn: false };
      case "SIGNED UP":
        return {...state, loggedIn: true}
      default:
        return state;
    }
  };

  const [state, dispatchUser] = useReducer(userReducer, initialState);
  const [userTimeline, setUserTimeline] = useState(null)
  const [users, setUsers] = useState([])
  const [friends, setFriends] = useState([]) 
  
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

  const fetchUsers = () => {
    fetch('http://localhost:3001/api/v1/users',{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      }
    })
    .then(res => res.json())
    .then(userData => setUsers(userData)) 
  }

  const fetchFriends = () => {
    fetch('http://localhost:3001/api/v1/friendships', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      }
    })
    .then(res => res.json())
    .then(usersFriends => setFriends(usersFriends))
  }
  
  //getting all the data we need for our state hooks dependent on if loggedIn is changed
  useEffect(() =>{
    getUserTimeline()
     fetchUsers()
    fetchFriends()}, initialState.loggedIn)

  console.log(state.loggedIn)
  return (
    <div>
      <Router>
        {state.loggedIn ? <NavBar /> : null}
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
          <Route exact path="/friendpage">
            <FriendPage redirect={state.loggedIn} dispatch={dispatchUser}/>
          </Route>
          <Route exact path="/friendslist">
            <FriendsList redirect={state.loggedIn} dispatch={dispatchUser} friends={friends}/>
          </Route>
          <Route exact path="/people">
            <UsersIndex redirect={state.loggedIn} dispatch={dispatchUser} users={users} friends={friends}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
