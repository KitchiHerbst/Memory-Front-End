import React, { useState, useEffect } from "react";
import {
  Container,
  Media,
  Row,
  Image,
  Button,
  Collapse,
  Form,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Timeline } from "./Timeline";

export const FriendPage = (props) => {
  const [postForm, setPostForm] = useState(false);
  const [timeline, setTimeline] = useState({});
  const [access, setAccess] = useState(false);
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const { friend, status } = location.state;

  const submitHandler = (e) => {
    setPostForm(false);
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

  useEffect(
    () => {
      fetch(`http://localhost:3001/api/v1/friend_timeline/${friend.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTimeline(data.timeline);
          setPosts(data.posts);
          allowPost(data.timeline.access);
        });
    },
    friend,
    posts
  );

  const allowPost = (string) => {
    console.log(string);
    if (string === "GLOBAL") {
      setAccess(true);
    } else if (string === "FRIENDS" && status) {
      setAccess(true);
    } else {
      setAccess(false);
    }
  };

  return (
    <Container fluid className="container-main">
      <Row className="mt-4 justify-content-flex-start ml-4">
        <Media
          className={
            !postForm
              ? "user-card accent-color rounded"
              : "user-card accent-color rounded-left"
          }
        >
          <Image
            src={friend.profile_picture}
            alt="profile picture"
            roundedCircle
            className="profile-picture mr-4 ml-2 mt-4 mb-4"
          />
          <Media.Body className="mt-4 text-light">
            <h4>
              {friend.first_name} {friend.last_name}
            </h4>
            {/* <p>{numOfFriends} Friends</p> */}
            {/* <Button>{ friends? 'Friends' : 'Add Friend'}</Button> */}
            {access ? (
              <Button
                className="col-11 btn-light mt-4"
                onClick={() => setPostForm(!postForm)}
              >
                Post to {friend.first_name}'s timeline
              </Button>
            ) : null}
          </Media.Body>
        </Media>
        <Collapse in={postForm}>
          <Form
            className="accent-color rounded-right"
            style={{ "max-width": "325px" }}
            onSubmit={submitHandler}
          >
            <Form.Group>
              <Form.Control type="date" className="mt-4 col-11"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                className="mt-4 col-11"
                placeholder="Location"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                className="mt-4 col-11"
                placeholder="Picture"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                className="mt-4 col-11 mb-4"
                placeholder="Today we..."
              ></Form.Control>
            </Form.Group>
            <Button type="submit" className="col-11 btn-light mb-4">
              Post
            </Button>
          </Form>
        </Collapse>
      </Row>
      <Row>
        {posts.length === 0 ? (
          <h4>
            {" "}
            Oh No! {friend.first_name} doesnt have any posts on their timeline,
            be the first to post on theirs!
          </h4>
        ) : (
          <Timeline timeline={timeline} posts={posts} />
        )}
      </Row>
    </Container>
  );
};
