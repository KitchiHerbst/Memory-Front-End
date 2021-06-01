import React, {useEffect, useReducer, useState } from "react";
import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { Home } from "./components/Home.js";
import { FriendPage } from "./components/FriendPage"
import {NavBar} from './components/NavBar'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {FriendsList} from "./components/FriendsList"
import { UsersIndex} from "./components/UsersIndex"
import "./index.css";

export function App() {

  let initialState = {
    loggedIn: false,
  }

  if(localStorage.token){
    initialState = {
      loggedIn: true,
    }
  }else{
    initialState = {
      loggedIn: false,
    }
  }

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {...state, loggedIn: true };
      case "LOGOUT":
        // logout()
        return {...state, loggedIn: false };
      case "SIGNED UP":
        return {...state, loggedIn: true}
      default:
        return state;
    }
  };


  const [state, dispatchUser] = useReducer(userReducer, initialState);
  const [users, setUsers] = useState([])

  // i wanted an array of all the original friends and not friends but also one to use as a display for the search bar
  // probably can be much better but this works for now
  const [friends, setFriends] = useState([]) 
  const [notFriends, setNotFriends] = useState([])
  const [filteredFriends, setFilteredFriends] = useState(friends)
  const [filteredNotFriends, setFilteredNotFriends] = useState(notFriends)
  

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

  //getting all of the users friends and the people that arent their friends
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
    .then(data => {
      setFriends(data.friends)
      setFilteredFriends(data.friends)
      setNotFriends(data.not_friends)
      setFilteredNotFriends(data.not_friends)
    })
  }

  
  //getting all the users, friends and not friends dependent on if loggedIn is changed
  useEffect(() =>{
     fetchUsers()
    fetchFriends()
    }, state.loggedIn)

// setting filtered friends and notFriends depending on if either of the original arrays change
    useEffect(() => {
      setFilteredNotFriends(notFriends)
      setFilteredFriends(friends)
    }, [friends, notFriends])

    //takes in a string and matches users first name, want to get this to work no matter the casing, also want to check last names as well
    // maybe    ...   || person.last_name.includes(arg)
    const searchedUsers = (arg) => {
      // console.log(arg)
      setFilteredFriends(friends.filter(person => person.first_name.toLowerCase().includes(arg.toLowerCase()) || person.last_name.toLowerCase().includes(arg.toLowerCase())))
      setFilteredNotFriends(notFriends.filter(person => person.first_name.toLowerCase().includes(arg.toLowerCase()) || person.last_name.toLowerCase().includes(arg.toLowerCase())))
    }

 
  // debugger
  return (
    <div id='App' >
      <Router>
        {state.loggedIn ? <NavBar /> : null}
        <Switch>
          <Route path="/home">
            <Home dispatch={dispatchUser} redirect={state.loggedIn}/>
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
            <FriendsList redirect={state.loggedIn} dispatch={dispatchUser} friends={friends} setFriends={setFriends}/>
          </Route>
          <Route exact path="/people">
            <UsersIndex redirect={state.loggedIn} dispatch={dispatchUser} friends={filteredFriends} notFriends={filteredNotFriends} 
            search={searchedUsers} setFriends={setFriends} setNotFriends={setNotFriends}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
