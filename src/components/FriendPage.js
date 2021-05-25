import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import {Timeline} from './Timeline'


export const FriendPage = (props) => {
    const [postForm, setPostForm] = useState(false)
    const [timeline, setTimeline] = useState({})
    const [posts, setPosts] = useState([])
    const location = useLocation()
    const {friend} = location.state


    const submitHandler = (e) => {
        e.preventDefault()
        let post = {
            date: e.target[0].value, 
            picture: e.target[1].value,
            text:e.target[2].value,
            timelineId: timeline.id
        }
        setPosts([...posts, post])
        console.log(post)
        fetch('http://localhost:3001/api/v1/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`,
            },
            body: JSON.stringify(post)
        })
        .then(res => res.json())
        .then(createdPost => console.log(createdPost))
    
    } 

    useEffect(() => {
      fetch(`http://localhost:3001/api/v1/friend_timeline/${friend.id}`,)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setTimeline(data.timeline)
        setPosts(data.posts)
      })
    },friend)

    console.log(friend, timeline)
    console.log(posts)
  return (
    <div>
      <h1>This is {friend.first_name}s page</h1>
      <button id="add-post" onClick={() => setPostForm(!postForm)}>
        Write a Post
      </button>
      {!postForm ? null : (
        <form onSubmit={submitHandler}>
          <input type="date" />
          <br></br>
          <input type="text" placeholder="Picture" /> <br />
          <textarea
            name="paragraph_text"
            cols="25"
            rows="30"
            placeholder="Today I went for a walk..."
          />
          <br />
          <input type="submit" className="btn" />
        </form>
      )}
      <Timeline timeline={timeline} posts={posts}/>
    </div>

  );
};
