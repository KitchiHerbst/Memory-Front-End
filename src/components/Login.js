import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import "../index.css";
import React, { useState } from "react";
import { Card, Container, Row, Button, Form, Collapse } from "react-bootstrap";


export const Login = (props) => {
  const [manualLogin, setManualLogin] = useState(false);
  //function to take in a user object from all three methods of loggin in and
  //   making a call to the api to get the user and set the local token to that users ID

  const fetchAndDispatch = (user) => {
    fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((userData) => {
        console.log(userData);
        localStorage.token = userData.token;
        props.dispatch({ type: "LOGIN" });
      });
  };

  //functions to handle all three ways of loggin in and creating a user object for the above function
  function responseFacebook(res) {
    let user = {
      email: res.email,
      password: res.userID.toString(),
    };
    fetchAndDispatch(user);
  }

  function responseGoogle(res) {
    let user = {
      email: res.profileObj.email,
      password: res.profileObj.googleId.toString(),
    };
    fetchAndDispatch(user);
  }

  function responseManual(e) {
    e.preventDefault();
    let user = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    fetchAndDispatch(user);
  }

  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center container-main">
        <Card className="login-card text-center">
          <Card.Body>
            <Card.Title className="text-center login-title mt-4 mb-4">
              MEMORY
            </Card.Title>
            <Card.Subtitle className="text-center login-prompt">
              Please Login
            </Card.Subtitle>
            <Card.Text>
              <FacebookLogin
                appId="743947922947098"
                autoLoad={true}
                fields="name,email,picture"
                // onClick={() => responseFacebook}
                callback={responseFacebook}
                cssClass="btn btn-light col-12 text-center mt-4"
              />

              <GoogleLogin
                clientId="327256534475-ut4552bgs66c3g85p0dvbk2mrk1hgjim.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="btn btn-light col-12 text-center mt-4"
                  >
                    Login with Google
                  </button>
                )}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                // cookiePolicy={"single-host-origin"}
              />
              <Button
                className="btn btn-block btn-light mt-4 mb-4"
                onClick={() => setManualLogin(!manualLogin)}
              >
                Manual Login
              </Button>
              <Collapse in={manualLogin}>
                <Form onSubmit={(e) => responseManual(e)}>
                  <Form.Group controlId="Email">
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group controlId="Password">
                    <Form.Control type="password" placeholder="Password" />
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
            <Link to="/signup">Sign up here</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      {props.redirect ? <Redirect to="/home" /> : null}
    </Container>
  );
};
