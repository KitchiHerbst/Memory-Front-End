import React, { useState, useEffect } from "react";
import {
  Button,
  Collapse,
  Container,
  Form,
  Image,
  InputGroup,
  Media,
  Modal,
  Row,
} from "react-bootstrap";
import { BrowserRouter as Redirect } from "react-router-dom";
import { Timeline } from "./Timeline";

export const Home = (props) => {
  const [user, setUser] = useState({});
  const [toggleEdit, setToggleEdit] = useState(false);
  const [userTimeline, setUserTimeline] = useState({});
  const [posts, setPosts] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    handleClose();
    localStorage.clear();
    fetch(`http://localhost:3001/api/v1/users/${user.id}`, {
      method: "DELETE",
    });
    props.dispatch({ type: "LOGOUT" });
    setToggleEdit(false);
  };

  const deletePost = (deletedPost) => {
    console.log(deletedPost);
    setPosts(posts.filter((obj) => obj.id !== deletedPost.id));
    fetch(`http://localhost:3001/api/v1/posts/${deletedPost.id}`, {
      method: "DELETE",
    });
  };

  const changeAccess = (e) => {
    if (e.target.value !== "Change Timeline Access") {
      fetch(`http://localhost:3001/api/v1/timelines/${userTimeline.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(e.target.value),
      });
    }
  };

  return (
    <Container fluid className="container-main">
      <Row className="mt-4 justify-content-flex-start ml-4">
        <Media
          className={
            !toggleEdit
              ? "user-card accent-color rounded"
              : "user-card accent-color rounded-left"
          }
        >
          <Image
            src={user.profile_picture}
            alt="profile picture"
            roundedCircle
            className="profile-picture mr-4 ml-2 mt-4 mb-4"
          />
          <Media.Body className="mt-4 text-light">
            <h4>
              {user.first_name} {user.last_name}
            </h4>
            <p>{user.email}</p>
            <Button
              className="col-11 btn-light mr-4 mb-4"
              onClick={() => setToggleEdit(!toggleEdit)}
            >
              Edit Account
            </Button>
            <InputGroup>
              <Form.Control
                as="select"
                className="col-11 text-center"
                onChange={changeAccess}
              >
                <option>Change Timeline Access</option>
                <option>Global</option>
                <option>Friends</option>
                <option>Private</option>
              </Form.Control>
            </InputGroup>
            <Button
              className="col-11 btn-secondary mt-4"
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                props.dispatch({ type: "LOGOUT" });
              }}
            >
              Logout
            </Button>
            <Button
              className="col-11 btn-danger mt-4 mb-4"
              onClick={handleShow}
            >
              Delete Account
            </Button>
          </Media.Body>
        </Media>
        <Collapse in={toggleEdit}>
          <Form
            className="accent-color rounded-right"
            style={{ "max-width": "325px" }}
            onSubmit={(e) => editUserHandler(e)}
          >
            <Form.Group controlId="firstname">
              <Form.Control
                type="text"
                placeholder="First Name"
                onChange={(e) =>
                  setUser({ ...user, first_name: e.target.value })
                }
                className="mt-4 mr-4 col-11"
              />
            </Form.Group>

            <Form.Group controlId="lastname">
              <Form.Control
                type="text"
                placeholder="Last Name"
                onChange={(e) =>
                  setUser({ ...user, last_name: e.target.value })
                }
                className="col-11"
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="col-11"
              />
            </Form.Group>
            <Form.Group controlId="profilepicture">
              <Form.Control
                type="text"
                placeholder="Profile Picture"
                onChange={(e) =>
                  setUser({ ...user, profile_picture: e.target.value })
                }
                className="col-11"
              />
            </Form.Group>
            <Button
              variant="light"
              type="submit"
              className="btn-block mt-4 mb-4 col-11"
            >
              Submit
            </Button>
          </Form>
        </Collapse>
      </Row>
      <Row>
        {posts.length === 0 ? (
          <h4>
            {" "}
            Oh No! there doesnt seem to be any posts on your timeline! Add
            Friends so they can post on your timeline!
          </h4>
        ) : (
          <Timeline
            timeline={userTimeline}
            posts={posts}
            postHandler={deletePost}
          />
        )}
      </Row>
      {!props.redirect ? <Redirect to="/" /> : null}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>So you want to delete your account?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You will be able to create a new account with your same email but your
          timeline, posts, and friends will be lost.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No I would like to stay
          </Button>
          <Button variant="danger" onClick={deleteHandler}>
            Delete me Forever
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
