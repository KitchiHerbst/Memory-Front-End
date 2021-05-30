import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { CreateTimeline } from ".././functions/CreateTimeline";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "../index.css";
import { Button, Card, Collapse, Container, Form, Row } from "react-bootstrap";

export const Signup = (props) => {
  const [manualSignup, setManualSignup] = useState(false);

  const signUserUp = (newUserObject) => {
    fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newUserObject),
    })
      .then((res) => res.json())
      .then((userResponse) => {
        if (userResponse !== null) {
          localStorage.token = userResponse.token;
          props.dispatch({ type: "SIGNED UP", payload: userResponse });
          CreateTimeline(userResponse.token);
        }
      });
  };
  //
  function responseFacebook(res) {
    //   console.log(res)
    let newUser = {
      firstName: res.name.split(" ")[0],
      lastName: res.name.split(" ")[1],
      password: res.userID.toString(),
      email: res.email,
      profilePicture: res.picture.data.url,
      //   facebookId: res.userID,
    };
    // console.log(newUser)
    signUserUp(newUser);
  }

  function responseGoogle(res) {
    let newUser = {
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      email: res.profileObj.email,
      password: res.profileObj.googleId.toString(),
      profilePicture: res.profileObj.imageUrl,
      //   googleId: res.profileObj.googleId,
    };
    // console.log(newUser)
    signUserUp(newUser);
  }
  //
  const submitHandler = (e) => {
    e.preventDefault();
    let newUser = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      email: e.target[2].value,
      password: e.target[3].value,
      profilePicture: e.target[5].value,
    };

    signUserUp(newUser);
  };
  //
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center container-main">
        <Card className="login-card text-center">
          <Card.Body>
            <Card.Title className="text-center login-title mt-4 mb-4">
              MEMORY
            </Card.Title>
            <Card.Subtitle className="text-center login-prompt mb-4">
              Signup Here
            </Card.Subtitle>
            <Card.Text>
              <FacebookLogin
                appId="743947922947098"
                autoLoad={true}
                fields="name,email,picture"
                // onClick={componentClicked}
                callback={responseFacebook}
                textButton="Sign up with Facebook"
                cssClass="btn btn-light col-12 mb-4"
              />

              <GoogleLogin
                clientId="327256534475-ut4552bgs66c3g85p0dvbk2mrk1hgjim.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="btn btn-light col-12 mb-4"
                  >
                    Sign up with Google
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                // cookiePolicy={"single-host-origin"}
              />
              <Button
                onClick={() => setManualSignup(!manualSignup)}
                className="btn btn-light col-12 mb-4"
              >
                Manual Signup
              </Button>
                <Collapse in={manualSignup}>
                  <Form>
                    <Form.Group controlId="firstname">
                      <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>

                    <Form.Group controlId="lastname">
                      <Form.Control type="text" placeholder="Last Name" />
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Control type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="password">
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="confirmpassword">
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </Form.Group>

                    <Form.Group controlId="profilepicture">
                      <Form.Control type="text" placeholder="Profile Picture" />
                    </Form.Group>
                    <Button
                      variant="light"
                      type="submit"
                      className="btn-block mt-4 mb-4"
                    >
                      Submit
                    </Button>
                  </Form>
                </Collapse>
              <Link to="/"> Return to Login </Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      {props.redirect ? <Redirect to="/home" /> : null}
    </Container>
  );
};
