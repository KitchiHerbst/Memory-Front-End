import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from "react-router-dom";
import { Timeline } from "./Timeline";

export const FriendPage = (props) => {
  const [postForm, setPostForm] = useState(false);
  const [timeline, setTimeline] = useState({});
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const { friend } = location.state;

  const submitHandler = (e) => {
    e.preventDefault();
    let post = {
      date: e.target[0].value,
      location: e.target[1].value,
      picture: e.target[2].value,
      text: e.target[3].value,
      timelineId: timeline.id,
    };
    setPosts([...posts, post]);
    fetch("http://localhost:3001/api/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((createdPost) => console.log(createdPost));
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/friend_timeline/${friend.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTimeline(data.timeline);
        setPosts(data.posts);
      });
  }, friend);

  return (
    <div className='friend-page'>
      <div className="mb-4 friend-page-no-timeline">
      <div class=" friend-picture">
          <img
            src={friend.profile_picture}
            alt="profile picture"
            className="profile-picture"
          />
        </div>
        <div className='friend-info'>
        <h5>{friend.first_name} {friend.last_name}</h5>
        <br/>
        <button id="add-post" onClick={() => setPostForm(!postForm)} className='btn btn-dark col-8'>
          Post to {friend.first_name}'s Timeline
        </button>
        <div  className='post-form'>
        {!postForm ? null : (
          <form onSubmit={submitHandler}>
            <input type="date" className='col-9'/>
            <br></br>
            <input type="text" placeholder="Location" className='col-9'/> <br />
            <input type="text" placeholder="Picture" className='col-9'/> <br />
            <textarea
              name="paragraph_text"
              cols="25"
              rows="10"
              placeholder="Today I went for a walk..."
              className='col-9'
            />
            <br />
            <input type="submit" className="btn btn-dark col-9" />
          </form>
        )}
        </div>
        </div>
      </div>

      <div className="mt-4 mb-4">
        <Timeline timeline={timeline} posts={posts} />
      </div>
    </div>
  );
};
