import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Timeline } from "./Timeline";

export const Home = (props) => {
  const [user, setUser] = useState({});
  const [toggleEdit, setToggleEdit] = useState(false);
  const [userTimeline, setUserTimeline] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/get_user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((user) => setUser(user));

    fetch("http://localhost:3001/api/v1/user_timeline", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserTimeline(data.timeline);
        setPosts(data.posts);
      });
  }, user);

  const editUserHandler = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((updatedUser) => setUser(updatedUser));
  };

  const deleteHandler = () => {
    localStorage.clear();
    fetch(`http://localhost:3001/api/v1/users/${user.id}`, {
      method: "DELETE",
    });
    props.dispatch({ type: "LOGOUT" });
    setToggleEdit(false);
  };



  // const deletePost = () => {

  // }
  console.log(userTimeline);
  console.log(posts);
  return (
    <div>
      <h1>Home</h1>
      <p>{user.first_name}</p>
      <p>{user.last_name}</p>
      <p>{user.email}</p>
      <img src={user.profile_picture} />
      <br />
      <br />
      <button onClick={() => setToggleEdit(!toggleEdit)}>Edit Account</button>
      <button
        onClick={() => {
          localStorage.clear();
          props.dispatch({ type: "LOGOUT" });
        }}
      >
        Logout
      </button>
      {toggleEdit ? (
        <form onSubmit={(e) => editUserHandler(e)}>
          <input
            type="text"
            placeholder="First Name"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          />
          <br />
          <input
            type="text"
            placeholder="First Name"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          />
          <br />
          <input
            type="text"
            placeholder="First Name"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <br />
          <input
            type="text"
            placeholder="First Name"
            value={user.profile_picture}
            onChange={(e) =>
              setUser({ ...user, profile_picture: e.target.value })
            }
          />
          <br />
          <input type="submit" />
        </form>
      ) : null}
      <button onClick={() => deleteHandler()}>Delete Account</button>
      <Timeline timeline={userTimeline} posts={posts} />
      {!props.redirect ? <Redirect to="/" /> : null}
    </div>
  );
};
