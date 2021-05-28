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
    setToggleEdit(false);
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

  const changeAccess = () => {};

  console.log(userTimeline);
  console.log(posts);
  return (
    <div className="home">
      <div className="home-no-timeline border-test">

        <div class="border-test home-picture">
          <img
            src={user.profile_picture}
            alt="profile picture"
            className="profile-picture"
          />
        </div>

        <div className="home-user-info border-test">
          <h5 class="card-title">
            {user.first_name} {user.last_name}
          </h5>
          <p class="card-text">{user.email}</p>
          <button
            className="btn btn-warning col-12"
            onClick={() => {
              localStorage.clear();
              props.dispatch({ type: "LOGOUT" });
            }}
          >
            Logout
          </button>
          <br /><br />
          <button
            className="btn btn-secondary col-12"
            onClick={() => setToggleEdit(!toggleEdit)}
          >
            Edit Account
          </button>
          <br /><br />
          <button
            className="btn btn-danger col-12"
            onClick={() => deleteHandler()}
          >
            Delete Account
          </button>
        </div>
        <div className="home-edit-form border-test">
          {toggleEdit ? (
            <form onSubmit={(e) => editUserHandler(e)}>
              <input
                type="text"
                placeholder="First Name"
                value={user.first_name}
                onChange={(e) =>
                  setUser({ ...user, first_name: e.target.value })
                }
                className="col-12"
              />
              <br /><br />
              
              <input
                type="text"
                placeholder="Last Name"
                value={user.last_name}
                onChange={(e) =>
                  setUser({ ...user, last_name: e.target.value })
                }
                className="col-12"
              />
              
              <br /><br />
              <input
                type="text"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="col-12"
              />
              <br /><br />
              
              <input
                type="text"
                placeholder="Profile Picture"
                value={user.profile_picture}
                onChange={(e) =>
                  setUser({ ...user, profile_picture: e.target.value })
                }
                className="col-12"
              />
              <br /><br />
              
              <input type="submit" className="btn btn-secondary col-12" />
            </form>
          ) : null}
          {/* <select id="timeline-access" name="access">
          <option>GLOBAL</option>
          <option>FRIENDS</option>
          <option>DISABLED</option>
        </select>
        <br />
            */}
        </div>
      </div>
        <Timeline timeline={userTimeline} posts={posts} />
     
      {!props.redirect ? <Redirect to="/" /> : null}
    </div>
  );
};
